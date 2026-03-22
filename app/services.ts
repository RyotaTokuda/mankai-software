export type ServiceStatus = "released" | "wip" | "review" | "soon";

export interface Service {
  emoji: string;
  name: string;
  description: string;
  detail: string;
  status: ServiceStatus;
  statusLabel: string;
  cardClass: string;
  badgeClass: string;
  href?: string;
  appStore?: string;
  playStore?: string;
  github?: string;
  tech?: string;
}

const isProduction = process.env.NEXT_PUBLIC_STAGE === "production";

export const SERVICES: Service[] = [
  {
    emoji: "🅿️",
    name: "駐車料金リーダー",
    description:
      "駐車場の料金看板を撮影するだけで料金ルールを自動解析。今から何時間停めたらいくらかを即座に確認できます。",
    detail:
      "Gemini AIが駐車場の複雑な料金看板を瞬時に解析。最大料金・時間帯別料金・深夜割増などを正確に読み取り、「今から○時間停めたらいくら」を自動計算します。複数の駐車場を保存して比較も可能。無料プラン・1日パス（160円）・月額プレミアム（350円）の3段階料金。",
    status: "review",
    statusLabel: "App Store 審査中",
    cardClass: "bg-blue-50 border-blue-100",
    badgeClass: "bg-blue-500 text-white",
    tech: "React Native (Expo) / Gemini API / RevenueCat",
  },
  {
    emoji: "⏰",
    name: "しめどき",
    description:
      "Apple Watchが会議の終了時刻をそっと教えてくれる。ハプティクス通知で、スマートに時間管理。",
    detail:
      "「あと5分」「終了時刻です」をApple Watchの振動でお知らせ。会議中にスマホや時計を見なくても、自然に時間を把握できます。会議テンプレートを保存して、ワンタップで開始。iPhone連携で履歴も確認可能。",
    status: "wip",
    statusLabel: "MVP完了・リリース準備中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "SwiftUI / watchOS 10+ / StoreKit 2 / App Group",
  },
  {
    emoji: "📝",
    name: "痛み手帳",
    description:
      "だるさ・めまい・頭痛…不調の瞬間をApple WatchやiPhoneからワンタップで記録。傾向を振り返り、通院時にも活用できます。",
    detail:
      "Apple Watch または iPhone から不調の瞬間をすぐに記録するセルフログアプリ。症状の種類・強さ・メモを素早く入力でき、カレンダーやトレンドで自分の体調パターンを振り返れます。天気・気圧・HealthKitデータとの相関も確認可能。通院時に見せられるPDF/CSVレポート出力機能付き。無料プランと月額プレミアム（¥390）の2段階。",
    status: "wip",
    statusLabel: "MVP完了・リリース準備中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "Swift / SwiftUI / watchOS 10+ / HealthKit / StoreKit 2",
  },
  {
    emoji: "✅",
    name: "DoneLog",
    description:
      "ゴミ出し・薬・鍵の確認…「やったっけ？」をワンタップで記録。日常の小さな行動を確実にログ。",
    detail:
      "ボタンを押すだけで生活行動を記録。ゴミ出し・服薬・戸締まり確認など、日常の「やったかどうか不安になる行動」を可視化します。カレンダー表示で習慣の継続も一目で分かる。無料プラン（8ボタン・14日履歴）、Plusプラン（無制限）。",
    status: "wip",
    statusLabel: "MVP完了・リリース準備中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "Swift / SwiftUI / SwiftData / iOS 17+",
  },
  {
    emoji: "🔄",
    name: "ローカルファイル変換",
    description:
      "HEIC・WebP・動画など、あらゆるファイル変換をブラウザ内だけで完結。ファイルはサーバーに送られません。",
    detail:
      "iPhoneで撮った写真（HEIC）やWebP画像をJPG/PNGに変換。動画のフォーマット変換にも対応予定。すべてブラウザ内で処理するため、ファイルがサーバーにアップロードされることは一切ありません。個人情報や機密ファイルも安心。",
    status: isProduction ? "wip" : "released",
    statusLabel: isProduction ? "鋭意開発中" : "公開中",
    ...(!isProduction && { href: "https://file-converter-beige.vercel.app" }),
    cardClass: isProduction
      ? "bg-orange-50 border-orange-100"
      : "bg-emerald-50 border-emerald-100",
    badgeClass: isProduction
      ? "bg-orange-500 text-white"
      : "bg-emerald-600 text-white",
    tech: "Next.js / heic2any / Canvas API",
  },
  {
    emoji: "🏠",
    name: "おうちストック",
    description:
      "日用品の在庫を記録して「そろそろ買い時」を通知。シャンプー・洗剤・電池…買い忘れを防止します。",
    detail:
      "消耗品の使用開始日と交換サイクルを登録するだけ。アプリが自動で「そろそろなくなりそう」を通知してくれます。買い物メモの自動生成、家族との共有機能も。無料プラン（1モード・アイテム数制限あり）、有料プランで全機能解放。",
    status: "wip",
    statusLabel: "開発中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "React Native (Expo) / SQLite",
  },
  {
    emoji: "🧾",
    name: "証憑ボックス",
    description:
      "領収書・レシート・請求書をスマホで撮影して管理。確定申告や経費精算の時期に慌てないための整理ツール。",
    detail:
      "撮影するだけでOCRが日付・金額・店名を自動抽出。カテゴリ分類・タグ付け・CSV出力で確定申告の準備がラクに。保証書や保険証券の管理にも。クラウド同期で安心バックアップ。",
    status: "wip",
    statusLabel: "MVP完了・リリース準備中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "React Native (Expo) / Supabase / Gemini API / RevenueCat",
  },
  {
    emoji: "🚗",
    name: "愛車台帳",
    description:
      "整備記録・給油・維持費をまとめて管理。売却時に使える整備履歴PDFの出力まで、愛車ライフを一冊に。",
    detail:
      "オイル交換・タイヤ交換・車検などの整備記録をアプリで一元管理。次回メンテナンスの通知、給油記録から燃費計算、月別の維持費グラフ表示。売却時に整備履歴をPDFで出力して査定アップを狙えます。複数台の管理にも対応。",
    status: "wip",
    statusLabel: "MVP完了・リリース準備中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
    tech: "Next.js / Supabase / Gemini API / Lemon Squeezy",
  },
  {
    emoji: "🧮",
    name: "車の維持費シミュレーター",
    description:
      "購入前に総額を試算。ローン・保険・駐車場・燃料・車検を入力して、月額・年額・5年総額を即座に比較。",
    detail:
      "「この車、本当にいくらかかるの？」を購入前に徹底シミュレーション。車両価格だけでなく、ローン金利・任意保険・駐車場代・ガソリン代・車検費用・税金をすべて入力して総額を算出。複数車種を並べて比較検討できます。",
    status: "released",
    statusLabel: "公開中",
    cardClass: "bg-emerald-50 border-emerald-100",
    badgeClass: "bg-emerald-600 text-white",
    href: "https://kuraberu-lab.com/tools/car-cost/",
  },
];
