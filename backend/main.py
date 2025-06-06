from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import math
import random

app = FastAPI(title="Apartment Price Calculator API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ApartmentData(BaseModel):
    totalArea: float
    livingArea: float
    floor: int
    kitchenArea: Optional[float] = None
    totalFloors: Optional[int] = None
    passengerElevators: Optional[int] = None
    cargoElevators: Optional[int] = None
    yearBuilt: Optional[int] = None
    balcony: Optional[int] = 0
    garbageChute: Optional[int] = 0
    parking: Optional[int] = 0
    rooms: Optional[int] = None
    buildingType: Optional[int] = None
    ceilingHeight: Optional[float] = None
    separateBathrooms: Optional[int] = None
    renovation: Optional[int] = None
    windowView: Optional[int] = None
    metroDistance: Optional[float] = None
    objectType: Optional[int] = None

class PriceRange(BaseModel):
    min: int
    max: int

class CalculationResponse(BaseModel):
    price: int
    priceRange: PriceRange

class ApartmentPriceCalculator:
    def __init__(self):
        self.base_price_per_sqm = 200000  # Base price per square meter in rubles
        
        # Market coefficients
        self.building_type_multipliers = {
            1: 0.85,  # Panel
            2: 1.1,   # Brick
            3: 1.15,  # Monolithic-brick
            4: 1.2,   # Monolithic
            5: 1.3    # Stalin
        }
        
        self.renovation_multipliers = {
            1: 0.8,   # No renovation
            2: 0.9,   # Cosmetic
            3: 1.1,   # Euro renovation
            4: 1.3    # Designer
        }
        
        self.window_view_multipliers = {
            1: 0.95,  # Courtyard
            2: 1.05,  # Street
            3: 1.1    # Street and courtyard
        }

    def calculate_price(self, data: ApartmentData) -> CalculationResponse:
        base_price = self.base_price_per_sqm
        
        # Apply building type coefficient
        if data.buildingType:
            base_price *= self.building_type_multipliers.get(data.buildingType, 1.0)
        
        # Apply renovation coefficient
        if data.renovation:
            base_price *= self.renovation_multipliers.get(data.renovation, 1.0)
        
        # Floor coefficient
        if data.floor and data.totalFloors:
            if data.floor == 1:
                base_price *= 0.95  # First floor discount
            elif data.floor == data.totalFloors:
                base_price *= 0.98  # Top floor discount
            elif 2 <= data.floor <= min(7, data.totalFloors - 1):
                base_price *= 1.05  # Premium floors
        
        # Object type coefficient
        if data.objectType == 2:  # New building
            base_price *= 1.15
        
        # Window view coefficient
        if data.windowView:
            base_price *= self.window_view_multipliers.get(data.windowView, 1.0)
        
        # Metro distance coefficient
        if data.metroDistance:
            if data.metroDistance <= 5:
                base_price *= 1.2
            elif data.metroDistance <= 10:
                base_price *= 1.1
            elif data.metroDistance <= 15:
                base_price *= 1.0
            else:
                base_price *= 0.9
        
        # Year built coefficient
        if data.yearBuilt:
            current_year = 2025
            age = current_year - data.yearBuilt
            if age < 5:
                base_price *= 1.15
            elif age < 15:
                base_price *= 1.05
            elif age > 50:
                base_price *= 0.9
        
        # Additional amenities
        if data.balcony:
            base_price *= 1.03
        if data.parking:
            base_price *= 1.05
        if data.garbageChute:
            base_price *= 1.02
        
        # Kitchen area bonus
        if data.kitchenArea and data.kitchenArea > 10:
            base_price *= 1.02
        
        # Ceiling height bonus
        if data.ceilingHeight and data.ceilingHeight > 2.8:
            base_price *= 1.03
        
        # Calculate final price
        final_price = base_price * data.totalArea
        
        # Add market volatility
        volatility = 0.1
        random_factor = 1 + (random.random() - 0.5) * volatility * 2
        final_price = int(final_price * random_factor)
        
        # Calculate price range (±15%)
        range_variation = 0.15
        min_price = int(final_price * (1 - range_variation))
        max_price = int(final_price * (1 + range_variation))
        
        return CalculationResponse(
            price=final_price,
            priceRange=PriceRange(min=min_price, max=max_price)
        )

calculator = ApartmentPriceCalculator()

@app.get("/")
async def root():
    return {"message": "Apartment Price Calculator API", "status": "running"}

@app.post("/api/apartment/calculate", response_model=CalculationResponse)
async def calculate_apartment_price(apartment_data: ApartmentData):
    """
    Calculate apartment price based on provided characteristics
    """
    try:
        result = calculator.calculate_price(apartment_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation error: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "apartment-calculator"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)