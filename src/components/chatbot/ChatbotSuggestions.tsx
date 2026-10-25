// ============================================================
//  SIXORIA AI — Composant : suggestions rapides cliquables
// ============================================================

import React from 'react';
import type { SuggestionItem } from '../../types/chatbot';

interface ChatbotSuggestionsProps {
    suggestions: SuggestionItem[];
    onSelect: (message: string) => void;
    language: 'fr' | 'en';
    disabled?: boolean;
}

const ChatbotSuggestions: React.FC<ChatbotSuggestionsProps> = ({
    suggestions,
    onSelect,
    language,
    disabled = false,
}) => {
    return (
        <div className="px-4 pb-3" role="group" aria-label={language === 'fr' ? 'Questions rapides' : 'Quick questions'}>
            <p className="text-xs mb-2.5" style={{ color: 'rgba(0,0,0,0.4)' }}>
                {language === 'fr' ? 'Suggestions rapides' : 'Quick suggestions'}
            </p>
            <div className="grid grid-cols-2 gap-2">
                {suggestions.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => !disabled && onSelect(language === 'en' ? s.messageEn : s.message)}
                        disabled={disabled}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all duration-200 group"
                        style={{
                            background: 'rgba(11,23,48,0.04)',
                            border: '1px solid rgba(11,23,48,0.1)',
                            color: '#0E2147',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            opacity: disabled ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!disabled) {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(212,154,36,0.08)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,154,36,0.3)';
                                (e.currentTarget as HTMLElement).style.color = '#B07D1E';
                            }
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(11,23,48,0.04)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(11,23,48,0.1)';
                            (e.currentTarget as HTMLElement).style.color = '#0E2147';
                        }}
                        aria-label={language === 'en' ? s.labelEn : s.label}
                    >
                        <span className="text-base leading-none">{s.emoji}</span>
                        <span className="leading-tight line-clamp-2">{language === 'en' ? s.labelEn : s.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatbotSuggestions;
