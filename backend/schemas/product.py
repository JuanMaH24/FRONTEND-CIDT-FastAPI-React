from typing import Optional
from pydantic import BaseModel, Field

class Product(BaseModel):
    id: Optional[int] = None
    product_name: str = Field(default="Unknown", min_length=1, max_length=30)
    product_price: int = Field(default=0, ge=0)
    category: str = Field(default="Undetermined", min_length=1, max_length=15)

    # Configuracion de la documentacion
    class Config:
        model_config = {
            "json_schema_extra": {
                "examples": [
                    {
                        "id": 1,
                        "product_name": "Product name",
                        "product_price": 1200,
                        "category": "Modify"
                    }
                ]
            }
        }