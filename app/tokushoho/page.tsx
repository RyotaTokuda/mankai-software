import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Mankai Software",
};

const UPDATED_AT = "2026年5月11日";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <tr className="border-b border-gray-100 last:border-0">
    <th className="py-3 pr-6 text-left align-top font-semibold text-gray-700 whitespace-nowrap w-40">{label}</th>
    <td className="py-3 text-gray-700 leading-7">{value}</td>
  </tr>
);

export default function TokushohoPage() {
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">特定商取引法に基づく表記</h1>
          <p className="text-sm text-gray-400 mb-10">最終更新日：{UPDATED_AT}</p>

          <div className="text-sm">
            <table className="w-full">
              <tbody>
                <Row label="販売業者" value="Mankai Software（個人事業）" />
                <Row label="代表者" value="徳田涼太" />
                <Row
                  label="所在地"
                  value={
                    <>
                      記載省略
                      <span className="block text-xs text-gray-400 mt-1">
                        特定商取引法施行規則第11条第1項の規定に基づき省略しています。
                        請求があった場合には遅滞なく開示いたします。
                      </span>
                    </>
                  }
                />
                <Row
                  label="電話番号"
                  value={
                    <>
                      記載省略
                      <span className="block text-xs text-gray-400 mt-1">
                        請求があった場合には遅滞なく開示いたします。
                      </span>
                    </>
                  }
                />
                <Row
                  label="メールアドレス"
                  value={
                    <a href="mailto:mankaisoftware.info@gmail.com" className="text-blue-600 underline">
                      mankaisoftware.info@gmail.com
                    </a>
                  }
                />
                <Row label="サービス名" value={
                  <ul className="space-y-1">
                    <li>買いどき（iOS / watchOS アプリ）</li>
                    <li>痛み手帳（iOS / watchOS アプリ）</li>
                    <li>しめどき（iOS / watchOS アプリ）</li>
                    <li>駐車料金リーダー（iOS アプリ）</li>
                    <li>その他 Mankai Software が提供するアプリ・Webサービス</li>
                  </ul>
                } />
                <Row label="販売価格" value={
                  <ul className="space-y-1">
                    <li>【買いどき Plus】月額 ¥200 / 年額 ¥1,500</li>
                    <li>【痛み手帳 Premium】月額 ¥400 / 年額 ¥4,000</li>
                    <li>【しめどき Premium】App Store の商品ページに表示される価格</li>
                    <li>その他の有料機能は各サービスのアプリ内または購入画面に表示される価格</li>
                    <li>消費税を含む</li>
                  </ul>
                } />
                <Row label="支払方法" value={
                  <>
                    Apple App Store を通じた課金（App Store の決済システムを利用）
                    <span className="block text-xs text-gray-400 mt-1">
                      お支払い方法・タイミングは Apple の規約に準じます。
                    </span>
                  </>
                } />
                <Row label="サービス提供時期" value="決済完了後、即時ご利用いただけます。" />
                <Row label="返品・キャンセル" value={
                  <>
                    デジタルコンテンツの性質上、購入後の返品・キャンセルは原則承っておりません。
                    <span className="block mt-1">
                      サブスクリプションの解約は、各ストア（App Store）の設定画面からいつでも行うことができます。
                      解約後は次の更新日以降の請求が停止されます。
                    </span>
                    <span className="block mt-1">
                      返金については Apple の返金ポリシーに準じます。
                    </span>
                  </>
                } />
                <Row label="動作環境" value={
                  <ul className="space-y-1">
                    <li>iOS 17.0 以降</li>
                    <li>watchOS 10.0 以降（Watch アプリを含む場合）</li>
                  </ul>
                } />
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">サポート</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">利用規約</Link>
            <Link href="/tokushoho" className="text-gray-600">特定商取引法</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
