import React from 'react';
import { motion } from 'framer-motion';

export const MetallicBackground: React.FC<{ isLightMode?: boolean }> = ({ isLightMode = true }) => {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-brand-navy transition-colors duration-1000">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLightMode ? 'opacity-100' : 'opacity-20'}`}
           style={{
             background: 'linear-gradient(135deg, #e2eaf5 0%, #bacddc 40%, #87a4ba 80%, #465f73 100%)',
           }}
      />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLightMode ? 'opacity-0' : 'opacity-100'}`}
           style={{
             background: 'linear-gradient(135deg, #0f1626 0%, #1f2d45 40%, #304763 80%, #080d1a 100%)',
           }}
      />

      <motion.div
        className="absolute w-[150vw] h-[150vh] rounded-[40%]"
        style={{
          background: isLightMode 
            ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
          mixBlendMode: 'overlay',
          top: '-25%',
          left: '-25%'
        }}
        animate={{
          x: ['0%', '-10%', '10%', '0%'],
          y: ['0%', '15%', '-10%', '0%'],
          rotate: [0, 45, -45, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute w-[120vw] h-[120vh] rounded-[45%]"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at center, rgba(40, 70, 100, 0.4) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(140, 170, 200, 0.2) 0%, transparent 60%)',
          top: '-10%',
          left: '-10%'
        }}
        animate={{
          x: ['0%', '15%', '-15%', '0%'],
          y: ['0%', '-15%', '15%', '0%'],
          rotate: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute w-[100vw] h-[100vh] rounded-full"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, transparent 50%)'
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          mixBlendMode: 'overlay',
          bottom: '-20%',
          right: '-20%'
        }}
        animate={{
          x: ['0%', '-20%', '10%', '0%'],
          y: ['0%', '10%', '-20%', '0%'],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};
