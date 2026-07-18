# 🚀 Deploying Image to JPG Converter on Cloudflare Pages

This project is fully optimized and configured for seamless, instant, production-ready deployment on **Cloudflare Pages**. 

Since the Image to JPG Converter runs **100% client-side** (using browser sandbox Canvas APIs and local WebAssembly compilers), it is perfect for Cloudflare's global edge network as a static Single Page Application (SPA).

---

## 🛠️ Step-by-Step Deployment Instructions

### Method 1: Git Integration (Recommended)
1. **Push your code** to a GitHub or GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository.
5. In the **Build settings** section, configure the following parameters:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: Select `18` or higher (Cloudflare default is usually sufficient).
6. Click **Save and Deploy**. Cloudflare will compile your application and serve it instantly across their global edge network.

### Method 2: Direct Upload via Wrangler CLI
If you prefer deploying directly from your local terminal or a CI/CD script:
1. Install Wrangler globally:
   ```bash
   npm install -g wrangler
   ```
2. Build the production assets locally:
   ```bash
   npm run build
   ```
3. Deploy the compiled `dist/` directory:
   ```bash
   wrangler pages deploy dist --project-name=image-to-jpg-converter
   ```

---

## ⚙️ Cloudflare Pages Configuration Details

- **Build Command**: `npm run build`
  - This script automatically runs the high-fidelity sitemap generator (`scripts/generate-sitemap.ts`) to keep search bots updated, and compiles your optimized production assets inside the `dist/` folder.
- **Output Directory**: `dist`
- **Environment Variables**:
  - No custom runtime environment variables are required. All image processing pipelines execute entirely within the client's browser sandbox for maximum speed and absolute privacy.

---

## 🔗 Custom Domain Setup

1. In the Cloudflare Pages dashboard, go to your project.
2. Navigate to the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter your domain name (e.g., `imagetojpg.com`) and click **Continue**.
5. Cloudflare will automatically configure the CNAME and DNS records if your domain is managed through Cloudflare, or provide DNS settings to add to your external domain registrar.

---

## 🧠 Behind the Scenes: Cloudflare Assets & Routing

We have configured special routing files inside the `/public` directory to ensure perfect performance and security:

1. **`_redirects`**:
   - Implements wildcard SPA fallback mapping: `/* /index.html 200`.
   - Ensures deep-linked paths (e.g., `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions`) resolve cleanly without triggering a 404.
2. **`_headers`**:
   - Injects security headers like `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and a tight `Content-Security-Policy`.
   - Configures long-term immutable caching headers (`Cache-Control: public, max-age=31536000, immutable`) for compiled JS/CSS static assets under `/assets/*` to guarantee a 100/100 Lighthouse performance rating.

---

## ❓ Troubleshooting & Frequently Asked Questions

### 1. I am getting a 404 error when refreshing a sub-page!
- **Reason**: The page is missing the SPA fallback rewrite rules.
- **Solution**: Verify that the `_redirects` file is present in your build output folder (`dist/_redirects`). Since it is placed in the `/public` directory, Vite copies it automatically upon compiling.

### 2. Is WebAssembly (Wasm) supported under the Content Security Policy?
- **Yes**. Our custom `Content-Security-Policy` header in `_headers` explicitly includes `'unsafe-eval'` under `script-src` to permit local WebAssembly execution contexts, which are critical for high-speed local image transformations (e.g., HEIC and AVIF decoding).

### 3. Will search crawlers find all my routes?
- **Yes**. A static copy of `sitemap.xml` and `robots.txt` is compiled and served from the root. In addition, the `robots.txt` instructs major search crawlers (Google, Bing, DuckDuckGo, etc.) to scan the complete structure.
