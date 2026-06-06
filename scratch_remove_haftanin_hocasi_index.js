const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the native card
const cardStartRegex = /<!-- Haftan[\s\S]*?id="haftanin-hocasi-card">/;
const matchCard = html.match(cardStartRegex);
if (matchCard) {
    const startIdx = matchCard.index;
    // The card ends with </div> before <!-- Yaklaşan Etkinlikler -->
    const endIdx = html.indexOf('<!-- Yaklaşan Etkinlikler -->', startIdx);
    if (endIdx > -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
    } else {
        // encoded version?
        const endIdxEncoded = html.indexOf('<!-- Yakla', startIdx);
        if (endIdxEncoded > -1) {
            html = html.substring(0, startIdx) + html.substring(endIdxEncoded);
        }
    }
}

// 2. Remove the modal
const modalStartRegex = /<!-- Survey Modal[\s\S]*?id="survey-modal"/;
const matchModal = html.match(modalStartRegex);
if (matchModal) {
    const startIdx = matchModal.index;
    // The modal is before <script src="professors.js">
    const endIdx = html.indexOf('<script src="professors.js">', startIdx);
    if (endIdx > -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
    }
}

// 3. Remove the vote logic from the module script
const formLogicStart = html.indexOf("const voteForm = document.getElementById('vote-form');");
if (formLogicStart > -1) {
    const scriptEnd = html.lastIndexOf('});', html.lastIndexOf('</script>'));
    if (scriptEnd > -1) {
        // Be careful, maybe just replace the whole event listener
        const logicStr = html.substring(formLogicStart, scriptEnd + 3);
        html = html.replace(logicStr, '');
    }
}

// 4. Also remove loadResults
const resultsLogicStart = html.indexOf("const resultsContainer = document.getElementById('vote-results');");
if (resultsLogicStart > -1) {
    const loadResultsEnd = html.indexOf("loadResults();", resultsLogicStart) + "loadResults();".length;
    if (loadResultsEnd > -1) {
        const resultsStr = html.substring(resultsLogicStart, loadResultsEnd);
        html = html.replace(resultsStr, '');
    }
}

// 5. Remove select population
const selectLogicStart = html.indexOf("const select = document.getElementById('voter-selection');");
if (selectLogicStart > -1) {
    const selectEnd = html.indexOf("}", selectLogicStart) + 1;
    if (selectEnd > -1) {
        const selectStr = html.substring(selectLogicStart, selectEnd);
        html = html.replace(selectStr, '');
    }
}


fs.writeFileSync('index.html', html, 'utf8');
console.log("Removed Haftanın Hocası from index.html");
