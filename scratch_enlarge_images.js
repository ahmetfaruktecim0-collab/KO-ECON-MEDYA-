const fs = require('fs');
const path = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Replace w-16 h-24 with w-24 h-36 in the Weekly Vision block
// Also increase the title text size slightly to match the larger image
content = content.replace(/w-16 h-24/g, 'w-24 h-36');

fs.writeFileSync(path, content, 'utf8');
console.log("Resim boyutları büyütüldü (w-24 h-36).");
