import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import manifest from "@/data/image-manifest.json";
import { images, type ImageId } from "@/data/images";
import { isTbc, type Text } from "@/lib/tbc";

/** 显示一个可能“待确认”的值 */
export function V({ v }: { v: Text }) {
  if (!isTbc(v)) return <>{v}</>;
  return (
    <span className="tbc" title={v.note ?? "此项待院方确认"}>
      {v.value}
    </span>
  );
}

const local = manifest as Record<string, string>;

/** 图片：有本地文件就显示，没有则显示素雅的渐变占位（不引用外部图床） */
export function Img({
  id,
  className,
  priority,
  sizes,
}: {
  id: ImageId;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const meta = images.find((i) => i.id === id)!;
  const src = local[id];
  if (!src) {
    return (
      <div
        role="img"
        aria-label={meta.alt}
        className={clsx("bg-gradient-to-br from-jade-200 via-jade-100 to-sun-100", className)}
      />
    );
  }
  return (
    <img
      src={src}
      alt={meta.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={clsx("object-cover", className)}
    />
  );
}

/** 栏目标题：中文主标题 + 英文小字 + 装饰线 */
export function SectionTitle({
  title,
  en,
  desc,
  center,
  light,
  more,
}: {
  title: string;
  en?: string;
  desc?: string;
  center?: boolean;
  light?: boolean;
  more?: { href: string; label?: string };
}) {
  return (
    <div className={clsx("mb-8 flex gap-4 md:mb-10", center ? "flex-col items-center text-center" : "items-end justify-between")}>
      <div className={clsx(center && "flex flex-col items-center")}>
        {en && (
          <p className={clsx("text-xs font-semibold tracking-[0.25em] uppercase", light ? "text-sun-400" : "text-sun-600")}>{en}</p>
        )}
        <h2 className={clsx("mt-1 font-serif text-2xl font-bold md:text-[2rem]", light ? "text-white" : "text-jade-900")}>{title}</h2>
        <div className="fret-line mt-3" />
        {desc && <p className={clsx("mt-4 max-w-2xl text-[15px]", light ? "text-jade-100" : "text-muted")}>{desc}</p>}
      </div>
      {more && !center && (
        <Link
          href={more.href}
          className={clsx(
            "group inline-flex shrink-0 items-center gap-1 text-sm font-medium",
            light ? "text-sun-400 hover:text-white" : "text-jade-700 hover:text-sun-600",
          )}
        >
          {more.label ?? "查看更多"}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/** 内页顶部横幅 + 面包屑 */
export function PageBanner({
  title,
  en,
  desc,
  image,
  crumbs,
}: {
  title: string;
  en: string;
  desc?: string;
  image: ImageId;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-jade-900">
      <Img id={image} priority className="absolute inset-0 -z-10 size-full opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-jade-950/95 via-jade-900/80 to-jade-900/30" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-20">
        <p className="text-xs font-semibold tracking-[0.3em] text-sun-400 uppercase">{en}</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-jade-100">{desc}</p>}
      </div>
      <div className="border-t border-white/10 bg-jade-950/40">
        <nav aria-label="面包屑" className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-3 text-sm text-jade-100 md:px-6">
          <Link href="/" className="hover:text-sun-400">首页</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="size-3.5 opacity-60" />
              {c.href ? (
                <Link href={c.href} className="hover:text-sun-400">{c.label}</Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-7xl px-4 md:px-6", className)}>{children}</div>;
}

export function Chip({ children, tone = "jade" }: { children: React.ReactNode; tone?: "jade" | "sun" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "jade" ? "bg-jade-100 text-jade-800" : "bg-sun-100 text-sun-600",
      )}
    >
      {children}
    </span>
  );
}

/** 医师头像占位：姓氏 + 渐变底，等院方提供标准照后替换 */
export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={clsx(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br from-jade-700 to-jade-900 text-white",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full opacity-[0.12]">
        <circle cx="50" cy="118" r="48" fill="currentColor" />
        <circle cx="50" cy="44" r="22" fill="currentColor" />
      </svg>
      <span className="relative font-serif text-[2.5em] font-bold">{name.slice(0, 1)}</span>
    </div>
  );
}
