const fs = require('fs');

let html = fs.readFileSync('hocalar.html', 'utf8');

const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>') + '</main>'.length;

if (mainStart === -1 || mainEnd === -1) {
    console.error("Could not find main tag");
    process.exit(1);
}

const beforeMain = html.substring(0, mainStart);
const afterMain = html.substring(mainEnd);

const iframeContent = `
<main class="flex-1 p-4 md:p-6 lg:ml-64 space-y-gutter overflow-y-auto custom-scrollbar bg-[#F3F4F6] relative h-screen">
    <!-- Header -->
    <header class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-title-lg font-bold text-on-surface">Statecraft: Trkiye</h1>
            <p class="text-body-sm text-secondary">Siyasi Strateji ve Ynetim Simlasyonu</p>
        </div>
        <button onclick="toggleFullscreen()" class="p-2 bg-surface-container rounded-lg text-on-surface hover:bg-primary hover:text-white transition-colors border border-outline-variant/20 shadow-sm" title="Tam Ekran">
            <span class="material-symbols-outlined" id="fs-icon">fullscreen</span>
        </button>
    </header>

    <!-- Game Iframe -->
    <div class="w-full bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20" style="height: calc(100vh - 140px);">
        <iframe id="game-iframe" src="statecraft/index.html" class="w-full h-full border-0"></iframe>
    </div>
    
    <script>
        function toggleFullscreen() {
            const iframeContainer = document.getElementById('game-iframe').parentElement;
            const icon = document.getElementById('fs-icon');
            
            if (!document.fullscreenElement) {
                if (iframeContainer.requestFullscreen) {
                    iframeContainer.requestFullscreen();
                } else if (iframeContainer.webkitRequestFullscreen) { /* Safari */
                    iframeContainer.webkitRequestFullscreen();
                } else if (iframeContainer.msRequestFullscreen) { /* IE11 */
                    iframeContainer.msRequestFullscreen();
                }
                icon.textContent = 'fullscreen_exit';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
                icon.textContent = 'fullscreen';
            }
        }
        
        document.addEventListener('fullscreenchange', () => {
            const icon = document.getElementById('fs-icon');
            if (!document.fullscreenElement) {
                icon.textContent = 'fullscreen';
            }
        });
    </script>
</main>
`;

let oyunHtml = beforeMain + iframeContent + afterMain;

// Change title
oyunHtml = oyunHtml.replace(/<title>.*?<\/title>/, '<title>Oyun - KO Econ</title>');

// Remove active class from hocalar link
oyunHtml = oyunHtml.replace(/<a href="hocalar.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-primary-container text-primary font-bold transition-all">/, '<a href="hocalar.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">');

fs.writeFileSync('oyun.html', oyunHtml, 'utf8');
console.log("oyun.html created");
