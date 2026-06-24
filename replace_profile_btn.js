const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\ASUS\\Desktop\\sbf-hub';
const files = ['index.html', 'sosyal-kose.html', 'hocalar.html', 'duyurular.html', 'oyun.html', 'iktisatcinin-kaleminden.html'];

files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)){
        let c = fs.readFileSync(p, 'utf8');
        // A generic regex to catch the div
        c = c.replace(/<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary\/20">[\s\S]*?<\/div>/g, '<div id="user-profile-btn" class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors text-primary text-[20px] font-bold"><span class="material-symbols-outlined">person</span></div>');
        fs.writeFileSync(p, c);
        console.log(`Updated ${f}`);
    }
});
