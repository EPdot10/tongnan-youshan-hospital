import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "重庆潼南友善阳光中医医院", robots: { index: false, follow: false } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
