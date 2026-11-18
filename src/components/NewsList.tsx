"use client";

import { useState } from "react";
import clsx from "clsx";
import { news, newsKinds, type NewsKind } from "@/data/content";

export function NewsList() {
  const [kind, setKind] = useState<NewsKind | "all">("all");
  const list = kind === "all" ? news : news.filter((n) => n.kind === kind);
  const tabs: (NewsKind | "all")[] = ["all", "news", "notice", "science"];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex gap-2" role="tablist" aria-label="栏目">
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
        {list.map((n) => (
          <li key={n.title} className="flex gap-5 rounded-2xl border border-line bg-white p-5 md:p-6">
            <div className="w-20 shrink-0 border-r border-line pr-4 text-center">
              <p className="font-serif text-2xl leading-none font-bold text-jade-700">{n.date.length >= 7 ? n.date.slice(5) : n.date}</p>
              <p className="mt-1 text-xs text-muted">{n.date.length >= 7 ? n.date.slice(0, 4) : ""}</p>
            </div>
            <div className="min-w-0">
              <span className={clsx("rounded px-1.5 py-0.5 text-[11px]", n.kind === "science" ? "bg-jade-100 text-jade-800" : "bg-sun-100 text-sun-600")}>
                {newsKinds[n.kind]}
              </span>
              <h2 className="mt-2 font-serif text-lg font-bold text-jade-900">{n.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{n.summary}</p>
              <p className="mt-2 text-xs text-muted">{n.source ? `来源：${n.source}（全文待迁移）` : "示例科普稿，待院方审定"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
