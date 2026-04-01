import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
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
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
