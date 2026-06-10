from abc import ABC, abstractmethod
from app.schemas.agent_schemas import AgentRequest, AgentResponse
from app.core.language import translation_service


class BaseAgent(ABC):
    """Base class for all Saarthi AI agents. Provides automatic translation."""

    @abstractmethod
    async def _execute_internal(self, request: AgentRequest) -> AgentResponse:
        """Implement agent logic. Return response in English."""
        pass

    async def execute(self, request: AgentRequest) -> AgentResponse:
        """Execute agent and auto-translate response to user's language."""
        response = await self._execute_internal(request)
        response.language_code = request.language_code

        # Translate the English response to the user's language
        if request.language_code != "en" and response.message:
            response.message_localized = await translation_service.translate(
                response.message, "en", request.language_code
            )
        else:
            response.message_localized = response.message

        return response
