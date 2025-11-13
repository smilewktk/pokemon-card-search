export interface Card {
  id: string
  name: string
  name_en?: string
  card_number?: string
  game: GameType
  type: string
  super_type: string
  sub_type?: string
  cost?: number
  attack?: number
  defense?: number
  hp?: number
  rarity: string
  format?: string
  regulation?: string
  image_url?: string
  image_url_large?: string
  retreat_cost?: number
  weakness_type?: string
  weakness_value?: string
  resistance_type?: string
  resistance_value?: string
  attacks?: string
  abilities?: string
  effect?: string
  flavor_text?: string
  artist?: string
  expansion_name?: string
  expansion_code?: string
  release_date?: string
  created_at: string
  updated_at: string
}

export type GameType = 
  | 'pokemon' 
  | 'yugioh' 
  | 'mtg'
  | 'shadowverse'
  | 'digimon'
  | 'onepiece'
  | 'dragonball'
  | 'other'

export interface GameConfig {
  name: string
  types: string[]
  superTypes: string[]
  rarities: string[]
  formats: string[]
}

export interface SearchFilters {
  query?: string
  game?: GameType
  type?: string[]
  super_type?: string[]
  rarity?: string[]
  format?: string[]
  cost_min?: number
  cost_max?: number
  attack_min?: number
  attack_max?: number
  defense_min?: number
  defense_max?: number
  hp_min?: number
  hp_max?: number
}