'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { chatDemos } from '@/data/chat-demos';
import { Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "What campaigns should I pause based on wasted spend?",
  "Which ASINs should I reduce ad spend on due to low inventory?",
  "Which SQP opportunities should I scale for B0DYVYQ2DL?",
  "What Strategic Objective should I assign to brand defense campaigns?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsStreaming(true);

    // Find matching demo or use default
    const demo = chatDemos.find(d =>
      message.toLowerCase().includes('pause') || message.toLowerCase().includes('wasted')
        ? d.id === 'demo-wasted-spend'
        : message.toLowerCase().includes('inventory') || message.toLowerCase().includes('low stock')
          ? d.id === 'demo-low-inventory'
          : false
    ) || chatDemos[0];

    // Simulate streaming delay
    const assistantResponse = demo.messages.find(m => m.role === 'assistant')?.content ||
      "I'll analyze your account data to answer that question. Let me check your sales, ads performance, and keyword data...\n\nBased on the available data, I found several insights across your account. Would you like me to dig deeper into any specific area?";

    setTimeout(() => {
      setIsStreaming(false);
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    }, 3000);
  };

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="max-w-[900px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && !isStreaming && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-[#45a19c] flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Ask Scale Pilot</h2>
            <p className="text-sm text-[#6c757d] mb-6 max-w-md">
              Get specific, actionable insights on your PPC performance, optimization opportunities, and automation recommendations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s)}
                  className="text-left px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-gray-700 hover:border-[#45a19c] hover:bg-gray-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {isStreaming && (
          <ChatMessage role="assistant" content="" isStreaming />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#e2e8f0] pt-3 bg-[#f5f7fa]">
        <ChatInput
          onSend={handleSend}
          disabled={isStreaming}
          placeholder="Ask about your sales, ads, BSR, keywords..."
        />
        <p className="text-xs text-[#6c757d] text-center mt-2">AI-generated analysis - verify important data before taking action.</p>
      </div>
    </div>
  );
}
