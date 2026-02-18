'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

type ObjectivesCarouselProps = {
  objectives: Array<string> | Array<{ text: string }>
  langCode: 'NE' | 'EN' | 'DE'
}

export default function ObjectivesCarousel({ objectives, langCode }: ObjectivesCarouselProps) {
  // Handle both array of strings and array of objects with text property
  const objectiveTexts = objectives.map(obj => typeof obj === 'string' ? obj : obj.text)
  return (
    <div className="max-w-6xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay, Mousewheel]}
        spaceBetween={30}
        pagination={{ 
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-600'
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        mousewheel={{ forceToAxis: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="pb-12"
      >
        {objectiveTexts.map((objective, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-primary-200">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">{objective}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}