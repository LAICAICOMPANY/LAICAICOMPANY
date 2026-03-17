import React from 'react';
import { Search, CheckCircle, ShoppingBag } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const statsData: StatItem[] = [
  { value: '3.5억+', label: '월간 활성 사용자', description: 'Monthly Active' },
  { value: '255만+', label: '한국 관련 콘텐츠', description: 'Korea Contents' },
  { value: '13.5억+', label: '관련 누적 조회수', description: 'Total Views' },
  { value: '548만+', label: '방한 중국인', description: 'visitors expected' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">


        {/* Vision Statement */}
        <div className="text-black mb-32 flex flex-col justify-center items-center">
          <div className="max-w-full flex flex-col items-center gap-4 md:gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="bg-red-600 text-white px-4 py-2 text-xl md:text-3xl font-bold tracking-tight inline-block transform -skew-x-6 w-fit">
                <span className="transform skew-x-6 inline-block">아직도 컨텐츠 삭제 당하시나요?</span>
              </span>
              <span className="bg-red-600 text-white px-4 py-2 text-xl md:text-3xl font-bold tracking-tight inline-block transform -skew-x-6 w-fit">
                <span className="transform skew-x-6 inline-block">아직도 중국인 고객 유입이 안되시나요?</span>
              </span>
            </div>
            
            <p className="text-4xl md:text-6xl lg:text-7xl font-paperlogy font-bold leading-tight tracking-tight break-keep text-black mt-4 text-center">
              저희는 컨텐츠 집행만 하지 않습니다 <br />
              고객님의 <span className="underline decoration-[#2454ff] underline-offset-8">전환</span>까지 책임지고 함께합니다
            </p>
          </div>
        </div>
        {/* Header */}
        <div className="mb-20 md:flex justify-between items-end gap-12">
          <div className="max-w-3xl">
            <h4 className="text-gray-500 font-semibold tracking-widest uppercase mb-6 text-sm">About Platform</h4>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-brand-gray break-keep">
              중국인들이 사랑하는 <br />
              <span className="text-red-600">샤오홍슈</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0 max-w-md">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
              단순한 SNS가 아닙니다. 중국 내에서 <strong className="font-semibold text-brand-gray">검색, 검증, 구매 결정</strong>이 동시에 일어나는 핵심 의사결정 채널입니다.
            </p>
          </div>
        </div>

        {/* Xiaohongshu Stats */}
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-16 mb-24 relative overflow-hidden shadow-2xl border border-black/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <h3 className="text-5xl md:text-6xl font-bold font-display tracking-tighter mb-4 text-white">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold tracking-tight text-white/90 mb-1">{stat.label}</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/50">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>




      </div>
    </section>
  );
};