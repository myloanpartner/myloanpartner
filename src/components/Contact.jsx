import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = "Contact | My Loan Partner";

        // Check if service was passed via navigation state
        if (location.state && location.state.service) {
            const serviceId = location.state.service;
            let defaultMessage = "";

            switch (serviceId) {
                case "home_loan":
                    defaultMessage = "I am interested in applying for a Home Loan. Please provide more details.";
                    break;
                case "personal_loan":
                    defaultMessage = "I would like to know more about Personal Loan options.";
                    break;
                case "business_loan":
                    defaultMessage = "I am looking for a Business Loan for my company. Please assist.";
                    break;
                case "car_loan":
                    defaultMessage = "I want to apply for a Car Loan. What are the current rates?";
                    break;
                case "professional_loan":
                    defaultMessage = "I am a professional looking for a loan. Please guide me.";
                    break;
                case "od":
                    defaultMessage = "I am interested in an Overdraft (OD) facility.";
                    break;
                default:
                    defaultMessage = "I am interested in your services.";
            }

            setFormData(prev => ({
                ...prev,
                service: serviceId,
                message: defaultMessage
            }));
        }
    }, [location.state]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
        if (!formData.service) newErrors.service = "Please select a service";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('loading');

        // Format the message for WhatsApp
        const message = `*New Inquiry from Website*
        
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${formData.service.replace('_', ' ').toUpperCase()}
*Message:* ${formData.message}`;

        // WhatsApp API URL
        const whatsappUrl = `https://wa.me/919080754536?text=${encodeURIComponent(message)}`;

        // Open in new tab with security features
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Reset form and show success
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    return (
        <section id="contact" className="section-padding contact">
            <div className="container">
                <div className="contact-wrapper">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">{t.contact.title}</h2>
                        <p className="contact-desc">
                            {t.contact.subtitle}
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <div className="detail-icon"><Mail size={20} /></div>
                                <div>
                                    <h4>{t.contact.email}</h4>
                                    <p>contact@myloanpartner.in</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon"><Phone size={20} /></div>
                                <div>
                                    <h4>{t.contact.phone}</h4>
                                    <p>+91 90807 54536</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon"><MapPin size={20} /></div>
                                <div>
                                    <h4>{t.contact.address}</h4>
                                    <p>Tirupur, Tamil Nadu<br />India</p>
                                </div>
                            </div>
                        </div>

                        <div className="security-badge">
                            <ShieldCheck size={16} />
                            <span>Your data is 256-bit SSL encrypted & secure.</span>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="form-group">
                            <label>{t.contact.form.name}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t.contact.form.name}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-msg">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>{t.contact.form.email}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t.contact.form.email}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>{t.contact.form.phone}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                maxLength="10"
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-msg">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>{t.contact.form.service}</label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className={`form-select ${errors.service ? 'error' : ''}`}
                            >
                                <option value="">Select Service</option>
                                <option value="home_loan">Home Loan</option>
                                <option value="personal_loan">Personal Loan</option>
                                <option value="business_loan">Business Loan</option>
                                <option value="car_loan">Car Loan</option>
                                <option value="professional_loan">Professional Loan</option>
                                <option value="od">Overdraft (OD)</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.service && <span className="error-msg">{errors.service}</span>}
                        </div>

                        <div className="form-group">
                            <label>{t.contact.form.message}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t.contact.form.message}
                                rows="4"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? (
                                <><Loader2 size={18} className="animate-spin" /> Processing...</>
                            ) : status === 'success' ? (
                                <><CheckCircle size={18} /> Sent Successfully</>
                            ) : (
                                <>{t.contact.form.submit} <Send size={18} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="form-status success">
                                Thank you! We'll contact you shortly.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="form-status error">
                                <AlertCircle size={16} /> Something went wrong. Please try again.
                            </div>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
