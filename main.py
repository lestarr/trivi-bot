import os
import re
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

def _parse_input(text: str, commands: list[dict]) -> tuple[str, str, str]:
    """Return (mode_label, system_prompt, stripped_input)."""
    lower = text.lower()
    for cmd in commands:
        prefix_short = cmd["prefix"].lower() + " "
        prefix_full = cmd["full_prefix"].lower() + " "
        if lower.startswith(prefix_short):
            return cmd["label"], cmd["prompt"], text[len(prefix_short):]
        if lower.startswith(prefix_full):
            return cmd["label"], cmd["prompt"], text[len(prefix_full):]
    return "Translation", "", text  # default


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

    response_text = await llm.query(prompt, user_input)
    return {"response": response_text, "mode": mode}


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
