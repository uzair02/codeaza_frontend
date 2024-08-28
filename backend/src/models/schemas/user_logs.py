from datetime import datetime

from pydantic import BaseModel, UUID4


class LogBase(BaseModel):
    """
    Base schema for log data, used as a base class for other log schemas.

    Attributes:
        action_performed (str): Description of the action performed by the user.
    """

    action_performed: str


class LogCreate(LogBase):
    """
    Schema for creating a new log entry, extending the base log schema.
    This schema is used for the request body when creating a new log.
    """


class Log(LogBase):
    """
    Schema for a complete log entry, used for responses.

    Attributes:
        log_id (UUID4): The unique identifier for the log entry.
        user_id (UUID4): Foreign key referencing the user ID.
        timestamp (datetime): The timestamp when the log entry was created.
    """

    log_id: UUID4
    user_id: UUID4
    timestamp: datetime

    class Config:
        """
        Configuration for the Pydantic model.

        Enables compatibility with ORM models by allowing the model to
        be populated from attributes of an ORM model instance.
        """

        from_attributes = True
