// 複数TCG対応サンプルデータ投入スクリプト
import { config } from 'dotenv'
import { turso } from '../src/lib/db'

// 環境変数を読み込み
config({ path: '.env.local' })

// ポケモンカードのサンプルデータ
const pokemonSampleData = [
  {
    meta: {
      id: 'pokemon_001',
      game: 'pokemon',
      table_name: 'pokemon_cards',
      name: 'ピカチュウex',
      rarity: 'RR',
      expansion_name: '古代の咆哮',
      expansion_code: 'SV4A',
      image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043233_P_PIKACHUSEX.jpg'
    },
    detail: {
      card_number: '033/071',
      type: '雷',
      super_type: 'ポケモン',
      sub_type: 'たね',
      hp: 180,
      retreat_cost: 1,
      weakness_type: '闘',
      weakness_value: '×2',
      attacks: JSON.stringify([
        {
          name: 'アイアンテール',
          cost: ['雷'],
          damage: '20×',
          effect: 'コインを投げ続け、裏が出るまでそのコインを投げつづける。表の回数×20ダメージ。'
        },
        {
          name: '10まんボルト',
          cost: ['雷', '雷', '無色'],
          damage: '120',
          effect: 'このポケモンについているエネルギーをすべて、山札にもどして切る。'
        }
      ]),
      regulation: 'スタンダード'
    }
  },
  {
    meta: {
      id: 'pokemon_002',
      game: 'pokemon',
      table_name: 'pokemon_cards',
      name: 'リザードンex',
      rarity: 'RR',
      expansion_name: '古代の咆哮',
      expansion_code: 'SV4A',
      image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043254_P_RIZAADONEX.jpg'
    },
    detail: {
      card_number: '054/071',
      type: '炎',
      super_type: 'ポケモン',
      sub_type: '2進化',
      hp: 330,
      retreat_cost: 2,
      weakness_type: '水',
      weakness_value: '×2',
      attacks: JSON.stringify([
        {
          name: 'バーニングクロー',
          cost: ['炎', '炎'],
          damage: '80',
          effect: ''
        },
        {
          name: 'バーストフレイム',
          cost: ['炎', '炎', '無色'],
          damage: '180',
          effect: 'このポケモンについているエネルギーを2個選び、トラッシュする。'
        }
      ]),
      regulation: 'スタンダード'
    }
  }
]

// 遊戯王カードのサンプルデータ
const yugiohSampleData = [
  {
    meta: {
      id: 'yugioh_001',
      game: 'yugioh',
      table_name: 'yugioh_cards',
      name: 'ブルーアイズ・ホワイト・ドラゴン',
      rarity: 'ウルトラレア',
      expansion_name: 'LEGEND OF BLUE EYES WHITE DRAGON',
      expansion_code: 'LOB'
    },
    detail: {
      card_number: 'LOB-001',
      attribute: '光',
      monster_type: 'ドラゴン族',
      card_type: '通常モンスター',
      level: 8,
      attack: 3000,
      defense: 2500,
      effect: '高い攻撃力を誇る伝説のドラゴン。どんな攻撃も跳ね返すと言われている。'
    }
  },
  {
    meta: {
      id: 'yugioh_002',
      game: 'yugioh',
      table_name: 'yugioh_cards',
      name: 'ブラック・マジシャン',
      rarity: 'ウルトラレア',
      expansion_name: 'LEGEND OF BLUE EYES WHITE DRAGON',
      expansion_code: 'LOB'
    },
    detail: {
      card_number: 'LOB-005',
      attribute: '闇',
      monster_type: '魔法使い族',
      card_type: '通常モンスター',
      level: 7,
      attack: 2500,
      defense: 2100,
      effect: '魔法使いとしては攻撃力・守備力ともに最高クラス。'
    }
  }
]

