'use client';

import { useRef, useState } from 'react';
import {
  BookOpen,
  FileText,
  Mic,
  StickyNote,
  Upload,
  X,
  Plus,
  Square,
  Volume2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { contextItems as initialContextItems, type ContextItem, type ContextItemType } from '@/data/context-items';

type AddMode = 'note' | 'document' | 'voice' | null;

const asinOptions = [
  { value: 'all', label: 'Whole account' },
  { value: 'B0DYVYQ2DL', label: 'B0DYVYQ2DL — Wine Making Kit Complete' },
  { value: 'B0CFKCL2KQ', label: 'B0CFKCL2KQ — Resistance Band Set' },
  { value: 'B09BKSP6HK', label: 'B09BKSP6HK — Fitness Sandbag 90 lbs' },
  { value: 'B0D4EXAMPLE', label: 'B0D4EXAMPLE — Pull Up Bar Doorway' },
  { value: 'B0E1SAMPLE', label: 'B0E1SAMPLE — Yoga Mat Premium' },
  { value: 'B0F2TESTID', label: 'B0F2TESTID — Jump Rope Speed Pro' },
];

function formatRelativeDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function iconForType(type: ContextItemType) {
  if (type === 'document') return FileText;
  if (type === 'voice') return Volume2;
  return StickyNote;
}

function colorForType(type: ContextItemType) {
  if (type === 'document') return 'text-[#0d6efd] bg-[#0d6efd]/10';
  if (type === 'voice') return 'text-[#8b5cf6] bg-[#8b5cf6]/10';
  return 'text-[#45a19c] bg-[#45a19c]/10';
}

export function AccountContextPanel() {
  const [items, setItems] = useState<ContextItem[]>(initialContextItems);
  const [mode, setMode] = useState<AddMode>(null);
  const [noteText, setNoteText] = useState('');
  const [noteAsin, setNoteAsin] = useState<string>('all');
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setMode(null);
    setNoteText('');
    setNoteAsin('all');
    setRecording(false);
    setRecordSeconds(0);
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
  };

  const saveNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    const firstLine = trimmed.split('\n')[0];
    const title = firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine;
    const newItem: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'note',
      title: title || 'Untitled note',
      preview: trimmed.length > 220 ? `${trimmed.slice(0, 217)}...` : trimmed,
      asin: noteAsin === 'all' ? undefined : noteAsin,
      addedAt: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
    reset();
  };

  const handleFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = file.size / 1024;
    const sizeStr = sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb.toFixed(0)} KB`;
    const newItem: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'document',
      title: file.name,
      preview: `Uploaded ${file.type || 'document'} — Scale Pilot will use this as background context across all conversations and analysis.`,
      addedAt: new Date().toISOString(),
      size: sizeStr,
    };
    setItems(prev => [newItem, ...prev]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    reset();
  };

  const startRecording = () => {
    setRecording(true);
    setRecordSeconds(0);
    recordIntervalRef.current = setInterval(() => {
      setRecordSeconds(s => s + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    const seconds = recordSeconds;
    if (seconds < 1) {
      reset();
      return;
    }
    const newItem: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'voice',
      title: `Voice note — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      preview:
        'Voice note recorded. Scale Pilot will transcribe and use this as background context across all conversations.',
      addedAt: new Date().toISOString(),
      durationSec: seconds,
    };
    setItems(prev => [newItem, ...prev]);
    reset();
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const formatDuration = (sec?: number) => {
    if (!sec) return '';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#e2e8f0]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#45a19c]/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#45a19c]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900">Account Knowledge & Context</h2>
              <p className="text-xs text-[#6c757d] mt-0.5 leading-relaxed">
                Tell Scale Pilot anything about your ASINs, account, margins, supply chain, or strategy — in any format.
                Type, paste, upload documents, or record a voice note. Scale Pilot uses this context across all chats,
                findings, and recommendations.
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp size={16} className="text-[#6c757d]" /> : <ChevronDown size={16} className="text-[#6c757d]" />}
          </button>
        </div>
      </div>

      {expanded && (
        <>
          {/* Add context — mode selector */}
          <div className="px-4 sm:px-5 py-3 border-b border-[#e2e8f0] bg-[#f8fafb]">
            {mode === null ? (
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-medium text-[#6c757d] mr-1">Add context:</span>
                <button
                  onClick={() => setMode('note')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1a1a2e] bg-white border border-[#e2e8f0] rounded-md hover:border-[#45a19c] hover:text-[#45a19c] transition-colors"
                >
                  <StickyNote size={13} /> Type or paste
                </button>
                <button
                  onClick={() => {
                    setMode('document');
                    setTimeout(() => fileInputRef.current?.click(), 50);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1a1a2e] bg-white border border-[#e2e8f0] rounded-md hover:border-[#45a19c] hover:text-[#45a19c] transition-colors"
                >
                  <Upload size={13} /> Upload document
                </button>
                <button
                  onClick={() => setMode('voice')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1a1a2e] bg-white border border-[#e2e8f0] rounded-md hover:border-[#45a19c] hover:text-[#45a19c] transition-colors"
                >
                  <Mic size={13} /> Voice note
                </button>
                <span className="text-[11px] text-[#6c757d] ml-auto">PDF, DOCX, TXT, MD, CSV — up to 25 MB</span>
              </div>
            ) : mode === 'note' ? (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                    <StickyNote size={13} className="text-[#45a19c]" /> New context note
                  </span>
                  <select
                    value={noteAsin}
                    onChange={e => setNoteAsin(e.target.value)}
                    className="text-[11px] border border-[#e2e8f0] rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-[#45a19c]"
                  >
                    {asinOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Paste or type anything — margins, supplier notes, brand voice, restock timelines, customer insights, competitor research, business priorities..."
                  className="w-full px-3 py-2 text-sm border border-[#e2e8f0] rounded-md focus:outline-none focus:border-[#45a19c] resize-none bg-white"
                  rows={5}
                  autoFocus
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={reset}
                    className="px-3 py-1.5 text-xs text-[#6c757d] hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNote}
                    disabled={!noteText.trim()}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                      noteText.trim()
                        ? 'bg-[#45a19c] text-white hover:bg-[#3a8a86] cursor-pointer'
                        : 'bg-gray-200 text-[#6c757d] cursor-not-allowed'
                    }`}
                  >
                    <Plus size={12} /> Save context
                  </button>
                </div>
              </div>
            ) : mode === 'document' ? (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Upload size={14} className="text-[#45a19c]" />
                  <span className="text-xs font-semibold text-gray-900">Choose a document to upload</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.md,.csv"
                  onChange={handleFileChosen}
                  className="block w-full text-xs text-[#6c757d] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#45a19c] file:text-white hover:file:bg-[#3a8a86] file:cursor-pointer"
                />
                <div className="flex items-center justify-end">
                  <button
                    onClick={reset}
                    className="px-3 py-1 text-xs text-[#6c757d] hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in flex items-center gap-3 py-1">
                <button
                  onClick={recording ? stopRecording : startRecording}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    recording ? 'bg-[#ef4444] text-white hover:bg-red-600' : 'bg-[#45a19c] text-white hover:bg-[#3a8a86]'
                  }`}
                >
                  {recording ? <Square size={14} fill="currentColor" /> : <Mic size={16} />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">
                    {recording ? 'Recording…' : 'Tap to start recording'}
                  </p>
                  <p className="text-[11px] text-[#6c757d]">
                    {recording
                      ? `${formatDuration(recordSeconds)} — tap stop to save and transcribe`
                      : 'Scale Pilot will transcribe and add this as searchable context'}
                  </p>
                </div>
                {recording && (
                  <span className="flex items-center gap-1.5 text-[11px] text-[#ef4444] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                    REC
                  </span>
                )}
                <button
                  onClick={reset}
                  className="px-3 py-1 text-xs text-[#6c757d] hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Saved context list */}
          <div className="px-4 sm:px-5 py-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-gray-900">
                Saved context <span className="text-[#6c757d] font-normal">· {items.length} {items.length === 1 ? 'item' : 'items'}</span>
              </h3>
              {items.length > 4 && (
                <span className="text-[11px] text-[#6c757d]">Most recent first</span>
              )}
            </div>
            {items.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-[#6c757d]">No saved context yet. Add the first piece above.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#e2e8f0] border border-[#e2e8f0] rounded-md max-h-[280px] overflow-y-auto">
                {items.map(item => {
                  const Icon = iconForType(item.type);
                  return (
                    <li key={item.id} className="px-3 py-2.5 hover:bg-[#f5f7fa] transition-colors group">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${colorForType(item.type)}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-gray-900 truncate">{item.title}</span>
                            {item.asin && (
                              <span className="text-[10px] text-[#6c757d] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{item.asin}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6c757d] leading-relaxed line-clamp-2 mt-0.5">{item.preview}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-[#6c757d]">
                            <span>{formatRelativeDate(item.addedAt)}</span>
                            {item.size && <><span>·</span><span>{item.size}</span></>}
                            {item.pages && <><span>·</span><span>{item.pages} pages</span></>}
                            {item.durationSec && <><span>·</span><span>{formatDuration(item.durationSec)}</span></>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all shrink-0"
                          aria-label="Remove context item"
                        >
                          <X size={14} className="text-[#6c757d]" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
