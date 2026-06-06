const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix characters using unicode replacement character \uFFFD
    content = content.replace(/KO\uFFFD/g, 'KOÜ');
    content = content.replace(/G\uFFFDndem/g, 'Gündem');
    content = content.replace(/Yaz\uFFFDlar/g, 'Yazılar');
    content = content.replace(/G\uFFFD/g, 'GÖ'); // Just in case
    content = content.replace(/g\uFFFDr/g, 'gör'); // just in case
    content = content.replace(/K\uFFFDr/g, 'Kür');
    
    // Fix mobile drawer old typo if any
    content = content.replace(/<img src="assets\/logo\.png" alt="KOÜ Econ Medya" class="h-10 w-auto rounded shadow-sm">/g, 
        '<img src="assets/logo.png" alt="KOÜ Econ Medya" class="h-10 w-auto rounded">');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed corrupted encodings globally.");
