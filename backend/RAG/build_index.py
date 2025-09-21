import json
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np

# --- Configuration ---
RAW_DATA_FILE = 'raw_dataset.jsonl'
INDEX_FILE = 'palettes.index'
DATA_MAP_FILE = 'palette_data.json'

def build_vector_database():
    """
    Reads the raw dataset, creates text embeddings, and builds a searchable
    FAISS index using the GPU for acceleration.
    """
    print("Loading raw dataset...")
    with open(RAW_DATA_FILE, 'r') as f:
        data_records = [json.loads(line) for line in f]
    
    prompts = [record['prompt'] for record in data_records]

    print(f"Loaded {len(prompts)} records. Initializing embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')

    print("Generating embeddings for all prompts...")
    embeddings = model.encode(prompts, show_progress_bar=True)
    embeddings = np.array(embeddings).astype('float32')
    
    print("Embeddings generated. Building FAISS index on GPU...")
    embedding_dimension = embeddings.shape[1]
    
    # --- This is the key change for GPU usage ---
    # 1. Create a standard CPU index
    cpu_index = faiss.IndexFlatL2(embedding_dimension)
    
    # 2. Create a GPU resource object to control the GPU
    gpu_resource = faiss.StandardGpuResources()
    
    # 3. Move the index from CPU to GPU. '0' refers to the first GPU.
    index = faiss.index_cpu_to_gpu(gpu_resource, 0, cpu_index)
    
    # Add all our vectors to the GPU-powered index
    index.add(embeddings)

    print("Index built on GPU. Moving it back to CPU for saving...")
    # --- IMPORTANT: Move the index back to CPU before saving ---
    cpu_index_to_save = faiss.index_gpu_to_cpu(index)
    
    # Save the searchable index to a file
    faiss.write_index(cpu_index_to_save, INDEX_FILE)
    print(f"FAISS index saved to {INDEX_FILE}")

    # Save the original data map (this part is the same)
    with open(DATA_MAP_FILE, 'w') as f:
        json.dump(data_records, f)
    print(f"Data map saved to {DATA_MAP_FILE}")

    print("\nKnowledge Base build complete!")

if __name__ == "__main__":
    build_vector_database()