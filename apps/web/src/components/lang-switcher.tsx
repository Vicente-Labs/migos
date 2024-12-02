'use client'

import { ChevronDown, LanguagesIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'

import { useLanguage } from '@/context/language'
import { cn } from '@/lib/utils'
import type { Language } from '@/types/languages'

import { SUPPORTED_LANGUAGES } from '../../languages'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

export function LangSwitcher() {
  const { replace } = useRouter()
  const { language } = useLanguage()

  const pathname = usePathname()

  const handleRedirectLanguageChange = (language: Language) => {
    const paramsArray = pathname.split('/')
    const newParamsArray = paramsArray.map((param, index) =>
      index === 1 ? language : param,
    )

    const newPathname = newParamsArray.join('/')
    replace(newPathname)
  }

  return (
    <Select
      onValueChange={(value) => handleRedirectLanguageChange(value as Language)}
    >
      <SelectTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <LanguagesIcon />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </SelectTrigger>

      <SelectContent
        className="border-2 border-input shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
        align="center"
      >
        {SUPPORTED_LANGUAGES.map(({ value, country, label, enabled }) => (
          <SelectItem
            key={value}
            className={cn(
              'space-x-2 transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]',
              value === language && 'bg-muted',
            )}
            disabled={!enabled}
            value={value}
          >
            <ReactCountryFlag countryCode={country} svg className="mr-2" />
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
