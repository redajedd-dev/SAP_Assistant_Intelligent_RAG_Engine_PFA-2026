import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv("ai-engine-python/.env")

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash-lite')

try:
    response = model.generate_content("Hello, do you work?")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Failed: {e}")
