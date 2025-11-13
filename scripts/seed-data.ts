// サンプルデータ投入スクリプト
import { config } from 'dotenv'
import { turso } from '../src/lib/db'
import { Card } from '../src/types/card'

// 環境変数を読み込み
config({ path: '.env.local' })

const sampleCards: Omit<Card, 'created_at' | 'updated_at'>[] = [
  {
    id: '1',
    name: 'ピカチュウex',
    name_en: 'Pikachu ex',
    card_number: '033/071',
    type: '雷',
    super_type: 'ポケモン',
    sub_type: 'たね',
    hp: 180,
    rarity: 'RR',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043233_P_PIKACHUSEX.jpg',
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
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '2',
    name: 'リザードンex',
    name_en: 'Charizard ex',
    card_number: '054/071',
    type: '炎',
    super_type: 'ポケモン',
    sub_type: '2進化',
    hp: 330,
    rarity: 'RR',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043254_P_RIZAADONEX.jpg',
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
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '3',
    name: 'ミュウツーex',
    name_en: 'Mewtwo ex',
    card_number: '055/071',
    type: '超',
    super_type: 'ポケモン',
    sub_type: 'たね',
    hp: 190,
    rarity: 'RR',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043255_P_MYUUTUUEX.jpg',
    retreat_cost: 2,
    weakness_type: '悪',
    weakness_value: '×2',
    attacks: JSON.stringify([
      {
        name: 'フォトンフィールド',
        cost: ['超'],
        damage: '30',
        effect: 'おたがいのプレイヤーは、次の自分の番、手札からエネルギーを2枚まで自分のポケモンにつけることができる。'
      },
      {
        name: 'マインドブラスト',
        cost: ['超', '超', '無色'],
        damage: '150',
        effect: 'このワザのダメージで相手のポケモンがきぜつするなら、相手は手札をすべて山札にもどして切る。'
      }
    ]),
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '4',
    name: 'サーナイトex',
    name_en: 'Gardevoir ex',
    card_number: '056/071',
    type: '超',
    super_type: 'ポケモン',
    sub_type: '2進化',
    hp: 230,
    rarity: 'RR',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043256_P_SAANAAITOEX.jpg',
    retreat_cost: 2,
    weakness_type: '鋼',
    weakness_value: '×2',
    abilities: JSON.stringify([
      {
        name: 'サイコエンブレイス',
        effect: '自分の番に1回使える。自分の山札から超エネルギーを2枚まで選び、自分のポケモンに好きなようにつける。そして山札を切る。',
        type: 'ability'
      }
    ]),
    attacks: JSON.stringify([
      {
        name: 'ミラクルフォース',
        cost: ['超', '超', '無色'],
        damage: '120+',
        effect: 'このポケモンについているエネルギーの個数×20ダメージ追加。'
      }
    ]),
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '5',
    name: 'ボスの指令',
    name_en: 'Boss\'s Orders',
    card_number: '060/071',
    type: '無色',
    super_type: 'トレーナー',
    sub_type: 'サポート',
    rarity: 'U',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043260_T_BOSUNOSHIREI.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '6',
    name: 'ナンジャモ',
    name_en: 'Nemona',
    card_number: '061/071',
    type: '無色',
    super_type: 'トレーナー',
    sub_type: 'サポート',
    rarity: 'U',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043261_T_NANNJAMO.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '7',
    name: 'ハイパーボール',
    name_en: 'Ultra Ball',
    card_number: '062/071',
    type: '無色',
    super_type: 'トレーナー',
    sub_type: 'グッズ',
    rarity: 'U',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/SV4A/043262_T_HAIPAABOORU.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '8',
    name: '基本雷エネルギー',
    name_en: 'Basic Lightning Energy',
    card_number: '067/071',
    type: '雷',
    super_type: 'エネルギー',
    sub_type: '基本',
    rarity: 'C',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/energy/ENERGY_L.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '9',
    name: '基本炎エネルギー',
    name_en: 'Basic Fire Energy',
    card_number: '068/071',
    type: '炎',
    super_type: 'エネルギー',
    sub_type: '基本',
    rarity: 'C',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/energy/ENERGY_R.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  },
  {
    id: '10',
    name: '基本超エネルギー',
    name_en: 'Basic Psychic Energy',
    card_number: '069/071',
    type: '超',
    super_type: 'エネルギー',
    sub_type: '基本',
    rarity: 'C',
    regulation: 'H',
    image_url: 'https://www.pokemon-card.com/assets/images/card_images/large/energy/ENERGY_P.jpg',
    expansion_name: '古代の咆哮',
    expansion_code: 'SV4A'
  }
]

async function seedDatabase() {
  console.log('Seeding database with sample cards...')

  for (const card of sampleCards) {
    try {
      await turso.execute({
        sql: `INSERT OR REPLACE INTO cards (
          id, name, name_en, card_number, type, super_type, sub_type, hp, 
          rarity, regulation, image_url, retreat_cost, weakness_type, 
          weakness_value, resistance_type, resistance_value, attacks, 
          abilities, expansion_name, expansion_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          card.id,
          card.name,
          card.name_en || null,
          card.card_number || null,
          card.type,
          card.super_type,
          card.sub_type || null,
          card.hp || null,
          card.rarity,
          card.regulation || null,
          card.image_url || null,
          card.retreat_cost || null,
          card.weakness_type || null,
          card.weakness_value || null,
          card.resistance_type || null,
          card.resistance_value || null,
          card.attacks || null,
          card.abilities || null,
          card.expansion_name || null,
          card.expansion_code || null
        ]
      })
      console.log(`✅ Inserted: ${card.name}`)
    } catch (error) {
      console.error(`❌ Failed to insert ${card.name}:`, error)
    }
  }

  console.log('✅ Database seeding completed!')
}

async function main() {
  try {
    await seedDatabase()
    process.exit(0)
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    process.exit(1)
  }
}

main()