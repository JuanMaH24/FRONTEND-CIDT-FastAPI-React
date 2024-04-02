from fastapi.security import HTTPBearer
from utils.jwt_manager import validate_token
from fastapi import Request, HTTPException
from fastapi.encoders import jsonable_encoder
from config.database import Session
from services.user import UserService

class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        result = UserService(Session()).get_users()
        auth = await super().__call__(request)
        data = validate_token(auth.credentials)
        #Se valida si el mail del token existe en la base de datos
        if not(any(user["user_mail"] == data["user_mail"] for user in jsonable_encoder(result))):
            raise HTTPException(status_code=401, detail="Invalid user") 