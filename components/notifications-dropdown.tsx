'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, AlertTriangle, FileBarChart, ListChecks, Sparkles, Calendar } from 'lucide-react';
import { notifications as initialNotifications, type Notification, type NotificationType } from '@/data/notifications';

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function iconForNotification(type: NotificationType) {
  switch (type) {
    case 'critical_finding': return AlertTriangle;
    case 'weekly_report':
    case 'monthly_report': return FileBarChart;
    case 'daily_review': return ListChecks;
    case 'action_executed': return Sparkles;
    default: return Calendar;
  }
}

function colorForNotification(type: NotificationType) {
  switch (type) {
    case 'critical_finding': return 'text-[#ef4444] bg-[#ef4444]/10';
    case 'weekly_report':
    case 'monthly_report': return 'text-[#0d6efd] bg-[#0d6efd]/10';
    case 'daily_review': return 'text-[#f59e0b] bg-[#f59e0b]/10';
    case 'action_executed': return 'text-[#45a19c] bg-[#45a19c]/10';
    default: return 'text-[#6c757d] bg-gray-100';
  }
}

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(initialNotifications);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter(n => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative h-[38px] w-[38px] flex items-center justify-center border border-[#dee2e6] rounded bg-white hover:bg-[#f8f9fa] transition-colors"
        aria-label="Notifications"
      >
        <Bell size={16} className="text-[#6c757d]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#ef4444] text-white text-[9px] font-semibold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-lg border border-[#e2e8f0] shadow-xl z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-[#e2e8f0] bg-[#f8fafb] flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Notifications</p>
              <p className="text-[11px] text-[#6c757d]">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] text-[#0d6efd] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[480px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-8 px-4">
                <Bell size={24} className="text-[#cbd5e1] mx-auto mb-2" />
                <p className="text-xs text-[#6c757d]">You&apos;re all caught up</p>
              </div>
            ) : (
              <ul>
                {items.map(n => {
                  const Icon = iconForNotification(n.type);
                  const content = (
                    <div className={`px-4 py-3 border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f5f7fa] transition-colors cursor-pointer ${!n.read ? 'bg-[#0d6efd]/[0.03]' : ''}`}>
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorForNotification(n.type)}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <p className="text-xs font-semibold text-gray-900 leading-snug flex-1">{n.title}</p>
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#0d6efd] mt-1 shrink-0" />}
                          </div>
                          <p className="text-[11px] text-[#6c757d] leading-relaxed mt-0.5 line-clamp-2">{n.description}</p>
                          <p className="text-[10px] text-[#6c757d] mt-1">{formatRelative(n.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  );
                  if (n.href) {
                    return (
                      <li key={n.id}>
                        <Link
                          href={n.href}
                          onClick={() => { markRead(n.id); setOpen(false); }}
                          className="block"
                        >
                          {content}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={n.id} onClick={() => markRead(n.id)}>
                      {content}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-[#e2e8f0] bg-[#f8fafb]">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="text-[11px] text-[#0d6efd] hover:underline"
            >
              Notification preferences
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
