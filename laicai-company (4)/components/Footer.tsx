import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-10 pb-10">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2026 LaiCai Company. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
        
        <div className="mt-20 text-center opacity-50">
            <h1 className="text-[10vw] md:text-[12vw] font-black text-[#111] select-none leading-none">
                FIN.
            </h1>
        </div>
      </div>
    </footer>
  );
};