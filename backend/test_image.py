from utils.image_processor import get_important_colors

# The name of the image you saved in your project folder
image_path = 'sunset.jpg'

print(f"Testing with image: {image_path}")

try:
    # We use 'with open' to properly handle the file
    # 'rb' means we're opening it in "read binary" mode
    with open(image_path, 'rb') as image_file:
        dominant_color = get_important_colors(image_file)

    if dominant_color:
        print(f"✅ Success! Dominant color found: {dominant_color}")
    else:
        print("❌ Failed. The function returned None.")

except FileNotFoundError:
    print(f"❌ Error: Make sure you have a file named '{image_path}' in your folder.")