import httpx
import logging
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

class BhashiniClient:
    def __init__(self):
        self.user_id = settings.bhashini_user_id
        self.api_key = settings.bhashini_api_key
        self.pipeline_id = settings.bhashini_pipeline_id
        self.base_url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"

    async def process_audio_pipeline(self, audio_base64: str, source_lang: str) -> dict:
        """
        Executes ASR -> Translation -> Agent Response -> Translation -> TTS pipeline
        """
        headers = {
            "Authorization": self.api_key,
            "Content-Type": "application/json"
        }
        
        # This payload matches the ULCA standard from the prompt
        payload = {
            "pipelineTasks": [
                {"taskType": "asr", "config": {"language": {"sourceLanguage": source_lang}, "audioFormat": "wav", "samplingRate": 16000}},
                {"taskType": "translation", "config": {"language": {"sourceLanguage": source_lang, "targetLanguage": "en"}}}
            ],
            "inputData": {
                "audio": [{"audioContent": audio_base64}]
            }
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(self.base_url, headers=headers, json=payload)
                response.raise_for_status()
                return response.json()
            except Exception as e:
                logger.error(f"Bhashini Pipeline Error: {e}")
                raise

    async def text_to_speech(self, text: str, target_lang: str) -> str:
        # Executes English -> Target Lang Translation -> TTS
        pass

bhashini_client = BhashiniClient()
