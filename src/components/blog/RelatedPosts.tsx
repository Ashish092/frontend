import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  category: string
  tags: string[]
}

interface RelatedPostsProps {
  currentPost: Post
  allPosts: Post[]
}

export default function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // Find posts with matching tags or category
  const relatedPosts = allPosts
    .filter(post => 
      post.id !== currentPost.id && (
        post.category === currentPost.category ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
    )
    .slice(0, 2) // Show only 2 related posts

  if (relatedPosts.length === 0) return null

  return (
    <div className="mt-12 pt-12 border-t">
      <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar size={16} className="mr-2" />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#1E3D8F] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
} 