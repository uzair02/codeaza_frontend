import uuid

from sqlalchemy import Column, ForeignKey, String, text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from repository.database import Base


class Log(Base):
    """
    Represents a log entry in the system.

    Attributes:
        log_id (UUID): Unique identifier for the log, automatically generated.
        user_id (UUID): Foreign key referencing the `user_id` in the `users` table.
        action_performed (str): Description of the action performed by the user.
        timestamp (TIMESTAMP): The timestamp when the log entry was created, automatically set to the current time.

    Table:
        - `logs`: The table name in the database where log entries are stored.

    This class is mapped to the `logs` table in the database and is used to manage log-related data.
    """

    __tablename__ = "logs"
    log_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    action_performed = Column(String, nullable=False)
    timestamp = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"), nullable=False)

    user = relationship("User", back_populates="logs")
