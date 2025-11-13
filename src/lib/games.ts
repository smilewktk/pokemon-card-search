import { GameType, GameConfig } from '@/types/card'

export const gameConfigs: Record<GameType, GameConfig> = {
  pokemon: {
    name: 'ポケモン',
    types: ['草', '炎', '水', '雷', '超', '闘', '悪', '鋼', 'フェアリー', '無色', 'ドラゴン'],
    superTypes: ['ポケモン', 'トレーナー', 'エネルギー'],
    rarities: ['C', 'U', 'R', 'RR', 'RRR', 'SR', 'SSR', 'UR', 'HR', 'PR', 'TR'],
    formats: ['スタンダード', 'エクストラ', '殿堂']
  },
  yugioh: {
    name: '遊戯王',
    types: ['戦士族', '魔法使い族', 'ドラゴン族', '機械族', '悪魔族', '天使族', '獣族', '獣戦士族', 
           '鳥獣族', '水族', '炎族', '岩石族', '昆虫族', '雷族', '植物族', 'アンデット族', '爬虫類族', 
           '魚族', '海竜族', '恐竜族', 'サイキック族', '幻神獣族'],
    superTypes: ['モンスター', '魔法', '罠'],
    rarities: ['ノーマル', 'レア', 'スーパーレア', 'ウルトラレア', 'シークレットレア', 
              'ホログラフィックレア', 'プリズマティックシークレットレア'],
    formats: ['アドバンス', 'ラッシュデュエル']
  },
  mtg: {
    name: 'マジック：ザ・ギャザリング',
    types: ['白', '青', '黒', '赤', '緑', '無色', '多色'],
    superTypes: ['クリーチャー', 'インスタント', 'ソーサリー', 'エンチャント', 'アーティファクト', 
                'プレインズウォーカー', '土地'],
    rarities: ['コモン', 'アンコモン', 'レア', 'ミシックレア'],
    formats: ['スタンダード', 'パイオニア', 'モダン', 'レガシー', 'ヴィンテージ', 'コマンダー']
  },
  shadowverse: {
    name: 'シャドウバース',
    types: ['ニュートラル', 'エルフ', 'ロイヤル', 'ウィッチ', 'ドラゴン', 'ネクロマンサー', 'ヴァンパイア', 'ビショップ'],
    superTypes: ['フォロワー', 'スペル', 'アミュレット'],
    rarities: ['ブロンズ', 'シルバー', 'ゴールド', 'レジェンド'],
    formats: ['ローテーション', 'アンリミテッド']
  },
  digimon: {
    name: 'デジモン',
    types: ['レッド', 'ブルー', 'イエロー', 'グリーン', 'ブラック', 'パープル', 'ホワイト'],
    superTypes: ['デジモン', 'テイマー', 'オプション'],
    rarities: ['C', 'U', 'R', 'SR', 'SEC', 'P'],
    formats: ['スタンダード']
  },
  onepiece: {
    name: 'ONE PIECEカードゲーム',
    types: ['赤', '緑', '青', '紫', '黒', '黄', '白'],
    superTypes: ['リーダー', 'キャラクター', 'イベント', 'ステージ'],
    rarities: ['C', 'UC', 'R', 'SR', 'L', 'SEC', 'SP', 'P'],
    formats: ['スタンダード']
  },
  dragonball: {
    name: 'ドラゴンボールスーパーカードゲーム',
    types: ['赤', '青', '緑', '黄'],
    superTypes: ['リーダー', 'バトル', 'エクストラ'],
    rarities: ['C', 'UC', 'R', 'SR', 'SCR', 'SPR'],
    formats: ['スタンダード']
  },
  other: {
    name: 'その他',
    types: [],
    superTypes: [],
    rarities: [],
    formats: []
  }
}

export function getGameConfig(game: GameType): GameConfig {
  return gameConfigs[game]
}

export function getAllGames(): Array<{ value: GameType; label: string }> {
  return Object.entries(gameConfigs).map(([key, config]) => ({
    value: key as GameType,
    label: config.name
  }))
}