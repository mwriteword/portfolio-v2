import { useState, useEffect, useRef, useCallback } from "react";
import { Mail, Check, Copy } from "lucide-react";

const EMAIL = "vjtlaq@gmail.com";

interface CopyEmailButtonProps {
  /** "hero" renders a filled button, "footer" renders an inline email link. */
  variant?: "hero" | "footer";
  /** Visual theme. "dark" matches the UX page; "light" matches the Writing page. */
  theme?: "dark" | "light";
}

/**
 * Email CTA that copies the address to the clipboard and confirms via a popover.
 * Shared by the dark UX page (home) and the light Writing page.
 */
export function CopyEmailButton({ variant = "hero", theme = "dark" }: CopyEmailButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [manualCopied, setManualCopied] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setShowTooltip(true);
    setManualCopied(false);
  }, []);

  const handleManualCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setManualCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setManualCopied(false), 2000);
  }, []);

  // Close tooltip on click outside
  useEffect(() => {
    if (!showTooltip) return;
    const handleClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showTooltip]);

  const isLight = theme === "light";
  const popover = isLight
    ? "bg-card border-border shadow-xl"
    : "bg-[#3a3a3a] border-[#555555] shadow-xl";
  const confirmText = isLight ? "text-green-600" : "text-[#22c55e]";
  const inputCls = isLight
    ? "bg-background text-foreground border-border"
    : "bg-[#2e2e2e] text-white border-[#555555]";
  const copyBtnCls = isLight
    ? "bg-background border-border text-foreground hover:bg-muted"
    : "bg-[#2e2e2e] border-[#555555] text-white hover:bg-white/10";
  const checkCls = isLight ? "text-green-600" : "text-[#22c55e]";

  const Popover = (
    <div
      className={`absolute left-0 z-50 rounded-lg border p-3 min-w-[280px] ${popover} ${
        variant === "footer" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      <p className={`text-xs font-medium mb-2 flex items-center gap-1.5 ${confirmText}`}>
        <Check className="w-3 h-3" />
        Email copied to clipboard
      </p>
      <div className="flex gap-1.5">
        <input
          type="text"
          readOnly
          value={EMAIL}
          className={`flex-1 px-2.5 py-1.5 rounded text-xs border outline-none select-all ${inputCls}`}
          onFocus={(e) => e.target.select()}
        />
        <button
          onClick={handleManualCopy}
          className={`px-2.5 py-1.5 rounded border transition-colors ${copyBtnCls}`}
          aria-label="Copy email"
        >
          {manualCopied ? <Check className={`w-3 h-3 ${checkCls}`} /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );

  if (variant === "footer") {
    return (
      <div className="relative" ref={tooltipRef}>
        <button onClick={copyEmail} className="flex items-center gap-3 group w-fit cursor-pointer">
          <span className="text-lg">✉️</span>
          <span
            className={`text-sm group-hover:underline underline-offset-2 transition-all ${
              isLight ? "text-foreground" : "text-white"
            }`}
          >
            {EMAIL}
          </span>
        </button>
        {showTooltip && Popover}
      </div>
    );
  }

  const heroBtn = isLight
    ? "bg-slate-900 text-white hover:bg-slate-700"
    : "bg-slate-700 text-white hover:bg-slate-800";

  return (
    <div className="relative" ref={tooltipRef}>
      <button
        onClick={copyEmail}
        className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${heroBtn}`}
      >
        <Mail className="w-4 h-4" />
        Email
      </button>
      {showTooltip && Popover}
    </div>
  );
}
