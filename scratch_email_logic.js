const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Add the helper function to global scope
const helperFunc = `
window.sendEmail = function(email) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = 'mailto:' + email;
    } else {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email, '_blank');
    }
};
`;

// Insert it somewhere near the top or before initProfessorsGrid
const initGridIndex = appJs.indexOf('function initProfessorsGrid()');
if (initGridIndex > -1) {
    appJs = appJs.substring(0, initGridIndex) + helperFunc + '\n' + appJs.substring(initGridIndex);
}

// Update the button
const oldBtn = "onclick=\"window.location.href='mailto:${prof.email}'\"";
const newBtn = "onclick=\"sendEmail('${prof.email}')\"";
appJs = appJs.replace(oldBtn, newBtn);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Updated email button logic in app.js");
