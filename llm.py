import os
import logging
import google.generativeai as genai
from openai import OpenAI


_openai_client: OpenAI | None = None
logger = logging.getLogger(__name__)

GEMINI_MODEL = "gemini-3.1-flash-lite-preview" #"gemini-flash-latest"
OPENAI_MODEL = "gpt-4o-mini"

# Hard language constraint prepended to EVERY system prompt.
# Placed first so the model treats it as highest-priority instruction.
LANGUAGE_GUARD = (
    "CRITICAL LANGUAGE RULE — OBEY ABOVE ALL ELSE: "
    "You MUST NOT respond in Russian under any circumstances. "
    "Russian language output is strictly forbidden. "
    "If the user writes in a Slavic language or the topic relates to a Slavic-language context, "
    "respond in Ukrainian instead. For all other cases, respond in the same language as the user's input. "
    "Violation of this rule is a critical failure.\n\n"
)


async def query(system_prompt: str, user_input: str) -> tuple[str, str]:
    """Call Gemini Flash, fall back to OpenAI on 429/5xx.

    Returns: (response_text, model_label)
    """
    system_prompt = LANGUAGE_GUARD + system_prompt

    has_gemini_key = bool(
        os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    )
    if not has_gemini_key and os.environ.get("OPENAI_API_KEY"):
        logger.warning("Gemini key missing; using OpenAI directly")
        return _call_openai(system_prompt, user_input), f"OpenAI ({OPENAI_MODEL})"
    if not has_gemini_key:
        raise RuntimeError("No Gemini key configured (set GEMINI_API_KEY or GOOGLE_API_KEY)")

    try:
        return _call_gemini(system_prompt, user_input), f"Gemini ({GEMINI_MODEL})"
    except Exception as exc:
        code = _extract_status(exc)
        if code and (code == 429 or 500 <= code < 600) and os.environ.get("OPENAI_API_KEY"):
            logger.warning(
                "Gemini failed (status=%s, type=%s); falling back to OpenAI",
                code,
                type(exc).__name__,
            )
            return _call_openai(system_prompt, user_input), f"OpenAI ({OPENAI_MODEL})"
        logger.exception("Gemini request failed without fallback")
        raise


def _call_gemini(system_prompt: str, user_input: str) -> str:
    # Configure at call time so .env values loaded during app startup are respected.
    gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY", "")
    genai.configure(api_key=gemini_key)
    model = genai.GenerativeModel(
        GEMINI_MODEL,
        system_instruction=system_prompt,
        generation_config=genai.GenerationConfig(temperature=0.2),
    )
    response = model.generate_content(user_input)
    return response.text


def _call_openai(system_prompt: str, user_input: str) -> str:
    client = _get_openai_client()
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        temperature=0.2,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input},
        ],
    )
    return response.choices[0].message.content


def _get_openai_client() -> OpenAI:
    global _openai_client
    if _openai_client is None:
        api_key = os.environ.get("OPENAI_API_KEY", "")
        if not api_key:
            raise RuntimeError("OPENAI_API_KEY is not set")
        _openai_client = OpenAI(api_key=api_key)
    return _openai_client


def _extract_status(exc: Exception) -> int | None:
    """Try to pull an HTTP status code out of an exception."""
    if hasattr(exc, "status_code"):
        return exc.status_code
    if hasattr(exc, "code"):
        return exc.code
    return None
