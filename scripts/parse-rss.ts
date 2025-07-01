#!/usr/bin/env tsx

import { parseRSSFeeds } from '../lib/rss-parser'

async function main() {
  console.log('🚀 Starting RSS feed parsing script...')
  
  try {
    await parseRSSFeeds()
    console.log('🎉 RSS parsing completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ RSS parsing failed:', error)
    process.exit(1)
  }
}

main()