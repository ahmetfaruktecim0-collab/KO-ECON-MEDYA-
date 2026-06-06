const fs = require('fs');

let html = fs.readFileSync('hocalar.html', 'utf8');

const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>') + '</main>'.length;

const beforeMain = html.substring(0, mainStart);
const afterMain = html.substring(mainEnd);

const aiContent = `
<main class="flex-1 p-4 md:p-6 lg:ml-64 space-y-4 flex flex-col bg-[#F3F4F6] relative h-screen">
    <!-- Header -->
    <header class="flex justify-between items-center bg-surface p-4 rounded-2xl shadow-sm border border-outline-variant/20 shrink-0">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-md">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
            </div>
            <div>
                <h1 class="text-title-lg font-bold text-on-surface">Ekonomiste Sor</h1>
                <p class="text-body-sm text-secondary flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    KOÜ Econ Yapay Zeka Asistanı
                </p>
            </div>
        </div>
        <button onclick="clearChat()" class="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="Sohbeti Temizle">
            <span class="material-symbols-outlined">delete_sweep</span>
        </button>
    </header>

    <!-- Chat Container -->
    <div id="chat-container" class="flex-1 bg-surface rounded-2xl shadow-sm border border-outline-variant/20 p-4 md:p-6 overflow-y-auto custom-scrollbar flex flex-col space-y-4">
        <!-- Initial Message -->
        <div class="flex items-start gap-4 max-w-[85%]">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1">
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
            </div>
            <div class="bg-surface-container-low border border-outline-variant/20 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                <p class="text-on-surface text-sm md:text-base leading-relaxed">
                    Merhaba! Ben KOÜ Econ Asistan. İktisat, maliye, uluslararası ilişkiler veya Kocaeli Üniversitesi SBF hakkında bana istediğin soruyu sorabilirsin. Sana nasıl yardımcı olabilirim?
                </p>
            </div>
        </div>
    </div>

    <!-- Input Area -->
    <div class="bg-surface p-2 md:p-4 rounded-2xl shadow-sm border border-outline-variant/20 shrink-0 relative">
        <div id="api-key-warning" class="absolute -top-12 left-0 right-0 mx-auto w-fit bg-error/10 text-error text-xs font-bold px-4 py-2 rounded-full border border-error/20 flex items-center gap-2 hidden">
            <span class="material-symbols-outlined text-sm">warning</span>
            Lütfen app.js dosyasından Gemini API Key giriniz.
        </div>
        <form id="chat-form" class="flex gap-2" onsubmit="handleChatSubmit(event)">
            <input type="text" id="chat-input" class="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none placeholder:text-on-surface-variant/50" placeholder="İktisatla ilgili bir soru sorun..." autocomplete="off">
            <button type="submit" class="bg-primary hover:bg-primary-fixed text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-md shrink-0">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
            </button>
        </form>
    </div>
</main>
`;

let aiHtml = beforeMain + aiContent + afterMain;

// Change title
aiHtml = aiHtml.replace(/<title>.*?<\/title>/, '<title>Ekonomiste Sor - KOÜ Econ</title>');

// Change active nav
aiHtml = aiHtml.replace(/<a href="hocalar.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-primary-container text-primary font-bold transition-all">/, '<a href="hocalar.html" class="text-on-primary/70 hover:text-on-primary hover:bg-on-primary/5 mx-2 px-4 py-3 flex items-center space-x-3 transition-all">');

fs.writeFileSync('ekonomiste-sor.html', aiHtml, 'utf8');
console.log("ekonomiste-sor.html created");
