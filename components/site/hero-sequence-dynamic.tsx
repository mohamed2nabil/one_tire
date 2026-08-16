'use client'

import dynamic from 'next/dynamic'

export const HeroSequenceDynamic = dynamic(
  () => import('./hero-sequence').then((mod) => mod.HeroSequence),
  { ssr: false }
)
