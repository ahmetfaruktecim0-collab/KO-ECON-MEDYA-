// KOÜ Econ Medya - Application Logic

const courseSchedule = [
  { "day": "Pazartesi", "time": "08.00-08.50", "course": "İktisatta Bilgisayar Uygulamaları II", "teacher": "Dr. Öğr. Üyesi Muhammet Rıdvan İNCE", "room": "218" },
  { "day": "Pazartesi", "time": "09.00-09.50", "course": "İktisatçılar İçin Matematik II", "teacher": "Prof. Dr. Şevket Alper KOÇ", "room": "213" },
  { "day": "Pazartesi", "time": "10.00-10.50", "course": "Ekonomide Güncel Tartışmalar", "teacher": "Doç. Dr. Erhan ORUÇ", "room": "220" },
  { "day": "Pazartesi", "time": "11.00-11.50", "course": "Uluslararası İktisat II", "teacher": "Dr. Öğr. Üyesi Hanife BIDIRDI", "room": "213" },
  { "day": "Pazartesi", "time": "12.00-12.50", "course": "İktisat Okumaları", "teacher": "Dr. Öğr. Üyesi Bengü DOĞANGÜN YASA", "room": "216" },
  { "day": "Pazartesi", "time": "13.00-13.50", "course": "Makro İktisat II", "teacher": "Doç. Dr. Erhan ORUÇ", "room": "215" },
  { "day": "Pazartesi", "time": "14.00-14.50", "course": "Ekonometri II", "teacher": "Prof. Dr. Selçuk KOÇ", "room": "216" },
  { "day": "Pazartesi", "time": "15.00-15.50", "course": "Bilgi Ekonomisi", "teacher": "Dr. Öğr. Üyesi Hanife BIDIRDI", "room": "218" },
  { "day": "Pazartesi", "time": "16.00-16.50", "course": "Ekonometri II", "teacher": "Prof. Dr. Selçuk KOÇ", "room": "216" },
  
  { "day": "Salı", "time": "08:00-08:50", "course": "Ekonomide İleri Düzey Okumalar II", "teacher": "Prof. Dr. Şevket Alper KOÇ", "room": "220" },
  { "day": "Salı", "time": "09.00-09.50", "course": "Muhasebe", "teacher": "Prof. Dr. Ednan AYVAZ", "room": "213" },
  { "day": "Salı", "time": "10.00-10.50", "course": "Türkiye Ekonomisi", "teacher": "Prof. Dr. Ayhan ORHAN", "room": "218" },
  { "day": "Salı", "time": "11.00-11.50", "course": "Muhasebe", "teacher": "Prof. Dr. Ednan AYVAZ", "room": "213" },
  { "day": "Salı", "time": "12.00-12.50", "course": "Labor Economics", "teacher": "Dr. Öğr. Üyesi M. Rıdvan İNCE", "room": "220" },
  { "day": "Salı", "time": "13.00-13.50", "course": "Sosyal Bilimlerde Temel Okumalar II", "teacher": "Prof. Dr. Yusuf BAYRAKTUTAN", "room": "213" },
  { "day": "Salı", "time": "14.00-14.50", "course": "Maliye Politikası", "teacher": "Prof. Dr. Vedat CENGİZ", "room": "215" },
  { "day": "Salı", "time": "15.00-15.50", "course": "Finansal Ekonometri", "teacher": "Arş. Gör. Dr. F. Ceren BOSTANCI", "room": "218" },
  { "day": "Salı", "time": "16.00-16.50", "course": "Maliye Politikası", "teacher": "Prof. Dr. Vedat CENGİZ", "room": "215" },

  { "day": "Çarşamba", "time": "09.00-09.50", "course": "Atatürk İlkeleri ve İnkılap Tarihi II (UE)", "teacher": "Öğr. Gör. Dr. Melih YİĞİT", "room": "UE" },
  { "day": "Çarşamba", "time": "10.00-10.50", "course": "İstatistik II", "teacher": "Arş. Gör. Dr. F. Ceren BOSTANCI", "room": "213" },
  { "day": "Çarşamba", "time": "11.00-11.50", "course": "Kalkınma Ekonomisi", "teacher": "Doç. Dr. Gülten DURSUN", "room": "218" },
  { "day": "Çarşamba", "time": "13.00-13.50", "course": "İslam Ekonomisi", "teacher": "Prof. Dr. Hasan B. KANTARCI", "room": "216" },
  { "day": "Çarşamba", "time": "14.00-14.50", "course": "Türkiye İktisat Tarihi", "teacher": "Dr.Öğr. Üyesi M. Emin YARDIMCI", "room": "218" },
  { "day": "Çarşamba", "time": "15.00-15.50", "course": "Siyaset ve Ekonomi İlişkileri", "teacher": "Prof. Dr. Vedat CENGİZ", "room": "221" },
  { "day": "Çarşamba", "time": "16.00-16.50", "course": "Medya ve Ekonomi", "teacher": "Arş. Gör. Dr. Murat EMİKÖNEL", "room": "218" },

  { "day": "Perşembe", "time": "08:00-08:50", "course": "Kariyer Planlama", "teacher": "Prof. Dr. Ferhat PEHLİVANOĞLU", "room": "213" },
  { "day": "Perşembe", "time": "09.00-09.50", "course": "Oyun Teorisi", "teacher": "Prof. Dr. Şevket Alper KOÇ", "room": "215" },
  { "day": "Perşembe", "time": "10.00-10.50", "course": "İktisada Giriş II", "teacher": "Prof. Dr. Ferhat PEHLİVANOĞLU", "room": "213" },
  { "day": "Perşembe", "time": "11.00-11.50", "course": "Mikro İktisat II", "teacher": "Prof. Dr. Şevket Alper KOÇ", "room": "216" },
  { "day": "Perşembe", "time": "12.00-12.50", "course": "İktisada Giriş II", "teacher": "Prof. Dr. Ferhat PEHLİVANOĞLU", "room": "213" },
  { "day": "Perşembe", "time": "13.00-13.50", "course": "Bankacılık ve Finansal Kurumlar", "teacher": "Doç. Dr. Özgür Bayram SOYLU", "room": "215" },
  { "day": "Perşembe", "time": "14.00-14.50", "course": "Araştırma Yöntemleri", "teacher": "Prof. Dr. Ferhat PEHLİVANOĞLU", "room": "220" },
  { "day": "Perşembe", "time": "15.00-15.50", "course": "Uluslararası Ekonomik Kuruluşlar", "teacher": "Doç. Dr. Gülten DURSUN", "room": "218" },
  { "day": "Perşembe", "time": "16.00-16.50", "course": "İktisat Metodolojisi", "teacher": "Dr. Öğr. Üyesi M. Emin YARDIMCI", "room": "216" },

  { "day": "Cuma", "time": "09.00-09.50", "course": "Spor Ekonomisi", "teacher": "Dr. Öğr. Üyesi Mehmet Çağrı GÖZEN", "room": "215" },
  { "day": "Cuma", "time": "10.00-10.50", "course": "Anayasa Hukuku", "teacher": "Dr. Öğr. Üyesi Arda ERCAN", "room": "216" },
  { "day": "Cuma", "time": "11.00-11.50", "course": "Türk Dili II (UE)", "teacher": "Öğr. Gör. Demet KILIÇKAN", "room": "UE" },
  { "day": "Cuma", "time": "12.00-12.50", "course": "Refah Ekonomisi", "teacher": "Dr. Öğr. Üyesi Mehmet Çağrı GÖZEN", "room": "220" },
  { "day": "Cuma", "time": "15.00-15.50", "course": "Tarım Ekonomisi", "teacher": "Arş. Gör. Dr. Murat EMİKÖNEL", "room": "218" },
  { "day": "Cuma", "time": "16.00-16.50", "course": "Bilgi Ekonomisi", "teacher": "Dr. Öğr. Üyesi Ali Rıza SOLMAZ", "room": "220" }
];

