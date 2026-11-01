// Akademik Kadro Veritabanı ve Arama/Filtreleme Mantığı

const professorsData = [
    {
        title: "Prof. Dr.",
        name: "Yusuf Bayraktutan",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-201",
        email: "ybayrak@kocaeli.edu.tr",
        img: "img/ybayrak.png",
        color: "primary"
    },
    {
        title: "Prof. Dr.",
        name: "Ayhan Orhan",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-202",
        email: "aorhan@kocaeli.edu.tr",
        img: "img/aorhan.png",
        color: "secondary"
    },
    {
        title: "Prof. Dr.",
        name: "Figen Büyükakın",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-203",
        email: "bfigen@kocaeli.edu.tr",
        img: "img/bfigen.png",
        color: "tertiary"
    },
    {
        title: "Prof. Dr.",
        name: "Hasan Bülent Kantarcı",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-204",
        email: "hbkantar@kocaeli.edu.tr",
        img: "img/hbkantar.png",
        color: "orange"
    },
    {
        title: "Prof. Dr.",
        name: "Ferhat Pehlivanoğlu",
        dept: "İktisat",
        role: "Dekan Yardımcısı",
        room: "A-101",
        email: "fpehlivanoglu@kocaeli.edu.tr",
        img: "img/fpehlivanoglu.png",
        color: "primary"
    },
    {
        title: "Prof. Dr.",
        name: "Recep Tarı",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-206",
        email: "rtari@kocaeli.edu.tr",
        img: "img/rtari.png",
        color: "secondary"
    },
    {
        title: "Prof. Dr.",
        name: "Selçuk Koç",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-207",
        email: "selcukkoc@kocaeli.edu.tr",
        img: "img/selcukkoc.png",
        color: "tertiary"
    },
    {
        title: "Prof. Dr.",
        name: "Şevket Alper Koç",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-208",
        email: "alperkoc@kocaeli.edu.tr",
        img: "img/alperkoc.png",
        color: "orange"
    },
    {
        title: "Doç. Dr.",
        name: "Gülten Dursun",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-209",
        email: "dgulten@kocaeli.edu.tr",
        img: "img/dgulten.png",
        color: "primary"
    },
    {
        title: "Doç. Dr.",
        name: "Erhan Oruç",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-210",
        email: "erhan.oruc@kocaeli.edu.tr",
        img: "img/erhan.oruc.png",
        color: "secondary"
    },
    {
        title: "Doç. Dr.",
        name: "Özgür Bayram Soylu",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-211",
        email: "ozgurbayram.soylu@kocaeli.edu.tr",
        img: "img/ozgurbayram.soylu.png",
        color: "tertiary"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Ali Rıza Solmaz",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-301",
        email: "aliriza.solmaz@kocaeli.edu.tr",
        img: "img/aliriza.solmaz.png",
        color: "orange"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Hanife Bıdırdı",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-302",
        email: "hbidirdi@kocaeli.edu.tr",
        img: "img/hbidirdi.png",
        color: "primary"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Bengü Doğangün Yasa",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-303",
        email: "bengu.dogangun@kocaeli.edu.tr",
        img: "img/bengu.dogangun.png",
        color: "secondary"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Mehmet Emin Yardımcı",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-304",
        email: "emin.yardimci@kocaeli.edu.tr",
        img: "img/emin.yardimci.png",
        color: "tertiary"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Mehmet Çağrı Gözen",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-305",
        email: "cagri.gozen@kocaeli.edu.tr",
        img: "img/cagri.gozen.png",
        color: "orange"
    },
    {
        title: "Dr. Öğr. Üyesi",
        name: "Muhammet Rıdvan İnce",
        dept: "İktisat",
        role: "Öğretim Üyesi",
        room: "A-306",
        email: "muhammet.ince@kocaeli.edu.tr",
        img: "img/muhammet.ince.png",
        color: "primary"
    },
    {
        title: "Arş. Gör.",
        name: "Murat Emikönel",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-401",
        email: "murat.emikonel@kocaeli.edu.tr",
        img: "img/murat.emikonel.png",
        color: "tertiary"
    },
    {
        title: "Arş. Gör.",
        name: "Merve Velicik",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-402",
        email: "merve.velicik@kocaeli.edu.tr",
        img: "img/merve.velicik.png",
        color: "primary"
    },
    {
        title: "Arş. Gör.",
        name: "Meryem Türel",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-403",
        email: "meryem.turel@kocaeli.edu.tr",
        img: "img/meryem.turel.png",
        color: "secondary"
    },
    {
        title: "Arş. Gör.",
        name: "Sedanur Demir",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-404",
        email: "sedanur.demir@kocaeli.edu.tr",
        img: "img/sedanur.demir.png",
        color: "tertiary"
    },
    {
        title: "Arş. Gör.",
        name: "Fikriye Ceren Bostancı",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-405",
        email: "ceren.bostanci@kocaeli.edu.tr",
        img: "img/ceren.bostanci.png",
        color: "orange"
    },
    {
        title: "Arş. Gör.",
        name: "Uğur Çuhalılar",
        dept: "İktisat",
        role: "Araştırma Görevlisi",
        room: "A-406",
        email: "ugur.cuhalilar@kocaeli.edu.tr",
        img: "img/ugur.cuhalilar.png",
        color: "primary"
    },
    {
        title: "Prof. Dr.",
        name: "Vedat Cengiz",
        dept: "Siyaset Bilimi",
        role: "Öğretim Üyesi",
        room: "B-201",
        email: "vcengiz@kocaeli.edu.tr",
        img: "img/vcengiz.png",
        color: "secondary"
    }
];

