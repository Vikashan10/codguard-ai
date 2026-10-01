"""Central application configuration using pydantic-settings."""
from functools import lru_cache
from typing import Literal
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables and .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    APP_ENV: Literal["development", "production", "testing"] = Field(
        default="development",
        description="Current runtime environment",
    )
    APP_NAME: str = Field(
        default="CODGuard API",
        description="Application name displayed in API metadata",
    )
    API_V1_STR: str = Field(
        default="/api/v1",
        description="Prefix for API version 1",
    )
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/codguard",
        description="Async PostgreSQL connection URL",
    )
    JWT_SECRET_KEY: str = Field(
        default="change-this-in-production-secret-key-32chars",
        description="Secret key for JWT token generation and verification",
    )
    LLM_API_KEY: str = Field(
        default="",
        description="API key for LLM provider",
    )
    TELEGRAM_BOT_TOKEN: str = Field(
        default="",
        description="Bot token for Telegram integration",
    )
    FRONTEND_URL: str = Field(
        default="http://localhost:5173",
        description="Allowed frontend origin for CORS",
    )

    @property
    def is_production(self) -> bool:
        """Check if environment is production."""
        return self.APP_ENV == "production"

    @property
    def is_testing(self) -> bool:
        """Check if environment is testing."""
        return self.APP_ENV == "testing"


@lru_cache
def get_settings() -> Settings:
    """Return cached instance of application settings."""
    return Settings()


settings = get_settings()