function initClock() {
    const timeEl = document.getElementById('live-time');
    if (!timeEl) return;
    
    function update() {
        const now = new Date();
        timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
    update();
    setInterval(update, 1000);
}

function initSchedule() {
    const currName = document.getElementById('schedule-current-name');
    const currDetail = document.getElementById('schedule-current-detail');
    const nextName = document.getElementById('schedule-next-name');
    const nextDetail = document.getElementById('schedule-next-detail');
    
    function updateSchedule() {
        const now = new Date();
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const curDay = days[now.getDay()];
        const curTime = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
        
        const todaysCourses = courseSchedule.filter(item => item.day === curDay);
        
        let currentCourse = null;
        let nextCourse = null;
        
        for (let i = 0; i < todaysCourses.length; i++) {
            const range = todaysCourses[i].time.replaceAll(':', '.').split('-');
            const start = range[0].trim();
            const end = range[1].trim();
            
            if (curTime >= start && curTime <= end) {
                currentCourse = todaysCourses[i];
                if (i + 1 < todaysCourses.length) nextCourse = todaysCourses[i+1];
            } else if (curTime < start && !nextCourse && !currentCourse) {
                nextCourse = todaysCourses[i];
            }
        }

        if (currName) {
            if (currentCourse) {
                currName.textContent = currentCourse.course;
                currDetail.textContent = `Salon ${currentCourse.room} • ${currentCourse.teacher}`;
            } else {
                currName.textContent = "Şu an aktif ders yok";
                currDetail.textContent = "-";
            }
        }

        if (nextName) {
            if (nextCourse) {
                nextName.textContent = nextCourse.course;
                nextDetail.textContent = `Salon ${nextCourse.room} • ${nextCourse.time}`;
            } else {
                nextName.textContent = "Bugün başka ders yok";
                nextDetail.textContent = "İyi dinlenmeler!";
            }
        }
    }
    
    updateSchedule();
    setInterval(updateSchedule, 60000);
}

function loadAnnouncement() {
    const text = localStorage.getItem('cms_announcement');
    const banner = document.getElementById('announcement-banner');
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    
    if (text && text.trim() !== "") {
        if (titleEl) titleEl.textContent = "Yeni Duyuru Yayında";
        if (descEl) descEl.textContent = text;
        if (banner) banner.classList.remove('hidden');
    } else {
        if (banner) banner.classList.add('hidden');
    }
}

function initAnnouncementsList() {
    const listContainer = document.getElementById('announcements-list');
    if (!listContainer) return;
    
    function render() {
        const list = JSON.parse(localStorage.getItem('cms_announcements_list')) || [];
        if (list.length === 0) {
            listContainer.innerHTML = `<p class="text-sm text-secondary">Henüz duyuru eklenmemiş.</p>`;
            return;
        }
        
        let html = '';
        list.reverse().slice(0, 4).forEach(item => {
            html += `
                <div class="flex items-start space-x-4 p-3 rounded-xl hover:bg-surface-container transition-colors cursor-pointer group border-b border-outline-variant/10 last:border-0">
                    <div class="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-on-primary-container">campaign</span>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold text-on-surface line-clamp-1">${item.title}</h5>
                        <p class="text-xs text-secondary line-clamp-1">${item.desc}</p>
                        <span class="text-[10px] text-secondary/60 font-bold">${item.date || 'Yeni'}</span>
                    </div>
                </div>
            `;
        });
        listContainer.innerHTML = html;
    }
    
    render();
    window.addEventListener('storage', (e) => {
        if(e.key === 'cms_announcements_list') render();
    });
}

function initEventsList() {
    const listContainer = document.getElementById('events-list');
    if (!listContainer) return;

    function render() {
        const events = JSON.parse(localStorage.getItem('cms_events')) || [];
        if (events.length === 0) {
            listContainer.innerHTML = `<p class="text-sm text-secondary">Yaklaşan etkinlik yok.</p>`;
            return;
        }

        let html = '';
        events.forEach(item => {
            html += `
                <div class="flex items-center space-x-4 border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
                    <div class="flex flex-col items-center justify-center w-12 h-14 bg-surface-container rounded-lg border-b-4 border-primary">
                        <span class="text-[10px] text-secondary font-bold uppercase">${item.badge || 'ETK'}</span>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold text-on-surface line-clamp-1">${item.title}</h5>
                        <p class="text-xs text-on-surface-variant line-clamp-1">${item.desc}</p>
                    </div>
                </div>
            `;
        });
        listContainer.innerHTML = html;
    }

    render();
    window.addEventListener('storage', (e) => {
        if(e.key === 'cms_events') render();
    });
}

function getWeekNumber(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}


window.sendEmail = function(email) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = 'mailto:' + email;
    } else {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email, '_blank');
    }
};

