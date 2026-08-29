---
task: "Trivi PWA — plain-language guided key setup (Option A)"
project: Trivi
slug: 20260828-trivi-key-onboarding
effort: advanced
effort_source: context-override
phase: learn
progress: 38/38
mode: interactive
started: 2026-08-28T22:50:00-04:00
updated: 2026-08-29T00:40:00-04:00
---

## Problem

Trivi is a static PWA with no server: the only way it can reach an LLM is with the user's own Google Gemini key. Non-technical users (observed 2026-08-28) do not know what an "API key" is and are reluctant to set one up. The current UI says "enter your API keys", the settings section is headed "API Keys", the field placeholder is `AIza...`, there is no in-app link to Google's key page, no live test, and a wrong paste fails silently until the first question errors out. The user is asked to pay effort (Google account, AI Studio dialogs, copying a 39-character string) before seeing any value, with developer vocabulary as the only guide.

## Vision

A person who has never heard the words "API key" opens Trivi, reads one friendly sentence explaining that Google hands out a free key (like a library card), taps a button that opens Google's page, copies the key, pastes it, taps **Test & save**, and sees a green "Connected" within two seconds — then types their first word and gets a translation. If something goes wrong, the message tells them in plain words what to do next, not an HTTP code.

## Out of Scope

- No hosted proxy, no litai-paid key, no trial quota (Options B/C) — architecture stays BYOK with zero server.
- No change to translation/commands settings, mode parsing, LLM prompts, or the FastAPI server variant.
- No regeneration of the Gumroad PDF guides tonight (Markdown guides only; PDF via LitaiPdf is a follow-up).
- No push to the public deploy repo tonight (no local clone; documented as next step).
- No browser-extension / manipulation-analysis product — discussed separately, not built here.

## Principles

- Vocabulary is UX: a word the user cannot define is a wall. No "API", no "token", no "credential" in user-facing copy.
- Value-before-effort: every step tells the user why it is worth doing, and the whole setup is framed as one-time, two minutes.
- Fail loudly and kindly: every error state names the next action in the user's language.
- Keep the 20KB, single-file, no-dependency character of the app.

## Constraints

- Static PWA: all logic in `pwa/index.html`; no backend, no build step, no external libraries.
- Key validation must not cost tokens: use `GET https://generativelanguage.googleapis.com/v1beta/models?key=…` (verified 2026-08-28: bad key → 400 `API_KEY_INVALID`; no key → 403).
- Existing `localStorage` schema (`trivi_config`) stays backward compatible — existing users' saved keys must keep working with no re-entry.
- Service-worker cache name must be bumped or existing installs never see the change.
- LANGUAGE_GUARD, Cyrillic prefix handling, and all existing modes untouched.

## Goal

Ship a rewritten key-setup section in `pwa/index.html` (banner + 3-step guided panel + live test with plain-language results + paste hygiene), bump the service worker cache, and align the EN/UA Markdown guides to the same vocabulary — verified in a real browser with a bad key (error path) and a real key (success path).

## Criteria

