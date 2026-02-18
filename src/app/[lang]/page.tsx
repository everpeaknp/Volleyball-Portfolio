import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Calendar, ChevronDown } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import ObjectivesCarousel from '@/components/ObjectivesCarousel'
import { getHomePage } from '@/lib/api'
import { mapHomePageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getHomePage()
    if (apiData) {
      const dynamicData = mapHomePageData(apiData, langCode)
      const title = dynamicData.hero.title
      const description = dynamicData.hero.subtitle
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
        },
      }
    }
  } catch (error) {
    console.error('Failed to load home page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.hero.title,
    description: fallbackContent.hero.subtitle,
    openGraph: {
      title: fallbackContent.hero.title,
      description: fallbackContent.hero.subtitle,
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getHomePage()
    if (apiData) {
      pageData = mapHomePageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load home page data:', error)
  }

  // Video source - dynamic from CMS with fallback
  const videoSource = (pageData.hero as any).video || '/volleyball-hero-video.mp4'

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
            <div className="opacity-100 translate-y-0 transition-all duration-800">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {pageData.hero.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-medium tracking-wide drop-shadow-md">
                {pageData.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/membership`}
                  className="btn-primary text-base md:text-lg px-8 py-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  {pageData.hero.cta_join}
                </Link>
                <Link
                  href={`/${lang}/about`}
                  className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-lg font-semibold hover:bg-white/30 transition-all text-base md:text-lg"
                >
                  {pageData.hero.cta_learn}
                </Link>
              </div>
            </div>
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
                  src={pageData.intro.image}
                  alt="Volleyball Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized={!!(pageData.intro.image && pageData.intro.image.includes('localhost'))}
                />
              </div>
            </div>
            <div>
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">
                {pageData.intro.mini_header || (langCode === 'NE' ? 'हाम्रो बारेमा' : langCode === 'DE' ? 'Über uns' : 'About Us')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {pageData.intro.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{pageData.intro.text}</p>
              <p className="text-gray-600 mb-8 border-l-4 border-primary-500 pl-4 py-1 italic">
                {pageData.intro.subtext}
              </p>
              <Link
                href={`/${lang}/about`}
                className="btn-primary inline-flex items-center gap-2 group"
              >
                {langCode === 'NE' ? 'थप जान्नुहोस्' : langCode === 'DE' ? 'Mehr erfahren' : 'Learn More'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-100 rounded-full opacity-10 -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary-100 rounded-full opacity-10 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-16">
            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">
              {pageData.objectives?.mission_label || (langCode === 'NE' ? 'हाम्रो मिशन' : langCode === 'DE' ? 'Unsere Mission' : 'Our Mission')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {pageData.objectives.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              {pageData.objectives?.description || (langCode === 'NE' ? 'पूर्ण विवरण हेर्न स्वाइप गर्नुहोस्' : langCode === 'DE' ? 'Wischen Sie, um vollständige Details zu sehen' : 'Swipe to see full details')}
            </p>
          </div>

          {/* Objectives Carousel */}
          <ObjectivesCarousel 
            objectives={pageData.objectives.list} 
            langCode={langCode} 
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-20"></div>
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-secondary-500 to-transparent opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            {langCode === 'NE' ? 'हाम्रो उपलब्धि' : langCode === 'DE' ? 'Unsere Erfolge' : 'Our Achievements'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {pageData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-primary-400 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg md:text-xl font-medium text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-12">
            {pageData.hero.motto}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`/${lang}/team`}
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2 group"
            >
              <Users className="w-5 h-5" />
              {langCode === 'NE' ? 'हाम्रो टोली हेर्नुहोस्' : langCode === 'DE' ? 'Unser Team ansehen' : 'Meet Our Team'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/events`}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all inline-flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-5 h-5" />
              {langCode === 'NE' ? 'कार्यक्रमहरू हेर्नुहोस्' : langCode === 'DE' ? 'Veranstaltungen ansehen' : 'View Events'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary-600" />
            </div>
            <div className="pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {langCode === 'NE' ? 'हामीसँग सामेल हुनुहोस्' : langCode === 'DE' ? 'Werden Sie Teil unseres Teams' : 'Join Our Community'}
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {langCode === 'NE' 
                  ? 'खेलकुद, स्वास्थ्य र नेपाली संस्कृति संरक्षणमा हाम्रो योगदानमा सहभागी बन्नुहोस्।'
                  : langCode === 'DE' 
                  ? 'Werden Sie Teil unserer Mission für Sport, Gesundheit und die Bewahrung der nepalesischen Kultur.'
                  : 'Be part of our mission to promote sports, health, and preserve Nepalese culture.'
                }
              </p>
              <Link
                href={`/${lang}/membership`}
                className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 group"
              >
                {langCode === 'NE' ? 'आज सदस्य बन्नुहोस्' : langCode === 'DE' ? 'Heute Mitglied werden' : 'Become a Member Today'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}