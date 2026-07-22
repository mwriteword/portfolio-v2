# Vernon Laquindanum — Portfolio Design System

A portable design system reverse-engineered from the portfolio site (`artifacts/portfolio`).
Built for React + Vite + Tailwind CSS v4 + shadcn/ui, but the tokens below are
framework-agnostic and can be pasted into Claude Design, Figma variables, or any
token pipeline.

The site runs **two coordinated themes** that share the same structure, type scale,
spacing, and components:

| Mode | Route | Surface | Character |
|------|-------|---------|-----------|
| **UX Portfolio** | `/` | Dark charcoal `#2E2E2E` | Hand-tuned hex grays, multi-color accent palette, green brand highlight |
| **Writing Services** | `/writing` | Light `#FFFFFF` | shadcn token system, blue primary, slate CTAs |

A persistent pill toggle swaps between them with a full-screen color-wipe transition.

---

## 1. Color

### 1.1 UX Portfolio (dark) — the primary theme

The dark theme is built from a hand-tuned neutral ramp (raw hex, not tokens).

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

**Borders & dividers**
| Token | Value | Use |
|-------|-------|-----|
| `border/subtle` | `rgba(255,255,255,0.05)` | Card & header borders |
| `border/divider` | `#333333` | Row dividers (`divide-y`) |
| `border/pill` | `#3A3A3A` | Pill / tag outlines, empty dots |
| `border/strong` | `#555555` | Popover inputs, emphasis |

**Brand accent**
| Token | Hex | Use |
|-------|-----|-----|
| `brand/green` | `#22C55E` | Logo hover, success, "copied" confirmation |

### 1.2 Writing Services (light) — shadcn token theme

Defined as HSL custom properties in `src/index.css`. Values shown as HSL triplets
(wrap in `hsl()`); hex equivalents in parentheses.

