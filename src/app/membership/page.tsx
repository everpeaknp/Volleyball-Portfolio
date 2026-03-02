'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle, Users, Award, Heart, Send, HelpCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { getMembershipPage } from '@/lib/api'
import { mapMembershipPageData } from '@/lib/mappers'

export default function MembershipPage() {
  const { language } = useLanguage()
  const [t, setT] = useState(content[language].membershipPage)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    category: '',
    experience: '',
    position: '',
    reason: '',
  })
  const [bankVoucher, setBankVoucher] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getMembershipPage()
        if (apiData) {
          const dynamicContent = mapMembershipPageData(apiData, language)
          setT(dynamicContent)
        }
      } catch (e) {
        console.error('Failed to load membership page data', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [language])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const body = new FormData()
      body.append('full_name', formData.fullName)
      body.append('email', formData.email)
      body.append('phone', formData.phone)
      body.append('address', formData.address)
      body.append('date_of_birth', formData.dob)
      body.append('gender', formData.gender.toLowerCase())
      body.append('category', formData.category.toLowerCase() === 'committee' || formData.category.toLowerCase() === 'समिति' || formData.category.toLowerCase() === 'ausschuss' ? 'committee' : 'player')
      
      if (formData.category.toLowerCase() === 'player' || formData.category.toLowerCase() === 'खेलाडी' || formData.category.toLowerCase() === 'spieler') {
        body.append('experience', formData.experience.toLowerCase())
        body.append('position', formData.position.toLowerCase().replace(/\s+/g, '_'))
      }
      
      if (bankVoucher) {
        body.append('bank_voucher', bankVoucher)
      }
      
      body.append('reason', formData.reason)

      const response = await fetch('http://localhost:8000/api/v1/membership/apply/', {
        method: 'POST',
        // FormData sets correct Content-Type with boundary automatically
        body: body,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          dob: '',
          gender: '',
          category: '',
          experience: '',
          position: '',
          reason: '',
        })
        setBankVoucher(null)
      } else {
        console.error('API Error:', { status: response.status, data })
        alert(data.message || `Error submitting form (${response.status}). Please try again.`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Icon Resolver
  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name]
    return Icon || HelpCircle
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={t.heroImage}
            alt="Membership"
            fill
            className="object-cover opacity-30 grayscale"
            priority
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

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.map((benefit: any, idx: number) => {
              const Icon = getIcon(benefit.icon)
              return (
                <div key={idx} className="text-center p-8 bg-gray-50 rounded-2xl">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
              {language === 'NE' ? 'फारम' : language === 'DE' ? 'Formular' : 'Form'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.formTitle}</h2>
            <p className="text-gray-600">{t.formText}</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h3>
              <p className="text-gray-600">{t.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.name} *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.labels.name}
                  />
                </div>

                <div>
                  <label className="input-label">{t.labels.email} *</label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="input-label">{t.labels.phone} *</label>
                  <input
                    type="tel"
                    required
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 XXX XXXXXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.address}</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={t.labels.address}
                  />
                </div>

                <div>
                  <label className="input-label">{t.labels.dob}</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>

                <div>
                  <label className="input-label">{t.labels.gender}</label>
                  <select
                    className="input-field"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    {t.options.gender.map((opt: string, i: number) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.category} *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {t.options.category.map((opt: string, i: number) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {(formData.category.toLowerCase() === 'player' || 
                  formData.category.toLowerCase() === 'खेलाडी' || 
                  formData.category.toLowerCase() === 'spieler') && (
                  <>
                    <div>
                      <label className="input-label">{t.labels.experience}</label>
                      <select
                        className="input-field"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        {t.options.experience.map((opt: string, i: number) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="input-label">{t.labels.position}</label>
                      <select
                        className="input-field"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      >
                        {t.options.position.map((opt: string, i: number) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {(formData.category.toLowerCase() === 'committee' || 
                  formData.category.toLowerCase() === 'समिति' || 
                  formData.category.toLowerCase() === 'ausschuss') && (
                  <div className="md:col-span-2">
                    <label className="input-label">{t.labels.voucher} *</label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      className="input-field"
                      onChange={(e) => setBankVoucher(e.target.files?.[0] || null)}
                    />
                    <p className="mt-1 text-sm text-gray-500">Please upload a photo of your bank transfer voucher.</p>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.reason}</label>
                  <textarea
                    rows={4}
                    className="input-field"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder={t.labels.reason}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full mt-8 text-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send className="inline mr-2 w-5 h-5" />
                {loading ? 'Submitting...' : t.labels.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
