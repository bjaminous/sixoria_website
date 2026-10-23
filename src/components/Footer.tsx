import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Globe, MapPin, ArrowRight } from 'lucide-react';
import SixoriaLogo from './SixoriaLogo';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    const quickLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/services', label: t('nav.services') },
        { to: '/team', label: t('nav.team') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ];

    const poleLinks = [
        { to: '/digital', label: t('nav.digital') },
        { to: '/trading', label: t('nav.trading') },
        { to: '/legal', label: t('footer.legal_mentions') },
    ];

    const teamEmails = [
        { name: 'Hapsatou', email: 'hapsatou@sixoria.cm' },
        { name: 'Inoussa', email: 'inoussa@sixoria.cm' },
        { name: 'Jamila', email: 'beulguibe@sixoria.cm' },
        { name: 'Yasmine', email: 'ladi@sixoria.cm' },
    ];

    return (
        <footer className="bg-forest-900 text-cream-100" role="contentinfo">
            {/* Main footer */}
            <div className="container-max py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Branding */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <SixoriaLogo size={44} variant="emblem" />
                            <div className="text-white">
                                <div className="font-display font-bold text-lg tracking-widest">SIXORIA</div>
                                <div className="text-gold-400 text-xs tracking-widest font-semibold">SARL</div>
                            </div>
                        </div>
                        <p className="text-cream-300 text-sm leading-relaxed mb-4">
                            {t('footer.description')}
                        </p>
                        <p className="text-gold-400 font-display italic text-base">
                            « {t('footer.tagline')} »
                        </p>
                    </div>

                    {/* Navigation rapide */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
                            {t('footer.quick_links')}
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pôles + légal */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
                            {t('footer.poles')}
                        </h3>
                        <ul className="space-y-2.5">
                            {poleLinks.map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-cream-300 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Contacts équipe */}
                        <h3 className="text-white font-semibold text-xs uppercase tracking-widest mt-8 mb-4">
                            {t('contact.team_contacts')}
                        </h3>
                        <ul className="space-y-2">
                            {teamEmails.map(m => (
                                <li key={m.email}>
                                    <a
                                        href={`mailto:${m.email}`}
                                        className="text-cream-300 hover:text-gold-400 text-xs transition-colors duration-200 flex items-center gap-1.5 group"
                                        aria-label={`Écrire à ${m.name}`}
                                    >
                                        <Mail size={11} className="opacity-60 group-hover:opacity-100 shrink-0" />
                                        {m.email}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact général */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
                            {t('footer.contact_us')}
                        </h3>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-2.5">
                                <Mail size={14} className="text-gold-400 mt-0.5 shrink-0" />
                                <a
                                    href="mailto:contact@sixoria.cm"
                                    className="text-cream-300 hover:text-gold-400 text-sm transition-colors"
                                >
                                    contact@sixoria.cm
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Globe size={14} className="text-gold-400 mt-0.5 shrink-0" />
                                <a
                                    href="https://sixoria.cm"
                                    className="text-cream-300 hover:text-gold-400 text-sm transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    sixoria.cm
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                                <span className="text-cream-300 text-sm">{t('contact.location_value')}</span>
                            </li>
                        </ul>
                        <Link to="/contact" className="btn-primary text-sm py-2.5">
                            {t('common.contact_us')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Barre basse */}
            <div className="border-t border-forest-700">
                <div className="container-max py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream-400">
                    <p>© {new Date().getFullYear()} SIXORIA SARL. {t('footer.rights')}</p>
                    <p>{t('footer.made_with')}</p>
                    <div className="flex items-center gap-4">
                        <Link to="/legal" className="hover:text-gold-400 transition-colors">
                            {t('footer.legal_mentions')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
