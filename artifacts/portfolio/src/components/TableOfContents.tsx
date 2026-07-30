import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
  /** "dark" matches the UX page; "light" matches the Writing page. */
  theme?: "dark" | "light";
}

/**
 * Desktop section rail. Below xl, section navigation lives in the TopNav bar
 * instead (see TopNav's `sections` prop).
 */
export function TableOfContents({ items, activeId, theme = "dark" }: TableOfContentsProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isLight = theme === "light";
  const activeLine = isLight ? "w-5 bg-foreground" : "w-5 bg-white";
  const inactiveLine = isLight
    ? "w-2.5 bg-muted-foreground/40 group-hover:w-4 group-hover:bg-muted-foreground"
    : "w-2.5 bg-[#555555] group-hover:w-4 group-hover:bg-[#888888]";
  const activeText = isLight ? "text-foreground" : "text-white";
  const inactiveText = isLight
    ? "text-muted-foreground/60 group-hover:text-foreground"
    : "text-[#555555] group-hover:text-[#888888]";

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
              scrollTo(item.id);
            }}
            className="group flex items-center gap-2.5 py-1 transition-all duration-200"
          >
            <span
              className={`block h-px transition-all duration-300 ${
                isActive ? activeLine : inactiveLine
              }`}
            />
            <span
              className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                isActive ? activeText : inactiveText
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

/**
 * Scroll-spies the section currently in view and returns its id.
 *
 * By default the observer watches the page viewport. Pass a `root` element when
 * the sections live inside their own `overflow-y-auto` scroll container (e.g.
 * the Services content panel) so spying tracks that container's scroll instead.
 */
export function useTocActiveSection(
  items: TocItem[],
  enabled = true,
  root: Element | null = null
): string {
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
        { root, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [enabled, root]);

  return activeId;
}
