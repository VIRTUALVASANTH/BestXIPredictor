from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter()

class PredictXIRequest(BaseModel):
    players: List[str]
    factors: List[str]

class PlayerPrediction(BaseModel):
    name: str
    role: str
    score: float
    keyStats: Dict[str, Any]

class PredictXIResponse(BaseModel):
    selectedXI: List[PlayerPrediction]

@router.post("/predict-xi", response_model=PredictXIResponse)
async def predict_xi(request: PredictXIRequest):
    # Validate unique players
    if len(set(request.players)) != 22:
        raise HTTPException(status_code=400, detail="Exactly 22 unique player names required.")

    # Placeholder: Load features, call model, compute probabilities
    # For now, return dummy data for top 11 players
    selected_xi = []
    for i, player in enumerate(request.players[:11]):
        selected_xi.append({
            "name": player,
            "role": "Batsman" if i % 2 == 0 else "Bowler",
            "score": round(0.9 - i * 0.05, 2),
            "keyStats": {"avg": 40 + i, "sr": 130 + i * 2}
        })

    return {"selectedXI": selected_xi}
