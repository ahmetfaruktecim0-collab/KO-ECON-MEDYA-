const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The layout consists of Sidebar, Mobile Bottom Bar, and <main>.
// Inside <main>, there is a <header> and then the dashboard content.
// We want to replace the dashboard content with an iframe.

// Find the end of the <header> inside <main>
const headerEndIndex = indexHtml.indexOf('</header>');
if (headerEndIndex === -1) throw new Error("Could not find </header>");

// Find the end of <main>
const mainEndIndex = indexHtml.indexOf('</main>');
if (mainEndIndex === -1) throw new Error("Could not find </main>");

// Create the new content for <main>
const beforeHeader = indexHtml.substring(0, headerEndIndex + '</header>'.length);
const afterMain = indexHtml.substring(mainEndIndex);

const iframeContent = `
    <!-- Game Iframe -->
    <div class="px-margin-mobile md:px-margin-desktop py-6 h-[calc(100vh-80px)]">
        <div class="w-full h-full bg-surface-container rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20 relative">
            <!-- Fullscreen Toggle Button -->
            <button onclick="toggleFullscreen()" class="absolute top-4 right-4 z-50 bg-surface/80 backdrop-blur-md p-2 rounded-lg text-on-surface hover:bg-primary hover:text-white transition-colors border border-outline-variant/20 shadow-sm" title="Tam Ekran">
                <span class="material-symbols-outlined" id="fs-icon">fullscreen</span>
            </button>
            <iframe id="game-iframe" src="statecraft/index.html" class="w-full h-full border-0"></iframe>
        </div>
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
`;

let oyunHtml = beforeHeader + iframeContent + afterMain;

// Change active state on sidebar
// Remove "bg-primary-container text-primary" from index.html link
oyunHtml = oyunHtml.replace(/<a href="index.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-primary-container text-primary font-bold transition-all">/, '<a href="index.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">');
// Note: We'll add the new link to all sidebars next.

fs.writeFileSync('oyun.html', oyunHtml, 'utf8');
console.log("oyun.html created");
