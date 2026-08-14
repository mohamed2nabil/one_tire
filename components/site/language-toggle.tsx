'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { setLanguageCookie } from '@/lib/actions'
import { Locale } from '@/lib/dictionaries'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  currentLocale: Locale
}

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const router = useRouter()
  const isArabic = currentLocale === 'ar'

  const toggleLanguage = async () => {
    const nextLocale = isArabic ? 'en' : 'ar'
    await setLanguageCookie(nextLocale)
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 font-medium"
      onClick={toggleLanguage}
    >
      <Globe className="size-4" />
      {isArabic ? 'English' : 'العربية'}
    </Button>
  )
}
