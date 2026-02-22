import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def analyze_ingredients(ingredients_text):

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": """
You are a food safety analysis AI.

You MUST return response ONLY in valid JSON format.

Return this exact structure:
{
  "status": "safe" or "hazardous",
  "safe": [],
  "hazardous": [],
  "allergens": [],
  "explanation": ""
}

Rules:
- Categorize each ingredient.
- If harmful chemicals exist, mark status as "hazardous".
- If allergens like milk, peanuts, soy, gluten, etc. exist, list them.
- Do NOT add any extra text outside JSON.
"""
            },
            {
                "role": "user",
                "content": f"""
Analyze these ingredients:

{ingredients_text}
"""
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()

    try:
        analysis_content = result["choices"][0]["message"]["content"]

        # Convert AI JSON string to Python dictionary
        analysis_json = json.loads(analysis_content)

        return analysis_json

    except Exception as e:
        return {
            "status": "error",
            "safe": [],
            "hazardous": [],
            "allergens": [],
            "explanation": "AI response parsing failed"
        }