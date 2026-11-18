import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Route,
  ShieldCheck,
  MapPin,
  Stethoscope,
  Phone,
  ArrowRight,
  Award,
  Handshake,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { DeptTabs } from "@/components/DeptTabs";
import { DoctorCard } from "@/components/DoctorCard";
import { Container, Img, SectionTitle, V } from "@/components/ui";
import { hospital, hours, insurance, partners, stats } from "@/data/site";
import { doctors } from "@/data/doctors";
import { features, news, newsKinds } from "@/data/content";

const quick = [
  { icon: CalendarCheck, label: "预约挂号", sub: "公众号 · 电话 · 平台", href: "/guide/#booking" },
  { icon: Clock, label: "门诊时间", sub: "急诊 24 小时", href: "/guide/#hours" },
  { icon: Route, label: "就诊流程", sub: "一图看懂", href: "/guide/#process" },
  { icon: ShieldCheck, label: "医保服务", sub: "异地直接结算", href: "/guide/#insurance" },
  { icon: Stethoscope, label: "医师团队", sub: "按科室查找", href: "/doctors/" },
  { icon: MapPin, label: "交通指引", sub: "三个院区", href: "/guide/#traffic" },
];

const featuredNews = news.findIndex((n) => n.image === "wx-conf-hall");

