'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { getCommitteePage } from '@/lib/api'
import { mapCommitteePageData } from '@/lib/mappers'

export default function CommitteePage() {
  const { language } = useLanguage()
  const [t, setT] = useState(content[language].committee)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getCommitteePage()
        if (apiData) {
          const dynamicContent = mapCommitteePageData(apiData, language)
          setT(dynamicContent)
        }
      } catch (e) {
        console.error('Failed to load committee page data', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [language])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const executiveTeam = [
    {
      role: t.president.role,
      name: t.president.name,
      image: t.president.image,
      description: t.president.desc,
      email: t.president.email,
    },
    {
      role: t.secretary.role,
      name: t.secretary.name,
      image: t.secretary.image,
      description: t.secretary.desc,
      email: t.secretary.email,
    },
    {
      role: t.treasurer.role,
      name: t.treasurer.name,
      image: t.treasurer.image,
      description: t.treasurer.desc,
      email: t.treasurer.email,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={t.heroImage}
            alt="Committee"
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
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {executiveTeam.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:border-primary-500 transition-colors duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
                  {member.role}
                </span>
                <p className="text-gray-600 mb-6 px-4 leading-relaxed h-12">{member.description}</p>

                {/* Social/Contact Placeholder */}
                <div className="flex justify-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-gray-100 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Committee Groups */}
      {(t.groups as any[])?.map((group: any, gIdx: number) => (
        <section key={gIdx} className={`py-20 ${gIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{group.title}</h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.members.map((member: any, mIdx: number) => (
                <div
                  key={mIdx}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-500">{t.roles.member}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
