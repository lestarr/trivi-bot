# Trivi Launch Worksheet

Everything you need to do, in exact order, with exact names and clicks.

---

## Step 0: Create a Gumroad Account

**Where:** https://app.gumroad.com/signup

1. Click **Start selling**
2. Sign up with email (use your litai business email if you have one)
3. Choose a **username** — this becomes your store URL
   - Recommended: `litai-solutions` → your store will be `https://litai-solutions.gumroad.com`
   - Or just `litai` if available
4. Confirm your email
5. Go to **Settings** → **Profile**:
   - Display name: `litai`
   - Bio: `AI tools that work correctly. Built by litai LLC.`
   - Profile picture: use your litai logo or the Trivi icon
6. Go to **Settings** → **Payments**:
   - Connect Stripe (or PayPal) to receive payments
   - Gumroad will walk you through this — takes ~5 minutes
   - You need this even for $1 sales

**Note:** Gumroad takes a 10% fee + payment processing (~3%). On a $1 sale you'll receive roughly $0.84. This is fine — you're not here for the revenue, you're here for the proof of sale.

**After this:** your store exists. You can come back to create the product in Step 6.

---

## Step 1: Create the Public Repo

**Where:** https://github.com/new (logged into litai-solutions account)

| Field | Value |
|-------|-------|
| Repository name | `trivi` |
| Description | `Instant AI assistant for quick tasks — translate, explain, command, question` |
| Visibility | **Public** |
| Initialize with README | **No** (leave unchecked) |
| .gitignore | None |
| License | MIT |

Click **Create repository**.

You'll see a page with setup instructions. Copy the HTTPS clone URL. It will look like:
```
https://github.com/litai-solutions/trivi.git
```

**Come back to the terminal and tell litus the URL. litus will push the files for you.**

---

## Step 2: Enable GitHub Pages

**Where:** Your new repo → **Settings** tab (top bar, far right)

1. Left sidebar → click **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
3. Click **Save**
4. Wait 1-2 minutes
5. Refresh the page — you'll see a green box:
   > Your site is live at `https://litai-solutions.github.io/trivi-bot/`

Open that URL in your browser. You should see Trivi with the setup banner.

**If it shows 404:** wait another minute and refresh. GitHub Pages can take up to 3 minutes on first deploy.

---

## Step 3: Test the Live App

1. Open `https://litai-solutions.github.io/trivi-bot/` on your phone
2. Tap the gear icon (Settings)
3. Paste your Gemini API key
4. Tap Save
5. Test each mode:
   - Type `hello` → should get translation to German + Ukrainian
   - Type `e DNS` → should get explanation
   - Type `c list files by size` → should get bash command
   - Type `q who invented javascript` → should get direct answer
6. Test Cyrillic: switch to Ukrainian keyboard, type `е DNS` → should trigger Explain mode

**If something doesn't work:** note what failed and tell litus.

---

## Step 4: Install as App & Take Screenshots

### Install on iPhone
1. Open the URL in **Safari** (not Chrome — PWA install only works in Safari on iOS)
2. Tap the **Share button** (square with arrow, bottom center)
3. Scroll down → tap **"Add to Home Screen"**
4. Name it `Trivi` → tap **Add**
5. Find the Trivi icon on your home screen → open it
6. It should open full-screen, no Safari toolbar — like a real app

### Install on Android (if testing)
1. Open the URL in **Chrome**
2. You may see an "Install app" banner at the bottom — tap it
3. Or: tap **three-dot menu** (top right) → **"Add to Home Screen"** or **"Install app"**

### Install on Mac
1. Open the URL in **Chrome**
2. Look for a small install icon in the address bar (monitor with down arrow)
3. Click it → click **Install**
4. Trivi appears as a separate window / in your Applications

### Screenshots to take (8 total)

Take these on your phone (iPhone or Android) for the best Gumroad presentation:

| # | What to capture | How |
|---|-----------------|-----|
| 1 | **Empty main screen** | Open app, nothing typed yet. Shows the clean dark UI with input field. |
| 2 | **Translation result** | Type a word (e.g. `deployability` or `sustainability`). Wait for multi-language result. Screenshot. |
| 3 | **Explain result** | Type `e reverse proxy`. Wait for explanation. Screenshot. |
| 4 | **Command result** | Type `c find files larger than 100mb`. Wait for command with copy button. Screenshot. |
| 5 | **Question result** | Type `q who invented javascript`. Wait for answer. Screenshot. |
| 6 | **Settings with custom command** | Open settings, add a new command. Screenshot showing the commands section. |
| 7 | **API key setup** | Open settings, show the API key field (with a key pasted or placeholder visible). Screenshot. |
| 8 | **Home screen icon** | Go to your phone's home screen. Show the Trivi icon among your other apps. Screenshot. |

**Tip:** Use a word you genuinely find useful for screenshot #2. Authentic > staged.

