import Image from 'next/image'
import { Calendar, MapPin, Clock, Users, ArrowRight, ExternalLink } from 'lucide-react'
import { getEventsPage } from '@/lib/api'
import { mapEventsPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getEventsPage()
    if (apiData) {
      const dynamicData = mapEventsPageData(apiData, langCode)
      const title = dynamicData.eventsPage.header
      const description = dynamicData.eventsPage.description
      
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
    console.error('Failed to load events page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.eventsPage?.header || fallbackContent.nav.events,
    description: fallbackContent.eventsPage?.description || '',
    openGraph: {
      title: fallbackContent.eventsPage?.header || fallbackContent.nav.events,
      description: fallbackContent.eventsPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 1800 // Revalidate every 30 minutes (events change frequently)

export default async function EventsPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getEventsPage()
    if (apiData) {
      pageData = mapEventsPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load events page data:', error)
  }

  const t = pageData.eventsPage || pageData
  const common = pageData

  // Helper function to format date
  const formatDate = (dateString: string, locale = 'en') => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Helper function to format time
  const formatTime = (timeString: string) => {
    try {
      return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return timeString
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.events || 'Events'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Join us for exciting volleyball events and community activities'}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {t.upcoming_events && t.upcoming_events.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                  {t.upcoming_subtitle || "What's Next"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.upcoming_title || 'Upcoming Events'}
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {t.upcoming_events.map((event: any, index: number) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
                    {event.image && (
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={event.image}
                          alt={event.title || 'Event'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {event.title || event.name}
                          </h3>
                          {event.category && (
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                              {event.category}
                            </span>
                          )}
                        </div>
                        {event.is_featured && (
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                      
                      <div className="space-y-3 mb-6">
                        {event.date && (
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-3 text-purple-600" />
                            <span>{formatTime(event.time)}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.max_participants && (
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-3 text-purple-600" />
                            <span>Max {event.max_participants} participants</span>
                          </div>
                        )}
                      </div>

                      {event.registration_link && (
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          {event.registration_text || 'Register Now'}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Events Section */}
      {t.past_events && t.past_events.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.past_title || 'Past Events'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.past_subtitle || 'Take a look at our successful events'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.past_events.map((event: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {event.image && (
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={event.image}
                          alt={event.title || 'Past Event'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title || event.name}
                      </h3>
                      {event.date && (
                        <p className="text-purple-600 font-semibold mb-3">
                          {formatDate(event.date)}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event Guidelines */}
      {t.guidelines && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.guidelines_title || 'Event Guidelines'}
                </h2>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="prose prose-lg max-w-none text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: t.guidelines }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no events */}
      {(!t.upcoming_events || t.upcoming_events.length === 0) && (!t.past_events || t.past_events.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.events || 'Events'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Event information will be updated soon. Please check back later or contact us for more details.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}