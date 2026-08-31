# Launch Checklist — prazwalbhusal.com.np

Complete this list **after** the backup folder replaces the live site.

---

## 1. Social profile reciprocal links (manual — Kiro cannot do this)

These profiles need to link back to `https://prazwalbhusal.com.np` in their bio/website field.
The JSON-LD `sameAs` array already references all four, but the reverse link strengthens the signal.

| Platform | Profile URL | Action needed |
|---|---|---|
| GitHub | https://github.com/Prazwal123 | Add `https://prazwalbhusal.com.np` to the Website field in your profile settings |
| LinkedIn | https://www.linkedin.com/in/prazwal-bhusal/ | Add `https://prazwalbhusal.com.np` to the Website field in your profile |
| Instagram | https://www.instagram.com/mysticplbl/ | Add `prazwalbhusal.com.np` to the bio link |
| Facebook | https://www.facebook.com/PrazwalBhusal/ | Add `https://prazwalbhusal.com.np` to the website field |

---

## 2. Google Search Console

1. Go to https://search.google.com/search-console/
2. Add property → URL prefix → `https://prazwalbhusal.com.np`
3. Verify ownership (HTML tag method recommended — paste the `<meta name="google-site-verification" ...>` tag into `src/app/layout.tsx` under the `verification` key in the metadata object)
4. After verification, submit the sitemap: **Sitemaps → Add sitemap → `sitemap.xml`**
5. Run the URL Inspection tool on `https://prazwalbhusal.com.np` and request indexing

---

## 3. Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters/
2. Add your site → `https://prazwalbhusal.com.np`
3. Verify (you can import from Google Search Console automatically if already verified there)
4. Submit sitemap: `https://prazwalbhusal.com.np/sitemap.xml`

---

## 4. Rich Results / JSON-LD validation

Run the Person schema through Google's validator after the site is live:
https://search.google.com/test/rich-results?url=https://prazwalbhusal.com.np

---

## 5. OG image (important before sharing on social)

The current OG image is an SVG placeholder (`public/og-image.svg`).
Twitter/X and some platforms require a PNG or JPG.

**Action:** Create a 1200×630 PNG version (`public/og-image.png`) and update these two lines in `src/app/layout.tsx`:

```ts
// openGraph.images[0].url
url: '/og-image.png',

// twitter.images
images: ['/og-image.png'],
```

The SVG already has the right layout — export it as PNG from a browser or design tool.

---

## 6. PageSpeed baseline comparison

Run PageSpeed Insights on the live site **before** and **after** deploying these changes:
https://pagespeed.web.dev/analysis?url=https://prazwalbhusal.com.np

Record the Mobile and Desktop scores here:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Before (original live site) | — | — | — | — |
| After (this version) | — | — | — | — |

---

## 7. Education page placeholders

Two fields in `/education` and `/about` still show "To be added":
- Start Year (Bachelor of IT)
- Expected Graduation Year

Update them in:
- `src/app/education/page.tsx` (search for `To be added`)
- `src/app/about/page.tsx` (search for `To be added`)

---

## 8. Hero CV button

The "Download CV" button in `src/components/Hero.tsx` points to `href="#"`.
Replace `href="#"` with the actual path to your CV file (e.g. `/cv-prazwal-bhusal.pdf`) once you have one.

---

## 9. Project detail pages

The three dynamic project pages (`/projects/portfolio-website`, `/projects/network-scanner`, `/projects/cybersecurity-notes`) all show placeholder content. Fill them in via `src/data/projects.ts` when ready.
