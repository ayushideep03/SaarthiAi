from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse


class RoadmapAgent(BaseAgent):
    """Generates a visual application roadmap. Language-aware steps."""

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        steps = [
            {"step": 1, "title": "Collect Aadhaar Card", "status": "done"},
            {"step": 2, "title": "Link Bank Account", "status": "pending"},
            {"step": 3, "title": "Submit Application Online", "status": "pending"},
        ]
        return AgentResponse(
            status="success",
            message="Here is your application roadmap. Follow each step carefully.",
            data={"roadmap": steps, "estimated_time": "15 minutes"},
        )
