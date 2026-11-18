import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, Bus, Clock, CreditCard, MapPin, MessageCircle, Phone, Smartphone, Footprints } from "lucide-react";
import { Container, PageBanner, SectionTitle, V } from "@/components/ui";
import { campuses, commercialInsurance, hospital, hours, insurance } from "@/data/site";

export const metadata: Metadata = { title: "就医指南", description: "门诊时间、预约挂号、就诊流程、医保服务、住院须知与交通指引。" };

const process = [
  { t: "预约 / 挂号", d: "公众号、健康 160 平台、电话预约，或到院自助 / 窗口挂号" },
  { t: "分诊候诊", d: "按挂号科室到对应诊区候诊，留意叫号" },
  { t: "医生诊疗", d: "医生问诊，开具检查、检验或处方" },
  { t: "缴费检查", d: "缴费后按指引完成检查检验，医保可直接结算" },
  { t: "取药治疗", d: "到药房取药，或到治疗室接受治疗" },
  { t: "复诊随访", d: "挂号 3 天内同科室可免费复看结果 1 次" },
];

export default function Guide() {
  return (
    <>
      <PageBanner title="就医指南" en="Patient Guide" image="hero-corridor" desc="提前了解门诊时间与就诊流程，让看病更省心。" crumbs={[{ label: "就医指南" }]} />

      <nav className="sticky top-[65px] z-20 md:top-[73px] border-b border-line bg-white/95 backdrop-blur" aria-label="页面目录">
        <Container className="scrollbar-none flex gap-1 overflow-x-auto overscroll-x-contain py-2 text-sm">
          {[["hours", "门诊时间"], ["booking", "预约挂号"], ["process", "就诊流程"], ["insurance", "医保服务"], ["inpatient", "住院须知"], ["traffic", "交通指引"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-4 py-1.5 text-ink-soft hover:bg-jade-50 hover:text-jade-700">{label}</a>
          ))}
        </Container>
      </nav>

      <section id="hours" className="py-14">
        <Container>
          <SectionTitle title="门诊时间" en="Opening Hours" />
          <div className="grid gap-5 md:grid-cols-3">
            {[hours.summer, hours.winter].map((h) => (
              <div key={h.label} className="rounded-2xl border border-line bg-white p-6">
                <p className="flex items-center gap-2 font-semibold text-jade-900"><Clock className="size-5 text-sun-500" />{h.label}</p>
                <p className="mt-4 text-sm text-muted">上午</p>
                <p className="font-serif text-2xl font-bold text-jade-700">{h.am}</p>
                <p className="mt-3 text-sm text-muted">下午</p>
                <p className="font-serif text-2xl font-bold text-jade-700"><V v={h.pm} /></p>
              </div>
            ))}
            <div className="rounded-2xl bg-jade-800 p-6 text-white">
              <p className="flex items-center gap-2 font-semibold"><Phone className="size-5 text-sun-400" />急诊</p>
              <p className="mt-4 font-serif text-4xl font-bold text-sun-400">24 小时</p>
              <p className="mt-2 text-jade-100">{hours.holiday}</p>
              <a href={hospital.phoneHref} className="mt-4 block font-bold">{hospital.phone}</a>
            </div>
          </div>
        </Container>
      </section>

      <section id="booking" className="paper-texture border-y border-line py-14">
        <Container>
          <SectionTitle title="预约挂号" en="Booking" desc="请携带医保卡、身份证或医保电子凭证，实名挂号就诊。" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MessageCircle, t: "微信公众号", d: `微信搜索“${hospital.wechat}”，关注后在菜单中预约。` },
              { icon: Smartphone, t: "健康 160 平台", d: "在健康 160 App / 小程序搜索医院名称，选择科室与时段预约。" },
              { icon: Phone, t: "电话预约", d: `拨打 ${hospital.phone}，由工作人员协助预约。` },
              { icon: Footprints, t: "现场挂号", d: "到门诊综合院区挂号窗口办理。" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-white p-6 shadow-card">
                <span className="grid size-12 place-items-center rounded-xl bg-jade-50 text-jade-700"><x.icon className="size-6" /></span>
                <h3 className="mt-4 font-serif text-lg font-bold text-jade-900">{x.t}</h3>
                <p className="mt-2 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-sun-100 bg-sun-50 p-5 text-sm text-ink-soft">
            <p className="font-semibold text-jade-900">预约须知</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>预约挂号截止时间：上午 11:00；下午 14:00—16:00。</li>
              <li>挂号 3 天内（含当天）可在同一挂号科室免费复看结果 1 次。</li>
              <li>凭医保卡、身份证、医保电子凭证实名挂号就诊。</li>
            </ul>
          </div>
        </Container>
      </section>

      <section id="process" className="py-14">
        <Container>
          <SectionTitle title="就诊流程" en="Process" more={{ href: "/navigator/", label: "院内导航：每一步去哪" }} />
          <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {process.map((p, n) => (
              <li key={p.t} className="relative rounded-2xl border border-line bg-white p-5">
                <span className="grid size-9 place-items-center rounded-full bg-sun-500 font-bold text-jade-950">{n + 1}</span>
                <h3 className="mt-3 font-semibold text-jade-900">{p.t}</h3>
                <p className="mt-1 text-sm text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="insurance" className="bg-jade-900 py-14">
        <Container>
          <SectionTitle title="医保服务" en="Medical Insurance" light />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="flex items-center gap-2 font-semibold text-white"><CreditCard className="size-5 text-sun-400" />基本医保与生育保险</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {insurance.map((i) => (
                  <span key={i} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-jade-100">{i}</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-jade-200">外地参保患者可按规定办理异地就医备案后直接结算。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="flex items-center gap-2 font-semibold text-white"><CreditCard className="size-5 text-sun-400" />商业保险</p>
              <ul className="mt-4 space-y-2 text-sm text-jade-100">
                {commercialInsurance.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="inpatient" className="py-14">
        <Container>
          <SectionTitle title="住院须知" en="Inpatient" />
          <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 font-semibold text-jade-900"><BedDouble className="size-5 text-sun-500" />住院地点</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><strong className="text-jade-800">内科住院部：</strong>凉风垭金竹广场二楼（潼南第一中学旁）</li>
                <li><strong className="text-jade-800">中医康复病区：</strong>潼南大道辅路 · 富华阳光</li>
                <li><strong className="text-jade-800">其他科室：</strong>门诊综合院区</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-sun-400 bg-sun-50 p-6 text-sm text-ink-soft">
              <p className="font-semibold text-jade-900">入院、陪护、探视与出院结算细则</p>
              <p className="mt-2">此栏目待医院提供正式的住院须知后补充（入院手续、所需证件、陪护与探视时间、出院结算流程）。</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="traffic" className="paper-texture border-t border-line py-14">
        <Container>
          <SectionTitle title="交通指引" en="Getting Here" />
          <div className="grid gap-5 md:grid-cols-3">
            {campuses.map((c) => (
              <div key={c.name} className="rounded-2xl bg-white p-6 shadow-card">
                <p className="flex items-center gap-2 font-serif text-lg font-bold text-jade-900"><MapPin className="size-5 text-sun-500" />{c.name}</p>
                <p className="mt-2 text-sm text-ink-soft">{c.address}</p>
                <a href={c.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-jade-700 px-4 py-1.5 text-sm text-white hover:bg-jade-800">高德地图导航</a>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Bus className="size-4 text-sun-600" />
            门诊综合院区位于凉风垭人行天桥旁。公交线路与停车信息待补充，可<Link href="/contact/" className="text-jade-700 underline">联系我们</Link>咨询。
          </p>
        </Container>
      </section>
    </>
  );
}
