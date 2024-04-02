from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id: Optional[int] = None
    user_name: str = Field(default="UserName", min_length=1, max_length=30)
    user_mail: str = Field(default="UserMail", min_length=1, max_length=30)
    password: str = Field(default="Pass", min_length=1)
    rol: str = Field(default="User", min_length=1)
