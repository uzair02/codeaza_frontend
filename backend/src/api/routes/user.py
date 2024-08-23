from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.settings.logger_config import logger
from models.schemas.error_response import ErrorResponse
from models.schemas.user import Token, User as UserSchema, UserCreate, UserLogin
from repository.crud.user import authenticate_user, create_user
from repository.database import get_db
from securities.authorization.jwt import create_access_token
from utilities.constants import ErrorMessages

router = APIRouter()


@router.post(
    "/register",
    response_model=UserSchema,
    responses={
        500: {"model": ErrorResponse},
    },
)
async def register_user(user: UserCreate, db: Session = Depends(get_db)) -> UserSchema:
    """
    Register a new user.

    Args:
        user (UserCreate): The user data for registration.
        db (Session): The database session.

    Returns:
        UserSchema: The registered user.

    Raises:
        HTTPException: If there's an error during user creation.
    """
    try:
        logger.info(f"Attempting to register user with username: {user.username}")
        db_user = await create_user(db, user)
        logger.info(f"User registered successfully with ID: {db_user.id}")
        return UserSchema.from_orm(db_user)
    except Exception as e:
        logger.error(f"Unexpected error during user registration: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_CREATING_USER.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e


@router.post(
    "/login",
    response_model=Token,
    responses={
        401: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def login(form_data: UserLogin = Depends(), db: Session = Depends(get_db)) -> Token:
    """
    Authenticate a user and provide an access token.

    Args:
        form_data (UserLogin): The form data containing only the password.
        db (Session): The database session.

    Returns:
        Token: The access token for authenticated user.

    Raises:
        HTTPException: If authentication fails.
    """
    try:
        logger.info("Attempting to authenticate user ")
        user = await authenticate_user(db, form_data.password)

        if not user:
            logger.warning("Invalid credentials provided")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=ErrorResponse(
                    detail=ErrorMessages.INVALID_CREDENTIALS.value,
                    status_code=status.HTTP_401_UNAUTHORIZED,
                ).dict(),
            )

        access_token = await create_access_token(data={"sub": user.username})
        logger.info(f"User authenticated successfully {user.username}")
        return {"access_token": access_token, "token_type": "bearer"}

    except HTTPException as e:
        logger.error(f"HTTP exception occurred: {e.detail}")
        raise e

    except Exception as e:
        logger.error(f"Unexpected error during login: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_LOGGING_IN.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e
