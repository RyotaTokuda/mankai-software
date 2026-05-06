import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Mankai Software",
};

const UPDATED_AT = "2026年5月6日";

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold mb-2">利用規約</h1>
          <p className="text-sm text-gray-400 mb-10">最終更新日：{UPDATED_AT}</p>

          <div className="prose prose-gray max-w-none space-y-8 text-sm leading-7 text-gray-700">

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第1条（適用）</h2>
              <p>
                本利用規約（以下「本規約」）は、Mankai Software（以下「当方」）が提供するスマートフォンアプリケーション及びウェブサービス（以下総称して「本サービス」）の利用条件を定めるものです。
                本サービスをご利用いただくことで、本規約の全条項に同意したものとみなします。
                同意いただけない場合は、本サービスのご利用をお控えください。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第2条（サービスの内容）</h2>
              <p>
                本サービスは、駐車場の料金看板をAI技術で解析・表示する機能、ファイル変換機能、その他当方が提供する各種機能を含みます。
                本サービスの内容は予告なく変更・追加・削除されることがあります。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第3条（AI解析結果に関する注意事項）</h2>
              <p>
                本サービスはGoogle Gemini API等のAI技術を使用して情報を解析しますが、<strong>AI解析結果はあくまで参考情報です。</strong>結果の正確性・完全性・有用性・特定目的への適合性を保証するものではありません。
              </p>
              <p className="mt-3">
                実際の駐車料金・各種情報は必ず現地の表示または公式情報源でご確認ください。AI解析結果に基づいた判断により生じた損害（過払い料金・駐車違反・その他の損失を含む）について、当方は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第3条の2（健康・医療に関する重要事項）</h2>
              <p>
                「痛み手帳」等の健康記録アプリは、<strong>医療機器ではありません。</strong>
                本サービスの健康に関する機能（記録・傾向表示・レポート出力等）は、診断・治療・予防を目的とするものではなく、参考情報の提供にとどまります。
              </p>
              <p className="mt-3">
                本サービスの利用により得られた情報は、医療上の判断の代替となるものではありません。
                体調に不安がある場合は、必ず医療機関に相談してください。
                本サービスの記録・分析結果に基づいた医療的判断により生じた損害について、当方は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第4条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり以下の行為を行ってはなりません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>本サービスのリバースエンジニアリング・逆コンパイル・改ざんを行う行為</li>
                <li>本サービスのサーバーやネットワークに過大な負荷をかける行為</li>
                <li>他のユーザーまたは第三者の権利・利益を侵害する行為</li>
                <li>当方または第三者になりすます行為</li>
                <li>その他、当方が不適切と合理的に判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第5条（免責事項）</h2>

              <h3 className="font-semibold text-gray-800 mb-2">5-1. 保証の否認</h3>
              <p>
                本サービスは現状有姿（as-is）で提供するものであり、当方は、本サービスの完全性・正確性・有用性・安全性・特定目的への適合性について、明示・黙示を問わずいかなる保証も行いません。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">5-2. 損害賠償の制限</h3>
              <p>
                当方の故意または重過失に起因する場合を除き、本サービスの利用または利用不能（不具合・バグ・システム障害・サービス停止等を含む）によってユーザーに生じた損害について、当方は一切の責任を負いません。
              </p>
              <p className="mt-3">
                当方に責任が認められる場合においても、間接損害・特別損害・逸失利益・機会損失については、当方の故意または重過失がある場合を除き、賠償責任を負いません。
              </p>
              <p className="mt-3">
                当方がユーザーに対して損害賠償責任を負う場合における賠償額の上限は、当該損害発生時点において当方がユーザーから受領した金額（無料サービスの場合は金1,000円）とします。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">5-3. 第三者サービスに関する免責</h3>
              <p>
                本サービスはGoogle Gemini API等の第三者サービスを利用しています。これらのサービスの障害・仕様変更・提供終了・データ取り扱いに起因してユーザーに生じた損害について、当方は責任を負いません。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">5-4. 通信環境・端末に関する免責</h3>
              <p>
                本サービスの利用に必要な通信環境・端末はユーザー自身の責任と費用で整備するものとし、これらに起因する損害について当方は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第6条（サービスの変更・停止・終了）</h2>
              <p>
                当方は、以下の場合にユーザーへの事前通知なく本サービスの全部または一部を変更・停止・終了することができます。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>システムの保守・更新を行う場合</li>
                <li>天災・停電・第三者サービスの障害等、当方の制御が及ばない事由が生じた場合</li>
                <li>その他、当方が必要と判断した場合</li>
              </ul>
              <p className="mt-3">
                本サービスの変更・停止・終了によりユーザーに生じた損害について、当方の故意または重過失に起因する場合を除き、一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第7条（知的財産権）</h2>
              <p>
                本サービスに関するすべての知的財産権（著作権・商標権・特許権等）は当方または正当な権利者に帰属します。
                本規約で明示的に許可された範囲を超えた複製・配布・改変・二次利用を禁止します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第8条（規約の変更）</h2>
              <p>
                当方は、法令の改正・サービス内容の変更等に応じて、本規約を変更することがあります。
                変更後の規約は本ページへの掲載をもって効力を生じます。
                変更後に本サービスをご利用いただいた場合、変更後の規約に同意したものとみなします。
                重要な変更がある場合はアプリ内または本ウェブサイト上での通知により告知します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第9条（準拠法・管轄裁判所）</h2>
              <p>
                本規約は日本法に準拠して解釈されます。
                本サービスの利用に関して生じた紛争については、当方の所在地を管轄する日本の裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">第10条（お問い合わせ）</h2>
              <p>本規約に関するご質問・ご意見は、以下のメールアドレスにてお受けします。</p>
              <p className="mt-2">
                <a href="mailto:mankaisoftware.info@gmail.com" className="text-blue-600 underline">
                  mankaisoftware.info@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="text-gray-600">利用規約</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
