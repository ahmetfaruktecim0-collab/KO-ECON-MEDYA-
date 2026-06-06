const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the start of the FAB
const fabStart = html.indexOf('<!-- Haftanın Hocası Anketi FAB -->');
if (fabStart !== -1) {
    // Find the end of the script for the FAB
    // It is before </body></html>
    const endTag = '</body></html>';
    const endIdx = html.indexOf(endTag, fabStart);
    if (endIdx !== -1) {
        html = html.substring(0, fabStart) + endTag + '\\n';
        fs.writeFileSync('index.html', html, 'utf8');
        console.log("Successfully removed old FAB and its script from index.html.");
    } else {
        console.log("Could not find end tag.");
    }
} else {
    // Try encoded version if available
    const fabStart2 = html.indexOf('<!-- Haftann Hocas Anketi FAB -->');
    if (fabStart2 !== -1) {
        const endTag = '</body></html>';
        const endIdx = html.indexOf(endTag, fabStart2);
        if (endIdx !== -1) {
            html = html.substring(0, fabStart2) + endTag + '\\n';
            fs.writeFileSync('index.html', html, 'utf8');
            console.log("Successfully removed old FAB (encoded) and its script from index.html.");
        } else {
            console.log("Could not find end tag for encoded.");
        }
    } else {
        // Fallback: Just remove using regex
        console.log("FAB not found by exact string. Trying regex...");
        const regex = /<!-- Haftan[\s\S]*?<\/script>/;
        const match = html.match(regex);
        if(match) {
            html = html.replace(match[0], '');
            fs.writeFileSync('index.html', html, 'utf8');
            console.log("Removed via regex.");
        } else {
            console.log("Regex also failed.");
        }
    }
}
