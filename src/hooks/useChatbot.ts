// ============================================================
//  SIXORIA AI — Hook principal du chatbot
// ============================================================

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage, ChatbotState, SuggestionItem } from '../types/chatbot';
import {
    sendChatMessage,
    generateId,
    saveSessionToStorage,
    loadSessionFromStorage,
    clearSessionStorage,
} from '../services/chatbotService';
import { buildSystemPrompt } from '../data/sixoriaKnowledge';

// Longueur maximale d'un message utilisateur
const MAX_MESSAGE_LENGTH = 2000;

// Suggestions initiales affichées au premier ouverture
const SUGGESTIONS: SuggestionItem[] = [
    {
        id: 'digital',
        emoji: '💻',
        label: 'Découvrir le Pôle Digital',
        labelEn: 'Discover the Digital Division',
        message: 'Pouvez-vous me présenter le Pôle Digital de SIXORIA et ses services ?',
        messageEn: 'Can you tell me about the SIXORIA Digital Division and its services?',
    },
    {
        id: 'trading',
        emoji: '📦',
        label: 'Découvrir le Pôle Trading',
        labelEn: 'Discover the Trading Division',
        message: 'Quels produits et services propose le Pôle Trading de SIXORIA ?',
        messageEn: 'What products and services does the SIXORIA Trading Division offer?',
    },
    {
        id: 'quote',
        emoji: '📋',
        label: 'Demander un devis',
        labelEn: 'Request a quote',
        message: "Je souhaite demander un devis pour un projet. Pouvez-vous m'aider ?",
        messageEn: 'I would like to request a quote for a project. Can you help me?',
    },
    {
        id: 'contact',
        emoji: '📞',
        label: 'Contacter notre équipe',
        labelEn: 'Contact our team',
        message: 'Comment puis-je contacter l\'équipe SIXORIA ?',
        messageEn: 'How can I contact the SIXORIA team?',
    },
];

export interface UseChatbotReturn {
    // État de la fenêtre
    chatbotState: ChatbotState;
    openChatbot: () => void;
    closeChatbot: () => void;
    minimizeChatbot: () => void;

    // Messages
    messages: ChatMessage[];
    isLoading: boolean;
    inputValue: string;
    setInputValue: (v: string) => void;

    // Actions
    sendMessage: (content?: string) => Promise<void>;
    clearConversation: () => void;

    // Suggestions
    suggestions: SuggestionItem[];
    showSuggestions: boolean;

    // Langue
    language: 'fr' | 'en';

    // Erreur
    lastError: string | null;
}

import type { SuggestionItem as SI } from '../types/chatbot';
export type { SI as SuggestionItemType };

export function useChatbot(): UseChatbotReturn {
    const { i18n } = useTranslation();
    const language = (i18n.language?.startsWith('en') ? 'en' : 'fr') as 'fr' | 'en';

    const [chatbotState, setChatbotState] = useState<ChatbotState>('idle');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [lastError, setLastError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [hasLoadedSession, setHasLoadedSession] = useState(false);

    const abortControllerRef = useRef<AbortController | null>(null);

    // Charger la session au premier ouverture
    useEffect(() => {
        if (!hasLoadedSession) {
            const stored = loadSessionFromStorage();
            if (stored.length > 0) {
                setMessages(stored);
                setShowSuggestions(false);
            }
            setHasLoadedSession(true);
        }
    }, [hasLoadedSession]);

    // Sauvegarder la session à chaque changement
    useEffect(() => {
        if (messages.length > 0) {
            saveSessionToStorage(messages);
        }
    }, [messages]);

    // Message d'accueil en fonction de la langue
    const getWelcomeMessage = useCallback((): ChatMessage => {
        const content =
            language === 'en'
                ? `Hello 👋! Welcome to SIXORIA SARL.\n\nI'm SIXORIA AI, your virtual assistant.\n\nI'm here to guide you through our services and help you find the solutions that best fit your needs.\n\nHow can I help you today?`
                : `Bonjour 👋 ! Bienvenue chez SIXORIA SARL.\n\nJe suis SIXORIA AI, votre assistant virtuel.\n\nJe suis ici pour vous accompagner dans la découverte de nos services et vous aider à trouver les solutions adaptées à vos besoins.\n\nComment puis-je vous aider aujourd'hui ?`;

        return {
            id: generateId(),
            role: 'assistant',
            content,
            timestamp: new Date(),
        };
    }, [language]);

    const openChatbot = useCallback(() => {
        setChatbotState('open');
        if (!hasLoadedSession) return;
        // Si aucun message, afficher le message d'accueil
        setMessages((prev) => {
            if (prev.length === 0) {
                return [getWelcomeMessage()];
            }
            return prev;
        });
    }, [getWelcomeMessage, hasLoadedSession]);

    const closeChatbot = useCallback(() => {
        setChatbotState('idle');
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    const minimizeChatbot = useCallback(() => {
        setChatbotState('minimized');
    }, []);

    const clearConversation = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setMessages([getWelcomeMessage()]);
        setShowSuggestions(true);
        setLastError(null);
        setInputValue('');
        clearSessionStorage();
    }, [getWelcomeMessage]);

    // Ouvrir avec message d'accueil quand on change d'état idle → open
    useEffect(() => {
        if (chatbotState === 'open' && hasLoadedSession && messages.length === 0) {
            setMessages([getWelcomeMessage()]);
        }
    }, [chatbotState, hasLoadedSession, messages.length, getWelcomeMessage]);

    const sendMessage = useCallback(
        async (content?: string) => {
            const text = (content ?? inputValue).trim();

            if (!text) return;
            if (text.length > MAX_MESSAGE_LENGTH) {
                setLastError(
                    language === 'fr'
                        ? `Votre message est trop long. Maximum ${MAX_MESSAGE_LENGTH} caractères.`
                        : `Your message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`
                );
                return;
            }

            if (isLoading) return;

            // Annuler requête précédente
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            setLastError(null);
            setShowSuggestions(false);
            setInputValue('');

            const userMessage: ChatMessage = {
                id: generateId(),
                role: 'user',
                content: text,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            const controller = new AbortController();
            abortControllerRef.current = controller;

            try {
                const systemPrompt = buildSystemPrompt(language);
                const currentMessages = [...messages, userMessage];
                const reply = await sendChatMessage(currentMessages, language, systemPrompt, controller.signal);

                const assistantMessage: ChatMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: reply,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }

                const isTimeout = error instanceof Error && error.message === 'timeout';
                const errorContent =
                    language === 'fr'
                        ? isTimeout
                            ? "Notre assistant met trop de temps à répondre. Veuillez réessayer ou contacter notre équipe à contact@sixoria.cm."
                            : "Notre assistant rencontre momentanément une difficulté. Vous pouvez contacter directement notre équipe à contact@sixoria.cm."
                        : isTimeout
                            ? "Our assistant is taking too long to respond. Please try again or contact our team at contact@sixoria.cm."
                            : "Our assistant is temporarily experiencing difficulties. You can contact our team directly at contact@sixoria.cm.";

                const errorMessage: ChatMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: errorContent,
                    timestamp: new Date(),
                    isError: true,
                };

                setMessages((prev) => [...prev, errorMessage]);
                setLastError(errorContent);
            } finally {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        },
        [inputValue, isLoading, messages, language]
    );

    return {
        chatbotState,
        openChatbot,
        closeChatbot,
        minimizeChatbot,
        messages,
        isLoading,
        inputValue,
        setInputValue,
        sendMessage,
        clearConversation,
        suggestions: SUGGESTIONS,
        showSuggestions,
        language,
        lastError,
    };
}
