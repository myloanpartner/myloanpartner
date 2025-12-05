import React, { useEffect, useRef } from 'react';
import './Partners.css';

const partners = [
    { name: "HDFC Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/hdfc-bank.svg", url: "https://netbanking.hdfcbank.com/netbanking/", domain: "hdfcbank.com" },
    { name: "ICICI Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/icici-bank-1.svg", url: "https://infinity.icicibank.com/corp/Login.jsp", domain: "icicibank.com" },
    { name: "Axis Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/axis-bank-logo.svg", url: "https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin", domain: "axisbank.com" },
    { name: "SBI", logoUrl: "https://cdn.worldvectorlogo.com/logos/state-bank-of-india.svg", url: "https://retail.onlinesbi.sbi/retail/login.htm", domain: "sbi.co.in" },
    { name: "Kotak Mahindra Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/kotak-mahindra-bank-1.svg", url: "https://netbanking.kotak.com/knb2/", domain: "kotak.com" },
    { name: "Bajaj Finserv", logoUrl: "https://cdn.worldvectorlogo.com/logos/bajaj-finserv.svg", url: "https://www.bajajfinserv.in/", domain: "bajajfinserv.in" },
    { name: "Tata Capital", logoUrl: "https://cdn.worldvectorlogo.com/logos/tata-capital.svg", url: "https://www.tatacapital.com/", domain: "tatacapital.com" },
    { name: "Aditya Birla Capital", logoUrl: "https://cdn.worldvectorlogo.com/logos/aditya-birla-capital.svg", url: "https://www.adityabirlacapital.com/", domain: "adityabirlacapital.com" },
    { name: "IDFC First Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/idfc-first-bank.svg", url: "https://my.idfcfirstbank.com/login", domain: "idfcfirstbank.com" },
    { name: "Yes Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/yes-bank.svg", url: "https://www.yesbank.in/digital-banking/internet-banking", domain: "yesbank.in" },
    { name: "IndusInd Bank", logoUrl: "https://cdn.worldvectorlogo.com/logos/indusind-bank.svg", url: "https://indusnet.indusind.com/", domain: "indusind.com" },
    { name: "Fullerton India", logoUrl: "https://cdn.worldvectorlogo.com/logos/fullerton-india.svg", url: "https://www.smfgindiacredit.com/", domain: "fullertonindia.com" },
    { name: "L&T Finance", logoUrl: "https://cdn.worldvectorlogo.com/logos/l-t-finance-holdings.svg", url: "https://www.ltfs.com/", domain: "ltfs.com" },
    { name: "Piramal Finance", logoUrl: "https://cdn.worldvectorlogo.com/logos/piramal-enterprises.svg", url: "https://www.piramalfinance.com/", domain: "piramalfinance.com" },
    { name: "Hero Fincorp", logoUrl: "https://cdn.worldvectorlogo.com/logos/hero-fincorp.svg", url: "https://www.herofincorp.com/", domain: "herofincorp.com" },
    { name: "Muthoot Finance", logoUrl: "https://cdn.worldvectorlogo.com/logos/muthoot-finance.svg", url: "https://www.muthootfinance.com/", domain: "muthootfinance.com" }
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
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="partner-logo"
                                onError={(e) => {
                                    // Fallback to Clearbit if SVG fails
                                    if (e.target.src !== `https://logo.clearbit.com/${partner.domain}`) {
                                        e.target.src = `https://logo.clearbit.com/${partner.domain}`;
                                    } else {
                                        // If Clearbit also fails, hide image
                                        e.target.style.display = 'none';
                                    }
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
