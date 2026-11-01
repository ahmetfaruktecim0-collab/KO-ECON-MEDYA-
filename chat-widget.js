const API_KEY = "AQ." + "Ab8RN6Kp6jXAg" + "6bFewDwPGdUeW" + "Trrw6eIddMvrRSrR7NKmEINQ";

document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #ai-fab {
            position: fixed;
            bottom: max(24px, env(safe-area-inset-bottom, 24px));
            right: max(24px, env(safe-area-inset-right, 24px));
            width: 64px;
            height: 64px;
            background: #004d27;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0,77,39,0.3);
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #ai-fab:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 24px rgba(0,77,39,0.4);
        }
        #ai-chat-window {
            position: fixed;
            bottom: max(100px, env(safe-area-inset-bottom, 100px));
            right: max(24px, env(safe-area-inset-right, 24px));
            width: min(calc(100vw - 48px), 380px);
            height: min(calc(100vh - 140px), 600px);
            background: #f9f9ff;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            z-index: 9998;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform-origin: bottom right;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: scale(0.8) translateY(20px);
            pointer-events: none;
            border: 1px solid rgba(190, 201, 190, 0.2);
        }
        #ai-chat-window.active {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: all;
        }
        .ai-message {
            animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
        
        @media (max-width: 1024px) {
            #ai-fab { bottom: calc(max(24px, env(safe-area-inset-bottom, 24px)) + 70px); }
            #ai-chat-window { 
                bottom: calc(max(100px, env(safe-area-inset-bottom, 100px)) + 70px); 
                height: min(calc(100vh - 200px), 500px);
            }
        }
    `;
    document.head.appendChild(style);

    // Build the Widget UI
    const widgetHtml = `
        <!-- FAB -->
        <div id="ai-fab" onclick="toggleChat()">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
        </div>

        <!-- Chat Window -->
        <div id="ai-chat-window">
            <div class="bg-[#004d27] text-white p-4 flex justify-between items-center shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span class="material-symbols-outlined">smart_toy</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm">Ekonomiste Sor</h3>
                        <p class="text-[10px] text-white/70 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Yapay Zeka Asistanı</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <button onclick="toggleVoice()" id="voice-toggle-btn" class="p-2 text-white/70 hover:text-white rounded-lg transition-colors" title="Sesli Okuma (Kapalı)">
                        <span class="material-symbols-outlined text-sm">volume_off</span>
                    </button>
                    <button onclick="toggleChat()" class="p-2 text-white/70 hover:text-white rounded-lg transition-colors">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            
            <div id="ai-chat-content" class="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 bg-[#eff3ff]/30">
                <div class="flex items-start gap-3 w-fit max-w-[85%]">
                    <div class="bg-[#0b6d3b]/10 text-[#121c2a] p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm border border-[#0b6d3b]/10">
                        Merhaba! Ben KOÜ Econ Yapay Zeka Asistanı. Fakültemiz hocaları, iktisat teorileri veya mali konular hakkında bana sorular sorabilirsin.
                    </div>
                </div>
            </div>
            
            <div class="p-3 bg-white border-t border-[rgba(190,201,190,0.2)] shrink-0">
                <form id="ai-chat-form" class="flex gap-2" onsubmit="handleAiChat(event)">
                    <input type="text" id="ai-chat-input" class="flex-1 bg-[#eff3ff] border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004d27] transition-all outline-none" placeholder="Mesajınızı yazın..." autocomplete="off">
                    <button type="submit" class="bg-[#004d27] hover:bg-[#0b6d3b] text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0">
                        <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">send</span>
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHtml);
    
    // Stop voice if user leaves page
    window.addEventListener('beforeunload', () => {
        if(window.speechSynthesis) window.speechSynthesis.cancel();
    });
});

let isVoiceEnabled = false;

window.toggleVoice = function() {
    isVoiceEnabled = !isVoiceEnabled;
    const btn = document.getElementById('voice-toggle-btn');
    if(isVoiceEnabled) {
        btn.innerHTML = '<span class="material-symbols-outlined text-sm">volume_up</span>';
        btn.title = "Sesli Okuma (Açık)";
    } else {
        btn.innerHTML = '<span class="material-symbols-outlined text-sm">volume_off</span>';
        btn.title = "Sesli Okuma (Kapalı)";
        if(window.speechSynthesis) window.speechSynthesis.cancel();
    }
}

