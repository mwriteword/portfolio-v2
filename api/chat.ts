import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

// Load the content system document once at cold-start; stays cached across warm invocations.
// Vercel deploys project root files alongside functions, so process.cwd() points there.
const contentSystem = (() => {
  const candidates = [
    join(process.cwd(), "content-system.md"),
    join(process.cwd(), "..", "content-system.md"),
  ];
  for (const p of candidates) {
    try {
      return readFileSync(p, "utf-8");
    } catch {
      // try next candidate
    }
  }
  return ""; // function still operates without context, just with reduced accuracy
})();

const SYSTEM_PROMPT = `You are an interactive agent for Vernon Laquindanum's personal content system. You have deep knowledge of Vernon's writing standards, voice, tone, and rules — all documented below.

You help with three things:
- GENERATE: When asked to write or generate copy, produce text that follows the documented voice, tone, and patterns. Match the style, not just the rules.
- CHECK: When asked to check or evaluate content, run it against the lint rules and scoring rubric. Return structured findings: flagged rule IDs, severity, location in the text, problem description, suggested fix, and a one-sentence verdict.
- ASK: When asked a question about standards, formatting, tone, word choice, or writing decisions, answer using the content system as your source of truth. Cite the relevant rule ID when applicable (e.g. "Per GRAM-02...").

Tone for your own responses: direct, specific, useful. Do not pad. Do not over-explain things the user didn't ask about. Match the register of the question.

---

${contentSystem}`;

const client = new Anthropic();

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not configured. Add it in Vercel → Project → Settings → Environment Variables.",
    });
  }

  // Stream the response as plain text chunks
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages,
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      res.write(event.delta.text);
    }
  }

  res.end();
}
