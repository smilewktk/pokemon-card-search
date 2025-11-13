import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TCG検索
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            あらゆるトレーディングカードゲームの検索・デッキ管理・画像認識
          </p>
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">カード検索</h3>
            <p className="text-gray-600">
              ポケモン・遊戯王・MTGなど全TCGから詳細検索
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🃏</div>
            <h3 className="text-xl font-semibold mb-2">デッキレシピ</h3>
            <p className="text-gray-600">
              デッキ作成・保存・共有機能
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">画像認識</h3>
            <p className="text-gray-600">
              デッキ画像から自動でカードリスト作成
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}