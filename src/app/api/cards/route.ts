import { NextRequest, NextResponse } from 'next/server'
import { CardService } from '@/lib/card-service'
import { SearchFilters } from '@/types/cards'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: SearchFilters = {}

    // クエリパラメータを解析
    const query = searchParams.get('q')
    if (query) filters.query = query

    const game = searchParams.get('game')
    if (game && ['pokemon', 'yugioh', 'mtg'].includes(game)) {
      filters.game = game as any
    }

    const rarity = searchParams.get('rarity')
    if (rarity) {
      filters.rarity = rarity.split(',').filter(Boolean)
    }

    const expansion = searchParams.get('expansion')
    if (expansion) {
      filters.expansion = expansion.split(',').filter(Boolean)
    }

    // カード検索実行
    const cards = await CardService.searchCards(filters)

    return NextResponse.json({ 
      success: true, 
      data: cards,
      count: cards.length 
    })

  } catch (error) {
    console.error('Card search error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}