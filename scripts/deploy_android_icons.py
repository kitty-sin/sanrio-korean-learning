import os
from PIL import Image

base_res = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\android\app\src\main\res'
icon_src = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets\icon.png'
fg_src = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets\icon-foreground.png'
bg_src = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets\icon-background.png'
splash_src = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets\splash.png'

icon_img = Image.open(icon_src)
fg_img = Image.open(fg_src)
bg_img = Image.open(bg_src)
splash_img = Image.open(splash_src)

# 解析度規格
sizes = {
    'mipmap-mdpi': (48, 108),
    'mipmap-hdpi': (72, 162),
    'mipmap-xhdpi': (96, 216),
    'mipmap-xxhdpi': (144, 324),
    'mipmap-xxxhdpi': (192, 432),
}

for folder, (ic_size, adapt_size) in sizes.items():
    folder_path = os.path.join(base_res, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    # 1. 普通圖標 ic_launcher.png, ic_launcher_round.png
    ic_resized = icon_img.resize((ic_size, ic_size), Image.Resampling.LANCZOS)
    ic_resized.save(os.path.join(folder_path, 'ic_launcher.png'), 'PNG')
    ic_resized.save(os.path.join(folder_path, 'ic_launcher_round.png'), 'PNG')
    
    # 2. Adaptive Icon 前景與背景
    fg_resized = fg_img.resize((adapt_size, adapt_size), Image.Resampling.LANCZOS)
    fg_resized.save(os.path.join(folder_path, 'ic_launcher_foreground.png'), 'PNG')
    
    bg_resized = bg_img.resize((adapt_size, adapt_size), Image.Resampling.LANCZOS)
    bg_resized.save(os.path.join(folder_path, 'ic_launcher_background.png'), 'PNG')

# 3. Splash Screen 圖形
drawable_folders = [
    ('drawable', (480, 800)),
    ('drawable-land-mdpi', (800, 480)),
    ('drawable-land-hdpi', (1280, 720)),
    ('drawable-land-xhdpi', (1920, 1080)),
    ('drawable-land-xxhdpi', (2560, 1440)),
    ('drawable-port-mdpi', (480, 800)),
    ('drawable-port-hdpi', (720, 1280)),
    ('drawable-port-xhdpi', (1080, 1920)),
    ('drawable-port-xxhdpi', (1440, 2560)),
]

for d_folder, (dw, dh) in drawable_folders:
    d_path = os.path.join(base_res, d_folder)
    os.makedirs(d_path, exist_ok=True)
    sp_resized = splash_img.resize((dw, dh), Image.Resampling.LANCZOS)
    sp_resized.save(os.path.join(d_path, 'splash.png'), 'PNG')

print('All Android icons and splash screens generated successfully!')
