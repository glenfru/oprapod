import Parser from 'rss-parser'
import { db } from '@/lib/database'

const parser = new Parser({
  customFields: {
    item: [
      ['itunes:duration', 'duration'],
      ['itunes:author', 'author'],
      ['itunes:subtitle', 'subtitle'],
      ['itunes:summary', 'summary'],
      ['itunes:image', 'image'],
      ['enclosure', 'enclosure'],
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded']
    ]
  }
})

interface RSSItem {
  title?: string
  link?: string
  pubDate?: string
  content?: string
  contentEncoded?: string
  description?: string
  summary?: string
  subtitle?: string
  author?: string
  duration?: string
  image?: any
  enclosure?: any
  mediaContent?: any
  guid?: string
}

// RSS feed URLs for The Oprah Podcast and related content
const RSS_FEEDS = [
  'https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/32f1779e-bc01-4d36-89e6-afcb01070c82/e0c8382f-48d4-42bb-89d5-afcb01075cb4/podcast.rss',
  'https://feeds.megaphone.fm/FOXM2252206613',
  'https://feeds.npr.org/500005/podcast.xml',
  'https://feeds.simplecast.com/54nAGcIl'
]

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100) // Limit length
}

function extractYouTubeUrl(content: string): string | null {
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]+)/
  ]
  
  for (const pattern of youtubePatterns) {
    const match = content.match(pattern)
    if (match) {
      return `https://www.youtube.com/watch?v=${match[1]}`
    }
  }
  return null
}

function extractBookInfo(content: string, title: string) {
  let bookTitle, bookAuthor, bookLink

  // Common patterns for book information
  const bookPatterns = [
    /(?:book|read|buy).*?[:"]\s*([^"]+)["']?\s+by\s+([^<\n]+)/i,
    /["']([^"']+)["']\s+by\s+([^<\n]+)/i,
    /by\s+([^<\n,]+)[,\s]*[-–]\s*["']([^"']+)["']/i,
    /author[:\s]+([^<\n,]+)[,\s]*book[:\s]*["']?([^"'<\n]+)["']?/i
  ]

  for (const pattern of bookPatterns) {
    const match = content.match(pattern)
    if (match) {
      if (pattern.source.includes('by\\s+([^<\\n,]+)[,\\s]*[-–]')) {
        bookAuthor = match[1].trim()
        bookTitle = match[2].trim()
      } else {
        bookTitle = match[1].trim()
        bookAuthor = match[2].trim()
      }
      break
    }
  }

  // If no book found in content, try to extract from title
  if (!bookTitle && title) {
    const titlePatterns = [
      /^([^:]+):\s*(.+)$/,
      /with\s+([^:]+):\s*(.+)$/i,
      /([^-]+)\s*[-–]\s*(.+)$/
    ]

    for (const pattern of titlePatterns) {
      const match = title.match(pattern)
      if (match) {
        bookAuthor = match[1].trim()
        bookTitle = match[2].trim()
        break
      }
    }
  }

  // Look for purchase links
  const linkPatterns = [
    /<a[^>]+href=["']([^"']*amazon[^"']*)["'][^>]*>/i,
    /<a[^>]+href=["']([^"']*book[^"']*)["'][^>]*>/i,
    /<a[^>]+href=["']([^"']*buy[^"']*)["'][^>]*>/i,
    /https?:\/\/[^\s<]*amazon[^\s<]*/i,
    /https?:\/\/[^\s<]*book[^\s<]*/i
  ]

  for (const pattern of linkPatterns) {
    const match = content.match(pattern)
    if (match) {
      bookLink = match[1] || match[0]
      break
    }
  }

  return { bookTitle, bookAuthor, bookLink }
}

function extractDescription(item: RSSItem): string {
  const sources = [
    item.summary,
    item.subtitle,
    item.contentEncoded,
    item.description,
    item.content
  ]

  for (const source of sources) {
    if (source && typeof source === 'string' && source.trim()) {
      // Clean HTML tags and get first 500 characters
      const cleaned = source
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      
      if (cleaned.length > 50) {
        return cleaned.substring(0, 500) + (cleaned.length > 500 ? '...' : '')
      }
    }
  }

  return 'Episode description not available.'
}

function extractImageUrl(item: RSSItem): string | null {
  // Try various image sources
  if (item.image) {
    if (typeof item.image === 'string') return item.image
    if (item.image.url) return item.image.url
    if (item.image.href) return item.image.href
  }

  if (item.enclosure && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url
  }

  // Look for images in content
  const content = item.contentEncoded || item.description || item.content || ''
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
  if (imgMatch) {
    return imgMatch[1]
  }

  return null
}

export async function parseRSSFeeds() {
  console.log('🔄 Starting RSS feed parsing...')
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`📡 Parsing feed: ${feedUrl}`)
      const feed = await parser.parseURL(feedUrl)
      
      console.log(`📰 Found ${feed.items.length} items in feed: ${feed.title || 'Unknown'}`)
      
      for (const item of feed.items as RSSItem[]) {
        if (!item.title || !item.pubDate) {
          console.log('⚠️ Skipping item without title or pubDate')
          continue
        }

        const slug = createSlug(item.title)
        
        // Check if episode already exists
        const existingEpisode = await db.episode.findUnique({
          where: { slug }
        })

        if (existingEpisode) {
          console.log(`✅ Episode already exists: ${item.title}`)
          continue
        }

        // Extract all content for processing
        const allContent = [
          item.contentEncoded,
          item.description,
          item.content,
          item.summary,
          item.subtitle
        ].filter(Boolean).join(' ')

        // Extract information
        const youtubeUrl = extractYouTubeUrl(allContent)
        const { bookTitle, bookAuthor, bookLink } = extractBookInfo(allContent, item.title)
        const description = extractDescription(item)
        const bookImage = extractImageUrl(item)

        try {
          const episode = await db.episode.create({
            data: {
              title: item.title,
              slug,
              pubDate: new Date(item.pubDate),
              youtubeUrl,
              bookTitle,
              bookAuthor,
              bookLink,
              bookImage,
              description,
            }
          })

          console.log(`✅ Created episode: ${episode.title}`)

          // Create initial discussion post
          await db.post.create({
            data: {
              title: `📌 Official Episode Discussion Thread`,
              body: `Welcome to the discussion for "${item.title}"!\n\n**Discussion Points:**\n• Share your thoughts and reactions to this episode\n• What insights resonated most with you?\n• How are you applying what you learned?\n• Questions about the content or guest\n\n**Community Rules:**\n• Be respectful and kind\n• Stay on topic\n• No spam or self-promotion\n• Share personal insights thoughtfully`,
              episodeId: episode.id,
              authorId: 'system',
              isPinned: true,
              score: Math.floor(Math.random() * 50) + 10,
            }
          })

          console.log(`📝 Created discussion post for: ${episode.title}`)

        } catch (dbError) {
          console.error(`❌ Database error for episode "${item.title}":`, dbError)
        }
      }
      
    } catch (error) {
      console.error(`❌ Error parsing feed ${feedUrl}:`, error)
      // Continue with next feed instead of throwing
    }
  }
  
  console.log('✅ RSS feed parsing completed!')
}

// Legacy function for backward compatibility
export async function parseRSSFeed() {
  return parseRSSFeeds()
}