'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Pin,
  Lock,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: {
    id: number
    title: string
    body: string
    score: number
    isPinned?: boolean
    isLocked?: boolean
    createdAt: string
    author: {
      username: string
      avatar?: string
    }
    episode?: {
      title: string
      slug: string
    }
    _count: {
      comments: number
    }
  }
  userVote?: 'up' | 'down' | null
  compact?: boolean
}

export function PostCard({ post, userVote, compact = false }: PostCardProps) {
  const [vote, setVote] = useState<'up' | 'down' | null>(userVote || null)
  const [score, setScore] = useState(post.score)

  const handleVote = (type: 'up' | 'down') => {
    if (vote === type) {
      // Remove vote
      setVote(null)
      setScore(prev => prev + (type === 'up' ? -1 : 1))
    } else {
      // Add or change vote
      const scoreChange = vote === null 
        ? (type === 'up' ? 1 : -1)
        : (type === 'up' ? 2 : -2)
      setVote(type)
      setScore(prev => prev + scoreChange)
    }
  }

  // Format score for display (1.2k, 15.3k, etc.)
  const formatScore = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <article className={cn(
      "oprah-card hover:shadow-lg transition-all duration-300 bg-white dark:bg-card",
      compact ? "p-3" : "p-4"
    )}>
      <div className="flex space-x-3">
        {/* Vote buttons */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "vote-button h-6 w-6",
              vote === 'up' && "upvoted text-orange-500 bg-orange-50 hover:bg-orange-100"
            )}
            onClick={() => handleVote('up')}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <span className={cn(
            "text-xs font-bold min-w-[2rem] text-center",
            vote === 'up' && "text-orange-500",
            vote === 'down' && "text-blue-500",
            score >= 1000 && "text-xs"
          )}>
            {formatScore(score)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "vote-button h-6 w-6",
              vote === 'down' && "downvoted text-blue-500 bg-blue-50 hover:bg-blue-100"
            )}
            onClick={() => handleVote('down')}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground flex-wrap">
              {post.episode && (
                <>
                  <Link 
                    href={`/e/${post.episode.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    r/{post.episode.slug.replace(/-/g, '')}
                  </Link>
                  <span>•</span>
                </>
              )}
              <span>Posted by</span>
              <Link 
                href={`/u/${post.author.username}`}
                className="hover:underline font-medium"
              >
                u/{post.author.username}
              </Link>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
              {score >= 1000 && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-600 font-medium">Popular</span>
                  </div>
                </>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Bookmark className="mr-2 w-4 h-4" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 w-4 h-4" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title and badges */}
          <div className="mb-2">
            <div className="flex items-center space-x-2 mb-1">
              {post.isPinned && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  <Pin className="w-3 h-3 mr-1" />
                  Pinned
                </Badge>
              )}
              {post.isLocked && (
                <Badge variant="outline" className="text-xs">
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
            <Link href={`/post/${post.id}`}>
              <h3 className={cn(
                "font-semibold hover:text-primary transition-colors cursor-pointer line-clamp-2",
                compact ? "text-sm" : "text-base"
              )}>
                {post.title}
              </h3>
            </Link>
          </div>

          {/* Body preview */}
          {!compact && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
              {post.body}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <Link href={`/post/${post.id}`}>
              <Button variant="ghost" size="sm" className="text-xs h-7 px-2 hover:bg-muted/50">
                <MessageCircle className="w-3 h-3 mr-1" />
                {post._count.comments} comments
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 hover:bg-muted/50">
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 hover:bg-muted/50">
              <Bookmark className="w-3 h-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}