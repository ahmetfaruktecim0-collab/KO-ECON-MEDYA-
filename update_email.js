const fs = require('fs');

let html = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

const oldStudentIdField = '<!-- Student ID -->\n                    <div class=\"space-y-1\">\n                        <label for=\"student-id\" class=\"text-sm font-bold text-on-surface-variant block ml-1\">Öðrenci Numarasý</label>\n                        <div class=\"relative group\">\n                            <span class=\"absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors\">\n                                <span class=\"material-symbols-outlined\">badge</span>\n                            </span>\n                            <input type=\"number\" id=\"student-id\" required \n                                class=\"w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50\"\n                                placeholder=\"Örn: 180201011\">\n                        </div>\n                    </div>';

const newEmailField = '<!-- Email -->\n                    <div class=\"space-y-1\">\n                        <label for=\"email\" class=\"text-sm font-bold text-on-surface-variant block ml-1\">E-Posta Adresi</label>\n                        <div class=\"relative group\">\n                            <span class=\"absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors\">\n                                <span class=\"material-symbols-outlined\">mail</span>\n                            </span>\n                            <input type=\"email\" id=\"email\" required \n                                class=\"w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50\"\n                                placeholder=\"ornek@gmail.com\">\n                        </div>\n                    </div>';

const newStudentIdRegisterField = '<div class=\"space-y-1\">\n                            <label for=\"student-id\" class=\"text-sm font-bold text-on-surface-variant block ml-1\">Öðrenci Numarasý</label>\n                            <div class=\"relative group\">\n                                <span class=\"absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors\">\n                                    <span class=\"material-symbols-outlined\">badge</span>\n                                </span>\n                                <input type=\"number\" id=\"student-id\" \n                                    class=\"w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-title placeholder-outline/50\"\n                                    placeholder=\"Örn: 180201011\">\n                            </div>\n                        </div>';

html = html.replace(oldStudentIdField, newEmailField);

const oldRegisterFieldsEnd = '                            </div>\n                        </div>\n                    </div>';
const newRegisterFieldsEnd = '                            </div>\n                        </div>\n                        ' + newStudentIdRegisterField + '\n                    </div>';
html = html.replace(oldRegisterFieldsEnd, newRegisterFieldsEnd);

html = html.replace('Þifre sýfýrlama baðlantýsý almak için öðrenci numaranýzý girin. Baðlantý <b>@ogr.kocaeli.edu.tr</b> uzantýlý öðrenci mail adresinize gönderilecektir.', 'Þifre sýfýrlama baðlantýsý almak için sisteme kayýtlý E-Posta adresinizi girin. Baðlantý bu adrese gönderilecektir.');

html = html.replace('<input type=\"number\" id=\"reset-student-id\" required', '<input type=\"email\" id=\"reset-email\" required');
html = html.replace('<span class=\"material-symbols-outlined\">badge</span>', '<span class=\"material-symbols-outlined\">mail</span>');

html = html.replace(\"const studentIdInput = document.getElementById('student-id');\", \"const emailInput = document.getElementById('email');\\n        const studentIdInput = document.getElementById('student-id');\");
html = html.replace(\"const resetStudentIdInput = document.getElementById('reset-student-id');\", \"const resetEmailInput = document.getElementById('reset-email');\");

html = html.replace(/const studentId = resetStudentIdInput\.value\.trim\(\);[\s\S]*?const email = studentId \+ \"@ogr\.kocaeli\.edu\.tr\";/, 'const email = resetEmailInput.value.trim();\\n\\nif (!email || !email.includes(\\'@\\')) {\\n    alert(\"Lütfen geçerli bir E-Posta adresi girin.\");\\n    return;\\n}');

html = html.replace(/const studentId = studentIdInput\.value\.trim\(\);[\s\S]*?const email = studentId \+ \"@ogr\.kocaeli\.edu\.tr\";/, 'const email = emailInput.value.trim();\\nconst password = passwordInput.value;\\nconst name = nameInput.value.trim();\\nlet studentId = \"\";\\nif(!isLoginMode && studentIdInput) studentId = studentIdInput.value.trim();\\n\\nif (!email || !password) return;\\nif (!email.includes(\\'@\\')) {\\n    showError(\"Lütfen geçerli bir e-posta adresi girin.\");\\n    return;\\n}');

html = html.replace('Öðrenci numarasý veya þifre hatalý.', 'E-Posta adresi veya þifre hatalý.');
html = html.replace('Bu öðrenci numarasý ile zaten kayýt olunmuþ.', 'Bu E-Posta adresi ile zaten kayýt olunmuþ.');
html = html.replace('Bu öðrenci numarasýna ait bir hesap bulunamadý.', 'Bu E-Posta adresine ait bir hesap bulunamadý.');

fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', html);
console.log('Update Complete!');
