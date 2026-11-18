import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { Avatar, Container, Img, PageBanner } from "@/components/ui";
import { departments, getDept, groupLabels } from "@/data/departments";
import { getDoctor } from "@/data/doctors";
import { hospital } from "@/data/site";

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = getDept((await params).slug);
  return d ? { title: d.name, description: d.summary } : {};
}

export default async function DeptPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDept((await params).slug);
  if (!d) notFound();
  const docs = d.doctorSlugs.map(getDoctor).filter((x) => !!x);

  return (
    <>
      <PageBanner title={d.name} en={groupLabels[d.group]} image={d.image} desc={d.summary} crumbs={[{ label: "科室导航", href: "/departments/" }, { label: d.name }]} />

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_300px]">
        <article>
          <h2 className="font-serif text-2xl font-bold text-jade-900">科室简介</h2>
          <div className="fret-line mt-3" />
          <div className="mt-6 space-y-4 text-[15px] text-ink-soft">
            {d.intro.map((p) => (
              <p key={p} className="indent-8">{p}</p>
            ))}
          </div>

          {d.facts && (
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {d.facts.map((f) => (
                <div key={f.label} className="bg-white px-3 py-4 text-center">
                  <dd className="font-serif text-xl font-bold text-jade-700">{f.value}</dd>
                  <dt className="mt-1 text-xs text-muted">{f.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <h2 className="mt-12 font-serif text-2xl font-bold text-jade-900">{d.slug === "yiji" ? "科室组成" : "诊疗范围"}</h2>
          <div className="fret-line mt-3" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {d.scope.map((s) => (
              <div key={s.title} className="rounded-xl border border-line bg-white p-5">
                <h3 className="font-semibold text-jade-800">{s.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <span key={i} className="rounded-md bg-jade-50 px-2.5 py-1 text-sm text-ink-soft">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {d.clinics && (
            <>
              <h2 className="mt-12 font-serif text-2xl font-bold text-jade-900">门诊与功能区</h2>
              <div className="fret-line mt-3" />
              <div className="mt-6 flex flex-wrap gap-2">
                {d.clinics.map((c) => (
                  <span key={c} className="rounded-full border border-jade-200 bg-white px-4 py-1.5 text-sm text-jade-800">{c}</span>
                ))}
              </div>
            </>
          )}

          {d.techniques && (
            <>
              <h2 className="mt-12 font-serif text-2xl font-bold text-jade-900">特色技术与项目</h2>
              <div className="fret-line mt-3" />
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {d.techniques.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 rounded-lg bg-sun-50 px-4 py-2.5 text-sm text-ink">
                    <span className="size-1.5 shrink-0 rounded-full bg-sun-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          {docs.length > 0 && (
            <>
              <h2 className="mt-12 font-serif text-2xl font-bold text-jade-900">科室医师</h2>
              <div className="fret-line mt-3" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc) => (
                  <Link key={doc.slug} href={`/doctors/${doc.slug}/`} className="group flex items-center gap-4 rounded-xl border border-line bg-white p-4 hover:border-jade-200 hover:shadow-card">
                    <Avatar name={doc.name} className="size-16 shrink-0 rounded-full text-[11px]" />
                    <div className="min-w-0">
                      <p className="font-serif text-lg font-bold text-jade-900 group-hover:text-jade-700">{doc.name}</p>
                      <p className="text-sm text-sun-600">{doc.title}</p>
                      {doc.role && <p className="truncate text-xs text-muted">{doc.role}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </article>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-2xl bg-jade-800 p-6 text-white">
            <p className="font-serif text-lg font-bold">预约与咨询</p>
            <p className="mt-2 text-sm text-jade-100">可通过医院微信公众号、健康 160 平台或电话预约。</p>
            <a href={hospital.phoneHref} className="mt-4 flex items-center gap-2 font-serif text-2xl font-bold text-sun-400">
              <Phone className="size-5" />
              {hospital.phone}
            </a>
            <Link href="/guide/#booking" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-sun-500 py-2.5 text-sm font-semibold text-jade-950 hover:bg-sun-400">
              <CalendarCheck className="size-4" /> 预约挂号指引
            </Link>
          </div>
          <nav className="rounded-2xl border border-line bg-white p-3" aria-label="其他科室">
            <p className="px-3 pt-2 pb-1 text-sm font-semibold text-jade-900">其他科室</p>
            {departments.filter((x) => x.slug !== d.slug).map((x) => (
              <Link key={x.slug} href={`/departments/${x.slug}/`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-jade-50 hover:text-jade-700">
                {x.name}
                <ArrowRight className="size-3.5 opacity-40" />
              </Link>
            ))}
          </nav>
          <div className="overflow-hidden rounded-2xl">
            <Img id={d.image} className="aspect-[4/3] w-full" />
          </div>
        </aside>
      </Container>
    </>
  );
}