function initProfessorsGrid() {
    const gridEl = document.getElementById('professors-grid');
    if (!gridEl) return;
    
    if (typeof professorsData === 'undefined') {
        gridEl.innerHTML = '<p class="text-secondary col-span-full">Hoca verileri yüklenemedi.</p>';
        return;
    }

    let currentRankFilter = 'Tümü';
    let currentSearchQuery = '';
    let currentSortOrder = 'name';

    // Global save toggle helper
    window.toggleSave = function(btn) {
        const icon = btn.querySelector('span');
        if (icon.textContent === 'bookmark_border') {
            icon.textContent = 'bookmark';
            icon.classList.add('filled-icon', 'scale-125');
            setTimeout(() => icon.classList.remove('scale-125'), 200);
        } else {
            icon.textContent = 'bookmark_border';
            icon.classList.remove('filled-icon');
        }
    };

    function render() {
        const query = currentSearchQuery.toLowerCase().trim();
        
        let filtered = professorsData.filter(prof => {
            const matchesSearch = prof.name.toLowerCase().includes(query) || 
                                  prof.dept.toLowerCase().includes(query) || 
                                  (prof.role && prof.role.toLowerCase().includes(query));
            const matchesRank = currentRankFilter === 'Tümü' || prof.title === currentRankFilter;
            return matchesSearch && matchesRank;
        });

        // Sorting
        if (currentSortOrder === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        } else if (currentSortOrder === 'title') {
            const rankMap = {
                "Prof. Dr.": 1,
                "Doç. Dr.": 2,
                "Dr. Öğr. Üyesi": 3,
                "Arş. Gör.": 4
            };
            filtered.sort((a, b) => (rankMap[a.title] || 99) - (rankMap[b.title] || 99));
        } else if (currentSortOrder === 'dept') {
            filtered.sort((a, b) => a.dept.localeCompare(b.dept, 'tr'));
        }

        if (filtered.length === 0) {
            gridEl.innerHTML = `
                <div class="col-span-full py-16 text-center bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                    <span class="material-symbols-outlined text-6xl text-slate-300 mb-4 block">person_off</span>
                    <h3 class="text-xl font-bold text-slate-700 mb-1">Hoca bulunamadı</h3>
                    <p class="text-sm text-slate-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach(prof => {
            let defaultImg = "https://ui-avatars.com/api/?name=" + encodeURIComponent(prof.name) + "&background=006837&color=fff";
            let imgSrc = prof.img || defaultImg;

            // Determine gradient classes based on department to match design screenshot
            let gradientClasses = 'from-emerald-400 to-teal-600';
            const deptClean = prof.dept.toLowerCase().trim();
            if (deptClean.includes('iktisat')) {
                gradientClasses = 'from-amber-400 to-orange-500';
            } else if (deptClean.includes('işletme')) {
                gradientClasses = 'from-yellow-500 to-amber-600';
            } else if (deptClean.includes('ekonometri')) {
                gradientClasses = 'from-blue-400 to-teal-500';
            }
            
            html += `
            <div class="bg-white rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] group hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col border border-transparent hover:border-primary/10">
                <!-- Centered Circular Avatar with Gradient Ring and Overlapping Badge -->
                <div class="flex justify-center pt-8 pb-4 relative bg-transparent">
                    <div class="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr ${gradientClasses} shadow-md relative group-hover:scale-105 transition-transform duration-500 z-10">
                        <div class="w-full h-full rounded-full p-[3px] bg-white">
                            <div class="w-full h-full rounded-full overflow-hidden bg-slate-100">
                                <img class="w-full h-full object-cover object-top" src="${imgSrc}" alt="${prof.name}"/>
                            </div>
                        </div>
                    </div>
                    <!-- Department Badge overlapping top-right of the circular avatar -->
                    <div class="absolute top-[32px] right-[calc(50%-68px)] bg-primary text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm z-20">${prof.dept}</div>
                </div>
                <div class="p-6 flex-1 flex flex-col pt-2">
                    <div class="mb-4">
                        <h3 class="font-headline-lg-mobile text-on-surface font-bold leading-tight">${prof.title} ${prof.name}</h3>
                    </div>
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center space-x-2">
                            <span class="material-symbols-outlined text-outline text-lg">mail</span>
                            <p class="text-body-sm text-on-surface-variant">${prof.email || 'Belirtilmedi'}</p>
                        </div>
                    </div>
                    <div class="mt-auto pt-4 border-t border-outline-variant/20 flex gap-2">
                        <button onclick="sendEmail('${prof.email}')" class="flex-1 bg-primary text-white font-bold py-2 rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center space-x-1">
                            <span class="material-symbols-outlined text-sm">mail</span>
                            <span>E-Posta Gönder</span>
                        </button>
                        <button class="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all group/btn" onclick="toggleSave(this)" title="Kaydet">
                            <span class="material-symbols-outlined text-primary transition-all duration-300 group-hover/btn:scale-110">bookmark_border</span>
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
        gridEl.innerHTML = html;
    }

    // Set up search listener
    const searchInput = document.getElementById('prof-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            render();
        });
    }

    // Set up filter chips listener
    const filterButtons = document.querySelectorAll('.title-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'hover:shadow-lg');
                b.classList.add('border', 'border-outline-variant', 'text-on-surface-variant', 'hover:border-primary', 'hover:text-primary');
            });
            
            const target = e.currentTarget;
            target.classList.remove('border', 'border-outline-variant', 'text-on-surface-variant', 'hover:border-primary', 'hover:text-primary');
            target.classList.add('bg-primary', 'text-white', 'hover:shadow-lg');

            currentRankFilter = target.getAttribute('data-title');
            render();
        });
    });

    // Set up sorting dropdown listener
    const sortSelect = document.getElementById('prof-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSortOrder = e.target.value;
            render();
        });
    }

    // Initial render
    render();
}









