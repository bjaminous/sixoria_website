// ============================================================
//  SIXORIA AI — Composant : bulle de message
// ============================================================

import React from 'react';
import { Bot, AlertCircle } from 'lucide-react';
import type { ChatMessage } from '../../types/chatbot';

interface ChatbotMessageProps {
    message: ChatMessage;
}

/** Formate le contenu en remplaçant les sauts de ligne par des <br> et détectant les listes markdown */
function formatContent(content: string): React.ReactNode {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, i) => {
        const trimmed = line.trim();

        if (trimmed === '') {
            elements.push(<span key={i} className="block h-2" />);
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            // Titre gras
            elements.push(
                <strong key={i} className="block font-semibold text-forest-900 mt-1">
                    {trimmed.slice(2, -2)}
                </strong>
            );
        } else if (/^\d+\.\s/.test(trimmed)) {
            // Liste numérotée
            elements.push(
                <span key={i} className="block pl-4 text-sm">
                    {trimmed}
                </span>
            );
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            // Liste à puces
            elements.push(
                <span key={i} className="block pl-4 text-sm before:content-['•'] before:mr-2 before:text-gold-500">
                    {trimmed.slice(2)}
                </span>
            );
        } else {
            elements.push(
                <span key={i} className="block text-sm leading-relaxed">
                    {trimmed}
                </span>
            );
        }
    });

    return <>{elements}</>;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const isError = message.isError;

    const time = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    if (isUser) {
        return (
            <div className="flex justify-end mb-3 animate-slide-up" role="listitem">
                <div className="max-w-[80%]">
                    <div
                        className="px-4 py-3 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed"
                        style={{ background: 'linear-gradient(135deg, #1A4785 0%, #0E2147 100%)' }}
                    >
                        {message.content}
                    </div>
                    <p className="text-right text-xs mt-1 mr-1" style={{ color: 'rgba(0,0,0,0.35)' }}>
                        {time}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2.5 mb-3 animate-slide-up" role="listitem">
            {/* Avatar assistant */}
            <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                style={{
                    background: isError
                        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        : 'linear-gradient(135deg, #D49A24 0%, #B07D1E 100%)',
                }}
                aria-hidden="true"
            >
                {isError ? <AlertCircle size={15} className="text-white" /> : <Bot size={15} className="text-white" />}
            </div>

            <div className="max-w-[82%]">
                <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm"
                    style={{
                        background: isError ? '#fef2f2' : '#ffffff',
                        border: isError ? '1px solid #fecaca' : '1px solid rgba(0,0,0,0.07)',
                        color: isError ? '#991b1b' : '#1e293b',
                    }}
                >
                    <div className={isError ? 'text-sm text-red-800' : 'text-gray-800'}>
                        {formatContent(message.content)}
                    </div>
                </div>
                <p className="text-xs mt-1 ml-1" style={{ color: 'rgba(0,0,0,0.35)' }}>
                    SIXORIA AI — {time}
                </p>
            </div>
        </div>
    );
};

export default ChatbotMessage;
