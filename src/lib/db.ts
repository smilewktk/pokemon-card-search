import { createClient } from '@libsql/client'

// ビルド時はエラーを投げない
if (!process.env.TURSO_DB_URL && process.env.NODE_ENV === 'production') {
  throw new Error('TURSO_DB_URL is not set')
}

if (!process.env.TURSO_AUTH_TOKEN && process.env.NODE_ENV === 'production') {
  throw new Error('TURSO_AUTH_TOKEN is not set')
}

export const turso = process.env.TURSO_DB_URL ? createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN!,
}) : null

export async function initializeDatabase() {
  if (!turso) {
    console.log('Database client not available')
    return
  }
  
  console.log('Initializing database...')
  
  // 共通メタテーブル作成
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS cards_meta (
      id TEXT PRIMARY KEY,
      game TEXT NOT NULL,
      table_name TEXT NOT NULL,
      name TEXT NOT NULL,
      image_url TEXT,
      image_url_large TEXT,
      rarity TEXT,
      expansion_name TEXT,
      expansion_code TEXT,
      release_date TEXT,
      artist TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // ポケモンカード専用テーブル
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS pokemon_cards (
      id TEXT PRIMARY KEY,
      card_number TEXT,
      type TEXT NOT NULL, -- 草、炎、水、雷、超、闘、悪、鋼、フェアリー、無色、ドラゴン
      super_type TEXT NOT NULL, -- ポケモン、トレーナー、エネルギー
      sub_type TEXT, -- たね、1進化、2進化、グッズ、サポート等
      hp INTEGER,
      retreat_cost INTEGER,
      weakness_type TEXT,
      weakness_value TEXT,
      resistance_type TEXT,
      resistance_value TEXT,
      attacks TEXT, -- JSON形式
      abilities TEXT, -- JSON形式
      regulation TEXT, -- スタンダード、エクストラ等
      FOREIGN KEY (id) REFERENCES cards_meta(id)
    )
  `)

  // 遊戯王カード専用テーブル
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS yugioh_cards (
      id TEXT PRIMARY KEY,
      card_number TEXT,
      attribute TEXT, -- 光、闇、炎、水、地、風
      monster_type TEXT, -- 戦士族、魔法使い族等
      card_type TEXT, -- 効果モンスター、融合モンスター、通常魔法等
      level INTEGER,
      rank INTEGER, -- エクシーズ用
      link_rating INTEGER, -- リンク用
      attack INTEGER,
      defense INTEGER,
      effect TEXT,
      pendulum_effect TEXT,
      pendulum_scale INTEGER,
      link_arrows TEXT, -- JSON形式
      FOREIGN KEY (id) REFERENCES cards_meta(id)
    )
  `)

  // MTGカード専用テーブル
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS mtg_cards (
      id TEXT PRIMARY KEY,
      card_number TEXT,
      mana_cost TEXT,
      cmc INTEGER, -- Converted Mana Cost
      colors TEXT, -- JSON形式
      color_identity TEXT, -- JSON形式
      type_line TEXT,
      power TEXT,
      toughness TEXT,
      loyalty INTEGER, -- プレインズウォーカー用
      oracle_text TEXT,
      flavor_text TEXT,
      FOREIGN KEY (id) REFERENCES cards_meta(id)
    )
  `)

  // インデックス作成
  await turso.execute('CREATE INDEX IF NOT EXISTS idx_cards_meta_game ON cards_meta(game)')
  await turso.execute('CREATE INDEX IF NOT EXISTS idx_cards_meta_name ON cards_meta(name)')
  await turso.execute('CREATE INDEX IF NOT EXISTS idx_pokemon_type ON pokemon_cards(type)')
  await turso.execute('CREATE INDEX IF NOT EXISTS idx_yugioh_attribute ON yugioh_cards(attribute)')
  await turso.execute('CREATE INDEX IF NOT EXISTS idx_mtg_colors ON mtg_cards(colors)')

  // デッキテーブル作成
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS decks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      is_public BOOLEAN DEFAULT FALSE,
      category TEXT,
      view_count INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // デッキカードテーブル作成
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS deck_cards (
      id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL,
      card_id TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK(quantity >= 1 AND quantity <= 4),
      FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
      FOREIGN KEY (card_id) REFERENCES cards(id)
    )
  `)

  // デッキいいねテーブル作成
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS deck_likes (
      id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
      UNIQUE(deck_id, user_id)
    )
  `)

  console.log('Database initialized successfully!')
}