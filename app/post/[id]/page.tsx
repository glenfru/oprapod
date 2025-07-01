import { notFound } from 'next/navigation'
import { PostPageClient } from '@/components/posts/post-page-client'
import { allMockPosts } from '@/lib/data/mock-data'

interface PostPageProps {
  params: {
    id: string
  }
}

// This function is required for static export and tells Next.js which dynamic routes to pre-generate
export async function generateStaticParams() {
  return allMockPosts.map((post) => ({
    id: String(post.id), // Must be a string, even if the ID is a number
  }))
}

// This function generates metadata for each post page
export function generateMetadata({ params }: PostPageProps) {
  const postId = parseInt(params.id)
  const post = allMockPosts.find(p => p.id === postId)
  
  if (!post) {
    return {
      title: 'Post Not Found - The Oprah Podcast Community',
      description: 'The requested post could not be found.',
    }
  }

  return {
    title: `${post.title} - The Oprah Podcast Community`,
    description: post.body.substring(0, 155) + '...',
  }
}

// This is the Server Component that handles data fetching and renders the Client Component
export default function PostPage({ params }: PostPageProps) {
  const postId = parseInt(params.id)
  
  // Find the post data based on ID
  const post = allMockPosts.find(p => p.id === postId)
  
  if (!post) {
    notFound()
  }

  // Pass the post data to the Client Component
  return <PostPageClient post={post} />
}