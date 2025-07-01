import { allMockPosts } from '@/lib/data/mock-data'

// This function tells Next.js which dynamic routes to pre-generate for static export
export async function generateStaticParams() {
  // Return all available post IDs for static generation
  return allMockPosts.map((post) => ({
    id: String(post.id) // Must be a string, even if the ID is a number
  }))
}

interface PostLayoutProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: PostLayoutProps) {
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

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}