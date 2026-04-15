'use client';

import { useState } from 'react';
import {
  Shield,
  Clock,
  Target,
  Package,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Layers,
  Cog,
  Crosshair,
  DollarSign,
  TrendingUp,
  Settings,
} from 'lucide-react';

// Per-ASIN data
interface AsinConfig {
  asin: string;
  name: string;
  active: boolean;
  priority: string;
}

// Permission levels
type PermissionLevel = 'allowed' | 'approval' | 'blocked';

const permissionCategories = [
  { key: 'strategic_objectives', label: 'Assign Strategic Objectives', icon: Target },
  { key: 'algorithm_params', label: 'Modify algorithm parameters', icon: Cog },
  { key: 'negate_search_terms', label: 'Negate search terms', icon: Crosshair },
  { key: 'negate_keywords', label: 'Negate keywords', icon: Crosshair },
  { key: 'pause_campaigns', label: 'Pause campaigns', icon: Layers },
  { key: 'enable_campaigns', label: 'Enable campaigns', icon: Layers },
  { key: 'adjust_bids', label: 'Adjust bids', icon: DollarSign },
  { key: 'adjust_budgets', label: 'Adjust budgets', icon: DollarSign },
  { key: 'create_campaigns', label: 'Create campaigns', icon: Layers },
  { key: 'create_keywords', label: 'Create keywords', icon: Plus },
  { key: 'track_keywords', label: 'Track new keywords', icon: TrendingUp },
];

const analysisCategories = [
  { key: 'ppc_performance', label: 'PPC Campaign Performance', cadence: 'daily' },
  { key: 'target_performance', label: 'Target Performance', cadence: 'daily' },
  { key: 'search_term', label: 'Search Term Performance', cadence: 'daily' },
  { key: 'organic_ranking', label: 'Organic Ranking Data', cadence: 'weekly' },
  { key: 'sqp_data', label: 'SQP Data', cadence: 'weekly' },
  { key: 'niche_investigation', label: 'Niche Investigation', cadence: 'weekly' },
  { key: 'competitor_research', label: 'Competitor Research', cadence: 'weekly' },
  { key: 'bsr_tracking', label: 'Best Seller Rank', cadence: 'daily' },
];

const actionCadenceCategories = [
  { key: 'campaign_structure', label: 'Campaign Structure', cadence: 'weekly' },
  { key: 'automation_structure', label: 'Automation Structure', cadence: 'weekly' },
  { key: 'keyword_tracking', label: 'ASINs/Keywords for Organic Rank Tracking', cadence: 'monthly' },
];

const priorityOptions = [
  { value: 'waste', label: 'Reduce Wasted Spend' },
  { value: 'growth', label: 'Maximize Growth' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'launch', label: 'Launch Mode' },
];

