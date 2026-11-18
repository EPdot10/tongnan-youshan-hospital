import type { Metadata } from "next";
import { Briefcase, Phone } from "lucide-react";
import { Container, PageBanner } from "@/components/ui";
import { jobs } from "@/data/content";
import { hospital } from "@/data/site";

export const metadata: Metadata = { title: "人才招聘", description: "诚聘外科、超声、中医疼痛方向等医疗人才。" };

export default function Careers() {
  return (
    <>
      <PageBanner title="人才招聘" en="Careers" image="stethoscope" desc="诚邀有志于中医药与基层医疗事业的同仁加入。" crumbs={[{ label: "人才招聘" }]} />
      <Container className="max-w-4xl py-14">
        <ul className="space-y-4">
          {jobs.map((j) => (
            <li key={j.title} className="flex gap-4 rounded-2xl border border-line bg-white p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-jade-50 text-jade-700"><Briefcase className="size-6" /></span>
              <div>
                <h2 className="font-serif text-xl font-bold text-jade-900">{j.title}</h2>
                <p className="mt-1 text-ink-soft">{j.req}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl bg-sun-50 p-6 text-sm text-ink-soft">
          <p>岗位以医院人事部门最新发布为准。应聘请致电咨询：</p>
          <a href={hospital.phoneHref} className="mt-2 inline-flex items-center gap-2 font-bold text-jade-800"><Phone className="size-4" />{hospital.phone}</a>
        </div>
      </Container>
    </>
  );
}
