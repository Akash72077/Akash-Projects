from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    app_name: str = "Personal Trading Automation"
    app_version: str = "0.1.0"
    paper_mode: bool = True

    # Capital and position sizing
    initial_capital: float = 8000
    allocation_percent: float = 80
    max_position_value: float = 6400
    max_quantity: int = 100

    # Risk limits
    max_open_positions: int = 3
    max_positions_per_symbol: int = 1
    max_daily_loss: float = 400
    max_daily_trades: int = 5
    max_total_exposure: float = 6400

    # Trading hours
    trading_start_time: str = "09:15"
    trading_end_time: str = "15:30"

    # Break-even
    break_even_enabled: bool = False
    break_even_trigger: float = 50

    # Trailing stop
    trailing_enabled: bool = True
    trailing_distance: float = 10

    # Target behavior
    target_exit: bool = True
    trail_after_target: bool = False

    # Telegram
    telegram_bot_token: str = ""
    telegram_allowed_user_ids: str = ""
    telegram_allowed_chat_ids: str = ""

    # Broker
    broker_api_key: str = ""
    broker_api_secret: str = ""

    # Webhook
    webhook_secret: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()