const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the broken characters in the bottom nav
    content = content.replace(/Gndem/g, 'Gündem');
    content = content.replace(/Yazlar/g, 'Yazılar');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed encoding issues in all HTML files.");
