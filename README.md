# GPay Sudan — refreshed static website

## Deploy to GitHub Pages
1. Upload the contents of this folder to the repository root (so `index.html` is in the root).
2. In **Settings → Pages**, choose the branch and `/ (root)` or use your existing GitHub Actions workflow.
3. Open the published site over HTTPS. The service worker and PWA installation are only available on HTTPS (GitHub Pages supports HTTPS).

## Features
- Responsive Arabic/English interface with saved language preference.
- Light/dark mode, initially follows the device preference.
- PWA manifest, service worker caching, and an install button shown when the browser supports installation.
- Existing screenshot/payment image filenames and original APK download URL are retained.

## Notes
- PWA installation prompts are browser-controlled and may not appear on every browser/device.
- Google Fonts and Font Awesome use CDNs; those assets require an internet connection. The page and local images are cached for offline use after the first successful visit.
- Existing claims, figures, testimonials, and contact links were not independently verified; review them before publishing.
