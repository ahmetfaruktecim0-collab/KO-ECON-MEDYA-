const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Desktop Sidebar Replacement
    // The previous injected desktop logo was:
    // <img src="assets/logo.png" alt="KOÜ Econ Medya" class="w-56 h-auto" style="filter: invert(1); mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
    const desktopSearch = /<img src="assets\/logo\.png" alt="KOÜ Econ Medya" class="w-56 h-auto" style="[^"]*">/g;
    content = content.replace(desktopSearch, '<img src="assets/logo.svg" alt="KOÜ Econ Medya" class="w-56 h-auto" style="filter: brightness(0) invert(1);">');

    // Mobile Header Replacement
    // The previous mobile logo was:
    // <img src="assets/logo.png" alt="KOÜ Econ Medya" class="h-10 w-auto" style="mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
    const mobileSearch = /<img src="assets\/logo\.png" alt="KOÜ Econ Medya" class="h-10 w-auto"[^>]*>/g;
    content = content.replace(mobileSearch, '<img src="assets/logo.svg" alt="KOÜ Econ Medya" class="h-10 w-auto">');

    // Poster Replacement
    // The previous poster logo was:
    // <img src="assets/logo.png" alt="KOÜ Econ Medya" class="w-full" style="filter: invert(1); mix-blend-mode: screen; image-rendering: crisp-edges;">
    const posterSearch = /<img src="assets\/logo\.png" alt="KOÜ Econ Medya" class="w-full"[^>]*>/g;
    content = content.replace(posterSearch, '<img src="assets/logo.svg" alt="KOÜ Econ Medya" class="w-full" style="filter: brightness(0) invert(1);">');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("SVG logo integrated perfectly in all HTML files.");
