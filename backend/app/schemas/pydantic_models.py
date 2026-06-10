from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from uuid import UUID

class SchemeResponse(BaseModel):
    scheme_id: str
    name: str
    description: str
    expected_benefit: Optional[str] = None
    required_documents: List[str] = []
    
    class Config:
        from_attributes = True

class CitizenProfileResponse(BaseModel):
    id: UUID
    phone_number: str
    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    income: Optional[int] = None
    state: Optional[str] = None
    is_rural: Optional[bool] = None
    disability_status: Optional[bool] = None
    context_state: Dict[str, Any] = {}

    class Config:
        from_attributes = True

class MessagePayload(BaseModel):
    text: str
    phone_number: str
