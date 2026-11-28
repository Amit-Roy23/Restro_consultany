"use client";

import { Clock, Play, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { videoStories } from "@/content/videos";
import { useContent } from "@/i18n/LanguageProvider";
import { getLenis } from "@/lib/smoothScroll";
import { cn } from "@/lib/utils";

type StoryKey = keyof typeof videoStories;

/**
 * Founder and team videos: two large poster cards. With a video file set,
 * the card opens a full-screen player (sound on, controls); without one it
 * says "Video coming soon".
 */
export function VideoStories() {
  const { biz } = useContent();
  const { videos } = biz;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState<StoryKey | null>(null);

  const open = (key: StoryKey) => {
    if (!videoStories[key].src) return;
    setPlaying(key);
    getLenis()?.stop();
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const stories: { key: StoryKey; title: string; caption: string; className: string }[] =
    [
      {
        key: "founder",
        ...videos.founder,
        className: "lg:col-span-7 aspect-[4/5] md:aspect-[16/11]",
      },
      {
        key: "team",
        ...videos.team,
        className: "lg:col-span-5 aspect-[4/5] md:aspect-[16/11] lg:aspect-auto",
      },
    ];

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel tone="light">{videos.label}</SectionLabel>
            <TextReveal
              id="videos-heading"
              text={videos.title}
              className="mt-6 text-4xl md:text-6xl"
            />
          </div>
          <Reveal inView delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg text-ink-muted">{videos.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {stories.map((story, index) => {
            const { src, poster } = videoStories[story.key];
            return (
              <button
                key={story.key}
                type="button"
                onClick={() => open(story.key)}
                aria-disabled={!src}
                aria-label={`${story.title}${src ? ` — ${videos.play}` : ` — ${videos.comingSoon}`}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl text-left text-foreground shadow-[0_40px_80px_-40px_rgba(6,12,26,0.6)]",
                  src ? "cursor-pointer" : "cursor-default",
                  story.className,
                )}
              >
                <ImageReveal delay={index * 0.12} className="absolute inset-0">
                  <Image
                    src={poster.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </ImageReveal>
                <span className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Play button with a pulsing gold ring */}
                <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center md:size-24">
                  {src && (
                    <span className="absolute inset-0 rounded-full border border-gold/60 [animation-duration:2.4s] motion-safe:animate-ping" />
                  )}
                  <span
                    className={cn(
                      "relative grid size-full place-items-center rounded-full backdrop-blur-md transition-transform duration-500 group-hover:scale-110",
                      src
                        ? "bg-accent text-accent-foreground"
                        : "border border-foreground/30 bg-background/40 text-foreground/80",
                    )}
                  >
                    <Play className="ml-1 size-8 fill-current" aria-hidden="true" />
                  </span>
                </span>

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8">
                  {!src && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-background/50 px-3 py-1 text-xs font-medium text-gold backdrop-blur-md">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {videos.comingSoon}
                    </span>
                  )}
                  <span className="font-display text-2xl leading-tight font-semibold md:text-4xl">
                    {story.title}
                  </span>
                  <span className="max-w-md text-sm text-foreground/75 md:text-base">
                    {story.caption}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setPlaying(null);
          getLenis()?.start();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        data-lenis-prevent
        aria-label={playing ? videos[playing].title : undefined}
        className="lead-dialog m-auto w-[min(72rem,calc(100vw-1.5rem))] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {playing && videoStories[playing].src && (
          <div className="relative">
            <button
              type="button"
              onClick={close}
              aria-label={videos.close}
              className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <video
              key={playing}
              src={videoStories[playing].src}
              poster={videoStories[playing].poster.src}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full rounded-2xl bg-black"
            />
          </div>
        )}
      </dialog>
    </section>
  );
}
