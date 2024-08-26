import pendulum
from jose import jwt

from config.settings.base import config_env
from config.settings.logger_config import logger


async def create_access_token(data: dict) -> str:
    """
    Creates a JWT access token with an expiration time.

    Args:
        data (dict): The data to encode in the token. This dictionary will be included in the payload of the JWT.

    Returns:
        str: The generated JWT token as a string.

    Raises:
        Exception: If an error occurs during the creation of the JWT token.

    Notes:
        - The expiration time is set using `pendulum` to handle timezone-aware datetimes.
        - The expiration is calculated from the current UTC time plus the configured access token expiration minutes.
        - The token is encoded using the specified secret key and algorithm from the configuration.
    """
    try:
        to_encode = data.copy()
        expire = pendulum.now("UTC").add(minutes=config_env.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire.timestamp()})  # Use timestamp() to get seconds since epoch
        encoded_jwt = jwt.encode(to_encode, config_env.SECRET_KEY, algorithm=config_env.ALGORITHM)
        logger.info("Access token created successfully")
        return encoded_jwt
    except Exception as e:
        logger.error(f"Error creating access token: {e}")
        raise
