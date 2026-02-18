'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Calendar, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import { useEffect, useState } from 'react'
import { getHomePage } from '@/lib/api'
import { mapHomePageData } from '@/lib/mappers'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function Home() {
  const { language } = useLanguage()
  const [t, setT] = useState(content[language])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getHomePage()
        if (apiData) {
          // Transform API data to match content structure
          const dynamicContent = mapHomePageData(apiData, language)
          setT(dynamicContent)
        } else {
          // Fallback to static
          setT(content[language])
        }
      } catch (e) {
        console.error('Failed to load home page data', e)
        setT(content[language])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [language])

  // Video source - dynamic from CMS with fallback
  const videoSource = t.hero.video

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* Defined Height: Full viewport minus Navbar height (80px/5rem) */}
      <section className="relative w-full mt-20 h-[calc(100vh-5rem)] overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            key={videoSource} // Force reload video when source changes
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSource} type="video/mp4" />
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {t.hero.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-medium tracking-wide drop-shadow-md">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/membership"
                  className="btn-primary text-base md:text-lg px-8 py-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  {t.hero.cta_join}
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-lg font-semibold hover:bg-white/30 transition-all text-base md:text-lg"
                >
                  {t.hero.cta_learn}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom of the container */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
          <ChevronDown className="w-8 h-8 text-white/80" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-100 rounded-full z-0"></div>
              <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={t.intro.image}
                  alt="Volleyball Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized={t.intro.image && t.intro.image.includes('localhost')}
                />
              </div>
            </div>
            <div>
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">
                {t.intro.mini_header ||
                  (language === 'NE'
                    ? 'हाम्रो बारेमा'
                    : language === 'DE'
                    ? 'Über uns'
                    : 'About Us')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {t.intro.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{t.intro.text}</p>
              <p className="text-gray-600 mb-8 border-l-4 border-primary-500 pl-4 py-1 italic">
                {t.intro.subtext}
              </p>

              <div className="flex gap-4">
                <Link
                  href="/about"
                  className="btn-primary flex items-center gap-2 group px-6 py-2 shadow-lg"
                >
                  {t.hero.cta_learn}{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Premium Swiper Carousel */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3 block">
              {t.objectives.mission_label || 'Our Mission'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display tracking-tight">
              {t.objectives.title}
            </h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 text-lg font-light">
              {t.objectives.description || 'Swipe to explore our full vision.'}
            </p>
          </div>

          <div className="relative pb-12">
            <Swiper
              modules={[Pagination, Autoplay, Mousewheel]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              mousewheel={{ forceToAxis: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="objectives-swiper pb-12"
            >
              {t.objectives.list.map((objective: any, idx: number) => (
                <SwiperSlide key={idx} className="h-auto">
                  <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_5px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    {/* Card Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <Image
                        src={objective.image}
                        alt={`Objective ${objective.badge}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized={objective.image && objective.image.includes('localhost')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

                      <div className="absolute top-4 left-4 w-12 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center font-bold text-primary-600 shadow-sm z-10">
                        {objective.badge}
                      </div>
                    </div>

                    {/* Card Content - Text Under Image */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {objective.prefix} {idx + 1}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light text-base flex-1">
                        {objective.text}
                      </p>
                      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-primary-600 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Motto / CTA Section */}
      <section className="py-24 bg-secondary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 nepal-pattern opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-10 animate-pulse" />
          <h2 className="text-3xl md:text-6xl font-bold mb-10 leading-tight">
            &quot;{t.hero.motto}&quot;
          </h2>
          <div className="flex justify-center gap-6">
            <Link
              href="/contact"
              className="btn-primary bg-white text-secondary-900 hover:bg-gray-100 hover:text-secondary-950 px-10 py-4 text-xl shadow-xl"
            >
              {t.motto?.button_label ||
                (language === 'NE'
                  ? 'सम्पर्क गर्नुहोस्'
                  : language === 'DE'
                  ? 'Kontaktieren Sie uns'
                  : 'Contact Us')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {t.stats.map((stat: any, idx: number) => (
              <div key={idx} className="p-4">
                <div className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-base md:text-lg opacity-90 uppercase tracking-widest font-medium border-t border-white/20 pt-4 inline-block px-4">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
