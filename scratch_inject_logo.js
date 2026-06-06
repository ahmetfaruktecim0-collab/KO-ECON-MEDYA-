const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// The new logo HTML
const desktopLogoHtml = `
<div class="px-6 mb-8 flex flex-col items-start justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95" onclick="window.location.href='index.html'">
    <img src="assets/logo.png" alt="KOÜ Econ Medya" class="w-48 h-auto rounded-lg shadow-lg border border-white/10" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
</div>
`;

const mobileLogoHtml = `
<div class="flex items-center gap-3 lg:hidden">
    <button onclick="document.getElementById('mobile-drawer')?.classList.remove('-translate-x-full')" class="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
        <span class="material-symbols-outlined">menu</span>
    </button>
    <a href="index.html" class="flex items-center">
        <img src="assets/logo.png" alt="KOÜ Econ Medya" class="h-10 w-auto rounded shadow-sm">
    </a>
</div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace desktop logo
    const desktopSearch = /<div class="px-6 mb-8 flex items-center space-x-3">[\s\S]*?<\/div>\s*<\/div>/;
    if(desktopSearch.test(content)) {
        content = content.replace(desktopSearch, desktopLogoHtml.trim());
    }

    // Replace mobile logo
    const mobileSearch = /<div class="flex items-center gap-3 lg:hidden">[\s\S]*?<\/div>/;
    if(mobileSearch.test(content)) {
        content = content.replace(mobileSearch, mobileLogoHtml.trim());
    } else {
        // Fallback for files that don't have the exact mobile structure yet
        const oldMobileSearch = /<div class="flex flex-col lg:hidden">\s*<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">KOÜ Econ<\/h2>\s*<\/div>/;
        if(oldMobileSearch.test(content)) {
            content = content.replace(oldMobileSearch, `
            <div class="flex flex-col lg:hidden">
                <a href="index.html">
                    <img src="assets/logo.png" alt="KOÜ Econ Medya" class="h-10 w-auto rounded shadow-sm">
                </a>
            </div>
            `.trim());
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Updated logo in all HTML files.");
