import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import WaveDivider from './WaveDivider';
import slide1 from '../assets/hero-slide-1.png';
import slide2 from '../assets/hero-slide-2.png';
import slide3 from '../assets/hero-slide-3.png';
import slide5 from '../assets/hero-slide-5.png';
import slideTextile from '../assets/hero-slide-textile.png';
import slideStore from '../assets/hero-slide-store.png';
import slideDoctor from '../assets/hero-slide-doctor.png';
import './Hero.css';

const Hero = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        slide1,       // IT
        slideTextile, // Textile Manufacturing
        slide2,       // Business
        slideStore,   // Department Store
        slide3,       // Car
        slideDoctor,  // Doctor
        slide5        // Home
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="badge">
                        <TrendingUp size={16} className="badge-icon" />
                        <span>{t.hero.badge}</span>
                    </div>

                    <h1 className="hero-title">
                        {t.hero.title} <br />
                        <span className="text-gradient">{t.hero.titleHighlight}</span>
                    </h1>

                    <p className="hero-subtitle">
                        Tailored financial solutions for your home, business, and personal needs. We simplify the process to get you the best rates.
                    </p>

                    <div className="hero-actions">
                        <Link to="/contact" className="primary-btn">
                            {t.hero.ctaPrimary} <ArrowRight size={18} />
                        </Link>
                        <Link to="/services" className="secondary-btn">
                            {t.hero.ctaSecondary}
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3>₹100Cr+</h3>
                            <p>{t.hero.stats.disbursed}</p>
                        </div>
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>{t.hero.stats.clients}</p>
                        </div>
                        <div className="stat-item">
                            <h3>30+</h3>
                            <p>{t.hero.stats.partners}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="hero-image-container">
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={currentSlide}
                                src={slides[currentSlide]}
                                alt="Financial Success"
                                className="hero-image-slide"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>

                        <div className="floating-card card-1">
                            <TrendingUp size={20} />
                            <div>
                                <h4>98%</h4>
                                <p>Success Rate</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <WaveDivider position="bottom" color="var(--bg-color)" />
        </section>
    );
};

export default Hero;
