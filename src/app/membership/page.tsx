'use client';

import { useState } from 'react';
import { CheckCircle, Users, Award, Heart, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function MembershipPage() {
  const { language } = useLanguage();
  const t = content[language].membershipPage;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    experience: '',
    position: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const benefitIcons = [Users, Award, Heart];

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80" 
               alt="Membership" 
               className="w-full h-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
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
            {t.benefits.map((benefit, idx) => {
              const Icon = benefitIcons[idx % benefitIcons.length];
              return (
              <div key={idx} className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            )})}
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
                    {t.options.gender.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="input-label">{t.labels.experience}</label>
                  <select
                    className="input-field"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    {t.options.experience.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
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
                     {t.options.position.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

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

              <button type="submit" className="btn-primary w-full mt-8 text-lg">
                <Send className="inline mr-2 w-5 h-5" />
                {t.labels.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
