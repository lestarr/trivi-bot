# Trivi PWA — Deployment & Distribution Guide

## What This Is

Trivi is a stateless Progressive Web App (PWA) — a single HTML file with no backend server. Users bring their own Gemini/OpenAI API keys. Everything runs in the browser. Nothing to maintain.

## Files

```
pwa/
  index.html       # The entire app (UI + JS, all inline)
  manifest.json    # PWA install metadata
  sw.js            # Service worker (offline shell caching)
  icon-192.svg     # App icon (small)
  icon-512.svg     # App icon (large)
```

Total: ~20KB. That's it.

---

## Step 1: Create a Public Repo (One-Time)

Use the litai LLC GitHub account. Your private repo stays private.

1. Go to https://github.com/new (logged into litai account)
2. Repository name: `trivi`
3. Visibility: **Public**
4. Click **Create repository**

## Step 2: Push the PWA Files

```bash
# Clone the new empty repo
cd /tmp
git clone https://github.com/litai-solutions/trivi.git
cd trivi

# Copy only the PWA files (not the server code)
cp ~/git/trivi-bot/pwa/* .

# Commit and push
git add -A
git commit -m "Trivi PWA — quick translation and AI assistant"
git push
```

## Step 3: Enable GitHub Pages

1. Go to your repo: https://github.com/litai-solutions/trivi
2. Click **Settings** (tab at top)
3. Left sidebar: **Pages**
4. Source: **Deploy from a branch**
5. Branch: **main** / root
6. Click **Save**
7. Wait ~1 minute

Your app is now live at: **https://litai-solutions.github.io/trivi-bot/**

## Step 4: Test It

1. Open the URL on your phone
2. You should see the setup banner: "Welcome to Trivi!"
3. Enter your Gemini API key (get one free at https://aistudio.google.com)
4. Save settings
5. Type "e what is DNS" — should get an Explain response

## Step 5: Install as App

### Android (Chrome)
- Visit the URL in Chrome
- Tap the 3-dot menu (top right)
- Tap "Add to Home Screen" or "Install app"
- Trivi appears as an app icon

### iPhone (Safari)
- Visit the URL in Safari (not Chrome!)
- Tap the Share button (bottom center, square with arrow)
- Tap "Add to Home Screen"
- Trivi appears as an app icon

### macOS (Chrome or Edge)
- Visit the URL in Chrome
- Click the install icon in the address bar (monitor with down arrow)
- Or: 3-dot menu > "Install Trivi..."
- Trivi appears in your Applications / Dock

---

## Updating the App

When you make changes to the PWA:

```bash
# From your private repo, copy updated files to the public repo
cp ~/git/trivi-bot/pwa/* /path/to/trivi-public-repo/
cd /path/to/trivi-public-repo
git add -A
git commit -m "Update: description of change"
git push
```

GitHub Pages redeploys automatically within ~1 minute.

Users get the update next time they open the app (service worker fetches fresh files).

---

## Sharing with Others

### Simple sharing
Send them the URL: `https://litai-solutions.github.io/trivi-bot/`

They'll need to:
1. Get a free Gemini API key at https://aistudio.google.com
2. Open the URL, enter their key in Settings
3. Install as app (optional but recommended)

### Gumroad distribution
- Product type: Digital product
- Deliverable: The URL + a short PDF with API key setup instructions
- Price: Free / Pay what you want / Small fee
- The product IS the URL — no files to download

---

## How It Works (Technical)

- **No server.** The HTML/JS runs entirely in the user's browser.
- **API keys** are stored in the browser's localStorage. They never leave the device except to call Gemini/OpenAI directly.
- **Each user is isolated.** Different browser = different localStorage = different keys, settings, commands.
- **Offline shell.** The service worker caches the app shell. The app opens instantly even without internet (API calls still need network).
- **Language guard.** Every prompt is prepended with a strict anti-Russian instruction. Cyrillic input in Explain/Question modes appends a Ukrainian language cue.

---

## Getting a Gemini API Key (Instructions for Users)

1. Go to https://aistudio.google.com
2. Sign in with a Google account
3. Click "Get API Key" in the left sidebar
4. Click "Create API Key"
5. Copy the key (starts with `AIza...`)
6. Paste it into Trivi Settings > Gemini API Key
7. Click Save

The free tier allows ~15 requests per minute — plenty for personal use.

## Getting an OpenAI API Key (Optional)

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)
5. Paste it into Trivi Settings > OpenAI API Key
6. Click Save

Note: OpenAI requires a paid account (pay-as-you-go). It's used as a fallback when Gemini fails.

---

## Command Prefixes

| Prefix | Mode | What it does |
|--------|------|-------------|
| `e` or `explain` | Explain | Explains a concept in 3-6 sentences |
| `c` or `command` | Command | Gives a bash/python command |
| `q` or `question` | Question | Direct answer to a question |
| _(no prefix)_ | Translation | Translates between configured languages |

Cyrillic keyboard: `e` (Cyrillic) and `c` (Cyrillic) work too — no need to switch keyboards.

## Custom Commands

Open Settings > Commands > "+ Add command" to create your own prefixes and prompts.
