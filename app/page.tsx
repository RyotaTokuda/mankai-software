import Link from "next/link";

const SERVICES = [
  {
    emoji: "🅿️",
    name: "駐車料金リーダー",
    description: "駐車場の料金看板を撮影するだけで料金ルールを自動解析。今から何時間停めたらいくらかを即座に確認できます。",
    status: "wip" as const,
    statusLabel: "鋭意開発中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
  },
  {
    emoji: "🔄",
    name: "ローカルファイル変換",
    description: "HEIC・WebP・動画など、あらゆるファイル変換をブラウザ内だけで完結。ファイルはサーバーに送られないので、個人情報や機密ファイルも安心して変換できます。",
    status: "released" as const,
    statusLabel: "公開中",
    href: "https://file-converter-beige.vercel.app",
    cardClass: "bg-emerald-50 border-emerald-100",
    badgeClass: "bg-emerald-600 text-white",
  },
  {
    emoji: "📋",
    name: "副業申請の下準備アプリ",
    description: "副業・兼業を始める際の申請書類の準備をサポート。必要な情報を整理してスムーズに申請できるようにします。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
  {
    emoji: "🗺️",
    name: "街の危険箇所・通行しづらい場所投稿アプリ",
    description: "道路の段差・狭い歩道・危険な交差点など、街で見つけた困りごとをみんなで共有して安全な街づくりに貢献します。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
  {
    emoji: "🧾",
    name: "証憑ボックスアプリ",
    description: "領収書・レシート・請求書をスマホで撮影して管理。確定申告や経費精算の時期に慌てないための整理ツールです。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
  {
    emoji: "🚗",
    name: "愛車台帳",
    description: "整備記録・給油・維持費をまとめて管理。オイル交換や車検の通知から、売却時に使える整備履歴PDFの出力まで、愛車ライフを一冊に。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
  {
    emoji: "🔔",
    name: "Sorosoro",
    description: "日用品・車・ガジェットの消耗品をまとめて管理。「そろそろ買い時」を通知してくれる、買い忘れ・交換忘れ防止アプリ。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
  {
    emoji: "🧮",
    name: "車の維持費シミュレーター",
    description: "購入前に総額を試算。ローン・保険・駐車場・燃料・車検などをまとめて入力して、月額・年額・5年総額を即座に比較。複数車種を並べて検討できます。",
    status: "soon" as const,
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Mankai Software" className="w-7 h-7" />
            <span className="text-base font-bold tracking-tight">Mankai Software</span>
          </div>
          <a
            href="mailto:mankaisoftware.info@gmail.com"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            お問い合わせ
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* ヒーロー */}
        <section className="px-6 py-20 text-center bg-gradient-to-b from-pink-50 to-white">
          <div className="max-w-xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-4">
              個人開発アプリ
            </p>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              毎日を、<span className="text-pink-400">満開に。</span>
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              ちょっとした不便を解消する、シンプルで使いやすいアプリを作っています。
            </p>
          </div>
        </section>

        {/* サービス一覧 */}
        <section className="px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Apps</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeClass}`}>
                        {s.statusLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1.5 leading-snug text-sm">{s.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                  </>
                );
                const baseClass = `rounded-2xl border p-6 ${s.cardClass} ${s.status === "soon" ? "opacity-50" : ""}`;
                return "href" in s ? (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass} block hover:shadow-md transition-shadow`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={s.name} className={baseClass}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Contact</p>
            <p className="text-gray-600 mb-6 text-sm">
              ご意見・ご要望・バグ報告などはメールにてお気軽にどうぞ。
            </p>
            <a
              href="mailto:mankaisoftware.info@gmail.com"
              className="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              mankaisoftware.info@gmail.com
            </a>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              利用規約
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
