const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace literal "\n" at the end of the file
html = html.replace(/\\n\s*$/, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Removed literal \\n");
