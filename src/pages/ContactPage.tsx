import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Globe, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';

interface FormState {
    name: string;
    company: string;
    email: string;
    phone: string;
    pole: string;
    subject: string;
    message: string;
    website: string;
}

const initialForm: FormState = {
    name: '',
    company: '',
    email: '',
    phone: '',
    pole: '',
    subject: '',
    message: '',
    website: '',
};

const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '237621961547').replace(/\D/g, '');

const ContactPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const pack = searchParams.get('pack');
        if (!pack || !['pme', 'office', 'digital'].includes(pack)) return;

        setForm((current) => ({
            ...current,
            subject: t(`offers.${pack}.title`),
            pole: pack === 'office' ? 'trading' : 'digital',
        }));
    }, [searchParams, t]);

    const validate = (): boolean => {
        const newErrors: Partial<FormState> = {};
        if (!form.name.trim()) newErrors.name = t('contact.required');
        else if (form.name.length > 120) newErrors.name = t('contact.too_long');
        if (!form.email.trim()) newErrors.email = t('contact.required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = t('contact.invalid_email');
        else if (form.email.length > 254) newErrors.email = t('contact.too_long');
        if (!form.pole) newErrors.pole = t('contact.required');
        if (!form.subject.trim()) newErrors.subject = t('contact.required');
        else if (form.subject.length > 160) newErrors.subject = t('contact.too_long');
        if (!form.message.trim()) newErrors.message = t('contact.required');
        else if (form.message.length > 5000) newErrors.message = t('contact.too_long');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setServerError('');
        }
        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    language: i18n.language.startsWith('en') ? 'en' : 'fr',
                }),
            });
            const result = await response.json() as { ok?: unknown; error?: unknown };
            if (!response.ok || result.ok !== true) {
                throw new Error(
                    typeof result.error === 'string' ? result.error : t('contact.contact_error')
                );
            }

            setStatus('success');
            setForm(initialForm);
            setServerError('');
        } catch (error) {
            setServerError(error instanceof Error ? error.message : t('contact.contact_error'));
            setStatus('error');
        }
    };

    const inputClass = (field: keyof FormState) =>
        `input-field ${errors[field] ? 'border-red-400 ring-1 ring-red-300' : ''}`;

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="relative bg-gradient-sixoria pt-32 pb-20 overflow-hidden" aria-labelledby="contact-heading">
                <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" aria-hidden="true"></div>
                <div className="container-max relative z-10 text-center">
                    <Reveal>
                        <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
                            ✦ SIXORIA SARL
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 id="contact-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {t('contact.hero_title')}
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-cream-200 text-xl max-w-xl mx-auto">{t('contact.hero_subtitle')}</p>
                    </Reveal>
                </div>
            </section>

            {/* EmailJS Notice */}
            

            {/* Content */}
            <section className="section-padding bg-cream-50">
                <div className="container-max">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar infos */}
                        <Reveal direction="left" className="lg:col-span-1">
                            <div className="space-y-8">
                                {/* Contact */}
                                <div className="card p-6">
                                    <h2 className="font-display text-xl font-bold text-forest-800 mb-5">Coordonnées</h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-9 h-9 bg-forest-50 rounded-xl flex items-center justify-center shrink-0">
                                                <Mail size={16} className="text-forest-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{t('contact.email_label')}</p>
                                                <a href="mailto:contact@sixoria.cm" className="text-forest-700 text-sm font-medium hover:text-gold-600 transition-colors">
                                                    contact@sixoria.cm
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-9 h-9 bg-forest-50 rounded-xl flex items-center justify-center shrink-0">
                                                <Globe size={16} className="text-forest-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{t('contact.website_label')}</p>
                                                <a href="https://www.sixoria.cm" target="_blank" rel="noopener noreferrer" className="text-forest-700 text-sm font-medium hover:text-gold-600 transition-colors">
                                                    www.sixoria.cm
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-9 h-9 bg-forest-50 rounded-xl flex items-center justify-center shrink-0">
                                                <MapPin size={16} className="text-forest-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{t('contact.location_label')}</p>
                                                <span className="text-forest-700 text-sm font-medium">{t('contact.location_value')}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* WhatsApp */}
                                <div className="card p-6 border-2 border-[#25D366]/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MessageCircle size={20} className="text-[#25D366]" />
                                        <h3 className="font-semibold text-forest-800">WhatsApp</h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-4">{t('contact.whatsapp_notice')}</p>
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 w-full justify-center py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors text-sm"
                                        aria-label={t('contact.whatsapp_cta')}
                                    >
                                        <MessageCircle size={16} />
                                        {t('contact.whatsapp_cta')}
                                    </a>
                                </div>

                                {/* Devis rapide */}
                                <div className="card p-6 bg-forest-50 border border-forest-100">
                                    <h3 className="font-semibold text-forest-800 mb-2">{t('contact.quote_title')}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{t('contact.quote_desc')}</p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Form */}
                        <Reveal delay={150} direction="right" className="lg:col-span-2">
                            <div className="card p-8 md:p-10">
                                <h2 className="font-display text-2xl font-bold text-forest-800 mb-8">
                                    {t('contact.form_title')}
                                </h2>

                                {status === 'success' ? (
                                    <div className="text-center py-16">
                                        <CheckCircle size={56} className="text-forest-500 mx-auto mb-5" />
                                        <h3 className="font-display text-2xl font-bold text-forest-800 mb-3">
                                            {t('contact.success_title')}
                                        </h3>
                                        <p className="text-gray-600 mb-8">{t('contact.success_text')}</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="btn-outline-forest"
                                        >
                                            Envoyer un autre message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                                            <label htmlFor="website">{t('contact.honeypot_label')}</label>
                                            <input
                                                id="website"
                                                name="website"
                                                type="text"
                                                value={form.website}
                                                onChange={handleChange}
                                                disabled={status === 'sending'}
                                                autoComplete="off"
                                                tabIndex={-1}
                                            />
                                        </div>
                                        {status === 'error' && (
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3" role="alert">
                                                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                                                <p className="text-red-700 text-sm">{serverError || t('contact.contact_error')}</p>
                                            </div>
                                        )}

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {/* Nom */}
                                            <div>
                                                <label htmlFor="name" className="label-field">
                                                    {t('contact.name')} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    maxLength={120}
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className={inputClass('name')}
                                                    placeholder="Jean Dupont"
                                                    autoComplete="name"
                                                    aria-required="true"
                                                    aria-invalid={!!errors.name}
                                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                                />
                                                {errors.name && (
                                                    <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>
                                                )}
                                            </div>

                                            {/* Entreprise */}
                                            <div>
                                                <label htmlFor="company" className="label-field">{t('contact.company')}</label>
                                                <input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    maxLength={160}
                                                    value={form.company}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className="input-field"
                                                    placeholder="Ma Société SARL"
                                                    autoComplete="organization"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="label-field">
                                                    {t('contact.email')} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    maxLength={254}
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className={inputClass('email')}
                                                    placeholder="nom@exemple.cm"
                                                    autoComplete="email"
                                                    aria-required="true"
                                                    aria-invalid={!!errors.email}
                                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                                />
                                                {errors.email && (
                                                    <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Téléphone */}
                                            <div>
                                                <label htmlFor="phone" className="label-field">{t('contact.phone')}</label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    maxLength={40}
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className="input-field"
                                                    placeholder="+237 6XX XXX XXX"
                                                    autoComplete="tel"
                                                />
                                            </div>

                                            {/* Pôle */}
                                            <div>
                                                <label htmlFor="pole" className="label-field">
                                                    {t('contact.pole')} <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    id="pole"
                                                    name="pole"
                                                    value={form.pole}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className={inputClass('pole')}
                                                    aria-required="true"
                                                    aria-invalid={!!errors.pole}
                                                >
                                                    <option value="">{t('contact.select_placeholder')}</option>
                                                    <option value="digital">{t('contact.pole_digital')}</option>
                                                    <option value="trading">{t('contact.pole_trading')}</option>
                                                    <option value="both">{t('contact.pole_both')}</option>
                                                    <option value="other">{t('contact.pole_other')}</option>
                                                </select>
                                                {errors.pole && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.pole}</p>
                                                )}
                                            </div>

                                            {/* Objet */}
                                            <div>
                                                <label htmlFor="subject" className="label-field">
                                                    {t('contact.subject')} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="subject"
                                                    name="subject"
                                                    type="text"
                                                    maxLength={160}
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    disabled={status === 'sending'}
                                                    className={inputClass('subject')}
                                                    placeholder="Demande de devis"
                                                    aria-required="true"
                                                    aria-invalid={!!errors.subject}
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="label-field">
                                                {t('contact.message')} <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                maxLength={5000}
                                                value={form.message}
                                                onChange={handleChange}
                                                disabled={status === 'sending'}
                                                className={inputClass('message')}
                                                placeholder="Décrivez votre projet ou votre besoin..."
                                                aria-required="true"
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                            />
                                            {errors.message && (
                                                <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === 'sending' ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    {t('contact.submitting')}
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    {t('contact.submit')}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