const cadenceOptions = ['Daily', 'Every 2 Days', 'Weekly', 'Bi-Weekly', 'Monthly'];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState('in-app');
  const [saved, setSaved] = useState(false);
  const [selectedAsin, setSelectedAsin] = useState<string | null>('B0DYVYQ2DL');

  const [asins, setAsins] = useState<AsinConfig[]>([
    { asin: 'B0DYVYQ2DL', name: 'Wine Making Kit Complete', active: true, priority: 'balanced' },
    { asin: 'B0CFKCL2KQ', name: 'Resistance Band Set', active: true, priority: 'waste' },
    { asin: 'B09BKSP6HK', name: 'Fitness Sandbag 90 lbs', active: false, priority: 'balanced' },
    { asin: 'B0D4EXAMPLE', name: 'Pull Up Bar Doorway', active: true, priority: 'growth' },
    { asin: 'B0E1SAMPLE', name: 'Yoga Mat Premium', active: true, priority: 'balanced' },
    { asin: 'B0F2TESTID', name: 'Jump Rope Speed Pro', active: true, priority: 'balanced' },
  ]);

  const [permissions, setPermissions] = useState<Record<string, Record<string, PermissionLevel>>>(() => {
    const defaults: Record<string, PermissionLevel> = {};
    permissionCategories.forEach(c => { defaults[c.key] = 'approval'; });
    const obj: Record<string, Record<string, PermissionLevel>> = {};
    asins.forEach(a => { obj[a.asin] = { ...defaults }; });
    obj['B0DYVYQ2DL'] = {
      ...defaults,
      strategic_objectives: 'allowed',
      negate_search_terms: 'allowed',
      negate_keywords: 'allowed',
      adjust_bids: 'approval',
      create_campaigns: 'approval',
      pause_campaigns: 'blocked',
    };
    obj['B0CFKCL2KQ'] = {
      ...defaults,
      adjust_bids: 'allowed',
      negate_search_terms: 'allowed',
      track_keywords: 'allowed',
    };
    return obj;
  });

  const [analysisCadences, setAnalysisCadences] = useState<Record<string, Record<string, string>>>(() => {
    const obj: Record<string, Record<string, string>> = {};
    asins.forEach(a => {
      const cadences: Record<string, string> = {};
      analysisCategories.forEach(c => { cadences[c.key] = c.cadence === 'daily' ? 'Daily' : 'Weekly'; });
      actionCadenceCategories.forEach(c => { cadences[c.key] = c.cadence === 'weekly' ? 'Weekly' : 'Monthly'; });
      obj[a.asin] = cadences;
    });
    return obj;
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleAsin = (asin: string) => {
    setAsins(prev => prev.map(a => a.asin === asin ? { ...a, active: !a.active } : a));
  };

  const setAsinPriority = (asin: string, priority: string) => {
    setAsins(prev => prev.map(a => a.asin === asin ? { ...a, priority } : a));
  };

  const setPermission = (asin: string, category: string, level: PermissionLevel) => {
    setPermissions(prev => ({
      ...prev,
      [asin]: { ...prev[asin], [category]: level },
    }));
  };

  const setCadence = (asin: string, category: string, cadence: string) => {
    setAnalysisCadences(prev => ({
      ...prev,
      [asin]: { ...prev[asin], [category]: cadence },
    }));
  };

  const activeCount = asins.filter(a => a.active).length;
  const selectedAsinConfig = asins.find(a => a.asin === selectedAsin);

  const permissionColor = (level: PermissionLevel) => {
    switch (level) {
      case 'allowed': return 'bg-[#22c55e] text-white';
      case 'approval': return 'bg-[#f59e0b] text-white';
      case 'blocked': return 'bg-[#ef4444] text-white';
    }
  };

  return (
    <div className="max-w-[1100px] space-y-5">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Scale Pilot Settings</h1>
        <p className="text-sm text-[#6c757d]">Configure Scale Pilot on a per-ASIN basis — control what gets investigated, how often, and what actions are allowed</p>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Scale Pilot is active</p>
              <p className="text-xs text-[#6c757d]">{activeCount} of {asins.length} ASINs enabled</p>
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-md text-[#6c757d] hover:bg-gray-50">
            Disable All
          </button>
        </div>
      </div>

      {/* ASIN Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0]">
        <div className="p-4 sm:p-5 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#45a19c]" /> Scale Pilot ASINs
            </h2>
            <span className="text-xs text-[#6c757d]">{activeCount} active</span>
          </div>
          <p className="text-xs text-[#6c757d] mt-1">Select which ASINs Scale Pilot optimizes. Click a row to configure permissions, analysis, and cadence below.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-[#f5f7fa]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide w-[60px]">Active</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">ASIN</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Priority</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide w-[80px]">Config</th>
              </tr>
            </thead>
            <tbody>
              {asins.map((a) => (
                <tr
                  key={a.asin}
                  className={`border-b border-[#e2e8f0] last:border-b-0 cursor-pointer transition-colors ${
                    selectedAsin === a.asin ? 'bg-[#45a19c]/5' : 'hover:bg-[#f5f7fa]/50'
                  }`}
                  onClick={() => setSelectedAsin(selectedAsin === a.asin ? null : a.asin)}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleAsin(a.asin); }}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        a.active ? 'bg-[#45a19c]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        a.active ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{a.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-[#6c757d] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{a.asin}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.priority}
                      onClick={(e) => e.stopPropagation()}
                      onChange={e => setAsinPriority(a.asin, e.target.value)}
                      className="text-xs border border-[#e2e8f0] rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-[#45a19c]"
                    >
                      {priorityOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {selectedAsin === a.asin ? (
                      <ChevronUp size={16} className="text-[#45a19c]" />
                    ) : (
                      <Settings size={16} className="text-[#6c757d]" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-ASIN Configuration Panel (shown when a row is selected) */}
      {selectedAsin && selectedAsinConfig && (
        <div className="bg-white rounded-lg border border-[#e2e8f0] border-t-2 border-t-[#45a19c] animate-fade-in">
          <div className="p-4 sm:p-5 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-900">
                Configuration for {selectedAsinConfig.name}
              </h2>
              <span className="text-xs text-[#6c757d] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{selectedAsin}</span>
              <span className={`text-[10px] font-medium ml-1 ${selectedAsinConfig.active ? 'text-green-600' : 'text-gray-400'}`}>
                {selectedAsinConfig.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-6">
            {/* Permissions */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                <Shield size={13} className="text-[#45a19c]" /> Action Permissions
              </h3>
              <div className="rounded-lg border border-[#e2e8f0] overflow-hidden">
                <div className="flex items-center gap-3 px-3 py-2 border-b border-[#e2e8f0] bg-[#f5f7fa]">
                  <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-[#22c55e]" /> Always Allowed</span>
                  <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Requires Approval</span>
                  <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Blocked</span>
                </div>
                {permissionCategories.map((cat) => {
                  const Icon = cat.icon;
                  const currentLevel = permissions[selectedAsin]?.[cat.key] || 'approval';
                  return (
                    <div key={cat.key} className="flex items-center justify-between px-3 py-2 border-b border-[#e2e8f0] last:border-b-0">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Icon size={13} className="text-[#6c757d] shrink-0" />
                        <span className="text-xs text-gray-800">{cat.label}</span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {(['allowed', 'approval', 'blocked'] as const).map(level => (
                          <button
                            key={level}
                            onClick={() => setPermission(selectedAsin, cat.key, level)}
                            className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                              currentLevel === level
                                ? permissionColor(level)
                                : 'bg-gray-100 text-[#6c757d] hover:bg-gray-200'
                            }`}
                          >
                            {level === 'allowed' ? 'Allow' : level === 'approval' ? 'Approve' : 'Block'}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analysis Cadence */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                <Clock size={13} className="text-[#45a19c]" /> Analysis & Investigation Cadence
              </h3>
              <div className="rounded-lg border border-[#e2e8f0] overflow-hidden">
                <div className="px-3 py-2 border-b border-[#e2e8f0] bg-[#f5f7fa]">
                  <span className="text-[10px] font-medium text-[#6c757d]">Research Categories</span>
                </div>
                {analysisCategories.map(cat => (
                  <div key={cat.key} className="flex items-center justify-between px-3 py-2 border-b border-[#e2e8f0]">
                    <span className="text-xs text-gray-800">{cat.label}</span>
                    <select
                      value={analysisCadences[selectedAsin]?.[cat.key] || 'Weekly'}
                      onChange={e => setCadence(selectedAsin, cat.key, e.target.value)}
                      className="text-[10px] border border-[#e2e8f0] rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none focus:border-[#45a19c]"
                    >
                      {cadenceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div className="px-3 py-2 border-b border-[#e2e8f0] bg-[#f5f7fa]">
                  <span className="text-[10px] font-medium text-[#6c757d]">Action Recommendation Categories</span>
                </div>
                {actionCadenceCategories.map(cat => (
                  <div key={cat.key} className="flex items-center justify-between px-3 py-2 border-b border-[#e2e8f0] last:border-b-0">
                    <span className="text-xs text-gray-800">{cat.label}</span>
                    <select
                      value={analysisCadences[selectedAsin]?.[cat.key] || 'Weekly'}
                      onChange={e => setCadence(selectedAsin, cat.key, e.target.value)}
                      className="text-[10px] border border-[#e2e8f0] rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none focus:border-[#45a19c]"
                    >
                      {cadenceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Excluded Campaigns */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#45a19c]" /> Excluded Campaigns
        </h2>
        <p className="text-xs text-[#6c757d] mb-2">Optionally exclude specific campaigns from Scale Pilot optimization across all ASINs.</p>
        <input
          placeholder="Search and select campaigns to exclude..."
          className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-sm focus:outline-none focus:border-[#45a19c]"
        />
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#45a19c]" /> Notifications
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'in-app', label: 'In-app only' },
            { value: 'email', label: 'Email digest' },
            { value: 'none', label: 'None' },
          ].map(opt => (
            <label
              key={opt.value}
              className={`flex-1 min-w-[120px] p-3 rounded-lg border cursor-pointer text-center transition-colors ${
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
