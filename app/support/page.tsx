import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サポート | Mankai Software",
};

const APPS = [
  {
    emoji: "📝",
    name: "痛み手帳",
    description: "不調の記録・傾向分析・通院向けレポート",
  },
  {
    emoji: "⏰",
    name: "しめどき",
    description: "Apple Watchで会議の終わりどきをお知らせ",
  },
  {
    emoji: "🅿️",
    name: "駐車料金リーダー",
    description: "駐車場の料金看板を撮影して料金を自動計算",
  },
];

const FAQS = [
  {
    q: "購入したプレミアムプランが反映されません",
    a: "アプリの設定画面 → 「購入を復元」をタップしてください。しばらくしても解決しない場合はお問い合わせください。",
  },
  {
    q: "サブスクリプションを解約したい",
    a: "iPhoneの「設定」→ Apple ID →「サブスクリプション」から解約できます。解約後も現在の期間が終了するまでご利用いただけます。",
  },
  {
    q: "データを削除したい",
    a: "アプリの「設定」→「データ管理」→「すべてのデータを削除」から削除できます。この操作は元に戻せません。",
  },
  {
    q: "Apple Watchアプリが表示されない",
    a: "iPhoneの「Watch」アプリを開き、「マイ Watch」→「App Store」からインストールしてください。",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <img src="/favicon.svg" alt="Mankai Software" className="w-7 h-7" />
            <span className="text-base font-bold tracking-tight">Mankai Software</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-12">

          <div>
            <h1 className="text-2xl font-bold mb-2">サポート</h1>
            <p className="text-sm text-gray-500">
              Mankai Software のアプリに関するお問い合わせはこちら。
            </p>
          </div>

          {/* アプリ一覧 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">対応アプリ</h2>
            <div className="space-y-3">
              {APPS.map((app) => (
                <div key={app.name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{app.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">よくある質問</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border border-gray-100 rounded-xl p-5">
                  <p className="font-semibold text-sm text-gray-900 mb-2">Q. {faq.q}</p>
                  <p className="text-sm text-gray-600 leading-6">A. {faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* お問い合わせ */}
          <section className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-base font-bold text-gray-900 mb-2">お問い合わせ</h2>
            <p className="text-sm text-gray-500 mb-6">
              上記で解決しない場合は、メールにてお問い合わせください。<br />
              通常2〜3営業日以内にご返信します。
            </p>
            <a
              href="mailto:mankaisoftware.info@gmail.com"
              className="inline-block bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              メールで問い合わせる
            </a>
            <p className="text-xs text-gray-400 mt-4">mankaisoftware.info@gmail.com</p>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <Link href="/support" className="text-gray-600">サポート</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">利用規約</Link>
            <Link href="/tokushoho" className="hover:text-gray-600 transition-colors">特定商取引法</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
