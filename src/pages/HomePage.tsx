import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Monitor, ShoppingBag, ArrowRight, MessageCircle,
    ChevronDown, Shield, Zap, Users, Globe, Star, Lightbulb
} from 'lucide-react';
import { Reveal } from '../components/Reveal';

// Particle/Background Decoration
const HeroDecoration: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Geometric shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="100,5 190,55 190,145 100,195 10,145 10,55" stroke="#c9922a" strokeWidth="1.5" fill="none" />
                <polygon points="100,25 170,65 170,135 100,175 30,135 30,65" stroke="#c9922a" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
            </svg>
        </div>
        <div className="absolute bottom-32 left-10 w-40 h-40 opacity-8">
            <svg viewBox="0 0 120 120" fill="none">
                <polygon points="60,3 113,33 113,87 60,117 7,87 7,33" stroke="white" strokeWidth="0.8" fill="none" />
            </svg>
        </div>
        {/* Gradient orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-forest-500/20 blur-3xl"></div>
    </div>
);

const HomePage: React.FC = () => {
    const { t } = useTranslation();

    const values = [
        { icon: Zap, key: 'agility', color: 'text-gold-500' },
        { icon: Shield, key: 'trust', color: 'text-sage-500' },
        { icon: Lightbulb, key: 'innovation', color: 'text-terracotta-400' },
        { icon: Users, key: 'collaboration', color: 'text-forest-500' },
        { icon: Globe, key: 'proximity', color: 'text-gold-600' },
        { icon: Star, key: 'excellence', color: 'text-sage-600' },
    ];

    return (
        <main id="main-content">
            {/* ===== HERO ===== */}
            <section
                className="relative min-h-screen flex items-center bg-hero-pattern overflow-hidden"
                aria-labelledby="hero-heading"
            >
                <HeroDecoration />

                <div className="container-max relative z-10 py-32">
                    <div className="max-w-3xl">
                        <Reveal direction="up">
                            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-6">
                                ✦ {t('hero.badge')}
                            </span>
                        </Reveal>

                        <Reveal delay={100}>
                            <h1
                                id="hero-heading"
                                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                            >
                                {t('hero.title')}
                            </h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-lg md:text-xl text-cream-200 leading-relaxed mb-10 max-w-2xl">
                                {t('hero.subtitle')}
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="flex flex-col sm:flex-row gap-4 mb-16">
                                <Link
                                    to="/services"
                                    className="btn-primary text-base px-8 py-4"
                                    id="hero-cta-services"
                                >
                                    {t('hero.cta_services')}
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="btn-secondary text-base px-8 py-4"
                                    id="hero-cta-quote"
                                >
                                    {t('hero.cta_quote')}
                                </Link>
                                <a
                                    href="https://wa.me/XXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366]/90 hover:bg-[#25D366] text-white font-semibold rounded-lg transition-all duration-200 text-base"
                                    id="hero-cta-whatsapp"
                                    title="Le numéro WhatsApp sera configuré par l'équipe SIXORIA"
                                >
                                    <MessageCircle size={18} />
                                    {t('hero.cta_whatsapp')}
                                </a>
                            </div>
                        </Reveal>

                        {/* Stats / Badges */}
                        <Reveal delay={400}>
                            <div className="flex flex-wrap gap-6">
                                <div className="glass-card px-4 py-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-slow"></div>
                                    <span className="text-cream-200 text-sm font-medium">Pôle Digital</span>
                                </div>
                                <div className="glass-card px-4 py-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sage-400 animate-pulse-slow"></div>
                                    <span className="text-cream-200 text-sm font-medium">Pôle Trading</span>
                                </div>
                                <div className="glass-card px-4 py-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-terracotta-400 animate-pulse-slow"></div>
                                    <span className="text-cream-200 text-sm font-medium">6 Associés</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300 animate-float">
                    <span className="text-xs tracking-widest uppercase">{t('hero.scroll_hint')}</span>
                    <ChevronDown size={20} className="animate-bounce" />
                </div>
            </section>

            {/* ===== DEUX PÔLES ===== */}
            <section className="section-padding bg-white" aria-labelledby="poles-heading">
                <div className="container-max">
                    <Reveal className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="poles-heading" className="section-title mb-4">{t('poles.title')}</h2>
                        <p className="section-subtitle">{t('poles.subtitle')}</p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Pôle Digital */}
                        <Reveal delay={100} direction="left">
                            <Link to="/digital" className="group block">
                                <div className="card p-8 h-full border-2 border-transparent hover:border-forest-200 transition-all duration-300">
                                    <div className="w-16 h-16 bg-forest-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-forest-100 transition-colors">
                                        <Monitor size={32} className="text-forest-600" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-forest-800 mb-3">
                                        {t('poles.digital.title')}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {t('poles.digital.description')}
                                    </p>
                                    <div className="flex items-center gap-2 text-forest-600 font-semibold group-hover:text-gold-600 transition-colors">
                                        {t('poles.digital.cta')}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </Reveal>

                        {/* Pôle Trading */}
                        <Reveal delay={200} direction="right">
                            <Link to="/trading" className="group block">
                                <div className="card p-8 h-full border-2 border-transparent hover:border-gold-200 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors">
                                        <ShoppingBag size={32} className="text-gold-600" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-forest-800 mb-3">
                                        {t('poles.trading.title')}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {t('poles.trading.description')}
                                    </p>
                                    <div className="flex items-center gap-2 text-gold-600 font-semibold group-hover:text-forest-600 transition-colors">
                                        {t('poles.trading.cta')}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== OFFRES DE LANCEMENT ===== */}
            <section className="section-padding bg-cream-50" aria-labelledby="offers-heading">
                <div className="container-max">
                    <Reveal className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="offers-heading" className="section-title mb-4">{t('offers.title')}</h2>
                        <p className="section-subtitle">{t('offers.subtitle')}</p>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {(['pme', 'office', 'digital'] as const).map((key, i) => {
                            const colors = [
                                { border: 'border-forest-200', icon: 'bg-forest-50 text-forest-600', badge: 'bg-forest-100 text-forest-700' },
                                { border: 'border-gold-200', icon: 'bg-gold-50 text-gold-600', badge: 'bg-gold-100 text-gold-700' },
                                { border: 'border-terracotta-200', icon: 'bg-terracotta-50 text-terracotta-600', badge: 'bg-terracotta-100 text-terracotta-700' },
                            ];
                            const c = colors[i];

                            return (
                                <Reveal key={key} delay={i * 100}>
                                    <div className={`card p-8 h-full border-t-4 ${c.border}`}>
                                        <span className={`badge ${c.badge} mb-4`}>
                                            ✦ {t('offers.badge')}
                                        </span>
                                        <h3 className="font-display text-xl font-bold text-forest-800 mb-3">
                                            {t(`offers.${key}.title`)}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                            {t(`offers.${key}.description`)}
                                        </p>
                                        <ul className="space-y-2.5 mb-8">
                                            {(t(`offers.${key}.features`, { returnObjects: true }) as string[]).map((f, fi) => (
                                                <li key={fi} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            to="/contact"
                                            className={`btn-outline-forest w-full justify-center`}
                                        >
                                            {t('offers.contact_cta')}
                                        </Link>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== VALEURS ===== */}
            <section className="section-padding bg-forest-900 relative overflow-hidden" aria-labelledby="values-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10">
                    <Reveal className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="values-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('values.title')}
                        </h2>
                        <p className="text-cream-300 text-lg">{t('values.subtitle')}</p>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map(({ icon: Icon, key, color }, i) => (
                            <Reveal key={key} delay={i * 80}>
                                <div className="glass-card p-6 hover:bg-white/15 transition-all duration-300 group">
                                    <Icon size={28} className={`${color} mb-4 group-hover:scale-110 transition-transform`} />
                                    <h3 className="text-white font-semibold text-lg mb-2">
                                        {t(`values.${key}.title`)}
                                    </h3>
                                    <p className="text-cream-300 text-sm leading-relaxed">
                                        {t(`values.${key}.description`)}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="section-padding bg-white" aria-labelledby="cta-heading">
                <div className="container-max">
                    <div className="bg-gradient-sixoria rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sage-400 rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative z-10">
                            <Reveal>
                                <h2 id="cta-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                    {t('cta_section.title')}
                                </h2>
                            </Reveal>
                            <Reveal delay={100}>
                                <p className="text-cream-200 text-lg mb-10 max-w-xl mx-auto">
                                    {t('cta_section.subtitle')}
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/contact" className="btn-primary text-base px-10 py-4">
                                        {t('cta_section.cta_contact')}
                                        <ArrowRight size={18} />
                                    </Link>
                                    <Link to="/services" className="btn-secondary text-base px-10 py-4">
                                        {t('cta_section.cta_quote')}
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
