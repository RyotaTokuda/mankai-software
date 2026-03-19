// ============================================================
// 収入シミュレーション（競合調査ベースの精密試算）
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
  owner: "auto" | "manual"; // auto=システムがやる, manual=オーナーがやる
  priority: "critical" | "high" | "medium" | "low";
  blocked?: string; // ブロッカーがある場合
}

export interface ProjectData {
  id: string;
  name: string;
  emoji: string;
  status: "live" | "review" | "dev" | "planned";
  statusLabel: string;
  progress: number;
  revenueModel: string;
  pricing?: string;
  pricingFunnel?: string;
  retention?: string;
  monthlyTarget: number;
  currentMonthly: number;
  revenue: RevenueScenario;
  competitors: { name: string; users: string; pricing: string }[];
  weakPoints: string[];
  todos: TodoItem[];
  metrics: { label: string; value: string; trend?: "up" | "down" | "flat" }[];
  aiSuggestions: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    id: "note-writer",
    name: "NOTE Writer（ゆき）",
    emoji: "📝",
    status: "live",
    statusLabel: "稼働中",
    progress: 85,
    revenueModel: "有料記事 + マガジン + アフィリエイト",
    pricing: "有料記事: 300〜500円 / マガジン: 980円 / Amazon: tag=yukikurashi-22",
    pricingFunnel: "Google検索 → はてな(無料+アフィリ) → NOTE誘導 → 無料記事 → 有料記事 → マガジン",
    retention: "シリーズ化、ペルソナの一貫性、記事末尾の次回予告",
    monthlyTarget: 50000,
    currentMonthly: 0,
    revenue: {
      bad: 3000,
      normal: 15000,
      good: 50000,
      badNote: "記事は溜まるがフォロワーが伸びず、有料記事が月10本しか売れない",
      normalNote: "フォロワー300人、有料記事月50本(CVR1%)、マガジン月5本。はてなアフィリ月2000円",
      goodNote: "フォロワー800人、有料記事月137本、マガジン月12本。はてなアフィリ月5000円。noteの有料コンテンツ流通額は年127%成長中",
    },
    competitors: [
      { name: "note平均的クリエイター", users: "大多数", pricing: "月0〜5,000円" },
      { name: "note中堅層（継続発信）", users: "数万人", pricing: "月1万〜5万円" },
      { name: "noteトップ1000", users: "1,000人", pricing: "平均月126万円" },
    ],
    weakPoints: [
      "NOTE headless投稿がサーバーで動くか未検証",
      "X連携がAPI審査落ちで停止中",
      "SEO流入が立つまで2〜3ヶ月",
      "記事がまだ9本（目標20本で種まき完了）",
    ],
    todos: [
      { task: "明日のGitHub Actions結果を確認", owner: "manual", priority: "critical" },
      { task: "A8.net/もしもアフィリエイトに登録", owner: "manual", priority: "critical" },
      { task: "NOTE headless投稿が失敗したらxvfb対応", owner: "auto", priority: "high" },
      { task: "30記事到達後にNOTEマガジン作成", owner: "manual", priority: "medium" },
      { task: "X API再申請 or 手動ツイート週3回", owner: "manual", priority: "medium" },
      { task: "記事の自動投稿（毎日3トピック×2記事）", owner: "auto", priority: "high" },
      { task: "週次PDCA分析（毎週日曜自動）", owner: "auto", priority: "high" },
    ],
    metrics: [
      { label: "はてなブログ記事数", value: "9本", trend: "up" },
      { label: "NOTE記事数", value: "7本", trend: "up" },
      { label: "NOTEフォロワー", value: "1人", trend: "flat" },
      { label: "有料記事", value: "1本（300円）", trend: "flat" },
      { label: "今月売上", value: "¥0", trend: "flat" },
    ],
    aiSuggestions: [
      "ASP登録が未完了。はてなブログにアフィリリンクを貼れない状態。最優先",
      "noteの有料コンテンツ市場は年127%成長。早期参入のメリット大",
      "X連携停止中。手動でもいいので週3回ブログリンクをツイートすべき",
    ],
  },
  {
    id: "web-media-engine",
    name: "Web Media Engine（くらべるラボ）",
    emoji: "🔬",
    status: "live",
    statusLabel: "稼働中",
    progress: 75,
    revenueModel: "アフィリエイト（会計ソフト/保険/AI/Amazon）",
    pricing: "会計ソフト¥12,000/件、自動車保険¥3,000/件、AIツール¥2,500/件",
    pricingFunnel: "Google検索 → 収益記事(アフィリリンク) → 成果報酬",
    retention: "SEOで継続流入。記事の定期更新",
    monthlyTarget: 70500,
    currentMonthly: 0,
    revenue: {
      bad: 2000,
      normal: 25000,
      good: 70000,
      badNote: "SEOが弱く月間PV3,000以下。アフィリ成果が月1〜2件のみ",
      normalNote: "月間PV15,000、会計ソフト月1件(¥12,000)+AIツール月3件+Amazon月15件",
      goodNote: "月間PV40,000、会計ソフト月2件+保険3件+AIツール6件+Amazon30件。ブログ収益の中央値は月1,000〜5,000円だが、3年継続で飛躍的に向上",
    },
    competitors: [
      { name: "アフィリエイター(収入なし)", users: "全体の30%", pricing: "¥0" },
      { name: "副業レベル(月3〜20万)", users: "全体の12%", pricing: "月3〜20万円" },
      { name: "本業レベル(月20万+)", users: "全体の21%", pricing: "月20万円+" },
    ],
    weakPoints: [
      "ASP案件が未契約 → 収益ゼロのまま",
      "DNS未設定、Search Console未登録",
      "記事数0本",
    ],
    todos: [
      { task: "A8.net/もしもアフィリエイト/アクセストレードに登録", owner: "manual", priority: "critical" },
      { task: "freee・自動車保険見積りの案件を申請", owner: "manual", priority: "critical" },
      { task: "DNS設定してドメイン有効化", owner: "manual", priority: "high" },
      { task: "Search Console登録", owner: "manual", priority: "high" },
      { task: "記事の自動生成（毎日3本）", owner: "auto", priority: "high" },
      { task: "副業手取り計算ツールの開発", owner: "auto", priority: "medium" },
    ],
    metrics: [
      { label: "公開記事数", value: "0本", trend: "flat" },
      { label: "ASP契約", value: "未登録", trend: "flat" },
      { label: "ドメイン", value: "DNS未設定", trend: "flat" },
    ],
    aiSuggestions: [
      "ASP未登録が致命的。記事生成は動いているが収益化できない",
      "アフィリエイター全体の30%が収入ゼロ。差別化はSEOキーワード戦略が鍵",
      "確定申告シーズン（1-3月）向け記事を先行準備すべき",
    ],
  },
  {
    id: "parking-reader",
    name: "駐車料金リーダー",
    emoji: "🅿️",
    status: "review",
    statusLabel: "ストア審査待ち",
    progress: 90,
    revenueModel: "サブスクリプション（3段階）",
    pricing: "無料 / 1日パス¥160 / 月額¥350",
    pricingFunnel: "App Store → 無料DL → 使って価値実感 → 1日パス → 月額へ",
    retention: "駐車のたびに使う日常ツール",
    monthlyTarget: 20000,
    currentMonthly: 0,
    revenue: {
      bad: 1000,
      normal: 8000,
      good: 30000,
      badNote: "PPPark(300万DL,4.5★)が市場を支配。差別化できず月100DL以下",
      normalNote: "AI料金解析という独自機能で月500DL、課金率5%で25人×¥350",
      goodNote: "SNSやブログで話題になり月2000DL、課金率5%で100人×¥350。PPParkにない「看板撮影→即計算」が刺さる",
    },
    competitors: [
      { name: "PPPark!", users: "累計300万DL", pricing: "無料（広告）" },
      { name: "akippa", users: "会員450万人", pricing: "無料（予約手数料）" },
      { name: "タイムズ検索", users: "業界1位", pricing: "無料" },
    ],
    weakPoints: [
      "Apple Developer承認がブロッカー（3/16申請）",
      "PPParkが圧倒的（300万DL、★4.5、レビュー46,000件）",
      "Gemini API無料枠の上限（ユーザー増加時のコスト）",
    ],
    todos: [
      { task: "Apple Developer承認を待つ", owner: "manual", priority: "critical", blocked: "Apple側の処理待ち" },
      { task: "承認後: EAS Build", owner: "auto", priority: "high", blocked: "Apple Developer承認" },
      { task: "TestFlight → App Store申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "Google Play同時申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "ランディングページ/スクリーンショット準備", owner: "manual", priority: "medium" },
    ],
    metrics: [
      { label: "開発進捗", value: "Phase 1-3 完了", trend: "up" },
      { label: "Apple Developer", value: "申請中（3/16〜）", trend: "flat" },
      { label: "課金実装", value: "RevenueCat済み", trend: "up" },
    ],
    aiSuggestions: [
      "PPParkは広告モデル。サブスクで差別化できるが、無料のPPParkとの競争は厳しい",
      "Apple承認待ちの間にスクリーンショットとASO(App Store Optimization)を準備すべき",
      "ユーザー増加時のGemini APIコスト：月額課金ユーザーにはPro版APIを検討",
    ],
  },
  {
    id: "shimedoki",
    name: "しめどき",
    emoji: "⏰",
    status: "dev",
    statusLabel: "MVP完了",
    progress: 80,
    revenueModel: "Free / Plus（月額/年額）",
    pricing: "無料（3テンプレ/7日履歴） / Plus",
    pricingFunnel: "App Store → 無料DL → 会議で便利 → Plus購入",
    retention: "毎回の会議で使用",
    monthlyTarget: 5000,
    currentMonthly: 0,
    revenue: {
      bad: 0,
      normal: 3000,
      good: 10000,
      badNote: "市場が小さすぎてDL数が月50以下。Apple Watch対応アプリの収益化は困難と広く認識",
      normalNote: "ニッチだが競合なし。月200DL、課金率3%で6人×¥500",
      goodNote: "ビジネスパーソンに刺さり月500DL、課金率5%。Apple Watchアプリは競合少なくファーストムーバー優位",
    },
    competitors: [
      { name: "Meeting Timer: Cost Tracking", users: "少数", pricing: "無料/有料" },
      { name: "Time Timer", users: "ブランド力あり", pricing: "$2.99〜" },
      { name: "Apple純正タイマー", users: "全ユーザー", pricing: "無料" },
    ],
    weakPoints: [
      "Xcodeが未インストール → テスト不可",
      "Apple Watch市場が小さい",
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "iPhone + Apple Watchで実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
    ],
    metrics: [
      { label: "開発進捗", value: "MVP実装済み", trend: "up" },
      { label: "テスト", value: "未テスト", trend: "flat" },
    ],
    aiSuggestions: [
      "Apple Watchアプリは競合が極めて少ない。ニッチだがファーストムーバー優位がある",
      "駐車料金リーダーと同時にApp Store申請すれば効率的",
    ],
  },
  {
    id: "done-log",
    name: "DoneLog",
    emoji: "✅",
    status: "dev",
    statusLabel: "MVP完了",
    progress: 75,
    revenueModel: "Free / Plus",
    pricing: "無料（8ボタン/14日履歴） / Plus（無制限）",
    pricingFunnel: "App Store → 無料DL → 毎日使う → 上限に達する → Plus",
    retention: "データが溜まるほど解約しにくい",
    monthlyTarget: 5000,
    currentMonthly: 0,
    revenue: {
      bad: 0,
      normal: 5000,
      good: 30000,
      badNote: "Streaks(★4.8)やマイルーティン(300万DL)等の強豪と差別化できず埋もれる",
      normalNote: "ワンタップの簡便さが刺さり月300DL、課金率3%。月10人×¥500",
      goodNote: "習慣トラッカー市場は年14%成長(2025年132億ドル)。日本市場特化で月1000DL、課金率5%。マイルーティンは個人開発で300万DL達成の前例あり",
    },
    competitors: [
      { name: "マイルーティン", users: "累計300万DL", pricing: "無料+サブスク" },
      { name: "Streaks", users: "Apple Design Award", pricing: "$4.99買い切り" },
      { name: "Habitify", users: "レビュー15万件", pricing: "$29.99/年" },
    ],
    weakPoints: [
      "Xcodeが未インストール → テスト不可",
      "マイルーティン(300万DL)という強力な競合",
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
      { task: "マイルーティンとの差別化ポイントを明確にする", owner: "manual", priority: "medium" },
    ],
    metrics: [
      { label: "開発進捗", value: "Phase 3完了", trend: "up" },
    ],
    aiSuggestions: [
      "習慣トラッカー市場は年14%成長。ただしマイルーティンが強い",
      "差別化: 「ワンタップで完了」「習慣ではなく行動記録」という切り口",
    ],
  },
  {
    id: "file-converter",
    name: "ローカルファイル変換",
    emoji: "🔄",
    status: "dev",
    statusLabel: "MVP完了・未デプロイ",
    progress: 70,
    revenueModel: "広告（将来）",
    pricing: "無料（広告あり）",
    pricingFunnel: "Google検索「HEIC 変換」→ ツール使用 → 広告",
    retention: "必要な時だけ使うツール",
    monthlyTarget: 3000,
    currentMonthly: 0,
    revenue: {
      bad: 0,
      normal: 2000,
      good: 10000,
      badNote: "iLoveIMG等の大手に埋もれてPV伸びず",
      normalNote: "「サーバー送信なし」でニッチ層を獲得。月5000PV、広告月2000円",
      goodNote: "ファイル変換ツールで月$4,000MRRの成功例あり。ニッチ特化すれば可能性あり",
    },
    competitors: [
      { name: "iLoveIMG", users: "世界最大級", pricing: "無料/Premium$4/月" },
      { name: "heic2jpg.com", users: "不明", pricing: "無料（広告）" },
      { name: "CopyTrans HEIC", users: "不明", pricing: "無料" },
    ],
    weakPoints: [
      "Vercelに未デプロイ（コマンド1つで完了するのに放置）",
      "収益モデルが弱い",
    ],
    todos: [
      { task: "Vercelデプロイ（5分）", owner: "manual", priority: "high" },
      { task: "動画変換(ffmpeg.wasm)追加", owner: "auto", priority: "medium" },
      { task: "PWA対応", owner: "auto", priority: "low" },
    ],
    metrics: [
      { label: "デプロイ", value: "未デプロイ", trend: "flat" },
    ],
    aiSuggestions: [
      "デプロイだけなら5分。放置するメリットがない",
      "「ローカル処理でプライバシー安全」は日本市場で訴求力あり",
    ],
  },
  {
    id: "car-cost-sim",
    name: "車の維持費シミュレーター",
    emoji: "🧮",
    status: "planned",
    statusLabel: "計画中",
    progress: 5,
    revenueModel: "アフィリエイト（保険/ローン）",
    pricing: "無料ツール → 結果画面でアフィリ誘導",
    pricingFunnel: "Google検索「車 維持費 計算」→ ツール → 保険見積りリンク",
    retention: "SEOで継続流入",
    monthlyTarget: 20000,
    currentMonthly: 0,
    revenue: {
      bad: 0,
      normal: 10000,
      good: 30000,
      badNote: "大手中古車サイト（ガリバー等）がSEO上位を独占。個人サイトが勝てない",
      normalNote: "ロングテールKWで月1万PV。保険見積り月3件(¥3,000×3)+広告",
      goodNote: "car-life.adg7.com(62,000車種DB)のような特化サイトの成功例あり。自動車保険+ローンアフィリで月3万円。web-media-engineと連携で相乗効果",
    },
    competitors: [
      { name: "自動車ランニングコスト", users: "62,000車種DB", pricing: "無料（広告）" },
      { name: "高精度計算サイト(CASIO)", users: "大手", pricing: "無料" },
      { name: "ガリバー/楽天Car等の大手", users: "SEO上位独占", pricing: "無料記事" },
    ],
    weakPoints: [
      "未着手",
      "大手のSEO支配が強い",
    ],
    todos: [
      { task: "web-media-engineとの連携設計", owner: "auto", priority: "medium" },
      { task: "実装（Next.js、クライアントサイド）", owner: "auto", priority: "medium" },
      { task: "自動車保険ASP案件契約", owner: "manual", priority: "high" },
    ],
    metrics: [],
    aiSuggestions: [
      "web-media-engineの自動車保険テーマと連携すれば月1〜3万円の可能性",
      "Phase 2以降で着手。今はNOTE Writer/web-media-engineに集中",
    ],
  },
  {
    id: "home-stock",
    name: "おうちストック",
    emoji: "🏠",
    status: "dev",
    statusLabel: "開発中",
    progress: 20,
    revenueModel: "Free / Paid",
    pricing: "無料（1モード/制限あり） / 有料（全機能）",
    pricingFunnel: "App Store → 無料DL → アイテム増える → 上限 → 有料",
    retention: "日用品の買い物サイクルに組み込まれる",
    monthlyTarget: 3000,
    currentMonthly: 0,
    revenue: {
      bad: 0,
      normal: 2000,
      good: 8000,
      badNote: "zaico(18万社)やうちメモが既にある。無料アプリが多く課金率が低い",
      normalNote: "「交換時期通知」で差別化。月200DL、課金率2%で4人×¥500",
      goodNote: "消耗品管理のニッチで月500DL。買い物リスト自動生成が刺さる",
    },
    competitors: [
      { name: "zaico", users: "18万社", pricing: "無料(200件)/有料" },
      { name: "うちメモ", users: "不明", pricing: "無料" },
      { name: "monoca", users: "不明", pricing: "無料/プレミアム" },
    ],
    weakPoints: [
      "テンプレートだけでMVP機能が未実装",
      "類似アプリが多い",
    ],
    todos: [
      { task: "MVP機能実装（アイテム登録/通知/一覧）", owner: "auto", priority: "low" },
    ],
    metrics: [
      { label: "開発進捗", value: "テンプレのみ", trend: "flat" },
    ],
    aiSuggestions: [
      "優先度を下げて収益直結プロジェクトに集中すべき",
    ],
  },
];

// ============================================================
// 収入シミュレーション集計
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

export function getOwnerTodos(): (TodoItem & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.todos
      .filter((t) => t.owner === "manual")
      .map((t) => ({ ...t, project: p.name, emoji: p.emoji }))
  ).sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });
}
