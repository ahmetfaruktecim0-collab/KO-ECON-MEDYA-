const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const domContentLoaded = `
document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard widgets
    if (typeof initClock === 'function') initClock();
    if (typeof initSchedule === 'function') initSchedule();
    if (typeof initAnnouncements === 'function') initAnnouncements();
    if (typeof initEvents === 'function') initEvents();
    if (typeof initProfessorsGrid === 'function') initProfessorsGrid();
});
`;

app += '\n' + domContentLoaded;

fs.writeFileSync('app.js', app, 'utf8');
console.log("Restored DOMContentLoaded to app.js");
