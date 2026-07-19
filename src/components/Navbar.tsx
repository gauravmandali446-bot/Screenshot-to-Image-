import { useState } from 'react';
import { ShieldAlert, Menu, X, Sparkles, HelpCircle, Info, Mail, ShieldCheck, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate } from '../utils/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Check if path is a hash anchor on the same page
    if (path.startsWith('#')) {
      const target = document.querySelector(path);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const newTarget = document.querySelector(path);
          if (newTarget) newTarget.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300" id="app-navbar">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center space-x-2.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden rounded-lg p-1.5 cursor-pointer"
            aria-label="Image to JPG Converter Homepage"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden border border-gray-100 shadow-xs bg-white">
              <img 
                src="/logo.png" 
                alt="Image to JPG Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-950 tracking-tight text-sm sm:text-base leading-tight">
                Image to JPG
              </span>
              <span className="text-[10px] text-gray-400 font-mono leading-none">
                100% Local & Safe
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 py-0.5 px-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-semibold">
              <ShieldAlert className="w-3 h-3" />
              <span>Offline-first</span>
            </div>
            
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden p-1.5 rounded-md"
            >
              Home
            </a>

            <a 
              href="/about" 
              onClick={(e) => handleLinkClick(e, '/about')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden p-1.5 rounded-md"
            >
              About Us
            </a>

            <a 
              href="/contact" 
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden p-1.5 rounded-md"
            >
              Contact Us
            </a>

            <a 
              href="/privacy-policy" 
              onClick={(e) => handleLinkClick(e, '/privacy-policy')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden p-1.5 rounded-md"
            >
              Privacy Policy
            </a>

            <a 
              href="/terms-and-conditions" 
              onClick={(e) => handleLinkClick(e, '/terms-and-conditions')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden p-1.5 rounded-md"
            >
              Terms & Conditions
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden cursor-pointer active:scale-95"
              aria-expanded={isOpen}
              aria-label="Toggle Main Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-out with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-16 bg-gray-950/25 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Mobile Navigation Panel */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg z-50 md:hidden overflow-hidden"
            >
              <div className="px-4 py-5 space-y-3.5 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Security Badge */}
                <div className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Local In-Browser Processing</span>
                </div>

                {/* Mobile Links */}
                <div className="grid grid-cols-1 gap-1">
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span>Home & Converter</span>
                  </a>

                  <a
                    href="#features"
                    onClick={(e) => handleLinkClick(e, '#features')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span>How It Works</span>
                  </a>

                  <a
                    href="#faq"
                    onClick={(e) => handleLinkClick(e, '#faq')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span>FAQ Helpdesk</span>
                  </a>

                  <a
                    href="/about"
                    onClick={(e) => handleLinkClick(e, '/about')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Info className="w-4 h-4 text-gray-400" />
                    <span>About Us</span>
                  </a>

                  <a
                    href="/contact"
                    onClick={(e) => handleLinkClick(e, '/contact')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>Contact Us</span>
                  </a>

                  <a
                    href="/privacy-policy"
                    onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                    <span>Privacy Policy</span>
                  </a>

                  <a
                    href="/terms-and-conditions"
                    onClick={(e) => handleLinkClick(e, '/terms-and-conditions')}
                    className="flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Scale className="w-4 h-4 text-gray-400" />
                    <span>Terms & Conditions</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
