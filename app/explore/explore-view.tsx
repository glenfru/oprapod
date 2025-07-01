'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PostCard } from '@/components/posts/post-card'
import { Button } from '@/components/ui/button'
import { Search, TrendingUp, Clock, Award, Filter, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { usePagination } from '@/hooks/use-pagination'

// Mock data for exploration
const mockTrendingPosts = [
  {
    id: 1,
    title: "Eckhart Tolle's wisdom changed my perspective on mindfulness",
    body: "After listening to the episode with Eckhart Tolle, I've been practicing presence in a completely different way. His insights about 'A New Earth' really resonated with me...",
    score: 247,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "mindful_reader",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Eckhart Tolle: A New Earth",
      slug: "eckhart-tolle-new-earth"
    },
    _count: {
      comments: 89
    }
  },
  {
    id: 2,
    title: "Book recommendation: 'Priceless Facts About Money' insights",
    body: "Mellody Hobson's episode was incredible! Her practical advice about financial literacy is exactly what I needed...",
    score: 156,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "finance_enthusiast",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Mellody Hobson: Priceless Facts About Money",
      slug: "mellody-hobson-money-facts"
    },
    _count: {
      comments: 34
    }
  },
  {
    id: 3,
    title: "Brené Brown's vulnerability research changed my relationships",
    body: "I used to think vulnerability was weakness. After hearing Brené's research on The Oprah Podcast, I understand it's actually courage...",
    score: 198,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "courage_seeker",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Brené Brown: The Gifts of Imperfection",
      slug: "brene-brown-gifts-imperfection"
    },
    _count: {
      comments: 67
    }
  },
  {
    id: 4,
    title: "Glennon Doyle's 'untamed' philosophy is life-changing",
    body: "I've been living according to everyone else's expectations for so long. Glennon's message about becoming untamed has given me permission to be myself...",
    score: 234,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "authentic_self",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Glennon Doyle: Untamed",
      slug: "glennon-doyle-untamed"
    },
    _count: {
      comments: 92
    }
  },
  {
    id: 5,
    title: "Matthew McConaughey's 'greenlights' helped me reframe setbacks",
    body: "Every red light in my life felt like a failure until I heard Matthew's perspective. Now I'm looking for the greenlights in every situation...",
    score: 178,
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "optimistic_thinker",
      avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Matthew McConaughey: Greenlights",
      slug: "matthew-mcconaughey-greenlights"
    },
    _count: {
      comments: 45
    }
  },
  {
    id: 6,
    title: "Tara Westover's 'Educated' story is absolutely incredible",
    body: "I couldn't put this book down after hearing Tara's interview. Her journey from isolation to education is one of the most powerful stories I've ever encountered...",
    score: 167,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "book_lover_2024",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Tara Westover: Educated",
      slug: "tara-westover-educated"
    },
    _count: {
      comments: 78
    }
  }
]

const mockTopics = [
  { name: "Mindfulness", count: 45, color: "bg-primary/10 text-primary" },
  { name: "Financial Wisdom", count: 32, color: "bg-secondary/10 text-secondary" },
  { name: "Leadership", count: 28, color: "bg-accent/10 text-accent-foreground" },
  { name: "Personal Growth", count: 67, color: "bg-primary/10 text-primary" },
  { name: "Book Discussions", count: 89, color: "bg-secondary/10 text-secondary" }
]

export default function ExploreView() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Pagination for different tabs
  const trendingPosts = usePagination({
    items: mockTrendingPosts.sort((a, b) => b.score - a.score),
    initialItemsPerPage: 4,
    itemsPerLoad: 4
  })
  
  const recentPosts = usePagination({
    items: mockTrendingPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    initialItemsPerPage: 4,
    itemsPerLoad: 4
  })
  
  const topPosts = usePagination({
    items: mockTrendingPosts.sort((a, b) => b.score - a.score),
    initialItemsPerPage: 4,
    itemsPerLoad: 4
  })

  const handleLoadMore = async (loadMoreFn: () => void) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadMoreFn()
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Discussions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover trending conversations, popular topics, and connect with fellow listeners 
          across all episodes of The Oprah Podcast.
        </p>
      </div>

      {/* Search Bar */}
      <div className="oprah-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search discussions, episodes, books, or users..."
              className="pl-10 bg-background"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="oprah-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Trending Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {mockTopics.map((topic) => (
            <Badge 
              key={topic.name} 
              variant="secondary" 
              className={`${topic.color} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {topic.name} ({topic.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="trending" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recent</span>
          </TabsTrigger>
          <TabsTrigger value="top" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Top</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4">
            {trendingPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {trendingPosts.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(trendingPosts.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Discussions...
                  </>
                ) : (
                  <>
                    Load More Discussions
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(trendingPosts.remainingCount, 4)}
                    </Badge>
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {recentPosts.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(recentPosts.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Discussions...
                  </>
                ) : (
                  <>
                    Load More Discussions
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(recentPosts.remainingCount, 4)}
                    </Badge>
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          <div className="grid gap-4">
            {topPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {topPosts.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(topPosts.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Discussions...
                  </>
                ) : (
                  <>
                    Load More Discussions
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(topPosts.remainingCount, 4)}
                    </Badge>
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}