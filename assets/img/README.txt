PLACEHOLDER IMAGES
==================

work/<slug>-desktop.svg   1600 x 1240   ratio 4 : 3.1   shown from 768px up
work/<slug>-mobile.svg    1000 x  850   ratio 4 : 3.4   shown up to 767px
og-image.svg              1200 x  630   ratio 1.91 : 1  social link preview

Fastest route to real images:

    npm install -D playwright
    npx playwright install chromium
    npm run shots

That captures every store in SITE.projects at the exact sizes above and writes
PNGs next to these files. Then set  imageExt: 'png'  in assets/js/site-data.js.

Or drop your own screenshots in, keeping the same names and ratios.
Also worth adding: favicon.ico (32x32) and apple-touch-icon.png (180x180).
