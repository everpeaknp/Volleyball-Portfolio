import Image from 'next/image'
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react'
import { getAboutPage } from '@/lib/api'
import { mapAboutPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getAboutPage()
    if (apiData) {
      const dynamicData = mapAboutPageData(apiData, langCode)
      const title = dynamicData.aboutPage.header
      const description = dynamicData.aboutPage.description
      
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
    console.error('Failed to load about page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.aboutPage?.header || fallbackContent.nav.about,
    description: fallbackContent.aboutPage?.description || '',
    openGraph: {
      title: fallbackContent.aboutPage?.header || fallbackContent.nav.about,
      description: fallbackContent.aboutPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getAboutPage()
    if (apiData) {
      pageData = mapAboutPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load about page data:', error)
  }

  // Icons mapping for values
  const valueIcons = [Heart, Users, Award, Globe]
  
  const t = pageData.aboutPage || pageData
  const common = pageData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.about || 'About Us'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || common.intro?.text || ''}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                    {common.intro?.mini_header || 'About'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                    {t.about_title || common.intro?.title || 'Introduction'}
                  </h2>
                </div>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>{t.about_text || common.intro?.text || ''}</p>
                  {t.about_subtext && (
                    <p className="mt-4">{t.about_subtext}</p>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={t.about_image || common.intro?.image || '/volleyball-hero-bg.jpg'}
                    alt={t.about_title || 'About Us'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      {(t.mission || t.vision) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {t.mission && (
                  <div className="bg-white p-8 rounded-2xl shadow-lg border">
                    <div className="flex items-center mb-4">
                      <Target className="w-8 h-8 text-red-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {t.mission_title || 'Mission'}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {t.mission}
                    </p>
                  </div>
                )}
                {t.vision && (
                  <div className="bg-white p-8 rounded-2xl shadow-lg border">
                    <div className="flex items-center mb-4">
                      <Eye className="w-8 h-8 text-red-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {t.vision_title || 'Vision'}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {t.vision}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {t.values && t.values.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                  {t.values_subtitle || 'Our Foundation'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.values_title || 'Our Values'}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.values.map((value: any, index: number) => {
                  const IconComponent = valueIcons[index % valueIcons.length]
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {value.title || value}
                      </h3>
                      {value.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Objectives Section - Fallback to static content if dynamic is not available */}
      {(!t.values || t.values.length === 0) && common.objectives && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                  {common.objectives.mission_label || 'Our Mission'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {common.objectives.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {common.objectives.list.map((objective: string, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <span className="text-red-600 font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {objective}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}