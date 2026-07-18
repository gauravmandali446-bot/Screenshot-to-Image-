import { useState } from 'react';
import { 
  Trash2, 
  Download, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Settings, 
  FileArchive, 
  RefreshCw, 
  Play, 
  Info,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { ConversionItem } from '../types';
import { formatBytes } from '../utils/converter';
import UploadBox from './UploadBox';

interface ConverterProps {
  items: ConversionItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuality: (id: string, quality: number) => void;
  onConvert: (id: string) => void;
  onConvertAll: () => void;
  onDownload: (item: ConversionItem) => void;
  onDownloadAllZip: () => void;
  onClearAll: () => void;
  onAddMoreFiles: (files: File[]) => void;
}

export default function Converter({
  items,
  onRemoveItem,
  onUpdateQuality,
  onConvert,
  onConvertAll,
  onDownload,
  onDownloadAllZip,
  onClearAll,
  onAddMoreFiles,
}: ConverterProps) {
  const [globalQuality, setGlobalQuality] = useState<number>(90);
  const [showBulkSettings, setShowBulkSettings] = useState<boolean>(false);

  const pendingItems = items.filter(item => item.status === 'pending');
  const convertingItems = items.filter(item => item.status === 'converting');
  const successItems = items.filter(item => item.status === 'success');
  const errorItems = items.filter(item => item.status === 'error');

  const allConverted = successItems.length > 0 && pendingItems.length === 0 && convertingItems.length === 0;
  const isConvertingAny = convertingItems.length > 0;

  // Handler to set global quality and update all pending items
  const handleGlobalQualityChange = (val: number) => {
    setGlobalQuality(val);
    items.forEach(item => {
      if (item.status === 'pending') {
        onUpdateQuality(item.id, val);
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-6 animate-fade-in" id="active-converter">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
            {items.length} {items.length === 1 ? 'Image' : 'Images'} Loaded
          </span>
          {successItems.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {successItems.length} Converted
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowBulkSettings(!showBulkSettings)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
            {showBulkSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={onClearAll}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Global Setting Slider Panel */}
      {showBulkSettings && (
        <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl space-y-3 animate-slide-down">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1.5 text-xs font-medium text-gray-700">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Apply Quality to All Pending Images</span>
            </div>
            <span className="text-xs font-bold text-blue-600 font-mono">{globalQuality}%</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="60"
              max="100"
              value={globalQuality}
              onChange={(e) => handleGlobalQualityChange(parseInt(e.target.value))}
              className="w-full h-2 sm:h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            />
            <span className="text-[10px] text-gray-400 font-mono w-16 text-right">
              {globalQuality >= 90 ? 'High (Best)' : globalQuality >= 75 ? 'Medium' : 'Low (Compact)'}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            * Note: Quality adjustments will only apply to images that have not been converted yet. Higher values preserve maximum visual details but create larger file sizes.
          </p>
        </div>
      )}

      {/* Active Files Grid / List */}
      <div className="space-y-3">
        {items.map((item) => {
          const extension = item.name.split('.').pop()?.toUpperCase() || '';
          const savingsPercent = item.convertedSize && item.originalSize
            ? Math.round(((item.originalSize - item.convertedSize) / item.originalSize) * 100)
            : 0;

          return (
            <div 
              key={item.id}
              className={`bg-white border rounded-2xl p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 relative group ${
                item.status === 'success' 
                  ? 'border-emerald-100 shadow-xs' 
                  : item.status === 'error' 
                  ? 'border-red-100 shadow-xs bg-red-50/10'
                  : 'border-gray-100 hover:border-gray-200 shadow-xs'
              }`}
            >
              {/* Left Column: Preview + File Info */}
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                {/* Thumbnail Preview */}
                <div className="relative w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.convertedUrl || item.previewUrl ? (
                    <img 
                      src={item.convertedUrl || item.previewUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400">{extension}</span>
                  )}
                  {/* Badge representing type */}
                  <span className="absolute bottom-0 right-0 left-0 bg-black/60 text-white text-[9px] font-mono py-0.5 text-center leading-none">
                    {extension}
                  </span>
                </div>

                {/* Meta details */}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h3 
                    title={item.name} 
                    className="text-xs sm:text-sm font-medium text-gray-800 truncate pr-6"
                  >
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-400 font-mono">
                    <span>{formatBytes(item.originalSize)}</span>
                    <span className="h-2 w-px bg-gray-200"></span>
                    <span>
                      {item.originalWidth && item.originalHeight 
                        ? `${item.originalWidth} × ${item.originalHeight} px` 
                        : 'Loading size...'}
                    </span>
                    {item.status === 'success' && item.convertedSize && (
                      <>
                        <span className="h-2 w-px bg-gray-200"></span>
                        <span className="text-emerald-600 font-semibold">
                          JPG: {formatBytes(item.convertedSize)}
                        </span>
                        {savingsPercent > 0 && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.2 rounded font-semibold font-sans">
                            Saved {savingsPercent}%
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Individual error state message */}
                  {item.status === 'error' && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-sans">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{item.errorMessage || 'Conversion failed. Please try another file.'}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Middle Column: Quality slider (only for pending) */}
              {item.status === 'pending' && (
                <div className="w-full md:w-44 flex flex-col space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>Quality</span>
                    <span className="text-blue-600 font-bold">{item.quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={item.quality}
                    onChange={(e) => onUpdateQuality(item.id, parseInt(e.target.value))}
                    className="w-full h-2 sm:h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                  />
                </div>
              )}

              {/* Right Column: Status and Individual Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                {/* Status Indicator */}
                <div className="text-xs">
                  {item.status === 'pending' && (
                    <span className="text-gray-400 font-medium text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                      Ready to Convert
                    </span>
                  )}
                  {item.status === 'converting' && (
                    <div className="flex items-center space-x-1.5 text-blue-600 font-medium font-mono text-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Converting...</span>
                    </div>
                  )}
                  {item.status === 'success' && (
                    <div className="flex items-center space-x-1 text-emerald-600 font-medium text-xs bg-emerald-50/50 border border-emerald-100/30 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Converted</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {item.status === 'pending' && (
                    <button
                      onClick={() => onConvert(item.id)}
                      className="px-4 py-2.5 sm:px-3.5 sm:py-1.5 min-h-[44px] sm:min-h-0 text-sm sm:text-xs font-semibold rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Convert</span>
                    </button>
                  )}

                  {item.status === 'success' && (
                    <button
                      onClick={() => onDownload(item)}
                      className="px-4 py-2.5 sm:px-3.5 sm:py-1.5 min-h-[44px] sm:min-h-0 text-sm sm:text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}

                  {/* Remove Item */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-hidden"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add More Files Area */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <UploadBox onFilesAdded={onAddMoreFiles} compact={true} />
          
          <div className="bg-blue-50/35 border border-blue-100/30 rounded-xl p-4 flex flex-col justify-center space-y-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1.5 text-blue-800 font-medium">
              <Info className="w-4 h-4 text-blue-500" />
              <span>Conversion tips</span>
            </div>
            <p className="leading-normal">
              For print or high resolution images, keep the slider at <b>90%–100%</b>. For web graphics or quick sharing, <b>75%–85%</b> achieves the best balance between storage compression and visual fidelity.
            </p>
          </div>
        </div>
      )}

      {/* Bulk action sticky footer */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs font-medium text-gray-400">STATUS PREVIEW</p>
          <p className="text-sm font-semibold text-gray-800 mt-0.5">
            {pendingItems.length > 0 
              ? `${pendingItems.length} images pending conversion` 
              : successItems.length > 0 
              ? `All conversions complete!` 
              : 'Add some images to begin'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          {pendingItems.length > 0 && (
            <button
              onClick={onConvertAll}
              disabled={isConvertingAny}
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center space-x-2 ${
                isConvertingAny 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {isConvertingAny ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Converting {convertingItems.length}...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Convert All to JPG</span>
                </>
              )}
            </button>
          )}

          {successItems.length > 0 && (
            <button
              onClick={onDownloadAllZip}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
            >
              <FileArchive className="w-4 h-4" />
              <span>Download All as ZIP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
