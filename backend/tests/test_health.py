"""Tests for GET /health endpoint."""
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_endpoint_status(async_client: AsyncClient) -> None:
    """Test that /health returns status code 200."""
    response = await async_client.get("/health")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_health_endpoint_response_body(async_client: AsyncClient) -> None:
    """Test that /health returns the exact expected JSON response."""
    response = await async_client.get("/health")
    expected = {
        "status": "ok",
        "service": "codguard-api",
    }
    assert response.json() == expected
