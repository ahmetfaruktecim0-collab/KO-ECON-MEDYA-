const fs = require('fs');
const content = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

const match = content.match(/<script type=\"module\">([\s\S]*?)<\/script>/);
fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login_script.js', match[1]);
console.log('Extracted JS');
