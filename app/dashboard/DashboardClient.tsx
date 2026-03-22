"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PROJECTS,
  getRevenueSimulation,
  getAllMilestones,
  ANNUAL_FORECAST,
  GROWTH_LEVERS,
  type ProjectData,
  type KPI,
} from "./data";
import type { LiveDashboardData, GitHubIssue, CIStatus, PRInfo } from "./github";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

type View = "overview" | "issues" | "kpi" | "timeline" | "revenue" | "system";

const viewLabels: Record<View, string> = {
  overview: "全体",
  issues: "Issues",
  kpi: "KPI",
  timeline: "タイムライン",
  revenue: "収益",
  system: "システム",
};

const statusColors: Record<string, string> = { live: "bg-emerald-500", review: "bg-blue-500", dev: "bg-orange-500", planned: "bg-gray-500" };
const healthDot: Record<string, string> = { healthy: "bg-emerald-500", warning: "bg-amber-500", error: "bg-red-500", unknown: "bg-gray-500" };

const priorityColors: Record<string, string> = { critical: "bg-red-500", high: "bg-orange-500", medium: "bg-yellow-500", low: "bg-gray-500" };
const priorityLabels: Record<string, string> = { critical: "P0", high: "P1", medium: "P2", low: "P3" };
const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

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
  "itami-techo": {
    "頭痛ーる": { strengths: "累計1500万DL。気圧予報で圧倒的知名度", weaknesses: "体調全般の記録には弱い。頭痛特化" },
    つらいメモ: { strengths: "シンプルで評価4.5★", weaknesses: "Apple Watch非対応。HealthKit連携なし" },
    "My Symptoms": { strengths: "グローバル展開。多機能", weaknesses: "UIが英語中心。日本語対応が弱い" },
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

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export function DashboardClient({ liveData }: { liveData: LiveDashboardData }) {
  const [view, setView] = useState<View>("overview");
  const [selectedKpiProject, setSelectedKpiProject] = useState(0);
  const [selectedRevenueProject, setSelectedRevenueProject] = useState(0);
  const [selectedCompetitorProject, setSelectedCompetitorProject] = useState(0);
  const [expandedCompetitors, setExpandedCompetitors] = useState<Set<string>>(new Set());
  const [showDoneMilestones, setShowDoneMilestones] = useState(false);
  const [expandedTodos, setExpandedTodos] = useState<Set<string>>(new Set());
  const [expandedLevers, setExpandedLevers] = useState<Set<string>>(new Set());
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const { issues, ciStatuses, prs } = liveData;
  const hasToken = issues.length > 0 || ciStatuses.length > 0 || prs.length > 0;

  const sim = getRevenueSimulation();
  const allMilestones = getAllMilestones();
  const totalCurrentMonthly = PROJECTS.reduce((s, p) => s + p.currentMonthly, 0);
  const totalMonthlyTarget = PROJECTS.reduce((s, p) => s + p.monthlyTarget, 0);
  const totalArticles = PROJECTS.reduce((s, p) => {
    const articleKpi = p.kpis.find((k) => k.label.includes("記事数") || k.label.includes("公開記事"));
    return s + (articleKpi ? articleKpi.actual : 0);
  }, 0);

  // CI health: live data or fallback to static
  const ciHealthy = ciStatuses.filter((c) => c.status === "healthy").length;
  const ciTotal = ciStatuses.length;

  function toggle<T>(set: Set<T>, key: T): Set<T> {
    const next = new Set(set);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  }

  function kpiRate(k: KPI): number {
    return k.target === 0 ? 0 : Math.round((k.actual / k.target) * 100);
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

  const revenueProjects = PROJECTS.filter((p) => p.revenueRoadmap.length > 0);
  const kpiProjects = PROJECTS.filter((p) => p.kpis.length > 0);

  // PRs grouped by repo
  const prsByRepo = prs.reduce<Record<string, PRInfo[]>>((acc, pr) => {
    (acc[pr.repo] ??= []).push(pr);
    return acc;
  }, {});

  // CI grouped by repo
  const ciByRepo = ciStatuses.reduce<Record<string, CIStatus[]>>((acc, ci) => {
    (acc[ci.repo] ??= []).push(ci);
    return acc;
  }, {});

  function relativeTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}分前`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}時間前`;
    const days = Math.floor(hrs / 24);
    return `${days}日前`;
  }

  const checksColors: Record<string, string> = { success: "text-emerald-400", failure: "text-red-400", pending: "text-amber-400", unknown: "text-gray-500" };
  const checksLabels: Record<string, string> = { success: "pass", failure: "fail", pending: "...", unknown: "?" };

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
            {hasToken && (
              <span className="text-[10px] text-emerald-500/60">LIVE</span>
            )}
          </div>
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(viewLabels) as View[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === v ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                {viewLabels[v]}
                {v === "issues" && issues.length > 0 && (
                  <span className="ml-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{issues.length}</span>
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
                <div className="text-xs text-gray-500 uppercase mb-1">Open Issues</div>
                <div className={`text-3xl font-bold ${issues.length > 0 ? "text-blue-400" : "text-emerald-400"}`}>
                  {issues.length}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{issues.length > 0 ? `${issues.filter((i) => i.priority === "critical" || i.priority === "high").length}件 高優先` : "なし"}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">今月売上 / 目標</div>
                <div className="text-3xl font-bold text-gray-200">¥{totalCurrentMonthly.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-0.5">/ ¥{totalMonthlyTarget.toLocaleString()}</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">CI正常率</div>
                <div className={`text-3xl font-bold ${ciTotal > 0 && ciHealthy === ciTotal ? "text-emerald-400" : ciTotal > 0 ? "text-amber-400" : "text-gray-500"}`}>
                  {ciTotal > 0 ? `${Math.round((ciHealthy / ciTotal) * 100)}%` : "—"}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{ciHealthy}/{ciTotal} 正常</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">Open PRs</div>
                <div className="text-3xl font-bold text-gray-200">{prs.length}</div>
                <div className="text-xs text-gray-600 mt-0.5">{prs.filter((p) => p.checksStatus === "failure").length > 0 ? `${prs.filter((p) => p.checksStatus === "failure").length}件 CI失敗` : "全プロジェクト"}</div>
              </div>
            </div>

            {/* 売上推移: プロジェクト別シナリオ */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">プロジェクト別 売上シナリオ</h2>
              <div className="space-y-2">
                {PROJECTS.filter((p) => p.monthlyTarget > 0).sort((a, b) => b.revenue.normal - a.revenue.normal).map((p) => (
                  <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{p.emoji}</span>
                      <span className="text-sm font-bold">{p.name}</span>
                      <span className="text-xs text-gray-500">{p.revenueModel}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-[10px] text-red-400 uppercase">だめ</div>
                        <div className="text-sm font-bold text-red-400">¥{p.revenue.bad.toLocaleString()}</div>
                        <div className="text-[10px] text-red-300/60 mt-0.5">{p.revenue.badNote}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-yellow-400 uppercase">普通</div>
                        <div className="text-sm font-bold text-yellow-400">¥{p.revenue.normal.toLocaleString()}</div>
                        <div className="text-[10px] text-yellow-300/60 mt-0.5">{p.revenue.normalNote}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-emerald-400 uppercase">良い</div>
                        <div className="text-sm font-bold text-emerald-400">¥{p.revenue.good.toLocaleString()}</div>
                        <div className="text-[10px] text-emerald-300/60 mt-0.5">{p.revenue.goodNote}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* プロジェクト行 */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">プロジェクト</h2>
              <div className="space-y-2">
                {PROJECTS.map((p) => {
                  const avg = projectKpiAvg(p);
                  const hasMeasurable = p.kpis.filter((k) => k.target > 0).length > 0;
                  const pIssues = issues.filter((i) => i.projectId === p.id);
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
                      <div className="shrink-0 w-12 text-right">
                        {pIssues.length > 0 ? (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">{pIssues.length}</span>
                        ) : (
                          <span className="text-xs text-gray-600">0</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Issues TOP3 */}
            {issues.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  優先 Issues TOP{Math.min(issues.length, 3)}
                </h2>
                <div className="space-y-2">
                  {issues.slice(0, 3).map((issue) => (
                    <IssueCard key={`${issue.repo}-${issue.number}`} issue={issue} expanded={expandedIssues.has(`${issue.repo}-${issue.number}`)}
                      onToggle={() => setExpandedIssues((s) => toggle(s, `${issue.repo}-${issue.number}`))} />
                  ))}
                </div>
              </div>
            )}

            {/* やること一覧 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">やること（全プロジェクト・優先順）</h3>
              <div className="space-y-1.5">
                {PROJECTS.flatMap((p) => p.todos.filter((t) => t.owner === "manual").map((t) => ({ ...t, project: p.name, emoji: p.emoji, key: `${p.id}-${t.task}` }))).sort((a, b) => {
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                }).map((t) => {
                  const expanded = expandedTodos.has(t.key);
                  return (
                    <div key={t.key} className="bg-gray-800/30 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-800/60 transition-colors" onClick={() => setExpandedTodos((s) => toggle(s, t.key))}>
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
            2. Issues（GitHub Issues）
            ================================================================ */}
        {view === "issues" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">GitHub Issues</h2>
              <div className="text-xs text-gray-500">
                {issues.length}件 open / 更新: {liveData.fetchedAt ? relativeTime(liveData.fetchedAt) : "—"}
              </div>
            </div>

            {!hasToken && (
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 text-sm text-amber-400">
                GITHUB_TOKEN が未設定です。<code className="bg-gray-800 px-1 rounded">.env.local</code> に設定するとリアルタイムデータが表示されます。
              </div>
            )}

            {/* 優先度別グループ */}
            {(["critical", "high", "medium", "low"] as const).map((priority) => {
              const group = issues.filter((i) => i.priority === priority);
              if (group.length === 0) return null;
              return (
                <div key={priority}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded ${priorityColors[priority]}`}>{priorityLabels[priority]}</span>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">{priority} ({group.length})</h3>
                  </div>
                  <div className="space-y-2">
                    {group.map((issue) => (
                      <IssueCard key={`${issue.repo}-${issue.number}`} issue={issue} expanded={expandedIssues.has(`${issue.repo}-${issue.number}`)}
                        onToggle={() => setExpandedIssues((s) => toggle(s, `${issue.repo}-${issue.number}`))} />
                    ))}
                  </div>
                </div>
              );
            })}

            {issues.length === 0 && hasToken && (
              <div className="text-center text-gray-500 py-12 text-sm">Open Issues なし</div>
            )}
          </div>
        )}

        {/* ================================================================
            3. KPI
            ================================================================ */}
        {view === "kpi" && (
          <div className="space-y-6">
            <div className="flex gap-1 flex-wrap">
              {kpiProjects.map((p, i) => (
                <button key={p.id} onClick={() => setSelectedKpiProject(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedKpiProject === i ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                  {p.emoji} {p.name}
                </button>
              ))}
            </div>

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
                        {!isNoTarget && <span className={`text-sm font-bold ${kpiTextColor(rate)}`}>{rate}%</span>}
                      </div>
                      <div className="text-2xl font-bold text-gray-200">
                        {k.actual.toLocaleString()}
                        <span className="text-gray-500 text-lg"> / {k.target.toLocaleString()}{k.unit}</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${isNoTarget ? "bg-gray-600" : kpiBarColor(rate)}`} style={{ width: `${isNoTarget ? 0 : pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

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

            {(["overdue", "in_progress", "upcoming"] as const).map((status) => {
              const items = allMilestones.filter((m) => m.status === status);
              if (items.length === 0) return null;
              const cfg = {
                overdue: { icon: "🔴", label: "遅延", color: "text-red-400", bg: "bg-red-950/20 border-red-900/30" },
                in_progress: { icon: "🟡", label: "進行中", color: "text-yellow-400", bg: "bg-yellow-950/20 border-yellow-900/30" },
                upcoming: { icon: "⚪", label: "予定", color: "text-gray-400", bg: "bg-gray-900 border-gray-800" },
              }[status];
              return (
                <div key={status}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{cfg.icon}</span>
                    <h3 className={`text-xs font-semibold ${cfg.color} uppercase`}>{cfg.label}（{items.length}）</h3>
                  </div>
                  <div className="space-y-1.5">
                    {items.map((m, i) => (
                      <div key={i} className={`${cfg.bg} border rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs`}>
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
            })}

            {/* 完了（折りたたみ） */}
            {(() => {
              const items = allMilestones.filter((m) => m.status === "done");
              if (items.length === 0) return null;
              return (
                <div>
                  <button onClick={() => setShowDoneMilestones(!showDoneMilestones)} className="flex items-center gap-2 mb-2">
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

            {/* 年間売上予測グラフ */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">1年間の売上予測（全プロジェクト合算）</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-gray-700 rounded" />ベースライン</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-blue-500 rounded" />上振れ</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-2 bg-emerald-500 rounded" />実績</div>
                  <div className="flex-1" />
                  <div className="text-amber-400">━ 月12万目標</div>
                </div>
                {(() => {
                  const maxVal = Math.max(...ANNUAL_FORECAST.map((f) => Math.max(f.baseline, f.upside, f.actual)), 1);
                  const targetLine = 120000;
                  const targetPct = (targetLine / maxVal) * 200;
                  return (
                    <div className="relative" style={{ height: "240px" }}>
                      <div className="absolute left-0 right-0 border-t-2 border-dashed border-amber-500/50" style={{ bottom: `${targetPct + 20}px` }}>
                        <span className="absolute right-0 -top-4 text-[10px] text-amber-400">¥120,000</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-full pt-6">
                        {ANNUAL_FORECAST.map((f) => (
                          <div key={f.month} className="flex-1 flex flex-col items-center gap-0.5">
                            <span className="text-[9px] text-blue-400">¥{(f.upside / 1000).toFixed(0)}k</span>
                            <span className="text-[9px] text-gray-500">¥{(f.baseline / 1000).toFixed(0)}k</span>
                            <div className="w-full flex gap-px justify-center" style={{ height: `${(f.upside / maxVal) * 180}px` }}>
                              <div className="w-1/3 flex flex-col justify-end">
                                <div className="bg-gray-600 rounded-t" style={{ height: `${f.baseline > 0 ? (f.baseline / f.upside) * 100 : 0}%` }} />
                              </div>
                              <div className="w-1/3 flex flex-col justify-end">
                                <div className="bg-blue-500/60 rounded-t" style={{ height: "100%" }} />
                              </div>
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

            {/* 月別収益ロードマップ */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">月別収益ロードマップ</h2>
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
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1"><div className="w-3 h-2 bg-gray-700 rounded" />目標</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-2 bg-emerald-500 rounded" />実績</div>
                    </div>
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

            {/* 突き抜け施策 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">ベースラインを超えて突き抜けるための施策</h2>
              <p className="text-xs text-gray-500 mb-4">ボトムラインは自動パイプラインで守る。ここからは上に伸ばすための取り組み。</p>
              <div className="space-y-2">
                {GROWTH_LEVERS.map((gl) => {
                  const expanded = expandedLevers.has(gl.lever);
                  return (
                    <div key={gl.lever} className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors" onClick={() => setExpandedLevers((s) => toggle(s, gl.lever))}>
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

            {/* プロジェクト別上振れ */}
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
            6. システム（GitHub Actions CI + PRs）
            ================================================================ */}
        {view === "system" && (
          <div className="space-y-6">
            {/* CI ヘルスサマリー */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                { key: "healthy", label: "正常", color: "text-emerald-400", dot: "bg-emerald-500" },
                { key: "warning", label: "警告", color: "text-amber-400", dot: "bg-amber-500" },
                { key: "error", label: "エラー", color: "text-red-400", dot: "bg-red-500" },
                { key: "unknown", label: "不明", color: "text-gray-400", dot: "bg-gray-500" },
              ] as const).map((s) => {
                const count = ciStatuses.filter((c) => c.status === s.key).length;
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

            {/* リポジトリ別 CI */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">GitHub Actions（リポジトリ別）</h2>
              {Object.entries(ciByRepo).map(([repo, statuses]) => (
                <div key={repo} className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold">{repo}</span>
                    <a href={`https://github.com/${statuses[0]?.url ? "" : ""}RyotaTokuda/${repo}/actions`} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:underline">Actions →</a>
                  </div>
                  <div className="space-y-2">
                    {statuses.map((ci, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${healthDot[ci.status]}`} />
                        <a href={ci.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 w-48 shrink-0 hover:underline">{ci.workflowName}</a>
                        <span className="text-xs text-gray-500 flex-1 truncate">{ci.conclusion ?? "running"}</span>
                        <span className="text-[10px] text-gray-600">{ci.updatedAt ? relativeTime(ci.updatedAt) : ""}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {ciStatuses.length === 0 && (
                <div className="text-center text-gray-500 py-12 text-sm">
                  {hasToken ? "CI データなし" : "GITHUB_TOKEN を設定するとCI状態が表示されます"}
                </div>
              )}
            </div>

            {/* Open PRs */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Open Pull Requests</h2>
              {Object.entries(prsByRepo).map(([repo, repoPrs]) => (
                <div key={repo} className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold">{repo}</span>
                    <span className="text-[10px] text-gray-500">{repoPrs.length} open</span>
                  </div>
                  <div className="space-y-2">
                    {repoPrs.map((pr) => (
                      <div key={pr.number} className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${checksColors[pr.checksStatus]}`}>{checksLabels[pr.checksStatus]}</span>
                        <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 flex-1 truncate hover:underline">
                          #{pr.number} {pr.title}
                        </a>
                        <span className="text-[10px] text-gray-600">{pr.head}</span>
                        <span className="text-[10px] text-gray-600">{relativeTime(pr.updated_at)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {prs.length === 0 && (
                <div className="text-center text-gray-500 py-12 text-sm">Open PRs なし</div>
              )}
            </div>

            {/* 競合分析 */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">競合分析</h2>
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
                        <div key={c.name} className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer" onClick={() => setExpandedCompetitors((s) => toggle(s, c.name))}>
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

// ------------------------------------------------------------
// IssueCard Component
// ------------------------------------------------------------

function IssueCard({ issue, expanded, onToggle }: { issue: GitHubIssue; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <span className={`shrink-0 text-[10px] text-white font-bold px-1.5 py-0.5 rounded mt-0.5 ${priorityColors[issue.priority]}`}>
          {priorityLabels[issue.priority]}
        </span>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggle}>
          <div className="text-sm font-medium">{issue.title}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-500">{issue.repo}#{issue.number}</span>
            {issue.labels.map((l) => (
              <span key={l.name} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `#${l.color}20`, color: `#${l.color}` }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer"
          className="shrink-0 text-[10px] bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-2.5 py-1 rounded-lg font-medium transition-colors"
          onClick={(e) => e.stopPropagation()}>
          GitHub →
        </a>
      </div>
      {expanded && issue.body && (
        <div className="mt-3 ml-8 text-xs text-gray-400 bg-gray-800/50 rounded-lg px-3 py-2 whitespace-pre-line max-h-48 overflow-y-auto">
          {issue.body.slice(0, 1000)}
          {issue.body.length > 1000 && "..."}
        </div>
      )}
    </div>
  );
}
