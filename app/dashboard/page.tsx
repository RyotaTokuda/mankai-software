"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PROJECTS,
  getRevenueSimulation,
  getAllBlockers,
  getAllMilestones,
  getAllHealth,
  ANNUAL_FORECAST,
  GROWTH_LEVERS,
  type ProjectData,
  type KPI,
} from "./data";

const isProduction = process.env.NEXT_PUBLIC_STAGE === "production";

type View = "overview" | "blockers" | "kpi" | "timeline" | "revenue" | "system";

const viewLabels: Record<View, string> = {
  overview: "概況",
  blockers: "ブロッカー",
  kpi: "KPI",
  timeline: "タイムライン",
  revenue: "収益",
  system: "システム",
};

const statusColors: Record<string, string> = { live: "bg-emerald-500", review: "bg-blue-500", dev: "bg-orange-500", planned: "bg-gray-500" };
const healthDot: Record<string, string> = { healthy: "bg-emerald-500", warning: "bg-amber-500", error: "bg-red-500", unknown: "bg-gray-500" };

// 競合分析ハードコード
const competitorAnalysis: Record<string, Record<string, { strengths: string; weaknesses: string }>> = {
  "web-media-engine": {
    WEEL: { strengths: "法人向けコンサル導線が強固。専門ライター陣。ドメインパワーが高い", weaknesses: "個人ユーザー向けの比較記事が薄い。SEOロングテールを取りきれていない" },
    AIsmiley: { strengths: "500以上の製品DB。資料請求のリードジェネレーションが確立", weaknesses: "UIが古い。個別ツールの深掘りレビューが弱い" },
    マイベスト: { strengths: "圧倒的な記事数とドメインパワー。独自の検証体制", weaknesses: "AIツール特化ではない。更新頻度がカテゴリにより不均一" },
    "SHIFT AI TIMES": { strengths: "コミュニティ10万人。SNSでの拡散力が圧倒的", weaknesses: "SEOが弱い。検索流入に依存していない分、検索市場は空いている" },
  },
  "note-writer": {
    "note平均的クリエイター": { strengths: "数が多く、あらゆるジャンルをカバー", weaknesses: "継続率が低い。差別化できていない人が大半" },
    "note中堅層（継続発信）": { strengths: "固定ファンがいる。マガジン運営のノウハウがある", weaknesses: "AI活用が進んでいない。投稿頻度に限界がある" },
    "noteトップ1000": { strengths: "平均月126万円。ブランド力が確立", weaknesses: "参入障壁が高いように見えるが、ニッチ特化で狙える余地あり" },
  },
  "parking-reader": {
    "PPPark!": { strengths: "累計300万DL、★4.5。駐車場検索の定番アプリ", weaknesses: "料金表のAI解析機能はない。UI/UXが古めかしい" },
    akippa: { strengths: "450万会員。予約型で安定した収益モデル", weaknesses: "リアルタイムの料金比較ではない。コインパーキングに弱い" },
    タイムズ検索: { strengths: "業界最大手。自社データベースが豊富", weaknesses: "自社パーキングのみ。他社料金との比較ができない" },
  },
  shimedoki: {
    "Meeting Timer: Cost Tracking": { strengths: "コスト計算という同じコンセプト", weaknesses: "ユーザー数が少ない。Apple Watch対応が弱い" },
    "Time Timer": { strengths: "ブランド力。教育現場での実績", weaknesses: "会議コスト計算の機能がない。ビジネス用途に特化していない" },
    "Apple純正タイマー": { strengths: "プリインストール。全ユーザーが使える", weaknesses: "コスト計算機能なし。会議特化の機能がない" },
  },
  "done-log": {
    マイルーティン: { strengths: "300万DL。習慣トラッカーの定番", weaknesses: "ワンタップでの記録に特化していない。UIがやや複雑" },
    Streaks: { strengths: "Apple Design Award受賞。洗練されたUI", weaknesses: "買い切り$4.99で安いが、日本市場のローカライズが弱い" },
    Habitify: { strengths: "15万件のレビュー。多機能", weaknesses: "年$29.99は高い。シンプルさを求めるユーザーには過剰" },
  },
  "file-converter": {
    iLoveIMG: { strengths: "世界最大級。あらゆるフォーマットに対応", weaknesses: "サーバーにファイルをアップロードする必要がある。プライバシー懸念" },
    "heic2jpg.com": { strengths: "HEIC変換に特化。シンプル", weaknesses: "サーバー送信型。対応フォーマットが限定的" },
    "CopyTrans HEIC": { strengths: "デスクトップアプリで高速", weaknesses: "Windows限定。Webからはアクセスできない" },
  },
  "car-cost-sim": {
    自動車ランニングコスト: { strengths: "62,000車種のDB。網羅性が高い", weaknesses: "UIが古い。モバイル対応が不十分" },
    "高精度計算サイト(CASIO)": { strengths: "ブランド信頼性。計算精度", weaknesses: "車に特化していない。UXがエンジニア向け" },
    "ガリバー/楽天Car等の大手": { strengths: "SEO上位を独占。コンテンツ量が圧倒的", weaknesses: "シミュレーターとしての機能は薄い。記事中心" },
  },
  "home-stock": {
    zaico: { strengths: "18万社が利用。法人向けの実績", weaknesses: "個人向けUIではない。無料枠が200件と少ない" },
    うちメモ: { strengths: "家庭向けに特化。シンプル", weaknesses: "交換時期の通知機能がない。更新が止まっている" },
    monoca: { strengths: "デザインが良い。カテゴリ分けが柔軟", weaknesses: "消耗品の交換サイクル管理がない" },
  },
};

