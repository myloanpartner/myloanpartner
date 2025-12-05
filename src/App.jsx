import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import Contact from './components/Contact';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import WhyChooseUs from './components/WhyChooseUs';
import EMICalculator from './components/EMICalculator';
import Partners from './components/Partners';
import PrivacyPolicy from './components/PrivacyPolicy';
import ImageSelector from './components/ImageSelector';
import WhatsAppButton from './components/WhatsAppButton';
import ThemeToggle from './components/ThemeToggle';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import Footer from './components/Footer';
import ProcessFlow from './components/ProcessFlow';
import ComparisonTable from './components/ComparisonTable';

const Home = () => (
  <>
    <Hero />
    <Partners />
    <Services />
    <ComparisonTable />
    <EMICalculator />
    <ProcessFlow />
    <WhyChooseUs />
    <Testimonials />
  </>
);

import ScrollToAnchor from './components/ScrollToAnchor';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <ScrollToAnchor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<EMICalculator />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/select-image" element={<ImageSelector />} />
          </Routes>

          <WhatsAppButton />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
