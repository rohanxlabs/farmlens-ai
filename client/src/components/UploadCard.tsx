import { useState, useRef, DragEvent } from 'react';

interface UploadCardProps {
  onAnalyze: (file: File) => void;
}

export default function UploadCard({ onAnalyze }: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="w-full rounded-2xl border p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}
    >
      {!previewUrl ? (
        <div
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all"
          style={{
            borderColor: isDragging ? '#4ADE80' : 'rgba(255,255,255,0.15)',
            backgroundColor: isDragging ? 'rgba(74,222,128,0.05)' : 'transparent'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mb-4 text-5xl">📸</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#F0FDF4' }}>
            Drop your crop photo here
          </h3>
          <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
            or click to browse from your device
          </p>
          <div
            className="inline-block px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: 'rgba(74,222,128,0.15)',
              color: '#4ADE80'
            }}
          >
            Choose File
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div>
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={previewUrl}
              alt="Crop preview"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAnalyzeClick}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: '#4ADE80',
                color: '#0A0F0A'
              }}
            >
              🔬 Analyze Crop
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-6 rounded-lg font-medium transition-all border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#F0FDF4'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
