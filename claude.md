# Claude Project Notes

## Project Summary

This repository is a FastAPI service that:

- serves a minimal web UI from `templates/index.html`
- supports translation and command-based assistant modes
- stores per-token config in SQLite
- uses Gemini first, with OpenAI fallback on Gemini rate/server errors

## Key Files

- `main.py`: routes, auth checks, mode parsing, static/template serving
- `config.py`: default config, SQLite read/write by token
- `llm.py`: Gemini call and OpenAI fallback logic
- `.env.example`: required environment variable names
- `Procfile`: deployment run command

## Local Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

UI URL:

`http://localhost:8000/?key=<AUTH_TOKEN>`

## Auth Rules

- `AUTH_TOKEN` must be set.
- UI access requires query param `key`.
- API calls require `Authorization: Bearer <AUTH_TOKEN>`.

## Behavior Details

- `POST /ask` parses prefixes from config commands.
- If no prefix matches, mode is Translation.
- Translation prompt is built from config source/target languages.
- Gemini failures only fall back to OpenAI when status is `429` or `5xx`.

## Language Enforcement

- `llm.py` prepends a `LANGUAGE_GUARD` to every system prompt — forbids Russian, requires Ukrainian for Slavic input.
- `main.py` appends `(відповідай українською!)` to Cyrillic user input in Explain/Question modes.
- Both layers are needed: system prompt alone can be overridden by Gemini's language detection on ambiguous Cyrillic words.
- `main.py` has `_CYRILLIC_TO_LATIN` homoglyph table so Cyrillic "е"/"с" prefixes route to correct command modes.

### Gemini Language Behavior (Key Insight)

- Gemini has strong internal language detection that can override system prompt instructions.
- For ambiguous Cyrillic words (exist in both Russian/Ukrainian), Gemini defaults to Russian.
- Fix requires **both** system-level guard AND input-level Ukrainian cue to reliably force Ukrainian.
- End-of-prompt language instructions are deprioritized by Gemini; beginning-of-prompt placement is critical.

## Safe Change Guidelines

- Keep auth behavior backward compatible.
- Preserve response shape for `/ask` and config endpoints.
- Keep default command structure stable unless intentionally migrating.
- If editing `llm.py`, preserve fallback trigger semantics unless requested.
- Preserve `LANGUAGE_GUARD` in `llm.py` and Ukrainian cue logic in `main.py` — both layers are required.
