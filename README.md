# ポケモンカード検索サイト

ポケモンカードの検索・デッキ作成・画像認識機能を持つWebアプリケーション

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Turso** (SQLite互換)
- **Clerk** (認証)
- **Claude Vision API** (画像認識)
- **Vercel** (ホスティング)

## 主要機能

### Phase 1: MVP ✅
- [x] カード検索機能（基本構造）
- [x] カード詳細ページ（基本構造）
- [x] レスポンシブデザイン（基本レイアウト）

### Phase 2: デッキレシピ機能
- [ ] デッキ作成機能
- [ ] デッキ保存・管理
- [ ] 公開デッキ機能

### Phase 3: 画像認識機能
- [ ] デッキ画像アップロード
- [ ] 画像認識処理
- [ ] 認識結果確認画面

### Phase 4: プレミアム機能
- [ ] 有料プラン
- [ ] 無制限機能
- [ ] 広告なし

## 開発状況

- ✅ プロジェクトセットアップ完了
- ✅ 基本レイアウト作成完了
- ✅ 依存関係インストール完了
- 🚧 データベース設定中
- 🚧 認証システム設定中

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

## 環境変数

以下の環境変数が必要です：

```env
TURSO_DB_URL=
TURSO_AUTH_TOKEN=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ANTHROPIC_API_KEY=
```

## ライセンス

MIT License

---

©Pokémon. ©Nintendo/Creatures Inc./GAME FREAK inc.