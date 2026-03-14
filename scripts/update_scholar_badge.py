#!/usr/bin/env python3

import json
import re
import urllib.request
from pathlib import Path


SCHOLAR_ID = "WseeNrUAAAAJ"
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
OUTPUT_PATH = Path("google-scholar-stats/gs_data_shieldsio.json")
USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)


def fetch_html(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def parse_citation_count(html: str) -> str:
    patterns = [
        r'meta name="description" content="[^"]*Cited by\s*([\d.,]+)',
        r"Cited by\s*([\d.,]+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, html, re.IGNORECASE)
        if match:
            return re.sub(r"\D", "", match.group(1))

    raise RuntimeError("Unable to parse citation count from Google Scholar")


def write_badge_json(count: str) -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schemaVersion": 1,
        "label": "Google Scholar Citations",
        "message": count,
        "color": "9cf",
        "labelColor": "f6f6f6",
    }
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    html = fetch_html(SCHOLAR_URL)
    count = parse_citation_count(html)
    write_badge_json(count)
    print(f"Updated badge data with {count} citations")


if __name__ == "__main__":
    main()
