# Trivi

**A tiny stateless PWA for trivial AI tasks — translate, explain, run commands, ask questions.**

Live: **https://litai-solutions.github.io/trivi-bot/**

---

## What it does

One input box. Type anything → get an instant answer. No chat threads, no clutter, no accounts.

- **Translate** — type any word, get all your configured languages at once, with usage examples
- **Explain** (`e <topic>`) — 3-sentence concise explanation
- **Command** (`c <task>`) — just the bash/python command, ready to copy
- **Question** (`q <question>`) — direct answer, no preamble
- **Custom commands** — add your own prefixes and prompts in Settings (e.g. `s` for summary, `w` for weather, `r` for recipes)

Voice input supported (where browser allows) — speech recognition follows your configured source language.

## How it works

- Single HTML file (~20 KB), no backend
- Bring your own [Google Gemini API key](https://aistudio.google.com/apikey) (free) and optionally an OpenAI key as fallback
- API keys are stored only in your browser's localStorage — never sent anywhere except directly to Google/OpenAI
- Installable as a PWA on phone or desktop

## Use it

1. Get a free Gemini API key: https://aistudio.google.com/apikey
2. Open https://litai-solutions.github.io/trivi-bot/
3. Tap the gear icon, paste your API key, set your languages
4. Type a word, press Enter, done

## Buy the setup guide

Full walkthrough with screenshots is on [Gumroad](#) — $1.

## Source

Everything's here. Audit it. Fork it. The whole point of Trivi is that it's small enough to read in one sitting.

Built by [LitAI LLC](https://github.com/litai-solutions).
