import Image from 'next/image'
import { Bell, Calendar, Clock, AlertCircle, Info, CheckCircle, ExternalLink, Download } from 'lucide-react'
import { getNoticePage } from '@/lib/api'
import { mapNoticePageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getNoticePage()
    if (apiData) {
      const dynamicData = mapNoticePageData(apiData, langCode)
      const title = dynamicData.noticePage.header
      const description = dynamicData.noticePage.description
      
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
    console.error('Failed to load notice page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.noticePage?.header || fallbackContent.nav.notice,
    description: fallbackContent.noticePage?.description || '',
    openGraph: {
      title: fallbackContent.noticePage?.header || fallbackContent.nav.notice,
      description: fallbackContent.noticePage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 600 // Revalidate every 10 minutes (notices are urgent)

export default async function NoticePage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getNoticePage()
    if (apiData) {
      pageData = mapNoticePageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load notice page data:', error)
  }

  const t = pageData.noticePage || pageData
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

  // Helper function to get notice icon based on type
  const getNoticeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'urgent':
      case 'emergency':
        return AlertCircle
      case 'info':
      case 'information':
        return Info
      case 'success':
      case 'completed':
        return CheckCircle
      default:
        return Bell
    }
  }

  // Helper function to get notice color based on type
  const getNoticeColors = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'urgent':
      case 'emergency':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-900',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        }
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-900',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        }
      case 'success':
      case 'completed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-900',
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-800'
        }
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.notice || 'Notices'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Important announcements and updates for our community'}
            </p>
          </div>
        </div>
      </section>

      {/* Important/Urgent Notices */}
      {t.urgent_notices && t.urgent_notices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                  {t.urgent_subtitle || 'Urgent'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.urgent_title || 'Important Notices'}
                </h2>
              </div>
              <div className="space-y-6">
                {t.urgent_notices.map((notice: any, index: number) => {
                  const colors = getNoticeColors(notice.type || 'urgent')
                  const IconComponent = getNoticeIcon(notice.type || 'urgent')
                  
                  return (
                    <div
                      key={index}
                      className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 shadow-lg`}
                    >
                      <div className="flex items-start">
                        <div className={`w-12 h-12 ${colors.badge} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className={`inline-block px-3 py-1 ${colors.badge} text-xs font-bold rounded-full mr-3`}>
                                {notice.type?.toUpperCase() || 'URGENT'}
                              </span>
                              {notice.date && (
                                <span className="text-sm text-gray-600">
                                  {formatDate(notice.date)}
                                </span>
                              )}
                            </div>
                            {notice.expires && (
                              <span className="text-xs text-gray-500">
                                Expires: {formatDate(notice.expires)}
                              </span>
                            )}
                          </div>
                          <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                            {notice.title}
                          </h3>
                          <div className={`${colors.text} leading-relaxed`}>
                            {notice.content ? (
                              <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                            ) : (
                              <p>{notice.description || notice.message}</p>
                            )}
                          </div>
                          {(notice.attachment || notice.link) && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {notice.attachment && (
                                <a
                                  href={notice.attachment}
                                  download
                                  className={`inline-flex items-center px-4 py-2 ${colors.badge} rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold`}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Attachment
                                </a>
                              )}
                              {notice.link && (
                                <a
                                  href={notice.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center px-4 py-2 ${colors.badge} rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold`}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  {notice.link_text || 'Learn More'}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Notices */}
      {t.notices && t.notices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.notices_title || 'All Notices'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.notices_subtitle || 'Latest announcements and updates'}
                </p>
              </div>
              
              {/* Filter/Category tabs if available */}
              {t.categories && t.categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-full font-semibold">
                    All
                  </button>
                  {t.categories.map((category: any, index: number) => (
                    <button
                      key={index}
                      className="px-6 py-2 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-orange-50 hover:text-orange-700 transition-all duration-200"
                    >
                      {category.name || category}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {t.notices.map((notice: any, index: number) => {
                  const colors = getNoticeColors(notice.type || 'info')
                  const IconComponent = getNoticeIcon(notice.type || 'info')
                  
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start mb-4">
                          <div className={`w-10 h-10 ${colors.badge} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                            <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              {notice.type && (
                                <span className={`inline-block px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full`}>
                                  {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                                </span>
                              )}
                              {notice.date && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(notice.date)}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {notice.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="text-gray-600 leading-relaxed mb-4">
                          {notice.excerpt || notice.summary || (
                            notice.content 
                              ? notice.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                              : notice.description
                          )}
                        </div>

                        {(notice.attachment || notice.link) && (
                          <div className="flex flex-wrap gap-2">
                            {notice.attachment && (
                              <a
                                href={notice.attachment}
                                download
                                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Attachment
                              </a>
                            )}
                            {notice.link && (
                              <a
                                href={notice.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {notice.link_text || 'More Info'}
                              </a>
                            )}
                          </div>
                        )}

                        {notice.expires && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Valid until: {formatDate(notice.expires)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no notices */}
      {(!t.notices || t.notices.length === 0) && (!t.urgent_notices || t.urgent_notices.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.notice || 'Notices'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                No notices at the moment. We'll post important announcements here when needed.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}