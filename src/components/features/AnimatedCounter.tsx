'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export default function AnimatedCounter({ end, duration = 2000, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  })
  const countRef = useRef(count)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (inView) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }

        const progress = timestamp - startTimeRef.current
        const percentage = Math.min(progress / duration, 1)
        
        const currentCount = Math.floor(end * percentage)
        setCount(currentCount)
        countRef.current = currentCount

        if (percentage < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
} 