import React from 'react';
import { Heart } from 'lucide-react';

export const Reference: React.FC = () => {
  return (
    <section id="reference" className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="flex items-start gap-4">
                 <span className="text-brand-yellow text-6xl font-black opacity-20 select-none hidden md:block">03</span>
                 <div>
                    <h4 className="text-brand-yellow font-bold uppercase tracking-widest mb-2">Reference Project</h4>
                    <h2 className="text-4xl md:text-6xl font-black text-white">NEOTERIA</h2>
                 </div>
            </div>
            <p className="text-gray-400 max-w-md text-sm md:text-base">
                성공적인 아이웨어 브랜드 마케팅 사례. <br/>
                실제 유저들의 자발적인 리뷰와 인플루언서 마케팅이 만들어낸 바이럴 효과.
            </p>
          </div>

          {/* Grid imitating Xiaohongshu Feed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Pig Bun (Product) */}
            <div className="group relative bg-[#111] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-white/5">
                <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop" 
                        alt="Neoteria Unboxing" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="p-4">
                    <h5 className="text-white font-bold text-base line-clamp-2 mb-3 leading-snug">
                        我愿称之为烤蹄子最实用同款
                    </h5>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden border border-white/10">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60" alt="avatar" referrerPolicy="no-referrer" />
                            </div>
                            <span className="truncate max-w-[80px] font-medium text-gray-300">猪包</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>1073</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: Noodle (Girl Collage) */}
            <div className="group relative bg-[#111] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-white/5">
                <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1485230946387-43302e51ae69?q=80&w=800&auto=format&fit=crop" 
                        alt="Store Visit" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="p-4">
                    <h5 className="text-white font-bold text-base line-clamp-2 mb-3 leading-snug">
                        地租优选 🕶️ 汉南洞neoteria同款购物分享 🛍️
                    </h5>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden border border-white/10">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" alt="avatar" referrerPolicy="no-referrer" />
                            </div>
                            <span className="truncate max-w-[80px] font-medium text-gray-300">消灭拉面</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>221</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3: Sam (Guy) */}
            <div className="group relative bg-[#111] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-white/5">
                <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1534030347209-467a5b0dd3f4?q=80&w=800&auto=format&fit=crop" 
                        alt="Sam Post" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                        1/10
                    </div>
                </div>
                <div className="p-4">
                    <h5 className="text-white font-bold text-base line-clamp-2 mb-3 leading-snug">
                        KR这么多家GM平替，只有它家敢真便宜 ‼️
                    </h5>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden border border-white/10">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" alt="avatar" referrerPolicy="no-referrer" />
                            </div>
                            <span className="truncate max-w-[100px] font-medium text-gray-300">Sam学长在韩国</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>90</span>
                        </div>
                    </div>
                </div>
            </div>

          </div>
      </div>
    </section>
  );
};