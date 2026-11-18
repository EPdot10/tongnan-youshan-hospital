"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageId } from "@/data/images";
import { Img } from "./ui";

const slides: { image: ImageId; kicker: string; title: string; sub: string; cta: { label: string; href: string }[] }[] = [
  {
    image: "hero-herbs",
    kicker: "二级中医（综合）医院",
    title: "传承岐黄 · 守护健康",
    sub: "以中医药为核心、中西医结合为特色，为潼南百姓提供预防、诊疗、康复一体化服务",
    cta: [
      { label: "走进医院", href: "/about/" },
      { label: "科室导航", href: "/departments/" },
    ],
  },
  {
    image: "hero-corridor",
    kicker: "急诊 24 小时 · 节假日不停诊",
    title: "随时有医生在",
    sub: "急诊 24 小时应诊，节假日各科室正常开诊，检查、治疗、手术照常开展",
    cta: [
      { label: "就医指南", href: "/guide/" },
      { label: "联系我们", href: "/contact/" },
    ],
  },
  {
    image: "acupuncture",
    kicker: "特色医疗",
    title: "中西医结合康复",
    sub: "针灸、推拿、小针刀与 PRP 再生治疗，专注颈肩腰腿痛与骨关节疾病",
    cta: [
      { label: "了解特色医疗", href: "/featured/" },
      { label: "医师团队", href: "/doctors/" },
    ],
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => window.clearInterval(t);
  }, [paused]);

  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);

  return (
    <section
      className="relative isolate h-[520px] overflow-hidden bg-jade-950 md:h-[600px]"
      aria-roledescription="carousel"
      aria-label="首页轮播"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, n) => (
        <div
          key={s.title}
          className={clsx("absolute inset-0 transition-opacity duration-1000", n === i ? "opacity-100" : "pointer-events-none opacity-0")}
          aria-hidden={n !== i}
        >
          <div className={clsx("absolute inset-0", n === i && "animate-slow-zoom")}>
            <Img id={s.image} priority={n === 0} className="size-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-jade-950/90 via-jade-950/60 to-jade-950/10" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-16 md:px-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sun-400/40 bg-sun-500/15 px-3 py-1 text-sm text-sun-400">
              <span className="size-1.5 rounded-full bg-sun-400" />
              {s.kicker}
            </p>
            <h2 className="mt-5 font-serif text-[2.1rem] leading-tight font-bold tracking-wide text-white md:text-6xl">
              {s.title.split(" · ").map((part, k) => (
                <span key={part} className="block sm:inline">
                  {k > 0 && <span className="mx-4 hidden text-sun-400 sm:inline">·</span>}
                  {part}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-xl text-base text-jade-100 md:text-lg">{s.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {s.cta.map((c, k) => (
                <Link
                  key={c.href}
                  href={c.href}
                  tabIndex={n === i ? 0 : -1}
                  className={clsx(
                    "rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
                    k === 0 ? "bg-sun-500 text-jade-950 hover:bg-sun-400" : "border border-white/40 text-white hover:bg-white/10",
                  )}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-24 z-10 mx-auto flex max-w-7xl items-center gap-3 px-4 md:bottom-28 md:px-6">
        <button type="button" onClick={() => go(-1)} aria-label="上一张" className="grid size-9 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10">
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-2">
          {slides.map((s, n) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setI(n)}
              aria-label={`第 ${n + 1} 张：${s.title}`}
              aria-current={n === i}
              className={clsx("h-1.5 rounded-full transition-all", n === i ? "w-8 bg-sun-400" : "w-3 bg-white/40 hover:bg-white/70")}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="下一张" className="grid size-9 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
