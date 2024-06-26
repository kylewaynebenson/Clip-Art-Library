import os
import json

def generate_image_index(image_folder, output_file):
    images = []
    for root, dirs, files in os.walk(image_folder):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                relative_path = os.path.relpath(os.path.join(root, file), image_folder)
                images.append({
                    "name": os.path.splitext(file)[0],
                    "path": relative_path.replace("\\", "/")  # Use forward slashes for web paths
                })

    with open(output_file, 'w') as f:
        json.dump(images, f, indent=2)

    print(f"Image index generated: {output_file}")

if __name__ == "__main__":
    image_folder = input("Enter the path to the folder containing your images: ")
    output_file = "images.json"
    generate_image_index(image_folder, output_file)
