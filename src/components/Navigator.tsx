"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import {
  Stethoscope,
  Siren,
  FlaskConical,
  Pill,
  BedDouble,
  Baby,
  ClipboardList,
  Leaf,
  MapPin,
  Smartphone,
  Home,
  ChevronLeft,
  ChevronRight,
  Check,
  Backpack,
  Lightbulb,
  Phone,
  Navigation,
  RotateCcw,
} from "lucide-react";
import { flows, getZone, otherSites, type Flow, type Step } from "@/data/navigator";
import { hospital } from "@/data/site";
import { FloorMap } from "./FloorMap";

const icons = {
  stethoscope: Stethoscope,
  siren: Siren,
  flask: FlaskConical,
  pill: Pill,
  bed: BedDouble,
  baby: Baby,
  clipboard: ClipboardList,
  leaf: Leaf,
};

/** 步骤所在位置的文字描述 */
function where(step: Step) {
  const z = getZone(step.zone);
  if (z) return { label: `门诊楼${z.floor === "1F" ? "一楼" : "二楼"} · ${z.name}`, icon: MapPin };
  if (step.site === "online") return { label: "线上 / 电话", icon: Smartphone };
  if (step.site === "home") return { label: "出发前", icon: Home };
  if (step.site) return { label: `${otherSites[step.site].name} · ${otherSites[step.site].where}`, icon: Navigation };
  return null;
}

// 地址栏 #outpatient 这样的锚点决定当前场景，方便从其它页面直接跳到某个流程
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.slice(1);

