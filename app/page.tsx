'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PostCard } from '@/components/posts/post-card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp, Clock, Award, Users, BookOpen, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { usePagination } from '@/hooks/use-pagination'

// Popular posts from across all episode communities
const mockHomeFeedPosts = [
  {
    id: 1,
    title: "Eckhart's explanation of the 'pain-body' completely changed my perspective",
    body: "I've been struggling with anxiety for years, and when Eckhart talked about the pain-body - that accumulated emotional pain that lives in us - it was like a lightbulb moment...",
    score: 1247,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "mindful_observer",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Eckhart Tolle: A New Earth",
      slug: "eckhart-tolle-new-earth"
    },
    _count: {
      comments: 189
    }
  },
  {
    id: 2,
    title: "Vulnerability hangover is REAL - Brené was right",
    body: "Just had my first real experience with what Brené calls a 'vulnerability hangover' after sharing something deeply personal with my team at work...",
    score: 892,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "vulnerable_leader",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Brené Brown: The Gifts of Imperfection",
      slug: "brene-brown-gifts-imperfection"
    },
    _count: {
      comments: 134
    }
  },
  {
    id: 3,
    title: "Glennon's 'We can do hard things' became my daily mantra",
    body: "After my divorce, I was completely lost. Then I heard Glennon talk about doing hard things and it literally saved my life. Six months later, I'm in therapy, started my own business, and feel more myself than ever...",
    score: 756,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "phoenix_rising",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Glennon Doyle: Untamed",
      slug: "glennon-doyle-untamed"
    },
    _count: {
      comments: 98
    }
  },
  {
    id: 4,
    title: "Matthew's 'greenlights' philosophy helped me reframe my failures",
    body: "I used to see every setback as a red light - a stop sign. But McConaughey's perspective on turning red lights into greenlights has completely changed how I approach challenges...",
    score: 634,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "alright_alright",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Matthew McConaughey: Greenlights",
      slug: "matthew-mcconaughey-greenlights"
    },
    _count: {
      comments: 87
    }
  },
  {
    id: 5,
    title: "Tara Westover's 'Educated' - A powerful story of transformation",
    body: "Just finished reading 'Educated' after hearing Tara's interview with Oprah. The way she describes her journey from isolation to education is absolutely incredible...",
    score: 523,
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "book_lover_2024",
      avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Tara Westover: Educated",
      slug: "tara-westover-educated"
    },
    _count: {
      comments: 67
    }
  },
  {
    id: 6,
    title: "Robin DiAngelo's insights on white fragility opened my eyes",
    body: "I'll be honest - this was a difficult conversation to listen to, but so necessary. Robin's explanations about defensive reactions really made me examine my own responses...",
    score: 445,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "learning_ally",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Robin DiAngelo: White Fragility",
      slug: "robin-diangelo-white-fragility"
    },
    _count: {
      comments: 156
    }
  },
  {
    id: 7,
    title: "Ibram X. Kendi's antiracist framework is revolutionary",
    body: "The way Kendi breaks down the difference between being 'not racist' and being 'antiracist' completely shifted my understanding. This should be required reading...",
    score: 389,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "justice_seeker",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Ibram X. Kendi: How to Be an Antiracist",
      slug: "ibram-kendi-how-to-be-antiracist"
    },
    _count: {
      comments: 203
    }
  },
  {
    id: 8,
    title: "Elizabeth Gilbert's 'Big Magic' unleashed my creativity",
    body: "I've been stuck in a creative rut for months. After listening to Elizabeth talk about creative courage and living beyond fear, I finally started that novel I've been putting off...",
    score: 312,
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    author: {
      username: "creative_soul",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
    },
    episode: {
      title: "Elizabeth Gilbert: Big Magic",
      slug: "elizabeth-gilbert-big-magic"
    },
    _count: {
      comments: 89
    }
  }
]

