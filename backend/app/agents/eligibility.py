from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse

class EligibilityAgent(BaseAgent):
    """
    Deterministic rule engine execution.
    """
    async def execute(self, request: AgentRequest) -> AgentResponse:
        profile = request.context.get("profile", {})
        
        # We will query rules from the database (scheme_rules table)
        # IF farmer AND owns_land THEN PM-KISAN
        
        eligible_schemes = []
        if profile.get("occupation", "").lower() == "farmer":
            eligible_schemes.append("PM-KISAN")
            
        return AgentResponse(
            status="success",
            message="Eligibility calculated.",
            data={"eligible_schemes": eligible_schemes},
            next_action="rag" if eligible_schemes else "discovery"
        )
