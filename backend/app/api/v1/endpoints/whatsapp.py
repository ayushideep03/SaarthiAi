from fastapi import APIRouter, Request, Response, HTTPException, BackgroundTasks
import logging
from app.config import get_settings
from app.agents.orchestrator import orchestrator
from app.schemas.agent_schemas import AgentRequest

logger = logging.getLogger(__name__)
settings = get_settings()
router = APIRouter()

@router.get("/webhook")
async def verify_webhook(request: Request):
    """
    Required by Meta to verify webhook endpoint.
    """
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode and token:
        if mode == "subscribe" and token == settings.whatsapp_verify_token:
            logger.info("WEBHOOK_VERIFIED")
            return Response(content=challenge, media_type="text/plain")
        else:
            raise HTTPException(status_code=403, detail="Verification token mismatch")
    raise HTTPException(status_code=400, detail="Missing parameters")

@router.post("/webhook")
async def handle_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Receive incoming messages and route them to agents.
    """
    try:
        body = await request.json()
        
        if body.get("object") == "whatsapp_business_account":
            for entry in body.get("entry", []):
                for change in entry.get("changes", []):
                    value = change.get("value", {})
                    if "messages" in value:
                        for msg in value["messages"]:
                            # Delegate processing to background task to respond < 200ms
                            background_tasks.add_task(process_whatsapp_message, msg, value["contacts"][0])
            return {"status": "ok"}
    except Exception as e:
        logger.error(f"Error handling webhook: {e}")
    return {"status": "error"}

async def process_whatsapp_message(msg: dict, contact: dict):
    from app.services.whatsapp_client import whatsapp_client
    
    phone_number = contact.get("wa_id")
    msg_type = msg.get("type")
    
    if msg_type == "text":
        text = msg["text"]["body"]
        
        # Route to Discovery Agent as default entry point
        agent_req = AgentRequest(
            user_id=phone_number,
            session_id=phone_number,
            payload={"message": text}
        )
        
        response = await orchestrator.route_request("discovery", agent_req)
        
        # Send reply back
        await whatsapp_client.send_text_message(phone_number, response.message)

    elif msg_type == "image":
        # Handle document upload via DocumentAgent
        pass
