/**
 * Local dev server for the /api/chat endpoint.
 * Mirrors the Vercel serverless function in api/chat.ts.
 * Run with: node_modules/.pnpm/node_modules/.bin/tsx api/dev-server.ts
 */
import Anthropic from "@anthropic-ai/sdk";
import { createServer } from "http";
import { readFileSync } from "fs";
import { join } from "path";

const contentSystem = (() => {
  try { return readFileSync(join(process.cwd(), "content-system.md"), "utf-8"); }
  catch { return ""; }
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

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url !== "/api/chat" || req.method !== "POST") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  let body = "";
  req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
  req.on("end", async () => {
    try {
      const { messages } = JSON.parse(body);

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("X-Accel-Buffering", "no");

      const stream = client.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages,
      });

      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          res.write(event.delta.text);
        }
      }

      res.end();
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : "Error" }));
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Dev API server → http://localhost:${PORT}`);
});
