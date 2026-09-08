# Vernon Laquindanum — Portfolio Design System

A portable design system reverse-engineered from the live site. The tokens below are
framework-agnostic — paste them into Claude Design, Figma variables, or any token
pipeline.

> **Platform note (updated).** The public site was re-platformed from React + Vite to
> **Astro** (`artifacts/portfolio-astro`) for crawlable, SEO/AEO-ready static HTML.
> Pages are static HTML with tiny inline progressive-enhancement scripts; React
> survives only as an island (`ContactPanel`, `client:visible`). The design language
> carried over intact — same tokens, scale, spacing — with the additions documented
> here. The original React app (`artifacts/portfolio`) is now untracked and used only
> as the **single source of truth for content data** (`src/content/services.ts`,
> `about.ts`), imported at build time.

## The site is now freelance-first

The structure was swapped: the **Services / freelance side lives at the root**, and the
**portfolio moved under `/portfolio`**.

| Side | Routes | Surface | Character |
|------|--------|---------|-----------|
| **Services** (default) | `/`, `/services`, `/about`, `/resources` | Light `#FFFFFF` | Tailwind token system, blue primary, slate CTAs, **per-offering accents** |
| **Portfolio** | `/portfolio`, `/portfolio/case-study/*` | Dark charcoal `#2E2E2E` | Hand-tuned hex grays, categorical accent palette, green brand highlight |

A persistent pill toggle (**Portfolio · Services**) swaps sides with a full-screen
**color-wipe** transition (now CSS + Astro, not Framer Motion — see §6).

---

## 1. Color

### 1.1 Services (light) — the primary side · `src/styles/global.css`

Defined as HSL custom properties. The shared global is now **light-only** — the dark
palette was dropped from it; the Portfolio side carries its charcoal values inline
(§1.3). Values are HSL triplets (wrap in `hsl()`); hex in parentheses.

