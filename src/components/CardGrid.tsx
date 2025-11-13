'use client'

import { CardMeta } from '@/types/cards'
import CardItem from './CardItem'

interface CardGridProps {
  cards: CardMeta[]
}

export default function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">カードが見つかりませんでした</h3>
        <p className="text-gray-600">検索条件を変更して再度お試しください</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}