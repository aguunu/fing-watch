from flask import Blueprint
from flask import request
from ..utils.constants import GORSE_API
from ..models.movie import get_movies
import requests

recommend = Blueprint("recommend", __name__)


def process_request(endpoint):
    parms = {parm: request.args.get(parm) for parm in request.args}

    resp = requests.get(GORSE_API + endpoint, params=parms)
    if not resp.ok:
        return {"message": "Error"}, 404  # TODO: ???

    # get movies id from gorse
    movies_ids = [item["ItemId"] for item in resp.json()]

    result = get_movies(movies_ids)

    return result, 200


@recommend.get("/<user_id>/<recommender>")
def get_recommendations(user_id, recommender):
    return process_request(f"/dashboard/recommend/{user_id}/{recommender}")


@recommend.get("/<user_id>/<recommender>/<genre_id>")
def get_recommendations_by_genre(user_id, recommender, genre_id):
    return process_request(f"/dashboard/recommend/{user_id}/{recommender}/{genre_id}")
