import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { Container, PageBanner } from "@/components/ui";
import { Navigator } from "@/components/Navigator";
import { otherSites, zones } from "@/data/navigator";

export const metadata: Metadata = {
  title: "院内导航",
  description: "门诊看病、急诊、检查检验、取药、住院、产检、体检、中医康复，一步一步告诉您在医院里该去哪里。",
};

export default function NavigatorPage() {
  return (
    <>
      <PageBanner
        title="院内导航"
        en="Wayfinding"
        image="hero-corridor"
        desc="挂号、看诊、检查、取药分别在哪？选择您要办的事，跟着步骤走。"
        crumbs={[{ label: "就医指南", href: "/guide/" }, { label: "院内导航" }]}
      />

      <Container className="pt-8 pb-36 md:pt-12 lg:pb-20">
        <Navigator />

        {/* 区域一览（文字版，方便老人阅读和搜索引擎） */}
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-serif text-xl font-bold text-jade-900">门诊楼区域一览</h2>
          <p className="mt-1 text-sm text-muted">示意布局，实际位置以院内指示牌为准（待院方确认）。</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {(["1F", "2F"] as const).map((f) => (
              <div key={f} className="rounded-2xl border border-line bg-white p-5">
                <p className="flex items-center gap-2 font-semibold text-jade-900">
                  <span className="grid size-8 place-items-center rounded-lg bg-jade-700 text-sm text-white">{f}</span>
                  {f === "1F" ? "一楼：急诊、窗口、医技、药房" : "二楼：门诊诊室、超声心电、妇产科"}
                </p>
                <ul className="mt-3 divide-y divide-line text-sm">
                  {zones
                    .filter((z) => z.floor === f && z.tone !== "move")
                    .map((z) => (
                      <li key={z.id} className="py-2">
                        <span className="font-medium text-ink">{z.name}</span>
                        <span className="text-muted"> — {z.desc}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-serif text-xl font-bold text-jade-900">其他院区</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {Object.values(otherSites).map((s) => (
              <div key={s.name} className="flex flex-col rounded-2xl border border-line bg-white p-5">
                <p className="font-semibold text-jade-900">{s.name}</p>
                <p className="mt-1 flex gap-1.5 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sun-500" />
                  {s.where}
                </p>
                <p className="mt-1 text-sm text-muted">{s.desc}</p>
                <a href={s.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-jade-700 px-4 py-2 text-sm font-semibold text-white">
                  <Navigation className="size-4" /> 高德地图导航
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            还有疑问？看看<Link href="/guide/" className="text-jade-700 underline">就医指南</Link>，或到一楼导诊服务台咨询。
          </p>
        </section>
      </Container>
    </>
  );
}
