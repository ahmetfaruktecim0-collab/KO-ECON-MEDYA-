const fs = require('fs');
const path = require('path');

const targetDir = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'playground', 'prismic-whirlpool', 'sbf-hub');
const filesToProcess = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

filesToProcess.forEach(filename => {
    const filepath = path.join(targetDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Find <a> tags that contain sports_esports and change href="#" to href="oyun.html"
    content = content.replace(/<a([^>]*href=["']?#["']?[^>]*)>([\s\S]*?sports_esports[\s\S]*?)<\/a>/gi, (match, attrs, inner) => {
        // Replace href="#" with href="oyun.html"
        const newAttrs = attrs.replace(/href=["']?#["']?/, 'href="oyun.html"');
        return `<a${newAttrs}>${inner}</a>`;
    });

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Fixed Oyun links in all HTML files.");
