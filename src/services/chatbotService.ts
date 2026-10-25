// ============================================================
//  SIXORIA AI — Service de communication avec l'API IA (frontend)
//  Les clés API ne sont JAMAIS exposées ici.
//  Toute communication passe par le proxy backend sécurisé.
// ============================================================

import type { ChatMessage } from '../types/chatbot';

export interface ChatAPIRequest {
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    language: 'fr' | 'en';
    systemPrompt: string;
}

export interface ChatAPIResponse {
    reply: string;
    error?: string;
}

// URL du proxy backend — configurable via variable d'environnement
const API_BASE_URL = import.meta.env.VITE_CHATBOT_API_URL || '/api/chat';

// Limite de messages conservés dans le contexte envoyé à l'API
const MAX_CONTEXT_MESSAGES = 10;

// Timeout pour les requêtes API (ms)
const REQUEST_TIMEOUT = 30_000;

/**
 * Envoie les messages au backend sécurisé et retourne la réponse du modèle.
 */
export async function sendChatMessage(
    messages: ChatMessage[],
    language: 'fr' | 'en',
    systemPrompt: string,
    signal?: AbortSignal
): Promise<string> {
    // Garder les N derniers messages pour le contexte
    const recentMessages = messages.slice(-MAX_CONTEXT_MESSAGES);

    const payload: ChatAPIRequest = {
        messages: recentMessages.map((m) => ({
            role: m.role as 'user' | 'assistant' | 'system',
            content: m.content,
        })),
        language,
        systemPrompt,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const combinedSignal = signal || controller.signal;

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: combinedSignal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
            const errorMsg = typeof errorData.error === 'string' ? errorData.error : `Erreur HTTP ${response.status}`;
            throw new Error(errorMsg);
        }

        const data = await response.json() as ChatAPIResponse;

        if (data.error) {
            throw new Error(data.error);
        }

        return data.reply;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('timeout');
            }
            throw error;
        }
        throw new Error('unknown_error');
    }
}

/**
 * Génère un ID unique pour les messages et sessions.
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clé de stockage pour l'historique de session.
 */
export const SESSION_STORAGE_KEY = 'sixoria_chat_session';

/**
 * Sauvegarde la session dans le sessionStorage (temporaire, effacé à la fermeture).
 */
export function saveSessionToStorage(messages: ChatMessage[]): void {
    try {
        const serialized = JSON.stringify(
            messages.map((m) => ({
                ...m,
                timestamp: m.timestamp.toISOString(),
            }))
        );
        sessionStorage.setItem(SESSION_STORAGE_KEY, serialized);
    } catch {
        // Ignore les erreurs de stockage
    }
}

/**
 * Charge la session depuis le sessionStorage.
 */
export function loadSessionFromStorage(): ChatMessage[] {
    try {
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored) as Array<Omit<ChatMessage, 'timestamp'> & { timestamp: string }>;
        return parsed.map((m) => ({
            ...m,
            timestamp: new Date(m.timestamp),
        }));
    } catch {
        return [];
    }
}

/**
 * Efface la session du stockage.
 */
export function clearSessionStorage(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
