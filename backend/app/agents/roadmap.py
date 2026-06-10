from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse

class RoadmapAgent(BaseAgent):
    """
    Generates a visual application workflow timeline.
    """
    async def execute(self, request: AgentRequest) -> AgentResponse:
        scheme_id = request.payload.get("scheme_id")
        
        # Generate steps based on scheme requirements
        steps = [
            {"step": 1, "title": "Collect Aadhaar", "status": "done"},
            {"step": 2, "title": "Link Bank Account", "status": "pending"},
            {"step": 3, "title": "Submit Application", "status": "pending"}
        ]
        
        return AgentResponse(
            status="success",
            message="Roadmap generated.",
            data={"roadmap": steps, "estimated_time": "15 minutes"}
        )
