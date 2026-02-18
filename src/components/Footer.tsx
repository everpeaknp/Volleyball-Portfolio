'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { mapFooterData } from '@/lib/mappers'

type Language = 'NE' | 'EN' | 'DE'

interface FooterProps {
  language: Language;
  footerData?: any;
}

export default function Footer({ language, footerData: passedFooterData }: FooterProps) {
  // Use passed footerData or fallback to static content
  const footerData = passedFooterData || mapFooterData(null, language)

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full p-2 flex items-center justify-center relative">
                <Image
                  src={footerData.brand.logo}
                  alt="NVC Logo"
                  fill
                  sizes="48px"
                  className="p-2 object-contain"
                  unoptimized={footerData.brand.logo && footerData.brand.logo.includes('localhost')}
                />
              </div>
              <div>
                <span className="block font-bold text-lg leading-none">
                  {footerData.brand.main}
                </span>
                <span className="block text-sm text-gray-400">{footerData.brand.secondary}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{footerData.description}</p>
            <div className="flex gap-4">
              <a
                href={footerData.social.facebook}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={footerData.social.instagram}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={footerData.social.youtube}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {footerData.sections.quickLinks}
            </h3>
            <ul className="space-y-3">
              {footerData.quickLinks?.length > 0 ? (
                footerData.quickLinks.map((link: any, idx: number) => {
                  const langCode = language.toLowerCase();
                  const href = link.href === '/' ? `/${langCode}` : `/${langCode}${link.href}`;
                  
                  return (
                    <li key={idx}>
                      <Link
                        href={href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                        {link.label}
                      </Link>
                    </li>
                  )
                })
              ) : (
                <li className="text-gray-500 text-sm italic">
                  {language === 'NE'
                    ? 'कुनै लिंक छैन'
                    : language === 'DE'
                    ? 'Keine Links'
                    : 'No links available'}
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {footerData.sections.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>{footerData.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{footerData.contact.email}</span>
              </li>
              <li className="text-xs text-gray-500 pt-2 border-t border-gray-800 mt-2">
                {footerData.contact.registered}
              </li>
            </ul>
          </div>

          {/* Newsletter / Join */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {footerData.sections.membership}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{footerData.membership.description}</p>
            <Link
              href="/membership"
              className="btn-primary w-full text-center block py-3 rounded-lg"
            >
              {footerData.membership.buttonText}
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{footerData.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
