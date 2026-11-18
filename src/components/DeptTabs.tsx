"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { departments, groupLabels, type DeptGroup } from "@/data/departments";
import { Img } from "./ui";
import type { ImageId } from "@/data/images";

const groups: DeptGroup[] = ["clinical", "tcm", "tech"];
const techImages: Record<string, ImageId> = { 医学检验科: "lab-tubes", 医学影像科: "stethoscope", 麻醉科: "bed", 预防保健科: "doctor-desk" };

export function DeptTabs() {
  const [g, setG] = useState<DeptGroup>("clinical");
  const list = departments.filter((d) => d.group === g);

  return (
    <div>
      <div role="tablist" aria-label="科室分类" className="mb-8 flex justify-center gap-2">
        {groups.map((k) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={g === k}
            onClick={() => setG(k)}
            className={clsx(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              g === k ? "bg-jade-700 text-white shadow-card" : "bg-white text-ink-soft hover:text-jade-700",
            )}
          >
            {groupLabels[k]}
          </button>
        ))}
      </div>
      <div role="tabpanel" className={clsx("grid gap-5", list.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl")}>
        {(g === "tech"
          ? [departments.find((d) => d.slug === "yiji")!]
          : list
        ).flatMap((d) =>
          g === "tech"
            ? d.scope.map((s) => ({ key: s.title, title: s.title, text: s.items.join("、"), href: "/departments/yiji/", image: techImages[s.title] ?? d.image, tag: undefined as string | undefined }))
            : [{ key: d.slug, title: d.name, text: d.summary, href: `/departments/${d.slug}/`, image: d.image, tag: d.tag }],
        ).map((c) => (
          <Link key={c.key} href={c.href} className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Img id={c.image} className="size-full transition-transform duration-500 group-hover:scale-105" />
              {c.tag && (
                <span className="absolute top-3 left-3 rounded-full bg-sun-500 px-2.5 py-0.5 text-xs font-semibold text-jade-950">{c.tag}</span>
              )}
            </div>
            <div className="p-5">
              <h3 className="flex items-center justify-between font-serif text-lg font-bold text-jade-900">
                {c.title}
                <ArrowRight className="size-4 text-sun-500 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{c.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
