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
  ArrowLeft,
  Reply
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { mockComments } from '@/lib/data/mock-data'

interface PostPageClientProps {
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

function CommentThread({ comment, depth = 0, onVote }: { comment: any, depth?: number, onVote: (commentId: number, type: 'up' | 'down') => void }) {
  const maxDepth = 6
  const shouldNest = depth < maxDepth

  return (
    <div className={`${shouldNest ? 'ml-6 border-l-2 border-muted pl-4' : ''}`}>
      <div className="space-y-3">
        {/* Comment */}
        <div className="oprah-card p-4">
          <div className="flex space-x-3">
            {/* Vote buttons */}
            <div className="flex flex-col items-center space-y-1 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="vote-button w-6 h-6"
                onClick={() => onVote(comment.id, 'up')}
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
              <span className="text-xs font-medium">{comment.score}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="vote-button w-6 h-6"
                onClick={() => onVote(comment.id, 'down')}
              >
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Link href={`/u/${comment.author.username}`} className="hover:underline">
                  u/{comment.author.username}
                </Link>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
              </div>

              {/* Body */}
              <p className="text-sm mb-3 whitespace-pre-wrap">{comment.body}</p>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-xs h-6">
                  <Reply className="w-3 h-3 mr-1" />
                  Reply
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-6">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Bookmark className="mr-2 w-3 h-3" />
                      Save
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Nested comments */}
        {comment.children && comment.children.length > 0 && (
          <div className="space-y-3">
            {comment.children.map((child: any) => (
              <CommentThread key={child.id} comment={child} depth={depth + 1} onVote={onVote} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function PostPageClient({ post }: PostPageClientProps) {
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

  const handleCommentVote = (commentId: number, type: 'up' | 'down') => {
    // Handle comment voting logic here
    console.log(`Voting ${type} on comment ${commentId}`)
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
        </Button>
        {post.episode && (
          <div className="text-sm text-muted-foreground">
            in{' '}
            <Link 
              href={`/e/${post.episode.slug}`}
              className="text-primary hover:underline"
            >
              e/{post.episode.slug}
            </Link>
          </div>
        )}
      </div>

      {/* Post */}
      <article className="oprah-card p-6">
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
      </article>

      {/* Comment form */}
      <div className="oprah-card p-6">
        <h3 className="text-lg font-semibold mb-4">Add a comment</h3>
        <div className="space-y-4">
          <Textarea 
            placeholder="What are your thoughts?"
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button className="oprah-gradient">
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Comments */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">
          Comments ({post._count.comments})
        </h2>
        
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} onVote={handleCommentVote} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center">
          <Button variant="outline">
            Load More Comments
          </Button>
        </div>
      </div>
    </div>
  )
}