import os
import requests

api_key = os.environ["WALOOKUP_API_KEY"]
base_url = os.getenv("API_BASE_URL", "https://walookup.com").rstrip("/")
identifier = os.getenv("IDENTIFIER", "+14155550100")
batch = os.getenv("MODE", "single") == "batch"
path = "/api/v1/batch-check" if batch else "/api/v1/check"
payload = {"service_type": "ws", "identifiers": [identifier, "+442079460000"]} if batch else {"service_type": "ws", "identifier": identifier}
timeout = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "330" if batch else "60"))
response = requests.post(f"{base_url}{path}", headers={"X-API-Key": api_key}, json=payload, timeout=timeout)
response.raise_for_status()
result = response.json()
if result.get("code") != 0:
    raise RuntimeError(f"API error: {result}")
print(result)
# In a batch, classify only exists=true items; exists=false is undetermined.
# A network timeout is uncertain: do not blindly repeat a potentially billed request.
