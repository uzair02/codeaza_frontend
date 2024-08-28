from enum import Enum


class ErrorMessages(Enum):
    """
    Enum class to define common error messages used throughout the application.

    Attributes:
        ERROR_CREATING_USER (str): Message indicating that there was an error creating a user, typically because the username already exists.
        INVALID_CREDENTIALS (str): Message indicating that the provided credentials are invalid.
        ERROR_LOGGING_IN (str): Message indicating that an error occurred during the login process.
    """

    ERROR_CREATING_USER = "Username already exists"
    INVALID_CREDENTIALS = "Credentials are invalid"
    ERROR_LOGGING_IN = "Error logging in"
    ERROR_CREATING_LOG = "Error creating log"
    ERROR_UPDATING_LOG = "Error updating the log"
    ERROR_DELETING_LOG = "Error deleting log"
    ERROR_RETRIEVING_LOGS = "Error retrieving logs"
