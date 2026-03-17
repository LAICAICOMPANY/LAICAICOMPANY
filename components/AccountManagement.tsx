import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const references = [
    {
        title: "브랜드 계정 성장",
        category: "Growth & Strategy",
        desc: "브랜드의 정체성을 담은 맞춤형 계정 운영 전략을 설계합니다.",
        color: "bg-blue-600"
    },
    {
        title: "콘텐츠 바이럴",
        category: "Creative Content",
        desc: "소비자의 반응을 이끌어내는 고퀄리티 비주얼 콘텐츠를 제작합니다.",
        color: "bg-purple-600"
    },
    {
        title: "퍼포먼스 마케팅",
        category: "Ads & Conversion",
        desc: "데이터 기반의 최적화된 유입과 전환 구조를 구축합니다.",
        color: "bg-brand-orange"
    }
];

export const AccountManagement: React.FC = () => {
    return (
        <section id="work" className="py-32 relative overflow-hidden bg-[#f5f5f5]">
            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
                <div className="flex flex-col mb-20">
                    <h4 className="text-gray-500 font-semibold tracking-widest uppercase mb-6 text-sm">Case Studies</h4>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-brand-gray">
                        REFERENCE
                    </h2>
                </div>

                <div className="relative overflow-hidden w-full">
                    {/* Infinite Marquee Container */}
                    <div className="flex gap-8 items-center py-10">
                        <motion.div
                            className="flex gap-8 whitespace-nowrap"
                            animate={{
                                x: [0, -1500], // Adjust based on content width
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30, // Adjust speed
                                    ease: "linear",
                                },
                            }}
                            whileHover={{ scale: 0.98 }} // Subtle pause feel
                        >
                            {[...references, ...references, ...references].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="group relative w-[350px] md:w-[450px] h-[550px] rounded-[3rem] overflow-hidden cursor-pointer bg-white border border-black/5 shadow-sm inline-block whitespace-normal flex-shrink-0"
                                >
                                    {/* Image Placeholder with Hover Scale */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${item.color}`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 group-hover:scale-110 transition-transform duration-700 ease-out">
                                    </div>

                                    {/* Content Overlay (Optional Description on Hover) */}
                                    <div className="absolute inset-x-0 bottom-0 p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <p className="text-gray-500 leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Icon Overlay */}
                                    <div className="absolute top-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                        <ExternalLink size={20} />
                                    </div>

                                    {/* Border Glow on Hover */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600/20 rounded-[3rem] transition-colors duration-500 pointer-events-none"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