Save screenshots somewhere accessible (e.g. Desktop folder named `trivi-screenshots`).

---

## Step 5: Build the PDF

### Option A: Google Docs (easiest)

1. Open https://docs.google.com → **Blank document**
2. Open `pwa/Trivi-Guide.md` in VS Code or any text editor
3. Copy the text section by section into Google Docs
4. At each `> [SCREENSHOT: ...]` line:
   - Delete the placeholder text
   - Insert → Image → Upload from computer → pick the matching screenshot
   - Resize to fit nicely (about 60-70% page width for phone screenshots)
5. Basic formatting:
   - Title: bold, larger font
   - Section headers (##): bold
   - Code (`e DNS`): use monospace font or highlight with grey background
   - Keep it clean — dark screenshots on white page look great
6. File → Download → **PDF Document (.pdf)**

### Option B: Notion

1. Create a new Notion page
2. Paste the markdown content (Notion renders it automatically)
3. Drag-drop screenshots where the placeholders are
4. Export → PDF

### Option C: Typora (if installed)

1. Open `Trivi-Guide.md` in Typora
2. Drag-drop screenshots into the `[SCREENSHOT]` positions
3. File → Export → PDF

**Final PDF check:**
- [ ] All 8 screenshots inserted
- [ ] `[YOUR TRIVI URL]` replaced with actual URL
- [ ] Text reads well on phone screen (not too small)
- [ ] "made by litai" link at the bottom works
- [ ] No `[SCREENSHOT: ...]` placeholder text remaining

---

## Step 6: Create Gumroad Listing

**Where:** https://app.gumroad.com → **New Product**

### Product details

| Field | Value |
|-------|-------|
| **Name** | `Trivi — Instant AI Assistant for Quick Tasks` |
| **Price** | `$1` |
| **Type** | Digital product |

### Description (copy-paste this):

```
Stop context-switching for quick lookups.

You're reading, coding, or chatting with an AI. You hit an unfamiliar word,
need a bash command, or want a quick explanation. What do you do?

You skip it. We all do. Because opening a translator or starting a new chat
is just enough friction to not bother.

Trivi fixes this. It's a tiny app that lives on your phone — always one tap
away. Type a word, hit Enter, get the answer. Go back to what you were doing.

What you get:
- Instant translation to multiple languages at once
- Quick explanations (type "e" + your question)
- Bash/Python commands (type "c" + what you need)
- Direct Q&A (type "q" + anything)
- Add your own custom command shortcuts
- Works on iPhone, Android, Mac, PC — installs like a native app
- No accounts. No data collection. Your API keys stay on your device.

You'll need a free Gemini API key (takes 2 minutes to get).
The PDF guide walks you through everything.

Built by litai — we build AI tools that work correctly.
```

### Upload & Images

- **File:** Upload your PDF
- **Cover image:** Screenshot #2 (translation result) or Screenshot #1 (clean main screen)
- **Thumbnail:** Same image

### Tags

Add these tags: `AI`, `productivity`, `translation`, `PWA`, `assistant`, `tool`

### Publish

1. Review everything
2. Click **Publish**
3. Copy your Gumroad product URL (e.g. `https://litai-solutions.gumroad.com/l/trivi`)

---

## Step 7: Test the Full Purchase Flow

1. Open your Gumroad product URL in an **incognito/private browser window**
2. Buy it for $1 (use a real card — you'll refund yourself)
3. Download the PDF
4. Follow the PDF instructions as if you're a new user:
   - Open the URL
   - Get a Gemini API key (you already have one — just verify the instructions make sense)
   - Enter the key
   - Try all 4 modes
   - Install as app
5. Refund yourself in Gumroad dashboard if you want (Sales → click the sale → Refund)

### Check these:

- [ ] PDF downloads correctly
- [ ] URL in PDF works
- [ ] Screenshots are readable on phone
- [ ] Instructions are clear enough for someone who's never used an API key
- [ ] App installs correctly from the URL

---

## After Launch

- [ ] Post the Gumroad link on your litai website (when ready)
- [ ] Optional: share on LinkedIn/Twitter with a short post about the "friction removal" insight
- [ ] Optional: post on Reddit r/languagelearning or r/productivity
- [ ] Tell litus when you want to build the next tool

---

## Quick Reference

| What | Where |
|------|-------|
| PWA source files | `~/git/trivi-bot/pwa/` |
| PDF guide draft | `~/git/trivi-bot/pwa/Trivi-Guide.md` |
| Deployment guide | `~/git/trivi-bot/pwa/DEPLOY.md` |
| Funnel strategy | `~/git/trivi-bot/Plans/funnel-strategy.md` |
| Live app URL | `https://litai-solutions.github.io/trivi-bot/` (after Step 2) |
| Gumroad product | `https://litai-solutions.gumroad.com/l/trivi` (after Step 6) |
