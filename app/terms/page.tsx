import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Mankai Software",
};

const UPDATED_AT = "2026年5月14日";

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

          <div className="space-y-8 text-sm leading-7 text-gray-700">

            <Section id="article1" title="第1条（適用・定義）">
              <p>
                本利用規約（以下「本規約」）は、得田涼太（屋号：Mankai Software、以下「当方」）が提供するスマートフォンアプリケーションおよびウェブサービス（以下総称して「本サービス」）の利用条件を定めます。
              </p>
              <p className="mt-3">
                本サービスをインストール・アクセス・利用した時点で、本規約の全条項に同意したものとみなします。同意いただけない場合は、本サービスの利用をお控えください。
              </p>
              <p className="mt-3">
                本規約における「ユーザー」とは、本サービスを利用するすべての方を指します。
              </p>
            </Section>

            <Section id="article2" title="第2条（利用資格）">
              <p>
                本サービスは、以下の条件を満たす方にご利用いただけます。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>日本国内の法令上、有効に契約を締結できる方</li>
                <li>未成年者の場合は、法定代理人の同意を得た方</li>
                <li>過去に当方から利用停止・契約解除の措置を受けていない方</li>
              </ul>
              <p className="mt-3">
                各アプリのApp Store年齢区分も別途適用されます。
              </p>
            </Section>

            <Section id="article3" title="第3条（サービスの内容）">
              <p>
                本サービスは、当方が提供するアプリおよびウェブサービス全般を指します。提供するサービスの内容・仕様は各アプリのApp Store商品ページ等に記載します。
              </p>
              <p className="mt-3">
                当方は、ユーザーへの事前通知なく、本サービスの内容を変更・追加・削除することができます。
              </p>
            </Section>

            <Section id="article4" title="第4条（課金・サブスクリプション）">
              <Sub title="4-1. 有料機能">
                <p>
                  本サービスの一部は無料で提供され、追加機能については有料プラン（買い切りまたはサブスクリプション）をご利用いただけます。価格は各アプリのApp Store商品ページまたはアプリ内購入画面に表示する税込価格とします。
                </p>
              </Sub>
              <Sub title="4-2. 決済">
                <p>
                  決済はApple（App Store）の決済システムを通じて行われます。クレジットカード情報等の決済情報を当方が直接取得・保存することはありません。お支払い方法・タイミングはAppleの規約に準じます。
                </p>
              </Sub>
              <Sub title="4-3. サブスクリプションの自動更新">
                <p>
                  サブスクリプション型の有料プランは、解約しない限り契約期間終了の24時間前までにAppleを通じて自動更新されます。更新価格は更新の少なくとも24時間前にご確認いただけます。
                </p>
              </Sub>
              <Sub title="4-4. 解約">
                <p>
                  サブスクリプションの解約は、端末の設定アプリ → Apple ID → サブスクリプションから、いつでも行えます。解約後は次の更新日以降の請求が停止され、残余期間はサービスをご利用いただけます。
                </p>
              </Sub>
              <Sub title="4-5. 返金">
                <p>
                  デジタルコンテンツの性質上、購入後の返金は原則行いません。返金が必要な場合は、Appleの返金ポリシーに基づきAppleへお申し出ください。
                </p>
              </Sub>
              <Sub title="4-6. 価格変更">
                <p>
                  当方は有料プランの価格を変更することがあります。価格変更はApp Storeを通じて事前にご案内します。変更後の更新日以降、新価格が適用されます。
                </p>
              </Sub>
            </Section>

            <Section id="article5" title="第5条（禁止事項）">
              <p>ユーザーは、本サービスの利用にあたり以下の行為を行ってはなりません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>本サービスのリバースエンジニアリング・逆コンパイル・改ざん・不正アクセス</li>
                <li>本サービスのサーバーやネットワークに過大な負荷をかける行為</li>
                <li>本サービスを通じて得た情報を無断で転載・販売・二次配布する行為</li>
                <li>当方または第三者の知的財産権・プライバシー・名誉を侵害する行為</li>
                <li>当方または第三者になりすます行為</li>
                <li>本サービスを利用した営業行為・広告・勧誘（当方が別途認めた場合を除く）</li>
                <li>その他、当方が合理的に不適切と判断する行為</li>
              </ul>
            </Section>

            <Section id="article6" title="第6条（AI・自動処理機能に関する注意）">
              <p>
                本サービスの一部では、AI技術・機械学習・画像認識等の自動処理機能を使用して情報を解析・提示することがあります。これらの処理結果は<strong>あくまで参考情報</strong>であり、結果の正確性・完全性・特定目的への適合性を保証するものではありません。
              </p>
              <p className="mt-3">
                自動処理結果に基づいた最終判断はユーザー自身の責任で行ってください。当方は自動処理結果に依拠した判断により生じた損害について責任を負いません。
              </p>
            </Section>

            <Section id="article7" title="第7条（健康・医療に関する重要事項）">
              <p>
                本サービスの一部には健康情報の記録・集計・表示機能が含まれることがあります。これらの機能は<strong>医療機器ではなく</strong>、診断・治療・予防を目的とするものではありません。本サービスを通じて得られた情報は、医療上の判断の代替となるものではありません。
              </p>
              <p className="mt-3">
                体調に不安がある場合は、必ず医療機関にご相談ください。本サービスの記録・分析結果に基づいた医療的判断により生じた損害について、当方は責任を負いません。
              </p>
            </Section>

            <Section id="article8" title="第8条（知的財産権）">
              <p>
                本サービスに関するすべての知的財産権（著作権・商標権・特許権・ノウハウ等）は当方または正当な権利者に帰属します。本規約は、ユーザーに対して本サービスを個人的かつ非商業的に利用するための限定的・非独占的・譲渡不可のライセンスを付与するものであり、それ以外の権利を付与するものではありません。
              </p>
              <p className="mt-3">
                本規約で明示的に許可された範囲を超えた複製・配布・改変・二次利用・リバースエンジニアリングを禁止します。
              </p>
            </Section>

            <Section id="article9" title="第9条（免責事項）">
              <Sub title="9-1. 保証の否認">
                <p>
                  本サービスは現状有姿（as-is）で提供するものであり、当方は、完全性・正確性・有用性・安全性・特定目的への適合性について、明示・黙示を問わず保証しません。
                </p>
              </Sub>
              <Sub title="9-2. 損害賠償の制限">
                <p>
                  当方の故意または重大な過失に起因する場合を除き、本サービスの利用または利用不能により生じた損害（データ消失・逸失利益・事業機会の喪失等を含む）について、当方は責任を負いません（消費者契約法第8条が適用される場合はこの限りではありません）。
                </p>
                <p className="mt-3">
                  当方が損害賠償責任を負う場合の賠償額の上限は、当該損害の直接原因となった本サービスについてユーザーが当方に支払った直近12ヶ月間の合計金額（無料サービスの場合は金1,000円）とします。
                </p>
              </Sub>
              <Sub title="9-3. 第三者サービスに関する免責">
                <p>
                  本サービスは第三者が提供するAPI・SDK・クラウドサービス等を利用する場合があります。これらのサービスの障害・仕様変更・提供終了・データ取り扱いに起因してユーザーに生じた損害について、当方は責任を負いません。
                </p>
              </Sub>
              <Sub title="9-4. 通信環境・端末に関する免責">
                <p>
                  本サービスの利用に必要な通信環境・端末はユーザー自身の責任と費用で整備するものとし、これらに起因する障害・損害について当方は責任を負いません。
                </p>
              </Sub>
            </Section>

            <Section id="article10" title="第10条（サービスの変更・停止・終了）">
              <p>
                当方は、以下の場合にユーザーへの事前通知なく本サービスの全部または一部を変更・停止・終了することができます。
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>システムの保守・更新を行う場合</li>
                <li>天災・停電・第三者サービスの障害等、当方の制御が及ばない事由が生じた場合</li>
                <li>App Storeのポリシー変更等により継続提供が困難になった場合</li>
                <li>その他、当方が必要と判断した場合</li>
              </ul>
              <p className="mt-3">
                本サービスの終了にあたっては、可能な範囲でアプリ内または本ウェブサイト上で事前に告知します。サービス終了後、端末内に保存されたデータはユーザー自身が管理するものとし、当方はデータの移行・バックアップを保証しません。
              </p>
              <p className="mt-3">
                本サービスの変更・停止・終了によりユーザーに生じた損害について、当方の故意または重大な過失に起因する場合を除き、責任を負いません。
              </p>
            </Section>

            <Section id="article11" title="第11条（Appleとの関係）">
              <p>
                iOSアプリとして提供する本サービスは、Apple Inc.のApp Storeを通じて配信されます。本規約はApple Inc.ではなく当方との間で締結されるものであり、本サービスおよび本規約に関するいかなる責任もApple Inc.は負いません。Apple Inc.は本規約の第三者受益者となります。
              </p>
              <p className="mt-3">
                App Storeの利用規約（Apple Media Services利用規約）も別途適用されます。本規約と抵触する場合、App Storeの利用規約が優先します。
              </p>
            </Section>

            <Section id="article12" title="第12条（規約の変更）">
              <p>
                当方は、法令の改正・サービス内容の変更・その他合理的な事由がある場合に本規約を変更することがあります。変更後の規約は本ページへの掲載をもって効力を生じます。ユーザーの権利を実質的に制限する重要な変更がある場合は、アプリ内または本ウェブサイト上で事前に告知します。
              </p>
              <p className="mt-3">
                変更後に本サービスをご利用いただいた場合、変更後の規約に同意したものとみなします。
              </p>
            </Section>

            <Section id="article13" title="第13条（準拠法・管轄裁判所）">
              <p>
                本規約は日本法に準拠して解釈されます。本サービスの利用に関して生じた紛争については、当方の住所地を管轄する日本の地方裁判所または簡易裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </Section>

            <Section id="article14" title="第14条（お問い合わせ）">
              <p>本規約に関するご質問・ご意見は、以下のメールアドレスにてお受けします。</p>
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
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">サポート</Link>
            <Link href="/terms" className="text-gray-600">利用規約</Link>
            <Link href="/tokushoho" className="hover:text-gray-600 transition-colors">特定商取引法</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
