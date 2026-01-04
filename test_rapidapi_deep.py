import requests

base_url = "https://gemini-ai-api.p.rapidapi.com"
headers = {
	"x-rapidapi-key": "3425fda48bmshf56d1540b885168p15de19jsn9f1d6d4cd579",
	"x-rapidapi-host": "gemini-ai-api.p.rapidapi.com"
}

# Payload style standard
json_payload = {"messages": [{"role": "user", "content": "Hello"}]}
# Payload style simple
simple_payload = {"prompt": "Hello"}

endpoints = [
    "/v1/chat/completions",
    "/api/v1/chat/completions",
    "/gemini/chat",
    "/google/gemini",
    "/text/generation",
]

for ep in endpoints:
    url = base_url + ep
    print(f"Testing POST {url}")
    try:
        # Try standard
        r = requests.post(url, headers=headers, json=json_payload, timeout=3)
        print(f"Standard Payload: {r.status_code}")
        
        # Try simple
        r2 = requests.post(url, headers=headers, json=simple_payload, timeout=3)
        print(f"Simple Payload: {r2.status_code}")
        
    except Exception as e:
        print(f"Error {e}")
    print("-" * 10)
