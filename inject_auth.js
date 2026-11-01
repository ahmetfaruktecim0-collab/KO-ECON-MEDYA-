const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\ASUS\\Desktop\\sbf-hub';
const files = ['index.html', 'sosyal-kose.html', 'hocalar.html', 'duyurular.html', 'oyun.html', 'iktisatcinin-kaleminden.html'];

files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)){
        let c = fs.readFileSync(p, 'utf8');
        if (!c.includes('auth.js')) {
            c = c.replace('</body>', '<script type="module" src="auth.js"></script>\n</body>');
            fs.writeFileSync(p, c);
            console.log(`Injected auth.js into ${f}`);
        }
    }
});
