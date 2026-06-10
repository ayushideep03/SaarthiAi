from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse
import google.generativeai as genai
from app.config import get_settings

settings = get_settings()
genai.configure(api_key=settings.gemini_api_key)

class DiscoveryAgent(BaseAgent):
    """
    Handles conversational discovery (Max 6 questions).
    Collects Age, Gender, Occupation, Income, State, Rural/Urban, Disability Status.
    """
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.system_prompt = (
            "You are Saarthi AI, a welfare copilot. Have a natural conversation to discover user profile. "
            "Ask maximum 6 questions. Ask one at a time. Do not sound like a form. "
            "Extract: Age, Gender, Occupation, Income, State, Rural/Urban, Disability Status."
        )

    async def execute(self, request: AgentRequest) -> AgentResponse:
        user_message = request.payload.get("message", "")
        profile = request.context.get("profile", {})
        
        # Here we will call Gemini with the conversation history and system prompt
        response_text = "I see you are a farmer. Could you tell me which state you live in?"
        
        # Determine if we have enough info to route to eligibility
        missing_fields = ["state", "income"] # Mock check
        next_action = "eligibility" if not missing_fields else None
        
        return AgentResponse(
            status="success",
            message=response_text,
            data={"extracted_profile": profile, "missing_fields": missing_fields},
            next_action=next_action
        )
