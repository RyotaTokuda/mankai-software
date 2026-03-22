// ============================================================
// Dashboard Data — 個人開発プロジェクト管理
// ============================================================

export interface RevenueScenario {
  bad: number;
  normal: number;
  good: number;
  badNote: string;
  normalNote: string;
  goodNote: string;
}

export interface TodoItem {
  task: string;
  owner: "auto" | "manual";
  priority: "critical" | "high" | "medium" | "low";
  blocked?: string;
  detail?: string;        // 詳細な手順（クリックで展開）
  estimatedMinutes?: number;
  impact?: string;        // やるとどうなるか
}

// 年間売上予測（全プロジェクト合算）
export interface AnnualForecast {
  month: string;       // "2026-04" etc
  baseline: number;    // ベースライン予測（普通シナリオ）
  upside: number;      // 上振れ予測（施策がハマった場合）
  actual: number;      // 実績
  catalyst?: string;   // その月の上振れ要因
}

export const ANNUAL_FORECAST: AnnualForecast[] = [
  { month: "2026-04", baseline: 0, upside: 0, actual: 0, catalyst: "基盤構築期。SEOインデックス待ち。記事25本+NOTE20本目標" },
  { month: "2026-05", baseline: 8000, upside: 20000, actual: 0, catalyst: "X運用→初期トラフィック。NOTE有料記事初売上。副業ブーム（GW）でAIツール検索増" },
  { month: "2026-06", baseline: 22000, upside: 45000, actual: 0, catalyst: "SEO効果開始。ボーナス時期→AI有料プラン比較記事。NOTE月¥5,000" },
  { month: "2026-07", baseline: 38000, upside: 70000, actual: 0, catalyst: "特別単価交渉開始。NOTEマガジン開始。夏休みでAI画像/動画需要↑" },
  { month: "2026-08", baseline: 58000, upside: 100000, actual: 0, catalyst: "NOTE¥20K+くらべるラボ¥25K+アプリ¥8K。AI自由研究記事" },
  { month: "2026-09", baseline: 78000, upside: 135000, actual: 0, catalyst: "年末調整準備→会計ソフト需要開始。保険見直し記事投入。NOTE¥30K" },
  { month: "2026-10", baseline: 95000, upside: 170000, actual: 0, catalyst: "確定申告準備記事先行。ブラックフライデー前のAIツール年額プラン比較記事準備" },
  { month: "2026-11", baseline: 115000, upside: 210000, actual: 0, catalyst: "🔥ブラックフライデー/サイバーマンデー。ふるさと納税駆け込み。年末保険見直し" },
  { month: "2026-12", baseline: 125000, upside: 230000, actual: 0, catalyst: "🔥年末商戦ピーク。ふるさと納税ラスト。NOTE年末まとめ。新年準備記事" },
  { month: "2027-01", baseline: 150000, upside: 280000, actual: 0, catalyst: "🔥🔥確定申告シーズン突入。freee月5件×¥12K。新生活準備→ネット回線" },
  { month: "2027-02", baseline: 170000, upside: 320000, actual: 0, catalyst: "🔥🔥確定申告ピーク+新生活準備ピーク。引越し見積り+ネット回線が上乗せ" },
  { month: "2027-03", baseline: 150000, upside: 270000, actual: 0, catalyst: "🔥確定申告ラスト+新生活ラッシュ。年間通算で月平均¥100,000以上" },
];

// 上振れ施策（月ごとに何をすれば上に突き抜けるか）
export interface GrowthLever {
  timing: string;
  lever: string;
  baselineImpact: string;
  upsideImpact: string;
  detail: string;
}

