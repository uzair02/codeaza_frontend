from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi_pagination import add_pagination, Page, Params
from pydantic import UUID4
from sqlalchemy.orm import Session

from config.settings.logger_config import logger
from models.schemas.error_response import ErrorResponse
from models.schemas.user import User
from models.schemas.user_logs import Log, LogBase, LogCreate
from repository.crud.user_logs import create_log, delete_log, get_logs, update_log
from repository.database import get_db
from securities.verification.credentials import get_current_user
from utilities.constants import ErrorMessages

router = APIRouter()


@router.get(
    "/logs",
    response_model=Page[Log],
    responses={
        500: {"model": ErrorResponse},
    },
)
async def read_log_entries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    params: Params = Depends(),
) -> Page[Log]:
    """
    Retrieve paginated log entries for the current user.

    Args:
        db (AsyncSession): The database session.
        current_user (User): The currently authenticated user.
        params (Params): Pagination parameters.

    Returns:
        Page[Log]: A paginated list of log entries.

    Raises:
        HTTPException: If there's an error during retrieval.
    """
    try:
        logger.info(f"Attempting to retrieve logs for user ID: {current_user.user_id}")
        logs = await get_logs(db, current_user.user_id, params)
        logger.info(f"Retrieved paginated log entries for user ID: {current_user.user_id}")
        return logs
    except Exception as e:
        logger.error(f"Unexpected error retrieving log entries: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_RETRIEVING_LOGS.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e


@router.post(
    "/logs",
    response_model=Log,
    responses={
        500: {"model": ErrorResponse},
    },
)
async def create_log_entry(
    log: LogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Log:
    """
    Create a new log entry.

    Args:
        log (LogCreate): The log data to create.
        db (AsyncSession): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        Log: The created log entry.

    Raises:
        HTTPException: If there's an error during log creation.
    """
    try:
        logger.info(f"Attempting to create a new log entry for user ID: {current_user.user_id}")
        created_log = await create_log(db, current_user.user_id, log)
        logger.info(f"Log entry created successfully with ID: {created_log.log_id}")
        return created_log
    except Exception as e:
        logger.error(f"Unexpected error creating log entry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_CREATING_LOG.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e


@router.put(
    "/logs/{log_id}",
    response_model=Log,
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def update_log_entry(
    log_id: UUID4,
    log: LogBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Log:
    """
    Update an existing log entry.

    Args:
        log_id (UUID4): The ID of the log entry to update.
        log (LogUpdate): The new log data.
        db (AsyncSession): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        Log: The updated log entry.

    Raises:
        HTTPException: If the log entry is not found or there's an error during the update.
    """
    try:
        logger.info(f"Attempting to update log entry ID: {log_id}")
        updated_log = await update_log(db, log_id, log)
        logger.info(f"Log entry updated successfully with ID: {updated_log.log_id}")
        return updated_log
    except Exception as e:
        logger.error(f"Unexpected error updating log entry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_UPDATING_LOG.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e


@router.delete(
    "/logs/{log_id}",
    response_model=None,
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def delete_log_entry(
    log_id: UUID4,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Response:
    """
    Delete a log entry.

    Args:
        log_id (UUID4): The ID of the log entry to delete.
        db (AsyncSession): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        None

    Raises:
        HTTPException: If the log entry is not found or there's an error during deletion.
    """
    try:
        logger.info(f"Attempting to delete log entry ID: {log_id}")
        await delete_log(db, log_id)
        logger.info(f"Log entry deleted successfully with ID: {log_id}")
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        logger.error(f"Unexpected error deleting log entry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorResponse(
                detail=ErrorMessages.ERROR_DELETING_LOG.value,
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            ).dict(),
        ) from e


add_pagination(router)
