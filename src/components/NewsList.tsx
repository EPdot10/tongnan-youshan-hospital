"use client";

import { useState } from "react";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import { news, newsKinds, type NewsKind } from "@/data/content";
import { Img } from "./ui";

export function NewsList() {
  const [kind, setKind] = useState<NewsKind | "all">("all");
  const list = kind === "all" ? news : news.filter((n) => n.kind === kind);
  const tabs: (NewsKind | "all")[] = ["all", "news", "notice", "science"];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="栏目">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={kind === t}
            onClick={() => setKind(t)}
            className={clsx("rounded-full px-5 py-2 text-sm", kind === t ? "bg-jade-700 text-white" : "border border-line bg-white text-ink-soft hover:text-jade-700")}
          >
            {t === "all" ? "全部" : newsKinds[t]}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {list.map((n) => {
          const inner = (
            <>
              {n.image ? (
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-auto sm:h-32 sm:w-48">
                  <Img id={n.image} className="size-full transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="hidden h-32 w-48 shrink-0 flex-col items-center justify-center rounded-xl bg-jade-50 sm:flex">
                  <p className="font-serif text-2xl font-bold text-jade-700">{n.date.slice(5)}</p>
                  <p className="text-xs text-muted">{n.date.slice(0, 4)}</p>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 text-xs">
                  <span className={clsx("rounded px-1.5 py-0.5", n.kind === "science" ? "bg-jade-100 text-jade-800" : "bg-sun-100 text-sun-600")}>
                    {newsKinds[n.kind]}
                  </span>
                  <time className="text-muted">{n.date}</time>
                </div>
                <h2 className="mt-2 font-serif text-lg font-bold text-jade-900 group-hover:text-jade-700">{n.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{n.summary}</p>
                {n.url && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-jade-700">
                    阅读公众号原文 <ExternalLink className="size-3" />
                  </span>
                )}
              </div>
            </>
          );
          const cls = "group flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 transition-shadow sm:flex-row sm:items-center md:p-5";
          return (
            <li key={n.title}>
              {n.url ? (
                <a href={n.url} target="_blank" rel="noopener noreferrer" className={clsx(cls, "hover:shadow-card")}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-center text-sm text-muted">更多内容请关注微信公众号「重庆潼南友善阳光中医医院」</p>
    </div>
  );
}
