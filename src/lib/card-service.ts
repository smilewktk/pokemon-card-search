import { turso } from './db'
import { CardMeta, SearchFilters, GameType } from '@/types/cards'

export class CardService {
  // カード検索（共通メタ情報）
  static async searchCards(filters: SearchFilters = {}): Promise<CardMeta[]> {
    // ビルド時やDB未設定時は空配列を返す
    if (!turso) {
      return []
    }

    let sql = `
      SELECT * FROM cards_meta 
      WHERE 1=1
    `
    const args: any[] = []

    // ゲーム種別フィルター
    if (filters.game) {
      sql += ` AND game = ?`
      args.push(filters.game)
    }

    // 名前検索
    if (filters.query) {
      sql += ` AND name LIKE ?`
      args.push(`%${filters.query}%`)
    }

    // レアリティフィルター
    if (filters.rarity && filters.rarity.length > 0) {
      const placeholders = filters.rarity.map(() => '?').join(',')
      sql += ` AND rarity IN (${placeholders})`
      args.push(...filters.rarity)
    }

    // エキスパンションフィルター
    if (filters.expansion && filters.expansion.length > 0) {
      const placeholders = filters.expansion.map(() => '?').join(',')
      sql += ` AND expansion_name IN (${placeholders})`
      args.push(...filters.expansion)
    }

    sql += ` ORDER BY name LIMIT 50`

    const result = await turso.execute({ sql, args })
    return result.rows.map(row => ({
      id: row.id as string,
      game: row.game as GameType,
      table_name: row.table_name as string,
      name: row.name as string,
      image_url: row.image_url as string || undefined,
      image_url_large: row.image_url_large as string || undefined,
      rarity: row.rarity as string,
      expansion_name: row.expansion_name as string || undefined,
      expansion_code: row.expansion_code as string || undefined,
      release_date: row.release_date as string || undefined,
      artist: row.artist as string || undefined,
      created_at: row.created_at as string,
      updated_at: row.updated_at as string
    }))
  }

  // 特定カードの詳細取得
  static async getCardDetail(id: string): Promise<any> {
    if (!turso) {
      return null
    }
    
    // まずメタ情報を取得
    const metaResult = await turso.execute({
      sql: 'SELECT * FROM cards_meta WHERE id = ?',
      args: [id]
    })

    if (metaResult.rows.length === 0) {
      return null
    }

    const meta = metaResult.rows[0]
    const game = meta.game as GameType

    // ゲーム別の詳細情報を取得
    let detail = null
    switch (game) {
      case 'pokemon':
        const pokemonResult = await turso.execute({
          sql: 'SELECT * FROM pokemon_cards WHERE id = ?',
          args: [id]
        })
        if (pokemonResult.rows.length > 0) {
          detail = pokemonResult.rows[0]
        }
        break

      case 'yugioh':
        const yugiohResult = await turso.execute({
          sql: 'SELECT * FROM yugioh_cards WHERE id = ?',
          args: [id]
        })
        if (yugiohResult.rows.length > 0) {
          detail = yugiohResult.rows[0]
        }
        break

      case 'mtg':
        const mtgResult = await turso.execute({
          sql: 'SELECT * FROM mtg_cards WHERE id = ?',
          args: [id]
        })
        if (mtgResult.rows.length > 0) {
          detail = mtgResult.rows[0]
        }
        break
    }

    return { meta, detail }
  }

  // ゲーム別フィルター値取得
  static async getFilterOptions(game?: GameType) {
    const options: any = {
      rarities: [],
      expansions: []
    }

    if (!turso) {
      return options
    }

    // レアリティ一覧
    let raritySql = 'SELECT DISTINCT rarity FROM cards_meta WHERE rarity IS NOT NULL'
    const rarityArgs: any[] = []
    
    if (game) {
      raritySql += ' AND game = ?'
      rarityArgs.push(game)
    }

    const rarityResult = await turso.execute({ sql: raritySql, args: rarityArgs })
    options.rarities = rarityResult.rows.map(row => row.rarity as string)

    // エキスパンション一覧
    let expansionSql = 'SELECT DISTINCT expansion_name FROM cards_meta WHERE expansion_name IS NOT NULL'
    const expansionArgs: any[] = []
    
    if (game) {
      expansionSql += ' AND game = ?'
      expansionArgs.push(game)
    }

    const expansionResult = await turso.execute({ sql: expansionSql, args: expansionArgs })
    options.expansions = expansionResult.rows.map(row => row.expansion_name as string)

    return options
  }
}