import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardData {
  src: string;
  title: string;
  description: string;
  cta: string;
}

const CARDS: CardData[] = [
  {
    src: "/images/atlassian/cards/card-1.png",
    title: "See how it all works together",
    description: "Not sure where to start? Find out how your apps can streamline your work.",
    cta: "Watch video",
  },
  {
    src: "/images/atlassian/cards/card-2.png",
    title: "Plan out tasks with Jira",
    description: "Create project tasks to begin managing your project.",
    cta: "Try Jira",
  },
  {
    src: "/images/atlassian/cards/card-3.png",
    title: "Write docs with Confluence",
    description: "Create a knowledge bank, available to everyone in your team.",
    cta: "Try Confluence",
  },
  {
    src: "/images/atlassian/cards/card-4.png",
    title: "Share updates with Loom",
    description: "Share async video updates and reduce meetings for all.",
    cta: "Try Loom",
  },
  {
    src: "/images/atlassian/cards/card-5.png",
    title: "Get help fast with Chat",
    description: "Get answers to your questions and work through your tasks faster.",
    cta: "Try Chat",
  },
  {
    src: "/images/atlassian/cards/card-6.png",
    title: "Automate work with Studio",
    description: "Build custom AI agents, automations, and more without needing to code.",
    cta: "Try Studio",
  },
  {
    src: "/images/atlassian/cards/card-7.png",
    title: "Find more with Search",
    description: "Power up your searches with AI and make sure you are up to date.",
    cta: "Try Search",
  },
  {
    src: "/images/atlassian/cards/card-8.png",
    title: "Track progress with goals",
    description: "Align your work with goals to make sure you are on track.",
    cta: "Try Goals",
  },
  {
    src: "/images/atlassian/cards/card-9.png",
    title: "Collaborate with teams",
    description: "Collaborate with more teams and unlock the power of your teammates.",
    cta: "Try Teams",
  },
];

function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(4);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function chunkCards(cards: CardData[], size: number): CardData[][] {
  const pages: CardData[][] = [];
  for (let i = 0; i < cards.length; i += size) {
    pages.push(cards.slice(i, i + size));
  }
  return pages;
}

export function CardCarousel() {
  const visibleCount = useVisibleCount();
  const pages = chunkCards(CARDS, visibleCount);
  const totalPages = pages.length;

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset to page 0 when visible count changes (responsive resize)
  useEffect(() => {
    setPage(0);
  }, [visibleCount]);

  const next = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-advance
  useEffect(() => {
    if (paused || totalPages <= 1) return;
    timerRef.current = setTimeout(next, 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [page, paused, totalPages, next]);

  const gridCols =
    visibleCount === 4 ? "grid-cols-4" :
    visibleCount === 2 ? "grid-cols-2" :
    "grid-cols-1";

  return (
    <div
      className="rounded-xl bg-[#f4f5f7] p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Shell header — always static */}
      <div className="flex items-center justify-between mb-3 select-none">
        <span className="text-sm font-semibold text-[#172b4d]">Getting started</span>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#dfe1e6] text-[#42526e] hover:bg-[#f4f5f7] transition-colors disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#dfe1e6] text-[#42526e] hover:bg-[#f4f5f7] transition-colors disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewport — clips the sliding track */}
      <div className="overflow-hidden">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageCards, pageIdx) => (
            <div
              key={pageIdx}
              className={`grid ${gridCols} gap-3 w-full shrink-0`}
            >
              {pageCards.map((card, cardIdx) => (
                <div
                  key={cardIdx}
                  className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col"
                >
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full object-cover"
                    draggable={false}
                  />
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-sm font-semibold text-[#172b4d] leading-snug">
                      {card.title}
                    </p>
                    <p className="text-xs text-[#6b778c] mt-1 leading-relaxed">
                      {card.description}
                    </p>
                    <span className="text-xs font-medium text-[#0052cc] mt-auto pt-3 block">
                      {card.cta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-0.5 mt-3 select-none">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="p-2 group"
              aria-label={`Go to page ${i + 1}`}
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                  i === page ? "bg-[#172b4d]" : "bg-[#b3bac5] group-hover:bg-[#8993a4]"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
