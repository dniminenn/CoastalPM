#!/usr/bin/python
import os
from pathlib import Path
from PIL import Image
import re

def convert_image_to_webp(image_path, quality=85):
    try:
        with Image.open(image_path) as img:
            # Check and convert images to 'RGBA' if they support transparency
            if img.mode == 'RGBA' or 'transparency' in img.info:
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            webp_path = image_path.with_suffix('.webp')
            # Save the image with specified quality and ensure transparency is considered
            img.save(webp_path, 'webp', quality=quality, optimize=True)
            print(f"Converted {image_path} to {webp_path} with quality={quality}")
            return webp_path
    except IOError as e:
        print(f"Error converting {image_path}: {e}")
        return None

def convert_to_webp(input_directory, quality=85):
    converted_files = {}
    for file_path in Path(input_directory).rglob('*'):
        if not file_path.name.lower().endswith('.webp'):
            webp_path = convert_image_to_webp(file_path, quality)
            if webp_path:
                converted_files[str(file_path)] = str(webp_path)
    return converted_files

def update_html_files(root_directory, converted_files):
    for file_path in Path(root_directory).rglob('*.html'):
        try:
            content = file_path.read_text(encoding='utf-8')
            for original, webp in converted_files.items():
                content = re.sub(rf'(["\'])({re.escape(original)})(["\'])', rf'\1{webp}\3', content)
            file_path.write_text(content, encoding='utf-8')
            print(f"Updated {file_path}")
        except IOError as e:
            print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    input_directory = Path('images')
    root_directory = Path('.')
    
    converted_files = convert_to_webp(input_directory, quality=85)
    #update_html_files(root_directory, converted_files)
