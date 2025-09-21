import json
from services.palette_generator import generate_palettes_with_gemini

def run_test(test_name, brief, seed_color=None):
    """A helper function to run a test and print the results."""
    print(f"--- Running Test: {test_name} ---")
    print(f"Creative Brief: '{brief}'")
    if seed_color:
        print(f"Seed Color: {seed_color}")
    
    # Call the function we want to test
    palettes = generate_palettes_with_gemini(
        creative_brief=brief, 
        seed_color=seed_color
    )

    if palettes:
        print("✅ Success! Gemini returned the following palettes:")
        # Pretty-print the JSON-like output
        print(json.dumps(palettes, indent=2))
    else:
        print("❌ Failed. The function returned None. Check for errors in the console.")
    print("-" * 40 + "\n")


if __name__ == '__main__':
    # Test Case 1: A simple text-only prompt
    test1_brief = "An energetic and vibrant palette for a music festival."
    run_test("Text Prompt Only", test1_brief)

    # Test Case 2: A prompt that includes a seed color (as if from an image)
    test2_brief = "A calm and professional palette for a financial tech app."
    test2_seed_color = "#2a9d8f" # A nice teal color
    run_test("Text Prompt with Seed Color", test2_brief, seed_color=test2_seed_color)