'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import { Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { content } from '@/data/content'
import { getContactPage } from '@/lib/api'
import { mapContactPageData } from '@/lib/mappers'

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}

export default function ContactPage() {
  const { language } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getContactPage()
        if (apiData) {
          const mapped = mapContactPageData(apiData, language)
          setData(mapped)
        } else {
          setData({
            ...content[language],
            contactPage: {
              heroSubtitle:
                language === 'NE'
                  ? 'हामीसँग सम्पर्क गर्नुहोस्'
                  : language === 'DE'
                  ? 'Kontaktieren Sie uns'
                  : 'Get in touch with us',
              heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
              infoSectionTitle:
                language === 'NE'
                  ? 'सम्पर्क जानकारी'
                  : language === 'DE'
                  ? 'Kontaktinformationen'
                  : 'Contact Information',
              socialSectionTitle:
                language === 'NE'
                  ? 'सामाजिक सञ्जाल'
                  : language === 'DE'
                  ? 'Soziale Medien'
                  : 'Social Media',
              formTitle:
                language === 'NE'
                  ? 'सन्देश पठाउनुहोस्'
                  : language === 'DE'
                  ? 'Nachricht senden'
                  : 'Send Message',
              infoList: [
                {
                  icon: 'MapPin',
                  label: language === 'NE' ? 'ठेगाना' : language === 'DE' ? 'Adresse' : 'Address',
                  value: content[language].contact.address,
                },
                {
                  icon: 'Phone',
                  label: language === 'NE' ? 'फोन' : language === 'DE' ? 'Telefon' : 'Phone',
                  value: content[language].contact.phone,
                },
                {
                  icon: 'Mail',
                  label: language === 'NE' ? 'इमेल' : language === 'DE' ? 'E-Mail' : 'Email',
                  value: content[language].contact.email,
                },
              ],
              socialLinks: [
                { platform: 'Facebook', url: '#', icon: 'Facebook' },
                { platform: 'Instagram', url: '#', icon: 'Instagram' },
                { platform: 'Twitter', url: '#', icon: 'Twitter' },
              ],
              labels: {
                name: content[language].membershipPage.labels.name,
                email: content[language].membershipPage.labels.email,
                subject: language === 'NE' ? 'विषय' : language === 'DE' ? 'Betreff' : 'Subject',
                message: language === 'NE' ? 'सन्देश' : language === 'DE' ? 'Nachricht' : 'Message',
                submit: language === 'NE' ? 'पठाउनुहोस्' : language === 'DE' ? 'Senden' : 'Send',
              },
            },
          })
        }
      } catch (error) {
        console.error('Error loading contact data:', error)
        setData(content[language])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [language])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-light tracking-widest uppercase">Loading Contact...</p>
        </div>
      </div>
    )
  }

  const t = data || {
    ...content[language],
    contactPage: {
      heroSubtitle:
        language === 'NE'
          ? 'हामीसँग सम्पर्क गर्नुहोस्'
          : language === 'DE'
          ? 'Kontaktieren Sie uns'
          : 'Get in touch with us',
      heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
      infoSectionTitle:
        language === 'NE'
          ? 'सम्पर्क जानकारी'
          : language === 'DE'
          ? 'Kontaktinformationen'
          : 'Contact Information',
      socialSectionTitle:
        language === 'NE'
          ? 'सामाजिक सञ्जाल'
          : language === 'DE'
          ? 'Soziale Medien'
          : 'Social Media',
      formTitle:
        language === 'NE'
          ? 'सन्देश पठाउनुहोस्'
          : language === 'DE'
          ? 'Nachricht senden'
          : 'Send Message',
      infoList: [
        {
          icon: 'MapPin',
          label: language === 'NE' ? 'ठेगाना' : language === 'DE' ? 'Adresse' : 'Address',
          value: content[language].contact.address,
        },
        {
          icon: 'Phone',
          label: language === 'NE' ? 'फोन' : language === 'DE' ? 'Telefon' : 'Phone',
          value: content[language].contact.phone,
        },
        {
          icon: 'Mail',
          label: language === 'NE' ? 'इमेल' : language === 'DE' ? 'E-Mail' : 'Email',
          value: content[language].contact.email,
        },
      ],
      socialLinks: [
        { platform: 'Facebook', url: '#', icon: 'Facebook' },
        { platform: 'Instagram', url: '#', icon: 'Instagram' },
        { platform: 'Twitter', url: '#', icon: 'Twitter' },
      ],
      labels: {
        name: content[language].membershipPage.labels.name,
        email: content[language].membershipPage.labels.email,
        subject: language === 'NE' ? 'विषय' : language === 'DE' ? 'Betreff' : 'Subject',
        message: language === 'NE' ? 'सन्देश' : language === 'DE' ? 'Nachricht' : 'Message',
        submit: language === 'NE' ? 'पठाउनुहोस्' : language === 'DE' ? 'Senden' : 'Send',
      },
    },
  }

  const contactInfo = t.contact
  const cp = t.contactPage

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={cp.heroImage}
            alt="Contact Us"
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
            {contactInfo.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up">
            {cp.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{cp.infoSectionTitle}</h2>
              <div className="space-y-8">
                {cp.infoList.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <DynamicIcon name={item.icon} className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-gray-600 break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              {cp.socialLinks.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{cp.socialSectionTitle}</h3>
                  <div className="flex gap-4">
                    {cp.socialLinks.map((social: any, idx: number) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gray-100 hover:bg-primary-500 hover:text-white rounded-full flex items-center justify-center transition-all"
                      >
                        <DynamicIcon name={social.icon} className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{cp.formTitle}</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary-500 hover:text-primary-700 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="input-label">{cp.labels.name}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field bg-white"
                      placeholder={cp.labels.name}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="input-label">{cp.labels.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field bg-white"
                      placeholder="email@example.com"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="input-label">{cp.labels.subject}</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input-field bg-white"
                      placeholder={cp.labels.subject}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="input-label">{cp.labels.message}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field bg-white"
                      placeholder={`${cp.labels.message}...`}
                      required
                      disabled={submitting}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="inline mr-2 w-5 h-5" />
                        {cp.labels.submit}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
