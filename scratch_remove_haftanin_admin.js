const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 1. Remove "Haftanın Hocası" overview card (around line 446)
// Wait, in my previous view:
// <p class="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Haftann Hocas</p>
// <h3 id="dash-teacher"
const overviewStart = html.indexOf('<p class="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Haftan');
if (overviewStart > -1) {
    const parentDivStart = html.lastIndexOf('<div>', overviewStart);
    if (parentDivStart > -1) {
        const parentDivEnd = html.indexOf('</div>', overviewStart) + 6;
        if (parentDivEnd > -1) {
            html = html.substring(0, parentDivStart) + html.substring(parentDivEnd);
        }
    }
}

// 2. Remove "Oyları İncele" button and "Bize Katıl Başvuruları" button? 
// Wait, the user ONLY wants "haftanın hocası" removed! They explicitly asked for "Bize Katıl" details earlier, they want to KEEP "Bize Katıl Başvuruları"!
// The button "Oyları İncele" is:
const btnOylari = html.indexOf('<button onclick="viewVotes()"');
if (btnOylari > -1) {
    const btnOylariEnd = html.indexOf('</button>', btnOylari) + 9;
    html = html.substring(0, btnOylari) + html.substring(btnOylariEnd);
}

// 3. Remove the big "Editor's Pick - Haftanın Hocası" card (around line 495)
const editorPickStart = html.indexOf('<p class="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Editor\'s Pick</p>');
if (editorPickStart > -1) {
    const parentCardStart = html.lastIndexOf('<div class="p-6 bg-primary text-white', editorPickStart);
    if (parentCardStart > -1) {
        const parentCardEnd = html.indexOf('<!-- Decoration -->', editorPickStart);
        if (parentCardEnd > -1) {
            // Need to find the closing div of this card. It might be right before <!-- Decoration --> or after it.
            // Actually let's just use regex to remove the whole Editor's Pick section if it's a grid item.
            // Better to just delete the inner HTML or the whole div if we can safely find the end.
            const nextDivEnd = html.indexOf('</div>\n</div>', parentCardEnd);
            if (nextDivEnd > -1) {
                html = html.substring(0, parentCardStart) + html.substring(nextDivEnd + 13);
            }
        }
    }
}

// 4. Remove `viewVotes` modal
const modalStart = html.indexOf('id="admin-votes-modal"');
if (modalStart > -1) {
    const modalDivStart = html.lastIndexOf('<div', modalStart);
    // Find the end of this modal by looking for the next <script> or something.
    // It's usually right before <div id="admin-apps-modal"> or </body>.
    const modalEnd = html.indexOf('window.viewVotes = async function()');
    if (modalEnd > -1) {
        const funcEnd = html.indexOf('window.closeVotesModal = function()');
        const totalEnd = html.indexOf('};', funcEnd + 50) + 2;
        // We can just wipe out the whole block from modalDivStart to totalEnd
        html = html.substring(0, modalDivStart) + html.substring(totalEnd);
    }
}

fs.writeFileSync('admin.html', html, 'utf8');
console.log("Removed Haftanın Hocası from admin.html");
