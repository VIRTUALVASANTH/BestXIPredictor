import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "best_xi_cache")

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]

async def get_cached_feature(key: str):
    return await db.features.find_one({"key": key})

async def set_cached_feature(key: str, value: dict):
    await db.features.update_one({"key": key}, {"$set": value}, upsert=True)
