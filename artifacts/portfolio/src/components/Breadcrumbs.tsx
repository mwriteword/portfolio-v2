import { Link } from "wouter";

interface BreadcrumbsProps {
  /** Current case study name. */
  label: string;
  /** Accent hex for the current crumb, e.g. "#22c55e". */
  color: string;
}

export function Breadcrumbs({ label, color }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-[#888888] transition-colors hover:text-white">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#555555]">
          »
        </li>
        <li aria-current="page" className="font-medium" style={{ color }}>
          {label}
        </li>
      </ol>
    </nav>
  );
}
