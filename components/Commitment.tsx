import React from 'react';
import { motion } from 'framer-motion';

export const Commitment: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Pain Points (Blue Box Highlight Style from reference) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center space-y-4 md:space-y-6 mb-16 md:mb-24"
        >
          <div className="bg-[#2454ff] text-white px-4 py-2 transform -skew-x-6 inline-block shadow-lg">
            <p className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight transform skew-x-6">
              아직도 컨텐츠 삭제 당하시나요?
            </p>
          </div>
          <div className="bg-[#2454ff] text-white px-4 py-2 transform -skew-x-6 inline-block shadow-lg">
            <p className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight transform skew-x-6">
              아직도 중국인 고객 유입이 안되시나요?
            </p>
          </div>
        </motion.div>

        {/* Commitment Statement (High contrast impact text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center w-full space-y-4 md:space-y-8"
        >
          <div className="flex flex-wrap justify-center items-center text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 gap-2">
            저희는 컨텐츠 집행만 하지 않습니다
            <span className="text-red-600 font-sans text-4xl md:text-6xl lg:text-7xl ml-2 leading-none">X</span>
          </div>

          <div className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-snug md:leading-tight">
            고객님의 <span className="text-blue-600 underline decoration-blue-600 underline-offset-8">전환</span>까지 책임지고 함께합니다.
          </div>
        </motion.div>

      </div>
    </section>
  );
};
