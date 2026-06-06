const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const bottomNav = `
<!-- Mobile Bottom Navigation -->
<nav class="lg:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant/20 flex justify-around items-center pb-[env(safe-area-inset-bottom,16px)] pt-2 px-1 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] overflow-x-auto">
    <a href="index.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]">
        <span class="material-symbols-outlined" id="nav-icon-index">newspaper</span>
        <span class="text-[9px] font-bold mt-1">Gündem</span>
    </a>
    <a href="duyurular.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]">
        <span class="material-symbols-outlined" id="nav-icon-duyurular">campaign</span>
        <span class="text-[9px] font-bold mt-1">Duyurular</span>
    </a>
    <a href="sosyal-kose.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]">
        <span class="material-symbols-outlined" id="nav-icon-sosyal-kose">group</span>
        <span class="text-[9px] font-bold mt-1">Sosyal</span>
    </a>
    <a href="hocalar.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]">
        <span class="material-symbols-outlined" id="nav-icon-hocalar">school</span>
        <span class="text-[9px] font-bold mt-1">Kadro</span>
    </a>
    <a href="iktisatcinin-kaleminden.html" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]">
        <span class="material-symbols-outlined" id="nav-icon-iktisatcinin-kaleminden">menu_book</span>
        <span class="text-[9px] font-bold mt-1 text-center leading-tight">Yazılar</span>
    </a>
</nav>
<style>
@media (max-width: 1024px) { body { padding-bottom: 80px; } }
/* Hide scrollbar for nav */
nav.lg\\:hidden::-webkit-scrollbar { display: none; }
nav.lg\\:hidden { -ms-overflow-style: none; scrollbar-width: none; }
</style>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // First remove the old mobile nav if it exists
    if (content.includes('<!-- Mobile Bottom Navigation -->')) {
        const startIdx = content.indexOf('<!-- Mobile Bottom Navigation -->');
        const endIdx = content.indexOf('</style>', startIdx) + 8;
        if (endIdx > 8) {
            content = content.substring(0, startIdx) + content.substring(endIdx);
        }
    }

    // Now inject the new one with proper UTF-8 encoded text
    content = content.replace('</body>', bottomNav + '\n</body>');

    const basename = file.split('.')[0];
    
    // Set active class
    const searchPattern = `href="${file}" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]"`;
    const replacePattern = `href="${file}" class="flex flex-col items-center p-2 text-primary min-w-[60px]"`;
    content = content.replace(searchPattern, replacePattern);

    // Set active icon fill
    const iconSearch = `id="nav-icon-${basename}"`;
    const iconReplace = `id="nav-icon-${basename}" style="font-variation-settings: 'FILL' 1;"`;
    content = content.replace(iconSearch, iconReplace);

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Injected updated mobile nav with proper UTF-8 to all HTML files.");
