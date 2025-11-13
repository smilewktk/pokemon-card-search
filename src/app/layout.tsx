import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ポケモンカード検索 - 全カード検索＆デッキレシピ',
  description: 'ポケモンカードの全カード検索、デッキレシピ作成・共有ができるサイト。画像からデッキを自動認識する機能も搭載。',
  keywords: 'ポケモンカード, ポケカ, デッキレシピ, カード検索',
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
          <p>©Pokémon. ©Nintendo/Creatures Inc./GAME FREAK inc.</p>
        </footer>
      </body>
    </html>
  )
}