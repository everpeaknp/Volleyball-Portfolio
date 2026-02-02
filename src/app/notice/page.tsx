'use client';

import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function NoticePage() {
  const { language } = useLanguage();
  const t = content[language].noticePage;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 nepal-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.heroTitle}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t.heroText}
            </p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {t.notices.map((notice, idx) => (
              <div key={idx} className="bg-white border text-gray-800 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            {notice.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {notice.date}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{notice.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-gray-600 mb-8">{t.ctaText}</p>
            <a href="/contact" className="btn-secondary inline-flex items-center gap-2">
                {t.ctaBtn} <ChevronRight className="w-4 h-4" />
            </a>
        </div>
      </section>
    </>
  );
}
