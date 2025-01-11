import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  price: string
}

export default function ServiceCard({ title, description, imageUrl, price }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#1E3D8F] font-bold text-xl">{price}</span>
          <button className="flex items-center space-x-2 text-[#FFA500] hover:text-opacity-80">
            <span>Learn More</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
} 