- [x] ISC-1: User-visible "API key" appears in `pwa/index.html` only in the two deliberate quotes of Google's own wording ("Google calls it an “API key”", "Create API key") — grep count of the phrase in markup ≤ 2 (refined 2026-08-28T23:20).
- [x] ISC-2: The setup banner text no longer contains "API keys" and does contain "free" and "one-time" (grep).
- [x] ISC-3: Clicking the banner opens the settings panel AND focuses the key input (Interceptor: `document.activeElement.id === 'gemini-key'`).
- [x] ISC-4: Settings key section heading reads "Connect Trivi to Google's AI" (grep).
- [x] ISC-5: Key section contains a one-sentence plain-language explanation containing the phrase "library card" (grep).
- [x] ISC-6: Step 1 renders a button/link whose `href` is exactly `https://aistudio.google.com/apikey` (grep).
- [x] ISC-7: That link has `target="_blank"` and `rel="noopener"` (grep).
- [x] ISC-8: Step 2 copy tells the user to click "Create API key" (Google's own button label, quoted) and that the key starts with `AIza` (grep).
- [x] ISC-9: Step 3 key input has a plain-language label ("Paste your key here") (grep).
- [x] ISC-10: A **Test & save** button with id `test-gemini-btn` exists next to the key input (grep).
- [x] ISC-11: A show/hide toggle exists for the key input and flips `type` between `password` and `text` (Interceptor click → attribute check).
- [x] ISC-12: Pressing Enter inside the key input triggers the same test as the button (grep for keydown handler on `gemini-key`).
- [x] ISC-13: Test trims leading/trailing whitespace before validating (unit: paste `"  AIza…  "` → tested value has no spaces; grep `.trim()` in test handler).
- [x] ISC-14: Test with empty input shows "Paste your key first" style message without a network call (Interceptor: message visible, no request in network log).
- [ ] ISC-15: [DROPPED — see Decisions 2026-08-28T23:20] Replaced by ISC-15.1/15.2.
- [x] ISC-15.1: A messy paste (label text, NBSP, newline around an `AIza…` token) is reduced to the bare key before testing (Interceptor: input value after test equals the token).
- [x] ISC-15.2: Input with no `AIza…` token is still sent to Google with a "usually start with AIza" warning, and Google's 400 maps to the plain-language message (Interceptor).
- [x] ISC-16: Test with a well-formed but invalid key (e.g. `AIzaSy` + 33 junk chars) shows a message containing "Google doesn't recognise this key" (Interceptor screenshot).
- [x] ISC-17: Test with a valid key shows a green message containing "Connected" (Interceptor screenshot with the key from `.env`).
- [x] ISC-18: A successful test persists the key to `localStorage.trivi_config.geminiKey` without pressing Save (Interceptor: read localStorage after test).
- [x] ISC-19: A successful test hides the setup banner (Interceptor: banner `display:none`).
- [x] ISC-20: A successful test sets `geminiKeyVerified: true` in config; editing the key input resets the status line to "not tested yet" (Interceptor).
- [x] ISC-21: While the test request is in flight the button is disabled and shows a spinner/“Testing…” (grep + Interceptor).
- [ ] ISC-22: [DROPPED — see Decisions 2026-08-28T23:20] Replaced by ISC-22.1.
- [x] ISC-22.1: HTTP 429 or 5xx during test saves the key unverified and shows "Key saved. Google is busy right now" (grep mapping).
- [x] ISC-23: Network failure (fetch throws) maps to a message containing "Couldn't reach Google" (grep mapping).
- [x] ISC-24: Any other non-2xx maps to a generic message that includes the numeric status (grep mapping).
- [x] ISC-25: Existing **Save** button still saves the key (trimmed) for users who skip Test (grep save handler).
- [x] ISC-26: Status line for a saved-but-untested key reads "Key saved — not tested yet" (grep).
- [x] ISC-27: Status line for a verified key reads "Connected ✓" style (grep).
- [x] ISC-28: OpenAI field label reads "OpenAI key (optional — only if you already have one)" (grep).
- [x] ISC-29: The runtime error when no key is configured (`queryLLM`) no longer says "API keys" and points to Settings in plain words (grep).
- [x] ISC-30: `pwa/sw.js` CACHE constant bumped from `trivi-v2` to `trivi-v3` (grep).
- [x] ISC-31: `docs/Trivi-Guide-EN.md` Step 1 contains the library-card explanation and the phrase "Test & save" (grep).
- [x] ISC-32: `docs/Trivi-Guide-UA.md` Step 2 references the **Test & save** button (Ukrainian copy + button name) (grep).
- [x] ISC-33: `pwa/Trivi-Guide.md` (if it duplicates the EN guide) carries the same Step 1/2 wording (diff/grep).
- [x] ISC-34: `pwa/index.html` still parses: page loads with zero console errors in Interceptor.
- [x] ISC-35: A pre-existing `trivi_config` with `geminiKey` set and no `geminiKeyVerified` field loads without error and shows "Key saved — not tested yet" (Interceptor: seed localStorage, reload).
- [x] ISC-36: `pwa/index.html` size stays under 40KB (`wc -c`).
- [x] ISC-37: Anti: no request is ever made to any host other than `generativelanguage.googleapis.com` / `api.openai.com` during setup (Interceptor network log).
- [x] ISC-38: Anti: no changes to `main.py`, `llm.py`, `config.py`, translation/commands UI, `LANGUAGE_GUARD`, or `CYRILLIC_TO_LATIN` (`git diff --stat` lists only `pwa/index.html`, `pwa/sw.js`, docs, ISA.md).

## Test Strategy

```yaml
- isc: ISC-1..ISC-12, ISC-22..ISC-33, ISC-36, ISC-38
  type: static
  check: grep / wc / git diff on the changed files
  tool: Bash
- isc: ISC-3, ISC-11, ISC-14..ISC-21, ISC-34, ISC-35, ISC-37
  type: live-browser
  check: serve pwa/ locally (python http.server), drive with Interceptor, screenshots + network log + localStorage reads
  tool: Skill("Interceptor")
- isc: ISC-17
  type: live-browser with real credential
  check: key from .env pasted via Interceptor; key never echoed in output
  tool: Skill("Interceptor")
```

## Features

| name | description | satisfies | depends_on | parallelizable |
|------|-------------|-----------|------------|----------------|
| key-panel-markup | Rewrite banner + key section markup/copy, 3 steps, link, test button, show/hide | ISC-1..ISC-12, ISC-26..ISC-29 | — | no |
| key-test-logic | `testGeminiKey()` with trim, prefix check, `GET /models`, error mapping, persistence, verified flag | ISC-13..ISC-25, ISC-35 | key-panel-markup | no |
| sw-bump | `trivi-v2` → `trivi-v3` | ISC-30 | — | yes |
| guides | EN/UA/pwa guide vocabulary alignment | ISC-31..ISC-33 | key-panel-markup (button names) | yes |
| forge-pass | Forge completeness/quality review-and-fix of index.html | ISC-34, ISC-36 | key-test-logic | no |
| browser-verify | Interceptor run of error path, success path, legacy config | ISC-3, ISC-11, ISC-14..ISC-21, ISC-34, ISC-35, ISC-37 | forge-pass | no |

## Decisions

- 2026-08-28T22:50 — Tier E3 by context-override (classifier said E4 because the prompt also floated a browser-extension idea; that idea is discussion, the build is a single-file UI change).
- 2026-08-28T22:50 — Delegation floor (E3 ≥2, soft): Forge selected as review-and-fix pass rather than primary author — the spec is fully determined and lives in one 500-line file where I hold the full context; a second delegate (Anvil/Explore) would only re-read what is already read. Show-your-math: 1 delegation, justified.
- 2026-08-28T22:50 — Key test uses `GET /v1beta/models` not `generateContent`: costs no tokens, validates the key, and avoids model-name coupling.
- 2026-08-28T22:50 — Successful test persists the key immediately (no extra Save click) — one fewer step for the exact users who struggle.
- 2026-08-28T23:20 — Advisor (Inference.ts advisor mode) review adopted: extract key from messy paste instead of hard-blocking on prefix (ISC-15 → 15.1/15.2); 429/5xx = Google busy, not a bad key → save unverified, don't block onboarding (ISC-22 → 22.1); 12s AbortController timeout; `cache:'no-store'`; plain-text entry, mask only after verified save; "Remove this key" button; in-app-browser sign-in hint; keep Google's literal term "API key" visible once so users recognise it on Google's page (ISC-1 refined). Advisor's "wrong ISA loaded" remark was an artifact of its `--auto-state` lookup picking another project's state, not a real issue. Its region-block (403 + "location") case is mapped to a VPN hint.
- 2026-08-28T23:20 — CORS verified with `curl -H Origin:` on 400 and 403 error responses: `access-control-allow-origin` present, so the browser error path reaches the message map.
- 2026-08-28T23:22 — Focus bug found while building: the existing `window.focus → qInput.focus()` handler would drop a returning user's paste into the question box after they copy the key from Google's tab. Handler now keeps focus on the key input while settings are open and the key is unverified.
- 2026-08-29T00:25 — Found during VERIFY: the public deploy repo (litai-solutions/trivi-bot, main d881512) is AHEAD of this private repo — it has the Export/Import "Backup" section (+3KB) that the guides describe and `pwa/index.html` at HEAD lacks. Wizard was built on the stale base. Resolution: `git merge-file` three-way (base=HEAD, mine=wizard, theirs=public) merged clean with 0 conflicts; merged file installed as `pwa/index.html`; "including API keys" in the Backup copy changed to "including your Google key" (ISC-1 stays at 2). Full browser re-verification repeated on the merged build — all pass. Lesson: check the deploy target before building on a private mirror that says "WIP snapshot".
- 2026-08-29T00:30 — Final Advisor gate: of 9 raised gaps, 5 were already satisfied by code (SW activate/skipWaiting/claim, no regex hard-block, three 403 causes, single storage key, abort resets in finally); acted on 2 (shared-device note in all three guides; grep confirms the key is never console-logged); deferred 2 (360px screenshot, PDF regeneration — both belong with deploy).

## Verification

- ISC-1: grep — "API key" in markup = 2 (both deliberate Google quotes)
- ISC-2: grep — banner has "free AI", "one-time setup"; old "enter your API keys" = 0
- ISC-3: Interceptor eval — banner click → settings.open=true, activeElement.id="gemini-key"
- ISC-4..ISC-10, ISC-12, ISC-13, ISC-21, ISC-22.1, ISC-23, ISC-24, ISC-25, ISC-26, ISC-27, ISC-28, ISC-29: grep on pwa/index.html — each pattern count = 1 (ISC-27 = 2)
- ISC-11: Interceptor eval — eye toggle: "text → password → text"
- ISC-14: Interceptor — empty test → "Paste your key first (step 3)…"; net log googleapis requests = 0
- ISC-15.1: Interceptor — paste "Your key:\u00A0AIzaSyBAD…\n" → input value reduced to bare AIza… token
- ISC-15.2: Interceptor — "hello" → "Hmm, Google keys usually start with AIza. Checking with Google anyway…" then Google 400 → recognise-message
- ISC-16: Interceptor — bad AIza key → "Google doesn't recognise this key. Go back to Google's key page…"
- ISC-17: Interceptor — real key (PAI_CONFIG, never printed) → "Connected ✓ — Trivi can use Google's AI."; end-to-end "q capital of Uzbekistan" → "Tashkent"
- ISC-18/ISC-20: Interceptor eval — localStorage.trivi_config: stored=39chars prefix=AIza verified=true; editing input → "Not tested yet — tap "Test & save"." and type=text
- ISC-19: Interceptor eval — banner computed display = none after success
- ISC-21: Interceptor eval — during test: disabled=true / "Testing…"; after: false / "Test & save"
- ISC-30: grep — sw.js CACHE = 'trivi-v3'; Interceptor eval after fresh load — caches.keys() = "trivi-v3"
- ISC-31/32/33: grep — EN guide "library card"=1, "Test & save"=3; UA "Test & save"=3, "читацький квиток"=1; pwa guide "library card"=1, "Test & save"=3
- ISC-34: node --check on extracted inline script = OK; page executed all handlers in browser (a syntax error would have disabled the whole script)
- ISC-35: Interceptor — seeded {geminiKey, openaiKey:''} without verified flag, reload → "Key saved — not tested yet…", banner=none, type=text
- ISC-36: wc -c pwa/index.html = 37.8KB after merging the public Backup feature (< 40KB)
- ISC-37: Interceptor net log hosts during setup = localhost:8765, generativelanguage.googleapis.com only
- ISC-38: git diff --stat = docs/Trivi-Guide-EN.md, docs/Trivi-Guide-UA.md, pwa/Trivi-Guide.md, pwa/index.html, pwa/sw.js (+ untracked ISA.md)
- Note: Interceptor screenshots render the masked password field as its placeholder; DOM eval (value.length=39, type=password) is the authoritative evidence. Screenshots kept in session scratchpad, not in repo.
- Not live-probed: 360px mobile layout (Forge added `.key-row{flex-wrap:wrap}` under the 480px media query; reasoned only) — DEFERRED-VERIFY, follow-up: check on a phone after deploy.
- Re-verification on merged build (2026-08-29T00:35, Interceptor): export-btn present, wizard present, banner→focus=gemini-key, bad key→recognise-message, real key→Connected ✓ verified=true banner=none type=password, e2e 'Tashkent', hosts=localhost+googleapis only, legacy config→'Key saved — not tested yet', caches=trivi-v3.
