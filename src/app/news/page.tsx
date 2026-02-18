'use client'

import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { useEffect, useState } from 'react'
import { getNewsPage } from '@/lib/api'
import { mapNewsPageData } from '@/lib/mappers'

export default function NewsPage() {
  const { language } = useLanguage()
  const [pageData, setPageData] = useState(content[language].newsPage)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getNewsPage()
      if (data) {
        setPageData(mapNewsPageData(data, language))
      }
      setLoading(false)
    }
    loadData()
  }, [language])

  const t = pageData

  const featuredNews = t.articles.find((article) => article.featured)
  const regularNews = t.articles.filter((article) => !article.featured)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-light tracking-widest uppercase">Loading News...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={t.heroImage}
            alt="Latest News"
            fill
            className="object-cover opacity-30 grayscale"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>
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
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden relative min-h-[300px]">
                  <Image
                    src={
                      featuredNews.image ||
                      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80'
                    }
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    {t.featuredLabel}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                  </div>
                  <button className="btn-primary w-fit flex items-center gap-2">
                    {t.readMoreLabel} <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.otherNewsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((article, idx) => (
              <div key={idx} className="card card-hover group">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={
                      article.image ||
                      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80'
                    }
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
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
  )
}
