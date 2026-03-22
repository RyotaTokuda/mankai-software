"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STAGE = process.env.NEXT_PUBLIC_STAGE;

type ServiceStatus = "released" | "wip" | "review" | "soon";

interface Service {
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

const SERVICES: Service[] = [
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
    status: "wip",
    statusLabel: "鋭意開発中",
    cardClass: "bg-orange-50 border-orange-100",
    badgeClass: "bg-orange-500 text-white",
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
  },
  {
    emoji: "🚗",
    name: "愛車台帳",
    description:
      "整備記録・給油・維持費をまとめて管理。売却時に使える整備履歴PDFの出力まで、愛車ライフを一冊に。",
    detail:
      "オイル交換・タイヤ交換・車検などの整備記録をアプリで一元管理。次回メンテナンスの通知、給油記録から燃費計算、月別の維持費グラフ表示。売却時に整備履歴をPDFで出力して査定アップを狙えます。複数台の管理にも対応。",
    status: "soon",
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
    github: "https://github.com/RyotaTokuda/car-diary",
  },
  {
    emoji: "🧮",
    name: "車の維持費シミュレーター",
    description:
      "購入前に総額を試算。ローン・保険・駐車場・燃料・車検を入力して、月額・年額・5年総額を即座に比較。",
    detail:
      "「この車、本当にいくらかかるの？」を購入前に徹底シミュレーション。車両価格だけでなく、ローン金利・任意保険・駐車場代・ガソリン代・車検費用・税金をすべて入力して総額を算出。複数車種を並べて比較検討できます。",
    status: "soon",
    statusLabel: "開発計画中",
    cardClass: "bg-gray-50 border-gray-100",
    badgeClass: "bg-gray-300 text-gray-600",
    github: "https://github.com/RyotaTokuda/car-cost-simulator",
  },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    if (STAGE !== "production") {
      setServices((prev) =>
        prev.map((s) =>
          s.name === "ローカルファイル変換"
            ? {
                ...s,
                status: "released" as ServiceStatus,
                statusLabel: "公開中",
                href: "https://file-converter-beige.vercel.app",
                cardClass: "bg-emerald-50 border-emerald-100",
                badgeClass: "bg-emerald-600 text-white",
              }
            : s
        )
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.svg"
              alt="Mankai Software"
              className="w-7 h-7"
            />
            <span className="text-base font-bold tracking-tight">
              Mankai Software
            </span>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-400 mb-4">
              個人開発サービス
            </p>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              毎日を、<span className="text-pink-400">満開に。</span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              ちょっとした不便を解消する、シンプルで使いやすいアプリを作っています。
            </p>
          </div>
        </section>

        {/* サービス一覧 */}
        <section className="px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              Apps
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const baseClass = `rounded-2xl border p-6 ${s.cardClass} ${
                  s.status === "soon" ? "opacity-50" : ""
                } cursor-pointer hover:shadow-md transition-shadow`;
                return (
                  <div
                    key={s.name}
                    className={baseClass}
                    onClick={() => setSelectedService(s)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeClass}`}
                      >
                        {s.statusLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1.5 leading-snug text-sm">
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Contact
            </p>
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
          <span>&copy; {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-gray-600 transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-600 transition-colors"
            >
              利用規約
            </Link>
          </div>
        </div>
      </footer>

      {/* ポップアップモーダル */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedService.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedService.name}
                    </h2>
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${selectedService.badgeClass}`}
                    >
                      {selectedService.statusLabel}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              {/* 詳細説明 */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {selectedService.detail}
              </p>

              {/* 技術スタック */}
              {selectedService.tech && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Tech Stack
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedService.tech}
                  </p>
                </div>
              )}

              {/* リンク */}
              <div className="flex flex-wrap gap-3">
                {selectedService.href && (
                  <a
                    href={selectedService.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Webで開く
                  </a>
                )}
                {selectedService.appStore && (
                  <a
                    href={selectedService.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    App Store
                  </a>
                )}
                {selectedService.playStore && (
                  <a
                    href={selectedService.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    Google Play
                  </a>
                )}
                {selectedService.github && (
                  <a
                    href={selectedService.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {!selectedService.href &&
                  !selectedService.appStore &&
                  !selectedService.github && (
                    <span className="text-sm text-gray-400">
                      リンクは公開時に追加されます
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
