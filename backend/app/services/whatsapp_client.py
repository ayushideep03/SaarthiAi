import httpx
import logging
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

class WhatsAppClient:
    def __init__(self):
        self.base_url = f"https://graph.facebook.com/v20.0/{settings.whatsapp_phone_number_id}/messages"
        self.headers = {
            "Authorization": f"Bearer {settings.whatsapp_token}",
            "Content-Type": "application/json"
        }

    async def send_text_message(self, to_phone: str, message: str):
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone,
            "type": "text",
            "text": {"body": message}
        }
        return await self._send_payload(payload)

    async def send_interactive_buttons(self, to_phone: str, text: str, buttons: list):
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {"text": text},
                "action": {
                    "buttons": buttons
                }
            }
        }
        return await self._send_payload(payload)

    async def _send_payload(self, payload: dict):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(self.base_url, headers=self.headers, json=payload)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPError as e:
                logger.error(f"WhatsApp API Error: {e}")
                if response := getattr(e, "response", None):
                    logger.error(f"Response: {response.text}")
                raise

whatsapp_client = WhatsAppClient()
