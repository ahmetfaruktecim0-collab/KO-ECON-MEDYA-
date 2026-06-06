const https = require('https');

https.get('https://sbf.kocaeli.edu.tr/duyurular', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // try to find __NEXT_DATA__
    const nextDataMatch = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (nextDataMatch) {
      console.log('Found __NEXT_DATA__');
      try {
        const json = JSON.parse(nextDataMatch[1]);
        console.log(JSON.stringify(json.props.pageProps).substring(0, 500));
      } catch (e) {
        console.log('JSON parse error');
      }
    } else {
      console.log('No __NEXT_DATA__ found');
      // maybe it is in the push array we saw earlier: __next_f.push
      const titleMatches = data.match(/([a-zA-ZçğıöşüÇĞİÖŞÜ0-9\s]+Dönemi Sınav Takvimi[a-zA-ZçğıöşüÇĞİÖŞÜ0-9\s]+)/gi);
      console.log('Title matches:', titleMatches);
    }
    
    const h3Match = data.match(/<h3[^>]*>(.*?)<\/h3>/g);
    console.log('h3 tags:', h3Match);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
