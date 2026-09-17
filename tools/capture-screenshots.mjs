/**
 * tools/capture-screenshots.mjs
 * ---------------------------------------------------------------
 * Captures a desktop and a mobile screenshot of every live store in
 * SITES and writes them into assets/img/work/ at exactly the sizes
 * the portfolio expects:
 *
 *   <slug>-desktop.png   1600 x 1240   (shown from 768px up)
 *   <slug>-mobile.png    1000 x  850   (shown up to 767px)
 *
 * One-time setup:
 *   npm install -D playwright
 *   npx playwright install chromium
 *
 * Then:
 *   npm run shots
 *
 * Afterwards set  imageExt: 'png'  in assets/js/site-data.js.
 * (Optional: convert to WebP with `npx @squoosh/cli --webp auto assets/img/work/*.png`
 *  and set imageExt to 'webp' — smaller files, same markup.)
 *
 * Only capture sites you have permission to show. Screenshots are
 * taken of publicly visible pages, at full quality, in your browser.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('assets/img/work');

const SITES = [
  { slug: 'organic-protein', name: "The Organic Protein Company", url: 'https://theorganicproteincompany.co.uk/' },
  { slug: 'zira', name: "Zira Cookware", url: 'https://shopzira.in/' },
  { slug: 'chaarpai', name: "Chaarpai", url: 'https://www.chaarpai.com/' },
  { slug: 'pink-moon', name: "The Pink Moon", url: 'https://thepinkmoon.in/' },
  { slug: 'krucible', name: "Krucible", url: 'https://www.krucible.world/' },
  { slug: 'she-ra', name: "She-Ra Jewelry", url: 'https://www.she-ra-jewelry.com/' },
  { slug: 'lemstrom', name: "Studio Lemstr\u00f6m", url: 'https://studio-lemstrom.com/' },
  { slug: 'moss', name: "Moss", url: 'https://gomoss.co/' },
  { slug: 'allove', name: "Allove", url: 'https://allove.in/' },
  { slug: 'your-basil', name: "Your Basil", url: 'https://yourbasil.com/' },
  { slug: 'primerry', name: "Primerry", url: 'https://primerry.in/' }
];

// Viewports are chosen so the saved file lands on the exact target size.
const SHOTS = [
  { label: 'desktop', file: 'desktop', width: 1600, height: 1240, scale: 1, mobile: false },
  { label: 'mobile',  file: 'mobile',  width: 500,  height: 425,  scale: 2, mobile: true  }
];

const SETTLE_MS = 2500;   // let fonts, lazy images and entrance animations finish

async function capture(browser, site, shot) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: shot.scale,
    isMobile: shot.mobile,
    hasTouch: shot.mobile,
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
    await page.waitForTimeout(SETTLE_MS);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `${site.slug}-${shot.file}.png`) });
    console.log(`  ok   ${site.slug}-${shot.file}.png`);
  } catch (err) {
    console.warn(`  FAIL ${site.slug}-${shot.file}: ${err.message.split('\n')[0]}`);
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const site of SITES) {
  console.log(site.name);
  for (const shot of SHOTS) await capture(browser, site, shot);
}

await browser.close();
console.log(`\nDone. Now set imageExt: 'png' in assets/js/site-data.js`);
