from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from fastapi.middleware.cors import CORSMiddleware
from routers.product import product_router
from routers.auth import auth_router
from routers.user import user_router


# Estamos creando una instancia de la clase FastAPI
app = FastAPI()
app.title = "BAR API" 
app.version = "0.0.1"

app.add_middleware(ErrorHandler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Reemplaza esto con el origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
app.include_router(product_router)
app.include_router(user_router)
app.include_router(auth_router)
Base.metadata.create_all(bind=engine)

# Ahora crearemos nuestro primer endpoint 
@app.get("/", tags=['home']) # Aqui se agrega la ruta de inicio
def message():
    return HTMLResponse(content="<h1> Y a beber!! </h1>")