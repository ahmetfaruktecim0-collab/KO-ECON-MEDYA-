const fs = require('fs');

// 1. Remove from app.js
let appJs = fs.readFileSync('app.js', 'utf8');
const authLogicStart = appJs.indexOf("import { \n    auth, googleProvider");
if (authLogicStart > -1) {
    const codeToRemove = appJs.substring(authLogicStart);
    appJs = appJs.substring(0, authLogicStart);
    fs.writeFileSync('app.js', appJs, 'utf8');
    
    // 2. Inject into index.html
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    
    // Instead of using the exact extracted string (since it has window. etc), I will format it nicely
    // and put it inside the existing <script type="module"> in index.html
    const scriptModuleStart = indexHtml.indexOf('<script type="module">');
    if (scriptModuleStart > -1) {
        // Let's just create a new script module block before the closing body
        const newLogic = `
<script type="module">
import { 
    auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged,
    db, collection, getDocs, query, where, addDoc, serverTimestamp, onSnapshot 
} from './firebase-config.js';

let currentUser = null;

// Track auth state
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    const loginBtn = document.getElementById('google-login-btn');
    const authUserInfo = document.getElementById('auth-user-info');
    const votingInputs = document.getElementById('voting-inputs');
    const userImg = document.getElementById('auth-user-img');
    const userName = document.getElementById('auth-user-name');
    const userEmail = document.getElementById('auth-user-email');

    if (user && loginBtn && authUserInfo && votingInputs) {
        loginBtn.classList.add('hidden');
        authUserInfo.classList.remove('hidden');
        authUserInfo.classList.add('flex');
        votingInputs.classList.remove('hidden');
        
        if (userImg) userImg.src = user.photoURL || '';
        if (userName) userName.textContent = user.displayName || 'İsimsiz Kullanıcı';
        if (userEmail) userEmail.textContent = user.email || '';
    } else if (loginBtn && authUserInfo && votingInputs) {
        loginBtn.classList.remove('hidden');
        authUserInfo.classList.add('hidden');
        authUserInfo.classList.remove('flex');
        votingInputs.classList.add('hidden');
    }
});

window.handleGoogleLogin = async function() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Giriş hatası:", error);
        alert("Giriş yapılamadı. (" + error.message + ")");
    }
};

window.handleSignOut = async function() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Çıkış hatası:", error);
    }
};

window.openVotingModal = function() {
    const modal = document.getElementById('survey-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeVotingModal = function() {
    const modal = document.getElementById('survey-modal');
    if (modal) modal.classList.add('hidden');
};

function initVoting() {
    const container = document.getElementById('voting-container');
    if (!container) return;

    const isFriday = new Date().getDay() === 5; 
    try {
        if (isFriday) {
            container.innerHTML = '<p class="text-sm text-center">Sonuçlar her Cuma açıklanır!</p>';
        } else {
            container.innerHTML = \`
                <div class="text-center p-4">
                    <button onclick="openVotingModal()" class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined">how_to_vote</span>
                        Oy Kullan
                    </button>
                </div>
            \`;
        }
    } catch(e) {
        console.error("Hata:", e);
    }
}

initVoting();

const voteForm = document.getElementById('vote-form');
if (voteForm) {
    voteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert("Lütfen önce giriş yapın.");
            return;
        }

        const profSelect = document.getElementById('voter-selection');
        const profName = profSelect ? profSelect.value : null;

        if (!profName) {
            alert("Lütfen listeden bir hoca seçin.");
            return;
        }

        const submitBtn = document.getElementById('vote-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerText = "Gönderiliyor...";

        try {
            const q = query(collection(db, 'haftanin_hocasi_oylari'), where('uid', '==', currentUser.uid));
            const snapshot = await getDocs(q);
            
            if (!snapshot.empty) {
                alert("Bu hafta zaten oy kullandınız! Sadece bir kez oy verebilirsiniz.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Oyumu Gönder";
                return;
            }

            await addDoc(collection(db, 'haftanin_hocasi_oylari'), {
                uid: currentUser.uid,
                voterName: currentUser.displayName || 'İsimsiz',
                voterEmail: currentUser.email || '',
                professorName: profName,
                timestamp: serverTimestamp()
            });

            alert("Oyunuz başarıyla kaydedildi! Teşekkür ederiz.");
            closeVotingModal();
            initVoting(); 
        } catch (error) {
            console.error("Oy gönderme hatası:", error);
            alert("Hata oluştu. (" + error.message + ")");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Oyumu Gönder";
        }
    });
}

// Populate select
const select = document.getElementById('voter-selection');
if (select && typeof window.professorsData !== 'undefined') {
    window.professorsData.forEach(prof => {
        const option = document.createElement('option');
        option.value = prof.name;
        option.textContent = prof.name + " (" + prof.title + ")";
        select.appendChild(option);
    });
}

// Load results
const resultsContainer = document.getElementById('vote-results');
if (resultsContainer) {
    onSnapshot(collection(db, 'haftanin_hocasi_oylari'), snapshot => {
        const counts = {};
        snapshot.forEach(doc => {
            const data = doc.data();
            if(data.professorName) {
                counts[data.professorName] = (counts[data.professorName] || 0) + 1;
            }
        });

        const sortedResults = Object.keys(counts).map(key => ({
            name: key,
            votes: counts[key]
        })).sort((a, b) => b.votes - a.votes);

        resultsContainer.innerHTML = '';
        
        if(sortedResults.length === 0) {
            resultsContainer.innerHTML = '<div class="text-center text-sm text-outline">Henüz oy kullanılmadı. İlk oyu sen ver!</div>';
            return;
        }

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
</script>
`;
        
        indexHtml = indexHtml.replace('</body></html>', newLogic + '\n</body></html>');
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log("Moved logic to index.html and restored app.js");
    }
}
