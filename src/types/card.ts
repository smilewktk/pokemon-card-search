export interface Card {
  id: string
  name: string
  name_en?: string
  card_number?: string
  type: CardType
  super_type: SuperType
  sub_type?: string
  hp?: number
  rarity: Rarity
  regulation?: string
  image_url?: string
  image_url_large?: string
  retreat_cost?: number
  weakness_type?: CardType
  weakness_value?: string
  resistance_type?: CardType
  resistance_value?: string
  attacks?: Attack[]
  abilities?: Ability[]
  expansion_name?: string
  expansion_code?: string
  release_date?: string
  created_at: string
  updated_at: string
}

export interface Attack {
  name: string
  cost: CardType[]
  damage?: string
  effect?: string
}

export interface Ability {
  name: string
  effect: string
  type: 'ability' | 'pokemon_power'
}

export type CardType = 
  | '草' | '炎' | '水' | '雷' | '超' | '闘' 
  | '悪' | '鋼' | 'フェアリー' | '無色' | 'ドラゴン'

export type SuperType = 'ポケモン' | 'トレーナー' | 'エネルギー'

export type Rarity = 
  | 'C' | 'U' | 'R' | 'RR' | 'RRR' | 'SR' 
  | 'SSR' | 'UR' | 'HR' | 'PR' | 'TR'

export interface SearchFilters {
  query?: string
  type?: CardType[]
  super_type?: SuperType[]
  rarity?: Rarity[]
  regulation?: string[]
  hp_min?: number
  hp_max?: number
  retreat_cost_min?: number
  retreat_cost_max?: number
}