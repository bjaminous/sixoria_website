const RESEND_API_URL = 'https://api.resend.com/emails';
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map();
const VALID_POLES = new Set(['digital', 'trading', 'both', 'other']);

function json(res, status, body) {
    return res.status(status).json(body);
}

function isRateLimited(ip) {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now >= record.resetAt) {
        requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    record.count += 1;
    return record.count > MAX_REQUESTS_PER_WINDOW;
}

function isString(value, maxLength) {
    return typeof value === 'string' && value.trim().length <= maxLength;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return json(res, 405, { error: 'Méthode non autorisée.' });
    }

    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return json(res, 400, { error: 'Données de formulaire invalides.' });
    }

    if (typeof body.website === 'string' && body.website.trim()) {
        return json(res, 400, { error: 'Données de formulaire invalides.' });
    }

    const { name, company, email, phone, pole, subject, message } = body;
    const language = body.language === 'en' ? 'en' : 'fr';
    if (
        !isString(name, 120) || !name.trim() ||
        !isString(company, 160) ||
        !isString(email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !isString(phone, 40) ||
        typeof pole !== 'string' || !VALID_POLES.has(pole) ||
        !isString(subject, 160) || !subject.trim() ||
        !isString(message, 5000) || !message.trim()
    ) {
        return json(res, 400, {
            error: language === 'en'
                ? 'Please check the form fields and try again.'
                : 'Vérifiez les champs du formulaire et réessayez.',
        });
    }

    const clientIp =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        'unknown';

    if (isRateLimited(clientIp)) {
        return json(res, 429, {
            error: language === 'en'
                ? 'Too many requests. Please wait before trying again.'
                : 'Trop de demandes. Veuillez patienter avant de réessayer.',
        });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || 'contact@sixoria.cm';

    if (!apiKey || !from) {
        console.error('[SIXORIA contact] RESEND_API_KEY ou CONTACT_FROM_EMAIL non configuré.');
        return json(res, 503, {
            error: language === 'en'
                ? 'The contact form is not configured yet. Please email contact@sixoria.cm.'
                : "Le formulaire n'est pas encore configuré. Écrivez-nous à contact@sixoria.cm.",
        });
    }

    const divisionNames = language === 'en'
        ? {
            digital: 'Digital Division',
            trading: 'Trading Division',
            both: 'Both divisions',
            other: 'Other',
        }
        : {
            digital: 'Pôle Digital',
            trading: 'Pôle Trading',
            both: 'Les deux pôles',
            other: 'Autre',
    };
    const text = [
        `Nom : ${name.trim()}`,
        `E-mail : ${email.trim()}`,
        `Téléphone : ${phone.trim() || 'Non renseigné'}`,
        `Entreprise : ${company.trim() || 'Non renseignée'}`,
        `Service souhaité : ${divisionNames[pole]}`,
        `Objet : ${subject.trim()}`,
        '',
        'Message :',
        message.trim(),
    ].join('\n');

    try {
        const providerResponse = await fetch(RESEND_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to,
                reply_to: email.trim(),
                subject: `SIXORIA — ${subject.trim()}`,
                text,
            }),
        });

        if (!providerResponse.ok) {
            console.error('[SIXORIA contact] Le fournisseur e-mail a refusé la demande:', providerResponse.status);
            return json(res, 502, {
                error: language === 'en'
                    ? 'Sending failed. Please try again or email contact@sixoria.cm.'
                    : "L'envoi a échoué. Réessayez ou écrivez-nous à contact@sixoria.cm.",
            });
        }

        return json(res, 200, { ok: true });
    } catch (error) {
        console.error('[SIXORIA contact] Échec de connexion au fournisseur e-mail:', error);
        return json(res, 502, {
            error: language === 'en'
                ? 'Sending failed. Please try again or email contact@sixoria.cm.'
                : "L'envoi a échoué. Réessayez ou écrivez-nous à contact@sixoria.cm.",
        });
    }
}
