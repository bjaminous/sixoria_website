// ============================================================
//  SIXORIA AI — Proxy backend sécurisé (Vercel Serverless Function)
//  Route : /api/chat
//
//  Cette fonction est exécutée côté serveur uniquement.
//  La clé API n'est JAMAIS exposée au navigateur.
//
//  Prérequis :
//  - Configurer OPENROUTER_API_KEY (ou OPENAI_API_KEY) dans les
//    variables d'environnement Vercel (Settings > Environment Variables).
//  - Ne JAMAIS committer de clé API dans le code.
// ============================================================

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Limites de sécurité
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES_IN_HISTORY = 12;
const MAX_SYSTEM_PROMPT_LENGTH = 8000;

// Rate limiting simple en mémoire (réinitialisé au redémarrage du serveur)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // 20 requêtes par minute par IP

function isRateLimited(ip) {
    const now = Date.now();
    const key = ip || 'unknown';
    const record = requestCounts.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

    if (now > record.resetAt) {
        record.count = 1;
        record.resetAt = now + RATE_LIMIT_WINDOW_MS;
    } else {
        record.count++;
    }

    requestCounts.set(key, record);
    return record.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.slice(0, MAX_MESSAGE_LENGTH).trim();
}

function validateMessages(messages) {
    if (!Array.isArray(messages)) return false;
    if (messages.length === 0 || messages.length > MAX_MESSAGES_IN_HISTORY) return false;

    return messages.every((m) => {
        if (typeof m !== 'object' || m === null) return false;
        if (!['user', 'assistant', 'system'].includes(m.role)) return false;
        if (typeof m.content !== 'string' || m.content.length === 0) return false;
        if (m.content.length > MAX_MESSAGE_LENGTH) return false;
        return true;
    });
}

export default async function handler(req, res) {
    // CORS — autoriser uniquement le domaine SIXORIA
    const origin = req.headers.origin || '';
    const allowedOrigins = [
        'https://www.sixoria.cm',
        'https://sixoria.cm',
        'http://localhost:5173',
        'http://localhost:4173',
    ];

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting
    const clientIp =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        'unknown';

    if (isRateLimited(clientIp)) {
        return res.status(429).json({
            error: 'Trop de requêtes. Veuillez patienter avant de réessayer.',
        });
    }

    // Validation du corps de la requête
    const body = req.body;

    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Corps de requête invalide.' });
    }

    const { messages, language, systemPrompt } = body;

    if (!validateMessages(messages)) {
        return res.status(400).json({ error: 'Messages invalides.' });
    }

    if (!['fr', 'en'].includes(language)) {
        return res.status(400).json({ error: 'Langue non supportée.' });
    }

    const sanitizedSystemPrompt = sanitizeString(systemPrompt || '').slice(0, MAX_SYSTEM_PROMPT_LENGTH);

    // Récupérer la clé API et le modèle depuis les variables d'environnement serveur
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

    if (!openrouterKey && !openaiKey) {
        console.error('[SIXORIA AI] Aucune clé API configurée côté serveur.');
        return res.status(503).json({
            error:
                language === 'fr'
                    ? "Notre assistant n'est pas encore configuré. Contactez-nous à contact@sixoria.cm."
                    : "Our assistant is not yet configured. Please contact us at contact@sixoria.cm.",
        });
    }

    // Construire les messages pour l'API
    const apiMessages = [
        { role: 'system', content: sanitizedSystemPrompt },
        ...messages.map((m) => ({
            role: m.role,
            content: sanitizeString(m.content),
        })),
    ];

    try {
        let apiResponse;

        if (openrouterKey) {
            // Via OpenRouter (recommandé — accès à plusieurs modèles)
            apiResponse = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openrouterKey}`,
                    'HTTP-Referer': 'https://www.sixoria.cm',
                    'X-Title': 'SIXORIA AI Assistant',
                },
                body: JSON.stringify({
                    model,
                    messages: apiMessages,
                    max_tokens: 800,
                    temperature: 0.7,
                    stream: false,
                }),
            });
        } else {
            // Via OpenAI directement
            apiResponse = await fetch(OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openaiKey}`,
                },
                body: JSON.stringify({
                    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                    messages: apiMessages,
                    max_tokens: 800,
                    temperature: 0.7,
                }),
            });
        }

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('[SIXORIA AI] Erreur API IA :', apiResponse.status, errorText);
            return res.status(502).json({
                error:
                    language === 'fr'
                        ? 'Notre assistant rencontre momentanément une difficulté. Contactez-nous à contact@sixoria.cm.'
                        : 'Our assistant is temporarily experiencing difficulties. Contact us at contact@sixoria.cm.',
            });
        }

        const data = await apiResponse.json();
        const reply = data.choices?.[0]?.message?.content;

        if (!reply || typeof reply !== 'string') {
            return res.status(502).json({ error: 'Réponse inattendue du modèle IA.' });
        }

        return res.status(200).json({ reply: reply.trim() });
    } catch (error) {
        console.error('[SIXORIA AI] Erreur inattendue :', error);
        return res.status(500).json({
            error:
                language === 'fr'
                    ? 'Une erreur inattendue est survenue. Veuillez réessayer.'
                    : 'An unexpected error occurred. Please try again.',
        });
    }
}
