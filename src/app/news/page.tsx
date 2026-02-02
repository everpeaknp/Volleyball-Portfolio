'use client';

import { Calendar, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

const newsImages = [
    'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80'
];

export default function NewsPage() {
  const { language } = useLanguage();
  const t = content[language].newsPage;

  // Merge images
  const articlesWithImages = t.articles.map((article, index) => ({
      ...article,
      image: newsImages[index % newsImages.length]
  }));

  const featuredNews = articlesWithImages.find(article => article.featured);
  const regularNews = articlesWithImages.filter(article => !article.featured);

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1600&q=80" 
               alt="Latest News" 
               className="w-full h-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         </div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg animate-fade-in">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up">
              {t.heroText}
            </p>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card card-hover overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img 
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    {t.featuredLabel}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredNews.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                    {/* Author is not in content.ts to keep it simple, or I forgot. I'll omit author or hardcode if needed but safer to omit if not in data. */}
                    {/* Actually I'll use a placeholder or remove it to fit the data model. */}
                  </div>
                  <button className="btn-primary w-fit flex items-center gap-2">
                    {t.readMore} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.otherNews}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((article, idx) => (
              <div key={idx} className="card card-hover group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
