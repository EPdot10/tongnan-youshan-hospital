import Link from "next/link";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="paper-texture grid min-h-[60vh] place-items-center px-4 py-20 text-center">
      <div>
        <Mark className="mx-auto size-16" />
        <h1 className="mt-6 font-serif text-3xl font-bold text-jade-900">页面未找到</h1>
        <p className="mt-3 text-muted">您访问的页面不存在或正在建设中。</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-jade-700 px-6 py-2.5 font-semibold text-white hover:bg-jade-800">
          返回首页
        </Link>
      </div>
    </section>
  );
}
