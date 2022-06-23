import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div style={{ background: '#F8F9FA' }} className="pt-2 d-flex justify-content-center">
                <p className="fs-6 fw-lighter fst-italic">©{(new Date()).getFullYear()} Developed by Thush (All Rights Reserved)</p>
            </div>
        </footer>
    );
}

export default Footer;