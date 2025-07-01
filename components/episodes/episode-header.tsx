'use client'

import { useState } from 'react'
import { Play, ExternalLink, Clock, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { formatDistanceToNow } from 'date-fns'

interface EpisodeHeaderProps {
  episode: {
    id: number
    title: string
    pubDate: string
    youtubeUrl?: string
    bookTitle?: string
    bookAuthor?: string
    bookLink?: string
    bookImage?: string
    description: string
    _count?: {
      posts: number
    }
  }
}

export function EpisodeHeader({ episode }: EpisodeHeaderProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  return (
    <div className="space-y-6">
      {/* Episode Info */}
      <div className="oprah-card p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDistanceToNow(new Date(episode.pubDate))} ago
          </Badge>
          {episode._count && (
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              {episode._count.posts} discussions
            </Badge>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {episode.title}
        </h1>
        
        <p className="text-muted-foreground leading-relaxed mb-6">
          {episode.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="oprah-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-primary" />
              Watch Episode
            </h2>
            
            {episode.youtubeUrl ? (
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                {isVideoPlaying ? (
                  <iframe
                    src={getYouTubeEmbedUrl(episode.youtubeUrl) + '?autoplay=1'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center cursor-pointer group"
                       onClick={() => setIsVideoPlaying(true)}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <Button size="lg" className="relative z-10 bg-white/90 text-primary hover:bg-white">
                      <Play className="w-6 h-6 mr-2" />
                      Play Episode
                    </Button>
                  </div>
                )}
              </AspectRatio>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <p>Video coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Book Spotlight */}
        {episode.bookTitle && (
          <div className="oprah-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-5 h-5 mr-2 text-secondary">📚</span>
              Featured Book
            </h2>
            
            <div className="space-y-4">
              {episode.bookImage && (
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={episode.bookImage}
                    alt={episode.bookTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-lg mb-1">{episode.bookTitle}</h3>
                {episode.bookAuthor && (
                  <p className="text-muted-foreground mb-3">by {episode.bookAuthor}</p>
                )}
                
                {episode.bookLink && (
                  <Button className="w-full oprah-gradient" asChild>
                    <a href={episode.bookLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buy the Book
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}