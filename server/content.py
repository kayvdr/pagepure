import re
from bs4 import BeautifulSoup
import requests

from server.utils import get_clean_url


def get_final_url(raw_url):
    url = get_clean_url(raw_url)
    redirectResponse = requests.get(url, allow_redirects=True, timeout=10)
    return redirectResponse.url


def get_clean_tags(soup):
    forbidden_tags = [
        "script",
        "style",
        "noscript",
        "iframe",
        "footer",
        "nav",
        "form",
        "svg",
        "link",
        "img",
        "head",
    ]
    allowed_tags = ["h1", "h2", "h3", "h4", "p", "ul", "ol", "code"]

    # remove unnecessary tags recursive
    for tag in soup(forbidden_tags):
        tag.decompose()

    # remove all attibutes
    for tag in soup.find_all(True):
        tag.attrs = {}  # type: ignore

    # combine string array
    return "".join(str(el) for el in soup.find_all(allowed_tags))


def get_html(soup: BeautifulSoup):
    raw_content = get_clean_tags(soup)

    # remove unnecessary code
    content = re.sub(r"<([a-zA-Z0-9]+)>\s*</\1>", "", raw_content)
    content = content.replace("\n", "")
    content = re.sub(r"\s{2,}", " ", content)

    return content


def get_text(soup: BeautifulSoup):
    raw_content = get_clean_tags(soup)
    soup = BeautifulSoup(raw_content, "html.parser")

    # Nur den reinen Text holen
    clean_text = soup.get_text(separator="\n", strip=True)

    return clean_text
