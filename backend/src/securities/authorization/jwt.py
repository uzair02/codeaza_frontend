from datetime import datetime, timedelta

from config.settings.base import config_env
from config.settings.logger_config import logger
from jose import jwt


async def create_access_token(data: dict) -> str:
    """
    Creates a JWT access token.

    Args:
        data (dict): The data to encode in the token.

    Returns:
        str: The generated JWT token.
    """
    try:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(
            minutes=config_env.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, config_env.SECRET_KEY, algorithm=config_env.ALGORITHM
        )
        logger.info("Access token created successfully")
        return encoded_jwt
    except Exception as e:
        logger.error(f"Error creating access token: {e}")
        raise
