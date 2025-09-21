import requests
import json

# The URL of your new RAG endpoint
API_URL = "http://127.0.0.1:5001/api/generate-palette-rag"

def test_rag_palette_generation():
    """
    Tests the RAG API endpoint by sending a JSON request.
    """
    print("Testing RAG API with a creative prompt...")

    # The JSON data payload to send to the server
    payload = {
        'prompt': 'A calm and trustworthy palette for a modern banking application'
    }

    try:
        # Make the POST request, sending the payload as JSON
        response = requests.post(API_URL, json=payload)
        
        # Raise an exception for bad status codes (like 404 or 500)
        response.raise_for_status() 

        # Get the JSON response from the server
        palette_data = response.json()

        print("✅ Success! RAG API Response:")
        # Pretty-print the result
        print(json.dumps(palette_data, indent=2))

    except requests.exceptions.RequestException as e:
        print(f"❌ Error: API request failed: {e}")
        # If the response has text, print it for more details
        if e.response is not None:
            print(f"Server response: {e.response.text}")

if __name__ == "__main__":
    test_rag_palette_generation()
