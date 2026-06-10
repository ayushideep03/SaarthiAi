from fastapi import APIRouter
from app.api.v1.endpoints import whatsapp, voice

api_router = APIRouter()

api_router.include_router(whatsapp.router, prefix="/whatsapp", tags=["whatsapp"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
