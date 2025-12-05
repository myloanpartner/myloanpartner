import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

import teamPhoto from '../assets/team-photo.png';

const About = () => {
    // const { t } = useLanguage(); // Translations not yet implemented for this page

    React.useEffect(() => {
        document.title = "About | My Loan Partner";
    }, []);

    return (
        <div className="about-page section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="about-content"
                >
                    <h1 className="section-title">About My Loan Partner</h1>
                    <div className="about-grid">
                        <div className="about-text">
                            <p>
                                Welcome to My Loan Partner. We are a leading financial consultancy firm dedicated to providing tailored loan solutions to individuals and businesses across India.
                            </p>
                            <p>
                                Our mission is to simplify the borrowing process and help you achieve your financial goals with transparency and trust. Whether you need a home loan, business capital, or personal funds, we are here to guide you.
                            </p>
                            <p>
                                With years of experience and a strong network of over 30+ banking partners, we ensure you get the best interest rates, flexible tenures, and quick approvals. Your financial growth is our priority.
                            </p>
                        </div>
                        <div className="about-image">
                            <div className="gradient-border-frame">
                                <img src={teamPhoto} alt="Our Team" className="team-photo" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
