// ============================================================
//  SIXORIA AI — Composant : en-tête de la fenêtre chatbot
// ============================================================

import React from 'react';
import { X, Minus, Bot } from 'lucide-react';
import SixoriaLogo from '../SixoriaLogo';

interface ChatbotHeaderProps {
    onClose: () => void;
    onMinimize: () => void;
    language: 'fr' | 'en';
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ onClose, onMinimize, language }) => {
    return (
        <div
            className="chatbot-header flex items-center justify-between px-4 py-3"
            style={{
                background: 'linear-gradient(135deg, #0B1730 0%, #123B2A 60%, #0B1730 100%)',
                borderBottom: '1px solid rgba(212,154,36,0.3)',
            }}
        >
            {/* Identité */}
            <div className="flex items-center gap-3">
                {/* Avatar IA */}
                <div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D49A24 0%, #B07D1E 100%)' }}
                    aria-hidden="true"
                >
                    <Bot size={20} className="text-white" />
                    {/* Indicateur de disponibilité */}
                    <span
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                        style={{ backgroundColor: '#22c55e', borderColor: '#0B1730' }}
                        aria-label={language === 'fr' ? 'En ligne' : 'Online'}
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm leading-tight">SIXORIA AI</span>
                        <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: 'rgba(212,154,36,0.2)', color: '#D49A24', border: '1px solid rgba(212,154,36,0.3)' }}
                        >
                            {language === 'fr' ? 'En ligne' : 'Online'}
                        </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {language === 'fr' ? 'Assistant virtuel' : 'Virtual assistant'}
                    </p>
                </div>
            </div>

            {/* Logo SIXORIA centré */}
            <div className="absolute left-1/2 -translate-x-1/2 opacity-60" aria-hidden="true">
                <SixoriaLogo className="h-6 w-auto" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 relative z-10">
                <button
                    onClick={onMinimize}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    aria-label={language === 'fr' ? 'Réduire le chatbot' : 'Minimize chatbot'}
                    title={language === 'fr' ? 'Réduire' : 'Minimize'}
                >
                    <Minus size={16} />
                </button>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.2)';
                        (e.currentTarget as HTMLElement).style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    }}
                    aria-label={language === 'fr' ? 'Fermer le chatbot' : 'Close chatbot'}
                    title={language === 'fr' ? 'Fermer' : 'Close'}
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default ChatbotHeader;
