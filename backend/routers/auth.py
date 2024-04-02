from fastapi import APIRouter
from utils.jwt_manager import create_token
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from models.user import User as UserModel
from config.database import Session
from services.user import UserService
from schemas.user import User
from utils.pass_hash import check_password

auth_router = APIRouter()


@auth_router.post("/login", tags=['auth'], response_model=dict, status_code=200)
def login(user: User) -> dict:
    result = UserService(Session()).get_users()
    for existing_user in jsonable_encoder(result):
        if user.user_mail == existing_user["user_mail"] and check_password(existing_user["password"], user.password):
            token = create_token(data=user.model_dump())
            return JSONResponse(content={"username": existing_user["user_name"],"token": token, "rol": existing_user["rol"]}, 
                                status_code=200)
    return JSONResponse(content={"message": "Invalid credentials"},
                            status_code=401)