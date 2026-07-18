import * as fs from 'fs';
import * as path from 'path';

// Define the high-fidelity production base URL for SEO indexing
const BASE_URL = 'https://imagetojpg.com';

interface SitemapRoute {
  path: string;
  priority: string;
  changefreq: string;
}

// Full array of active SEO-indexed routes.
// Excludes 404, error pages, loading states, and private routes per requirements.
const routes: SitemapRoute[] = [
  // Homepage (Primary converter focusing on "Image to JPG")
  { path: '/', priority: '1.0', changefreq: 'daily' },
  
  // Specific format converter pages
  { path: '/image-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/png-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/webp-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/heic-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/avif-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/gif-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/bmp-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/tiff-to-jpg', priority: '0.9', changefreq: 'weekly' },
  { path: '/svg-to-jpg', priority: '0.9', changefreq: 'weekly' },
  
  // Informational pages
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms-and-conditions', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' }
];

function generateSitemap() {
  console.log('Starting dynamic sitemap.xml generation pipeline...');
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach((route) => {
    // Build canonical absolute URL
    const loc = `${BASE_URL}${route.path}`;
    
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';

  // Save to the public directory so Vite copies it straight to dist root
  const publicDir = path.resolve(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`Created public assets folder at: ${publicDir}`);
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  
  console.log(`Sitemap generated successfully! ${routes.length} routes written to: ${sitemapPath}`);
}

generateSitemap();
