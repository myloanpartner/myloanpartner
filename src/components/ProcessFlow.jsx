import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, FileSearch, Handshake, CheckCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProcessFlow.css';

const ProcessFlow = () => {
    const { t } = useLanguage();

    const steps = [
        {
            icon: <PhoneCall size={24} />,
            title: t.process.steps[0].title,
            desc: t.process.steps[0].desc
        },
        {
            icon: <FileSearch size={24} />,
            title: t.process.steps[1].title,
            desc: t.process.steps[1].desc
        },
        {
            icon: <Handshake size={24} />,
            title: t.process.steps[2].title,
            desc: t.process.steps[2].desc
        },
        {
            icon: <CheckCircle size={24} />,
            title: t.process.steps[3].title,
            desc: t.process.steps[3].desc
        },
        {
            icon: <TrendingUp size={24} />,
            title: t.process.steps[4].title,
            desc: t.process.steps[4].desc
        }
    ];

    return (
        <section className="section-padding process-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t.process.title}</h2>
                    <p className="section-subtitle">{t.process.subtitle}</p>
                </div>

                <div className="process-container">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step-wrapper">
                            <motion.div
                                className="process-step"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-number">{index + 1}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </motion.div>
                            {index < steps.length - 1 && <div className="step-connector"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessFlow;
