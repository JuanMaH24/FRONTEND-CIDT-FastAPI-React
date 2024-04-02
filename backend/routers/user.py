from fastapi import APIRouter, Path, Query, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.user import User as UserModel
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from utils.pass_hash import check_password, generate_password
from services.user import UserService
from schemas.user import User

user_router = APIRouter()


@user_router.get("/user", tags=['users'], response_model=List[User],
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_users() -> List[User]:
    result = UserService(Session()).get_users()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@user_router.get("/user/{id}", tags=['users'], response_model=User,
                  status_code=200, dependencies=[Depends(JWTBearer())])
def get_user(id: int = Path(ge=1)) -> User:
    result = UserService(Session()).get_user(id)
    if not result:
        return JSONResponse(status_code=404, content={
            "message": "User not found"
            })
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@user_router.post("/users", tags=['users'], response_model=dict, status_code=201)
def create_user(user: User) -> dict:
    UserService(Session()).create_user(user)
    return JSONResponse(content={"message": "User created successfully"}, status_code=201)


@user_router.put("/users/{id}", tags=['users'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_user(id: int, user: User) -> dict:
    if not UserService(Session()).get_user(id):
        return JSONResponse(content={"message": "User not found"}, status_code=404)
    UserService(Session()).update_user(id, user)
    return JSONResponse(content={"message": "User updated successfully"}, status_code=200)


@user_router.delete("/users/{id}", tags=['users'], response_model=dict, dependencies=[Depends(JWTBearer())])
def delete_user(id: int) -> dict:
    if not UserService(Session()).get_user(id):
        return JSONResponse(content={"message": "User not found"}, status_code=404)
    UserService(Session()).delete_user(id)
    return JSONResponse(content={"message": "User deleted successfully"})