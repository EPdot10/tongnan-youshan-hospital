import Link from "next/link";
import clsx from "clsx";
import { hospital } from "@/data/site";

/** 示意标识：朝阳 + 叶片。院方提供正式院徽后替换本组件中的 <Mark />。 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="23" fill="#11684F" />
      <g stroke="#F0B452" strokeWidth="2.2" strokeLinecap="round">
        <line x1="24" y1="6" x2="24" y2="10" />
        <line x1="11.3" y1="11.3" x2="14.1" y2="14.1" />
        <line x1="36.7" y1="11.3" x2="33.9" y2="14.1" />
        <line x1="6" y1="24" x2="10" y2="24" />
        <line x1="42" y1="24" x2="38" y2="24" />
      </g>
      <circle cx="24" cy="24" r="8.5" fill="#F0B452" />
      <path d="M10 34c6-6 12-7.5 14-7.5S32 28 38 34c-4.5 4.5-9 6.5-14 6.5S14.5 38.5 10 34Z" fill="#FAF7F0" />
      <path d="M24 26.5c-1 4-1 9 0 14" stroke="#11684F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={clsx("flex items-center gap-3", className)} aria-label={`${hospital.name} 首页`}>
      <Mark className="size-11 shrink-0 md:size-12" />
      <span className="leading-tight">
        <span className={clsx("block font-serif text-lg font-bold tracking-wide md:text-[1.35rem]", light ? "text-white" : "text-jade-900")}>
          {hospital.name}
        </span>
        <span className={clsx("block text-[10px] tracking-[0.08em] md:text-[11px]", light ? "text-jade-200" : "text-muted")}>
          {hospital.pinyin}
        </span>
      </span>
    </Link>
  );
}
