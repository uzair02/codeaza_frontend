from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from config.settings.logger_config import logger
from models.db.user_logs import Log, Log as DBLog
from models.schemas.user_logs import Log, LogBase, LogCreate


async def get_logs(db: AsyncSession, user_id: UUID4, params: Params) -> Page[Log]:
    """
    Retrieves paginated log entries for a user.

    Args:
        db (AsyncSession): The database session.
        user_id (UUID4): The ID of the user whose logs to retrieve.
        params (Params): Pagination parameters.

    Returns:
        Page[Log]: A paginated list of log entries.

    Raises:
        Exception: If there is an error retrieving the logs.
    """
    try:
        query = select(DBLog).where(DBLog.user_id == user_id)
        paginated_logs = await paginate(db, query, params=params)
        logger.info(f"Retrieved paginated log entries for user ID: {user_id}")
        return Page[Log].from_orm(paginated_logs)
    except Exception as e:
        logger.error(f"Error retrieving logs: {e}")
        raise


async def create_log(db: AsyncSession, user_id: UUID4, log: LogCreate) -> Log:
    """
    Creates a new log entry in the database.

    Args:
        db (AsyncSession): The database session.
        user_id (UUID4): The ID of the user who performed the action.
        log (LogCreate): The log data to create.

    Returns:
        Log: The created log entry.

    Raises:
        Exception: If there is an error creating the log.
    """
    try:
        log_data = log.dict()
        log_data["user_id"] = user_id
        db_log = DBLog(**log_data)
        db.add(db_log)
        await db.commit()
        await db.refresh(db_log)
        logger.info(f"Log created successfully with ID: {db_log.log_id}")
        return Log.from_orm(db_log)

    except Exception as e:
        logger.error(f"Error creating log: {e}")
        raise


async def update_log(
    db: AsyncSession,
    log_id: UUID4,
    log: LogBase,
) -> Log:
    """
    Updates an existing log entry in the database.

    Args:
        db (AsyncSession): The database session.
        log_id (UUID4): The ID of the log entry to update.
        log (LogUpdate): The new log data.
        user_id (UUID4): The ID of the user updating the log.

    Returns:
        Log: The updated log entry.

    Raises:
        Exception: If there is an error updating the log.
    """
    try:
        db_log = await db.get(DBLog, log_id)
        for key, value in log.dict(exclude_unset=True).items():
            setattr(db_log, key, value)
        await db.commit()
        await db.refresh(db_log)
        logger.info(f"Log updated successfully with ID: {db_log.log_id}")
        return Log.from_orm(db_log)
    except Exception as e:
        logger.error(f"Error updating log: {e}")
        raise


async def delete_log(db: AsyncSession, log_id: UUID4):
    """
    Deletes a log entry from the database.

    Args:
        db (AsyncSession): The database session.
        log_id (UUID4): The ID of the log entry to delete.
        user_id (UUID4): The ID of the user deleting the log.

    Returns:
        None

    Raises:
        Exception: If there is an error deleting the log.
    """
    try:
        db_log = await db.get(DBLog, log_id)
        await db.delete(db_log)
        await db.commit()
        logger.info(f"Log deleted successfully with ID: {log_id}")
    except Exception as e:
        logger.error(f"Error deleting log: {e}")
        raise
