"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { ChevronDown, Menu, Phone, X, Accessibility, Clock } from "lucide-react";
import { hospital, nav } from "@/data/site";
import { Logo } from "./Logo";

const subscribe = (cb: () => void) => {
  window.addEventListener("care-change", cb);
  return () => window.removeEventListener("care-change", cb);
};

/** 关怀版状态保存在 <html class="care">（首屏前由 layout 里的脚本恢复） */
function useCareMode() {
  const care = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("care"),
    () => false,
  );
  const toggle = () => {
    const next = !care;
    document.documentElement.classList.toggle("care", next);
    try {
      localStorage.setItem("care-mode", next ? "1" : "0");
    } catch {}
    window.dispatchEvent(new Event("care-change"));
  };
  return { care, toggle };
}

export function Header() {
  const pathname = usePathname();
  // 菜单记录打开时的页面，换页后自动视为关闭
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const { care, toggle } = useCareMode();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* 顶部通栏 */}
      <div className="bg-jade-900 text-[13px] text-jade-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 md:px-6">
          <p className="hidden items-center gap-1.5 sm:flex">
            <Clock className="size-3.5 text-sun-400" />
            急诊 24 小时应诊 · 节假日正常接诊
          </p>
          <p className="sm:hidden">{hospital.slogan}</p>
          <div className="flex items-center gap-4">
            <a href={hospital.phoneHref} className="hidden items-center gap-1.5 hover:text-white md:flex">
              <Phone className="size-3.5 text-sun-400" />
              24 小时电话 <strong className="font-semibold text-white">{hospital.phone}</strong>
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={care}
              className="flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-0.5 hover:bg-white/10"
            >
              <Accessibility className="size-3.5" />
              {care ? "标准版" : "关怀版"}
            </button>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6">
          <Logo />
          <a
            href={hospital.phoneHref}
            className="hidden items-center gap-3 rounded-xl border border-sun-100 bg-sun-50 px-4 py-2 lg:flex xl:hidden"
          >
            <Phone className="size-5 text-sun-600" />
            <span className="leading-tight">
              <span className="block text-xs text-muted">24 小时服务热线</span>
              <span className="block font-bold text-jade-900">{hospital.phone}</span>
            </span>
          </a>
          <nav aria-label="主导航" className="hidden xl:block">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-0.5 px-3 py-5 text-[15px] font-medium whitespace-nowrap transition-colors 2xl:px-4",
                      active(item.href) ? "text-jade-700" : "text-ink hover:text-jade-700",
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-3.5 opacity-50 transition-transform group-hover:rotate-180" />}
                  </Link>
                  <span
                    className={clsx(
                      "absolute inset-x-3 bottom-3 h-0.5 rounded-full bg-sun-500 transition-transform",
                      active(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                  {item.children && (
                    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-1 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="min-w-40 overflow-hidden rounded-xl border border-line bg-white py-2 shadow-lift">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block px-5 py-2 text-sm whitespace-nowrap text-ink-soft hover:bg-jade-50 hover:text-jade-700">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-lg text-jade-900 hover:bg-jade-50 xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="打开菜单"
            aria-expanded={open}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* 移动端菜单 */}
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="网站菜单">
          <div className="absolute inset-0 bg-jade-950/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-serif text-lg font-bold text-jade-900">网站导航</span>
              <button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-lg hover:bg-jade-50" aria-label="关闭菜单">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-3">
              {nav.map((item) => (
                <div key={item.href} className="border-b border-line/70 py-2.5">
                  <Link href={item.href} className={clsx("block py-1 text-base font-semibold", active(item.href) ? "text-jade-700" : "text-ink")}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 grid grid-cols-2 gap-x-3">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="py-1.5 text-sm text-muted hover:text-jade-700">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <a href={hospital.phoneHref} className="m-5 flex items-center justify-center gap-2 rounded-xl bg-jade-700 py-3 font-semibold text-white">
              <Phone className="size-5" /> 拨打 {hospital.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
