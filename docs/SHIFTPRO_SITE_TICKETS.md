# ShiftPro website ticket backlog

Repository: `Al2800/ShiftPro-Site`

This backlog is intentionally split into small, independently reviewable sessions. Do not make production DNS, legal, App Store, analytics, or publication changes without the relevant human approval.

## Current baseline

- Static marketing site exists with homepage, three journal guides, privacy, terms, support, `robots.txt`, and `sitemap.xml`.
- Cloudflare Pages is the production host for `shiftpro.uk`; the apex and `www` hosts resolve over HTTPS. The apex is the declared canonical host, while `www` currently serves the same site without a hard redirect to the apex.
- The complete homepage-plus-guides build is publicly reachable at `https://shiftpro.uk/`, including the journal, privacy, terms, support, `robots.txt`, and `sitemap.xml` routes.
- The reviewed source remains on `agent/lifetime-pro`. Remote `main` still contains the earlier minimal GitHub Pages build plus a `CNAME` file and is not the Cloudflare Pages production source.
- Canonical, Open Graph, Twitter image, JSON-LD, robots, and sitemap URLs have been migrated to `https://shiftpro.uk` and are present in the live deployment.
- Every HTML page in the tracked source now declares a `https://shiftpro.uk/...` canonical URL, and no tracked public source retains stale GitHub Pages metadata references. The privacy, terms, and support canonical additions require deployment and live verification; the configured Cloudflare token currently cannot read Pages projects (API code `10000`).
- Current copy describes a free download plus lifetime Pro, which must be reconciled with the approved £4.99 paid-upfront product decision before public launch.
- The reviewed source branch is `agent/lifetime-pro`.

## Status snapshot — 2026-08-07

| Ticket | Status | Reconciliation note |
| --- | --- | --- |
| SPS-001 | Complete | Cloudflare Pages is selected and live; apex and `www` pass DNS, TLS, and HTTP checks. Apex is canonical and `www` is an alias. |
| SPS-002 | In progress | Source is complete, but the privacy, terms, and support canonical tags have not reached the live Pages deployment; API authentication code `10000` blocks CLI project inspection/deployment. |
| SPS-003 | Not started | Commercial and public-copy approval is still required. |
| SPS-004 | Complete | Route, link, asset, App Store, representative browser, visual, and console checks passed; evidence is in `docs/SHIFTPRO_SITE_SMOKE_TEST_2026-08-07.md`. |
| SPS-005 | Not started | No static-site CI quality gate is present. |
| SPS-006 | In progress | The complete site is deployed to Cloudflare Pages, but source/rollback documentation and the remaining dependency gates are incomplete. |
| SPS-007 | Not started | Accessibility and responsive QA remain outstanding. |
| SPS-008 | Not started | Support, privacy, and legal review remain outstanding. |
| SPS-009 | Not started | App Store CTA and product identity verification remain outstanding. |
| SPS-010 | Not started | Search Console and privacy-safe measurement work remain outstanding. |
| SPS-011 | Not started | Performance and asset-hygiene work remain outstanding. |
| SPS-012 | Not started | The next evidence-backed content tranche has not started. |

## Delivery order

Recommended order: SPS-001 → SPS-002 → SPS-003 → SPS-004 → SPS-005 → SPS-006. SPS-007 through SPS-012 can then be worked independently, subject to their stated dependencies.

---

## SPS-001 — Configure and verify the ShiftPro custom domain

Status: Complete — verified 2026-08-07.

Priority: P0
Type: Infrastructure / release gate

Goal: Make `shiftpro.uk` the real public entry point without leaving two competing production origins.

Acceptance criteria:

- The chosen hosting target is documented: GitHub Pages behind Cloudflare, Cloudflare Pages, or a Worker-backed static origin.
- Apex `shiftpro.uk` and the chosen `www` policy resolve correctly.
- HTTPS works for apex and `www` according to the documented redirect policy.
- The final origin returns the ShiftPro homepage and static assets without 4xx/5xx errors.
- Cloudflare DNS/proxy settings and the hosting custom-domain setting agree.
- No DNS mutation is made without explicit approval and a rollback note.

Dependencies: None.

---

## SPS-002 — Migrate canonical and social metadata to `shiftpro.uk`

Status: In progress — source checks passed on 2026-08-07; deployment and live verification of the three new legal/support canonicals are blocked by Cloudflare Pages API authentication code `10000`.

