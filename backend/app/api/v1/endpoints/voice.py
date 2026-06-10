from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import logging
import json
from app.core.bhashini import bhashini_client
from app.agents.orchestrator import orchestrator
from app.schemas.agent_schemas import AgentRequest

logger = logging.getLogger(__name__)
router = APIRouter()

@router.websocket("/ws")
async def voice_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("Voice WebSocket connection established.")
    
    session_id = "temp_session" # In production, extract from JWT
    
    try:
        while True:
            # Receive audio frame (base64 string or binary)
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # 1. Voice -> STT
            # result = await bhashini_client.process_audio_pipeline(payload["audio"], payload["lang"])
            # english_text = result["pipelineResponse"][1]["output"][0]["target"]
            
            # Mocking for now
            english_text = "I am a farmer looking for schemes."
            
            # 2. Agent Pipeline
            agent_req = AgentRequest(
                user_id="anonymous",
                session_id=session_id,
                payload={"message": english_text}
            )
            response = await orchestrator.route_request("discovery", agent_req)
            
            # 3. TTS
            # audio_response_base64 = await bhashini_client.text_to_speech(response.message, payload["lang"])
            audio_response_base64 = "base64_encoded_audio_bytes"
            
            # 4. Voice Response
            await websocket.send_json({
                "status": "success",
                "audio": audio_response_base64,
                "text": response.message
            })

    except WebSocketDisconnect:
        logger.info("Voice WebSocket disconnected.")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close()
