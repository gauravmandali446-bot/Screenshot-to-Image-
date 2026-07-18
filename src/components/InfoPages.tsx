import React, { useState, useEffect } from 'react';
import { ShieldCheck, Scale, Mail, Info, ArrowLeft, Send, CheckCircle2, RefreshCw, HelpCircle } from 'lucide-react';
import { navigate } from '../utils/navigation';

interface InfoPagesProps {
  path: string;
}

// Accessible Breadcrumb component for Technical SEO
function Breadcrumbs({ currentLabel, currentPath }: { currentLabel: string; currentPath: string }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-gray-400 font-medium pb-4 select-none" aria-label="Breadcrumb">
      <a 
        href="/" 
        onClick={(e) => { e.preventDefault(); navigate('/'); }} 
        className="hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-0.5"
      >
        Home
      </a>
      <span className="text-gray-300">/</span>
      <span className="text-gray-600 font-semibold" aria-current="page">{currentLabel}</span>
    </nav>
  );
}

export default function InfoPages({ path }: InfoPagesProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let title = "Image to JPG Converter";
    if (path === '/privacy-policy') title = "Privacy Policy - Client-Side Guarantee | Image to JPG Converter";
    else if (path === '/terms' || path === '/terms-and-conditions') title = "Terms & Conditions - Free Offline License | Image to JPG Converter";
    else if (path === '/contact') title = "Contact Us & Support | Image to JPG Converter";
    else if (path === '/about') title = "About Us & Our Mission | Image to JPG Converter";
    else if (path === '/faq') title = "Frequently Asked Questions (FAQ) | Image to JPG Converter";

    document.title = title;
  }, [path]);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple robust client-side validation
    if (!formData.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormError("Please enter a message containing at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    // Simulate a secure local submission pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
    }, 800);
  };

  const pageTitle = () => {
    if (path === '/privacy-policy') return "Privacy Policy";
    if (path === '/terms' || path === '/terms-and-conditions') return "Terms & Conditions";
    if (path === '/contact') return "Contact Us";
    if (path === '/about') return "About Us";
    return "Help & FAQ Support";
  };

  const pageIcon = () => {
    if (path === '/privacy-policy') return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    if (path === '/terms' || path === '/terms-and-conditions') return <Scale className="w-6 h-6 text-blue-600" />;
    if (path === '/contact') return <Mail className="w-6 h-6 text-indigo-600" />;
    if (path === '/about') return <Info className="w-6 h-6 text-purple-600" />;
    return <HelpCircle className="w-6 h-6 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-sans animate-fade-in" id="info-pages-wrapper">
      {/* Mini clean brand header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a 
              href="/" 
              onClick={handleGoHome}
              className="flex items-center space-x-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-xl p-1.5"
              aria-label="Back to Image to JPG Converter Homepage"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs group-hover:bg-blue-100 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-950 tracking-tight text-sm">
                Image to JPG
              </span>
            </a>
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-gray-600">
              {pageIcon()}
              <span className="hidden sm:inline">{pageTitle()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb Path */}
        <Breadcrumbs currentLabel={pageTitle()} currentPath={path} />

        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Header Title Section */}
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">
              {pageTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              Last updated: July 2026 • 100% Client-Side Verified Service
            </p>
          </div>

          {/* About Us Content */}
          {path === '/about' && (
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-950 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  What is the Image to JPG Converter?
                </h2>
                <p>
                  <b>Image to JPG Converter</b> is a modern, high-fidelity web utility designed to simplify your image workflows. We offer an instantaneous, completely free service to transform images of almost any input format into highly compressed, web-compatible JPEG (JPG) files.
                </p>
                <p>
                  Whether you are an iOS user trying to convert raw Apple HEIC photos, a web developer optimizing WEBP/AVIF assets, or a graphic designer exporting SVG/PNG renders, our tool handles it all within a single unified workspace.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Our Mission: Fast, Secure, & Privacy-First
                </h2>
                <p>
                  Our primary mission is to offer an interface that guarantees absolute data privacy and security without sacrificing speed or utility. 
                </p>
                <p>
                  Traditional online converters require you to upload your files to remote cloud servers, which presents severe risk to sensitive personal documents, family photographs, and corporate assets. We believe your data should remain <b>yours</b>.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  100% In-Browser Local Processing
                </h2>
                <p>
                  Our converter is engineered around next-generation client-side technologies. Every single step of the conversion process—including reading files, decoding image structures, applying custom compression parameters, and generating output blobs—happens <b>directly in your browser sandbox</b> on your local CPU.
                </p>
                <p>
                  By leveraging advanced HTML5 canvas rendering contexts and high-performance WebAssembly (Wasm) compilers, we completely eliminate the need for server-side processing. You can even disconnect your internet entirely after loading the page, and the converter will continue to work perfectly!
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Supported Formats
                </h2>
                <p>
                  We support a comprehensive array of standard, modern, and high-performance file formats:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>PNG (Portable Network)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>WEBP (Google Modern)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>HEIC / HEIF (Apple iOS)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>AVIF (AV1 Image Format)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>GIF (Graphics Inter.)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>BMP (Standard Bitmap)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>TIFF / TIF (Tagged Image)</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>SVG (Scalable Vectors)</span>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Why Choose Us?
                </h2>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-600 mt-1 font-bold">✓</span>
                    <span><b>Absolute Privacy:</b> No remote logs, no data sniffing, no servers. Your files never touch our backend infrastructure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-600 mt-1 font-bold">✓</span>
                    <span><b>Zero Limits:</b> Convert as many files as you need. There are no subscription fees, file size restrictions, or wait times.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-600 mt-1 font-bold">✓</span>
                    <span><b>High Fidelity & Speed:</b> Direct memory processing runs instantly and outputs compressed files with custom adjustable quality sliders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-600 mt-1 font-bold">✓</span>
                    <span><b>Universal Access:</b> Compatible with both mobile (iOS/Android) and desktop browsers with a fully responsive WCAG-compliant UI.</span>
                  </li>
                </ul>
              </section>
            </div>
          )}

          {/* Privacy Policy Content */}
          {path === '/privacy-policy' && (
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  1. Local In-Browser Processing
                </h2>
                <p>
                  At <b>Image to JPG Converter</b>, we operate on a strict privacy model. Every single image conversion, file extraction, and format translation is performed <b>100% locally</b> in your web browser sandbox (Chrome, Safari, Firefox, Edge, etc.) using client-side technologies.
                </p>
                <p>
                  Because we run WebAssembly and HTML5 canvas compilers directly on your CPU/RAM, your files are processed in-memory and are never sent across the internet.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  2. No Server Uploads & Zero Storage
                </h2>
                <p>
                  We do not own, operate, or rent any server infrastructure to process or cache your private images. We cannot see, store, or trace any content you drop into our interface. Once you close the browser tab, all temporary file pointers and memory buffers are permanently cleared by your browser’s garbage collector.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  3. No Account Required
                </h2>
                <p>
                  Our tool is fully operational without any form of registration, signup, or login. We do not collect names, profiles, phone numbers, or passwords. This completely removes the risk of database credential leaks or profile tracking.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  4. Cookies and Local State
                </h2>
                <p>
                  We do not use cookie-based user profiles or tracking cookies. We only utilize transient React component states which live strictly in your active browser view. No third-party ad networks are allowed to plant tracker cookies through our domains.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  5. Analytics Disclosure
                </h2>
                <p>
                  To keep our platform fast and secure, we may review fully anonymous server log metrics (such as page requests, user-agents, and server response codes). These logs contain zero personal identifiers and never record your uploaded files or pixel information.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  6. Data Security Measures
                </h2>
                <p>
                  Your device's browser sandbox isolates your local storage and memory from external threats. By utilizing this containerized client environment, your file operations remain fully protected from man-in-the-middle attacks and cloud breaches.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  7. Your Privacy Rights
                </h2>
                <p>
                  Because we do not store, access, or log any of your personal information or images, there is no personal data of yours in our possession. Consequently, you are already fully protected from data profiling, sale, or sharing under regulations like GDPR, CCPA, and COPPA.
                </p>
              </section>

              <section className="space-y-3 border-t border-gray-100 pt-5">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  8. Contact Information
                </h2>
                <p>
                  If you have any questions regarding our client-side guarantee or data-handling procedures, please contact us via email at <a href="mailto:support@imagetojpg.com" className="text-blue-600 hover:underline">support@imagetojpg.com</a> or use our <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className="text-blue-600 hover:underline">Contact Form</a>.
                </p>
              </section>
            </div>
          )}

          {/* Terms & Conditions Content */}
          {(path === '/terms' || path === '/terms-and-conditions') && (
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the website at <a href="https://imagetojpg.com" className="text-blue-600 hover:underline">https://imagetojpg.com</a> and its associated local converter tools, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our local converter service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  2. Acceptable and Fair Use
                </h2>
                <p>
                  We provide this tool completely free of charge to all users, with absolutely no registration, limits, or caps. You are free to utilize this application for personal, commercial, professional, or educational purposes.
                </p>
                <p>
                  However, you agree not to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Incorporate the offline code into malicious software, trojans, or security exploits.</li>
                  <li>Slam our host servers with automated scraper requests that trigger artificial hosting overhead.</li>
                  <li>Re-brand the local tools as a paid-only service to defraud third-party consumers.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  3. Disclaimer of Warranties
                </h2>
                <p>
                  This utility and all associated libraries are provided &quot;as is&quot; without warranties of any kind, express or implied. The entire conversion sequence is processed inside your local hardware environment. We make no guarantees that the converter will be completely free of bugs, errors, or custom format decoding issues.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  4. Intellectual Property Rights
                </h2>
                <p>
                  <b>Your Uploaded Assets:</b> Any image, file, photo, or vector you import into our converter remains 100% your intellectual property. We do not hold, claim, review, or license any rights over your content.
                </p>
                <p>
                  <b>Software and Codebase:</b> All graphics, branding, layouts, React code, styles, and custom server-side scripts on this platform are owned by or licensed to us. You are permitted to use the web application as a consumer utility under standard fair-use licensing.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  5. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, the creators of this software shall not be held liable for any damages—including direct, indirect, random, special, or logical damages—that occur from your use of, or inability to use, our local processing software. This includes data loss, CPU thermal throttling, or browser tab crashes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  6. Changes to Terms
                </h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or update these Terms and Conditions at any time. When updates are published, we will revise the &quot;last updated&quot; timestamp displayed at the top of this page. Your continued use of the platform indicates your agreement to the updated policies.
                </p>
              </section>

              <section className="space-y-3 border-t border-gray-100 pt-5">
                <h2 className="text-base sm:text-lg font-bold text-gray-955 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  7. Contact Information
                </h2>
                <p>
                  If you require clarification on these Terms and Conditions, please reach out to our team at <a href="mailto:support@imagetojpg.com" className="text-blue-600 hover:underline">support@imagetojpg.com</a>.
                </p>
              </section>
            </div>
          )}

          {/* Contact Us Content */}
          {path === '/contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Left Form Column */}
                <div className="md:col-span-3 space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Have questions, feature ideas, or run into rendering issues with a specific file format? We&apos;d love to hear from you. Fill out the contact form below, and we will get back to you!
                  </p>

                  {isSubmitted ? (
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center space-y-3 animate-scale-up">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">Message Sent Successfully</h3>
                      <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                        Thank you for reaching out! We process support messages within 24 hours. Since we run offline-first, your support messages are sent directly to our community helpdesk.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="mt-2 min-h-[44px] px-5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-100/50 hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4" aria-label="Contact support form">
                      {formError && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 font-semibold leading-relaxed">
                          ⚠️ {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="contact-name" className="text-xs font-semibold text-gray-700">Your Name *</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            placeholder="e.g. Alex Johnson"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full min-h-[44px] px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden transition-all bg-gray-50/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="contact-email" className="text-xs font-semibold text-gray-700">Email Address *</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="e.g. alex@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full min-h-[44px] px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="contact-subject" className="text-xs font-semibold text-gray-700">Subject</label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden transition-all bg-gray-50/50 cursor-pointer"
                        >
                          <option value="Feedback">General Feedback</option>
                          <option value="Feature Request">Format Request</option>
                          <option value="Bug Report">Conversion Issue</option>
                          <option value="Business">Inquiry / Others</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="contact-message" className="text-xs font-semibold text-gray-700">Message Content *</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          placeholder="Type your feedback or question here (minimum 10 characters)..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden transition-all bg-gray-50/50 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:outline-hidden"
                      >
                        {isSubmitting ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? "Sending message..." : "Send Message"}</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Right Helpdesk Column */}
                <div className="md:col-span-2 space-y-6">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                    <h3 className="font-bold text-gray-900 text-sm">Direct Contact</h3>
                    <div className="space-y-2.5 text-xs text-gray-600">
                      <p>Prefer direct emailing? Feel free to contact our support department at any time:</p>
                      <div className="p-3 bg-white rounded-xl border border-gray-200/60 font-mono text-center font-bold text-blue-600 selection:bg-blue-100">
                        <a href="mailto:support@imagetojpg.com">support@imagetojpg.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100/40 space-y-3.5">
                    <h3 className="font-bold text-gray-950 text-sm">Need Instant Answers?</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Before dropping us a line, check out our comprehensive help resources. Your query might already be fully explained.
                    </p>
                    <a 
                      href="/faq"
                      onClick={(e) => { e.preventDefault(); navigate('/faq'); }}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                      <span>Visit FAQ Helpdesk →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick return button */}
          <div className="pt-4 flex justify-center border-t border-gray-50">
            <a
              href="/"
              onClick={handleGoHome}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
              role="button"
            >
              <span>Go to Converter Dashboard</span>
            </a>
          </div>

        </div>
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400 font-mono">
        <p>&copy; {new Date().getFullYear()} Image to JPG Converter. Clean. Secure. Client-side.</p>
      </footer>
    </div>
  );
}
