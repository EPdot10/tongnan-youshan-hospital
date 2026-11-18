import Link from "next/link";
import { MapPin, Phone, Clock, QrCode } from "lucide-react";
import { friendLinks, hospital, hours } from "@/data/site";
import { Mark } from "./Logo";
import { V } from "./ui";

const columns = [
  {
    title: "走进医院",
    links: [
      { label: "医院概况", href: "/about/#intro" },
      { label: "发展历程", href: "/about/#history" },
      { label: "资质荣誉", href: "/about/#honors" },
      { label: "人才招聘", href: "/careers/" },
    ],
  },
  {
    title: "就医服务",
    links: [
      { label: "门诊时间", href: "/guide/#hours" },
      { label: "预约挂号", href: "/guide/#booking" },
      { label: "医保服务", href: "/guide/#insurance" },
      { label: "交通指引", href: "/guide/#traffic" },
    ],
  },
  {
    title: "诊疗科室",
    links: [
      { label: "科室导航", href: "/departments/" },
      { label: "医师团队", href: "/doctors/" },
      { label: "特色医疗", href: "/featured/" },
      { label: "新闻动态", href: "/news/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-jade-950 pb-20 text-jade-100 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.4fr_2fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <Mark className="size-12" />
            <div>
              <p className="font-serif text-lg font-bold text-white">{hospital.name}</p>
              <p className="text-xs text-jade-200">{hospital.slogan}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-sun-400" />
              <span>
                24 小时电话：<a href={hospital.phoneHref} className="font-semibold text-white hover:text-sun-400">{hospital.phone}</a>
              </span>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sun-400" />
              <span>{hospital.address}（{hospital.addressNote}）</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-sun-400" />
              <span>门诊 {hours.summer.am} / {hours.summer.pm}（夏令）· {hours.emergency}</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-sun-400">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex gap-6 lg:flex-col">
          <div className="text-center">
            <div className="grid size-28 place-items-center rounded-lg border border-dashed border-jade-500/60 bg-white/5">
              <QrCode className="size-10 text-jade-200/70" />
            </div>
            <p className="mt-2 text-xs">微信公众号</p>
            <p className="text-[11px] text-jade-200/70">二维码待提供</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-jade-200/80 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>友情链接：</span>
            {friendLinks.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-sun-400">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} {hospital.name}</span>
            <span>执业许可证登记号 {hospital.licenceNo}</span>
            <span><V v={hospital.icp} /></span>
          </div>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-5 text-[11px] text-jade-200/60 md:px-6">
          本站为演示版本，图片为免费图库示意图，内容待医院审定后正式发布。带虚线下划线的信息待院方确认。
        </p>
      </div>
    </footer>
  );
}
