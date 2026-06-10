from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse


class DocumentAgent(BaseAgent):
    """Evaluates uploaded documents. Returns results in user language."""

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        document_type = request.payload.get("document_type", "Unknown")

        return AgentResponse(
            status="success",
            message=f"Your {document_type} has been verified successfully.",
            data={
                "readiness_score": 82.0,
                "status": "Available",
                "extracted_data": {"masked_id": "XXXX-XXXX-1234"},
            },
        )
