import os
import google.generativeai as genai
from openai import OpenAI


genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))
_openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

GEMINI_MODEL = "gemini-2.0-flash"
OPENAI_MODEL = "gpt-4o-mini"


async def query(system_prompt: str, user_input: str) -> str:
    """Call Gemini Flash, fall back to OpenAI on 429/5xx."""
    try:
        return _call_gemini(system_prompt, user_input)
    except Exception as exc:
        code = _extract_status(exc)
        if code and (code == 429 or 500 <= code < 600):
            return _call_openai(system_prompt, user_input)
        raise


def _call_gemini(system_prompt: str, user_input: str) -> str:
    model = genai.GenerativeModel(
        GEMINI_MODEL,
        system_instruction=system_prompt,
        generation_config=genai.GenerationConfig(temperature=0.2),
    )
    response = model.generate_content(user_input)
    return response.text


def _call_openai(system_prompt: str, user_input: str) -> str:
    response = _openai_client.chat.completions.create(
        model=OPENAI_MODEL,
        temperature=0.2,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input},
        ],
    )
    return response.choices[0].message.content


def _extract_status(exc: Exception) -> int | None:
    """Try to pull an HTTP status code out of an exception."""
    if hasattr(exc, "status_code"):
        return exc.status_code
    if hasattr(exc, "code"):
        return exc.code
    return None
