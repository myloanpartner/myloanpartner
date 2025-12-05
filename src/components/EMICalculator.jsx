import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RefreshCw, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLanguage } from '../context/LanguageContext';
import './EMICalculator.css';

const EMICalculator = () => {
    const { t } = useLanguage();
    const [amount, setAmount] = useState(500000);
    const [rate, setRate] = useState(10.5);
    const [tenure, setTenure] = useState(36);
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [schedule, setSchedule] = useState([]);
    const [yearlyBreakup, setYearlyBreakup] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const calculateEMI = () => {
            const principal = parseFloat(amount);
            const r = parseFloat(rate) / 12 / 100;
            const n = parseFloat(tenure);

            const x = Math.pow(1 + r, n);
            const monthly = (principal * x * r) / (x - 1);

            if (isFinite(monthly)) {
                setEmi(monthly.toFixed(0));
                setTotalPayment((monthly * n).toFixed(0));
                setTotalInterest(((monthly * n) - principal).toFixed(0));
                generateSchedule(principal, monthly, r, n, startDate);
            }
        };

        calculateEMI();
    }, [amount, rate, tenure, startDate]);

    const generateSchedule = (principal, emi, r, n, start) => {
        let balance = principal;
        let currentMonth = new Date(start);
        const newSchedule = [];
        const yearly = {};

        for (let i = 1; i <= n; i++) {
            const interest = balance * r;
            const principalComponent = emi - interest;
            balance -= principalComponent;

            if (balance < 0) balance = 0;

            const date = new Date(currentMonth);
            date.setMonth(currentMonth.getMonth() + i - 1);

            newSchedule.push({
                id: i,
                date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                year: date.getFullYear(),
                emi: Math.round(emi),
                principal: Math.round(principalComponent),
                interest: Math.round(interest),
                balance: Math.round(balance)
            });

            // Yearly Aggregation
            const year = date.getFullYear();
            if (!yearly[year]) yearly[year] = { year, principal: 0, interest: 0 };
            yearly[year].principal += principalComponent;
            yearly[year].interest += interest;
        }
        setSchedule(newSchedule);
        setYearlyBreakup(Object.values(yearly));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        const input = document.getElementById('print-area');

        // Temporarily make it visible for capture
        input.style.display = 'block';

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save('MyLoanPartner_EMI_Report.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            input.style.display = 'none'; // Hide it again
            setIsGenerating(false);
        }
    };

    return (
        <section id="calculator" className="section-padding calculator-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t.calculator.title}</h2>
                    <p className="section-subtitle">{t.calculator.subtitle}</p>
                </div>

                <div className="calculator-wrapper">
                    <motion.div
                        className="calculator-inputs"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="input-group">
                            <label>{t.calculator.startDate}</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="date-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>{t.calculator.amount}: {formatCurrency(amount)}</label>
                            <input
                                type="range"
                                min="100000"
                                max="10000000"
                                step="50000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="input-inputs">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>{t.calculator.rate} (%): {rate}%</label>
                            <input
                                type="range"
                                min="8"
                                max="24"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                            <div className="input-inputs">
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>{t.calculator.tenure}: {tenure} Months</label>
                            <input
                                type="range"
                                min="12"
                                max="360"
                                step="6"
                                value={tenure}
                                onChange={(e) => setTenure(e.target.value)}
                            />
                            <div className="input-inputs">
                                <input
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="calculator-results"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="result-card">
                            <div className="result-icon">
                                <Calculator size={32} />
                            </div>
                            <h3>{t.calculator.monthlyEMI}</h3>
                            <div className="emi-value">{formatCurrency(emi)}</div>

                            <div className="result-breakdown">
                                <div className="breakdown-item">
                                    <span>{t.calculator.principal}</span>
                                    <span>{formatCurrency(amount)}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>{t.calculator.interest}</span>
                                    <span>{formatCurrency(totalInterest)}</span>
                                </div>
                                <div className="breakdown-item total">
                                    <span>{t.calculator.payable}</span>
                                    <span>{formatCurrency(totalPayment)}</span>
                                </div>
                            </div>

                            <button className="download-btn" onClick={handleDownloadPDF} disabled={isGenerating}>
                                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                                {isGenerating ? t.calculator.generating : t.calculator.download}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Printable Report Section */}
                <div id="print-area" className="print-only">
                    <div className="print-header">
                        <div className="print-logo">My Loan <span>Partner</span></div>
                        <h1>Loan EMI Calculator Report</h1>
                        <p>Generated on {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="print-summary-grid">
                        <div className="summary-box">
                            <label>Loan Amount</label>
                            <span>{formatCurrency(amount)}</span>
                        </div>
                        <div className="summary-box">
                            <label>Monthly EMI</label>
                            <span>{formatCurrency(emi)}</span>
                        </div>
                        <div className="summary-box">
                            <label>Interest Rate</label>
                            <span>{rate}%</span>
                        </div>
                        <div className="summary-box">
                            <label>Total Interest</label>
                            <span>{formatCurrency(totalInterest)}</span>
                        </div>
                        <div className="summary-box">
                            <label>Tenure</label>
                            <span>{tenure} Months</span>
                        </div>
                        <div className="summary-box">
                            <label>Total Payable</label>
                            <span>{formatCurrency(totalPayment)}</span>
                        </div>
                    </div>

                    <div className="print-charts">
                        <div className="chart-section donut-chart">
                            <h3>Breakup of Total Payment</h3>
                            <div className="donut-visual">
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    {/* Background Circle (Interest - Red) */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.9155"
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="3.8"
                                    />
                                    {/* Foreground Circle (Principal - Blue) */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.9155"
                                        fill="none"
                                        stroke="#4f46e5"
                                        strokeWidth="3.8"
                                        strokeDasharray={`${(amount / totalPayment) * 100}, 100`}
                                        transform="rotate(-90 18 18)"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="chart-legend">
                                    <div className="legend-item"><span className="dot principal"></span> Principal ({Math.round((amount / totalPayment) * 100)}%)</div>
                                    <div className="legend-item"><span className="dot interest"></span> Interest ({Math.round((totalInterest / totalPayment) * 100)}%)</div>
                                </div>
                            </div>
                        </div>

                        <div className="chart-section bar-chart">
                            <h3>Year-wise Breakup</h3>
                            <div className="bars-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', paddingBottom: '20px' }}>
                                {yearlyBreakup.map((yearData, index) => (
                                    <div key={index} className="bar-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '40px' }}>
                                        <div className="bar-visual" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                            {/* Interest on top */}
                                            <div className="bar-segment interest" style={{
                                                height: `${(yearData.interest / (yearData.principal + yearData.interest)) * 100}%`,
                                                backgroundColor: '#ef4444',
                                                width: '100%'
                                            }}></div>
                                            {/* Principal on bottom */}
                                            <div className="bar-segment principal" style={{
                                                height: `${(yearData.principal / (yearData.principal + yearData.interest)) * 100}%`,
                                                backgroundColor: '#4f46e5',
                                                width: '100%'
                                            }}></div>
                                        </div>
                                        <span className="year-label" style={{ marginTop: '5px', fontSize: '10px', color: '#666', transform: 'rotate(-45deg)', transformOrigin: 'left top', whiteSpace: 'nowrap' }}>{yearData.year}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="chart-legend">
                                <div className="legend-item"><span className="dot principal"></span> Principal</div>
                                <div className="legend-item"><span className="dot interest"></span> Interest</div>
                            </div>
                        </div>
                    </div>

                    <div className="print-table-container">
                        <h3>Amortization Schedule</h3>
                        <table className="amortization-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>EMI</th>
                                    <th>Principal</th>
                                    <th>Interest</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.date}</td>
                                        <td>{formatCurrency(row.emi)}</td>
                                        <td>{formatCurrency(row.principal)}</td>
                                        <td>{formatCurrency(row.interest)}</td>
                                        <td>{formatCurrency(row.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="print-footer">
                        <p>Generated by My Loan Partner Financial Services</p>
                        <p>www.myloanpartner.in</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EMICalculator;
