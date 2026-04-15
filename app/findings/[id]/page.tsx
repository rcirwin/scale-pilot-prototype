'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { findings } from '@/data/findings';
import { recommendations } from '@/data/recommendations';
import { SeverityBadge } from '@/components/severity-badge';
import { CategoryBadge } from '@/components/category-badge';
import { ChatSlideout } from '@/components/chat-slideout';
import { ArrowLeft, MessageSquare, CheckCircle, X, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function FindingDetail() {
  const params = useParams();
  const finding = findings.find(f => f.id === params.id);
  const [chatOpen, setChatOpen] = useState(false);

  if (!finding) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6c757d]">Finding not found</p>
      </div>
    );
  }

  // Find related recommendations by matching category or entity
  const relatedRecs = recommendations.filter(r => {
    const findingText = (finding.title + finding.summary + finding.actions.join(' ')).toLowerCase();
    const recText = (r.title + r.summary + r.entity).toLowerCase();
    // Simple matching: check for keyword overlap
    const findingWords = new Set(findingText.split(/\s+/).filter(w => w.length > 5));
    return [...findingWords].some(w => recText.includes(w));
  });

  return (
    <div className="max-w-[1000px] space-y-4 sm:space-y-6">
      {/* Back link */}
      <Link href="/findings" className="inline-flex items-center gap-1.5 text-sm text-[#6c757d] hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Findings
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <SeverityBadge severity={finding.severity} />
            <CategoryBadge category={finding.executionMethod} />
            <span className="text-xs text-[#6c757d] bg-gray-100 px-2 py-0.5 rounded">{finding.category}</span>
          </div>
          <span className="text-xs text-[#6c757d]">
            {new Date(finding.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{finding.title}</h1>
        <p className="text-sm text-[#6c757d] leading-relaxed">{finding.summary}</p>
      </div>

      {/* Narrative */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Analysis</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {finding.narrative}
        </div>
      </div>

      {/* Evidence */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Supporting Evidence</h2>
        <div className="overflow-x-auto">
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
      </div>

      {/* Recommended Actions — linked to optimizer */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Recommended Actions</h2>
        <ol className="space-y-3">
          {finding.actions.map((action, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#45a19c] text-white text-xs flex items-center justify-center font-medium mt-0.5">{i + 1}</span>
              <div className="flex-1">
                <span>{action}</span>
                {/* Try to link to related recommendation */}
                {relatedRecs[i] && (
                  <Link
                    href={`/optimizer?highlight=${relatedRecs[i].id}`}
                    className="ml-2 inline-flex items-center gap-1 text-xs text-[#0d6efd] hover:underline"
                  >
                    View in Optimizer <ExternalLink size={10} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Related Recommendations from Scale Optimizer */}
      {relatedRecs.length > 0 && (
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Related Scale Optimizer Recommendations</h2>
          <div className="space-y-2">
            {relatedRecs.map(rec => (
              <Link
                key={rec.id}
                href={`/optimizer?highlight=${rec.id}`}
                className="flex items-center justify-between p-3 rounded-lg border border-[#e2e8f0] hover:border-[#45a19c] transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      rec.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      rec.status === 'accepted' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                    </span>
                    <CategoryBadge category={rec.category} />
                  </div>
                  <p className="text-sm text-gray-800 leading-snug truncate">{rec.title}</p>
                  <p className="text-xs text-green-600 mt-0.5">{rec.expectedImpact}</p>
                </div>
                <ArrowRight size={16} className="text-[#6c757d] group-hover:text-[#45a19c] transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Confidence + Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-[#45a19c]" />
            <h3 className="text-sm font-semibold text-gray-900">Confidence: {finding.confidence}</h3>
          </div>
          <p className="text-sm text-[#6c757d]">{finding.confidenceReason}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h3>
          <div className="flex flex-wrap gap-1.5">
            {finding.dataSources.map((ds, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs text-[#6c757d] rounded">{ds}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="px-5 py-2.5 bg-[#0d6efd] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Accept Recommendation
        </button>
        <button className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#6c757d] text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
          <X className="w-4 h-4" /> Dismiss
        </button>
        <button
          onClick={() => setChatOpen(true)}
          className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#45a19c] text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 ml-auto"
        >
          <MessageSquare className="w-4 h-4" /> Discuss with Scale Pilot
        </button>
      </div>

      <ChatSlideout
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        contextTitle={finding.title}
        contextDetail={finding.summary + '\n\n**Evidence:**\n' + finding.evidence.map(e => `- ${e.metric}: ${e.current}`).join('\n')}
      />
    </div>
  );
}
