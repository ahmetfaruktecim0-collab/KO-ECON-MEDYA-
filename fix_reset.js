const fs = require('fs');

let html = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

const regex = /const studentId = (resetInput|resetStudentIdInput)\.value\.trim\(\);[\s\S]*?const email = studentId \+ \"@ogr\.kocaeli\.edu\.tr\";/;

const replacement = `const email = resetEmailInput.value.trim();

if (!email || !email.includes('@')) {
    alert("Lütfen geçerli bir E-Posta adresi girin.");
    return;
}`;

html = html.replace(regex, replacement);

fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', html);
console.log('Fixed regex');
