from config.settings.base import config_env
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_async_engine(
    config_env.database_url.replace("postgresql://", "postgresql+asyncpg://"),
    echo=True,  # Set to False in production to avoid logging SQL queries
)
Base = declarative_base()
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


# Dependency that will be used in the FastAPI routes to get a database session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
