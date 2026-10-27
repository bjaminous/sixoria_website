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
        id: 'services',
        icon: 'sparkles',
        label: 'Découvrir nos services',
        labelEn: 'Discover our services',
        message: 'Quels services propose SIXORIA ?',
        messageEn: 'What services does SIXORIA offer?',
    },
    {
        id: 'digital',
        icon: 'monitor',
        label: 'Découvrir le Pôle Digital',
        labelEn: 'Discover the Digital Division',
        message: 'Pouvez-vous me présenter le Pôle Digital de SIXORIA et ses services ?',
        messageEn: 'Can you tell me about the SIXORIA Digital Division and its services?',
    },
    {
        id: 'trading',
        icon: 'package',
        label: 'Découvrir le Pôle Trading',
        labelEn: 'Discover the Trading Division',
        message: 'Quels produits et services propose le Pôle Trading de SIXORIA ?',
        messageEn: 'What products and services does the SIXORIA Trading Division offer?',
    },
    {
        id: 'quote',
        icon: 'clipboard-list',
        label: 'Demander un devis',
        labelEn: 'Request a quote',
        message: "Je souhaite demander un devis pour un projet. Pouvez-vous m'aider ?",
        messageEn: 'I would like to request a quote for a project. Can you help me?',
    },
    {
        id: 'contact',
        icon: 'phone',
        label: 'Contacter notre équipe',
        labelEn: 'Contact our team',
        message: "Comment puis-je contacter l'équipe SIXORIA ?",
        messageEn: 'How can I contact the SIXORIA team?',
    },
];

// ============================================================
//  Réponses de démonstration (mode sans API)
// ============================================================
function getDemoResponse(message: string, language: 'fr' | 'en'): string {
    const msg = message.toLowerCase();

    if (language === 'en') {
        if (msg.includes('digital') || msg.includes('web') || msg.includes('app')) {
            return "SIXORIA's **Digital Division** offers:\n\n• Custom website creation (showcase, e-commerce)\n• Business process automation\n• Digital support and training\n• Software and platform deployment (CRM, ERP)\n\n⚠️ *Demo mode* — Responses are based on official SIXORIA data. To enable the AI assistant, configure the API key server-side.\n\nWould you like to know more about one of these services?";
        }
        if (msg.includes('trading') || msg.includes('product') || msg.includes('equipment')) {
            return "SIXORIA's **Trading Division** specializes in sourcing, distribution, and supply of products for businesses and institutions.\n\nProduct categories:\n• Office supplies\n• IT equipment\n• Professional furniture\n\n⚠️ *Demo mode* — Prices and availability must be confirmed by the SIXORIA team.\n\nWould you like to request a quote?";
        }
        if (msg.includes('quote') || msg.includes('price') || msg.includes('cost')) {
            return "I'd be happy to help you prepare a quote request!\n\nCould you tell me more about your project?\n1. Showcase website\n2. E-commerce site\n3. Web application\n4. Office equipment\n5. Other\n\n⚠️ *Demo mode* — To send a complete quote request, use the contact form on our site or write to contact@sixoria.cm";
        }
        if (msg.includes('contact') || msg.includes('team') || msg.includes('email')) {
            return "To contact the SIXORIA team:\n\n• **General**: contact@sixoria.cm\n• **Technical (Jamila)**: beulguibe@sixoria.cm\n• **Administrative (Yasmine)**: ladi@sixoria.cm\n• **Strategy (Inoussa)**: inoussa@sixoria.cm\n• **Management (Hapsatou)**: hapsatou@sixoria.cm\n\n⚠️ *Demo mode* — For a real conversation with our AI, ask your administrator to configure the API key.";
        }
        return "Thank you for your message! 😊\n\n⚠️ **Demo mode** — SIXORIA AI is currently running without an AI connection.\n\nI can answer questions about:\n• Our Digital Division\n• Our Trading Division\n• Quote requests\n• Contact information\n\nWhat would you like to know?";
    }

    // French responses
    if (msg.includes('digital') || msg.includes('web') || msg.includes('site') || msg.includes('application') || msg.includes('numérique')) {
        return "Le **Pôle Digital de SIXORIA** propose :\n\n• Création de sites web sur mesure (vitrine, e-commerce)\n• Automatisation de processus métier\n• Accompagnement numérique et formation\n• Déploiement de logiciels et plateformes (CRM, ERP)\n\n⚠️ *Mode démonstration* — Les réponses sont basées sur les données officielles SIXORIA. Pour activer l'assistant IA complet, configurez la clé API côté serveur.\n\nSouhaitez-vous en savoir plus sur l'un de ces services ?";
    }
    if (msg.includes('trading') || msg.includes('produit') || msg.includes('équipement') || msg.includes('mobilier') || msg.includes('fourniture')) {
        return "Le **Pôle Trading de SIXORIA** se spécialise dans le sourcing, la distribution et la fourniture de produits pour les entreprises et institutions.\n\nCatégories de produits :\n• Fournitures de bureau\n• Équipement informatique\n• Mobilier professionnel\n\n⚠️ *Mode démonstration* — Les prix et disponibilités sont à confirmer par l'équipe SIXORIA.\n\nSouhaitez-vous demander un devis ?";
    }
    if (msg.includes('devis') || msg.includes('prix') || msg.includes('coût') || msg.includes('tarif')) {
        return "Je serais ravi de vous aider à préparer une demande de devis !\n\nPourriez-vous me preciser votre besoin ?\n1. Site vitrine\n2. Boutique en ligne\n3. Application web\n4. Équipement de bureau\n5. Autre\n\n⚠️ *Mode démonstration* — Pour envoyer une demande de devis complète, utilisez le formulaire de contact sur notre site ou écrivez à contact@sixoria.cm";
    }
    if (msg.includes('contact') || msg.includes('équipe') || msg.includes('email') || msg.includes('joindre') || msg.includes('appeler')) {
        return "Pour contacter l'équipe SIXORIA :\n\n• **Général** : contact@sixoria.cm\n• **Technique (Jamila)** : beulguibe@sixoria.cm\n• **Administratif (Yasmine)** : ladi@sixoria.cm\n• **Stratégie (Inoussa)** : inoussa@sixoria.cm\n• **Direction (Hapsatou)** : hapsatou@sixoria.cm\n\n⚠️ *Mode démonstration* — Pour une vraie conversation avec notre IA, demandez à votre administrateur de configurer la clé API.";
    }
    if (msg.includes('bonjour') || msg.includes('bonsoir') || msg.includes('salut') || msg.includes('hello')) {
        return "Bonjour ! 👋 Je suis SIXORIA AI, votre assistant virtuel.\n\nJe suis en **mode démonstration** (sans connexion IA active), mais je peux tout de même vous renseigner sur :\n• Nos services du Pôle Digital\n• Nos produits du Pôle Trading\n• Les demandes de devis\n• Nos coordonnées\n\nComment puis-je vous aider aujourd'hui ?";
    }
    return "Merci pour votre message ! 😊\n\n⚠️ **Mode démonstration** — SIXORIA AI fonctionne actuellement sans connexion IA.\n\nJe peux répondre à vos questions sur :\n• Notre Pôle Digital\n• Notre Pôle Trading\n• Les demandes de devis\n• Nos coordonnées\n\nQue souhaitez-vous savoir ?";
}

