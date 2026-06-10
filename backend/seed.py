import asyncio
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, Base, init_db, AsyncSessionLocal
from app.models.user import CitizenProfile
from app.models.scheme import WelfareScheme

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def seed_data():
    logger.info("Initializing database extensions...")
    await init_db()
    
    async with engine.begin() as conn:
        logger.info("Dropping all existing tables...")
        await conn.run_sync(Base.metadata.drop_all)
        logger.info("Creating all tables...")
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Create a mock scheme
        pm_kisan = WelfareScheme(
            scheme_id="PM-KISAN",
            name="Pradhan Mantri Kisan Samman Nidhi",
            description="Financial benefit of Rs 6000/- per year to all landholding farmers' families.",
            eligibility_criteria={"occupation": "farmer", "is_rural": True},
            required_documents=["Aadhaar Card", "Land Holding Papers", "Bank Account Details"],
            expected_benefit="₹6,000/year",
            embedding=[0.0] * 768 # Dummy embedding for testing
        )
        
        ayushman = WelfareScheme(
            scheme_id="PM-JAY",
            name="Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
            description="Health insurance coverage of up to Rs. 5 lakhs per family per year.",
            eligibility_criteria={"income_less_than": 100000}, # arbitrary mock criteria
            required_documents=["Aadhaar Card", "Ration Card"],
            expected_benefit="Up to ₹5,00,000 health cover/year",
            embedding=[0.1] * 768 # Dummy embedding for testing
        )
        
        # Create a mock user
        mock_user = CitizenProfile(
            phone_number="919999999999",
            age=35,
            gender="male",
            occupation="farmer",
            is_rural=True,
            state="UP",
            context_state={"current_step": "discovery", "missing_info": ["income"]}
        )

        session.add(pm_kisan)
        session.add(ayushman)
        session.add(mock_user)
        
        await session.commit()
        logger.info("Mock data seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
