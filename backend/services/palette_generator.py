from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

def generate_palettes_with_gemini(creative_brief: str, seed_color: str = None):
    """
    Calls the Gemini API to generate a color palette in the specific
    JSON format required by the frontend.
    """
    try:
        client = genai.Client()
    except Exception as e:
        print("Error: Could not initialize Gemini Client. Check GEMINI_API_KEY.")
        raise e

    # --- Construct the dynamic creative brief for Gemini ---
    full_brief = creative_brief
    if seed_color:
        full_brief += f" The palette MUST incorporate and be strongly inspired by this seed color: {seed_color}."
    
    # --- This is the new, more powerful prompt ---
    prompt = f"""
    ### CONTEXT
    You are an expert UI/UX designer. Your task is to generate a complete, ready-to-use, and WCAG AA compliant color palette based on a user's creative brief.

    ### TASK
    Based on the creative brief below, generate a single, harmonious, 5-color palette.
    **Creative Brief:** {full_brief.strip()}

    ### INSTRUCTIONS
    1.  Analyze the brief and generate 5 colors that fit the theme.
    2.  Assign a functional role to each color: 'primary', 'secondary', 'accent', 'background', and 'text'.
    3.  Ensure the 'text' color has a WCAG AA contrast ratio (at least 4.5:1) against the 'background' color.
    4.  The final output must be **ONLY a single, valid JSON object**. Do not include any other text, explanations, or markdown formatting.

    ### OUTPUT FORMAT AND EXAMPLE
    {{
      "name": "Earthy Serenity",
      "colors": [
        {{ "id": 1, "name": "Forest Green", "hex": "#2D5A2D", "role": "primary" }},
        {{ "id": 2, "name": "Sage Green", "hex": "#8FBC8F", "role": "secondary" }},
        {{ "id": 3, "name": "Gold", "hex": "#FFD700", "role": "accent" }},
        {{ "id": 4, "name": "Light Cream", "hex": "#FAFAFA", "role": "background" }},
        {{ "id": 5, "name": "Dark Charcoal", "hex": "#1A1A1A", "role": "text" }}
      ]
    }}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        
        # Clean the response to ensure it's a valid JSON string
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        palette = json.loads(cleaned_text)
        return palette
    
    except Exception as e:
        print(f"Error calling Gemini API or parsing JSON: {e}")
        return None