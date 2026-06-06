const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Remove calls to initVoting()
app = app.replace(/initVoting\(\);\s*/g, '');

// 2. Remove initVoting function
const initStart = app.indexOf('async function initVoting() {');
if (initStart > -1) {
    const initEnd = app.indexOf('function initProfessorsGrid()', initStart);
    if (initEnd > -1) {
        app = app.substring(0, initStart) + app.substring(initEnd);
    }
}

// 3. Remove openVotingModal and castVote
const globalStart = app.indexOf('window.openVotingModal');
if (globalStart > -1) {
    const globalEnd = app.indexOf('window.closeVotingModal = function', globalStart);
    if (globalEnd > -1) {
        const closeEnd = app.indexOf('};', globalEnd) + 2;
        app = app.substring(0, globalStart) + app.substring(closeEnd);
    }
}

fs.writeFileSync('app.js', app, 'utf8');
console.log("Removed voting logic from app.js");
