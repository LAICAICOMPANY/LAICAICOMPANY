import React from 'react';
import { StatItem } from '../types';

const statsData: StatItem[] = [
  { value: '3억+', label: '월간 활성 사용자', description: 'Monthly Active Users' },
  { value: '255만+', label: '한국 관련 게시물', description: 'Posts about Korea' },
  { value: '13.5억+', label: '한국 관련 조회수', description: 'Views related to Korea' },
  { value: '460만+', label: '2024년 방한 중국인', description: '+30.4% Growth Expected in 2025' },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
              <h3 className="text-4xl md:text-5xl font-black text-brand-yellow mb-2 font-mono">
                {stat.value}
              </h3>
              <p className="text-lg font-bold text-white mb-1">{stat.label}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};