import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, PageBanner, SectionTitle, V } from "@/components/ui";
import { campuses, hospital, hours } from "@/data/site";

export const metadata: Metadata = { title: "联系我们", description: `${hospital.name}地址、电话与三个院区位置。24 小时电话 ${hospital.phone}。` };

export default function Contact() {
  return (
    <>
      <PageBanner title="联系我们" en="Contact" image="hero-corridor" crumbs={[{ label: "联系我们" }]} />
      <Container className="py-14">
        <div className="grid gap-5 md:grid-cols-3">
          <a href={hospital.phoneHref} className="rounded-2xl bg-jade-800 p-6 text-white hover:bg-jade-700">
            <Phone className="size-7 text-sun-400" />
            <p className="mt-4 text-sm text-jade-200">24 小时服务热线</p>
            <p className="font-serif text-3xl font-bold text-sun-400">{hospital.phone}</p>
          </a>
          <div className="rounded-2xl border border-line bg-white p-6">
            <Clock className="size-7 text-sun-500" />
            <p className="mt-4 text-sm text-muted">门诊时间</p>
            <p className="text-sm text-ink-soft">夏令 {hours.summer.am}，{hours.summer.pm}</p>
            <p className="text-sm text-ink-soft">冬令 {hours.winter.am}，<V v={hours.winter.pm} /></p>
            <p className="mt-1 text-sm font-semibold text-jade-700">{hours.emergency}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <MessageCircle className="size-7 text-sun-500" />
            <p className="mt-4 text-sm text-muted">微信公众号 · 视频号 · 抖音</p>
            <p className="font-semibold text-jade-900">{hospital.wechat}</p>
          </div>
        </div>

        <div className="mt-14">
          <SectionTitle title="院区地址" en="Locations" />
          <div className="grid gap-5 md:grid-cols-3">
            {campuses.map((c) => (
              <div key={c.name} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <p className="font-serif text-xl font-bold text-jade-900">{c.name}</p>
                <p className="mt-3 flex gap-2 text-sm text-ink-soft"><MapPin className="mt-0.5 size-4 shrink-0 text-sun-500" />重庆市潼南区{c.address}</p>
                <p className="mt-2 text-sm text-muted">{c.role}</p>
                <a href={c.map} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 text-sm font-semibold text-jade-700 hover:text-sun-600">在高德地图中打开 →</a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            执业登记地址：重庆市潼南区梓潼街道办事处凉风垭桥南大道 289 号（以《医疗机构执业许可证》为准）。
          </p>
        </div>
      </Container>
    </>
  );
}