export default function Home() {
  const team = doctors.slice(0, 8);

  return (
    <>
      <HeroCarousel />

      {/* 快捷服务 */}
      <Container className="relative z-10 -mt-16 md:-mt-20">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line shadow-lift md:grid-cols-6">
          {quick.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="group flex flex-col items-center gap-2 bg-white px-2 py-5 text-center transition-colors hover:bg-jade-700 md:py-7"
            >
              <span className="grid size-12 place-items-center rounded-full bg-jade-50 text-jade-700 transition-colors group-hover:bg-white/15 group-hover:text-sun-400">
                <q.icon className="size-6" />
              </span>
              <span className="font-semibold text-jade-900 group-hover:text-white">{q.label}</span>
              <span className="hidden text-xs text-muted group-hover:text-jade-100 sm:block">{q.sub}</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* 医院简介 */}
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <Img id="hero-corridor" className="aspect-[4/3] w-full" />
            </div>
            <div className="absolute -right-3 -bottom-6 hidden rounded-2xl bg-jade-800 p-5 text-white shadow-lift sm:block md:-right-6">
              <p className="font-serif text-4xl font-bold text-sun-400">2011</p>
              <p className="text-sm text-jade-100">扎根潼南，服务至今</p>
            </div>
          </div>
          <div>
            <SectionTitle title="走进友善阳光" en="About Us" />
            <p className="text-[15px] text-ink-soft">
              {hospital.name}（原{hospital.formerName}）是一家<strong className="text-jade-800">二级中医（综合）医院</strong>，以中医药为核心、中西医结合为特色。
              医院 2023 年由潼南区招商引资引进，历时两年多升级改造，2024 年经区卫生健康委员会核准为二级中医（综合）医院，是潼南区重点打造的中医特色医疗项目。
            </p>
            <p className="mt-4 text-[15px] text-ink-soft">
              现设门诊综合院区、中医康复病区、内科住院部三个院区，开设内科、外科、妇产科、儿科、康复针灸科、中医科等科室，实行无节假日接诊，急诊 24 小时值守。
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-3 py-4 text-center">
                  <dd className="font-serif text-2xl font-bold text-jade-700 md:text-3xl">
                    <V v={s.value} />
                    <span className="ml-0.5 text-sm font-normal text-muted">{s.unit}</span>
                  </dd>
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link href="/about/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-jade-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-jade-800">
              了解更多 <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 科室导航 */}
      <section className="paper-texture border-y border-line py-16 md:py-24">
        <Container>
          <SectionTitle title="科室导航" en="Departments" desc="临床、中医特色与医技科室，按执业登记诊疗科目设置" center />
          <DeptTabs />
        </Container>
      </section>

      {/* 特色医疗 */}
      <section className="bg-jade-900 py-16 md:py-24">
        <Container>
          <SectionTitle title="特色医疗" en="Featured Care" light more={{ href: "/featured/" }} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, n) => (
              <Link
                key={f.slug}
                href={`/featured/#${f.slug}`}
                className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl p-6"
              >
                <Img id={f.image} className="absolute inset-0 -z-10 size-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jade-950 via-jade-950/70 to-jade-950/10" />
                <span className="font-serif text-5xl font-bold text-sun-400/30">0{n + 1}</span>
                <h3 className="mt-2 font-serif text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-jade-100">{f.sub}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sun-400">
                  了解详情 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 医师团队 */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionTitle title="医师团队" en="Our Doctors" desc="多名医师曾在重庆医科大学附属医院、西南医院、重庆市急救中心等医院进修，多人兼任科室主任" more={{ href: "/doctors/", label: "全部医师" }} />
          <div className="scrollbar-none -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {team.map((d) => (
              <DoctorCard key={d.slug} d={d} className="w-72 shrink-0 snap-start md:w-auto" />
            ))}
          </div>
        </Container>
      </section>

      {/* 新闻动态 + 就医信息 */}
      <section className="paper-texture border-t border-line py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionTitle title="新闻动态" en="News" more={{ href: "/news/" }} />
            <a
              href={news[featuredNews].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate mb-4 flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl p-6"
            >
              <Img id={news[featuredNews].image!} className="absolute inset-0 -z-10 size-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jade-950/95 via-jade-950/50 to-transparent" />
              <span className="w-fit rounded bg-sun-500 px-2 py-0.5 text-xs font-semibold text-jade-950">{newsKinds[news[featuredNews].kind]}</span>
              <h3 className="mt-2 font-serif text-xl font-bold text-white md:text-2xl">{news[featuredNews].title}</h3>
              <p className="mt-1 line-clamp-1 text-sm text-jade-100">{news[featuredNews].summary}</p>
            </a>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {news.filter((_, i) => i !== featuredNews).slice(0, 4).map((n) => (
                <li key={n.title}>
                  <a href={n.url ?? "/news/"} target={n.url ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 px-5 py-3.5 hover:bg-jade-50">
                    <span className="w-14 shrink-0 text-center">
                      <span className="block font-serif text-lg leading-none font-bold text-jade-700">{n.date.slice(5)}</span>
                      <span className="text-[11px] text-muted">{n.date.slice(0, 4)}</span>
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      <span className="mr-2 rounded bg-sun-100 px-1.5 py-0.5 text-[11px] text-sun-600">{newsKinds[n.kind]}</span>
                      <span className="font-medium text-ink group-hover:text-jade-700">{n.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle title="就医信息" en="Visit" />
            <div className="overflow-hidden rounded-2xl bg-jade-800 text-white shadow-lift">
              <div className="p-6">
                <p className="text-sm text-jade-200">24 小时服务热线</p>
                <a href={hospital.phoneHref} className="mt-1 flex items-center gap-2 font-serif text-3xl font-bold text-sun-400">
                  <Phone className="size-6" /> {hospital.phone}
                </a>
              </div>
              <div className="space-y-4 bg-jade-900/60 p-6 text-sm">
                <div>
                  <p className="font-semibold text-white">门诊时间</p>
                  <p className="mt-1 text-jade-100">
                    {hours.summer.label}：{hours.summer.am}，{hours.summer.pm}
                  </p>
                  <p className="text-jade-100">
                    {hours.winter.label}：{hours.winter.am}，<V v={hours.winter.pm} />
                  </p>
                  <p className="mt-1 text-sun-400">{hours.emergency} · 节假日正常接诊</p>
                </div>
                <div>
                  <p className="font-semibold text-white">医院地址</p>
                  <p className="mt-1 text-jade-100">{hospital.address}</p>
                  <p className="text-jade-200">{hospital.addressNote}</p>
                </div>
                <Link href="/contact/" className="inline-flex items-center gap-1 font-medium text-sun-400 hover:text-white">
                  查看三个院区与路线 <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 医保定点与技术指导 */}
      <section className="border-t border-line bg-white py-12">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-jade-50 text-jade-700">
              <Award className="size-6" />
            </span>
            <div>
              <h3 className="font-semibold text-jade-900">医保定点 · 一站式结算</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {insurance.map((x) => (
                  <span key={x} className="rounded-full border border-jade-200 px-3 py-1 text-sm text-jade-800">{x}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun-50 text-sun-600">
              <Handshake className="size-6" />
            </span>
            <div>
              <h3 className="font-semibold text-jade-900">技术指导医院</h3>
              <ul className="mt-3 grid gap-1.5 text-sm text-ink-soft sm:grid-cols-2">
                {partners.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sun-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
