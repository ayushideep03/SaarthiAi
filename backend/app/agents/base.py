from abc import ABC, abstractmethod
from app.schemas.agent_schemas import AgentRequest, AgentResponse

class BaseAgent(ABC):
    @abstractmethod
    async def execute(self, request: AgentRequest) -> AgentResponse:
        pass
