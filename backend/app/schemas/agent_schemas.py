from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class AgentRequest(BaseModel):
    user_id: str
    session_id: str
    context: Dict[str, Any] = {}
    payload: Dict[str, Any] = {}

class AgentResponse(BaseModel):
    status: str = "success"
    message: str = ""
    data: Dict[str, Any] = {}
    next_action: Optional[str] = None
