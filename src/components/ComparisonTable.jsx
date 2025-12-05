import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ComparisonTable.css';

const ComparisonTable = () => {
    const { t } = useLanguage();

    const features = [
        { name: t.comparison.features[0], naveen: true, bank: false, agent: true },
        { name: t.comparison.features[1], naveen: true, bank: false, agent: "partial" },
        { name: t.comparison.features[2], naveen: true, bank: false, agent: false },
        { name: t.comparison.features[3], naveen: true, bank: true, agent: false },
        { name: t.comparison.features[4], naveen: true, bank: false, agent: "partial" },
        { name: t.comparison.features[5], naveen: true, bank: true, agent: "partial" },
    ];

    const renderIcon = (status) => {
        if (status === true) return <Check className="icon-check" size={20} />;
        if (status === false) return <X className="icon-x" size={20} />;
        if (status === "partial") return <Minus className="icon-partial" size={20} />;
        return null;
    };

    return (
        <section className="section-padding comparison-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t.comparison.title}</h2>
                    <p className="section-subtitle">{t.comparison.subtitle}</p>
                </div>

                <div className="table-container">
                    <div className="comparison-grid">
                        {/* Header Row */}
                        <div className="grid-header">
                            <div className="feature-col">{t.comparison.headers.feature}</div>
                            <div className="naveen-col">{t.comparison.headers.us}</div>
                            <div className="bank-col">{t.comparison.headers.bank}</div>
                            <div className="agent-col">{t.comparison.headers.agent}</div>
                        </div>

                        {/* Rows */}
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="grid-row"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="feature-name">{feature.name}</div>
                                <div className="naveen-cell">{renderIcon(feature.naveen)}</div>
                                <div className="bank-cell">{renderIcon(feature.bank)}</div>
                                <div className="agent-cell">{renderIcon(feature.agent)}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
