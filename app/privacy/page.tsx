import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Mankai Software",
};

const UPDATED_AT = "2026年5月6日";

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold mb-2">プライバシーポリシー</h1>
          <p className="text-sm text-gray-400 mb-10">最終更新日：{UPDATED_AT}</p>

          <div className="prose prose-gray max-w-none space-y-8 text-sm leading-7 text-gray-700">

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. はじめに</h2>
              <p>
                Mankai Software（以下「当方」）は、当方が提供するスマートフォンアプリケーション及びウェブサービス（以下総称して「本サービス」）において、ユーザーのプライバシーを尊重し、個人情報の適切な保護に努めます。
                本プライバシーポリシーは、本サービスにおける情報の収集・利用・管理方針について説明するものです。
                本サービスをご利用いただくことで、本ポリシーの内容に同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. 収集する情報</h2>

              <h3 className="font-semibold text-gray-800 mb-2">2-1. 端末内にのみ保存される情報</h3>
              <p>本サービスの一部は、以下のデータをユーザーの端末内にのみ保存します。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>解析した駐車場の料金情報（ルールデータ）</li>
                <li>解析に使用した画像のファイルパス</li>
                <li>解析・利用履歴</li>
                <li>アプリ内の設定情報</li>
                <li>【痛み手帳】不調の記録（症状種類・強さ・服薬情報・メモ・記録日時等）</li>
                <li>【痛み手帳】記録時の環境データ（気圧・天気・気温・湿度・空気質等）</li>
                <li>【痛み手帳】Apple Healthデータの要約（睡眠時間・安静時心拍・歩数等）</li>
                <li>【痛み手帳】位置情報（市区町村レベルに丸めた近似値のみ。記録時の天気・気圧取得のために使用）</li>
              </ul>
              <p className="mt-3">これらのデータは端末内のストレージにのみ保存され、当方のサーバーへは送信されません。</p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-2. 解析のために外部サービスへ送信される情報</h3>
              <p>
                「看板を読み取る」等の解析機能をご利用の際、撮影または選択した画像データを、当方が利用する外部AIサービス（後述）へ送信します。
                この画像には、ナンバープレートや人物等が偶発的に含まれる可能性があります。
                解析目的以外に当方がこのデータを保存・蓄積することはありません。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-3. アカウント・課金に関する情報</h3>
              <p>
                本サービスの一部では、Google アカウントを使ったログイン機能を提供しています。
                ログイン時に以下の情報を取得します。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Googleアカウントの表示名</li>
                <li>メールアドレス</li>
                <li>ユーザー識別子（UUID）</li>
              </ul>
              <p className="mt-3">
                これらの情報は、サービス内のデータ同期および課金状態の管理にのみ使用します。
                課金処理は Apple（App Store）または Google（Google Play）の決済システムを通じて行われ、
                クレジットカード情報等の決済情報を当方が直接取得・保存することはありません。
              </p>
              <p className="mt-3">
                課金状態の管理には RevenueCat, Inc.（米国）のサービスを利用する場合があります。
                RevenueCat に送信される情報は、ユーザー識別子および購入レシート情報のみです。
                詳細は RevenueCat のプライバシーポリシーをご参照ください。
              </p>
              <p className="mt-2">
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  https://www.revenuecat.com/privacy
                </a>
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-4. 利用状況の分析</h3>
              <p>
                本サービスの品質向上のため、PostHog（米国）のアナリティクスサービスを利用して、
                アプリの利用状況（画面遷移・機能の利用頻度・エラー発生状況等）を匿名で収集する場合があります。
                個人を特定できる情報は収集しません。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-5. 収集しない情報</h3>
              <p>当方は以下の情報を収集しません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>住所・電話番号等の連絡先情報（メールアドレスを除く）</li>
                <li>正確な位置情報（痛み手帳は市区町村レベルの近似値のみ端末内に保存します）</li>
                <li>端末の識別情報</li>
                <li>クレジットカード番号等の決済情報（決済は App Store / Google Play が処理します）</li>
                <li>健康記録・Apple Healthデータそのもの（端末外への送信は行いません）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2-6. 痛み手帳における健康データの取り扱い</h2>
              <p>
                「痛み手帳」アプリは、Apple HealthKit を通じて睡眠時間・安静時心拍・歩数等の健康データを読み取り、不調との傾向を表示する目的のみに使用します。
                これらのデータは端末内にのみ保存され、当方のサーバーや第三者へ送信されることはありません。
                HealthKit データを広告・マーケティング・市場調査等の目的で使用することはありません。
              </p>
              <p className="mt-3">
                <strong>本アプリは医療機器ではありません。</strong>
                痛み手帳の記録・分析結果は参考情報であり、診断・治療・予防を目的とするものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. カメラおよびフォトライブラリへのアクセス</h2>
              <p>
                本サービスの一部は、標識・書類等を撮影・選択する機能のために、カメラおよびフォトライブラリへのアクセス許可を求めます。
                取得した画像は解析目的のみに使用し、ユーザーの同意なく外部へ公開・共有することはありません。
                アクセス許可はOS設定からいつでも取り消すことができます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. 外国にある第三者への個人情報の提供</h2>
              <p>
                <strong>本項は「駐車料金リーダー」アプリのみ該当します。</strong>ローカルファイル変換等、サーバーへのデータ送信を行わないサービスには適用されません。
              </p>
              <p className="mt-3">
                駐車料金リーダーは、看板画像の解析のために Google LLC（米国、以下「Google」）が提供するGemini API（生成AIサービス）を利用しており、画像データをGoogleのサーバーへ送信します。これは個人情報保護法第24条に基づく外国にある第三者への提供に該当する場合があります。
              </p>
              <p className="mt-3">Googleは、EUのGDPRをはじめとする国際的な個人情報保護基準に準拠した適切な保護措置を講じています。詳細はGoogleのプライバシーポリシーをご参照ください。</p>
              <p className="mt-3">
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  https://policies.google.com/privacy
                </a>
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">4-1. Gemini API のデータ利用に関する重要事項</h3>
              <p>
                駐車料金リーダーは Gemini API の有料プランを使用しています。有料プランでは、送信されたデータがGoogleのAI開発改善に利用されることはありません。
                ただし、個人情報・機密情報・プライバシーに関わる内容が映り込んだ画像の送信はお控えください。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. 情報の利用目的</h2>
              <p>当方が取得する情報は、以下の目的にのみ使用します。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>本サービスの機能提供（料金解析・結果表示等）</li>
                <li>本サービスの品質維持・改善</li>
                <li>ユーザーからのお問い合わせへの対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. 情報の管理・削除</h2>
              <p>
                本サービスは、当方のサーバーにユーザーデータを保存しません。そのため、当方によるデータ削除の対応は行いません。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>アプリ（スマートフォン）：</strong>端末内に保存されたデータはアプリのアンインストールにより削除されます。アプリ内の設定から履歴・保存データを任意に削除することもできます。</li>
                <li><strong>Webサービス（ローカルファイル変換等）：</strong>ファイルデータはブラウザ内のみで処理され、当方のサーバーへは送信・保存されません。ブラウザを閉じると同時にデータは消去されます。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. 未成年者の利用</h2>
              <p>
                本サービスは13歳未満のお子様を対象としていません。
                13歳未満のお子様の個人情報を故意に収集することはありません。
                13歳未満のお子様が本サービスを利用していることが判明した場合、当該データを速やかに削除します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. 免責事項</h2>
              <p>
                当方は、本サービスにおける情報の取り扱いについて善意かつ合理的な注意を払いますが、当方の故意または重過失に起因する場合を除き、本サービスの利用に関連してユーザーに生じた損害について責任を負いません。
                ユーザーが送信した画像データの第三者サービス（Google等）における取り扱いについては、各サービスのプライバシーポリシーが適用され、当方は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">9. プライバシーポリシーの変更</h2>
              <p>
                当方は、法令の改正・サービス内容の変更等に伴い、本ポリシーを変更することがあります。
                重要な変更がある場合は本ページへの掲載およびアプリ内での通知により告知します。
                変更後に本サービスをご利用いただいた場合、変更後のポリシーに同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">10. お問い合わせ</h2>
              <p>本ポリシーに関するご質問・ご意見・個人情報の取り扱いに関するお問い合わせは、以下のメールアドレスにてお受けします。</p>
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
            <Link href="/privacy" className="text-gray-600">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">利用規約</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
