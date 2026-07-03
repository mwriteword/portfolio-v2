import { useLocation } from "wouter";
import { useModeTransition } from "@/lib/mode-transition";

interface Mode {
  label: string;
  href: string;
}

const MODES: Mode[] = [
  { label: "UX", href: "/" },
  { label: "Writing", href: "/writing" },
];

/**
 * Persistent UX | Writing toggle. Routes between the dark UX portfolio (`/`)
 * and the light freelance Writing landing page (`/writing`).
 * `theme` styles it for the dark nav or the light Writing header.
 */
export function ModeToggle({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [location] = useLocation();
  const startTransition = useModeTransition();
  const isWriting = location === "/writing";

  const container =
    theme === "light"
      ? "bg-black/5 border border-black/10"
      : "bg-white/5 border border-white/10";

  return (
    <div
      role="tablist"
      aria-label="Site mode"
      className={`inline-flex shrink-0 items-center rounded-full p-0.5 ${container}`}
    >
      {MODES.map((mode) => {
        const active = mode.href === "/writing" ? isWriting : !isWriting;
        const activeCls =
          theme === "light"
            ? "bg-foreground text-background"
            : "bg-white text-[#1a1a1a]";
        const inactiveCls =
          theme === "light"
            ? "text-muted-foreground hover:text-foreground"
            : "text-[#cccccc] hover:text-white";
        return (
          <button
            key={mode.href}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => !active && startTransition(mode.href)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              active ? activeCls : inactiveCls
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
