const fs = require('fs');

let adminHtml = fs.readFileSync('admin.html', 'utf8');

// 1. Inject the "Oyları İncele" button into the Haftanın Hocası card.
// We will search for id="dash-teacher" and append the button right after its parent <div> closes.
const dashTeacherIndex = adminHtml.indexOf('id="dash-teacher"');
if (dashTeacherIndex !== -1) {
    const endDivIndex = adminHtml.indexOf('</div>', dashTeacherIndex) + 6;
    
    const buttonHtml = `
    <button onclick="viewVotes()" class="mt-4 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[16px]">visibility</span> Oyları İncele
    </button>
    `;
    
    // Check if we already injected it
    if (!adminHtml.includes('viewVotes()')) {
        adminHtml = adminHtml.substring(0, endDivIndex) + buttonHtml + adminHtml.substring(endDivIndex);
    }
}

// 2. Inject the Modal and JS logic before </body>
const modalAndJS = `
<!-- Admin Votes Modal -->
<div id="admin-votes-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
    <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl transform scale-95 transition-transform duration-300">
        <div class="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
                    <span class="material-symbols-outlined">how_to_vote</span>
                </div>
                <div>
                    <h3 class="font-bold text-lg text-on-surface">Anket Detayları</h3>
                    <p class="text-xs text-secondary">Oy verenlerin listesi (Gizli Veri)</p>
                </div>
            </div>
            <button onclick="closeVotesModal()" class="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition-colors text-on-surface-variant">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 custom-scrollbar" id="admin-votes-list">
            <div class="text-center py-8">
                <span class="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
                <p class="mt-2 text-sm text-secondary font-bold">Veriler çekiliyor...</p>
            </div>
        </div>
    </div>
</div>

<script>
window.viewVotes = async function() {
    const modal = document.getElementById('admin-votes-modal');
    const list = document.getElementById('admin-votes-list');
    
    modal.classList.remove('hidden');
    // small delay for transition
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('.bg-white').classList.remove('scale-95');
    }, 10);

    list.innerHTML = \`
        <div class="text-center py-8">
            <span class="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
            <p class="mt-2 text-sm text-secondary font-bold">Veriler çekiliyor...</p>
        </div>
    \`;

    try {
        const snapshot = await db.collection('haftanin_hocasi_oylari').orderBy('timestamp', 'desc').get();
        if(snapshot.empty) {
            list.innerHTML = '<div class="text-center py-8 text-secondary font-bold">Henüz oy kullanılmadı.</div>';
            return;
        }

        let html = \`
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-outline-variant/20">
                        <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Tarih</th>
                        <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Öğrenci (Oy Veren)</th>
                        <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-secondary font-bold">Oylanan Hoca</th>
                    </tr>
                </thead>
                <tbody>
        \`;

        snapshot.forEach(doc => {
            const data = doc.data();
            const dateStr = data.timestamp ? data.timestamp.toDate().toLocaleString('tr-TR', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'}) : 'Az Önce';
            
            html += \`
                <tr class="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors">
                    <td class="py-3 px-4 text-xs text-secondary font-medium">\${dateStr}</td>
                    <td class="py-3 px-4 text-sm font-bold text-on-surface">\${data.voterName}</td>
                    <td class="py-3 px-4 text-sm text-primary font-bold">\${data.professorName}</td>
                </tr>
            \`;
        });

        html += '</tbody></table>';
        list.innerHTML = html;

    } catch(err) {
        console.error(err);
        list.innerHTML = '<div class="text-center py-8 text-error font-bold">Veriler çekilirken bir hata oluştu.</div>';
    }
};

window.closeVotesModal = function() {
    const modal = document.getElementById('admin-votes-modal');
    modal.classList.add('opacity-0');
    modal.querySelector('.bg-white').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};
</script>
`;

if (!adminHtml.includes('admin-votes-modal')) {
    adminHtml = adminHtml.replace('</body>', modalAndJS + '\n</body>');
    fs.writeFileSync('admin.html', adminHtml, 'utf8');
    console.log("Admin votes panel injected.");
} else {
    console.log("Admin votes panel already exists.");
}
