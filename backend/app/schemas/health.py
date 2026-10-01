"""Health check schemas."""
from pydantic import BaseModel, ConfigDict, Field


class HealthResponse(BaseModel):
    """Schema for health status response."""

    model_config = ConfigDict(extra="forbid")

    status: str = Field(..., description="Service status", examples=["ok"])
    service: str = Field(..., description="Service identifier", examples=["codguard-api"])
