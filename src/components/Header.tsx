'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">⚡</div>
            <span className="text-xl font-bold text-primary">ポケカ検索</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/cards" className="text-gray-600 hover:text-primary">
              カード検索
            </Link>
            <Link href="/decks" className="text-gray-600 hover:text-primary">
              デッキレシピ
            </Link>
            <Link href="/deck/builder" className="text-gray-600 hover:text-primary">
              デッキ作成
            </Link>
            <Link href="/deck/import" className="text-gray-600 hover:text-primary">
              画像認識
            </Link>
            <Link 
              href="/signin" 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              ログイン
            </Link>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link href="/cards" className="text-gray-600 hover:text-primary py-2">
                カード検索
              </Link>
              <Link href="/decks" className="text-gray-600 hover:text-primary py-2">
                デッキレシピ
              </Link>
              <Link href="/deck/builder" className="text-gray-600 hover:text-primary py-2">
                デッキ作成
              </Link>
              <Link href="/deck/import" className="text-gray-600 hover:text-primary py-2">
                画像認識
              </Link>
              <Link href="/signin" className="text-primary py-2">
                ログイン
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}