# app.py
from flask import Flask, request, jsonify
from services.palette_generator import generate_palettes_with_gemini
from utils.image_processor import get_important_colors 
import os

app = Flask(__name__)

@app.route('/api/generate-palettes', methods=['POST'])
def generate_palettes_endpoint():
    """
    The main API endpoint for generating color palettes.
    Accepts a multipart/form-data request.
    """
    try:
        # --- 1. Extract data from the incoming request ---
        text_prompt = request.form.get('prompt', '')
        image_file = request.files.get('image')
        num_colors = request.form.get('num_colors', 9)
        industry = request.form.get('industry', '')
        style = request.form.get('style', '')

        # Basic validation: ensure we have at least some input
        if not text_prompt and not image_file:
            return jsonify({"error": "A text prompt or an image file is required."}), 400

        # --- 2. Process the image to get seed colors (if provided) ---
        seed_color = None
        if image_file:
            important_colors = get_important_colors(image_file)
            if important_colors:
                # We'll use the first "important" color as our primary seed
                seed_color = important_colors[0]
        
        # --- 3. Construct the final creative brief for the AI ---
        creative_brief = f"Style: {style}. Industry: {industry}. Prompt: {text_prompt}"

        # --- 4. Call our AI service with all the processed info ---
        palettes = generate_palettes_with_gemini(
            creative_brief=creative_brief.strip(),
            num_colors=int(num_colors),
            seed_color=seed_color
        )

        # --- 5. Return the result ---
        if palettes:
            return jsonify(palettes), 200
        else:
            # This happens if the Gemini API call failed
            return jsonify({"error": "Failed to generate palettes from the AI model."}), 500

    except Exception as e:
        # A general catch-all for any other unexpected errors
        print(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": "An internal server error occurred."}), 500


if __name__ == '__main__':
    # For development, run the app directly.
    # For production, use a proper WSGI server like Gunicorn.
    app.run(debug=True, port=5001)