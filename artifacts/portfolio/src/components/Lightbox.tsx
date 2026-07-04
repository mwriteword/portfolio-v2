import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type LightboxImage = { src: string; alt: string };

// Single mounted overlay (see LightboxRoot). Any zoomable image calls openLightbox().
let setImage: ((img: LightboxImage | null) => void) | null = null;

export function openLightbox(src: string, alt: string) {
  setImage?.({ src, alt });
}

/** Mount once near the app root. Renders the enlarged-image overlay via a portal. */
export function LightboxRoot() {
  const [img, setImg] = useState<LightboxImage | null>(null);

  useEffect(() => {
    setImage = setImg;
    return () => {
      setImage = null;
    };
  }, []);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImg(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [img]);

  if (!img) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={() => setImg(null)}
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
    >
      <button
        type="button"
        onClick={() => setImg(null)}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={img.src}
        alt={img.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
      />
    </div>,
    document.body,
  );
}

interface ZoomableImageProps {
  src: string;
  alt: string;
  /** Classes applied to the <img> (e.g. sizing). */
  className?: string;
}

/**
 * Drop-in replacement for an <img> that opens the lightbox on click, with a
 * subtle grow-on-hover nudge signalling that it can be expanded.
 */
export function ZoomableImage({ src, alt, className = "" }: ZoomableImageProps) {
  return (
    <button
      type="button"
      onClick={() => openLightbox(src, alt)}
      aria-label={`Expand image: ${alt}`}
      className="group block w-full cursor-zoom-in overflow-hidden rounded-lg"
    >
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className={`w-full transition-transform duration-300 ease-out group-hover:scale-[1.03] ${className}`}
      />
    </button>
  );
}
