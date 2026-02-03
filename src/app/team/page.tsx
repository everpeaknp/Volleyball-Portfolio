'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

const playerImages = [
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80',
  'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
];

const coachImages = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
];

export default function TeamPage() {
  const { language } = useLanguage();
  const t = content[language].teamPage;

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <Image 
               src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1600&q=80" 
               alt="Team Hero" 
               fill
               className="object-cover opacity-30 grayscale"
               priority
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

      {/* Coaches */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">{t.coachesTitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.coachesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.coaches.map((coach, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row group">
                 <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                  <Image 
                    src={coachImages[idx % coachImages.length]}
                    alt={coach.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <p className="text-primary-500 font-semibold text-sm mb-1">{coach.role}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                  <p className="text-gray-600 text-sm">{coach.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Players */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">{t.playersTitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.playersTitle}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.players.map((player, idx) => (
              <div key={idx} className="card card-hover group overflow-hidden">
                 <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={playerImages[idx % playerImages.length]}
                    alt={player.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{player.number}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-accent-500 text-sm font-medium mb-1">{player.position}</p>
                    <h3 className="text-xl font-bold">{player.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photo */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'NE' ? 'टोली फोटो' : language === 'DE' ? 'Teamfoto' : 'Team Photo'}
            </h2>
            <p className="text-gray-400">
              {language === 'NE' ? '२०२६ को आधिकारिक टोली फोटो' : language === 'DE' ? 'Offizielles Teamfoto 2026' : 'Official Team Photo 2026'}
            </p>
          </div>
           <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
            <Image 
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80"
              alt="Team photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.joinTitle}</h2>
          <p className="text-white/90 mb-8">{t.joinText}</p>
          <a href="/membership" className="inline-block bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            {t.joinBtn}
          </a>
        </div>
      </section>
    </>
  );
}
