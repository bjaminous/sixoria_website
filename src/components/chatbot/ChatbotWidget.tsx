// ============================================================
//  SIXORIA AI — Widget principal (bouton flottant + fenêtre)
// ============================================================

import React, { useEffect, useRef } from 'react';
import { Bot, ChevronUp } from 'lucide-react';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMessages from './ChatbotMessages';
import ChatbotInput from './ChatbotInput';
import { useChatbot } from '../../hooks/useChatbot';

const ChatbotWidget: React.FC = () => {
    const {
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
        suggestions,
        showSuggestions,
        language,
        isDemoMode,
    } = useChatbot();

    const windowRef = useRef<HTMLDivElement>(null);
    const isOpen = chatbotState === 'open';
    const isMinimized = chatbotState === 'minimized';

    // Focus trap et navigation clavier
    useEffect(() => {
        if (isOpen && windowRef.current) {
            // Focus sur le textarea lorsque la fenêtre s'ouvre
            const textarea = windowRef.current.querySelector<HTMLTextAreaElement>('textarea');
            if (textarea) {
                setTimeout(() => textarea.focus(), 100);
            }
        }
    }, [isOpen]);

    // Fermer avec Échap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeChatbot();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeChatbot]);

    const handleSend = () => {
        sendMessage();
    };

    const handleSuggestionSelect = (message: string) => {
        sendMessage(message);
    };

    return (
        <>
            {/* ===== Fenêtre chatbot ===== */}
            <div
                ref={windowRef}
                className="fixed z-50"
                style={{
                    bottom: '90px',
                    right: '24px',
                    width: 'min(380px, calc(100vw - 32px))',
                    maxHeight: 'min(560px, calc(100vh - 120px))',
                    // Transition d'ouverture/fermeture
                    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.2s ease',
                    transformOrigin: 'bottom right',
                }}
                role="dialog"
                aria-modal="true"
                aria-label={language === 'fr' ? 'Assistant SIXORIA AI' : 'SIXORIA AI Assistant'}
                aria-hidden={!isOpen}
            >
                <div
                    className="flex flex-col rounded-2xl overflow-hidden"
                    style={{
                        height: 'min(560px, calc(100vh - 120px))',
                        background: '#F3F5F7',
                        boxShadow:
                            '0 25px 50px rgba(11,23,48,0.25), 0 12px 24px rgba(11,23,48,0.15), 0 0 0 1px rgba(11,23,48,0.08)',
                    }}
                >
                    <ChatbotHeader
                        onClose={closeChatbot}
                        onMinimize={minimizeChatbot}
                        language={language}
                    />

                    <ChatbotMessages
                        messages={messages}
                        isLoading={isLoading}
                        showSuggestions={showSuggestions}
                        suggestions={suggestions}
                        onSuggestionSelect={handleSuggestionSelect}
                        language={language}
                    />

                    <ChatbotInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSend={handleSend}
                        onClear={clearConversation}
                        isLoading={isLoading}
                        language={language}
                    />
                </div>
            </div>

            {/* ===== Bulle minimisée ===== */}
            {isMinimized && (
                <button
                    onClick={openChatbot}
                    className="fixed z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all duration-200"
                    style={{
                        bottom: '90px',
                        right: '24px',
                        background: 'linear-gradient(135deg, #0B1730 0%, #123B2A 100%)',
                        color: '#ffffff',
                        border: '1px solid rgba(212,154,36,0.3)',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    }}
                    aria-label={language === 'fr' ? 'Rouvrir SIXORIA AI' : 'Reopen SIXORIA AI'}
                >
                    <Bot size={18} />
                    <span className="text-sm font-medium">SIXORIA AI</span>
                    <ChevronUp size={16} style={{ color: '#D49A24' }} />
                </button>
            )}

            {/* ===== Bouton flottant principal ===== */}
            {chatbotState === 'idle' && (
                <button
                    onClick={openChatbot}
                    className="fixed z-50 group"
                    style={{ bottom: '24px', right: '24px' }}
                    aria-label={
                        language === 'fr'
                            ? 'Ouvrir SIXORIA AI – Votre assistant virtuel'
                            : 'Open SIXORIA AI – Your virtual assistant'
                    }
                >
                    {/* Tooltip */}
                    <span
                        className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
                        style={{
                            background: '#0B1730',
                            color: '#ffffff',
                            opacity: 0,
                            transform: 'translateY(4px)',
                            transition: 'opacity 0.2s, transform 0.2s',
                        }}
                        aria-hidden="true"
                    >
                        {language === 'fr' ? 'Besoin d\'aide ? Discutez avec SIXORIA AI.' : 'Need help? Chat with SIXORIA AI.'}
                        <span
                            className="absolute top-full right-4 w-0 h-0"
                            style={{
                                borderLeft: '5px solid transparent',
                                borderRight: '5px solid transparent',
                                borderTop: '5px solid #0B1730',
                            }}
                        />
                    </span>

                    {/* Halo lumineux */}
                    <span
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'rgba(212,154,36,0.2)',
                            transform: 'scale(1.3)',
                            animation: 'chatbotPulse 2.5s ease-in-out infinite',
                        }}
                        aria-hidden="true"
                    />

                    {/* Bouton circulaire */}
                    <span
                        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                        style={{
                            background: 'linear-gradient(135deg, #0B1730 0%, #1A4785 50%, #123B2A 100%)',
                            boxShadow: '0 8px 24px rgba(11,23,48,0.4), 0 0 0 1px rgba(212,154,36,0.25)',
                        }}
                    >
                        <Bot size={26} className="text-white" />
                        {/* Indicateur vert */}
                        <span
                            className="absolute top-1 right-1 w-3 h-3 rounded-full border-2"
                            style={{ backgroundColor: '#22c55e', borderColor: '#0B1730' }}
                            aria-hidden="true"
                        />
                    </span>
                </button>
            )}

            {/* ===== Styles inline pour les animations ===== */}
            <style>{`
        @keyframes chatbotDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatbotPulse {
          0%, 100% { transform: scale(1.3); opacity: 0.2; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        .group:hover .group-hover\\:tooltip-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
        </>
    );
};

export default ChatbotWidget;
