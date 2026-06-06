const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block is at the end of the file:
// document.addEventListener('DOMContentLoaded', () => {
// ...
// });
// </script>

html = html.replace("document.addEventListener('DOMContentLoaded', () => {", "");
html = html.replace(/}\);\s*<\/script>\s*<\/body><\/html>/, "</script>\n</body></html>");

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed module block");
