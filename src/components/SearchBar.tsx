'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/cards?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="カード名を入力してください（例: ピカチュウ、リザードン）"
          className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          検索
        </button>
      </div>
    </form>
  )
}