import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Mankai Software",
};

const UPDATED_AT = "2026年6月21日";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id}>
    <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
    {children}
  </section>
);

const Sub = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-5">
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    {children}
  </div>
);

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

          <div className="space-y-8 text-sm leading-7 text-gray-700">

            <Section id="s1" title="1. はじめに・適用範囲">
              <p>
                得田涼太（屋号：Mankai Software、以下「当方」）は、当方が提供するスマートフォンアプリケーションおよびウェブサービス（以下総称して「本サービス」）において、ユーザーのプライバシーを尊重し、個人情報の適切な保護に努めます。
              </p>
              <p className="mt-3">
                本プライバシーポリシーは、本サービス全体に適用される情報の収集・利用・管理方針を説明します。各アプリが具体的にどのデータを収集するかは、App Storeの各アプリページ「プライバシー」欄（App Privacyラベル）もあわせてご確認ください。
              </p>
              <p className="mt-3">
                本サービスをご利用いただくことで、本ポリシーに同意したものとみなします。
              </p>
            </Section>

            <Section id="s2" title="2. 収集する情報の種類">
              <Sub title="2-1. 端末内にのみ保存される情報（全サービス共通）">
                <p>
                  本サービスは、機能提供のためにユーザーが入力・生成したデータ（記録・設定・履歴等）を、原則としてユーザーの端末内にのみ保存します。これらのデータは当方のサーバーへは送信されません。
                </p>
              </Sub>

              <Sub title="2-2. AI・解析機能のために外部送信される情報">
                <p>
                  AI解析・自動認識等の機能を提供するサービスでは、処理対象のデータ（画像・テキスト等）を外部のAI/APIサービスへ送信します。送信されるデータの具体的な内容は各サービスの機能に依存します。当方はこのデータを解析目的以外に保存・蓄積しません。
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  どのサービスがAI機能を使用するかはApp Storeの各アプリページをご確認ください。
                </p>
              </Sub>

              <Sub title="2-3. クラウド同期のために共有される情報">
                <p>
                  端末間・家族間のデータ同期機能を持つサービスでは、同期対象のデータをApple iCloud（CloudKit）上に保存します。このデータは当方のサーバーへは送信されず、Appleのプライバシーポリシーが適用されます。同期機能を使用するためにはApple IDが必要です。
                </p>
              </Sub>

              <Sub title="2-4. 健康データの取り扱い">
                <p>
                  健康記録機能を持つサービスでは、ユーザーの同意のもとApple HealthKitを通じて健康データ（睡眠・心拍・歩数等）を読み取り、傾向表示の目的のみに使用します。これらのデータは端末内にのみ保存され、当方のサーバーや第三者へ送信されることはありません。健康データを広告・マーケティング・市場調査の目的で使用しません。
                </p>
              </Sub>

              <Sub title="2-5. アナリティクス情報">
                <p>
                  サービス品質向上のため、一部のサービスではアプリの利用状況（画面遷移・機能の利用頻度・エラー発生状況等）を匿名で収集するアナリティクスツールを使用することがあります。氏名・連絡先など個人を特定できる情報は収集しません。
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  アナリティクスを使用するサービスはApp Storeの各アプリページに記載しています。
                </p>
              </Sub>

              <Sub title="2-6. 課金・決済情報">
                <p>
                  有料機能の決済はApple（App Store）の決済システムを通じて行われます。クレジットカード番号等の決済情報を当方が直接取得・保存することはありません。
                </p>
                <p className="mt-2">
                  一部のサービスでは、購入状態（どの有料機能を購入したか）の検証・管理にRevenueCat（後述）を利用します。Appleが発行する購入レシートと、当方が氏名等と紐付けない匿名の利用者IDがRevenueCatへ送信され、購入済み機能の有効・無効の判定にのみ使用されます。クレジットカード番号等の決済情報や氏名・連絡先は送信されません。
                </p>
              </Sub>

              <Sub title="2-7. お問い合わせ時の情報">
                <p>
                  サポートへのお問い合わせの際、メールアドレスおよびお問い合わせ内容を取得します。これらの情報はお問い合わせへの対応目的のみに使用し、第三者への提供は行いません。
                </p>
              </Sub>
            </Section>

            <Section id="s3" title="3. 情報の利用目的">
              <p>当方が取得する情報は、以下の目的にのみ使用します。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>本サービスの機能提供および正常動作の確保</li>
                <li>本サービスの品質維持・改善・新機能開発</li>
                <li>ユーザーからのお問い合わせへの対応</li>
                <li>法令上必要な対応</li>
              </ul>
              <p className="mt-3">
                上記目的の範囲を超えて情報を利用する場合は、事前にユーザーの同意を得るか、本ポリシーを改定して告知します。
              </p>
            </Section>

            <Section id="s4" title="4. 外部サービスとの情報共有">
              <p>
                当方が利用する主な外部サービスは以下のとおりです。各サービスのプライバシーポリシーも併せてご確認ください。
              </p>

              <Sub title="4-1. AI・解析サービス">
                <p>
                  AI解析機能を提供するサービスでは、Google LLC（米国）が提供するAI APIを使用します。解析対象データはGoogleのサーバーへ送信されます。有料APIプランを使用しているため、送信データがGoogleのAIモデル改善に利用されることはありません。
                </p>
                <p className="mt-2">
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Google プライバシーポリシー
                  </a>
                </p>
              </Sub>

              <Sub title="4-2. クラウド同期サービス">
                <p>
                  データ同期機能を提供するサービスでは、Apple Inc.のCloudKit（iCloud）を使用します。CloudKitに保存されるデータはAppleのプライバシーポリシーが適用されます。
                </p>
                <p className="mt-2">
                  <a href="https://www.apple.com/jp/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Apple プライバシーポリシー
                  </a>
                </p>
              </Sub>

              <Sub title="4-3. アナリティクスサービス">
                <p>
                  アナリティクスを導入しているサービスでは、PostHog Inc.（米国）のサービスを使用することがあります。収集されるのは匿名の利用状況データのみです。
                </p>
                <p className="mt-2">
                  <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    PostHog プライバシーポリシー
                  </a>
                </p>
              </Sub>

              <Sub title="4-4. 課金管理サービス">
                <p>
                  App内課金を提供する一部のサービスでは、購入状態の検証・管理にRevenueCat, Inc.（米国）のサービスを使用します。Appleが発行する購入レシートと匿名の利用者IDがRevenueCatへ送信され、サーバー側でレシートを検証して購入済み機能の有効・無効を判定します。氏名・連絡先・クレジットカード情報は送信されません。
                </p>
                <p className="mt-2">
                  <a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    RevenueCat プライバシーポリシー
                  </a>
                </p>
              </Sub>

              <Sub title="4-5. 上記以外の第三者提供">
                <p>
                  以下の場合を除き、ユーザーの情報を第三者に提供しません。
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>ユーザーの同意がある場合</li>
                  <li>法令に基づく開示請求がある場合</li>
                  <li>人の生命・身体・財産の保護のために必要で、ユーザーの同意取得が困難な場合</li>
                </ul>
              </Sub>
            </Section>

            <Section id="s5" title="5. 外国にある第三者への提供（個人情報保護法第28条）">
              <p>
                AI解析機能等を通じてデータを外部APIへ送信するサービスでは Google LLC（米国）へ、App内課金の購入状態を管理するサービスでは RevenueCat, Inc.（米国）へ、それぞれ外国にある第三者として情報が提供されます。これらの事業者は、EUのGDPRや標準契約条項（SCC）等、国際的な個人情報保護基準に準拠した適切な保護措置を講じています。
              </p>
              <p className="mt-3">
                外部APIへの送信が発生するサービスと送信されるデータの内容については、App Storeの各アプリページをご確認ください。
              </p>
            </Section>

            <Section id="s6" title="6. 収集しない情報">
              <p>当方は以下の情報を収集しません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>氏名・住所・電話番号（お問い合わせ対応に必要な場合を除く）</li>
                <li>正確な位置情報（位置情報を扱うサービスでも近似値のみ端末内に保存）</li>
                <li>端末の一意識別子（広告ID等）</li>
                <li>クレジットカード番号等の決済情報</li>
                <li>健康データの外部サーバーへの保存・送信</li>
              </ul>
            </Section>

            <Section id="s7" title="7. カメラ・フォトライブラリ・マイクへのアクセス">
              <p>
                撮影・録音・ファイル選択等の機能を持つサービスでは、カメラ・フォトライブラリ・マイク等へのアクセス許可を求めることがあります。取得したデータは当該機能の提供目的のみに使用し、ユーザーの同意なく外部へ公開・共有しません。アクセス許可はOS設定からいつでも取り消せます。
              </p>
            </Section>

            <Section id="s8" title="8. 情報の管理・削除">
              <p>
                当方はユーザーデータをサーバーに保存しないため、当方側でのデータ削除対応は行いません。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>アプリ：</strong>アプリのアンインストールにより端末内データが削除されます。アプリ内の設定画面から任意に削除することもできます。</li>
                <li><strong>Webサービス：</strong>処理はブラウザ内のみで行われ、ブラウザを閉じると同時にデータは消去されます。</li>
                <li><strong>iCloud同期データ：</strong>端末のiCloud設定またはアプリ内の設定から削除できます。</li>
              </ul>
            </Section>

            <Section id="s9" title="9. 未成年者の利用">
              <p>
                本サービスは13歳未満を対象としていません。13歳未満のお子様の個人情報を故意に収集することはなく、収集していることが判明した場合は速やかに削除します。各アプリのApp Store年齢区分もご確認ください。
              </p>
            </Section>

            <Section id="s10" title="10. セキュリティ">
              <p>
                当方は、取り扱う情報の漏洩・滅失・毀損の防止に合理的な技術的・組織的安全管理措置を講じます。ただし、インターネット上の通信やサードパーティサービスのセキュリティについて、完全な安全性を保証することはできません。
              </p>
            </Section>

            <Section id="s11" title="11. プライバシーポリシーの変更">
              <p>
                当方は、法令の改正・サービス内容の変更等に伴い、本ポリシーを変更することがあります。ユーザーの権利に実質的な影響を与える重要な変更の場合は、アプリ内または本ウェブサイト上で事前に告知します。変更後に本サービスをご利用いただいた場合、変更後のポリシーに同意したものとみなします。
              </p>
            </Section>

            <Section id="s12" title="12. お問い合わせ">
              <p>本ポリシーに関するご質問・個人情報の取り扱いに関するお問い合わせは、以下にてお受けします。</p>
              <p className="mt-2">
                <a href="mailto:mankaisoftware.info@gmail.com" className="text-blue-600 underline">
                  mankaisoftware.info@gmail.com
                </a>
              </p>
            </Section>

          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600">プライバシーポリシー</Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">サポート</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">利用規約</Link>
            <Link href="/tokushoho" className="hover:text-gray-600 transition-colors">特定商取引法</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
