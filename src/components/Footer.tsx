'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const nav = t.nav;
  const contact = t.contact;

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full p-2 flex items-center justify-center relative">
                 <Image 
                   src="/Volleyball-PNG-Photo.webp" 
                   alt="NVC Logo" 
                   fill
                   className="p-2 object-contain"
                 />
               </div>
              <div>
                <span className="block font-bold text-lg leading-none">Nepal Volleyball</span>
                <span className="block text-sm text-gray-400">Club Hamburg e.V.</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.intro.subtext}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {language === 'NE' ? 'छिटो लिंक' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {[
                { label: nav.home, href: '/' },
                { label: nav.about, href: '/about' },
                { label: nav.events, href: '/events' },
                { label: nav.news, href: '/news' },
                { label: nav.contact, href: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {nav.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Hellkamp 30, 20255 Hamburg, Germany</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>{contact.email}</span>
              </li>
              <li className="text-xs text-gray-500 pt-2 border-t border-gray-800 mt-2">
                {contact.registered}
              </li>
            </ul>
          </div>

          {/* Newsletter / Join */}
          <div>
             <h3 className="font-bold text-lg mb-6 text-white border-l-4 border-primary-500 pl-3">
              {nav.membership}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {language === 'NE' 
                ? 'आजै सदस्य बन्नुहोस् र हाम्रो समुदायको हिस्सा बन्नुहोस्।'
                : 'Werden Sie noch heute Mitglied und Teil unserer Gemeinschaft.'}
            </p>
            <Link href="/membership" className="btn-primary w-full text-center block py-3 rounded-lg">
              {t.hero.cta_join}
            </Link>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Nepal Volleyball Club Hamburg e.V.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
