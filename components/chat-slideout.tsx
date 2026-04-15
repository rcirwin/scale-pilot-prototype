'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { chatDemos } from '@/data/chat-demos';

interface ChatSlideoutProps {
  open: boolean;
  onClose: () => void;
  contextTitle: string;
  contextDetail: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatSlideout({ open, onClose, contextTitle, contextDetail }: ChatSlideoutProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Reset messages when context changes
  useEffect(() => {
    if (open) {
      setMessages([
        {
          role: 'assistant',
          content: `I have the context for this action:\n\n**${contextTitle}**\n\n${contextDetail}\n\nWhat would you like to know about this? You can ask me:\n- Why was this recommended?\n- What data supported this decision?\n- What alternatives were considered?\n- Should this be modified?`,
        },
      ]);
    }
  }, [open, contextTitle, contextDetail]);

  const handleSend = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsStreaming(true);

    const demo = chatDemos[0];
    const response = demo.messages.find(m => m.role === 'assistant')?.content ||
      "Based on the data I've analyzed, this action was taken because the metrics indicated a clear opportunity for improvement. The decision was supported by multiple data sources including advertising performance, conversion rates, and competitive benchmarks.\n\nWould you like me to go deeper into any specific aspect of this analysis?";

    setTimeout(() => {
      setIsStreaming(false);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 2000);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />

      {/* Slideout panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e8f0] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#45a19c] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Discuss with Scale Pilot</p>
              <p className="text-xs text-[#6c757d] truncate max-w-[320px]">{contextTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
            <X size={18} className="text-[#6c757d]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isStreaming && <ChatMessage role="assistant" content="" isStreaming />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e2e8f0] p-3 shrink-0">
          <ChatInput
            onSend={handleSend}
            disabled={isStreaming}
            placeholder="Ask about this action..."
          />
        </div>
      </div>
    </>
  );
}
