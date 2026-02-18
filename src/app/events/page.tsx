'use client'

import Image from 'next/image'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { useEffect, useState } from 'react'
import { getEventsPage } from '@/lib/api'
import { mapEventsPageData } from '@/lib/mappers'

export default function EventsPage() {
  const { language } = useLanguage()
  const [pageData, setPageData] = useState(content[language].eventsPage)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getEventsPage()
      if (data) {
        setPageData(mapEventsPageData(data, language))
      }
      setLoading(false)
    }
    loadData()
  }, [language])

  const t = pageData

  // Loading state placeholder (very basic)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-light tracking-widest uppercase">Loading Events...</p>
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
            alt="Volleyball Event"
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

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-primary-500 pl-4">
            <span className="block text-primary-500 font-bold uppercase tracking-wide text-sm mb-1">
              {t.labels.upcoming}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.upcomingTitle}</h2>
          </div>

          <div className="grid gap-10">
            {t.upcoming.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row group h-full"
              >
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-auto min-h-[16rem]">
                  <Image
                    src={
                      event.image ||
                      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80'
                    }
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-600 px-4 py-2 rounded-lg font-bold shadow-sm">
                    {event.date.split(',')[0]}
                  </div>
                </div>
                {/* Content Section */}
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-500" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-8 leading-relaxed">{event.description}</p>

                  <div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                    >
                      {t.registerBtn} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-gray-400 pl-4">
            <span className="block text-gray-500 font-bold uppercase tracking-wide text-sm mb-1">
              {t.labels.past}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.pastTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.past.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group h-full flex flex-col"
              >
                <div className="aspect-video overflow-hidden relative flex-shrink-0">
                  <Image
                    src={
                      event.image ||
                      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80'
                    }
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {event.location}
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
