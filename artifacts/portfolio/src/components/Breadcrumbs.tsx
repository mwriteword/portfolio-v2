import { Fragment } from "react";
import { Link } from "wouter";

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Current page / case study name. */
  label: string;
  /** Accent hex for the current crumb, e.g. "#22c55e". Falls back to the theme's foreground. */
  color?: string;
  /** "dark" for the UX portfolio (default); "light" for the freelance pages. */
  theme?: "light" | "dark";
  /** Where the "Home" crumb points. Defaults to the portfolio home. */
  homeHref?: string;
  /** Optional intermediate crumbs between Home and the current page, in order. */
  trail?: Crumb[];
}

export function Breadcrumbs({
  label,
  color,
  theme = "dark",
  homeHref = "/portfolio",
  trail = [],
}: BreadcrumbsProps) {
  const linkClass =
    theme === "light"
      ? "text-muted-foreground transition-colors hover:text-foreground"
      : "text-[#888888] transition-colors hover:text-white";
  const separatorClass = theme === "light" ? "text-muted-foreground/40" : "text-[#555555]";
  const currentClass = color ? "font-medium" : "font-medium text-foreground";

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href={homeHref} onClick={() => window.scrollTo(0, 0)} className={linkClass}>
            Home
          </Link>
        </li>
        {trail.map((crumb) => (
          <Fragment key={crumb.href}>
            <li aria-hidden="true" className={separatorClass}>
              »
            </li>
            <li>
              <Link href={crumb.href} onClick={() => window.scrollTo(0, 0)} className={linkClass}>
                {crumb.label}
              </Link>
            </li>
          </Fragment>
        ))}
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
