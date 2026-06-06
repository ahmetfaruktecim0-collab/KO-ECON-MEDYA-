const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');
const searchString = '<button onclick="document.getElementById(\\'survey-modal\\')"';
const startIndex = indexHtml.indexOf(searchString);

if (startIndex !== -1) {
    // Find the comment preceding it
    const commentIndex = indexHtml.lastIndexOf('<!--', startIndex);
    const actualStart = commentIndex !== -1 ? commentIndex : startIndex;
    let endIndex = indexHtml.indexOf('</script>', actualStart);
    if (endIndex !== -1) {
        endIndex += '</script>'.length;
        indexHtml = indexHtml.substring(0, actualStart) + indexHtml.substring(endIndex);
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log('Removed FAB');
    }
} else {
    console.log('FAB not found');
}
