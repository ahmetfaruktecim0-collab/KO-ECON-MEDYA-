const fs = require('fs');

let adminHtml = fs.readFileSync('admin.html', 'utf8');

// 1. Inject the "Başvuruları İncele" button
const btnSearch = '<button onclick="viewVotes()" class="mt-4 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2">';
const insertIdx = adminHtml.indexOf(btnSearch);

if (insertIdx !== -1 && !adminHtml.includes('viewApplications()')) {
    const newBtn = `
    <button onclick="viewApplications()" class="mt-2 w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[16px]">group_add</span> Bize Katıl Başvuruları
    </button>
    `;
    adminHtml = adminHtml.substring(0, insertIdx) + newBtn + adminHtml.substring(insertIdx);
}

// 2. Inject the Modal and JS logic before </body>
const modalAndJS = `
<!-- Admin Applications Modal -->
<div id="admin-apps-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
    <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl transform scale-95 transition-transform duration-300">
        <div class="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-500/10 text-blue-600 flex items-center justify-center rounded-xl">
                    <span class="material-symbols-outlined">group_add</span>
                </div>
                <div>
                    <h3 class="font-bold text-lg text-on-surface">Bize Katıl Başvuruları</h3>
                    <p class="text-xs text-secondary">Econ Medya Ekibi Adayları</p>
                </div>
            </div>
            <button onclick="closeAppsModal()" class="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition-colors text-on-surface-variant">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 custom-scrollbar" id="admin-apps-list">
            <div class="text-center py-8">
                <span class="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
                <p class="mt-2 text-sm text-secondary font-bold">Veriler çekiliyor...</p>
            </div>
        </div>
    </div>
</div>

<script>
window.viewApplications = async function() {
    const modal = document.getElementById('admin-apps-modal');
    const list = document.getElementById('admin-apps-list');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('.bg-white').classList.remove('scale-95');
    }, 10);

    list.innerHTML = \`
        <div class="text-center py-8">
            <span class="material-symbols-outlined animate-spin text-blue-500 text-3xl">refresh</span>
            <p class="mt-2 text-sm text-secondary font-bold">Veriler çekiliyor...</p>
        </div>
    \`;

    try {
        const { db, collection, getDocs, query, orderBy } = await import('./firebase-config.js');
        const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if(snapshot.empty) {
            list.innerHTML = '<div class="text-center py-8 text-secondary font-bold">Henüz başvuru yok.</div>';
            return;
        }

        let html = '<div class="space-y-4">';

        snapshot.forEach(doc => {
            const data = doc.data();
            const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleString('tr-TR', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'}) : 'Az Önce';
            
            html += \`
                <div class="bg-surface-container-low border border-outline-variant/20 p-4 rounded-2xl">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-on-surface text-base">\${data.name}</h4>
                        <span class="text-[10px] text-secondary font-bold">\${dateStr}</span>
                    </div>
                    <p class="text-sm text-secondary mb-3">\${data.about}</p>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-wider">Tasarım Bilgisi: \${data.designSkillLevel}/10</span>
                        \${data.status === 'pending' ? '<span class="text-[10px] font-bold text-orange-600 bg-orange-500/10 px-2 py-1 rounded-md uppercase tracking-wider">Beklemede</span>' : ''}
                    </div>
                </div>
            \`;
        });

        html += '</div>';
        list.innerHTML = html;

    } catch(err) {
        console.error(err);
        list.innerHTML = '<div class="text-center py-8 text-error font-bold">Veriler çekilirken bir hata oluştu: ' + err.message + '</div>';
    }
};

window.closeAppsModal = function() {
    const modal = document.getElementById('admin-apps-modal');
    modal.classList.add('opacity-0');
    modal.querySelector('.bg-white').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};
</script>
`;

if (!adminHtml.includes('admin-apps-modal')) {
    adminHtml = adminHtml.replace('</body>', modalAndJS + '\n</body>');
    fs.writeFileSync('admin.html', adminHtml, 'utf8');
    console.log("Admin apps panel injected.");
} else {
    console.log("Admin apps panel already exists.");
}
