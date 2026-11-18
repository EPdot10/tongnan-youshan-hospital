import Link from "next/link";
import type { Doctor } from "@/data/doctors";
import { departments } from "@/data/departments";
import { Avatar } from "./ui";

/** 医师卡片：圆形头像占位（院方提供标准照后替换）+ 职称 + 擅长 */
export function DoctorCard({ d, className }: { d: Doctor; className?: string }) {
  const dept = departments.find((x) => x.slug === d.dept)?.name;
  return (
    <Link
      href={`/doctors/${d.slug}/`}
      className={`group flex flex-col rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:border-jade-200 hover:shadow-lift ${className ?? ""}`}
    >
      <div className="flex items-center gap-4">
        <Avatar name={d.name} className="size-16 shrink-0 rounded-full text-[11px] ring-4 ring-jade-50" />
        <div className="min-w-0">
          <p className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-jade-900">{d.name}</span>
            <span className="text-sm text-sun-600">{d.title}</span>
          </p>
          <p className="truncate text-sm text-muted">
            {dept}
            {d.role ? ` · ${d.role}` : ""}
          </p>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 border-t border-line pt-4 text-sm text-ink-soft">
        <span className="font-medium text-jade-800">擅长：</span>
        {d.specialty.join("；")}
      </p>
      <span className="mt-auto pt-3 text-sm font-medium text-jade-700 group-hover:text-sun-600">查看详情 →</span>
    </Link>
  );
}
