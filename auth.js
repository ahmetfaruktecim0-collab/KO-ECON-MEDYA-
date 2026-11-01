import { auth, onAuthStateChanged, signOut, db, doc, getDoc } from './firebase-config.js';

// Centralized Anti-FOUC & Admin Approval Guard
onAuthStateChanged(auth, async (user) => {
    // If not logged in, immediately bounce to login.html
    if (!user) {
        window.location.replace('login.html');
        return;
    }

    // Check if user is approved by admin
    try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
            const data = snap.data();
            // If student and approved is explicitly false, reject entry
            if (data.role !== 'admin' && data.approved === false) {
                await signOut(auth);
                alert('Hesabınız henüz yönetici tarafından onaylanmamıştır. Lütfen yöneticinin onaylamasını bekleyin.');
                window.location.replace('login.html');
                return;
            }

            // Sync class preferences to localStorage
            if (!localStorage.getItem('schedule_classLevel') || !localStorage.getItem('schedule_classType')) {
                if (data.classLevel && data.classType) {
                    localStorage.setItem('schedule_classLevel', data.classLevel);
                    localStorage.setItem('schedule_classType', data.classType);
                    if (typeof window.renderSchedule === 'function') {
                        window.renderSchedule();
                    }
                }
            }
        }
    } catch (e) {
        console.warn('Kullanıcı onay kontrolü hatası:', e);
    }

    // Authorized & Approved: Reveal page seamlessly
    document.body.classList.add('auth-ready');
    document.body.style.opacity = '1';
    document.body.style.pointerEvents = 'auto';

    // Update profile / logout button
    const profileBtn = document.getElementById('user-profile-btn');
    if (profileBtn) {
        const studentId = user.email ? user.email.split('@')[0] : 'Öğrenci';
        profileBtn.innerHTML = `<span class="font-bold text-primary text-xs" title="${studentId}">Çıkış</span>`;
        profileBtn.onclick = () => window.handleLogout();
    }
});

window.handleLogout = function() {
    signOut(auth).then(() => {
        localStorage.removeItem('schedule_classLevel');
        localStorage.removeItem('schedule_classType');
        localStorage.removeItem('schedule_viewMode');
        window.location.replace('login.html');
    }).catch(() => {
        window.location.replace('login.html');
    });
};
