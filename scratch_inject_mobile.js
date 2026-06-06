const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const manifestTag = `\n<link rel="manifest" href="manifest.json">\n<meta name="theme-color" content="#004d27">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;

const bottomNav = `
<!-- Mobile Bottom Navigation -->
<nav class="lg:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant/20 flex justify-around items-center pb-[env(safe-area-inset-bottom,16px)] pt-2 px-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
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
@media (max-width: 1024px) { body { padding-bottom: 80px; } }
</style>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('<link rel="manifest"')) {
        content = content.replace('</title>', '</title>' + manifestTag);
    }
    
    if (!content.includes('<!-- Mobile Bottom Navigation -->')) {
        content = content.replace('</body>', bottomNav + '\n</body>');
    }

    const basename = file.split('.')[0];
    
    // Reset classes
    content = content.replace(/class="flex flex-col items-center p-2 text-primary"/g, 'class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors"');
    content = content.replace(/style="font-variation-settings: 'FILL' 1;"/g, '');

    // Set active class
    const searchPattern = `href="${file}" class="flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors"`;
    const replacePattern = `href="${file}" class="flex flex-col items-center p-2 text-primary"`;
    content = content.replace(searchPattern, replacePattern);

    // Set active icon fill
    const iconSearch = `id="nav-icon-${basename}"`;
    const iconReplace = `id="nav-icon-${basename}" style="font-variation-settings: 'FILL' 1;"`;
    content = content.replace(iconSearch, iconReplace);

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Injected mobile nav and PWA manifest to all HTML files.");
