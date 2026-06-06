import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

manifest_tag = '\n<link rel="manifest" href="manifest.json">\n<meta name="theme-color" content="#004d27">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">'

bottom_nav = """
<!-- Mobile Bottom Navigation -->
<nav class="lg:hidden fixed bottom-0 w-full bg-surface border-t border-outline-variant/20 flex justify-around items-center pb-safe pt-2 px-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
    <a href="index.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors">
        <span class="material-symbols-outlined" id="nav-icon-index">newspaper</span>
        <span class="text-[10px] font-bold mt-1">Gündem</span>
    </a>
    <a href="duyurular.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors">
        <span class="material-symbols-outlined" id="nav-icon-duyurular">campaign</span>
        <span class="text-[10px] font-bold mt-1">Duyurular</span>
    </a>
    <a href="sosyal-kose.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors">
        <span class="material-symbols-outlined" id="nav-icon-sosyal-kose">group</span>
        <span class="text-[10px] font-bold mt-1">Sosyal</span>
    </a>
    <a href="hocalar.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors">
        <span class="material-symbols-outlined" id="nav-icon-hocalar">school</span>
        <span class="text-[10px] font-bold mt-1">Kadro</span>
    </a>
</nav>

<style>
/* Safe area for newer iPhones */
.pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
/* Add bottom padding to body so content isn't hidden by nav bar */
@media (max-width: 1024px) { body { padding-bottom: 70px; } }
</style>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Inject manifest
    if '<link rel="manifest"' not in content:
        content = content.replace('</title>', '</title>' + manifest_tag)
    
    # Inject bottom nav before </body>
    if '<!-- Mobile Bottom Navigation -->' not in content:
        content = content.replace('</body>', bottom_nav + '\n</body>')
        
    # Make active icon solid and colored based on filename
    # e.g., if index.html, highlight newspaper
    if 'id="nav-icon-' in content:
        basename = file.split('.')[0]
        # reset all
        content = re.sub(r'class="flex flex-col items-center p-2 text-primary"', 'class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors"', content)
        content = re.sub(r'style="font-variation-settings: \'FILL\' 1;"', '', content)
        
        # set active
        search_pattern = f'href="{file}" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors"'
        replace_pattern = f'href="{file}" class="flex flex-col items-center p-2 text-primary"'
        content = content.replace(search_pattern, replace_pattern)
        
        # set active icon fill
        icon_search = f'id="nav-icon-{basename}"'
        icon_replace = f'id="nav-icon-{basename}" style="font-variation-settings: \'FILL\' 1;"'
        content = content.replace(icon_search, icon_replace)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected mobile nav and PWA manifest to all HTML files.")
