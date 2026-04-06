'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Truck,
  Search,
  BarChart3,
  Cog,
  Layers,
  Sparkles,
  Zap,
  Activity,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  isScalePilot?: boolean;
  section?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#', section: 'main' },
  { label: 'Sales', icon: TrendingUp, href: '#', section: 'main' },
  { label: 'Products', icon: Package, href: '#', section: 'main' },
  { label: 'Restock', icon: Truck, href: '#', section: 'main' },
  { label: 'Keyword Ranking', icon: Search, href: '#', section: 'main' },
  { label: 'Ads Insights', icon: BarChart3, href: '#', section: 'ads' },
  { label: 'Automation', icon: Cog, href: '#', section: 'ads' },
  { label: 'Mass Campaigns', icon: Layers, href: '#', section: 'ads' },
  { label: 'Scale Pilot', icon: Sparkles, href: '/', isScalePilot: true, section: 'ai' },
  { label: 'Scale Optimizer', icon: Zap, href: '/optimizer', section: 'ai' },
  { label: 'Activity', icon: Activity, href: '/activity', section: 'ai' },
  { label: 'Chat', icon: MessageSquare, href: '/chat', section: 'ai' },
  { label: 'Settings', icon: Settings, href: '/settings', section: 'settings' },
];

function SILogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill="white" stroke="#45a19c" strokeWidth="1" />
      <path
        d="M8 22 L12 18 L16 20 L20 14 L24 10"
        stroke="#45a19c"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="10" r="2" fill="#45a19c" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (item: NavItem) => {
    if (item.href === '#') return false;
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[56px] bg-[#151c29] flex flex-col items-center py-3 z-50">
      {/* Logo */}
      <div className="mb-4 flex items-center justify-center w-10 h-10">
        <SILogo />
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-white/10 mb-2" />

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col items-center gap-0.5 w-full overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const hovered = hoveredItem === item.label;

          return (
            <div
              key={item.label}
              className="relative w-full"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`
                  flex items-center justify-center w-full h-10 relative transition-colors
                  ${active ? 'bg-[#253147]' : 'hover:bg-white/5'}
                  ${item.isScalePilot && !active ? 'text-[#45a19c]' : ''}
                `}
              >
                {/* Active left border */}
                {active && (
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-[#45a19c]" />
                )}

                <Icon
                  size={20}
                  className={`
                    ${active ? 'text-white' : item.isScalePilot ? 'text-[#45a19c]' : 'text-[#cccccc]'}
                    transition-colors
                  `}
                />
              </Link>

              {/* Tooltip */}
              {hovered && (
                <div className="absolute left-[56px] top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
                  <div className="bg-[#1a2332] text-white text-xs font-medium px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap border border-white/10">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom logo text */}
      <div className="mt-2 mb-1">
        <div className="w-7 h-7 rounded bg-[#45a19c]/20 flex items-center justify-center">
          <span className="text-[#45a19c] text-[10px] font-bold">SI</span>
        </div>
      </div>
    </aside>
  );
}
