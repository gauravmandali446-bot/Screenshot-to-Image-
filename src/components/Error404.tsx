import React, { useEffect } from 'react';
import { FileQuestion, Home, RefreshCw, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { navigate } from '../utils/navigation';

export default function Error404() {
  // Update document metadata dynamically for this error page
  useEffect(() => {
    document.title = "404 - Page Not Found | Image to JPG Converter";
    
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

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const categories = [
    { label: "Image to JPG", path: "/" },
    { label: "PNG to JPG", path: "/png-to-jpg" },
    { label: "WEBP to JPG", path: "/webp-to-jpg" },
    { label: "HEIC to JPG", path: "/heic-to-jpg" },
    { label: "FAQ Support", path: "/#faq" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-sans" id="error-404-container">
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
              <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] font-mono font-semibold tracking-wide uppercase">
                HTTP 404
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full text-center space-y-10 animate-fade-in">
          
          {/* Friendly Google-Inspired Illustration / Icon */}
          <div className="relative inline-flex items-center justify-center p-6 bg-red-50 rounded-full border border-red-100/50 shadow-2xs">
            <div className="absolute inset-0 bg-red-100/30 rounded-full animate-ping opacity-75"></div>
            <FileQuestion className="w-12 h-12 text-red-500" aria-hidden="true" />
          </div>

          {/* Heading Content */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              404 – Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back to optimizing your pictures!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/"
              onClick={handleGoHome}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="button"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </a>

            <a
              href="/"
              onClick={handleGoHome}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="button"
            >
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>Convert Image to JPG</span>
            </a>
          </div>

          {/* Sitemaps / Redirect Links Block */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-3xs space-y-5 text-left max-w-md mx-auto">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 tracking-wider uppercase text-center sm:text-left">
              Popular Conversion Channels
            </h2>
            <ul className="grid grid-cols-2 gap-3" aria-label="Quick links">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <a
                    href={cat.path}
                    onClick={(e) => handleLinkClick(e, cat.path)}
                    className="flex items-center space-x-1.5 py-1 px-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50/30 transition-all group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    <span>{cat.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-gray-50 bg-white/40 py-6 text-center text-xs text-gray-400 font-mono">
        <p>&copy; {new Date().getFullYear()} Image to JPG Converter. Clean. Local. Private.</p>
      </footer>
    </div>
  );
}
