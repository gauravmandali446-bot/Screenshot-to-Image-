import React, { useState } from 'react';
import { ShieldCheck, X, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { navigate } from '../utils/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const formats = [
    { label: 'PNG to JPG', path: '/png-to-jpg' },
    { label: 'WEBP to JPG', path: '/webp-to-jpg' },
    { label: 'HEIC to JPG', path: '/heic-to-jpg' },
    { label: 'AVIF to JPG', path: '/avif-to-jpg' },
    { label: 'SVG to JPG', path: '/svg-to-jpg' },
  ];

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ Helpdesk', path: '/faq' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white py-12 md:py-16 relative" id="app-footer">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand and Slogan */}
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2.5">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-white shadow-3xs">
                <img 
                  src="/logo.png" 
                  alt="Image to JPG Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-gray-950 tracking-tight text-base">
                Image to JPG
              </span>
            </div>
            
            <p className="text-xs text-gray-500 font-normal leading-relaxed max-w-sm mx-auto md:mx-0">
              An offline-first, client-side converter designed for maximum safety, speed, and privacy. No file uploads, no storage logs, and no registrations. Files are converted 100% inside your browser sandbox.
            </p>

            {/* Social Links Placeholder */}
            <div className="flex items-center justify-center md:justify-start space-x-3.5 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50/50 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                aria-label="Follow us on Twitter/X (external link)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                aria-label="Follow us on LinkedIn (external link)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Conversions list */}
          <div className="space-y-3.5 text-center md:text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">
              Image to JPG
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-500">
              {formats.map((format) => (
                <li key={format.label}>
                  <a 
                    href={format.path} 
                    onClick={(e) => handleLink(e, format.path)}
                    className="hover:text-blue-600 hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                  >
                    {format.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3.5 text-center md:text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">
              Footer Quick Links
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-500">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.path} 
                    onClick={(e) => handleLink(e, link.path)}
                    className="hover:text-blue-600 hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-blue-600 cursor-pointer hover:underline transition-colors text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                  aria-label="View core privacy notice pop-up"
                >
                  Privacy Notice Popup
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[11px] text-gray-400 font-mono">
            &copy; {currentYear} Image to JPG Converter. All rights reserved. • Fast, Secure, Privacy-First.
          </p>
          <div className="flex items-center space-x-1 text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50/50 px-3 py-1 rounded-full border border-emerald-100/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% In-Browser Guaranteed Security</span>
          </div>
        </div>
      </div>

      {/* Pop-up Privacy Notice Modal */}
      {isPrivacyOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs transition-all animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="bg-white rounded-2xl border border-gray-100 max-w-md w-full p-6 shadow-xl space-y-4 relative animate-scale-up">
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
              aria-label="Close Privacy Policy notice"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
              <h2 id="privacy-modal-title" className="text-base sm:text-lg font-bold tracking-tight text-gray-900">
                Privacy Notice & Guarantee
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed space-y-3">
              <p>
                <b>Your security is structurally guaranteed.</b> This online utility processes all files locally inside your browser sandbox. No photo files are ever uploaded, recorded, or transmitted to any third-party servers.
              </p>
              <p>
                Because the entire conversion pipeline operates client-side via JavaScript, your data remains fully offline, secure, and private on your own device.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full py-3 min-h-[44px] bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:outline-hidden"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
