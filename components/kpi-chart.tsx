'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { DailyKPI, ActionMarker } from '@/data/kpi-data';

interface KPIChartProps {
  data: DailyKPI[];
  markers: ActionMarker[];
  selectedKpis?: string[];
}

type TimeRange = '7d' | '30d' | '90d' | 'ytd';

const timeRangeLabels: Record<TimeRange, string> = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  'ytd': 'Year to Date',
};

const kpiConfig: Record<string, { label: string; color: string; format: (v: number) => string }> = {
  sales: { label: 'Sales', color: '#22c55e', format: (v) => `$${v.toLocaleString()}` },
  spend: { label: 'Spend', color: '#ef4444', format: (v) => `$${v.toLocaleString()}` },
  acos: { label: 'ACoS', color: '#f59e0b', format: (v) => `${v.toFixed(1)}%` },
  profit: { label: 'Profit', color: '#0d6efd', format: (v) => `$${v.toLocaleString()}` },
  impressions: { label: 'Impressions', color: '#8b5cf6', format: (v) => v.toLocaleString() },
  orders: { label: 'Orders', color: '#5c74b5', format: (v) => v.toString() },
};

const markerColors: Record<string, string> = {
  scale_pilot: '#45a19c',
  manual: '#6c757d',
  automation: '#0d6efd',
};

const markerLabels: Record<string, string> = {
  scale_pilot: 'Scale Pilot',
  manual: 'Manual',
  automation: 'Automation',
};

function filterByTimeRange(data: DailyKPI[], range: TimeRange): DailyKPI[] {
  if (data.length === 0) return data;
  const lastDate = new Date(data[data.length - 1].date);

  let cutoff: Date;
  switch (range) {
    case '7d':
      cutoff = new Date(lastDate);
      cutoff.setDate(cutoff.getDate() - 7);
      break;
    case '30d':
      cutoff = new Date(lastDate);
      cutoff.setDate(cutoff.getDate() - 30);
      break;
    case '90d':
      cutoff = new Date(lastDate);
      cutoff.setDate(cutoff.getDate() - 90);
      break;
    case 'ytd':
      cutoff = new Date(lastDate.getFullYear(), 0, 1);
      break;
  }

  return data.filter(d => new Date(d.date) >= cutoff);
}

function formatXAxisTick(dateStr: string, totalDays: number): string {
  const d = new Date(dateStr);
  if (totalDays <= 31) {
    // Days: "Mar 8", "Apr 1"
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else if (totalDays <= 93) {
    // Weeks: show "Mar 8" but only for some ticks (handled by interval)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    // Months: "Jan", "Feb"
    return d.toLocaleDateString('en-US', { month: 'short' });
  }
}

function getTickInterval(totalDays: number): number | undefined {
  if (totalDays <= 10) return 0; // show every day
  if (totalDays <= 31) return 2; // every 3rd day
  if (totalDays <= 93) return 6; // weekly
  return 29; // roughly monthly
}

// Custom tooltip component
function ChartTooltip({
  active,
  payload,
  label,
  markers,
}: {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
  markers: ActionMarker[];
}) {
  if (!active || !payload || !label) return null;

  const dateStr = label;
  const dateDisplay = new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Count actions on this date by category
  const dayMarkers = markers.filter(m => m.date === dateStr);
  const scalePilotCount = dayMarkers.filter(m => m.type === 'scale_pilot').length;
  const manualCount = dayMarkers.filter(m => m.type === 'manual').length;
  const automationCount = dayMarkers.filter(m => m.type === 'automation').length;
  const totalActions = scalePilotCount + manualCount + automationCount;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '10px 14px',
        minWidth: 180,
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 6, color: '#1a1a2e' }}>{dateDisplay}</p>

      {/* KPI values */}
      {payload.map((entry: { name: string; value: number; color: string }, i: number) => {
        const config = kpiConfig[entry.name];
        if (!config) return null;
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 2 }}>
            <span style={{ color: entry.color, fontWeight: 500 }}>{config.label}</span>
            <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{config.format(entry.value)}</span>
          </div>
        );
      })}

      {/* Action counts */}
      {totalActions > 0 && (
        <>
          <div style={{ borderTop: '1px solid #e2e8f0', margin: '6px 0', paddingTop: 6 }}>
            <p style={{ fontWeight: 600, color: '#6c757d', marginBottom: 4, fontSize: 11 }}>
              Actions ({totalActions})
            </p>
            {scalePilotCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#45a19c', display: 'inline-block' }} />
                <span style={{ color: '#45a19c' }}>Scale Pilot: {scalePilotCount}</span>
              </div>
            )}
            {manualCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#6c757d', display: 'inline-block' }} />
                <span style={{ color: '#6c757d' }}>Manual: {manualCount}</span>
              </div>
            )}
            {automationCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0d6efd', display: 'inline-block' }} />
                <span style={{ color: '#0d6efd' }}>Automation: {automationCount}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function KPIChart({ data, markers, selectedKpis: initialKpis }: KPIChartProps) {
  const [selectedKpis, setSelectedKpis] = useState<string[]>(initialKpis || ['sales', 'spend']);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const toggleKpi = (kpi: string) => {
    setSelectedKpis((prev) =>
      prev.includes(kpi) ? prev.filter((k) => k !== kpi) : [...prev, kpi]
    );
  };

  const filteredData = useMemo(() => filterByTimeRange(data, timeRange), [data, timeRange]);
  const filteredMarkers = useMemo(() => {
    if (filteredData.length === 0) return [];
    const dateSet = new Set(filteredData.map(d => d.date));
    return markers.filter(m => dateSet.has(m.date));
  }, [filteredData, markers]);

  const totalDays = filteredData.length;
  const tickInterval = getTickInterval(totalDays);

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
      {/* Top row: KPI toggles + time range selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(kpiConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => toggleKpi(key)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                selectedKpis.includes(key)
                  ? 'border-transparent text-white'
                  : 'border-[#e2e8f0] text-[#6c757d] bg-white hover:bg-[#f5f7fa]'
              }`}
              style={selectedKpis.includes(key) ? { backgroundColor: config.color } : undefined}
            >
              {config.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                timeRange === range
                  ? 'bg-[#151c29] text-white border-[#151c29]'
                  : 'bg-white text-[#6c757d] border-[#e2e8f0] hover:border-gray-300'
              }`}
            >
              {timeRangeLabels[range]}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#edf0f4" vertical={true} horizontal={true} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6c757d' }}
            tickLine={{ stroke: '#e2e8f0' }}
            axisLine={{ stroke: '#e2e8f0' }}
            interval={tickInterval}
            tickFormatter={(val) => formatXAxisTick(val, totalDays)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6c757d' }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip
            content={<ChartTooltip markers={markers} />}
          />

          {/* KPI Lines */}
          {selectedKpis.map((kpi) => (
            <Line
              key={kpi}
              type="monotone"
              dataKey={kpi}
              stroke={kpiConfig[kpi].color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}

          {/* Action markers as reference lines */}
          {filteredMarkers.map((marker, i) => (
            <ReferenceLine
              key={`marker-${i}`}
              x={marker.date}
              stroke={markerColors[marker.type] || '#6c757d'}
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Marker legend */}
      <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-[#e2e8f0]">
        {Object.entries(markerColors).map(([source, color]) => {
          const count = filteredMarkers.filter(m => m.type === source).length;
          return (
            <div key={source} className="flex items-center gap-1.5 text-xs text-[#6c757d]">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: color, borderTop: '1px dashed ' + color }} />
              <span>{markerLabels[source] || source}</span>
              <span className="text-[10px] bg-gray-100 px-1 rounded">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
