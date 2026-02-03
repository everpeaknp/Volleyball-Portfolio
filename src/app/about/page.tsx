'use client';

import Image from 'next/image';
import { Target, Eye, Heart, Users, Award, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { language } = useLanguage();
  const t = content[language].aboutPage;
  const common = content[language];

  // Icons mapping for values
  const valueIcons = [Heart, Users, Award, Globe];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0">
            <Image 
               src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1600&q=80" 
               alt="Volleyball court details" 
               fill
               className="object-cover opacity-30 grayscale"
               priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
            {/* Net Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium text-white/80 mb-6">
                 <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                 {t.sinceText}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                {t.heroText}
              </p>
            </motion.div>
        </div>
      </section>

      {/* Intro Section - Sports Themed */}
      <section className="py-24 bg-white relative">
         {/* Decorative Sidebar Line - Volleyball Net Style */}
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-gray-200 to-transparent hidden xl:block ml-10"></div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             {/* Text Content */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-none">
                {t.introTitlePart1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  {t.introTitlePart2}
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="border-l-4 border-gray-900 pl-6 py-2 font-medium text-gray-800">
                   {t.mainText1}
                </p>
                <p>{t.mainText2}</p>
              </div>

               <div className="mt-12 flex items-center gap-8">
                  <div className="text-center">
                     <span className="block text-4xl font-bold text-gray-900">50+</span>
                     <span className="text-sm text-gray-500 uppercase tracking-widest">{t.stats.players}</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                   <div className="text-center">
                     <span className="block text-4xl font-bold text-gray-900">20+</span>
                     <span className="text-sm text-gray-500 uppercase tracking-widest">{t.stats.events}</span>
                  </div>
                   <div className="w-px h-12 bg-gray-200"></div>
                   <div className="text-center">
                     <span className="block text-4xl font-bold text-gray-900">100%</span>
                     <span className="text-sm text-gray-500 uppercase tracking-widest">{t.stats.passion}</span>
                  </div>
               </div>
            </motion.div>

            {/* Image Composition */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative order-1 lg:order-2"
            >
               {/* Main Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                 <Image 
                  src="https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80"
                  alt="Volleyball Action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                 {/* Floating Badge */}
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur shadow-xl p-4 rounded-2xl max-w-[150px]">
                   <p className="text-xs text-gray-500 uppercase font-bold mb-1">{t.established}</p>
                   <p className="text-3xl font-bold text-primary-600">2020</p>
                </div>
              </div>
              
              {/* Secondary Image Overlay */}
               <div className="absolute -bottom-10 -left-10 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block aspect-[4/3] relative">
                  <Image 
                   src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80" 
                   alt="Team huddled"
                   fill
                   className="object-cover"
                  />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Compact Minimal Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.coreTitle}</h2>
              <div className="w-12 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.vision.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                     {t.vision.text}
                  </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.mission.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                     {t.mission.text}
                  </p>
              </div>
           </div>
        </div>
      </section>

      {/* Objectives List */}
       <section className="py-24 bg-gray-50 relative overflow-hidden border-t border-gray-100">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2 block">{t.strategicTitle}</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900">{t.objectivesTitle}</h2>
                <div className="space-y-4">
                  {common.objectives.list.map((objective, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200 shadow-sm hover:shadow-lg cursor-default bg-white/50 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                        {idx + 1}
                      </div>
                      <p className="text-lg text-gray-700 font-medium">{objective}</p>
                    </motion.div>
                  ))}
                </div>
             </div>
             
             {/* Decorative Side Graphic */}
             <div className="relative hidden lg:block h-full min-h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80" 
                  alt="Professional Volleyball Stadium" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="border-l-4 border-primary-500 pl-8">
                       <Globe className="w-12 h-12 text-white mb-6 opacity-80" />
                       <h3 className="text-4xl font-bold text-white mb-4">{t.promo.title}</h3>
                       <p className="text-white/80 text-lg">{t.promo.text}</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
