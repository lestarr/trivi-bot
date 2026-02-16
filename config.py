import json
import sqlite3
import os

DB_PATH = os.environ.get("CONFIG_DB_PATH", "data/config.db")

DEFAULT_CONFIG = {
    "translation": {
        "source": "English",
        "targets": "German, Ukrainian",
    },
    "commands": [
        {
            "prefix": "e",
            "full_prefix": "explain",
            "label": "Explain",
            "prompt": "Explain the following concept in 3-6 sentences. Be clear and concise. No preamble.",
            "deletable": False,
        },
        {
            "prefix": "c",
            "full_prefix": "command",
            "label": "Command",
            "prompt": (
                "Give the bash or python command for this task. "
                "Include a one-line comment explaining what it does. "
                "No preamble, no explanation beyond the comment. Just the command."
            ),
            "deletable": False,
        },
        {
            "prefix": "q",
            "full_prefix": "question",
            "label": "Question",
            "prompt": "Answer this question directly and concisely. No preamble, no hedging. Just the answer.",
            "deletable": False,
        },
    ],
}


def _get_db() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS configs (token TEXT PRIMARY KEY, data TEXT NOT NULL)"
    )
    conn.commit()
    return conn


def load(token: str) -> dict:
    conn = _get_db()
    row = conn.execute("SELECT data FROM configs WHERE token = ?", (token,)).fetchone()
    conn.close()
    if row:
        return json.loads(row[0])
    return json.loads(json.dumps(DEFAULT_CONFIG))


def save(token: str, config: dict) -> None:
    conn = _get_db()
    conn.execute(
        "INSERT INTO configs (token, data) VALUES (?, ?) "
        "ON CONFLICT(token) DO UPDATE SET data = excluded.data",
        (token, json.dumps(config)),
    )
    conn.commit()
    conn.close()
