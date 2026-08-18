import os

import requests

api_key = os.environ["WALOOKUP_API_KEY"]
base_url = os.getenv("API_BASE_URL", "https://walookup.com")
identifier = os.getenv("IDENTIFIER", "+14155550100")
batch = os.getenv("MODE", "single") == "batch"
path = "/api/v1/batch-check" if batch else "/api/v1/check"
payload = {"service_type": "ws", "identifiers": [identifier, "+442079460000"]} if batch else {"service_type": "ws", "identifier": identifier}

response = requests.post(
    f"{base_url}{path}", headers={"X-API-Key": api_key}, json=payload, timeout=60
)
response.raise_for_status()
print(response.json())
