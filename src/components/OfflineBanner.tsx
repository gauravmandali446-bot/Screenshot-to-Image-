import React, { useState, useEffect } from 'react';
import { WifiOff, Info, X } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false); // Reset dismissal on reconnect
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline || dismissed) return null;

  return (
    <div 
      className="bg-amber-50 border-b border-amber-100 py-3 px-4 sm:px-6 lg:px-8 relative z-50 animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        
        {/* Banner main content */}
        <div className="flex items-start sm:items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 flex-shrink-0 animate-pulse mt-0.5 sm:mt-0">
            <WifiOff className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
            You&apos;re offline. Since image conversion works locally, you can still continue converting images already loaded.
          </p>
        </div>

        {/* Dismiss and Info Controls */}
        <div className="flex items-center space-x-3 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
          <div className="hidden md:flex items-center space-x-1 text-[10px] sm:text-xs font-mono font-bold text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded-full">
            <Info className="w-3 h-3" />
            <span>100% Client-Side Engine</span>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-amber-500 hover:text-amber-700 hover:bg-amber-100/40 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 cursor-pointer"
            aria-label="Dismiss offline alert notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