| Token | Value | Use |
|-------|-------|-----|
| `background` | `0 0% 100%` (#FFFFFF) | Page ground |
| `foreground` | `222 47% 11%` (#0F172A) | Primary text |
| `card` | `0 0% 100%` | Card fill |
| `border` / `input` | `220 13% 91%` (#E5E7EB) | Hairlines, fields |
| `ring` | `221 83% 53%` (#2563EB) | Focus ring |
| `primary` | `221 83% 53%` (#2563EB) | Links, icons |
| `secondary` / `muted` / `accent` | `210 40% 96%` (#F1F5F9) | Fills, chips, quiet panels |
| `muted-foreground` | `215 16% 47%` (#64748B) | Secondary text |
| `destructive` | `0 84% 60%` (#EF4444) | Errors |

The slimmed token set dropped the React app's sidebar / chart / popover-border /
shadow-scale / elevate / opaque-button-border tokens. Radius scale is retained (§4).

**CTA buttons** use Tailwind **slate**, not the primary token:
`slate-900 #0F172A` (light hero / nav "Book a call") · `slate-700 #334155` (dark hero),
hover one step darker.

### 1.2 Services accent palette (NEW) — per-offering, light-mode 600-level

Each of the five core services owns a deeper (Tailwind-600) accent, applied through the
CSS custom property `--svc-accent` and tinted with `color-mix()` (see §5, Rail). These
are distinct from — and darker than — the Portfolio categorical palette, tuned for
contrast on white.

| Offering | Eyebrow | Accent |
|----------|---------|--------|
| Content Experience Audit | Diagnose the problem | `#9333EA` purple |
| Content Standards & Systems | Build rules to fix the problem | `#2563EB` blue |
| AI Content Design | Improve your AI outputs | `#0891B2` cyan |
| Onboarding & Activation Flow | Make a better first impression | `#CA8A04` yellow |
| Content Design Retainer | Get embedded content support | `#16A34A` green |

### 1.3 Portfolio (dark) — hand-tuned neutral ramp (inline hex)

**Surfaces**
| Token | Hex | Use |
|-------|-----|-----|
| `bg/base` | `#2E2E2E` | Page background |
| `bg/elevated` | `#242424` | Cards, detail panels, popovers |
| `bg/row-active` | `#383838` | Selected / hovered list rows |
| `bg/row-hover` | `#333333` | Subtle hover, menu items |
| `bg/popover` | `#3A3A3A` | Floating popover on dark |

**Text ramp** (high → low emphasis)
| Token | Hex | Use |
|-------|-----|-----|
| `text/primary` | `#FFFFFF` | Headings, key labels |
| `text/body` | `#CCCCCC` | Body copy, bullets |
| `text/secondary` | `#AAAAAA` | Hero subtitle, pill text |
| `text/tertiary` | `#999999` | Descriptions, inactive items |
| `text/meta` | `#888888` | Dates, tags, captions |
| `text/label` | `#777777` | Eyebrow / category labels |
| `text/faint` | `#555555` | Index numbers, empty states |

**Borders:** `border/subtle` `rgba(255,255,255,0.05)` · `border/divider` `#333333` ·
`border/pill` `#3A3A3A` · `border/strong` `#555555`.
**Brand accent:** `brand/green` `#22C55E` (logo hover, success, "copied" confirm).

### 1.4 Portfolio categorical accent palette

Each case study / experience / skill category owns an accent (thumbnails, icons, hover).

| Name | Hex | Tinted thumb bg |
|------|-----|-----------------|
| Blue | `#3B82F6` | `#1E3A5F` |
| Amber | `#F59E0B` | `#3A2A10` |
| Cyan | `#06B6D4` | `#0E3A42` |
| Green | `#22C55E` | `#1A3A2A` |
| Purple | `#A855F7` | `#2A1A3A` |
| Pink | `#EC4899` | `#3A1A2E` |

Tinted thumbnails are `accent` at ~10% over the dark base (`{accent}1A`).
**Proficiency scale** (skill dots, novice → advanced):
`#3B82F6` → `#22C55E` → `#EAB308` → `#F97316` → `#EF4444`.

---

## 2. Typography

**Families** — **Inter was replaced by a native system-font stack** so each visitor
renders in their OS UI font. Nothing is downloaded, so there is no web-font swap flash.

```
--app-font-sans:  system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Helvetica, Arial, sans-serif;
--app-font-serif: Georgia, serif;
--app-font-mono:  Menlo, monospace;   /* numbered indices, tabular-nums */
```

**Type scale** (as used, responsive `base / sm / lg`)
| Role | Size | Weight | Tracking | Notes |
|------|------|--------|----------|-------|
| Display / H1 | `40 / 56 / 64px` (Services) · `40 / 64 / 80px` (Portfolio) | 700 | `tracking-tight` | hero `leading-[1.05]` |
| Section H2 | `20 / 24px` | 600 | `tracking-tight` | `margin-bottom: 24px` |
| Panel title H3 | `24px` (`text-2xl`) service detail · `18px` (`text-lg`) elsewhere | 600–700 | `tracking-tight` | — |
| Stat number | `28 / 40px` | 700 | `tracking-tight` | `leading-none` |
| Eyebrow / label | `12px` | 600 | `tracking-wide`–`widest` | `uppercase`; accent-colored on service panels |
| Body large | `16 / 20px` | 400 | — | Hero subtitle, muted |
| Body | `15–17px` | 400 | — | `leading-relaxed`; service prose runs 15–17px |
| Body small | `14px` (`text-sm`) | 400–500 | — | Rows, meta, links |
| Meta / caption | `10–13px` | 400–600 | — | Tags, dates, "Soon" pill |

---

## 3. Spacing & layout

**Base unit:** `4px`.

| Token | Value | Use |
|-------|-------|-----|
| `container/max` | `1120px` | Content max width |
| `container/width` | `90%` | Fluid width, centered (`mx-auto`) |
| `page/padding` | `pt-6/8` top · `pb-12 sm:pb-20` bottom | Interior pages sit close under the sticky nav |
| `section/gap` | `56px` → `80px` (`mb-14 sm:mb-20`) | Between major sections |
| `heading/gap` | `24px` (`mb-6`) | Section heading → content |
| `nav/height` | `48px` (`h-12`) | Sticky header |
| `scroll-margin` | `96px` (`scroll-mt-24`) | Anchor offset under sticky nav |
| `rail/width` | `300px` (`lg:grid-cols-[300px_1fr]`, `gap-14`) | Master-detail left column |
| `rail/sticky-top` | `96px` (`lg:sticky lg:top-24`) | Sticky rail offset |

**Header:** sticky, `border-b`, translucent + `backdrop-blur` (`bg-background/80`).

---

## 4. Radius & elevation

**Radius** — base `--radius: 0.5rem`, scaled `sm .25 · md .375 · lg .5 · xl .75rem`.
| Component | Radius |
|-----------|--------|
| Buttons, badges, close-X | `rounded-md` (6px) |
| Nav items, CTAs, rail buttons (`rounded-r-lg`), list rows | `rounded-lg` (8px) |
| Cards, panels, info boxes | `rounded-xl` (12px) |
| **Case-study modal** | `rounded-2xl` (16px) |
| Pills, dots, toggle, avatars | `rounded-full` |

**Elevation.** The Astro global no longer ships the React app's `.hover-elevate`
overlay system or the theme-aware shadow scale. Current elevation is expressed through
**surface + border** (light: `border-border bg-card` / `bg-muted/40`; dark:
`#242424` + `border-white/5`), accent tint on interactive rails (§5), and `shadow-2xl`
reserved for the modal. *(Legacy: the React app used `--elevate-1/-2` translucent
`::after` overlays and a full `2xs→2xl` shadow ramp; retained there, not in Astro.)*

---

## 5. Components

### Master-detail rail (NEW) — Services page & Home offerings preview
The signature new pattern. A sticky left rail of jump-buttons drives a single visible
detail panel on the right; **every panel is rendered into the DOM** (crawlable) and JS
only toggles the `hidden` attribute. Deep-links via `/services#slug`.

- **Layout:** `grid lg:grid-cols-[300px_1fr] lg:gap-14`; rail `lg:sticky lg:top-24`.
- **Rail button:** `flex items-baseline gap-3 rounded-r-lg border-l-[3px] border-transparent px-4 py-3`,
  carrying its accent inline as `style="--svc-accent:{hex}"`, with a mono `01` index
  (`text-muted-foreground/50`) + `17px` title.
- **Accent tinting via `color-mix`** (the core mechanism):
  - hover: `background: color-mix(in srgb, var(--svc-accent) 6%, transparent)` (8% on Home)
  - active (`.is-active`): `border-left-color: var(--svc-accent)` +
    `color-mix(… 10%, transparent)`, index + title recolored to `--svc-accent`, weight 600.
- **Rail CTA card:** "Not sure what's right?" — `rounded-xl border bg-muted/40 p-4` +
  full-width `slate-900` button.

### Service detail panel (NEW)
Rendered per offering inside the rail's right column:
- Accent **eyebrow** (`text-xs font-semibold uppercase`, `color:{accent}`) + optional
  Case-study tag (top-right).
- `text-2xl font-bold tracking-tight` title, `17px` muted summary.
- **Timeline · Pricing** box: `rounded-xl border bg-muted/40 px-5 py-4`,
  `sm:grid-cols-[1fr_auto_1fr]` with a `w-px bg-border` divider.
- **What this solves · What the process is like** — 2-col.
- **What you get** — `sm:columns-2` checklist, accent `✓` marks (`break-inside-avoid`).
- **Best for · Not for** — 2-col, `border-t pt-5`.

### Case-study modal (NEW)
Opened from a "Case study" pill; content pre-rendered hidden in the DOM (crawlable),
JS toggles the overlay + locks body scroll; closes on backdrop / X / Escape.
- **Overlay:** `fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm`.
- **Dialog:** `rounded-2xl border bg-background shadow-2xl max-w-3xl max-h-[90vh]`,
  `role="dialog" aria-modal="true"`; sticky header (accent eyebrow + title + close-X),
  scrollable body = meta sidebar (Company / Role / Timeline / Scope) + Situation /
  Problem / What I did / Result, accent footer link.
- **Pending state:** `Case study` + a `Soon` pill (`rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase`).

### Top nav & mode toggle
Sticky `h-12`, `border-b bg-background/80 backdrop-blur`. Name (V.L. ↔ full) · divider ·
**mode toggle pill (Portfolio · Services)** · links **Services / Resources / About** ·
**Book a call** slate-900 CTA (Google Calendar booking). Mobile collapses links to a
hamburger. Toggle tabs carry `data-wipe-color` (`#2e2e2e` → Portfolio, `#ffffff` →
Services) driving the color-wipe (§6). Active link: `bg-muted text-foreground`.

### Breadcrumbs (NEW)
`Home » Services` — `flex items-center gap-2 text-sm`, `»` divider in
`text-muted-foreground/40`, current page `font-medium text-foreground`.

### Info card / additional-services card
`rounded-xl border border-border bg-card p-6` · `font-semibold` title · `text-sm muted` body.

### Button / badge / list row / stat / proficiency dots (carried over)
- **Buttons:** slate CTAs (above); `rounded-lg px-4 py-1.5/2 text-sm font-medium`.
- **Pills / tags:** `rounded-full border px-3 py-1 text-xs`, muted → accent/foreground on hover.
- **List row** (Portfolio work/experience/tools): `flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl`,
  `hover:bg-[#383838]`, `divide-y divide-[#333333]`, mono `01` index, tinted thumbnail,
  hover reveals description (grid-rows `0fr→1fr`) + accent `ArrowUpRight`.
- **Stat block:** `text-[28px] sm:text-[40px] font-bold tracking-tight leading-none` + muted label.
- **Proficiency dots:** three `w-2 h-2 rounded-full`; empty `#3A3A3A`; half = 50/50 linear-gradient.

---

## 6. Motion

- **Color-wipe side transition (NEW mechanism):** a fixed `#mode-wipe` overlay. Clicking
  a `data-mode-link` paints the destination side's `data-wipe-color`
  (`#2E2E2E` Portfolio ↔ `#FFFFFF` Services) and fades: overlay in `0.4s ease`, the new
  page reveals via `html.mode-wipe-in body { opacity }` over `0.5s ease`. Pure CSS +
  small inline script — replaces the React Framer-Motion overlay.
- **Rail / hover / disclosure:** `transition-colors` (~`0.2s`); accent tints animate via
  `color-mix`. Home offering swap `transition: all 0.2s ease`.
- **Row expand** (Portfolio): `grid-template-rows 0fr→1fr`, `0.3s ease-out`.
- **Modal:** show/hide toggle; backdrop `backdrop-blur-sm`.
- **Standard transitions:** `transition-colors duration-200`. Respect `prefers-reduced-motion`.

---

## 7. Design principles (observed)

1. **Freelance-first, portfolio as proof.** The Services side leads; the dark portfolio
   backs it up. One skeleton (container, scale, spacing, nav) spans both.
2. **Accent by variable, tint by `color-mix`.** Per-offering identity rides a single
   `--svc-accent` custom property; hover/active states are translucent mixes of it —
   never hardcoded tints.
3. **Crawlable first, interactive second.** Master-detail panels and modals render their
   full content into static HTML; JS only shows/hides. SEO/AEO drove the re-platform
   (JSON-LD `Service` + `BreadcrumbList` per offering).
4. **Neutral until touched.** Surfaces stay grayscale; color arrives on hover/selection.
5. **Quiet meta, loud headings.** A wide neutral text ramp keeps metadata recessive.
6. **Calm, reversible motion.** Short eased transitions; the side-swap wipe is the one
   orchestrated moment.
