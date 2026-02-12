# Mahadev Electricals — Complete SEO File Package
# ═══════════════════════════════════════════════

## FILES IN THIS PACKAGE

  sitemap.xml   → Tells Google all your page URLs
  robots.txt    → Tells crawlers what to index
  .htaccess     → HTTPS redirect, caching, compression, security
  manifest.json → Makes site installable on mobile (PWA)
  404.html      → Branded error page (keeps users on site)

---

## WHERE TO PLACE EACH FILE

All 5 files go in your ROOT folder (same level as index.html):

  your-website/
  ├── index.html
  ├── about.html
  ├── products.html
  ├── services.html
  ├── contact.html
  ├── sitemap.xml       ← here
  ├── robots.txt        ← here
  ├── .htaccess         ← here (Apache servers only)
  ├── manifest.json     ← here
  └── 404.html          ← here

---

## AFTER UPLOADING — 4 THINGS TO DO

  1. REPLACE "mahadevelectricals.com" in sitemap.xml and robots.txt
     with your actual domain (e.g. mahadevelectricals.in)

  2. ADD THESE 2 LINES to every page's <head> (just before </head>):

       <link rel="manifest" href="/manifest.json">
       <link rel="icon" href="/images/icons/icon-192x192.png" type="image/png">

  3. SUBMIT SITEMAP TO GOOGLE:
     → Go to: https://search.google.com/search-console
     → Add your site → Verify ownership
     → Sitemaps → Enter: sitemap.xml → Submit

  4. SUBMIT SITEMAP TO BING:
     → Go to: https://www.bing.com/webmasters
     → Add site → Submit sitemap URL

---

## PRIORITY ORDER (do these first)

  [CRITICAL]  Replace mahadevelectricals.com everywhere
  [CRITICAL]  Submit sitemap to Google Search Console
  [CRITICAL]  Verify HTTPS is working (.htaccess)
  [HIGH]      Add manifest link tag to all pages
  [HIGH]      Create favicon.ico (32x32 px icon)
  [MEDIUM]    Create /images/icons/ folder with app icons
  [MEDIUM]    Register on Google Business Profile (free local SEO)
  [LOW]       Add Google Analytics or Plausible tracking

---

## GOOGLE BUSINESS PROFILE (MOST IMPORTANT FOR LOCAL SEO)

This is FREE and gets you on Google Maps search results.

  → https://business.google.com
  → Add business → "Mahadev Electricals"
  → Address: 373, Trichy Rd, Agraharam, Singanallur, TN 641016
  → Category: Electrical supply store
  → Phone: 9363387963
  → Add your website URL
  → Upload store photos
  → Ask customers to leave Google Reviews

---

## QUICK DOMAIN SUGGESTIONS (if not registered yet)

  mahadevelectricals.in
  mahadevelectricalscbe.in
  mahadevelectricalscoimbatore.com

---

## NOTES

  .htaccess only works on Apache web servers (most Indian hosting
  providers like Hostinger, BigRock, GoDaddy use Apache).
  If you use Nginx, ask your host for equivalent nginx.conf rules.

  manifest.json icons need actual PNG image files in /images/icons/
  You can generate them free at: https://realfavicongenerator.net
