import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight, Users } from 'lucide-react';
import { Reveal } from '../components/Reveal';

// Couleurs par associé
const MEMBER_STYLES = [
    { border: 'border-t-forest-600', avatar: 'bg-forest-100 text-forest-700', badge: 'bg-forest-50 text-forest-700 border-forest-200' },
    { border: 'border-t-gold-500', avatar: 'bg-gold-100 text-gold-700', badge: 'bg-gold-50 text-gold-700 border-gold-200' },
    { border: 'border-t-forest-600', avatar: 'bg-forest-100 text-forest-700', badge: 'bg-forest-50 text-forest-700 border-forest-200' },
    { border: 'border-t-gold-500', avatar: 'bg-gold-100 text-gold-700', badge: 'bg-gold-50 text-gold-700 border-gold-200' },
];

const TeamPage: React.FC = () => {
    const { t } = useTranslation();

    const memberKeys = ['hapsatou', 'inoussa', 'jamila', 'yasmine'] as const;

    return (
        <main id="main-content">
            {/* ===== HERO ===== */}
            <section
                className="relative bg-hero-pattern pt-32 pb-20 overflow-hidden"
                aria-labelledby="team-heading"
            >
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-forest-600/20 blur-3xl" />
                </div>
                <div className="container-max relative z-10">
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
                                ✦ SIXORIA SARL
                            </span>
                            <h1
                                id="team-heading"
                                className="font-display text-4xl md:text-5xl font-bold text-white mb-5"
                            >
                                {t('team.hero_title')}
                            </h1>
                            <p className="text-lg text-cream-300 leading-relaxed">
                                {t('team.hero_subtitle')}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== INTRO ===== */}
            <section className="section-padding bg-cream-50">
                <div className="container-max">
                    <Reveal className="text-center max-w-2xl mx-auto mb-16">
                        <div className="divider-gold mx-auto mb-4" />
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {t('team.intro')}
                        </p>
                    </Reveal>

                    {/* ===== GRILLE DES 4 MEMBRES ===== */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {memberKeys.map((key, i) => {
                            const styles = MEMBER_STYLES[i];
                            const name: string = t(`team.members.${key}.name`);
                            const role: string = t(`team.members.${key}.role`);
                            const email: string = t(`team.members.${key}.email`);
                            const pole: string = t(`team.members.${key}.pole`);
                            const initials = name.charAt(0).toUpperCase();

                            return (
                                <Reveal key={key} delay={i * 100}>
                                    <article
                                        className={`card border-t-4 ${styles.border} p-0 overflow-hidden h-full flex flex-col`}
                                        aria-label={`${name} — ${role}`}
                                    >
                                        {/* Zone photo / avatar */}
                                        <div className="relative bg-cream-100 px-6 pt-8 pb-6 flex flex-col items-center">
                                            <div
                                                className={`w-24 h-24 rounded-2xl ${styles.avatar} flex items-center justify-center text-3xl font-display font-bold mb-4 shadow-sm`}
                                                role="img"
                                                aria-label={t('team.photo_placeholder')}
                                            >
                                                {initials}
                                            </div>
                                            <span className={`badge border text-xs ${styles.badge}`}>
                                                {pole}
                                            </span>
                                        </div>

                                        {/* Infos */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 className="font-display text-xl font-bold text-forest-900 mb-1">
                                                {name}
                                            </h2>
                                            <p className="text-sm text-gray-500 font-medium mb-5 leading-snug">
                                                {role}
                                            </p>

                                            <div className="mt-auto">
                                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
                                                    {t('team.email_label')}
                                                </p>
                                                <a
                                                    href={`mailto:${email}`}
                                                    className="inline-flex items-center gap-2 text-sm text-forest-700 hover:text-gold-600 font-medium transition-colors duration-200 group"
                                                    aria-label={`Envoyer un e-mail à ${name} : ${email}`}
                                                >
                                                    <Mail size={14} className="shrink-0 group-hover:text-gold-500 transition-colors" />
                                                    <span className="break-all">{email}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* ===== 2 ASSOCIÉS EN ATTENTE ===== */}
                    <Reveal delay={400}>
                        <div className="bg-white border border-cream-200 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center shadow-sm">
                            <div className="w-16 h-16 bg-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <Users size={28} className="text-forest-400" />
                            </div>
                            <h2 className="font-display text-xl font-bold text-forest-800 mb-3">
                                {t('team.pending_title')}
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                                {t('team.pending_text')}
                            </p>

                            {/* Avatars placeholder silhouettes */}
                            <div className="flex justify-center gap-4 mb-6">
                                {[0, 1].map(i => (
                                    <div
                                        key={i}
                                        className="w-16 h-16 rounded-2xl bg-cream-200 border-2 border-dashed border-cream-400 flex items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <Users size={20} className="text-cream-400" />
                                    </div>
                                ))}
                            </div>

                            <Link to="/contact" className="btn-outline-forest">
                                {t('team.contact_team')}
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== CONTACTS DE L'ÉQUIPE ===== */}
            <section className="section-padding bg-white" aria-labelledby="team-contacts-heading">
                <div className="container-max max-w-3xl">
                    <Reveal className="text-center mb-10">
                        <div className="divider-gold mx-auto mb-4" />
                        <h2 id="team-contacts-heading" className="section-title mb-2">
                            {t('contact.team_contacts')}
                        </h2>
                        <p className="text-gray-500 text-sm">contact@sixoria.cm</p>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {memberKeys.map((key, i) => {
                            const name: string = t(`team.members.${key}.name`);
                            const role: string = t(`team.members.${key}.role`);
                            const email: string = t(`team.members.${key}.email`);
                            const styles = MEMBER_STYLES[i];

                            return (
                                <Reveal key={key} delay={i * 80}>
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-center gap-4 p-4 rounded-2xl border border-cream-200 hover:border-forest-300 hover:shadow-md transition-all duration-200 group bg-white"
                                        aria-label={`Envoyer un e-mail à ${name}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${styles.avatar} flex items-center justify-center font-bold font-display shrink-0`}>
                                            {name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-forest-900">{name}</p>
                                            <p className="text-xs text-gray-400 truncate">{email}</p>
                                        </div>
                                        <Mail size={15} className="text-gray-300 group-hover:text-gold-500 transition-colors shrink-0" />
                                    </a>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal delay={350} className="text-center mt-8">
                        <Link to="/contact" className="btn-primary">
                            {t('common.contact_us')}
                            <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default TeamPage;
