'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  content: any; // content.hero
  videoSource: string;
}

export default function HeroSection({ content, videoSource }: HeroSectionProps) {
  return (
    <section className="relative w-full mt-20 h-[calc(100vh-5rem)] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
         <video
           autoPlay
           loop
           muted
           playsInline
           className="w-full h-full object-cover" 
         >
           <source src={videoSource} type="video/mp4" />
         </video>
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-black/40" /> 
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
         
     {/* Hero Content */}
     <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
              {content.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-medium tracking-wide drop-shadow-md">
              {content.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="btn-primary text-base md:text-lg px-8 py-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                {content.cta_join}
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-lg font-semibold hover:bg-white/30 transition-all text-base md:text-lg"
              >
                {content.cta_learn}
              </Link>
            </div>
          </motion.div>
        </div>
     </div>

      {/* Scroll Indicator - Bottom of the container */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
        <ChevronDown className="w-8 h-8 text-white/80" />
      </div>
    </section>
  );
}