Priority: P0
Type: SEO / metadata

Goal: Remove the GitHub Pages URL as the public canonical identity after SPS-001 is ready.

Acceptance criteria:

- Every HTML page has the correct `https://shiftpro.uk/...` canonical URL.
- `og:url`, Open Graph image URLs, Twitter image URLs, JSON-LD `url`, article URLs, and breadcrumb URLs use the approved public domain.
- Internal links do not accidentally send users back to the GitHub Pages origin.
- `robots.txt` and `sitemap.xml` use the public domain.
- A repository-wide search finds no stale `al2800.github.io/ShiftPro-Site` references except explicitly documented historical notes.
- Metadata is reviewed before public deployment.

Dependencies: SPS-001.

---

## SPS-003 — Reconcile the commercial model and public copy

Status: Not started.

Priority: P0
Type: Product / legal copy

Goal: Make the website match the approved ShiftPro commercial decision.

Acceptance criteria:

- Homepage hero, feature sections, App Store CTAs, guides, support, terms, and metadata agree on the product model.
- The approved £4.99 paid-upfront model is represented accurately, or a separately approved replacement decision is recorded first.
- Unsupported claims such as “free to try”, “lifetime Pro”, subscription language, or legacy entitlement wording are removed or explicitly justified.
- Price-sensitive copy does not contradict the live App Store listing.
- Privacy and terms wording is reviewed as public/legal copy before publication.
- No App Store pricing or metadata mutation is performed by this ticket.

Dependencies: Current App Store commercial state must be confirmed by a human owner.

---

## SPS-004 — Run a complete launch-route and link smoke test

Status: Complete — verified 2026-08-07; see `docs/SHIFTPRO_SITE_SMOKE_TEST_2026-08-07.md`.

Priority: P0
Type: QA

Goal: Prove that the public site works as a coherent static website.

Acceptance criteria:

- Homepage, journal index, all three guide pages, privacy, terms, support, `robots.txt`, and `sitemap.xml` return expected HTTP responses.
- Navigation works from homepage, journal pages, legal pages, and support.
- All local images, stylesheets, icons, and App Store links load successfully.
- The App Store URL resolves to the intended ShiftPro product in the approved storefront.
- No broken internal links, missing assets, console errors, or mixed-content warnings are present.
- A dated smoke-test record is saved with the tested URLs and results.

Dependencies: SPS-001 and SPS-002 for final-domain testing.

---

## SPS-005 — Add static-site CI quality gates

Status: Not started.

Priority: P1
Type: CI / automation

Goal: Catch broken pages and stale domain metadata before review or deployment.

Acceptance criteria:

- GitHub Actions runs on pull requests and the protected deployment branch.
- CI checks HTML validity or parseability, local-link integrity, asset existence, sitemap validity, and canonical-domain consistency.
- CI fails on stale GitHub Pages URLs after SPS-002 is merged.
- CI reports the page list and any broken links in a readable job summary.
- Production deployment is not made automatic until the human publication policy is approved.

Dependencies: SPS-002; choose the hosting/deployment target in SPS-001.

---

## SPS-006 — Promote the reviewed site branch and document deployment/rollback

Status: In progress — full site is live on Cloudflare Pages; source and rollback documentation remain.

Priority: P0
Type: Release / operations

Goal: Make the complete reviewed site—not the current minimal `main` deployment—the single public production build.

Acceptance criteria:

- A human-approved branch/source is selected for GitHub Pages or the chosen Cloudflare target.
- The deployed source contains the homepage, all three journal guides, privacy, terms, support, `robots.txt`, and `sitemap.xml`.
- The public route smoke test returns the expected result for every route; no journal, robots, or sitemap route is left at 404.
- README documents the source directory, build-free/static deployment method, hosting target, custom-domain configuration, and rollback procedure.
- One production origin is named as canonical; any secondary origin is explicitly non-production or redirect-only.
- Deployment verification commands are documented without embedding credentials.
- The release checklist records DNS, HTTPS, metadata, links, legal copy, and App Store CTA checks.
- The procedure distinguishes read-only checks from human-approved mutations.

Dependencies: SPS-001 through SPS-005.

---

## SPS-007 — Accessibility and responsive layout pass

Status: Not started.

Priority: P1
Type: UX / accessibility

