import os
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


def get_supabase() -> Client:
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_key = os.getenv("SUPABASE_KEY", "").strip()

    if not supabase_url or not supabase_key:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_KEY must be set in backend environment."
        )

    try:
        return create_client(supabase_url, supabase_key)
    except Exception as exc:
        raise RuntimeError(f"Unable to initialize Supabase client: {exc}") from exc
