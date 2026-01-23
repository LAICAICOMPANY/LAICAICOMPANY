import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // Simple scroll progress indicator
  const [scrollProgress, setScrollProgress] = React.useState(0);

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

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-yellow selection:text-black">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-yellow z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <ContactForm />
        <ContactInfo />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;