Goal: Make the marketing site usable on mobile, tablet, desktop, keyboard, and assistive technology.

Acceptance criteria:

- Keyboard navigation reaches every interactive control in logical order.
- Focus states are visible and skip-link behavior works.
- Heading hierarchy, landmark labels, link names, image alt text, and form/support instructions pass review.
- Text and controls meet the agreed contrast and touch-target standards.
- Layout is checked at narrow mobile, tablet, and desktop widths with no overflow or clipped content.
- Reduced-motion behavior is respected if animation is added or currently present.

Dependencies: None, but run again after visual changes.

---

## SPS-008 — Improve support, privacy, and legal handoff

Status: Not started.

Priority: P1
Type: Trust / legal / support

Goal: Ensure public support and policy pages are safe, current, and actionable.

Acceptance criteria:

- Support instructions identify the app version, device, and reproducible steps without requesting private shift or pay data.
- The public GitHub-issue support route is explicitly reviewed for suitability, visibility, and moderation.
- Privacy claims match the current app release and its actual permissions/services.
- Terms match the approved commercial model and current App Store behavior.
- Last-updated dates and support links are consistent across all pages.
- Any legal wording change receives human approval before deployment.

Dependencies: SPS-003 and current app-release facts.

---

## SPS-009 — Verify App Store CTA and product identity

Status: Not started.

Priority: P1
Type: Distribution / conversion

Goal: Ensure every download CTA leads to the correct live product and storefront.

Acceptance criteria:

- App Store product ID, title, storefront country, and availability are verified.
- Header, hero, guide, and final CTA links all point to the same approved destination.
- Apple Smart App Banner metadata matches the verified product.
- Link behavior is tested on desktop and iPhone/iPad.
- Campaign links or attribution parameters are added only after their exact URLs are human-approved.

Dependencies: SPS-003; App Store state must be verified read-only first.

---

## SPS-010 — Add privacy-safe measurement and Search Console readiness

Status: Not started.

Priority: P1
Type: Measurement / SEO operations

Goal: Make site performance observable without silently changing tracking or privacy behavior.

Acceptance criteria:

- Search Console property and sitemap settings are recorded for the final domain.
- A read-only monitoring path is documented for indexing, sitemap, query, and page data.
- Cloudflare traffic evidence is clearly distinguished from confirmed human visitors and bot/AI traffic.
- No RUM, third-party analytics, cookies, or tracking SDK is enabled without explicit approval.
- Any campaign attribution plan records the data source, retention, and human approval boundary.

Dependencies: SPS-001 and SPS-002.

---

## SPS-011 — Performance and asset hygiene pass

Status: Not started.

Priority: P1
Type: Performance / maintenance

Goal: Keep the static site fast, small, and easy to maintain.

Acceptance criteria:

- Images are appropriately sized and compressed for their rendered dimensions.
- Generated video files, `.DS_Store` files, build caches, and other non-source artifacts are excluded from the production repository unless deliberately required.
- CSS and page assets load without unnecessary duplication.
- A repeatable performance check is recorded for homepage and guide pages.
- Cache behavior is documented for the chosen hosting target.

Dependencies: SPS-001; coordinate with any active creative work before deleting or moving artifacts.

---

## SPS-012 — Build the next content tranche with evidence

Status: Not started.

Priority: P2
Type: Content / SEO

Goal: Expand useful search-facing content without making unsupported product or earnings claims.

Acceptance criteria:

- Proposed guide topics are mapped to real ShiftPro capabilities and user problems.
- Each guide has a title, search intent, internal-link plan, metadata, structured data, and factual review checklist.
- Content avoids payroll guarantees, medical advice, employer-policy claims, or unapproved pricing claims.
- New pages pass SPS-004 and SPS-007 checks.
- Publication remains human-approved until SPS-005 and the publishing policy are closed.

Dependencies: SPS-003 and SPS-004.

---

## Session handoff rules

For each ticket, use a branch such as `site/SPS-001-custom-domain` and keep the change scoped to that ticket. Before handing off:

1. Record files changed and commands/tests run.
2. Run the ticket’s acceptance checks.
3. Do not reset, overwrite, merge, commit, or push unrelated dirty work.
4. Do not include credentials, API keys, private keys, browser-session data, or connection strings.
5. Leave production mutations and public publication for the explicitly approved release step.
