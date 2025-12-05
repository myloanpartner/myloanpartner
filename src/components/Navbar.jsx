import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoIcon from '../assets/logo-icon.png';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.calculator, href: '/calculator' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <img src={logoIcon} alt="My Loan Partner Logo" className="logo-icon" />
          <span>My Loan <span className="accent-text">Partner</span></span>
        </Link>

        <div className="desktop-menu">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <button
            onClick={toggleLanguage}
            className="lang-toggle"
            title={language === 'en' ? 'Switch to Tamil' : 'ஆங்கிலத்திற்கு மாறவும்'}
          >
            <Languages size={20} />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
          <Link to="/contact" className="cta-button">{t.nav.getStarted}</Link>
        </div>

        <div className="mobile-actions">
          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mobile-menu-actions">
              <div className="mobile-action-item">
                <span>Theme</span>
                <ThemeToggle />
              </div>
              <div className="mobile-action-item">
                <span>Language</span>
                <button
                  onClick={toggleLanguage}
                  className="lang-toggle mobile-lang"
                >
                  <Languages size={20} />
                  <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
