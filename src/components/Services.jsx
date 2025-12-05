import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Home, Car, FileText, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
    const { t } = useLanguage();

    React.useEffect(() => {
        document.title = "Services | My Loan Partner";
    }, []);

    const services = [
        {
            icon: <User size={32} />,
            title: t.services.personal.title,
            tag: "(Unsecured)",
            id: "personal_loan",
            description: t.services.personal.desc,
            details: t.services.personal.details,
            link: "https://forms.gle/oULmPvgvqyCaytpk8"
        },
        {
            icon: <Briefcase size={32} />,
            title: t.services.business.title,
            tag: "(Unsecured)",
            id: "business_loan",
            description: t.services.business.desc,
            details: t.services.business.details
        },
        {
            icon: <Home size={32} />,
            title: t.services.home.title,
            id: "home_loan",
            description: t.services.home.desc,
            details: t.services.home.details
        },
        {
            icon: <Car size={32} />,
            title: t.services.car.title,
            id: "car_loan",
            description: t.services.car.desc,
            details: t.services.car.details
        },
        {
            icon: <FileText size={32} />,
            title: t.services.professional.title,
            id: "professional_loan",
            description: t.services.professional.desc,
            details: t.services.professional.details
        },
        {
            icon: <Wallet size={32} />,
            title: t.services.od.title,
            id: "od",
            description: t.services.od.desc,
            details: t.services.od.details
        },
    ];

    return (
        <section id="services" className="section-padding services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t.services.title}</h2>
                    <p className="section-subtitle">{t.services.subtitle}</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="icon-wrapper">{service.icon}</div>
                            <h3>
                                {service.title}
                                {service.tag && <span className="service-tag"> {service.tag}</span>}
                            </h3>
                            <p>{service.description}</p>
                            <ul className="service-details">
                                {service.details.map((detail, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={16} className="check-icon" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                            {service.link ? (
                                // Personal Loan redirects to Google Form
                                <a href={service.link} target="_blank" rel="noopener noreferrer" className="apply-link">
                                    {t.services.apply} <ArrowRight size={16} />
                                </a>
                            ) : (
                                // All other services redirect to Contact page
                                <Link to="/contact" state={{ service: service.id }} className="apply-link">
                                    {t.services.apply} <ArrowRight size={16} />
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
