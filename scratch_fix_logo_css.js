const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove mix-blend-mode: screen (which caused the solid white box)
    // Replace it with mix-blend-mode: multiply (which makes white transparent)
    // Desktop logo
    content = content.replace(/style="mix-blend-mode: screen; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"/g, 
                              'style="mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"');
    
    // Mobile logo: remove filter: invert(1); mix-blend-mode: multiply; because the background is already light gray,
    // so just mix-blend-mode: multiply will perfectly remove the white background of the image.
    content = content.replace(/style="filter: invert\(1\); mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"/g, 
                              'style="mix-blend-mode: multiply; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"');

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed CSS mix-blend-mode to multiply in all HTML files.");
