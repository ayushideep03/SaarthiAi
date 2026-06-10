from app.agents.base import BaseAgent
from app.schemas.agent_schemas import AgentRequest, AgentResponse


class EligibilityAgent(BaseAgent):
    """Deterministic rule engine. Language-aware responses."""

    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        profile = request.context.get("profile", {})

        eligible_schemes = []
        total_value = 0

        # Rule: Farmer + owns land → PM-KISAN
        if profile.get("occupation", "").lower() in ("farmer", "kisan", "किसान"):
            eligible_schemes.append({"name": "PM-KISAN", "value": 6000, "period": "per year"})
            total_value += 6000

        # Rule: Income < 2.5 lakh → Ayushman Bharat
        income = profile.get("income", 0)
        if isinstance(income, (int, float)) and income < 250000:
            eligible_schemes.append({"name": "Ayushman Bharat", "value": 500000, "period": "health cover"})
            total_value += 500000

        # Rule: Woman → Ujjwala
        if profile.get("gender", "").lower() in ("female", "woman", "महिला"):
            eligible_schemes.append({"name": "Ujjwala Yojana", "value": 1600, "period": "one-time"})
            total_value += 1600

        # Rule: Rural area → MGNREGA
        if profile.get("area_type", "").lower() in ("rural", "ग्रामीण"):
            eligible_schemes.append({"name": "MGNREGA", "value": 120000, "period": "per year"})
            total_value += 120000

        message = f"You are eligible for {len(eligible_schemes)} schemes worth ₹{total_value:,}!"
        if not eligible_schemes:
            message = "Let me look for more information to find suitable schemes."

        return AgentResponse(
            status="success",
            message=message,
            data={
                "eligible_schemes": eligible_schemes,
                "total_value": total_value,
                "scheme_count": len(eligible_schemes),
            },
            next_action="rag" if eligible_schemes else "discovery",
        )
