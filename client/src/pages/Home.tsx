import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import ResultCard from '../components/ResultCard';
import ScanHistory from '../components/ScanHistory';
import ScanningLoader from '../components/ScanningLoader';
import type { AnalysisResult } from '../components/ResultCard';
import ScanningLoader from '../components/ScanningLoader';
import ScanHistory from '../components/ScanHistory';
import FarmAdvisor from '../components/FarmAdvisor';

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanKey, setScanKey] = useState(0);

  const handleAnalyze = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
      setScanKey(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#0A0F0A',
        backgroundImage: 'radial-gradient(ellipse at top, rgba(74,222,128,0.04) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-[680px] mx-auto px-5 py-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span
              className="text-[13px] font-medium px-3.5 py-1.5 rounded-full border"
              style={{
                backgroundColor: 'rgba(74,222,128,0.08)',
                borderColor: 'rgba(74,222,128,0.15)',
                color: '#4ADE80'
              }}
            >
              🌿 AI-Powered Plant Pathology
            </span>
          </div>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: '#F0FDF4', letterSpacing: '-1px' }}
          >
            FarmLens AI
          </h1>
          <p
            className="text-base max-w-[480px] mx-auto"
            style={{ color: '#6B7280' }}
          >
            Upload a crop photo and get instant AI-powered disease diagnosis and treatment plan
          </p>
        </div>

        {/* Upload Card */}
        <UploadCard onAnalyze={handleAnalyze} />

        {/* Loading State */}
        {isLoading && <ScanningLoader />}

        {/* Error State */}
        {error && (
          <div
            className="w-full rounded-2xl border p-6 mt-6"
            style={{
              backgroundColor: 'rgba(239,68,68,0.08)',
              borderColor: 'rgba(239,68,68,0.2)'
            }}
          >
            <p className="font-semibold mb-1" style={{ color: '#EF4444' }}>
              {error}
            </p>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Please try uploading a different image
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="mt-6">
            <ResultCard result={result} />
          </div>
        )}

<<<<<<< HEAD
        <div style={{
          height: '1px',
          margin: '40px 0',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
        }} />

        <ScanHistory refreshKey={scanKey} />

        <div style={{
          height: '1px',
          margin: '40px 0',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
        }} />

        <FarmAdvisor />
=======
        {/* Divider */}
        <div
          className="h-px my-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
          }}
        />

        {/* Scan History */}
        <ScanHistory key={scanKey} />
>>>>>>> 6b2041f152492a2c77aa1b5a1bac61ac69606cbe

        {/* Footer */}
        <div className="text-center mt-15">
          <p
            className="text-xs"
            style={{ color: 'rgba(107,114,128,0.6)' }}
          >
            Powered by OpenRouter · Gemini Vision · Built by Eren
          </p>
        </div>
      </div>
    </div>
  );
}