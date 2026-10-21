"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Slide = { tag: string; title: string; desc: string };

type Props = {
  slides?: Slide[];
  tag?: string;
  title?: string;
  desc?: string;
  stats?: { num: string; label: string }[];
};

const FALLBACK: Slide[] = [];

export default function PageBanner({ slides = FALLBACK, tag, title, desc, stats }: Props) {
  const [idx, setIdx] = useState(0);
  const list = slides.length > 0 ? slides : [{ tag: tag ?? "", title, desc }];
  const cur = list[Math.min(idx, list.length - 1)];

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [list.length]);

  return (
    <section className="banner-deep text-white overflow-hidden">
      {/* 动效层 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 光斑 */}
        <div className="banner-orb banner-orb-a" />
        <div className="banner-orb banner-orb-b" />
        <div className="banner-orb banner-orb-c" />
        {/* 网格 */}
        <div className="banner-grid" />
        {/* 流光底线 */}
        <div className="banner-beam" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 h-[400px] flex flex-col justify-center">
        <p
          key={"tag" + idx}
          className="banner-rise text-[13px] tracking-[0.35em] text-[#BBD4FF] mb-5 inline-flex items-center gap-2.5 w-fit border border-white/20 bg-white/10 backdrop-blur-sm rounded-full px-5 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse" />
          {cur.tag || tag}
        </p>
        <h1
          key={"t" + idx}
          className="banner-rise text-4xl md:text-[52px] font-bold leading-[1.25] max-w-3xl"
          style={{ animationDelay: "90ms" }}
        >
          {cur.title}
        </h1>
        <p
          key={"d" + idx}
          className="banner-rise mt-6 text-white/70 max-w-2xl leading-loose text-base md:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          {cur.desc}
        </p>

        {stats && (
          <div className="mt-9 flex gap-x-10 gap-y-3 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{s.num}</span>
                <span className="text-sm text-white/55">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {list.length > 1 && (
          <div className="absolute bottom-10 left-4 md:left-0 flex gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={"切换到第" + (i + 1) + "屏"}
                className={
                  "h-1 rounded-full transition-all duration-500 " +
                  (i === idx ? "w-10 bg-gold-light" : "w-4 bg-white/30 hover:bg-white/50")
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { type Slide as BannerSlide };
