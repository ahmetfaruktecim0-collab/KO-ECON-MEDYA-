const fs = require('fs');
const path = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\index.html';
let content = fs.readFileSync(path, 'utf8');

const injectionTarget = `<!-- Yaklaşan Etkinlikler -->`;

const newFeatureHTML = `<!-- Haftanın Vizyonu (Film & Kitap) -->
<div class="bg-gradient-to-br from-surface-container-highest to-surface p-card-padding rounded-2xl shadow-sm border border-primary/20 relative overflow-hidden group mb-8">
    <div class="absolute -right-6 -top-6 text-primary opacity-5 group-hover:scale-110 transition-transform duration-700">
        <span class="material-symbols-outlined text-[120px]" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
    </div>
    <div class="relative z-10">
        <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">movie</span>
            <h3 class="font-title-md text-title-md text-primary font-bold">Haftanın Vizyonu</h3>
        </div>

        <!-- Kitap Önerisi -->
        <div class="mb-6 bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/50 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex gap-4">
                <div class="w-16 h-20 bg-primary/10 rounded-lg flex-shrink-0 overflow-hidden shadow-inner border border-primary/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-3xl">menu_book</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">KİTAP</span>
                    <h4 class="font-bold text-on-surface text-sm mb-1 leading-tight">Ulusların Düşüşü</h4>
                    <p class="text-xs text-on-surface-variant line-clamp-2">Daron Acemoğlu ve James A. Robinson'un başyapıtı. Kurumların ekonomik kalkınmadaki rolünü mükemmel açıklıyor.</p>
                </div>
            </div>
        </div>

        <!-- Film Önerisi -->
        <div class="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/50 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex gap-4">
                <div class="w-16 h-20 bg-error/10 rounded-lg flex-shrink-0 overflow-hidden shadow-inner border border-error/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-error text-3xl">theaters</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">FİLM</span>
                    <h4 class="font-bold text-on-surface text-sm mb-1 leading-tight">The Big Short (Büyük Açık)</h4>
                    <p class="text-xs text-on-surface-variant line-clamp-2">2008 Küresel Finans Krizi'nin perde arkasını anlatan harika bir film.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Yaklaşan Etkinlikler -->`;

if (content.includes(injectionTarget)) {
    content = content.replace(injectionTarget, newFeatureHTML);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Başarıyla eklendi.");
} else {
    console.log("Hedef bulunamadı.");
}
