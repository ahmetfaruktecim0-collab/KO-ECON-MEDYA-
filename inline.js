const fs = require('fs');

let idx = fs.readFileSync('C:\\Users\\ASUS\\Desktop\\sbf-hub\\index.html', 'utf8');
let styleMatch = idx.match(/<style id="tailwind-inlined">[\s\S]*?<\/style>/);

if (styleMatch) {
    let login = fs.readFileSync('C:\\Users\\ASUS\\Desktop\\sbf-hub\\login.html', 'utf8');
    login = login.replace('<script src="https://cdn.tailwindcss.com"></script>', styleMatch[0]);
    fs.writeFileSync('C:\\Users\\ASUS\\Desktop\\sbf-hub\\login.html', login);
    console.log('Inlined CSS into login.html');
} else {
    console.log('Could not find tailwind-inlined style block in index.html');
}
