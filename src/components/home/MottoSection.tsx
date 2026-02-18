'use client';

import Link from 'next/link';
import { Trophy } from 'lucide-react';

interface MottoSectionProps {
  motto: string; // content.hero.motto
  language: string;
}

export default function MottoSection({ motto, language }: MottoSectionProps) {
  return (
    <section className="py-24 bg-secondary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 nepal-pattern opacity-5"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-10 animate-pulse" />
        <h2 className="text-3xl md:text-6xl font-bold mb-10 leading-tight">
          &quot;{motto}&quot;
        </h2>
        <div className="flex justify-center gap-6">
          <Link href="/contact" className="btn-primary bg-white text-secondary-900 hover:bg-gray-100 hover:text-secondary-950 px-10 py-4 text-xl shadow-xl">
            {language === 'NE' ? 'सम्पर्क गर्नुहोस्' : language === 'DE' ? 'Kontaktieren Sie uns' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </section>
  );
}
