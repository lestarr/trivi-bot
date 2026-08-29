# Trivi — a tiny app for quick questions

## What Trivi does

Trivi is a small app you keep on your phone or laptop. One tap opens it. You type one thing and get an answer:

1. Translate a word into your languages — all at once.
2. Explain a concept, phrase, or topic in 3–6 short sentences.
3. Answer a quick question with just the answer.

You can also add your own commands (we'll come back to that).

![Main input](../docs/screenshots/main-input.png)

---

## Step 1 — Get a free Google key

Trivi has no server of its own — it asks Google's AI directly from your browser. For that, Google gives you a free **key** (Google calls it an "API key"). Think of it as a library card: Google issues it, it costs nothing, no credit card, and it tells Google whose free allowance to use. The key is stored only on this device — nobody else (including us) ever sees it.

Trivi walks you through this. Open Trivi, tap the red welcome banner (or the gear icon), and you'll see three steps:

1. Tap **Open Google's key page**. Sign in with any Google account if asked.
2. On Google's page click **Create API key**, then copy the key. It is a long string that starts with `AIza`.
3. Come back to Trivi, paste the key into **Paste your key here**, and tap **Test & save**.

![Google AI Studio — API key](../docs/screenshots/google-apikey.png)

---

## Step 2 — Check that it worked

After **Test & save**, Trivi asks Google whether the key is good and tells you in plain words:

- **Connected ✓** — you're done. Trivi will use this key every time you ask something.
- **Google doesn't recognise this key** — go back to Google's page and copy the whole key again (the eye icon shows what you pasted).
- **Couldn't reach Google** — check your internet connection and tap **Test & save** again.

![Settings — API keys](../docs/screenshots/settings-api-keys.png)

That's it for setup.

One thing to know: the key lives in this browser only. Anyone who uses this browser profile can use Trivi with it — so on a shared or borrowed device, tap **Remove this key** in Settings when you're done.

---

## Step 3 — Pick your languages

In Settings, choose:

- **Source language** — the language you usually type in (for example, English).
- **Target languages** — the languages you want answers in. Pick one, two, or five. Examples: German and Ukrainian; or French, Spanish, Polish.

![Settings — languages](../docs/new_docu/3.png)

When you type a word with no command in front of it, Trivi will show that word in every target language at once.

---

## Step 4 — Install it like a real app

This step is optional, but recommended — it puts Trivi on your home screen so it opens with one tap.

- **iPhone (Safari):** tap the Share icon → **Add to Home Screen**.
- **Android (Chrome):** open the menu → **Add to Home Screen**.
- **Mac / PC (Chrome):** click the small install icon at the right end of the address bar.

Now Trivi behaves like any other app.

---

## Using it day-to-day

### Translate (the default)

Just type a word — no command in front. You'll get translations in all your target languages, with example sentences.

![Translation](../docs/new_docu/2.png)

### Explain — `e`

Type `e` and a space, then your topic.

`e what is a reverse proxy`

You get a 3–6 sentence explanation. Not a lecture.

### Question — `q`

Type `q` and a space, then your question.

`q capital of Lithuania` → `Vilnius`

Just the answer. No "Great question!" or other padding.

### Command (for coders) — `c`

Type `c` and a space, then describe what you want.

`c rename all .txt files to .md`

You get the exact terminal command. Copy and paste.

---

## Adding your own commands

The three letter-commands above (`e`, `q`, `c`) are just the starting point. You can add your own — one letter, one job.

Some ideas:

- `s` — Summarise: *"Summarise the following text in 3 short bullet points."*
- `f` — Fix grammar: *"Fix the grammar. Return only the corrected sentence."*
- `p` — Make polite: *"Rewrite this to sound more polite, in the same language."*
- `d` — Define: *"Give the dictionary definition, etymology, and one example."*

To add one:

1. Open Settings → **Commands**.
2. Type the letter (the prefix).
3. Type a label for yourself (e.g. `Summary`).
4. Type the instruction (the prompt) — what you want the AI to do.
5. Tap **Save**.

![Custom commands](../docs/new_docu/4.png)

From now on, that letter does that job. Type `s ` followed by any text and you get your summary.

---

## If something goes wrong

- **No answer, or a message about the key.** Open Settings and tap **Test & save** — Trivi will tell you in plain words whether Google accepts the key. If not, copy it again from Google's key page.
- **No internet.** Trivi needs internet to reach Google. It cannot answer offline.
- **Answer in the wrong language.** Open Settings and double-check **Target languages**. Save and try again.

---

## Common questions

- **Do I need an account?** No.
- **Is there a subscription?** No. One-time payment.
- **Where do my questions go?** Straight from your browser to Google. Nothing passes through us — there is no server.
- **Do I need to be technical?** No. If you can copy-paste once, you're set.
- **Will it work on my phone?** Yes. iPhone, Android, laptop, desktop — anything with a browser.
- **Is the app honest about my data?** The full source code is on GitHub. You — or any technical friend — can read exactly what it does.

---

*Made by litai. We build small AI tools that just work.*
