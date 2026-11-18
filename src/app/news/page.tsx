import type { Metadata } from "next";
import { Container, PageBanner } from "@/components/ui";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = { title: "新闻动态", description: "医院新闻、通知公告与健康科普。" };

export default function News() {
  return (
    <>
      <PageBanner title="新闻动态" en="News & Notices" image="wx-conf-hall" desc="医院新闻、通知公告与健康科普，更多内容请关注医院微信公众号。" crumbs={[{ label: "新闻动态" }]} />
      <Container className="py-14">
        <NewsList />
      </Container>
    </>
  );
}
