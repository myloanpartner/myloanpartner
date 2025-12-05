import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import './LeadMagnet.css';

const LeadMagnet = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenMagnet = localStorage.getItem('hasSeenMagnet');
            if (!hasSeenMagnet) {
                setIsVisible(true);
            }
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenMagnet', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Thank you! Your guide is on its way.");
        handleClose();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="lead-magnet-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="lead-magnet-modal"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button className="close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <div className="magnet-content">
                            <h2>Free Guide: 5 Secrets to Quick Loan Approval</h2>
                            <p>Learn how to boost your eligibility and get the lowest interest rates. Enter your details to get the free PDF.</p>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Your Email" required />
                                <button type="submit" className="magnet-btn">
                                    <Download size={18} /> Download Now
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LeadMagnet;
