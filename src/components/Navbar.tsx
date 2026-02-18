'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { mapNavigationData } from '@/lib/mappers'

type Language = 'NE' | 'EN' | 'DE'

interface NavbarProps {
  language: Language;
  navData?: any;
}

export default function Navbar({ language, navData: passedNavData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Use passed navData or fallback to static content
  const navData = passedNavData || mapNavigationData([], null, language)
  const navItems = navData.items
  const brand = navData.brand

  const languages = [
    { code: 'NE', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  ] as const

  const currentLang = languages.find((l) => l.code === language)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href={`/${language.toLowerCase()}`} className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={brand.logo}
                  alt="NVC Logo"
                  fill
                  sizes="(max-width: 768px) 48px, 56px"
                  className="object-contain drop-shadow-md"
                  priority
                  onError={(e) => {
                    console.error('Logo failed to load:', brand.logo)
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm md:text-base leading-tight group-hover:text-primary-600 transition-colors">
                  {brand.main}
                </span>
                <span className="text-xs text-gray-500 font-medium">{brand.secondary}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item: any) => {
              const currentPath = pathname.replace(/^\/(ne|en|de)/, '') || '/';
              const isActive = 
                (item.path === '/' && currentPath === '/') ||
                (item.path !== '/' && currentPath.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  href={`/${language.toLowerCase()}${item.path === '/' ? '' : item.path}`}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-red-600 bg-red-50 shadow-sm'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50/50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Language Selection */}
            <div className="flex items-center gap-3 ml-4 border-l pl-4 border-gray-200">
              {languages.map((lang) => {
                const langCode = lang.code.toLowerCase();
                const currentPath = pathname.replace(/^\/(ne|en|de)/, '') || '/';
                const href = currentPath === '/' ? `/${langCode}` : `/${langCode}${currentPath}`;
                
                return (
                  <Link
                    key={lang.code}
                    href={href}
                    className={`relative transition-all duration-300 ${
                      language === lang.code
                        ? 'opacity-100 scale-125 drop-shadow-md grayscale-0'
                        : 'opacity-50 hover:opacity-100 scale-100 hover:scale-110 grayscale'
                    }`}
                    title={lang.label}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    {language === lang.code && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item: any) => {
              const currentPath = pathname.replace(/^\/(ne|en|de)/, '') || '/';
              const isActive = 
                (item.path === '/' && currentPath === '/') ||
                (item.path !== '/' && currentPath.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  href={`/${language.toLowerCase()}${item.path === '/' ? '' : item.path}`}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-red-600 bg-red-50 shadow-sm'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Language Selection */}
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-center gap-6">
              {languages.map((lang) => {
                const langCode = lang.code.toLowerCase();
                const currentPath = pathname.replace(/^\/(ne|en|de)/, '') || '/';
                const href = currentPath === '/' ? `/${langCode}` : `/${langCode}${currentPath}`;
                
                return (
                  <Link
                    key={lang.code}
                    href={href}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                      language === lang.code
                        ? 'opacity-100 bg-red-50 scale-110'
                        : 'opacity-70 hover:opacity-100 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                    title={lang.label}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-xs font-medium text-gray-600">{lang.code}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
