# ShiftPro growth and SEO brief

This brief replaces the earlier daily SEO handoff (reset 24 Sep 2026). Read it and `SEO_CHANGELOG.md` before changing any page.

## The goal

App Store downloads and sales from people who will use the app. Impressions and position only matter if they lead to downloads. The weekly scorecard (below) is the measure of success.

## Who the site is for

ShiftPro is a personal app for **individual shift workers**: the employer's rota tells you when to work, ShiftPro checks the hours and pay. Manager rostering is a product non-goal (`PRODUCT_DEFINITION.md` in the app repo). A manager searching "how to make a staff rota" cannot use the app, however well the page ranks.

Start with NHS staff (Agenda for Change pay rules are national, so the app and the site can be exact). Then ambulance, police, security, care and hospitality.

The only page that converts so far is `/journal/nhs-shift-rota-patterns.html`, the one aimed at workers. Follow that signal.

## Priorities, in order

1. **Accuracy.** Pay, rest and legal figures must come from a primary source (NHS Employers, gov.uk, BMA, NHS Staff Council handbook). Link the source on the page and note the check date in the changelog. A wrong pay figure on a page nurses use to check their payslip does more harm than a missing page.
2. **Tools before articles.** Free calculators and generators rank and convert better than articles for a utility app. Each tool ends with a clear "the app does this every shift" CTA. Backlog:
   - NHS unsocial hours calculator (`/tools/nhs-unsocial-hours-calculator.html`, added 24 Sep 2026)
   - 4-on-4-off and continental shift calendar generator with a calendar (.ics) download
   - Rolling rota "am I working on this date?" checker
   - Holiday entitlement calculator for irregular-hours and part-year workers (gov.uk 12.07% accrual rules)
3. **Worker-intent pages.** Deepen the thin pages close to the app first: `track-actual-hours-and-pay` (about 400 words), `how-to-plan-night-shifts` (about 390), `shift-rota-templates-and-patterns` (split out a proper 4-on-4-off page), `work-rota-app-for-iphone`. New topics to consider: NHS pay bands for the current year, how to check an NHS payslip, bank shifts and rest rules, police overtime and rest-day working, ambulance unsocial hours.
4. **Manager-intent pages are frozen.** `how-to-build-a-fair-staff-rota`, `how-to-make-a-work-rota`, `how-to-make-a-shift-rota`, `shift-rota-vs-work-rota`, `what-is-a-work-rota` and the journal hub: fix errors and broken links only. No title, meta or FAQ rewrites before 22 Oct 2026, and only then if the 28-day data shows a page on page 1 with poor click-through.

## How to work

- **Weekly, not daily.** One batch of changes a week is enough for a site this size.
- **Measure before you change.** Record the page's 28-day GSC clicks, impressions and position in the changelog entry. "Not recorded" is not acceptable for a page with data.
- **One change per page per 28 days.** Google needs weeks to react. Editing the same page five times in eight days (as happened in September 2026) makes every result unreadable.
- **Fill in the Result line** on changelog entries that are 4 weeks old before starting new work.
- **Position decides the fix.** On page 1 with low click-through, work on the title and meta. Beyond position 10, titles will not fix it: the page needs better content, internal links or a narrower target.
- **One URL per query.** The hub, `what-is-a-work-rota`, `how-to-make-a-work-rota`, `how-to-make-a-shift-rota` and `shift-rota-vs-work-rota` already compete for "work rota / shift rota". Don't add more.
- **FAQs are optional.** Google stopped showing FAQ rich results for most sites in 2023, so FAQPage schema gives this site no search feature. Only add an FAQ where it answers a real query the body does not. Keep it to 4 questions or fewer, and never repeat a question that another page already answers.

## App Store links and attribution

- Every App Store button uses a campaign link with a per-page token: `https://apps.apple.com/app/apple-store/id6757769405?pt=128448172&ct=web-<page-slug>&mt=8` (homepage `web-home`, hub `web-journal`, tools `tool-<slug>`). Tokens must be 40 characters or fewer.
- The Smart App Banner meta tag and JSON-LD `downloadUrl` stay on the plain listing URL.
- Read results in App Store Connect → Analytics → Acquisition → Campaigns (rows appear after about 24 hours and a few first-time downloads).

## Pricing claims

Check the live listing before writing about price. The app is moving from a £4.99 paid download with optional subscriptions to a free download with a one-time £4.99 Pro unlock (version 1.1, which `terms.html` already describes).

- **Until v1.1 is live:** say "£4.99 on the App Store", "no account" and "no ads". Do not say "no subscription" or "one-time" about the app as a whole. Saying hours and pay tracking need no subscription is fine.
- **Once v1.1 is live:** "Free to download. Pro reports are £4.99 once, with no subscription." Update `index.html`, `work-rota-app-for-iphone.html`, the JSON-LD `offers` price and the aria-labels in the same PR.

## Weekly scorecard

Each week, record:

- GSC clicks and impressions by page (28 days)
- App Store Connect: product page views, conversion rate, first-time downloads, downloads by campaign (`ct`) and web referrer, units sold, ratings count

## Indexing

After a merge, run IndexNow (key `41e3ed39041643d7ab28131f0e7077ba`, key file at the site root) and Bing URL submission. Use GSC "Request indexing" only for new pages or material content changes, not wording tweaks.

## Closed items

- **Fair staff rota URL split:** resolved (verified 24 Sep 2026). The bare URL returns 301 to `.html`, the canonical is `.html`, all internal links and the sitemap use `.html`. Google will drop the bare version in time. No action needed.
- **What-is-a-rolling-rota FAQ** (PR #21, 23 Sep): measure after 21 Oct 2026 before touching it.

## Writing rules

No em dashes (use full stops, commas, colons or brackets). No AI clichés: delve, landscape, robust, seamless, leverage, unlock, elevate, empower, fast-paced, "in this guide", game-changer, "Whether you...". No unprovable superlatives ("best app"). Use UK spelling and UK context. Draft, rewrite in a plain human voice, then do a cliché and em dash check before merging.
