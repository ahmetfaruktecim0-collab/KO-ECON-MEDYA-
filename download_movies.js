const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
    'https://upload.wikimedia.org/wikipedia/en/e/e3/The_Big_Short_teaser_poster.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png',
    'https://upload.wikimedia.org/wikipedia/en/b/b6/Wall_Street_film.jpg',
    'https://upload.wikimedia.org/wikipedia/en/4/41/Margin_Call_Poster.jpg',
    'https://upload.wikimedia.org/wikipedia/en/6/67/Inside_Job_2010_poster.jpg'
];

const dir = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\assets\\movies';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

urls.forEach((url, i) => {
    const dest = path.join(dir, 'm' + (i + 1) + '.jpg');
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
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
