import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadBox from './components/UploadBox';
import Converter from './components/Converter';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { ConversionItem } from './types';
import { getImageDimensions, convertToJpg } from './utils/converter';
import JSZip from 'jszip';
import { ShieldAlert, Image as ImageIcon } from 'lucide-react';

// Production Error & Support Components
import OfflineBanner from './components/OfflineBanner';
import LoadingPage from './components/LoadingPage';
import Error404 from './components/Error404';
import Error500 from './components/Error500';
import InfoPages from './components/InfoPages';

export default function App() {
  const [items, setItems] = useState<ConversionItem[]>([]);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Monitor SPA route path changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Page Scroll Tracker for visual effects
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('app-navbar');
      if (nav) {
        if (window.scrollY > 10) {
          nav.classList.add('shadow-xs', 'bg-white/95');
          nav.classList.remove('bg-white/80');
        } else {
          nav.classList.remove('shadow-xs', 'bg-white/95');
          nav.classList.add('bg-white/80');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      items.forEach(item => {
        if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
        if (item.convertedUrl && item.convertedUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.convertedUrl);
        }
      });
    };
  }, [items]);

  // Handler for adding files
  const handleFilesAdded = async (files: File[]) => {
    const supportedExtensions = ['png', 'webp', 'heic', 'heif', 'avif', 'gif', 'bmp', 'tiff', 'tif', 'svg'];
    const validFiles: File[] = [];

    // Filter files and alert if any are completely unsupported
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (supportedExtensions.includes(ext) || file.type.startsWith('image/')) {
        validFiles.push(file);
      } else {
        alert(`"${file.name}" is not a supported format. Please upload PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, or SVG files.`);
      }
    }

    if (validFiles.length === 0) return;

    // Create a list of pending items
    const newItems: ConversionItem[] = validFiles.map((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const id = Math.random().toString(36).substring(2, 11);
      return {
        id,
        file,
        name: file.name,
        inputFormat: ext.toUpperCase(),
        originalSize: file.size,
        originalWidth: null,
        originalHeight: null,
        previewUrl: '', // To be updated
        status: 'pending',
        progress: 0,
        quality: 90,
        convertedUrl: null,
        convertedSize: null,
        errorMessage: null,
      };
    });

    // Add them immediately in a ready state
    setItems((prev) => [...prev, ...newItems]);

    // Asynchronously update dimensions and preview URLs for each new item
    for (const newItem of newItems) {
      try {
        const { width, height, previewUrl } = await getImageDimensions(newItem.file);
        setItems((prev) =>
          prev.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  originalWidth: width,
                  originalHeight: height,
                  previewUrl: previewUrl,
                }
              : item
          )
        );
      } catch (err: any) {
        // Fallback preview URL in case dimension read fails
        const fallbackUrl = URL.createObjectURL(newItem.file);
        setItems((prev) =>
          prev.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  previewUrl: fallbackUrl,
                  originalWidth: 800,
                  originalHeight: 600,
                  status: 'pending', // Allow trying to convert anyway
                }
              : item
          )
        );
      }
    }
  };

  // Handler for removing an item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        if (target.previewUrl && target.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(target.previewUrl);
        }
        if (target.convertedUrl && target.convertedUrl.startsWith('blob:')) {
          URL.revokeObjectURL(target.convertedUrl);
        }
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Handler for updating quality
  const handleUpdateQuality = (id: string, quality: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quality } : item))
    );
  };

  // Individual conversion handler
  const handleConvert = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'converting', progress: 10, errorMessage: null } : i
      )
    );

    try {
      const { blob, width, height } = await convertToJpg(
        item.file,
        item.quality,
        (progress) => {
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, progress } : i))
          );
        }
      );

      const convertedUrl = URL.createObjectURL(blob);
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                status: 'success',
                convertedUrl,
                convertedSize: blob.size,
                originalWidth: width,
                originalHeight: height,
                progress: 100,
              }
            : i
        )
      );
    } catch (err: any) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                status: 'error',
                errorMessage: err.message || 'Local conversion failed. Try another image.',
              }
            : i
        )
      );
    }
  };

  // Bulk conversion handler
  const handleConvertAll = async () => {
    const pending = items.filter((item) => item.status === 'pending');
    if (pending.length === 0) return;

    // Convert all pending files in parallel
    await Promise.all(pending.map((item) => handleConvert(item.id)));
  };

  // Individual download handler
  const handleDownload = (item: ConversionItem) => {
    if (!item.convertedUrl) return;

    const link = document.createElement('a');
    link.href = item.convertedUrl;
    
    // Change extension of output filename to jpg
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
    link.download = `${baseName}.jpg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all as ZIP handler
  const handleDownloadAllZip = async () => {
    const converted = items.filter((item) => item.status === 'success' && item.convertedUrl);
    if (converted.length === 0) return;

    const zip = new JSZip();

    try {
      for (let i = 0; i < converted.length; i++) {
        const item = converted[i];
        const res = await fetch(item.convertedUrl!);
        const blob = await res.blob();
        
        const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
        // Handle name duplicates within zip
        const fileName = `${baseName}.jpg`;
        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(content);

      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `images-to-jpg-${Date.now()}.zip`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup ZIP URL
      setTimeout(() => URL.revokeObjectURL(zipUrl), 2000);
    } catch (err) {
      alert('Failed to generate ZIP folder. Please download images individually.');
    }
  };

  // Clear all items handler
  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
      if (item.convertedUrl && item.convertedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.convertedUrl);
      }
    });
    setItems([]);
  };

  // Normalize the current path for path resolution
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

  const converterPaths = [
    '/',
    '/image-to-jpg',
    '/png-to-jpg',
    '/webp-to-jpg',
    '/heic-to-jpg',
    '/avif-to-jpg',
    '/gif-to-jpg',
    '/bmp-to-jpg',
    '/tiff-to-jpg',
    '/svg-to-jpg'
  ];

  const infoPaths = [
    '/faq',
    '/privacy-policy',
    '/terms',
    '/terms-and-conditions',
    '/contact',
    '/about'
  ];

  // Router resolution
  if (infoPaths.includes(normalizedPath)) {
    return <InfoPages path={normalizedPath} />;
  }

  if (normalizedPath === '/loading') {
    return <LoadingPage />;
  }

  if (normalizedPath === '/500' || normalizedPath === '/error') {
    return <Error500 />;
  }

  if (!converterPaths.includes(normalizedPath)) {
    return <Error404 />;
  }

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 flex flex-col font-sans" id="app-root">
      {/* Offline Alert Banner */}
      <OfflineBanner />

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow py-5 md:py-8 space-y-6">
        {/* Title and description */}
        <Hero />

        {/* Action workplace (Upload box or Active converter dashboard) */}
        <section className="max-w-5xl mx-auto px-4" id="main-workplace">
          {items.length === 0 ? (
            <UploadBox onFilesAdded={handleFilesAdded} />
          ) : (
            <Converter
              items={items}
              onRemoveItem={handleRemoveItem}
              onUpdateQuality={handleUpdateQuality}
              onConvert={handleConvert}
              onConvertAll={handleConvertAll}
              onDownload={handleDownload}
              onDownloadAllZip={handleDownloadAllZip}
              onClearAll={handleClearAll}
              onAddMoreFiles={handleFilesAdded}
            />
          )}
        </section>

        {/* Features / Why Choose Us Grid */}
        <Features />

        {/* FAQs Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
