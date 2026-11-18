import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { Container, Img, PageBanner } from "@/components/ui";
import { features } from "@/data/content";
import { getDept } from "@/data/departments";

export const metadata: Metadata = { title: "特色医疗", description: "中西医结合康复、PRP 富血小板血浆治疗、孕产全程服务、24 小时急诊。" };

export default function Featured() {
  return (
    <>
      <PageBanner title="特色医疗" en="Featured Care" image="cupping" desc="传统中医外治与现代医疗技术相结合。" crumbs={[{ label: "特色医疗" }]} />
      {features.map((f, n) => {
        const dept = f.dept ? getDept(f.dept) : undefined;
        return (
          <section key={f.slug} id={f.slug} className={n % 2 ? "paper-texture border-y border-line py-16" : "py-16"}>
            <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={n % 2 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-2xl shadow-lift">
                  <Img id={f.image} className="aspect-[4/3] w-full" />
                </div>
              </div>
              <div>
                <p className="font-serif text-5xl font-bold text-sun-500/30">0{n + 1}</p>
                <h2 className="mt-1 font-serif text-3xl font-bold text-jade-900">{f.title}</h2>
                <p className="mt-2 text-sun-600">{f.sub}</p>
                <div className="fret-line mt-4" />
                <div className="mt-6 space-y-4 text-[15px] text-ink-soft">
                  {f.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {f.points && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {f.points.map((pt) => (
                      <div key={pt.title} className="rounded-xl border border-line bg-white p-5">
                        <h3 className="font-semibold text-jade-800">{pt.title}</h3>
                        <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                          {pt.items.map((i) => (
                            <li key={i}>· {i}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {f.note && (
                  <p className="mt-5 flex gap-2 rounded-lg bg-sun-50 px-4 py-3 text-sm text-ink-soft">
                    <Info className="mt-0.5 size-4 shrink-0 text-sun-600" />
                    {f.note}
                  </p>
                )}
                {dept && (
                  <Link href={`/departments/${dept.slug}/`} className="mt-6 inline-flex rounded-full bg-jade-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-jade-800">
                    前往{dept.name} →
                  </Link>
                )}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
