import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Layers, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './ServicesPage.css';

const ServicesPage = () => {
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
        document.title = "Services | My Loan Partner";
    }, [location]);

    return (
        <div className="services-page">
            <section className="services-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t.servicesPage.hero.title} <span className="text-gradient">{t.servicesPage.hero.titleHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t.servicesPage.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            <ServiceSection
                id="emi-reducer"
                title={t.servicesPage.sections.emiReducer.title}
                subtitle={t.servicesPage.sections.emiReducer.subtitle}
                description={t.servicesPage.sections.emiReducer.desc}
                points={t.servicesPage.sections.emiReducer.points}
                icon={TrendingDown}
                color="#00BFA5" // Teal
                ctaText={t.servicesPage.cta}
            />

            <ServiceSection
                id="loan-consolidation"
                title={t.servicesPage.sections.consolidation.title}
                subtitle={t.servicesPage.sections.consolidation.subtitle}
                description={t.servicesPage.sections.consolidation.desc}
                points={t.servicesPage.sections.consolidation.points}
                icon={Layers}
                isReversed={true}
                color="#FFD700" // Gold
                ctaText={t.servicesPage.cta}
            />

            <ServiceSection
                id="new-loans"
                title={t.servicesPage.sections.funding.title}
                subtitle={t.servicesPage.sections.funding.subtitle}
                description={t.servicesPage.sections.funding.desc}
                points={t.servicesPage.sections.funding.points}
                icon={Zap}
                color="#4facfe" // Blue
                ctaText={t.servicesPage.cta}
            />

            <ServiceSection
                id="consultation"
                title={t.servicesPage.sections.consultation.title}
                subtitle={t.servicesPage.sections.consultation.subtitle}
                description={t.servicesPage.sections.consultation.desc}
                points={t.servicesPage.sections.consultation.points}
                icon={Users}
                isReversed={true}
                color="#ff0844" // Red/Pink accent
                ctaText={t.servicesPage.cta}
            />
        </div>
    );
};

const ServiceSection = ({ id, title, subtitle, description, points, icon: Icon, isReversed, color, ctaText }) => (
    <section id={id} className={`service-block ${isReversed ? 'reversed' : ''}`}>
        <div className="container">
            <div className="service-content-wrapper">
                <motion.div
                    className="service-text"
                    initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="service-icon-box" style={{ backgroundColor: color }}>
                        <Icon size={32} color="#fff" />
                    </div>
                    <h2 className="service-heading">{title}</h2>
                    <h3 className="service-subheading">{subtitle}</h3>
                    <p className="service-desc">{description}</p>

                    <ul className="service-points">
                        {points.map((point, index) => (
                            <li key={index}>
                                <CheckCircle size={20} className="point-icon" style={{ color: color }} />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/contact" className="service-cta" style={{ backgroundColor: color }}>
                        {ctaText} <ArrowRight size={18} />
                    </Link>
                </motion.div>

                <motion.div
                    className="service-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Placeholder for visual/image - using a stylized gradient card for now */}
                    <div className="visual-card" style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}>
                        <div className="visual-icon-large">
                            <Icon size={120} color={color} opacity={0.2} />
                        </div>
                        <div className="visual-content">
                            <h4>{title}</h4>
                            <div className="visual-stat">
                                <span>100%</span>
                                <small>Transparent</small>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);


export default ServicesPage;
