const fs = require('fs');
let adminHtml = fs.readFileSync('admin.html', 'utf8');

const regex = /window\.viewVotes = async function\(\) \{[\s\S]*?window\.closeVotesModal = function\(\) \{/g;
const newCode = `window.viewVotes = async function() {
    const modal = document.getElementById('admin-votes-modal');
    const list = document.getElementById('admin-votes-list');
    
    modal.classList.remove('hidden');
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
        const { db, collection, getDocs, query, orderBy } = await import('./firebase-config.js');
        const q = query(collection(db, 'haftanin_hocasi_oylari'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        
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
        list.innerHTML = '<div class="text-center py-8 text-error font-bold">Veriler çekilirken bir hata oluştu: ' + err.message + '</div>';
    }
};

window.closeVotesModal = function() {`;

adminHtml = adminHtml.replace(regex, newCode);
fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log("admin.html fixed");
