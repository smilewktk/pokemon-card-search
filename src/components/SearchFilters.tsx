'use client'

import { useState, useEffect } from 'react'
import { SearchFilters as ISearchFilters, GameType } from '@/types/cards'

interface SearchFiltersProps {
  filters: ISearchFilters
  onFiltersChange: (filters: ISearchFilters) => void
}

const gameOptions = [
  { value: '', label: 'すべてのTCG' },
  { value: 'pokemon', label: 'ポケモン' },
  { value: 'yugioh', label: '遊戯王' },
  { value: 'mtg', label: 'MTG' }
]

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ISearchFilters>(filters)
  const [filterOptions, setFilterOptions] = useState<{
    rarities: string[]
    expansions: string[]
  }>({ rarities: [], expansions: [] })

  // フィルターオプションを取得
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const params = new URLSearchParams()
        if (localFilters.game) params.append('game', localFilters.game)
        
        // 一旦固定のオプションを使用（後でAPIから取得）
        setFilterOptions({
          rarities: ['C', 'U', 'R', 'RR', 'RRR', 'SR', 'ウルトラレア', 'コモン', 'アンコモン', 'レア'],
          expansions: ['古代の咆哮', 'LEGEND OF BLUE EYES WHITE DRAGON', 'Alpha']
        })
      } catch (error) {
        console.error('Failed to fetch filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [localFilters.game])

  const handleInputChange = (field: keyof ISearchFilters, value: any) => {
    const newFilters = { ...localFilters, [field]: value }
    setLocalFilters(newFilters)
  }

  const handleSearch = () => {
    onFiltersChange(localFilters)
  }

  const handleReset = () => {
    const resetFilters: ISearchFilters = {}
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">検索フィルター</h2>

      {/* キーワード検索 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">キーワード</label>
        <input
          type="text"
          value={localFilters.query || ''}
          onChange={(e) => handleInputChange('query', e.target.value)}
          placeholder="カード名で検索"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* ゲーム種別 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">ゲーム</label>
        <select
          value={localFilters.game || ''}
          onChange={(e) => handleInputChange('game', e.target.value as GameType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {gameOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* レアリティ */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">レアリティ</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filterOptions.rarities.map((rarity) => (
            <label key={rarity} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.rarity?.includes(rarity) || false}
                onChange={(e) => {
                  const currentRarities = localFilters.rarity || []
                  const newRarities = e.target.checked
                    ? [...currentRarities, rarity]
                    : currentRarities.filter(r => r !== rarity)
                  handleInputChange('rarity', newRarities)
                }}
                className="mr-2"
              />
              <span className="text-sm">{rarity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* エキスパンション */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">エキスパンション</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filterOptions.expansions.map((expansion) => (
            <label key={expansion} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.expansion?.includes(expansion) || false}
                onChange={(e) => {
                  const currentExpansions = localFilters.expansion || []
                  const newExpansions = e.target.checked
                    ? [...currentExpansions, expansion]
                    : currentExpansions.filter(ex => ex !== expansion)
                  handleInputChange('expansion', newExpansions)
                }}
                className="mr-2"
              />
              <span className="text-sm">{expansion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ボタン */}
      <div className="space-y-2">
        <button
          onClick={handleSearch}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          検索
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          リセット
        </button>
      </div>
    </div>
  )
}