export const GROWTH_LEVERS: GrowthLever[] = [
  // 通年施策
  { timing: "2026年4-5月", lever: "X(Twitter)運用開始", baselineImpact: "+¥0", upsideImpact: "+¥5,000/月", detail: "AIツール情報を毎日発信。フォロワー500人が月5万PV見込み。記事公開直後のSNS拡散がインデックス速度を加速" },
  { timing: "2026年5-6月", lever: "ASP案件の実績作り→特別単価交渉", baselineImpact: "+¥0", upsideImpact: "+¥15,000/月", detail: "成果3件で担当者に連絡。freee通常¥12,000→特別¥18,000〜¥25,000の実績あり。成果率が同じでも収益1.5〜2倍" },
  { timing: "2026年5月", lever: "🔥副業ブーム×GW記事（トレンド）", baselineImpact: "+¥3,000/月", upsideImpact: "+¥10,000/月", detail: "GW中に副業を始める人が増加。「副業 AIツール」「ChatGPT 副業」等のKWが急増。NOTE+くらべるラボ両方で記事投入" },
  { timing: "2026年6月", lever: "🔥ボーナス商戦×AI有料プラン比較", baselineImpact: "+¥2,000/月", upsideImpact: "+¥8,000/月", detail: "ボーナス支給時期に「ChatGPT Plus vs Claude Pro」「AI有料プラン 比較」の検索が増える。年額プランの比較が特に有効" },
  { timing: "2026年6-7月", lever: "計算ツール連携（車の維持費シミュレーター）", baselineImpact: "+¥3,000/月", upsideImpact: "+¥10,000/月", detail: "計算ツール→結果画面で自動車保険見積りに誘導。ツール自体が被リンクを獲得しSEO全体を底上げ" },
  { timing: "2026年7-8月", lever: "NOTEマガジン+シリーズ化", baselineImpact: "+¥2,000/月", upsideImpact: "+¥8,000/月", detail: "月額980円マガジン。10人で月¥9,800。シリーズ化で継続購読率UP" },
  { timing: "2026年7-8月", lever: "🔥夏休み×AI画像/動画生成（トレンド）", baselineImpact: "+¥2,000/月", upsideImpact: "+¥6,000/月", detail: "夏休みの自由研究・SNS投稿用にAI画像生成の需要急増。「AI イラスト 無料」「AI 動画 作り方」。Canva Proアフィリが刺さる" },
  // 季節施策
  { timing: "2026年9-10月", lever: "確定申告シーズン準備記事の先行投入", baselineImpact: "+¥5,000/月", upsideImpact: "+¥30,000/月", detail: "「副業 確定申告 やり方」「freee 使い方」等の記事を先行公開。1-3月に検索が10倍になるため、SEO上位を先に取る" },
  { timing: "2026年9-10月", lever: "🔥年末調整×保険見直し記事", baselineImpact: "+¥3,000/月", upsideImpact: "+¥12,000/月", detail: "「年末調整 保険料控除」「自動車保険 乗り換え」が急増。保険見積り案件¥3,000×月4件=¥12,000" },
  { timing: "2026年10-11月", lever: "高単価案件の追加（プログラミングスクール等）", baselineImpact: "+¥0", upsideImpact: "+¥15,000/月", detail: "1件¥10,000〜¥30,000。AIエンジニア転職系の記事を追加。月1件でも大きい" },
  { timing: "2026年11月", lever: "🔥🔥ブラックフライデー/サイバーマンデー特集", baselineImpact: "+¥5,000/月", upsideImpact: "+¥25,000/月", detail: "AIツールの年額プランが30-50%OFFになる最大のセール。事前に比較記事を準備→セール開始と同時にSNSで拡散。ChatGPT/Claude/Midjourney/Notion等の全ツール横断比較が最強" },
  { timing: "2026年11月", lever: "🔥ふるさと納税駆け込み記事", baselineImpact: "+¥3,000/月", upsideImpact: "+¥10,000/月", detail: "12月締切前の11月に検索がピーク。「ふるさと納税 おすすめ」「さとふる 比較」。さとふる/ふるなびは単価¥1,000-3,000だが件数が出る" },
  { timing: "2026年12月", lever: "🔥年末商戦×新年準備まとめ", baselineImpact: "+¥5,000/月", upsideImpact: "+¥15,000/月", detail: "Amazon年末セール×物販。「来年使いたいAIツール」まとめ記事。NOTE「今年のAI総まとめ」有料記事" },
  { timing: "2027年1-3月", lever: "🔥🔥確定申告シーズン×全施策フル稼働", baselineImpact: "+¥25,000/月", upsideImpact: "+¥70,000/月", detail: "会計ソフト¥12,000×月5件=¥60,000。新生活準備→ネット回線¥5,000-15,000×月2件。引越し見積り。これだけで月10万射程" },
  { timing: "2027年2-3月", lever: "🔥新生活準備×ネット回線/引越し", baselineImpact: "+¥5,000/月", upsideImpact: "+¥20,000/月", detail: "「光回線 おすすめ」「引越し 見積もり 比較」。光回線は単価¥5,000-15,000。引越し一括見積りは¥3,000-8,000。新生活シーズンは3月がピーク" },
  // トレンド施策（2026年最新）
  { timing: "通年", lever: "🆕AIエージェント比較記事（2026年トレンド）", baselineImpact: "+¥3,000/月", upsideImpact: "+¥12,000/月", detail: "2026年はAIエージェント元年。Claude MCP/OpenAI Agents/Google Agentspace等が続々登場。「AIエージェント 比較」は競合が少なく先行者優位が取れる" },
  { timing: "通年", lever: "🆕AI動画生成ツール比較（急成長市場）", baselineImpact: "+¥2,000/月", upsideImpact: "+¥8,000/月", detail: "Sora/Runway/Pika/Kling等のAI動画生成が一般化。YouTuber・SNSクリエイター向け比較記事。市場急成長中で競合が少ない" },
  { timing: "通年", lever: "🆕ローカルAI/プライバシー重視AI（トレンド）", baselineImpact: "+¥1,000/月", upsideImpact: "+¥5,000/月", detail: "企業のAIデータ懸念からローカルLLM（Ollama/LM Studio等）への注目増。「AI ローカル 無料」「ChatGPT 代替 プライバシー」のニッチKW" },
];

export interface KPI {
  label: string;
  target: number;
  actual: number;
  unit: string;
  period: string;
}

export interface Milestone {
  label: string;
  deadline: string;
  status: "done" | "in_progress" | "upcoming" | "overdue";
  note?: string;
}

export interface SystemHealth {
  name: string;
  status: "healthy" | "warning" | "error" | "unknown";
  lastCheck?: string;
  note?: string;
}

export interface Blocker {
  issue: string;
  impact: string;
  impactAmount?: string;
  action: string;
  owner: "manual" | "auto";
  estimatedMinutes?: number;
}

export interface RevenueRoadmap {
  month: string;
  target: number;
  actual: number;
  breakdown: { source: string; target: number; actual: number }[];
}

export interface ProjectData {
  id: string;
  name: string;
  emoji: string;
  status: "live" | "review" | "dev" | "planned";
  statusLabel: string;
  phase: string;

