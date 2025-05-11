
from urllib.parse import urljoin, urlparse

def get_clean_url(url: str):
    return urljoin(url, urlparse(url).path)

def is_valid_url(url: str):
    parsed = urlparse(url)
    return all([parsed.scheme, parsed.netloc])