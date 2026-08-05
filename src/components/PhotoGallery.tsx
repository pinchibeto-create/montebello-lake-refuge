import { useEffect, useState } from "react";
import type { Photo } from "@/lib/photos";
import { IconClose, IconChevron } from "@/components/Icons";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onClose, onIndexChange]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute right-4 top-4 rounded-full border border-border p-2 text-foreground transition hover:bg-foreground/10"
      >
        <IconClose className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index - 1 + photos.length) % photos.length);
        }}
        className="absolute left-2 rounded-full border border-border p-2 text-foreground transition hover:bg-foreground/10 md:left-6"
      >
        <IconChevron className="h-5 w-5 rotate-180" />
      </button>

      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.url}
          alt={photo.alt}
          className="mx-auto max-h-[78vh] w-auto rounded-sm object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-muted-foreground">
          {photo.alt}
        </figcaption>
      </figure>

      <button
        type="button"
        aria-label="Foto siguiente"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index + 1) % photos.length);
        }}
        className="absolute right-2 rounded-full border border-border p-2 text-foreground transition hover:bg-foreground/10 md:right-6"
      >
        <IconChevron className="h-5 w-5" />
      </button>
    </div>
  );
}

export function PhotoGrid({
  photos,
  className = "grid grid-cols-2 gap-3 md:grid-cols-4",
  aspect = "aspect-[4/3]",
}: {
  photos: Photo[];
  className?: string;
  aspect?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className={className}>
        {photos.map((p, i) => (
          <button
            key={p.url}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative ${aspect} overflow-hidden rounded-sm bg-forest`}
          >
            <img
              src={p.url}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-forest-deep/10 transition group-hover:bg-forest-deep/0" />
          </button>
        ))}
      </div>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
