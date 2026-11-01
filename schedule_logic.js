let scheduleData = [];
let currentViewMode = 'today'; // 'today' | 'tomorrow'

// Expose modal functions to global scope for HTML buttons
window.openClassSelectorModal = function() {
    const modal = document.getElementById('class-selector-modal');
    if(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Pre-fill if exists
        const savedLevel = localStorage.getItem('schedule_classLevel');
        const savedType = localStorage.getItem('schedule_classType');
        if(savedLevel) document.getElementById('modal-class-level').value = savedLevel;
        if(savedType) document.getElementById('modal-class-type').value = savedType;
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            const content = document.getElementById('class-selector-modal-content');
            if (content) content.classList.remove('scale-95');
        }, 10);
    }
};

window.closeClassSelectorModal = function() {
    const modal = document.getElementById('class-selector-modal');
    if(modal) {
        modal.classList.add('opacity-0');
        const content = document.getElementById('class-selector-modal-content');
        if (content) content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
};

window.saveClassSelection = function() {
    const level = document.getElementById('modal-class-level').value;
    const type = document.getElementById('modal-class-type').value;
    localStorage.setItem('schedule_classLevel', level);
    localStorage.setItem('schedule_classType', type);
    window.closeClassSelectorModal();
    renderSchedule();
};

window.setScheduleViewMode = function(mode) {
    currentViewMode = mode;
    const todayBtn = document.getElementById('tab-today-btn');
    const tomorrowBtn = document.getElementById('tab-tomorrow-btn');

    if (todayBtn && tomorrowBtn) {
        if (mode === 'today') {
            todayBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-primary text-white shadow-sm flex items-center gap-1';
            tomorrowBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary flex items-center gap-1';
        } else {
            tomorrowBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-primary text-white shadow-sm flex items-center gap-1';
            todayBtn.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary flex items-center gap-1';
        }
    }
    renderSchedule();
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./schedule.json?v=' + Date.now());
        scheduleData = await response.json();
    } catch (e) {
        console.error("Failed to load schedule", e);
        return;
    }
    
    renderSchedule();
    // Update every 30 seconds for clock & schedule sync
    setInterval(renderSchedule, 30000);
});

function parseTimeRange(timeStr) {
    if(!timeStr) return null;
    const parts = timeStr.split('-');
    if(parts.length !== 2) return null;
    const startParts = parts[0].trim().split(/[.:]/);
    const endParts = parts[1].trim().split(/[.:]/);
    if(startParts.length !== 2 || endParts.length !== 2) return null;
    
    return {
        start: parseInt(startParts[0]) * 60 + parseInt(startParts[1]),
        end: parseInt(endParts[0]) * 60 + parseInt(endParts[1])
    };
}

