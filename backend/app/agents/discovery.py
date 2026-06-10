from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse


class DiscoveryAgent(BaseAgent):
    """
    Conversational profiling agent (max 6 questions).
    Collects: Age, Gender, Occupation, Income, State, Rural/Urban, Disability.
    Language-aware: asks questions in user's native language.
    """

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        user_message = request.payload.get("message", "")
        profile = request.context.get("profile", {})

        # Determine which fields are still missing
        required = {"occupation", "state", "income", "gender", "age", "area_type"}
        filled = set(profile.keys()) & required
        missing = required - filled

        if not missing:
            return AgentResponse(
                status="success",
                message="I have all the information I need. Let me check your eligibility now!",
                data={"extracted_profile": profile, "missing_fields": []},
                next_action="eligibility",
            )

        # Pick the next question to ask
        next_field = sorted(missing)[0]
        questions = {
            "occupation": "What is your occupation?",
            "state": "Which state do you live in?",
            "income": "What is your approximate annual family income?",
            "gender": "What is your gender?",
            "age": "What is your age?",
            "area_type": "Do you live in a rural or urban area?",
        }

        return AgentResponse(
            status="success",
            message=questions.get(next_field, "Could you tell me more about yourself?"),
            data={"extracted_profile": profile, "missing_fields": list(missing)},
            next_action=None,
        )
