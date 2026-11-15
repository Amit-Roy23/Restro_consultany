import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

type VideoSlotProps = {
  /** Video file (e.g. "/videos/showreel.mp4"). When missing, the fallback shows. */
  src?: string;
  poster?: ImageAsset;
  /** Rendered instead of the poster image when there is no video yet. */
  fallback?: ReactNode;
  sizes?: string;
  className?: string;
};

/**
 * Placeholder-friendly video: plays a muted, looping clip once a source is
 * set, and shows a still image (or custom fallback) until then.
 */
export function VideoSlot({
  src,
  poster,
  fallback,
  sizes = "100vw",
  className,
}: VideoSlotProps) {
  if (src) {
    return (
      <video
        className={cn("h-full w-full object-cover", className)}
        src={src}
        poster={poster?.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={poster?.alt}
      />
    );
  }

  if (fallback) return <div className={cn("h-full w-full", className)}>{fallback}</div>;
  if (!poster) return null;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
