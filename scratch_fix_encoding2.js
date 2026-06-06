const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the broken characters in the bottom nav using regex that catches the corrupted character
    content = content.replace(/G.ndem/g, 'Gündem');
    content = content.replace(/Yaz.lar/g, 'Yazýlar');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed encoding issues using regex in all HTML files.");
