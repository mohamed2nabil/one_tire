'use client'

import { OptimizedVideo } from './optimized-video'
import { cn } from '@/lib/utils'

export type IconName = 'car-insurance' | 'car' | 'electric-car' | 'mechanic-location' | 'path'

interface AnimatedIconProps {
  name: IconName
  className?: string
}

export function AnimatedIcon({ name, className }: AnimatedIconProps) {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <OptimizedVideo
        src={`/icons/${name}.mp4`}
        fallbackImage={`/icons/${name}.png`}
        className="size-full object-contain"
      />
    </div>
  )
}
