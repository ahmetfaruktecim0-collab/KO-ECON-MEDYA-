const fs = require('fs');

let html = fs.readFileSync('hocalar.html', 'utf8');

// Add the Floating Action Button and Modals just before the closing </body> tag
const surveyUI = `
<!-- Haftanın Hocası Anketi FAB -->
<button onclick="document.getElementById('survey-modal').classList.remove('hidden')" class="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.5)] hover:scale-110 active:scale-95 transition-all z-50 flex items-center gap-3">
    <span class="material-symbols-outlined text-3xl">workspace_premium</span>
    <span class="font-bold hidden md:inline">Haftanın Hocası</span>
</button>

<!-- Survey Modal -->
<div id="survey-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div class="bg-surface dark:bg-surface-container rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button onclick="document.getElementById('survey-modal').classList.add('hidden')" class="absolute top-4 right-4 text-outline hover:text-primary transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-3xl">how_to_vote</span>
            </div>
            <h2 class="text-2xl font-bold text-primary">Haftanın Hocası Anketi</h2>
            <p class="text-sm text-on-surface-variant mt-2">En çok ilham veren hocanızı seçin. (İsimler asla yayınlanmaz, sadece sayım içindir).</p>
        </div>

        <form id="vote-form" class="space-y-4">
            <div>
                <label class="block text-sm font-semibold mb-1 text-on-surface">Ad Soyad (Güvenlik İçin)</label>
                <input type="text" id="voter-name" required class="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all" placeholder="Ahmet Yılmaz">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1 text-on-surface">Hoca Seçiniz</label>
                <select id="voter-selection" required class="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all appearance-none">
                    <option value="" disabled selected>Listeden seçin...</option>
                    <!-- Options populated by JS -->
                </select>
            </div>
            <button type="submit" id="vote-submit-btn" class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all">Oyumu Gönder</button>
        </form>
        
        <div class="mt-6 border-t border-outline-variant/20 pt-6">
            <h3 class="text-lg font-bold text-center mb-4">Mevcut Durum (Sıralama)</h3>
            <div id="vote-results" class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                <div class="text-center text-sm text-outline animate-pulse">Sonuçlar yükleniyor...</div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    // Populate select options
    const select = document.getElementById('voter-selection');
    if(typeof professorsData !== 'undefined') {
        professorsData.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof.name;
            option.textContent = prof.title + " " + prof.name;
            select.appendChild(option);
        });
    }

    const db = firebase.firestore();
    const voteForm = document.getElementById('vote-form');
    const submitBtn = document.getElementById('vote-submit-btn');
    const resultsContainer = document.getElementById('vote-results');

    // Handle Vote Submission
    voteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const voterName = document.getElementById('voter-name').value.trim();
        const professorName = document.getElementById('voter-selection').value;
        
        if(!voterName || !professorName) return;
        
        // Prevent multiple votes locally
        if(localStorage.getItem('has_voted_this_week')) {
            alert('Bu hafta zaten oy kullandınız! Sadece bir kez oy verebilirsiniz.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Gönderiliyor...';

        try {
            await db.collection('haftanin_hocasi_oylari').add({
                voterName: voterName,
                professorName: professorName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            localStorage.setItem('has_voted_this_week', 'true');
            alert('Oyunuz başarıyla kaydedildi! Teşekkür ederiz.');
            document.getElementById('voter-name').value = '';
            document.getElementById('voter-selection').value = '';
            loadResults(); // Refresh results
        } catch(error) {
            console.error(error);
            alert('Hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Oyumu Gönder';
        }
    });

    // Real-time Results Listener
    function loadResults() {
        db.collection('haftanin_hocasi_oylari').onSnapshot(snapshot => {
            const counts = {};
            snapshot.forEach(doc => {
                const data = doc.data();
                if(data.professorName) {
                    counts[data.professorName] = (counts[data.professorName] || 0) + 1;
                }
            });

            // Convert to array and sort
            const sortedResults = Object.keys(counts).map(key => ({
                name: key,
                votes: counts[key]
            })).sort((a, b) => b.votes - a.votes);

            resultsContainer.innerHTML = '';
            
            if(sortedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="text-center text-sm text-outline">Henüz oy kullanılmadı. İlk oyu sen ver!</div>';
                return;
            }

            // Top score for percentage bar
            const maxVotes = sortedResults[0].votes;

            sortedResults.forEach((res, index) => {
                const percentage = (res.votes / maxVotes) * 100;
                const isWinner = index === 0;
                
                resultsContainer.innerHTML += \`
                    <div class="bg-surface-container-low p-3 rounded-lg relative overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 bg-\${isWinner ? 'orange' : 'primary'}-500/20" style="width: \${percentage}%"></div>
                        <div class="flex justify-between items-center relative z-10">
                            <div class="flex items-center gap-2">
                                \${isWinner ? '<span class="material-symbols-outlined text-orange-500 text-lg">military_tech</span>' : ''}
                                <span class="font-bold text-sm \${isWinner ? 'text-orange-600 dark:text-orange-400' : 'text-on-surface'}">\${res.name}</span>
                            </div>
                            <span class="font-black text-sm text-outline">\${res.votes} Oy</span>
                        </div>
                    </div>
                \`;
            });
        });
    }

    // Initialize results
    loadResults();
});
</script>
`;

if(!html.includes('Haftanın Hocası Anketi FAB')) {
    html = html.replace('</body>', surveyUI + '\n</body>');
    fs.writeFileSync('hocalar.html', html, 'utf8');
    console.log("Survey UI injected into hocalar.html");
} else {
    console.log("Survey UI already exists.");
}

