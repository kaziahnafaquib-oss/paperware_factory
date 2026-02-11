// 📊 SEO & Performance Report Component
import { useEffect, useState } from 'react';
import { generateLanguageReport, getTranslationSummary } from '@/app/lib/language-checker';
import { seoChecklist, performanceOptimizations } from '@/app/lib/seo-enhanced';

export function SEOReport() {
  const [report, setReport] = useState<string>('');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const langReport = generateLanguageReport();
    const langSummary = getTranslationSummary();
    
    setReport(langReport);
    setSummary(langSummary);
    
    console.log(langReport);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm">
      <details className="bg-white rounded-lg shadow-2xl border border-zinc-200">
        <summary className="p-4 cursor-pointer font-bold text-sm hover:bg-zinc-50 transition-colors">
          📊 SEO & Language Report
        </summary>
        
        <div className="p-4 max-h-96 overflow-y-auto text-xs border-t border-zinc-200">
          {summary && (
            <div className="mb-4 p-3 bg-[#fabf37] bg-opacity-10 rounded">
              <div className="font-bold mb-2">🌐 Bangla Coverage:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Total Keys:</div>
                <div className="font-mono">{summary.totalKeys}</div>
                
                <div>Translated:</div>
                <div className="font-mono">{summary.banglaKeys}</div>
                
                <div>Coverage:</div>
                <div className="font-mono font-bold">{summary.banglaPercentage}%</div>
                
                <div>Status:</div>
                <div className={`font-bold ${
                  summary.status === 'complete' ? 'text-green-600' :
                  summary.status === 'good' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {summary.status.toUpperCase()}
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <div className="font-bold mb-1">✅ SEO Checklist:</div>
              <div className="space-y-1">
                {seoChecklist.critical.slice(0, 5).map((item, i) => (
                  <div key={i} className="text-xs text-zinc-600">{item}</div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="font-bold mb-1">⚡ Performance:</div>
              <div className="space-y-1">
                {performanceOptimizations.loading.slice(0, 3).map((item, i) => (
                  <div key={i} className="text-xs text-zinc-600">• {item}</div>
                ))}
              </div>
            </div>
          </div>
          
          <pre className="mt-4 p-2 bg-zinc-100 rounded text-[10px] overflow-x-auto whitespace-pre-wrap">
            {report}
          </pre>
        </div>
      </details>
    </div>
  );
}
