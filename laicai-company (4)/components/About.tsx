import React from 'react';
import { Search, CheckCircle, ShoppingBag } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-brand-yellow text-6xl font-black opacity-20 select-none">01</span>
             <h2 className="text-3xl md:text-5xl font-bold">
               샤오홍슈는 <span className="text-brand-yellow">어떤 플랫폼</span>인가?
             </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            단순한 SNS가 아닙니다. <br/>
            중국 내에서 <span className="text-white font-bold border-b-2 border-brand-yellow">검색 → 검증 → 구매 결정</span>이 동시에 일어나는 플랫폼입니다.
          </p>
        </div>

        {/* Core Concept Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-8 rounded-3xl border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
              <Search className="w-6 h-6 text-brand-yellow group-hover:text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">검색 (Search)</h3>
            <p className="text-gray-400">
              한국 여행 관련 소비 트렌드 검색량 압도적 1위. 네이버 블로그와 유사한 정보 탐색 채널.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-8 rounded-3xl border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
              <CheckCircle className="w-6 h-6 text-brand-yellow group-hover:text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">검증 (Verify)</h3>
            <p className="text-gray-400">
              실제 경험 기반 콘텐츠에 대한 높은 신뢰도. 인스타그램과 커뮤니티가 결합된 형태.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-8 rounded-3xl border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
              <ShoppingBag className="w-6 h-6 text-brand-yellow group-hover:text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">구매 결정 (Buy)</h3>
            <p className="text-gray-400">
              중국인 여행객들이 여행지를 결정하는데 가장 신뢰하는 최종 의사결정 플랫폼.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-[#111] rounded-3xl p-10 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-brand-yellow font-bold tracking-widest uppercase mb-4">Our Vision</h3>
            <p className="text-2xl md:text-3xl font-medium leading-normal text-white">
                중국 SNS 계정 관리부터 미디어 프로세스 세팅, <br className="hidden md:block"/>
                그리고 <span className="text-brand-yellow">10년 이상의 현지 인프라</span>를 통한 로컬라이징 비즈니스까지. <br/>
                LaiCai는 A부터 Z까지 함께합니다.
            </p>
        </div>

      </div>
    </section>
  );
};