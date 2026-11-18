import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, Phone } from "lucide-react";
import { Avatar, Container, PageBanner } from "@/components/ui";
import { doctors, getDoctor } from "@/data/doctors";
import { getDept } from "@/data/departments";
import { hospital } from "@/data/site";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = getDoctor((await params).slug);
  return d ? { title: `${d.name} ${d.title}`, description: `${d.name}，${d.title}。擅长：${d.specialty.join("；")}` } : {};
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDoctor((await params).slug);
  if (!d) notFound();
  const dept = getDept(d.dept)!;
  const peers = doctors.filter((x) => x.dept === d.dept && x.slug !== d.slug);

  const block = (title: string, items?: string[]) =>
    items?.length ? (
      <section className="border-t border-line pt-6">
        <h2 className="font-serif text-lg font-bold text-jade-900">{title}</h2>
        <ul className="mt-3 space-y-2 text-[15px] text-ink-soft">
          {items.map((i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sun-500" />
              {i}
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  return (
    <>
      <PageBanner title={d.name} en={`${dept.name} · ${d.title}`} image={dept.image} crumbs={[{ label: "医师团队", href: "/doctors/" }, { label: d.name }]} />
      <Container className="grid gap-10 py-14 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <Avatar name={d.name} className="aspect-square w-full text-4xl" />
            <div className="p-6">
              <p className="font-serif text-2xl font-bold text-jade-900">{d.name}</p>
              <p className="mt-1 text-sun-600">{d.title}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">科室</dt><dd><Link href={`/departments/${dept.slug}/`} className="text-jade-700 hover:underline">{dept.name}</Link></dd></div>
                {d.role && <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">职务</dt><dd>{d.role}</dd></div>}
                {d.years && <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">从业</dt><dd>{d.years}</dd></div>}
              </dl>
              <div className="mt-5 rounded-xl bg-sun-50 p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-jade-900"><CalendarClock className="size-4 text-sun-600" />出诊时间</p>
                <p className="mt-1 text-muted">以医院公众号及挂号平台发布为准，或致电咨询。</p>
                <a href={hospital.phoneHref} className="mt-2 flex items-center gap-1.5 font-bold text-jade-800"><Phone className="size-4" />{hospital.phone}</a>
              </div>
              <p className="mt-4 text-xs text-muted">照片待提供</p>
            </div>
          </div>
        </aside>

        <article className="space-y-6">
          <section>
            <h2 className="font-serif text-lg font-bold text-jade-900">擅长领域</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {d.specialty.map((s) => (
                <span key={s} className="rounded-lg bg-jade-50 px-3 py-1.5 text-[15px] text-jade-900">{s}</span>
              ))}
            </div>
          </section>
          {block("代表技术", d.techniques)}
          {d.education && block("教育背景", [d.education])}
          {block("进修与执业经历", d.training)}
          {block("学术与荣誉", d.honors)}
          {block("社会任职", d.social)}

          {peers.length > 0 && (
            <section className="border-t border-line pt-6">
              <h2 className="font-serif text-lg font-bold text-jade-900">同科室医师</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {peers.map((p) => (
                  <Link key={p.slug} href={`/doctors/${p.slug}/`} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 hover:shadow-card">
                    <Avatar name={p.name} className="size-12 shrink-0 rounded-full text-[9px]" />
                    <span>
                      <span className="block font-semibold text-jade-900">{p.name}</span>
                      <span className="text-xs text-muted">{p.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </Container>
    </>
  );
}
