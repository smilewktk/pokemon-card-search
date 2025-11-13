import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TCG検索 - トレーディングカード検索＆デッキ管理',
  description: 'あらゆるトレーディングカードゲーム（TCG）の検索、デッキレシピ作成・共有ができるサイト。画像認識機能も搭載。',
  keywords: 'TCG, トレーディングカードゲーム, デッキレシピ, カード検索, ポケモン, 遊戯王, マジックザギャザリング, MTG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <footer className="bg-gray-800 text-white py-4 text-center text-sm">
          <p>対応TCG: ポケモン、遊戯王、MTG、その他多数</p>
        </footer>
      </body>
    </html>
  )
}