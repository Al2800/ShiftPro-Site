# ShiftPro handoff

Last updated: 25 September 2026. Covers the growth review and reset on 24 September 2026.

Read this first, then `docs/SEO_BRIEF.md` (how to work) and `SEO_CHANGELOG.md` (what changed and when). The brief replaces the earlier daily SEO handoff.

## Where things stand

Nothing from the reset has been merged yet. Three PRs are open and all have been auto-approved by the Cursor Approval Agent. That approval is not a human review.

| PR | What it does | Status |
|---|---|---|
| [Site #24](https://github.com/Al2800/ShiftPro-Site/pull/24) | Corrects NHS pay rates, adds App Store campaign links, fixes pricing claims, adds `SEO_BRIEF.md` and this handoff | Open. Merge first. |
| [Site #25](https://github.com/Al2800/ShiftPro-Site/pull/25) | New free NHS unsocial hours calculator at `/tools/nhs-unsocial-hours-calculator.html` | Open. Stacked on #24, and GitHub retargets it to `main` once #24 merges. |
| [App #15](https://github.com/Al2800/ShiftPro/pull/15) | Version 1.1: one-time £4.99 lifetime Pro instead of subscriptions, rating prompt, updated App Store metadata | Open. **Not compiled.** Needs an Xcode build and tests before merging. |

Numbers at the time (GSC, 28 days to 20 Sep 2026): 7 clicks, about 2,160 impressions, average position 33.1. The NHS guide had 6 of the 7 clicks (326 impressions, position about 6). The App Store listing had 0 ratings and was still on version 1.0, released 22 July 2026.

## What the review found

1. **Wrong pay figures on the one page that converts.** The NHS guide grouped Bands 1 to 3 at +50%/+88% and said only hours inside the unsocial window are enhanced. The England rates are Band 1 +47%/+94%, Band 2 +41%/+83%, Band 3 +35%/+69% and Bands 4 to 9 +30%/+60%. If more than half of a weekday shift falls between 20:00 and 06:00, the whole shift is enhanced. Source: [NHS Employers](https://www.nhsemployers.org/articles/unsocial-hours-payments), checked 24 Sep 2026. Fixed in #24.
2. **Downloads could not be traced to pages.** `shiftpro-marketing-os` records that the campaign link was live on the site. It never was: git history has no commit containing it. Fixed in #24. The marketing-os record (`config/human_input.json`, SP-HI-002) still says it was live and should be corrected.
3. **Pricing claims contradicted the listing.** The site said "£4.99 one-time, no subscription", while the listing is a £4.99 paid app that also sells subscriptions. Fixed in #24 for now. It will be settled properly by v1.1 (see "Pricing").
4. **Wrong audience.** Most SEO work targeted manager searches ("how to make a staff rota"). Manager rostering is a non-goal in the app's `PRODUCT_DEFINITION.md`. The page that converts is aimed at workers.
5. **Too much editing to measure.** `what-is-a-work-rota` was edited 5 times in 8 days, and 12 of 18 changelog entries had no GSC numbers. Titles were rewritten for "click-through" on pages at position 20 to 60, where the problem is ranking, not titles.
6. **FAQ schema on every page.** Google limited FAQ rich results to government and health sites in 2023, so the FAQPage JSON-LD gives this site nothing. The same questions also repeat across pages.
7. **Fair staff rota URL split is already fixed.** The bare URL returns 301 to `.html`, and the canonical, internal links and sitemap all use `.html`. No action is needed; Google will drop the bare URL.

## Owner actions

These need a person with the right access. Agents should not attempt them.

1. **Build app #15 in Xcode and run `ShiftProTests`.** It's based on `agent/submission-readiness`, which matches the shipped 1.0 (`main` stops on 20 Jul). GitHub Actions pins Xcode 15.2, which cannot build `MeshGradient`, and Codemagic did not report a build.
2. **Check for unpushed 1.1 work on the Mac.** `terms.html` already describes the 1.1 lifetime Pro model, but no such code was on GitHub.
3. **Release 1.1 in this order:**
   1. Create the £4.99 non-consumable IAP `com.shiftpro.pro.lifetime`.
   2. Remove the monthly and yearly subscriptions from sale.
   3. Upload a build numbered above 8 and submit with manual release.
   4. Paste the listing copy from `Marketing/Metadata/AppStoreMetadata.md` in the app repo.
   5. Release 1.1.
   6. **Only then** set the price to Free. If the price drops while 1.0 is live, free 1.0 downloads are treated as paid customers and get Pro.
4. **Decide whether the Cursor Approval Agent may merge.** If it can, it could deploy site changes or merge the uncompiled app change without review.

## Agent tasks

### After #24 and #25 merge (same day)

- Submit the changed URLs to IndexNow (key `41e3ed39041643d7ab28131f0e7077ba`) and Bing.
- In GSC, request indexing for `/tools/nhs-unsocial-hours-calculator.html` and `/journal/nhs-shift-rota-patterns.html`.
- Fill in "Date merged" on the #24 and #25 changelog entries.

### Once 1.1 is live on the App Store

Switch the site's pricing copy to "Free to download. Pro reports are £4.99 once, with no subscription." Change these in the same PR:

- `index.html`: meta and social descriptions, hero pricing line, trust list, final CTA, App Store aria-labels, and JSON-LD `offers.price` (set it to `0`)
- `journal/work-rota-app-for-iphone.html`: the Pricing section and the final CTA

Check the live listing (`https://itunes.apple.com/lookup?id=6757769405&country=gb`) before writing.

### Measurement dates

| Date | Check |
|---|---|
| From 2 Oct 2026 | App Store Connect → Analytics → Campaigns. Downloads by `ct` token should start to appear. |
| 21 Oct 2026 | Result for PR #21 (rolling rota FAQ) |
| 22 Oct 2026 | Results for #23, #24 and #25. The manager-intent pages stop being frozen, but change them only if the data supports it. |
| Weekly | Scorecard in `SEO_BRIEF.md` (GSC clicks by page, campaign downloads, conversion rate, ratings) |

### Next build work

The backlog is in `SEO_BRIEF.md`, priorities section. The next tool is a 4-on-4-off and continental shift calendar generator with an `.ics` download. After that, a rolling rota "am I working on this date?" checker.

## Reference

- **Repos:**
  - `Al2800/ShiftPro-Site` (this site; Cloudflare Pages project `shiftpro-site`)
  - `Al2800/ShiftPro` (iOS app, private)
  - `Al2800/shiftpro-marketing-os` (measurement tooling; runs on the owner's Mac)
- **App Store:** ID `6757769405`. Campaign links use the form `https://apps.apple.com/app/apple-store/id6757769405?pt=128448172&ct=<token>&mt=8`, where the token is `web-<page-slug>`, `web-home`, `web-journal` or `tool-<slug>` (40 characters max). The Smart App Banner and JSON-LD `downloadUrl` stay on the plain listing URL.
- **GSC property:** `sc-domain:shiftpro.uk`
- **Calculator upkeep:**
  - `BANK_HOLIDAYS` in `tools/nhs-unsocial-hours-calculator.html` runs to the end of 2028. Refresh it from `https://www.gov.uk/bank-holidays.json` each year.
  - `RATES` holds the Agenda for Change percentages. Re-check them against NHS Employers after each national pay deal. The page text and table must match `RATES`.
- **NHS pay in the app:** not built. An estimated 1 to 2 weeks: a v2 `PayRules` with time windows and per-band rates, shift splitting in `HoursCalculator` and `PayPeriodCalculator`, a band picker, and export columns. Worth doing after 1.1, because it makes the calculator's promise real inside the app.
- **Pricing model decision (owner, 24 Sep 2026):** free download plus one-time £4.99 Pro. No subscriptions.
