"""
Importing the Enum class from the enum module.

This import is used to define enumeration classes that provide a set of symbolic names
(bound to unique, constant values) for use in the application. Enumerations are useful
for defining sets of related constants and improving code readability.

Usage:
    This module import is used in defining error message constants, configuration options,
    and other sets of named values.
"""

from enum import Enum


class ErrorMessages(Enum):
    """
    Enumeration for standardized error messages used throughout the application.

    Attributes:
        TRANSACTION_NOT_FOUND (str): Error message indicating that a requested transaction was not found.
    """

    TRANSACTION_NOT_FOUND = "Transaction not Found"
    ERROR_CREATING_USER = "User already exists"
    INVALID_CREDENTIALS = "Credentials are invalid"
    ERROR_LOGGING_IN = "Error logging in"
