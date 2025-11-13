import { NextRequest, NextResponse } from 'next/server'
import { CardService } from '@/lib/card-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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