const fs = require('fs');
const path = require('path');

const targetDir = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'playground', 'prismic-whirlpool', 'sbf-hub');
const filesToProcess = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

const desktopPattern = /<a[^>]*href="ekonomiste-sor\.html"[^>]*>[\s\S]*?<span[^>]*data-icon="smart_toy"[^>]*>smart_toy<\/span>[\s\S]*?<\/a>/gi;
const mobilePattern = /<a[^>]*href="ekonomiste-sor\.html"[^>]*>[\s\S]*?id="nav-icon-ai"[^>]*>smart_toy<\/span>[\s\S]*?<\/a>/gi;

filesToProcess.forEach(filename => {
    if (filename === 'ekonomiste-sor.html') return;
    
    const filepath = path.join(targetDir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    content = content.replace(desktopPattern, '');
    content = content.replace(mobilePattern, '');

    // Inject chat-widget.js script into the head
    if (!content.includes('chat-widget.js')) {
        content = content.replace('</head>', '    <script defer src="chat-widget.js"></script>\n</head>');
    }

    fs.writeFileSync(filepath, content, 'utf8');
});

// Delete ekonomiste-sor.html
try {
    fs.unlinkSync(path.join(targetDir, 'ekonomiste-sor.html'));
    console.log('Deleted ekonomiste-sor.html');
} catch(e) {}

console.log("Cleanup and chat-widget injection complete.");
