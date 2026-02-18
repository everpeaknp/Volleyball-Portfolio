import Image from 'next/image'
import { Mail, Phone, MapPin, Award, Calendar, Users } from 'lucide-react'
import { getCommitteePage } from '@/lib/api'
import { mapCommitteePageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getCommitteePage()
    if (apiData) {
      const dynamicData = mapCommitteePageData(apiData, langCode)
      const title = dynamicData.committeePage.header
      const description = dynamicData.committeePage.description
      
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
    console.error('Failed to load committee page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.committeePage?.header || fallbackContent.nav.committee,
    description: fallbackContent.committeePage?.description || '',
    openGraph: {
      title: fallbackContent.committeePage?.header || fallbackContent.nav.committee,
      description: fallbackContent.committeePage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function CommitteePage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getCommitteePage()
    if (apiData) {
      pageData = mapCommitteePageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load committee page data:', error)
  }

  const t = pageData.committeePage || pageData
  const common = pageData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.committee || 'Committee'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || t.subtitle || 'Our dedicated team working for the community'}
            </p>
          </div>
        </div>
      </section>

      {/* Committee Members Section */}
      {t.members && t.members.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                  {t.members_subtitle || 'Leadership'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.members_title || 'Committee Members'}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.members.map((member: any, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name || 'Committee Member'}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                            {(member.name || 'N').charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name || 'Committee Member'}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {member.position || member.role || 'Member'}
                      </p>
                    </div>
                    
                    {member.bio && (
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    )}

                    {(member.email || member.phone) && (
                      <div className="space-y-2">
                        {member.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-blue-600" />
                            <a href={`mailto:${member.email}`} className="hover:text-blue-600 transition-colors">
                              {member.email}
                            </a>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            <a href={`tel:${member.phone}`} className="hover:text-blue-600 transition-colors">
                              {member.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Committee Structure or Information */}
      {t.structure && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.structure_title || 'Committee Structure'}
                </h2>
                <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                  {t.structure_description || ''}
                </p>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: t.structure }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Responsibilities Section */}
      {t.responsibilities && t.responsibilities.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.responsibilities_title || 'Responsibilities'}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.responsibilities.map((responsibility: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <span className="text-blue-600 font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        {responsibility.title && (
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {responsibility.title}
                          </h3>
                        )}
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {responsibility.description || responsibility}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback to static content if no dynamic content */}
      {(!t.members || t.members.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.committee || 'Committee'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Committee information will be updated soon. Please check back later.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}