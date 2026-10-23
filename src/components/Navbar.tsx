import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import SixoriaLogo from './SixoriaLogo';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Fermer le menu si clic en dehors
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggleLang = () => {
        const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        localStorage.setItem('sixoria-lang', newLang);
    };

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/digital', label: t('nav.digital') },
        { path: '/trading', label: t('nav.trading') },
        { path: '/services', label: t('nav.services') },
        { path: '/about', label: t('nav.about') },
        { path: '/team', label: t('nav.team') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const isActive = (path: string) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    const solid = scrolled || !isHome;

    const navBg = solid
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200'
        : 'bg-transparent';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
            role="banner"
        >
            <nav
                className="container-max flex items-center justify-between h-16 md:h-20"
                aria-label="Navigation principale"
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 group shrink-0"
                    aria-label="SIXORIA SARL — Accueil"
                >
                    <SixoriaLogo
                        size={38}
                        variant="emblem"
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`flex flex-col leading-none transition-colors duration-300 ${solid ? 'text-forest-900' : 'text-white'}`}>
                        <span className="font-display font-bold tracking-widest text-base">SIXORIA</span>
                        <span className="text-gold-500 text-[10px] font-semibold tracking-widest uppercase">SARL</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden xl:flex items-center gap-0.5" role="list">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                        ? 'text-gold-500 bg-gold-500/10'
                                        : solid
                                            ? 'text-forest-700 hover:text-gold-600 hover:bg-forest-50'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                                aria-current={isActive(link.path) ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Sélecteur de langue FR/EN */}
                    <button
                        onClick={toggleLang}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 ${solid
                                ? 'border-forest-200 text-forest-700 hover:bg-forest-50'
                                : 'border-white/30 text-white hover:bg-white/10'
                            }`}
                        aria-label={i18n.language.startsWith('fr') ? 'Switch to English' : 'Passer en français'}
                        title={i18n.language.startsWith('fr') ? 'Switch to English' : 'Passer en français'}
                    >
                        <Globe size={13} />
                        <span>{i18n.language.startsWith('fr') ? 'EN' : 'FR'}</span>
                    </button>

                    {/* CTA Desktop */}
                    <Link
                        to="/contact"
                        className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
                    >
                        {t('common.contact_us')}
                    </Link>

                    {/* Burger Mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`xl:hidden p-2 rounded-lg transition-colors ${solid
                                ? 'text-forest-700 hover:bg-forest-50'
                                : 'text-white hover:bg-white/10'
                            }`}
                        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Menu Mobile */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`xl:hidden bg-white border-t border-cream-200 shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                role="navigation"
                aria-label="Menu mobile"
                aria-hidden={!isOpen}
            >
                <ul className="container-max py-4 flex flex-col gap-1" role="list">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                        ? 'bg-forest-50 text-forest-700 font-semibold border-l-2 border-gold-500 pl-5'
                                        : 'text-gray-700 hover:bg-cream-100 hover:text-forest-700'
                                    }`}
                                aria-current={isActive(link.path) ? 'page' : undefined}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="pt-3 border-t border-cream-200 mt-2">
                        <Link
                            to="/contact"
                            className="btn-primary w-full justify-center"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('common.contact_us')}
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
