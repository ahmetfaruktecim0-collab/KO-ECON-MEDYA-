const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Restore the card to the sidebar
const cardHtml = `
<!-- Haftanın Hocası -->
<div class="bg-white rounded-2xl overflow-hidden shadow-md" id="haftanin-hocasi-card">
    <div class="bg-primary p-4 flex items-center justify-between">
        <h3 class="text-white font-title-md text-sm">Haftanın Hocası</h3>
        <span class="material-symbols-outlined text-white/50" style="font-variation-settings:'FILL' 1">stars</span>
    </div>
    <div id="voting-container" class="p-4">
        <!-- JS ile doldurulacak -->
        <div class="flex items-center justify-center py-8">
            <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
    </div>
</div>
`;

// Insert after Duyurular closing div, before Yaklaşan Etkinlikler
const duyurularEnd = html.indexOf('</div>\n</div>', html.indexOf('id="announcements-list"')) + 13;
if (duyurularEnd > 13) {
    html = html.substring(0, duyurularEnd) + cardHtml + html.substring(duyurularEnd);
}

// 2. Restore the Modal (with Google Auth)
const modalHtml = `
<!-- Survey Modal (ESKİ SİSTEM - GOOGLE AUTH) -->
<div id="survey-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div class="bg-surface rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button onclick="closeVotingModal()" class="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">how_to_vote</span>
        </div>
        <h2 class="text-2xl font-bold text-center text-on-surface mb-2">Haftanın Hocası</h2>
        <p class="text-sm text-center text-secondary mb-6">Oyunuzu kullanmak için güvenli giriş yapın.</p>
        
        <form id="vote-form" class="space-y-4">
            <!-- User Info (Hidden until logged in) -->
            <div id="auth-user-info" class="hidden items-center justify-center gap-3 p-3 bg-surface-container-low rounded-xl mb-4">
                <img id="auth-user-img" src="" class="w-8 h-8 rounded-full border border-primary/20">
                <div class="text-left">
                    <p id="auth-user-name" class="text-xs font-bold text-on-surface"></p>
                    <p id="auth-user-email" class="text-[10px] text-secondary"></p>
                </div>
                <button type="button" onclick="handleSignOut()" class="ml-auto text-[10px] text-error hover:underline">Çıkış</button>
            </div>

            <!-- Login Button (Shown initially) -->
            <button type="button" id="google-login-btn" onclick="handleGoogleLogin()" class="w-full bg-white border border-outline-variant/30 text-on-surface font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-3">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5">
                Öğrenci Maili ile Giriş Yap
            </button>

            <!-- Voting Area (Hidden until logged in) -->
            <div id="voting-inputs" class="hidden space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-1 text-on-surface">Hoca Seçiniz</label>
                    <select id="voter-selection" required class="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all appearance-none">
                        <option value="" disabled selected>Listeden seçin...</option>
                    </select>
                </div>
                <button type="submit" id="vote-submit-btn" class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all">Oyumu Gönder</button>
            </div>
        </form>
        
        <div class="mt-6 border-t border-outline-variant/20 pt-6">
            <h3 class="text-lg font-bold text-center mb-4">Mevcut Durum (Sıralama)</h3>
            <div id="vote-results" class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                <div class="text-center text-sm text-outline animate-pulse">Sonuçlar yükleniyor...</div>
            </div>
        </div>
    </div>
</div>
`;

// Insert modal before closing body
html = html.replace('</body></html>', modalHtml + '\n</body></html>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Restored Haftanın Hocası UI to index.html");
