import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ImageGallery } from './components/ImageGallery';
import { About } from './components/About';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { MetallicBackground } from './components/MetallicBackground';
import ContactPage from './pages/ContactPage';

const MainPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightMode = scrollProgress > 0.15;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-1000 ease-in-out relative ${isLightMode ? 'text-brand-gray' : 'text-white'}`}>
      <MetallicBackground isLightMode={isLightMode} />
      <div className="fixed inset-0 pointer-events-none z-[999] bg-noise opacity-[0.05] mix-blend-overlay"></div>

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-orange z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <Navbar isLightMode={isLightMode} />

      <main>
        <Hero />
        <Philosophy />
        <ImageGallery />
        <About />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default App;