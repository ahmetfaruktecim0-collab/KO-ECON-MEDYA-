const fs = require('fs');
let c = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

c = c.replace(/const resetInput = document\.getElementById\('reset-student-id'\);/g, "const resetEmailInput = document.getElementById('reset-email');");
c = c.replace(/resetInput\.value = studentIdInput\.value\.trim\(\);/g, "resetEmailInput.value = emailInput.value.trim();");

fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', c);
console.log('Fixed completely');
