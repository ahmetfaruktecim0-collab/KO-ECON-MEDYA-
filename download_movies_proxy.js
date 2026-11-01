const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
    'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://upload.wikimedia.org/wikipedia/en/e/e3/The_Big_Short_teaser_poster.jpg'),
    'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png'),
    'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://upload.wikimedia.org/wikipedia/en/b/b6/Wall_Street_film.jpg'),
    'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://upload.wikimedia.org/wikipedia/en/4/41/Margin_Call_Poster.jpg'),
    'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://upload.wikimedia.org/wikipedia/en/6/67/Inside_Job_2010_poster.jpg')
];

const dir = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\assets\\movies';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

urls.forEach((url, i) => {
    const dest = path.join(dir, 'm' + (i + 1) + '.jpg');
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        // allorigins redirects to the actual image or returns it. If 3xx, follow it.
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                res2.pipe(file);
                file.on('finish', () => { file.close(); console.log('Downloaded redirected ' + dest); });
            });
            return;
        }
        if (res.statusCode !== 200) {
            console.error('Failed to download ' + url + ': ' + res.statusCode);
            return;
        }
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded ' + dest);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error('Error downloading ' + url + ':', err.message);
    });
});
