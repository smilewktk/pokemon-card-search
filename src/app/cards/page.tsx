'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import CardGrid from '@/components/CardGrid'
import SearchFilters from '@/components/SearchFilters'
import { CardMeta, SearchFilters as ISearchFilters } from '@/types/cards'

export default function CardsPage() {
  const searchParams = useSearchParams()
  const [cards, setCards] = useState<CardMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ISearchFilters>({})

  // URLパラメータから初期フィルターを設定
  useEffect(() => {
    const initialFilters: ISearchFilters = {}
    
    const query = searchParams.get('q')
    if (query) initialFilters.query = query

    const game = searchParams.get('game')
    if (game && ['pokemon', 'yugioh', 'mtg'].includes(game)) {
      initialFilters.game = game as any
    }

    setFilters(initialFilters)
  }, [searchParams])

  // カード検索
  useEffect(() => {
    async function fetchCards() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        
        if (filters.query) params.append('q', filters.query)
        if (filters.game) params.append('game', filters.game)
        if (filters.rarity?.length) params.append('rarity', filters.rarity.join(','))
        if (filters.expansion?.length) params.append('expansion', filters.expansion.join(','))

        const response = await fetch(`/api/cards?${params.toString()}`)
        const result = await response.json()
        
        if (result.success) {
          setCards(result.data)
        } else {
          console.error('Search failed:', result.error)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [filters])

  const handleFiltersChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters)
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバーフィルター */}
          <div className="lg:w-64">
            <SearchFilters 
              filters={filters} 
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">カード検索</h1>
              <p className="text-gray-600">
                {loading ? '検索中...' : `${cards.length}件のカードが見つかりました`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <CardGrid cards={cards} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}