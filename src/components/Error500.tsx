import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { navigate } from '../utils/navigation';

export default function Error500() {
  // Update document metadata dynamically for this error page
  useEffect(() => {
    document.title = "Something went wrong | Image to JPG Converter";
    
    // Add robots noindex meta tag to ensure Google doesn't index it
    const metaRobots = document.createElement('meta');
    metaRobots.name = "robots";
    metaRobots.content = "noindex, follow";
    document.head.appendChild(metaRobots);

    return () => {
      // Cleanup the meta tag on exit
      document.head.removeChild(metaRobots);
    };
  }, []);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-sans" id="error-500-container">
      {/* Mini clean brand header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <a 
              href="/" 
              onClick={handleGoHome}
              className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              aria-label="Back to Image to JPG Converter Homepage"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shadow-sm group-hover:bg-blue-100 transition-colors">
                <ImageIcon className="w-4.5 h-4.5" />
              </div>
              <span className="font-semibold text-gray-900 tracking-tight text-sm">
                Image to JPG
              </span>
            </a>
            <div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-mono font-semibold tracking-wide uppercase">
                HTTP 500
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
          
          {/* Friendly Google-Inspired Illustration / Icon */}
          <div className="relative inline-flex items-center justify-center p-6 bg-amber-50 rounded-full border border-amber-100/50 shadow-2xs">
            <div className="absolute inset-0 bg-amber-100/30 rounded-full animate-pulse"></div>
            <AlertTriangle className="w-12 h-12 text-amber-500" aria-hidden="true" />
          </div>

          {/* Heading Content */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Something went wrong
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              We&apos;re experiencing a temporary issue. Please refresh the page or try again later. Since our converter processes images locally, a quick reload usually resolves any minor setup discrepancies.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="button"
              onClick={handleRefresh}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>Refresh Page</span>
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              <Home className="w-4 h-4 text-gray-400" />
              <span>Go Home</span>
            </button>
          </div>

          {/* Client-Side Safety Tip Box */}
          <div className="max-w-md mx-auto p-4 rounded-xl border border-blue-50 bg-blue-50/10 text-center flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed text-left font-medium">
              <b>Friendly reminder:</b> No files are ever lost or leaked during errors. Because our conversion pipeline runs fully on your device, your images remain completely private and secure.
            </p>
          </div>

        </div>
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-gray-50 bg-white/40 py-6 text-center text-xs text-gray-400 font-mono">
        <p>&copy; {new Date().getFullYear()} Image to JPG Converter. Safe, Local, Offline-first.</p>
      </footer>
    </div>
  );
}