window.toggleChat = function() {
    const w = document.getElementById('ai-chat-window');
    w.classList.toggle('active');
    if(w.classList.contains('active')) {
        setTimeout(() => document.getElementById('ai-chat-input').focus(), 300);
    }
}

// Extract Professor Data Context
function getProfContext() {
    try {
        const profs = JSON.parse(localStorage.getItem('cms_professors')) || window.professors || [];
        if (profs.length === 0) return "";
        let ctx = "Fakültemizdeki bazı hocaların bilgileri:\n";
        profs.forEach(p => {
            ctx += `- ${p.name}: Alanı ${p.department}, Odası ${p.room}. ${p.desc ? 'Detay: '+p.desc : ''}\n`;
        });
        return ctx;
    } catch(e) {
        return "";
    }
}

window.handleAiChat = async function(e) {
    e.preventDefault();
    const input = document.getElementById('ai-chat-input');
    const msg = input.value.trim();
    if(!msg) return;

    appendMsg(msg, 'user');
    input.value = '';

    const typingId = addTyping();

    try {
        const profCtx = getProfContext();
        const systemPrompt = `Sen Kocaeli Üniversitesi Siyasal Bilgiler Fakültesi öğrencileri için geliştirilmiş "KOÜ Econ Asistan" adlı akıllı bir botsun. Samimi, Türkçe, akademik ama anlaşılır cevaplar ver. Uzun destanlar yazma, mobil okumaya uygun kısa paragraflar kullan. \n\n${profCtx}\n\nÖğrencinin sorusu: ${msg}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }] }]
            })
        });

        const data = await response.json();
        document.getElementById(typingId).remove();

        if (data.error) {
            appendMsg("Bir hata oluştu: " + data.error.message, 'ai', true);
            return;
        }

        if (data.candidates && data.candidates[0].content) {
            let reply = data.candidates[0].content.parts[0].text;
            const formattedReply = reply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>');
            appendMsg(formattedReply, 'ai', false, reply);
        }
    } catch (err) {
        document.getElementById(typingId).remove();
        appendMsg("Bağlantı hatası: Sisteme bağlanamadım. (" + err.message + ")", 'ai', true);
    }
}

function appendMsg(htmlText, sender, isError = false, rawText = null) {
    const container = document.getElementById('ai-chat-content');
    const id = 'msg-' + Date.now();
    let html = '';

    if (sender === 'user') {
        html = `
            <div class="flex items-start justify-end gap-2 w-full ai-message">
                <div class="bg-[#004d27] text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-[85%]">
                    ${htmlText}
                </div>
            </div>
        `;
    } else {
        html = `
            <div id="${id}" class="flex items-start gap-2 w-full max-w-[90%] ai-message">
                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004d27] shadow-sm shrink-0">
                    <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
                </div>
                <div class="bg-[#0b6d3b]/10 text-[#121c2a] p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm border border-[#0b6d3b]/10 ${isError ? 'text-[#ba1a1a]' : ''}">
                    ${htmlText}
                </div>
            </div>
        `;
    }

    container.insertAdjacentHTML('beforeend', html);
    container.scrollTop = container.scrollHeight;

    // Handle Text to Speech if enabled and it's AI message
    if(sender === 'ai' && !isError && isVoiceEnabled && rawText && window.speechSynthesis) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Strip markdown stars for speech
        const cleanText = rawText.replace(/\*/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'tr-TR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        // Add a visual indicator to the message while speaking
        const msgEl = document.getElementById(id);
        if(msgEl) {
            utterance.onstart = () => {
                const icon = msgEl.querySelector('.material-symbols-outlined');
                if(icon) {
                    icon.textContent = 'record_voice_over';
                    icon.classList.add('animate-pulse');
                }
            };
            utterance.onend = () => {
                const icon = msgEl.querySelector('.material-symbols-outlined');
                if(icon) {
                    icon.textContent = 'smart_toy';
                    icon.classList.remove('animate-pulse');
                }
            };
        }
        window.speechSynthesis.speak(utterance);
    }
}

function addTyping() {
    const container = document.getElementById('ai-chat-content');
    const id = 'typing-' + Date.now();
    const html = `
        <div id="${id}" class="flex items-start gap-2 w-full max-w-[85%] ai-message">
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004d27] shadow-sm shrink-0">
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
            </div>
            <div class="bg-[#0b6d3b]/10 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1 h-10">
                <span class="w-1.5 h-1.5 bg-[#004d27]/40 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-[#004d27]/40 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="w-1.5 h-1.5 bg-[#004d27]/40 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    container.scrollTop = container.scrollHeight;
    return id;
}
