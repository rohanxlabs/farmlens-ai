import { useEffect, useState } from 'react';

export interface AnalysisResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "None";
  affectedArea: string;
  treatment: {
    pesticide: string;
    dosage: string;
    schedule: string;
  };
  description: string;
}

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const [mounted, setMounted] = useState(false);
  const [confidenceWidth, setConfidenceWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setConfidenceWidth(result.confidence);
    }, 400);
    return () => clearTimeout(timer);
  }, [result.confidence]);

  const isHealthy = result.disease === "Healthy";
  const severityColors = {
    Low: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: '#F59E0B' },
    Medium: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#F97316' },
    High: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#EF4444' },
    None: { bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.3)', text: '#4ADE80' }
  };

  const badgeStyle = isHealthy 
    ? { backgroundColor: 'rgba(74,222,128,0.15)', borderColor: 'rgba(74,222,128,0.3)', color: '#4ADE80' }
    : result.severity === 'High'
    ? { backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.3)', color: '#EF4444' }
    : { backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)', color: '#F59E0B' };

  const badgeText = isHealthy ? '✓ Healthy' : result.severity === 'High' ? '✕ Severe Infection' : '⚠ Disease Detected';

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-2xl border p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease'
      }}
    >
      {/* Status Badge */}
      <div className="flex justify-start mb-4">
        <span
          className="px-3 py-1 rounded-lg text-sm font-medium border"
          style={badgeStyle}
        >
          {badgeText}
        </span>
      </div>

      {/* Disease Name */}
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#F0FDF4' }}>
        {result.disease}
      </h2>
      <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
        {result.description}
      </p>

      {/* Confidence Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: '#6B7280' }}>Confidence</span>
          <span className="text-sm font-semibold" style={{ color: '#4ADE80' }}>
            {result.confidence}%
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: '#4ADE80',
              width: `${confidenceWidth}%`,
              transition: 'width 1s ease'
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: '#6B7280' }}>
          Affected Area: {result.affectedArea}
        </p>
      </div>

      {/* Severity Indicator */}
      <div className="mb-6">
        <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Severity</p>
        <div className="flex gap-2">
          {(['Low', 'Medium', 'High'] as const).map((level) => (
            <div
              key={level}
              className="flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium"
              style={{
                backgroundColor: result.severity === level 
                  ? severityColors[level].bg 
                  : 'rgba(255,255,255,0.05)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: result.severity === level 
                  ? severityColors[level].border 
                  : 'transparent',
                color: result.severity === level 
                  ? severityColors[level].text 
                  : '#6B7280'
              }}
            >
              {level}
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Plan */}
      <div
        className="rounded-2xl p-4 border"
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#F0FDF4' }}>
          💊 Treatment Plan
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Pesticide', value: result.treatment.pesticide },
            { label: 'Dosage', value: result.treatment.dosage },
            { label: 'Schedule', value: result.treatment.schedule }
          ].map((item, index, arr) => (
            <div
              key={item.label}
              className={`flex justify-between items-center ${
                index < arr.length - 1 ? 'pb-3' : ''
              }`}
              style={{
                borderBottom: index < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}
            >
              <span className="text-sm" style={{ color: '#6B7280' }}>{item.label}</span>
              <span className="text-sm font-medium text-right" style={{ color: '#F0FDF4' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
