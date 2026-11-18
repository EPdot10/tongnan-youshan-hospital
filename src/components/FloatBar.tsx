"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, CalendarCheck, MapPin, Phone, MessageCircle } from "lucide-react";
import { hospital } from "@/data/site";

/** 桌面端右侧悬浮栏 + 手机端底部快捷栏 */
export function FloatBar() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "group relative flex w-16 flex-col items-center gap-1 py-3 text-[11px] text-jade-100 transition-colors hover:bg-jade-700 hover:text-white";

  return (
    <>
      <div className="fixed top-1/2 right-0 z-30 hidden -translate-y-1/2 overflow-hidden rounded-l-xl bg-jade-800 shadow-lift md:block">
        <a href={hospital.phoneHref} className={item}>
          <Phone className="size-5 text-sun-400" />
          电话
          <span className="pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-lg bg-jade-900 px-3 py-2 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-lift transition-opacity group-hover:opacity-100">
            {hospital.phone}
          </span>
        </a>
        <Link href="/guide/#booking" className={item}>
          <CalendarCheck className="size-5 text-sun-400" />
          挂号
        </Link>
        <span className={item}>
          <MessageCircle className="size-5 text-sun-400" />
          公众号
          <span className="pointer-events-none absolute top-1/2 right-full mr-2 w-44 -translate-y-1/2 rounded-lg bg-white p-3 text-center text-xs text-ink opacity-0 shadow-lift transition-opacity group-hover:opacity-100">
            微信搜索
            <strong className="mt-1 block text-jade-800">{hospital.wechat}</strong>
          </span>
        </span>
        <Link href="/contact/" className={item}>
          <MapPin className="size-5 text-sun-400" />
          导航
        </Link>
        {showTop && (
          <button type="button" className={item} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp className="size-5" />
            顶部
          </button>
        )}
      </div>

      <nav aria-label="快捷服务" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-white/95 backdrop-blur md:hidden">
        <a href={hospital.phoneHref} className="flex flex-col items-center gap-0.5 py-2 text-xs text-jade-800">
          <Phone className="size-5" />
          一键拨号
        </a>
        <Link href="/guide/#booking" className="flex flex-col items-center gap-0.5 bg-jade-700 py-2 text-xs text-white">
          <CalendarCheck className="size-5" />
          预约挂号
        </Link>
        <Link href="/contact/" className="flex flex-col items-center gap-0.5 py-2 text-xs text-jade-800">
          <MapPin className="size-5" />
          到院导航
        </Link>
      </nav>
    </>
  );
}
