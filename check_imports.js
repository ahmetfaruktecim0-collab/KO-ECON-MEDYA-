const fs = require('fs');
const d = 'C:\\Users\\ASUS\\Desktop\\sbf-hub';
['index.html', 'sosyal-kose.html', 'hocalar.html'].forEach(f => {
    let c = fs.readFileSync(d + '\\' + f, 'utf8');
    console.log(f + ': ' + (c.match(/<script[^>]*src="[^"]*app\.js[^"]*"/)?.[0] || 'no app.js') + ' | ' + (c.match(/<script[^>]*src="[^"]*auth\.js[^"]*"/)?.[0] || 'no auth.js'));
});
