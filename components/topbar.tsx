'use client';

import { Search, User } from 'lucide-react';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title = 'Scale Pilot' }: TopbarProps) {
  return (
    <header className="h-[52px] bg-white border-b border-[#dee2e6] flex items-center justify-between px-3 sm:px-5 shrink-0">
      {/* Left: Page icon + title */}
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 512 512" width="20" height="20" className="text-[#45a19c] shrink-0" fill="currentColor">
          <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 96c35.3 0 64-28.7 64-64c0-29.8-20.4-54.9-48-62l0-194c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 194c-27.6 7.1-48 32.2-48 62c0 35.3 28.7 64 64 64zM144 168a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm-24 88a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm296 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM392 144a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/>
        </svg>
        <h1 className="text-[18px] sm:text-[20px] font-medium text-[#212529]">{title}</h1>
      </div>

      {/* Right: search, marketplace, user */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - hidden on very small screens */}
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#adb5bd]" />
          <input
            type="text"
            placeholder="Search our knowledge base"
            className="h-[38px] w-[160px] md:w-[240px] pl-9 pr-3 text-[14px] bg-white border border-[#dee2e6] rounded text-[#212529] placeholder:text-[#adb5bd] focus:outline-none focus:border-[#86b7fe] focus:shadow-[0_0_0_3px_rgba(13,110,253,.25)]"
          />
        </div>

        {/* Marketplace selector */}
        <div className="flex items-center gap-1.5 h-[38px] px-2 sm:px-3 text-sm border border-[#dee2e6] rounded bg-white cursor-pointer hover:bg-[#f8f9fa]">
          <span className="text-base">&#x1F1FA;&#x1F1F8;</span>
          <span className="text-[#212529] text-[14px] hidden sm:inline">US</span>
          <svg width="10" height="6" viewBox="0 0 10 6" className="ml-1 text-[#6c757d]" fill="currentColor">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-[30px] h-[30px] rounded-full border border-[#dee2e6] flex items-center justify-center text-[#6c757d]">
            <User size={16} />
          </div>
          <span className="text-[14px] text-[#212529] hidden sm:inline">Ryan</span>
          <svg width="10" height="6" viewBox="0 0 10 6" className="text-[#6c757d] hidden sm:inline" fill="currentColor">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
