"""CODGuard API main application entrypoint."""
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Manage application startup and shutdown lifecycle."""
    # Lifespan startup hooks can be placed here
    yield
    # Lifespan shutdown hooks can be placed here


def create_application() -> FastAPI:
    """Application factory for CODGuard API."""
    app = FastAPI(
        title="CODGuard API",
        version="0.1.0",
        description="AI-assisted COD delivery-assurance platform for social-commerce sellers",
        lifespan=lifespan,
    )

    # CORS configuration
    allowed_origins = [settings.FRONTEND_URL]
    if not settings.is_production:
        for dev_origin in ("http://localhost:5173", "http://127.0.0.1:5173"):
            if dev_origin not in allowed_origins:
                allowed_origins.append(dev_origin)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(health_router)

    return app


app = create_application()
