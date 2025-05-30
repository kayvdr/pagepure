import re
from bs4 import BeautifulSoup
from flask import Flask, Blueprint, jsonify, request, send_from_directory
from flask_cors import CORS
import requests

from src.content import get_final_url, get_html, get_text
from src.utils import is_valid_url


# app: Flask = Flask(__name__)
api_v1: Blueprint = Blueprint("api_v1", __name__, url_prefix="/api/v1")


app = Flask(__name__, static_folder="web/build", static_url_path="")
CORS(app)


@api_v1.route("/test", methods=["GET"])
def getTest():
    return jsonify({"running": 1}), 200


@api_v1.route("/content", methods=["GET"])
def getExtractedContent():
    raw_url = request.args.get("url")

    if not raw_url:
        return jsonify({"error": "Missing 'url' field"}), 400

    if not is_valid_url(raw_url):
        return jsonify({"error": "'url' not valid"}), 400

    url = get_final_url(raw_url)

    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.title.string or ""  # type: ignore
    meta = soup.find("meta", attrs={"charset": True})

    return (
        jsonify(
            {
                "meta": {
                    "title": title,
                    "charset": meta["charset"],  # type: ignore
                },
                "content": {
                    "html": get_html(soup),
                    "plain": get_text(soup),
                },
            }
        ),
        200,
    )


app.register_blueprint(api_v1)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
