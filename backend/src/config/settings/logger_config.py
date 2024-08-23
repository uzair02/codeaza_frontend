import pathlib

from loguru import logger

# Go three folders back from the current file
log_path = pathlib.Path(__file__).resolve().parents[3] / "app.log"
# Configure the logger with the new path
logger.add(str(log_path), rotation="500 MB", retention="10 days", backtrace=True, diagnose=True)
