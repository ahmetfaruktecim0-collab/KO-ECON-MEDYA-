const fs = require('fs');
const content = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/login.html', 'utf8');

const getElementByIds = content.match(/getElementById\(['"]([^'"]+)['"]\)/g);
const ids = content.match(/id=['"]([^'"]+)['"]/g);

console.log("getElementById calls:\n", getElementByIds);
console.log("\nActual IDs in HTML:\n", ids);
