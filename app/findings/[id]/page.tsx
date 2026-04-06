'use client';

import { useParams } from 'next/navigation';
import { findings } from '@/data/findings';
import { SeverityBadge } from '@/components/severity-badge';
import { CategoryBadge } from '@/components/category-badge';
import { ArrowLeft, MessageSquare, CheckCircle, X, Shield } from 'lucide-react';
import Link from 'next/link';

export default function FindingDetail() {
  const params = useParams();
  const finding = findings.find(f => f.id === params.id);

  if (!finding) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6c757d]">Finding not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] space-y-6">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6c757d] hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <SeverityBadge severity={finding.severity} />
            <CategoryBadge category={finding.executionMethod} />
          </div>
          <span className="text-xs text-[#6c757d]">{finding.timestamp}</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-3">{finding.title}</h1>
        <p className="text-sm text-[#6c757d] leading-relaxed">{finding.summary}</p>
      </div>

      {/* Narrative */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Analysis</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {finding.narrative}
        </div>
      </div>

      {/* Evidence */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Supporting Evidence</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-[#6c757d] font-medium">Metric</th>
              <th className="text-right py-2 text-[#6c757d] font-medium">Current</th>
              <th className="text-right py-2 text-[#6c757d] font-medium">Previous</th>
              <th className="text-right py-2 text-[#6c757d] font-medium">Delta</th>
            </tr>
          </thead>
          <tbody>
            {finding.evidence.map((e, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-2.5 text-gray-800">{e.metric}</td>
                <td className="py-2.5 text-right font-medium text-gray-900">{e.current}</td>
                <td className="py-2.5 text-right text-[#6c757d]">{e.previous || '—'}</td>
                <td className={`py-2.5 text-right font-medium ${
                  e.delta?.startsWith('+') ? 'text-green-600' :
                  e.delta?.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>{e.delta || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Recommended Actions</h2>
        <ol className="space-y-2">
          {finding.actions.map((action, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#45a19c] text-white text-xs flex items-center justify-center font-medium">{i + 1}</span>
              <span>{action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Confidence + Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-[#45a19c]" />
            <h3 className="text-sm font-semibold text-gray-900">Confidence: {finding.confidence}</h3>
          </div>
          <p className="text-sm text-[#6c757d]">{finding.confidenceReason}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h3>
          <div className="flex flex-wrap gap-1.5">
            {finding.dataSources.map((ds, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs text-[#6c757d] rounded">{ds}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2.5 bg-[#0d6efd] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Accept Recommendation
        </button>
        <button className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#6c757d] text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
          <X className="w-4 h-4" /> Dismiss
        </button>
        <Link href="/chat" className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#45a19c] text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 ml-auto">
          <MessageSquare className="w-4 h-4" /> Ask Scale Pilot about this
        </Link>
      </div>
    </div>
  );
}
