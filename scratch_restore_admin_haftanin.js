const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 1. Add "Oyları İncele" button and stats card back to the Admin Dashboard
const adminCard = `
    <!-- Haftanın Hocası Stats -->
    <div class="bg-surface rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-on-surface font-bold">Haftanın Hocası</h3>
            <span class="material-symbols-outlined text-orange-500">how_to_vote</span>
        </div>
        <div class="mb-4">
            <p class="text-3xl font-black text-on-surface" id="total-votes-count">0</p>
            <p class="text-xs text-secondary">Toplam Kullanılan Oy</p>
        </div>
        <button onclick="viewVotes()" class="w-full py-2.5 bg-primary/10 text-primary font-bold rounded-xl text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-base">visibility</span> Oyları İncele
        </button>
    </div>
`;

// Insert it into the Quick Stats Grid (which has other stats like "Günün Menüsü")
// Let's insert it at the end of the top stats grid.
const gridEnd = html.indexOf('</div>\n        <!-- Editor\'s Pick -->');
if (gridEnd > -1) {
    // Actually, "Bize Katıl Başvuruları" card is in the top grid. Let's find it.
    const bizeKatilCard = html.indexOf('<!-- Bize Katıl Başvuruları Stats -->');
    if (bizeKatilCard > -1) {
        html = html.substring(0, bizeKatilCard) + adminCard + '\n' + html.substring(bizeKatilCard);
    }
}

// 2. Add Modal for Votes
const modalHtml = `
<!-- Admin Votes Modal -->
<div id="admin-votes-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div class="bg-surface rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] flex flex-col">
        <button onclick="closeVotesModal()" class="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        <h2 class="text-2xl font-bold text-center text-on-surface mb-2">Oy Verenler Listesi</h2>
        <p class="text-sm text-center text-secondary mb-6">Sadece yetkililer görebilir. (Google Auth Kontrollü)</p>
        
        <div class="overflow-y-auto custom-scrollbar flex-1 pr-2">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-outline-variant/30 text-xs text-secondary uppercase tracking-wider">
                        <th class="py-3 px-4">Öğrenci (Mail)</th>
                        <th class="py-3 px-4">Seçtiği Hoca</th>
                        <th class="py-3 px-4 text-right">Tarih</th>
                    </tr>
                </thead>
                <tbody id="admin-votes-table-body" class="text-sm">
                    <tr><td colspan="3" class="text-center py-4">Yükleniyor...</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`;

html = html.replace('</body></html>', modalHtml + '\n</body></html>');

// 3. Add JS for fetching votes
const adminJs = `
import { collection, onSnapshot, orderBy, query } from './firebase-config.js';

window.viewVotes = function() {
    const modal = document.getElementById('admin-votes-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeVotesModal = function() {
    const modal = document.getElementById('admin-votes-modal');
    if (modal) modal.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('admin-votes-table-body');
    const totalCountEl = document.getElementById('total-votes-count');
    
    if (tbody) {
        const q = query(collection(db, 'haftanin_hocasi_oylari'), orderBy('timestamp', 'desc'));
        onSnapshot(q, snapshot => {
            if(totalCountEl) totalCountEl.innerText = snapshot.size;
            
            tbody.innerHTML = '';
            if(snapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="3" class="text-center py-4">Henüz oy yok.</td></tr>';
                return;
            }
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const dateStr = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString('tr-TR', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'}) : 'Yeni';
                
                tbody.innerHTML += \`
                    <tr class="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <td class="py-3 px-4">
                            <div class="font-bold text-on-surface">\${data.voterName || 'İsimsiz'}</div>
                            <div class="text-[10px] text-secondary">\${data.voterEmail || 'Mail yok'}</div>
                        </td>
                        <td class="py-3 px-4 font-semibold text-primary">\${data.professorName}</td>
                        <td class="py-3 px-4 text-right text-xs text-secondary">\${dateStr}</td>
                    </tr>
                \`;
            });
        });
    }
});
`;

// Insert adminJs into the script module
html = html.replace("import { db, collection, query, orderBy, getDocs, onSnapshot, deleteDoc, doc } from './firebase-config.js';", "import { db, collection, query, orderBy, getDocs, onSnapshot, deleteDoc, doc } from './firebase-config.js';\n" + adminJs);

fs.writeFileSync('admin.html', html, 'utf8');
console.log("Restored Admin Panel for Haftanın Hocası");
