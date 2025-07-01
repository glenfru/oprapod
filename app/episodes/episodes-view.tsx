'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Play, MessageCircle, Users, TrendingUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { formatDistanceToNow } from 'date-fns'
import { usePagination } from '@/hooks/use-pagination'

// Real Oprah Podcast episodes data
const realOprahEpisodes = [
  {
    id: 1,
    title: "Eckhart Tolle: A New Earth",
    slug: "eckhart-tolle-new-earth",
    pubDate: new Date('2024-01-15').toISOString(),
    bookTitle: "A New Earth: Awakening to Your Life's Purpose",
    bookAuthor: "Eckhart Tolle",
    description: "Spiritual teacher Eckhart Tolle joins Oprah to discuss his transformative book and how we can transcend ego-based consciousness.",
    members: 15420,
    _count: { posts: 234 }
  },
  {
    id: 2,
    title: "Brené Brown: The Gifts of Imperfection",
    slug: "brene-brown-gifts-imperfection",
    pubDate: new Date('2024-02-12').toISOString(),
    bookTitle: "The Gifts of Imperfection",
    bookAuthor: "Brené Brown",
    description: "Research professor Brené Brown explores vulnerability, courage, and authenticity in wholehearted living.",
    members: 18750,
    _count: { posts: 312 }
  },
  {
    id: 3,
    title: "Glennon Doyle: Untamed",
    slug: "glennon-doyle-untamed",
    pubDate: new Date('2024-03-08').toISOString(),
    bookTitle: "Untamed",
    bookAuthor: "Glennon Doyle",
    description: "Author Glennon Doyle discusses breaking free from societal expectations and living authentically.",
    members: 22100,
    _count: { posts: 445 }
  },
  {
    id: 4,
    title: "Matthew McConaughey: Greenlights",
    slug: "matthew-mcconaughey-greenlights",
    pubDate: new Date('2024-04-05').toISOString(),
    bookTitle: "Greenlights",
    bookAuthor: "Matthew McConaughey",
    description: "Academy Award-winning actor shares life lessons and wisdom from his memoir about turning obstacles into opportunities.",
    members: 19800,
    _count: { posts: 287 }
  },
  {
    id: 5,
    title: "Tara Westover: Educated",
    slug: "tara-westover-educated",
    pubDate: new Date('2024-05-10').toISOString(),
    bookTitle: "Educated: A Memoir",
    bookAuthor: "Tara Westover",
    description: "Historian Tara Westover discusses her powerful memoir about education, family, and self-actualization.",
    members: 16900,
    _count: { posts: 198 }
  },
  {
    id: 6,
    title: "Robin DiAngelo: White Fragility",
    slug: "robin-diangelo-white-fragility",
    pubDate: new Date('2024-06-14').toISOString(),
    bookTitle: "White Fragility: Why It's So Hard for White People to Talk About Racism",
    bookAuthor: "Robin DiAngelo",
    description: "Educator Robin DiAngelo explores white fragility and provides tools for meaningful conversations about race.",
    members: 14200,
    _count: { posts: 156 }
  },
  {
    id: 7,
    title: "Ibram X. Kendi: How to Be an Antiracist",
    slug: "ibram-kendi-how-to-be-antiracist",
    pubDate: new Date('2024-07-19').toISOString(),
    bookTitle: "How to Be an Antiracist",
    bookAuthor: "Ibram X. Kendi",
    description: "Scholar Ibram X. Kendi discusses transformative ideas about racism and antiracism for racial justice.",
    members: 13800,
    _count: { posts: 189 }
  },
  {
    id: 8,
    title: "Elizabeth Gilbert: Big Magic",
    slug: "elizabeth-gilbert-big-magic",
    pubDate: new Date('2024-08-23').toISOString(),
    bookTitle: "Big Magic: Creative Living Beyond Fear",
    bookAuthor: "Elizabeth Gilbert",
    description: "Bestselling author Elizabeth Gilbert explores creativity, inspiration, and living a creative life beyond fear.",
    members: 17600,
    _count: { posts: 267 }
  },
  {
    id: 9,
    title: "Oprah Winfrey: The Path Made Clear",
    slug: "oprah-winfrey-path-made-clear",
    pubDate: new Date('2024-09-15').toISOString(),
    bookTitle: "The Path Made Clear",
    bookAuthor: "Oprah Winfrey",
    description: "Oprah shares wisdom about discovering your life's direction and purpose through meaningful conversations.",
    members: 25600,
    _count: { posts: 567 }
  },
  {
    id: 10,
    title: "Michelle Obama: Becoming",
    slug: "michelle-obama-becoming",
    pubDate: new Date('2024-10-20').toISOString(),
    bookTitle: "Becoming",
    bookAuthor: "Michelle Obama",
    description: "Former First Lady Michelle Obama discusses her memoir and journey of personal growth and public service.",
    members: 31200,
    _count: { posts: 789 }
  },
  {
    id: 11,
    title: "Deepak Chopra: The Seven Spiritual Laws of Success",
    slug: "deepak-chopra-seven-laws",
    pubDate: new Date('2024-11-10').toISOString(),
    bookTitle: "The Seven Spiritual Laws of Success",
    bookAuthor: "Deepak Chopra",
    description: "Spiritual teacher Deepak Chopra explores the intersection of spirituality and success in daily life.",
    members: 18900,
    _count: { posts: 345 }
  },
  {
    id: 12,
    title: "Cheryl Strayed: Wild",
    slug: "cheryl-strayed-wild",
    pubDate: new Date('2024-12-01').toISOString(),
    bookTitle: "Wild: From Lost to Found on the Pacific Crest Trail",
    bookAuthor: "Cheryl Strayed",
    description: "Author Cheryl Strayed discusses her transformative solo hike and journey of self-discovery.",
    members: 16700,
    _count: { posts: 298 }
  }
]

export default function EpisodesView() {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    displayedItems: displayedEpisodes,
    hasMore,
    remainingCount,
    loadMore
  } = usePagination({
    items: realOprahEpisodes,
    initialItemsPerPage: 6,
    itemsPerLoad: 6
  })

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadMore()
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Episode Communities
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Each episode is its own community space - like subreddits for book lovers! 
          Join discussions, share insights, and connect with fellow readers.
        </p>
      </div>

      {/* Episodes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedEpisodes.map((episode) => (
          <article key={episode.id} className="oprah-card p-6 hover:shadow-xl transition-all duration-300 group">
            {/* Community Avatar */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                {episode.bookAuthor.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <Link href={`/e/${episode.slug}`}>
                  <h3 className="font-semibold group-hover:text-primary transition-colors cursor-pointer">
                    r/{episode.slug.replace(/-/g, '')}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">{episode.bookAuthor}</p>
              </div>
            </div>

            {/* Episode Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(episode.pubDate))} ago</span>
              </div>

              <Link href={`/e/${episode.slug}`}>
                <h4 className="text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                  {episode.title}
                </h4>
              </Link>

              <p className="text-muted-foreground text-sm line-clamp-3">
                {episode.description}
              </p>

              {/* Book Info */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                  <span>📚</span>
                  <span>Featured Book</span>
                </div>
                <p className="font-medium text-sm line-clamp-1">{episode.bookTitle}</p>
              </div>

              {/* Community Stats */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{episode.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{episode._count.posts}</span>
                  </div>
                </div>
                
                <Link href={`/e/${episode.slug}`}>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading Episodes...
              </>
            ) : (
              <>
                Load More Episodes
                <Badge variant="secondary" className="ml-2">
                  +{Math.min(remainingCount, 6)}
                </Badge>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}