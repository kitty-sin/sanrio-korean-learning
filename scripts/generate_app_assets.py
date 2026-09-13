import os
from PIL import Image, ImageOps, ImageDraw, ImageFilter
import numpy as np

src_path = r'C:\Users\PC\.gemini\antigravity\brain\f753a9f3-e5f0-4b24-958f-0923ed38d898\.user_uploaded\media_1789277982569.jpg'
out_dir = r'c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\assets'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
w, h = img.size

# 1. 精緻去背：使用 ImageDraw.floodfill 或邊緣掃描
# 外圍背景是淺白灰色
img_rgb = img.convert("RGB")
# 建立一個與原圖同尺寸的單通道 mask，背景為 0，前景為 255
# 使用 PIL 的 floodfill 從四個角 (0,0), (w-1,0), (0,h-1), (w-1,h-1) 填色
mask = Image.new("L", (w, h), 255)
# 找出背景像素
bg_color_ref = img.getpixel((5, 5))[:3]

# 轉成 numpy 分析
arr = np.array(img)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
# 黑色外框拼豆通常 r<80, g<80, b<80
# 外部背景 r>165, g>160, b>155
is_bg_candidate = (r > 160) & (g > 155) & (b > 150) & (np.abs(r.astype(int) - g.astype(int)) < 30)

# 使用簡單的 BFS 泛洪演算法從四周邊界蔓延只去除外圍背景（不破壞內部白色拼豆）
visited = np.zeros((h, w), dtype=bool)
from collections import deque
queue = deque()

# 將四邊的背景候選點加入佇列
for x in range(w):
    if is_bg_candidate[0, x]: queue.append((0, x)); visited[0, x] = True
    if is_bg_candidate[h-1, x]: queue.append((h-1, x)); visited[h-1, x] = True
for y in range(h):
    if is_bg_candidate[y, 0]: queue.append((y, 0)); visited[y, 0] = True
    if is_bg_candidate[y, w-1]: queue.append((y, w-1)); visited[y, w-1] = True

while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            if is_bg_candidate[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

# visited 為 True 的地方是外部背景
alpha_mask = np.where(visited, 0, 255).astype(np.uint8)
mask_img = Image.fromarray(alpha_mask, mode='L')
# 稍微平滑邊緣
mask_img = mask_img.filter(ImageFilter.GaussianBlur(1.2))

img.putalpha(mask_img)

# 裁切出主體邊界
bbox = img.getbbox()
if bbox:
    # 稍微多給一點點 padding 避免切到拼豆邊緣
    pad = 4
    bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(w, bbox[2]+pad), min(h, bbox[3]+pad))
    img = img.crop(bbox)

# 2. 建立 512x512 現代 Android Adaptive Icon
canvas_size = 512
icon = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))

# 繪製柔和馬卡龍漸層底色 (淺暖杏乳白漸層 #FCF9F2 -> #F5EDE4)
bg = Image.new("RGBA", (canvas_size, canvas_size))
draw = ImageDraw.Draw(bg)
for y in range(canvas_size):
    t = y / float(canvas_size)
    r_val = int(252 * (1 - t) + 245 * t)
    g_val = int(249 * (1 - t) + 237 * t)
    b_val = int(242 * (1 - t) + 228 * t)
    draw.line([(0, y), (canvas_size, y)], fill=(r_val, g_val, b_val, 255))

# 加入圓角遮罩 (Squircle / Rounded Rect)
corner_radius = 112
mask = Image.new('L', (canvas_size, canvas_size), 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rounded_rectangle([(0, 0), (canvas_size, canvas_size)], radius=corner_radius, fill=255)

# 將 Yoda 寶寶等比例縮放居中放入
target_size = int(canvas_size * 0.78)
img.thumbnail((target_size, target_size), Image.Resampling.LANCZOS)

offset_x = (canvas_size - img.width) // 2
offset_y = (canvas_size - img.height) // 2

# 稍微加上柔和立體投影
shadow = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
shadow_mask = img.split()[-1]
shadow_draw = Image.new("RGBA", img.size, (0, 0, 0, 40))
shadow_draw.putalpha(shadow_mask)
shadow.paste(shadow_draw, (offset_x, offset_y + 10), shadow_draw)
shadow = shadow.filter(ImageFilter.GaussianBlur(8))

bg.paste(shadow, (0, 0), shadow)
bg.paste(img, (offset_x, offset_y), img)

# 加上精緻內邊框 (Subtle inner border)
inner_border_draw = ImageDraw.Draw(bg)
inner_border_draw.rounded_rectangle([(1, 1), (canvas_size-2, canvas_size-2)], radius=corner_radius, outline=(255, 255, 255, 180), width=3)

# 套用圓角
icon.paste(bg, (0, 0), mask)

icon_path = os.path.join(out_dir, 'icon.png')
icon.save(icon_path, 'PNG')
print('Successfully saved icon to:', icon_path)

# 同時儲存未切圓角的標準 512x512 背景與前景（供 Android Adaptive Icon 使用）
bg_only = Image.new("RGBA", (canvas_size, canvas_size))
for y in range(canvas_size):
    t = y / float(canvas_size)
    r_val = int(252 * (1 - t) + 245 * t)
    g_val = int(249 * (1 - t) + 237 * t)
    b_val = int(242 * (1 - t) + 228 * t)
    ImageDraw.Draw(bg_only).line([(0, y), (canvas_size, y)], fill=(r_val, g_val, b_val, 255))
bg_only.save(os.path.join(out_dir, 'icon-background.png'), 'PNG')

fg_only = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
fg_only.paste(shadow, (0, 0), shadow)
fg_only.paste(img, (offset_x, offset_y), img)
fg_only.save(os.path.join(out_dir, 'icon-foreground.png'), 'PNG')

# 3. 產出 Splash 啟動畫面 (1080x1920 直屏)
splash_w, splash_h = 1080, 1920
splash = Image.new("RGBA", (splash_w, splash_h))
s_draw = ImageDraw.Draw(splash)
for y in range(splash_h):
    t = y / float(splash_h)
    r_val = int(252 * (1 - t) + 245 * t)
    g_val = int(249 * (1 - t) + 228 * t)
    b_val = int(242 * (1 - t) + 220 * t)
    s_draw.line([(0, y), (splash_w, y)], fill=(r_val, g_val, b_val, 255))

splash_img = img.copy()
s_target = int(splash_w * 0.52)
splash_img.thumbnail((s_target, s_target), Image.Resampling.LANCZOS)
s_offset_x = (splash_w - splash_img.width) // 2
s_offset_y = (splash_h - splash_img.height) // 2 - 100

splash.paste(splash_img, (s_offset_x, s_offset_y), splash_img)

splash_path = os.path.join(out_dir, 'splash.png')
splash.save(splash_path, 'PNG')
print('Successfully saved splash to:', splash_path)
