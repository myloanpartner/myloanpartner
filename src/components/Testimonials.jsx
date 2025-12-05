import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Testimonials.css';

const Testimonials = () => {
    const { t } = useLanguage();

    React.useEffect(() => {
        document.title = "Testimonials | My Loan Partner";
    }, []);

    const testimonials = t.testimonials.items.map((item, index) => ({
        id: index + 1,
        ...item
    }));

    return (
        <div className="testimonials-page section-padding">
            <div className="container">
                <h1 className="section-title text-center">{t.testimonials.title}</h1>
                <div className="testimonials-marquee-container">
                    <div className="testimonials-track">
                        {/* Duplicate items 3 times to ensure smooth infinite scroll on wide screens */}
                        {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="testimonial-card"
                            >
                                <div className="quote-icon">"</div>
                                <p className="testimonial-text">{item.text}</p>
                                <div className="testimonial-author">
                                    <div className="author-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
