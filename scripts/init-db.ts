// データベース初期化スクリプト
import { config } from 'dotenv'
import { initializeDatabase } from '../src/lib/db'

// 環境変数を読み込み
config({ path: '.env.local' })

async function main() {
  try {
    await initializeDatabase()
    console.log('✅ Database initialization completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

main()