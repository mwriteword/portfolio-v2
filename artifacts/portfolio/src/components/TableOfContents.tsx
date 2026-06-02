import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = items.find((i) => i.id === activeId)?.label ?? items[0]?.label ?? "";

  return (
    <>
      {/* Desktop side rail */}
      <nav
        className="hidden xl:flex flex-col gap-1 fixed top-1/2 -translate-y-1/2 z-10"
        style={{ left: "calc(50% + 584px)" }}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              className="group flex items-center gap-2.5 py-1 transition-all duration-200"
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive
                    ? "w-5 bg-white"
                    : "w-2.5 bg-[#555555] group-hover:w-4 group-hover:bg-[#888888]"
                }`}
              />
              <span
                className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#555555] group-hover:text-[#888888]"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Compact floating menu — shown below xl, where the side rail is hidden */}
      <div className="xl:hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Section navigation"
          aria-expanded={open}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#2e2e2e]/90 px-3.5 py-2 text-[#cccccc] shadow-lg backdrop-blur transition-colors hover:border-[#555555]"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="max-w-[40vw] truncate text-xs font-medium">{activeLabel}</span>
        </button>

        {open && (
          <>
            {/* Click-away overlay */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            {/* Menu panel */}
            <div className="fixed right-4 top-16 z-50 w-52 overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#242424] p-1.5 shadow-xl">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollTo(item.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-[#383838] text-white" : "text-[#999999] hover:bg-[#333333] hover:text-white"
                    }`}
                  >
                    <span
                      className={`block h-px w-3 shrink-0 transition-colors ${
                        isActive ? "bg-white" : "bg-[#555555]"
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function useTocActiveSection(items: TocItem[], enabled = true): string {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!enabled || items.length === 0) return;

    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [enabled]);

  return activeId;
}
