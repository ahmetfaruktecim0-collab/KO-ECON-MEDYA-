const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const robustMaterialCSS = `
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined' !important;
            font-feature-settings: 'liga' !important;
            -webkit-font-feature-settings: 'liga' !important;
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace old css block with the robust one
    content = content.replace(
        /.material-symbols-outlined\s*{\s*font-variation-settings:\s*'FILL'\s*0,\s*'wght'\s*400,\s*'GRAD'\s*0,\s*'opsz'\s*24;\s*}/,
        robustMaterialCSS.trim()
    );

    // Also just in case they have it already modified differently
    if (content.includes("font-family: 'Material Symbols Outlined'") === false) {
       // if it wasn't replaced, try a broader regex or just insert it
       content = content.replace(
           /.material-symbols-outlined\s*{[^}]*}/,
           robustMaterialCSS.trim()
       );
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Updated material-symbols-outlined CSS in all HTML files.");
