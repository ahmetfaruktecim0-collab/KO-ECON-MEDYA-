const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const desktopLogoHtml = `
<div class="px-6 mb-8 flex flex-col items-start justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95" onclick="window.location.href='index.html'">
    <img src="assets/logo.png" alt="KOÜ Econ Medya" class="w-56 h-auto" style="mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
</div>
`;

const mobileLogoHtml = `
<div class="flex items-center gap-3 lg:hidden">
    <button onclick="document.getElementById('mobile-drawer')?.classList.remove('-translate-x-full')" class="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
        <span class="material-symbols-outlined">menu</span>
    </button>
    <a href="index.html" class="flex items-center">
        <img src="assets/logo.png" alt="KOÜ Econ Medya" class="h-10 w-auto" style="filter: invert(1); mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
    </a>
</div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace desktop logo
    // It currently matches: <div class="px-6 mb-8 flex flex-col items-start justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95" onclick="window.location.href='index.html'"> [newline] <img ... </div>
    const desktopSearch = /<div class="px-6 mb-8 flex flex-col items-start justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95" onclick="window\.location\.href='index\.html'">\s*<img[^>]+>\s*<\/div>/;
    if(desktopSearch.test(content)) {
        content = content.replace(desktopSearch, desktopLogoHtml.trim());
    }

    // Replace mobile logo
    const mobileSearch = /<div class="flex items-center gap-3 lg:hidden">\s*<button[^>]+>[\s\S]*?<\/button>\s*<a href="index\.html" class="flex items-center">\s*<img[^>]+>\s*<\/a>\s*<\/div>/;
    if(mobileSearch.test(content)) {
        content = content.replace(mobileSearch, mobileLogoHtml.trim());
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Updated logo integration in all HTML files.");
