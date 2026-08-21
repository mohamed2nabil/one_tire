"use client";

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface OptimizedVideoProps {
  src: string;
  fallbackImage?: string;
  className?: string;
}

export function OptimizedVideo({ src, className }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [containerRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (isIntersecting) {
      video.play().catch(() => {/* autoplay policy */});
    } else {
      video.pause();
    }
  }, [isIntersecting, reducedMotion]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        src={reducedMotion ? undefined : src}
        className={className}
        preload="auto"
        playsInline
        muted
        loop
        autoPlay
      />
    </div>
  );
}