export function Navigator() {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const flow: Flow = flows.find((f) => f.slug === hash) ?? flows[0];
  // 步骤进度按场景记忆：切换场景时自动从第一步开始
  const [progress, setProgress] = useState<{ flow: string; step: number }>({ flow: flow.slug, step: 0 });
  const stepIdx = progress.flow === flow.slug ? progress.step : 0;
  const step = flow.steps[stepIdx];
  const listRef = useRef<HTMLOListElement>(null);
  const userMoved = useRef(false);

  const pickFlow = (slug: string) => {
    history.replaceState(null, "", `#${slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    setProgress({ flow: slug, step: 0 });
    userMoved.current = true;
    document.getElementById("route")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goStep = (n: number) => {
    const next = Math.max(0, Math.min(flow.steps.length - 1, n));
    userMoved.current = true;
    setProgress({ flow: flow.slug, step: next });
  };

  // 切到某一步时，把这一步滚到可视区域（只在用户操作后）
  useEffect(() => {
    if (!userMoved.current) return;
    userMoved.current = false;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-step="${stepIdx}"]`);
    if (el && window.matchMedia("(max-width: 1023px)").matches) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stepIdx, flow.slug]);

  const last = stepIdx === flow.steps.length - 1;
  const loc = where(step);
  const siteInfo = step.site && step.site !== "online" && step.site !== "home" ? otherSites[step.site] : undefined;

  const mapCard = siteInfo ? (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="bg-jade-800 px-4 py-3 text-white">
        <p className="text-xs text-jade-200">这一步在另一个院区</p>
        <p className="font-serif text-lg font-bold">{siteInfo.name}</p>
      </div>
      <div className="space-y-3 p-4 text-sm">
        <p className="flex gap-2 text-ink-soft">
          <MapPin className="mt-0.5 size-4 shrink-0 text-sun-500" />
          {siteInfo.where}
        </p>
        <p className="text-muted">{siteInfo.desc}</p>
        <a href={siteInfo.map} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-jade-700 py-2.5 font-semibold text-white active:bg-jade-800">
          <Navigation className="size-4" /> 打开高德地图导航
        </a>
      </div>
    </div>
  ) : (
    <FloorMap active={step.zone ?? (step.site ? undefined : "entrance")} />
  );

  return (
    <div>
      {/* ① 选择要办的事 */}
      <section aria-labelledby="pick-title">
        <h2 id="pick-title" className="font-serif text-xl font-bold text-jade-900 md:text-2xl">
          您今天来医院办什么事？
        </h2>
        <p className="mt-1 text-sm text-muted">选一项，按步骤走就不会迷路。</p>
        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
          {flows.map((f) => {
            const Icon = icons[f.icon];
            const on = f.slug === flow.slug;
            return (
              <button
                key={f.slug}
                type="button"
                onClick={() => pickFlow(f.slug)}
                aria-pressed={on}
                className={clsx(
                  "flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-3 text-center transition-colors",
                  on
                    ? f.urgent
                      ? "border-cinnabar bg-cinnabar text-white shadow-card"
                      : "border-jade-700 bg-jade-700 text-white shadow-card"
                    : f.urgent
                      ? "border-[#f3c4bd] bg-[#fdf1ef] text-cinnabar active:bg-[#fbe2de]"
                      : "border-line bg-white text-jade-900 active:bg-jade-50",
                )}
              >
                <Icon className="size-6" />
                <span className="text-[13px] leading-tight font-semibold">{f.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ② 路线 */}
      <section id="route" className="mt-10 scroll-mt-24 lg:mt-12" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-sun-600">ROUTE · 共 {flow.steps.length} 步</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-jade-900">{flow.name}怎么走</h2>
            <p className="text-sm text-muted">{flow.sub}</p>
          </div>
          {stepIdx > 0 && (
            <button type="button" onClick={() => goStep(0)} className="flex items-center gap-1 text-sm text-jade-700">
              <RotateCcw className="size-3.5" /> 从头开始
            </button>
          )}
        </div>

        {flow.urgent && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-cinnabar p-4 text-white">
            <Siren className="size-8 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">{flow.note}</p>
              <div className="mt-2 flex gap-2">
                <a href="tel:120" className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-cinnabar">拨打 120</a>
                <a href={hospital.phoneHref} className="rounded-full border border-white/60 px-4 py-1.5 text-sm font-semibold">医院 {hospital.phone}</a>
              </div>
            </div>
          </div>
        )}
        {!flow.urgent && flow.note && <p className="mt-4 rounded-xl bg-sun-50 px-4 py-2.5 text-sm text-ink-soft">{flow.note}</p>}

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] [&>*]:min-w-0">
          <ol ref={listRef} className="relative">
            {flow.steps.map((s, n) => {
              const on = n === stepIdx;
              const done = n < stepIdx;
              const w = where(s);
              return (
                <li key={s.title} data-step={n} className="relative scroll-mt-28 pb-3 pl-10 last:pb-0 sm:pl-12">
                  {/* 竖线 */}
                  {n < flow.steps.length - 1 && (
                    <span className={clsx("absolute top-9 bottom-0 left-[15px] w-0.5 sm:left-[17px]", done ? "bg-jade-500" : "bg-line")} aria-hidden />
                  )}
                  <span
                    className={clsx(
                      "absolute top-1 left-0 grid size-8 place-items-center rounded-full text-sm font-bold ring-4 ring-paper sm:size-9",
                      on ? "bg-sun-500 text-jade-950" : done ? "bg-jade-600 text-white" : "border-2 border-line bg-white text-muted",
                    )}
                  >
                    {done ? <Check className="size-4" /> : n + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => goStep(n)}
                    aria-expanded={on}
                    className={clsx(
                      "w-full rounded-2xl border text-left transition-colors",
                      on ? "rounded-b-none border-b-0 border-sun-400 bg-white" : "border-transparent px-0 active:bg-paper-deep",
                    )}
                  >
                    <div className={clsx(on ? "px-4 pt-3" : "py-1.5 pr-2")}>
                      <p className={clsx("font-semibold", on ? "text-lg text-jade-900" : done ? "text-muted" : "text-ink")}>{s.title}</p>
                      {w && (
                        <p className={clsx("mt-0.5 flex items-center gap-1 text-xs", on ? "font-medium text-sun-600" : "text-muted")}>
                          <w.icon className="size-3.5 shrink-0" />
                          {w.label}
                        </p>
                      )}
                    </div>
                  </button>
                  {on && (
                    <div className="rounded-b-2xl border border-t-0 border-sun-400 bg-white px-4 pt-2 pb-4 shadow-card">
                      <p className="text-[15px] text-ink-soft">{s.detail}</p>
                      {s.bring && (
                        <p className="mt-3 flex gap-2 rounded-lg bg-jade-50 px-3 py-2 text-sm text-jade-900">
                          <Backpack className="mt-0.5 size-4 shrink-0 text-jade-700" />
                          <span>
                            <strong>带上：</strong>
                            {s.bring.join("、")}
                          </span>
                        </p>
                      )}
                      {s.tip && (
                        <p className="mt-2 flex gap-2 rounded-lg bg-sun-50 px-3 py-2 text-sm text-ink-soft">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-sun-600" />
                          {s.tip}
                        </p>
                      )}
                      {/* 手机端：地图就放在当前步骤里 */}
                      <div className="-mx-3 mt-4 sm:mx-0 lg:hidden">{mapCard}</div>
                      <div className="mt-4 hidden gap-2 lg:flex">
                        {stepIdx > 0 && (
                          <button type="button" onClick={() => goStep(stepIdx - 1)} className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:border-jade-200">
                            上一步
                          </button>
                        )}
                        {!last ? (
                          <button type="button" onClick={() => goStep(stepIdx + 1)} className="rounded-full bg-jade-700 px-5 py-2 text-sm font-semibold text-white hover:bg-jade-800">
                            完成，下一步 →
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-jade-50 px-4 py-2 text-sm font-semibold text-jade-800">
                            <Check className="size-4" /> 全部完成，祝您早日康复
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* 桌面端：地图固定在右侧 */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-3">
              {loc && (
                <p className="flex items-center gap-2 rounded-xl bg-jade-800 px-4 py-2.5 text-sm text-white">
                  <loc.icon className="size-4 text-sun-400" />
                  第 {stepIdx + 1} 步：{loc.label}
                </p>
              )}
              {mapCard}
            </div>
          </aside>
        </div>
      </section>

      {/* 手机端：底部“上一步 / 下一步”控制条（在快捷栏之上） */}
      <div className="fixed inset-x-0 bottom-[calc(3.6rem+env(safe-area-inset-bottom))] z-20 border-t border-line bg-white/95 px-3 py-2 backdrop-blur md:bottom-0 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-2">
          <button
            type="button"
            onClick={() => goStep(stepIdx - 1)}
            disabled={stepIdx === 0}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-jade-800 disabled:opacity-30"
            aria-label="上一步"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] text-muted">
              {flow.name} · 第 {stepIdx + 1}/{flow.steps.length} 步
            </p>
            <p className="truncate text-sm font-semibold text-jade-900">{step.title}</p>
            <div className="mx-auto mt-1 flex max-w-48 gap-1" aria-hidden>
              {flow.steps.map((s, n) => (
                <span key={s.title} className={clsx("h-1 flex-1 rounded-full", n <= stepIdx ? "bg-sun-500" : "bg-line")} />
              ))}
            </div>
          </div>
          {!last ? (
            <button type="button" onClick={() => goStep(stepIdx + 1)} className="flex h-11 shrink-0 items-center gap-1 rounded-full bg-jade-700 pr-3 pl-4 text-sm font-semibold text-white active:bg-jade-800">
              下一步 <ChevronRight className="size-4" />
            </button>
          ) : (
            <a href={hospital.phoneHref} className="flex h-11 shrink-0 items-center gap-1 rounded-full bg-sun-500 px-4 text-sm font-semibold text-jade-950">
              <Phone className="size-4" /> 咨询
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
