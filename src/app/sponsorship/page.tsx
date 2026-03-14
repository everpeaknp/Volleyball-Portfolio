'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle, Handshake, Send, HelpCircle, FileText, Euro, Phone, Mail } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { getSponsorshipPage } from '@/lib/api'
import { mapSponsorshipPageData } from '@/lib/mappers'

export default function SponsorshipPage() {
  const { language } = useLanguage()
  const [t, setT] = useState(content[language].sponsorshipPage)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    amount: '',
    message: '',
  })
  const [bankVoucher, setBankVoucher] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getSponsorshipPage()
        if (apiData) {
          const dynamicContent = mapSponsorshipPageData(apiData, language)
          setT(dynamicContent)
        }
      } catch (e) {
        console.error('Failed to load sponsorship page data', e)
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
      // Normalize sponsorship type to lowercase English for backend
      const typeMap: { [key: string]: string } = {
        // English
        'Platinum': 'platinum',
        'Gold': 'gold',
        'Silver': 'silver',
        'Other': 'other',
        // Nepali
        'प्लेटिनम': 'platinum',
        'गोल्ड': 'gold',
        'सिल्भर': 'silver',
        'अन्य': 'other',
        // German
        'Platin': 'platinum',
        'Silber': 'silver',
        'Sonstiges': 'other',
        // Fallback for case-insensitive or direct matches
      }
      
      const normalizedType = typeMap[formData.type] || formData.type.toLowerCase()
      
      body.append('name', formData.name)
      body.append('email', formData.email)
      body.append('phone', formData.phone)
      body.append('sponsorship_type', normalizedType)
      body.append('amount', formData.amount)
      body.append('message', formData.message)
      
      if (bankVoucher) {
        body.append('bank_voucher', bankVoucher)
      }

      const response = await fetch('http://localhost:8000/api/v1/sponsorship/apply/', {
        method: 'POST',
        body: body,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: '',
          amount: '',
          message: '',
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

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={t.heroImage}
            alt="Sponsorship"
            fill
            className="object-cover opacity-30 grayscale"
            priority
            unoptimized={Boolean(t.heroImage?.includes('localhost'))}
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

      {/* Current Sponsors Section */}
      {t.sponsors && t.sponsors.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.sponsorSectionTitle}
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {t.sponsors.map((sponsor: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group"
                >
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col h-full bg-white rounded-[2rem] overflow-hidden transition-all duration-700 ease-out hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-4"
                  >
                    {/* Ultra-Large Logo Container */}
                    <div className="relative h-64 sm:h-80 w-full flex items-center justify-center p-12 bg-gray-50/30 group-hover:bg-transparent transition-colors duration-700">
                      {sponsor.logo ? (
                        <div className="relative w-full h-full transform transition-all duration-700 ease-out group-hover:scale-110">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                            unoptimized={!!(sponsor.logo && sponsor.logo.includes('localhost'))}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center border border-dashed border-gray-200 rounded-[1.5rem] group-hover:border-primary-200 transition-colors">
                          <span className="text-gray-300 font-light group-hover:text-primary-400 transition-colors px-6 text-center text-xl tracking-tight">
                            {sponsor.name}
                          </span>
                        </div>
                      )}

                      {/* Minimalist Link Indicator */}
                      {sponsor.link && sponsor.link !== '#' && (
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Minimalist Details Section */}
                    <div className="px-10 pb-10 pt-4 text-center">
                      <h4 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors duration-500">
                        {sponsor.name}
                      </h4>
                      <div className="mt-4 flex flex-col items-center">
                        <div className="h-[1px] w-8 bg-gray-100 group-hover:w-20 group-hover:bg-primary-500 transition-all duration-700 ease-in-out" />
                        <span className="mt-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-300 group-hover:text-primary-500 transition-colors duration-500">
                          {sponsor.link && sponsor.link !== '#' ? 'Exclusive Partner' : 'Official Sponsor'}
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsorship Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
              {language === 'NE' ? 'प्रयोजन फारम' : language === 'DE' ? 'Sponsoring' : 'Partner'}
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="input-field pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.labels.name}
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">{t.labels.email} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="input-field pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">{t.labels.phone} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      className="input-field pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 XXX XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">{t.labels.type} *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {t.options.type.map((opt: string, i: number) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="input-label">{t.labels.amount} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Euro className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      className="input-field pl-10"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.voucher} *</label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    className="input-field"
                    onChange={(e) => setBankVoucher(e.target.files?.[0] || null)}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {language === 'NE' 
                      ? 'कृपया आफ्नो बैंक ट्रान्सफर भौचरको फोटो अपलोड गर्नुहोस्।' 
                      : language === 'DE' 
                      ? 'Bitte laden Sie ein Foto Ihres Banküberweisungsbelegs hoch.' 
                      : 'Please upload a photo of your bank transfer voucher.'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">{t.labels.message}</label>
                  <textarea
                    rows={4}
                    className="input-field"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.labels.message}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full mt-8 text-lg font-bold py-4 rounded-xl flex items-center justify-center transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    {t.labels.submit}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
