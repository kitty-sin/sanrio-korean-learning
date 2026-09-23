import os
from PIL import Image, ImageOps

uploaded_img_path = r'C:/Users/PC/.gemini/antigravity/brain/73b0c2e9-f7eb-4d4e-a1c5-4baa35e1f047/.user_uploaded/media_1790198117929.png'
assets_dir = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets'

im = Image.open(uploaded_img_path).convert("RGBA")

# 1. 儲存 512x512 標準 icon.png & icon-512.png
icon_512_path = os.path.join(assets_dir, 'icon-512.png')
icon_path = os.path.join(assets_dir, 'icon.png')
im.save(icon_512_path, 'PNG')
im.save(icon_path, 'PNG')
print("Saved 512x512 to:", icon_512_path, "and", icon_path)

# 2. 儲存 192x192 標準 icon-192.png
im_192 = im.resize((192, 192), Image.Resampling.LANCZOS)
icon_192_path = os.path.join(assets_dir, 'icon-192.png')
im_192.save(icon_192_path, 'PNG')
print("Saved 192x192 to:", icon_192_path)

# 3. 儲存 Maskable 512x512 icon (滿版安全區底色 #FBF7F0，縮小至 82% 居中，防圓形/方圓形啟動器裁切)
maskable = Image.new("RGBA", (512, 512), (251, 247, 240, 255))
scaled_w = int(512 * 0.82)
scaled_h = int(512 * 0.82)
im_scaled = im.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
offset_x = (512 - scaled_w) // 2
offset_y = (512 - scaled_h) // 2
maskable.paste(im_scaled, (offset_x, offset_y), im_scaled)
maskable_path = os.path.join(assets_dir, 'icon-maskable-512.png')
maskable.save(maskable_path, 'PNG')
print("Saved Maskable 512 to:", maskable_path)

# 4. 儲存 iOS Apple Touch Icon (180x180，填入 #FBF7F0)
apple_icon = Image.new("RGBA", (180, 180), (251, 247, 240, 255))
im_180 = im.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.paste(im_180, (0, 0), im_180)
apple_path = os.path.join(assets_dir, 'apple-touch-icon.png')
apple_icon.save(apple_path, 'PNG')
print("Saved Apple Touch Icon to:", apple_path)
