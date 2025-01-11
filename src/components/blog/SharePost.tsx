'use client'

import { Facebook, Twitter, Linkedin } from 'lucide-react'

interface SharePostProps {
  title: string
  url: string
}

export default function SharePost({ title, url }: SharePostProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
  }

  return (
    <div className="flex items-center gap-4 py-6">
      <span className="text-gray-600 font-medium">Share the Post:</span>
      <div className="flex gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E3D8F] hover:text-[#FFA500] transition-colors"
        >
          <Facebook size={20} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E3D8F] hover:text-[#FFA500] transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E3D8F] hover:text-[#FFA500] transition-colors"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  )
} 