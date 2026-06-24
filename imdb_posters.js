const https = require('https');

const extract = (id, cb) => {
    https.get('https://www.imdb.com/title/' + id + '/', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const m = data.match(/<meta property="og:image" content="([^"]+)"/);
            if (m) cb(m[1]);
            else cb(null);
        });
    }).on('error', () => cb(null));
};

const ids = ['tt1596363', 'tt0993846', 'tt0094285', 'tt1615147', 'tt1645089'];
ids.forEach((id, i) => extract(id, url => console.log('Movie ' + (i + 1) + ': ' + url)));
