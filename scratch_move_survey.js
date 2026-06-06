const fs = require('fs');

const hocalarPath = 'c:\\Users\\ASUS\\.gemini\\antigravity\\playground\\prismic-whirlpool\\sbf-hub\\hocalar.html';
const indexPath = 'c:\\Users\\ASUS\\.gemini\\antigravity\\playground\\prismic-whirlpool\\sbf-hub\\index.html';

let hocalarHtml = fs.readFileSync(hocalarPath, 'utf8');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const surveyStartTag = '<!-- Haftanın Hocası Anketi FAB -->';
const surveyEndTag = '</script>';

const startIndex = hocalarHtml.indexOf(surveyStartTag);

if (startIndex !== -1) {
    // Find the end of the injected script block
    let endIndex = hocalarHtml.indexOf(surveyEndTag, startIndex);
    if (endIndex !== -1) {
        endIndex += surveyEndTag.length; // include the tag itself
        
        // Extract the UI
        const surveyUI = hocalarHtml.substring(startIndex, endIndex);
        
        // Remove from hocalar.html
        hocalarHtml = hocalarHtml.substring(0, startIndex) + hocalarHtml.substring(endIndex);
        fs.writeFileSync(hocalarPath, hocalarHtml, 'utf8');
        console.log('Removed from hocalar.html');
        
        // Add to index.html (before </body>)
        if (!indexHtml.includes(surveyStartTag)) {
            indexHtml = indexHtml.replace('</body>', surveyUI + '\n</body>');
            fs.writeFileSync(indexPath, indexHtml, 'utf8');
            console.log('Added to index.html');
        } else {
            console.log('index.html already has the survey UI');
        }
    } else {
        console.log('Could not find end of survey block in hocalar.html');
    }
} else {
    console.log('Survey UI not found in hocalar.html. Checking if already moved...');
}

