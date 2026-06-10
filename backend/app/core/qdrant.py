import os
import logging
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

qdrant_url = os.environ.get("QDRANT_URL", "http://qdrant:6333")

class QdrantManager:
    def __init__(self):
        self.client = AsyncQdrantClient(url=qdrant_url)
        self.collection_name = "schemes_collection"
        self.vector_size = 768 # Match Gemini 2.5 Pro/Flash embeddings

    async def init_collection(self):
        try:
            collections = await self.client.get_collections()
            collection_names = [c.name for c in collections.collections]
            
            if self.collection_name not in collection_names:
                logger.info(f"Creating Qdrant collection: {self.collection_name}")
                await self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE),
                )
            else:
                logger.info(f"Qdrant collection {self.collection_name} already exists.")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant: {e}")

qdrant_manager = QdrantManager()
