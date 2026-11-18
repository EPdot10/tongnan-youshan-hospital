import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Img, PageBanner, SectionTitle } from "@/components/ui";
import { departments, groupLabels, type DeptGroup } from "@/data/departments";

export const metadata: Metadata = { title: "科室导航", description: "内科、外科、妇产科、儿科、康复针灸科、中医科及医技科室介绍。" };

export default function Departments() {
  const groups: DeptGroup[] = ["clinical", "tcm", "tech"];
  return (
    <>
      <PageBanner title="科室导航" en="Departments" image="consult" desc="按执业登记诊疗科目设置，临床、中医特色与医技科室协同诊疗。" crumbs={[{ label: "科室导航" }]} />
      {groups.map((g, n) => (
        <section key={g} className={n % 2 ? "paper-texture border-y border-line py-14" : "py-14"}>
          <Container>
            <SectionTitle title={groupLabels[g]} en={["Clinical", "Traditional Chinese Medicine", "Medical Technology"][n]} />
            <div className="grid gap-6 md:grid-cols-2">
              {departments
                .filter((d) => d.group === g)
                .map((d) => (
                  <Link key={d.slug} href={`/departments/${d.slug}/`} className="group grid overflow-hidden rounded-2xl border border-line bg-white transition-all hover:shadow-lift sm:grid-cols-[200px_1fr]">
                    <Img id={d.image} className="aspect-[16/9] size-full sm:aspect-auto" />
                    <div className="p-6">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl font-bold text-jade-900">{d.name}</h3>
                        {d.tag && <span className="rounded-full bg-sun-100 px-2 py-0.5 text-xs text-sun-600">{d.tag}</span>}
                      </div>
                      <p className="mt-2 text-sm text-muted">{d.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {d.scope.flatMap((s) => s.items).slice(0, 5).map((i) => (
                          <span key={i} className="rounded bg-jade-50 px-2 py-0.5 text-xs text-jade-800">{i}</span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-jade-700 group-hover:text-sun-600">
                        科室详情 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
