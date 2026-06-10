import google.generativeai as genai
from qdrant_client.models import PointStruct, ScoredPoint, Filter, FieldCondition, MatchValue
import uuid
import logging
from typing import List, Dict, Any

from app.config import get_settings
from app.core.qdrant import qdrant_manager

logger = logging.getLogger(__name__)
settings = get_settings()

# Initialize Gemini
genai.configure(api_key=settings.gemini_api_key)

class RAGService:
    def __init__(self):
        self.embedding_model = 'models/embedding-001' # Update to latest Gemini embedding model if needed
        self.collection_name = qdrant_manager.collection_name

    async def generate_embedding(self, text: str) -> List[float]:
        try:
            result = genai.embed_content(
                model=self.embedding_model,
                content=text,
                task_type="retrieval_document"
            )
            return result['embedding']
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise

    async def ingest_document(self, text: str, metadata: Dict[str, Any]):
        embedding = await self.generate_embedding(text)
        point_id = str(uuid.uuid4())
        
        await qdrant_manager.client.upsert(
            collection_name=self.collection_name,
            points=[
                PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload={"text": text, **metadata}
                )
            ]
        )
        return point_id

    async def search(self, query: str, limit: int = 3, filters: Dict[str, str] = None) -> List[ScoredPoint]:
        query_embedding = await self.generate_embedding(query)
        
        qdrant_filter = None
        if filters:
            conditions = []
            for k, v in filters.items():
                conditions.append(FieldCondition(key=k, match=MatchValue(value=v)))
            qdrant_filter = Filter(must=conditions)

        search_result = await qdrant_manager.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            query_filter=qdrant_filter,
            limit=limit,
            score_threshold=0.80 # Strict grounding threshold
        )
        return search_result
        
rag_service = RAGService()
