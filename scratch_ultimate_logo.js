const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // For Sidebar (Desktop) - Dark Green Background
    // We want White Text, Transparent Background.
    // Assuming original is White Bg, Black Text:
    // invert(1) -> Black Bg, White Text
    // screen -> Black becomes transparent, White stays White
    content = content.replace(
        /style="mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"/g,
        'style="filter: invert(1); mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"'
    );
    
    // Just in case it was still screen
    content = content.replace(
        /<img src="assets\/logo\.png" alt="KOÜ Econ Medya" class="w-56 h-auto" style="mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">/g,
        '<img src="assets/logo.png" alt="KOÜ Econ Medya" class="w-56 h-auto" style="filter: invert(1); mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">'
    );

    // For Poster - Dark Green Background
    // In poster.html it was: style="mix-blend-mode: screen; image-rendering: crisp-edges;"
    content = content.replace(
        /style="mix-blend-mode: screen; image-rendering: crisp-edges;"/g,
        'style="filter: invert(1); mix-blend-mode: screen; image-rendering: crisp-edges;"'
    );
    
    // I also want to remove the glass box around the logo in poster.html to make it look completely natural
    content = content.replace(
        /<div class="w-64 h-auto mb-8 bg-black\/20 p-4 rounded-2xl border border-white\/10 reveal delay-1">/g,
        '<div class="w-64 h-auto mb-8 reveal delay-1">'
    );

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Ultimate logo fix applied to all files.");
