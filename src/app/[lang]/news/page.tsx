import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight, Bookmark, Share2, Eye } from 'lucide-react'
import { getNewsPage } from '@/lib/api'
import { mapNewsPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getNewsPage()
    if (apiData) {
      const dynamicData = mapNewsPageData(apiData, langCode)
      const title = dynamicData.newsPage.header
      const description = dynamicData.newsPage.description
      
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
    console.error('Failed to load news page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.newsPage?.header || fallbackContent.nav.news,
    description: fallbackContent.newsPage?.description || '',
    openGraph: {
      title: fallbackContent.newsPage?.header || fallbackContent.nav.news,
      description: fallbackContent.newsPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 900 // Revalidate every 15 minutes (news updates frequently)

export default async function NewsPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getNewsPage()
    if (apiData) {
      pageData = mapNewsPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load news page data:', error)
  }

  const t = pageData.newsPage || pageData
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

  // Helper function to calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-orange-600 via-red-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.news || 'News'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Stay updated with the latest news and updates from our volleyball community'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {t.featured_articles && t.featured_articles.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                  {t.featured_subtitle || 'Breaking News'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.featured_title || 'Featured Stories'}
                </h2>
              </div>
              
              {/* Main Featured Article */}
              {t.featured_articles[0] && (
                <div className="mb-12">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-0">
                      <div className="aspect-[16/9] lg:aspect-auto relative">
                        <Image
                          src={t.featured_articles[0].image || t.featured_articles[0].featured_image}
                          alt={t.featured_articles[0].title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          {t.featured_articles[0].category && (
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full mr-3">
                              {t.featured_articles[0].category}
                            </span>
                          )}
                          <span className="text-red-600 font-semibold text-sm">FEATURED</span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          {t.featured_articles[0].title}
                        </h3>
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                          {t.featured_articles[0].excerpt || t.featured_articles[0].summary}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="mr-4">
                            {formatDate(t.featured_articles[0].date || t.featured_articles[0].published_date)}
                          </span>
                          {t.featured_articles[0].author && (
                            <>
                              <User className="w-4 h-4 mr-2" />
                              <span className="mr-4">{t.featured_articles[0].author}</span>
                            </>
                          )}
                          {t.featured_articles[0].content && (
                            <>
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{calculateReadingTime(t.featured_articles[0].content)} min read</span>
                            </>
                          )}
                        </div>
                        <div>
                          <Link
                            href={t.featured_articles[0].url || `#`}
                            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Read Full Story
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {t.articles && t.articles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.articles_title || 'Latest News'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.articles_subtitle || 'Recent updates and stories'}
                </p>
              </div>
              
              {/* Category Filter */}
              {t.categories && t.categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold">
                    All
                  </button>
                  {t.categories.map((category: any, index: number) => (
                    <button
                      key={index}
                      className="px-6 py-2 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                    >
                      {category.name || category}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.articles.map((article: any, index: number) => (
                  <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={article.image || article.featured_image || '/volleyball-news-placeholder.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {article.is_featured && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        {article.category && (
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mr-3">
                            {article.category}
                          </span>
                        )}
                        <time className="text-xs text-gray-500">
                          {formatDate(article.date || article.published_date)}
                        </time>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {article.excerpt || article.summary || (article.content && article.content.substring(0, 150) + '...')}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          {article.author && (
                            <>
                              <User className="w-3 h-3 mr-1" />
                              <span className="mr-3">{article.author}</span>
                            </>
                          )}
                          {article.content && (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{calculateReadingTime(article.content)} min</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Bookmark className="w-4 h-4 text-gray-400 hover:text-red-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Share2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      {t.newsletter && (
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.newsletter.title || 'Stay Updated'}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t.newsletter.description || 'Subscribe to our newsletter for the latest news and updates'}
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder={t.newsletter.placeholder || 'Enter your email'}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    {t.newsletter.button_text || 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no news */}
      {(!t.articles || t.articles.length === 0) && (!t.featured_articles || t.featured_articles.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.news || 'News'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                News articles will be published soon. Stay tuned for exciting updates from our volleyball community!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}