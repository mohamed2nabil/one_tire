import Image from 'next/image'
import { cn } from '@/lib/utils'

type VanImageProps = {
  className?: string
  priority?: boolean
  lightPool?: boolean
  src?: string
}

export function VanImage({
  className,
  priority = false,
  lightPool = false,
  src = "/images/site/one-tire-van.jpeg"
}: VanImageProps) {
  return (
    <div className={cn('relative w-full', className)}>
      {lightPool && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-125 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 45%, #ffffff 0%, rgba(255,255,255,0.9) 34%, rgba(255,255,255,0) 72%)',
          }}
        />
      )}

      <Image
        src={src}
        alt="سيارة تواير ون المتنقلة لخدمة الإطارات"
        width={1600}
        height={860}
        priority={priority}
        className="relative z-10 h-auto w-full object-contain"
      />
    </div>
  )
}
