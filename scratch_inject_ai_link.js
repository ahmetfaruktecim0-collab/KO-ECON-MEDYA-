const fs = require('fs');
const path = require('path');

const targetDir = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'playground', 'prismic-whirlpool', 'sbf-hub');
const filesToProcess = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

filesToProcess.forEach(filename => {
    const filepath = path.join(targetDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Desktop Nav Addition
    // Look for the Oyun link block and insert AI link after it
    const oyunDesktopPattern = /<a[^>]*href="oyun\.html"[^>]*>[\s\S]*?sports_esports[\s\S]*?<\/a>/i;
    
    const aiDesktopLink = `
<a class="${filename === 'ekonomiste-sor.html' ? 'bg-on-primary/10 text-on-primary rounded-lg mx-2 px-4 py-3 flex items-center space-x-3 transition-all translate-x-1' : 'text-on-primary/70 hover:text-on-primary hover:bg-on-primary/5 mx-2 px-4 py-3 flex items-center space-x-3 transition-all'}" href="ekonomiste-sor.html" >
<span class="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span class="font-title-md text-title-md">Ekonomiste Sor</span>
</a>`;

    if (!content.includes('href="ekonomiste-sor.html"')) {
        content = content.replace(oyunDesktopPattern, match => match + '\n' + aiDesktopLink);
    }

    // 2. Mobile Nav Addition (if applicable)
    // The mobile nav has "iktisatcinin-kaleminden" usually as the last or near last.
    // Let's insert after "iktisatcinin-kaleminden.html"
    const iktisatMobilePattern = /<a[^>]*href="iktisatcinin-kaleminden\.html"[^>]*>[\s\S]*?menu_book[\s\S]*?<\/a>/i;
    const aiMobileLink = `
<a href="ekonomiste-sor.html" class="${filename === 'ekonomiste-sor.html' ? 'flex flex-col items-center p-2 text-primary min-w-[60px]' : 'flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]'}">
    <span class="material-symbols-outlined" id="nav-icon-ai" ${filename === 'ekonomiste-sor.html' ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>smart_toy</span>
    <span class="text-[9px] font-bold mt-1 text-center leading-tight">Yapay Zeka</span>
</a>`;

    if (!content.includes('id="nav-icon-ai"')) {
        content = content.replace(iktisatMobilePattern, match => match + '\n' + aiMobileLink);
    }

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Injected AI links in all HTML files.");