// 上振れ戦略ハードコード
const upsideStrategies: { project: string; emoji: string; strategies: { name: string; impact: string; timing: string }[] }[] = [
  {
    project: "Web Media Engine",
    emoji: "🔬",
    strategies: [
      { name: "特別単価交渉（freee等）", impact: "+¥15,000/月", timing: "2026年7月〜" },
      { name: "SNS x SEO相乗効果（X運用）", impact: "+¥10,000/月", timing: "2026年5月〜" },
      { name: "季節テーマ記事（確定申告シーズン）", impact: "+¥20,000/月", timing: "2027年1月〜3月" },
      { name: "計算ツール連携（車の維持費シミュレーター）", impact: "+¥8,000/月", timing: "2026年6月〜" },
    ],
  },
  {
    project: "NOTE Writer",
    emoji: "📝",
    strategies: [
      { name: "NOTEマガジン化（月額課金）", impact: "+¥5,000/月", timing: "2026年5月〜" },
      { name: "シリーズ記事（全10回等）", impact: "+¥3,000/月", timing: "2026年5月〜" },
      { name: "他クリエイターとのコラボ企画", impact: "+¥8,000/月", timing: "2026年7月〜" },
      { name: "メルマガ/LINE連携", impact: "+¥10,000/月", timing: "2026年8月〜" },
    ],
  },
];

