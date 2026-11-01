const fs = require('fs');

let html = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

const oldStudentIdField = `<!-- Student ID -->
                    <div class="space-y-1">
                        <label for="student-id" class="text-sm font-bold text-on-surface-variant block ml-1">Öğrenci Numarası</label>
                        <div class="relative group">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                <span class="material-symbols-outlined">badge</span>
                            </span>
                            <input type="number" id="student-id" required 
                                class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50"
                                placeholder="Örn: 180201011">
                        </div>
                    </div>`;

const newEmailField = `<!-- Email -->
                    <div class="space-y-1">
                        <label for="email" class="text-sm font-bold text-on-surface-variant block ml-1">E-Posta Adresi</label>
                        <div class="relative group">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                <span class="material-symbols-outlined">mail</span>
                            </span>
                            <input type="email" id="email" required 
                                class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50"
                                placeholder="ornek@gmail.com">
                        </div>
                    </div>`;

const newStudentIdRegisterField = `<div class="space-y-1">
                            <label for="student-id" class="text-sm font-bold text-on-surface-variant block ml-1">Öğrenci Numarası</label>
                            <div class="relative group">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                                    <span class="material-symbols-outlined">badge</span>
                                </span>
                                <input type="number" id="student-id" 
                                    class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50"
                                    placeholder="Örn: 180201011">
                            </div>
                        </div>`;

html = html.replace(oldStudentIdField, newEmailField);

const oldRegisterFieldsEnd = `                            </div>
                        </div>
                    </div>`;

const newRegisterFieldsEnd = `                            </div>
                        </div>
                        ${newStudentIdRegisterField}
                    </div>`;

html = html.replace(oldRegisterFieldsEnd, newRegisterFieldsEnd);

const oldForgotText = 'Şifre sıfırlama bağlantısı almak için öğrenci numaranızı girin. Bağlantı <b>@ogr.kocaeli.edu.tr</b> uzantılı öğrenci mail adresinize gönderilecektir.';
const newForgotText = 'Şifre sıfırlama bağlantısı almak için sisteme kayıtlı E-Posta adresinizi girin. Bağlantı bu adrese gönderilecektir.';
html = html.replace(oldForgotText, newForgotText);

const oldForgotInput = `<span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined">badge</span>
                    </span>
                    <input type="number" id="reset-student-id" required
                        class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50"
                        placeholder="Örn: 180201011">`;

const newForgotInput = `<span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined">mail</span>
                    </span>
                    <input type="email" id="reset-email" required
                        class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50"
                        placeholder="ornek@gmail.com">`;
html = html.replace(oldForgotInput, newForgotInput);

html = html.replace("const studentIdInput = document.getElementById('student-id');", "const emailInput = document.getElementById('email');\n        const studentIdInput = document.getElementById('student-id');");
html = html.replace("const resetStudentIdInput = document.getElementById('reset-student-id');", "const resetEmailInput = document.getElementById('reset-email');");

const oldResetLogic = `const studentId = resetStudentIdInput.value.trim();
                
                if (!studentId || studentId.length < 5) {
                    alert("Lütfen geçerli bir öğrenci numarası girin.");
                    return;
                }

                const email = studentId + "@ogr.kocaeli.edu.tr";`;

const newResetLogic = `const email = resetEmailInput.value.trim();
                
                if (!email || !email.includes('@')) {
                    alert("Lütfen geçerli bir E-Posta adresi girin.");
                    return;
                }`;
html = html.replace(oldResetLogic, newResetLogic);

html = html.replace(`if (error.code === 'auth/user-not-found') {
                        alert("Bu öğrenci numarasına ait bir hesap bulunamadı.");`,
                `if (error.code === 'auth/user-not-found') {
                        alert("Bu E-Posta adresine ait bir hesap bulunamadı.");`);

const oldSubmitLogic = `const studentId = studentIdInput.value.trim();
            const password = passwordInput.value;
            const name = nameInput.value.trim();

            if (!studentId || !password) return;
            if (studentId.length < 5) {
                showError("Lütfen geçerli bir öğrenci numarası girin.");
                return;
            }

            // Pseudo Email for Firebase Auth
            const email = studentId + "@ogr.kocaeli.edu.tr";`;

const newSubmitLogic = `const email = emailInput.value.trim();
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
            }`;

html = html.replace(oldSubmitLogic, newSubmitLogic);

html = html.replace(`case 'auth/user-not-found':
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    showError("Öğrenci numarası veya şifre hatalı.");
                    break;
                case 'auth/email-already-in-use':
                    showError("Bu öğrenci numarası ile zaten kayıt olunmuş.");`,
                `case 'auth/user-not-found':
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    showError("E-Posta adresi veya şifre hatalı.");
                    break;
                case 'auth/email-already-in-use':
                    showError("Bu E-Posta adresi ile zaten kayıt olunmuş.");`);

fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', html);
console.log('Update complete!');
