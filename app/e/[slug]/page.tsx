import { EpisodeHeader } from '@/components/episodes/episode-header'
import { PostCard } from '@/components/posts/post-card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp, Clock, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

// Real Oprah Podcast episodes data
const realOprahEpisodes = [
  {
    id: 1,
    title: "Eckhart Tolle: A New Earth",
    slug: "eckhart-tolle-new-earth",
    pubDate: new Date('2024-01-15').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    bookTitle: "A New Earth: Awakening to Your Life's Purpose",
    bookAuthor: "Eckhart Tolle",
    bookLink: "https://www.amazon.com/New-Earth-Awakening-Purpose-Selection/dp/0452289963",
    bookImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Spiritual teacher Eckhart Tolle joins Oprah to discuss his transformative book 'A New Earth' and how we can transcend ego-based consciousness to find deeper meaning and peace in our daily lives.",
    members: 15420,
    _count: { posts: 234 }
  },
  {
    id: 2,
    title: "Brené Brown: The Gifts of Imperfection",
    slug: "brene-brown-gifts-imperfection",
    pubDate: new Date('2024-02-12').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    bookTitle: "The Gifts of Imperfection",
    bookAuthor: "Brené Brown",
    bookLink: "https://www.amazon.com/Gifts-Imperfection-Think-Supposed-Embrace/dp/159285849X",
    bookImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Research professor Brené Brown explores vulnerability, courage, and authenticity, sharing insights on how to cultivate wholehearted living.",
    members: 18750,
    _count: { posts: 312 }
  },
  {
    id: 3,
    title: "Glennon Doyle: Untamed",
    slug: "glennon-doyle-untamed",
    pubDate: new Date('2024-03-08').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    bookTitle: "Untamed",
    bookAuthor: "Glennon Doyle",
    bookLink: "https://www.amazon.com/Untamed-Glennon-Doyle/dp/1984801252",
    bookImage: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Author Glennon Doyle discusses breaking free from societal expectations and living authentically, sharing her journey of self-discovery and empowerment.",
    members: 22100,
    _count: { posts: 445 }
  },
  {
    id: 4,
    title: "Matthew McConaughey: Greenlights",
    slug: "matthew-mcconaughey-greenlights",
    pubDate: new Date('2024-04-05').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example4",
    bookTitle: "Greenlights",
    bookAuthor: "Matthew McConaughey",
    bookLink: "https://www.amazon.com/Greenlights-Matthew-McConaughey/dp/0593139135",
    bookImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Academy Award-winning actor Matthew McConaughey shares life lessons and wisdom from his memoir, discussing how to turn obstacles into opportunities.",
    members: 19800,
    _count: { posts: 287 }
  },
  {
    id: 5,
    title: "Tara Westover: Educated",
    slug: "tara-westover-educated",
    pubDate: new Date('2024-05-10').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example5",
    bookTitle: "Educated: A Memoir",
    bookAuthor: "Tara Westover",
    bookLink: "https://www.amazon.com/Educated-Memoir-Tara-Westover/dp/0399590501",
    bookImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Historian Tara Westover discusses her powerful memoir about education, family, and the struggle between loyalty and self-actualization.",
    members: 16900,
    _count: { posts: 198 }
  },
  {
    id: 6,
    title: "Robin DiAngelo: White Fragility",
    slug: "robin-diangelo-white-fragility",
    pubDate: new Date('2024-06-14').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example6",
    bookTitle: "White Fragility: Why It's So Hard for White People to Talk About Racism",
    bookAuthor: "Robin DiAngelo",
    bookLink: "https://www.amazon.com/White-Fragility-People-About-Racism/dp/0807047414",
    bookImage: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Educator Robin DiAngelo explores the concept of white fragility and provides tools for engaging in meaningful conversations about race and racism.",
    members: 14200,
    _count: { posts: 156 }
  },
  {
    id: 7,
    title: "Ibram X. Kendi: How to Be an Antiracist",
    slug: "ibram-kendi-how-to-be-antiracist",
    pubDate: new Date('2024-07-19').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example7",
    bookTitle: "How to Be an Antiracist",
    bookAuthor: "Ibram X. Kendi",
    bookLink: "https://www.amazon.com/How-Be-Antiracist-Ibram-Kendi/dp/0525509283",
    bookImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Scholar Ibram X. Kendi discusses his transformative ideas about racism and antiracism, offering a new way of thinking about racial justice.",
    members: 13800,
    _count: { posts: 189 }
  },
  {
    id: 8,
    title: "Elizabeth Gilbert: Big Magic",
    slug: "elizabeth-gilbert-big-magic",
    pubDate: new Date('2024-08-23').toISOString(),
    youtubeUrl: "https://www.youtube.com/watch?v=example8",
    bookTitle: "Big Magic: Creative Living Beyond Fear",
    bookAuthor: "Elizabeth Gilbert",
    bookLink: "https://www.amazon.com/Big-Magic-Creative-Living-Beyond/dp/1594634726",
    bookImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    description: "Bestselling author Elizabeth Gilbert explores creativity, inspiration, and the courage to live a creative life beyond fear.",
    members: 17600,
    _count: { posts: 267 }
  }
]

