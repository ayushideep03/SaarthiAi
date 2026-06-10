from app.schemas.agent_schemas import AgentRequest, AgentResponse
from app.agents.discovery import DiscoveryAgent
from app.agents.eligibility import EligibilityAgent
from app.agents.rag import RAGAgent
from app.agents.document import DocumentAgent
from app.agents.roadmap import RoadmapAgent
from app.agents.reminder import ReminderAgent
from app.agents.analytics import AnalyticsAgent

class AgentOrchestrator:
    def __init__(self):
        self.agents = {
            "discovery": DiscoveryAgent(),
            "eligibility": EligibilityAgent(),
            "rag": RAGAgent(),
            "document": DocumentAgent(),
            "roadmap": RoadmapAgent(),
            "reminder": ReminderAgent(),
            "analytics": AnalyticsAgent()
        }

    async def route_request(self, agent_name: str, request: AgentRequest) -> AgentResponse:
        agent = self.agents.get(agent_name)
        if not agent:
            return AgentResponse(status="error", message=f"Agent {agent_name} not found")
        
        # Execute the agent
        response = await agent.execute(request)
        
        # Handle state transitions if next_action is requested
        if response.next_action and response.next_action in self.agents:
            # We could chain execution here, or just return the hint to the client
            pass
            
        return response

orchestrator = AgentOrchestrator()
