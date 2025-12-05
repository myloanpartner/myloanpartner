import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Award size={32} />,
            title: t.whyChooseUs.experience.title,
            description: t.whyChooseUs.experience.desc,
        },
        {
            icon: <CheckCircle size={32} />,
            title: t.whyChooseUs.success.title,
            description: t.whyChooseUs.success.desc,
        },
        {
            icon: <Users size={32} />,
            title: t.whyChooseUs.partners.title,
            description: t.whyChooseUs.partners.desc,
        },
        {
            icon: <MapPin size={32} />,
            title: t.whyChooseUs.cities.title,
            description: t.whyChooseUs.cities.desc,
        },
    ];

    return (
        <section className="section-padding why-choose-us">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t.whyChooseUs.title}</h2>
                    <p className="section-subtitle">{t.whyChooseUs.subtitle}</p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
