import { Jimp } from 'jimp';
import * as fs from 'fs';
import * as path from 'path';

// Define paths
const SOURCE_IMAGE = path.resolve(process.cwd(), 'src/assets/images/new_favicon_source_1784452125794.jpg');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

async function main() {
  console.log('Starting favicon and branding assets generation...');
  
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error(`Source image not found at ${SOURCE_IMAGE}`);
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Load the source image
  const image = await Jimp.read(SOURCE_IMAGE);
  console.log('Source image loaded successfully!');

  // Define sizes and output filenames
  const targets = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-150x150.png', size: 150 }
  ];

  for (const target of targets) {
    const resized = image.clone().resize({ w: target.size, h: target.size });
    const outputPath = path.join(PUBLIC_DIR, target.name);
    await resized.write(outputPath as any);
    console.log(`Generated: ${target.name} (${target.size}x${target.size})`);
  }

  // Generate a beautiful, clean favicon.svg matching the custom lavender branding icon
  const faviconSvgPath = path.join(PUBLIC_DIR, 'favicon.svg');
  const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Light purple/lavender gradient for the squircle background -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e9e2ff" />
      <stop offset="100%" stop-color="#d6c5ff" />
    </linearGradient>

    <!-- Rich purple glow for the centered image card -->
    <filter id="purpleGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#7c3aed" flood-opacity="0.4" />
    </filter>

    <!-- Clip path to keep mountain peaks strictly inside the rounded image card -->
    <clipPath id="cardClip">
      <rect x="140" y="140" width="232" height="232" rx="56" />
    </clipPath>
  </defs>

  <!-- Outer Squircle Background -->
  <rect width="512" height="512" rx="160" fill="url(#bgGrad)" />

  <!-- Centered Image Card with soft purple shadow -->
  <rect x="140" y="140" width="232" height="232" rx="56" fill="#ffffff" stroke="#1e1b4b" stroke-width="18" stroke-linejoin="round" filter="url(#purpleGlow)" />

  <!-- Inside Content clipped to card boundaries -->
  <g clip-path="url(#cardClip)">
    <!-- Sun (Top-Left) -->
    <circle cx="205" cy="205" r="24" fill="#ffffff" stroke="#1e1b4b" stroke-width="16" />

    <!-- Small mountain peak (Left) -->
    <path d="M 120 380 L 210 290 L 280 380" fill="#ffffff" stroke="#1e1b4b" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Large mountain peak (Right) -->
    <path d="M 180 380 L 290 220 L 390 380" fill="#ffffff" stroke="#1e1b4b" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Redraw the border of the image card on top of clipped mountains to ensure a crisp edge -->
  <rect x="140" y="140" width="232" height="232" rx="56" fill="none" stroke="#1e1b4b" stroke-width="18" stroke-linejoin="round" />
</svg>`;
  fs.writeFileSync(faviconSvgPath, faviconSvgContent);
  console.log('Generated: public/favicon.svg');

  // Copy or write the main logo to log.ofa.st
  const logoPath = path.join(PUBLIC_DIR, 'log.ofa.st');
  fs.copyFileSync(SOURCE_IMAGE, logoPath);
  console.log('Copied core logo to: public/log.ofa.st');

  // Copy to logo.png
  const logoPngPath = path.join(PUBLIC_DIR, 'logo.png');
  fs.copyFileSync(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), logoPngPath);
  console.log('Generated: public/logo.png');

  // Copy favicon-32x32.png as favicon.ico
  const faviconIcoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  fs.copyFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), faviconIcoPath);
  console.log('Generated: public/favicon.ico');

  // Generate Open Graph image (since it's a JPG extension, Jimp supports it perfectly)
  const ogPath = path.join(PUBLIC_DIR, 'og-image.jpg');
  const ogImage = image.clone().resize({ w: 1200, h: 630 });
  await ogImage.write(ogPath as any);
  console.log('Generated: public/og-image.jpg');

  // Generate site.webmanifest (RealFaviconGenerator recommendation)
  const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
  const manifestContent = {
    name: 'Image to JPG Converter',
    short_name: 'Image to JPG',
    description: 'Fast, free, and secure online Image to JPG Converter. Convert PNG, WEBP, HEIC, AVIF, GIF, BMP, TIFF, and SVG directly in your browser without uploading files.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifestContent, null, 2));
  console.log('Generated: public/site.webmanifest');

  // Duplicate site.webmanifest to manifest.json for compatibility across browsers and PWA specs
  const manifestJsonPath = path.join(PUBLIC_DIR, 'manifest.json');
  fs.writeFileSync(manifestJsonPath, JSON.stringify(manifestContent, null, 2));
  console.log('Generated: public/manifest.json');

  // Generate browserconfig.xml for IE / Windows tiles
  const browserConfigPath = path.join(PUBLIC_DIR, 'browserconfig.xml');
  const browserConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#2563eb</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  fs.writeFileSync(browserConfigPath, browserConfigContent);
  console.log('Generated: public/browserconfig.xml');

  // Generate safari-pinned-tab.svg (monochrome mask icon for Safari Pinned Tabs)
  const safariSvgPath = path.join(PUBLIC_DIR, 'safari-pinned-tab.svg');
  const safariSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
  <path d="M4 1C2.34315 1 1 2.34315 1 4V12C1 13.6569 2.34315 15 4 15H12C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1H4ZM4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" fill="black"/>
  <path d="M3.5 11L6 7.5L7.5 9.5L10 6L12.5 11H3.5Z" fill="black"/>
  <circle cx="10.5" cy="4.5" r="1.5" fill="black"/>
</svg>`;
  fs.writeFileSync(safariSvgPath, safariSvgContent);
  console.log('Generated: public/safari-pinned-tab.svg');

  console.log('All branding assets and favicons generated successfully!');
}

main().catch((err) => {
  console.error('Error in generation pipeline:', err);
  process.exit(1);
});
