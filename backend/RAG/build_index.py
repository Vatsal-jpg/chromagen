import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Load dataset
dataset_path = "raw_dataset.jsonl"
prompts, palettes = [], []
with open(dataset_path, "r") as f:
    for line in f:
        data = json.loads(line.strip())
        prompts.append(data["prompt"])
        palettes.append(data["palette"])

# Convert prompts → embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")  # fast + lightweight
embeddings = model.encode(prompts, convert_to_numpy=True)

# Build FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)  # simple L2 distance
index.add(embeddings)

# Save
faiss.write_index(index, "palettes.index")
np.save("palettes.npy", np.array(palettes, dtype=object))
with open("prompts.json", "w") as f:
    json.dump(prompts, f)

print(f"Indexed {len(prompts)} palettes.")
