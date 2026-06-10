from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # Application Config
    app_name: str = "Saarthi AI – Multilingual Welfare Copilot"
    environment: str = "development"
    log_level: str = "INFO"

    # Database settings
    database_url: str

    # Gemini Settings
    gemini_api_key: str

    # WhatsApp Cloud API Settings
    whatsapp_token: str
    whatsapp_verify_token: str
    whatsapp_phone_number_id: str

    # Bhashini Settings
    bhashini_user_id: str
    bhashini_api_key: str
    bhashini_pipeline_id: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

@lru_cache()
def get_settings():
    return Settings()
