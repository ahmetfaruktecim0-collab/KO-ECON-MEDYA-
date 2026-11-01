const fs = require('fs');
const content = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');
console.log("Modal present:", content.includes('id="forgot-password-modal"'));
console.log("Reset btn present:", content.includes('id="send-reset-btn"'));
console.log("Reset btn click listener attached in JS?");
console.log(content.includes("resetBtn.addEventListener('click'"));
