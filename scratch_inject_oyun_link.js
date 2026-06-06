const fs = require('fs');
const path = require('path');

const targetDir = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'playground', 'prismic-whirlpool', 'sbf-hub');
const filesToProcess = ['index.html', 'hocalar.html', 'duyurular.html', 'sosyal-kose.html', 'iktisatcinin-kaleminden.html', 'yemek.html', 'oyun.html', 'admin.html', 'poster.html'];

filesToProcess.forEach(filename => {
    const filepath = path.join(targetDir, filename);
    if (!fs.existsSync(filepath)) return;
    
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Desktop Nav Addition
    // Look for the end of the Yemek link
    const yemekDesktop = `<span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
  <span class="font-title-md text-title-md">Yemek</span>
  </a>`;
    const oyunDesktopLink = `
  <a class="${filename === 'oyun.html' ? 'bg-on-primary/10 text-on-primary rounded-lg mx-2 px-4 py-3 flex items-center space-x-3 transition-all translate-x-1' : 'text-on-primary/70 hover:text-on-primary hover:bg-on-primary/5 mx-2 px-4 py-3 flex items-center space-x-3 transition-all'}" href="oyun.html" >
  <span class="material-symbols-outlined" data-icon="sports_esports">sports_esports</span>
  <span class="font-title-md text-title-md">Oyun</span>
  </a>`;

    if (!content.includes('href="oyun.html"') && content.includes(yemekDesktop)) {
        content = content.replace(yemekDesktop, yemekDesktop + oyunDesktopLink);
    }

    // 2. Mobile Nav Addition (if applicable)
    // Look for the end of the İktisat link (or Yemek if it exists in mobile nav)
    // In mobile nav, the last item might be İktisat
    const iktisatMobile = `<span class="material-symbols-outlined" id="nav-icon-iktisatcinin-kaleminden">menu_book</span>
          <span class="text-[9px] font-bold mt-1">İktisat</span>
      </a>`;
    const oyunMobileLink = `
      <a href="oyun.html" class="${filename === 'oyun.html' ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1 scale-110' : 'flex flex-col items-center p-2 text-on-surface-variant hover:text-primary transition-colors min-w-[60px]'}">
          <span class="material-symbols-outlined" id="nav-icon-oyun">sports_esports</span>
          <span class="text-[9px] font-bold mt-1">Oyun</span>
      </a>`;

    if (!content.includes('id="nav-icon-oyun"') && content.includes(iktisatMobile)) {
        content = content.replace(iktisatMobile, iktisatMobile + '\n' + oyunMobileLink);
    }

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Injected Oyun links");
