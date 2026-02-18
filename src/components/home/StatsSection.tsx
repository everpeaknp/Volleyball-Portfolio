'use client';

import AnimatedCounter from '@/components/AnimatedCounter';

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Members', value: 50, suffix: '+' },
            { label: 'Events', value: 25, suffix: '+' },
            { label: 'Years', value: 5, suffix: '+' },
            { label: 'Awards', value: 10, suffix: '+' },
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
                 <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base md:text-lg opacity-90 uppercase tracking-widest font-medium border-t border-white/20 pt-4 inline-block px-4">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
