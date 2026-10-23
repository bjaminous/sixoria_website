import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Package, Monitor, Armchair, MoreHorizontal, ArrowRight, Info } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const TradingPage: React.FC = () => {
    const { t } = useTranslation();

    const categories = [
        { icon: Package, titleKey: 'trading.office_supplies', descKey: 'trading.office_supplies_desc', color: 'bg-forest-50 text-forest-600' },
        { icon: Monitor, titleKey: 'trading.tech_equipment', descKey: 'trading.tech_equipment_desc', color: 'bg-gold-50 text-gold-600' },
        { icon: Armchair, titleKey: 'trading.furniture', descKey: 'trading.furniture_desc', color: 'bg-terracotta-50 text-terracotta-600' },
        { icon: MoreHorizontal, titleKey: 'trading.other', descKey: 'trading.other_desc', color: 'bg-sage-50 text-sage-600' },
    ];

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-forest-900 pt-32 pb-20 overflow-hidden" aria-labelledby="trading-heading">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-600/30 rounded-full blur-3xl"></div>
                </div>
                <div className="container-max relative z-10">
                    <Reveal>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <ShoppingBag size={22} className="text-gold-400" />
                            </div>
                            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30">
                                SIXORIA / {t('nav.trading')}
                            </span>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 id="trading-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t('trading.hero_title')}
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-cream-200 text-xl max-w-2xl">{t('trading.hero_subtitle')}</p>
                    </Reveal>
                </div>
            </section>

            {/* Notice */}
            <section className="bg-amber-50 border-b border-amber-200 py-4">
                <div className="container-max">
                    <div className="flex items-start gap-3">
                        <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-amber-800 text-sm">{t('trading.notice')}</p>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-padding bg-white" aria-labelledby="trading-intro-heading">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal direction="left">
                            <div>
                                <div className="divider-gold mb-6"></div>
                                <h2 id="trading-intro-heading" className="section-title mb-5">{t('trading.intro_title')}</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">{t('trading.intro_text')}</p>
                                <div className="mt-8">
                                    <Link to="/contact" className="btn-primary">
                                        {t('trading.quote_cta')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={150} direction="right">
                            <div className="bg-cream-50 rounded-3xl p-8 border border-cream-200">
                                <ShoppingBag size={48} className="text-gold-500 mb-6" />
                                <h3 className="font-display text-xl font-bold text-forest-800 mb-4">{t('trading.quote_title')}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{t('trading.quote_desc')}</p>
                                <Link to="/contact" className="btn-outline-forest">
                                    {t('trading.quote_cta')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Catégories */}
            <section className="section-padding bg-cream-50" aria-labelledby="categories-heading">
                <div className="container-max">
                    <Reveal className="text-center mb-14 max-w-xl mx-auto">
                        <div className="divider-gold mx-auto mb-4"></div>
                        <h2 id="categories-heading" className="section-title">{t('trading.categories_title')}</h2>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => {
                            const Icon = cat.icon;
                            return (
                                <Reveal key={i} delay={i * 80}>
                                    <div className="card p-6 text-center group hover:shadow-xl transition-all">
                                        <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                            <Icon size={26} />
                                        </div>
                                        <h3 className="font-semibold text-forest-800 mb-2">{t(cat.titleKey)}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{t(cat.descKey)}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Quote */}
            <section className="section-padding bg-forest-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-40 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10 text-center">
                    <Reveal>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('trading.quote_title')}
                        </h2>
                        <p className="text-cream-200 text-lg mb-8 max-w-xl mx-auto">
                            {t('trading.quote_desc')}
                        </p>
                        <Link to="/contact" className="btn-primary text-base px-10 py-4">
                            {t('trading.quote_cta')} <ArrowRight size={18} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default TradingPage;
