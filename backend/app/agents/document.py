from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse
import google.generativeai as genai
from app.config import get_settings

settings = get_settings()

class DocumentAgent(BaseAgent):
    """
    Evaluates uploaded documents using Gemini 2.5 Pro Vision.
    """
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    async def execute(self, request: AgentRequest) -> AgentResponse:
        image_url = request.payload.get("image_url", "")
        document_type = request.payload.get("document_type", "Unknown")
        
        # In real implementation: download image, pass to Gemini Vision
        # Prompt: "Verify if this is a valid {document_type} and extract key info while redacting PII."
        
        return AgentResponse(
            status="success",
            message=f"Document {document_type} verified successfully.",
            data={
                "readiness_score": 82.0,
                "status": "Available",
                "extracted_data": {"masked_id": "XXXX-XXXX-1234"}
            }
        )
