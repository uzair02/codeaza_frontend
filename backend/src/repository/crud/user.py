from config.settings.logger_config import logger
from models.db.user import User as UserModel
from models.schemas.user import UserCreate
from securities.hashing.hash import get_password_hash, verify_password
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def create_user(db: AsyncSession, user: UserCreate) -> UserModel:
    """
    Creates a new user in the database.

    Args:
        db (AsyncSession): The database session.
        user (UserCreate): The user data to create.

    Returns:
        UserModel: The created user object.

    Raises:
        ValueError: If the username already exists or the password is already in use.
    """
    try:
        # Check if the username already exists
        existing_user = await db.execute(
            select(UserModel).where(UserModel.username == user.username)
        )
        if existing_user.scalar_one_or_none():
            raise ValueError("Username already registered")

        # Check if the password is already in use
        result = await db.execute(select(UserModel))
        all_users = result.scalars().all()

        for db_user in all_users:
            if await verify_password(user.password, db_user.hashed_password):
                raise ValueError("Password already in use by another user")

        hashed_password = await get_password_hash(user.password)
        db_user = UserModel(username=user.username, hashed_password=hashed_password)
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        logger.info(f"User created successfully with username: {user.username}")
        return db_user

    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating user: {e}")
        raise


async def authenticate_user(db: AsyncSession, password: str) -> UserModel:
    """
    Authenticates a user by verifying the password.

    Args:
        db (AsyncSession): The database session.
        password (str): The user's password.

    Returns:
        UserModel: The authenticated user object, or None if authentication fails.
    """
    try:
        # Assuming only one user or a specific mechanism for handling this scenario
        stmt = select(UserModel)
        result = await db.execute(stmt)
        users = result.scalars().all()

        for user in users:
            if await verify_password(password, user.hashed_password):
                logger.info("User authenticated successfully")
                return user

        logger.warning("Authentication failed: Invalid password.")
        return None

    except Exception as e:
        logger.error(f"Error during user authentication: {e}")
        raise
