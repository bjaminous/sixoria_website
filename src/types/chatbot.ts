// ============================================================
//  SIXORIA AI — Types du chatbot
// ============================================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    isError?: boolean;
}

export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
    language: 'fr' | 'en';
}

export type ChatbotState = 'idle' | 'open' | 'minimized';

export interface QuoteRequest {
    projectType?: string;
    projectSubtype?: string;
    features?: string;
    budget?: string;
    timeline?: string;
    companyName?: string;
    email?: string;
    additionalInfo?: string;
}

export interface SuggestionItem {
    id: string;
    emoji: string;
    label: string;
    labelEn: string;
    message: string;
    messageEn: string;
}
