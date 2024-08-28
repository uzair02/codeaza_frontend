import fastapi

from api.routes.user import router as user_router
from api.routes.user_logs import router as user_logs_router

router = fastapi.APIRouter()
router.include_router(router=user_router)
router.include_router(router=user_logs_router)