export default function Dashboard() {
  const [view, setView] = useState<View>("overview");
  const [resolvedBlockers, setResolvedBlockers] = useState<Set<string>>(new Set());
  const [expandedBlockers, setExpandedBlockers] = useState<Set<string>>(new Set());
  const [expandedOverviewBlockers, setExpandedOverviewBlockers] = useState<Set<number>>(new Set());
  const [selectedKpiProject, setSelectedKpiProject] = useState(0);
  const [selectedRevenueProject, setSelectedRevenueProject] = useState(0);
  const [selectedCompetitorProject, setSelectedCompetitorProject] = useState(0);
  const [expandedCompetitors, setExpandedCompetitors] = useState<Set<string>>(new Set());
  const [showDoneMilestones, setShowDoneMilestones] = useState(false);
  const [expandedTodos, setExpandedTodos] = useState<Set<string>>(new Set());
  const [expandedLevers, setExpandedLevers] = useState<Set<string>>(new Set());

  if (isProduction) return <div className="min-h-screen flex items-center justify-center bg-gray-950"><p className="text-gray-400">Not found</p></div>;

  const sim = getRevenueSimulation();
  const allBlockers = getAllBlockers();
  const allMilestones = getAllMilestones();
  const allHealthItems = getAllHealth();
  const unresolvedBlockers = allBlockers.filter((b) => !resolvedBlockers.has(b.issue));
  const totalCurrentMonthly = PROJECTS.reduce((s, p) => s + p.currentMonthly, 0);
  const totalMonthlyTarget = PROJECTS.reduce((s, p) => s + p.monthlyTarget, 0);
  const healthyCount = allHealthItems.filter((h) => h.status === "healthy").length;
  const totalArticles = PROJECTS.reduce((s, p) => {
    const articleKpi = p.kpis.find((k) => k.label.includes("記事数") || k.label.includes("公開記事"));
    return s + (articleKpi ? articleKpi.actual : 0);
  }, 0);

  function toggleBlocker(issue: string) {
    setResolvedBlockers((prev) => {
      const next = new Set(prev);
      if (next.has(issue)) next.delete(issue); else next.add(issue);
      return next;
    });
  }

  function toggleExpandBlocker(issue: string) {
    setExpandedBlockers((prev) => {
      const next = new Set(prev);
      if (next.has(issue)) next.delete(issue); else next.add(issue);
      return next;
    });
  }

  function toggleOverviewBlocker(idx: number) {
    setExpandedOverviewBlockers((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  function toggleTodo(key: string) {
    setExpandedTodos((prev) => { const n = new Set(prev); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  }

  function toggleLever(key: string) {
    setExpandedLevers((prev) => { const n = new Set(prev); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  }

  function toggleCompetitor(name: string) {
    setExpandedCompetitors((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }

  function kpiRate(k: KPI): number {
    if (k.target === 0) return 0;
    return Math.round((k.actual / k.target) * 100);
  }

  function kpiBarColor(rate: number): string {
    if (rate < 30) return "bg-red-500";
    if (rate < 60) return "bg-orange-500";
    if (rate < 80) return "bg-yellow-500";
    return "bg-emerald-500";
  }

  function kpiTextColor(rate: number): string {
    if (rate < 30) return "text-red-400";
    if (rate < 60) return "text-orange-400";
    if (rate < 80) return "text-yellow-400";
    return "text-emerald-400";
  }

  function projectKpiAvg(p: ProjectData): number {
    const measurable = p.kpis.filter((k) => k.target > 0);
    if (measurable.length === 0) return 0;
    return Math.round(measurable.reduce((s, k) => s + kpiRate(k), 0) / measurable.length);
  }

  // グループ化: プロジェクト別ブロッカー
  const blockersByProject = PROJECTS.filter((p) => p.blockers.length > 0).map((p) => ({
    ...p,
    projectBlockers: p.blockers.map((b) => ({ ...b, project: p.name, emoji: p.emoji })),
  }));

  // 収益用プロジェクト（ロードマップあり）
  const revenueProjects = PROJECTS.filter((p) => p.revenueRoadmap.length > 0);

  // KPIありプロジェクト
  const kpiProjects = PROJECTS.filter((p) => p.kpis.length > 0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">&larr; サイト</Link>
            <span className="text-gray-700">|</span>
            <h1 className="text-lg font-bold">Dev Dashboard</h1>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">DEV</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(viewLabels) as View[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === v ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                {viewLabels[v]}
                {v === "blockers" && unresolvedBlockers.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unresolvedBlockers.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ================================================================
            1. 概況（Overview）
            ================================================================ */}
        {view === "overview" && (
          <div className="space-y-6">
            {/* 上段: 4サマリーカード */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">ブロッカー</div>
                <div className={`text-3xl font-bold ${unresolvedBlockers.length > 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {unresolvedBlockers.length}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{unresolvedBlockers.length > 0 ? "要対応" : "なし"}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">今月売上 / 目標</div>
                <div className="text-3xl font-bold text-gray-200">¥{totalCurrentMonthly.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-0.5">/ ¥{totalMonthlyTarget.toLocaleString()}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">システム正常率</div>
                <div className={`text-3xl font-bold ${healthyCount === allHealthItems.length ? "text-emerald-400" : "text-amber-400"}`}>
                  {allHealthItems.length > 0 ? `${Math.round((healthyCount / allHealthItems.length) * 100)}%` : "—"}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{healthyCount}/{allHealthItems.length} 正常</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">公開記事合計</div>
                <div className="text-3xl font-bold text-gray-200">{totalArticles}本</div>
                <div className="text-xs text-gray-600 mt-0.5">全プロジェクト</div>
              </div>
            </div>

            {/* 中段: プロジェクト行 */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">プロジェクト</h2>
              <div className="space-y-2">
                {PROJECTS.map((p) => {
                  const avg = projectKpiAvg(p);
                  const hasMeasurable = p.kpis.filter((k) => k.target > 0).length > 0;
                  const pBlockerCount = p.blockers.filter((b) => !resolvedBlockers.has(b.issue)).length;
                  return (
                    <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 flex items-center gap-4">
                      <span className="text-xl">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold truncate">{p.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${statusColors[p.status]}`}>{p.statusLabel}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">{p.phase}</div>
                      </div>
                      {/* KPI達成率バー */}
                      <div className="w-32 shrink-0">
                        {hasMeasurable ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${kpiBarColor(avg)}`} style={{ width: `${Math.min(avg, 100)}%` }} />
                            </div>
                            <span className={`text-xs font-bold w-8 text-right ${kpiTextColor(avg)}`}>{avg}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </div>
                      {/* ヘルスドット */}
                      <div className="flex items-center gap-1 shrink-0">
                        {p.health.length > 0 ? (
                          p.health.map((h, i) => (
                            <div key={i} className={`w-2.5 h-2.5 rounded-full ${healthDot[h.status]}`} />
                          ))
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                        )}
                      </div>
                      {/* ブロッカー件数 */}
                      <div className="shrink-0 w-12 text-right">
                        {pBlockerCount > 0 ? (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">{pBlockerCount}</span>
                        ) : (
                          <span className="text-xs text-gray-600">0</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 下段: ブロッカーTOP3 */}
            {unresolvedBlockers.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  要対応ブロッカー TOP{Math.min(unresolvedBlockers.length, 3)}
                </h2>
                <div className="space-y-2">
                  {unresolvedBlockers.slice(0, 3).map((b, i) => (
                    <div key={i} className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 cursor-pointer"
                      onClick={() => toggleOverviewBlocker(i)}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{b.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{b.issue}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{b.impact}</div>
                          {b.impactAmount && <div className="text-xs text-red-400 mt-0.5">{b.impactAmount}</div>}
                        </div>
                        {b.estimatedMinutes !== undefined && b.estimatedMinutes > 0 && (
                          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded shrink-0">{b.estimatedMinutes}分</span>
                        )}
                      </div>
                      {expandedOverviewBlockers.has(i) && (
                        <div className="mt-3 ml-9 text-xs text-gray-400 bg-gray-800/50 rounded-lg px-3 py-2">
                          <div className="text-gray-500 mb-1">対応手順:</div>
                          <div>{b.action}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* やること一覧 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">やること（全プロジェクト・優先順）</h3>
              <div className="space-y-1.5">
                {PROJECTS.flatMap((p) => p.todos.filter((t) => t.owner === "manual").map((t) => ({ ...t, project: p.name, emoji: p.emoji, key: `${p.id}-${t.task}` }))).sort((a, b) => {
                  const order = { critical: 0, high: 1, medium: 2, low: 3 };
                  return order[a.priority] - order[b.priority];
                }).map((t) => {
                  const priorityColors: Record<string, string> = { critical: "bg-red-500", high: "bg-orange-500", medium: "bg-yellow-500", low: "bg-gray-500" };
                  const priorityLabels: Record<string, string> = { critical: "今すぐ", high: "高", medium: "中", low: "低" };
                  const expanded = expandedTodos.has(t.key);
                  return (
                    <div key={t.key} className="bg-gray-800/30 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-800/60 transition-colors" onClick={() => toggleTodo(t.key)}>
                      <div className="flex items-center gap-2">
                        <span className={`shrink-0 text-[10px] text-white font-bold px-1.5 py-0.5 rounded ${priorityColors[t.priority]}`}>{priorityLabels[t.priority]}</span>
                        <span className="text-xs flex-1">{t.task}</span>
                        <span className="text-[10px] text-gray-600">{t.emoji} {t.project}</span>
                        {t.estimatedMinutes && <span className="text-[10px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{t.estimatedMinutes}分</span>}
                        <span className="text-xs text-gray-600">{expanded ? "▼" : "▶"}</span>
                      </div>
                      {expanded && (
                        <div className="mt-2 ml-8 space-y-1.5">
                          {t.impact && <div className="text-xs text-emerald-400/80">効果: {t.impact}</div>}
                          {t.detail && <div className="text-xs text-gray-400 whitespace-pre-line bg-gray-900/50 rounded px-2 py-1.5">{t.detail}</div>}
                          {t.blocked && <div className="text-xs text-red-400">ブロッカー: {t.blocked}</div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            2. ブロッカー（Blockers）
            ================================================================ */}
        {view === "blockers" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">ブロッカー</h2>
              <div className="text-xs text-gray-500">
                {unresolvedBlockers.length}件 未解消 / {allBlockers.length}件 合計
              </div>
            </div>

            {blockersByProject.map((p) => (
              <div key={p.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{p.emoji}</span>
                  <h3 className="text-sm font-bold">{p.name}</h3>
                  <span className="text-xs text-gray-500">({p.projectBlockers.filter((b) => !resolvedBlockers.has(b.issue)).length}件)</span>
                </div>
                <div className="space-y-2">
                  {p.projectBlockers.map((b, i) => {
                    const resolved = resolvedBlockers.has(b.issue);
                    const expanded = expandedBlockers.has(b.issue);
                    return (
                      <div key={i}
                        className={`border rounded-xl p-4 ${resolved ? "bg-gray-900/30 border-gray-800/50 opacity-50" : "bg-gray-900 border-gray-800"}`}>
                        <div className="flex items-start gap-3">
                          {/* チェックボックス */}
                          <button onClick={() => toggleBlocker(b.issue)}
                            className={`shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${resolved ? "bg-emerald-500 border-emerald-500" : "border-gray-600 hover:border-gray-400"}`}>
                            {resolved && <span className="text-white text-xs">&#10003;</span>}
                          </button>
                          {/* 赤!アイコン */}
                          <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                            <span className="text-red-400 text-xs font-bold">!</span>
                          </div>
                          {/* 中央 */}
                          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleExpandBlocker(b.issue)}>
                            <div className={`text-sm font-bold ${resolved ? "line-through text-gray-500" : ""}`}>{b.issue}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{b.impact}</div>
                            {b.impactAmount && <div className="text-xs text-red-400 mt-0.5">{b.impactAmount}</div>}
                          </div>
                          {/* 右 */}
                          <div className="shrink-0 text-right space-y-1">
                            {b.estimatedMinutes !== undefined && b.estimatedMinutes > 0 && (
                              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{b.estimatedMinutes}分</span>
                            )}
                            <div>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${b.owner === "manual" ? "bg-blue-500/20 text-blue-400" : "bg-gray-700 text-gray-400"}`}>
                                {b.owner === "manual" ? "手動" : "自動"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* アクション概要（常時表示） */}
                        <div className="mt-2 ml-14 text-xs text-gray-400">
                          <span className="text-gray-500">次:</span> {b.action}
                        </div>
                        {/* 展開: 詳細ステップ */}
                        {expanded && (
                          <div className="mt-3 ml-14 bg-gray-800/50 rounded-lg px-3 py-2">
                            <div className="text-xs text-gray-500 mb-1">詳細手順:</div>
                            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                              {b.action.split(/[、。]/).filter(Boolean).map((step, si) => (
                                <li key={si}>{step.trim()}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {allBlockers.length === 0 && (
              <div className="text-center text-gray-500 py-12 text-sm">ブロッカーなし</div>
            )}
          </div>
        )}

        {/* ================================================================
            3. KPI
            ================================================================ */}
        {view === "kpi" && (
          <div className="space-y-6">
            {/* プロジェクト選択ピル */}
            <div className="flex gap-1 flex-wrap">
              {kpiProjects.map((p, i) => (
                <button key={p.id} onClick={() => setSelectedKpiProject(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedKpiProject === i ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                  {p.emoji} {p.name}
                </button>
              ))}
            </div>

            {/* 選択プロジェクトのKPI */}
            {kpiProjects[selectedKpiProject] && (
              <div className="space-y-3">
                {kpiProjects[selectedKpiProject].kpis.map((k, i) => {
                  const rate = kpiRate(k);
                  const pct = Math.min(rate, 100);
                  const isNoTarget = k.target === 0;
                  return (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-200">{k.label}</span>
                          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{k.period}</span>
                        </div>
                        {!isNoTarget && (
                          <span className={`text-sm font-bold ${kpiTextColor(rate)}`}>{rate}%</span>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gray-200">
                        {k.actual.toLocaleString()}
                        <span className="text-gray-500 text-lg"> / {k.target.toLocaleString()}{k.unit}</span>
                      </div>
                      {isNoTarget ? (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">目標未設定</div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-gray-600" style={{ width: "0%" }} />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${kpiBarColor(rate)}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ミニ棒グラフ: 全プロジェクトKPI達成率比較 */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">プロジェクト別 KPI達成率</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
                {PROJECTS.filter((p) => p.kpis.some((k) => k.target > 0)).map((p) => {
                  const avg = projectKpiAvg(p);
                  return (
                    <div key={p.id} className="flex items-center gap-2">
                      <span className="text-xs w-24 truncate">{p.emoji} {p.name}</span>
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${kpiBarColor(avg)}`} style={{ width: `${Math.min(avg, 100)}%` }} />
                      </div>
                      <span className={`text-xs w-10 text-right font-bold ${kpiTextColor(avg)}`}>{avg}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            4. タイムライン
            ================================================================ */}
        {view === "timeline" && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">タイムライン</h2>

            {/* 遅延 */}
            {(() => {
              const items = allMilestones.filter((m) => m.status === "overdue");
              if (items.length === 0) return null;
              return (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>🔴</span>
                    <h3 className="text-xs font-semibold text-red-400 uppercase">遅延（{items.length}）</h3>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((m, i) => (
                      <div key={i} className="bg-red-950/20 border border-red-900/30 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs">
                        <span>{m.emoji}</span>
                        <span className="text-gray-400 w-20 shrink-0">{m.deadline}</span>
                        <span className="text-gray-300 flex-1">{m.label}</span>
                        <span className="text-gray-600 shrink-0">{m.project}</span>
                        {m.note && <span className="text-gray-600 truncate max-w-48">{m.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* 進行中 */}
            {(() => {
              const items = allMilestones.filter((m) => m.status === "in_progress");
              if (items.length === 0) return null;
              return (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>🟡</span>
                    <h3 className="text-xs font-semibold text-yellow-400 uppercase">進行中（{items.length}）</h3>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((m, i) => (
                      <div key={i} className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs">
                        <span>{m.emoji}</span>
                        <span className="text-gray-400 w-20 shrink-0">{m.deadline}</span>
                        <span className="text-gray-300 flex-1">{m.label}</span>
                        <span className="text-gray-600 shrink-0">{m.project}</span>
                        {m.note && <span className="text-gray-600 truncate max-w-48">{m.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* 予定 */}
            {(() => {
              const items = allMilestones.filter((m) => m.status === "upcoming");
              if (items.length === 0) return null;
              return (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>⚪</span>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">予定（{items.length}）</h3>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((m, i) => (
                      <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs">
                        <span>{m.emoji}</span>
                        <span className="text-gray-400 w-20 shrink-0">{m.deadline}</span>
                        <span className="text-gray-300 flex-1">{m.label}</span>
                        <span className="text-gray-600 shrink-0">{m.project}</span>
                        {m.note && <span className="text-gray-600 truncate max-w-48">{m.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* 完了（折りたたみ） */}
            {(() => {
              const items = allMilestones.filter((m) => m.status === "done");
              if (items.length === 0) return null;
              return (
                <div>
                  <button onClick={() => setShowDoneMilestones(!showDoneMilestones)}
                    className="flex items-center gap-2 mb-2">
                    <span>✅</span>
                    <h3 className="text-xs font-semibold text-emerald-400 uppercase">完了（{items.length}）</h3>
                    <span className="text-xs text-gray-500">{showDoneMilestones ? "▼" : "▶"}</span>
                  </button>
                  {showDoneMilestones && (
                    <div className="space-y-1.5">
                      {items.map((m, i) => (
                        <div key={i} className="bg-emerald-950/10 border border-emerald-900/20 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs">
                          <span>{m.emoji}</span>
                          <span className="text-gray-400 w-20 shrink-0">{m.deadline}</span>
                          <span className="text-gray-300 flex-1">{m.label}</span>
                          <span className="text-gray-600 shrink-0">{m.project}</span>
                          {m.note && <span className="text-gray-600 truncate max-w-48">{m.note}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ================================================================
            5. 収益（Revenue）
            ================================================================ */}
        {view === "revenue" && (
          <div className="space-y-8">
            {/* 上段: 3シナリオサマリー */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">月間シミュレーション合計</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-5 text-center">
                  <div className="text-xs text-red-400 uppercase mb-1">だめ</div>
                  <div className="text-3xl font-bold text-red-400">¥{sim.totals.bad.toLocaleString()}</div>
                </div>
                <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-5 text-center">
                  <div className="text-xs text-yellow-400 uppercase mb-1">普通</div>
                  <div className="text-3xl font-bold text-yellow-400">¥{sim.totals.normal.toLocaleString()}</div>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-5 text-center">
                  <div className="text-xs text-emerald-400 uppercase mb-1">良い</div>
                  <div className="text-3xl font-bold text-emerald-400">¥{sim.totals.good.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* 年間売上予測グラフ（全プロジェクト合算） */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">1年間の売上予測（全プロジェクト合算）</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                {/* 目標ライン表示 */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-gray-700 rounded" />ベースライン</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-blue-500 rounded" />上振れ</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-emerald-500 rounded" />実績</div>
                  <div className="flex-1" />
                  <div className="text-amber-400">━ 月12万目標（NOTE7万+くらべるラボ5万）</div>
                </div>
                {/* 棒グラフ */}
                {(() => {
                  const maxVal = Math.max(...ANNUAL_FORECAST.map((f) => Math.max(f.baseline, f.upside, f.actual)), 1);
                  const targetLine = 120000;
                  const targetPct = (targetLine / maxVal) * 200;
                  return (
                    <div className="relative" style={{ height: "240px" }}>
                      {/* 目標ライン */}
                      <div className="absolute left-0 right-0 border-t-2 border-dashed border-amber-500/50" style={{ bottom: `${targetPct + 20}px` }}>
                        <span className="absolute right-0 -top-4 text-[10px] text-amber-400">¥120,000</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-full pt-6">
                        {ANNUAL_FORECAST.map((f) => (
                          <div key={f.month} className="flex-1 flex flex-col items-center gap-0.5">
                            <span className="text-[9px] text-blue-400">¥{(f.upside / 1000).toFixed(0)}k</span>
                            <span className="text-[9px] text-gray-500">¥{(f.baseline / 1000).toFixed(0)}k</span>
                            <div className="w-full flex gap-px justify-center" style={{ height: `${(f.upside / maxVal) * 180}px` }}>
                              {/* ベースライン棒 */}
                              <div className="w-1/3 flex flex-col justify-end">
                                <div className="bg-gray-600 rounded-t" style={{ height: `${f.baseline > 0 ? (f.baseline / f.upside) * 100 : 0}%` }} />
                              </div>
                              {/* 上振れ棒 */}
                              <div className="w-1/3 flex flex-col justify-end">
                                <div className="bg-blue-500/60 rounded-t" style={{ height: "100%" }} />
                              </div>
                              {/* 実績棒 */}
                              <div className="w-1/3 flex flex-col justify-end">
                                <div className="bg-emerald-500 rounded-t" style={{ height: `${f.actual > 0 && f.upside > 0 ? (f.actual / f.upside) * 100 : 0}%` }} />
                              </div>
                            </div>
                            <span className="text-[9px] text-gray-500">{f.month.slice(5)}月</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
                {/* 月ごとのカタリスト */}
                <div className="mt-4 border-t border-gray-800 pt-3 space-y-1">
                  <div className="text-xs text-gray-500 mb-2">各月の上振れ要因</div>
                  {ANNUAL_FORECAST.filter((f) => f.catalyst).map((f) => (
                    <div key={f.month} className="flex gap-2 text-[11px]">
                      <span className="text-gray-500 w-12 shrink-0">{f.month.slice(5)}月</span>
                      <span className="text-gray-400">{f.catalyst}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 中段: 月別収益ロードマップ（縦棒グラフ） */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">月別収益ロードマップ</h2>
              {/* プロジェクト選択タブ */}
              <div className="flex gap-1 flex-wrap mb-4">
                {revenueProjects.map((p, i) => (
                  <button key={p.id} onClick={() => setSelectedRevenueProject(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedRevenueProject === i ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                    {p.emoji} {p.name}
                  </button>
                ))}
              </div>

              {revenueProjects[selectedRevenueProject] && (() => {
                const rp = revenueProjects[selectedRevenueProject];
                const maxAmount = Math.max(...rp.revenueRoadmap.map((r) => Math.max(r.target, r.actual)), 1);
                return (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">{rp.emoji}</span>
                      <div>
                        <h3 className="text-sm font-bold">{rp.name}</h3>
                        <span className="text-xs text-gray-500">{rp.revenueModel}</span>
                      </div>
                    </div>
                    {/* 棒グラフ */}
                    <div className="flex items-end gap-2" style={{ height: "220px" }}>
                      {rp.revenueRoadmap.map((m) => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-gray-400">¥{m.target.toLocaleString()}</span>
                          <div className="w-full relative rounded-t" style={{ height: `${(m.target / maxAmount) * 180}px` }}>
                            <div className="absolute bottom-0 w-full bg-gray-700 rounded-t" style={{ height: `${(m.target / maxAmount) * 180}px` }} />
                            <div className="absolute bottom-0 w-full bg-emerald-500 rounded-t" style={{ height: `${(m.actual / maxAmount) * 180}px` }} />
                          </div>
                          <span className="text-[10px] text-gray-500">{m.month.slice(5)}</span>
                        </div>
                      ))}
                    </div>
                    {/* 凡例 */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1"><div className="w-3 h-2 bg-gray-700 rounded" />目標</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-2 bg-emerald-500 rounded" />実績</div>
                    </div>
                    {/* breakdown表 */}
                    <div className="mt-4 border-t border-gray-800 pt-3">
                      <div className="text-xs text-gray-500 mb-2">内訳</div>
                      <div className="space-y-2">
                        {rp.revenueRoadmap.map((m) => (
                          <div key={m.month}>
                            <div className="text-xs text-gray-400 mb-1">{m.month}</div>
                            <div className="flex gap-3 flex-wrap">
                              {m.breakdown.map((bd, j) => (
                                <span key={j} className="text-[10px] text-gray-500">
                                  {bd.source}: ¥{bd.target.toLocaleString()}
                                  {bd.actual > 0 && <span className="text-emerald-400"> (実績 ¥{bd.actual.toLocaleString()})</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 下段: 突き抜け施策（クリックで展開） */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">ベースラインを超えて突き抜けるための施策</h2>
              <p className="text-xs text-gray-500 mb-4">ボトムラインは自動パイプラインで守る。ここからは上に伸ばすための取り組み。</p>
              <div className="space-y-2">
                {GROWTH_LEVERS.map((gl) => {
                  const expanded = expandedLevers.has(gl.lever);
                  return (
                    <div key={gl.lever} className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors" onClick={() => toggleLever(gl.lever)}>
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <span className="text-blue-400 text-sm">↑</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-200">{gl.lever}</div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[10px] text-gray-500">{gl.timing}</span>
                            <span className="text-xs text-emerald-400 font-bold">{gl.upsideImpact}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 shrink-0">{expanded ? "▼" : "▶"}</span>
                      </div>
                      {expanded && (
                        <div className="mt-3 ml-11 space-y-2">
                          <div className="text-xs text-gray-400 bg-gray-800/50 rounded-lg px-3 py-2 whitespace-pre-line">{gl.detail}</div>
                          <div className="flex gap-4">
                            <div className="text-[10px]"><span className="text-gray-500">ベースライン効果:</span> <span className="text-gray-400">{gl.baselineImpact}</span></div>
                            <div className="text-[10px]"><span className="text-gray-500">上振れ効果:</span> <span className="text-emerald-400">{gl.upsideImpact}</span></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* プロジェクト別の上振れ戦略 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">プロジェクト別上振れ</h2>
              <div className="space-y-4">
                {upsideStrategies.map((us) => (
                  <div key={us.project} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{us.emoji}</span>
                      <h3 className="text-sm font-bold">{us.project}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {us.strategies.map((s, i) => (
                        <div key={i} className="bg-gray-800/50 rounded-lg px-4 py-3">
                          <div className="text-sm font-medium text-gray-200">{s.name}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-emerald-400 font-bold">{s.impact}</span>
                            <span className="text-[10px] text-gray-500">{s.timing}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            6. システム（System）
            ================================================================ */}
        {view === "system" && (
          <div className="space-y-6">
            {/* 上段: ヘルスサマリー 4カード */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                { key: "healthy", label: "正常", color: "text-emerald-400", dot: "bg-emerald-500" },
                { key: "warning", label: "警告", color: "text-amber-400", dot: "bg-amber-500" },
                { key: "error", label: "エラー", color: "text-red-400", dot: "bg-red-500" },
                { key: "unknown", label: "未設定", color: "text-gray-400", dot: "bg-gray-500" },
              ] as const).map((s) => {
                const count = allHealthItems.filter((h) => h.status === s.key).length;
                return (
                  <div key={s.key} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      <span className="text-xs text-gray-500 uppercase">{s.label}</span>
                    </div>
                    <div className={`text-3xl font-bold ${s.color}`}>{count}</div>
                  </div>
                );
              })}
            </div>

            {/* 中段: プロジェクト別ヘルス */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">プロジェクト別ヘルス</h2>
              {PROJECTS.filter((p) => p.health.length > 0).map((p) => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{p.emoji}</span>
                    <h3 className="text-sm font-bold">{p.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {p.health.map((h, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${healthDot[h.status]}`} />
                        <span className="text-xs text-gray-300 w-48 shrink-0">{h.name}</span>
                        <span className="text-xs text-gray-500 flex-1 truncate">{h.note || ""}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {allHealthItems.length === 0 && (
                <div className="text-center text-gray-500 py-12 text-sm">ヘルス情報なし</div>
              )}
            </div>

            {/* 下段: 競合詳細 */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">競合分析</h2>
              {/* プロジェクト選択タブ */}
              <div className="flex gap-1 flex-wrap mb-4">
                {PROJECTS.filter((p) => p.competitors.length > 0).map((p, i) => (
                  <button key={p.id} onClick={() => setSelectedCompetitorProject(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCompetitorProject === i ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                    {p.emoji} {p.name}
                  </button>
                ))}
              </div>

              {(() => {
                const competitorProjects = PROJECTS.filter((p) => p.competitors.length > 0);
                const selected = competitorProjects[selectedCompetitorProject];
                if (!selected) return null;
                const analysis = competitorAnalysis[selected.id] || {};
                return (
                  <div className="space-y-3">
                    {selected.competitors.map((c) => {
                      const expanded = expandedCompetitors.has(c.name);
                      const ca = analysis[c.name];
                      return (
                        <div key={c.name}
                          className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer"
                          onClick={() => toggleCompetitor(c.name)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-gray-200">{c.name}</div>
                              <div className="flex gap-4 mt-1">
                                <span className="text-xs text-gray-500">ユーザー: {c.users}</span>
                                <span className="text-xs text-gray-500">課金: {c.pricing}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{expanded ? "▼" : "▶"}</span>
                          </div>
                          {expanded && ca && (
                            <div className="mt-3 border-t border-gray-800 pt-3 space-y-2">
                              <div>
                                <div className="text-[10px] text-gray-500 uppercase mb-0.5">強み</div>
                                <div className="text-xs text-gray-400">{ca.strengths}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-gray-500 uppercase mb-0.5">弱み</div>
                                <div className="text-xs text-emerald-400/70">{ca.weaknesses}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