// Trending episode communities
const trendingCommunities = [
  {
    name: "r/eckharttolle",
    members: 15420,
    description: "A New Earth discussions",
    growth: "+12%"
  },
  {
    name: "r/brenebrown",
    members: 18750,
    description: "Vulnerability & courage",
    growth: "+18%"
  },
  {
    name: "r/glennonDoyle",
    members: 22100,
    description: "Untamed living",
    growth: "+25%"
  }
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Pagination hooks for different tabs
  const hotPosts = usePagination({
    items: mockHomeFeedPosts.sort((a, b) => b.score - a.score),
    initialItemsPerPage: 3,
    itemsPerLoad: 3
  })
  
  const newPosts = usePagination({
    items: mockHomeFeedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    initialItemsPerPage: 3,
    itemsPerLoad: 3
  })
  
  const topPosts = usePagination({
    items: mockHomeFeedPosts.sort((a, b) => b.score - a.score),
    initialItemsPerPage: 3,
    itemsPerLoad: 3
  })

  const handleLoadMore = async (loadMoreFn: () => void) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    loadMoreFn()
    setIsLoading(false)
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="oprah-card p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="h-10 bg-muted rounded mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded mb-6 animate-pulse" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-10 bg-muted rounded animate-pulse" />
                <div className="h-10 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="oprah-card p-6">
            <div className="h-6 bg-muted rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-3 space-y-6">
        {/* Hero Section */}
        <div className="oprah-card p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Oprah Podcast Community
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Reddit-style communities for every Oprah Podcast episode. Join discussions about incredible books, 
              share insights, and connect with fellow readers and wisdom seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="oprah-gradient">
                <Link href="/post/new">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Post
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/episodes">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Communities
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Feed Tabs */}
        <Tabs defaultValue="hot" className="space-y-6">
          <div className="flex items-center justify-between">
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
          </div>

          <TabsContent value="hot" className="space-y-4">
            {hotPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {hotPosts.hasMore && (
              <div className="text-center pt-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleLoadMore(hotPosts.loadMore)}
                  disabled={isLoading}
                  className="min-w-[200px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Posts
                      <Badge variant="secondary" className="ml-2">
                        +{Math.min(hotPosts.remainingCount, 3)}
                      </Badge>
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            {newPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {newPosts.hasMore && (
              <div className="text-center pt-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleLoadMore(newPosts.loadMore)}
                  disabled={isLoading}
                  className="min-w-[200px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Posts
                      <Badge variant="secondary" className="ml-2">
                        +{Math.min(newPosts.remainingCount, 3)}
                      </Badge>
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="top" className="space-y-4">
            {topPosts.displayedItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {topPosts.hasMore && (
              <div className="text-center pt-4">
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
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Posts
                      <Badge variant="secondary" className="ml-2">
                        +{Math.min(topPosts.remainingCount, 3)}
                      </Badge>
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Trending Communities */}
        <div className="oprah-card p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Trending Communities
          </h3>
          <div className="space-y-3">
            {trendingCommunities.map((community, index) => (
              <div key={community.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{community.name}</p>
                    <p className="text-xs text-muted-foreground">{community.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">{community.members.toLocaleString()}</p>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    {community.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/episodes">View All Communities</Link>
          </Button>
        </div>

        {/* Community Guidelines */}
        <div className="oprah-card p-6">
          <h3 className="font-semibold mb-4">Community Guidelines</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Be respectful and kind to all members</li>
            <li>• Stay on topic within each episode community</li>
            <li>• Share personal insights thoughtfully</li>
            <li>• No spam or excessive self-promotion</li>
            <li>• Use content warnings for sensitive topics</li>
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="oprah-card p-6" suppressHydrationWarning>
          <h3 className="font-semibold mb-4">Community Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Members</span>
              <span className="font-medium">127,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Communities</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posts Today</span>
              <span className="font-medium">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Online Now</span>
              <span className="font-medium text-green-600">6,789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}