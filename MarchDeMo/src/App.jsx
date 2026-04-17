import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import DepartmentsSection from './components/sections/DepartmentsSection';
import CommitmentsSection from './components/sections/CommitmentsSection';
import OffersSection from './components/sections/OffersSection';
import StoresSection from './components/sections/StoresSection';
import CareersSection from './components/sections/CareersSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  const shouldSkip = typeof window !== 'undefined' &&
    document.documentElement.classList.contains('skip-preloader');
  const [preloaderDone, setPreloaderDone] = useState(shouldSkip);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mdm-visited', 'true');
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <Navbar visible={preloaderDone} />

      <main>
        <Hero />
        <AboutSection />
        <DepartmentsSection />
        <CommitmentsSection />
        <OffersSection />
        <StoresSection />
        <CareersSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
