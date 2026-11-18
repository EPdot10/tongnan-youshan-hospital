import Link from "next/link";
import clsx from "clsx";
import { hospital } from "@/data/site";
import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

/** 医院院徽（院方提供的 Logo 描摹的矢量图）。tone="light" 用于深色背景。 */
export function Mark({ className, tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="院徽">
      <path fill={tone === "light" ? "#ffffff" : "#C30D24"} fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={clsx("flex min-w-0 items-center gap-2.5 sm:gap-3", className)} aria-label={`${hospital.name} 首页`}>
      <Mark tone={light ? "light" : "brand"} className="size-10 shrink-0 sm:size-11 md:size-12" />
      <span className="min-w-0 leading-tight">
        <span className={clsx("block font-serif text-[15px] font-bold whitespace-nowrap sm:text-lg sm:tracking-wide md:text-[1.35rem]", light ? "text-white" : "text-jade-900")}>
          {hospital.name}
        </span>
        <span className={clsx("hidden truncate text-[9px] tracking-[0.02em] sm:block md:text-[10px]", light ? "text-jade-200" : "text-muted")}>
          {hospital.pinyin}
        </span>
      </span>
    </Link>
  );
}
