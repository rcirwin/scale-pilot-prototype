'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { chatDemos } from '@/data/chat-demos';
import { Sparkles, Plus, MessageSquare, Clock, ChevronLeft } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  timestamp: string;
}

const SUGGESTIONS = [
  "What campaigns should I pause based on wasted spend?",
  "Which ASINs should I reduce ad spend on due to low inventory?",
  "Which SQP opportunities should I scale for B0DYVYQ2DL?",
  "What Strategic Objective should I assign to brand defense campaigns?",
];

// Pre-populated thread history for demo
const initialThreads: ChatThread[] = [
  {
    id: 't1',
    title: 'Campaign pause analysis — wasted spend',
    messages: [
      { role: 'user', content: 'What campaigns should I pause based on wasted spend?' },
      { role: 'assistant', content: chatDemos[0].messages[1].content },
    ],
    timestamp: '2026-04-06T10:30:00Z',
  },
  {
    id: 't2',
    title: 'Low inventory ASINs — ad spend review',
    messages: [
      { role: 'user', content: 'Which ASINs should I reduce ad spend on because of low inventory?' },
      { role: 'assistant', content: chatDemos[1].messages[1].content },
    ],
    timestamp: '2026-04-05T14:15:00Z',
  },
  {
    id: 't3',
    title: 'ACOS spike investigation — B0CFKCL2KQ',
    messages: [
      { role: 'user', content: 'Why did ACOS spike on B0CFKCL2KQ?' },
      { role: 'assistant', content: 'I analyzed the ACOS trend for B0CFKCL2KQ and found a significant regression over the last 15 days:\n\n**ACOS jumped from 14.18% to 38.50%**\n\nThe root causes appear to be:\n\n- **Rising CPCs (+22%)** — average CPC went from $1.10 to $1.34, suggesting increased competitive pressure\n- **Declining conversion rate (12.4% → 7.8%)** — this is the bigger concern and could indicate a listing quality issue\n\nI only have 2 keywords being tracked for organic rank on this ASIN, which is insufficient for root cause analysis. I\'ve already recommended adding 5 high-volume keywords to the rank tracker.\n\n**Immediate recommendation:** Reduce non-brand keyword bids by 15-20% as an interim measure while we gather more diagnostic data over the next 7 days.\n\nWould you like me to implement the bid reduction now?' },
    ],
    timestamp: '2026-04-04T09:45:00Z',
  },
];

export default function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isStreaming]);

  const activeThread = activeThreadId ? threads.find(t => t.id === activeThreadId) : null;
  const displayMessages = activeThread ? activeThread.messages : currentMessages;

  const handleSend = (message: string) => {
    if (activeThread) {
      // Add to existing thread
      const updated = threads.map(t =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, { role: 'user' as const, content: message }] }
          : t
      );
      setThreads(updated);
    } else {
      setCurrentMessages(prev => [...prev, { role: 'user', content: message }]);
    }

    setIsStreaming(true);

    const demo = chatDemos.find(d =>
      message.toLowerCase().includes('pause') || message.toLowerCase().includes('wasted')
        ? d.id === 'demo-wasted-spend'
        : message.toLowerCase().includes('inventory') || message.toLowerCase().includes('low stock')
          ? d.id === 'demo-low-inventory'
          : false
    ) || chatDemos[0];

    const assistantResponse = demo.messages.find(m => m.role === 'assistant')?.content ||
      "I'll analyze your account data to answer that question. Let me check your sales, ads performance, and keyword data...\n\nBased on the available data, I found several insights across your account. Would you like me to dig deeper into any specific area?";

    setTimeout(() => {
      setIsStreaming(false);
      if (activeThreadId) {
        setThreads(prev => prev.map(t =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, { role: 'assistant' as const, content: assistantResponse }] }
            : t
        ));
      } else {
        // Create new thread
        const newThread: ChatThread = {
          id: `t-${Date.now()}`,
          title: message.slice(0, 60) + (message.length > 60 ? '...' : ''),
          messages: [
            ...currentMessages,
            { role: 'user', content: message },
            { role: 'assistant', content: assistantResponse },
          ],
          timestamp: new Date().toISOString(),
        };
        setThreads(prev => [newThread, ...prev]);
        setActiveThreadId(newThread.id);
        setCurrentMessages([]);
      }
    }, 3000);
  };

  const startNewChat = () => {
    setActiveThreadId(null);
    setCurrentMessages([]);
  };

  const selectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setCurrentMessages([]);
  };

  const formatThreadDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex h-[calc(100vh-120px)] -m-3 sm:-m-4 md:-m-6">
      {/* Thread Sidebar */}
      <div className={`${sidebarOpen ? 'w-[260px]' : 'w-0'} shrink-0 bg-[#f5f7fa] border-r border-[#e2e8f0] flex flex-col transition-all duration-200 overflow-hidden`}>
        <div className="p-3 border-b border-[#e2e8f0] shrink-0">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#45a19c] hover:bg-[#3a8a86] rounded-lg transition-colors"
          >
            <Plus size={16} />
            New chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map(thread => (
            <button
              key={thread.id}
              onClick={() => selectThread(thread.id)}
              className={`w-full text-left px-3 py-2.5 border-b border-[#e2e8f0] transition-colors ${
                activeThreadId === thread.id ? 'bg-white' : 'hover:bg-white/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare size={14} className="text-[#6c757d] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-800 truncate">{thread.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-[#6c757d]" />
                    <span className="text-[10px] text-[#6c757d]">{formatThreadDate(thread.timestamp)}</span>
                    <span className="text-[10px] text-[#6c757d]">· {thread.messages.length} messages</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#e2e8f0] shrink-0 bg-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={18} className="text-[#6c757d]" /> : <MessageSquare size={18} className="text-[#6c757d]" />}
          </button>
          <span className="text-sm font-medium text-gray-900">
            {activeThread ? activeThread.title : 'New conversation'}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayMessages.length === 0 && !isStreaming && (
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
                    onClick={() => handleSend(s)}
                    className="text-left px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-gray-700 hover:border-[#45a19c] hover:bg-gray-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayMessages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}

          {isStreaming && (
            <ChatMessage role="assistant" content="" isStreaming />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e2e8f0] p-3 bg-[#f5f7fa] shrink-0">
          <ChatInput
            onSend={handleSend}
            disabled={isStreaming}
            placeholder="Ask about your sales, ads, BSR, keywords..."
          />
          <p className="text-xs text-[#6c757d] text-center mt-2">AI-generated analysis - verify important data before taking action.</p>
        </div>
      </div>
    </div>
  );
}
