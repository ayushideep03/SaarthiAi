from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentRequest(BaseModel):
    user_id: str
    session_id: str
    language_code: str = Field(default="hi", description="ISO 639 language code (hi, bn, ta, te, mr, gu, kn, ml, or, pa, as, bho, mai, en)")
    context: Dict[str, Any] = {}
    payload: Dict[str, Any] = {}

class AgentResponse(BaseModel):
    status: str = "success"
    message: str = ""
    message_localized: str = ""  # Response in user's language
    language_code: str = "hi"
    data: Dict[str, Any] = {}
    next_action: Optional[str] = None
