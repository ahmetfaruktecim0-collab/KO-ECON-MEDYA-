const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const regex = /function initVoting\(\) \{[\s\S]*?window\.castVote = async function\(profName, btnElement\) \{[\s\S]*?\} catch\(error\) \{[\s\S]*?\}[\s\S]*?\};/g;

const newCode = `async function initVoting() {
    const container = document.getElementById('voting-container');
    if (!container) return;
    if (typeof professorsData === 'undefined') return;

    const now = new Date();
    // HER CUMA GÖZÜKSÜN: Sadece 5 (Cuma) ise kazananı göster, değilse oy verdir.
    // Ancak test amaçlı her gün kazananı görmek için isFriday = true yapabiliriz.
    // Şimdilik normal mantıkta bırakıyoruz.
    const dayOfWeek = now.getDay(); 
    const weekKey = 'votes_week_' + now.getFullYear() + '_' + getWeekNumber(now);

    const savedWeekKey = localStorage.getItem('votes_current_week');
    if (savedWeekKey !== weekKey) {
        localStorage.removeItem('has_voted_this_week');
        localStorage.setItem('votes_current_week', weekKey);
    }

    const hasVoted = !!localStorage.getItem('has_voted_this_week');
    const isFriday = dayOfWeek === 5; // Cuma günü
    const nominees = professorsData;

    try {
        const { db, collection, onSnapshot } = await import('./firebase-config.js');
        
        onSnapshot(collection(db, 'haftanin_hocasi_oylari'), snapshot => {
            let votes = {};
            let totalVotes = 0;
            
            snapshot.forEach(doc => {
                const data = doc.data();
                if(data.professorName) {
                    votes[data.professorName] = (votes[data.professorName] || 0) + 1;
                    totalVotes++;
                }
            });

            window.currentGlobalVotes = votes;
            window.currentGlobalTotalVotes = totalVotes;

            if (isFriday) {
                let winner = nominees[0];
                nominees.forEach(p => {
                    if ((votes[p.name] || 0) > (votes[winner.name] || 0)) winner = p;
                });
                const winnerVotes = votes[winner.name] || 0;
                const winnerPct = totalVotes > 0 ? Math.round(winnerVotes / totalVotes * 100) : 0;
                const imgSrc = winner.img || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(winner.name)}&background=006837&color=fff\`;

                container.innerHTML = \`
                    <div class="flex flex-col items-center text-center p-4">
                        <div class="relative mb-4 inline-block">
                            <div class="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden shadow-lg mx-auto">
                                <img class="w-full h-full object-cover object-top" src="\${imgSrc}" alt="\${winner.name}"
                                     onerror="this.src='https://ui-avatars.com/api/?name=\${encodeURIComponent(winner.name)}&background=006837&color=fff'">
                            </div>
                            <span class="absolute -top-1 -right-1 text-2xl">🏆</span>
                        </div>
                        <span class="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1">Bu Haftanın Hocası</span>
                        <h4 class="font-bold text-on-surface text-sm leading-tight mb-0.5">\${winner.title} \${winner.name}</h4>
                        <p class="text-xs text-primary font-bold mb-3">\${winner.dept}</p>
                        <div class="w-full bg-surface-container rounded-full h-2 mb-1">
                            <div class="bg-yellow-400 h-2 rounded-full" style="width:\${winnerPct}%"></div>
                        </div>
                        <p class="text-[10px] text-secondary mb-4"><strong class="text-primary">\${winnerVotes}</strong> oy aldı · \${totalVotes} toplam</p>
                        <span class="text-[10px] text-secondary/60 italic">Yeni oylama Pazartesi başlayacak</span>
                    </div>
                \`;
            } else {
                let topProf = nominees[0];
                nominees.forEach(p => {
                    if ((votes[p.name] || 0) > (votes[topProf.name] || 0)) topProf = p;
                });
                const topImg = topProf.img || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(topProf.name)}&background=006837&color=fff\`;

                container.innerHTML = \`
                    <div class="flex flex-col items-center text-center p-4">
                        <div class="w-20 h-20 rounded-full border-4 border-primary-fixed overflow-hidden shadow-md mb-3 mx-auto">
                            <img class="w-full h-full object-cover object-top" src="\${topImg}" alt="\${topProf.name}"
                                 onerror="this.src='https://ui-avatars.com/api/?name=\${encodeURIComponent(topProf.name)}&background=006837&color=fff'">
                        </div>
                        <p class="text-[10px] text-secondary uppercase tracking-widest mb-1 font-bold">\${hasVoted ? '🗳️ Oyunuzu kullandınız' : '🗳️ Bu haftanın hocasını seç'}</p>
                        <h4 class="text-sm font-bold text-on-surface mb-0.5">\${topProf.title} \${topProf.name}</h4>
                        <p class="text-[10px] text-secondary mb-1">\${totalVotes} oy kullanıldı · Sonuçlar Cuma</p>
                        <button \${hasVoted ? 'disabled' : ''} onclick="openVotingModal()"
                            class="mt-3 w-full py-2.5 \${hasVoted ? 'bg-surface-container text-outline cursor-not-allowed' : 'bg-primary hover:opacity-90 text-white cursor-pointer active:scale-95'} font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2">
                            <span class="material-symbols-outlined text-base">how_to_vote</span>
                            <span>\${hasVoted ? 'Oy Kullandınız' : 'Oy Kullan'}</span>
                        </button>
                    </div>
                \`;
            }
        });
    } catch(e) {
        console.error("Firebase yüklenirken hata:", e);
    }
}

window.openVotingModal = function() {
    if (document.getElementById('voting-modal')) return;

    const nominees = typeof professorsData !== 'undefined' ? professorsData : [];
    const votes = window.currentGlobalVotes || {};
    const totalVotes = window.currentGlobalTotalVotes || 0;

    let listHTML = '';
    nominees.forEach(prof => {
        const imgSrc = prof.img || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(prof.name)}&background=006837&color=fff\`;
        const v = votes[prof.name] || 0;
        const pct = totalVotes > 0 ? Math.round(v / totalVotes * 100) : 0;
        const safeName = prof.name.replace(/'/g, "\\\\'");

        listHTML += \`
        <div class="flex items-center space-x-3 p-3 rounded-xl hover:bg-surface-container transition-colors group">
            <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/10 shadow-sm">
                <img class="w-full h-full object-cover object-top" src="\${imgSrc}" alt="\${prof.name}"
                     onerror="this.src='https://ui-avatars.com/api/?name=\${encodeURIComponent(prof.name)}&background=006837&color=fff'">
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-on-surface truncate">\${prof.title} \${prof.name}</p>
                <p class="text-[10px] text-secondary mb-1">\${prof.dept}</p>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-surface-container rounded-full h-1.5">
                        <div class="bg-primary h-1.5 rounded-full transition-all duration-500" style="width:\${pct}%"></div>
                    </div>
                    <span class="text-[10px] text-secondary font-bold w-8 text-right">\${v} oy</span>
                </div>
            </div>
            <button onclick="castVote('\${safeName}', this)"
                class="flex-shrink-0 bg-primary text-white text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">
                Oy Ver
            </button>
        </div>\`;
    });

    const modal = document.createElement('div');
    modal.id = 'voting-modal';
    modal.className = 'fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4';
    modal.innerHTML = \`
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeVotingModal()"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col z-10">
            <div class="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
                <div>
                    <h3 class="font-bold text-on-surface text-base">Haftanın Hocasını Seç</h3>
                    <p class="text-[10px] text-secondary">İsimler yayınlanmaz, sadece sayım içindir.</p>
                </div>
                <button onclick="closeVotingModal()" class="p-2 rounded-lg hover:bg-surface-container transition-colors">
                    <span class="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
            </div>
            
            <div class="px-5 py-3 border-b border-outline-variant/10 bg-surface-container-lowest">
                <label class="block text-xs font-bold text-primary mb-1">Ad Soyad (Güvenlik İçin Zorunlu)</label>
                <input type="text" id="modal-voter-name" required placeholder="Örn: Ahmet Yılmaz" class="w-full bg-white border border-outline-variant/50 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all shadow-inner">
            </div>

            <div class="overflow-y-auto flex-1 px-3 py-2 custom-scrollbar">
                \${listHTML}
            </div>
            <div class="px-5 py-3 border-t border-outline-variant/10 text-center bg-surface-container-lowest rounded-b-2xl">
                <p class="text-[10px] text-secondary font-bold">Toplam \${totalVotes} oy • Sonuçlar her Cuma yayınlanır</p>
            </div>
        </div>
    \`;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.querySelector('.relative.bg-white').classList.add('animate-bounce-in'));
};

window.closeVotingModal = function() {
    const modal = document.getElementById('voting-modal');
    if (modal) modal.remove();
};

window.castVote = async function(profName, btnElement) {
    if (localStorage.getItem('has_voted_this_week')) {
        alert('Bu hafta zaten oy kullandınız!');
        closeVotingModal();
        return;
    }

    const voterNameInput = document.getElementById('modal-voter-name');
    const voterName = voterNameInput ? voterNameInput.value.trim() : '';

    if (!voterName) {
        alert('Lütfen oyunuzu göndermeden önce Ad Soyad bilginizi giriniz. Bu güvenlik içindir ve isimler hiçbir yerde gösterilmez.');
        if(voterNameInput) voterNameInput.focus();
        return;
    }

    btnElement.disabled = true;
    btnElement.innerHTML = '<span class="material-symbols-outlined animate-spin text-[12px]">refresh</span>';

    try {
        const { db, collection, addDoc, serverTimestamp } = await import('./firebase-config.js');
        await addDoc(collection(db, 'haftanin_hocasi_oylari'), {
            voterName: voterName,
            professorName: profName,
            timestamp: serverTimestamp()
        });
        
        localStorage.setItem('has_voted_this_week', 'true');
        alert('Oyunuz başarıyla kaydedildi! Teşekkür ederiz.');
        closeVotingModal();
        initVoting(); // refresh UI to disabled button
    } catch(error) {
        console.error("Oy gönderme hatası:", error);
        alert('Hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.');
        btnElement.disabled = false;
        btnElement.textContent = 'Oy Ver';
    }
};`;

appJs = appJs.replace(regex, newCode);
fs.writeFileSync('app.js', appJs, 'utf8');
console.log("app.js fixed");
