import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Send, RotateCcw, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const EXAMPLE_PROMPTS = [
  'Generate a tl;dr callout for a case study section about discovering a broken object model',
  'Check this: "It was decided to leverage a simpler approach going forward."',
  'What tone should I use for an error message shown to an existing user?',
  'How do I write a one-line onboarding card headline?',
];

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#3a3a3a] px-4 py-3">
        <p className="text-sm leading-relaxed text-white whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function AssistantMessage({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#3b82f6]/20 bg-[#242424] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#3b82f6] mb-2">
          Content System
        </p>
        <div className="text-sm leading-relaxed text-[#cccccc] whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-[2px] h-[14px] ml-0.5 bg-[#3b82f6] animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center px-4">
      <p className="text-[#555555] text-sm">
        Ask a question, generate copy, or paste something to check.
      </p>
    </div>
  );
}

export default function ContentSystemApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or streaming text changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Auto-resize textarea
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    resizeTextarea();
  };

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setStreamingText("");
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok || !response.body) {
        const errData = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(errData.error ?? "Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamingText(full);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
      setStreamingText("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePillClick = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
    // let the DOM update before resizing
    setTimeout(resizeTextarea, 0);
  };

  const handleClear = () => {
    setMessages([]);
    setStreamingText("");
    setError(null);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  // Combine committed messages with any in-progress streaming
  const allMessages = streamingText
    ? [...messages, { role: "assistant" as const, content: streamingText }]
    : messages;

  return (
    <main className="min-h-screen bg-[#2e2e2e]">
      <div className="max-w-[860px] w-[90%] mx-auto py-12 sm:py-20">
        {/* Back */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-white mb-4">
          Content System
        </h1>
        <p className="text-[#aaaaaa] text-base leading-relaxed mb-2 max-w-[640px]">
          This is the content system behind this portfolio — the voice, tone, rules, and patterns
          derived from my own writing. Use it to generate standards-aligned copy, check existing
          content for alignment, or ask questions about formatting and style.
        </p>
        <p className="text-[#666666] text-sm mb-8">
          Powered by Claude. Conversation is kept in your browser only.
        </p>

        {/* Example prompt pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePillClick(prompt)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full border border-[#3b82f6]/30 text-[#3b82f6] hover:border-[#3b82f6]/70 hover:bg-[#3b82f6]/10 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-left"
            >
              {prompt.length > 55 ? prompt.slice(0, 52) + "…" : prompt}
            </button>
          ))}
        </div>

        {/* Conversation */}
        <div
          ref={scrollContainerRef}
          className="rounded-xl bg-[#1e1e1e] border border-[#3a3a3a] p-4 sm:p-6 mb-4 min-h-[280px] max-h-[520px] overflow-y-auto"
        >
          {allMessages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {allMessages.map((msg, i) =>
                msg.role === "user" ? (
                  <UserMessage key={i} content={msg.content} />
                ) : (
                  <AssistantMessage
                    key={i}
                    content={msg.content}
                    isStreaming={isLoading && i === allMessages.length - 1}
                  />
                )
              )}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="rounded-xl border border-[#3a3a3a] bg-[#242424] p-3 focus-within:border-[#3b82f6]/50 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            rows={1}
            disabled={isLoading}
            className="w-full bg-transparent text-sm text-white placeholder-[#555555] resize-none outline-none leading-relaxed"
            style={{ minHeight: "36px", maxHeight: "180px" }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                disabled={isLoading || (messages.length === 0 && !streamingText)}
                className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#888888] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
              <span className="text-xs text-[#444444]">⌘↵ to send</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3b82f6] text-white text-xs font-medium hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Thinking
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-xs text-[#444444] text-center">
          Responses are generated by Claude using{" "}
          <a
            href="/content-system.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555555] hover:text-[#888888] underline underline-offset-2 transition-colors"
          >
            my content system doc
          </a>{" "}
          as context.
        </p>
      </div>
    </main>
  );
}
