import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('user-profile-btn');
    if (!profileBtn) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            const studentId = user.email ? user.email.split('@')[0] : 'Öğrenci';
            profileBtn.innerHTML = `<span class="font-bold text-primary text-xs" title="${studentId}">Çıkış</span>`;
            profileBtn.onclick = () => {
                signOut(auth).then(() => {
                    window.location.reload();
                });
            };
        } else {
            // User is signed out
            profileBtn.innerHTML = `<span class="material-symbols-outlined text-primary text-[20px]">person</span>`;
            profileBtn.onclick = () => {
                window.location.href = 'login.html';
            };
        }
    });
});
