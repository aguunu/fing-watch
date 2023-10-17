import traceback

from flask import Blueprint, request

from ..models.user import User
from ..services.users_store import IncorrectCredentials, UserExists, create_user, login

auth = Blueprint("auth", __name__)


@auth.post("/sign-up")
def sign_up():
    try:
        content = request.get_json()
        result = create_user(User(email=content["email"]), content["password"])
        if result.result:
            return {"result": True, "token": result.token}, 200

    except UserExists:
        return {"error": "Usuario ya registrado"}, 400
    except IncorrectCredentials:
        return {"error": "Credenciales invalidas"}, 400
    except:
        traceback.print_exc()
        return {"error": "Algo salio mal"}, 500


@auth.post("/sign-in")
def sign_in():
    try:
        content = request.get_json()
        email = content["email"]
        password = content["password"]
        token = login(email, password)
        return {"result": True, "token": token}, 200

    except IncorrectCredentials:
        return {"WWW-Authenticate": "Credenciales invalidas"}, 401
    except:
        traceback.print_exc()
        return {"error": "Algo salio mal"}, 500
