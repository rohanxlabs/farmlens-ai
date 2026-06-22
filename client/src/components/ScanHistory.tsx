import React, { useState, useEffect } from 'react';

interface Scan {
  id: number;
  disease: string;
  confidence: number;
  severity: string;
  affected_area: string;
  pesticide: string;
  dosage: string;
  schedule: string;
  description: string;
  created_at: string;
}

const glassmorphicCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(24px) saturate(200%)',
  WebkitBackdropFilter: 'blur(24px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '24px',
  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4)',
};

const severityStyles: { [key: string]: React.CSSProperties } = {
  Low: {
    color: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  Medium: {
    color: '#F97316',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.2)',
  },
  High: {
    color: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  Healthy: {
    color: '#4ADE80',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
};

const ScanHistory: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await fetch('/api/scans');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScans(data);
      } catch (err) {
        setError('Failed to load scan history');
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl animate-pulse"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="p-5 text-center rounded-2xl"
          style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
          }}
        >
          {error}
        </div>
      );
    }

    if (scans.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-base font-semibold text-[#F0FDF4]">No scans yet</h3>
          <p className="text-sm text-[rgba(240,253,244,0.4)]">
            Upload a crop photo to get started
          </p>
        </div>
      );
    }

    return (
      <div>
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="group mb-2.5 flex justify-between items-center p-4 rounded-2xl transition-all duration-200 ease-in-out cursor-default"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            <div>
              <h4 className="text-sm font-semibold text-[#F0FDF4] mb-1">
                {scan.disease}
              </h4>
              <p className="text-xs text-[rgba(240,253,244,0.35)]">
                {formatDate(scan.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  color: '#4ADE80',
                  backgroundColor: 'rgba(74, 222, 128, 0.08)',
                  borderColor: 'rgba(74, 222, 128, 0.15)',
                }}
              >
                {scan.confidence}%
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                style={severityStyles[scan.severity] || severityStyles.Healthy}
              >
                {scan.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6" style={glassmorphicCardStyle}>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-bold text-[#F0FDF4]">🕒 Recent Scans</h2>
          <p className="text-sm text-[rgba(240,253,244,0.4)]">
            Your last 10 crop diagnoses
          </p>
        </div>
        {!loading && !error && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              color: '#4ADE80',
              background: 'rgba(74, 222, 128, 0.08)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
            }}
          >
            {scans.length} scans
          </span>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default ScanHistory;