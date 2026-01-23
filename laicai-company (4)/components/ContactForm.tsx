import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Info */}
          <div className="lg:w-5/12 pt-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              프로젝트를 함께 <br />
              <span className="text-brand-yellow">시작해볼까요?</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
              당신의 아이디어가 LaiCai를 만나면 현실이 됩니다.<br />
              가벼운 문의라도 언제든 환영합니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow/20 transition-colors">
                  <Mail className="text-brand-yellow w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:wesk103@gmail.com" className="text-xl font-medium text-white hover:text-brand-yellow transition-colors">
                    wesk103@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow/20 transition-colors">
                  <Phone className="text-brand-yellow w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:010-8756-7602" className="text-xl font-medium text-white hover:text-brand-yellow transition-colors">
                    010-8756-7602
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-7/12">
            <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
              <form 
                action="https://formspree.io/f/meeagqzq" 
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium ml-1">이름</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="홍길동" 
                      required
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium ml-1">연락처</label>
                    <input 
                      type="text" 
                      name="phone"
                      placeholder="010-0000-0000" 
                      required
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium ml-1">이메일</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="example@email.com" 
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium ml-1">프로젝트 내용</label>
                  <textarea 
                    rows={5}
                    name="message"
                    placeholder="어떤 프로젝트를 구상 중이신가요?" 
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand-yellow text-black font-bold text-lg py-4 rounded-xl hover:bg-white transition-colors duration-300 mt-4"
                >
                  문의 보내기
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};