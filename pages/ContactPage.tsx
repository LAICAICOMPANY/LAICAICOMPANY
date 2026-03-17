import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { MetallicBackground } from '../components/MetallicBackground';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans relative text-brand-gray">
      <MetallicBackground isLightMode={true} />
      <div className="fixed inset-0 pointer-events-none z-[999] bg-noise opacity-[0.05] mix-blend-overlay"></div>

      <Navbar isLightMode={true} />

      <div className="pt-8">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl pt-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300 mb-8 group text-sm font-medium"
          >
            <svg className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            메인으로 돌아가기
          </Link>
        </div>
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
