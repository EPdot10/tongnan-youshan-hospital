"use client";

import { useState } from "react";
import clsx from "clsx";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { DoctorCard } from "./DoctorCard";

export function DoctorGrid() {
  const [dept, setDept] = useState("all");
  const tabs = [{ slug: "all", name: "全部" }, ...departments.filter((d) => d.doctorSlugs.length)];
  const list = dept === "all" ? doctors : doctors.filter((d) => d.dept === dept);

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
          <DoctorCard key={d.slug} d={d} />
        ))}
      </div>
    </>
  );
}
