import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatBar } from "@/components/FloatBar";
import { hospital } from "@/data/site";
import launch from "@/data/launch.json";

export const metadata: Metadata = {
  title: { default: `${hospital.name} | 二级中医（综合）医院 · 中西医结合`, template: `%s | ${hospital.name}` },
  description:
    "重庆潼南友善阳光中医医院（原潼南善友阳光医院），二级中医（综合）医院，以中医药为核心、中西医结合为特色。开设内科、外科、妇产科、儿科、康复针灸科、中医科。急诊 24 小时，医保定点，异地就医直接结算。电话 023-44819999。",
  keywords: ["潼南中医院", "友善阳光中医医院", "潼南医院", "潼南妇产科", "潼南针灸", "潼南康复", "善友阳光医院"],
  robots: launch.launched ? undefined : { index: false, follow: false },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#0a3b37", width: "device-width", initialScale: 1 };

const boot =
  // 旧版 Safari 补丁 + 关怀版在首屏前生效
  "(function(){var d=function(o,k,f){if(!o[k])Object.defineProperty(o,k,{value:f,writable:true,configurable:true})};d(Object,'hasOwn',function(o,k){return Object.prototype.hasOwnProperty.call(o,k)});var at=function(i){i=Math.trunc(i)||0;if(i<0)i+=this.length;return i<0||i>=this.length?undefined:this[i]};d(Array.prototype,'at',at);d(String.prototype,'at',at);try{if(localStorage.getItem('care-mode')==='1')document.documentElement.classList.add('care')}catch(e){}})()";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          跳到主要内容
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatBar />
      </body>
    </html>
  );
}
