import React, { useEffect, useRef } from 'react';
import './Partners.css';

const partners = [
    { name: "HDFC Bank", url: "https://netbanking.hdfcbank.com/netbanking/", domain: "hdfcbank.com" },
    { name: "ICICI Bank", url: "https://infinity.icicibank.com/corp/Login.jsp", domain: "icicibank.com" },
    { name: "Axis Bank", url: "https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin", domain: "axisbank.com" },
    { name: "SBI", url: "https://retail.onlinesbi.sbi/retail/login.htm", domain: "sbi.co.in" },
    { name: "Kotak Mahindra Bank", url: "https://netbanking.kotak.com/knb2/", domain: "kotak.com" },
    { name: "Bajaj Finserv", url: "https://www.bajajfinserv.in/", domain: "bajajfinserv.in" },
    { name: "Tata Capital", url: "https://www.tatacapital.com/", domain: "tatacapital.com" },
    { name: "Aditya Birla Capital", url: "https://www.adityabirlacapital.com/", domain: "adityabirlacapital.com" },
    { name: "IDFC First Bank", url: "https://my.idfcfirstbank.com/login", domain: "idfcfirstbank.com" },
    { name: "Yes Bank", url: "https://www.yesbank.in/digital-banking/internet-banking", domain: "yesbank.in" },
    { name: "IndusInd Bank", url: "https://indusnet.indusind.com/", domain: "indusind.com" },
    { name: "Fullerton India", url: "https://www.smfgindiacredit.com/", domain: "fullertonindia.com" },
    { name: "L&T Finance", url: "https://www.ltfs.com/", domain: "ltfs.com" },
    { name: "Piramal Finance", url: "https://www.piramalfinance.com/", domain: "piramalfinance.com" },
    { name: "Hero Fincorp", url: "https://www.herofincorp.com/", domain: "herofincorp.com" },
    { name: "Muthoot Finance", url: "https://www.muthootfinance.com/", domain: "muthootfinance.com" }
];

const Partners = () => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const checkCenterPosition = () => {
            const items = track.querySelectorAll('.partner-item');
            const containerRect = track.parentElement.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2;
                const distanceFromCenter = Math.abs(centerX - itemCenterX);

                // If item is within 100px of center, add highlight class
                if (distanceFromCenter < 100) {
                    item.classList.add('center-highlight');
                } else {
                    item.classList.remove('center-highlight');
                }
            });
        };

        // Check position every 50ms for smooth highlighting
        const interval = setInterval(checkCenterPosition, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="partners-section">
            <div className="partners-container">
                <div className="partners-track" ref={trackRef}>
                    {[...partners, ...partners].map((partner, index) => (
                        <a
                            key={`${partner.name}-${index}`}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-item"
                            title={partner.name}
                        >
                            <img
                                src={`https://logo.clearbit.com/${partner.domain}`}
                                alt={partner.name}
                                className="partner-logo"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className="partner-name">{partner.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
