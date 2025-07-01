'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PostCard } from '@/components/posts/post-card'
import { 
  User, 
  Settings, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Award,
  Edit
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

// Mock user data
const mockUser = {
  id: 'user_1',
  username: 'oprah_fan',
  email: 'oprah.fan@email.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  bio: 'Passionate about mindfulness, personal growth, and meaningful conversations. Long-time Oprah fan and book lover.',
  joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    posts: 24,
    comments: 156,
    karma: 1247
  }
}

// Mock user posts
const mockUserPosts = [
  {
    id: 1,
    title: "Eckhart Tolle's wisdom changed my perspective on mindfulness",
    body: "After listening to the episode with Eckhart Tolle, I've been practicing presence in a completely different way...",
    score: 247,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: {
      username: mockUser.username,
      avatar: mockUser.avatar
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
      username: mockUser.username,
      avatar: mockUser.avatar
    },
    episode: {
      title: "Mellody Hobson: Priceless Facts About Money",
      slug: "mellody-hobson-money-facts"
    },
    _count: {
      comments: 34
    }
  }
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="oprah-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
                <AvatarFallback className="text-lg">
                  {mockUser.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">u/{mockUser.username}</CardTitle>
                <CardDescription className="text-base">{mockUser.email}</CardDescription>
                <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDistanceToNow(new Date(mockUser.joinedAt))} ago</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{mockUser.bio}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-primary mb-1">
                <MessageCircle className="w-4 h-4" />
                <span className="font-bold text-lg">{mockUser.stats.posts}</span>
              </div>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-secondary mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold text-lg">{mockUser.stats.comments}</span>
              </div>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-accent mb-1">
                <Award className="w-4 h-4" />
                <span className="font-bold text-lg">{mockUser.stats.karma}</span>
              </div>
              <p className="text-xs text-muted-foreground">Karma</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Posts</h2>
            <Badge variant="secondary">{mockUser.stats.posts} posts</Badge>
          </div>
          
          <div className="space-y-4">
            {mockUserPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">Load More Posts</Button>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Comments</h2>
            <Badge variant="secondary">{mockUser.stats.comments} comments</Badge>
          </div>
          
          <div className="oprah-card p-6 text-center text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Your comment history will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Posts</h2>
            <Badge variant="secondary">0 saved</Badge>
          </div>
          
          <div className="oprah-card p-6 text-center text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Posts you save will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}