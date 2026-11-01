const fs = require('fs');
const path = require('path');
const d = 'C:\\Users\\ASUS\\Desktop\\sbf-hub';

// 1. Update firebase.json
let fbj = JSON.parse(fs.readFileSync(path.join(d, 'firebase.json')));
fbj.hosting.headers[0].source = '**/*.@(svg|png|jpg|jpeg|webp)';
fs.writeFileSync(path.join(d, 'firebase.json'), JSON.stringify(fbj, null, 2));

// 2. Bust service worker cache
let sw = fs.readFileSync(path.join(d, 'service-worker.js'), 'utf8');
sw = sw.replace(/CACHE_NAME = 'econ-medya-[^']+';/, "CACHE_NAME = 'econ-medya-v" + Date.now() + "';");
fs.writeFileSync(path.join(d, 'service-worker.js'), sw);

// 3. Update HTML files to append ?v=1.2 to JS imports
const h = ['index.html', 'sosyal-kose.html', 'hocalar.html', 'duyurular.html', 'oyun.html', 'iktisatcinin-kaleminden.html', 'login.html'];
h.forEach(f => {
    let p = path.join(d, f);
    if(fs.existsSync(p)){
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace(/app\.js(\?v=[0-9\.]+)?/g, 'app.js?v=1.2');
        c = c.replace(/auth\.js(\?v=[0-9\.]+)?/g, 'auth.js?v=1.2');
        fs.writeFileSync(p, c);
    }
});
console.log('Cache busted.');
