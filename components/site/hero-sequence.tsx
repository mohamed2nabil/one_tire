'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { IntroLoader } from './intro-loader'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 144
const PATH_PREFIX = '/Vehicle_driving_forward_smoothly_1080p_202607230031_frames/Vehicle_driving_forward_smoothly_1080p_202607230031_frames/frame_'

export function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobileDev = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const shouldSkipSequence = reducedMotion || isMobileDev
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    if (shouldSkipSequence) {
      setIsReady(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d', { alpha: false }) // Optimize canvas context
    if (!context) return

    // Adaptive Quality: If mobile/low-end, load every 2nd frame
    const isMobile = window.innerWidth < 768
    const frameStep = isMobile ? 2 : 1
    const activeFrames: number[] = []
    
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      activeFrames.push(i)
    }

    const images: Record<number, HTMLImageElement> = {}
    const sequence = { frameIndex: 0 }
    
    let isDestroyed = false

    const render = () => {
      const frameNum = activeFrames[Math.floor(sequence.frameIndex)]
      const img = images[frameNum]
      if (img && img.complete) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width / 2) - (img.width / 2) * scale
        const y = (canvas.height / 2) - (img.height / 2) * scale
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale)
      }
    }

    // Load a specific frame
    const loadFrame = (frameNum: number): Promise<void> => {
      return new Promise((resolve) => {
        if (images[frameNum]) return resolve()
        
        const img = new Image()
        img.onload = () => {
          images[frameNum] = img
          resolve()
        }
        img.onerror = () => {
          // If frame fails, just resolve to not block pipeline
          resolve()
        }
        const indexStr = frameNum.toString().padStart(3, '0')
        img.src = `${PATH_PREFIX}${indexStr}.jpg`
      })
    }

    let resizeCanvas: () => void

    // Progressive Loading Strategy
    const loadSequence = async () => {
      // 1. Load the first frame immediately for LCP
      await loadFrame(activeFrames[0])
      if (isDestroyed) return
      
      // Initialize canvas size and render first frame
      resizeCanvas = () => {
        const parent = canvas.parentElement
        if (parent) {
          // Double resolution for retina displays if desktop, else normal
          const dpr = isMobile ? 1 : (window.devicePixelRatio || 1)
          canvas.width = parent.clientWidth * dpr
          canvas.height = parent.clientHeight * dpr
          context.scale(dpr, dpr)
          render()
        }
      }
      window.addEventListener('resize', resizeCanvas)
      resizeCanvas()
      
      // Mark as ready to dismiss cinematic loader
      setIsReady(true)

      // 2. Load next 15% of frames for initial scroll anticipation
      const initialBatchCount = Math.floor(activeFrames.length * 0.15)
      for (let i = 1; i < initialBatchCount; i++) {
        await loadFrame(activeFrames[i])
        if (isDestroyed) return
      }

      // 3. Load the rest lazily
      for (let i = initialBatchCount; i < activeFrames.length; i++) {
        await loadFrame(activeFrames[i])
        if (isDestroyed) return
      }
    }

    loadSequence()

    // GSAP ScrollTrigger
    const animation = gsap.to(sequence, {
      frameIndex: activeFrames.length - 1,
      snap: 'frameIndex',
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 1, // Smooth scrubbing
        fastScrollEnd: true,
      },
      onUpdate: render,
    })

    return () => {
      isDestroyed = true
      if (resizeCanvas) {
        window.removeEventListener('resize', resizeCanvas)
      }
      animation.kill()
      animation.scrollTrigger?.kill()
    }
  }, [shouldSkipSequence])

  return (
    <>
      <IntroLoader isReady={isReady} />
      
      {shouldSkipSequence ? (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#111]">
          <Image
            src={`${PATH_PREFIX}001.jpg`}
            alt="One Tire Van Mobile Service"
            priority
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#111]">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen sm:mix-blend-normal" 
            style={{ 
              transform: 'translateZ(0)', // Hardware acceleration
              willChange: 'transform'
            }} 
          />
        </div>
      )}
    </>
  )
}
