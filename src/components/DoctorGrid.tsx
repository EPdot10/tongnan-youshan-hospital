"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { Avatar } from "./ui";

export function DoctorGrid() {
  const [dept, setDept] = useState("all");
  const tabs = [{ slug: "all", name: "全部" }, ...departments.filter((d) => d.doctorSlugs.length)];
  const list = dept === "all" ? doctors : doctors.filter((d) => d.dept === dept);
  const deptName = (s: string) => departments.find((d) => d.slug === s)?.name;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="按科室筛选">
        {tabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={dept === t.slug}
            onClick={() => setDept(t.slug)}
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              dept === t.slug ? "bg-jade-700 text-white" : "border border-line bg-white text-ink-soft hover:border-jade-200 hover:text-jade-700",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d) => (
          <Link key={d.slug} href={`/doctors/${d.slug}/`} className="group overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lift">
            <Avatar name={d.name} className="aspect-[4/3] w-full text-2xl" />
            <div className="p-5">
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif text-xl font-bold text-jade-900">{d.name}</h2>
                <span className="text-sm text-sun-600">{d.title}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {deptName(d.dept)}
                {d.role ? ` · ${d.role}` : ""}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-ink-soft">擅长：{d.specialty.join("；")}</p>
              <span className="mt-4 inline-block text-sm font-medium text-jade-700 group-hover:text-sun-600">查看详情 →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
