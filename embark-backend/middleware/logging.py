"""
Request/Response logging middleware
"""
import logging
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

logger = logging.getLogger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware to log all requests and responses"""

    async def dispatch(self, request: Request, call_next):
        # Start timer
        start_time = time.time()

        # Log request
        logger.info(f"→ {request.method} {request.url.path}")

        # Process request
        try:
            response: Response = await call_next(request)
        except Exception as e:
            # Log error
            logger.error(f"✗ {request.method} {request.url.path} - Error: {str(e)}")
            raise

        # Calculate duration
        duration = time.time() - start_time

        # Log response
        status_code = response.status_code
        status_emoji = "✓" if 200 <= status_code < 400 else "✗"
        
        logger.info(
            f"{status_emoji} {request.method} {request.url.path} - "
            f"Status: {status_code} - Duration: {duration:.3f}s"
        )

        # Add custom headers
        response.headers["X-Process-Time"] = str(duration)

        return response


def setup_logging(log_level: str = "INFO"):
    """Configure application logging"""
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

