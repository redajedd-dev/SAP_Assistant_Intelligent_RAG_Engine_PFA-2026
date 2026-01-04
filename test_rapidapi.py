import requests

url = "https://gemini-ai-api.p.rapidapi.com/api002"

querystring = {"prompt":"Tell me a joke."}

headers = {
	"x-rapidapi-key": "3425fda48bmshf56d1540b885168p15de19jsn9f1d6d4cd579",
	"x-rapidapi-host": "gemini-ai-api.p.rapidapi.com"
}

try:
    response = requests.get(url, headers=headers, params=querystring)
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")
    try:
        print(response.json())
    except:
        pass
except Exception as e:
    print(f"Error: {e}")
