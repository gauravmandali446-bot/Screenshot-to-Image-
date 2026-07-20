import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList: FAQItem[] = [
    {
      question: "How do I convert an image to JPG?",
      answer: "To convert image to jpg, simply drag and drop your photos into the upload box on our website, or click to pick them from your files. If you have an image copied on your clipboard, you can even use Ctrl+V to paste it instantly. Once your photos are loaded, choose your preferred quality ratio (from 60% up to 100%) and click \"Convert\". Your new files will process instantly, and you can download them individually or package them as a combined ZIP file. This is exactly how to convert image to jpg in just a few seconds without any hassle."
    },
    {
      question: "What is an Image to JPG Converter?",
      answer: "An image to jpg converter is a specialized tool that takes graphics in formats like PNG, WEBP, HEIC, or SVG and converts them into the widely compatible JPEG format. Unlike traditional software that requires high processing power or downloads, our modern image to jpg tool works directly in your web browser. It uses advanced client-side technologies to render the original pixels and save them as a JPG. This means you do not have to upload files to any external servers, which keeps the process extremely fast and private."
    },
    {
      question: "Can I convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF and SVG to JPG?",
      answer: "Yes! Our browser-based software supports a comprehensive suite of input formats. You can easily convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and SVG files into JPG files. When you import transparent formats like PNG or SVG, our converter automatically adds a solid white background beneath the transparent layers. This prevents the output image from getting corrupted or turning black, allowing you to seamlessly change image to jpg for any file format while maintaining correct color fidelity and clarity."
    },
    {
      question: "Is this Image to JPG Converter free?",
      answer: "Absolutely! This is a completely image to jpg converter free of any charges, premium subscriptions, watermarks, or limitations. You can upload as many files as you want and convert image to jpg free anytime without creating an account or providing email details. Many other online tools force you to pay for batch conversions or high-resolution outputs, but we believe in offering an open, high-quality, and unlimited tool for everyday users who want a quick way to turn image to jpg."
    },
    {
      question: "Are my images private and secure?",
      answer: "Yes, privacy is our absolute priority. Unlike typical online websites that upload your files to remote servers for processing, this image to jpg utility runs 100% locally on your computer. All processing, rendering, and conversion happen inside your browser's sandboxed memory using client-side JavaScript. Your original and converted photos never touch our servers, meaning no one else can ever access, view, or store them. This makes it the most secure way to convert sensitive documents or personal photos."
    },
    {
      question: "Are JPG and JPEG the same?",
      answer: "Yes, JPG and JPEG are exactly the same file format. The only difference is the number of letters in the file extension. Historically, older Windows operating systems had a strict three-letter limit for file extensions, so \"JPEG\" was shortened to \"JPG\". Meanwhile, Mac and Unix systems continued using \".jpeg\". Today, both extensions are fully interchangeable and refer to the exact same Joint Photographic Experts Group image compression standard, meaning you can use them with any modern program."
    },
    {
      question: "Is PNG or JPG better for photos?",
      answer: "JPG is significantly better for natural photos and realistic imagery. Photos contain millions of complex colors and gradients, which JPG compresses efficiently into tiny file sizes with minimal quality loss. On the other hand, PNG uses lossless compression, resulting in giant file sizes for high-detail photos. However, PNG is superior for flat-color illustrations, charts, logos, and images requiring transparency. For general sharing, storing, and loading web photography, you should always convert image to jpg to optimize file size."
    },
    {
      question: "What is JPG also known as?",
      answer: "JPG is also known as JPEG, which stands for the Joint Photographic Experts Group—the organization that originally designed the compression algorithm in 1992. On some operating systems, it might also appear with the file extensions .jpe, .jfif, or .jfi. Regardless of the name or extension, these files share the exact same format and properties. Modern systems treat all of these extensions identically, and our utility will always export your files with the classic, universally recognized .jpg extension for maximum compatibility."
    },
    {
      question: "What is the difference between PNG and JPG?",
      answer: "The main difference lies in compression and transparency. PNG is a lossless format, meaning it preserves every pixel perfectly and supports transparent backgrounds, making it ideal for logos and digital assets. However, PNG files are very large. JPG is a lossy format, which reduces file sizes dramatically by discarding imperceptible color details, making it perfect for photos. JPG does not support transparent backgrounds. Many users choose to change image to jpg when they need to compress images for websites or emails."
    },
    {
      question: "Can I convert WEBP image to JPG?",
      answer: "Yes, converting a webp image to jpg is extremely simple with our tool. WEBP is a highly compressed format created by Google for speed on the modern web, but many legacy systems, email clients, and print services still do not support it. By dragging your WEBP file into our converter, our system reads the image instantly and lets you download a universally compatible JPG copy in a fraction of a second, making it easy to share your images with anyone."
    },
    {
      question: "Will converting an image to JPG reduce quality?",
      answer: "Because JPG uses lossy compression, converting an image to it does reduce some data, but our converter lets you control this. By adjusting our precise quality slider between 60% and 100%, you can choose the right level of compression. Setting the quality slider to 90% or above produces an image where any visual loss is entirely imperceptible to the human eye, while still delivering major file size savings. It's the smartest way to turn image to jpg with complete confidence."
    },
    {
      question: "Can I convert images on my phone?",
      answer: "Yes! Our image to jpg converter is designed to be fully mobile-first and responsive. It works flawlessly on all modern mobile web browsers, including Safari on iOS and Google Chrome on Android devices. You do not need a computer to convert your photos—just open our website on your smartphone, tap the file upload box, select images from your photo library or camera, and convert them instantly on the go."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation is required whatsoever. You do not need to download desktop applications, browser plugins, or mobile apps to use our tool. Since all image decoding and canvas rendering technologies are built directly into standard modern web browsers, our tool runs fully online. Just visit our webpage, and you have access to a full-featured, secure, and instant converter anytime you need to convert files, making it completely friction-free."
    },
    {
      question: "What image formats are supported?",
      answer: "We support a wide array of popular input formats for local processing. You can upload and convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and vector SVG files. Whether you are dealing with a next-gen web image format like AVIF or WebP, a high-fidelity Apple camera HEIC photo, or a print-ready TIFF file, our system will read and convert them to standard, ready-to-use JPG files in an instant."
    },
    {
      question: "Can I convert multiple images to JPG at once?",
      answer: "Yes! Our batch processing engine allows you to load and convert multiple images simultaneously. You can drag and drop dozens of files into the converter at once, configure individual or global quality settings, and convert them with a single click. Once the conversion process completes, you can download all of them together in a clean, compressed ZIP archive. This saves you tons of time compared to converting images one by one."
    },
    {
      question: "How to convert image to jpg on iPhone?",
      answer: "To convert image to jpg on iphone, simply open our website in your Safari browser. Tap the central upload area, select the images from your Photos app, your Files directory, or capture a live photo with your camera. Once uploaded, set your quality standard and click the convert button. You can then download your finished JPG files directly to your iOS device in seconds."
    },
    {
      question: "How to change image to jpg on Windows?",
      answer: "To change image to jpg on Windows, just visit our web-based application on Microsoft Edge, Google Chrome, or Firefox. Drag and drop your target images into our upload box or use standard copy-paste. Adjust the quality meter, click convert, and download the finished .jpg images straight to your Downloads directory. No installation or account registration is required."
    },
    {
      question: "What is web image to jpg?",
      answer: "A web image to jpg refers to converting digital web graphics (such as WEBP, AVIF, or PNG files optimized for browsers) into the universal JPG format. This ensures that any files downloaded from websites can be successfully uploaded to older web forms, sent via email attachments, or opened in native graphic software that does not support modern web images yet."
    },
    {
      question: "What is the best image to jpg converter free tool?",
      answer: "Our online tool is widely considered the best image to jpg converter free program because it combines modern browser-side conversion with total data privacy. We never upload your images to remote servers, we don't have file size limits, and we offer lightning-fast conversion speed entirely inside your local device's memory."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data (JSON-LD) for Search Engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to JPG Converter",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "browserRequirements": "Requires HTML5 Canvas and Javascript",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "featureList": [
      "In-browser local conversion",
      "No file upload required",
      "Supports HEIC, AVIF, WEBP, PNG, GIF, BMP, SVG, TIFF",
      "Batch conversion with custom quality slider",
      "Download all as ZIP option"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://imagetojpgx.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Image to JPG Converter",
        "item": "https://imagetojpgx.com/image-to-jpg"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Image to JPG Converter",
    "url": "https://imagetojpgx.com/image-to-jpg",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://imagetojpgx.com/image-to-jpg?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Image to JPG Converter",
    "url": "https://imagetojpgx.com/",
    "logo": "https://imagetojpgx.com/logo.png"
  };

  return (
    <section className="py-16 bg-gray-50/50 border-t border-gray-100" id="faq">
      {/* Injecting JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title with H2 */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions — Image to JPG
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Have questions about privacy, conversion speeds, image formats, or quality loss? We have gathered answers to the most common questions to help you understand our free online image converter.
          </p>
        </div>

        {/* Accordions with H3 markup for semantic SEO */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-blue-100 shadow-xs' 
                    : 'border-gray-100 hover:border-gray-200 shadow-2xs'
                }`}
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center space-x-4 cursor-pointer rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base tracking-tight hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-500' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Body Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[400px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 text-xs sm:text-sm text-gray-500 leading-relaxed font-normal bg-gray-50/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secure Note */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl border border-blue-100/40 bg-blue-50/20 text-center flex flex-col sm:flex-row sm:items-center justify-center gap-3.5">
          <ShieldAlert className="w-5 h-5 text-blue-500 mx-auto sm:mx-0 flex-shrink-0" />
          <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed text-left">
            <b>Your privacy is our core guarantee.</b> Because our tool converts images inside your browser using client-side JavaScript, we never upload files to a server, we don&apos;t store data, and your files never leave your personal computer.
          </p>
        </div>

      </div>
    </section>
  );
}
