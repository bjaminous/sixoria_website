// ============================================================
//  SIXORIA AI — Composant : zone de messages avec défilement
// ============================================================

import React, { useEffect, useRef } from 'react';
import type { ChatMessage, SuggestionItem } from '../../types/chatbot';
import ChatbotMessage from './ChatbotMessage';
import ChatbotSuggestions from './ChatbotSuggestions';
import { Bot } from 'lucide-react';

interface ChatbotMessagesProps {
    messages: ChatMessage[];
    isLoading: boolean;
    showSuggestions: boolean;
    suggestions: SuggestionItem[];
    onSuggestionSelect: (message: string) => void;
    language: 'fr' | 'en';
}

/** Indicateur de saisie animé (3 points) */
const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-2.5 mb-3 animate-fade-in" aria-live="polite" aria-label="SIXORIA AI réfléchit...">
        <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
            style={{ background: 'linear-gradient(135deg, #D49A24 0%, #B07D1E 100%)' }}
            aria-hidden="true"
        >
            <Bot size={15} className="text-white" />
        </div>
        <div
            className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}
        >
            <div className="flex items-center gap-1.5 h-5">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: '#D49A24',
                            animation: `chatbotDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>
        </div>
    </div>
);

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
    messages,
    isLoading,
    showSuggestions,
    suggestions,
    onSuggestionSelect,
    language,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Défilement automatique vers le bas
    useEffect(() => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        bottomRef.current?.scrollIntoView({ behavior });
    }, [messages, isLoading]);

    return (
        <div
            className="flex-1 overflow-y-auto px-4 pt-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }}
            role="log"
            aria-label={language === 'fr' ? 'Conversation avec SIXORIA AI' : 'Conversation with SIXORIA AI'}
            aria-live="polite"
        >
            <div role="list">
                {messages.map((message) => (
                    <ChatbotMessage key={message.id} message={message} />
                ))}
            </div>

            {isLoading && <TypingIndicator />}

            {showSuggestions && !isLoading && messages.length > 0 && (
                <div className="mt-1 mb-2">
                    <ChatbotSuggestions
                        suggestions={suggestions}
                        onSelect={onSuggestionSelect}
                        language={language}
                        disabled={isLoading}
                    />
                </div>
            )}

            <div ref={bottomRef} aria-hidden="true" />
        </div>
    );
};

export default ChatbotMessages;