export interface UseChatbotReturn {
    chatbotState: ChatbotState;
    openChatbot: () => void;
    closeChatbot: () => void;
    minimizeChatbot: () => void;
    messages: ChatMessage[];
    isLoading: boolean;
    inputValue: string;
    setInputValue: (v: string) => void;
    sendMessage: (content?: string) => Promise<void>;
    clearConversation: () => void;
    suggestions: SuggestionItem[];
    showSuggestions: boolean;
    language: 'fr' | 'en';
    lastError: string | null;
    isDemoMode: boolean;
}

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
    const [isDemoMode, setIsDemoMode] = useState(true);

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

    // Message d'accueil
    const getWelcomeMessage = useCallback((): ChatMessage => {
        const content =
            language === 'en'
                ? `Hello 👋 Welcome to SIXORIA!\n\nI'm SIXORIA AI, your virtual assistant.\n\nHow can I help you today?`
                : `Bonjour 👋 Bienvenue chez SIXORIA !\n\nJe suis SIXORIA AI, votre assistant virtuel.\n\nComment puis-je vous accompagner aujourd'hui ?`;

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
        setMessages((prev) => {
            if (prev.length === 0) return [getWelcomeMessage()];
            return prev;
        });
    }, [getWelcomeMessage, hasLoadedSession]);

    const closeChatbot = useCallback(() => {
        setChatbotState('idle');
        if (abortControllerRef.current) abortControllerRef.current.abort();
    }, []);

    const minimizeChatbot = useCallback(() => {
        setChatbotState('minimized');
    }, []);

    const clearConversation = useCallback(() => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        setMessages([getWelcomeMessage()]);
        setShowSuggestions(true);
        setLastError(null);
        setInputValue('');
        setIsDemoMode(true);
        clearSessionStorage();
    }, [getWelcomeMessage]);

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

            if (abortControllerRef.current) abortControllerRef.current.abort();

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
                setIsDemoMode(false);
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') return;

                // Basculer en mode démo si l'API n'est pas disponible
                const demoReply = getDemoResponse(text, language);
                const demoMessage: ChatMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: demoReply,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, demoMessage]);
                setIsDemoMode(true);
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
        isDemoMode,
    };
}
