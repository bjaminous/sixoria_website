// ============================================================
//  SIXORIA AI — Composant : zone de saisie
// ============================================================

import React, { useRef, useEffect } from 'react';
import { Send, RotateCcw } from 'lucide-react';

const MAX_LENGTH = 2000;

interface ChatbotInputProps {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    onClear: () => void;
    isLoading: boolean;
    language: 'fr' | 'en';
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
    value,
    onChange,
    onSend,
    onClear,
    isLoading,
    language,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const charCount = value.length;
    const isOverLimit = charCount > MAX_LENGTH;
    const isEmpty = value.trim() === '';

    // Auto-resize du textarea
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isEmpty && !isLoading && !isOverLimit) {
                onSend();
            }
        }
    };

    const placeholder =
        language === 'fr'
            ? 'Posez votre question… (Entrée pour envoyer)'
            : 'Ask your question… (Enter to send)';

    return (
        <div
            className="shrink-0"
            style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
            {/* Avertissement longueur */}
            {isOverLimit && (
                <div
                    className="px-4 pt-2 text-xs"
                    style={{ color: '#dc2626' }}
                    role="alert"
                >
                    {language === 'fr'
                        ? `Message trop long (${charCount}/${MAX_LENGTH})`
                        : `Message too long (${charCount}/${MAX_LENGTH})`}
                </div>
            )}

            <div className="flex items-end gap-2 px-3 py-3">
                {/* Bouton recommencer */}
                <button
                    onClick={onClear}
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{ color: 'rgba(0,0,0,0.35)', background: 'rgba(0,0,0,0.04)' }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(212,154,36,0.1)';
                        (e.currentTarget as HTMLElement).style.color = '#B07D1E';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.35)';
                    }}
                    aria-label={language === 'fr' ? 'Recommencer la conversation' : 'Restart conversation'}
                    title={language === 'fr' ? 'Nouvelle conversation' : 'New conversation'}
                    disabled={isLoading}
                >
                    <RotateCcw size={15} />
                </button>

                {/* Zone de texte */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        maxLength={MAX_LENGTH + 100} // Un peu au-delà pour afficher l'erreur
                        placeholder={placeholder}
                        disabled={isLoading}
                        className="w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-all duration-150"
                        style={{
                            background: 'rgba(11,23,48,0.04)',
                            border: isOverLimit
                                ? '1.5px solid #dc2626'
                                : '1.5px solid rgba(11,23,48,0.1)',
                            color: '#1e293b',
                            minHeight: '40px',
                            maxHeight: '120px',
                            lineHeight: '1.5',
                        }}
                        onFocus={(e) => {
                            if (!isOverLimit) {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,154,36,0.5)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(212,154,36,0.12)';
                            }
                        }}
                        onBlur={(e) => {
                            if (!isOverLimit) {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(11,23,48,0.1)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            }
                        }}
                        aria-label={language === 'fr' ? 'Champ de message' : 'Message input'}
                    />
                </div>

                {/* Bouton envoyer */}
                <button
                    onClick={onSend}
                    disabled={isEmpty || isLoading || isOverLimit}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{
                        background:
                            isEmpty || isLoading || isOverLimit
                                ? 'rgba(0,0,0,0.08)'
                                : 'linear-gradient(135deg, #D49A24 0%, #B07D1E 100%)',
                        color: isEmpty || isLoading || isOverLimit ? 'rgba(0,0,0,0.3)' : '#ffffff',
                        cursor: isEmpty || isLoading || isOverLimit ? 'not-allowed' : 'pointer',
                        transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isEmpty && !isLoading && !isOverLimit) {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    }}
                    aria-label={language === 'fr' ? 'Envoyer le message' : 'Send message'}
                >
                    {isLoading ? (
                        <div
                            className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                            style={{ borderColor: 'rgba(212,154,36,0.3)', borderTopColor: '#D49A24' }}
                        />
                    ) : (
                        <Send size={16} />
                    )}
                </button>
            </div>

            {/* Mention légale */}
            <div className="px-4 pb-3">
                <p className="text-center text-xs" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    {language === 'fr'
                        ? 'Assistant IA — Les réponses peuvent nécessiter une confirmation par notre équipe.'
                        : 'AI Assistant — Responses may require confirmation from our team.'}
                </p>
            </div>
        </div>
    );
};

export default ChatbotInput;
