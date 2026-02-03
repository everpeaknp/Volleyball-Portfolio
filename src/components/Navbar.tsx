'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = content[language].nav;
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/committee', label: t.committee },
    { href: '/team', label: t.team },
    { href: '/membership', label: t.membership },
    { href: '/events', label: t.events },
    { href: '/news', label: t.news },
    { href: '/gallery', label: t.gallery },
    { href: '/contact', label: t.contact },
  ];

  const languages = [
    { code: 'NE', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  ] as const;

  const currentLang = languages.find(l => l.code === language);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14 group-hover:scale-105 transition-transform duration-300">
                 <Image 
                   src="/Volleyball-PNG-Photo.webp" 
                   alt="NVC Logo" 
                   fill
                   className="object-contain drop-shadow-md"
                   priority
                 />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm md:text-base leading-tight group-hover:text-primary-600 transition-colors">
                  Nepal Volleyball Club
                </span>
                <span className="text-xs text-gray-500 font-medium">Hamburg e.V.</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-2 text-sm transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'text-primary-600 font-bold' 
                      : 'text-gray-600 font-medium hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Language Selection (Flags) */}
            <div className="flex items-center gap-3 ml-4 border-l pl-4 border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`relative transition-all duration-300 ${
                    language === lang.code 
                      ? 'opacity-100 scale-125 drop-shadow-md grayscale-0' 
                      : 'opacity-50 hover:opacity-100 scale-100 hover:scale-110 grayscale'
                  }`}
                  title={lang.label}
                >
                   <span className="text-xl leading-none block">{lang.flag}</span>
                   {language === lang.code && (
                     <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
                   )}
                </button>
              ))}
            </div>
          </div>
          
           {/* Tablet/Laptop Navigation (Simplified if XL is too wide, but LG might work) */}
           {/* For now, sticking to standard breakpoint logic. Lg might be tight for German. Switching 'hidden lg:flex' to 'hidden xl:flex' might be safer if we want to avoid wrap, OR just reducing text size. */}
           {/* Let's try lg:flex but with very small horizontal padding. */}
           <div className="hidden lg:flex xl:hidden items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                   // Smaller text for this range
                  className={`px-1.5 py-2 text-[13px] transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'text-primary-600 font-bold' 
                      : 'text-gray-600 font-medium hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
             <div className="flex items-center gap-2 ml-2 border-l pl-2 border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                   className={`relative transition-all duration-300 ${
                    language === lang.code 
                      ? 'opacity-100 scale-125 grayscale-0' 
                      : 'opacity-50 hover:opacity-100 scale-100 grayscale'
                  }`}
                >
                   <span className="text-lg leading-none block">{lang.flag}</span>
                </button>
              ))}
            </div>
           </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
             {/* Mobile Language Toggle */}
             <button
                onClick={() => {
                    const nextLang = language === 'NE' ? 'EN' : language === 'EN' ? 'DE' : 'NE';
                    setLanguage(nextLang);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full"
              >
                <span className="text-lg leading-none">{currentLang?.flag}</span>
                <span className="text-sm font-bold text-gray-700">{currentLang?.code}</span>
              </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-up h-screen overflow-y-auto pb-40"> {/* h-screen to handle many items */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors border-b border-gray-50 ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </Link>
            )})}
          </div>
        </div>
      )}
    </nav>
  );
}
