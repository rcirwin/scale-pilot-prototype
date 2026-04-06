'use client';

import { useState } from 'react';
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

export function KPIChart({ data, markers, selectedKpis: initialKpis }: KPIChartProps) {
  const [selectedKpis, setSelectedKpis] = useState<string[]>(initialKpis || ['sales', 'spend']);

  const toggleKpi = (kpi: string) => {
    setSelectedKpis((prev) =>
      prev.includes(kpi) ? prev.filter((k) => k !== kpi) : [...prev, kpi]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
      {/* KPI toggle buttons */}
      <div className="flex flex-wrap gap-1.5 mb-4">
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

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6c757d' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6c757d' }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={((value: any, name: any) => {
              const config = kpiConfig[name as string];
              const numVal = typeof value === 'number' ? value : Number(value);
              return config ? [config.format(numVal), config.label] : [String(value), name];
            }) as any}
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
          {markers.map((marker, i) => (
            <ReferenceLine
              key={`marker-${i}`}
              x={marker.date}
              stroke={markerColors[marker.type] || '#6c757d'}
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: '',
                position: 'top',
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Marker legend */}
      {markers.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[#e2e8f0]">
          {Object.entries(markerColors).map(([source, color]) => (
            <div key={source} className="flex items-center gap-1.5 text-xs text-[#6c757d]">
              <div className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
              {source}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
