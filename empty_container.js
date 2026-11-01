const fs = require('fs');
let c = fs.readFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/index.html', 'utf8');

const regex = /<div id="schedule-container"[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<div class="space-y-6" id="events-list">/;
const replacement = `<div id="schedule-container" class="divide-y divide-outline-variant/10"></div>
</div>
<div class="space-y-6" id="events-list">`;

if (c.match(regex)) {
    c = c.replace(regex, replacement);
    fs.writeFileSync('C:/Users/ASUS/Desktop/sbf-hub-yeni/index.html', c);
    console.log('Emptied container');
} else {
    console.log('Not found');
}
