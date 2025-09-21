# process_dataset.py
import pandas as pd
import json

# --- Configuration ---
CSV_FILE_PATH = 'emotion_palette.csv'
OUTPUT_FILE = 'raw_dataset.jsonl'

def process_raw_data():
    print(f"Reading data from {CSV_FILE_PATH}...")
    try:
        df = pd.read_csv(CSV_FILE_PATH)
    except FileNotFoundError:
        print(f"Error: The file '{CSV_FILE_PATH}' was not found.")
        return

    # --- Updated with the correct column names from your dataset ---
    COLOR_COLUMNS = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']
    
    # All other columns are treated as potential emotions/tags
    EMOTION_COLUMNS = ['airy', 'bold', 'calm', 'classic', 'clean', 'cool', 'creative', 
                       'dramatic', 'dreamy', 'earthy', 'elegant', 'energetic', 'fresh', 
                       'friendly', 'fun', 'grounded', 'joy', 'luxurious', 'modern', 
                       'natural', 'nautical', 'organic', 'peaceful', 'playful', 
                       'powerful', 'professional', 'reliable', 'soft', 'sophisticated', 
                       'strong', 'trust', 'vibrant', 'vintage', 'warm', 'youthful']
    
    print(f"Processing {len(df)} rows...")
    saved_count = 0
    with open(OUTPUT_FILE, 'w') as f:
        for index, row in df.iterrows():
            try:
                palette = [row[col] for col in COLOR_COLUMNS if pd.notna(row[col])]
                
                active_emotions = []
                for emotion in EMOTION_COLUMNS:
                    # Check if the column exists and if its value is 1
                    if emotion in row and row[emotion] == 1:
                        active_emotions.append(emotion)
                
                if palette and active_emotions:
                    emotion_text = "', '".join(active_emotions)
                    prompt = f"A palette that feels '{emotion_text}'."

                    record = {
                        "prompt": prompt,
                        "palette": palette
                    }
                    f.write(json.dumps(record) + '\n')
                    saved_count += 1
            except Exception:
                continue

    print(f"\nProcessing complete. Saved {saved_count} records to {OUTPUT_FILE}")

if __name__ == "__main__":
    process_raw_data()