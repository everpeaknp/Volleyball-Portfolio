'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/data/content';

const galleryImageUrls = [
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80',
  'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
  'https://images.unsplash.com/photo-1530915534664-4ac6423816b7?w=800&q=80',
  'https://images.unsplash.com/photo-1598550473107-a9d0e4c3e67b?w=800&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
];

export default function GalleryPage() {
  const { language } = useLanguage();
  const t = content[language].galleryPage;
  
  const [activeCategory, setActiveCategory] = useState(t.categories[0]); // Default to 'All' (first item)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Merge images with translation data
  const galleryImages = t.images.map((img, idx) => ({
      ...img,
      src: galleryImageUrls[idx % galleryImageUrls.length]
  }));

  // Helper to check category match safely
  const filteredImages = activeCategory === t.categories[0] // 'All'
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <Image 
               src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" 
               alt="Gallery" 
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

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {t.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              >
                 <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm">{image.title}</p>
                    <p className="text-white/70 text-xs">{image.category}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.noImages}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-4">
           <div className="aspect-[4/3] relative w-full h-full"> {/* Aspect ratio help for Image */}
            <Image
              src={filteredImages[currentIndex]?.src}
              alt={filteredImages[currentIndex]?.title}
              fill
              className="object-contain"
              unoptimized={true} 
            />
          </div>
            <div className="text-center mt-4 text-white">
              <p className="text-lg font-medium">{filteredImages[currentIndex]?.title}</p>
              <p className="text-white/70">{currentIndex + 1} / {filteredImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