document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard widgets
    if (typeof initClock === 'function') initClock();
    if (typeof initWeather === 'function') initWeather();
    if (typeof initSchedule === 'function') initSchedule();
    if (typeof initAnnouncementsList === 'function') initAnnouncementsList();
    if (typeof initEventsList === 'function') initEventsList();
    if (typeof initProfessorsGrid === 'function') initProfessorsGrid();
    if (typeof initAuth === 'function') initAuth();
});

import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

window.initAuth = function() {
    const profileBtn = document.getElementById('user-profile-btn');
    if (!profileBtn) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            const studentId = user.email ? user.email.split('@')[0] : 'Öğrenci';
            profileBtn.innerHTML = `<span class="font-bold text-primary text-xs" title="${studentId}">Çıkış</span>`;
            profileBtn.onclick = () => {
                signOut(auth).then(() => {
                    window.location.reload();
                });
            };
        } else {
            // User is signed out
            profileBtn.innerHTML = `<span class="material-symbols-outlined text-primary text-[20px]">person</span>`;
            profileBtn.onclick = () => {
                window.location.href = 'login.html';
            };
        }
    });
};




if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}


function initWeather() {
    const timeEl = document.getElementById('live-time');
    if (!timeEl) return;
    
    const weatherEl = document.createElement('div');
    weatherEl.className = 'flex items-center space-x-1 md:space-x-2 text-primary bg-primary-container/10 px-2 py-1 rounded-full flex mr-2 md:mr-4 transition-all hover:bg-primary-container/20 cursor-default shrink-0';
    weatherEl.innerHTML = '<span class="material-symbols-outlined text-[12px] md:text-sm">hourglass_empty</span><span class="font-bold text-[10px] md:text-sm">--°C</span>';
    
    timeEl.parentNode.insertBefore(weatherEl, timeEl);
    
    fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7654&longitude=29.9408&current_weather=true')
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            
            let icon = 'partly_cloudy_day';
            if (code === 0) icon = 'clear_day';
            else if (code === 1 || code === 2) icon = 'partly_cloudy_day';
            else if (code === 3) icon = 'cloud';
            else if (code >= 45 && code <= 48) icon = 'foggy';
            else if (code >= 51 && code <= 67) icon = 'rainy';
            else if (code >= 71 && code <= 77) icon = 'weather_snowy';
            else if (code >= 80 && code <= 82) icon = 'rainy';
            else if (code >= 95) icon = 'thunderstorm';
            
            weatherEl.innerHTML = `<span class="material-symbols-outlined text-[12px] md:text-sm">${icon}</span><span class="font-bold text-[10px] md:text-sm">${temp}°C</span>`;
        })
        .catch(err => {
            console.error('Weather fetch error:', err);
            weatherEl.style.display = 'none';
        });
}
