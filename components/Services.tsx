import React from 'react';
import { ServicePlan } from '../types';
import { PenTool, Users, Crown, Check } from 'lucide-react';

const services: ServicePlan[] = [
  {
    title: '기자단 마케팅',
    price: '40,000 KRW / 명',
    features: [
      '키워드 검색 및 컨텐츠 노출',
      '샤오홍슈 내 브랜드 노출율 확보',
      '다수의 일반인 계정 활용',
      '최신 가이드라인 맞춤 제작',
      '사진 기반 리뷰 콘텐츠',
      '비방문형 진행'
    ]
  },
  {
    title: '체험단 마케팅',
    price: '60,000 KRW / 명',
    recommended: true,
    features: [
      '실제 매장 방문 후 체험 리뷰',
      '기자단 대비 높은 현장감/신뢰도',
      '저장/댓글/좋아요 등 실반응 확보',
      '상위 노출 시도 가능한 퀄리티',
      '소비자 시선의 현실적 리뷰',
      '오프라인 한정 줄세우기 가능'
    ]
  },
  {
    title: '인플루언서 (왕홍)',
    price: '50만 ~ 200만+ KRW',
    features: [
      '단기간 브랜드 인지도/신뢰도 상승',
      '팬덤 기반의 고퀄리티 콘텐츠',
      '브랜드 톤앤매너 맞춤 섭외',
      '바이럴 효과 극대화',
      '장기적 자산형 마케팅',
      '세부 조건 협의 가능'
    ]
  }
];

export const Services: React.FC = () => {
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      // Offset for fixed navbar (matches Navbar.tsx logic)
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
         <div className="flex items-center gap-4 mb-16">
             <span className="text-brand-yellow text-6xl font-black opacity-20 select-none">02</span>
             <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">마케팅 전략 & Price</h2>
                <p className="text-gray-400">단계별로 브랜드 신뢰를 쌓아가는 체계적인 접근</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 group
                    ${service.recommended 
                        ? 'bg-white/5 border-brand-yellow shadow-[0_0_50px_rgba(245,158,11,0.1)]' 
                        : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'
                    }`}
              >
                {service.recommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                        Best Choice
                    </div>
                )}
                
                <div className="mb-6">
                    {idx === 0 && <PenTool className="w-10 h-10 text-gray-500 mb-4" />}
                    {idx === 1 && <Users className="w-10 h-10 text-brand-yellow mb-4" />}
                    {idx === 2 && <Crown className="w-10 h-10 text-purple-400 mb-4" />}
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className={`text-xl font-mono ${service.recommended ? 'text-brand-yellow' : 'text-gray-400'}`}>
                        {service.price}
                    </p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                    {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 flex-shrink-0 ${service.recommended ? 'text-brand-yellow' : 'text-gray-600'}`} />
                            <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleScrollToContact}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    service.recommended 
                    ? 'bg-brand-yellow text-black hover:bg-white' 
                    : 'bg-white/10 text-white hover:bg-white hover:text-black'
                }`}>
                    문의하기
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-[#111] border border-white/5 text-center text-gray-400 text-sm">
            ※ VAT 별도. 세부 진행 방식 및 구성은 프로젝트 성격에 따라 조정될 수 있습니다.
          </div>
      </div>
    </section>
  );
};