  kpis: KPI[];
  milestones: Milestone[];
  health: SystemHealth[];
  blockers: Blocker[];
  todos: TodoItem[];
  revenueRoadmap: RevenueRoadmap[];

  competitors: { name: string; users: string; pricing: string }[];
  currentMonthly: number;
  monthlyTarget: number;
  revenue: RevenueScenario;
  revenueModel: string;
}

// ============================================================
// プロジェクトデータ
// ============================================================

export const PROJECTS: ProjectData[] = [
  // ─── web-media-engine（くらべるラボ）───
  {
    id: "web-media-engine",
    name: "Web Media Engine（くらべるラボ）",
    emoji: "🔬",
    status: "live",
    statusLabel: "稼働中",
    phase: "Phase 1: 量で当たりを探す（月1-2）",
    kpis: [
      { label: "公開記事数", target: 25, actual: 10, unit: "本", period: "Phase 1目標" },
      { label: "月間検索表示", target: 8000, actual: 0, unit: "回", period: "月間" },
      { label: "月間検索クリック", target: 250, actual: 0, unit: "回", period: "月間" },
      { label: "検索CTR", target: 3.2, actual: 0, unit: "%", period: "月間" },
      { label: "アフィクリック数", target: 30, actual: 0, unit: "回", period: "月間" },
      { label: "月間売上", target: 0, actual: 0, unit: "円", period: "月間" },
    ],
    milestones: [
      { label: "リポジトリ・CLI構築", deadline: "2026-03-19", status: "done" },
      { label: "サイト公開・10記事投入", deadline: "2026-03-19", status: "done" },
      { label: "ASP登録（A8/もしも）", deadline: "2026-03-19", status: "done" },
      { label: "ドメイン取得・DNS設定", deadline: "2026-03-19", status: "done" },
      { label: "Search Console登録", deadline: "2026-03-20", status: "in_progress" },
      { label: "Cloudflare Analytics設定", deadline: "2026-03-20", status: "in_progress" },
      { label: "ASP案件提携申請（freee/Notta等）", deadline: "2026-03-22", status: "upcoming" },
      { label: "X(Twitter)アカウント開設", deadline: "2026-03-25", status: "upcoming" },
      { label: "25記事到達", deadline: "2026-04-15", status: "upcoming" },
      { label: "初成果（アフィリエイト1件）", deadline: "2026-04-30", status: "upcoming" },
      { label: "Phase 2移行判定", deadline: "2026-05-19", status: "upcoming" },
    ],
    health: [
      { name: "GitHub Actions（記事生成）", status: "warning", note: "Gemini API無料枠のRPM制限で失敗あり" },
      { name: "GitHub Actions（監査/レポート）", status: "healthy" },
      { name: "Cloudflare Pages", status: "healthy", note: "デプロイ正常" },
      { name: "Gemini API", status: "warning", note: "日次枠使い切りで429。明日リセット" },
      { name: "Search Console", status: "unknown", note: "未登録" },
      { name: "Cloudflare Analytics", status: "unknown", note: "未設定" },
    ],
    blockers: [
      { issue: "Search Console未登録", impact: "KPI計測不可", impactAmount: "検索CTR/表示回数が取れず改善サイクルが回らない", action: "search.google.com/search-console でサイト登録", owner: "manual", estimatedMinutes: 5 },
      { issue: "Cloudflare Analytics未設定", impact: "PVデータ取得不可", action: "Cloudflareダッシュボードでトークン取得", owner: "manual", estimatedMinutes: 3 },
      { issue: "ASP案件未提携", impact: "収益化不可", impactAmount: "記事にアフィリリンクを貼れない = 月¥70,500の機会損失", action: "A8/もしもで「freee」「Notta」「Canva」を検索して提携申請", owner: "manual", estimatedMinutes: 15 },
      { issue: "X未開設", impact: "SNS流入ゼロ", impactAmount: "SEOだけでは月5万達成が厳しい。競合はSEO+SNSの2本柱", action: "X(Twitter)アカウント作成、AIツール情報発信開始", owner: "manual", estimatedMinutes: 10 },
    ],
    todos: [
      { task: "Search Console登録 + サイト認証", owner: "manual", priority: "critical", estimatedMinutes: 5, impact: "検索KPI（表示回数/クリック/CTR）が取れるようになり、改善サイクルが回り始める", detail: "1. https://search.google.com/search-console にアクセス\n2.「プロパティを追加」→「URLプレフィックス」→ https://kuraberu-lab.com\n3.「HTMLタグ」で確認 → content値をコピー\n4. Claude Codeに値を共有 → サイトに埋め込み → デプロイ" },
      { task: "Cloudflare Web Analyticsトークン設定", owner: "manual", priority: "critical", estimatedMinutes: 3, impact: "ページ別PVが取れ、どの記事が読まれているかわかる", detail: "1. https://dash.cloudflare.com/ → Analytics & logs → Web Analytics\n2.「Add a site」→ kuraberu-lab.com\n3. 表示されるトークンをコピー\n4. Claude Codeに共有 → サイトのPLACEHOLDERを差し替え" },
      { task: "A8.netでfreee/会計ソフト案件を提携申請", owner: "manual", priority: "critical", estimatedMinutes: 15, impact: "会計ソフト案件は1件¥12,000。月1件でもAIツール5件分の収益", detail: "1. A8.net にログイン（ID: kuraberulab777）\n2. プログラム検索で「freee」「マネーフォワード」「弥生」を検索\n3. 各案件の「提携申請する」をクリック\n4. 審査待ち（即時〜数日）" },
      { task: "もしもでAIツール系案件を提携申請", owner: "manual", priority: "critical", estimatedMinutes: 15, impact: "もしもはW報酬制度で+12%。同じ案件でもA8より得な場合がある", detail: "1. https://af.moshimo.com/ にログイン\n2.「Notta」「Canva」「DeepL」「AI」等で検索\n3. 各案件の提携申請\n4. Amazon/楽天もここで提携可能" },
      { task: "X(Twitter)アカウント開設・運用開始", owner: "manual", priority: "high", estimatedMinutes: 10, impact: "SEO+SNSの2本柱で流入を確保。競合はほぼ全社SNS併用", detail: "1. https://x.com でアカウント作成（個人名義推奨）\n2. プロフィール: AIツールを試して比較する人\n3. 初日: 自己紹介+記事リンク3本投稿\n4. 以降: 毎日1-2投稿（記事告知/AIツール速報/Tips）" },
      { task: "記事の自動生成（毎日3本）", owner: "auto", priority: "high", detail: "GitHub Actions: content-draft（JST 9:15/15:15/20:15）\ndraft→enrich→AIレビュー→publish→コミットの完全自動パイプライン" },
      { task: "daily-audit: 記事監査・改善候補抽出", owner: "auto", priority: "high", detail: "GitHub Actions: daily-audit（JST 6:00）\n薄い記事/古い記事/孤立記事/案件未設定を自動検出\nreports/audit/latest.md に結果保存" },
      { task: "weekly-report: 週次KPIレポート", owner: "auto", priority: "high", detail: "GitHub Actions: weekly-report（毎週月曜JST 7:00）\nSearch Console/PV/改善候補を自動集計\nreports/weekly/ に保存" },
      { task: "monthly-report: 月次分析", owner: "auto", priority: "medium", detail: "GitHub Actions: monthly-report（毎月1日JST 7:00）\nテーマ別パフォーマンス/案件成果率/翌月重点改善対象\nreports/monthly/ に保存" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "基盤構築期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 8000, actual: 0, breakdown: [{ source: "AIツール", target: 5000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-06", target: 8000, actual: 0, breakdown: [{ source: "AIツール", target: 5000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-07", target: 15000, actual: 0, breakdown: [{ source: "AIツール", target: 8000, actual: 0 }, { source: "会計ソフト", target: 4000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-08", target: 15000, actual: 0, breakdown: [{ source: "AIツール", target: 8000, actual: 0 }, { source: "会計ソフト", target: 4000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-09", target: 25000, actual: 0, breakdown: [{ source: "AIツール", target: 12000, actual: 0 }, { source: "会計ソフト", target: 8000, actual: 0 }, { source: "Amazon", target: 5000, actual: 0 }] },
      { month: "2026-10", target: 35000, actual: 0, breakdown: [{ source: "AIツール", target: 15000, actual: 0 }, { source: "会計ソフト", target: 12000, actual: 0 }, { source: "Amazon", target: 8000, actual: 0 }] },
      { month: "2026-11", target: 50000, actual: 0, breakdown: [{ source: "AIツール", target: 20000, actual: 0 }, { source: "会計ソフト", target: 18000, actual: 0 }, { source: "Amazon", target: 12000, actual: 0 }] },
    ],
    competitors: [
      { name: "WEEL", users: "法人メディア", pricing: "コンサル誘導" },
      { name: "AIsmiley", users: "500製品掲載", pricing: "資料請求リード" },
      { name: "マイベスト", users: "数万記事", pricing: "ASPアフィリエイト" },
      { name: "SHIFT AI TIMES", users: "フォロワー10万", pricing: "コミュニティ販売" },
    ],
    currentMonthly: 0,
    monthlyTarget: 50000,
    revenue: {
      bad: 2000,
      normal: 25000,
      good: 70000,
      badNote: "SEOが弱く月間PV3,000以下。アフィリ成果が月1〜2件のみ",
      normalNote: "月間PV15,000、会計ソフト月1件(¥12,000)+AIツール月3件+Amazon月15件",
      goodNote: "月間PV40,000、会計ソフト月2件+保険3件+AIツール6件+Amazon30件",
    },
    revenueModel: "アフィリエイト（会計ソフト/保険/AI/Amazon）",
  },

  // ─── note-writer（ゆき）───
  {
    id: "note-writer",
    name: "NOTE Writer（ゆき）",
    emoji: "📝",
    status: "live",
    statusLabel: "稼働中",
    phase: "Phase 1: 記事蓄積・フォロワー獲得",
    kpis: [
      { label: "はてなブログ記事数", target: 20, actual: 9, unit: "本", period: "累計" },
      { label: "NOTE記事数", target: 15, actual: 7, unit: "本", period: "累計" },
      { label: "NOTEフォロワー", target: 50, actual: 1, unit: "人", period: "累計" },
      { label: "NOTE有料記事売上", target: 3000, actual: 0, unit: "円", period: "月間" },
      { label: "はてなアフィリエイト", target: 1000, actual: 0, unit: "円", period: "月間" },
    ],
    milestones: [
      { label: "はてなブログ・NOTE自動投稿構築", deadline: "2026-03-18", status: "done" },
      { label: "9記事投入（はてな）", deadline: "2026-03-19", status: "done" },
      { label: "7記事投入（NOTE）", deadline: "2026-03-19", status: "done" },
      { label: "ASP登録（A8/もしも）", deadline: "2026-03-20", status: "in_progress" },
      { label: "はてなブログ20記事到達", deadline: "2026-04-05", status: "upcoming" },
      { label: "NOTE15記事到達", deadline: "2026-04-05", status: "upcoming" },
      { label: "NOTEマガジン作成", deadline: "2026-04-10", status: "upcoming" },
      { label: "NOTEフォロワー50人", deadline: "2026-05-01", status: "upcoming" },
      { label: "初有料記事売上", deadline: "2026-05-15", status: "upcoming" },
    ],
    health: [
      { name: "GitHub Actions（記事生成）", status: "healthy", note: "毎日3トピック×2記事" },
      { name: "NOTE headless投稿", status: "warning", note: "サーバー環境で動作未検証" },
      { name: "はてなブログAPI", status: "healthy" },
      { name: "Gemini API", status: "warning", note: "日次枠上限あり" },
    ],
    blockers: [
      { issue: "NOTE headless投稿のサーバー検証未完了", impact: "NOTE自動投稿が止まる可能性", action: "GitHub Actions結果を確認、失敗時はxvfb対応", owner: "manual", estimatedMinutes: 15 },
      { issue: "ASP未登録", impact: "はてなブログにアフィリリンクが貼れない", impactAmount: "月¥1,000〜¥5,000の機会損失", action: "A8.net/もしもでアフィリエイト提携申請", owner: "manual", estimatedMinutes: 10 },
      { issue: "X連携停止中", impact: "SNS流入ゼロ", impactAmount: "フォロワー獲得速度が大幅に低下", action: "X API再申請 or 手動ツイート週3回", owner: "manual", estimatedMinutes: 10 },
    ],
    todos: [
      { task: "明日のGitHub Actions結果を確認", owner: "manual", priority: "critical", estimatedMinutes: 5, impact: "自動投稿が動いているか確認。失敗していたらxvfb対応が必要", detail: "1. https://github.com/RyotaTokuda/note-writer/actions を開く\n2. 最新のワークフロー実行結果を確認\n3. 成功: OK、次のステップへ\n4. 失敗: ログを確認し、headless Chrome関連ならxvfb対応が必要" },
      { task: "A8.net/もしもでNOTE Writer向け案件を提携申請", owner: "manual", priority: "high", estimatedMinutes: 15, impact: "はてなブログにアフィリリンクを貼れるようになる。月¥1,000〜¥5,000の収益源", detail: "1. A8.netログイン → はてなブログのジャンルに合う案件を検索\n2. 生活/暮らし/節約系の案件を提携申請\n3. もしもでも同様に検索・申請\n4. Amazon/楽天は既に使える（yukikurashi-22）" },
      { task: "NOTE headless投稿が失敗したらxvfb対応", owner: "auto", priority: "high", detail: "GitHub ActionsのUbuntu環境でPlaywrightを使ったNOTE自動投稿。ディスプレイがないためxvfb（仮想ディスプレイ）が必要な場合がある" },
      { task: "30記事到達後にNOTEマガジン作成", owner: "manual", priority: "medium", estimatedMinutes: 10, impact: "月額980円のマガジン。購読者10人で月¥9,800。記事が溜まったタイミングで作成", detail: "1. NOTE管理画面 →「マガジンを作る」\n2. テーマに沿ったマガジン名を設定（例:「暮らしのAI活用ラボ」）\n3. 月額980円に設定\n4. 既存の有料記事をマガジンに追加\n5. 無料記事の末尾にマガジン誘導CTAを追加" },
      { task: "X API再申請 or 手動ツイート週3回", owner: "manual", priority: "medium", estimatedMinutes: 10, impact: "SNSからの流入がないとフォロワー獲得が遅い", detail: "1. X API Developer Portal で再申請（審査1-2週間）\n2. 待てない場合は手動で週3回ツイート\n3. 記事公開告知+テーマに関連するTips投稿" },
      { task: "記事の自動投稿（毎日3トピック×2記事）", owner: "auto", priority: "high", detail: "GitHub Actions: はてなブログ+NOTE自動投稿\nGemini APIで記事生成→はてなブログAPI→NOTE headless投稿" },
      { task: "週次PDCA分析（毎週日曜自動）", owner: "auto", priority: "high", detail: "GitHub Actions: 週次分析\nはてなアクセス解析/NOTE統計を取得→改善候補抽出→レポート生成" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "記事蓄積期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 3000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 2000, actual: 0 }, { source: "はてなアフィリ", target: 1000, actual: 0 }] },
      { month: "2026-06", target: 5000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 3000, actual: 0 }, { source: "はてなアフィリ", target: 2000, actual: 0 }] },
      { month: "2026-07", target: 8000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 5000, actual: 0 }, { source: "はてなアフィリ", target: 3000, actual: 0 }] },
      { month: "2026-08", target: 10000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 6000, actual: 0 }, { source: "マガジン", target: 2000, actual: 0 }, { source: "はてなアフィリ", target: 2000, actual: 0 }] },
      { month: "2026-09", target: 15000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 8000, actual: 0 }, { source: "マガジン", target: 4000, actual: 0 }, { source: "はてなアフィリ", target: 3000, actual: 0 }] },
    ],
    competitors: [
      { name: "note平均的クリエイター", users: "大多数", pricing: "月0〜5,000円" },
      { name: "note中堅層（継続発信）", users: "数万人", pricing: "月1万〜5万円" },
      { name: "noteトップ1000", users: "1,000人", pricing: "平均月126万円" },
    ],
    currentMonthly: 0,
    monthlyTarget: 70000,
    revenue: {
      bad: 3000,
      normal: 30000,
      good: 70000,
      badNote: "記事は溜まるがフォロワーが伸びず、有料記事が月10本しか売れない",
      normalNote: "フォロワー500人、有料記事月80本(CVR1.5%)、マガジン月10本。はてなアフィリ月5000円",
      goodNote: "フォロワー1000人、有料記事月200本、マガジン月20本。はてなアフィリ月10000円。コラボ・メルマガ連携",
    },
    revenueModel: "有料記事 + マガジン + アフィリエイト",
  },

  // ─── 駐車料金リーダー ───
  {
    id: "parking-reader",
    name: "駐車料金リーダー",
    emoji: "🅿️",
    status: "review",
    statusLabel: "ストア審査待ち",
    phase: "Phase 4: ストア公開",
    kpis: [
      { label: "開発進捗", target: 100, actual: 90, unit: "%", period: "累計" },
      { label: "App Store申請", target: 1, actual: 0, unit: "件", period: "累計" },
    ],
    milestones: [
      { label: "Phase 1-3 実装完了", deadline: "2026-03-15", status: "done" },
      { label: "Apple Developer申請", deadline: "2026-03-16", status: "done" },
      { label: "Apple Developer承認", deadline: "2026-03-23", status: "in_progress", note: "3/16申請済み" },
      { label: "EAS Build → TestFlight", deadline: "2026-03-25", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-03-28", status: "upcoming" },
      { label: "Google Play同時申請", deadline: "2026-03-28", status: "upcoming" },
    ],
    health: [
      { name: "RevenueCat", status: "healthy", note: "課金実装済み" },
      { name: "Gemini API", status: "healthy", note: "料金解析用" },
    ],
    blockers: [
      { issue: "Apple Developer承認待ち", impact: "ストア公開不可", impactAmount: "公開が1日遅れるごとに機会損失", action: "Apple側の処理を待つ（3/16申請済み）", owner: "manual", estimatedMinutes: 0 },
    ],
    todos: [
      { task: "Apple Developer承認を待つ", owner: "manual", priority: "critical", blocked: "Apple側の処理待ち" },
      { task: "承認後: EAS Build", owner: "auto", priority: "high", blocked: "Apple Developer承認" },
      { task: "TestFlight → App Store申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "Google Play同時申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "ランディングページ/スクリーンショット準備", owner: "manual", priority: "medium" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "公開準備期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 3000, actual: 0, breakdown: [{ source: "サブスク", target: 3000, actual: 0 }] },
      { month: "2026-06", target: 5000, actual: 0, breakdown: [{ source: "サブスク", target: 5000, actual: 0 }] },
    ],
    competitors: [
      { name: "PPPark!", users: "累計300万DL", pricing: "無料（広告）" },
      { name: "akippa", users: "会員450万人", pricing: "無料（予約手数料）" },
      { name: "タイムズ検索", users: "業界1位", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 20000,
    revenue: {
      bad: 1000, normal: 8000, good: 30000,
      badNote: "PPPark(300万DL,4.5★)が市場を支配。差別化できず月100DL以下",
      normalNote: "AI料金解析という独自機能で月500DL、課金率5%で25人×¥350",
      goodNote: "SNSやブログで話題になり月2000DL、課金率5%で100人×¥350",
    },
    revenueModel: "サブスクリプション（3段階）",
  },

  // ─── しめどき ───
  {
    id: "shimedoki",
    name: "しめどき",
    emoji: "⏰",
    status: "dev",
    statusLabel: "MVP完了",
    phase: "Phase 3: テスト・申請",
    kpis: [
      { label: "開発進捗", target: 100, actual: 80, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "MVP実装", deadline: "2026-03-14", status: "done" },
      { label: "Xcodeインストール", deadline: "2026-03-25", status: "upcoming" },
      { label: "実機テスト", deadline: "2026-03-28", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-04-01", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Xcodeが未インストール", impact: "テスト不可", action: "Xcodeをインストール", owner: "manual", estimatedMinutes: 30 },
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "iPhone + Apple Watchで実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "Meeting Timer: Cost Tracking", users: "少数", pricing: "無料/有料" },
      { name: "Time Timer", users: "ブランド力あり", pricing: "$2.99〜" },
      { name: "Apple純正タイマー", users: "全ユーザー", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 5000,
    revenue: {
      bad: 0, normal: 3000, good: 10000,
      badNote: "市場が小さすぎてDL数が月50以下",
      normalNote: "ニッチだが競合なし。月200DL、課金率3%で6人×¥500",
      goodNote: "ビジネスパーソンに刺さり月500DL、課金率5%",
    },
    revenueModel: "Free / Plus（月額/年額）",
  },

  // ─── DoneLog ───
  {
    id: "done-log",
    name: "DoneLog",
    emoji: "✅",
    status: "dev",
    statusLabel: "MVP完了",
    phase: "Phase 3: テスト・申請",
    kpis: [
      { label: "開発進捗", target: 100, actual: 75, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "Phase 3 実装完了", deadline: "2026-03-14", status: "done" },
      { label: "Xcodeインストール", deadline: "2026-03-25", status: "upcoming" },
      { label: "実機テスト", deadline: "2026-03-28", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-04-01", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Xcodeが未インストール", impact: "テスト不可", action: "Xcodeをインストール", owner: "manual", estimatedMinutes: 30 },
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
      { task: "マイルーティンとの差別化ポイントを明確にする", owner: "manual", priority: "medium" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "マイルーティン", users: "累計300万DL", pricing: "無料+サブスク" },
      { name: "Streaks", users: "Apple Design Award", pricing: "$4.99買い切り" },
      { name: "Habitify", users: "レビュー15万件", pricing: "$29.99/年" },
    ],
    currentMonthly: 0,
    monthlyTarget: 5000,
    revenue: {
      bad: 0, normal: 5000, good: 30000,
      badNote: "Streaks(★4.8)やマイルーティン(300万DL)等の強豪と差別化できず",
      normalNote: "ワンタップの簡便さが刺さり月300DL、課金率3%",
      goodNote: "習慣トラッカー市場は年14%成長。日本市場特化で月1000DL",
    },
    revenueModel: "Free / Plus",
  },

  // ─── ローカルファイル変換 ───
  {
    id: "file-converter",
    name: "ローカルファイル変換",
    emoji: "🔄",
    status: "dev",
    statusLabel: "MVP完了・未デプロイ",
    phase: "Phase 2: デプロイ",
    kpis: [
      { label: "開発進捗", target: 100, actual: 70, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "MVP実装", deadline: "2026-03-10", status: "done" },
      { label: "Vercelデプロイ", deadline: "2026-03-22", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Vercel未デプロイ", impact: "ユーザーがアクセスできない", action: "Vercelデプロイ（5分）", owner: "manual", estimatedMinutes: 5 },
    ],
    todos: [
      { task: "Vercelデプロイ（5分）", owner: "manual", priority: "high" },
      { task: "動画変換(ffmpeg.wasm)追加", owner: "auto", priority: "medium" },
      { task: "PWA対応", owner: "auto", priority: "low" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "iLoveIMG", users: "世界最大級", pricing: "無料/Premium$4/月" },
      { name: "heic2jpg.com", users: "不明", pricing: "無料（広告）" },
      { name: "CopyTrans HEIC", users: "不明", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 3000,
    revenue: {
      bad: 0, normal: 2000, good: 10000,
      badNote: "iLoveIMG等の大手に埋もれてPV伸びず",
      normalNote: "「サーバー送信なし」でニッチ層を獲得。月5000PV",
      goodNote: "ファイル変換ツールで月$4,000MRRの成功例あり",
    },
    revenueModel: "広告（将来）",
  },

  // ─── 車の維持費シミュレーター ───
  {
    id: "car-cost-sim",
    name: "車の維持費シミュレーター",
    emoji: "🧮",
    status: "live",
    statusLabel: "公開中",
    phase: "Phase 2: 改善・収益化",
    kpis: [
      { label: "月間PV", target: 5000, actual: 0, unit: "PV", period: "月間" },
      { label: "保険見積りCV", target: 3, actual: 0, unit: "件", period: "月間" },
    ],
    milestones: [
      { label: "MVP実装・公開", deadline: "2026-03-19", status: "done", note: "kuraberu-lab.com/tools/car-cost/" },
      { label: "OGP画像追加", deadline: "2026-03-21", status: "done" },
      { label: "UI改善・テスト追加", deadline: "2026-03-22", status: "done" },
      { label: "自動車保険ASP提携", deadline: "2026-04-15", status: "upcoming" },
      { label: "web-media-engineとの記事連携", deadline: "2026-04-30", status: "upcoming" },
    ],
    health: [
      { name: "Vercel デプロイ", status: "healthy", note: "kuraberu-lab.com/tools/car-cost/" },
      { name: "GitHub Actions CI", status: "healthy", note: "lint/typecheck/バンドル/ライセンス全通過" },
    ],
    blockers: [
      { issue: "自動車保険ASP未提携", impact: "保険見積りアフィリが貼れない", impactAmount: "月¥10,000〜¥30,000の機会損失", action: "A8/もしもで自動車保険案件を提携申請", owner: "manual", estimatedMinutes: 15 },
    ],
    todos: [
      { task: "自動車保険ASP案件を提携申請", owner: "manual", priority: "high", estimatedMinutes: 15, impact: "保険見積り1件¥3,000〜¥5,000。月3件で¥9,000〜¥15,000" },
      { task: "web-media-engineの車関連記事からシミュレーターへ誘導", owner: "auto", priority: "medium" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "SEO蓄積期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 5000, actual: 0, breakdown: [{ source: "保険見積り", target: 5000, actual: 0 }] },
      { month: "2026-06", target: 10000, actual: 0, breakdown: [{ source: "保険見積り", target: 8000, actual: 0 }, { source: "ローン", target: 2000, actual: 0 }] },
    ],
    competitors: [
      { name: "自動車ランニングコスト", users: "62,000車種DB", pricing: "無料（広告）" },
      { name: "高精度計算サイト(CASIO)", users: "大手", pricing: "無料" },
      { name: "ガリバー/楽天Car等の大手", users: "SEO上位独占", pricing: "無料記事" },
    ],
    currentMonthly: 0,
    monthlyTarget: 20000,
    revenue: {
      bad: 0, normal: 10000, good: 30000,
      badNote: "大手中古車サイトがSEO上位を独占。個人サイトが勝てない",
      normalNote: "ロングテールKWで月1万PV。保険見積り月3件",
      goodNote: "自動車保険+ローンアフィリで月3万円。web-media-engineと連携で相乗効果",
    },
    revenueModel: "アフィリエイト（保険/ローン）",
  },

  // ─── 痛み手帳 ───
  {
    id: "itami-techo",
    name: "痛み手帳",
    emoji: "💊",
    status: "dev",
    statusLabel: "実装完了・テスト前",
    phase: "Phase 3: テスト・申請",
    kpis: [
      { label: "開発進捗", target: 100, actual: 85, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "全Phase実装（iOS+watchOS）", deadline: "2026-03-22", status: "done" },
      { label: "コード品質改善・テスト追加", deadline: "2026-03-22", status: "done" },
      { label: "Xcodeビルド・実機テスト", deadline: "2026-03-28", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-04-05", status: "upcoming" },
    ],
    health: [
      { name: "GitHub Actions CI", status: "healthy", note: "PR #52 CIオールグリーン" },
    ],
    blockers: [
      { issue: "Xcodeビルド未実施", impact: "実機テスト不可", action: "Xcodeでビルド→iPhone+Apple Watchで動作確認", owner: "manual", estimatedMinutes: 30 },
      { issue: "feat/itami-techo PRがマージ前", impact: "mainに未統合", action: "PR #52 をレビュー・マージ", owner: "manual", estimatedMinutes: 5 },
    ],
    todos: [
      { task: "feat/itami-techo PR をレビュー・マージ", owner: "manual", priority: "critical", estimatedMinutes: 5, impact: "mainに統合されないと次のステップに進めない" },
      { task: "Xcodeでビルド・実機テスト（iPhone + Apple Watch）", owner: "manual", priority: "critical", estimatedMinutes: 30, impact: "HealthKit/WatchConnectivity/StoreKit 2の動作を実機で確認" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト", estimatedMinutes: 30 },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "公開準備期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 2000, actual: 0, breakdown: [{ source: "サブスク(月額¥390)", target: 2000, actual: 0 }] },
      { month: "2026-06", target: 4000, actual: 0, breakdown: [{ source: "サブスク", target: 4000, actual: 0 }] },
    ],
    competitors: [
      { name: "頭痛ーる", users: "累計1500万DL", pricing: "無料+プレミアム" },
      { name: "つらいメモ", users: "評価4.5★", pricing: "無料" },
      { name: "My Symptoms", users: "グローバル", pricing: "$4.99/月" },
    ],
    currentMonthly: 0,
    monthlyTarget: 10000,
    revenue: {
      bad: 0, normal: 5000, good: 20000,
      badNote: "頭痛ーる(1500万DL)が市場を支配。体調記録の汎用性で差別化できず",
      normalNote: "Apple Watch即時記録+HealthKit連携で差別化。月300DL、課金率5%",
      goodNote: "通院サポート（PDF出力）が刺さり月800DL。慢性疾患コミュニティで拡散",
    },
    revenueModel: "Free / Pro（月額¥390 / 年額¥3,900）",
  },

  // ─── おうちストック ───
  {
    id: "home-stock",
    name: "おうちストック",
    emoji: "🏠",
    status: "dev",
    statusLabel: "開発中",
    phase: "Phase 1: MVP実装",
    kpis: [
      { label: "開発進捗", target: 100, actual: 20, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "テンプレート作成", deadline: "2026-03-10", status: "done" },
      { label: "MVP機能実装", deadline: "2026-05-01", status: "upcoming" },
    ],
    health: [],
    blockers: [],
    todos: [
      { task: "MVP機能実装（アイテム登録/通知/一覧）", owner: "auto", priority: "low" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "zaico", users: "18万社", pricing: "無料(200件)/有料" },
      { name: "うちメモ", users: "不明", pricing: "無料" },
      { name: "monoca", users: "不明", pricing: "無料/プレミアム" },
    ],
    currentMonthly: 0,
    monthlyTarget: 3000,
    revenue: {
      bad: 0, normal: 2000, good: 8000,
      badNote: "zaico(18万社)やうちメモが既にある。無料アプリが多く課金率が低い",
      normalNote: "「交換時期通知」で差別化。月200DL、課金率2%",
      goodNote: "消耗品管理のニッチで月500DL",
    },
    revenueModel: "Free / Paid",
  },
];

// ============================================================
// 集計ヘルパー
// ============================================================

export function getRevenueSimulation() {
  const totals = { bad: 0, normal: 0, good: 0 };
  const items = PROJECTS.map((p) => {
    totals.bad += p.revenue.bad;
    totals.normal += p.revenue.normal;
    totals.good += p.revenue.good;
    return p;
  });
  return { items, totals };
}

export function getAllBlockers(): (Blocker & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.blockers.map((b) => ({ ...b, project: p.name, emoji: p.emoji }))
  );
}

export function getAllMilestones(): (Milestone & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.milestones.map((m) => ({ ...m, project: p.name, emoji: p.emoji }))
  ).sort((a, b) => a.deadline.localeCompare(b.deadline));
}

export function getAllHealth(): (SystemHealth & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.health.map((h) => ({ ...h, project: p.name, emoji: p.emoji }))
  );
}