let currentFilter = "Tümü";

function renderProfessors(searchQuery = "") {
    const list = document.getElementById('professors-list');
    if (!list) return;
    const countEl = document.getElementById('prof-count');
    list.innerHTML = "";

    const query = searchQuery.toLowerCase();

    const filtered = professorsData.filter(prof => {
        const matchesSearch = prof.name.toLowerCase().includes(query) || prof.dept.toLowerCase().includes(query);
        const matchesCategory = currentFilter === "Tümü" || prof.dept === currentFilter;
        return matchesSearch && matchesCategory;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <span class="material-symbols-outlined text-6xl text-slate-500 mb-4 block">person_off</span>
                <h3 class="text-xl font-bold text-slate-400">Sonuç bulunamadı</h3>
                <p class="text-sm text-slate-500">Başka bir isim veya bölüm arayınız.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(prof => {
        // Fallback icon if no image
        const imgHTML = prof.img 
            ? `<img class="w-20 h-20 rounded-xl object-cover border border-${prof.color}-500/20 shadow-md" src="${prof.img}"/>`
            : `<div class="w-20 h-20 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-${prof.color}-500/20 shadow-md"><span class="material-symbols-outlined text-4xl text-${prof.color}-500/40">person</span></div>`;
        
        // CSS Color mappings (Tailwind colors)
        let colorClass = "";
        let colorHex = "";
        if(prof.color === 'primary') { colorClass = "emerald"; colorHex = "rgba(16, 185, 129, 0.1)"; }
        else if(prof.color === 'secondary') { colorClass = "purple"; colorHex = "rgba(168, 85, 247, 0.1)"; }
        else if(prof.color === 'tertiary') { colorClass = "blue"; colorHex = "rgba(59, 130, 246, 0.1)"; }
        else { colorClass = "orange"; colorHex = "rgba(249, 115, 22, 0.1)"; }

        const card = `
        <div class="glass-panel rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:border-${colorClass}-500/50 transition-all duration-300">
            <div class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-colors" style="background-color: ${colorHex}"></div>
            <div class="flex items-start gap-4 relative z-10">
                ${imgHTML}
                <div>
                    <span class="text-${colorClass}-500 dark:text-${colorClass}-400 font-bold text-[10px] uppercase tracking-widest mb-1 block">${prof.title}</span>
                    <h3 class="font-bold text-lg text-slate-800 dark:text-white leading-tight">${prof.name}</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold">${prof.role}</p>
                    <span class="inline-block mt-2 px-2 py-0.5 rounded border border-${colorClass}-200 dark:border-${colorClass}-500/30 text-${colorClass}-600 dark:text-${colorClass}-400 text-[9px] font-black uppercase tracking-wider">${prof.dept}</span>
                </div>
            </div>
            <div class="space-y-2 mt-2 relative z-10">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    <span>${prof.room}</span>
                </div>
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span class="material-symbols-outlined text-[16px]">mail</span>
                    <span>${prof.email}</span>
                </div>
            </div>
            <div class="flex gap-2 mt-auto pt-4 relative z-10">
                <a href="mailto:${prof.email}" class="flex-1 text-center py-2 bg-${colorClass}-600 hover:bg-${colorClass}-500 text-white rounded-lg text-xs font-bold active:scale-95 transition-all shadow-lg shadow-${colorClass}-900/20">E-Posta</a>
                <button class="px-4 py-2 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white rounded-lg text-xs font-bold active:scale-95 transition-all hover:bg-slate-300 dark:hover:bg-white/10">Profil</button>
            </div>
        </div>
        `;
        list.innerHTML += card;
    });
}

function initDirectory() {
    renderProfessors();

    // Search Box Listener
    const searchEl = document.getElementById('prof-search');
    if (searchEl) {
        searchEl.addEventListener('input', (e) => {
            renderProfessors(e.target.value);
        });
    }

    // Category Chips Listener
    const buttons = document.querySelectorAll('.dept-filter');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update UI active state
            buttons.forEach(b => {
                b.classList.remove('bg-emerald-600', 'text-white', 'border-transparent', 'shadow-neon');
                b.classList.add('bg-slate-200', 'dark:bg-white/5', 'text-slate-600', 'dark:text-slate-400', 'border-slate-300', 'dark:border-white/10');
            });
            
            e.target.classList.remove('bg-slate-200', 'dark:bg-white/5', 'text-slate-600', 'dark:text-slate-400', 'border-slate-300', 'dark:border-white/10');
            e.target.classList.add('bg-emerald-600', 'text-white', 'border-transparent', 'shadow-neon');
            
            // Update filter
            currentFilter = e.target.textContent.trim();
            if (searchEl) {
                renderProfessors(searchEl.value);
            } else {
                renderProfessors("");
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initDirectory);
