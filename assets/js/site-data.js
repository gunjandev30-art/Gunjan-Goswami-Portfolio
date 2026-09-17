/* ============================================================
   assets/js/site-data.js  —  EDIT EVERYTHING HERE
   These values are written into the markup on load, so each
   piece of information lives in exactly one place.
   ============================================================ */
const SITE = {
  name: 'Gunjan Goswami',
  email: 'gunjan.dev30@gmail.com',
  phone: '+91 89804 52212',
  location: 'Kamrej, Surat, Gujarat, India',
  links: {
    linkedin: 'https://www.linkedin.com/in/gunjan-goswami/'
    // add github / instagram here and they'll appear in the footer:
    // github: 'https://github.com/…',
  },
  /* ----------------------------------------------------------------
     PROJECTS — the work section renders straight from this array.
     Add, remove or reorder freely; numbering ("03 / 11") is automatic.

     image   → assets/img/work/<image>-desktop.<ext> and -mobile.<ext>
     year    → leave '' to hide the year
     summary → leave '' to fall back to the neutral line below
     ---------------------------------------------------------------- */
  imageExt: 'png',        // switch to 'png' or 'webp' after you run `npm run shots`
  defaultSummary: 'Shopify storefront build — theme development, custom sections and responsive front-end.',

  projects: [
    {
      name: 'The Organic Protein Company',
      url: 'https://theorganicproteincompany.co.uk/',
      industry: 'Health & Nutrition — UK',
      year: '',
      image: 'organic-protein',
      summary: 'Organic whey protein storefront: flavour-led product pages, a build-your-own bundle flow, subscription options and batch test-result downloads.',
      tech: ['Shopify', 'Liquid', 'Bundles', 'Subscriptions']
    },
    {
      name: 'Zira Cookware',
      url: 'https://shopzira.in/',
      industry: 'Homeware — India',
      year: '',
      image: 'zira',
      summary: 'Triply stainless steel and ceramic cookware store — size-variant product pages, comparison sections and a gifting flow that hands off to WhatsApp.',
      tech: ['Shopify', 'Liquid', 'Custom sections', 'JavaScript']
    },
    {
      name: 'Chaarpai',
      url: 'https://www.chaarpai.com/',
      industry: 'Stationery & Lifestyle — India',
      year: '',
      image: 'chaarpai',
      summary: 'Planners, journals and desk stationery: a deep mega-menu across categories and use-cases, shoppable video sections and a wishlist-driven gifting journey.',
      tech: ['Shopify', 'Liquid', 'Mega menu', 'Wishlist']
    },
    { name: 'The Pink Moon',   url: 'https://thepinkmoon.in/',          industry: '', year: '', image: 'pink-moon',     summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'Krucible',        url: 'https://www.krucible.world/',      industry: '', year: '', image: 'krucible',      summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'She-Ra Jewelry',  url: 'https://www.she-ra-jewelry.com/',  industry: 'Jewellery', year: '', image: 'she-ra', summary: '', tech: ['Shopify', 'Liquid', 'Custom swatches'] },
    { name: 'Studio Lemström', url: 'https://studio-lemstrom.com/',     industry: '', year: '', image: 'lemstrom',      summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'Moss',            url: 'https://gomoss.co/',               industry: '', year: '', image: 'moss',          summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'Allove',          url: 'https://allove.in/',               industry: '', year: '', image: 'allove',        summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'Your Basil',      url: 'https://yourbasil.com/',           industry: '', year: '', image: 'your-basil',    summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] },
    { name: 'Primerry',        url: 'https://primerry.in/',             industry: '', year: '', image: 'primerry',      summary: '', tech: ['Shopify', 'Liquid', 'Custom sections'] }
  ],

  testimonials: [
    { quote: 'Working with Gunjan changed how our storefront performs and how it feels to use.',
      name: 'Aditi Rao', role: 'Head of Ecommerce', company: 'Atelier Nord' },
    { quote: 'He shipped a section library our marketing team runs on its own. No tickets since.',
      name: 'Marcus Feld', role: 'Founder', company: 'Northfield Goods' },
    { quote: 'Our product pages went from sluggish to instant. Conversion followed within a month.',
      name: 'Lena Brandt', role: 'Brand Director', company: 'Maren Skin' }
  ]
};
