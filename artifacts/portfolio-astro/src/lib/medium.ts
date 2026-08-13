// Build-time mirror of Vernon's Medium posts.
//
// Medium publishes a full RSS feed for every author at /feed/@handle. We fetch
// and parse it once, at build, and render the results as preview cards on the
// Resources page. Because it runs at build, the list refreshes whenever the site
// is rebuilt — so wiring a Vercel deploy hook to Medium (or a scheduled rebuild)
// makes newly published posts appear automatically, no code change needed.
//
// The parser is intentionally dependency-free: Medium's RSS is well-formed and
// uniform, so a handful of targeted regexes are enough. Every failure path
// returns [] so a flaky feed can never break the build.

export interface MediumPost {
  title: string;
  /** Canonical article URL, with Medium's rss tracking query stripped. */
  link: string;
  pubDate: Date;
  /** Plain-text excerpt lifted from the post body. */
  excerpt: string;
  /** First image in the post body, if any (used as the card thumbnail). */
  image?: string;
  /** Publication the post ran in (e.g. "Design Bootcamp"), if not self-published. */
  publication?: string;
  categories: string[];
}

const FEED_URL = "https://medium.com/feed/@vjtlaq";

/** Pull the first CDATA/plain value for a tag out of an <item> chunk. */
function tag(block: string, name: string): string | undefined {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const raw = block.match(re)?.[1];
  if (raw == null) return undefined;
  const cdata = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (cdata ? cdata[1] : raw).trim();
}

/** Strip tags/entities from an HTML fragment and collapse whitespace. */
function toText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;|&apos;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** "…design-bootcamp/the-solitaire…" → "Design Bootcamp". */
function publicationFrom(link: string): string | undefined {
  const m = link.match(/^https:\/\/medium\.com\/(?!@)([^/]+)\//);
  if (!m) return undefined;
  return m[1]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseItem(block: string): MediumPost | null {
  const title = tag(block, "title");
  const rawLink = tag(block, "link");
  const pub = tag(block, "pubDate");
  if (!title || !rawLink || !pub) return null;

  const link = rawLink.split("?")[0];
  const body = tag(block, "content:encoded") ?? "";
  const image = body.match(/<img[^>]+src="([^"]+)"/i)?.[1];

  // Build the excerpt from the post's paragraphs only, so image captions
  // (<figcaption>) and other chrome never lead the preview. Fall back to the
  // whole body if the post has no <p> tags.
  const paragraphs = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => toText(m[1]))
    .filter(Boolean);
  const excerptFull = paragraphs.length ? paragraphs.join(" ") : toText(body);
  const excerpt =
    excerptFull.length > 200 ? excerptFull.slice(0, 200).replace(/\s+\S*$/, "") + "…" : excerptFull;

  const categories = [...block.matchAll(/<category>([\s\S]*?)<\/category>/gi)]
    .map((m) => toText(m[1]))
    .filter(Boolean);

  return {
    title,
    link,
    pubDate: new Date(pub),
    excerpt,
    image,
    publication: publicationFrom(link),
    categories,
  };
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "wordsbyvern.com build (+https://wordsbyvern.com)" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
      .map((m) => parseItem(m[1]))
      .filter((p): p is MediumPost => p !== null)
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  } catch {
    // Network hiccup, timeout, or a malformed feed — never fail the build over it.
    return [];
  }
}
