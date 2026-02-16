# Trivi Bot

Small FastAPI app for quick translation and prompt-based assistant modes, backed by Gemini with OpenAI fallback.

## First Steps

1. Create and activate a virtual environment.
2. Install dependencies.
3. Create `.env` from `.env.example` and set real keys.
4. Run the app with Uvicorn.
5. Open the UI with your auth token.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

Open:

`http://localhost:8001/?key=<AUTH_TOKEN>`

## Environment Variables

- `AUTH_TOKEN`: required. Used for UI access and API authorization.
- `GEMINI_API_KEY`: required for primary LLM calls.
- `OPENAI_API_KEY`: fallback LLM key used on Gemini 429/5xx errors.
- `CONFIG_DB_PATH`: optional. Defaults to `data/config.db`.

## API

- `GET /?key=<AUTH_TOKEN>`: loads the web UI.
- `POST /ask` (Bearer token): sends input and returns `{ response, mode }`.
- `GET /config` (Bearer token): returns current token config.
- `PUT /config` (Bearer token): saves config for that token.

Example request:

```bash
curl -X POST http://localhost:8001/ask \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input":"e what is sqlite"}'
```

## Notes

- Per-token config is stored in SQLite (`config.py`).
- Default command prefixes:
  - `e` / `explain`
  - `c` / `command`
  - `q` / `question`
- If no command prefix is used, input runs in Translation mode.