| Token | Light `:root` | Dark `.dark` |
|-------|---------------|--------------|
| `background` | `0 0% 100%` (#FFFFFF) | `222 47% 11%` (#0F172A) |
| `foreground` | `222 47% 11%` (#0F172A) | `210 40% 98%` (#F8FAFC) |
| `card` | `0 0% 100%` | `222 47% 13%` |
| `border` / `input` | `220 13% 91%` (#E5E7EB) | `217 33% 17%` (#1E293B) |
| `primary` | `221 83% 53%` (#2563EB) | `221 83% 65%` (#5B8DEF) |
| `primary-foreground` | `0 0% 100%` | `0 0% 100%` |
| `secondary` / `muted` / `accent` | `210 40% 96%` (#F1F5F9) | `217 33% 17%` |
| `muted-foreground` | `215 16% 47%` (#64748B) | `215 20% 65%` (#94A3B8) |
| `ring` | `221 83% 53%` | `221 83% 65%` |
| `destructive` | `0 84% 60%` (#EF4444) | `0 62% 50%` |

**CTA buttons** on both themes use Tailwind slate, not the primary token:
`slate-700 #334155` (dark hero) / `slate-900 #0F172A` (light hero), hover one step darker.

### 1.3 Multi-color accent palette (shared)

Each case study / experience entry / skill category owns an accent. Reused as a
categorical palette across thumbnails, icons, hover tints, and skill pills.

| Name | Hex | Tinted bg (case-study thumb) |
|------|-----|------------------------------|
| Blue | `#3B82F6` | `#1E3A5F` |
| Amber | `#F59E0B` | `#3A2A10` |
| Cyan | `#06B6D4` | `#0E3A42` |
| Green | `#22C55E` | `#1A3A2A` |
| Purple | `#A855F7` | `#2A1A3A` |
| Pink | `#EC4899` | `#3A1A2E` |

Tinted thumbnail backgrounds are ~`accent` at 10% over the dark base (`{accent}1A`).

**Proficiency scale** (sequential, novice → expert) — used for skill dots:
`#3B82F6` (novice) → `#22C55E` → `#EAB308` → `#F97316` → `#EF4444` (advanced).

---

## 2. Typography

**Families**
```
--font-sans:  'Inter', sans-serif;   /* loaded @ 400 500 600 700 */
--font-serif: Georgia, serif;
--font-mono:  Menlo, monospace;      /* index numbers, tabular-nums */
```

**Type scale** (as used, responsive `base / sm / lg`)
| Role | Size | Weight | Tracking | Notes |
|------|------|--------|----------|-------|
| Display / H1 | `40 / 64 / 80px` (UX) · `40 / 60 / 72px` (Writing) | 700 | `tracking-tight` | Writing hero `leading-[1.05]` |
| Section H2 | `20 / 24px` | 600 | `tracking-tight` | `margin-bottom: 24px` |
| Panel / card H3 | `18px` (`text-lg`) | 600 | — | — |
| Stat number | `28 / 40px` | 700 | `tracking-tight` | `leading-none` |
| Eyebrow / label | `12px` | 600 | `tracking-widest` (0.1em) | `uppercase` |
| Body large | `16 / 20px` | 400 | — | Hero subtitle, muted |
| Body | `16px` (`text-base`) | 400 | — | `leading-relaxed` |
| Body small | `14px` (`text-sm`) | 400–500 | — | Rows, bullets, links |
| Meta | `11–13px` | 400–500 | — | Tags, dates, captions |

---

## 3. Spacing & layout

**Base unit:** `4px` (`--spacing: 0.25rem`).

| Token | Value | Use |
|-------|-------|-----|
| `container/max` | `1120px` | Content max width |
| `container/width` | `90%` | Fluid width, centered (`mx-auto`) |
| `page/padding-y` | `48px` → `80px` (`py-12 sm:py-20`) | Top/bottom page padding |
| `section/gap` | `64px` → `80px` (`mb-16 sm:mb-20`) | Between major sections |
| `heading/gap` | `24px` (`mb-6`) | Section heading → content |
| `nav/height` | `48px` (`h-12`) | Fixed/sticky header |

**Header:** fixed (UX) / sticky (Writing), `border-b`, translucent bg + `backdrop-blur`
(`bg-[#2E2E2E]/80` or `bg-background/80`). A matching spacer offsets the fixed UX header.

---

## 4. Radius, shadow & elevation

**Radius** — base `--radius: 0.5rem`, scaled: `sm .25 · md .375 · lg .5 · xl .75rem`.
| Component | Radius |
|-----------|--------|
| Buttons, badges | `rounded-md` (6px) |
| Nav items, CTAs, list rows | `rounded-lg` (8px) |
| Cards, panels, popovers | `rounded-xl` (12px) |
| Pills, dots, avatars, toggle | `rounded-full` |

**Shadow scale** (`2xs → 2xl`) is theme-aware — soft black at low alpha in light
(`0 1px 3px rgba(0,0,0,.06)` …), deeper in dark (`… rgba(0,0,0,.30+)`). Full ramp in
`src/index.css`. Elevated cards typically ship shadowless on dark, relying on the
`#242424` surface + `border/subtle` instead.

**Interaction elevation** — a custom overlay system (`.hover-elevate`, `.active-elevate`,
`-2` variants) paints a translucent `::after` layer instead of changing background:
- `--elevate-1`: `rgba(0,0,0,.03)` light · `rgba(255,255,255,.04)` dark
- `--elevate-2`: `rgba(0,0,0,.08)` light · `rgba(255,255,255,.09)` dark

Opaque buttons also get a derived border one step darker/lighter than their fill
(`--opaque-button-border-intensity`: `-8` light, `+9` dark).

---

## 5. Components

### Button (shadcn cva) — `rounded-md text-sm font-medium`, sizes `min-h-9/8/10` + `icon 9×9`
| Variant | Style |
|---------|-------|
| `default` | `bg-primary` + primary-derived border, elevate on hover/active |
| `secondary` | `bg-secondary` + secondary border, no hover |
| `outline` | transparent fill, `--button-outline` border, `shadow-xs` |
| `ghost` | transparent border, elevate-only |
| `destructive` | `bg-destructive` |
| `link` | `text-primary`, underline on hover |

### Badge / Pill — `rounded-md border px-2.5 py-0.5 text-xs font-semibold`, `whitespace-nowrap`
Variants: `default` (primary) · `secondary` · `outline` (`--badge-outline` border) · `destructive`.
**Skill/tag pills** (custom): `rounded-full border px-3.5 py-1.5 text-sm`, neutral by
default, lighting to the category accent on hover with a slow (~1.5s) fade back.

### List row (case studies, experience, tools)
`flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl` · `hover:bg-[#383838]` ·
`divide-y divide-[#333333]` between rows · leading zero-padded mono index (`01`) ·
tinted thumbnail · title `text-sm font-medium` · hover reveals description (grid-rows
0fr→1fr) and an accent `ArrowUpRight`.

### Card / detail panel
`bg-[#242424] rounded-xl p-6 sm:p-8 border border-white/5` (dark) ·
`rounded-xl border border-border bg-card p-6 sm:p-8` (light).

### Proficiency dots
Row of three `w-2 h-2 rounded-full`; filled in scale color, `#3A3A3A` when empty,
half-states via `linear-gradient(to right, color 50%, #3A3A3A 50%)`.

### Mode toggle
`inline-flex rounded-full p-0.5` track (`bg-white/5` or `bg-black/5`), active tab
`bg-white text-[#1A1A1A]` (dark) / `bg-foreground text-background` (light),
`px-3 py-1 text-xs font-medium`.

### Popover (copy-email)
`rounded-lg border p-3 min-w-[280px]` on `#3A3A3A`/`card`, `shadow-xl`, green check +
readonly input + copy button.

### Stat block
Big number `text-[28px] sm:text-[40px] font-bold tracking-tight leading-none` over a
`text-xs sm:text-sm text-muted-foreground` label; 3-up grid.

---

## 6. Motion

- **Library:** Framer Motion; all motion respects `useReducedMotion()`.
- **Menu / dropdown:** fade + `y: -6`, `0.15s ease-out`. Slide-over panels `0.22s ease-in-out`.
- **Row expand:** `grid-template-rows 0fr→1fr`, `0.3s ease-out`; accordions animate `height:auto`.
- **Skill pill:** light instantly (`150ms`), fade back after `100ms` delay over `1500ms`.
- **Mode transition:** full-screen color overlay covers (`0.4s`) → route swaps hidden →
  reveals (`0.5s`), so the page reads as a color inversion between UX (`#2E2E2E`) and
  Writing (`#FFFFFF`).
- **Standard transitions:** `transition-colors duration-200`.

---

## 7. Design principles (observed)

1. **Two faces, one skeleton.** Dark UX and light Writing share layout, type scale,
   spacing, and components — only surface and accent language change.
2. **Neutral until touched.** Surfaces and pills stay grayscale; color arrives on
   hover/selection via the categorical accent palette.
3. **Elevation by overlay, not shadow.** Interaction is expressed with translucent
   `::after` layers and surface swaps rather than drop shadows.
4. **Quiet meta, loud headings.** A wide gray text ramp keeps metadata recessive so
   white headings and accents carry hierarchy.
5. **Progressive disclosure.** Rows, tools, and work lists reveal detail on hover /
   expand rather than showing everything at once.
6. **Motion is reversible and calm.** Short eased transitions, always gated on reduced-motion.
