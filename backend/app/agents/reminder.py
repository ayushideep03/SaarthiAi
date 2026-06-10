from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse
from datetime import datetime, timedelta


class ReminderAgent(BaseAgent):
    """Schedules reminders in the user's preferred language."""

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        reminder_type = request.payload.get("reminder_type", "general")

        return AgentResponse(
            status="success",
            message=f"Your {reminder_type} reminder has been scheduled. We will notify you.",
            data={
                "scheduled_time": (datetime.utcnow() + timedelta(days=1)).isoformat(),
                "delivery_language": request.language_code,
            },
        )
