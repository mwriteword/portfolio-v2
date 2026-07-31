import { Link } from "wouter";

interface BreadcrumbsProps {
  /** Current page / case study name. */
  label: string;
  /** Accent hex for the current crumb, e.g. "#22c55e". Falls back to the theme's foreground. */
  color?: string;
  /** "dark" for the UX portfolio (default); "light" for the freelance pages. */
  theme?: "light" | "dark";
  /** Where the "Home" crumb points. Defaults to the portfolio home. */
  homeHref?: string;
}

export function Breadcrumbs({
  label,
  color,
  theme = "dark",
  homeHref = "/portfolio",
}: BreadcrumbsProps) {
  const homeClass =
    theme === "light"
      ? "text-muted-foreground transition-colors hover:text-foreground"
      : "text-[#888888] transition-colors hover:text-white";
  const separatorClass = theme === "light" ? "text-muted-foreground/40" : "text-[#555555]";
  const currentClass = color ? "font-medium" : "font-medium text-foreground";

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href={homeHref}
            onClick={() => window.scrollTo(0, 0)}
            className={homeClass}
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className={separatorClass}>
          »
        </li>
        <li aria-current="page" className={currentClass} style={color ? { color } : undefined}>
          {label}
        </li>
      </ol>
    </nav>
  );
}
