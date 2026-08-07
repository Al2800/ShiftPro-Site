# ShiftPro public-site smoke test — 2026-08-07

Ticket: SPS-004

Production origin: `https://shiftpro.uk`

Source branch tested: `agent/lifetime-pro`

## Summary

Result: PASS for the currently deployed public site.

The complete route matrix, internal page and asset references, App Store destination, representative browser navigation, visual rendering, and browser console checks passed. No broken links, missing assets, mixed-content references, or JavaScript console errors were observed.

The three canonical tags added to privacy, terms, and support in commit `7be5a77` are not yet visible publicly. That is tracked under SPS-002 and does not change the route/link smoke-test result below.

## Automated route and asset checks

Each URL was fetched with redirects followed and normal TLS verification. All 16 returned final HTTP 200 responses:

- `https://shiftpro.uk/`
- `https://shiftpro.uk/journal/`
- `https://shiftpro.uk/journal/how-to-build-a-fair-staff-rota.html`
- `https://shiftpro.uk/journal/how-to-plan-night-shifts.html`
- `https://shiftpro.uk/journal/track-actual-hours-and-pay.html`
- `https://shiftpro.uk/privacy.html`
- `https://shiftpro.uk/terms.html`
- `https://shiftpro.uk/support.html`
- `https://shiftpro.uk/robots.txt`
- `https://shiftpro.uk/sitemap.xml`
- `https://shiftpro.uk/styles.css`
- `https://shiftpro.uk/assets/app-icon.png`
- `https://shiftpro.uk/assets/download-on-app-store.svg`
- `https://shiftpro.uk/assets/screens/dashboard.png`
- `https://shiftpro.uk/assets/screens/hours.png`
- `https://shiftpro.uk/assets/screens/schedule.png`

The local crawler parsed all eight HTML pages and verified that every relative `href` and `src` resolves to an existing tracked page or asset.

## App Store check

All App Store links resolve to:

`https://apps.apple.com/gb/app/shiftpro-shift-tracker/id6757769405`

Result: HTTP 200. The returned product title was `ShiftPro - Shift Tracker App - App Store`, and the final URL retained product ID `6757769405`.

## Browser checks

Checked with a real browser against the public origin:

- Homepage loaded with complete navigation, hero, screenshots, guide cards, privacy section, CTA, and footer.
- Guides navigation opened the journal index.
- The journal index exposed all three guide links.
- The fair-rota guide opened and displayed its breadcrumb, heading hierarchy, article content, back link, and footer navigation.
- The privacy page loaded through its clean-URL redirect and displayed its complete policy and support/legal links.
- No JavaScript errors or console messages appeared on the homepage, journal index, representative guide, or privacy page.
- Visual inspection found no broken images, clipped text, overlapping content, or obvious desktop layout defects on the homepage, journal index, or privacy page.

## Redirect and TLS observations

- HTTP apex redirects to HTTPS apex.
- HTTP `www` redirects to HTTPS `www`.
- Both HTTPS hosts returned 200 with normal certificate validation.
- `www` currently serves the site as an alias rather than redirecting to the canonical apex.
- Cloudflare clean URLs redirect `.html` page requests to extensionless public URLs before returning 200.

## Commands and checks run

- Repository-wide HTML `href`/`src` parser with tracked-target validation.
- Live `curl -L` route and asset matrix with normal TLS verification.
- App Store final-URL, status, product-ID, and page-title check.
- `static-site-release-ops` verifier: `PASS (35 checks)` before the utility-page canonical source update.
- Browser snapshots, visual inspection, link navigation, and console inspection.
- `git diff --check`.

## Remaining release note

Cloudflare Pages did not automatically publish commit `7be5a77` during a 90-second observation window. Read-only project inspection is blocked because the configured Cloudflare API token receives API authentication error code `10000` from `/accounts/<account-id>/pages/projects`. No dashboard fallback or production deployment mutation was attempted.
