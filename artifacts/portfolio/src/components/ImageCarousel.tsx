import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  interval?: number;
  label?: string;
}

export function ImageCarousel({ images, interval = 5000, label }: ImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labelId = useRef(`carousel-${Math.random().toString(36).slice(2, 8)}`).current;

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [prev, next],
  );

  // Auto-advance
  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setTimeout(next, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, interval, images.length, next]);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const el = new Image();
      el.src = img.src;
    });
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div
      className="my-6"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={label ? labelId : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {label && (
        <p id={labelId} className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-3">
          {label}
        </p>
      )}

      {/* Viewport */}
      <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a]" aria-live="off">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="w-full shrink-0 block"
              draggable={false}
              aria-hidden={i !== active}
            />
          ))}
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white/80 font-medium tabular-nums">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Dots + caption */}
      <div className="mt-3 flex flex-col items-center gap-2">
        {images.length > 1 && (
          <div className="flex gap-0.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="p-2 group"
                aria-label={`Go to image ${i + 1}`}
              >
                <span
                  className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                    i === active ? "bg-white" : "bg-[#555555] group-hover:bg-[#777777]"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
        {images[active].caption && (
          <p className="text-xs text-[#888888] leading-relaxed text-center">
            {images[active].caption}
          </p>
        )}
      </div>
    </div>
  );
}
