'use client'

import { CardMeta } from '@/types/cards'
import Image from 'next/image'
import Link from 'next/link'

interface CardItemProps {
  card: CardMeta
}

const gameIcons = {
  pokemon: '⚡',
  yugioh: '🐉',
  mtg: '🔮'
}

const gameNames = {
  pokemon: 'ポケモン',
  yugioh: '遊戯王',
  mtg: 'MTG'
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <Link href={`/cards/${card.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        {/* カード画像 */}
        <div className="aspect-[3/4] bg-gray-100 relative">
          {card.image_url ? (
            <Image
              src={card.image_url}
              alt={card.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🃏</div>
                <div className="text-xs">画像なし</div>
              </div>
            </div>
          )}
          
          {/* ゲーム種別バッジ */}
          <div className="absolute top-2 left-2">
            <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {gameIcons[card.game]} {gameNames[card.game]}
            </span>
          </div>

          {/* レアリティバッジ */}
          {card.rarity && (
            <div className="absolute top-2 right-2">
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">
                {card.rarity}
              </span>
            </div>
          )}
        </div>

        {/* カード情報 */}
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary">
            {card.name}
          </h3>
          
          {card.expansion_name && (
            <p className="text-xs text-gray-500 truncate">
              {card.expansion_name}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}