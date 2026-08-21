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
  const shouldSkipSequence = reducedMotion
  const [isReady, setIsReady] = useState(false)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  
  useEffect(() => {
    if (shouldSkipSequence) {
      setIsReady(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d', { alpha: false }) // Optimize canvas context
    if (!context) return

    // Adaptive Quality: If mobile/low-end, load fewer frames to prevent out-of-memory and boost performance
    const isMobile = window.innerWidth < 768
    const frameStep = isMobile ? 3 : 1
    const activeFrames: number[] = []
    
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      activeFrames.push(i)
    }

    const sequence = { frameIndex: 0 }
    let isDestroyed = false
    const preloadBuffer = isMobile ? 5 : 10

    const loadFrame = async (frameNum: number): Promise<HTMLImageElement> => {
      if (imagesRef.current.has(frameNum)) return imagesRef.current.get(frameNum)!
      
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.src = `${PATH_PREFIX}${String(frameNum).padStart(3, '0')}.jpg`
        img.onload = () => {
          imagesRef.current.set(frameNum, img)
          resolve(img)
        }
        img.onerror = reject
      })
    }

    const render = () => {
      const frameNum = activeFrames[Math.floor(sequence.frameIndex)]
      const img = imagesRef.current.get(frameNum)
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // draw full cover
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const w = img.width * scale
        const h = img.height * scale
        const x = (canvas.width - w) / 2
        const y = (canvas.height - h) / 2
        
        context.drawImage(img, x, y, w, h)
      }
    }

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const loadSequence = async () => {
      try {
        // Load first frame immediately
        const firstFrame = activeFrames[0]
        await loadFrame(firstFrame)
        render()
        setTimeout(() => setIsReady(true), 50)

        // Load buffer
        for (let i = 1; i < Math.min(preloadBuffer, activeFrames.length); i++) {
          await loadFrame(activeFrames[i])
        }

        // Lazy load the rest non-blocking using .decode()
        for (let i = preloadBuffer; i < activeFrames.length; i++) {
          if (isDestroyed) break
          try {
            const img = new window.Image()
            img.src = `${PATH_PREFIX}${String(activeFrames[i]).padStart(3, '0')}.jpg`
            await img.decode()
            imagesRef.current.set(activeFrames[i], img)
          } catch(e) {}
        }
      } catch (err) {
        setIsReady(true)
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
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
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
