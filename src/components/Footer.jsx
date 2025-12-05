import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoIcon from '../assets/logo-icon.png';
import './Footer.css';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Brand Info */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            <img src={logoIcon} alt="My Loan Partner Logo" className="footer-logo-icon" />
                            <span>My Loan <span className="accent-text">Partner</span></span>
                        </Link>
                        <p className="footer-desc">
                            {t.footer.desc} <br />
                            <strong>{t.footer.tagline}</strong>
                        </p>
                        <div className="social-links">
                            <a href="https://instagram.com/myloanpartner" target="_blank" rel="noopener noreferrer" className="social-icon instagram"><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/share/16kMwX7TLb/" target="_blank" rel="noopener noreferrer" className="social-icon facebook"><Facebook size={20} /></a>
                            <a href="https://wa.me/919080754536" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp"><MessageCircle size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h3>{t.footer.explore}</h3>
                        <ul className="footer-links">
                            <li><Link to="/">{t.footer.links.home}</Link></li>
                            <li><Link to="/about">{t.footer.links.about}</Link></li>
                            <li><Link to="/contact">{t.footer.links.contact}</Link></li>
                            <li><Link to="/privacy-policy">{t.footer.links.privacy}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div className="footer-col">
                        <h3>{t.footer.solutions}</h3>
                        <ul className="footer-links">
                            <li><Link to="/services#emi-reducer">{t.footer.services.emi}</Link></li>
                            <li><Link to="/services#loan-consolidation">{t.footer.services.consolidation}</Link></li>
                            <li><Link to="/services#new-loans">{t.footer.services.newLoans}</Link></li>
                            <li><Link to="/services#consultation">{t.footer.services.consultation}</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="footer-col contact-col">
                        <h3>{t.footer.getHelp}</h3>

                        <div className="contact-item">
                            <span className="label">{t.footer.sendEmail}</span>
                            <a href="mailto:team@myloanpartner.in" className="value">team@myloanpartner.in</a>
                        </div>

                        <div className="contact-item">
                            <span className="label">{t.footer.call}</span>
                            <a href="tel:+919080754536" className="value">+91 90807 54536</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} My Loan Partner. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
