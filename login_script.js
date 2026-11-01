
        import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, db, doc, setDoc } from './firebase-config.js';

        // Elements
        const form = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const studentIdInput = document.getElementById('student-id');
        const passwordInput = document.getElementById('password');
        const nameInput = document.getElementById('student-name');
        const modeToggle = document.getElementById('mode-toggle');
        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-btn');
        const registerFields = document.getElementById('register-fields');
        const togglePassword = document.getElementById('toggle-password');
        const errorContainer = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        let isLoginMode = true;

        // Toggle Password Visibility
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('span').innerText = type === 'password' ? 'visibility_off' : 'visibility';
        });

        // Toggle Mode
        modeToggle.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            errorContainer.classList.add('hidden');
            
            if (isLoginMode) {
                formTitle.innerText = "Öğrenci Girişi";
                submitBtn.innerHTML = `<span>Giriş Yap</span><span class="material-symbols-outlined text-[20px]">login</span>`;
                modeToggle.innerHTML = `<span>İlk Kez Giriyorum (Kayıt Ol)</span><span class="material-symbols-outlined text-[20px]">person_add</span>`;
                registerFields.classList.add('hidden');
                nameInput.removeAttribute('required');
            } else {
                formTitle.innerText = "Öğrenci Kaydı";
                submitBtn.innerHTML = `<span>Kayıt Ol</span><span class="material-symbols-outlined text-[20px]">person_add</span>`;
                modeToggle.innerHTML = `<span>Zaten hesabım var (Giriş Yap)</span><span class="material-symbols-outlined text-[20px]">login</span>`;
                registerFields.classList.remove('hidden');
                nameInput.setAttribute('required', 'true');
            }
        });

        
        // Forgot Password Logic
        const forgotLink = document.getElementById('forgot-password-link');
        const forgotModal = document.getElementById('forgot-password-modal');
        const closeForgotModal = document.getElementById('close-forgot-modal');
        const resetBtn = document.getElementById('send-reset-btn');
        const resetEmailInput = document.getElementById('reset-email');

        if(forgotLink) {
            forgotLink.addEventListener('click', () => {
                forgotModal.classList.remove('hidden');
                setTimeout(() => {
                    forgotModal.classList.remove('opacity-0');
                    forgotModal.querySelector('.bg-white').classList.remove('scale-95');
                }, 10);
                
                // Auto-fill student ID if they already typed it
                if(studentIdInput.value.trim().length > 0) {
                    resetEmailInput.value = emailInput.value.trim();
                }
            });
        }

        if(closeForgotModal) {
            closeForgotModal.addEventListener('click', () => {
                forgotModal.classList.add('opacity-0');
                forgotModal.querySelector('.bg-white').classList.add('scale-95');
                setTimeout(() => {
                    forgotModal.classList.add('hidden');
                }, 300);
            });
        }

        if(resetBtn) {
            resetBtn.addEventListener('click', async () => {
                const email = resetEmailInput.value.trim();

if (!email || !email.includes('@')) {
    alert("Lütfen geçerli bir E-Posta adresi girin.");
    return;
}
                
                resetBtn.disabled = true;
                resetBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Gönderiliyor...';
                
                try {
                    await sendPasswordResetEmail(auth, email);
                    alert("Şifre sıfırlama bağlantısı " + email + " adresine gönderildi. Lütfen gelen kutunuzu (veya Spam klasörünü) kontrol edin.");
                    if(closeForgotModal) closeForgotModal.click();
                } catch (error) {
                    console.error("Şifre sıfırlama hatası:", error);
                    if (error.code === 'auth/user-not-found') {
                        alert("Bu E-Posta adresine ait bir hesap bulunamadı.");
                    } else {
                        alert("Bir hata oluştu: " + error.message);
                    }
                } finally {
                    resetBtn.disabled = false;
                    resetBtn.innerHTML = '<span class="material-symbols-outlined">mail</span> Bağlantı Gönder';
                }
            });
        }

        // Form Submit
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorContainer.classList.add('hidden');
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const name = nameInput.value.trim();
            let studentId = '';
            if(!isLoginMode && studentIdInput) {
                studentId = studentIdInput.value.trim();
            }

            if (!email || !password) return;
            if (!email.includes('@')) {
                showError("Lütfen geçerli bir e-posta adresi girin.");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-wait');

            try {
                if (isLoginMode) {
                    submitBtn.innerHTML = '<span>Giriş Yapılıyor...</span><span class="material-symbols-outlined text-[20px] animate-spin">sync</span>';
                    await signInWithEmailAndPassword(auth, email, password);
                    window.location.replace('index.html');
                } else {
                    submitBtn.innerHTML = '<span>Kayıt Olunuyor...</span><span class="material-symbols-outlined text-[20px] animate-spin">sync</span>';
                    
                    if (!name) {
                        showError("Lütfen adınızı soyadınızı girin.");
                        resetBtnFunc();
                        return;
                    }

                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    // Save student profile to Firestore
                    try {
                        await setDoc(doc(db, 'users', user.uid), {
                            studentId: studentId,
                            name: name,
                            email: email,
                            createdAt: new Date(),
                            role: 'student'
                        });
                    } catch(err) {
                        console.warn('Firestore user profile creation skipped due to permissions/rules.');
                    }

                    window.location.replace('index.html');
                }
            } catch (error) {
                console.error("Auth Error:", error);
                handleAuthError(error.code);
                resetBtnFunc();
            }
        });

        function showError(message) {
            errorText.innerText = message;
            errorContainer.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            alert(message);
        }

        function resetBtnFunc() {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-70', 'cursor-wait');
            if (isLoginMode) {
                submitBtn.innerHTML = '<span>Giriş Yap</span><span class="material-symbols-outlined text-[20px]">login</span>';
            } else {
                submitBtn.innerHTML = '<span>Kayıt Ol</span><span class="material-symbols-outlined text-[20px]">person_add</span>';
            }
        }

        function handleAuthError(code) {
            switch (code) {
                case 'auth/user-not-found':
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    showError("E-Posta adresi veya şifre hatalı.");
                    break;
                case 'auth/email-already-in-use':
                    showError("Bu E-Posta adresi ile zaten kayıt olunmuş.");
                    break;
                case 'auth/weak-password':
                    showError("Şifre çok zayıf. En az 6 karakter olmalıdır.");
                    break;
                case 'auth/network-request-failed':
                    showError("Ağ hatası. Lütfen internet bağlantınızı kontrol edin.");
                    break;
                default:
                    showError("Bir hata oluştu. Lütfen tekrar deneyin. (" + code + ")");
            }
        }
    