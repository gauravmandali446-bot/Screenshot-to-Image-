import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-8 md:py-12 text-center max-w-3xl mx-auto px-4" id="app-hero">
      {/* Privacy Badge */}
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-blue-700 text-xs font-medium mb-4 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <span>Convert PNG, WEBP, HEIC, AVIF, GIF & more</span>
      </div>

      {/* SEO H1 Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-4">
        Image to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">JPG</span> Converter
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
        Convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF and SVG images to JPG online for free. 
        Fast, secure, and works <span className="text-gray-900 font-semibold underline decoration-blue-500/30 decoration-2 underline-offset-2">directly in your browser</span>. 
        Your files never touch our servers.
      </p>

      {/* Trust Indicator */}
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 mt-5 text-[10px] sm:text-[11px] text-gray-400 font-mono max-w-sm sm:max-w-none mx-auto">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Secure
        </span>
        <span className="hidden sm:inline h-3 w-px bg-gray-200"></span>
        <span className="whitespace-nowrap">• No File Limits</span>
        <span className="hidden sm:inline h-3 w-px bg-gray-200"></span>
        <span className="whitespace-nowrap">• No Login Required</span>
      </div>
    </section>
  );
}
