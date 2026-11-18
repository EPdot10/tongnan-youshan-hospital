import type { Metadata } from "next";
import { Award, BadgeCheck, MapPin, Handshake } from "lucide-react";
import { Container, Img, PageBanner, SectionTitle, V } from "@/components/ui";
import { campuses, commercialInsurance, hospital, insurance, partners, stats } from "@/data/site";
import { equipment, history, honors, intro, qualifications } from "@/data/content";

export const metadata: Metadata = { title: "走进医院", description: `${hospital.name}医院概况、发展历程、资质荣誉、院区分布与医疗设备。` };

export default function About() {
  return (
    <>
      <PageBanner title="走进医院" en="About Us" image="building" desc={hospital.slogan} crumbs={[{ label: "走进医院" }]} />

      {/* 医院概况 */}
      <section id="intro" className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle title="医院概况" en="Overview" />
            <div className="space-y-4 text-[15px] text-ink-soft">
              {intro.map((p) => (
                <p key={p} className="indent-8">{p}</p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <Img id="hallway" className="aspect-[4/3] w-full" />
            </div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-2 py-4 text-center">
                  <dd className="font-serif text-2xl font-bold text-jade-700">
                    <V v={s.value} />
                    <span className="ml-0.5 text-xs font-normal text-muted">{s.unit}</span>
                  </dd>
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <table className="w-full overflow-hidden rounded-xl border border-line bg-white text-sm">
              <tbody className="divide-y divide-line">
                {[
                  ["机构名称", hospital.name],
                  ["原名称", hospital.formerName],
                  ["机构类别", hospital.level],
                  ["执业登记号", hospital.licenceNo],
                  ["许可证有效期", hospital.licenceValid],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <th className="w-28 bg-jade-50 px-4 py-2.5 text-left font-medium text-jade-800">{k}</th>
                    <td className="px-4 py-2.5 text-ink-soft">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 发展历程 */}
      <section id="history" className="paper-texture border-y border-line py-16 md:py-20">
        <Container>
          <SectionTitle title="发展历程" en="History" center />
          <ol className="relative mx-auto max-w-4xl">
            <span className="absolute top-0 bottom-0 left-4 w-px bg-jade-200 md:left-1/2" aria-hidden />
            {history.map((h, n) => (
              <li key={h.date + h.title} className="relative mb-8 pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
                <span className="absolute top-1.5 left-4 size-3.5 -translate-x-1/2 rounded-full border-[3px] border-white bg-sun-500 shadow md:left-1/2" />
                <div className={n % 2 ? "md:col-start-2" : "md:text-right"}>
                  <p className="font-serif text-2xl font-bold text-jade-700">{h.date}</p>
                  <h3 className="mt-1 font-semibold text-ink">{h.title}</h3>
                  {h.text && <p className="mt-1 text-sm text-muted">{h.text}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 资质荣誉 */}
      <section id="honors" className="py-16 md:py-20">
        <Container>
          <SectionTitle title="资质荣誉" en="Qualifications & Honors" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={BadgeCheck} title="医疗资质" items={qualifications} />
            <Card icon={Award} title="医保定点" items={[...insurance, ...commercialInsurance]} />
            <Card icon={Handshake} title="技术指导医院" items={partners} />
            <Card icon={Award} title="所获荣誉" items={honors} highlight />
          </div>
        </Container>
      </section>

      {/* 院区分布 */}
      <section id="campus" className="bg-jade-900 py-16 md:py-20">
        <Container>
          <SectionTitle title="院区分布" en="Campuses" light />
          <div className="grid gap-5 md:grid-cols-3">
            {campuses.map((c, n) => (
              <div key={c.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-serif text-4xl font-bold text-sun-400/40">0{n + 1}</span>
                <h3 className="mt-2 font-serif text-xl font-bold text-white">{c.name}</h3>
                <p className="mt-3 flex gap-2 text-sm text-jade-100">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sun-400" />
                  {c.address}
                </p>
                <p className="mt-2 text-sm text-jade-200">{c.role}</p>
                <a href={c.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-sun-400 hover:text-white">
                  高德地图导航 →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 医疗设备 */}
      <section id="equipment" className="py-16 md:py-20">
        <Container>
          <SectionTitle title="医疗设备" en="Equipment" desc="设备品牌、型号与数量待院方补充。" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {equipment.map((g) => (
              <div key={g.group} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-serif font-bold text-jade-800">{g.group}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  {g.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-sun-500" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Card({ icon: Icon, title, items, highlight }: { icon: typeof Award; title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-2xl bg-sun-50 p-6 ring-1 ring-sun-100" : "rounded-2xl border border-line bg-white p-6"}>
      <span className={highlight ? "grid size-11 place-items-center rounded-xl bg-sun-500 text-white" : "grid size-11 place-items-center rounded-xl bg-jade-50 text-jade-700"}>
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-serif text-lg font-bold text-jade-900">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
