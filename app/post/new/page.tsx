'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Send, Eye, BookOpen } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

// Mock episodes data for the dropdown
const mockEpisodes = [
  {
    id: 1,
    title: "Eckhart Tolle: A New Earth",
    slug: "eckhart-tolle-new-earth",
  },
  {
    id: 2,
    title: "Mellody Hobson: Priceless Facts About Money",
    slug: "mellody-hobson-money-facts",
  },
  {
    id: 3,
    title: "Wally Lamb: The River Is Waiting",
    slug: "wally-lamb-river-waiting",
  },
  {
    id: 4,
    title: "Jacinda Ardern: A Different Kind of Power",
    slug: "jacinda-ardern-leadership",
  }
]

export default function NewPostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const episodeSlug = searchParams.get('episode')
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selectedEpisode, setSelectedEpisode] = useState(episodeSlug || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('write')

  const selectedEpisodeData = mockEpisodes.find(ep => ep.slug === selectedEpisode)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to the episode page or home
    if (selectedEpisode) {
      router.push(`/e/${selectedEpisode}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create a New Post</h1>
          <p className="text-muted-foreground">Share your thoughts with The Oprah Podcast Community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Episode Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Choose Episode (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedEpisode} onValueChange={setSelectedEpisode}>
              <SelectTrigger>
                <SelectValue placeholder="Select an episode to discuss..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Discussion</SelectItem>
                {mockEpisodes
                  .filter((episode) => episode.slug && episode.slug.trim() !== "")
                  .map((episode) => (
                    <SelectItem key={episode.id} value={episode.slug}>
                      {episode.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedEpisodeData && (
              <div className="mt-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {selectedEpisodeData.title}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Post Title */}
        <Card>
          <CardHeader>
            <CardTitle>Post Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="What's on your mind about this episode?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              maxLength={300}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-muted-foreground">
                A clear, engaging title helps others find your discussion
              </p>
              <span className="text-xs text-muted-foreground">
                {title.length}/300
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Post Content */}
        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="mt-4">
                <Textarea
                  placeholder="Share your thoughts, insights, questions, or reactions to the episode. What resonated with you? How are you applying what you learned?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[200px] resize-none"
                  maxLength={10000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    Markdown formatting supported
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {body.length}/10,000
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[200px] p-4 border rounded-md bg-muted/20">
                  {body ? (
                    <div className="prose prose-sm max-w-none">
                      {body.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {paragraph || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Nothing to preview yet. Start writing in the "Write" tab.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Community Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be respectful and kind to fellow community members</li>
              <li>• Stay on topic and contribute meaningfully to discussions</li>
              <li>• No spam, self-promotion, or off-topic content</li>
              <li>• Share personal insights and experiences thoughtfully</li>
            </ul>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          
          <Button 
            type="submit" 
            disabled={!title.trim() || !body.trim() || isSubmitting}
            className="oprah-gradient"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Publish Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}