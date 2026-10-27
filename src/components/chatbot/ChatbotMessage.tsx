// ============================================================
//  SIXORIA AI — Composant : bulle de message
// ============================================================

import React from 'react';
import {
    AlertCircle,
    Bot,
    ClipboardList,
    Hand,
    Laptop,
    Package,
    Phone,
    Smile,
    Sparkles,
} from 'lucide-react';
import type { ChatMessage } from '../../types/chatbot';

interface ChatbotMessageProps {
    message: ChatMessage;
}

const EMOJI_ICONS = {
    '👋': Hand,
    '😊': Smile,
    '⚠': AlertCircle,
    '⚠️': AlertCircle,
    '✨': Sparkles,
    '💻': Laptop,
    '📦': Package,
    '📋': ClipboardList,
    '📞': Phone,
} as const;

const EMOJI_PATTERN =
    /(?:\p{Regional_Indicator}{2}|[#*0-9]\uFE0F?\u20E3|\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?)*)/gu;

function formatInlineIcons(text: string, key: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(EMOJI_PATTERN)) {
        const emoji = match[0];
        const index = match.index;
        if (index > lastIndex) {
            parts.push(text.slice(lastIndex, index));
        }

        const Icon = EMOJI_ICONS[emoji as keyof typeof EMOJI_ICONS] ?? Sparkles;
        parts.push(
            <Icon
                key={`${key}-icon-${index}`}
                size={15}
                className="mx-0.5 inline-block align-[-2px] text-gold-600"
                aria-hidden="true"
            />
        );
        lastIndex = index + emoji.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
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
                    {formatInlineIcons(trimmed.slice(2, -2), `line-${i}`)}
                </strong>
            );
        } else if (/^\d+\.\s/.test(trimmed)) {
            // Liste numérotée
            elements.push(
                <span key={i} className="block pl-4 text-sm">
                    {formatInlineIcons(trimmed, `line-${i}`)}
                </span>
            );
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            // Liste à puces
            elements.push(
                <span key={i} className="block pl-4 text-sm before:content-['•'] before:mr-2 before:text-gold-500">
                    {formatInlineIcons(trimmed.slice(2), `line-${i}`)}
                </span>
            );
        } else {
            elements.push(
                <span key={i} className="block text-sm leading-relaxed">
                    {formatInlineIcons(trimmed, `line-${i}`)}
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
