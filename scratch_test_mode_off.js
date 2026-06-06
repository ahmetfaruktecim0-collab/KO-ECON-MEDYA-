const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace(/const isFriday = true;\s*\/\/\s*TEST MODU.*?$/m, 'const isFriday = dayOfWeek === 5; // Cuma günü');

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Test mode disabled");
