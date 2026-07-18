// Cloudflare Worker entry point for Image to JPG Converter
// Implements 1:1 matching of dynamic SEO metadata injection and fallback routing from server.ts

const BASE_URL = 'https://imagetojpg.com';

function injectMetadata(html: string, urlPath: string): string {
  const cleanPath = urlPath.toLowerCase().replace(/\/$/, '') || '/';
  
  let title = 'Image to JPG Converter - Convert Image to JPG Online Free';
  let description = 'Convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and SVG images to JPG online for free. Fast, secure, and processes files 100% locally in your browser sandbox.';
  let canonical = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  
  // Page-specific Metadata
  if (cleanPath === '/about') {
    title = 'About Us - Secure & Privacy-First Image Conversion | Image to JPG Converter';
    description = 'Learn about Image to JPG Converter. Our mission is to provide fast, completely secure, offline-first image conversion powered by local WebAssembly and client-side processing.';
  } else if (cleanPath === '/contact') {
    title = 'Contact Us & Support - Feedback & Questions | Image to JPG Converter';
    description = 'Need help or want to suggest a new format? Reach out to the Image to JPG Converter team. Fill out our contact form and we will respond within 24 hours.';
  } else if (cleanPath === '/privacy-policy') {
    title = 'Privacy Policy - Our Zero-Data Serverless Promise | Image to JPG Converter';
    description = 'Your privacy is our absolute priority. Read how our offline-first technology processes images entirely in your device memory with zero server uploads.';
  } else if (cleanPath === '/terms' || cleanPath === '/terms-and-conditions') {
    title = 'Terms & Conditions - Free Offline License & Fair Use | Image to JPG Converter';
    description = 'Review our Terms and Conditions. Image to JPG Converter is completely free for personal and commercial use with unlimited conversions and no files retained.';
  } else if (cleanPath === '/faq') {
    title = 'Frequently Asked Questions (FAQ) & Support | Image to JPG Converter';
    description = 'Have questions about browser safety, HEIC or AVIF support, or quality settings? Check our detailed FAQ guide for immediate assistance.';
  } else if (cleanPath.startsWith('/png-to-jpg')) {
    title = 'Convert PNG to JPG Online - 100% Local & Free | Image to JPG Converter';
    description = 'Convert PNG images to high-quality JPG format directly in your browser. Completely safe, secure, and fast with no file uploads or file size limits.';
  } else if (cleanPath.startsWith('/webp-to-jpg')) {
    title = 'Convert WEBP to JPG Online - Instant & Private | Image to JPG Converter';
    description = 'Convert WEBP images to JPG format online. Fast client-side conversion ensures your files never leave your device. 100% free with unlimited batch processing.';
  } else if (cleanPath.startsWith('/heic-to-jpg')) {
    title = 'Convert HEIC to JPG Online - Apple Photos Converter | Image to JPG Converter';
    description = 'Convert iOS HEIC and HEIF photos to high-compatibility JPG format online. Powered by local WebAssembly so files remain completely private and secure.';
  } else if (cleanPath.startsWith('/avif-to-jpg')) {
    title = 'Convert AVIF to JPG Online - Rapid Client-Side Converter';
    description = 'Turn AVIF files into standard JPG format in seconds. Processes 100% inside your browser sandbox. Keep your images safe, private, and offline-friendly.';
  } else if (cleanPath.startsWith('/gif-to-jpg')) {
    title = 'Convert GIF to JPG Online - Multi-frame Extraction';
    description = 'Convert GIF files to JPG format. Processes image files completely locally inside your browser sandbox for optimal performance and total data privacy.';
  } else if (cleanPath.startsWith('/bmp-to-jpg')) {
    title = 'Convert BMP to JPG Online - Fast Local Compression';
    description = 'Convert bitmap BMP images to compressed JPG files instantly. Full batch support, adjustable compression quality, and offline-first private processing.';
  } else if (cleanPath.startsWith('/tiff-to-jpg')) {
    title = 'Convert TIFF to JPG Online - High Resolution Preserved';
    description = 'Convert raw TIFF and TIF images to JPG format. Preserves original high resolution while applying premium adjustable compression. 100% secure.';
  } else if (cleanPath.startsWith('/svg-to-jpg')) {
    title = 'Convert SVG to JPG Online - Vector Rasterization';
    description = 'Rasterize vector SVG files to JPG format. Adjustable quality settings, fluid rendering, and 100% private in-browser conversion with zero file limits.';
  }

  // JSON-LD Structured Data
  let schemaJson = '';
  if (cleanPath === '/') {
    schemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': 'https://imagetojpg.com/#webassembly-converter',
          'name': 'Image to JPG Converter',
          'url': 'https://imagetojpg.com/',
          'image': 'https://imagetojpg.com/og-image.jpg',
          'applicationCategory': 'MultimediaApplication',
          'operatingSystem': 'All',
          'browserRequirements': 'Requires HTML5 Canvas and WebAssembly support',
          'description': 'Convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and SVG images to JPG online for free. Processes files 100% locally in your browser sandbox for guaranteed security.',
          'offers': {
            '@type': 'Offer',
            'price': '0.00',
            'priceCurrency': 'USD'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://imagetojpg.com/#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://imagetojpg.com/'
            }
          ]
        }
      ]
    });
  } else {
    let pageLabel = 'Page';
    if (cleanPath === '/about') pageLabel = 'About Us';
    else if (cleanPath === '/contact') pageLabel = 'Contact Us';
    else if (cleanPath === '/privacy-policy') pageLabel = 'Privacy Policy';
    else if (cleanPath === '/terms' || cleanPath === '/terms-and-conditions') pageLabel = 'Terms & Conditions';
    else if (cleanPath === '/faq') pageLabel = 'FAQ';
    else if (cleanPath.includes('to-jpg')) {
      const parts = cleanPath.split('/');
      const segment = parts[parts.length - 1];
      pageLabel = segment.split('-').map(s => s.toUpperCase()).join(' ');
    }

    schemaJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://imagetojpg.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': pageLabel,
          'item': canonical
        }
      ]
    });
  }

  // Replace default index.html metadata tags
  let modifiedHtml = html;

  // Replace <title>
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/gi,
    `<title>${title}</title>`
  );

  // Replace description meta tag
  modifiedHtml = modifiedHtml.replace(
    /<meta name="description" content=".*?" \/>/gi,
    `<meta name="description" content="${description}" />`
  );

  // Replace canonical link tag
  modifiedHtml = modifiedHtml.replace(
    /<link rel="canonical" href=".*?" \/>/gi,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace Open Graph url, title, and description
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:url" content=".*?" \/>/gi,
    `<meta property="og:url" content="${canonical}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content=".*?" \/>/gi,
    `<meta property="og:title" content="${title}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content=".*?" \/>/gi,
    `<meta property="og:description" content="${description}" />`
  );

  // Replace Twitter url, title, and description
  modifiedHtml = modifiedHtml.replace(
    /<meta property="twitter:url" content=".*?" \/>/gi,
    `<meta property="twitter:url" content="${canonical}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="twitter:title" content=".*?" \/>/gi,
    `<meta property="twitter:title" content="${title}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="twitter:description" content=".*?" \/>/gi,
    `<meta property="twitter:description" content="${description}" />`
  );

  // Inject the structured JSON-LD schema into the head
  if (schemaJson) {
    const schemaTag = `\n    <script type="application/ld+json">${schemaJson}</script>\n  </head>`;
    modifiedHtml = modifiedHtml.replace(/<\/head>/i, schemaTag);
  }

  return modifiedHtml;
}

interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Check if it's an API route or robots.txt / sitemap.xml / asset file
    // For standard static assets (like .js, .css, .png, etc.), fetch them from ASSETS directly
    if (
      pathname.startsWith('/assets/') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.webmanifest') ||
      pathname.endsWith('.xml')
    ) {
      return env.ASSETS.fetch(request);
    }

    // Handle health check
    if (pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle robots.txt dynamically just like server.ts
    if (pathname === '/robots.txt') {
      const host = url.host;
      const protocol = url.protocol;
      const domain = `${protocol}//${host}`;
      const robotsTxt = `# Production-ready robots.txt following Google's latest search optimization best practices
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /404
Disallow: /500
Disallow: /error
Disallow: /loading

# Canonical Host and Sitemap Location
Host: ${domain}
Sitemap: ${domain}/sitemap.xml
`;
      return new Response(robotsTxt, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Otherwise, we want to serve index.html with dynamically injected SEO metadata!
    try {
      // Fetch index.html from ASSETS
      const indexRequest = new Request(`${url.origin}/index.html`);
      const response = await env.ASSETS.fetch(indexRequest);
      
      if (!response.ok) {
        return new Response('index.html not found in build assets. Please make sure the app has been built first.', { status: 404 });
      }

      let html = await response.text();
      
      // Inject metadata just like server.ts
      html = injectMetadata(html, pathname);

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (e: any) {
      return new Response(`Error rendering page on Cloudflare Worker: ${e.message}`, { status: 500 });
    }
  }
};
