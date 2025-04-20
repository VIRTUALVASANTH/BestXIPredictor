from fastapi import FastAPI
from app.api import predict_xi

app = FastAPI(title="Best XI Predictor API")

app.include_router(predict_xi.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Best XI Predictor API"}
