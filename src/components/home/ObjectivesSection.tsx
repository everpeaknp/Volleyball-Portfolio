'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface ObjectivesSectionProps {
  content: any; // content.objectives
}

export default function ObjectivesSection({ content }: ObjectivesSectionProps) {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3 block">Our Mission</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display tracking-tight">{content.title}</h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
           <p className="mt-4 text-gray-500 text-lg font-light">Swipe to explore our full vision.</p>
        </div>

        <div className="relative pb-12">
           <Swiper
              modules={[Pagination, Autoplay, Mousewheel]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              mousewheel={{ forceToAxis: true }}
              breakpoints={{
                 640: { slidesPerView: 2 },
                 1024: { slidesPerView: 3 },
              }}
              className="objectives-swiper pb-12"
           >
              {content.list.map((objective: string, idx: number) => (
                 <SwiperSlide key={idx} className="h-auto">
                    <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_5px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
                       {/* Card Image */}
                       <div className="relative h-64 overflow-hidden bg-gray-100">
                          <Image 
                             src={[
                                'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
                                'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80',
                                'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80',
                                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
                                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
                             ][idx % 5]}
                             alt={`Objective ${idx + 1}`}
                             fill
                             className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                          
                          <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center font-bold text-primary-600 shadow-sm z-10">
                             0{idx + 1}
                          </div>
                       </div>

                       {/* Card Content - Text Under Image */}
                       <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                             Goal {idx + 1}
                          </h3>
                          <p className="text-gray-600 leading-relaxed font-light text-base flex-1">
                             {objective}
                          </p>
                          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-primary-600 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                             Read More <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                       </div>
                    </div>
                 </SwiperSlide>
              ))}
           </Swiper>
        </div>
      </div>
    </section>
  );
}
