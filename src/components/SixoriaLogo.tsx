import React from 'react';

interface SixoriaLogoProps {
    className?: string;
    size?: number;
    variant?: 'full' | 'emblem' | 'text';
}

const SixoriaLogo: React.FC<SixoriaLogoProps> = ({ className = '', size = 48, variant = 'full' }) => {

    const Emblem = () => (
        <img
            src="/sixoria_logo2.png"
            alt="Logo SIXORIA"
            width={size}
            height={size}
            style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
            aria-hidden={variant !== 'emblem'}
        />
    );

    if (variant === 'emblem') {
        return (
            <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Emblem />
            </div>
        );
    }

    if (variant === 'text') {
        return (
            <div className={`flex flex-col leading-none ${className}`}>
                <span className="font-display font-bold tracking-widest text-forest-800">SIXORIA</span>
                <span className="text-xs text-gold-500 font-medium tracking-wide">SARL</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Emblem />
            <div className="flex flex-col leading-none">
                <span
                    className="font-display font-bold tracking-widest"
                    style={{ fontSize: size * 0.35 }}
                >
                    SIXORIA
                </span>
                <span
                    className="text-gold-500 font-medium tracking-wide"
                    style={{ fontSize: size * 0.2 }}
                >
                    SARL
                </span>
            </div>
        </div>
    );
};

export default SixoriaLogo;
