'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface IntroSectionProps {
  content: any; // content.intro
  language: string;
  ctaLabel: string; // content.hero.cta_learn usually
}

export default function IntroSection({ content, language, ctaLabel }: IntroSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-100 rounded-full z-0"></div>
            <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80" 
                alt="Volleyball Team" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-2 block">
              {language === 'NE' ? 'हाम्रो बारेमा' : language === 'DE' ? 'Über uns' : 'About Us'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {content.text}
            </p>
            <p className="text-gray-600 mb-8 border-l-4 border-primary-500 pl-4 py-1 italic">
              {content.subtext}
            </p>
            
            <div className="flex gap-4">
              <Link href="/about" className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-2 group">
                {ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
