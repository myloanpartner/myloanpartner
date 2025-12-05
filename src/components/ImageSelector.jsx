import React from 'react';
import img1 from '../assets/hero-handshake.png';
import img2 from '../assets/hero-handshake-v2.png';
import img3 from '../assets/hero-handshake-v3.png';
import img4 from '../assets/hero-handshake-mfg-1.png';
import img5 from '../assets/hero-handshake-mfg-2.png';
import img6 from '../assets/user-photo.jpg';

const ImageSelector = () => {
    const images = [
        { id: 1, src: img1, label: "Option 1: Original Handshake" },
        { id: 2, src: img2, label: "Option 2: Standing by Window" },
        { id: 3, src: img3, label: "Option 3: Close-up Smile" },
        { id: 4, src: img4, label: "Option 4: Textile Factory Setting" },
        { id: 5, src: img5, label: "Option 5: Garment Factory Floor" },
        { id: 6, src: img6, label: "Option 6: Your Uploaded Photo" },
    ];

    return (
        <div style={{ padding: '100px 20px', textAlign: 'center', background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-color)' }}>
            <h1>Choose Your Hero Image</h1>
            <p>Please review the options below and let me know which one you prefer.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
                {images.map((img) => (
                    <div key={img.id} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', background: 'var(--secondary-bg)' }}>
                        <img src={img.src} alt={img.label} style={{ width: '100%', borderRadius: '8px', height: '300px', objectFit: 'cover' }} />
                        <h3 style={{ marginTop: '15px' }}>{img.label}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSelector;
