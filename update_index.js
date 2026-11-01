const fs = require('fs');
let c = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/index.html', 'utf8');

const regex = /<div class="flex items-center justify-between p-card-padding pb-0">[\s\S]*?<h3 class="text-lg font-bold text-on-surface flex items-center gap-2">[\s\S]*?<span class="material-symbols-outlined text-primary">calendar_today<\/span>[\s\S]*?Ders Programı[\s\S]*?<\/h3>[\s\S]*?<button.*?<\/button>[\s\S]*?<\/div>/;

const replacement = `<div class="flex items-center justify-between p-card-padding pb-3 border-b border-outline-variant/10">
    <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">calendar_today</span>
        Ders Programı
    </h3>
    <select id="class-selector" class="bg-surface-container text-xs text-on-surface font-bold rounded-lg px-2 py-1 outline-none border border-outline-variant/30 focus:border-primary cursor-pointer">
        <option value="1-I">1. Sınıf - I. Öğretim</option>
        <option value="1-II">1. Sınıf - II. Öğretim</option>
        <option value="2-I">2. Sınıf - I. Öğretim</option>
        <option value="2-II">2. Sınıf - II. Öğretim</option>
        <option value="3-I">3. Sınıf - I. Öğretim</option>
        <option value="3-II">3. Sınıf - II. Öğretim</option>
        <option value="4-I">4. Sınıf - I. Öğretim</option>
        <option value="4-II">4. Sınıf - II. Öğretim</option>
    </select>
</div>`;

if(c.match(regex)) {
    c = c.replace(regex, replacement);
    
    // Add schedule.js script before closing body
    if(!c.includes('schedule.js')) {
        c = c.replace('</body>', '<script type="module" src="schedule.js"></script>\n</body>');
    }
    
    fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/index.html', c);
    console.log('Updated index.html');
} else {
    console.log('Regex did not match!');
}
