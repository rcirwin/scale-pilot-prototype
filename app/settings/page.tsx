'use client';

import { useState } from 'react';
import { Shield, Clock, Target, Package, Megaphone, Bell, CheckCircle, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const [autonomyMode, setAutonomyMode] = useState('manual');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('06:00');
  const [priority, setPriority] = useState('balanced');
  const [notifications, setNotifications] = useState('in-app');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const autonomyOptions = [
    {
      value: 'manual',
      label: 'Manual',
      description: 'All recommendations queued for your review in Scale Optimizer. No actions taken without your approval.',
      icon: Shield,
    },
    {
      value: 'semi',
      label: 'Semi-Autonomous',
      description: 'Low-risk actions (e.g., assigning proven Strategic Objectives) executed automatically. Medium and high-risk actions queued for review.',
      icon: Target,
    },
    {
      value: 'full',
      label: 'Fully Autonomous',
      description: 'All actions executed automatically with notification. High-risk actions require 24h confirmation before execution.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="max-w-[700px] space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Scale Pilot Settings</h1>
        <p className="text-sm text-[#6c757d]">Configure how Scale Pilot manages your account</p>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Scale Pilot is active</p>
              <p className="text-xs text-[#6c757d]">Next analysis at {time} AM tomorrow</p>
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-md text-[#6c757d] hover:bg-gray-50">
            Disable
          </button>
        </div>
      </div>

      {/* Autonomy Mode */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#45a19c]" /> Autonomy Mode
        </h2>
        <div className="space-y-3">
          {autonomyOptions.map(opt => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                autonomyMode === opt.value
                  ? 'border-[#45a19c] bg-[#45a19c]/5'
                  : 'border-[#e2e8f0] hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="autonomy"
                value={opt.value}
                checked={autonomyMode === opt.value}
                onChange={() => setAutonomyMode(opt.value)}
                className="mt-1 accent-[#45a19c]"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                <p className="text-xs text-[#6c757d] mt-0.5">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Analysis Schedule */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#45a19c]" /> Analysis Schedule
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#6c757d] block mb-1.5">Frequency</label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm focus:outline-none focus:border-[#45a19c]"
            >
              <option value="daily">Daily</option>
              <option value="2days">Every 2 days</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[#6c757d] block mb-1.5">Time (your local timezone)</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm focus:outline-none focus:border-[#45a19c]"
            />
          </div>
        </div>
      </div>

      {/* Focus Priority */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#45a19c]" /> Focus Priority
        </h2>
        <div className="flex gap-3">
          {[
            { value: 'waste', label: 'Reduce Wasted Spend', desc: 'Prioritize negation, bid reduction, budget optimization' },
            { value: 'growth', label: 'Maximize Growth', desc: 'Prioritize scaling, ranking, keyword expansion' },
            { value: 'balanced', label: 'Balanced', desc: 'Prioritize by impact regardless of category' },
          ].map(opt => (
            <label
              key={opt.value}
              className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition-colors ${
                priority === opt.value
                  ? 'border-[#45a19c] bg-[#45a19c]/5'
                  : 'border-[#e2e8f0] hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={opt.value}
                checked={priority === opt.value}
                onChange={() => setPriority(opt.value)}
                className="sr-only"
              />
              <p className="text-sm font-medium text-gray-900">{opt.label}</p>
              <p className="text-xs text-[#6c757d] mt-1">{opt.desc}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#45a19c]" /> Exclusions
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#6c757d] block mb-1.5">Excluded ASINs</label>
            <input
              placeholder="Search and select ASINs to exclude..."
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm focus:outline-none focus:border-[#45a19c]"
            />
          </div>
          <div>
            <label className="text-xs text-[#6c757d] block mb-1.5">Excluded Campaigns</label>
            <input
              placeholder="Search and select campaigns to exclude..."
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm focus:outline-none focus:border-[#45a19c]"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#45a19c]" /> Notifications
        </h2>
        <div className="flex gap-3">
          {[
            { value: 'in-app', label: 'In-app only' },
            { value: 'email', label: 'Email digest' },
            { value: 'none', label: 'None' },
          ].map(opt => (
            <label
              key={opt.value}
              className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition-colors ${
                notifications === opt.value
                  ? 'border-[#45a19c] bg-[#45a19c]/5'
                  : 'border-[#e2e8f0] hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="notifications"
                value={opt.value}
                checked={notifications === opt.value}
                onChange={() => setNotifications(opt.value)}
                className="sr-only"
              />
              <p className="text-sm font-medium text-gray-900">{opt.label}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#0d6efd] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 animate-fade-in">
            <CheckCircle className="w-4 h-4" /> Settings saved
          </span>
        )}
      </div>
    </div>
  );
}
