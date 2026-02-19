import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          {/* Left Side: Heading */}
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Let's work <br />
              <span className="text-brand-yellow">together.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              중국 시장 진출의 든든한 파트너가 되어드리겠습니다.<br />
              지금 바로 문의하세요.
            </p>
          </div>

          {/* Right Side: Contact Details */}
          <div className="md:w-1/2 flex flex-col gap-10 md:pl-20 w-full">
            
            {/* Email */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center border border-white/10 group-hover:border-brand-yellow/50 transition-colors flex-shrink-0">
                <Mail className="text-brand-yellow w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Email</h4>
                <a href="mailto:wesk103@gmail.com" className="text-gray-300 hover:text-brand-yellow transition-colors block text-lg mb-1 font-medium">
                  wesk103@gmail.com
                </a>
                <p className="text-sm text-gray-500">24시간 이내 회신 드립니다.</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center border border-white/10 group-hover:border-brand-yellow/50 transition-colors flex-shrink-0">
                <Phone className="text-brand-yellow w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Phone</h4>
                <a href="tel:010-8756-7602" className="text-gray-300 hover:text-brand-yellow transition-colors block text-lg mb-1 font-medium">
                  010-8756-7602
                </a>
                <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};