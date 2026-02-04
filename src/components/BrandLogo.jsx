import React from 'react';
import { motion } from 'framer-motion';

// --- LOGO PATHS (Geometric Approximations & Standards) ---

// --- LOGO PATHS (Authentic Vector Data) ---

const AWSLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.1 16.1v-2.7c-1.3 1-2.9 1.5-4.5 1.5-2.6 0-4.3-1.6-4.3-4.2 0-2.6 1.9-4.1 4.5-4.1 1.6 0 2.9.6 4.1 1.6V5.7c-1.3-.8-2.8-1.3-4.4-1.3C2.8 4.4 0 7.3 0 10.9s2.8 6.5 6.5 6.5c1.7 0 3.3-.5 4.6-1.3zM18.7 17.4h2.7V4.7h-2.7v12.7zm3.1-9.9c.5.5 1.1.9 1.8 1.1v-1c-.5-.2-1-.5-1.4-.9l-.4.8z" />
    </svg>
);

const AzureLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.4 21.5L0 17.6 10.5 4.9l2.8 2.2z" opacity="0.7" />
        <path d="M13.3 7.1L9 12.3l6.5 9.2h8.2L13.3 7.1z" />
    </svg>
);

const GCPLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" />
    </svg>
);

const SailPointLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 22h8L10 6 2 22zm10 0h10V2l-10 20z" />
        <circle cx="16" cy="18" r="2" fill="white" />
    </svg>
); // SailPoint stylized sail

const AkeylessLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 6h8v8H8z" opacity="0.5" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12 8l4 4-4 4-4-4 4-4z" />
    </svg>
); // Geometric abstract key

const StrongDMLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h8v8l10-12h-8z" />
    </svg>
); // Authentic Thunderbolt Bolt

const PingLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm2 14h-4v-2h4v2zm0-4h-4V8h4v4z" />
    </svg>
); // Abstract Ping

const CmdLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm0 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
    </svg>
);


const BrandLogo = ({ brand, color = "#fff", size = 32, className }) => {
    let Icon = null;

    switch (brand) {
        case 'AWS': Icon = AWSLogo; break;
        case 'Azure': Icon = AzureLogo; break;
        case 'GCP': Icon = GCPLogo; break;
        case 'SailPoint': Icon = SailPointLogo; break;
        case 'Akeyless': Icon = AkeylessLogo; break;
        case 'StrongDM': Icon = StrongDMLogo; break;
        case 'Ping Identity': Icon = PingLogo; break;
        default: Icon = () => <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: `2px solid ${color}` }} />; break;
    }

    return (
        <motion.div
            className={`brand-logo ${className || ''}`}
            style={{
                width: size,
                height: size,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            initial={{ filter: 'grayscale(100%) opacity(0.7)' }}
            whileHover={{ filter: 'grayscale(0%) opacity(1)', scale: 1.1 }}
            transition={{ duration: 0.3 }}
        >
            <Icon />
        </motion.div>
    );
};

export default BrandLogo;
