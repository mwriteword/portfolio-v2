import { ChevronUp } from "lucide-react";

/** Centered "Back to top" control rendered at the bottom of each page. */
export function BackToTop() {
  return (
    <div className="flex justify-center pt-4 pb-12">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1.5 text-sm font-medium text-[#888888] transition-colors hover:text-white"
      >
        <ChevronUp className="h-4 w-4" />
        Back to top
      </button>
    </div>
  );
}