const mockPostsByEpisode: Record<string, any[]> = {
  "eckhart-tolle-new-earth": [
    {
      id: 1,
      title: "📌 Official Episode Discussion Thread",
      body: "Welcome to r/EckhartTolleNewEarth! This is the official discussion thread for Oprah's interview with Eckhart Tolle about 'A New Earth'.\n\n**Discussion Points:**\n• What does 'presence' mean to you?\n• How has ego identification affected your life?\n• Share your experiences with mindfulness practices\n• Questions about the book or episode\n\n**Community Rules:**\n• Be respectful and kind\n• Stay on topic\n• No spam or self-promotion\n• Share personal insights thoughtfully",
      score: 342,
      isPinned: true,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "AutoModerator",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 156 }
    },
    {
      id: 2,
      title: "Eckhart's explanation of the 'pain-body' completely changed my perspective",
      body: "I've been struggling with anxiety for years, and when Eckhart talked about the pain-body - that accumulated emotional pain that lives in us - it was like a lightbulb moment. \n\nThe way he describes how we can observe it without being consumed by it... I've been practicing this for a week now and I'm already noticing a difference. Instead of being my anxiety, I'm watching my anxiety.\n\nAnyone else have this kind of breakthrough moment with his teachings?",
      score: 287,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "mindful_observer",
        avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 89 }
    },
    {
      id: 3,
      title: "The ego's need to be 'right' - calling myself out",
      body: "Watching this episode made me realize how much energy I waste trying to prove I'm right in arguments with my partner. Eckhart's point about the ego's need to be right really hit home.\n\nI caught myself doing it THREE times yesterday and actually stopped mid-sentence. My partner was shocked lol. \n\nIt's wild how much more peaceful conversations become when you're not defending your ego.",
      score: 156,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "recovering_ego",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 43 }
    },
    {
      id: 4,
      title: "Book club starting next week - who's in?",
      body: "Hey everyone! I'm organizing a virtual book club to go through 'A New Earth' chapter by chapter. We'll meet weekly on Zoom to discuss insights and share experiences.\n\nComment below if you're interested and I'll send you the details!\n\nEdit: Wow, so much interest! I'll create a Discord server for ongoing discussion too.",
      score: 124,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "book_club_host",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 67 }
    }
  ],
  "brene-brown-gifts-imperfection": [
    {
      id: 5,
      title: "📌 Official Episode Discussion Thread",
      body: "Welcome to r/BreneBrownGifts! Discuss Brené Brown's appearance on The Oprah Podcast talking about 'The Gifts of Imperfection'.\n\n**Key Topics:**\n• Vulnerability as strength\n• Shame resilience\n• Wholehearted living\n• Courage, compassion, and connection",
      score: 298,
      isPinned: true,
      createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "AutoModerator",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 134 }
    },
    {
      id: 6,
      title: "Vulnerability hangover is REAL",
      body: "Just had my first real experience with what Brené calls a 'vulnerability hangover' after sharing something deeply personal with my team at work.\n\nThe shame spiral was intense - 'Why did I say that? They probably think I'm weak now.' But then I remembered her research about how vulnerability actually builds connection and trust.\n\nUpdate: Three colleagues reached out privately to thank me for being so open. Brené was right!",
      score: 203,
      createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        username: "vulnerable_leader",
        avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
      },
      _count: { comments: 78 }
    }
  ]
}

interface EpisodePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return realOprahEpisodes.map((episode) => ({
    slug: episode.slug,
  }))
}

export default function EpisodePage({ params }: EpisodePageProps) {
  const episode = realOprahEpisodes.find(ep => ep.slug === params.slug)
  
  if (!episode) {
    notFound()
  }

  const posts = mockPostsByEpisode[params.slug] || []

  return (
    <div className="space-y-6">
      {/* Subreddit-style Header */}
      <div className="oprah-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              {episode.bookAuthor.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold">r/{episode.slug.replace(/-/g, '')}</h1>
              <p className="text-muted-foreground">{episode.title}</p>
            </div>
          </div>
          <Button asChild className="oprah-gradient">
            <Link href={`/post/new?episode=${params.slug}`}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{episode.members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{Math.floor(episode.members * 0.05).toLocaleString()} online</span>
          </div>
        </div>
      </div>

      {/* Episode Video and Book */}
      <EpisodeHeader episode={episode} />

      {/* Reddit-style Post Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs defaultValue="hot" className="flex-1">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="hot" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Hot</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>New</span>
              </TabsTrigger>
              <TabsTrigger value="top" className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Top</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hot" className="space-y-4 mt-6">
              {posts
                .sort((a, b) => b.score - a.score)
                .map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={{
                      ...post,
                      episode: {
                        title: episode.title,
                        slug: episode.slug
                      }
                    }} 
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4 mt-6">
              {posts
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={{
                      ...post,
                      episode: {
                        title: episode.title,
                        slug: episode.slug
                      }
                    }} 
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="top" className="space-y-4 mt-6">
              {posts
                .sort((a, b) => b.score - a.score)
                .map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={{
                      ...post,
                      episode: {
                        title: episode.title,
                        slug: episode.slug
                      }
                    }} 
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Load More */}
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata({ params }: EpisodePageProps) {
  const episode = realOprahEpisodes.find(ep => ep.slug === params.slug)
  
  if (!episode) {
    return {
      title: 'Episode Not Found - The Oprah Podcast Community',
      description: 'The requested episode could not be found.',
    }
  }

  return {
    title: `r/${episode.slug.replace(/-/g, '')} - ${episode.title}`,
    description: `Join the discussion about ${episode.bookAuthor}'s "${episode.bookTitle}" on The Oprah Podcast. ${episode.members.toLocaleString()} members sharing insights and experiences.`,
  }
}