const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Inject the HTML for results
const resultsHtml = `
        <div class="mt-6 border-t border-outline-variant/20 pt-6">
            <h3 class="text-lg font-bold text-center mb-4">Mevcut Durum (Sıralama)</h3>
            <div id="vote-results" class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                <div class="text-center text-sm text-outline animate-pulse">Sonuçlar yükleniyor...</div>
            </div>
        </div>
`;
content = content.replace(/<\/form>\s*<\/div>\s*<\/div>/, "</form>\n" + resultsHtml + "\n    </div>\n</div>");

// 2. Inject the JS logic for loadResults
const resultsJs = `
    const resultsContainer = document.getElementById('vote-results');
    
    import { onSnapshot } from './firebase-config.js';
    
    function loadResults() {
        if(!resultsContainer) return;
        onSnapshot(collection(db, 'haftanin_hocasi_oylari'), snapshot => {
            const counts = {};
            snapshot.forEach(doc => {
                const data = doc.data();
                if(data.professorName) {
                    counts[data.professorName] = (counts[data.professorName] || 0) + 1;
                }
            });

            // Convert to array and sort
            const sortedResults = Object.keys(counts).map(key => ({
                name: key,
                votes: counts[key]
            })).sort((a, b) => b.votes - a.votes);

            resultsContainer.innerHTML = '';
            
            if(sortedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="text-center text-sm text-outline">Henüz oy kullanılmadı. İlk oyu sen ver!</div>';
                return;
            }

            // Top score for percentage bar
            const maxVotes = sortedResults[0].votes;

            sortedResults.forEach((res, index) => {
                const percentage = (res.votes / maxVotes) * 100;
                const isWinner = index === 0;
                
                resultsContainer.innerHTML += \`
                    <div class="bg-surface-container-low p-3 rounded-lg relative overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 bg-\${isWinner ? 'orange' : 'primary'}-500/20" style="width: \${percentage}%"></div>
                        <div class="flex justify-between items-center relative z-10">
                            <div class="flex items-center gap-2">
                                \${isWinner ? '<span class="material-symbols-outlined text-orange-500 text-lg">military_tech</span>' : ''}
                                <span class="font-bold text-sm \${isWinner ? 'text-orange-600 dark:text-orange-400' : 'text-on-surface'}">\${res.name}</span>
                            </div>
                            <span class="font-black text-sm text-outline">\${res.votes} Oy</span>
                        </div>
                    </div>
                \`;
            });
        });
    }

    loadResults();
`;

// Inject into the module script
content = content.replace("const submitBtn = document.getElementById('vote-submit-btn');", "const submitBtn = document.getElementById('vote-submit-btn');\n" + resultsJs);

// Also need to fix imports if onSnapshot is not imported? I did import it previously. Wait, let me just add it.
content = content.replace("import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';", "import { db, collection, addDoc, serverTimestamp, onSnapshot } from './firebase-config.js';");
content = content.replace("import { onSnapshot } from './firebase-config.js';", ""); // remove duplicate if any

fs.writeFileSync('index.html', content, 'utf8');
console.log("Updated index modal with results");
