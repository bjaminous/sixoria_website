import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const LegalPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-forest-900 pt-32 pb-16" aria-labelledby="legal-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-50 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10">
                    <Reveal>
                        <h1 id="legal-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('legal.title')}
                        </h1>
                    </Reveal>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-cream-50">
                <div className="container-max max-w-4xl">
                    {/* Notice */}
                    <Reveal>
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 mb-10">
                            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-sm">{t('legal.notice')}</p>
                        </div>
                    </Reveal>

                    <div className="space-y-10">
                        {/* Infos entreprise */}
                        <Reveal>
                            <div className="card p-8">
                                <h2 className="font-display text-2xl font-bold text-forest-800 mb-5">{t('legal.company_title')}</h2>
                                <ul className="space-y-2 text-gray-700">
                                    {[
                                        t('legal.company_name'),
                                        t('legal.company_country'),
                                        t('legal.company_rccm'),
                                        t('legal.company_address'),
                                        t('legal.company_email'),
                                        t('legal.company_website'),
                                    ].map((info, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-gold-500 mt-1">•</span>
                                            <span>{info}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        {/* Confidentialité */}
                        <Reveal delay={100}>
                            <div className="card p-8">
                                <h2 className="font-display text-2xl font-bold text-forest-800 mb-5">{t('legal.privacy_title')}</h2>
                                <p className="text-gray-600 leading-relaxed">{t('legal.privacy_text')}</p>
                            </div>
                        </Reveal>

                        {/* Hébergement */}
                        <Reveal delay={150}>
                            <div className="card p-8">
                                <h2 className="font-display text-2xl font-bold text-forest-800 mb-5">{t('legal.hosting_title')}</h2>
                                <p className="text-gray-600 leading-relaxed">{t('legal.hosting_text')}</p>
                            </div>
                        </Reveal>

                        {/* Back */}
                        <Reveal>
                            <div className="text-center pt-4">
                                <Link to="/" className="btn-outline-forest">
                                    ← {t('common.back_home')}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LegalPage;
