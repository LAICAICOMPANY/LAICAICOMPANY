import React from 'react';
import { motion } from 'framer-motion';

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              저희는 딱 <span className="text-blue-600">20개 업체</span>만 받습니다.
            </h2>
          </motion.div>
        </div>
    </section>
  );
};
