"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * YouTube behind a click: nothing from YouTube loads (no cookies, no requests)
 * until the visitor presses play, then the privacy-enhanced embed starts.
 */
export function VideoPlayer({ id, poster, title, playLabel }: { id: string; poster: string; title: string; playLabel: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[28px] border border-white/8 bg-ground-2">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted poster, so nothing loads from YouTube before play */}
          <img
            src={poster}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 md:h-24 md:w-24">
            <Play className="ml-1 h-8 w-8 fill-current md:h-9 md:w-9" />
          </span>
        </button>
      )}
    </div>
  );
}
