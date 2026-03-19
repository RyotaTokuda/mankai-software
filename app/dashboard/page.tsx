"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS, getRevenueSimulation, getOwnerTodos, type ProjectData, type TodoItem } from "./data";

const isProduction = process.env.NEXT_PUBLIC_STAGE === "production";

const statusColors = { live: "bg-emerald-500", review: "bg-blue-500", dev: "bg-orange-500", planned: "bg-gray-500" };
const priorityColors = { critical: "bg-red-500", high: "bg-orange-500", medium: "bg-yellow-500", low: "bg-gray-500" };
const priorityLabels = { critical: "今すぐ", high: "高", medium: "中", low: "低" };
const trendIcons = { up: "↑", down: "↓", flat: "→" };
const trendColors = { up: "text-emerald-400", down: "text-red-400", flat: "text-gray-500" };

type View = "overview" | "revenue" | "todos" | "simulation" | "suggestions";

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>("overview");

  if (isProduction) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Not found</p></div>;

  const sim = getRevenueSimulation();
  const ownerTodos = getOwnerTodos();
  const allSuggestions = PROJECTS.flatMap((p) => p.aiSuggestions.map((s) => ({ project: p.name, emoji: p.emoji, suggestion: s })));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">&larr; サイト</Link>
            <span className="text-gray-700">|</span>
            <h1 className="text-lg font-bold">Dev Dashboard</h1>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">DEV</span>
          </div>
          <div className="flex gap-1">
            {(["overview", "todos", "revenue", "simulation", "suggestions"] as View[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === v ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                {{ overview: "全体", todos: "やること", revenue: "収益", simulation: "試算", suggestions: "提案" }[v]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* サマリー */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <Card label="プロジェクト" value={`${PROJECTS.length}`} sub={`稼働中: ${PROJECTS.filter((p) => p.status === "live").length}`} />
          <Card label="月間目標" value={`¥${sim.totals.normal.toLocaleString()}`} sub="普通シナリオ" />
          <Card label="現在の月間売上" value={`¥${PROJECTS.reduce((s, p) => s + p.currentMonthly, 0).toLocaleString()}`} sub="全体" />
          <Card label="あなたのToDo" value={`${ownerTodos.length}件`} sub={`うち緊急: ${ownerTodos.filter((t) => t.priority === "critical").length}件`} />
          <Card label="AI提案" value={`${allSuggestions.length}件`} sub="" />
        </div>

        {/* ========== やること ========== */}
        {view === "todos" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">あなたがやること（優先順）</h2>
            <div className="space-y-2">
              {ownerTodos.map((t, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                  <span className={`shrink-0 text-xs text-white font-bold px-2 py-1 rounded ${priorityColors[t.priority]}`}>
                    {priorityLabels[t.priority]}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm">{t.task}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.emoji} {t.project}</div>
                    {t.blocked && <div className="text-xs text-red-400 mt-0.5">ブロッカー: {t.blocked}</div>}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-4">自動で実行されること</h2>
            <div className="space-y-2">
              {PROJECTS.flatMap((p) => p.todos.filter((t) => t.owner === "auto").map((t) => ({ ...t, project: p.name, emoji: p.emoji }))).map((t, i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-start gap-3 opacity-60">
                  <span className="shrink-0 text-xs text-gray-400 font-bold px-2 py-1 rounded bg-gray-800">自動</span>
                  <div>
                    <div className="text-sm text-gray-400">{t.task}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{t.emoji} {t.project}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 全体 ========== */}
        {view === "overview" && (
          <div className="space-y-3">
            {PROJECTS.map((p) => (
              <div key={p.id} onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full text-white mt-0.5 ${statusColors[p.status]}`}>{p.statusLabel}</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    普通: ¥{p.revenue.normal.toLocaleString()}/月
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${p.progress >= 80 ? "bg-emerald-500" : p.progress >= 50 ? "bg-orange-500" : "bg-gray-500"}`}
                      style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{p.progress}%</span>
                </div>

                {selectedId === p.id && <ProjectDetail p={p} />}
              </div>
            ))}
          </div>
        )}

        {/* ========== 収益 ========== */}
        {view === "revenue" && (
          <div className="space-y-4">
            {PROJECTS.filter((p) => p.monthlyTarget > 0).sort((a, b) => b.revenue.normal - a.revenue.normal).map((p) => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{p.emoji} {p.name}</span>
                  <span className="font-bold">¥{p.revenue.normal.toLocaleString()}/月</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">{p.revenueModel}</div>
                {p.pricing && <div className="text-xs text-gray-400 mb-1">設定: {p.pricing}</div>}
                {p.pricingFunnel && <div className="text-xs text-gray-500 bg-gray-800/50 rounded-lg p-2 mt-2">動線: {p.pricingFunnel}</div>}
                {p.retention && <div className="text-xs text-gray-500 mt-1">継続: {p.retention}</div>}
              </div>
            ))}
          </div>
        )}

        {/* ========== 試算 ========== */}
        {view === "simulation" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              全サービスリリース後の月間収入シミュレーション
            </h2>

            {/* 合計 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-red-950/30 border border-red-900/30 rounded-xl p-5 text-center">
                <div className="text-xs text-red-400 mb-1">だめ</div>
                <div className="text-2xl font-bold text-red-400">¥{sim.totals.bad.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">月間合計</div>
              </div>
              <div className="bg-yellow-950/30 border border-yellow-900/30 rounded-xl p-5 text-center">
                <div className="text-xs text-yellow-400 mb-1">普通</div>
                <div className="text-2xl font-bold text-yellow-400">¥{sim.totals.normal.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">月間合計</div>
              </div>
              <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-xl p-5 text-center">
                <div className="text-xs text-emerald-400 mb-1">良い</div>
                <div className="text-2xl font-bold text-emerald-400">¥{sim.totals.good.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">月間合計</div>
              </div>
            </div>

            {/* 内訳 */}
            <div className="space-y-3">
              {PROJECTS.sort((a, b) => b.revenue.normal - a.revenue.normal).map((p) => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm">{p.emoji} {p.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${statusColors[p.status]}`}>{p.statusLabel}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="text-xs text-red-400">だめ</div>
                      <div className="font-bold text-red-400">¥{p.revenue.bad.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-yellow-400">普通</div>
                      <div className="font-bold text-yellow-400">¥{p.revenue.normal.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-emerald-400">良い</div>
                      <div className="font-bold text-emerald-400">¥{p.revenue.good.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="text-red-300/60"><span className="text-red-400">だめ:</span> {p.revenue.badNote}</div>
                    <div className="text-yellow-300/60"><span className="text-yellow-400">普通:</span> {p.revenue.normalNote}</div>
                    <div className="text-emerald-300/60"><span className="text-emerald-400">良い:</span> {p.revenue.goodNote}</div>
                  </div>
                  {/* 競合 */}
                  {p.competitors.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <div className="text-xs text-gray-500 mb-1">競合:</div>
                      {p.competitors.map((c, i) => (
                        <div key={i} className="text-xs text-gray-500">{c.name} — {c.users} — {c.pricing}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 提案 ========== */}
        {view === "suggestions" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">AI提案 — 検討すべきこと</h2>
            {allSuggestions.map((s, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3">
                <span className="text-xl shrink-0">{s.emoji}</span>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{s.project}</div>
                  <div className="text-sm text-gray-300">{s.suggestion}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================
// サブコンポーネント
// ============================================================

function Card({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      {sub && <div className="text-xs text-gray-600 mt-0.5">{sub}</div>}
    </div>
  );
}

function ProjectDetail({ p }: { p: ProjectData }) {
  return (
    <div className="mt-5 pt-5 border-t border-gray-800 space-y-4">
      {p.pricing && <Section title="課金設定" content={p.pricing} />}
      {p.pricingFunnel && <Section title="課金動線" content={p.pricingFunnel} />}
      {p.retention && <Section title="継続率の維持" content={p.retention} />}

      {p.metrics.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">メトリクス</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {p.metrics.map((m, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500">{m.label}</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{m.value}</span>
                  {m.trend && <span className={`text-xs ${trendColors[m.trend]}`}>{trendIcons[m.trend]}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.weakPoints.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">弱点</h4>
          <ul className="space-y-1">
            {p.weakPoints.map((w, i) => <li key={i} className="text-xs text-red-300/80 flex gap-2"><span className="text-red-500 shrink-0">!</span>{w}</li>)}
          </ul>
        </div>
      )}

      {p.todos.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-blue-400 uppercase mb-2">残タスク</h4>
          <ul className="space-y-1">
            {p.todos.map((t, i) => (
              <li key={i} className="text-xs flex gap-2 items-start">
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-white ${priorityColors[t.priority]}`}>
                  {t.owner === "auto" ? "自動" : priorityLabels[t.priority]}
                </span>
                <span className={t.owner === "auto" ? "text-gray-500" : "text-blue-300/80"}>{t.task}</span>
                {t.blocked && <span className="text-red-400">(← {t.blocked})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{content}</p>
    </div>
  );
}
