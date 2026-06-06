const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the corrupted text that was just injected
    content = content.replace(/KO/g, 'KOÜ');
    // Also, there's another corrupted string at line 133 "Gndem" wait!
    // Why did Gündem get corrupted again?!
    // Oh, wait! In scratch_inject_logo.js I just used string replace. I didn't replace Gündem.
    // Why is Gündem corrupted in index.html in the sidebar?
    // Let's just fix all common corrupted characters
    content = content.replace(/Gndem/g, 'Gündem');
    content = content.replace(/Yazlar/g, 'Yazılar');
    content = content.replace(/grnts/g, 'görüntüsü');
    content = content.replace(/Yeili/g, 'Yeşili');
    content = content.replace(/Bayramnz/g, 'Bayramınız');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed KOÜ and other encoding issues in all HTML files.");
