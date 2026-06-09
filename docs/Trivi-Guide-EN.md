# Trivi — a tiny app for quick questions

## What Trivi does

Trivi is a small app that lives on your phone or laptop. One tap and it's open. You type a word or a sentence and get an answer right away:

1. Translates a word into all your languages — at once.
2. Explains a concept, phrase, or topic in 3–6 short sentences.
3. Answers a quick question — just the answer, no padding.

You can also add your own commands (more on that below).

![Main screen](screenshots/main-input.png)

---

## How Trivi works (the short version)

Trivi runs entirely inside your browser. There is no Trivi server. When you ask Trivi something, your browser talks directly to your AI provider — Google Gemini or OpenAI — using **your own API key**. The answer comes straight back to your browser.

That means three things, and they matter:

- **Your data is private to you.** No one (not even us) can read your questions or answers. They never touch any server we run, because we don't run one.
- **You bring your own AI key.** You get a free key from Google (Gemini) once, paste it into Trivi, and you're set. Optional: add an OpenAI key as a fallback.
- **You pay nothing to us.** Trivi itself is free to use. The AI provider has its own free tier — typical use stays inside it.

The trade-off: because everything lives in your browser, **clearing your browser data wipes your Trivi setup** (keys and custom commands included). That's why Trivi has an **Export config** button — see the Backup section below.

### How Trivi works (the technical version)

Trivi is a static Progressive Web App served from GitHub Pages. The frontend (HTML/CSS/JS) is the entire application — no backend exists. Configuration and API keys live in the browser's `localStorage`. Network calls go directly from the browser to `generativelanguage.googleapis.com` (Gemini) or `api.openai.com` (OpenAI fallback) using the user's own keys. The service worker caches the shell for offline launch and instant updates. We support exactly two providers — **Gemini and OpenAI** — and any model they expose under those endpoints. There is no auth layer, no telemetry, no shared state. Every install is independent.

---

## Step 1 — Get a free Google key

Trivi uses Google's Gemini AI to produce answers. You need a "key" — a long string Google gives you for free. No credit card required. Free tier covers normal personal use.

1. Open `aistudio.google.com` in your browser.
2. Sign in with any Google account.
3. Click **Get API Key** in the left panel.
4. Click **Create API Key**.
5. Copy the key (it starts with `AIza…`). Keep the tab open — we'll paste it in a moment.

![Google AI Studio — key](screenshots/google-apikey.png)

Optional: you can also create an OpenAI key at `platform.openai.com/api-keys` and paste it as a fallback. OpenAI is not free; only add it if you want backup when Gemini is rate-limited.

---

## Step 2 — Open Trivi and paste your key

1. Open the Trivi link you received with your purchase.
2. Tap the gear icon (top right) to open Settings.
3. Paste your key into the **Gemini API Key** field.
4. (Optional) Paste an OpenAI key into the **OpenAI API Key** field.
5. Tap **Save**.

![Settings — keys](screenshots/settings-api-keys.png)

That's the whole setup. Trivi now uses that key every time you ask something.

---

## Step 3 — Pick your languages

In Settings, choose:

- **Source language** — the language you usually type in (e.g. English).
- **Target languages** — the languages you want translations in. One, two, or five — your call. For example: German and Ukrainian; or French, Spanish, Polish.

![Settings — languages](new_docu/3.png)

When you type a word with no command prefix, Trivi shows it in all your target languages at once.

---

## Step 4 — Install as a regular app

This step is optional but recommended — it puts Trivi on your home screen so it opens with one tap.

- **iPhone (Safari):** tap the Share icon → **Add to Home Screen**.
- **Android (Chrome):** open the menu → **Add to Home Screen**.
- **Mac / PC (Chrome):** click the install icon on the right side of the address bar.

Trivi now behaves like a regular app.

---

## Daily use

### Translation (default)

Just type a word — no prefix. You'll get translations in all your target languages with usage examples.

![Translation](new_docu/2.png)

### Explain — `e`

Type `e`, a space, and a topic.

`e what is a reverse proxy`

You'll get a 3–6 sentence explanation. Not a lecture.

### Question — `q`

Type `q`, a space, and a question.

`q capital of Lithuania` → `Vilnius`

Just the answer. No "Great question!" or other padding.

### Command (for people who code) — `c`

Type `c`, a space, and what you need.

`c rename all .txt files to .md`

You get the exact terminal command. Copy and paste.

### Cyrillic prefixes — no keyboard switching

If you type on a Ukrainian keyboard layout, each built-in command also accepts a native Cyrillic letter so you don't have to switch layouts for one letter:

- `п ` — Explain (alongside `e `)
- `з ` — Question (alongside `q `)
- `к ` — Command (alongside `c `)

Both variants work. Custom commands you create can also use any Cyrillic letter as a prefix.

---

## Adding your own commands

The three letter-commands above (`e`, `q`, `c`) are just the start. You can add your own — one letter, one task.

A few ideas:

- `s` — Summarize: *"Summarize this text in 3 short bullets."*
- `f` — Grammar fix: *"Fix the grammar. Return only the corrected sentence."*
- `p` — Polite: *"Rewrite this more politely, in the same language."*
- `d` — Definition: *"Give a dictionary definition, etymology, and one example."*

How to add:

1. Open Settings → **Commands**.
2. Type a letter (the prefix).
3. Type a label for yourself (e.g. `Summarize`).
4. Type the instruction (the prompt) — what the AI should do.
5. Tap **Save**.

![Custom commands](new_docu/4.png)

That letter now does exactly that task. Type `s ` and any text — you get your summary.

---

## Backup — Export and Import your config

Because Trivi stores everything in your browser, clearing browser data or moving to a new device will reset it. Use the Backup section in Settings to keep a copy.

- **Export config** — downloads a JSON file (`trivi-config-YYYY-MM-DD.json`) containing your keys, languages, and custom commands. Save it somewhere safe.
- **Import config** — pick a previously exported JSON file to restore everything in one step.

The exported file contains your **API keys in plain text**. Treat it like a password file: don't email it, don't put it in shared cloud folders, don't paste it in chats. A USB stick or a password manager attachment is fine.

---

## Troubleshooting

- **"Invalid API key" or no answer at all.** Open Settings, check that the key starts with `AIza…` and has no extra spaces. Save again.
- **No internet.** Trivi needs internet to reach Google or OpenAI. Offline answers don't work.
- **Answer in the wrong language.** Open Settings and check **Target languages**. Save and try again.
- **I cleared my browser and lost everything.** Use Import config to restore from a previous Export. Without one, you'll have to re-enter your key and any custom commands.

---

## FAQ

- **Do I need an account?** No.
- **Is there a subscription?** No. One payment, lifetime access.
- **Where do my questions go?** Straight from your browser to Google (or OpenAI). Nothing passes through us — we have no server.
- **Do I need to be technical?** No. If you can copy and paste, you're set.
- **Will it work on my phone?** Yes. iPhone, Android, laptop, desktop — anything with a browser.
- **Can I trust the app with my data?** The full code is open on GitHub. You or any technical friend can read exactly what the app does.
- **Which AI providers does Trivi use?** Two: Google Gemini (primary) and OpenAI (optional fallback). No others.

---

*Made by litai. We build small AI tools that just work.*
