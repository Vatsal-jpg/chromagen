from PIL import Image
from sklearn.cluster import KMeans
import numpy as np
import colorsys

def get_important_colors(image_file, num_colors=5):
    try:
        img = Image.open(image_file).convert('RGB')
        img = img.resize((150, 150))
        img_array = np.array(img)
        pixels = img_array.reshape(-1, 3)

        kmeans = KMeans(n_clusters=num_colors, random_state=42, n_init='auto')
        kmeans.fit(pixels)
        rgb_colors = kmeans.cluster_centers_.astype(int)

        important_colors = []
        for rgb in rgb_colors:
            r, g, b = rgb[0]/255.0, rgb[1]/255.0, rgb[2]/255.0
            h, l, s = colorsys.rgb_to_hls(r, g, b) # Convert to HSL

            is_not_too_dark = l > 0.15
            is_not_too_light = l < 0.85
            is_saturated = s > 0.15

            if is_not_too_dark and is_not_too_light and is_saturated:
                hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
                important_colors.append(hex_color)

        # 3. Fallback: If all colors were filtered out, return the single most dominant one
        if not important_colors:
             kmeans_fallback = KMeans(n_clusters=1, random_state=42, n_init='auto').fit(pixels)
             fallback_rgb = kmeans_fallback.cluster_centers_.astype(int)[0]
             fallback_hex = '#{:02x}{:02x}{:02x}'.format(fallback_rgb[0], fallback_rgb[1], fallback_rgb[2])
             return [fallback_hex]

        return important_colors
    
    except Exception as e:
        print(f"Error processing image: {e}")
        return None