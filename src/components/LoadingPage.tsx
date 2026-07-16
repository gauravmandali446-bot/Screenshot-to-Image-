import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div 
      className="min-h-screen bg-gray-50/30 flex flex-col font-sans"
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      {/* Skeleton Navbar */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse border border-gray-100"></div>
              <div className="space-y-1.5">
                <div className="h-3.5 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-2 w-10 bg-gray-150 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-3.5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-3.5 w-10 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Loading main container */}
      <main className="flex-grow py-12 md:py-20 flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full px-4 text-center space-y-8">
          
          {/* Animated Spinner with text */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-blue-100 animate-pulse"></div>
              <Loader2 className="absolute w-8 h-8 text-blue-600 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800 animate-pulse">
                Preparing your Image to JPG Converter...
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-normal">
                Setting up high-performance offline graphics rendering pipeline
              </p>
            </div>
          </div>

          {/* Detailed Mock Skeleton Layout */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xs space-y-6 max-w-xl mx-auto">
            {/* Box Header Skeletons */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <div className="h-4 w-28 bg-gray-100 animate-pulse rounded-full"></div>
              <div className="h-3 w-16 bg-gray-100 animate-pulse rounded-full"></div>
            </div>

            {/* Simulated Drag & Drop Zone Skeleton */}
            <div className="border-2 border-dashed border-gray-100 rounded-2xl py-12 flex flex-col items-center justify-center space-y-4 bg-gray-50/20">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center"></div>
              <div className="h-3.5 w-44 bg-gray-100 animate-pulse rounded-full"></div>
              <div className="h-2.5 w-32 bg-gray-100/70 animate-pulse rounded-full"></div>
            </div>

            {/* Loading Progression Info Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-3 w-36 bg-gray-100 animate-pulse rounded-full"></div>
              <div className="h-3 w-12 bg-gray-100 animate-pulse rounded-full"></div>
            </div>
          </div>

          {/* Skeleton grid rows */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="p-4 bg-white/60 border border-gray-100/80 rounded-xl space-y-2">
                <div className="w-6 h-6 rounded-md bg-gray-100 animate-pulse"></div>
                <div className="h-2.5 w-12 bg-gray-100 animate-pulse rounded-full"></div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Loading Footer Skeleton */}
      <footer className="border-t border-gray-50 bg-white/40 py-6 text-center">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="h-3 w-32 bg-gray-100 animate-pulse rounded-full"></div>
          <div className="h-3 w-20 bg-gray-100 animate-pulse rounded-full"></div>
        </div>
      </footer>
    </div>
  );
}
