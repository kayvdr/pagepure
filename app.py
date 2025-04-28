import re
from bs4 import BeautifulSoup
from flask import Flask, Blueprint, jsonify, request
import requests

from server.content import get_html, get_text, get_final_url
from server.utils import is_valid_url

app: Flask = Flask(__name__)
api_v1: Blueprint = Blueprint("api_v1", __name__, url_prefix="/api/v1")


@api_v1.route("/test", methods=["GET"])
def getTest():
    return jsonify({"running": 1}), 200


@api_v1.route("/content", methods=["POST"])
def getExtractedContent():
    data = request.get_json()
    raw_url: str = data.get("url")

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
