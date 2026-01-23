import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      
      // Apply transform directly to avoid React re-renders for smoother performance
      parallaxRef.current.style.transform = `perspective(1000px) rotateX(${y * 3}deg) rotateY(${x * 3}deg) scale(1.05)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-dark">
      {/* Custom Animated Background (Replaces Spline) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden bg-brand-dark">
         
         {/* Background Elements/Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-yellow/5 rounded-full blur-[100px] animate-pulse"></div>
         
         {/* Parallax Container */}
         <div ref={parallaxRef} 
              className="relative z-0 flex flex-col items-center justify-center opacity-20 transition-transform duration-100 ease-out will-change-transform">
            
            {/* Outline Text Layer */}
            <div className="font-black text-[20vw] leading-[0.85] text-transparent tracking-tighter whitespace-nowrap"
                 style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}>
              LAICAI
            </div>
            <div className="font-black text-[20vw] leading-[0.85] text-transparent tracking-tighter whitespace-nowrap"
                 style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}>
              COMPANY
            </div>

            {/* Filled Shadow Layer (Depth Effect) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 mix-blend-overlay pointer-events-none transform translate-x-2 translate-y-2 blur-sm">
                <div className="font-black text-[20vw] leading-[0.85] text-white tracking-tighter whitespace-nowrap">
                  LAICAI
                </div>
                <div className="font-black text-[20vw] leading-[0.85] text-white tracking-tighter whitespace-nowrap">
                  COMPANY
                </div>
            </div>
         </div>

         {/* Grid Texture Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-20">
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-yellow text-xs font-bold tracking-[0.2em] mb-6 animate-fade-in-up">
          EST. 2025
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-tight mb-8 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          LAICAI <br/> COMPANY
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          중국 미디어 마케팅 & 컨설팅 전문 기업<br/>
          <span className="text-white font-medium">샤오홍슈</span>와 <span className="text-white font-medium">도우인</span>을 통해 브랜드의 가치를 중국에 전합니다.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-auto">
        <a href="#about" className="text-white/50 hover:text-white transition-colors">
            <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};