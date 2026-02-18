import Image from 'next/image'
import { Check, X, Star, Users, CreditCard, FileText, ArrowRight, Gift } from 'lucide-react'
import { getMembershipPage } from '@/lib/api'
import { mapMembershipPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getMembershipPage()
    if (apiData) {
      const dynamicData = mapMembershipPageData(apiData, langCode)
      const title = dynamicData.membershipPage.header
      const description = dynamicData.membershipPage.description
      
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
    console.error('Failed to load membership page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.membershipPage?.header || fallbackContent.nav.membership,
    description: fallbackContent.membershipPage?.description || '',
    openGraph: {
      title: fallbackContent.membershipPage?.header || fallbackContent.nav.membership,
      description: fallbackContent.membershipPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function MembershipPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getMembershipPage()
    if (apiData) {
      pageData = mapMembershipPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load membership page data:', error)
  }

  const t = pageData.membershipPage || pageData
  const common = pageData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.membership || 'Membership'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Join our community and be part of the volleyball family'}
            </p>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      {t.plans && t.plans.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                  {t.plans_subtitle || 'Choose Your Plan'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.plans_title || 'Membership Plans'}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.plans.map((plan: any, index: number) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                      plan.is_popular 
                        ? 'border-indigo-500 transform scale-105' 
                        : 'border-gray-200 hover:border-indigo-300'
                    } transition-all duration-300 hover:shadow-xl`}
                  >
                    {plan.is_popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {plan.popular_label || 'Most Popular'}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {plan.name || plan.title}
                        </h3>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-gray-900">
                            €{plan.price || '0'}
                          </span>
                          <span className="text-gray-500 ml-1">
                            /{plan.billing_period || 'year'}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {plan.features && plan.features.length > 0 && (
                        <div className="mb-8">
                          <ul className="space-y-3">
                            {plan.features.map((feature: any, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included !== false ? (
                                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                ) : (
                                  <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                )}
                                <span className={`text-sm ${
                                  feature.included !== false ? 'text-gray-700' : 'text-gray-400'
                                }`}>
                                  {feature.text || feature.name || feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          plan.is_popular
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                        }`}
                      >
                        {plan.cta_text || plan.button_text || 'Choose Plan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {t.benefits && t.benefits.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.benefits_title || 'Membership Benefits'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.benefits_subtitle || 'What you get as a member'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.benefits.map((benefit: any, index: number) => {
                  const iconNames = [Users, CreditCard, FileText, Gift, Star, ArrowRight]
                  const IconComponent = iconNames[index % iconNames.length]
                  
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {benefit.title || benefit.name || benefit}
                      </h3>
                      {benefit.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
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

      {/* How to Join Section */}
      {t.how_to_join && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.how_to_join_title || 'How to Join'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.how_to_join_subtitle || 'Simple steps to become a member'}
                </p>
              </div>
              
              {Array.isArray(t.how_to_join) ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {t.how_to_join.map((step: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-indigo-600 font-bold text-xl">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {step.title || `Step ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description || step}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="prose prose-lg max-w-none text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: t.how_to_join }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact for Membership */}
      {t.contact_info && (
        <section className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.contact_title || 'Ready to Join?'}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t.contact_description || 'Contact us for more information about membership'}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="prose prose-lg max-w-none text-white">
                  <div dangerouslySetInnerHTML={{ __html: t.contact_info }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no membership info */}
      {(!t.plans || t.plans.length === 0) && !t.benefits && !t.how_to_join && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.membership || 'Membership'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Membership information will be updated soon. Please contact us for details about joining our volleyball community.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}