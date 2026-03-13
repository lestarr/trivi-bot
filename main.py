import os
import re
import unicodedata
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import config
import llm

load_dotenv()

AUTH_TOKEN = os.environ.get("AUTH_TOKEN", "")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

TEMPLATE = (Path(__file__).parent / "templates" / "index.html").read_text()

TRANSLATION_PROMPT = (
    "You are a translation assistant. Translate the input from {source} to {targets}.\n"
    "Format:\n"
    "LANG_CODE: translation\n\n"
    "For verbs: if the verb has multiple distinct sub-meanings, provide a brief usage "
    "example for each sub-meaning in each target language.\n"
    "No preamble, no explanation, no extra text. Just the translations."
)


# --- Auth helpers ---

def _check_token(token: str) -> str:
    """Validate token and return it. Raises 401 on mismatch."""
    if not AUTH_TOKEN or token != AUTH_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return token


def _bearer_token(authorization: str = Header(...)) -> str:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return _check_token(authorization[7:])


# --- Routing logic ---

# Cyrillic letters that look identical to Latin command prefixes
_CYRILLIC_TO_LATIN = str.maketrans({
    "\u0435": "e",  # Cyrillic е → Latin e
    "\u0415": "E",  # Cyrillic Е → Latin E
    "\u0441": "c",  # Cyrillic с → Latin c
    "\u0421": "C",  # Cyrillic С → Latin C
    "\u0440": "p",  # Cyrillic р → Latin p
    "\u0420": "P",  # Cyrillic Р → Latin P
    "\u043e": "o",  # Cyrillic о → Latin o
    "\u041e": "O",  # Cyrillic О → Latin O
    "\u0430": "a",  # Cyrillic а → Latin a
    "\u0410": "A",  # Cyrillic А → Latin A
})


def _parse_input(text: str, commands: list[dict]) -> tuple[str, str, str]:
    """Return (mode_label, system_prompt, stripped_input)."""
    # Normalize Cyrillic lookalikes so "е деплой" matches prefix "e"
    lower = text.lower().translate(_CYRILLIC_TO_LATIN)
    for cmd in commands:
        prefix_short = cmd["prefix"].lower() + " "
        prefix_full = cmd["full_prefix"].lower() + " "
        if lower.startswith(prefix_short):
            return cmd["label"], cmd["prompt"], text[len(prefix_short):]
        if lower.startswith(prefix_full):
            return cmd["label"], cmd["prompt"], text[len(prefix_full):]
    return "Translation", "", text  # default


_CYRILLIC_RE = re.compile(r"[\u0400-\u04FF]")
_UKRAINIAN_CUE = " (відповідай українською!)"

# Modes where Cyrillic input should get a Ukrainian language cue
_CUE_MODES = {"Explain", "Question"}


# --- Endpoints ---

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    key = request.query_params.get("key", "")
    _check_token(key)
    return HTMLResponse(TEMPLATE)


class AskBody(BaseModel):
    input: str


@app.post("/ask")
async def ask(body: AskBody, authorization: str = Header(...)):
    token = _bearer_token(authorization)
    cfg = config.load(token)

    mode, prompt, user_input = _parse_input(body.input, cfg["commands"])

    if mode == "Translation":
        src = cfg["translation"]["source"]
        tgts = cfg["translation"]["targets"]
        prompt = TRANSLATION_PROMPT.format(source=src, targets=tgts)

    # For Cyrillic input in explain/question modes, nudge Gemini toward Ukrainian
    if mode in _CUE_MODES and _CYRILLIC_RE.search(user_input):
        user_input = user_input + _UKRAINIAN_CUE

    response_text, model_used = await llm.query(prompt, user_input)
    return {"response": response_text, "mode": mode, "model": model_used}


@app.get("/config")
async def get_config(authorization: str = Header(...)):
    token = _bearer_token(authorization)
    return config.load(token)


@app.put("/config")
async def put_config(request: Request, authorization: str = Header(...)):
    token = _bearer_token(authorization)
    body = await request.json()
    config.save(token, body)
    return {"status": "ok"}
