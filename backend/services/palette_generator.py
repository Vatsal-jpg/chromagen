from google import genai 
import json
import os
from dotenv import load_dotenv

load_dotenv()

def generate_palettes_with_gemini(creative_brief: str, num_colors: int = 9, seed_color: str = None):
    """
    Calls the Gemini API using the genai.Client() method to generate color palettes.
    """
    # The client will automatically pick up the API key from the .env file
    # if it's named GEMINI_API_KEY
    try:
        client = genai.Client()
    except Exception as e:
        print("Error: Could not initialize Gemini Client. Is GEMINI_API_KEY set in your .env file?")
        raise e

    full_brief = creative_brief
    if seed_color:
        full_brief += f" The palette MUST incorporate and be strongly inspired by this seed color: {seed_color}."
    
    prompt = f"""
    ### CONTEXT
    You are an expert design assistant specializing in accessible color theory. Your task is to generate complete, ready-to-use, and WCAG AA compliant color palettes.
    ### TASK
    Based on the following creative brief, generate 3 distinct and harmonious color palettes.
    **Creative Brief:** {full_brief.strip()}
    ### CONSTRAINTS
    1.  Each palette must be **WCAG AA compliant**. Text colors (like --text-100) must have a contrast ratio of at least 4.5:1 with background colors (like --bg-100).
    2.  Each palette must contain approximately **{num_colors} colors**.
    3.  The output must be **ONLY a single, valid JSON array of objects**. Do not include any other text, explanations, or markdown formatting like ```json.
    ### OUTPUT FORMAT AND EXAMPLE
    [
      {{
        "name": "Earthy Serenity",
        "css": "--primary-100:#4a6855; --primary-200:#a9bfa8; --accent-100:#d4a373; --text-100:#3d405b; --text-200:#6a6e8c; --bg-100:#fefae0; --bg-200:#f4f1de; --bg-300:#e9e6d1;"
      }}
    ]
    """

    try:
        # We use the client.models.generate_content method now
        response = client.models.generate_content(
            model="gemini-2.5-flash", # Sticking with Pro for best quality
            contents=prompt
        )
        
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        palettes = json.loads(cleaned_text)
        return palettes
    
    except Exception as e:
        print(f"Error calling Gemini API or parsing JSON: {e}")
        return None