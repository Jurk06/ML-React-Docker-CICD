from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ✅ CORS fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class HousingRequest(BaseModel):
    MedInc: float
    HouseAge: float
    AveRooms: float
    AveBedrms: float
    Population: float
    AveOccup: float
    Latitude: float
    Longitude: float

@app.post("/predict")
def predict(request: HousingRequest):
    # Dummy prediction formula (replace with ML model)
    prediction = (
        request.MedInc * 50000
        + request.HouseAge * 100
        - request.AveRooms * 50
        + request.AveBedrms * 200
        + request.Population * 0.1
        - request.AveOccup * 10
        + request.Latitude * 1000
        - request.Longitude * 500
    )
    return {"prediction": prediction}
