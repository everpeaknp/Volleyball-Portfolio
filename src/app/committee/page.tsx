'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

export default function CommitteePage() {
  const { language } = useLanguage();
  const t = content[language].committee;

  const executiveTeam = [
    {
      role: t.roles.president,
      name: t.president.name,
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80', // Replace with real photo later
      description: t.president.desc,
      email: 'president@nepalvolleyball.de',
    },
    {
      role: t.roles.secretary,
      name: t.secretary.name,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', // Replace with real photo
      description: t.secretary.desc,
      email: 'secretary@nepalvolleyball.de',
    },
    {
      role: t.roles.treasurer,
      name: t.treasurer.name,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', // Replace with real photo
      description: t.treasurer.desc,
      email: 'treasurer@nepalvolleyball.de',
    },
  ];

  const members = [
    'Hari Bhandari',
    'Hasta Thapa Magar',
    'Hari Thapa Magar',
    'Bijay Khadka',
    'Bijay Gurung',
    'Bhakta Pakhrin',
    'Padam Sundar Shrestha',
    'Gautam Shahi',
    'Bel Gurung',
  ];

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <Image 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80" 
               alt="Committee" 
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
                  />
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
                  {member.role}
                </span>
                <p className="text-gray-600 mb-6 px-4 leading-relaxed h-12">
                  {member.description}
                </p>
                
                {/* Social/Contact Placeholder */}
                <div className="flex justify-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                   <a href={`mailto:${member.email}`} className="p-2 bg-gray-100 rounded-full hover:bg-primary-500 hover:text-white transition-colors">
                     <Mail className="w-4 h-4" />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Members */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.memberSectionTitle}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((name, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg">
                  {name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{name}</h4>
                  <p className="text-sm text-gray-500">
                    {t.roles.member}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
