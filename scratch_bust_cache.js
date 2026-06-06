const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace all instances of logo.svg with logo-yeni.svg to bust cache
    content = content.replace(/assets\/logo\.svg/g, 'assets/logo-yeni.svg');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Updated HTML files to use logo-yeni.svg to bust cache.");
