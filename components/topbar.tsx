'use client';

import { Search } from 'lucide-react';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title = 'Scale Pilot' }: TopbarProps) {
  return (
    <header className="h-[50px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-5 shrink-0">
      {/* Left: Page title */}
      <h1 className="text-base font-semibold text-[#1a1a2e]">{title}</h1>

      {/* Right: search, marketplace, user */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6c757d]" />
          <input
            type="text"
            placeholder="Search our knowledge base"
            className="h-8 w-56 pl-8 pr-3 text-sm bg-[#f5f7fa] border border-[#e2e8f0] rounded-md text-[#1a1a2e] placeholder:text-[#6c757d] focus:outline-none focus:ring-1 focus:ring-[#45a19c] focus:border-[#45a19c]"
          />
        </div>

        {/* Marketplace selector */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm border border-[#e2e8f0] rounded-md bg-white cursor-pointer hover:bg-[#f5f7fa]">
          <span className="text-sm">🇺🇸</span>
          <span className="text-[#1a1a2e] font-medium text-xs">US</span>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#45a19c] flex items-center justify-center text-white text-xs font-semibold">
            R
          </div>
          <span className="text-sm font-medium text-[#1a1a2e]">Ryan</span>
        </div>
      </div>
    </header>
  );
}
