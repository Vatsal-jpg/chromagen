import json
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
from google import genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Optimization: Load models and data once when the application starts ---
# This ensures that these large files are not reloaded on every API call, making your app fast.
print("Loading RAG models and data into memory...")

try:
    # Define paths relative to the project's root directory
    RAG_FOLDER = 'RAG'
    INDEX_FILE = os.path.join(RAG_FOLDER, 'palettes.index')
    PROMPTS_FILE = os.path.join(RAG_FOLDER, 'prompts.json')
    PALETTES_FILE = os.path.join(RAG_FOLDER, 'palettes.npy')

    # 1. Load the AI model that creates embeddings from text
    embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

    # 2. Load the searchable FAISS index
    faiss_index = faiss.read_index(INDEX_FILE)

    # 3. Load the data maps for retrieving the original prompts and palettes
    with open(PROMPTS_FILE, "r") as f:
        prompts_map = json.load(f)
    
    palettes_map = np.load(PALETTES_FILE, allow_pickle=True)

    print("RAG components loaded successfully.")
except FileNotFoundError as e:
    print(f"Error: A required RAG file was not found: {e}. Please run build_index.py from the 'backend/RAG' directory first.")
    # Set to None so the app knows the RAG system is offline
    embedding_model = faiss_index = prompts_map = palettes_map = None
# ------------------------------------------------------------------------------------

def generate_palette_with_rag(user_prompt: str, k: int = 3):
    """
    Generates a color palette using the RAG pipeline. It retrieves relevant examples
    from a knowledge base and uses them to augment a prompt for a powerful generative model.
    """
    if not all([embedding_model, faiss_index, prompts_map, palettes_map]):
        print("RAG components are not loaded. Cannot generate palette.")
        return None

    try:
        client = genai.Client()
    except Exception as e:
        print("Error initializing Gemini Client. Is GEMINI_API_KEY set in your .env file?")
        raise e

    # --- Step 1: RETRIEVE ---
    # Find relevant examples from our custom knowledge base.
    print(f"Searching for palettes similar to: '{user_prompt}'")
    
    prompt_embedding = embedding_model.encode([user_prompt])
    prompt_embedding = np.array(prompt_embedding).astype('float32')

    # Search the FAISS index for the top k most similar palettes
    distances, indices = faiss_index.search(prompt_embedding, k)
    
    retrieved_examples = []
    for i in indices[0]:
        retrieved_examples.append({
            "prompt": prompts_map[i],
            "palette": palettes_map[i].tolist() # .tolist() to convert numpy array
        })
    
    # --- Step 2: AUGMENT ---
    # Build a powerful, context-rich "Super Prompt" for Gemini.
    examples_text = ""
    for i, example in enumerate(retrieved_examples):
        palette_str = ", ".join(example['palette'])
        examples_text += f"{i+1}. Example for a palette described as '{example['prompt']}': [{palette_str}]\n"
        
    super_prompt = f"""
    ### CONTEXT
    You are an expert UI/UX designer. Your task is to generate a complete, ready-to-use, and WCAG AA compliant color palette based on a user's creative brief, using high-quality examples for inspiration.

    ### TASK
    A user needs a color palette for the following concept: "{user_prompt}"

    To help you, here are {k} relevant examples from a design database:
    {examples_text}
    ### INSTRUCTIONS
    - Using your expert knowledge and taking inspiration from the provided examples, generate a single, new, and unique palette that perfectly fits the user's request.
    - The final output must be **ONLY a single, valid JSON object**. Do not include any other text, explanations, or markdown formatting.

    ### OUTPUT FORMAT AND EXAMPLE
    {{
      "name": "Cyberpunk Dreams",
      "colors": [
        {{ "id": 1, "name": "Neon Pink", "hex": "#FF00FF", "role": "accent" }},
        {{ "id": 2, "name": "Electric Blue", "hex": "#00FFFF", "role": "primary" }},
        {{ "id": 3, "name": "Deep Indigo", "hex": "#4B0082", "role": "secondary" }},
        {{ "id": 4, "name": "Night Sky", "hex": "#08040A", "role": "background" }},
        {{ "id": 5, "name": "Off-White Glow", "hex": "#F5F5F5", "role": "text" }}
      ]
    }}
    """

    # --- Step 3: GENERATE ---
    # Call Gemini with the rich, contextual prompt to get a high-quality response.
    print("Calling Gemini with augmented prompt...")
    try:
        response = client.models.generate_content(
            model="gemini-1.5-pro-latest",
            contents=super_prompt
        )
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        final_palette = json.loads(cleaned_text)
        return final_palette
    except Exception as e:
        print(f"Error calling Gemini API or parsing its response: {e}")
        return None

