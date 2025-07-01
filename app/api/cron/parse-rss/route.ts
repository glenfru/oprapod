import { NextRequest, NextResponse } from 'next/server'
import { parseRSSFeeds } from '@/lib/rss-parser'

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await parseRSSFeeds()
    return NextResponse.json({ 
      success: true, 
      message: 'RSS feeds parsed successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('RSS parsing error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to parse RSS feeds', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}