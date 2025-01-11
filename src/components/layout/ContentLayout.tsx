'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'

interface ContentLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}

export default function ContentLayout({ children, sidebar }: ContentLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center space-x-2 text-gray-600"
        >
          <Menu size={24} />
          <span>Menu</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside
          className={`lg:w-64 flex-shrink-0 ${
            isSidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {sidebar}
        </aside>
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  )
} 