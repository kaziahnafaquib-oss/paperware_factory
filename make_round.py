from PIL import Image, ImageDraw, ImageOps
import sys
import os

def make_round_image(input_path, output_path):
    try:
        # Open the image
        img = Image.open(input_path).convert("RGBA")
        
        # Create a boolean mask of a circle
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + img.size, fill=255)
        
        # Apply the mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        # Save output
        output.save(output_path, "PNG")
        print(f"Successfully created round image at {output_path}")
        return True
    except ImportError:
        print("PIL/Pillow not installed.")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python make_round.py <input> <output>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    make_round_image(input_file, output_file)
