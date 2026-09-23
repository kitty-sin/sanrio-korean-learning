import glob

pwa_tags = """    <!-- PWA Settings -->
    <link rel="manifest" href="./manifest.json">
    <meta name="theme-color" content="#FFF0F3">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="KITTY韓語">
    <link rel="apple-touch-icon" href="./assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="192x192" href="./assets/icon-192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="./assets/icon-512.png">"""

html_files = glob.glob('*.html')
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'rel="manifest"' in content:
        print(f'Skipping {fpath} (already has manifest)')
        continue
    if '</title>' in content:
        new_content = content.replace('</title>', '</title>\n' + pwa_tags, 1)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Injected PWA tags into {fpath}')
    else:
        print(f'No </title> found in {fpath}')
