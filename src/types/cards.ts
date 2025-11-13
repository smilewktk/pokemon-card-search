// 基本カードメタ情報
export interface CardMeta {
  id: string
  game: GameType
  table_name: string
  name: string
  image_url?: string
  image_url_large?: string
  rarity: string
  expansion_name?: string
  expansion_code?: string
  release_date?: string
  artist?: string
  created_at: string
  updated_at: string
}

// ポケモンカード
export interface PokemonCard {
  id: string
  card_number?: string
  type: string // 草、炎、水、雷、超、闘、悪、鋼、フェアリー、無色、ドラゴン
  super_type: string // ポケモン、トレーナー、エネルギー
  sub_type?: string // たね、1進化、2進化、グッズ、サポート等
  hp?: number
  retreat_cost?: number
  weakness_type?: string
  weakness_value?: string
  resistance_type?: string
  resistance_value?: string
  attacks?: string // JSON形式
  abilities?: string // JSON形式
  regulation?: string // スタンダード、エクストラ等
}

// 遊戯王カード
export interface YugiohCard {
  id: string
  card_number?: string
  attribute?: string // 光、闇、炎、水、地、風
  monster_type?: string // 戦士族、魔法使い族等
  card_type: string // 効果モンスター、融合モンスター、通常魔法等
  level?: number
  rank?: number // エクシーズ用
  link_rating?: number // リンク用
  attack?: number
  defense?: number
  effect?: string
  pendulum_effect?: string
  pendulum_scale?: number
  link_arrows?: string // JSON形式
}

// MTGカード
export interface MtgCard {
  id: string
  card_number?: string
  mana_cost?: string
  cmc?: number // Converted Mana Cost
  colors?: string // JSON形式
  color_identity?: string // JSON形式
  type_line: string
  power?: string
  toughness?: string
  loyalty?: number // プレインズウォーカー用
  oracle_text?: string
  flavor_text?: string
}

// ゲームタイプ
export type GameType = 'pokemon' | 'yugioh' | 'mtg'

// 統合カード型（メタ情報 + 詳細情報）
export type Card = CardMeta & {
  pokemon?: PokemonCard
  yugioh?: YugiohCard
  mtg?: MtgCard
}

// 検索フィルター
export interface SearchFilters {
  query?: string
  game?: GameType
  rarity?: string[]
  expansion?: string[]
  // ゲーム固有のフィルター
  pokemon_type?: string[]
  pokemon_super_type?: string[]
  yugioh_attribute?: string[]
  yugioh_card_type?: string[]
  mtg_colors?: string[]
  mtg_type_line?: string[]
}