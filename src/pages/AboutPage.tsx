import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Target, Eye, Star, ArrowRight, AlertCircle } from 'lucide-react';
import SixoriaLogo from '../components/SixoriaLogo';
import { Reveal } from '../components/Reveal';

// Initiales des 6 associés
const FOUNDERS = [
    { initial: 'I', color: 'bg-forest-700' },
    { initial: 'H', color: 'bg-gold-600' },
    { initial: 'J', color: 'bg-terracotta-500' },
    { initial: 'Y', color: 'bg-sage-600' },
    { initial: 'L', color: 'bg-forest-600' },
    { initial: 'A', color: 'bg-gold-700' },
];

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-forest-900 pt-32 pb-24 overflow-hidden" aria-labelledby="about-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-50 pointer-events-none" aria-hidden="true"></div>
                {/* Decoration */}
                <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center opacity-5 pointer-events-none" aria-hidden="true">
                    <SixoriaLogo size={500} variant="emblem" />
                </div>
                <div className="container-max relative z-10">
                    <Reveal>
                        <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
                            ✦ SIXORIA SARL
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 id="about-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t('about.hero_title')}
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-cream-200 text-xl max-w-2xl">{t('about.hero_subtitle')}</p>
                    </Reveal>
                </div>
            </section>

            {/* Histoire */}
            <section className="section-padding bg-white" aria-labelledby="story-heading">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal direction="left">
                            <div>
                                <div className="divider-gold mb-6"></div>
                                <h2 id="story-heading" className="section-title mb-6">{t('about.story_title')}</h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>{t('about.story_p1')}</p>
                                    <p>{t('about.story_p2')}</p>
                                    <p>{t('about.story_p3')}</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={150} direction="right">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <SixoriaLogo size={200} variant="emblem" className="animate-float" />
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center">
                                        <div className="bg-forest-50 rounded-2xl px-6 py-3 border border-forest-100 shadow-sm">
                                            <span className="font-display font-bold text-2xl text-forest-800 tracking-widest">SIXORIA</span>
                                            <p className="text-gold-500 text-xs font-semibold tracking-widest mt-0.5">SARL</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Équipe fondatrice */}
            <section className="section-padding bg-cream-50" aria-labelledby="team-heading">
                <div className="container-max">
                    <Reveal className="text-center mb-12 max-w-2xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="team-heading" className="section-title mb-3">{t('about.team_title')}</h2>
                        <p className="section-subtitle">{t('about.team_subtitle')}</p>
                    </Reveal>

                    {/* Notice */}
                    <Reveal className="mb-10">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 max-w-2xl mx-auto">
                            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-sm">{t('about.team_notice')}</p>
                        </div>
                    </Reveal>

                    {/* Cards Associés */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FOUNDERS.map(({ initial, color }, i) => (
                            <Reveal key={i} delay={i * 70}>
                                <div className="card p-6 text-center group hover:shadow-lg transition-all">
                                    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                                        <span className="font-display font-bold text-2xl text-white">{initial}</span>
                                    </div>
                                    <h3 className="font-semibold text-forest-800 mb-1">{t('about.member_placeholder')}</h3>
                                    <p className="text-gray-500 text-sm italic">{t('about.role_placeholder')}</p>
                                    <div className="mt-4 pt-4 border-t border-cream-200">
                                        <span className="badge bg-cream-100 text-gray-500 text-xs">
                                            {t('common.placeholder_info')}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-white" aria-labelledby="mission-heading">
                <div className="container-max">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Reveal direction="left" delay={0}>
                            <div className="card p-8 border-l-4 border-forest-600 h-full">
                                <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-5">
                                    <Target size={24} className="text-forest-600" />
                                </div>
                                <h2 id="mission-heading" className="font-display text-2xl font-bold text-forest-800 mb-4">
                                    {t('about.mission_title')}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{t('about.mission_text')}</p>
                            </div>
                        </Reveal>
                        <Reveal direction="right" delay={100}>
                            <div className="card p-8 border-l-4 border-gold-500 h-full">
                                <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-5">
                                    <Eye size={24} className="text-gold-600" />
                                </div>
                                <h2 className="font-display text-2xl font-bold text-forest-800 mb-4">
                                    {t('about.vision_title')}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{t('about.vision_text')}</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="section-padding bg-forest-900 relative overflow-hidden" aria-labelledby="values-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10">
                    <Reveal className="text-center mb-12">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="values-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                            {t('about.values_title')}
                        </h2>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(['agility', 'trust', 'innovation', 'collaboration', 'proximity', 'excellence'] as const).map((v, i) => (
                            <Reveal key={v} delay={i * 60}>
                                <div className="glass-card p-5 hover:bg-white/15 transition-all group">
                                    <Star size={20} className="text-gold-400 mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-white font-semibold mb-1">{t(`values.${v}.title`)}</h3>
                                    <p className="text-cream-300 text-sm leading-relaxed">{t(`values.${v}.description`)}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-12 bg-cream-50">
                <div className="container-max text-center">
                    <Reveal>
                        <Users size={28} className="text-forest-600 mx-auto mb-4" />
                        <h2 className="font-display text-2xl font-bold text-forest-800 mb-3">{t('about.domain_title')}</h2>
                        <p className="text-gray-600 mb-6">{t('about.domain_text')}</p>
                        <Link to="/contact" className="btn-primary">
                            {t('common.contact_us')} <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
