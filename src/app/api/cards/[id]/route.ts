import { NextRequest, NextResponse } from 'next/server'
import { CardService } from '@/lib/card-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ビルド時のエラーを避けるため環境変数チェック
    if (!process.env.TURSO_DB_URL) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { success: false, error: 'Database not configured' },
          { status: 503 }
        )
      }
      // ビルド時は仮のレスポンスを返す
      return NextResponse.json({
        success: true,
        data: {
          id: parseInt(params.id),
          name: "Sample Card",
          game_type: "pokemon",
          image_url: "",
          rarity: "common"
        }
      })
    }

    const cardDetail = await CardService.getCardDetail(params.id)

    if (!cardDetail) {
      return NextResponse.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: cardDetail 
    })

  } catch (error) {
    console.error('Card detail error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}