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
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PostInteractionsProps {
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
}

export function PostInteractions({ post }: PostInteractionsProps) {
  const [postScore, setPostScore] = useState(post.score)
  const [postVote, setPostVote] = useState<'up' | 'down' | null>(null)

  const handlePostVote = (type: 'up' | 'down') => {
    if (postVote === type) {
      // Remove vote
      setPostVote(null)
      setPostScore(prev => prev + (type === 'up' ? -1 : 1))
    } else {
      // Add or change vote
      const scoreChange = postVote === null 
        ? (type === 'up' ? 1 : -1)
        : (type === 'up' ? 2 : -2)
      setPostVote(type)
      setPostScore(prev => prev + scoreChange)
    }
  }

  return (
    <div className="flex space-x-4">
      {/* Vote buttons */}
      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`vote-button ${postVote === 'up' ? 'upvoted' : ''}`}
          onClick={() => handlePostVote('up')}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <span className="text-lg font-medium">{postScore}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`vote-button ${postVote === 'down' ? 'downvoted' : ''}`}
          onClick={() => handlePostVote('down')}
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
          <span>Posted by</span>
          <Link 
            href={`/u/${post.author.username}`}
            className="hover:underline"
          >
            u/{post.author.username}
          </Link>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

        {/* Body */}
        <div className="prose prose-sm max-w-none mb-6">
          <p className="whitespace-pre-wrap">{post.body}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>{post._count.comments} comments</span>
          </div>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}