// MTGカードのサンプルデータ
const mtgSampleData = [
  {
    meta: {
      id: 'mtg_001',
      game: 'mtg',
      table_name: 'mtg_cards',
      name: 'Lightning Bolt',
      rarity: 'コモン',
      expansion_name: 'Alpha',
      expansion_code: 'LEA'
    },
    detail: {
      mana_cost: 'R',
      cmc: 1,
      colors: JSON.stringify(['Red']),
      type_line: 'Instant',
      oracle_text: 'Lightning Bolt deals 3 damage to any target.',
      flavor_text: 'The sparkmage shrieked, calling on the rage of the storms of his youth. To his surprise, the sky responded with a fierce energy he had never quite managed to channel before.'
    }
  },
  {
    meta: {
      id: 'mtg_002',
      game: 'mtg',
      table_name: 'mtg_cards',
      name: 'Black Lotus',
      rarity: 'レア',
      expansion_name: 'Alpha',
      expansion_code: 'LEA'
    },
    detail: {
      mana_cost: '0',
      cmc: 0,
      colors: JSON.stringify([]),
      type_line: 'Artifact',
      oracle_text: '{T}, Sacrifice Black Lotus: Add three mana of any one color.',
      flavor_text: ''
    }
  }
]

async function seedMultiGameDatabase() {
  console.log('Seeding multi-game database...')

  // ポケモンカードを投入
  for (const card of pokemonSampleData) {
    try {
      // メタ情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO cards_meta (
          id, game, table_name, name, rarity, expansion_name, 
          expansion_code, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.meta.game,
          card.meta.table_name,
          card.meta.name,
          card.meta.rarity,
          card.meta.expansion_name || null,
          card.meta.expansion_code || null,
          card.meta.image_url || null
        ]
      })

      // ポケモン詳細情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO pokemon_cards (
          id, card_number, type, super_type, sub_type, hp, 
          retreat_cost, weakness_type, weakness_value, attacks, regulation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.detail.card_number || null,
          card.detail.type,
          card.detail.super_type,
          card.detail.sub_type || null,
          card.detail.hp || null,
          card.detail.retreat_cost || null,
          card.detail.weakness_type || null,
          card.detail.weakness_value || null,
          card.detail.attacks || null,
          card.detail.regulation || null
        ]
      })

      console.log(`✅ Inserted Pokemon: ${card.meta.name}`)
    } catch (error) {
      console.error(`❌ Failed to insert ${card.meta.name}:`, error)
    }
  }

  // 遊戯王カードを投入
  for (const card of yugiohSampleData) {
    try {
      // メタ情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO cards_meta (
          id, game, table_name, name, rarity, expansion_name, expansion_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.meta.game,
          card.meta.table_name,
          card.meta.name,
          card.meta.rarity,
          card.meta.expansion_name || null,
          card.meta.expansion_code || null
        ]
      })

      // 遊戯王詳細情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO yugioh_cards (
          id, card_number, attribute, monster_type, card_type, 
          level, attack, defense, effect
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.detail.card_number || null,
          card.detail.attribute || null,
          card.detail.monster_type || null,
          card.detail.card_type,
          card.detail.level || null,
          card.detail.attack || null,
          card.detail.defense || null,
          card.detail.effect || null
        ]
      })

      console.log(`✅ Inserted Yu-Gi-Oh!: ${card.meta.name}`)
    } catch (error) {
      console.error(`❌ Failed to insert ${card.meta.name}:`, error)
    }
  }

  // MTGカードを投入
  for (const card of mtgSampleData) {
    try {
      // メタ情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO cards_meta (
          id, game, table_name, name, rarity, expansion_name, expansion_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.meta.game,
          card.meta.table_name,
          card.meta.name,
          card.meta.rarity,
          card.meta.expansion_name || null,
          card.meta.expansion_code || null
        ]
      })

      // MTG詳細情報を投入
      await turso.execute({
        sql: `INSERT OR REPLACE INTO mtg_cards (
          id, mana_cost, cmc, colors, type_line, oracle_text, flavor_text
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.meta.id,
          card.detail.mana_cost || null,
          card.detail.cmc || null,
          card.detail.colors || null,
          card.detail.type_line,
          card.detail.oracle_text || null,
          card.detail.flavor_text || null
        ]
      })

      console.log(`✅ Inserted MTG: ${card.meta.name}`)
    } catch (error) {
      console.error(`❌ Failed to insert ${card.meta.name}:`, error)
    }
  }

  console.log('✅ Multi-game database seeding completed!')
}

async function main() {
  try {
    await seedMultiGameDatabase()
    process.exit(0)
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    process.exit(1)
  }
}

main()