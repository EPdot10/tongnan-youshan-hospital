"use client";

import { useState } from "react";
import clsx from "clsx";
import { zones, getZone, type Floor, type Zone } from "@/data/navigator";

const toneFill: Record<NonNullable<Zone["tone"]>, string> = {
  emergency: "#fde2df",
  service: "#e1f2ef",
  clinic: "#ffffff",
  tech: "#eef0fb",
  pharmacy: "#fdf3dc",
  move: "#f1ede3",
};
const toneStroke: Record<NonNullable<Zone["tone"]>, string> = {
  emergency: "#e4867b",
  service: "#8cc9be",
  clinic: "#cfc7b4",
  tech: "#aab3e3",
  pharmacy: "#e9c27a",
  move: "#d6ccb6",
};

/**
 * 门诊楼楼层示意图。active = 当前步骤要去的区域（高亮 + 定位针）。
 * 用户点击某个区域可以查看说明；切换楼层用上方标签。
 */
export function FloorMap({ active, className }: { active?: string; className?: string }) {
  const activeZone = getZone(active);
  // 用户手动选的楼层 / 区域会在 active 变化时重置，保证跟随当前步骤
  const [manual, setManual] = useState<{ for?: string; floor?: Floor; picked?: string }>({});
  const isManual = manual.for === active;
  const floor: Floor = (isManual && manual.floor) || activeZone?.floor || "1F";
  const picked = getZone(isManual ? manual.picked : undefined) ?? (activeZone?.floor === floor ? activeZone : undefined);

  const list = zones.filter((z) => z.floor === floor);

  return (
    <div className={clsx("overflow-hidden rounded-2xl border border-line bg-white", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
        <p className="min-w-0 truncate text-sm font-semibold text-jade-900">门诊楼 · 楼层示意</p>
        <div role="tablist" aria-label="楼层" className="flex shrink-0 rounded-full bg-paper-deep p-0.5">
          {(["1F", "2F"] as Floor[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={floor === f}
              onClick={() => setManual({ for: active, floor: f })}
              className={clsx(
                "relative rounded-full px-3.5 py-1 text-sm font-semibold whitespace-nowrap transition-colors",
                floor === f ? "bg-jade-700 text-white" : "text-ink-soft",
              )}
            >
              {f === "1F" ? "一楼" : "二楼"}
              {activeZone?.floor === f && floor !== f && (
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-sun-500 ring-2 ring-white" aria-label="目标在此楼层" />
              )}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 360 250" className="block w-full bg-paper" role="group" aria-label={`${floor === "1F" ? "一楼" : "二楼"}平面示意图`}>
        {/* 走廊底色 */}
        <rect x="4" y="4" width="352" height="242" rx="10" fill="#f6f2e8" />
        {list.map((z) => {
          const on = z.id === activeZone?.id;
          const sel = z.id === picked?.id;
          const tone = z.tone ?? "clinic";
          return (
            <g
              key={z.id}
              role="button"
              tabIndex={0}
              aria-label={z.name}
              aria-pressed={sel}
              onClick={() => setManual({ for: active, floor, picked: z.id })}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setManual({ for: active, floor, picked: z.id })}
              className="cursor-pointer outline-none"
            >
              <rect
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="8"
                fill={on ? "#f0b452" : toneFill[tone]}
                stroke={on ? "#c97d14" : sel ? "#12695f" : toneStroke[tone]}
                strokeWidth={on || sel ? 2.5 : 1.2}
              />
              {on && (
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="8" fill="none" stroke="#e39a2d" strokeWidth="2" className="animate-map-pulse" />
              )}
              <text
                x={z.x + z.w / 2}
                y={z.y + z.h / 2 + 4}
                textAnchor="middle"
                fontSize={z.w < 90 ? 11 : 12.5}
                fontWeight={on ? 700 : 600}
                fill={on ? "#0a3b37" : tone === "emergency" ? "#a3261c" : "#1d2925"}
              >
                {z.short ?? z.name}
              </text>
            </g>
          );
        })}
        {/* 定位针 */}
        {activeZone && activeZone.floor === floor && (
          <g transform={`translate(${activeZone.x + activeZone.w - 14} ${activeZone.y + 4})`} pointerEvents="none">
            <path d="M8 0a8 8 0 0 1 8 8c0 6-8 14-8 14S0 14 0 8a8 8 0 0 1 8-8Z" fill="#c30d24" />
            <circle cx="8" cy="8" r="3" fill="#fff" />
          </g>
        )}
      </svg>

      <div className="min-h-[4.5rem] border-t border-line px-4 py-3 text-sm" aria-live="polite">
        {picked ? (
          <>
            <p className="font-semibold text-jade-900">
              {picked.floor === "1F" ? "一楼" : "二楼"} · {picked.name}
              {picked.id === activeZone?.id && <span className="ml-2 rounded bg-sun-100 px-1.5 py-0.5 text-xs font-medium text-sun-600">当前要去</span>}
            </p>
            <p className="mt-0.5 text-muted">{picked.desc}</p>
          </>
        ) : (
          <p className="text-muted">点击图上的区域查看说明。</p>
        )}
      </div>
      <p className="border-t border-dashed border-line bg-sun-50 px-4 py-2 text-[11px] text-sun-600">示意布局，仅供参考，实际位置以院内指示牌为准（待院方确认）。</p>
    </div>
  );
}
