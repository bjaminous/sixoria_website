import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();

    const packs = [
        {
            key: 'pme' as const,
            accent: 'forest',
            borderTop: 'border-t-forest-600',
            badgeBg: 'bg-forest-100 text-forest-700',
            btnClass: 'btn-outline-forest',
            featured: false,
        },
        {
            key: 'office' as const,
            accent: 'gold',
            borderTop: 'border-t-gold-500',
            badgeBg: 'bg-gold-100 text-gold-700',
            btnClass: 'btn-primary',
            featured: true,
        },
        {
            key: 'digital' as const,
            accent: 'terracotta',
            borderTop: 'border-t-terracotta-500',
            badgeBg: 'bg-terracotta-100 text-terracotta-700',
            btnClass: 'btn-outline-forest',
            featured: false,
        },
    ] as const;

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-gradient-sixoria pt-32 pb-20 overflow-hidden" aria-labelledby="services-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10 text-center">
                    <Reveal>
                        <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
                            ✦ {t('offers.badge')}
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 id="services-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t('offers.title')}
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-cream-200 text-xl max-w-2xl mx-auto">{t('offers.subtitle')}</p>
                    </Reveal>
                </div>
            </section>

            {/* Cards */}
            <section className="section-padding bg-cream-50" aria-labelledby="packs-heading">
                <div className="container-max">
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {packs.map(({ key, borderTop, badgeBg, btnClass, featured }) => (
                            <Reveal key={key} delay={key === 'pme' ? 0 : key === 'office' ? 100 : 200}>
                                <div className={`card border-t-4 ${borderTop} p-8 relative ${featured ? 'ring-2 ring-gold-400 shadow-xl' : ''}`}>
                                    {featured && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                            <span className="bg-gold-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                                                ✦ Recommandé
                                            </span>
                                        </div>
                                    )}
                                    <span className={`badge ${badgeBg} mb-5`}>
                                        {t('offers.badge')}
                                    </span>
                                    <h2 className="font-display text-2xl font-bold text-forest-800 mb-3">
                                        {t(`offers.${key}.title`)}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                        {t(`offers.${key}.description`)}
                                    </p>

                                    <ul className="space-y-3 mb-10">
                                        {(t(`offers.${key}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle size={17} className="text-forest-500 shrink-0 mt-0.5" />
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-cream-200 pt-5">
                                        <p className="text-xs text-amber-600 flex items-start gap-1.5 mb-4">
                                            <span>⚠</span>
                                            <span>Tarifs et contenu exact à confirmer avec l'équipe SIXORIA</span>
                                        </p>
                                        <Link to="/contact" className={`${btnClass} w-full justify-center`}>
                                            {t('offers.contact_cta')} <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Personnalisation */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <Reveal className="text-center max-w-2xl mx-auto">
                        <div className="divider-gold mx-auto mb-6"></div>
                        <h2 className="section-title mb-4">Besoin d'une offre sur mesure ?</h2>
                        <p className="section-subtitle mb-8">
                            Ces packs sont des points de départ. SIXORIA peut personnaliser chaque offre selon votre contexte,
                            votre secteur et vos objectifs.
                        </p>
                        <Link to="/contact" className="btn-primary text-base px-10 py-4">
                            Discutons de vos besoins <ArrowRight size={18} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;
