# test_api.py
import requests

# The URL of your running Flask application
API_URL = "http://127.0.0.1:5001/api/generate-palettes"

# The path to your test image
IMAGE_PATH = "sunset.jpg"

def test_palette_generation():
    print("Testing API with both text and image...")

    # The data to send in the form
    form_data = {
        'prompt': 'A dramatic and beautiful palette from a sunset',
        'style': 'Vibrant',
        'industry': 'Travel'
    }

    try:
        # Open the image file in binary read mode
        with open(IMAGE_PATH, 'rb') as image_file:
            # The files to upload
            files = {
                'image': (IMAGE_PATH, image_file, 'image/jpeg')
            }

            # Make the POST request
            response = requests.post(API_URL, data=form_data, files=files)
            
            # Raise an error if the request was unsuccessful
            response.raise_for_status() 

            # Print the JSON response from the server
            print("✅ Success! API Response:")
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f"❌ Error: API request failed: {e}")
    except FileNotFoundError:
        print(f"❌ Error: Make sure '{IMAGE_PATH}' is in the same directory.")

if __name__ == "__main__":
    test_palette_generation()