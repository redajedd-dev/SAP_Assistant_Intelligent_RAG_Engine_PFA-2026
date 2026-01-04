import requests

base_url = "https://gemini-ai-api.p.rapidapi.com"
headers = {
	"x-rapidapi-key": "3425fda48bmshf56d1540b885168p15de19jsn9f1d6d4cd579",
	"x-rapidapi-host": "gemini-ai-api.p.rapidapi.com",
    "Content-Type": "application/json"
}
payload = {"prompt": "Hello", "message": "Hello"}

endpoints = [
    "/api002", # Try POST this time
    "/chat",
    "/ask",
    "/",
]

for ep in endpoints:
    url = base_url + ep
    print(f"Testing POST {url}")
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=5)
        print(f"Status: {response.status_code}")
        print(f"Text: {response.text[:200]}") # First 200 chars
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 20)
