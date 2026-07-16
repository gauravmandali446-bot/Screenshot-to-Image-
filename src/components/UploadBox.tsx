import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, FileImage, ShieldCheck } from 'lucide-react';

interface UploadBoxProps {
  onFilesAdded: (files: File[]) => void;
  compact?: boolean;
}

export default function UploadBox({ onFilesAdded, compact = false }: UploadBoxProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clipboard Paste Support (Ctrl + V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const pastedFiles: File[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            // Create a unique file name for the pasted image
            const ext = item.type.split('/')[1] || 'png';
            const pastedFile = new File([file], `pasted-image-${Date.now()}-${i}.${ext}`, {
              type: file.type
            });
            pastedFiles.push(pastedFile);
          }
        }
      }
      
      if (pastedFiles.length > 0) {
        onFilesAdded(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [onFilesAdded]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (compact) {
    return (
      <div 
        id="compact-upload-box"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        tabIndex={0}
        role="button"
        aria-label="Add more images"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onButtonClick();
          }
        }}
        className={`group border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-1 bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:outline-hidden ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50/30' 
            : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept="image/*,.heic,.heif,.tiff,.tif" 
          className="hidden" 
          onChange={handleFileInput}
        />
        <UploadCloud className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-xs font-medium text-gray-700">Add more images</span>
        <span className="text-[10px] text-gray-400 font-mono">Drop or Ctrl+V</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4" id="main-upload-box">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 md:p-14 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50/40 shadow-sm scale-[0.99]'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/30 shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload-input"
          multiple
          accept="image/*,.heic,.heif,.tiff,.tif"
          className="hidden"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Animated Cloud Icon */}
          <div className={`p-4 rounded-full transition-all duration-300 ${isDragActive ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-gray-50 text-gray-400 group-hover:scale-105'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">
              Drag and drop your images here
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              or paste from clipboard using <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-semibold text-gray-500">Ctrl + V</kbd>
            </p>
          </div>

          <div>
            <button
              onClick={onButtonClick}
              id="select-files-btn"
              type="button"
              className="px-6 py-3 min-h-[44px] rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 hover:shadow-md cursor-pointer inline-flex items-center space-x-1.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-hidden"
            >
              <FileImage className="w-4 h-4" />
              <span>Select Files</span>
            </button>
          </div>

          {/* Formats notice */}
          <div className="pt-3 border-t border-gray-100 w-full max-w-md">
            <p className="text-[11px] text-gray-400 font-mono tracking-tight leading-relaxed">
              Supports: PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, SVG
            </p>
            <p className="text-[10px] text-emerald-600/80 font-mono mt-1 flex flex-wrap items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side: Conversion happens entirely on your machine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
