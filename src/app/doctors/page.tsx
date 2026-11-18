import type { Metadata } from "next";
import { Container, PageBanner } from "@/components/ui";
import { DoctorGrid } from "@/components/DoctorGrid";

export const metadata: Metadata = { title: "医师团队", description: "妇产科、内科、儿科、康复针灸科、中医科、外科临床医师介绍。" };

export default function Doctors() {
  return (
    <>
      <PageBanner title="医师团队" en="Our Doctors" image="doctor-desk" desc="医术立院，仁心待人。出诊时间以医院公众号及挂号平台发布为准。" crumbs={[{ label: "医师团队" }]} />
      <Container className="py-14">
        <DoctorGrid />
      </Container>
    </>
  );
}
