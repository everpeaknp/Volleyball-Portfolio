'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function ContactPage() {
  const { language } = useLanguage();
  const t = content[language];
  
  // Note: Contact forms usually need specific labels.
  // I included form labels in 'membershipPage' in content.ts but not explicitly 'contactPage'.
  // I will reuse general contact info from `content[language].contact`.
  // For form labels, I'll borrow from membership or use hardcoded if simple (Name/Email/Message).
  // Wait, I should have added contactPage to content.ts.
  // I will use `membershipPage` labels for Name, Email. Message needs a label.
  
  const contactInfo = t.contact;
  const labels = t.membershipPage.labels; // Reusing labels

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <Image 
               src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80" 
               alt="Contact Us" 
               fill
               className="object-cover opacity-30 grayscale"
               priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         </div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg animate-fade-in">
              {contactInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up">
              {language === 'NE' ? 'हामीसँग सम्पर्क गर्नुहोस्' : language === 'DE' ? 'Kontaktieren Sie uns' : 'Get in touch with us'}
            </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                 {language === 'NE' ? 'सम्पर्क जानकारी' : language === 'DE' ? 'Kontaktinformationen' : 'Contact Information'}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {language === 'NE' ? 'ठेगाना' : language === 'DE' ? 'Adresse' : 'Address'}
                    </h3>
                    <p className="text-gray-600 break-all">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {language === 'NE' ? 'फोन' : language === 'DE' ? 'Telefon' : 'Phone'}
                    </h3>
                    <p className="text-gray-600 break-all">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {language === 'NE' ? 'इमेल' : language === 'DE' ? 'E-Mail' : 'Email'}
                    </h3>
                    <p className="text-gray-600 break-all">{contactInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {language === 'NE' ? 'सामाजिक सञ्जाल' : language === 'DE' ? 'Soziale Medien' : 'Social Media'}
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-pink-600 hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-blue-400 hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                 {language === 'NE' ? 'सन्देश पठाउनुहोस्' : language === 'DE' ? 'Nachricht senden' : 'Send Message'}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="input-label">{labels.name}</label>
                  <input
                    type="text"
                    className="input-field bg-white"
                    placeholder={labels.name}
                  />
                </div>
                <div>
                  <label className="input-label">{labels.email}</label>
                  <input
                    type="email"
                    className="input-field bg-white"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="input-label">
                     {language === 'NE' ? 'विषय' : language === 'DE' ? 'Betreff' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    className="input-field bg-white"
                    placeholder={language === 'NE' ? 'विषय' : language === 'DE' ? 'Betreff' : 'Subject'}
                  />
                </div>
                <div>
                  <label className="input-label">
                     {language === 'NE' ? 'सन्देश' : language === 'DE' ? 'Nachricht' : 'Message'}
                  </label>
                  <textarea
                    rows={4}
                    className="input-field bg-white"
                    placeholder={language === 'NE' ? 'तपाईंको सन्देश...' : language === 'DE' ? 'Ihre Nachricht...' : 'Your message...'}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full text-lg">
                  <Send className="inline mr-2 w-5 h-5" />
                  {language === 'NE' ? 'पठाउनुहोस्' : language === 'DE' ? 'Senden' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
