import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { galleryBy } from "@/content/gallery";
import { galleryPage } from "@/content/pages";

/** Every supplied photo, grouped by category in a masonry layout. */
export function GalleryGrid() {
  const { number, label, title, sections } = galleryPage;

  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-paper py-24 text-background md:py-32"
    >
      <Container>
        <SectionLabel number={number} tone="light">
          {label}
        </SectionLabel>
        <h2 id="gallery-heading" className="mt-6 max-w-4xl text-5xl md:text-7xl">
          {title}
        </h2>

        {sections.map((section) => {
          const images = galleryBy(section.category);
          if (images.length === 0) return null;
          return (
            <div key={section.category} className="mt-20">
              <h3 className="flex items-baseline gap-4 border-t border-background/15 pt-6 text-3xl md:text-4xl">
                {section.title}
                <span className="font-sans text-sm text-ink-muted">{images.length}</span>
              </h3>
              <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
                {images.map((image) => (
                  <li key={image.src} className="mb-3 break-inside-avoid">
                    <figure className="overflow-hidden rounded-md bg-background/5">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                        className="h-auto w-full"
                      />
                      {image.brand && (
                        <figcaption className="px-3 py-2 text-xs text-ink-muted">
                          {image.brand}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
