'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Book, ExternalLink, Star, Users, Calendar, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { formatDistanceToNow } from 'date-fns'
import { usePagination } from '@/hooks/use-pagination'

// Mock books data
const mockBooks = [
  {
    id: 1,
    title: "A New Earth",
    author: "Eckhart Tolle",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/New-Earth-Awakening-Purpose-Selection/dp/0452289963",
    rating: 4.8,
    discussionCount: 156,
    episode: {
      title: "Eckhart Tolle: A New Earth",
      slug: "eckhart-tolle-new-earth",
      pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "A transformative guide to spiritual awakening and consciousness that challenges readers to transcend ego-based thinking and discover their true purpose."
  },
  {
    id: 2,
    title: "Priceless Facts About Money",
    author: "Mellody Hobson",
    image: "https://images.pexels.com/photos/159832/money-finance-bills-bank-notes-159832.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/dp/example",
    rating: 4.6,
    discussionCount: 89,
    episode: {
      title: "Mellody Hobson: Priceless Facts About Money",
      slug: "mellody-hobson-money-facts",
      pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "Essential financial wisdom and practical strategies for building wealth, understanding investments, and achieving financial freedom."
  },
  {
    id: 3,
    title: "The River Is Waiting",
    author: "Wally Lamb",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/dp/example",
    rating: 4.7,
    discussionCount: 124,
    episode: {
      title: "Wally Lamb: The River Is Waiting",
      slug: "wally-lamb-river-waiting",
      pubDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "A powerful novel exploring themes of trauma, healing, and human resilience through masterful storytelling."
  },
  {
    id: 4,
    title: "A Different Kind of Power",
    author: "Jacinda Ardern",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/dp/example",
    rating: 4.9,
    discussionCount: 203,
    episode: {
      title: "Jacinda Ardern: A Different Kind of Power",
      slug: "jacinda-ardern-leadership",
      pubDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "Insights about compassionate leadership, governing with empathy, and creating positive change in the world."
  },
  {
    id: 5,
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/Gifts-Imperfection-Think-Supposed-Embrace/dp/159285849X",
    rating: 4.9,
    discussionCount: 312,
    episode: {
      title: "Brené Brown: The Gifts of Imperfection",
      slug: "brene-brown-gifts-imperfection",
      pubDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "A guide to cultivating courage, compassion, and connection through embracing vulnerability and imperfection."
  },
  {
    id: 6,
    title: "Untamed",
    author: "Glennon Doyle",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/Untamed-Glennon-Doyle/dp/1984801252",
    rating: 4.8,
    discussionCount: 445,
    episode: {
      title: "Glennon Doyle: Untamed",
      slug: "glennon-doyle-untamed",
      pubDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "A powerful memoir about breaking free from societal expectations and living authentically."
  },
  {
    id: 7,
    title: "Greenlights",
    author: "Matthew McConaughey",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/Greenlights-Matthew-McConaughey/dp/0593139135",
    rating: 4.7,
    discussionCount: 287,
    episode: {
      title: "Matthew McConaughey: Greenlights",
      slug: "matthew-mcconaughey-greenlights",
      pubDate: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "Life lessons and wisdom about turning obstacles into opportunities and finding your own path."
  },
  {
    id: 8,
    title: "Educated",
    author: "Tara Westover",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=1",
    purchaseLink: "https://www.amazon.com/Educated-Memoir-Tara-Westover/dp/0399590501",
    rating: 4.9,
    discussionCount: 198,
    episode: {
      title: "Tara Westover: Educated",
      slug: "tara-westover-educated",
      pubDate: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString()
    },
    description: "A powerful memoir about education, family, and the struggle between loyalty and self-actualization."
  }
]

function BookCard({ book }: { book: typeof mockBooks[0] }) {
  return (
    <article className="oprah-card p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Book Cover */}
      <AspectRatio ratio={3/4} className="mb-4 bg-muted rounded-lg overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </AspectRatio>

      {/* Book Info */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {book.author}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description}
        </p>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{book.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{book.discussionCount} discussions</span>
          </div>
        </div>

        {/* Episode Link */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
            <Calendar className="w-3 h-3" />
            <span>Featured {formatDistanceToNow(new Date(book.episode.pubDate))} ago</span>
          </div>
          <Link href={`/e/${book.episode.slug}`}>
            <p className="font-medium text-sm hover:text-primary transition-colors cursor-pointer line-clamp-1">
              {book.episode.title}
            </p>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button className="flex-1 oprah-gradient" asChild>
            <a href={book.purchaseLink} target="_blank" rel="noopener noreferrer">
              <Book className="w-4 h-4 mr-2" />
              Buy Book
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/e/${book.episode.slug}`}>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function BooksView() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Pagination for different tabs
  const allBooks = usePagination({
    items: mockBooks,
    initialItemsPerPage: 6,
    itemsPerLoad: 6
  })
  
  const recentBooks = usePagination({
    items: mockBooks.sort((a, b) => new Date(b.episode.pubDate).getTime() - new Date(a.episode.pubDate).getTime()),
    initialItemsPerPage: 6,
    itemsPerLoad: 6
  })
  
  const popularBooks = usePagination({
    items: mockBooks.sort((a, b) => b.discussionCount - a.discussionCount),
    initialItemsPerPage: 6,
    itemsPerLoad: 6
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
          Featured Books
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the incredible books featured on The Oprah Podcast. Each selection offers 
          wisdom, inspiration, and transformative insights from remarkable authors.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search books, authors, topics..."
            className="pl-10 bg-muted/50 border-muted"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Books</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allBooks.displayedItems.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {allBooks.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(allBooks.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Books...
                  </>
                ) : (
                  <>
                    Load More Books
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(allBooks.remainingCount, 6)}
                    </Badge>
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentBooks.displayedItems.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {recentBooks.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(recentBooks.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Books...
                  </>
                ) : (
                  <>
                    Load More Books
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(recentBooks.remainingCount, 6)}
                    </Badge>
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularBooks.displayedItems.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {popularBooks.hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleLoadMore(popularBooks.loadMore)}
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Books...
                  </>
                ) : (
                  <>
                    Load More Books
                    <Badge variant="secondary" className="ml-2">
                      +{Math.min(popularBooks.remainingCount, 6)}
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