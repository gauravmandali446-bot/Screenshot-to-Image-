import React from 'react';
import { 
  Zap, 
  DollarSign, 
  UserX, 
  ShieldCheck, 
  Award, 
  Smartphone, 
  FolderOpen, 
  Cpu,
  ArrowRight,
  Upload,
  Settings,
  Download,
  Link as LinkIcon
} from 'lucide-react';
import { navigate } from '../utils/navigation';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Features() {
  const howItWorksSteps = [
    {
      step: "01",
      icon: <Upload className="w-5 h-5 text-blue-600" />,
      title: "Upload Your Image",
      description: "Drag & drop files into the active zone, click to pick from your directory, or press Ctrl+V to paste from your clipboard."
    },
    {
      step: "02",
      icon: <Settings className="w-5 h-5 text-blue-600" />,
      title: "Customize Quality",
      description: "Use our interactive quality slider to choose the optimal balance of image file size and pixel-perfect clarity."
    },
    {
      step: "03",
      icon: <Download className="w-5 h-5 text-blue-600" />,
      title: "Download JPG Files",
      description: "Click convert to generate files locally in milliseconds. Download individual images or pack them into a ZIP file instantly."
    }
  ];

  const coreFeatures: FeatureCard[] = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Fast Conversion",
      description: "Runs locally using high-speed browser technologies. Avoid server queues and compress image clusters in fractions of a second."
    },
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
      title: "100% Free",
      description: "Enjoy professional grade image compression without paywalls, watermark stamps, file limitations, or subscription obligations."
    },
    {
      icon: <UserX className="w-5 h-5 text-blue-500" />,
      title: "No Signup",
      description: "Immediate direct access. We will never ask for your email address, phone number, credentials, or personal registration."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      title: "Secure",
      description: "Our offline-first architecture processes all images inside your browser's sandboxed memory. No files touch our server."
    },
    {
      icon: <Award className="w-5 h-5 text-rose-500" />,
      title: "High Quality JPG",
      description: "Configure native Canvas exporters to preserve crucial color dynamics, smooth gradients, and sharp text rendering."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-teal-500" />,
      title: "Works on Mobile",
      description: "Optimized for both desktop and mobile layouts. Effortlessly change image to jpg on iPhone, iPad, and Android."
    },
    {
      icon: <FolderOpen className="w-5 h-5 text-indigo-500" />,
      title: "Batch Conversion",
      description: "Convert dozens of photos simultaneously. Export individual files or gather your entire conversion pool in a compressed ZIP file."
    },
    {
      icon: <Cpu className="w-5 h-5 text-orange-500" />,
      title: "Local Browser Processing",
      description: "Uses Web Assembly, Canvas APIs, and JavaScript loops locally. Zero backend uploads keep your personal bandwidth minimal."
    }
  ];

  const supportedFormats = [
    { name: "PNG", ext: ".png", type: "Portable Network Graphics", desc: "Best for lossless graphics with transparency. Converting PNG to JPG reduces file size massively by discarding transparent layers." },
    { name: "WEBP", ext: ".webp", type: "Modern Web Format", desc: "Google's modern web format. Frequently converted to JPG to restore compatibility on older operating systems and email programs." },
    { name: "HEIC", ext: ".heic", type: "Apple High Efficiency", desc: "The standard iOS camera format. Convert image to jpg on iPhone to easily share files with non-Apple users and web forms." },
    { name: "AVIF", ext: ".avif", type: "AV1 Image File", desc: "Next-gen video compression standard for pictures. Turn image to jpg to make next-gen graphics readable on conventional photo software." },
    { name: "GIF", ext: ".gif", type: "Graphics Interchange", desc: "Used for animations and basic banners. Turn static frames or complex GIFs into manageable, lightweight static JPG files." },
    { name: "BMP", ext: ".bmp", type: "Standard Bitmap", desc: "Uncompressed legacy Windows format. Converts giant raw pixel matrices into tiny, shareable JPG images in milliseconds." },
    { name: "TIFF", ext: ".tiff", type: "Tagged Image Format", desc: "High-end print and publishing format. Compress these enormous graphic catalogs into highly optimized web-safe outputs." },
    { name: "SVG", ext: ".svg", type: "Scalable Vector", desc: "Vector graphics composed of math curves. Render crisp vectors down to rasterized high-resolution JPG files with customized scaling." }
  ];

  const internalLinks = [
    { label: "PNG to JPG", path: "/png-to-jpg", anchor: "#png-to-jpg" },
    { label: "WEBP to JPG", path: "/webp-to-jpg", anchor: "#webp-to-jpg" },
    { label: "HEIC to JPG", path: "/heic-to-jpg", anchor: "#heic-to-jpg" },
    { label: "AVIF to JPG", path: "/avif-to-jpg", anchor: "#avif-to-jpg" },
    { label: "GIF to JPG", path: "/gif-to-jpg", anchor: "#gif-to-jpg" },
    { label: "BMP to JPG", path: "/bmp-to-jpg", anchor: "#bmp-to-jpg" },
    { label: "TIFF to JPG", path: "/tiff-to-jpg", anchor: "#tiff-to-jpg" },
    { label: "SVG to JPG", path: "/svg-to-jpg", anchor: "#svg-to-jpg" }
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Step-by-Step Instructions */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              How to Convert an Image to JPG
            </h2>
            <p className="text-sm text-gray-500">
              Transform your files into lightweight, universally compatible JPEG images in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="relative bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 hover:border-blue-100 hover:bg-white transition-all duration-300 group">
                <div className="absolute top-4 right-4 text-3xl font-extrabold text-blue-50/70 font-mono select-none group-hover:text-blue-100/70">
                  {step.step}
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Tool - Feature Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Why Choose Our Image to JPG Converter
            </h2>
            <p className="text-sm text-gray-500">
              Our professional-grade tool combines elite local compression speed with absolute user privacy protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/20 hover:border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-xs">
                  {feat.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex-grow">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Image Formats */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Supported Image Formats
            </h2>
            <p className="text-sm text-gray-500">
              Easily turn image to jpg from a wide array of formats. We handle transparent layers, raster layers, vectors, and print settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedFormats.map((fmt, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xs transition-all duration-300 space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg font-mono">
                    {fmt.name}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{fmt.ext}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
                  {fmt.type}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-grow">
                  {fmt.desc}
                </p>
                <div className="pt-2 flex items-center text-[11px] font-semibold text-blue-500 hover:text-blue-600 group cursor-pointer">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Output Format: <b>JPG / JPEG (.jpg)</b> - universally compatible compression standard</span>
            </div>
          </div>
        </div>

        {/* In-depth SEO Homepage Content Block */}
        <div className="space-y-12 pt-12 border-t border-gray-100">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Convert Image to JPG Online for Free
            </h2>
            <p className="text-sm text-gray-500">
              Understand the power of browser-based processing, image optimization, and why JPEG is the undisputed standard for digital photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  What does it mean to turn image to jpg?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  To turn image to jpg simply means transforming an image file with a format like PNG, WEBP, or SVG into a high-efficiency JPEG format. Our online converter helps you seamlessly change image to jpg to decrease raw storage size, simplify browser rendering speeds, and guarantee full device readability.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Why convert PNG to JPG?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  While PNG format supports perfect transparency and lossless compression, it often produces enormous file sizes that bloat websites and reject easy email transmission. By opting to convert image to jpg free, you compress complex photos up to 90% in size without noticeable loss of quality, saving user bandwidth and cloud storage instantly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Why convert WEBP to JPG?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  WebP is Google&apos;s highly optimized compression format. While WebP renders perfectly on contemporary web browsers, many older programs, mobile operating systems, native file explorers, and professional image editors fail to read them. Converting webp image to jpg resolves all compatibility limits with a single click.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Why convert HEIC to JPG?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Apple utilizes the HEIC format to optimize phone storage space. However, sharing raw HEIC photos on web forms, upload fields, or with Windows, Linux, and older Android devices yields visual errors. Converting image to jpg on iPhone ensures your high-fidelity captures are visible anywhere in the world.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Benefits of Browser-Based Conversion
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Conventional online converters require uploading your personal files to third-party servers. Our client-side code utilizes your local browser&apos;s graphics engine to change image to jpg. This offline-first methodology is 100% private, saves significant upload time, and does not consume your data plan.
                </p>
              </div>

              <div className="space-y-2" id="privacy-and-security">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Privacy & Security Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  We guarantee absolute privacy. Since our converter processes files purely within the sandboxed parameters of your browser using local HTML5 APIs, your original photos never touch our servers. Your security is structurally baked into the architecture, giving you total peace of mind for confidential documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Page Targets & Internal Linking Hub */}
        <div className="space-y-6 pt-12 border-t border-gray-100">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">
              Optimized Dedicated Converters
            </h3>
            <p className="text-xs text-gray-500">
              Need a targeted conversion path? Explore our future dedicated processing services for exact file adjustments.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {internalLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                  // Smoothly scroll to the converter when they click
                  const appHero = document.getElementById('app-hero');
                  if (appHero) {
                    appHero.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 sm:px-3 sm:py-1.5 min-h-[44px] sm:min-h-0 text-sm sm:text-xs rounded-lg border border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-100 hover:text-blue-600 hover:bg-blue-50/20 transition-all duration-200 font-medium group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                title={`Convert ${link.label.split(' ')[0]} images directly to JPG format`}
              >
                <LinkIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
