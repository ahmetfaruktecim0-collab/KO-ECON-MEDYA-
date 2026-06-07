const fs = require('fs');
const path = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\oyun.html';
let content = fs.readFileSync(path, 'utf8');

const injectionTarget = `<h1 class="text-title-lg font-bold text-on-surface">Statecraft: Trkiye</h1>`;

const newFeatureHTML = `<h1 class="text-title-lg font-bold text-on-surface">Statecraft: Türkiye</h1>
            <div class="mt-2 flex gap-2">
                <a href="merkez-bankasi.html" class="inline-flex items-center gap-1 bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors border border-primary/20">
                    <span class="material-symbols-outlined text-[14px]">account_balance</span>
                    YENİ: Merkez Bankası Benim!
                </a>
            </div>`;

if (content.includes(injectionTarget)) {
    content = content.replace(injectionTarget, newFeatureHTML);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Başarıyla oyun sayfasına link eklendi.");
} else {
    console.log("Hedef bulunamadı.");
}
