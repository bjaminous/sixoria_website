import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DigitalPage from './pages/DigitalPage';
import TradingPage from './pages/TradingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-forest-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Aller au contenu principal
          </a>

          <Navbar />

          <div className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen bg-cream-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
                  <span className="text-sm text-gray-400">Chargement…</span>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<><ScrollToTop /><HomePage /></>} />
                <Route path="/digital" element={<><ScrollToTop /><DigitalPage /></>} />
                <Route path="/trading" element={<><ScrollToTop /><TradingPage /></>} />
                <Route path="/services" element={<><ScrollToTop /><ServicesPage /></>} />
                <Route path="/about" element={<><ScrollToTop /><AboutPage /></>} />
                <Route path="/team" element={<><ScrollToTop /><TeamPage /></>} />
                <Route path="/contact" element={<><ScrollToTop /><ContactPage /></>} />
                <Route path="/legal" element={<><ScrollToTop /><LegalPage /></>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
