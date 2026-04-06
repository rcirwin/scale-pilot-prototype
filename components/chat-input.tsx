'use client';

import { useState, useRef, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = 'Ask Scale Pilot anything...' }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const maxHeight = 3 * 24; // ~3 lines
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 flex items-end gap-2 shadow-sm">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none text-sm text-[#1a1a2e] placeholder:text-[#6c757d] bg-transparent outline-none leading-6 disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !hasContent}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          hasContent && !disabled
            ? 'bg-[#45a19c] text-white hover:bg-[#3a8a86] cursor-pointer'
            : 'bg-[#e2e8f0] text-[#6c757d] cursor-not-allowed'
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