window.renderSchedule = function() {
    const container = document.getElementById('schedule-container');
    if(!container) return;

    // Update Live Clock Badge
    const now = new Date();
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const curDay = days[now.getDay()];
    const hoursStr = String(now.getHours()).padStart(2, '0');
    const minsStr = String(now.getMinutes()).padStart(2, '0');
    const curTimeStr = `${hoursStr}:${minsStr}`;

    const liveDayEl = document.getElementById('schedule-live-day');
    const liveTimeEl = document.getElementById('schedule-live-time');
    if (liveDayEl) liveDayEl.textContent = curDay;
    if (liveTimeEl) liveTimeEl.textContent = curTimeStr;

    const level = localStorage.getItem('schedule_classLevel');
    const type = localStorage.getItem('schedule_classType');
    
    if(!level || !type) {
        container.innerHTML = `
        <div class="p-8 text-center flex flex-col items-center justify-center">
            <span class="material-symbols-outlined text-4xl text-primary/30 mb-3">tune</span>
            <p class="text-sm font-bold text-on-surface-variant mb-4">Sana özel ders programını görebilmek için sınıfını ayarlamalısın.</p>
            <button onclick="openClassSelectorModal()" class="px-5 py-2 text-xs font-bold bg-primary text-white rounded-xl shadow-md hover:shadow-lg transition-all">Sınıf Ayarla</button>
        </div>`;
        return;
    }

    const currentMins = now.getHours() * 60 + now.getMinutes();
    
    function getClasses(dayStr) {
        let cls = scheduleData.filter(c => String(c.classLevel) === String(level) && c.type === type && c.day === dayStr);
        let proc = [];
        for(let c of cls) {
            const tr = parseTimeRange(c.time);
            if(tr) proc.push({...c, start: tr.start, end: tr.end});
        }
        proc.sort((a,b) => a.start - b.start);
        return proc;
    }

    container.innerHTML = '';

    // ================= YARIN / GELECEK GÜN MODU =================
    if (currentViewMode === 'tomorrow') {
        const tomorrowIndex = (now.getDay() + 1) % 7;
        let targetDay = days[tomorrowIndex];
        let isWeekendNotice = false;

        // If tomorrow is Saturday (6) or Sunday (0), show Monday (1)
        if (tomorrowIndex === 6 || tomorrowIndex === 0) {
            targetDay = 'Pazartesi';
            isWeekendNotice = true;
        }

        const tomorrowClasses = getClasses(targetDay);

        const bannerText = isWeekendNotice 
            ? `HAFTA SONU • PAZARTESİ GÜNÜ DERSLERİ (${level}. Sınıf ${type}. Öğretim)`
            : `YARIN: ${targetDay.toUpperCase()} GÜNÜ DERSLERİ (${level}. Sınıf ${type}. Öğretim)`;

        container.innerHTML += `
            <div class="px-4 py-2.5 bg-primary/10 text-primary text-xs font-bold flex items-center justify-between border-b border-outline-variant/10">
                <span class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">event</span>
                    ${bannerText}
                </span>
                <span class="text-[11px] font-semibold bg-white/80 px-2 py-0.5 rounded-full text-slate-700">${tomorrowClasses.length} Ders</span>
            </div>
        `;

        if (tomorrowClasses.length === 0) {
            container.innerHTML += `
                <div class="p-8 text-center text-on-surface-variant/60 text-sm font-semibold">
                    <span class="material-symbols-outlined text-4xl text-primary/30 mb-2 block">event_busy</span>
                    ${targetDay} günü için sisteme kayıtlı ders bulunmamaktadır.
                </div>
            `;
            return;
        }

        tomorrowClasses.forEach((c) => {
            container.innerHTML += `
            <div class="p-4 hover:bg-surface-container/60 transition-colors flex items-center justify-between border-b border-outline-variant/10">
                <div class="flex items-center space-x-3.5">
                    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span class="material-symbols-outlined text-xl">menu_book</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h5 class="text-sm font-bold text-on-surface">${c.courseName || c.course}</h5>
                            ${c.courseCode ? `<span class="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">${c.courseCode}</span>` : ''}
                        </div>
                        <p class="text-xs text-secondary mt-0.5">
                            <span class="font-semibold text-primary">${c.time}</span> • Salon ${c.room || '-'} • ${c.instructor || c.teacher || 'Bölüm'}
                        </p>
                    </div>
                </div>
                <div class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-container text-slate-700 whitespace-nowrap hidden sm:block">
                    Salon ${c.room || '-'}
                </div>
            </div>`;
        });
        return;
    }

    // ================= BUGÜN MODU =================
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    if (isWeekend) {
        container.innerHTML = `
            <div class="p-8 text-center flex flex-col items-center justify-center">
                <span class="material-symbols-outlined text-5xl text-amber-500/70 mb-2">weekend</span>
                <h4 class="text-base font-bold text-slate-800 mb-1">Hafta Sonu Tatili!</h4>
                <p class="text-xs text-slate-500 mb-4">Bugün dersiniz bulunmamaktadır. İyi dinlenmeler! ☀️</p>
                <button onclick="setScheduleViewMode('tomorrow')" class="px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">event_upcoming</span>
                    Pazartesi Derslerini Gör
                </button>
            </div>
        `;
        return;
    }

    const todayClasses = getClasses(curDay);

    if (todayClasses.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center text-on-surface-variant/60 text-sm font-semibold">
                <span class="material-symbols-outlined text-4xl text-primary/30 mb-2 block">event_available</span>
                Bugün (${curDay}) için kayıtlı dersiniz bulunmuyor.
                <div class="mt-3">
                    <button onclick="setScheduleViewMode('tomorrow')" class="text-xs font-bold text-primary underline">Yarının derslerini incele →</button>
                </div>
            </div>
        `;
        return;
    }

    let currentClass = null;
    let upcomingClasses = [];
    let pastClasses = [];

    for (let i = 0; i < todayClasses.length; i++) {
        const c = todayClasses[i];
        if (currentMins >= c.start && currentMins <= c.end) {
            currentClass = c;
        } else if (c.start > currentMins) {
            upcomingClasses.push(c);
        } else {
            pastClasses.push(c);
        }
    }

    // Header info banner
    container.innerHTML += `
        <div class="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold flex items-center justify-between border-b border-outline-variant/10">
            <span>BUGÜN: ${curDay.toUpperCase()} (${level}. Sınıf ${type}. Öğretim)</span>
            <span class="text-[11px] font-semibold text-primary">${todayClasses.length} Ders Planlandı</span>
        </div>
    `;

    // Active (Live) Class
    if (currentClass) {
        container.innerHTML += `
        <div class="p-4 bg-primary/10 border-l-4 border-primary hover:bg-primary/15 transition-colors flex items-center justify-between">
            <div class="flex items-center space-x-3.5">
                <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                    <span class="material-symbols-outlined text-xl">menu_book</span>
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h5 class="text-sm font-black text-on-surface">${currentClass.courseName || currentClass.course}</h5>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] text-white font-black tracking-wider animate-pulse">CANLI</span>
                    </div>
                    <p class="text-xs text-secondary mt-0.5 font-medium">
                        <span class="font-bold text-primary">${currentClass.time}</span> • Salon ${currentClass.room || '-'} • ${currentClass.instructor || currentClass.teacher}
                    </p>
                </div>
            </div>
            <div class="text-xs font-bold text-primary whitespace-nowrap hidden sm:block">Şu Anki Ders</div>
        </div>`;
    }

    // Upcoming Classes
    if (upcomingClasses.length > 0) {
        upcomingClasses.forEach((nextClass, idx) => {
            const isFirst = idx === 0 && !currentClass;
            container.innerHTML += `
            <div class="p-4 hover:bg-surface-container/60 transition-colors flex items-center justify-between border-b border-outline-variant/10">
                <div class="flex items-center space-x-3.5">
                    <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                        <span class="material-symbols-outlined text-xl">schedule</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h5 class="text-sm font-bold text-on-surface">${nextClass.courseName || nextClass.course}</h5>
                            ${isFirst ? `<span class="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">Yaklaşan</span>` : ''}
                        </div>
                        <p class="text-xs text-secondary mt-0.5">
                            <span class="font-semibold text-slate-800">${nextClass.time}</span> • Salon ${nextClass.room || '-'} • ${nextClass.instructor || nextClass.teacher}
                        </p>
                    </div>
                </div>
                <div class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-container text-slate-700 whitespace-nowrap hidden sm:block">
                    Salon ${nextClass.room || '-'}
                </div>
            </div>`;
        });
    }

    // If all classes for today are completed
    if (!currentClass && upcomingClasses.length === 0 && pastClasses.length > 0) {
        container.innerHTML += `
            <div class="p-6 text-center bg-slate-50/50">
                <span class="material-symbols-outlined text-4xl text-emerald-500 mb-1 block">check_circle</span>
                <p class="text-sm font-bold text-slate-800">Bugünkü tüm dersleriniz tamamlandı! 🎉</p>
                <p class="text-xs text-slate-500 mt-0.5 mb-3">İyi dinlenmeler dileriz.</p>
                <button onclick="setScheduleViewMode('tomorrow')" class="px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">event_upcoming</span>
                    Yarının Derslerini İncele
                </button>
            </div>
        `;
    }
};
