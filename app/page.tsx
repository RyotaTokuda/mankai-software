"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES, type Service } from "./services";

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
              {SERVICES.map((s) => {
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
              href="/support"
              className="hover:text-gray-600 transition-colors"
            >
              サポート
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-600 transition-colors"
            >
              利用規約
            </Link>
            <Link
              href="/tokushoho"
              className="hover:text-gray-600 transition-colors"
            >
              特定商取引法
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
