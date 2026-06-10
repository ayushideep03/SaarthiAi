import logging
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from sqlalchemy import text
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

engine = create_async_engine(
    settings.database_url,
    echo=(settings.environment == "development"),
    future=True
)

AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def init_db():
    """
    Initialize database extensions and create tables.
    """
    async with engine.begin() as conn:
        logger.info("Initializing database extensions...")
        await conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
        logger.info("Database extensions ensured.")

async def get_db():
    """
    Dependency for getting async database sessions.
    """
    async with AsyncSessionLocal() as session:
        yield session
