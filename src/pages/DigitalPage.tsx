import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Monitor, Code, Settings, BookOpen, FlaskConical, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const DigitalPage: React.FC = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: Code,
            titleKey: 'digital.web_title',
            descKey: 'digital.web_desc',
            color: 'bg-forest-50 text-forest-600',
        },
        {
            icon: Settings,
            titleKey: 'digital.auto_title',
            descKey: 'digital.auto_desc',
            color: 'bg-gold-50 text-gold-600',
        },
        {
            icon: BookOpen,
            titleKey: 'digital.support_title',
            descKey: 'digital.support_desc',
            color: 'bg-sage-50 text-sage-600',
        },
        {
            icon: Monitor,
            titleKey: 'digital.solutions_title',
            descKey: 'digital.solutions_desc',
            color: 'bg-terracotta-50 text-terracotta-600',
        },
    ];

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-gradient-sixoria pt-32 pb-20 overflow-hidden" aria-labelledby="digital-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute top-20 right-10 w-72 h-72 opacity-10 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 200 200" fill="none">
                        <polygon points="100,5 190,55 190,145 100,195 10,145 10,55" stroke="#c9922a" strokeWidth="1" fill="none" />
                    </svg>
                </div>
                <div className="container-max relative z-10">
                    <Reveal>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <Monitor size={22} className="text-gold-400" />
                            </div>
                            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30">
                                SIXORIA / {t('nav.digital')}
                            </span>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 id="digital-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t('digital.hero_title')}
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-cream-200 text-xl max-w-2xl">{t('digital.hero_subtitle')}</p>
                    </Reveal>
                </div>
            </section>

            {/* Notice d'information */}
            <section className="bg-amber-50 border-b border-amber-200 py-4">
                <div className="container-max">
                    <div className="flex items-start gap-3">
                        <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-amber-800 text-sm">{t('digital.notice')}</p>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-padding bg-white" aria-labelledby="digital-intro-heading">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal direction="left">
                            <div>
                                <div className="divider-gold mb-6"></div>
                                <h2 id="digital-intro-heading" className="section-title mb-5">{t('digital.intro_title')}</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">{t('digital.intro_text')}</p>
                                <div className="mt-8">
                                    <Link to="/contact" className="btn-primary">
                                        {t('common.contact_us')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={150} direction="right">
                            <div className="grid grid-cols-2 gap-4">
                                {services.slice(0, 4).map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className={`p-5 rounded-2xl ${s.color} bg-opacity-30 flex flex-col gap-2`}>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-semibold text-forest-800 text-sm">{t(s.titleKey)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding bg-cream-50" aria-labelledby="services-heading">
                <div className="container-max">
                    <Reveal className="text-center mb-14 max-w-xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="services-heading" className="section-title">Nos domaines d'intervention</h2>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <Reveal key={i} delay={i * 80}>
                                    <div className="card p-8 group hover:shadow-xl">
                                        <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                            <Icon size={26} />
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-forest-800 mb-3">
                                            {t(service.titleKey)}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{t(service.descKey)}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projets en réflexion */}
            <section className="section-padding bg-white" aria-labelledby="exploration-heading">
                <div className="container-max">
                    <Reveal className="mb-10">
                        <div className="max-w-2xl">
                            <div className="divider-gold mb-4"></div>
                            <h2 id="exploration-heading" className="section-title mb-3">
                                {t('digital.exploration_title')}
                            </h2>
                            <p className="text-gray-600">{t('digital.exploration_subtitle')}</p>
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="card p-8 border-l-4 border-sage-400 max-w-2xl">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center shrink-0">
                                    <FlaskConical size={22} className="text-sage-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-display text-lg font-bold text-forest-800">
                                            {t('digital.patient_title')}
                                        </h3>
                                        <span className="badge bg-sage-100 text-sage-700 text-xs">
                                            {t('digital.patient_badge')}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{t('digital.patient_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-forest-50">
                <div className="container-max text-center">
                    <Reveal>
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <AlertCircle size={20} className="text-forest-600" />
                        </div>
                        <h2 className="section-title mb-4">Discutons de votre projet digital</h2>
                        <p className="section-subtitle mb-8 max-w-xl mx-auto">
                            Vous avez un besoin numérique ? Parlons-en. L'équipe SIXORIA étudie chaque demande avec attention.
                        </p>
                        <Link to="/contact" className="btn-primary text-base px-10 py-4">
                            {t('common.contact_us')} <ArrowRight size={18} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default DigitalPage;
