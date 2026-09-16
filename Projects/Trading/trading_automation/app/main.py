from fastapi import FastAPI

from app.config.settings import settings


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Personal paper trading automation system",
)


@app.get("/")
def root():
    return {
        "system": settings.app_name,
        "version": settings.app_version,
        "mode": "PAPER" if settings.paper_mode else "LIVE",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/config")
def config():
    return {
        "initial_capital": settings.initial_capital,
        "allocation_percent": settings.allocation_percent,
        "max_position_value": settings.max_position_value,
        "max_quantity": settings.max_quantity,
        "max_open_positions": settings.max_open_positions,
        "max_daily_loss": settings.max_daily_loss,
        "max_daily_trades": settings.max_daily_trades,
        "paper_mode": settings.paper_mode,
    }