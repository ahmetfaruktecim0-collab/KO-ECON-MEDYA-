const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('api') || url.includes('json') || url.includes('duyuru')) {
            console.log('Found API/JSON request:', url);
        }
    });

    await page.goto('https://sbf.kocaeli.edu.tr/', { waitUntil: 'networkidle2' });
    
    const text = await page.evaluate(() => document.body.innerText);
    console.log('--- Page Text Snippet ---');
    console.log(text.substring(0, 500));
    
    // Check for links
    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText, href: a.href })));
    console.log('--- Links ---');
    console.log(links.filter(l => l.href.includes('duyuru') || l.text.toLowerCase().includes('duyuru')));
    
    await browser.close();
})();
