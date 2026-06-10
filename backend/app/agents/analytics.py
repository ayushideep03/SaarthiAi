from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse


class AnalyticsAgent(BaseAgent):
    """Processes analytics events including language usage tracking."""

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        event_type = request.payload.get("event_type")

        return AgentResponse(
            status="success",
            message="Analytics event recorded.",
            data={
                "event_recorded": event_type,
                "language_tracked": request.language_code,
            },
        )
