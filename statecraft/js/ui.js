/**
 * TURKEY 2038 - MAIN UI CONTROLLER & ROUTER
 */

import { state, initGameState, recordHistoryPoint, calculatePollingSupport, coalitionPartners, getQuarterString, candidatesPool } from './state.js';
import { policies, getPolicyById } from './cards.js';
import { runSimulationTurn, calculateActiveRisks } from './simulation.js';
import { events, triggerRandomEvent, triggerPrioritizedCrisisEvent, triggerEmergencyEvent, echoEventsDatabase, premiumEvents } from './events.js';
import { regions, drawTurkeyMap, calculateRegionSupport, calculateRegionHappiness, initMapListeners } from './map.js';
import { renderHistoryChart } from './charts.js';
import { debateQuestions, getDebateOpponentForParty } from './debate.js';

// DOM Element Selectors
const doc = (id) => document.getElementById(id);

// Active Navigation State
let activeTab = "policies";
let activeCategory = "economy";
let selectedPolicy = null;
let currentEvent = null;
let currentDebateQuestionIndex = 0;
let debateAccumulatedEffects = {};
let activeMapMode = "support";
let selectedPortfolioForHire = null;

const groupMeta = {
    conservatives: { name: "Muhafazakar", color: "var(--color-conservative)" },
    secular:       { name: "Seküler", color: "var(--color-secular)" },
    nationalists:  { name: "Milliyetçi", color: "var(--color-nationalist)" },
    leftists:      { name: "Solcu", color: "var(--color-leftist)" },
    liberals:      { name: "Liberal", color: "var(--color-liberal)" },
    kurds:         { name: "Kürt", color: "var(--color-kurd)" },
    immigrants:    { name: "Göçmen", color: "var(--text-secondary)" },
    business:      { name: "İş Dünyası", color: "var(--color-business)" },
    students:      { name: "Öğrenci", color: "#5b84b1" },
    retirees:      { name: "Emekli", color: "#d4b282" },
    workers:       { name: "İşçi", color: "#cf6262" },
    farmers:       { name: "Çiftçi", color: "#3d8c67" },
    civil_servants:{ name: "Memur", color: "#645a99" },
    youth:         { name: "Genç", color: "#5b84b1" },
    religious:     { name: "Dindar", color: "var(--color-religious)" }
};

const voterGroupDetails = {
    conservatives: {
        name: "Muhafazakarlar",
        desc: "Geleneksel, kültürel ve manevi değerleri temel alan seçmenler. Aile yapısının korunması, dini özgürlükler, yerel kalkınma ve asayiş önceliklidir.",
        target: "Siyasi Temsilcileri: Muhafazakar ve Milliyetçi partiler.",
        bonus: "Hükümetin din müfredatı, aile yardımları ve asayiş harcamalarından olumlu etkilenirler. Alkol vergisi ve sansür yasalarına destek verirler.",
        voters: {
            farmers: 60,
            retirees: 50,
            civil_servants: 40
        },
        powerCenters: {
            security: 80,
            public: 70
        }
    },
    secular: {
        name: "Sekülerler",
        desc: "Cumhuriyetin temel kazanımlarını, laikliği, çağdaşlığı ve hukukun üstünlüğünü savunan seçmenler. Devlet kurumlarında liyakat ve modernizasyon isterler.",
        target: "Siyasi Temsilcileri: Kemalist Seküler, Merkez Sol ve Liberal partiler.",
        bonus: "Eğitim bütçesi, özgürlükler ve kadın hakları politikalarından olumlu etkilenirler. Sansür yasaları ve dini müfredat artışına sert tepki gösterirler.",
        voters: {
            students: 70,
            civil_servants: 60,
            youth: 60
        },
        powerCenters: {
            military: 75,
            judiciary: 80,
            academia: 85
        }
    },
    nationalists: {
        name: "Milliyetçiler",
        desc: "Milli birlik ve bütünlüğü, ulusal güvenlik politikalarını ve yerli savunma sanayisini önceler. Dış politikada egemenlik ve sınır güvenliğini en üst düzeyde korumayı hedefler.",
        target: "Siyasi Temsilcileri: Milliyetçi ve Muhafazakar partiler.",
        bonus: "Savunma sanayisi bütçesi, ordu operasyonları ve terörle mücadeleden olumlu etkilenirler. Göçmen hakları ve azınlık imtiyazlarından olumsuz etkilenirler.",
        voters: {
            farmers: 50,
            conservatives: 45,
            civil_servants: 40
        },
        powerCenters: {
            military: 85,
            security: 80
        }
    },
    leftists: {
        name: "Sol Seçmen",
        desc: "Sosyal adaleti, sendikal hakları, refah devletini ve çevreciliği savunur. Gelir adaletsizliğini azaltmayı ve kamu hizmetlerini ücretsiz yaygınlaştırmayı hedefler.",
        target: "Siyasi Temsilcileri: Merkez Sol partiler.",
        bonus: "Asgari ücret artışları, iş güvencesi, çevre koruma ve sosyal refah yardımlardan olumlu etkilenirler. Büyük şirket teşviklerinden hoşlanmazlar.",
        voters: {
            workers: 75,
            students: 65,
            youth: 60
        },
        powerCenters: {
            academia: 70,
            media: 60
        }
    },
    liberals: {
        name: "Liberaller",
        desc: "Bireysel özgürlükleri, serbest piyasa ekonomisini, özelleştirmeyi ve girişimciliği destekler. Devletin ekonomideki rolünü azaltarak yabancı yatırımı çekmeyi amaçlar.",
        target: "Siyasi Temsilcileri: Liberal ve Teknokrat partiler.",
        bonus: "Özelleştirmeler, kurumlar vergisi indirimleri ve IMF iş birliğinden olumlu etkilenirler. Ek vergiler ve asgari ücret artışlarından olumsuz etkilenirler.",
        voters: {
            business: 75,
            secular: 45,
            students: 40
        },
        powerCenters: {
            business: 80,
            media: 60
        }
    },
    kurds: {
        name: "Kürt Seçmenler",
        desc: "Bölgesel kalkınma, kültürel haklar ve anayasal eşitlik konularına önem veren seçmen grubu.",
        target: "Siyasi Temsilcileri: Merkez Sol ve yerel partiler.",
        bonus: "Bölgesel altyapı yatırımları, anadil ve azınlık hakları politikalarından olumlu etkilenirler. Askeri operasyonların artışından olumsuz etkilenirler.",
        voters: {
            farmers: 45,
            workers: 40,
            leftists: 40
        },
        powerCenters: {
            public: 50
        }
    },
    religious: {
        name: "Dindar Seçmen",
        desc: "Dini özgürlükler, manevi eğitim, inanç özgürlüğü ve geleneksel İslami değerlerin korunmasını önemseyen grup.",
        target: "Siyasi Temsilcileri: Muhafazakar partiler.",
        bonus: "Diyanet bütçesinin artışı, imam hatip okulları teşvikleri ve aile yardımlarından olumlu etkilenirler. Laiklik adımlarından olumsuz etkilenirler.",
        voters: {
            conservatives: 60,
            farmers: 50,
            retirees: 45
        },
        powerCenters: {
            security: 60,
            public: 55
        }
    },
    business: {
        name: "İş Dünyası",
        desc: "Sanayiciler, tüccarlar, KOBİ sahipleri ve finans sektörü temsilcileri. Ekonomik istikrar ve düşük vergi isterler.",
        target: "Önemli Güç Odağı: İş Dünyası (Business) güç merkezi üzerinde doğrudan etkiye sahiplerdir.",
        bonus: "Düşük kurumlar vergisi, özelleştirmeler ve enflasyonun düşmesinden olumlu etkilenirler. Büyük vergi artışları ve yüksek asgari ücretten olumsuz etkilenirler.",
        voters: {
            liberals: 70,
            conservatives: 40
        },
        powerCenters: {
            business: 90
        }
    },
    students: {
        name: "Öğrenciler",
        desc: "Üniversite ve lise öğrencilerinden oluşan, yenilikçi, özgürlükçü ve kariyer odaklı genç kesim.",
        target: "Geleceğin iş gücü. Eğitim kalitesi ve internet özgürlüğü ana talepleridir.",
        bonus: "Eğitim bütçesi, internet özgürlüğü, burslar ve kütüphane yatırımlarından olumlu etkilenirler. Sansür ve otoriterleşmeden olumsuz etkilenirler.",
        voters: {
            secular: 65,
            leftists: 55,
            youth: 70
        },
        powerCenters: {
            academia: 70,
            public: 50
        }
    },
    retirees: {
        name: "Emekliler",
        desc: "Yaşam standardının korunması, maaş artışları ve sağlık hizmetlerine kolay erişim bekleyen yaşlı nüfus.",
        target: "Geniş bir seçmen kitlesi. Sağlık sistemi kalitesi ve enflasyon en çok ilgilendikleri alanlardır.",
        bonus: "Emekli maaş zamları, sağlık bütçesi ve sosyal tesis yatırımlarından olumlu etkilenirler. Enflasyon artışından en çok zarar gören gruptur.",
        voters: {
            conservatives: 50,
            secular: 40,
            nationalists: 40
        },
        powerCenters: {
            public: 60
        }
    },
    workers: {
        name: "İşçiler",
        desc: "Fabrika, inşaat, maden ve hizmet sektörlerinde çalışan mavi yakalı işçi sınıfı. Sendikal haklar ve ücret güvencesi isterler.",
        target: "Geniş seçmen tabanı. Ekonomik durumdan ve asgari ücretten en hızlı etkilenen gruptur.",
        bonus: "Asgari ücret artışları, sendikal haklar ve sosyal yardımlardan olumlu etkilenirler. İşsizlik artışı ve özelleştirmelerden olumsuz etkilenirler.",
        voters: {
            leftists: 60,
            workers: 100,
            kurds: 35
        },
        powerCenters: {
            public: 65
        }
    },
    farmers: {
        name: "Çiftçiler",
        desc: "Tarım ve hayvancılıkla geçinen, kırsal kesimde yaşayan üreticiler. Devlet destekleri ve mazot/gübre fiyatları kritiktir.",
        target: "Anadolu genelinde yaygın nüfus. Tarım kredileri ve kooperatifleşme önem taşır.",
        bonus: "Tarım sübvansiyonları, taban fiyat destekleri ve sulama projelerinden olumlu etkilenirler. Mazot ve gübre fiyatlarının artışından olumsuz etkilenirler.",
        voters: {
            conservatives: 50,
            nationalists: 40,
            religious: 35
        },
        powerCenters: {
            public: 55
        }
    },
    civil_servants: {
        name: "Memurlar",
        desc: "Öğretmenler, polisler, doktorlar ve diğer kamu çalışanları. Liyakat, maaş artışı ve iş güvencesi odaklıdırlar.",
        target: "Devlet bürokrasisinin işleyişini sağlayan ana gövde.",
        bonus: "Memur maaş zamları, enflasyon farkı ödemeleri ve liyakat sistemlerinden olumlu etkilenirler. Kamuda kadrolaşma ve mülakat sistemlerinden rahatsız olurlar.",
        voters: {
            secular: 50,
            conservatives: 40,
            civil_servants: 100
        },
        powerCenters: {
            judiciary: 50,
            security: 50
        }
    },
    youth: {
        name: "Gençlik",
        desc: "Dijital çağın içine doğmuş, işsizlik kaygısı yüksek, özgürlükçü ve gelecek vizyonu olan genç seçmenler.",
        target: "Sosyal medya ve dijital platformları en aktif kullanan grup.",
        bonus: "İnternet özgürlüğü, dijital girişimcilik destekleri, burslar ve iş imkanlarından olumlu etkilenirler. Sansür ve mülakat sisteminden olumsuz etkilenirler.",
        voters: {
            secular: 60,
            leftists: 50,
            students: 70
        },
        powerCenters: {
            public: 50
        }
    },
    immigrants: {
        name: "Göçmenler",
        desc: "Son yıllarda ülkeye gelen sığınmacılar ve göçmen kökenli nüfus. Sosyal uyum ve güvenlik öncelikleridir.",
        target: "Demografik yapıyı ve iç güvenliği doğrudan etkileyen grup.",
        bonus: "Göçmen uyum fonları, vatandaşlık kolaylıkları ve sınır kapısı politikalarından etkilenirler. Sınır dışı edilme politikalarından olumsuz etkilenirler.",
        voters: {
            religious: 40,
            conservatives: 30
        },
        powerCenters: {
            public: 30
        }
    }
};

const ideologyMeta = {
    kemalist_secular: {
        name: "Kemalist Seküler",
        desc: "Cumhuriyetin temel kazanımlarını, laikliği, çağdaşlığı ve hukukun üstünlüğünü savunur. Devlet kurumlarının liyakat ve modernizasyon ilkelerine göre yönetilmesini hedefler.",
        target: "Seküler Vatandaşlar, Öğrenciler, Memurlar, Ordu ve Yargı Bürokrasisi",
        bonus: "Seküler (+15%), Öğrenci (+10%) ve Memur (+10%) gruplarından yüksek başlangıç desteği alır. Ordu ve Yargı Onay Oranları +15% artar.",
        voters: {
            secular: 65,
            students: 55,
            civil_servants: 55,
            conservatives: 30,
            religious: 20
        },
        powerCenters: {
            military: 85,
            judiciary: 80,
            academia: 80,
            public: 50
        }
    },
    conservative: {
        name: "Muhafazakar",
        desc: "Geleneksel, kültürel ve manevi değerleri temel alır. Aile yapısının korunması, dini özgürlükler, yerel kalkınma ve asayiş önceliklidir.",
        target: "Muhafazakarlar, Dindar Seçmenler, Çiftçiler, Emekliler, Güvenlik Bürokrasisi",
        bonus: "Muhafazakar (+20%), Dindar (+30%) ve Emekli (+10%) seçmenden yüksek destek alır. Güvenlik Bürokrasisi Desteği +15% artar. Başlangıç yolsuzluğu azalır.",
        voters: {
            conservatives: 70,
            religious: 80,
            farmers: 60,
            retirees: 55,
            secular: 25
        },
        powerCenters: {
            security: 80,
            public: 65,
            business: 60,
            academia: 30
        }
    },
    center_left: {
        name: "Merkez Sol",
        desc: "Sosyal adaleti, sendikal hakları, refah devletini ve çevreciliği savunur. Gelir adaletsizliğini azaltmayı ve kamu hizmetlerini (sağlık, eğitim) ücretsiz yaygınlaştırmayı hedefler.",
        target: "İşçiler, Solcular, Gençler, Öğrenciler, Üniversiteler ve Medya",
        bonus: "İşçiler (+10%), Sol Seçmen (+20%) ve Gençlik (+15%) gruplarından güçlü destekle başlar. Akademi ve Medya Desteği +10% artar.",
        voters: {
            leftists: 65,
            workers: 60,
            students: 60,
            youth: 55,
            business: 30
        },
        powerCenters: {
            academia: 75,
            media: 70,
            judiciary: 65,
            business: 35
        }
    },
    liberal: {
        name: "Liberal",
        desc: "Bireysel özgürlükleri, serbest piyasa ekonomisini, özelleştirmeyi ve girişimciliği destekler. Devletin ekonomideki rolünü azaltarak yabancı yatırımı çekmeyi amaçlar.",
        target: "İş Dünyası, Sermaye Sahipleri, Liberaller, Şehirli Profesyoneller",
        bonus: "İş Dünyası (+20%) ve Liberal seçmenden (+20%) tam destek alır. Hazine Bütçesine +₺10.0B ek bütçe ile başlar.",
        voters: {
            liberals: 70,
            business: 75,
            secular: 50,
            workers: 30,
            farmers: 30
        },
        powerCenters: {
            business: 85,
            media: 65,
            academia: 60,
            military: 45
        }
    },
    nationalist: {
        name: "Milliyetçi",
        desc: "Milli birlik ve bütünlüğü, ulusal güvenlik politikalarını ve savunma sanayiini önceler. Dış politikada egemenlik ve sınır güvenliğini en üst düzeyde korumayı hedefler.",
        target: "Milliyetçiler, Güvenlik Sektörü, Ordu, Çiftçiler ve Taşra Seçmeni",
        bonus: "Milliyetçi (+25%) ve Çiftçi (+10%) gruplarından yüksek destek. Ordu ve Güvenlik Bürokrasisi Desteği +20% artar.",
        voters: {
            nationalists: 75,
            farmers: 55,
            conservatives: 55,
            kurds: 20,
            immigrants: 20
        },
        powerCenters: {
            military: 90,
            security: 85,
            public: 60,
            academia: 40
        }
    },
    technocrat: {
        name: "Merkez Teknokrat",
        desc: "Siyasi kutuplaşmanın ötesinde, bilimsel analiz, veri odaklı politikalar, ekonomik istikrar ve liyakatle yönetimi savunur. Dijital dönüşüm ve kalkınma önceliklidir.",
        target: "Akademisyenler, Memurlar, İş Dünyası, Teknoloji Sektörü, Yargı",
        bonus: "Akademi (+20%), Memur (+15%) ve İş Dünyasından (+10%) destek alır. Oyuna fazladan +15 Siyasi Sermaye (PC) ile başlar.",
        voters: {
            civil_servants: 60,
            students: 55,
            business: 60,
            liberals: 55,
            leftists: 45
        },
        powerCenters: {
            academia: 80,
            judiciary: 75,
            business: 65,
            military: 55
        }
    }
};

function getPolicyVoterTagsHTML(policy) {
    const defaultVal = policy.defaultVal;
    const effects = policy.getEffects(defaultVal);
    let tagsHTML = "";
    
    if (effects && effects.voters) {
        for (const key in effects.voters) {
            const val = effects.voters[key];
            if (val === 0) continue;
            
            const meta = groupMeta[key] || { name: key, color: "var(--text-muted)" };
            const isPositive = val > 0;
            const sign = isPositive ? "+" : "-";
            const badgeClass = isPositive ? "tag-positive" : "tag-negative";
            
            tagsHTML += `
                <span class="policy-voter-tag ${badgeClass}" style="--group-color: ${meta.color};">
                    ${meta.name} ${sign}
                </span>
            `;
        }
    }
    return tagsHTML;
}

// Initialize the game bindings on page load
function initializeUI() {
    // Menu Buttons Bindings
    doc("btn-menu-new").addEventListener("click", () => {
        console.log("Yeni Oyun butonuna tıklandı, modal-start açılıyor.");
        doc("modal-start").classList.remove("hidden");
    });

    // Close button for New Game modal
    const btnCloseStart = doc("btn-close-start");
    if (btnCloseStart) {
        btnCloseStart.addEventListener("click", () => {
            console.log("Yeni Oyun modal kapatma butonuna tıklandı.");
            doc("modal-start").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    let saved = null;
    try {
        saved = localStorage.getItem("turkey2038_state");
    } catch (e) {
        console.warn("localStorage is not available:", e);
    }
    const btnContinue = doc("btn-menu-continue");
    if (saved && btnContinue) {
        btnContinue.removeAttribute("disabled");
        btnContinue.addEventListener("click", () => {
            console.log("Devam Et butonuna tıklandı, showContinuePreviewModal çağrılıyor.");
            showContinuePreviewModal(saved);
        });
    }

    // Close button for Continue modal
    const btnCloseContinue = doc("btn-close-continue");
    if (btnCloseContinue) {
        btnCloseContinue.addEventListener("click", () => {
            console.log("Devam Et modal kapatma butonuna tıklandı.");
            doc("modal-continue").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    doc("btn-menu-exit").addEventListener("click", () => {
        console.log("Çıkış butonuna tıklandı, onay penceresi açılıyor.");
        if (confirm("Oyundan çıkmak istiyor musunuz? İlerlemek için tarayıcı sekmesini de kapatabilirsiniz.")) {
            window.close();
            alert("Uygulamayı kapatmak için bu tarayıcı sekmesini kapatabilirsiniz.");
        }
    });

    const btnSettings = doc("btn-menu-settings");
    if (btnSettings) {
        btnSettings.addEventListener("click", () => {
            console.log("Ayarlar butonuna tıklandı, modal-settings açılıyor.");
            doc("modal-settings").classList.remove("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    // Settings Modal controls
    doc("btn-settings-close").addEventListener("click", () => {
        doc("modal-settings").classList.add("hidden");
        if (typeof playUiSound === "function") playUiSound("click");
    });
    const btnCloseSettingsTop = doc("btn-close-settings-top");
    if (btnCloseSettingsTop) {
        btnCloseSettingsTop.addEventListener("click", () => {
            doc("modal-settings").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    // Volume Slider listener
    const volSlider = doc("setting-volume");
    const volVal = doc("setting-volume-val");
    if (volSlider && volVal) {
        volSlider.addEventListener("input", (e) => {
            const val = e.target.value;
            window.fxVolume = parseInt(val);
            volVal.textContent = `${val}%`;
            saveSettings();
        });
    }

    // Theme selector buttons listeners
    document.querySelectorAll(".theme-selector-grid .btn-setting").forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;
            applyTheme(theme);
            saveSettings();
            if (typeof playUiSound === "function") playUiSound("click");
        });
    });

    // Wipe Save button listener
    const btnWipe = doc("btn-wipe-save");
    if (btnWipe) {
        btnWipe.addEventListener("click", () => {
            if (confirm("Kayıtlı oyunu ve tüm ayarlarınızı sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
                localStorage.removeItem("turkey2038_state");
                localStorage.removeItem("turkey2038_settings");
                alert("Tüm veriler sıfırlandı. Sayfa yenileniyor...");
                window.location.reload();
            }
        });
    }

    // Settings options toggle buttons
    const bindSettingToggle = (onId, offId, applyFn) => {
        const btnOn = doc(onId);
        const btnOff = doc(offId);
        if (!btnOn || !btnOff) return;
        btnOn.addEventListener("click", () => {
            btnOn.classList.add("active");
            btnOff.classList.remove("active");
            applyFn(true);
            if (typeof playUiSound === "function") playUiSound("click");
        });
        btnOff.addEventListener("click", () => {
            btnOff.classList.add("active");
            btnOn.classList.remove("active");
            applyFn(false);
            if (typeof playUiSound === "function") playUiSound("click");
        });
    };

    bindSettingToggle("setting-crt-on", "setting-crt-off", (enabled) => {
        if (enabled) document.body.classList.remove("no-crt");
        else document.body.classList.add("no-crt");
        if (typeof saveSettings === "function") saveSettings();
    });

    bindSettingToggle("setting-sound-on", "setting-sound-off", (enabled) => {
        window.soundEnabled = enabled;
        if (typeof saveSettings === "function") saveSettings();
    });

    bindSettingToggle("setting-glow-high", "setting-glow-low", (enabled) => {
        if (enabled) document.body.classList.remove("no-glow");
        else document.body.classList.add("no-glow");
        if (typeof saveSettings === "function") saveSettings();
    });

    // Sound FX Event Triggers with global event delegation for hover sounds
    window.lastHoveredButton = null;
    document.addEventListener("mouseover", (e) => {
        const btn = e.target.closest("button, .btn-menu-premium, .btn-primary, .btn-setting, .tab-btn-premium, .category-btn-premium, .map-mode-btn-premium, .map-scale-btn-premium, .header-action-btn, .btn-next-turn-premium, .crisis-btn, .debate-choice-btn, .region-result-card, .policy-card, .candidate-card, .close, .btn-close, .modal-close");
        if (btn) {
            if (btn !== window.lastHoveredButton) {
                window.lastHoveredButton = btn;
                if (typeof playUiSound === "function") playUiSound("hover");
            }
        } else {
            window.lastHoveredButton = null;
        }
    });

    const soundButtons = document.querySelectorAll(".btn-menu-premium, .btn-primary, .btn-setting, .tab-btn-premium, .category-btn-premium, .map-mode-btn-premium, .map-scale-btn-premium, .header-action-btn, .btn-next-turn-premium");
    soundButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (typeof playUiSound === "function") playUiSound("click");
        });
    });

    // Initialize custom configurations
    if (typeof loadAndApplySettings === "function") loadAndApplySettings();
    if (typeof startMenuCanvasAnimation === "function") startMenuCanvasAnimation();
    if (typeof runTelemetryLog === "function") runTelemetryLog();
    if (typeof playUiSound === "function") setTimeout(() => playUiSound("boot"), 500);

    // Bind Start Form
    const startForm = doc("start-game-form");
    if (startForm) {
        startForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const partyName = doc("party-name") ? doc("party-name").value : "Gelecek Yüzyıl Partisi";
            const leaderName = doc("leader-name") ? doc("leader-name").value : "Gökhan Kağan";
            
            const ideologyEl = document.querySelector('input[name="ideology"]:checked');
            const ideology = ideologyEl ? ideologyEl.value : "technocrat";
            
            const difficultyEl = document.querySelector('input[name="difficulty-level"]:checked');
            const difficulty = difficultyEl ? difficultyEl.value : "normal";
            
            const traitEl = document.querySelector('input[name="leader-trait"]:checked');
            const leaderTrait = traitEl ? traitEl.value : "diplomat";
            
            startGame(partyName, ideology, difficulty, leaderName, leaderTrait);
        });
    }

    // Radio visual card triggers (for ideology, traits, difficulty)
    const ideologyCards = document.querySelectorAll(".ideology-card");
    ideologyCards.forEach(card => {
        card.addEventListener("click", () => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio && radio.name === "ideology") {
                // Show detail modal instead of directly checking
                showIdeologyDetailModal(radio.value);
            } else {
                const container = card.parentElement;
                if (container) {
                    container.querySelectorAll(".ideology-card").forEach(c => c.classList.remove("active"));
                }
                card.classList.add("active");
                if (radio) radio.checked = true;
            }
        });
    });

    // Ideology detail modal controls
    const btnCloseIdeologyDetail = doc("btn-close-ideology-detail");
    if (btnCloseIdeologyDetail) {
        btnCloseIdeologyDetail.addEventListener("click", () => {
            doc("modal-ideology-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }
    const btnCancelIdeologyDetail = doc("btn-cancel-ideology-detail");
    if (btnCancelIdeologyDetail) {
        btnCancelIdeologyDetail.addEventListener("click", () => {
            doc("modal-ideology-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    // Left Tab navigation buttons
    const leftTabSociology = doc("btn-tab-sociology");
    const leftTabIndicators = doc("btn-tab-indicators");
    
    if (leftTabSociology && leftTabIndicators) {
        leftTabSociology.addEventListener("click", () => {
            leftTabSociology.classList.add("active");
            leftTabIndicators.classList.remove("active");
            doc("tab-sociology-view").classList.remove("hidden");
            doc("tab-indicators-view").classList.add("hidden");
        });
        leftTabIndicators.addEventListener("click", () => {
            leftTabIndicators.classList.add("active");
            leftTabSociology.classList.remove("active");
            doc("tab-indicators-view").classList.remove("hidden");
            doc("tab-sociology-view").classList.add("hidden");
        });
    }

    // Tab buttons for right actions
    const tabBtns = document.querySelectorAll(".tab-btn-premium");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            switchTab(btn.dataset.tab);
        });
    });

    // Category buttons
    const catBtns = document.querySelectorAll(".category-btn-premium");
    catBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            catBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            switchCategory(btn.dataset.cat);
        });
    });

    // Map modes
    const mapBtns = document.querySelectorAll(".map-mode-btn-premium");
    mapBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            mapBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeMapMode = btn.dataset.mode;
            updateMap();
            renderVoterGroups(); // Refresh voter sidebar to clear group selections
        });
    });

    // Map scale toggle
    window.activeMapScale = "regions";
    const scaleBtns = document.querySelectorAll(".map-scale-btn-premium");
    scaleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            scaleBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            window.activeMapScale = btn.dataset.scale;
            updateMap();
        });
    });

    // Policy details actions
    doc("btn-close-policy").addEventListener("click", hidePolicyModal);
    doc("btn-repeal-policy").addEventListener("click", handleRepealPolicy);
    doc("btn-enact-policy").addEventListener("click", handleEnactPolicy);
    doc("policy-slider").addEventListener("input", handleSliderInput);

    // Cabinet hire close modal
    doc("btn-close-cabinet-hire").addEventListener("click", closeCabinetHireModal);

    // Cabinet detail modal actions
    const btnCloseMinisterDetail = doc("btn-close-minister-detail");
    if (btnCloseMinisterDetail) {
        btnCloseMinisterDetail.addEventListener("click", () => {
            doc("modal-minister-detail").classList.add("hidden");
            playUiSound("click");
        });
    }
    const btnShuffleFromDetail = doc("btn-shuffle-from-detail");
    if (btnShuffleFromDetail) {
        btnShuffleFromDetail.addEventListener("click", () => {
            doc("modal-minister-detail").classList.add("hidden");
            openCabinetHireModal(selectedPortfolioForHire);
        });
    }

    // Next Quarter turn advance
    doc("btn-next-turn").addEventListener("click", handleNextTurn);

    // Drawer open/close toggles
    const btnToggleDrawer = doc("btn-toggle-drawer");
    const btnCloseDrawer = doc("btn-close-drawer");
    const rightDrawer = doc("right-drawer");

    if (btnToggleDrawer && rightDrawer) {
        btnToggleDrawer.addEventListener("click", () => {
            rightDrawer.classList.toggle("drawer-open");
        });
    }
    if (btnCloseDrawer && rightDrawer) {
        btnCloseDrawer.addEventListener("click", () => {
            rightDrawer.classList.remove("drawer-open");
        });
    }

    // Region detail card close toggle
    const btnCloseRegionDetail = doc("btn-close-region-detail");
    const regionDetailCard = doc("region-detail-card");
    if (btnCloseRegionDetail && regionDetailCard) {
        btnCloseRegionDetail.addEventListener("click", () => {
            regionDetailCard.classList.add("hidden");
            playUiSound("click");
        });
    }

    // Initialize Map Listeners
    initMapListeners(state);

    // Power Balance Modal Bindings
    const powerPanelTrigger = doc("power-balance-panel-trigger");
    if (powerPanelTrigger) {
        powerPanelTrigger.addEventListener("click", () => {
            renderPowerBalanceModal();
            doc("modal-power-balance").classList.remove("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }
    const btnClosePowerBalance = doc("btn-close-power-balance");
    if (btnClosePowerBalance) {
        btnClosePowerBalance.addEventListener("click", () => {
            doc("modal-power-balance").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    const btnCloseRegimeWatch = doc("btn-close-regime-watch");
    if (btnCloseRegimeWatch) {
        btnCloseRegimeWatch.addEventListener("click", () => {
            doc("modal-regime-watch-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    // Initialize Lucide Icons initially
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initializeUI);
} else {
    initializeUI();
}

function loadSavedGame() {
    let saved = null;
    try {
        saved = localStorage.getItem("turkey2038_state");
    } catch (e) {
        console.warn("localStorage load failed:", e);
    }
    if (saved) {
        const loadedState = JSON.parse(saved);
        Object.assign(state, loadedState);

        // Ensure state.history exists and contains all required arrays
        if (!state.history) {
            state.history = {
                turns: [],
                economy: [],
                inflation: [],
                happiness: [],
                stability: [],
                playerPoll: [],
                military: [],
                security: [],
                judiciary: []
            };
        } else {
            if (!state.history.turns) state.history.turns = [];
            if (!state.history.economy) state.history.economy = [];
            if (!state.history.inflation) state.history.inflation = [];
            if (!state.history.happiness) state.history.happiness = [];
            if (!state.history.stability) state.history.stability = [];
            if (!state.history.playerPoll) state.history.playerPoll = [];
            if (!state.history.military) state.history.military = [];
            if (!state.history.security) state.history.security = [];
            if (!state.history.judiciary) state.history.judiciary = [];
        }
        
        doc("main-menu").classList.add("hidden");
        doc("app").classList.remove("hidden");

        debateAccumulatedEffects = {};
        
        updateDashboard();
        updateMap();
        renderPoliciesGrid();
        
        setTimeout(() => {
            renderHistoryChart("history-chart", state.history);
        }, 100);

        logMessage("Kayıtlı simülasyon başarıyla yüklendi.");
        updateNewsTicker();
    }
}

function startGame(partyName, ideology, difficulty, leaderName, leaderTrait) {
    initGameState(partyName, ideology, difficulty, leaderName, leaderTrait);
    
    // Hide Main Menu & Start Screen
    doc("main-menu").classList.add("hidden");
    doc("modal-start").classList.add("hidden");
    doc("app").classList.remove("hidden");

    // Clear active debate states
    debateAccumulatedEffects = {};
    
    // Update Dashboard & Viewport
    updateDashboard();
    updateMap();
    renderPoliciesGrid();
    
    // Initial history graph update
    setTimeout(() => {
        renderHistoryChart("history-chart", state.history);
    }, 100);

    const diffTr = { easy: "KOLAY", normal: "NORMAL", hard: "ZOR" }[difficulty] || difficulty.toUpperCase();
    logMessage(`Simülasyon başlatıldı. Hoş geldiniz, Sayın Lider ${leaderName}. Parti: ${partyName}. Zorluk: ${diffTr}.`);
    
    // Generate initial ticker headlines
    updateNewsTicker();
}

function updateDashboard() {
    doc("current-date").textContent = getQuarterString(state.turn);
    doc("stat-political-capital").textContent = state.politicalCapital;
    
    // Formatting currency in Billions
    const formattedTreasury = (state.treasury / 1000000000).toFixed(1);
    doc("stat-budget").textContent = `₺${formattedTreasury}B`;
    
    // Colorize treasury if in debt
    if (state.treasury < 0) {
        doc("stat-budget").className = "value warning";
    } else {
        doc("stat-budget").className = "value";
    }

    // Set stability indicator
    doc("stat-stability").textContent = `${state.stability}%`;
    const stabilityIcon = document.querySelector(".header-metric-box:nth-child(3) i");
    if (stabilityIcon) {
        if (state.stability < 40) {
            doc("stat-stability").className = "value warning";
            stabilityIcon.style.color = "var(--color-red-text)";
        } else {
            doc("stat-stability").className = "value";
            stabilityIcon.style.color = "var(--color-green-text)";
        }
    }

    // Set Coalition info
    if (state.activeCoalition) {
        doc("coalition-status").textContent = `KOALİSYON: ${state.activeCoalition.seats} KOLTUK`;
        doc("coalition-status").className = "value warning";
    } else {
        doc("coalition-status").textContent = "TEK BAŞINA İKTİDAR";
        doc("coalition-status").className = "value";
    }

    // Set election countdown
    const quartersRemaining = state.maxTurns - state.turn + 1;
    doc("election-countdown").textContent = `${quartersRemaining} ÇEYREK`;
    if (quartersRemaining <= 4) {
        doc("election-countdown").className = "value warning";
    } else {
        doc("election-countdown").className = "value";
    }

    // Auto-save game state
    try {
        localStorage.setItem("turkey2038_state", JSON.stringify(state));
    } catch (e) {
        console.warn("localStorage save failed:", e);
    }
    const btnContinue = doc("btn-menu-continue");
    if (btnContinue) {
        try {
            btnContinue.removeAttribute("disabled");
        } catch (e) {}
    }

    // Update dynamic state views
    renderStateIndicators();
    renderVoterGroups();
    renderCabinet();
    renderPowerBalanceDashboard();
    renderRegimeWatchCenter();
    
    // Dynamically update open power balance modal
    const pBalanceModal = doc("modal-power-balance");
    if (pBalanceModal && !pBalanceModal.classList.contains("hidden")) {
        renderPowerBalanceModal();
    }

    // Render Polling bar
    const pollValue = calculatePollingSupport();
    const pollPlayerBar = doc("poll-player-bar");
    const pollPlayerVal = doc("polling-player");
    if (pollPlayerVal && pollPlayerBar) {
        pollPlayerVal.textContent = `${pollValue}%`;
        pollPlayerBar.style.width = `${pollValue}%`;
    }
    const pollOpponentsBar = doc("poll-opponents-bar");
    const pollOpponentsVal = doc("polling-opponents");
    if (pollOpponentsVal && pollOpponentsBar) {
        pollOpponentsVal.textContent = `${100 - pollValue}%`;
        pollOpponentsBar.style.width = `${100 - pollValue}%`;
    }
}

function renderStateIndicators() {
    const list = doc("indicators-list");
    if (!list) return;
    list.innerHTML = "";

    const displayMeta = {
        economy: { name: "Ekonomik Büyüme", icon: "trending-up", desc: "Milli büyüme, yatırımlar ve üretim kapasitesi." },
        inflation: { name: "Enflasyon Oranı", icon: "activity", desc: "Tüketici fiyat endeksi. Yüksek enflasyon birikimleri eritir." },
        unemployment: { name: "İşsizlik Oranı", icon: "briefcase", desc: "Aktif iş arayan nüfusun oranı. Yoksulluğu tetikler." },
        happiness: { name: "Toplumsal Refah", icon: "smile", desc: "Halkın genel mutluluğu, yaşam kalitesi ve devlete güveni." },
        security: { name: "Milli Güvenlik", icon: "shield", desc: "İç asayiş, terörle mücadele ve sınır güvenliği başarısı." },
        freedom: { name: "Demokratik Haklar", icon: "unlock", desc: "Basın özgürlüğü, sendikal haklar ve hukukun üstünlüğü." },
        media: { name: "Medya Kontrolü", icon: "radio", desc: "Devletin haber akışındaki kontrolü. Gerçek verileri gizleyebilir." },
        corruption: { name: "Yolsuzluk Endeksi", icon: "user-x", desc: "Kamu kaynaklarının suistimali ve rüşvet yaygınlığı." },
        education: { name: "Eğitim Kalitesi", icon: "graduation-cap", desc: "Akademik başarı, Ar-Ge yatırımı ve geleceğin iş gücü." }
    };

    for (const key in state.systems) {
        const val = state.systems[key];
        const trend = state.trends[key];
        const meta = displayMeta[key];
        if (!meta) continue;
        
        let trendIcon = "minus";
        let trendClass = "trend-stable";
        if (trend === 1) {
            trendIcon = "arrow-up";
            trendClass = "trend-up";
        } else if (trend === -1) {
            trendIcon = "arrow-down";
            trendClass = "trend-down";
        }

        const indicatorCard = document.createElement("div");
        indicatorCard.className = "indicator-card";
        indicatorCard.title = meta.desc;
        indicatorCard.innerHTML = `
            <div class="indicator-info">
                <span class="name"><i data-lucide="${meta.icon}" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> ${meta.name}</span>
                <div class="value-group">
                    <span class="value">%${val}</span>
                    <i data-lucide="${trendIcon}" class="trend-icon ${trendClass}"></i>
                </div>
            </div>
            <div class="progress-bar-wrapper">
                <div class="progress-bar ${getProgressBarColorClass(key, val)}" style="width: ${val}%;"></div>
            </div>
        `;
        list.appendChild(indicatorCard);
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function getProgressBarColorClass(key, val) {
    if (key === "inflation" || key === "unemployment" || key === "corruption") {
        return val < 35 ? "green-bg" : (val > 60 ? "red-bg" : "yellow-bg");
    } else {
        return val >= 65 ? "green-bg" : (val < 40 ? "red-bg" : "yellow-bg");
    }
}

// Sparkline SVG Generator for Voter Group Rows
function generateSparklineSVG(approval) {
    const points = [];
    const numPoints = 6;
    const stepX = 80 / (numPoints - 1);
    
    // Seed generator with approval rating to keep the line static/stable for the group
    let seed = approval * 0.123;
    function random() {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    for (let i = 0; i < numPoints; i++) {
        const x = i * stepX;
        let y;
        if (i === numPoints - 1) {
            y = 16 - (approval / 100) * 14;
        } else {
            const variance = (random() - 0.5) * 6; // max 3px offset
            const targetY = 16 - (approval / 100) * 14;
            y = Math.max(2, Math.min(16, targetY + variance));
        }
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    
    const pathData = `M ${points.join(" L ")}`;
    const strokeClass = approval >= 50 ? "sparkline-green" : (approval < 40 ? "sparkline-red" : "sparkline-yellow");
    
    return `
        <svg class="voter-sparkline" viewBox="0 0 80 18">
            <path class="sparkline-path ${strokeClass}" d="${pathData}" />
        </svg>
    `;
}

function renderVoterGroups() {
    const list = doc("voter-groups-list-view");
    if (!list) return;
    list.innerHTML = "";

    const groupTitles = {
        conservatives: { name: "Muhafazakarlar", icon: "heart" },
        secular:       { name: "Sekülerler", icon: "sun" },
        nationalists:  { name: "Milliyetçiler", icon: "shield" },
        leftists:      { name: "Sol Seçmen", icon: "compass" },
        liberals:      { name: "Liberaller", icon: "dollar-sign" },
        kurds:         { name: "Kürt Seçmenler", icon: "users" },
        immigrants:    { name: "Göçmenler", icon: "globe" },
        business:      { name: "İş Dünyası", icon: "briefcase" },
        students:      { name: "Öğrenciler", icon: "graduation-cap" },
        retirees:      { name: "Emekliler", icon: "hourglass" },
        workers:       { name: "İşçi Sınıfı", icon: "wrench" },
        farmers:       { name: "Çiftçiler", icon: "leaf" },
        civil_servants:{ name: "Memurlar", icon: "clipboard" },
        youth:         { name: "Genç Seçmen", icon: "smartphone" },
        religious:     { name: "Dindar Seçmen", icon: "book" }
    };

    for (const key in state.voterGroups) {
        const group = state.voterGroups[key];
        const title = groupTitles[key] || { name: key, icon: "user" };

        const card = document.createElement("div");
        card.className = "voter-row-card";
        if (activeMapMode === "group_" + key) {
            card.classList.add("active");
        }
        card.addEventListener("click", () => {
            activeMapMode = "group_" + key;
            document.querySelectorAll(".map-mode-btn-premium").forEach(btn => btn.classList.remove("active"));
            updateMap();
            renderVoterGroups();
        });
        
        const arrow = group.approval >= 50 ? "▲" : (group.approval < 40 ? "▼" : "▶");
        const trendClass = group.approval >= 50 ? "trend-up" : (group.approval < 40 ? "trend-down" : "trend-stable");

        let barColor = "var(--color-green-text)";
        if (group.approval < 40) {
            barColor = "var(--color-red-text)";
        } else if (group.approval < 65) {
            barColor = "var(--color-gold-text)";
        }

        card.innerHTML = `
            <div class="voter-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="voter-name"><i data-lucide="${title.icon}"></i> ${title.name}</span>
                <button class="btn-group-info" data-key="${key}" style="background: none; border: none; color: var(--color-gold); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px; transition: color 0.2s;"><i data-lucide="info" style="width: 13px; height: 13px;"></i></button>
            </div>
            <div class="voter-stats-grid">
                <div class="stat-col">
                    <span class="stat-label">NÜFUS %${Math.round(group.size)}</span>
                    <span class="stat-label" style="color: var(--text-secondary); margin-top: 1px;">DESTEK %${Math.round(group.approval)}</span>
                </div>
                <div class="progress-bar-container" style="flex: 1; margin: 0 10px; min-width: 80px;">
                    <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; width: 100%;">
                        <div style="width: ${group.approval}%; height: 100%; background: ${barColor}; border-radius: 3px;"></div>
                    </div>
                </div>
                <div class="trend-indicator-premium ${trendClass}">
                    ${arrow}
                </div>
            </div>
        `;
        list.appendChild(card);

        const infoBtn = card.querySelector(".btn-group-info");
        if (infoBtn) {
            infoBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                showVoterGroupDetailModal(key);
            });
        }
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderCabinet() {
    const list = doc("cabinet-list");
    if (!list) return;
    list.innerHTML = "";

    const portfolioTitles = {
        economy: { name: "Ekonomi Bakanlığı", icon: "trending-up" },
        interior: { name: "İçişleri Bakanlığı", icon: "shield" },
        foreign: { name: "Dışişleri Bakanlığı", icon: "globe" },
        defense: { name: "Savunma Bakanlığı", icon: "shield-alert" },
        education: { name: "Milli Eğitim Bakanlığı", icon: "graduation-cap" },
        health: { name: "Sağlık Bakanlığı", icon: "heart-pulse" },
        justice: { name: "Adalet Bakanlığı", icon: "gavel" }
    };

    const ideologyColors = {
        liberal: "var(--color-liberal)",
        nationalist: "var(--color-nationalist)",
        technocrat: "var(--color-secular)",
        conservative: "var(--color-conservative)",
        secular: "var(--color-secular)"
    };

    for (const key in state.cabinet) {
        const minister = state.cabinet[key];
        const meta = portfolioTitles[key] || { name: key, icon: "user" };
        const bgIdeology = ideologyColors[minister.ideology] || "var(--text-muted)";

        const card = document.createElement("div");
        card.className = "cabinet-card";
        card.style.cursor = "pointer";

        let loyaltyEmoji = "😐";
        let emojiClass = "badge-warning";
        if (minister.loyalty >= 75) {
            loyaltyEmoji = "😊";
            emojiClass = "badge-success";
        } else if (minister.loyalty < 55) {
            loyaltyEmoji = "😠";
            emojiClass = "badge-danger";
        }

        card.innerHTML = `
            <div class="minister-portrait-frame" style="background: linear-gradient(135deg, ${bgIdeology} 0%, rgba(0,0,0,0.4) 100%); border-color: ${bgIdeology}; padding: 2px;">
                ${createIdeologicalAvatarSVG(minister.ideology, 44, minister.name)}
                <span class="minister-badge ${emojiClass}">${loyaltyEmoji}</span>
            </div>
            <span class="portfolio-name">${meta.name}</span>
            <strong class="minister-name" style="text-align: center; margin-top: 4px; line-height: 1.2;">${minister.name}</strong>
            <span class="minister-value-row" style="margin-top: 4px;">%${minister.competence} Yetkinlik</span>
        `;

        card.addEventListener("click", () => {
            showMinisterDetailModal(key, minister, meta);
        });

        list.appendChild(card);
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}






function openCabinetHireModal(portfolio) {
    selectedPortfolioForHire = portfolio;
    const container = doc("candidates-list-container");
    if (!container) return;
    container.innerHTML = "";

    const portfolioTitles = {
        economy: "Ekonomi Bakanlığı",
        interior: "İçişleri Bakanlığı",
        foreign: "Dışişleri Bakanlığı",
        defense: "Savunma Bakanlığı",
        education: "Milli Eğitim Bakanlığı",
        health: "Sağlık Bakanlığı",
        justice: "Adalet Bakanlığı"
    };

    const hireCost = state.leaderTrait === "reformist" ? 10 : 15;
    doc("cabinet-hire-title").innerHTML = `<strong>${portfolioTitles[portfolio] || portfolio}</strong> için yeni bir aday görevlendirin.<br>Atama Maliyeti: <strong>${hireCost} Siyasi Sermaye (PC)</strong>`;

    const groupTranslations = {
        conservatives: "Muhafazakar",
        secular: "Seküler",
        nationalists: "Milliyetçi",
        leftists: "Solcu",
        liberals: "Liberal",
        kurds: "Kürt",
        immigrants: "Göçmen",
        business: "İş Dünyası",
        students: "Öğrenci",
        retirees: "Emekli",
        workers: "İşçi",
        farmers: "Çiftçi",
        civil_servants: "Memur",
        youth: "Genç",
        religious: "Dindar"
    };

    const reactions = {
        conservative: {
            conservatives: 10,
            religious: 15,
            secular: -10,
            leftists: -5
        },
        secular: {
            secular: 12,
            leftists: 10,
            conservatives: -8,
            religious: -10
        },
        nationalist: {
            nationalists: 12,
            kurds: -10,
            leftists: -5
        },
        liberal: {
            liberals: 15,
            business: 10,
            workers: -5
        },
        technocrat: {
            students: 8,
            civil_servants: 8,
            business: 5
        }
    };

    // Filter candidates by portfolio department
    const filteredCandidates = candidatesPool.filter(c => c.portfolio === portfolio);

    filteredCandidates.forEach(candidate => {
        let isAlreadyAssigned = false;
        for (const k in state.cabinet) {
            if (state.cabinet[k].name === candidate.name) {
                isAlreadyAssigned = true;
                break;
            }
        }
        
        const candidateReactions = reactions[candidate.ideology] || {};
        let reactionsHTML = "";
        for (const grp in candidateReactions) {
            const shift = candidateReactions[grp];
            const grpName = groupTranslations[grp] || grp;
            const barClass = shift >= 0 ? "bar-good" : "bar-bad";
            const absShift = Math.abs(shift);
            // 0-15 mapped to 0-100% width for the mini bar
            const barPct = Math.round((absShift / 15) * 100);

            reactionsHTML += `
                <div class="mini-reaction-row" style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; gap:6px;">
                    <span style="color:var(--text-secondary); width: 68px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${grpName}</span>
                    <div class="progress-bar-wrapper-premium" style="flex:1; height: 5px; margin: 0; padding: 0.5px; background-color: rgba(0,0,0,0.5);">
                        <div class="progress-bar-premium ${barClass}" style="width: ${barPct}%; height: 100%; border-radius: 2px;"></div>
                    </div>
                    <span class="${shift >= 0 ? 'badge-success' : 'badge-danger'}" style="width: 25px; text-align:right; font-weight:800; font-size:0.65rem; padding: 1px 2px; border-radius: 2px;">${shift >= 0 ? '+' : ''}${shift}%</span>
                </div>
            `;
        }

        const card = document.createElement("div");
        card.className = "candidate-card";
        if (isAlreadyAssigned) {
            card.classList.add("disabled-candidate");
        }
        card.innerHTML = `
            <div class="candidate-card-top-row" style="display:flex; gap:10px; align-items:center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">
                <div class="candidate-avatar-frame" style="width:40px; height:40px; border-radius:50%; border: 1.5px solid rgba(194, 160, 93, 0.2); overflow:hidden;">
                    ${createIdeologicalAvatarSVG(candidate.ideology, 40, candidate.name)}
                </div>
                <div class="candidate-header" style="border:none; padding:0; display:flex; flex-direction:column; gap:1px;">
                    <span class="candidate-name" style="font-size:1.15rem; font-weight:700;">${candidate.name}</span>
                    <span class="candidate-title" style="font-size:0.75rem; color:var(--text-secondary);">${candidate.title}</span>
                    <span class="candidate-ideology" style="font-size:0.72rem; color:var(--color-gold-text); text-transform:uppercase;">Görüş: ${candidate.ideologyLabel || candidate.ideology.toUpperCase()}</span>
                </div>
            </div>
            <div class="candidate-stats-grid" style="margin-top:6px;">
                <span>Yetkinlik: <strong>%${candidate.competence}</strong></span>
                <span>Sadakat: <strong>%${candidate.loyalty}</strong></span>
                <span>Karizma: <strong>%${candidate.popularity}</strong></span>
                <span>Yolsuzluk Riski: <strong>%${candidate.corruption}</strong></span>
                <span>Reform İsteği: <strong>%${candidate.reform ?? 50}</strong></span>
            </div>
            
            <!-- Reactions Panel -->
            <div class="candidate-reactions-panel" style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.08);">
                <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight:700; display:block; margin-bottom:4px;">Atama Tepki Tahmini</span>
                <div class="reactions-grid" style="display:flex; flex-direction:column; gap:4px;">
                    ${reactionsHTML || '<span style="color:var(--text-muted); font-size:0.72rem;">Nötr Etki</span>'}
                </div>
            </div>

            <button class="btn-hire-candidate" data-id="${candidate.id}" ${isAlreadyAssigned || state.politicalCapital < hireCost ? 'disabled' : ''} style="margin-top:8px;">
                ${isAlreadyAssigned ? 'Kabinede Görevli' : 'Bakan Olarak Ata'}
            </button>
        `;
        container.appendChild(card);
    });

    const hireBtns = container.querySelectorAll(".btn-hire-candidate");
    hireBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            hireCandidate(btn.dataset.id);
        });
    });

    doc("modal-cabinet-hire").classList.remove("hidden");
}

function hireCandidate(candidateId) {
    if (!selectedPortfolioForHire) return;
    const hireCost = state.leaderTrait === "reformist" ? 10 : 15;
    if (state.politicalCapital < hireCost) {
        alert(`Yetersiz Siyasi Sermaye! Bakan atamak için ${hireCost} PC gerekir.`);
        return;
    }

    const candidate = candidatesPool.find(c => c.id === candidateId);
    if (!candidate) return;

    state.politicalCapital -= hireCost;
    const oldMinisterName = state.cabinet[selectedPortfolioForHire].name;

    state.cabinet[selectedPortfolioForHire] = {
        name: candidate.name,
        competence: candidate.competence,
        ideology: candidate.ideology,
        ideologyLabel: candidate.ideologyLabel,
        loyalty: candidate.loyalty,
        popularity: candidate.popularity,
        corruption: candidate.corruption,
        reform: candidate.reform ?? 50
    };

    const portName = { economy: "Ekonomi", interior: "İçişleri", foreign: "Dışişleri", defense: "Milli Savunma", education: "Milli Eğitim", health: "Sağlık", justice: "Adalet" }[selectedPortfolioForHire] || selectedPortfolioForHire.toUpperCase();
    logMessage(`${portName} Bakanı Değiştirildi: ${oldMinisterName} yerine ${candidate.name} atandı.`);

    // Apply immediate voter approval changes based on appointee's faction
    applyIdeologicalAppointmentReactions(candidate.ideology);

    closeCabinetHireModal();
    updateDashboard();
}

function closeCabinetHireModal() {
    doc("modal-cabinet-hire").classList.add("hidden");
    selectedPortfolioForHire = null;
}

function updateMap() {
    drawTurkeyMap("turkey-map-svg", state, activeMapMode, (region) => {
        logMessage(`${region.name} seçildi. Bölgesel onay oranı: %${calculateRegionSupport(region, state)}.`);
    });
}

function switchTab(tabId) {
    activeTab = tabId;
    
    // Toggle active content divs
    document.querySelectorAll(".tab-content-premium").forEach(el => el.classList.add("hidden"));
    doc(`tab-${tabId}`).classList.remove("hidden");

    if (tabId === "history") {
        renderHistoryChart("history-chart", state.history);
    } else if (tabId === "active-laws") {
        renderActiveLaws();
    }
}

function switchCategory(catId) {
    activeCategory = catId;
    renderPoliciesGrid();
}

function renderPoliciesGrid() {
    const grid = doc("policies-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = policies.filter(p => p.category === activeCategory);
    
    filtered.forEach(policy => {
        const value = state.activePolicies[policy.id];
        const isEnacted = value !== null;
        
        // Dynamic PC costs scaled by cabinet minister's Reform Desire
        const enactCost = getPolicyCost(policy, false);
        const adjustCost = getPolicyCost(policy, true);

        const card = document.createElement("div");
        card.className = `policy-card ${isEnacted ? 'active-law' : ''}`;
        card.setAttribute("data-policy-id", policy.id);
        
        const tagsHTML = getPolicyVoterTagsHTML(policy);

        card.innerHTML = `
            <div class="policy-card-header">
                <h4><i data-lucide="${policy.icon}" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px; color: var(--color-gold);"></i> ${policy.name}</h4>
                ${isEnacted ? `<span class="law-status">YÜRÜRLÜKTE: %${value}</span>` : `<span class="law-status">PASİF</span>`}
            </div>
            <div class="meta">
                <div class="meta-item">
                    <i data-lucide="zap"></i>
                    <span>Uygulama: <strong>${enactCost} PC</strong></span>
                </div>
                <div class="meta-item">
                    <i data-lucide="sliders"></i>
                    <span>Güncelleme: <strong>${adjustCost} PC</strong></span>
                </div>
            </div>
            <div class="policy-card-tags-container">
                ${tagsHTML || '<span style="color:var(--text-muted); font-size:0.55rem;">Etki Yok</span>'}
            </div>
        `;
        
        card.addEventListener("click", () => showPolicyModal(policy));
        grid.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderActiveLaws() {
    const list = doc("active-laws-list");
    list.innerHTML = "";

    let activeCount = 0;
    for (const policyId in state.activePolicies) {
        const val = state.activePolicies[policyId];
        if (val !== null) {
            const policyDef = getPolicyById(policyId);
            if (policyDef) {
                activeCount++;
                const row = document.createElement("div");
                row.className = "active-law-row";
                row.innerHTML = `
                    <span><i data-lucide="${policyDef.icon}" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px;"></i> ${policyDef.name}</span>
                    <span class="law-val">${val}% Funding / Rate</span>
                `;
                list.appendChild(row);
            }
        }
    }

    if (activeCount === 0) {
        list.innerHTML = `<div style="text-align: center; color: var(--text-secondary); font-size: 0.8rem; padding: 20px;">NO ACTIVE LAWS. TAXATION AND SERVICES ARE RUNNING ON INITIAL DEFAULT CRITERIA.</div>`;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Helper for Policy cost calculations dynamically scaled by Minister's Reform Desire
function getPolicyCost(policy, isEnacted) {
    const baseCost = isEnacted ? policy.costAdjust : policy.costEnact;
    const portfolioMap = {
        income_tax: "economy",
        corporate_tax: "economy",
        automation_subsidy: "economy",
        imf_cooperation: "economy",
        ubi: "economy",
        nuclear_plants: "economy",
        carbon_tax: "economy",
        
        border_control: "defense",
        police_funding: "interior",
        migrant_repatriation: "interior",
        
        education_budget: "education",
        religious_edu: "education",
        
        healthcare_priv: "health",
        
        defense_alliances: "foreign",
        
        censorship: "interior",
        internet_freedom: "interior",
        social_media_ban: "interior",
        
        women_safety: "justice",
        minority_rights: "justice",
        pension_age: "justice",
        worker_strike_ban: "justice",
        
        housing_rent_control: "economy"
    };

    const ministerKey = portfolioMap[policy.id];
    let costModifier = 1.0;
    if (ministerKey && state.cabinet[ministerKey]) {
        const minObj = state.cabinet[ministerKey];
        const reformVal = minObj.reform ?? 50;
        // scaled from -30% discount at 100 reform to +30% penalty at 0 reform
        costModifier = 1.30 - (reformVal / 100) * 0.60;
    }
    return Math.max(1, Math.round(baseCost * costModifier));
}

// Modal Managers
function updatePolicyModalEffects(policy, val) {
    const effects = policy.getEffects(val);
    const effectsList = doc("policy-detail-effects-list");
    if (effectsList) {
        effectsList.innerHTML = "";
        
        // List budget surplus effect
        const budgetLi = document.createElement("li");
        budgetLi.className = effects.budget >= 0 ? "positive" : "negative";
        budgetLi.textContent = `Çeyreklik Bütçe Etkisi: ${effects.budget >= 0 ? '+' : ''}₺${effects.budget.toFixed(2)}B`;
        effectsList.appendChild(budgetLi);

        // List systems adjustments
        for (const sys in effects.systems) {
            const sysVal = effects.systems[sys];
            if (sysVal !== 0) {
                const li = document.createElement("li");
                li.className = sysVal > 0 ? "positive" : "negative";
                
                const sysNames = {
                    economy: "Ekonomi",
                    inflation: "Enflasyon",
                    unemployment: "İşsizlik",
                    stability: "İstikrar",
                    freedom: "Özgürlük",
                    media: "Medya Gücü",
                    education: "Eğitim Endeksi",
                    corruption: "Yolsuzluk",
                    happiness: "Halk Memnuniyeti",
                    security: "Asayiş"
                };
                const sysName = sysNames[sys] || sys;
                li.textContent = `${sysName}: ${sysVal > 0 ? '+' : ''}${Math.round(sysVal)}%`;
                effectsList.appendChild(li);
            }
        }
    }

    // Populate voter tags grid inside modal
    const tagsGrid = doc("policy-detail-voter-tags");
    if (tagsGrid) {
        tagsGrid.innerHTML = "";
        let hasVoterEffects = false;
        
        for (const grp in effects.voters) {
            const grpVal = effects.voters[grp];
            if (grpVal !== 0) {
                hasVoterEffects = true;
                const meta = groupMeta[grp] || { name: grp, color: "var(--text-muted)" };
                const isPositive = grpVal > 0;
                
                // Max impact expected is around 30. Scale the progress bar accordingly.
                const absVal = Math.min(30, Math.abs(grpVal));
                const pct = Math.round((absVal / 30) * 100);
                const barClass = isPositive ? "impact-bar-positive" : "impact-bar-negative";
                
                const rowEl = document.createElement("div");
                rowEl.className = "policy-voter-impact-row";
                rowEl.style.width = "100%";
                rowEl.innerHTML = `
                    <span class="impact-group-name" style="color: ${meta.color};">${meta.name}</span>
                    <div class="impact-bar-wrapper">
                        <div class="impact-bar ${barClass}" style="width: ${pct}%;"></div>
                    </div>
                `;
                tagsGrid.appendChild(rowEl);
            }
        }
        
        if (!hasVoterEffects) {
            tagsGrid.innerHTML = `<span style="color:var(--text-muted); font-size:0.75rem; font-family:var(--font-mono); padding: 4px 10px;">Hiçbir toplumsal grubu doğrudan etkilemiyor.</span>`;
        }
    }
}

function showPolicyModal(policy) {
    selectedPolicy = policy;
    const value = state.activePolicies[policy.id];
    const isEnacted = value !== null;

    doc("policy-detail-name").textContent = policy.name;
    
    // Turkish category translations
    const catTranslations = {
        economy: "EKONOMİ & VERGİ",
        justice: "ADALET & SOSYAL",
        education: "EĞİTİM",
        security: "ASAYİŞ & GÖÇ",
        foreign: "DIŞ POLİTİKA",
        energy: "ENERJİ & ÇEVRE"
    };
    doc("policy-detail-category").textContent = catTranslations[policy.category] || policy.category.toUpperCase();
    doc("policy-detail-desc").textContent = policy.desc;
    doc("policy-detail-pc-cost").textContent = getPolicyCost(policy, isEnacted);
    
    // Icon swap
    const iconContainer = doc("policy-detail-icon");
    if (iconContainer) {
        iconContainer.setAttribute("data-lucide", policy.icon);
    }
    
    const sliderVal = isEnacted ? value : policy.defaultVal;
    
    // Config slider
    const slider = doc("policy-slider");
    if (slider) {
        slider.max = policy.maxVal !== undefined ? policy.maxVal : 100;
        slider.value = sliderVal;
    }
    doc("policy-slider-value").textContent = `${sliderVal}%`;
    doc("slider-label-left").textContent = policy.minLabel || "0%";
    const maxVal = policy.maxVal !== undefined ? policy.maxVal : 100;
    doc("slider-label-right").textContent = (policy.maxLabel || "100%") + (maxVal !== 100 ? ` (%${maxVal})` : "");

    // Render live effects
    updatePolicyModalEffects(policy, sliderVal);

    // Live update the budget indicator in modal
    const effects = policy.getEffects(sliderVal);
    doc("policy-detail-budget-cost").textContent = `${effects.budget >= 0 ? '+' : ''}₺${Math.abs(effects.budget).toFixed(2)}B / Q`;

    // Toggle repeal btn
    if (isEnacted) {
        doc("btn-repeal-policy").classList.remove("hidden");
        doc("btn-enact-policy").textContent = "YASAYI GÜNCELLE (UPDATE)";
    } else {
        doc("btn-repeal-policy").classList.add("hidden");
        doc("btn-enact-policy").textContent = "YASAYI ONAYLA (ENACT)";
    }

    doc("modal-policy-detail").classList.remove("hidden");

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function hidePolicyModal() {
    doc("modal-policy-detail").classList.add("hidden");
    selectedPolicy = null;
}

function handleSliderInput(e) {
    if (!selectedPolicy) return;
    const val = parseInt(e.target.value);
    doc("policy-slider-value").textContent = `${val}%`;
    
    // Live update the budget indicator in modal
    const effects = selectedPolicy.getEffects(val);
    doc("policy-detail-budget-cost").textContent = `${effects.budget >= 0 ? '+' : ''}₺${Math.abs(effects.budget).toFixed(2)}B / Q`;
    
    // Dynamic recalculation of tags and effects lists on slide!
    updatePolicyModalEffects(selectedPolicy, val);
}

function applyImmediateFactionImpacts(policyId, val, isRepeal) {
    if (!state.regimeWatch) return;
    const rw = state.regimeWatch;
    
    const mult = isRepeal ? -1 : 1;
    const v = val || 0;
    const level = v / 100;
    
    if (policyId === "laiklik_abolition") {
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor - Math.round(level * 50) * mult));
        rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor + Math.round(level * 40) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - Math.round(level * 30) * mult));
    } else if (policyId === "capital_punishment") {
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor + Math.round(level * 15) * mult));
        rw.super_nato.favor = Math.max(0, Math.min(100, rw.super_nato.favor - Math.round(level * 20) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - Math.round(level * 15) * mult));
    } else if (policyId === "state_emergency") {
        rw.super_nato.favor = Math.max(0, Math.min(100, rw.super_nato.favor + Math.round(level * 25) * mult));
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor + Math.round(level * 15) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - Math.round(level * 20) * mult));
        rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, rw.buyuk_sermaye.favor - Math.round(level * 15) * mult));
    } else if (policyId === "wealth_tax") {
        rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, rw.buyuk_sermaye.favor - Math.round(level * 50) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - Math.round(level * 30) * mult));
        rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor + Math.round(level * 15) * mult));
    } else if (policyId === "ban_religious_sects") {
        rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor - Math.round(level * 60) * mult));
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor + Math.round(level * 40) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor + Math.round(level * 20) * mult));
    } else if (policyId === "multilateral_law") {
        rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor + Math.round(level * 35) * mult));
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor - Math.round(level * 50) * mult));
        rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - Math.round(level * 25) * mult));
    } else if (policyId === "religious_edu") {
        if (v > 60) {
            rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor + 15 * mult));
            rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor - 15 * mult));
        } else if (v < 20) {
            rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, rw.kemalist_burokrasi.favor + 15 * mult));
            rw.cemaatler.favor = Math.max(0, Math.min(100, rw.cemaatler.favor - 15 * mult));
        }
    } else if (policyId === "corporate_tax") {
        if (v > 40) {
            rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, rw.buyuk_sermaye.favor - 20 * mult));
        } else if (v < 15) {
            rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, rw.buyuk_sermaye.favor + 20 * mult));
        }
    } else if (policyId === "censorship") {
        if (v > 50) {
            rw.sebataycilar.favor = Math.max(0, Math.min(100, rw.sebataycilar.favor - 15 * mult));
        }
    }
}

function handleEnactPolicy() {
    if (!selectedPolicy) return;
    
    const sliderValue = parseInt(doc("policy-slider").value);
    const isEnacted = state.activePolicies[selectedPolicy.id] !== null;
    const cost = getPolicyCost(selectedPolicy, isEnacted);

    if (state.politicalCapital < cost) {
        alert("Yetersiz Siyasi Sermaye! Yeni çeyrekte PC üretilmesini bekleyin.");
        return;
    }

    state.politicalCapital -= cost;
    const enactedPolicyId = selectedPolicy.id;
    
    // Apply immediate faction shifts
    const oldValue = state.activePolicies[enactedPolicyId];
    if (oldValue !== null) {
        applyImmediateFactionImpacts(enactedPolicyId, oldValue, true);
    }
    applyImmediateFactionImpacts(enactedPolicyId, sliderValue, false);
    
    state.activePolicies[enactedPolicyId] = sliderValue;

    // Immediate Coup Check for NATO exit and Shanghai membership at 100%
    if (enactedPolicyId === "nato_exit" && sliderValue === 100) {
        logMessage("NATO'dan çekilme kararı yürürlüğe girdi. Derin devlet ve askeri cuntacılar reaksiyon gösteriyor!");
        hidePolicyModal();
        triggerGameOver("nato_coup");
        return;
    }
    if (enactedPolicyId === "shanghai_membership" && sliderValue === 100) {
        logMessage("Şanghay İşbirliği Örgütü üyeliği onaylandı. Ordu komuta kademesi alarma geçti!");
        hidePolicyModal();
        triggerGameOver("shanghai_coup");
        return;
    }

    logMessage(`Kararname yürürlüğe girdi/güncellendi: ${selectedPolicy.name} bütçesi %${sliderValue} olarak belirlendi.`);
    
    hidePolicyModal();
    updateDashboard();
    renderPoliciesGrid();
    updateMap();

    const cardEl = document.querySelector(`.policy-card[data-policy-id="${enactedPolicyId}"]`);
    if (cardEl) {
        cardEl.classList.add("ripple-active");
        setTimeout(() => {
            cardEl.classList.remove("ripple-active");
        }, 800);
    }
}

function handleRepealPolicy() {
    if (!selectedPolicy) return;
    
    const cost = getPolicyCost(selectedPolicy, true);
    if (state.politicalCapital < cost) {
        alert("Bu yasayı yürürlükten kaldırmak için yeterli Siyasi Sermayeniz yok!");
        return;
    }

    state.politicalCapital -= cost;
    const oldValue = state.activePolicies[selectedPolicy.id];
    if (oldValue !== null) {
        applyImmediateFactionImpacts(selectedPolicy.id, oldValue, true);
    }
    state.activePolicies[selectedPolicy.id] = null;

    logMessage(`Kararname yürürlükten kaldırıldı: ${selectedPolicy.name}.`);
    
    hidePolicyModal();
    updateDashboard();
    renderPoliciesGrid();
    updateMap();
}

// News ticker engine
const headlinesDatabase = {
    highInflation: [
        "ENFLASYON PATLAMASI: VATANDAŞLAR GIDA FİYATLARININ ARTIŞINI PROTESTO EDİYOR.",
        "FAİZ ORANLARI YÜKSELİYOR: DÖVİZDEKİ HAREKETLİLİK DEVAM EDİYOR.",
        "ORTA SINIF ERİYOR: YÜKSEK KİRA FİYATLARI MAAŞLARI YUTUYOR."
    ],
    highUnemployment: [
        "İSTİHDAM KRİZİ: BİRÇOK FİRMADA ELEMAN DARALTMA DALGASI BAŞLADI.",
        "MEZUN GENÇLER İŞSİZ: YENİ MEZUNLARIN BÜYÜK KISMI İŞ BULAMIYOR.",
        "PİYASA DARALIYOR: ŞİRKETLER EKONOMİK BELİRSİZLİK NEDENİYLE ÜRETİMİ AZALTIYOR."
    ],
    lowFreedom: [
        "ERİŞİM ENGELİ: SOSYAL MEDYA AĞLARINA GÜVENLİK GEREKÇESİYLE KISITLAMALAR GETİRİLDİ.",
        "BASIN ÖZGÜRLÜĞÜ TARTIŞMALARI: GAZETECİLER DİJİTAL SANSÜR YASALARINA TEPKİLİ.",
        "GÖSTERİ YASAĞI DEVAM EDİYOR: VALİLİK KRİTİK ALANLARDAKİ TOPLANTILARI ERTELEDİ."
    ],
    highStability: [
        "İSTİKRAR RÜZGARI: ULUSLARARASI KREDİ DERECELENDİRME KURULUŞLARI GÖRÜNÜMÜ YÜKSELTTİ.",
        "TURİZM REKORU: EGE VE AKDENİZ SAHİLLERİNDE DOLULUK ORANLARI %95'İ AŞTI."
    ],
    neutral: [
        "MERKEZ BANKASI DÖVİZ REZERVLERİNİ YAKINDAN TAKİP EDİYOR.",
        "METEOROLOJİ UYARDI: BATI İLLERİNDE SICAKLIKLAR MEVSİM NORMALLERİNİN ÜSTÜNDE.",
        "İSTANBUL, ANKARA VE İZMİR METRO HATLARINDA YENİ GENİŞLEME ÇALIŞMALARI BAŞLADI."
    ]
};

function updateNewsTicker() {
    let pool = [...headlinesDatabase.neutral];
    
    if (state.systems.inflation > 60) pool = pool.concat(headlinesDatabase.highInflation);
    if (state.systems.unemployment > 50) pool = pool.concat(headlinesDatabase.highUnemployment);
    if (state.systems.freedom < 35) pool = pool.concat(headlinesDatabase.lowFreedom);
    if (state.stability > 75) pool = pool.concat(headlinesDatabase.highStability);

    // Dynamic Faction / Voter / Power Center Reports
    const dynamicReports = [];

    // Faction active demand reports
    if (state.activeDemand) {
        const d = state.activeDemand;
        const faction = state.regimeWatch[d.faction];
        const fName = faction ? faction.name : d.faction;
        const quartersRemaining = d.deadline - state.turn;
        dynamicReports.push(`YASA TALEBİ ZAMANA KARŞI: ${fName} grubu tarafından sunulan yasa değişikliği talebinin süresi daralıyor (Kalan: ${quartersRemaining} çeyrek!).`);
    }

    // Cabinet minister betrayal warnings
    if (state.cabinet) {
        let lowLoyaltyCount = 0;
        let clashNames = [];
        for (const port in state.cabinet) {
            const min = state.cabinet[port];
            if (min.loyalty < 50) {
                lowLoyaltyCount++;
                clashNames.push(min.name);
            }
        }
        if (lowLoyaltyCount > 0) {
            dynamicReports.push(`KABİNEDE FİKİR AYRILIKLARI: Hükümetle uyumu sarsılan bakanların (${clashNames.join(', ')}) sızıntı yapabileceği iddia ediliyor.`);
        }
    }

    // Political divergence reports
    if ((state.voterGroups.conservatives.approval > 60 || state.voterGroups.religious.approval > 60) && state.voterGroups.secular.approval < 40) {
        dynamicReports.push("KUTUPLAŞMA ALARMI: Hükümetin muhafazakar açılımları sağ kesimde destek bulurken, seküler çevrelerde huzursuzluğa yol açtı.");
    }
    if (state.voterGroups.secular.approval > 60 && (state.voterGroups.conservatives.approval < 40 || state.voterGroups.religious.approval < 40)) {
        dynamicReports.push("TOPLUMSAL TEPKİ: Hükümetin seküler adımları cumhuriyetçi tabanda destek alırken, muhafazakar çevrelerde tepki çekti.");
    }

    // Emergency continues reports
    if (state.emergencyContinues > 0) {
        dynamicReports.push(`OHAL REJİMİ: Hükümet olağanüstü hal yetkileriyle yönetimi sürdürüyor. Muhalefet erken seçim çağrısını yineliyor.`);
    }
    
    // 1. Ordu
    if (state.powerCenters.military.approval < 40) {
        dynamicReports.push("TSK KULİSLERİ HAREKETLİ: Ordu komuta kademesinin son politikalardan mutsuz ve rahatsız olduğu iddia ediliyor.");
    } else if (state.powerCenters.military.approval > 70) {
        dynamicReports.push("TSK DESTEĞİ TAM: Ordu ve milli savunma bürokrasisi hükümetin güvenlik vizyonundan memnun.");
    }
    
    // 2. Muhafazakarlar
    if (state.voterGroups.conservatives.approval < 45) {
        dynamicReports.push("TABANDA ÇATLAK: Muhafazakar seçmen grupları kültürel politikalardan ötürü rahatsız ve tepkili.");
    } else if (state.voterGroups.conservatives.approval > 65) {
        dynamicReports.push("SAĞ TERCİH NET: Muhafazakar aileler hükümetin sosyal adımlarını memnuniyetle destekliyor.");
    }
    
    // 3. Sekülerler
    if (state.voterGroups.secular.approval < 40) {
        dynamicReports.push("LAİK CEPHE ALARMDA: Seküler sivil toplum kuruluşları laiklik ihlalleri gerekçesiyle eylem kararı aldı.");
    } else if (state.voterGroups.secular.approval > 65) {
        dynamicReports.push("SEKÜLER DESTEK: Cumhuriyetçi taban anayasal özgürlüklerin korunmasından son derece memnun.");
    }
    
    // 4. İş Dünyası / TÜSİAD
    if (state.powerCenters.business.approval < 40) {
        dynamicReports.push("PİYASA RAPORU: TÜSİAD ve büyük sermaye çevreleri vergi/reform paketlerinden ciddi şekilde rahatsız.");
    } else if (state.powerCenters.business.approval > 70) {
        dynamicReports.push("FİNANS DÜNYASI MEMNUN: Büyük holdingler hükümetin serbest piyasa entegrasyonu adımlarını destekliyor.");
    }
    
    // 5. Cemaatler
    if (state.regimeWatch.cemaatler.favor < 40) {
        dynamicReports.push("İNANÇ SAVAŞI: Cemaat ve tarikat liderleri hükümetin laikleşme adımlarından derin huzursuzluk duyuyor.");
    } else if (state.regimeWatch.cemaatler.favor > 70) {
        dynamicReports.push("CEMAATLER MEMNUN: Dini yapılanmalar vakıf teşvikleri ve eğitim kadro tahsislerinden çok memnun.");
    }

    // 6. İşçiler
    if (state.voterGroups.workers.approval < 40) {
        dynamicReports.push("SENDİKALAR AYAKTA: İşçi sendikaları geçim krizi sebebiyle grev hazırlıklarına başladı.");
    } else if (state.voterGroups.workers.approval > 65) {
        dynamicReports.push("EMEKTARLAR MEMNUN: Maaş artışları ve sosyal yardımlar işçi tabanında memnuniyetle karşılandı.");
    }

    // 7. Öğrenciler
    if (state.voterGroups.students.approval < 40) {
        dynamicReports.push("KAMPÜSLERDE HAREKETLİLİK: Üniversite öğrencileri sansür yasaları ve internet engellerine karşı tepkili.");
    } else if (state.voterGroups.students.approval > 65) {
        dynamicReports.push("GENÇLİK DESTEKTE: Burs artışları ve teknoloji destekleri öğrenciler arasında memnuniyet yarattı.");
    }

// Add active dynamic reports to the pool
    if (dynamicReports.length > 0) {
        pool = pool.concat(dynamicReports);
    }

    // Pick 4 random and concatenate
    const selected = [];
    const selectionPool = pool.length > 0 ? pool : headlinesDatabase.neutral;
    for (let i = 0; i < 4; i++) {
        const rand = selectionPool[Math.floor(Math.random() * selectionPool.length)];
        if (rand && !selected.includes(rand)) selected.push(rand);
    }
    
    // Dynamic financial ticker generation based on state variables
    const usdTry = (28.45 * (1 + (state.systems.inflation / 60))).toFixed(2);
    const bistIndex = Math.round(9200 * (1 + ((state.systems.economy - 50) / 100)) * (state.stability / 85));
    const goldPrice = Math.round(1800 * (1 + (state.systems.inflation / 80)));
    const inflationTrend = state.trends.inflation > 0 ? "+" : "-";
    const bistTrend = state.trends.economy > 0 ? "▲" : "▼";

    const marketData = `DOLAR: ₺${usdTry} (${inflationTrend}%${(state.systems.inflation / 15).toFixed(2)}) | BIST 100: ${bistIndex} ${bistTrend} | ALTIN/GR: ₺${goldPrice} | `;
    
    const ticker = doc("news-ticker");
    if (ticker) {
        ticker.textContent = " | FİNANS: " + marketData + " | GÜNDEM: " + selected.join(" | GÜNDEM: ");
    }
}

// ========== QUARTERLY STATUS BRIEFING MODAL ==========
function showQuarterBriefingModal(onStartCallback) {
    const modal = doc("modal-quarter-briefing");
    if (!modal) { onStartCallback(); return; }

    // Set quarter text
    const briefingQText = doc("briefing-quarter-text");
    if (briefingQText) briefingQText.textContent = getQuarterString(state.turn + 1);

    const container = doc("briefing-content-container");
    if (!container) { onStartCallback(); return; }

    // --- Compute pillar data ---
    const getPrevVal = (key, fallback) => {
        if (!state.history || !state.history[key] || !Array.isArray(state.history[key]) || state.history[key].length < 2) {
            return fallback;
        }
        return state.history[key][state.history[key].length - 2] ?? fallback;
    };

    const prevStability = getPrevVal("stability", state.stability);
    const stabilityTrend = state.stability > prevStability ? 1 : (state.stability < prevStability ? -1 : 0);

    const prevPublic = getPrevVal("playerPoll", calculatePollingSupport());
    const publicTrend = calculatePollingSupport() > prevPublic ? 1 : (calculatePollingSupport() < prevPublic ? -1 : 0);

    const prevMilitary = getPrevVal("military", state.powerCenters.military.approval);
    const militaryTrend = state.powerCenters.military.approval > prevMilitary ? 1 : (state.powerCenters.military.approval < prevMilitary ? -1 : 0);

    const prevSecurity = getPrevVal("security", state.powerCenters.security.approval);
    const securityTrend = state.powerCenters.security.approval > prevSecurity ? 1 : (state.powerCenters.security.approval < prevSecurity ? -1 : 0);

    const prevJudiciary = getPrevVal("judiciary", state.powerCenters.judiciary.approval);
    const judiciaryTrend = state.powerCenters.judiciary.approval > prevJudiciary ? 1 : (state.powerCenters.judiciary.approval < prevJudiciary ? -1 : 0);

    const pillars = [
        {
            icon: "📊", title: "EKONOMİ VE MALİYE",
            items: [
                { label: "Ekonomi", value: state.systems.economy, trend: state.trends.economy, color: state.systems.economy > 60 ? "#4ade80" : state.systems.economy > 35 ? "#facc15" : "#f87171" },
                { label: "Enflasyon", value: state.systems.inflation, trend: state.trends.inflation, color: state.systems.inflation < 40 ? "#4ade80" : state.systems.inflation < 65 ? "#facc15" : "#f87171" },
                { label: "İşsizlik", value: state.systems.unemployment, trend: state.trends.unemployment, color: state.systems.unemployment < 40 ? "#4ade80" : state.systems.unemployment < 60 ? "#facc15" : "#f87171" },
                { label: "Hazine", value: null, text: `₺${(state.treasury / 1000000000).toFixed(1)}B`, color: state.treasury > 10000000000 ? "#4ade80" : state.treasury > 0 ? "#facc15" : "#f87171" }
            ]
        },
        {
            icon: "🏛️", title: "KAMU DÜZENİ VE TOPLUM",
            items: [
                { label: "İstikrar", value: state.stability, trend: stabilityTrend, color: state.stability > 60 ? "#4ade80" : state.stability > 35 ? "#facc15" : "#f87171" },
                { label: "Halk Mutluluğu", value: state.systems.happiness, trend: state.trends.happiness, color: state.systems.happiness > 55 ? "#4ade80" : state.systems.happiness > 35 ? "#facc15" : "#f87171" },
                { label: "Özgürlük", value: state.systems.freedom, trend: state.trends.freedom, color: state.systems.freedom > 50 ? "#4ade80" : state.systems.freedom > 30 ? "#facc15" : "#f87171" },
                { label: "Halk Desteği", value: state.powerCenters.public.approval, trend: publicTrend, color: state.powerCenters.public.approval > 55 ? "#4ade80" : state.powerCenters.public.approval > 35 ? "#facc15" : "#f87171" }
            ]
        },
        {
            icon: "⚔️", title: "ASKERİ VE GÜVENLİK BÜROKRASİSİ",
            items: [
                { label: "Ordu Desteği", value: state.powerCenters.military.approval, trend: militaryTrend, color: state.powerCenters.military.approval > 55 ? "#4ade80" : state.powerCenters.military.approval > 35 ? "#facc15" : "#f87171" },
                { label: "Güvenlik Bürokrasisi", value: state.powerCenters.security.approval, trend: securityTrend, color: state.powerCenters.security.approval > 55 ? "#4ade80" : state.powerCenters.security.approval > 35 ? "#facc15" : "#f87171" },
                { label: "Yargı", value: state.powerCenters.judiciary.approval, trend: judiciaryTrend, color: state.powerCenters.judiciary.approval > 55 ? "#4ade80" : state.powerCenters.judiciary.approval > 35 ? "#facc15" : "#f87171" },
                { label: "Güvenlik Endeksi", value: state.systems.security, trend: state.trends.security, color: state.systems.security > 55 ? "#4ade80" : state.systems.security > 35 ? "#facc15" : "#f87171" }
            ]
        },
        {
            icon: "🕵️", title: "İSTİHBARAT VE TEHDİT DEĞERLENDİRMESİ",
            items: []
        }
    ];

    // Build intelligence/threat pillar dynamically
    const intelPillar = pillars[3];

    // Check for angry power centers plotting
    const plotters = [];
    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        if (pc.plot) plotters.push({ name: pc.name, plot: pc.plot, progress: pc.plotProgress });
    }
    if (plotters.length > 0) {
        plotters.forEach(p => {
            intelPillar.items.push({ label: `⚠️ ${p.name}: ${p.plot}`, value: p.progress, color: "#f87171" });
        });
    }

    // Check for regime watch factions with low favor
    for (const key in state.regimeWatch) {
        const fac = state.regimeWatch[key];
        if (fac.favor < 30) {
            intelPillar.items.push({ label: `🔴 ${fac.name} (Düşman)`, value: fac.favor, color: "#f87171" });
        } else if (fac.favor < 45) {
            intelPillar.items.push({ label: `🟡 ${fac.name} (Tedirgin)`, value: fac.favor, color: "#facc15" });
        }
    }

    // Check for upcoming decision echoes (foreshadowing)
    const upcomingEchoes = (state.decisionEchoes || []).filter(e => e.triggerTurn <= state.turn + 2);
    if (upcomingEchoes.length > 0) {
        upcomingEchoes.forEach(echo => {
            const turnsUntil = echo.triggerTurn - state.turn;
            const urgency = turnsUntil <= 1 ? "#f87171" : "#facc15";
            intelPillar.items.push({
                label: `💣 ${turnsUntil <= 1 ? "YAKLAŞAN KRİZ" : "Olası Tehdit"}: "${echo.originTitle}" kararının yansıması`,
                value: null,
                text: turnsUntil <= 1 ? "BU ÇEYREK" : `${turnsUntil} çeyrek sonra`,
                color: urgency
            });
        });
    }

    // Voter alliance threats
    if (state.voterAlliances && state.voterAlliances.length > 0) {
        state.voterAlliances.forEach(a => {
            if (a.progress >= 50) {
                intelPillar.items.push({ label: `🤝 ${a.name} (%${a.progress})`, value: a.progress, color: a.progress >= 80 ? "#f87171" : "#facc15" });
            }
        });
    }

    if (intelPillar.items.length === 0) {
        intelPillar.items.push({ label: "Aktif tehdit tespit edilmedi.", value: null, text: "DÜŞÜK RİSK", color: "#4ade80" });
    }

    // --- Render HTML ---
    let html = '';
    pillars.forEach(pillar => {
        html += `<div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 14px;">`;
        html += `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-family: var(--font-header); font-size: 0.8rem; font-weight: 700; color: var(--color-gold-text); letter-spacing: 1px;">${pillar.icon} ${pillar.title}</div>`;
        pillar.items.forEach(item => {
            html += `<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; font-size: 0.78rem;">`;
            html += `<span style="color: rgba(255,255,255,0.75); flex: 1;">${item.label}</span>`;
            if (item.value !== null && item.value !== undefined) {
                html += `<div style="flex: 0 0 120px; display: flex; align-items: center; gap: 6px;">`;
                html += `<div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;"><div style="width: ${Math.min(100, item.value)}%; height: 100%; background: ${item.color}; border-radius: 3px; transition: width 0.6s ease;"></div></div>`;
                html += `<span style="color: ${item.color}; font-weight: 700; font-size: 0.72rem; min-width: 28px; text-align: right;">%${Math.round(item.value)}</span>`;
                
                // Add trend indicators
                if (item.trend === 1) {
                    html += `<span style="color: #4ade80; font-size: 0.65rem; font-weight: bold; margin-left: 2px; text-shadow: 0 0 4px rgba(74, 222, 128, 0.4);">▲</span>`;
                } else if (item.trend === -1) {
                    html += `<span style="color: #f87171; font-size: 0.65rem; font-weight: bold; margin-left: 2px; text-shadow: 0 0 4px rgba(248, 113, 113, 0.4);">▼</span>`;
                } else if (item.trend === 0) {
                    html += `<span style="color: var(--text-muted); font-size: 0.65rem; margin-left: 2px;">▶</span>`;
                }
                
                html += `</div>`;
            } else if (item.text) {
                html += `<span style="color: ${item.color}; font-weight: 700; font-size: 0.75rem;">${item.text}</span>`;
            }
            html += `</div>`;
        });
        html += `</div>`;
    });

    container.innerHTML = html;

    // Bind start button
    const btnStart = doc("btn-start-quarter");
    const btnClose = doc("btn-close-briefing");

    const startHandler = () => {
        modal.classList.add("hidden");
        btnStart.removeEventListener("click", startHandler);
        if (btnClose) btnClose.removeEventListener("click", startHandler);
        onStartCallback();
    };

    btnStart.addEventListener("click", startHandler);
    if (btnClose) btnClose.addEventListener("click", startHandler);

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
}

// Next Turn progression
function handleNextTurn() {
    if (state.isGameOver) return;

    // Check NATO and Shanghai coup triggers
    if (state.activePolicies.nato_exit === 100) {
        triggerGameOver("nato_coup");
        return;
    }
    if (state.activePolicies.shanghai_membership === 100) {
        triggerGameOver("shanghai_coup");
        return;
    }

    // Check crisis before simulation (Coup below 40% stability)
    if (state.stability < 40) {
        triggerGameOver("coup_success");
        return;
    }

    // Check relationship-based game overs before simulation
    if (state.regimeWatch.sebataycilar.favor < 40 && state.voterGroups.liberals.approval < 40) {
        triggerGameOver("activist_resignation");
        return;
    }
    if (state.voterGroups.conservatives.approval < 40 && state.regimeWatch.cemaatler.favor < 40) {
        triggerGameOver("conservative_revolt");
        return;
    }
    if (state.regimeWatch.kemalist_burokrasi.favor < 40 && state.voterGroups.secular.approval < 40) {
        triggerGameOver("secular_takeover");
        return;
    }

    // Show quarterly briefing first, then proceed with simulation
    showQuarterBriefingModal(() => {
        executeNextTurn();
    });
}

function executeNextTurn() {
    // 1. Run simulation turn updates
    const results = runSimulationTurn(state);
    state.turn += 1;

    // Record data history
    recordHistoryPoint();
    
    // Save state logs
    logMessage(`${getQuarterString(state.turn)} dönemine geçildi. Kazanılan Siyasi Sermaye: +${results.pcGain}. Bütçe Fazlası: ₺${(results.surplus / 1000000000).toFixed(2)} Milyar.`);

    // Check NATO and Shanghai coup triggers after simulation
    if (state.activePolicies.nato_exit === 100) {
        triggerGameOver("nato_coup");
        return;
    }
    if (state.activePolicies.shanghai_membership === 100) {
        triggerGameOver("shanghai_coup");
        return;
    }

    // Check game over stability collapse (Coup below 40% stability)
    if (state.stability < 40) {
        triggerGameOver("coup_success");
        return;
    }

    // Check relationship-based game overs after simulation
    if (state.regimeWatch.sebataycilar.favor < 40 && state.voterGroups.liberals.approval < 40) {
        triggerGameOver("activist_resignation");
        return;
    }
    if (state.voterGroups.conservatives.approval < 40 && state.regimeWatch.cemaatler.favor < 40) {
        triggerGameOver("conservative_revolt");
        return;
    }
    if (state.regimeWatch.kemalist_burokrasi.favor < 40 && state.voterGroups.secular.approval < 40) {
        triggerGameOver("secular_takeover");
        return;
    }

    // Check if debt has grown completely out of control (Bankruptcy)
    if (state.treasury < -80000000000) { // ₺80 Billion debt limit
        triggerGameOver("bankruptcy");
        return;
    }

    // Check if there is a pending secret file
    if (state.secretFile && state.secretFile.status === 'pending') {
        showSecretFileModal(() => {
            continueNextTurnAfterSecretFile();
        });
        return;
    }

    continueNextTurnAfterSecretFile();
}

function getElectionPostponeEvent() {
    return {
        id: "election_postpone_decision",
        title: "YAKLAŞAN GENEL SEÇİMLER VE ZAMAN TALEBİ",
        desc: "Seçim çeyreğine girmek üzereyiz. Siyasi durumumuz ve anketlerdeki oy oranımız henüz tek başına iktidara yetmeyebilir veya yeni reformlar için zamana ihtiyacımız olabilir. Meclisteki gücümüzü kullanarak YSK kanalıyla seçimleri olağanüstü koşullar gerekçesiyle 1 çeyrek erteleme seçeneğimiz bulunmaktadır. Seçimleri erteleyelim mi, yoksa şimdi sandığa mı gidelim?",
        choices: [
            {
                text: "Seçim Sürecini Başlat (TV Tartışmasına ve Sandıklara Geç)",
                consequenceText: "TV canlı yayını ve seçim gecesi süreci başlar.",
                action: (s) => {
                    s.isElectionStarted = true;
                    triggerTVDebate();
                    return null;
                }
            },
            {
                text: "Seçimleri 1 Çeyrek Ertele (Bir Çeyrek Daha Oyna) [-15 PC, -10 İstikrar, Demokratik Haklar -8]",
                consequenceText: "Seçimler ertelenir, 1 çeyrek ek süre kazanılır. Özgürlükler ve İstikrar zarar görür.",
                action: (s) => {
                    s.maxTurns += 1;
                    s.isElectionStarted = false;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.stability = Math.max(0, s.stability - 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 8);
                    s.logs.push(`OLAĞANÜSTÜ ERTELEME: Seçimler 1 çeyrek ertelendi. Yeni Seçim Çeyreği: Çeyrek ${s.maxTurns}`);
                    setTimeout(() => {
                        updateDashboard();
                        updateMap();
                        renderVoterGroups();
                        updateNewsTicker();
                    }, 50);
                    return null;
                }
            }
        ]
    };
}

function continueNextTurnAfterSecretFile() {
    // End the simulation directly at the 16th quarter
    if (state.turn === state.maxTurns) {
        showEndingScreen("completed");
        return;
    }

    // 2. Check for Prioritized Conditional Crisis Events
    const crisisEv = triggerPrioritizedCrisisEvent(state, triggerGameOver);
    if (crisisEv) {
        triggerEventPopup(crisisEv);
        return;
    }

    // 3. Check for voter alliance warnings (show alliance event if any at progress >= 70)
    if (state.voterAlliances && state.voterAlliances.length > 0) {
        const dangerAlliance = state.voterAlliances.find(a => a.progress >= 70 && a.progress < 100);
        if (dangerAlliance && Math.random() < 0.4) {
            // Generate a warning/foreshadowing event for this alliance
            const warningEv = {
                id: `${dangerAlliance.id}_warning`,
                title: `İSTİHBARAT UYARISI: ${dangerAlliance.name.toUpperCase()}`,
                desc: `MİT raporu: "${dangerAlliance.name}" ittifakı (${dangerAlliance.members.join(' + ')}) hızla güçleniyor (Olgunluk: %${dangerAlliance.progress}). Koordineli bir ${dangerAlliance.threat.toLowerCase()} hazırlığı içindeler. Siyasi Sermaye harcayarak bu ittifakı zayıflatabilirsiniz.`,
                choices: [
                    {
                        text: `İttifakı zayıflatmak için karşı istihbarat operasyonu başlat. (-20 Siyasi Sermaye)`,
                        consequenceText: `İttifak ilerlemesi %30 düşer, Siyasi Sermaye -20.`,
                        action: (s) => {
                            s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                            const a = s.voterAlliances.find(x => x.id === dangerAlliance.id);
                            if (a) a.progress = Math.max(0, a.progress - 30);
                            return null;
                        }
                    },
                    {
                        text: `İttifak hakkındaki istihbaratı görmezden gel ve olaylara seyirci kal.`,
                        consequenceText: `İttifak ilerlemesi devam eder. Risk artabilir.`,
                        action: (s) => {
                            return null;
                        }
                    },
                    {
                        text: `İttifak liderlerini gözaltına al ve örgütü dağıt. (-15 Siyasi Sermaye, Özgürlük -8)`,
                        consequenceText: `İttifak dağılır ama ilgili grupların öfkesi artar (-15 approval). Özgürlük -8.`,
                        action: (s) => {
                            s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 8);
                            s.voterAlliances = s.voterAlliances.filter(a => a.id !== dangerAlliance.id);
                            return null;
                        }
                    }
                ]
            };
            triggerEventPopup(warningEv);
            return;
        }
    }

    // 4. Force a Random Event from the new 30-crisis database every quarter
    const ev = triggerRandomEvent(state);
    if (ev) {
        triggerEventPopup(ev);
    } else {
        // Pick a random event from database ignoring conditions as final fallback
        const fallbackEv = events[Math.floor(Math.random() * events.length)];
        triggerEventPopup(fallbackEv);
    }
}

// Trigger Event Popup Modal
function triggerEventPopup(eventObj) {
    currentEvent = eventObj;
    
    // Add event ID to triggered events history to prevent repetition
    if (!state.triggeredEvents) state.triggeredEvents = [];
    if (eventObj.id && !state.triggeredEvents.includes(eventObj.id)) {
        state.triggeredEvents.push(eventObj.id);
    }
    
    const modalContent = doc("modal-event").querySelector(".modal-content");
    modalContent.className = "modal-content crisis-card";
    
    // Build crisis room layout dynamically
    modalContent.innerHTML = `
        <button class="btn-close" id="btn-close-event" style="color: #ff4444;"><i data-lucide="x"></i></button>
        <div class="crisis-header">
            <div class="crisis-logo"><span class="crisis-icon">⚡</span> KRİZ MASASI</div>
            <div class="crisis-meta">
                <span>DÖNEM: ${getQuarterString(state.turn)}</span>
                <span>DOSYA NO: ${100 + state.turn}</span>
                <span class="crisis-classification">GİZLİLİK: ÇOK GİZLİ</span>
            </div>
        </div>
        <div class="crisis-headline" id="event-title">${eventObj.title.toUpperCase()}</div>
        <div class="crisis-body" id="event-desc">${eventObj.desc}</div>
        <div class="crisis-options" id="event-options-container"></div>
    `;
    
    // Re-bind Lucide close icon for safety
    doc("btn-close-event").addEventListener("click", () => {
        doc("modal-event").classList.add("hidden");
    });
    
    const container = doc("event-options-container");
    eventObj.choices.forEach((choice, idx) => {
        const btn = document.createElement("button");
        btn.className = "crisis-btn";
        btn.innerHTML = `
            <span class="option-text">${choice.text}</span>
            <span class="option-consequence" style="display:block; font-size:0.75rem; margin-top:4px; opacity:0.85; color:#555;">${choice.consequenceText}</span>
        `;
        btn.addEventListener("click", () => resolveEventChoice(idx));
        container.appendChild(btn);
    });

    doc("modal-event").classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
}

function resolveEventChoice(choiceIdx) {
    if (!currentEvent) return;
    
    const choice = currentEvent.choices[choiceIdx];
    
    // Capture state snapshot before action for radical consequences (1.5x amplification)
    const snap = {
        stability: state.stability,
        politicalCapital: state.politicalCapital,
        treasury: state.treasury,
        systems: { ...state.systems },
        voterGroups: {},
        regimeWatch: {},
        powerCenters: {}
    };
    
    for (const vg in state.voterGroups) {
        snap.voterGroups[vg] = { ...state.voterGroups[vg] };
    }
    for (const rw in state.regimeWatch) {
        snap.regimeWatch[rw] = { ...state.regimeWatch[rw] };
    }
    if (state.powerCenters) {
        for (const pc in state.powerCenters) {
            snap.powerCenters[pc] = { ...state.powerCenters[pc] };
        }
    }
    
    const nextEvent = choice.action(state);
    
    // Amplify factor for radical consequences: 1.5x impact!
    const amp = 1.5;
    
    // 1. Stability
    let diffStability = state.stability - snap.stability;
    if (diffStability !== 0) {
        state.stability = Math.max(0, Math.min(100, Math.round(snap.stability + diffStability * amp)));
    }
    
    // 2. Political Capital (amplify gain or loss)
    let diffPC = state.politicalCapital - snap.politicalCapital;
    if (diffPC !== 0) {
        state.politicalCapital = Math.max(0, Math.min(200, Math.round(snap.politicalCapital + diffPC * amp)));
    }

    // 3. Treasury (amplify cost/gain)
    let diffTreasury = state.treasury - snap.treasury;
    if (diffTreasury !== 0) {
        state.treasury = snap.treasury + Math.round(diffTreasury * amp);
    }
    
    // 4. Systems
    for (const sys in state.systems) {
        let diff = state.systems[sys] - snap.systems[sys];
        if (diff !== 0) {
            state.systems[sys] = Math.max(0, Math.min(100, Math.round(snap.systems[sys] + diff * amp)));
        }
    }
    
    // 5. Voter Groups Approvals
    for (const vg in state.voterGroups) {
        let diff = state.voterGroups[vg].approval - snap.voterGroups[vg].approval;
        if (diff !== 0) {
            state.voterGroups[vg].approval = Math.max(0, Math.min(100, Math.round(snap.voterGroups[vg].approval + diff * amp)));
        }
    }
    
    // 6. Factions (Regime Watch favor)
    for (const rw in state.regimeWatch) {
        let diff = state.regimeWatch[rw].favor - snap.regimeWatch[rw].favor;
        if (diff !== 0) {
            state.regimeWatch[rw].favor = Math.max(0, Math.min(100, Math.round(snap.regimeWatch[rw].favor + diff * amp)));
        }
    }
    
    // 7. Power Centers approval and anger
    if (state.powerCenters) {
        for (const pc in state.powerCenters) {
            let diffApp = state.powerCenters[pc].approval - snap.powerCenters[pc].approval;
            if (diffApp !== 0) {
                state.powerCenters[pc].approval = Math.max(0, Math.min(100, Math.round(snap.powerCenters[pc].approval + diffApp * amp)));
            }
            let diffAng = state.powerCenters[pc].anger - snap.powerCenters[pc].anger;
            if (diffAng !== 0) {
                state.powerCenters[pc].anger = Math.max(0, Math.min(100, Math.round(snap.powerCenters[pc].anger + diffAng * amp)));
            }
        }
    }
    
    // Save decision
    if (!state.decisions) {
        state.decisions = {};
    }
    if (currentEvent.id) {
        state.decisions[currentEvent.id] = choiceIdx;
    }
    
    logMessage(`Event resolved: "${currentEvent.title}". Selected: "${choice.text}"`);

    // Queue Decision Echo if it's a standard event
    if (currentEvent.id && !currentEvent.id.endsWith("_echo") && currentEvent.id !== "election_postpone_decision" && !currentEvent.id.startsWith("minister_") && !currentEvent.id.endsWith("_premium")) {
        const echoId = `${currentEvent.id}_c${choiceIdx}_echo`;
        state.decisionEchoes = state.decisionEchoes || [];
        const delay = Math.round(2 + Math.random()); // 2 or 3 turns
        state.decisionEchoes.push({
            triggerTurn: state.turn + delay,
            eventId: echoId,
            originTitle: currentEvent.title,
            originChoiceText: choice.text
        });
        logMessage(`DÖNÜT SIRALANDI: "${currentEvent.title}" kararı için ${delay} çeyrek sonrasına "${echoId}" planlandı.`);
    }
    
    if (nextEvent) {
        // Trigger chained consequence event (e.g. Darbe Girişimi Bastırıldı / Başarılı)
        triggerEventPopup(nextEvent);
    } else {
        doc("modal-event").classList.add("hidden");
        currentEvent = null;
        
        updateDashboard();
        updateMap();
        renderVoterGroups();
        updateNewsTicker();
        
        if (activeTab === "history") {
            renderHistoryChart("history-chart", state.history);
        }
    }
}

// TV Debate Flow
function triggerTVDebate() {
    currentDebateQuestionIndex = 0;
    
    const opponent = getDebateOpponentForParty(state.ideology);
    doc("opponent-name").textContent = `${opponent.name} (${opponent.party})`;
    doc("player-name").textContent = `${state.partyName} Lideri`;
    
    const modalContent = doc("modal-debate").querySelector(".modal-content");
    modalContent.className = "modal-content debate-modal debate-panel";

    // Set initial Live Poll feedback
    const playerPoll = calculatePollingSupport();
    doc("debate-live-metrics").textContent = `HÜKÜMET: %${playerPoll} | MUHALEFET: %${100 - playerPoll}`;
    doc("debate-live-metrics").style.color = playerPoll >= 50 ? "var(--color-green-text)" : "var(--color-red-text)";
    
    loadDebateQuestion();
    doc("modal-debate").classList.remove("hidden");
}

function loadDebateQuestion() {
    const question = debateQuestions[currentDebateQuestionIndex];
    doc("opponent-speech").textContent = `"${question.opponentSpeech}"`;
    doc("player-speech").textContent = "Televizyon yayını cevap seçeneği bekleniyor...";
    
    const container = doc("debate-choices-container");
    container.innerHTML = "";

    question.choices.forEach((choice, idx) => {
        const btn = document.createElement("button");
        btn.className = "debate-choice-btn";
        btn.textContent = choice.text;
        
        btn.addEventListener("click", () => selectDebateResponse(choice, idx));
        container.appendChild(btn);
    });
}

function selectDebateResponse(choice, idx) {
    doc("player-speech").textContent = `"${choice.text}"`;
    
    // Apply immediate effects
    for (const group in choice.effects) {
        if (group === "corruption") {
            state.systems.corruption = Math.max(0, Math.min(100, state.systems.corruption + choice.effects[group]));
        } else if (state.voterGroups[group]) {
            state.voterGroups[group].approval = Math.max(0, Math.min(100, state.voterGroups[group].approval + choice.effects[group]));
        }
    }

    logMessage(`TV Debate Round ${currentDebateQuestionIndex + 1}: Stance chosen.`);

    // Update Live Poll feedback
    const playerPoll = calculatePollingSupport();
    doc("debate-live-metrics").textContent = `HÜKÜMET: %${playerPoll} | MUHALEFET: %${100 - playerPoll}`;
    doc("debate-live-metrics").style.color = playerPoll >= 50 ? "var(--color-green-text)" : "var(--color-red-text)";

    const choicesContainer = doc("debate-choices-container");
    choicesContainer.innerHTML = ""; // block double clicks

    const nextBtn = document.createElement("button");
    nextBtn.className = "btn-primary";
    nextBtn.style.margin = "10px auto 0";
    
    if (currentDebateQuestionIndex < debateQuestions.length - 1) {
        nextBtn.textContent = "Sıradaki Konuya Geç";
        nextBtn.addEventListener("click", () => {
            currentDebateQuestionIndex++;
            loadDebateQuestion();
        });
    } else {
        nextBtn.textContent = "Tartışmayı Bitir ve Sandıkları Aç";
        nextBtn.addEventListener("click", () => {
            doc("modal-debate").classList.add("hidden");
            handleNextTurn();
        });
    }
    choicesContainer.appendChild(nextBtn);
}

// Election Calculations & TV Live Broadcast reveal
function triggerElectionNight() {
    const list = doc("election-regions-list");
    list.innerHTML = "";

    let totalWeightVotes = 0;
    let totalElectorateWeight = 0;
    let wonRegionsCount = 0;

    const regionResults = [];

    regions.forEach(region => {
        const support = calculateRegionSupport(region, state);
        const didWin = support >= 50;
        
        if (didWin) wonRegionsCount++;

        const sizeProportion = getRegionSizeProportion(region);
        totalWeightVotes += support * sizeProportion;
        totalElectorateWeight += sizeProportion;

        regionResults.push({ region, support, didWin });
    });

    const finalPct = Math.round(totalWeightVotes / totalElectorateWeight);

    // Initial TV state setup - Hide final results for broadcast tension
    const voteCircle = document.querySelector(".final-vote-circle");
    voteCircle.style.visibility = "hidden";
    doc("parliament-seats-container").classList.add("hidden");
    doc("election-tally-details").style.display = "none";
    doc("election-title").textContent = "SEÇİM GECESİ CANLI YAYINI";

    const statusBox = doc("election-tally-details");
    const footer = doc("election-footer-actions");
    footer.innerHTML = "";

    // Add Start Broadcast Button
    const startBroadcastBtn = document.createElement("button");
    startBroadcastBtn.className = "btn-primary";
    startBroadcastBtn.textContent = "Seçim Sonuç Yayını Başlat";
    footer.appendChild(startBroadcastBtn);

    doc("modal-election").classList.remove("hidden");

    startBroadcastBtn.addEventListener("click", () => {
        startBroadcastBtn.disabled = true;
        startBroadcastBtn.textContent = "Sandıklar Açılıyor...";
        
        let index = 0;
        let runningVotesSum = 0;
        let runningWeightSum = 0;

        function revealNextRegion() {
            if (index < regionResults.length) {
                const res = regionResults[index];
                runningVotesSum += res.support * getRegionSizeProportion(res.region);
                runningWeightSum += getRegionSizeProportion(res.region);
                
                const currentRunningPct = Math.round(runningVotesSum / runningWeightSum);
                doc("election-final-pct").textContent = `${currentRunningPct}%`;
                voteCircle.style.visibility = "visible";

                const row = document.createElement("div");
                row.className = "region-result-card";
                row.innerHTML = `
                    <span class="reg-name">${res.region.name}</span>
                    <span>Support: ${res.support}%</span>
                    <span class="reg-winner ${res.didWin ? 'win-player' : 'win-opp'}">${res.didWin ? 'KAZANDI' : 'KAYBETTİ'}</span>
                `;
                list.appendChild(row);
                list.scrollTop = list.scrollHeight;

                // Update bottom ticker
                const ticker = doc("news-ticker");
                if (ticker) {
                    ticker.textContent = `| GÜNDEM: ${res.region.name.toUpperCase()} SANDIKLARI AÇILDI. ONAY ORANI: %${res.support} |`;
                }

                index++;
                setTimeout(revealNextRegion, 850); // delay between regions
            } else {
                // All regions opened! Show final totals and parliament
                doc("election-final-pct").textContent = `${finalPct}%`;
                
                // Parliament Calculation
                const playerSeats = Math.round((finalPct / 100) * 600);
                const oppSeats = 600 - playerSeats;
                doc("seats-player-count").textContent = playerSeats;
                doc("seats-opp-count").textContent = oppSeats;
                doc("seats-player-bar").style.width = `${(playerSeats / 600) * 100}%`;
                doc("seats-opp-bar").style.width = `${(oppSeats / 600) * 100}%`;

                // Show details
                doc("parliament-seats-container").classList.remove("hidden");
                doc("election-tally-details").style.display = "block";
                footer.innerHTML = "";

                if (finalPct >= 50) {
                    voteCircle.className = "final-vote-circle";
                    statusBox.innerHTML = `
                        <p style="color: var(--color-green-text); font-weight: bold; font-size: 1.1rem; margin-bottom: 8px;">SEÇİM ZAFERİ!</p>
                        <p>Partiniz ulusal oyların %${finalPct}'ini alarak tek başına iktidar yetkisi elde etti. 4 yıl boyunca Türkiye'yi yöneteceksiniz.</p>
                    `;
                    
                    const nextBtn = document.createElement("button");
                    nextBtn.className = "btn-primary";
                    nextBtn.textContent = "Tarihi Mirası ve Sonu Gör";
                    nextBtn.addEventListener("click", () => {
                        showEndingScreen("victory");
                    });
                    footer.appendChild(nextBtn);
                } else if (finalPct >= 30) {
                    voteCircle.className = "final-vote-circle lost";
                    statusBox.innerHTML = `
                        <p style="color: var(--color-gold-text); font-weight: bold; font-size: 1.1rem; margin-bottom: 8px;">KOALİSYON GEREKLİ</p>
                        <p>Oyların %${finalPct}'ini aldınız fakat tek başınıza hükümet kuracak çoğunluğu (300 milletvekili) elde edemediniz. Koalisyon görüşmelerine girmelisiniz.</p>
                    `;

                    const nextBtn = document.createElement("button");
                    nextBtn.className = "btn-primary";
                    nextBtn.textContent = "Koalisyon Görüşmelerine Gir";
                    nextBtn.addEventListener("click", () => {
                        doc("modal-election").classList.add("hidden");
                        openCoalitionModal(finalPct);
                    });
                    footer.appendChild(nextBtn);
                } else {
                    voteCircle.className = "final-vote-circle lost";
                    statusBox.innerHTML = `
                        <p style="color: var(--color-danger); font-weight: bold; font-size: 1.1rem; margin-bottom: 8px;">SEÇİM MAĞLUBİYETİ</p>
                        <p>Partiniz sadece %${finalPct} oy alabildi. Muhalefet hükümeti kurarak iktidarınızı devraldı. Simülasyon sona erdi.</p>
                    `;

                    const nextBtn = document.createElement("button");
                    nextBtn.className = "btn-primary btn-next-turn";
                    nextBtn.textContent = "Tarihi Mirası ve Sonu Gör";
                    nextBtn.addEventListener("click", () => {
                        showEndingScreen("defeat");
                    });
                    footer.appendChild(nextBtn);

                    if (state.emergencyContinues < 2) {
                        const ohalBtn = document.createElement("button");
                        ohalBtn.className = "btn-primary";
                        ohalBtn.style.background = "var(--color-danger)";
                        ohalBtn.style.borderColor = "var(--color-danger)";
                        ohalBtn.style.color = "white";
                        ohalBtn.style.marginLeft = "10px";
                        ohalBtn.textContent = `Seçimleri İptal Et ve OHAL İlan Et (Bir Çeyrek Daha) [Hak: ${2 - state.emergencyContinues}]`;
                        ohalBtn.addEventListener("click", () => {
                            state.emergencyContinues += 1;
                            state.isGameOver = false;
                            state.politicalCapital = 0;
                            state.systems.freedom = Math.max(5, state.systems.freedom - 20);
                            state.stability = Math.max(10, state.stability - 15);
                            state.maxTurns += 1;
                            state.isElectionStarted = false;
                            state.logs.push(`MEŞRUİYET KRİZİ: Hükümet seçim sonuçlarını geçersiz sayarak sıkıyönetim ilan etti. Ülke çapında protestolar başladı!`);
                            
                            // Increase voter group anger / protest risk
                            for (const g in state.voterGroups) {
                                state.voterGroups[g].approval = Math.max(5, state.voterGroups[g].approval - 15);
                                state.voterGroups[g].protestRisk = Math.min(100, state.voterGroups[g].protestRisk + 25);
                            }

                            doc("modal-election").classList.add("hidden");
                            
                            setTimeout(() => {
                                updateDashboard();
                                updateMap();
                                renderVoterGroups();
                                updateNewsTicker();
                            }, 50);
                        });
                        footer.appendChild(ohalBtn);
                    }
                }
            }
        }

        revealNextRegion();
    });
}

function getRegionSizeProportion(region) {
    // Arbitrary size weights matching relative real population:
    // Marmara is huge, Aegean/Central are medium, East/South-east are small-mid, etc.
    const sizes = {
        marmara: 0.30,
        aegean: 0.15,
        mediterranean: 0.13,
        central_anatolia: 0.17,
        black_sea: 0.10,
        eastern_anatolia: 0.08,
        southeastern_anatolia: 0.07
    };
    return sizes[region.id] || 0.10;
}

function openCoalitionModal(voteShare) {
    const list = doc("coalition-partners-list");
    list.innerHTML = "";

    const btnAccept = doc("btn-accept-coalition");
    btnAccept.disabled = true;

    let selectedPartner = null;

    coalitionPartners.forEach(partner => {
        const card = document.createElement("div");
        card.className = "partner-card";
        card.innerHTML = `
            <div class="partner-header-row">
                <span class="partner-name">${partner.name}</span>
                <span class="partner-seats">Target voters: ${partner.voterStrength}</span>
            </div>
            <p class="partner-demand"><strong>Coalition Demand:</strong> ${partner.demand}</p>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".partner-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedPartner = partner;
            btnAccept.disabled = false;
        });

        list.appendChild(card);
    });

    // Handle Form Government Action
    btnAccept.onclick = () => {
        if (!selectedPartner) return;
        
        // Apply demand
        selectedPartner.action(state);
        state.activeCoalition = selectedPartner;
        
        doc("modal-coalition").classList.add("hidden");
        
        // Start next term
        showEndingScreen("coalition", selectedPartner);
    };

    doc("modal-coalition").classList.remove("hidden");
}

function advanceToNextTerm(coalitionObj) {
    state.turn = 1;
    state.electionCount += 1;
    state.maxTurns = 16; // Reset election cycle turns
    state.isElectionStarted = false;
    
    // Add windfall stability boost for forming a government
    state.stability = Math.min(100, state.stability + 15);
    state.politicalCapital = Math.min(200, state.politicalCapital + 40);

    logMessage(`Term ${state.electionCount} initiated. Coalition formed: ${coalitionObj ? coalitionObj.name : 'None (Majority Rule)'}. Year: 2042.`);
    
    updateDashboard();
    updateMap();
    renderVoterGroups();
    updateNewsTicker();
    
    if (activeTab === "history") {
        renderHistoryChart("history-chart", state.history);
    }
}

function showEndingScreen(endingType, coalitionPartner = null) {
    // Clean up red alert styles
    document.body.classList.remove("red-alert-active", "screen-shake");

    // Hide other modals just in case
    doc("modal-election").classList.add("hidden");
    doc("modal-coalition").classList.add("hidden");
    
    const bodyContent = doc("ending-body-content");
    if (!bodyContent) return;
    
    bodyContent.innerHTML = "";
    
    // --- 1. Compute Management Scorecard (Yönetim Karnesi) Grades ---
    const getGrade = (val) => {
        if (val >= 85) return { letter: "A", color: "#2ecc71" }; // Green
        if (val >= 70) return { letter: "B", color: "#27ae60" }; // Dark Green
        if (val >= 55) return { letter: "C", color: "#f1c40f" }; // Yellow
        if (val >= 40) return { letter: "D", color: "#e67e22" }; // Orange
        return { letter: "F", color: "#e74c3c" }; // Red
    };

    const economyVal = state.systems.economy;
    const stabilityVal = state.stability;
    const freedomVal = state.systems.freedom;
    const securityVal = (state.systems.security + state.powerCenters.military.approval) / 2;
    const pollingSupportVal = calculatePollingSupport();

    const econGrade = getGrade(economyVal);
    const stabGrade = getGrade(stabilityVal);
    const freeGrade = getGrade(freedomVal);
    const secGrade = getGrade(securityVal);
    const pollGrade = getGrade(pollingSupportVal);

    // --- 2. Determine Ending Narrative (5 Different Finals) ---
    let finalType = "";
    let finalTitle = "";
    let finalDesc = "";
    let finalIcon = "";
    let finalBadgeColor = "";

    const economy = state.systems.economy;
    const freedom = state.systems.freedom;
    const security = state.systems.security;
    const stability = state.stability;
    const publicApp = pollingSupportVal;
    const militaryApp = state.powerCenters.military.approval;
    const happiness = state.systems.happiness;

    // Check survival ends (victory, coalition, defeat) or premature game-overs
    if (endingType === "stability_collapse") {
        finalType = "stability_collapse";
        finalTitle = "MİLLİ ÇÖKÜŞ VE KAOS";
        finalDesc = "Ülkedeki kutuplaşmayı ve sokak çatışmalarını engelleyemediniz. Hükümet otoritesi tamamen eridi ve asayiş çöktü. Kaos sokakları yutarken Türkiye tarihindeki en karanlık yönetim krizlerinden birine sürüklendi.";
        finalIcon = "💀";
        finalBadgeColor = "#e74c3c";
    } else if (endingType === "coup_success") {
        finalType = "coup_success";
        finalTitle = "ASKERİ MÜDAHALE VE SIKIYÖNETİM";
        finalDesc = "Ordu komuta kademesi ve cuntacı subaylar anayasal düzeni çiğneyerek TRT binasını işgal etti ve yönetime el koydu. Siyasi iktidarınız bir askeri cunta bildirisiyle son bulurken demokrasi askıya alındı.";
        finalIcon = "⚔️";
        finalBadgeColor = "#7f8c8d";
    } else if (endingType === "nato_coup") {
        finalType = "nato_coup";
        finalTitle = "NATO / GLADIO ASKERİ MÜDAHALESİ";
        finalDesc = "NATO'dan tamamen çekilme ve Batı askeri tesislerini kapatma kararınız, ordu içerisindeki Atlantikçi subayları ve Gladio yapılanmalarını harekete geçirdi. Hükümetiniz 'milli güvenlik tehdidi' ilan edilerek askeri cunta tarafından devrildi. Batı bloku ile ilişkiler tamamen koparken Türkiye askeri vesayetin karanlığına gömüldü.";
        finalIcon = "⚔️";
        finalBadgeColor = "#e74c3c";
    } else if (endingType === "shanghai_coup") {
        finalType = "shanghai_coup";
        finalTitle = "AVRASYA KARŞITI CUNTA DEVRİMİ";
        finalDesc = "Şanghay İşbirliği Örgütü'ne tam üyelik ve Avrasya askeri ittifaklarına dahil olma hamleniz, Kemalist ordu kademelerinde ve Batı yanlısı bürokraside kırmızı alarm verdi. 'Cumhuriyetin kurucu ilkelerinden sapıldığı ve ülkenin ekseninin değiştirildiği' gerekçesiyle TSK yönetime el koydu. Demokratik süreçler askıya alındı.";
        finalIcon = "⚔️";
        finalBadgeColor = "#e74c3c";
    } else if (endingType === "bankruptcy") {
        finalType = "bankruptcy";
        finalTitle = "DEVLET İFLASI VE BORÇ BATAĞI";
        finalDesc = "Hazine borcunun sürdürülemez boyutlara ulaşmasıyla devlet iflas bayrağını çekti. Memur maaşları ödenemedi, kamu hizmetleri durdu ve dış finansörler tüm varlıklara el koydu. Türkiye ekonomik bir tasfiyeye maruz kaldı.";
        finalIcon = "📉";
        finalBadgeColor = "#e67e22";
    } else if (endingType === "activist_resignation") {
        finalType = "activist_resignation";
        finalTitle = "SİVİL İSTİFA VE KİTLESEL BASKI";
        finalDesc = "Sebataycı seçkinler ve liberal kesimlerle olan ilişkilerin tamamen çökmesiyle başlayan sokak hareketleri, hükümetinizi devirdi. Milyonların protestoları altında istifa etmek ve yetkilerinizi devretmek zorunda kaldınız.";
        finalIcon = "📢";
        finalBadgeColor = "#9b59b6";
    } else if (endingType === "conservative_revolt") {
        finalType = "conservative_revolt";
        finalTitle = "DİNDAR-MUHAFAZAKAR BAŞKALDIRISI";
        finalDesc = "Muhafazakar halk tabanı ve cemaatlerin desteğini yitirmeniz, Anadolu genelinde din temelli büyük bir ayaklanmaya yol açtı. Hükümetinizin laikçi politikalarına karşı birleşen kitleler meşruiyetinizi bitirdi.";
        finalIcon = "🕌";
        finalBadgeColor = "#27ae60";
    } else if (endingType === "secular_takeover") {
        finalType = "secular_takeover";
        finalTitle = "LAİK BÜROKRASİ VESAYETİ";
        finalDesc = "Kemalist bürokrasi ve seküler seçmenlerin onayını kaybetmeniz, ordu-yargı vesayetini tetikledi. Devlet organları tarafından kıskaca alındınız ve laik anayasal düzeni koruma bahanesiyle tasfiye edildiniz.";
        finalIcon = "🏛️";
        finalBadgeColor = "#2980b9";
    } else {
        // Normal 16-Quarter Survival Endings (5 Finals)
        if (economy > 70 && stability > 70 && publicApp > 60) {
            finalType = "golden_age";
            finalTitle = "ALTIN ÇAĞ: BÖLGESEL LİDER VE KÜRESEL GÜÇ";
            finalDesc = "16 çeyreklik döneminizin sonunda Türkiye gerçek bir şahlanış yaşadı. Enflasyon tek hanelerde dengelendi, yüksek teknoloji ve milli sanayi yatırımları meyvesini verdi ve refah tabana yayıldı. Bölgesinde oyun kurucu, dünyada sözü geçen bir Türkiye inşa ettiniz. Tarih sizi Türkiye'yi şahlandıran dahi lider olarak kaydedecek.";
            finalIcon = "👑";
            finalBadgeColor = "#c2a05d"; // Gold
        } else if (freedom < 30 && security > 65) {
            finalType = "iron_fist";
            finalTitle = "DEMİR YUMRUK: OTORİTER POLİS DEVLETİ";
            finalDesc = "Basın sansürü, asayiş operasyonları ve demokratik hakların askıya alınmasıyla ülkeyi demir yumrukla yönettiniz. Muhalefet sindirildi, sivil toplum tamamen susturuldu. Sokaklarda mutlak bir asayiş hakim olsa da halkın özgürlük soluğu kesildi. Türkiye artık gücünü korkudan alan tek adam rejimidir.";
            finalIcon = "🛡️";
            finalBadgeColor = "#7f8c8d";
        } else if (happiness > 60 && publicApp > 60) {
            finalType = "welfare_state";
            finalTitle = "HALKÇI İKTİDAR: SOSYAL REFAH DEVLETİ";
            finalDesc = "Büyük holdinglerin ve elit lobilerin çıkarları yerine halkın, işçi sınıfının ve dar gelirlinin refahını gözettiniz. Sendikalar güçlendi, eğitim ve sağlıkta devasa sosyal devlet yardımları yapıldı, asgari geçim şartları güvenceye alındı. Gelir adaleti sağlandı. Türkiye artık sosyal adaletin kalesidir.";
            finalIcon = "🤝";
            finalBadgeColor = "#2ecc71";
        } else if (militaryApp > 65 && state.powerCenters.judiciary.approval > 65 && freedom >= 30 && freedom <= 70) {
            finalType = "technocracy";
            finalTitle = "TEKNOKRASİ: VESAYETÇİ DEVLET DÜZENİ";
            finalDesc = "Devlet aklı, yargı bağımsızlığı ve ordu disiplinini her şeyin üzerinde tuttunuz. Popülist hamleler yerine liyakat odaklı bürokrasiye güvendiniz. Türkiye istikrarlı, kurallara bağlı ve hukuken düzenli bir sisteme kavuşsa da siyaset geri plana itildi ve soğuk bir vesayet teknokrasisi inşa edildi.";
            finalIcon = "🏛️";
            finalBadgeColor = "#2980b9";
        } else {
            finalType = "pragmatic_balance";
            finalTitle = "HİBRİT REJİM: POPÜLİST DENGE POLİTİKASI";
            finalDesc = "16 çeyrek boyunca ne tam bir diktatörlük ne de tam bir demokrasi kurdunuz. Günü kurtaran pragmatik kararlar, anlık koalisyon pazarlıkları, medyanın kısmi denetimi ve klikleri birbirine kırdırma siyasetiyle koltuğunuzu korudunuz. Türkiye'yi büyük fırtınalardan kaçırarak dengede tuttunuz ancak kalıcı bir vizyon bırakamadınız.";
            finalIcon = "⚖️";
            finalBadgeColor = "#f1c40f";
        }
    }

    // --- 3. Faction Alignment Summary ---
    let factionInfluenceDesc = "";
    let highestFaction = "";
    let maxFavor = 0;
    for (const f in state.regimeWatch) {
        if (state.regimeWatch[f].favor > maxFavor) {
            maxFavor = state.regimeWatch[f].favor;
            highestFaction = f;
        }
    }
    
    if (maxFavor > 65) {
        if (highestFaction === "cemaatler") {
            factionInfluenceDesc = "Döneminiz boyunca muhafazakar tarikat ve cemaat yapılanmalarına geniş alan açtınız. Kamu kadroları ve milli eğitim müfredatı bu yapıların etkisi altında şekillenirken, Türkiye toplumsal yapısında teokratik ve dindar bir dönüşümün temelleri atıldı.";
        } else if (highestFaction === "kemalist_burokrasi") {
            factionInfluenceDesc = "Laik ve Kemalist bürokrasi kadrolarıyla ittifakınızı pekiştirdiniz. Devletin laik ve cumhuriyetçi temel kodları korunurken, cemaatler ve dindar sivil toplum yapıları üzerinde sert bir baskı uygulandı. Eski vesayet odakları gücünü tazeledi.";
        } else if (highestFaction === "buyuk_sermaye") {
            factionInfluenceDesc = "Ekonomi politikalarınız tamamen büyük holdingler ve İstanbul sermayesinin yönlendirmesiyle şekillendi. Ülkenin zengin elitleri siyasi kararlar üzerinde doğrudan veto yetkisine sahip oldu ve Türkiye oligarşik bir sermaye düzenine teslim edildi.";
        } else if (highestFaction === "super_nato") {
            factionInfluenceDesc = "Güvenlik politikalarında NATO yanlısı derin klikler ve kontrgerilla yapılarıyla yakın çalıştınız. Ülke, dış güvenlik paktlarının ve gizli istihbarat operasyonlarının yoğunlaştığı, şeffaf olmayan bir güvenlik devleti görünümü kazandı.";
        } else if (highestFaction === "sebataycilar") {
            factionInfluenceDesc = "Geleneksel seküler medya ve kültür elitlerinin desteğini arkaladınız. Kültür, sanat ve medya dünyasındaki Batıcı elitist aile ağları devlet tarafından desteklendi ve bu gruplar toplumsal hegemonyalarını pekiştirdi.";
        }
    } else {
        factionInfluenceDesc = "Hiçbir gücün devlete tamamen egemen olmasına izin vermeyerek tüm klikleri birbirine karşı dengelediniz. Bu durum sizi korusa da bürokraside sürekli bir soğuk savaş ortamına sebep oldu.";
    }
    
    // --- 4. Strategic Choices Summary ---
    let choicesText = "";
    const dec = state.decisions || {};
    
    if (dec['peace_opening_start'] === 0) {
        if (dec['peace_opening_c0_part3_echo'] === 0 || dec['peace_opening_c1_part3_echo'] === 0) {
            choicesText += `<p><strong>Kürt Meselesi:</strong> Kürt sorununu barışçıl ve demokratik müzakerelerle çözerek ülkedeki 40 yıllık çatışma dönemini resmen bitirdiniz. Kürt seçmenlerin desteğiyle tarihi bir barış mimarı olarak anılacaksınız.</p>`;
        } else {
            choicesText += `<p><strong>Kürt Meselesi:</strong> Başlattığınız barış açılımı, milliyetçi cephelerin sert tepkisi ve tarafların uzlaşamaması sonucu fiyaskoyla bitti. Sürecin çöküşü kutuplaşmayı daha da tırmandırdı.</p>`;
        }
    } else if (dec['peace_opening_start'] === 1) {
        choicesText += `<p><strong>Kürt Meselesi:</strong> Çözüm ve barış masası kurmayı en baştan reddedip tamamen askeri ve asayiş tedbirlerine yöneldiniz. Bölgede devlet otoritesini asayişle sağlarken, Kürtlük bilinci ve duygusal kopuş daha da derinleşti.</p>`;
    } else {
        choicesText += `<p><strong>Kürt Meselesi:</strong> Bu hassas konuda statükoyu korumayı tercih ettiniz; büyük adımlardan kaçınarak sorunu zamana bıraktınız.</p>`;
    }
    
    if (dec['mafia_leaks_start'] === 0) {
        choicesText += `<p><strong>Mafya ve Temiz Toplum:</strong> Yeraltı dünyasının ifşaat videoları karşısında taviz vermediniz. Yargı/polisi çetelerin üzerine sürerek devlet içindeki illegal yapıları temizlediniz ve temiz toplum yolunda dev bir adım attınız.</p>`;
    } else if (dec['mafia_leaks_start'] === 1) {
        choicesText += `<p><strong>Mafya ve Temiz Toplum:</strong> Yeraltı dünyasıyla kapalı kapılar ardında uzlaşı arayarak krizleri yatıştırmaya çalıştınız. Skandalların üzeri kapatıldı ancak devletin meşruiyeti mafya vesayeti altında ciddi yara aldı.</p>`;
    } else {
        choicesText += `<p><strong>Mafya ve Temiz Toplum:</strong> İddiaları görmezden gelerek geçiştirdiniz. Organize suç örgütleri faaliyetlerine sessizce devam etti.</p>`;
    }
    
    if (dec['cemaat_infiltration_start'] === 0) {
        choicesText += `<p><strong>Bürokraside Cemaatler:</strong> Emniyet ve yargıdaki dini kliklere karşı geniş çaplı tasfiye operasyonu yürüttünüz. Devlet kadrolarında liyakati getirmeye çalışırken, muhafazakar cemaat tabanını tamamen karşınıza aldınız.</p>`;
    } else if (dec['cemaat_infiltration_start'] === 1) {
        choicesText += `<p><strong>Bürokraside Cemaatler:</strong> Dini cemaatlerle ittifakı derinleştirerek bürokratik kadroları onlara teslim ettiniz. Eğitim ve yargıda tarikat vesayeti pekişirken, seküler kesim kamudan tamamen dışlandı.</p>`;
    } else {
        choicesText += `<p><strong>Bürokraside Cemaatler:</strong> Cemaat kadrolaşmasına göz yumarak güç dengelerini korudunuz; devlet dairelerinde sessizce kök salmalarına izin verdiniz.</p>`;
    }
    
    if (dec['finance_credit_squeeze_start'] === 0) {
        choicesText += `<p><strong>IMF ve Dış Finans:</strong> Uluslararası Para Fonu (IMF) ile stand-by anlaşması imzalayarak kemer sıkma politikalarını uyguladınız. Enflasyon düşürüldü ancak dar gelirli kesimler çok ağır bir fatura ödedi.</p>`;
    } else if (dec['finance_credit_squeeze_start'] === 1) {
        choicesText += `<p><strong>IMF ve Dış Finans:</strong> IMF programını reddedip sermaye kontrollerine geçtiniz ve korumacı bir model denediniz. Finans sektörü darbe yedi fakat ulusal egemenlik yabancı denetimine açılmadı.</p>`;
    } else {
        choicesText += `<p><strong>IMF ve Dış Finans:</strong> Borç krizini günübirlik dış borçlarla ertelemeyi tercih ettiniz, köklü bir reform yapmadınız.</p>`;
    }
    
    if (dec['national_car_project_start'] === 0) {
        choicesText += `<p><strong>Milli Teknoloji Projesi:</strong> Yerli elektrikli otomobil projesini kamu kaynaklarıyla kurtararak yollara çıkardınız. Sanayide önemli bir prestij unsuru kazanılırken hükümetiniz bunu büyük bir propaganda başarısı olarak kullandı.</p>`;
    } else if (dec['national_car_project_start'] === 1) {
        choicesText += `<p><strong>Milli Teknoloji Projesi:</strong> Fabrikayı yabancı bir konsorsiyuma satarak kamu bütçesini rahatlattınız ancak milli marka hedefini küresel sermayeye feda ettiniz.</p>`;
    } else {
        choicesText += `<p><strong>Milli Teknoloji Projesi:</strong> Projede risk almayarak özel sektörün insiyatifine bıraktınız.</p>`;
    }

    // --- 5. Generate Layout and Render Report Card (Yönetim Karnesi) ---
    let mainTitle = "MİLLİ MİRAS RAPORU (2036-2040)";
    let resultBanner = "";
    
    const finalPolVal = state.history.playerPoll && state.history.playerPoll.length > 0 ? state.history.playerPoll[state.history.playerPoll.length - 1] : calculatePollingSupport();
    
    if (endingType === "completed") {
        mainTitle = "SİMÜLASYON BAŞARIYLA TAMAMLANDI";
        resultBanner = `<div style="background: rgba(194, 160, 93, 0.15); border: 1px solid var(--color-gold); padding: 14px; border-radius: 6px; margin-bottom: 12px; color: var(--color-gold-text); font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px; text-shadow: 0 0 10px rgba(194, 160, 93, 0.3);">
            TEBRİKLER: 16 ÇEYREKLİK HÜKÜMET GÖREV SÜRENİZİ BAŞARIYLA TAMAMLADINIZ
        </div>`;
    } else if (endingType === "victory") {
        mainTitle = "DEMOKRATİK SEÇİM ZAFERİ";
        resultBanner = `<div style="background: rgba(46, 204, 113, 0.15); border: 1px solid #2ecc71; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #2ecc71; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            SEÇİM ZAFERİ: %${finalPolVal}% OY İLE TEK BAŞINA İKTİDAR
        </div>`;
    } else if (endingType === "coalition") {
        mainTitle = "KOALİSYON HÜKÜMETİ DÖNEMİ";
        const partnerName = coalitionPartner ? coalitionPartner.name : "Ortak Siyasi Parti";
        resultBanner = `<div style="background: rgba(241, 196, 15, 0.15); border: 1px solid #f1c40f; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #f1c40f; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            KOALİSYON KURULDU: ${partnerName.toUpperCase()} İLE ORTAKLIK
        </div>`;
    } else if (endingType === "defeat") {
        mainTitle = "DEMOKRATİK DEVİR & MUHALEFET";
        resultBanner = `<div style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #e74c3c; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            SEÇİM MAĞLUBİYETİ: İKTİDAR MUHALEFETE DEVREDİLDİ
        </div>`;
    } else if (endingType === "stability_collapse") {
        mainTitle = "MİLLİ KAOS & TOPLUMSAL ÇÖKÜŞ";
        resultBanner = `<div style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #e74c3c; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            İSTİKRAR ÇÖKÜŞÜ: HÜKÜMET OTORİTESİ TAMAMEN DAĞILDI
        </div>`;
    } else if (endingType === "coup_success") {
        mainTitle = "ASKERİ MÜDAHALE & SIKIYÖNETİM";
        resultBanner = `<div style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #e74c3c; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            ASKERİ DARBE: GENELKURMAY YÖNETİME EL KOYDU
        </div>`;
    } else if (endingType === "bankruptcy") {
        mainTitle = "DEVLET İFLASI VE BORÇ TEMERRÜDÜ";
        resultBanner = `<div style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; padding: 14px; border-radius: 6px; margin-bottom: 12px; color: #e74c3c; font-weight: bold; text-align: center; font-family: var(--font-header); letter-spacing: 1px;">
            HAZİNE TEMERRÜDÜ: KAMU BORÇ KRİZİ VE İFLAS
        </div>`;
    }

    doc("ending-title").textContent = mainTitle;
    doc("ending-meta-election").textContent = `SEÇİM ÇEVRİMİ #${state.electionCount} | DÖNEM SONU`;

    bodyContent.innerHTML = `
        ${resultBanner}
        
        <!-- YÖNETİM KARNESİ PANELİ -->
        <div style="background: rgba(194, 160, 93, 0.08); border: 1px solid rgba(194, 160, 93, 0.35); padding: 16px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="font-family: var(--font-header); font-size: 0.95rem; color: var(--color-gold-text); margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px;">
                <span>📋</span> HÜKÜMET YÖNETİM KARNESİ (PERFORMANS RAPORU)
            </h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Row 1: Ekonomi -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 4px;">
                    <span style="color: rgba(255,255,255,0.85); font-weight: 500;">Ekonomi ve Hazine Yönetimi</span>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: var(--text-muted); font-size: 0.75rem;">(Skor: %${Math.round(economyVal)})</span>
                        <strong style="background: ${econGrade.color}; color: #fff; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.85rem; width: 14px; display: inline-block; text-align: center;">${econGrade.letter}</strong>
                    </div>
                </div>
                <!-- Row 2: İstikrar -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 4px;">
                    <span style="color: rgba(255,255,255,0.85); font-weight: 500;">Kamu Düzeni ve İstikrar</span>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: var(--text-muted); font-size: 0.75rem;">(Skor: %${Math.round(stabilityVal)})</span>
                        <strong style="background: ${stabGrade.color}; color: #fff; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.85rem; width: 14px; display: inline-block; text-align: center;">${stabGrade.letter}</strong>
                    </div>
                </div>
                <!-- Row 3: Demokrasi -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 4px;">
                    <span style="color: rgba(255,255,255,0.85); font-weight: 500;">Demokrasi ve Özgürlükler</span>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: var(--text-muted); font-size: 0.75rem;">(Skor: %${Math.round(freedomVal)})</span>
                        <strong style="background: ${freeGrade.color}; color: #fff; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.85rem; width: 14px; display: inline-block; text-align: center;">${freeGrade.letter}</strong>
                    </div>
                </div>
                <!-- Row 4: Güvenlik -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 4px;">
                    <span style="color: rgba(255,255,255,0.85); font-weight: 500;">Milli Güvenlik ve Ordu İttifakı</span>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: var(--text-muted); font-size: 0.75rem;">(Skor: %${Math.round(securityVal)})</span>
                        <strong style="background: ${secGrade.color}; color: #fff; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.85rem; width: 14px; display: inline-block; text-align: center;">${secGrade.letter}</strong>
                    </div>
                </div>
                <!-- Row 5: Halk Onayı -->
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 4px;">
                    <span style="color: rgba(255,255,255,0.85); font-weight: 500;">Halk Desteği ve Popülarite</span>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: var(--text-muted); font-size: 0.75rem;">(Skor: %${Math.round(pollingSupportVal)})</span>
                        <strong style="background: ${pollGrade.color}; color: #fff; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 0.85rem; width: 14px; display: inline-block; text-align: center;">${pollGrade.letter}</strong>
                    </div>
                </div>
            </div>
        </div>

        <!-- 5 FARKLI NİHAİ FİNAL PANELİ -->
        <div style="background: rgba(255,255,255,0.02); border: 2px solid ${finalBadgeColor}; padding: 18px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; box-shadow: inset 0 0 20px rgba(0,0,0,0.4);">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.8rem;">${finalIcon}</span>
                <div>
                    <h3 style="font-family: var(--font-header); font-size: 0.95rem; color: #fff; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">ORTAYA ÇIKAN ULUSAL NİHAİ FİNAL</h3>
                    <h4 style="font-size: 0.85rem; color: ${finalBadgeColor}; margin: 2px 0 0 0; font-weight: 800; font-family: var(--font-header);">${finalTitle}</h4>
                </div>
            </div>
            <p style="margin: 6px 0 0 0; color: var(--text-secondary); font-size: 0.8rem; line-height: 1.6; text-align: justify;">${finalDesc}</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 6px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
            <h3 style="font-family: var(--font-header); font-size: 0.85rem; color: var(--color-gold-text); margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">GÜÇ KLİKLERİ VE VESAYETÇİ YAPILARIN NÜFUZU</h3>
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.78rem; line-height: 1.5;">${factionInfluenceDesc}</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 6px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
            <h3 style="font-family: var(--font-header); font-size: 0.85rem; color: var(--color-gold-text); margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">TARİHİ KARARLARIN MİLLİ YANKISI</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary); font-size: 0.78rem; line-height: 1.55;">
                ${choicesText || "<p>Döneminiz boyunca ülke kaderini etkileyecek büyük kararlar almaktan kaçındınız veya zincirleme olaylar henüz sonuçlanmadı.</p>"}
            </div>
        </div>
    `;

    // Reset action footer buttons in modal-ending - remove second term buttons for full completion
    const endingFooter = doc("btn-restart-ending").parentNode;
    endingFooter.innerHTML = "";
    
    // Celebratory Restart button
    const restartBtn = document.createElement("button");
    restartBtn.className = "btn-primary";
    restartBtn.style.borderColor = "var(--color-gold)";
    restartBtn.style.background = "linear-gradient(135deg, var(--color-teal) 0%, #175461 100%)";
    restartBtn.style.color = "#ffffff";
    restartBtn.style.padding = "12px 32px";
    restartBtn.style.fontWeight = "800";
    restartBtn.style.fontSize = "0.9rem";
    restartBtn.style.letterSpacing = "1px";
    restartBtn.style.cursor = "pointer";
    restartBtn.style.borderRadius = "4px";
    restartBtn.style.boxShadow = "0 0 20px rgba(34, 111, 128, 0.4)";
    restartBtn.textContent = "SİMÜLASYONU YENİDEN BAŞLAT";
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
    endingFooter.appendChild(restartBtn);
    
    doc("modal-ending").classList.remove("hidden");
    if (typeof playUiSound === "function") playUiSound("fanfare");
}

function triggerGameOver(reason) {
    state.isGameOver = true;
    
    // Play dramatic sound
    if (typeof playUiSound === "function") {
        if (reason === "coup_success" || reason === "nato_coup" || reason === "shanghai_coup") {
            playUiSound("coup_siren");
        } else {
            playUiSound("crisis");
        }
    }

    // Add dramatic full-screen overlays & immediate shake
    document.body.classList.add("red-alert-active", "screen-shake");
    setTimeout(() => {
        document.body.classList.remove("screen-shake");
    }, 750);

    let title = "";
    let subtitle = "";
    let tag = "";
    let desc = "";
    let svgHtml = "";
    
    if (reason === "stability_collapse") {
        title = "MİLLİ ÇÖKÜŞ VE KAOS";
        subtitle = "HÜKÜMET OTORİTESİ SIFIRLANDI";
        tag = "KRİTİK SEVİYE / YÖNETİM ÇÖKTÜ";
        desc = "Ulusal istikrarınız %0'a ulaştı. Sokaklardaki kaos, protestolar ve hükümet kontrolünün tamamen kaybolması nedeniyle yönetiminiz sona erdi. Simülasyon yapısal çöküşle tamamlandı.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <g transform="translate(62, 50) scale(1.5)">
                        <path d="M 12,5 C 2,5 2,22 12,22 C 22,22 22,5 12,5 Z" class="skull-path" />
                        <path d="M 8,22 L 16,22 L 18,28 L 6,28 Z" class="skull-path" />
                        <circle cx="9" cy="11" r="2.5" fill="var(--neon-red)" />
                        <circle cx="15" cy="11" r="2.5" fill="var(--neon-red)" />
                        <path d="M 11,16 L 13,16" class="skull-path" />
                        <line x1="1" y1="3" x2="23" y2="29" class="skull-path" stroke-dasharray="2 2" />
                        <line x1="23" y1="3" x2="1" y2="29" class="skull-path" stroke-dasharray="2 2" />
                    </g>
                    <text x="100" y="180" text-anchor="middle" class="radar-text">SİSTEM ÇÖKÜŞÜ</text>
                </svg>
            </div>
        `;
    } else if (reason === "coup_success") {
        title = "ASKERİ DARBE";
        subtitle = "TSK YÖNETİME EL KOYDU";
        tag = "KIRMIZI ALARM / SIKIYÖNETİM";
        desc = "Ordu içindeki cuntacı kuvvetler tankları sokağa indirip saray ve TRT'yi ele geçirdi, anayasayı askıya aldı ve yönetimi devraldı. Siyasi kariyeriniz askeri cunta yönetimiyle son buldu.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <circle cx="100" cy="100" r="60" class="radar-grid" />
                    <circle cx="100" cy="100" r="30" class="radar-grid" />
                    <line x1="10" y1="100" x2="190" y2="100" class="radar-crosshair" />
                    <line x1="100" y1="10" x2="100" y2="190" class="radar-crosshair" />
                    <g transform="translate(68, 72) scale(1.3)">
                        <path d="M 5,20 L 45,20 L 45,30 L 5,30 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <path d="M 12,12 L 38,12 L 35,20 L 15,20 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <rect x="23" y="5" width="4" height="10" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <line x1="8" y1="33" x2="42" y2="33" stroke="var(--neon-red)" stroke-width="3" stroke-dasharray="2 2" />
                    </g>
                    <rect x="52" y="52" width="96" height="96" fill="none" stroke="var(--neon-red)" stroke-width="1.5" stroke-dasharray="6 6" class="target-lock-box" />
                    <text x="100" y="180" text-anchor="middle" class="radar-text">MILITARY CUNTA // ACTIVE</text>
                    <line x1="100" y1="100" x2="100" y2="10" class="radar-sweep-line" />
                </svg>
            </div>
        `;
    } else if (reason === "nato_coup") {
        title = "NATO TASFİYE DARBESİ";
        subtitle = "ATLANTİKÇİ ASKERİ VESAYET MÜDAHALESİ";
        tag = "KIRMIZI PROTOKOL / ASKERİ DARBE";
        desc = "NATO'dan tamamen çekilme ve üsleri kapatma kararınızın ardından, ordu içindeki Atlantikçi subaylar, Gladio hücreleri ve Batı yanlısı güvenlik klikleri tankları sokağa indirdi. Hükümetiniz 'milli güvenlik tehdidi' gerekçesiyle askeri cunta tarafından devrildi.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <circle cx="100" cy="100" r="60" class="radar-grid" />
                    <circle cx="100" cy="100" r="30" class="radar-grid" />
                    <line x1="10" y1="100" x2="190" y2="100" class="radar-crosshair" />
                    <line x1="100" y1="10" x2="100" y2="190" class="radar-crosshair" />
                    <g transform="translate(68, 72) scale(1.3)">
                        <path d="M 5,20 L 45,20 L 45,30 L 5,30 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <path d="M 12,12 L 38,12 L 35,20 L 15,20 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <rect x="23" y="5" width="4" height="10" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <line x1="8" y1="33" x2="42" y2="33" stroke="var(--neon-red)" stroke-width="3" stroke-dasharray="2 2" />
                    </g>
                    <rect x="52" y="52" width="96" height="96" fill="none" stroke="var(--neon-red)" stroke-width="1.5" stroke-dasharray="6 6" class="target-lock-box" />
                    <text x="100" y="180" text-anchor="middle" class="radar-text">GLADIO OPERATION // ACTIVE</text>
                    <line x1="100" y1="100" x2="100" y2="10" class="radar-sweep-line" />
                </svg>
            </div>
        `;
    } else if (reason === "shanghai_coup") {
        title = "AVRASYA KARŞITI CUNTA DEVRİMİ";
        subtitle = "ŞANGHAY EKSENİNE REAKSİYONER DARBE";
        tag = "KIRMIZI PROTOKOL / ASKERİ CUNTA";
        desc = "Şanghay İşbirliği Örgütü'ne tam üyelik ve Avrasya askeri blokuna geçiş kararınız, Kemalist ordu kademelerinde ve Batı yanlısı bürokraside kırmızı alarm verdi. 'Cumhuriyetin kurucu dış politika ilkelerinden sapıldığı ve ülkenin ekseninin değiştirildiği' gerekçesiyle TSK yönetime el koydu.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <circle cx="100" cy="100" r="60" class="radar-grid" />
                    <circle cx="100" cy="100" r="30" class="radar-grid" />
                    <line x1="10" y1="100" x2="190" y2="100" class="radar-crosshair" />
                    <line x1="100" y1="10" x2="100" y2="190" class="radar-crosshair" />
                    <g transform="translate(68, 72) scale(1.3)">
                        <path d="M 5,20 L 45,20 L 45,30 L 5,30 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <path d="M 12,12 L 38,12 L 35,20 L 15,20 Z" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <rect x="23" y="5" width="4" height="10" fill="none" stroke="var(--neon-red)" stroke-width="2" />
                        <line x1="8" y1="33" x2="42" y2="33" stroke="var(--neon-red)" stroke-width="3" stroke-dasharray="2 2" />
                    </g>
                    <rect x="52" y="52" width="96" height="96" fill="none" stroke="var(--neon-red)" stroke-width="1.5" stroke-dasharray="6 6" class="target-lock-box" />
                    <text x="100" y="180" text-anchor="middle" class="radar-text">EKSEN KAYMASI // BLOKAJ</text>
                    <line x1="100" y1="100" x2="100" y2="10" class="radar-sweep-line" />
                </svg>
            </div>
        `;
    } else if (reason === "bankruptcy") {
        title = "DEVLET İFLASI";
        subtitle = "BORÇ TEMERRÜDÜ VE ÇÖKÜŞ";
        tag = "AMBER PROTOKOL / FİNANSAL TEMERRÜT";
        desc = "Ulusal hazine borcunuz ₺80 Milyarı aştı. Alacaklı kurumlar tüm kredileri dondurdu ve hiperenflasyon ekonomiyi yuttu. Simülasyon finansal başarısızlıkla sonlandı.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <line x1="20" y1="20" x2="20" y2="170" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                    <line x1="20" y1="170" x2="180" y2="170" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                    <line x1="20" y1="60" x2="180" y2="60" class="chart-grid" />
                    <line x1="20" y1="110" x2="180" y2="110" class="chart-grid" />
                    <line x1="70" y1="20" x2="70" y2="170" class="chart-grid" />
                    <line x1="120" y1="20" x2="120" y2="170" class="chart-grid" />
                    <path d="M 20,40 L 50,60 L 80,120 L 110,90 L 140,155 L 175,168" class="chart-line-path" />
                    <text x="100" y="185" text-anchor="middle" class="radar-text">TEMERRÜT // İFLAS ETKİN</text>
                </svg>
            </div>
        `;
    } else if (reason === "activist_resignation") {
        title = "İSTİFA BASKISI";
        subtitle = "KİTLESEL PROTESTOLAR";
        tag = "GÜVENLİK ALARMI / SOKAK HAREKETLERİ";
        desc = "Sebataycı seçkinler ve liberal kesimlerle ilişkilerinizin tamamen çökmesiyle ülkede devasa protestolar patlak verdi. Milyonlarca insan sokakları doldurarak istifanızı istedi. Görevi bırakmak zorunda kaldınız.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <circle cx="100" cy="100" r="70" class="radar-grid" stroke-dasharray="4 4" />
                    <g transform="translate(68, 62) scale(1.3)" class="unrest-fist">
                        <path d="M 15,45 L 35,45 L 33,28 L 17,28 Z" />
                        <path d="M 12,22 Q 15,18 18,22 Q 21,18 24,22 Q 27,18 30,22 Q 33,18 36,22 L 36,28 L 12,28 Z" />
                        <path d="M 12,28 Q 7,24 10,18 Q 13,16 15,22 Z" />
                    </g>
                    <text x="100" y="180" text-anchor="middle" class="radar-text">SOKAK HAREKETLERİ // PROTESTO</text>
                </svg>
            </div>
        `;
    } else if (reason === "conservative_revolt") {
        title = "DİNDAR İSYANI";
        subtitle = "MUHAFAZAKAR BAŞKALDIRI";
        tag = "ASAYİŞ TEHLİKESİ / TAŞRA İSYANI";
        desc = "Muhafazakar seçmenler ve cemaatlerin desteğini tamamen kaybettiniz. Taşra genelinde and dindar semtlerde geniş çaplı huzursuzluklar başladı. Hükümetiniz inanç karşıtı olmakla suçlanınca iktidarı devretmek zorunda kaldınız.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <g transform="translate(50, 45) scale(1.2)">
                        <path d="M 50,15 A 35,35 0 1,0 85,50 A 28,28 0 1,1 50,15 Z" class="crescent-path" />
                        <path d="M 46,30 L 46,55" stroke="var(--neon-red)" stroke-width="4" stroke-linecap="round" />
                        <circle cx="46" cy="65" r="3" fill="var(--neon-red)" />
                    </g>
                    <text x="100" y="180" text-anchor="middle" class="radar-text">MUHAFAZAKAR İSYAN</text>
                </svg>
            </div>
        `;
    } else if (reason === "secular_takeover") {
        title = "VESAYET MUHTIRASI";
        subtitle = "SEKÜLER VESAYET KUMPASI";
        tag = "ANAYASAL KRİZ / VESAYET MÜDAHALESİ";
        desc = "Kemalist bürokrasi ve seküler seçmenlerin onayını kaybettiniz. Yargı, akademi ve sivil toplum kuruluşları hükümeti anayasal suç işlemekle suçlayarak topyekun boykot başlattı. Laik rejimin savunucuları sizi görevden uzaklaştırdı.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <path d="M 100,20 L 165,48 L 165,115 C 165,155 100,180 100,180 C 100,180 35,155 35,115 L 35,48 Z" class="shield-path" />
                    <g transform="translate(62, 52) scale(1.5)">
                        <line x1="10" y1="22" x2="40" y2="22" class="gavel-path" />
                        <line x1="25" y1="12" x2="25" y2="44" class="gavel-path" />
                        <line x1="15" y1="44" x2="35" y2="44" class="gavel-path" />
                        <line x1="10" y1="22" x2="5" y2="34" class="scales-path" />
                        <line x1="10" y1="22" x2="15" y2="34" class="scales-path" />
                        <path d="M 3,34 Q 10,38 17,34" fill="none" stroke="#ff6b6b" stroke-width="1.5" />
                        <line x1="40" y1="22" x2="35" y2="34" class="scales-path" />
                        <line x1="40" y1="22" x2="45" y2="34" class="scales-path" />
                        <path d="M 33,34 Q 40,38 47,34" fill="none" stroke="#ff6b6b" stroke-width="1.5" />
                    </g>
                    <text x="100" y="180" text-anchor="middle" class="radar-text">VESAYET MÜDAHALESİ</text>
                </svg>
            </div>
        `;
    } else {
        title = "YÖNETİM KAYBI";
        subtitle = "SIMULASYON SONU";
        tag = "SİSTEM DIŞI ÇÖKÜŞ";
        desc = "Hükümetiniz beklenmedik bir kriz sonucu son buldu. Politik ve kurumsal dengeler sürdürülemez hale geldi.";
        svgHtml = `
            <div class="coup-visual-container">
                <svg viewBox="0 0 200 200" class="coup-svg-icon">
                    <circle cx="100" cy="100" r="90" class="radar-grid" />
                    <g transform="translate(62, 50) scale(1.5)">
                        <path d="M 12,5 C 2,5 2,22 12,22 C 22,22 22,5 12,5 Z" class="skull-path" />
                        <path d="M 8,22 L 16,22 L 18,28 L 6,28 Z" class="skull-path" />
                        <circle cx="9" cy="11" r="2.5" fill="var(--neon-red)" />
                        <circle cx="15" cy="11" r="2.5" fill="var(--neon-red)" />
                        <path d="M 11,16 L 13,16" class="skull-path" />
                        <line x1="1" y1="3" x2="23" y2="29" class="skull-path" stroke-dasharray="2 2" />
                        <line x1="23" y1="3" x2="1" y2="29" class="skull-path" stroke-dasharray="2 2" />
                    </g>
                    <text x="100" y="180" text-anchor="middle" class="radar-text">SİSTEM ÇÖKÜŞÜ</text>
                </svg>
            </div>
        `;
    }

    const modalContent = doc("modal-election").querySelector(".modal-content");
    modalContent.className = "modal-content coup-alert-modal";
    
    modalContent.innerHTML = `
        <div class="coup-siren-light"></div>
        <div class="coup-header">
            <div class="coup-warning-tag">${tag}</div>
            <h1 class="coup-title">${title}</h1>
            <div class="coup-subtitle">${subtitle}</div>
        </div>
        <div class="coup-body">
            ${svgHtml}
            <div class="coup-report">
                <div class="report-header">DEŞİFRE EDİLEN RAPOR // SİSTEM ÇÖKÜŞÜ</div>
                <div class="report-text">${desc}</div>
                <div class="report-stats">
                     <div class="report-stat-item">
                         <span>İstikrar Otoritesi:</span>
                         <div class="stat-bar"><div class="stat-bar-fill red" style="width: ${state.stability}%"></div></div>
                         <span>%${state.stability}</span>
                     </div>
                     <div class="report-stat-item">
                         <span>Kamu Onayı:</span>
                         <div class="stat-bar"><div class="stat-bar-fill" style="width: ${calculatePollingSupport()}%"></div></div>
                         <span>%${calculatePollingSupport()}</span>
                     </div>
                     <div class="report-stat-item">
                         <span>Ordu Onayı:</span>
                         <div class="stat-bar"><div class="stat-bar-fill" style="width: ${state.powerCenters ? state.powerCenters.military.approval : 0}%"></div></div>
                         <span>%${state.powerCenters ? state.powerCenters.military.approval : 0}</span>
                     </div>
                </div>
            </div>
        </div>
        <div class="coup-footer" id="election-footer-actions"></div>
    `;

    const footer = doc("election-footer-actions");

    const restartBtn = document.createElement("button");
    restartBtn.className = "btn-primary btn-next-turn";
    restartBtn.textContent = "Tarihi Mirası ve Sonu Gör";
    restartBtn.addEventListener("click", () => {
        document.body.classList.remove("red-alert-active", "screen-shake");
        showEndingScreen(reason);
    });
    footer.appendChild(restartBtn);

    if (state.emergencyContinues < 2) {
        const ohalBtn = document.createElement("button");
        ohalBtn.className = "btn-primary";
        ohalBtn.style.background = "var(--color-danger)";
        ohalBtn.style.borderColor = "var(--color-danger)";
        ohalBtn.style.color = "white";
        ohalBtn.style.marginLeft = "10px";
        ohalBtn.textContent = `Olağanüstü Hal İlan Et (Bir Çeyrek Daha) [Hak: ${2 - state.emergencyContinues}]`;
        ohalBtn.addEventListener("click", () => {
            state.emergencyContinues += 1;
            state.isGameOver = false;
            state.politicalCapital = 0;
            state.systems.freedom = Math.max(5, state.systems.freedom - 15);
            state.maxTurns += 1;
            state.isElectionStarted = false;

            if (reason === "stability_collapse") {
                state.stability = 15;
                state.logs.push(`OLAĞANÜSTÜ KARARNAME: Hükümet OHAL ilan ederek meclisi askıya aldı ve istikrarı zorla sağladı (+15 İstikrar, -15% Özgürlük).`);
            } else if (reason === "coup_success") {
                state.powerCenters.military.plotProgress = 30;
                state.powerCenters.military.anger = 30;
                state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 10);
                state.stability = 45; // Stabilize to safe zone
                state.logs.push(`SIKIYÖNETİM: Hükümet sıkıyönetim ilan ederek ordu içindeki darbecileri tasfiye etti. Seçimler ertelendi.`);
            } else if (reason === "bankruptcy") {
                state.treasury = -70000000000; // -₺70 Billion
                state.stability = Math.max(10, state.stability - 10);
                state.logs.push(`IMF/KREDİ YAPILANDIRMASI: Dış borçlar ertelendi, hazineye acil finansal enjeksiyon yapıldı.`);
            } else if (reason === "activist_resignation") {
                state.regimeWatch.sebataycilar.favor = 45;
                state.voterGroups.liberals.approval = 45;
                state.logs.push("SANSÜR VE YASAKLAR: Hükümet internet yasakları ve sert basın denetimiyle aktivist kitlelerin iletişim ağlarını çökertti ve sokağı bastırdı.");
            } else if (reason === "conservative_revolt") {
                state.voterGroups.conservatives.approval = 45;
                state.regimeWatch.cemaatler.favor = 45;
                state.logs.push("KABİNE UZLAŞISI: Hükümet cemaat liderleriyle kapalı kapılar ardında yeni imtiyaz anlaşmaları imzaladı ve isyanı dindirdi.");
            } else if (reason === "secular_takeover") {
                state.regimeWatch.kemalist_burokrasi.favor = 45;
                state.voterGroups.secular.approval = 45;
                state.logs.push("TASFİYE KARARNAMESİ: Hükümet cumhuriyet kurumlarına yönelik büyük tasfiye ve kendi kadrolarını yerleştirme operasyonu başlatarak direnci kırdı.");
            }

            // Remove red-alert class and screen shake from body
            document.body.classList.remove("red-alert-active", "screen-shake");

            // Restore modal-content class and HTML back to default so that normal elections work correctly if they reload/continue
            modalContent.className = "modal-content election-results-modal";
            modalContent.innerHTML = `
                <h1 class="glow-title" id="election-title">SEÇİM GECESİ BÜLTENİ</h1>
                <div class="modal-body">
                    <div class="election-columns">
                        <!-- Left: Region results list -->
                        <div class="election-regions-results">
                            <h3>Bölgesel Sandık Sonuçları & Katılım</h3>
                            <div class="regions-list-results" id="election-regions-list">
                                <!-- Populated in ui.js -->
                            </div>
                        </div>
                        
                        <!-- Right: National final tallies -->
                        <div class="election-national-tallies">
                            <h3>Genel Ulusal Oy Dağılımı</h3>
                            <div class="chart-box">
                                <div class="final-vote-circle">
                                    <span class="percentage" id="election-final-pct">42%</span>
                                    <span class="label">TOPLAM OY</span>
                                </div>
                            </div>
                            <div class="tally-details" id="election-tally-details">
                                <!-- Coalition options or win/lose screens -->
                            </div>
                            
                            <!-- Parliamentary Seat Distribution -->
                            <div id="parliament-seats-container" class="hidden" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
                                <h4 style="font-family:var(--font-header); font-size:0.75rem; text-transform:uppercase; margin-bottom:6px; color:var(--text-secondary); letter-spacing: 0.5px;">TBMM Milletvekili Dağılımı (Seats)</h4>
                                <div class="parliament-seat-bar" style="display:flex; height:12px; border-radius:6px; overflow:hidden; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.03);">
                                    <div id="seats-player-bar" style="background:var(--accent-navy); width:50%; transition:width 0.5s;"></div>
                                    <div id="seats-opp-bar" style="background:var(--accent-red); width:50%; transition:width 0.5s;"></div>
                                </div>
                                <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:var(--text-muted); margin-top:6px; font-family:var(--font-header); font-weight:600; letter-spacing:0.3px;">
                                    <span>İktidar: <strong id="seats-player-count" style="color:var(--color-navy-text); font-size:0.75rem;">300</strong> MV</span>
                                    <span>Muhalefet: <strong id="seats-opp-count" style="color:var(--color-red-text); font-size:0.75rem;">300</strong> MV</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="election-footer-actions" id="election-footer-actions">
                        <!-- Button to proceed to coalition or end game -->
                    </div>
                </div>
            `;

            doc("modal-election").classList.add("hidden");
            
            setTimeout(() => {
                updateDashboard();
                updateMap();
                renderVoterGroups();
                updateNewsTicker();
            }, 50);
        });
        footer.appendChild(ohalBtn);
    }

    doc("modal-election").classList.remove("hidden");
}

function logMessage(text) {
    const timestamp = getQuarterString(state.turn);
    const message = `[${timestamp}] ${text}`;
    state.logs.push(message);
    
    // Maintain max logs size
    if (state.logs.length > 50) state.logs.shift();
}

window.showRegionDetail = function(region, city = null) {
    const card = document.getElementById("region-detail-card");
    if (!card) return;

    // Play click sound
    playUiSound("click");

    // Remove hidden class
    card.classList.remove("hidden");

    // Populate title
    const nameEl = document.getElementById("region-detail-name");
    if (nameEl) {
        nameEl.textContent = city ? `${city.name.toUpperCase()} (${region.name.toUpperCase()})` : region.name.toUpperCase();
    }

    // Populate population
    const sizeEl = document.getElementById("region-detail-size");
    if (sizeEl) {
        if (city) {
            const cityPops = {
                "34": "16.1 Milyon (%19.1)",
                "06": "5.8 Milyon (%6.9)",
                "35": "4.5 Milyon (%5.3)",
                "16": "3.2 Milyon (%3.8)",
                "07": "2.7 Milyon (%3.2)",
                "42": "2.3 Milyon (%2.7)",
                "01": "2.2 Milyon (%2.6)",
                "41": "2.1 Milyon (%2.5)",
                "09": "1.2 Milyon (%1.4)",
                "20": "1.0 Milyon (%1.2)",
                "21": "1.8 Milyon (%2.1)",
                "27": "2.1 Milyon (%2.5)",
                "31": "1.7 Milyon (%2.0)",
                "46": "1.2 Milyon (%1.4)",
                "55": "1.4 Milyon (%1.6)",
                "61": "0.8 Milyon (%1.0)"
            };
            const code = city.plate;
            const pop = cityPops[code] || `${Math.round(((parseInt(code) * 17) % 700) + 150)} Bin`;
            sizeEl.textContent = pop;
        } else {
            const regionPops = {
                marmara: "25.8 Milyon (%30.5)",
                aegean: "10.8 Milyon (%12.8)",
                mediterranean: "10.7 Milyon (%12.7)",
                central_anatolia: "12.9 Milyon (%15.3)",
                black_sea: "7.7 Milyon (%9.1)",
                eastern_anatolia: "6.0 Milyon (%7.1)",
                southeastern_anatolia: "9.3 Milyon (%11.0)"
            };
            sizeEl.textContent = regionPops[region.id] || "%10.0";
        }
    }

    // Populate Support
    const localSupportOffset = city ? Math.round(((city.id * 7) % 9) - 4) : 0;
    const support = Math.max(0, Math.min(100, calculateRegionSupport(region, state) + localSupportOffset));
    const supportValEl = document.getElementById("region-detail-support");
    const supportBarEl = document.getElementById("region-detail-support-bar");
    if (supportValEl) supportValEl.textContent = `%${support}`;
    if (supportBarEl) {
        supportBarEl.style.width = `${support}%`;
        supportBarEl.className = "progress-bar-premium " + (support < 40 ? "bar-bad" : (support < 65 ? "bar-medium" : "bar-good"));
    }

    // Populate Happiness
    const localHappinessOffset = city ? Math.round(((city.id * 13) % 9) - 4) : 0;
    const happiness = Math.max(0, Math.min(100, calculateRegionHappiness(region, state) + localHappinessOffset));
    const happinessValEl = document.getElementById("region-detail-happiness");
    const happinessBarEl = document.getElementById("region-detail-happiness-bar");
    if (happinessValEl) happinessValEl.textContent = `%${happiness}`;
    if (happinessBarEl) {
        happinessBarEl.style.width = `${happiness}%`;
        happinessBarEl.className = "progress-bar-premium " + (happiness < 40 ? "bar-bad" : (happiness < 65 ? "bar-medium" : "bar-good"));
    }

    // Populate indices
    const econOffset = region.id === "marmara" ? 15 : (region.id === "eastern_anatolia" ? -12 : 0);
    const econ = Math.max(0, Math.min(100, state.systems.economy + econOffset + localSupportOffset));
    const econEl = document.getElementById("region-detail-econ");
    if (econEl) econEl.textContent = `%${econ}`;

    const unempOffset = region.id === "southeastern_anatolia" ? 18 : (region.id === "marmara" ? -10 : 0);
    const unemp = Math.max(0, Math.min(100, state.systems.unemployment + unempOffset + localSupportOffset));
    const unempEl = document.getElementById("region-detail-unemp");
    if (unempEl) unempEl.textContent = `%${unemp}`;

    const secOffset = region.id === "eastern_anatolia" ? -15 : (region.id === "central_anatolia" ? 8 : 0);
    const sec = Math.max(0, Math.min(100, state.systems.security + secOffset + localSupportOffset));
    const secEl = document.getElementById("region-detail-security");
    if (secEl) secEl.textContent = `%${sec}`;

    // Update Status Badges
    const econBadgeEl = document.getElementById("badge-econ");
    if (econBadgeEl) {
        if (econ >= 65) {
            econBadgeEl.className = "status-badge badge-success";
            econBadgeEl.textContent = "GÜÇLÜ";
        } else if (econ >= 35) {
            econBadgeEl.className = "status-badge badge-warning";
            econBadgeEl.textContent = "DENGELİ";
        } else {
            econBadgeEl.className = "status-badge badge-danger";
            econBadgeEl.textContent = "BUNALIM";
        }
    }

    const unempBadgeEl = document.getElementById("badge-unemp");
    if (unempBadgeEl) {
        if (unemp < 10) {
            unempBadgeEl.className = "status-badge badge-success";
            unempBadgeEl.textContent = "DÜŞÜK";
        } else if (unemp < 18) {
            unempBadgeEl.className = "status-badge badge-warning";
            unempBadgeEl.textContent = "YÜKSEK";
        } else {
            unempBadgeEl.className = "status-badge badge-danger";
            unempBadgeEl.textContent = "KRİTİK";
        }
    }

    const secBadgeEl = document.getElementById("badge-security");
    if (secBadgeEl) {
        if (sec >= 70) {
            secBadgeEl.className = "status-badge badge-success";
            secBadgeEl.textContent = "GÜVENLİ";
        } else if (sec >= 40) {
            secBadgeEl.className = "status-badge badge-warning";
            secBadgeEl.textContent = "ORTA";
        } else {
            secBadgeEl.className = "status-badge badge-danger";
            secBadgeEl.textContent = "KAOS RİSKİ";
        }
    }

    // Populate demographics list (sorted top 4 with color coding)
    const listEl = document.getElementById("region-detail-demographics-list");
    if (listEl) {
        listEl.innerHTML = "";
        const sortedDemographics = Object.entries(region.voterDemographics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);

        const grpNames = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt", immigrants: "Göçmen", business: "İş Dünyası",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç", religious: "Dindar"
        };

        const colors = {
            conservatives: "var(--color-conservative)",
            secular: "var(--color-secular)",
            nationalists: "var(--color-nationalist)",
            leftists: "var(--color-leftist)",
            liberals: "var(--color-liberal)",
            kurds: "var(--color-kurd)",
            religious: "var(--color-religious)",
            business: "var(--color-business)",
            students: "#a55eea",
            retirees: "#fed330",
            workers: "#fa8231",
            farmers: "#20bf6b",
            civil_servants: "#4baffa",
            youth: "#0fbcf9",
            immigrants: "#a5b1c2"
        };

        sortedDemographics.forEach(([grp, ratio]) => {
            const pct = Math.round(ratio * 100);
            const grpName = grpNames[grp] || grp;
            const grpColor = colors[grp] || "var(--text-secondary)";
            
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.fontSize = "0.7rem";
            row.style.gap = "8px";

            row.innerHTML = `
                <span style="color: var(--text-secondary); width: 85px; text-align: left; white-space: nowrap;">${grpName}</span>
                <div class="progress-bar-wrapper-premium" style="flex: 1; height: 6px; background-color: rgba(0,0,0,0.4); margin: 0; padding: 0.5px;">
                    <div class="progress-bar-premium" style="width: ${pct}%; background-color: ${grpColor}; border-radius: 3px; height: 100%; box-shadow: 0 0 5px ${grpColor}40;"></div>
                </div>
                <strong style="width: 30px; text-align: right; color: var(--text-primary); font-family: var(--font-mono); font-size: 0.75rem;">%${pct}</strong>
            `;
            listEl.appendChild(row);
        });
    }

    // Refresh newly added Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Web Audio API Synthesizer for Retro UI Sounds
window.soundEnabled = true;
window.fxVolume = 70;
let audioCtx = null;

export function playUiSound(type) {
    if (!window.soundEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        const volumeMultiplier = (window.fxVolume !== undefined ? window.fxVolume : 70) / 100;
        
        if (type === "hover") {
            // Short subtle high-tech tick - increased volume from 0.012 to 0.04
            osc.type = "sine";
            osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.04 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } else if (type === "click") {
            // Crisp computer confirmation sound
            osc.type = "triangle";
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.setValueAtTime(900, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.03 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.12);
        } else if (type === "boot") {
            // Futuristic system boot chirp
            osc.type = "sine";
            osc.frequency.setValueAtTime(350, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.25);
            gainNode.gain.setValueAtTime(0.04 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.25);
        } else if (type === "fanfare") {
            // Triumphant retro fanfare notes (C4, E4, G4, C5)
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, i) => {
                const o = audioCtx.createOscillator();
                const g = audioCtx.createGain();
                o.type = "sine";
                o.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.15);
                g.gain.setValueAtTime(0.04 * volumeMultiplier, audioCtx.currentTime + i * 0.15);
                g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.15 + 0.35);
                o.connect(g);
                g.connect(audioCtx.destination);
                o.start(audioCtx.currentTime + i * 0.15);
                o.stop(audioCtx.currentTime + i * 0.15 + 0.35);
            });
            // Stop dummy elements
            osc.start();
            osc.stop();
        } else if (type === "crisis") {
            // Alert siren sound
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(300, audioCtx.currentTime + 0.15);
            osc.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.03 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.35);
        } else if (type === "coup_siren") {
            // High-intensity military air-raid siren (sweeping pitch and rumble)
            const duration = 2.4;
            const numWaves = 3;
            for (let w = 0; w < numWaves; w++) {
                const oscSiren = audioCtx.createOscillator();
                const gainSiren = audioCtx.createGain();
                oscSiren.type = "sawtooth";
                oscSiren.connect(gainSiren);
                gainSiren.connect(audioCtx.destination);
                
                const startTime = audioCtx.currentTime + w * 0.8;
                const endTime = startTime + 0.8;
                
                oscSiren.frequency.setValueAtTime(220, startTime);
                oscSiren.frequency.linearRampToValueAtTime(550, startTime + 0.4);
                oscSiren.frequency.linearRampToValueAtTime(220, endTime);
                
                gainSiren.gain.setValueAtTime(0, startTime);
                gainSiren.gain.linearRampToValueAtTime(0.08 * volumeMultiplier, startTime + 0.1);
                gainSiren.gain.linearRampToValueAtTime(0.08 * volumeMultiplier, startTime + 0.5);
                gainSiren.gain.exponentialRampToValueAtTime(0.0001, endTime);
                
                oscSiren.start(startTime);
                oscSiren.stop(endTime);
            }
            // Low frequency rumble simulating heavy tanks/armor
            const oscRumble = audioCtx.createOscillator();
            const gainRumble = audioCtx.createGain();
            oscRumble.type = "triangle";
            oscRumble.frequency.setValueAtTime(45, audioCtx.currentTime);
            oscRumble.frequency.linearRampToValueAtTime(35, audioCtx.currentTime + 2.2);
            gainRumble.gain.setValueAtTime(0.12 * volumeMultiplier, audioCtx.currentTime);
            gainRumble.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.4);
            oscRumble.connect(gainRumble);
            gainRumble.connect(audioCtx.destination);
            oscRumble.start();
            oscRumble.stop(audioCtx.currentTime + 2.4);
            
            osc.start();
            osc.stop();
        } else if (type === "paper") {
            // Rustling paper or briefing deck slide sound
            osc.type = "triangle";
            osc.frequency.setValueAtTime(120, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.06 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } else if (type === "budget_change") {
            // Double coin chime
            osc.type = "sine";
            osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5
            osc.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08); // E6
            gainNode.gain.setValueAtTime(0.04 * volumeMultiplier, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.25);
        } else {
            // Default stop for unknown types
            osc.start();
            osc.stop();
        }
    } catch (e) {
        console.warn("Audio Context failed to play sound:", e);
    }
}

// Save Settings to Local Storage
export function saveSettings() {
    try {
        const isCrt = !document.body.classList.contains("no-crt");
        const isGlow = !document.body.classList.contains("no-glow");
        
        let theme = "gold";
        if (document.body.classList.contains("theme-teal")) theme = "teal";
        else if (document.body.classList.contains("theme-amber")) theme = "amber";
        else if (document.body.classList.contains("theme-crimson")) theme = "crimson";

        const settings = {
            crt: isCrt,
            sound: window.soundEnabled,
            glow: isGlow,
            theme: theme,
            volume: window.fxVolume
        };
        localStorage.setItem("turkey2038_settings", JSON.stringify(settings));
    } catch (e) {
        console.warn("Failed to save settings:", e);
    }
}

// Load and Apply Settings
export function loadAndApplySettings() {
    try {
        const saved = localStorage.getItem("turkey2038_settings");
        if (saved) {
            const settings = JSON.parse(saved);
            
            // Apply CRT
            if (settings.crt === false) {
                document.body.classList.add("no-crt");
                document.getElementById("setting-crt-on")?.classList.remove("active");
                document.getElementById("setting-crt-off")?.classList.add("active");
            } else {
                document.body.classList.remove("no-crt");
                document.getElementById("setting-crt-on")?.classList.add("active");
                document.getElementById("setting-crt-off")?.classList.remove("active");
            }
            
            // Apply Sound
            if (settings.sound === false) {
                window.soundEnabled = false;
                document.getElementById("setting-sound-on")?.classList.remove("active");
                document.getElementById("setting-sound-off")?.classList.add("active");
            } else {
                window.soundEnabled = true;
                document.getElementById("setting-sound-on")?.classList.add("active");
                document.getElementById("setting-sound-off")?.classList.remove("active");
            }
            
            // Apply Glow
            if (settings.glow === false) {
                document.body.classList.add("no-glow");
                document.getElementById("setting-glow-high")?.classList.remove("active");
                document.getElementById("setting-glow-low")?.classList.add("active");
            } else {
                document.body.classList.remove("no-glow");
                document.getElementById("setting-glow-high")?.classList.add("active");
                document.getElementById("setting-glow-low")?.classList.remove("active");
            }

            // Apply Theme
            const activeTheme = settings.theme || "gold";
            applyTheme(activeTheme);

            // Apply Volume
            window.fxVolume = settings.volume !== undefined ? settings.volume : 70;
            const volSlider = document.getElementById("setting-volume");
            const volVal = document.getElementById("setting-volume-val");
            if (volSlider && volVal) {
                volSlider.value = window.fxVolume;
                volVal.textContent = `${window.fxVolume}%`;
            }
        } else {
            applyTheme("gold");
            window.fxVolume = 70;
        }
    } catch (e) {
        console.warn("Failed to load settings:", e);
    }
}

// Interactive Network Canvas Animation
let canvasAnimationId = null;

export function startMenuCanvasAnimation() {
    const canvas = document.getElementById("menu-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Resize handler
    function resize() {
        if (!document.getElementById("main-menu")?.classList.contains("hidden")) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    window.addEventListener("resize", resize);
    resize();
    
    const nodes = [];
    const numNodes = 30;
    
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 2 + 1.2,
            pulse: Math.random() * Math.PI
        });
    }
    
    // Coordinates for pulsing tactical hubs (Istanbul, Ankara, Izmir, Diyarbakir)
    const tacticalHubs = [
        { name: "ANKARA (EXECUTIVE HQ)", lat: 0.48, lng: 0.46, r: 12 },
        { name: "ISTANBUL (ZONE 1)", lat: 0.28, lng: 0.18, r: 8 },
        { name: "IZMIR (ZONE 2)", lat: 0.52, lng: 0.08, r: 8 },
        { name: "DIYARBAKIR (ZONE 3)", lat: 0.65, lng: 0.81, r: 8 }
    ];
    
    let scanLineY = 0;
    
    function draw() {
        if (document.getElementById("main-menu")?.classList.contains("hidden")) {
            cancelAnimationFrame(canvasAnimationId);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background subtle grid
        ctx.strokeStyle = "rgba(194, 160, 93, 0.02)";
        ctx.lineWidth = 1;
        const gridSize = 45;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw nodes network
        ctx.strokeStyle = "rgba(194, 160, 93, 0.07)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < numNodes; i++) {
            const n1 = nodes[i];
            
            // Move node
            n1.x += n1.vx;
            n1.y += n1.vy;
            
            // Bounce borders
            if (n1.x < 0 || n1.x > canvas.width) n1.vx *= -1;
            if (n1.y < 0 || n1.y > canvas.height) n1.vy *= -1;
            
            // Draw lines to near nodes
            for (let j = i + 1; j < numNodes; j++) {
                const n2 = nodes[j];
                const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                if (dist < 180) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();
                }
            }
            
            // Draw node dot
            n1.pulse += 0.015;
            const alpha = 0.12 + Math.sin(n1.pulse) * 0.1;
            ctx.fillStyle = `rgba(194, 160, 93, ${alpha})`;
            ctx.beginPath();
            ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw Tactical Hubs
        tacticalHubs.forEach(hub => {
            const hx = canvas.width * hub.lng;
            const hy = canvas.height * hub.lat;
            
            // Pulse wave
            const pulseRadius = hub.r + (Date.now() / 60) % 25;
            const pulseAlpha = 1 - (pulseRadius - hub.r) / 25;
            
            ctx.strokeStyle = `rgba(158, 42, 43, ${pulseAlpha * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(hx, hy, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Core
            ctx.fillStyle = "var(--color-burgundy)";
            ctx.beginPath();
            ctx.arc(hx, hy, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Label
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.font = "9px monospace";
            ctx.fillText(hub.name, hx + 12, hy + 3);
        });
        
        // Draw horizontal sweep line
        scanLineY += 1.6;
        if (scanLineY > canvas.height) scanLineY = 0;
        ctx.strokeStyle = "rgba(194, 160, 93, 0.035)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, scanLineY);
        ctx.lineTo(canvas.width, scanLineY);
        ctx.stroke();
        
        canvasAnimationId = requestAnimationFrame(draw);
    }
    
    draw();
}

// Telemetry Boot Logger
export function runTelemetryLog() {
    const log = document.getElementById("telemetry-log");
    if (!log) return;
    
    const lines = [
        "STRATEGIC COMMAND NETWORK INITIALIZED...",
        "CONNECTING TO ANKARA SERVER [HOST: TC_MAIN]...",
        "ESTABLISHING SECURE PROTOCOLS...",
        "ENCRYPTION KEY EXCHANGED [AES-256-GCM]...",
        "AUTHORIZATION GRANTED FOR EXECUTIVE USER...",
        "LOADING REGIONAL DATA MODULES...",
        "  - MARMARA SECURE [100% OK]",
        "  - EGE SECURE [100% OK]",
        "  - AKDENIZ SECURE [100% OK]",
        "  - IC ANADOLU SECURE [100% OK]",
        "  - KARADENIZ SECURE [100% OK]",
        "  - DOGU ANADOLU SECURE [100% OK]",
        "  - GUNEYDOGU ANADOLU SECURE [100% OK]",
        "CABINET DATABASE STATUS: OPERATIONAL",
        "POLITICAL CAPITAL BALANCER: VERIFIED",
        "WELCOME, PRESIDENT. SYSTEM ONLINE."
    ];
    
    log.innerHTML = "";
    let i = 0;
    
    function writeLine() {
        if (document.getElementById("main-menu")?.classList.contains("hidden")) return;
        if (i < lines.length) {
            const line = document.createElement("div");
            line.className = "telemetry-line";
            line.textContent = "> " + lines[i];
            log.appendChild(line);
            log.scrollTop = log.scrollHeight;
            i++;
            setTimeout(writeLine, 600 + Math.random() * 500);
        }
    }
    
    writeLine();
}

// ==========================================
// CABINET DETAILS, SVG PORTRAITS & REACTIONS
// ==========================================

function getSeededValue(str) {
    let hash = 0;
    if (str) {
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    return Math.abs(hash);
}

export function createIdeologicalAvatarSVG(ideology, size = 44, name = "") {
    const seed = getSeededValue(name || ideology || "default");
    
    // Skin Tone Options
    const skinColors = ["#ffdbac", "#f1c27d", "#e0ac69", "#ffcc99", "#f5c59f"];
    const skinShadowColors = ["#e0ac69", "#d69f58", "#b37c3b", "#e09a69", "#d4a276"];
    const skinIdx = seed % skinColors.length;
    const skinColor = skinColors[skinIdx];
    const skinShadowColor = skinShadowColors[skinIdx];
    
    // Background Gradient Selection
    const ideologyGradients = {
        conservative: ["#145a32", "#1b2631"],
        secular: ["#78281f", "#1b2a47"],
        liberal: ["#1a5276", "#1c2833"],
        nationalist: ["#5b2c6f", "#1a252f"],
        technocrat: ["#1b4f72", "#2c3e50"]
    };
    const gradColors = ideologyGradients[ideology] || ["#2c3e50", "#0e1726"];
    const gradId = `avatar-bg-grad-${seed}-${ideology}-${size}`;
    
    // Determine gender based on Turkish female names in game
    const isFemale = /^(Selin|Ayla|Filiz|Elif|Banu|Nihal|Seda|Leyla|Pelin|Ayşe|Defne|Yasemin|Asena|İpek|Emel|Arzu|Derya|Bahar|Nermin|Ceren|Sibel|Mine|Zeynep|Fatma)/i.test(name);
    
    // Hair style & color selection
    const hairColors = ["#1a1105", "#2e1c0c", "#47301c", "#8c6b53", "#d6c0a3", "#5c5c5c", "#cfcfcf"];
    const hairColor = hairColors[(seed >> 2) % hairColors.length];
    
    // Suit & Tie/Blouse selection
    const suitColors = ["#1a252f", "#1c2833", "#4a235a", "#145a32", "#7b241c", "#5d6d7e", "#2c3e50"];
    const suitColor = suitColors[(seed >> 3) % suitColors.length];
    const tieColors = ["#c0392b", "#2980b9", "#f1c40f", "#27ae60", "#8e44ad", "#e67e22"];
    const tieColor = tieColors[(seed >> 4) % tieColors.length];
    
    // Iris Color
    const irisColors = ["#5c3a21", "#3b5998", "#2e7d32", "#8d6e63"];
    const irisColor = irisColors[(seed >> 5) % irisColors.length];
    
    // Glasses Style
    const glassStyle = (seed >> 6) % 5; // 0: None, 1: Gold round, 2: Dark rectangular, 3: Red-framed, 4: Semi-rimless
    
    // Expression
    const expressionStyle = (seed >> 7) % 3; // 0: smiling, 1: serious, 2: confident/smirk
    
    let hairSVG = "";
    if (isFemale) {
        const femaleHairStyle = (seed >> 8) % 5;
        if (femaleHairStyle === 0) {
            // Bob cut
            hairSVG = `<path d="M22 30 C 20 10, 80 10, 78 30 C 80 50, 74 58, 74 58 C 70 52, 72 38, 70 34 C 64 30, 36 30, 30 34 C 28 38, 30 52, 26 58 C 26 58, 20 50, 22 30 Z" fill="${hairColor}" />`;
        } else if (femaleHairStyle === 1) {
            // Elegant bun
            hairSVG = `
                <circle cx="50" cy="18" r="12" fill="${hairColor}" />
                <path d="M23 35 C 22 20, 78 20, 77 35 C 70 30, 30 30, 23 35 Z" fill="${hairColor}" />
                <path d="M22 35 C 20 40, 24 50, 24 50 C 24 50, 26 38, 28 36" stroke="${hairColor}" stroke-width="2" fill="none" />
                <path d="M78 35 C 80 40, 76 50, 76 50 C 76 50, 74 38, 72 36" stroke="${hairColor}" stroke-width="2" fill="none" />
            `;
        } else if (femaleHairStyle === 2) {
            // Long hair
            hairSVG = `
                <path d="M 22 45 C 18 60, 22 85, 28 90 L 72 90 C 78 85, 82 60, 78 45 Z" fill="${hairColor}" />
                <path d="M23 32 C 22 15, 78 15, 77 32 C 72 26, 28 26, 23 32 Z" fill="${hairColor}" />
            `;
        } else if (femaleHairStyle === 3) {
            // Pixie cut
            hairSVG = `
                <path d="M 22 35 C 22 18, 78 18, 78 35 C 75 28, 65 24, 50 25 C 35 24, 25 28, 22 35 Z" fill="${hairColor}" />
                <path d="M 22 35 L 26 28 L 24 42 Z" fill="${hairColor}" />
                <path d="M 78 35 L 74 28 L 76 42 Z" fill="${hairColor}" />
            `;
        } else {
            // Wavy shoulder length
            hairSVG = `
                <path d="M 21 35 C 20 20, 80 20, 79 35 C 82 50, 76 75, 74 80 C 70 70, 71 45, 68 40 C 62 30, 38 30, 32 40 C 29 45, 30 70, 26 80 C 24 75, 18 50, 21 35 Z" fill="${hairColor}" />
            `;
        }
    } else {
        const maleHairStyle = (seed >> 8) % 5;
        if (maleHairStyle === 0) {
            // Neat side part
            hairSVG = `
                <path d="M 22 32 C 22 16, 50 12, 78 28 C 76 22, 60 18, 50 20 C 35 18, 24 22, 22 32 Z" fill="${hairColor}" />
                <path d="M 22 32 L 25 40 L 27 35 Z" fill="${hairColor}" />
                <path d="M 78 28 L 75 36 L 73 31 Z" fill="${hairColor}" />
            `;
        } else if (maleHairStyle === 1) {
            // Combed back
            hairSVG = `
                <path d="M 22 32 C 24 12, 76 12, 78 32 C 70 20, 30 20, 22 32 Z" fill="${hairColor}" />
                <path d="M 22 32 L 25 40 L 26 34 Z" fill="${hairColor}" />
                <path d="M 78 32 L 75 40 L 74 34 Z" fill="${hairColor}" />
            `;
        } else if (maleHairStyle === 2) {
            // Bald with side hair
            hairSVG = `
                <path d="M 21 48 C 20 35, 26 28, 28 28" stroke="${hairColor}" stroke-width="4.5" fill="none" stroke-linecap="round" />
                <path d="M 79 48 C 80 35, 74 28, 72 28" stroke="${hairColor}" stroke-width="4.5" fill="none" stroke-linecap="round" />
            `;
        } else if (maleHairStyle === 3) {
            // Short crop
            hairSVG = `
                <path d="M 23 35 C 23 20, 77 20, 77 35 Q 50 22 23 35 Z" fill="${hairColor}" />
                <path d="M 23 35 L 25 41 L 27 36 Z" fill="${hairColor}" />
                <path d="M 77 35 L 75 41 L 73 36 Z" fill="${hairColor}" />
            `;
        } else {
            // Spiky hair
            hairSVG = `
                <path d="M 22 35 C 22 18, 78 18, 78 35 M 24 24 L 28 14 L 33 21 L 40 12 L 46 20 L 51 11 L 56 19 L 63 13 L 68 21 L 73 15 L 75 26" stroke="${hairColor}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="${hairColor}" />
            `;
        }
    }
    
    // Male facial hair options
    let facialHairSVG = "";
    if (!isFemale) {
        const beardStyle = (seed >> 9) % 6;
        if (beardStyle === 1) {
            // Stubble
            facialHairSVG = `<path d="M 24 48 C 24 72, 76 72, 76 48 C 76 58, 65 72, 50 72 C 35 72, 24 58, 24 48 Z" fill="#000000" opacity="0.18" />`;
        } else if (beardStyle === 2) {
            // Nationalist drooping mustache
            facialHairSVG = `<path d="M 38 55 Q 50 51 62 55 C 64 64, 59 70, 58 70 C 58 64, 54 58, 50 58 C 46 58, 42 64, 42 70 C 41 70, 36 64, 38 55 Z" fill="${hairColor}" />`;
        } else if (beardStyle === 3) {
            // Almond mustache
            facialHairSVG = `<rect x="44" y="52" width="12" height="7" rx="1.5" fill="${hairColor}" />`;
        } else if (beardStyle === 4) {
            // Full beard
            facialHairSVG = `
                <path d="M 24 48 C 24 74, 76 74, 76 48 C 78 55, 68 76, 50 76 C 32 76, 22 55, 24 48 Z" fill="${hairColor}" />
                <path d="M 40 54 Q 50 50 60 54 C 60 58, 56 61, 50 61 C 44 61, 40 58, 40 54 Z" fill="${hairColor}" />
            `;
        } else if (beardStyle === 5) {
            // Standard thick mustache
            facialHairSVG = `<path d="M 36 54 Q 50 50 64 54 C 64 58, 60 62, 50 61 C 40 62, 36 58, 36 54 Z" fill="${hairColor}" />`;
        }
    }
    
    // Glasses rendering
    let glassesSVG = "";
    if (glassStyle === 1) {
        // Gold round glasses
        glassesSVG = `
            <circle cx="40" cy="45" r="7.5" stroke="#f1c40f" stroke-width="1.8" fill="none" />
            <circle cx="60" cy="45" r="7.5" stroke="#f1c40f" stroke-width="1.8" fill="none" />
            <line x1="47.5" y1="45" x2="52.5" y2="45" stroke="#f1c40f" stroke-width="1.8" />
            <path d="M 32.5 45 Q 28 42 24 44" stroke="#f1c40f" stroke-width="1.2" fill="none" />
            <path d="M 67.5 45 Q 72 42 76 44" stroke="#f1c40f" stroke-width="1.2" fill="none" />
        `;
    } else if (glassStyle === 2) {
        // Dark rectangular glasses
        glassesSVG = `
            <rect x="32" y="39" width="15" height="11" rx="2" stroke="#2c3e50" stroke-width="2" fill="none" />
            <rect x="53" y="39" width="15" height="11" rx="2" stroke="#2c3e50" stroke-width="2" fill="none" />
            <line x1="47" y1="44" x2="53" y2="44" stroke="#2c3e50" stroke-width="2" />
            <path d="M 32 44 Q 28 41 24 43" stroke="#2c3e50" stroke-width="1.5" fill="none" />
            <path d="M 68 44 Q 72 41 76 43" stroke="#2c3e50" stroke-width="1.5" fill="none" />
        `;
    } else if (glassStyle === 3) {
        // Red-framed glasses
        glassesSVG = `
            <circle cx="40" cy="45" r="7.5" stroke="#c0392b" stroke-width="2" fill="none" />
            <circle cx="60" cy="45" r="7.5" stroke="#c0392b" stroke-width="2" fill="none" />
            <line x1="47.5" y1="45" x2="52.5" y2="45" stroke="#c0392b" stroke-width="2" />
            <path d="M 32.5 45 Q 28 42 24 44" stroke="#c0392b" stroke-width="1.5" fill="none" />
            <path d="M 67.5 45 Q 72 42 76 44" stroke="#c0392b" stroke-width="1.5" fill="none" />
        `;
    } else if (glassStyle === 4) {
        // Semi-rimless silver glasses
        glassesSVG = `
            <path d="M 32 40 L 47 40" stroke="#7f8c8d" stroke-width="2" />
            <rect x="32" y="40" width="15" height="10" rx="1" stroke="#bdc3c7" stroke-width="1" fill="none" opacity="0.8" />
            <path d="M 53 40 L 68 40" stroke="#7f8c8d" stroke-width="2" />
            <rect x="53" y="40" width="15" height="10" rx="1" stroke="#bdc3c7" stroke-width="1" fill="none" opacity="0.8" />
            <line x1="47" y1="42" x2="53" y2="42" stroke="#7f8c8d" stroke-width="1.5" />
            <path d="M 32 40 Q 28 38 24 40" stroke="#7f8c8d" stroke-width="1" fill="none" />
            <path d="M 68 40 Q 72 38 76 40" stroke="#7f8c8d" stroke-width="1" fill="none" />
        `;
    }
    
    // Clothing rendering
    let clothingSVG = "";
    if (isFemale) {
        clothingSVG = `
            <!-- Suit jacket -->
            <path d="M 20 82 L 80 82 L 76 100 L 24 100 Z" fill="${suitColor}" />
            <!-- Inner blouse -->
            <path d="M 40 82 L 60 82 L 50 98 Z" fill="#ffffff" />
            <!-- V-neck skin opening -->
            <path d="M 43 82 L 57 82 L 50 91 Z" fill="${skinColor}" />
            <!-- Lapels -->
            <path d="M 20 82 L 40 82 L 46 95 Z" fill="${suitColor}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />
            <path d="M 80 82 L 60 82 L 54 95 Z" fill="${suitColor}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />
            <!-- Pearl necklace -->
            <circle cx="45" cy="85" r="1.8" fill="#eaecee" />
            <circle cx="48" cy="87" r="1.8" fill="#eaecee" />
            <circle cx="52" cy="87" r="1.8" fill="#eaecee" />
            <circle cx="55" cy="85" r="1.8" fill="#eaecee" />
        `;
    } else {
        const shirtStyle = (seed >> 10) % 3; // 0: White Shirt + Tie, 1: Blue Shirt + Tie, 2: Turtleneck
        if (shirtStyle === 2) {
            clothingSVG = `
                <!-- Turtleneck shirt -->
                <path d="M 38 78 L 62 78 L 60 100 L 40 100 Z" fill="#1b2631" />
                <rect x="42" y="72" width="16" height="8" fill="#1b2631" rx="2" />
                <!-- Suit jacket overlapping -->
                <path d="M 20 80 L 38 80 L 45 100 L 24 100 Z" fill="${suitColor}" />
                <path d="M 80 80 L 62 80 L 55 100 L 76 100 Z" fill="${suitColor}" />
                <!-- Lapels -->
                <path d="M 20 80 L 32 80 L 42 94 Z" fill="${suitColor}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" />
                <path d="M 80 80 L 68 80 L 58 94 Z" fill="${suitColor}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" />
            `;
        } else {
            const shirtColor = shirtStyle === 1 ? "#d4e6f1" : "#ffffff";
            clothingSVG = `
                <!-- Suit jacket -->
                <path d="M 20 80 L 80 80 L 76 100 L 24 100 Z" fill="${suitColor}" />
                <!-- Shirt collar -->
                <path d="M 36 80 L 50 94 L 64 80 Z" fill="${shirtColor}" />
                <path d="M 42 80 L 50 88 L 41 80 Z" fill="${shirtColor}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
                <path d="M 58 80 L 50 88 L 59 80 Z" fill="${shirtColor}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
                <!-- Tie -->
                <path d="M 48 85 L 52 85 L 54 99 L 50 103 L 46 99 Z" fill="${tieColor}" />
                <!-- Tie knot -->
                <polygon points="47,85 53,85 51,89 49,89" fill="${tieColor}" stroke="rgba(0,0,0,0.1)" stroke-width="0.5" />
            `;
        }
    }
    
    // Eyebrow path depending on style
    const isGrayHair = hairColor === "#5c5c5c" || hairColor === "#cfcfcf";
    const eyebrowColor = isGrayHair ? "#444444" : hairColor;
    const eyebrowY = 38;
    
    // Expression mouth paths
    let mouthSVG = "";
    if (expressionStyle === 0) {
        // smiling
        mouthSVG = `<path d="M 42 62 Q 50 69 58 62" stroke="#b03a2e" stroke-width="2" stroke-linecap="round" fill="none" />`;
    } else if (expressionStyle === 1) {
        // serious / straight
        mouthSVG = `<line x1="43" y1="64" x2="57" y2="64" stroke="#b03a2e" stroke-width="2.2" stroke-linecap="round" />`;
    } else {
        // smirk/confident
        mouthSVG = `<path d="M 43 64 Q 52 66 57 61" stroke="#b03a2e" stroke-width="2.2" stroke-linecap="round" fill="none" />`;
    }
    
    return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
            <defs>
                <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${gradColors[0]}" />
                    <stop offset="100%" stop-color="${gradColors[1]}" />
                </linearGradient>
                <clipPath id="avatar-clip-${seed}-${size}">
                    <circle cx="50" cy="50" r="48" />
                </clipPath>
            </defs>
            <g clip-path="url(#avatar-clip-${seed}-${size})">
                <!-- Premium Background Gradient -->
                <circle cx="50" cy="50" r="48" fill="url(#${gradId})" />
                
                <!-- Ears -->
                <circle cx="21" cy="50" r="5" fill="${skinColor}" />
                <circle cx="79" cy="50" r="5" fill="${skinColor}" />
                <circle cx="21" cy="50" r="3.2" fill="${skinShadowColor}" opacity="0.6" />
                <circle cx="79" cy="50" r="3.2" fill="${skinShadowColor}" opacity="0.6" />
                
                <!-- Neck & Shadow -->
                <rect x="43" y="68" width="14" height="15" fill="${skinColor}" />
                <path d="M43 73 Q50 79 57 73" stroke="${skinShadowColor}" stroke-width="2" fill="none" opacity="0.8" />
                
                <!-- Head Base -->
                <path d="M 24 45 C 24 72, 76 72, 76 45 C 76 30, 24 30, 24 45 Z" fill="${skinColor}" />
                
                <!-- Cheeks Soft Shading -->
                <ellipse cx="32" cy="57" rx="5" ry="3" fill="#f1948a" opacity="0.22" />
                <ellipse cx="68" cy="57" rx="5" ry="3" fill="#f1948a" opacity="0.22" />
                
                <!-- Eyebrows -->
                <path d="M34 ${eyebrowY} Q40 ${eyebrowY - 3} 47 ${eyebrowY + 1}" stroke="${eyebrowColor}" stroke-width="2.2" fill="none" stroke-linecap="round" />
                <path d="M66 ${eyebrowY} Q60 ${eyebrowY - 3} 53 ${eyebrowY + 1}" stroke="${eyebrowColor}" stroke-width="2.2" fill="none" stroke-linecap="round" />
                
                <!-- Eyes (Detailed White + Iris + Pupil + Sparkle) -->
                <ellipse cx="40" cy="45" rx="5.2" ry="3.2" fill="#ffffff" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
                <ellipse cx="60" cy="45" rx="5.2" ry="3.2" fill="#ffffff" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
                <circle cx="40" cy="45" r="2.8" fill="${irisColor}" />
                <circle cx="60" cy="45" r="2.8" fill="${irisColor}" />
                <circle cx="40" cy="45" r="1.4" fill="#000000" />
                <circle cx="60" cy="45" r="1.4" fill="#000000" />
                <circle cx="39" cy="44" r="0.7" fill="#ffffff" />
                <circle cx="59" cy="44" r="0.7" fill="#ffffff" />
                
                <!-- Nose (Elegant Vector Nose) -->
                <path d="M 50 42 L 50 52 Q 47 52 47 53.5" stroke="${skinShadowColor}" stroke-width="2.2" stroke-linecap="round" fill="none" />
                
                <!-- Mouth -->
                ${mouthSVG}
                
                <!-- Facial Hair -->
                ${facialHairSVG}
                
                <!-- Glasses -->
                ${glassesSVG}
                
                <!-- Hair (layered on top) -->
                ${hairSVG}
                
                <!-- Suit & Shirt -->
                ${clothingSVG}
                
                <!-- Premium Gloss/Shadow border -->
                <circle cx="50" cy="50" r="46.5" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="none" />
            </g>
        </svg>
    `;
}

export function applyIdeologicalAppointmentReactions(ideology) {
    const reactionsMap = {
        conservative: {
            conservatives: 10,
            religious: 15,
            secular: -10,
            leftists: -5
        },
        secular: {
            secular: 12,
            leftists: 10,
            conservatives: -8,
            religious: -10
        },
        nationalist: {
            nationalists: 12,
            kurds: -10,
            leftists: -5
        },
        liberal: {
            liberals: 15,
            business: 10,
            workers: -5
        },
        technocrat: {
            students: 8,
            civil_servants: 8,
            business: 5
        }
    };

    const changes = reactionsMap[ideology];
    if (changes) {
        for (const grp in changes) {
            if (state.voterGroups[grp]) {
                const shift = changes[grp];
                state.voterGroups[grp].approval = Math.max(0, Math.min(100, state.voterGroups[grp].approval + shift));
                
                const groupTranslations = {
                    conservatives: "Muhafazakar Seçmen",
                    secular: "Seküler Seçmen",
                    nationalists: "Milliyetçi Seçmen",
                    leftists: "Solcu Seçmen",
                    liberals: "Liberal Seçmen",
                    kurds: "Kürt Seçmen",
                    immigrants: "Göçmen Seçmen",
                    business: "İş Dünyası",
                    students: "Öğrenci",
                    retirees: "Emekli",
                    workers: "İşçi",
                    farmers: "Çiftçi",
                    civil_servants: "Memur",
                    youth: "Genç",
                    religious: "Dindar Seçmen"
                };
                const name = groupTranslations[grp] || grp;
                logMessage(`${name} memnuniyeti: ${shift >= 0 ? '+' : ''}${shift}%`);
            }
        }
    }
}

export function getMinisterEffects(portfolioKey, minister) {
    const effects = [];
    const compDiff = minister.competence - 50;
    const compSign = compDiff >= 0 ? "+" : "";
    
    switch (portfolioKey) {
        case "economy":
            effects.push(`<strong>Ekonomi Gelişimi:</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.2).toFixed(1)}%`);
            effects.push(`<strong>Enflasyon Oranı:</strong> Yetkinlik etkisiyle ${compDiff >= 0 ? "-" : "+"}${Math.abs(compDiff * 0.15).toFixed(1)}%`);
            if (minister.corruption > 0) {
                effects.push(`<strong>Yolsuzluk Riski:</strong> Hükümet yolsuzluğuna +${(minister.corruption * 0.1).toFixed(1)}% etki`);
            }
            break;
        case "interior":
            effects.push(`<strong>Milli Güvenlik:</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.2).toFixed(1)}%`);
            if (minister.corruption > 0) {
                effects.push(`<strong>Yolsuzluk Riski:</strong> Hükümet yolsuzluğuna +${(minister.corruption * 0.1).toFixed(1)}% etki`);
            }
            if (minister.ideology === "nationalist") {
                effects.push(`<strong>Milliyetçi Kanat:</strong> İdeoloji uyumu nedeniyle Milliyetçi seçmen memnuniyetine +5% katkı`);
            }
            break;
        case "foreign":
            effects.push(`<strong>Diplomatik Güç (PC Artışı):</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.08).toFixed(2)} Siyasi Sermaye`);
            break;
        case "defense":
            effects.push(`<strong>Milli Savunma (Güvenlik):</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.15).toFixed(1)}%`);
            if (minister.ideology === "nationalist") {
                effects.push(`<strong>Milliyetçi Kanat:</strong> İdeoloji uyumu nedeniyle Milliyetçi seçmen memnuniyetine +5% katkı`);
            }
            break;
        case "education":
            effects.push(`<strong>Eğitim Kalitesi:</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.2).toFixed(1)}%`);
            if (minister.ideology === "conservative") {
                effects.push(`<strong>Seküler Tepkisi:</strong> İdeolojik gerilim nedeniyle Seküler seçmen memnuniyetine -5% etki`);
            }
            break;
        case "health":
            effects.push(`<strong>Sağlık Hizmetleri (Halk Mutluluğu):</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.15).toFixed(1)}%`);
            break;
        case "justice":
            effects.push(`<strong>Demokrasi ve Hukuk (Özgürlükler):</strong> Yetkinlik etkisiyle ${compSign}${(compDiff * 0.2).toFixed(1)}%`);
            effects.push(`<strong>Yolsuzlukla Mücadele:</strong> Yetkinlik etkisiyle ${compDiff >= 0 ? "-" : "+"}${Math.abs(compDiff * 0.15).toFixed(1)}%`);
            if (minister.corruption > 0) {
                effects.push(`<strong>Yolsuzluk Riski:</strong> Hükümet yolsuzluğuna +${(minister.corruption * 0.2).toFixed(1)}% etki`);
            }
            if (minister.ideology === "conservative") {
                effects.push(`<strong>Seküler Tepkisi:</strong> İdeolojik gerilim nedeniyle Seküler seçmen memnuniyetine -5% etki`);
            }
            break;
    }
    return effects;
}

export function showMinisterDetailModal(portfolioKey, minister, meta) {
    selectedPortfolioForHire = portfolioKey;
    
    const avatarContainer = doc("minister-detail-avatar");
    if (avatarContainer) {
        avatarContainer.innerHTML = createIdeologicalAvatarSVG(minister.ideology, 96, minister.name);
    }
    
    const ideologyColors = {
        liberal: "var(--color-liberal)",
        nationalist: "var(--color-nationalist)",
        technocrat: "var(--color-secular)",
        conservative: "var(--color-conservative)",
        secular: "var(--color-secular)"
    };
    const bgIdeology = ideologyColors[minister.ideology] || "var(--text-muted)";
    const ideologyBadge = doc("minister-detail-ideology-badge");
    if (ideologyBadge) {
        ideologyBadge.textContent = minister.ideologyLabel || minister.ideology.toUpperCase();
        ideologyBadge.style.backgroundColor = bgIdeology;
    }
    
    const portfolioTag = doc("minister-detail-portfolio");
    if (portfolioTag) {
        portfolioTag.textContent = meta.name;
    }
    const nameHeading = doc("minister-detail-name");
    if (nameHeading) {
        nameHeading.textContent = minister.name;
    }
    
    const updateStatRow = (barId, valId, value) => {
        const bar = doc(barId);
        const val = doc(valId);
        if (bar) bar.style.width = `${value}%`;
        if (val) val.textContent = `%${value}`;
    };
    
    updateStatRow("minister-detail-comp-bar", "minister-detail-comp-val", minister.competence);
    updateStatRow("minister-detail-loyalty-bar", "minister-detail-loyalty-val", minister.loyalty);
    updateStatRow("minister-detail-popular-bar", "minister-detail-popular-val", minister.popularity);
    updateStatRow("minister-detail-corrupt-bar", "minister-detail-corrupt-val", minister.corruption);
    updateStatRow("minister-detail-reform-bar", "minister-detail-reform-val", minister.reform ?? 50);
    
    const effectsList = doc("minister-detail-effects-list");
    if (effectsList) {
        effectsList.innerHTML = "";
        const effects = getMinisterEffects(portfolioKey, minister);
        if (effects.length > 0) {
            effects.forEach(eff => {
                const li = document.createElement("li");
                li.innerHTML = eff;
                effectsList.appendChild(li);
            });
        } else {
            effectsList.innerHTML = `<li style="color:var(--text-muted); font-style:italic; list-style:none; padding-left:0;">Herhangi bir aktif etki bulunmuyor.</li>`;
        }
    }
    
    const detailModal = doc("modal-minister-detail");
    if (detailModal) {
        detailModal.classList.remove("hidden");
    }
}

export function renderPowerBalanceDashboard() {
    const list = doc("power-balance-mini-list");
    if (!list) return;
    list.innerHTML = "";

    if (!state.powerCenters) {
        state.powerCenters = {
            public:     { name: "Halk Desteği", approval: 50, influence: 30, trend: 0 },
            military:   { name: "Ordu Desteği", approval: 70, influence: 25, trend: 0 },
            security:   { name: "Güvenlik Bürokrasisi", approval: 65, influence: 20, trend: 0 },
            judiciary:  { name: "Yargı Desteği", approval: 60, influence: 20, trend: 0 },
            business:   { name: "İş Dünyası", approval: 55, influence: 25, trend: 0 },
            media:      { name: "Medya Desteği", approval: 50, influence: 20, trend: 0 },
            academia:   { name: "Üniversite & Akademi", approval: 45, influence: 15, trend: 0 }
        };
    }

    const pcIcons = {
        public: "users",
        military: "shield",
        security: "pocket",
        judiciary: "scale",
        business: "briefcase",
        media: "tv",
        academia: "graduation-cap"
    };

    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        const val = pc.approval;
        const iconName = pcIcons[key] || "activity";
        
        let trendIcon = "minus";
        let trendClass = "trend-stable";
        if (pc.trend === 1) {
            trendIcon = "arrow-up";
            trendClass = "trend-up";
        } else if (pc.trend === -1) {
            trendIcon = "arrow-down";
            trendClass = "trend-down";
        }

        const miniItem = document.createElement("div");
        miniItem.className = "power-mini-item";
        miniItem.style.display = "flex";
        miniItem.style.justifyContent = "space-between";
        miniItem.style.alignItems = "center";
        miniItem.style.padding = "4px 8px";
        miniItem.style.background = "rgba(255, 255, 255, 0.02)";
        miniItem.style.border = "1px solid rgba(255, 255, 255, 0.04)";
        miniItem.style.borderRadius = "4px";
        miniItem.style.fontSize = "0.7rem";

        let valClass = "";
        if (val < 20) {
            valClass = "warning";
        }

        miniItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                <i data-lucide="${iconName}" style="width: 12px; height: 12px; opacity: 0.7;"></i>
                <span style="opacity: 0.85;">${pc.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
                <strong class="${valClass}" style="${val < 20 ? 'color: var(--color-red-text); font-weight: 700;' : ''}">%${val}</strong>
                <i data-lucide="${trendIcon}" class="${trendClass}" style="width: 10px; height: 10px;"></i>
            </div>
        `;
        list.appendChild(miniItem);
    }

    const activeRisks = calculateActiveRisks(state);
    const badge = doc("rejim-tehdit-badge");
    if (badge) {
        if (activeRisks.length > 0) {
            const isCritical = activeRisks.some(r => r.severity === "critical" || r.severity === "high");
            if (isCritical) {
                badge.textContent = "KRİTİK TEHDİT";
                badge.style.background = "rgba(231, 76, 60, 0.25)";
                badge.style.border = "1px solid rgba(231, 76, 60, 0.7)";
                badge.style.color = "#ff6b6b";
            } else {
                badge.textContent = `${activeRisks.length} AKTİF RİSK`;
                badge.style.background = "rgba(230, 126, 34, 0.2)";
                badge.style.border = "1px solid rgba(230, 126, 34, 0.5)";
                badge.style.color = "#f39c12";
            }
            badge.className = "pulse-red";
        } else {
            badge.textContent = "TEHDİT YOK";
            badge.style.background = "rgba(46, 204, 113, 0.15)";
            badge.style.border = "1px solid rgba(46, 204, 113, 0.4)";
            badge.style.color = "#2ecc71";
            badge.className = "";
        }
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

export function renderPowerBalanceModal() {
    const container = doc("power-centers-detailed-container");
    if (!container) return;
    container.innerHTML = "";

    const stabilityVal = doc("modal-stability-value");
    if (stabilityVal) {
        stabilityVal.textContent = `${state.stability}%`;
        if (state.stability < 40) {
            stabilityVal.style.color = "var(--color-red-text)";
        } else {
            stabilityVal.style.color = "var(--color-gold-text)";
        }
    }

    const pcIcons = {
        public: "users",
        military: "shield",
        security: "pocket",
        judiciary: "scale",
        business: "briefcase",
        media: "tv",
        academia: "graduation-cap"
    };

    const pcDescriptions = {
        public: "Halkın genel memnuniyeti ve seçmen tabanının hükümete olan desteği. %20'nin altına düşerse protestolar, %10'un altına düşerse isyanlar tetiklenir.",
        military: "Türk Silahlı Kuvvetleri'nin hükümete desteği. Bütçe artışları ve savunma politikalarıyla yükselir. Düşük destek ve düşük istikrar darbe veya muhtıraya yol açar.",
        security: "Emniyet teşkilatı, jandarma ve istihbarat kurumları. Asayiş bütçesi ve polis fonlamasından olumlu etkilenir. Göçmen ve azınlık haklarından olumsuz etkilenir.",
        judiciary: "Mahkemeler, hakimler ve savcılar yüksek kurulu ile anayasa mahkemesi. Özgürlükler ve yolsuzlukla mücadele oranı ile yükselir, otoriter baskılarla düşer.",
        business: "TÜSİAD, MÜSİAD, TOBB ve finans çevreleri. Ekonomik büyüme, IMF iş birliği ve düşük kurumlar vergisi ile yükselir. Ek vergiler ve UBI ile düşer.",
        media: "Televizyon kanalları, gazeteler ve dijital yayın organları. Basın özgürlüğü ve internet özgürlüğü ile yükselir. Sansür yasalarıyla sert şekilde düşer.",
        academia: "Üniversiteler, rektörler, akademisyenler ve entelektüel çevreler. Eğitim kalitesi ve özgürlüklerle yükselir, eğitimde dini müfredat ve sansürle düşer."
    };

    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        const val = pc.approval;
        const influence = pc.influence;
        const iconName = pcIcons[key] || "activity";
        const desc = pcDescriptions[key] || "";
        
        let trendIcon = "minus";
        let trendClass = "trend-stable";
        if (pc.trend === 1) {
            trendIcon = "arrow-up";
            trendClass = "trend-up";
        } else if (pc.trend === -1) {
            trendIcon = "arrow-down";
            trendClass = "trend-down";
        }

        const pcCard = document.createElement("div");
        pcCard.className = "power-center-detail-card";
        pcCard.style.padding = "10px";
        pcCard.style.background = "rgba(255,255,255,0.02)";
        pcCard.style.border = "1px solid rgba(255,255,255,0.05)";
        pcCard.style.borderRadius = "4px";
        pcCard.style.display = "flex";
        pcCard.style.flexDirection = "column";
        pcCard.style.gap = "6px";

        let valColor = "var(--color-green-text)";
        if (val < 40) {
            valColor = "var(--color-red-text)";
        } else if (val < 65) {
            valColor = "var(--color-gold-text)";
        }

        pcCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-family: var(--font-header);">
                    <i data-lucide="${iconName}" style="width: 16px; height: 16px; color: var(--color-gold);"></i>
                    <span>${pc.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem;">
                    <span>Etki: <strong>%${influence}</strong></span>
                    <span style="color: ${valColor}; font-weight: bold;">Destek: %${val}</span>
                    <i data-lucide="${trendIcon}" class="${trendClass}" style="width: 12px; height: 12px;"></i>
                </div>
            </div>
            <div style="font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35;">
                ${desc}
            </div>
            <div class="progress-bar-wrapper" style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                <div style="width: ${val}%; height: 100%; background: ${val < 40 ? 'var(--color-red-text)' : (val < 65 ? 'var(--color-gold-text)' : 'var(--color-green-text)')}; transition: width 0.3s;"></div>
            </div>
        `;
        container.appendChild(pcCard);
    }

    const risksContainer = doc("modal-active-risks-container");
    if (risksContainer) {
        risksContainer.innerHTML = "";
        const activeRisks = calculateActiveRisks(state);
        
        if (activeRisks.length === 0) {
            risksContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; flex: 1; padding: 20px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 4px; color: var(--text-muted); font-size: 0.72rem; text-align: center;">
                    <i data-lucide="check-circle-2" style="width: 28px; height: 28px; color: var(--color-green-text); opacity: 0.8;"></i>
                    <span>Herhangi bir aktif rejim riski bulunmuyor. İstikrar seviyesi normal sınırlar içerisinde.</span>
                </div>
            `;
        } else {
            activeRisks.forEach(risk => {
                const riskDiv = document.createElement("div");
                riskDiv.className = `risk-detail-card risk-severity-${risk.severity}`;
                riskDiv.style.padding = "10px";
                riskDiv.style.borderRadius = "4px";
                
                let borderCol = "rgba(230, 126, 34, 0.4)";
                let bgCol = "rgba(230, 126, 34, 0.08)";
                let textCol = "#f39c12";
                if (risk.severity === "high") {
                    borderCol = "rgba(231, 76, 60, 0.5)";
                    bgCol = "rgba(231, 76, 60, 0.1)";
                    textCol = "#e74c3c";
                } else if (risk.severity === "critical") {
                    borderCol = "rgba(231, 76, 60, 0.8)";
                    bgCol = "rgba(231, 76, 60, 0.2)";
                    textCol = "#ff4d4d";
                    riskDiv.style.animation = "pulse-glow-red 2s infinite alternate";
                }

                riskDiv.style.border = `1px solid ${borderCol}`;
                riskDiv.style.background = bgCol;

                riskDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-weight: 700; color: ${textCol}; font-family: var(--font-header); font-size: 0.75rem; text-transform: uppercase; display: flex; align-items: center; gap: 4px;">
                            <i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i>
                            ${risk.name}
                        </span>
                        <span style="font-size: 0.55rem; font-family: var(--font-header); padding: 1px 6px; border-radius: 3px; font-weight: bold; background: rgba(0,0,0,0.3); color: ${textCol}; border: 1px solid ${borderCol};">
                            ${risk.severity.toUpperCase()}
                        </span>
                    </div>
                    <p style="font-size: 0.65rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">${risk.desc}</p>
                `;
                risksContainer.appendChild(riskDiv);
            });
        }
    }

    // Render Intelligence & Plot Reports
    const intelContainer = doc("modal-intelligence-reports-container");
    if (intelContainer) {
        intelContainer.innerHTML = "";
        const reports = [];
        
        for (const key in state.powerCenters) {
            const pc = state.powerCenters[key];
            if (pc.plot && pc.plotProgress > 0) {
                let text = "";
                let color = "var(--text-secondary)";
                let icon = "info";
                
                if (key === "military") {
                    if (pc.plotProgress < 30) {
                        text = "MİT Raporu: Askeri kışlalarda rutin eğitim faaliyetleri gözlenmektedir. Telsiz trafiği normal seyrinde.";
                    } else if (pc.plotProgress < 60) {
                        text = "İstihbarat Sızıntısı: Ankara ve İstanbul kulislerinde bazı rütbeli subayların emekli generallerle gizli akşam yemeklerinde bir araya geldiği fısıldanıyor.";
                        color = "#f39c12";
                        icon = "alert-circle";
                    } else if (pc.plotProgress < 90) {
                        text = "MİT Raporu: Ankara Etimesgut zırhlı birliklerinde tankların mühimmat yüklemeleri yapıldığı ve telsiz trafiğinde olağandışı bir şifreli hareketlilik olduğu tespit edildi.";
                        color = "#e67e22";
                        icon = "alert-triangle";
                    } else {
                        text = "KRİTİK UYARI: Ordu içindeki cunta yapılanmasının önümüzdeki günlerde tankları sokağa indirip yönetime el koymak üzere hazırlıklarını tamamladığı bildirildi!";
                        color = "#ff4d4d";
                        icon = "alert-octagon";
                    }
                } else if (key === "business") {
                    if (pc.plotProgress < 30) {
                        text = "Finans İstihbaratı: Ticaret odaları ve iş dernekleri piyasada reform beklentisini sürdürmektedir.";
                    } else if (pc.plotProgress < 60) {
                        text = "Bankacılık Kulisi: Bazı büyük holdinglerin döviz rezervlerini hızla yurt dışına transfer etme ihtimalini masaya yatırdığı duyumu alındı.";
                        color = "#f39c12";
                        icon = "alert-circle";
                    } else if (pc.plotProgress < 90) {
                        text = "Piyasa Raporu: İş dünyası örgütleri hükümetin vergi politikalarına tepki olarak kredi musluklarını kapatma ve yatırımları dondurma kararı almaya hazırlanıyor.";
                        color = "#e67e22";
                        icon = "alert-triangle";
                    } else {
                        text = "KRİTİK RAPOR: Büyük sermaye gruplarının hükümeti finansal çıkmaza sokmak adına koordineli bir sermaye kaçışı ve piyasa boykotu başlatmak üzere anlaştığı kesinleşti!";
                        color = "#ff4d4d";
                        icon = "alert-octagon";
                    }
                } else if (key === "media") {
                    if (pc.plotProgress < 30) {
                        text = "Basın Raporu: Gazeteler ve internet siteleri rutin yayın akışını sürdürüyor.";
                    } else if (pc.plotProgress < 60) {
                        text = "İstihbarat Sızıntısı: Bazı muhalif televizyon kanalları ve gazetecilerin hükümeti yıpratacak özel haber dosyaları üzerinde çalıştığı belirlendi.";
                        color = "#f39c12";
                        icon = "alert-circle";
                    } else if (pc.plotProgress < 90) {
                        text = "MİT Raporu: Muhalif yayın yönetmenlerinin gizli bir toplantıda, hükümet üyelerine ait olduğu iddia edilen belgeleri yayınlamak üzere ortak takvim belirlediği saptandı.";
                        color = "#e67e22";
                        icon = "alert-triangle";
                    } else {
                        text = "KRİTİK BİLGİ: Medya gruplarının hükümeti istifaya zorlamak amacıyla koordine ettiği yolsuzluk ve kaset sızıntısı operasyonunu yarın başlatacağı öğrenildi!";
                        color = "#ff4d4d";
                        icon = "alert-octagon";
                    }
                } else if (key === "security") {
                    if (pc.plotProgress < 30) {
                        text = "Emniyet Raporu: İl emniyet müdürlükleri bakanlık talimatlarına uyum sağlamaktadır.";
                    } else if (pc.plotProgress < 60) {
                        text = "İçişleri İstihbaratı: Güvenlik bürokrasisindeki bazı kliklerin bakanlığın atama listelerine karşı direnç göstermeye başladığı şüphesi var.";
                        color = "#f39c12";
                        icon = "alert-circle";
                    } else if (pc.plotProgress < 90) {
                        text = "Bürokrasi Kulisi: Emniyet kadrolarındaki paralel yapılanmanın, hükümetin yargı paketlerini ve reform yasalarını sahada uygulamamak için yavaşlatma kararı aldığı rapor edildi.";
                        color = "#e67e22";
                        icon = "alert-triangle";
                    } else {
                        text = "KRİTİK UYARI: Güvenlik bürokrasisi, hükümetin otoritesini tamamen etkisiz kılacak paralel bir idari mekanizmayı hayata geçirmek üzere harekete geçti!";
                        color = "#ff4d4d";
                        icon = "alert-octagon";
                    }
                }
                
                if (text) {
                    reports.push({ text, color, icon, progress: pc.plotProgress, name: pc.name });
                }
            }
        }
        
        if (reports.length === 0) {
            intelContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; flex: 1; padding: 15px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 4px; color: var(--text-muted); font-size: 0.68rem; text-align: center;">
                    <i data-lucide="eye" style="width: 22px; height: 22px; color: var(--color-gold-text); opacity: 0.7;"></i>
                    <span>İstihbarat birimlerinden gelen olağandışı bir komplo veya darbe hazırlığı raporu bulunmuyor. Temiz.</span>
                </div>
            `;
        } else {
            reports.forEach(rep => {
                const repDiv = document.createElement("div");
                repDiv.className = "intel-report-item";
                repDiv.style.padding = "8px 10px";
                repDiv.style.border = "1px solid rgba(255,255,255,0.05)";
                repDiv.style.background = "rgba(0, 0, 0, 0.2)";
                repDiv.style.borderRadius = "4px";
                repDiv.style.display = "flex";
                repDiv.style.flexDirection = "column";
                repDiv.style.gap = "4px";
                repDiv.style.marginBottom = "6px";
                
                repDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 3px;">
                        <span style="font-weight: bold; color: ${rep.color}; display: flex; align-items: center; gap: 4px; font-family: var(--font-header); font-size: 0.65rem;">
                            <i data-lucide="${rep.icon}" style="width: 12px; height: 12px;"></i>
                            ${rep.name.toUpperCase()} PLANI TESPİTİ
                        </span>
                        <span style="font-size: 0.55rem; color: var(--text-muted);">Süreç: %${rep.progress}</span>
                    </div>
                    <p style="margin: 0; font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35;">${rep.text}</p>
                `;
                intelContainer.appendChild(repDiv);
            });
        }
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Show continue game preview modal with all strategic status briefings
export function showContinuePreviewModal(savedStateStr) {
    try {
        const loadedState = JSON.parse(savedStateStr);
        
        doc("preview-party-name").textContent = loadedState.partyName || "Parti İsmi";
        doc("preview-date").textContent = getQuarterString(loadedState.turn || 1);
        doc("preview-leader-name").textContent = loadedState.leaderName || "-";
        
        let traitLabel = "-";
        if (loadedState.leaderTrait === "diplomat") traitLabel = "Diplomat Lider";
        else if (loadedState.leaderTrait === "economist") traitLabel = "Ekonomist Lider";
        else if (loadedState.leaderTrait === "reformist") traitLabel = "Reformist Lider";
        else if (loadedState.leaderTrait === "charismatic") traitLabel = "Karizmatik Lider";
        doc("preview-leader-trait").textContent = traitLabel;
        
        const formattedTreasury = ((loadedState.treasury || 0) / 1000000000).toFixed(1);
        doc("preview-budget").textContent = `₺${formattedTreasury}B`;
        doc("preview-pc").textContent = loadedState.politicalCapital || 0;
        doc("preview-stability").textContent = `${loadedState.stability || 0}%`;
        
        let difficultyLabel = "NORMAL";
        if (loadedState.difficulty === "easy") difficultyLabel = "KOLAY (EASY)";
        else if (loadedState.difficulty === "hard") difficultyLabel = "ZOR (HARD)";
        doc("preview-difficulty").textContent = difficultyLabel;

        const cabinetListContainer = doc("preview-cabinet-list");
        if (cabinetListContainer) {
            cabinetListContainer.innerHTML = "";
            const portfolioNames = {
                economy: "Ekonomi",
                interior: "İçişleri",
                foreign: "Dışişleri",
                defense: "Savunma",
                education: "Eğitim",
                health: "Sağlık",
                justice: "Adalet"
            };
            if (loadedState.cabinet) {
                for (const dept in loadedState.cabinet) {
                    const minister = loadedState.cabinet[dept];
                    const deptLabel = portfolioNames[dept] || dept;
                    const span = document.createElement("span");
                    span.innerHTML = `${deptLabel}: <strong style="color: var(--text-primary);">${minister ? minister.name : '-'}</strong>`;
                    cabinetListContainer.appendChild(span);
                }
            }
        }

        // Bind Load/Delete Actions dynamically (assign direct onclicks to avoid duplicate listeners)
        doc("btn-load-save").onclick = () => {
            loadSavedGame();
            doc("modal-continue").classList.add("hidden");
        };

        doc("btn-delete-save").onclick = () => {
            if (confirm("Kayıtlı simülasyonu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
                localStorage.removeItem("turkey2038_state");
                doc("modal-continue").classList.add("hidden");
                const btnContinue = doc("btn-menu-continue");
                if (btnContinue) {
                    btnContinue.setAttribute("disabled", "true");
                }
                if (typeof playUiSound === "function") playUiSound("click");
            }
        };

        doc("modal-continue").classList.remove("hidden");
        if (typeof playUiSound === "function") playUiSound("click");

    } catch (e) {
        console.error("Failed to show continue preview modal:", e);
    }
}

// Apply selected UI color themes by modifying body class
export function applyTheme(theme) {
    document.body.classList.remove("theme-gold", "theme-teal", "theme-amber", "theme-crimson");
    document.body.classList.add(`theme-${theme}`);
    
    document.querySelectorAll(".theme-selector-grid .btn-setting").forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}
export function showIdeologyDetailModal(ideologyKey) {
    const meta = ideologyMeta[ideologyKey];
    if (!meta) return;

    doc("ideology-detail-title").textContent = meta.name.toUpperCase();
    doc("ideology-detail-desc").textContent = meta.desc;
    doc("ideology-detail-target").textContent = meta.target;
    doc("ideology-detail-bonus").textContent = meta.bonus;

    const getDynamicColor = (val) => val < 40 ? "var(--color-red-text)" : (val < 65 ? "var(--color-gold-text)" : "var(--color-green-text)");

    // Render Voter support bars
    const voterContainer = doc("ideology-detail-voter-bars");
    voterContainer.innerHTML = "";
    for (const key in meta.voters) {
        const pct = meta.voters[key];
        const gMeta = groupMeta[key] || { name: key, color: "var(--color-gold)" };
        const barColor = getDynamicColor(pct);
        const barRow = document.createElement("div");
        barRow.style.cssText = "display: flex; align-items: center; justify-content: space-between; font-size: 0.7rem;";
        barRow.innerHTML = `
            <span style="color: var(--text-primary); width: 120px; font-weight: 500;">${gMeta.name}</span>
            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin: 0 10px;">
                <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
            </div>
            <span style="color: var(--text-muted); font-weight: bold; width: 30px; text-align: right;">%${pct}</span>
        `;
        voterContainer.appendChild(barRow);
    }

    // Render Power center support bars
    const powerContainer = doc("ideology-detail-power-bars");
    powerContainer.innerHTML = "";
    
    const powerLabels = {
        public: "Halk Desteği",
        military: "Ordu Desteği",
        security: "Güvenlik Bürokrasisi",
        judiciary: "Yargı Desteği",
        business: "İş Dünyası",
        media: "Medya Desteği",
        academia: "Üniversite & Akademi"
    };

    for (const key in meta.powerCenters) {
        const pct = meta.powerCenters[key];
        const label = powerLabels[key] || key;
        const barColor = getDynamicColor(pct);
        const barRow = document.createElement("div");
        barRow.style.cssText = "display: flex; align-items: center; justify-content: space-between; font-size: 0.7rem;";
        barRow.innerHTML = `
            <span style="color: var(--text-primary); width: 120px; font-weight: 500;">${label}</span>
            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin: 0 10px;">
                <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
            </div>
            <span style="color: var(--text-muted); font-weight: bold; width: 30px; text-align: right;">%${pct}</span>
        `;
        powerContainer.appendChild(barRow);
    }

    // Restore buttons for start screen
    const btnConfirm = doc("btn-confirm-ideology-detail");
    const btnCancel = doc("btn-cancel-ideology-detail");
    if (btnConfirm) btnConfirm.style.display = "";
    if (btnCancel) {
        btnCancel.textContent = "İPTAL";
        btnCancel.style.flex = "1";
        btnCancel.onclick = () => {
            doc("modal-ideology-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        };
    }

    // Wire Confirm button
    if (btnConfirm) {
        // Remove old listeners by cloning
        const newBtnConfirm = btnConfirm.cloneNode(true);
        btnConfirm.parentNode.replaceChild(newBtnConfirm, btnConfirm);

        newBtnConfirm.addEventListener("click", () => {
            // Mark radio as checked
            const radio = document.querySelector(`.ideology-selector input[value="${ideologyKey}"]`);
            if (radio) {
                radio.checked = true;
                // Update active states in selector cards
                document.querySelectorAll(".ideology-selector .ideology-card").forEach(c => {
                    c.classList.remove("active");
                });
                const targetCard = doc(`ideology-card-${ideologyKey}`);
                if (targetCard) {
                    targetCard.classList.add("active");
                }
            }
            doc("modal-ideology-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        });
    }

    // Re-create icons in modal if any
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Show modal
    doc("modal-ideology-detail").classList.remove("hidden");
    if (typeof playUiSound === "function") playUiSound("click");
}

export function showVoterGroupDetailModal(groupKey) {
    const meta = voterGroupDetails[groupKey];
    if (!meta) return;

    doc("ideology-detail-title").textContent = `${meta.name.toUpperCase()} GRUBU & İDEOLOJİSİ`;
    doc("ideology-detail-desc").textContent = meta.desc;
    doc("ideology-detail-target").textContent = meta.target;
    doc("ideology-detail-bonus").textContent = meta.bonus;

    const getDynamicColor = (val) => val < 40 ? "var(--color-red-text)" : (val < 65 ? "var(--color-gold-text)" : "var(--color-green-text)");

    // Render Voter support bars
    const voterContainer = doc("ideology-detail-voter-bars");
    voterContainer.innerHTML = "";
    for (const key in meta.voters) {
        const pct = meta.voters[key];
        const gMeta = groupMeta[key] || { name: key, color: "var(--color-gold)" };
        const barColor = getDynamicColor(pct);
        const barRow = document.createElement("div");
        barRow.style.cssText = "display: flex; align-items: center; justify-content: space-between; font-size: 0.7rem;";
        barRow.innerHTML = `
            <span style="color: var(--text-primary); width: 120px; font-weight: 500;">${gMeta.name}</span>
            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin: 0 10px;">
                <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
            </div>
            <span style="color: var(--text-muted); font-weight: bold; width: 30px; text-align: right;">%${pct}</span>
        `;
        voterContainer.appendChild(barRow);
    }

    // Render Power center support bars
    const powerContainer = doc("ideology-detail-power-bars");
    powerContainer.innerHTML = "";
    
    const powerLabels = {
        public: "Halk Desteği",
        military: "Ordu Desteği",
        security: "Güvenlik Bürokrasisi",
        judiciary: "Yargı Desteği",
        business: "İş Dünyası",
        media: "Medya Desteği",
        academia: "Üniversite & Akademi"
    };

    for (const key in meta.powerCenters) {
        const pct = meta.powerCenters[key];
        const label = powerLabels[key] || key;
        const barColor = getDynamicColor(pct);
        const barRow = document.createElement("div");
        barRow.style.cssText = "display: flex; align-items: center; justify-content: space-between; font-size: 0.7rem;";
        barRow.innerHTML = `
            <span style="color: var(--text-primary); width: 120px; font-weight: 500;">${label}</span>
            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin: 0 10px;">
                <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
            </div>
            <span style="color: var(--text-muted); font-weight: bold; width: 30px; text-align: right;">%${pct}</span>
        `;
        powerContainer.appendChild(barRow);
    }

    // Setup Close action (hide confirm and make cancel say close)
    const btnConfirm = doc("btn-confirm-ideology-detail");
    const btnCancel = doc("btn-cancel-ideology-detail");
    if (btnConfirm) btnConfirm.style.display = "none";
    if (btnCancel) {
        btnCancel.textContent = "KAPAT";
        btnCancel.style.flex = "1";
        btnCancel.onclick = () => {
            doc("modal-ideology-detail").classList.add("hidden");
            if (typeof playUiSound === "function") playUiSound("click");
        };
    }

    // Re-create icons in modal
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Show modal
    doc("modal-ideology-detail").classList.remove("hidden");
    if (typeof playUiSound === "function") playUiSound("click");
}

/* ============================================================================
   REGIME WATCH CENTER (REJİM İZLEME MERKEZİ) FUNCTIONS & DATA
   ============================================================================ */

export const factionBargains = {
    cemaatler: [
        {
            name: "Bürokratik Kadro Tahsisi",
            desc: "Kamu kurumlarında ve eğitim kadrolarında tarikat mensuplarına ayrıcalık tanı.",
            costType: "pc",
            costVal: 10,
            effectsDesc: "+15 Cemaat İlişkisi, -10 Kemalist Bürokrasi İlişkisi, +10 Dindar Seçmen Onayı, -10 Seküler Seçmen Onayı",
            action: (s) => {
                s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 15);
                s.regimeWatch.kemalist_burokrasi.favor = Math.max(0, s.regimeWatch.kemalist_burokrasi.favor - 10);
                s.voterGroups.religious.approval = Math.min(100, s.voterGroups.religious.approval + 10);
                s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 10);
            }
        },
        {
            name: "Vakıf Teşvikleri & Hibeler",
            desc: "Cemaat vakıflarına kamu arazisi tahsisi yap ve hazineden doğrudan nakdi destek sağla.",
            costType: "treasury",
            costVal: 1200000000,
            effectsDesc: "+20 Cemaat İlişkisi, +10 Muhafazakar Seçmen Onayı, -₺1.2B Hazine Kaybı",
            action: (s) => {
                s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 20);
                s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                s.treasury -= 1200000000;
            }
        },
        {
            name: "Laik Cephe & Ordu İle Tarikat Tasfiyesi",
            desc: "Ordu ve sivil laik bürokrasiyle gizli ittifak kurarak cemaat ve tarikat kadrolarını bürokrasiden temizleme operasyonu başlat.",
            costType: "pc",
            costVal: 35,
            condition: (s) => s.regimeWatch.kemalist_burokrasi.favor >= 65 && s.powerCenters.military.approval >= 65 && (!s.activePurge || !s.activePurge.target),
            conditionText: "Kemalist Bürokrasi İlişkisi >= %65, Ordu Desteği >= %65 ve Aktif Tasfiye Olmamalı",
            effectsDesc: "4 Çeyrek sürecek Tasfiye Operasyonu başlatır. Başarı durumunda: Cemaat Nüfuzu -70%, Kemalist Bürokrasi İlişkisi +25, Seküler seçmen desteği +30.",
            action: (s) => {
                startPurgeOperation("cemaatler", ["kemalist_burokrasi"]);
            }
        }
    ],
    kemalist_burokrasi: [
        {
            name: "Liyakat Kararnamesi",
            desc: "Bürokraside dini kadrolaşmayı engelleyen ve liyakati esas alan yeni bir atama kararnamesi yayınla.",
            costType: "pc",
            costVal: 12,
            effectsDesc: "+15 Kemalist Bürokrasi İlişkisi, -10 Cemaat İlişkisi, +10 Eğitim, +5 Özgürlük",
            action: (s) => {
                s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 15);
                s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 10);
                s.systems.education = Math.min(100, s.systems.education + 10);
                s.systems.freedom = Math.min(100, s.systems.freedom + 5);
            }
        },
        {
            name: "Yerli Savunma Sanayii Teşviği",
            desc: "Ordu ve savunma sanayii Ar-Ge projelerine hazineden büyük miktarda bütçe aktar.",
            costType: "treasury",
            costVal: 2000000000,
            effectsDesc: "+20 Kemalist Bürokrasi İlişkisi, +12 Milliyetçi Seçmen Onayı, -₺2.0B Hazine Kaybı",
            action: (s) => {
                s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 20);
                s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                s.treasury -= 2000000000;
            }
        },
        {
            name: "Cemaat İttifakı ile Kemalist Tasfiye",
            desc: "Dini cemaatler ve muhafazakar kanaat önderleriyle ittifak kurarak ordu, yargı ve bürokrasideki Kemalist klikleri tasfiye etme operasyonu başlat.",
            costType: "pc",
            costVal: 35,
            condition: (s) => s.regimeWatch.cemaatler.favor >= 65 && s.voterGroups.religious.approval >= 65 && (!s.activePurge || !s.activePurge.target),
            conditionText: "Cemaat İlişkisi >= %65, Dindar Seçmen Onayı >= %65 ve Aktif Tasfiye Olmamalı",
            effectsDesc: "4 Çeyrek sürecek Tasfiye Operasyonu başlatır. Başarı durumunda: Kemalist Bürokrasi Nüfuzu -70%, Cemaat İlişkisi +25, Dindar seçmen desteği +30.",
            action: (s) => {
                startPurgeOperation("kemalist_burokrasi", ["cemaatler"]);
            }
        }
    ],
    buyuk_sermaye: [
        {
            name: "Sıkı Para Politikası",
            desc: "Enflasyonu düşürmek amacıyla faiz artırımı ve kamu harcamalarında kesintiye git.",
            costType: "pc",
            costVal: 10,
            effectsDesc: "+20 Büyük Sermaye İlişkisi, -10 İşçi Seçmen Onayı, -10 Çiftçi Seçmen Onayı, -8 Enflasyon, +8 Ekonomi",
            action: (s) => {
                s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 10);
                s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 10);
                s.systems.inflation = Math.max(0, s.systems.inflation - 8);
                s.systems.economy = Math.min(100, s.systems.economy + 8);
            }
        },
        {
            name: "Sanayi Holding Teşvikleri",
            desc: "Büyük holdingler ve ihracatçı firmalar için vergi muafiyetleri ve düşük faizli kredi paketleri açıkla.",
            costType: "pc",
            costVal: 8,
            effectsDesc: "+15 Büyük Sermaye İlişkisi, +8 Ekonomi, +8 Yolsuzluk",
            action: (s) => {
                s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                s.systems.economy = Math.min(100, s.systems.economy + 8);
                s.systems.corruption = Math.min(100, s.systems.corruption + 8);
            }
        },
        {
            name: "TÜSİAD Sermayesini Kamulaştır/Tasfiye Et",
            desc: "Solcu sendikalar ve işçi tabanıyla anlaşarak büyük sermayeyi kamulaştırma ve tasfiye operasyonu başlat.",
            costType: "pc",
            costVal: 35,
            condition: (s) => s.voterGroups.leftists.approval >= 65 && s.voterGroups.workers.approval >= 65 && (!s.activePurge || !s.activePurge.target),
            conditionText: "Sol Seçmen Onayı >= %65, İşçi Seçmen Onayı >= %65 ve Aktif Tasfiye Olmamalı",
            effectsDesc: "4 Çeyrek sürecek Tasfiye Operasyonu başlatır. Başarı durumunda: Büyük Sermaye Nüfuzu -70%, İşçi Onayı +35, Hazineye +₺8.0B.",
            action: (s) => {
                startPurgeOperation("buyuk_sermaye", []);
            }
        }
    ],
    super_nato: [
        {
            name: "Yeni Askeri Üs Mutabakatı",
            desc: "Bölgesel güvenliği artırmak amacıyla NATO müttefiklerine yeni askeri üs kullanım izinleri sağla.",
            costType: "pc",
            costVal: 15,
            effectsDesc: "+25 Süper NATO İlişkisi, -15 Sol Seçmen Onayı, +10 Güvenlik",
            action: (s) => {
                s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 25);
                s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                s.systems.security = Math.min(100, s.systems.security + 10);
            }
        },
        {
            name: "Kontrgerilla Faaliyet İzni",
            desc: "Terörle mücadele kisvesi altında derin kontrgerilla unsurlarına gizli operasyonel serbesti tanı.",
            costType: "pc",
            costVal: 8,
            effectsDesc: "+15 Süper NATO İlişkisi, -10 Özgürlük, +10 Güvenlik, -8 Medya Gücü",
            action: (s) => {
                s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                s.systems.security = Math.min(100, s.systems.security + 10);
                s.systems.media = Math.max(0, s.systems.media - 8);
            }
        },
        {
            name: "Milli Egemenlik Hamlesi: Süper NATO Tasfiyesi",
            desc: "Milli emniyet kadroları ve sol-ulusalcı cepheyle birleşip Gladio cunta hücrelerini ve gizli NATO üslerini temizleme operasyonu başlat.",
            costType: "pc",
            costVal: 35,
            condition: (s) => s.voterGroups.nationalists.approval >= 65 && s.regimeWatch.kemalist_burokrasi.favor >= 65 && (!s.activePurge || !s.activePurge.target),
            conditionText: "Milliyetçi Seçmen >= %65, Kemalist Bürokrasi >= %65 ve Aktif Tasfiye Olmamalı",
            effectsDesc: "4 Çeyrek sürecek Tasfiye Operasyonu başlatır. Başarı durumunda: Süper NATO Nüfuzu -70%, Kemalist Bürokrasi İlişkisi +15, Milliyetçi Onay +20.",
            action: (s) => {
                startPurgeOperation("super_nato", ["kemalist_burokrasi"]);
            }
        }
    ],
    sebataycilar: [
        {
            name: "Varlık Vergisi Söylentilerini Reddet",
            desc: "Hükümetin büyük sermayeye ve zengin ailelere yönelik ek bir servet vergisi getirmeyeceğini taahhüt et.",
            costType: "pc",
            costVal: 8,
            effectsDesc: "+15 Sebataycı İlişkisi, -10 Sol Seçmen Onayı, +10 Liberal Seçmen Onayı",
            action: (s) => {
                s.regimeWatch.sebataycilar.favor = Math.min(100, s.regimeWatch.sebataycilar.favor + 15);
                s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 10);
                s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
            }
        },
        {
            name: "Kültürel Vakıflara Sponsorluk",
            desc: "Seküler elitlerin yönettiği sanat vakıflarına, festivallere ve kültürel miras projelerine hazineden fon sağla.",
            costType: "treasury",
            costVal: 1000000000,
            effectsDesc: "+15 Sebataycı İlişkisi, +10 Üniversite & Akademi Onayı, +8 Özgürlük, -₺1.0B Hazine Kaybı",
            action: (s) => {
                s.regimeWatch.sebataycilar.favor = Math.min(100, s.regimeWatch.sebataycilar.favor + 15);
                s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 10);
                s.systems.freedom = Math.min(100, s.systems.freedom + 8);
                s.treasury -= 1000000000;
            }
        },
        {
            name: "Medya ve Kültür Tekelini Tasfiye Et",
            desc: "Muhafazakar yayın devleri ve cemaatlerle anlaşarak seküler elit ailelerin medya ve kültür tekellerini tasfiye etme operasyonu başlat.",
            costType: "pc",
            costVal: 35,
            condition: (s) => s.voterGroups.conservatives.approval >= 65 && s.regimeWatch.cemaatler.favor >= 65 && (!s.activePurge || !s.activePurge.target),
            conditionText: "Muhafazakar Seçmen Onayı >= %65, Cemaat İlişkisi >= %65 ve Aktif Tasfiye Olmamalı",
            effectsDesc: "4 Çeyrek sürecek Tasfiye Operasyonu başlatır. Başarı durumunda: Sebataycı Nüfuzu -70%, Cemaat İlişkisi +25, Muhafazakar onay +25, Hazineye +₺4.0B.",
            action: (s) => {
                startPurgeOperation("sebataycilar", ["cemaatler"]);
            }
        }
    ]
};

export function renderRegimeWatchCenter() {
    const grid = doc("regime-watch-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!state.regimeWatch) return;

    for (const key in state.regimeWatch) {
        const faction = state.regimeWatch[key];
        
        let statusText = "NÖTR";
        let statusClass = "status-neutral";
        if (faction.favor >= 70) {
            statusText = "MÜTTEFİK";
            statusClass = "status-ally";
        } else if (faction.favor <= 30) {
            statusText = "TEHDİT";
            statusClass = "status-threat";
        }

        let factionColor = "var(--color-gold)";
        if (key === "cemaatler") factionColor = "var(--color-religious)";
        else if (key === "kemalist_burokrasi") factionColor = "var(--color-secular)";
        else if (key === "buyuk_sermaye") factionColor = "var(--color-business)";
        else if (key === "super_nato") factionColor = "var(--color-nationalist)";
        else if (key === "sebataycilar") factionColor = "var(--color-liberal)";

        let favorBarClass = "bar-medium";
        if (faction.favor >= 70) favorBarClass = "bar-good";
        else if (faction.favor <= 30) favorBarClass = "bar-bad";

        let influenceBarClass = "bar-medium";
        if (faction.influence >= 70) influenceBarClass = "bar-bad";
        else if (faction.influence <= 30) influenceBarClass = "bar-good";

        const card = document.createElement("div");
        card.className = "faction-card-premium";
        card.style.setProperty("--faction-color", factionColor);
        card.addEventListener("click", () => {
            showFactionDetailModal(key);
        });

        card.innerHTML = `
            <div>
                <div class="faction-header">
                    <i data-lucide="${faction.icon}"></i>
                    <span class="faction-name">${faction.name}</span>
                </div>
                <div class="faction-status-tag ${statusClass}">${statusText}</div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: auto;">
                <div class="metric-row">
                    <div class="metric-label">
                        <span>İlişki (Favor):</span>
                        <strong>%${faction.favor}</strong>
                    </div>
                    <div class="progress-bar-wrapper-premium" style="height: 6px;">
                        <div class="progress-bar-premium ${favorBarClass}" style="width: ${faction.favor}%;"></div>
                    </div>
                </div>
                
                <div class="metric-row">
                    <div class="metric-label">
                        <span>Nüfuz (Influence):</span>
                        <strong>%${faction.influence}</strong>
                    </div>
                    <div class="progress-bar-wrapper-premium" style="height: 6px;">
                        <div class="progress-bar-premium ${influenceBarClass}" style="width: ${faction.influence}%;"></div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
    renderActivePurge();
    renderActiveDemand();
}

export function showFactionDetailModal(factionKey) {
    const faction = state.regimeWatch[factionKey];
    if (!faction) return;

    doc("faction-detail-name").textContent = faction.name;
    doc("faction-detail-desc").textContent = faction.desc;

    const iconLarge = doc("faction-detail-icon");
    if (iconLarge) {
        iconLarge.setAttribute("data-lucide", faction.icon);
    }

    let factionColor = "var(--color-gold)";
    if (factionKey === "cemaatler") factionColor = "var(--color-religious)";
    else if (factionKey === "kemalist_burokrasi") factionColor = "var(--color-secular)";
    else if (factionKey === "buyuk_sermaye") factionColor = "var(--color-business)";
    else if (factionKey === "super_nato") factionColor = "var(--color-nationalist)";
    else if (factionKey === "sebataycilar") factionColor = "var(--color-liberal)";

    const iconWrapper = doc("faction-detail-icon-wrapper");
    if (iconWrapper) {
        iconWrapper.style.borderColor = factionColor;
        iconWrapper.style.background = `rgba(${factionKey === "cemaatler" ? "100, 90, 153" : factionKey === "kemalist_burokrasi" ? "91, 132, 177" : factionKey === "buyuk_sermaye" ? "61, 140, 103" : factionKey === "super_nato" ? "163, 56, 53" : "59, 156, 156"}, 0.15)`;
    }
    if (iconLarge) {
        iconLarge.style.color = factionColor;
    }

    let statusText = "NÖTR";
    let statusClass = "status-neutral";
    let passiveDesc = "Bu hizip şu anda pasif durumda. Yönetiminize ne destek veriyor ne de köstek oluyor.";
    let isThreat = false;

    if (faction.favor >= 70) {
        statusText = "MÜTTEFİK";
        statusClass = "status-ally";
        isThreat = false;
        
        if (factionKey === "cemaatler") {
            passiveDesc = "Cemaat tabanındaki güçlü desteğiniz sayesinde Muhafazakar ve Dindar seçmen grubu memnuniyeti her tur pasif olarak artıyor (+3%).";
        } else if (factionKey === "kemalist_burokrasi") {
            passiveDesc = "Devlet bürokrasisi ile sağlanan tam uyum sayesinde ülke genelinde Hükümet İstikrarı (+1) ve Güvenlik (+1) her tur artıyor.";
        } else if (factionKey === "buyuk_sermaye") {
            passiveDesc = "Büyük şirketlerin güveni sayesinde Yatırım Ortamı güçleniyor. Ekonomi (+1) artarken, Hazine'ye her tur ekstra ₺100M kaynak girişi sağlanıyor.";
        } else if (factionKey === "super_nato") {
            passiveDesc = "Müttefik derin kliklerin desteğiyle Güvenlik (+2) artıyor, ancak artan operasyonel baskı nedeniyle Özgürlükler (-1) kısıtlanıyor.";
        } else if (factionKey === "sebataycilar") {
            passiveDesc = "Kültür-sanat ve medya seçkinlerinin desteğiyle Seküler seçmenlerin onayı (+3%) ve Medya kontrolü (+2) her tur yükseliyor.";
        }
    } else if (faction.favor <= 30) {
        statusText = "TEHDİT";
        statusClass = "status-threat";
        isThreat = true;

        if (factionKey === "cemaatler") {
            passiveDesc = "Cemaatlerin düşmanlığı Muhafazakar seçmen onayını her tur pasif olarak düşürüyor (-3%) ve ordu/güvenlik içindeki cemaatçiler vasıtasıyla darbe hazırlıklarını körüklüyor.";
        } else if (factionKey === "kemalist_burokrasi") {
            passiveDesc = "Bürokrasi ve yargı içindeki Kemalist direnç nedeniyle Hükümet İstikrarı geriliyor (-2) ve yargı vesayeti kumpası (yargısal darbe) riski tırmanıyor.";
        } else if (factionKey === "buyuk_sermaye") {
            passiveDesc = "Büyük sermayenin hükümetinize karşı güvensizliği sermaye kaçışı ve ekonomik yavaşlamaya yol açıyor. Ekonomi her tur zayıflıyor (-2).";
        } else if (factionKey === "super_nato") {
            passiveDesc = "Süper NATO kliklerinin hedefe koyduğu yönetiminizde Hükümet İstikrarı düşüyor (-1), gizli belgelerin sızdırılmasıyla Siyasi Sermaye (PC) kaybı tetikleniyor.";
        } else if (factionKey === "sebataycilar") {
            passiveDesc = "Seküler zengin elitlerin kontrolündeki medya organları hükümetinize karşı yıpratma kampanyaları yürütüyor. Seküler seçmen onayı (-3%) ve Medya gücü (-2) her tur geriliyor.";
        }
    }

    const statusPill = doc("faction-detail-status");
    if (statusPill) {
        statusPill.textContent = statusText;
        statusPill.className = `faction-status-pill ${statusClass}`;
    }

    doc("faction-detail-favor-val").textContent = `%${faction.favor}`;
    doc("faction-detail-influence-val").textContent = `%${faction.influence}`;

    const favorBar = doc("faction-detail-favor-bar");
    if (favorBar) {
        favorBar.style.width = `${faction.favor}%`;
        favorBar.className = "progress-bar-premium " + (faction.favor >= 70 ? "bar-good" : faction.favor <= 30 ? "bar-bad" : "bar-medium");
    }

    const influenceBar = doc("faction-detail-influence-bar");
    if (influenceBar) {
        influenceBar.style.width = `${faction.influence}%`;
        influenceBar.className = "progress-bar-premium " + (faction.influence >= 70 ? "bar-bad" : faction.influence <= 30 ? "bar-good" : "bar-medium");
    }

    const passiveBox = doc("faction-passive-effects-box");
    if (passiveBox) {
        if (isThreat) {
            passiveBox.className = "faction-passive-effects threat-active";
        } else {
            passiveBox.className = "faction-passive-effects";
        }
    }
    doc("faction-detail-passive-desc").textContent = passiveDesc;

    const bargainContainer = doc("bargain-options-container");
    bargainContainer.innerHTML = "";

    const bargains = factionBargains[factionKey];
    if (bargains) {
        bargains.forEach((bargain, idx) => {
            const card = document.createElement("div");
            card.className = "bargain-card";

            let costHtml = "";
            let canAfford = true;
            if (bargain.costType === "pc") {
                costHtml = `<i data-lucide="zap" style="color: var(--color-gold-text);"></i> ${bargain.costVal} PC`;
                canAfford = state.politicalCapital >= bargain.costVal;
            } else if (bargain.costType === "treasury") {
                costHtml = `<i data-lucide="landmark" style="color: var(--color-navy-text);"></i> ₺${(bargain.costVal / 1000000000).toFixed(1)}B`;
                canAfford = state.treasury >= bargain.costVal;
            }

            // Check dynamic condition
            let meetsCondition = true;
            let conditionHtml = "";
            if (bargain.condition) {
                meetsCondition = bargain.condition(state);
                const color = meetsCondition ? "var(--color-green-text)" : "var(--color-danger)";
                conditionHtml = `<div style="font-size: 0.65rem; color: ${color}; margin-bottom: 4px; font-family: var(--font-mono); text-align: right; text-transform: uppercase;">GEREKSİNİM: ${bargain.conditionText}</div>`;
            }

            card.innerHTML = `
                <div class="bargain-info">
                    <span class="bargain-name">${bargain.name}</span>
                    <span class="bargain-desc">${bargain.desc}</span>
                    <span class="bargain-effects">${bargain.effectsDesc}</span>
                </div>
                <div class="bargain-cost-action" style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                    ${conditionHtml}
                    <span class="bargain-cost" style="margin-bottom: 2px;">${costHtml}</span>
                    <button class="btn-primary btn-bargain" ${canAfford && meetsCondition ? "" : "disabled"} id="btn-bargain-${factionKey}-${idx}">ANLAŞMAYI İMZALA</button>
                </div>
            `;
            bargainContainer.appendChild(card);

            const actionBtn = doc(`btn-bargain-${factionKey}-${idx}`);
            if (actionBtn && canAfford && meetsCondition) {
                actionBtn.addEventListener("click", () => {
                    processBargain(factionKey, idx);
                });
            }
        });
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }

    doc("modal-regime-watch-detail").classList.remove("hidden");
    if (typeof playUiSound === "function") playUiSound("click");
}

export function processBargain(factionKey, index) {
    const faction = state.regimeWatch[factionKey];
    const bargains = factionBargains[factionKey];
    if (!faction || !bargains) return;

    const bargain = bargains[index];
    if (!bargain) return;

    if (bargain.condition && !bargain.condition(state)) {
        alert(`Gereksinimler karşılanmadı: ${bargain.conditionText}`);
        return;
    }

    if (bargain.costType === "pc") {
        if (state.politicalCapital < bargain.costVal) {
            alert(`Yetersiz Siyasi Sermaye! Bu anlaşma için ${bargain.costVal} PC gerekiyor.`);
            return;
        }
        state.politicalCapital -= bargain.costVal;
    } else if (bargain.costType === "treasury") {
        if (state.treasury < bargain.costVal) {
            alert(`Yetersiz Bütçe! Bu anlaşma için ₺${(bargain.costVal / 1000000000).toFixed(1)}B gerekiyor.`);
            return;
        }
        state.treasury -= bargain.costVal;
    }

    bargain.action(state);

    for (const key in state.regimeWatch) {
        state.regimeWatch[key].favor = Math.max(0, Math.min(100, state.regimeWatch[key].favor));
        state.regimeWatch[key].influence = Math.max(0, Math.min(100, state.regimeWatch[key].influence));
    }
    for (const key in state.voterGroups) {
        state.voterGroups[key].approval = Math.max(0, Math.min(100, state.voterGroups[key].approval));
    }
    for (const key in state.systems) {
        state.systems[key] = Math.max(0, Math.min(100, state.systems[key]));
    }

    logMessage(`KOMPLO/PAZARLIK: ${faction.name} ile "${bargain.name}" anlaşması yapıldı.`);

    updateDashboard();
    
    doc("modal-regime-watch-detail").classList.add("hidden");

    alert(`"${bargain.name}" anlaşması imzalandı.`);
    if (typeof playUiSound === "function") playUiSound("budget_change");
}

export function startPurgeOperation(targetKey, alliesKeys) {
    state.activePurge = {
        target: targetKey,
        stage: 1,
        allies: alliesKeys || [],
        evidenceQuality: 10 + Math.round(Math.random() * 15),
        publicPrep: 10 + Math.round(Math.random() * 15)
    };
    logMessage(`TASFİYE SÜRECİ BAŞLADI: ${state.regimeWatch[targetKey].name} grubuna karşı operasyon hazırlıkları 1. Aşama ile başlatıldı.`);
    updateDashboard();
}

export function getPurgeSuccessChance(p) {
    if (!p || !p.target) return 0;
    const target = p.target;
    const faction = state.regimeWatch[target];

    let powerBaseVal = 50;
    if (target === "cemaatler") powerBaseVal = state.powerCenters.public.approval;
    else if (target === "kemalist_burokrasi") powerBaseVal = state.powerCenters.military.approval;
    else if (target === "buyuk_sermaye") powerBaseVal = state.powerCenters.business.approval;
    else if (target === "super_nato") powerBaseVal = state.systems.security;
    else if (target === "sebataycilar") powerBaseVal = state.powerCenters.media.approval;

    const resistance = Math.round((faction.influence * 0.7) + (powerBaseVal * 0.3));

    const jud = state.powerCenters.judiciary.approval;
    const med = state.powerCenters.media.approval;
    const sec = state.systems.security;
    const pub = state.powerCenters.public.approval;
    const avgSupport = (jud + med + sec + pub) / 4;

    const prep = (p.evidenceQuality + p.publicPrep) / 2;

    let successChance = Math.round((avgSupport * 0.4) + (prep * 0.65) - (resistance * 0.35));
    successChance = Math.max(10, Math.min(95, successChance));
    return successChance;
}

export function renderActivePurge() {
    const panel = doc("active-purge-panel");
    if (!panel) return;

    const p = state.activePurge;
    if (!p || !p.target) {
        panel.classList.add("hidden");
        return;
    }

    panel.classList.remove("hidden");
    const targetFaction = state.regimeWatch[p.target];
    const successChance = getPurgeSuccessChance(p);

    let stageText = "";
    if (p.stage === 1) stageText = "Aşama 1/4: İstihbarat Toplama";
    else if (p.stage === 2) stageText = "Aşama 2/4: Delil Toplama";
    else if (p.stage === 3) stageText = "Aşama 3/4: Kamuoyu Hazırlığı";
    else if (p.stage === 4) stageText = "Aşama 4/4: Karar ve İnfaz";

    const alliesNames = p.allies.map(key => state.regimeWatch[key] ? state.regimeWatch[key].name : key).join(", ");
    const alliesDisplay = alliesNames ? `<span style="color: var(--color-green-text); font-weight:600;">${alliesNames}</span>` : `<span style="color: var(--text-muted);">Müttefik Yok</span>`;

    let buttonHtml = "";
    if (p.stage === 4) {
        buttonHtml = `
            <button class="btn-primary" id="btn-execute-purge" style="background: var(--color-danger); border-color: var(--color-danger); color: white; padding: 6px 14px; font-size: 0.75rem; font-weight:700;">OPERASYONU BAŞLAT (%${successChance} Başarı)</button>
        `;
    } else {
        buttonHtml = `
            <span style="font-size: 0.7rem; color: var(--text-muted); font-style: italic;"><i data-lucide="clock" style="width:12px; height:12px; vertical-align:middle;"></i> Bir sonraki çeyrekte operasyon ilerleyecek...</span>
        `;
    }

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
                <h4 style="color: var(--color-red-text); margin: 0; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px;"><i data-lucide="shield-alert" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> AKTİF TASFİYE OPERASYONU</h4>
                <div style="font-size: 0.75rem; color: var(--text-primary); margin-top: 2px;">
                    Hedef: <strong style="color: var(--color-gold-text);">${targetFaction.name}</strong>
                </div>
            </div>
            <div style="text-align: right;">
                <span class="badge" style="background: rgba(158, 42, 43, 0.2); border: 1px solid var(--color-danger); color: var(--color-red-text); font-size: 0.65rem; padding: 2px 6px; border-radius: 3px; font-family: var(--font-mono); font-weight:600;">${stageText}</span>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 10px 0;">
            <div class="metric-row">
                <div class="metric-label" style="font-size: 0.7rem;">
                    <span>Kanıt Kalitesi:</span>
                    <strong>%${p.evidenceQuality}</strong>
                </div>
                <div class="progress-bar-wrapper-premium" style="height: 5px;">
                    <div class="progress-bar-premium" style="width: ${p.evidenceQuality}%; background: var(--color-blue-text);"></div>
                </div>
            </div>
            <div class="metric-row">
                <div class="metric-label" style="font-size: 0.7rem;">
                    <span>Kamuoyu Desteği:</span>
                    <strong>%${p.publicPrep}</strong>
                </div>
                <div class="progress-bar-wrapper-premium" style="height: 5px;">
                    <div class="progress-bar-premium" style="width: ${p.publicPrep}%; background: var(--color-gold);"></div>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px; font-size: 0.7rem;">
            <div>
                <span>İttifak: ${alliesDisplay}</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button id="btn-cancel-purge" style="background: transparent; border: 1px solid rgba(255,255,255,0.15); color: var(--text-muted); padding: 4px 10px; border-radius: 3px; cursor: pointer; font-size: 0.65rem;">İptal Et</button>
                ${buttonHtml}
            </div>
        </div>
    `;

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const cancelBtn = doc("btn-cancel-purge");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            if (confirm("Tasfiye operasyonunu iptal etmek istediğinizden emin misiniz? Bütün ilerleme kaybolacak.")) {
                state.activePurge = { target: null, stage: 0, allies: [], evidenceQuality: 0, publicPrep: 0 };
                logMessage("TASFİYE İPTAL: Tasfiye operasyonu iptal edildi.");
                updateDashboard();
            }
        });
    }

    const executeBtn = doc("btn-execute-purge");
    if (executeBtn) {
        executeBtn.addEventListener("click", () => {
            executePurgeFinalDecision();
        });
    }
}

export function renderActiveDemand() {
    const panel = doc("active-demand-panel");
    if (!panel) return;

    const d = state.activeDemand;
    if (!d) {
        panel.classList.add("hidden");
        return;
    }

    panel.classList.remove("hidden");
    const faction = state.regimeWatch[d.faction];
    const quartersRemaining = d.deadline - state.turn;
    
    // Policy name mapping
    const policyNames = {
        religious_edu: "Din Eğitimi Ağırlığı",
        censorship: "Medya Sansürü",
        minority_rights: "Azınlık Hakları",
        corporate_tax: "Kurumlar Vergisi",
        income_tax: "Gelir Vergisi",
        police_funding: "Emniyet/Polis Bütçesi",
        border_control: "Sınır Kontrolü",
        education_budget: "Eğitim Bütçesi"
    };
    
    const policyName = policyNames[d.target] || d.target;
    const currentValue = state.activePolicies[d.target] ?? 0;
    
    let comparisonText = "";
    if (d.op === "gte") comparisonText = `en az %${d.value}`;
    else if (d.op === "lte") comparisonText = `en fazla %${d.value}`;
    else if (d.op === "null") comparisonText = "kaldırılmasını";

    let valueDisplay = `<span style="color: var(--color-gold-text); font-weight:600;">%${currentValue}</span> / %${d.value}`;
    let progressPct = 0;
    if (d.op === "gte") {
        progressPct = Math.min(100, Math.max(0, (currentValue / d.value) * 100));
    } else if (d.op === "lte") {
        progressPct = currentValue <= d.value ? 100 : Math.min(100, Math.max(0, (d.value / currentValue) * 100));
    }
    
    const factionName = faction ? faction.name : d.faction;
    const iconName = faction ? faction.icon : "shield-alert";
    
    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
                <h4 style="color: var(--color-gold-text); margin: 0; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px;"><i data-lucide="${iconName}" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px; color: var(--color-gold);"></i> AKTİF YASA TALEBİ</h4>
                <div style="font-size: 0.75rem; color: var(--text-primary); margin-top: 2px;">
                    Grup: <strong style="color: var(--color-gold-text);">${factionName}</strong>
                </div>
            </div>
            <div style="text-align: right;">
                <span class="badge" style="background: rgba(222, 135, 12, 0.2); border: 1px solid var(--color-gold); color: var(--color-gold-text); font-size: 0.65rem; padding: 2px 6px; border-radius: 3px; font-family: var(--font-mono); font-weight:600;">SÜRE: ${quartersRemaining} ÇEYREK</span>
            </div>
        </div>
        
        <p style="font-size: 0.75rem; color: #e3dcd5; margin: 6px 0; font-style: italic; line-height:1.3;">
            "${d.text}"
        </p>

        <div style="margin: 8px 0 4px 0;">
            <div class="metric-label" style="font-size: 0.7rem; display:flex; justify-content:space-between; margin-bottom: 3px;">
                <span>Mevcut Seviye / Talep (${policyName}):</span>
                <strong>${valueDisplay}</strong>
            </div>
            <div class="progress-bar-wrapper-premium" style="height: 5px;">
                <div class="progress-bar-premium" style="width: ${progressPct}%; background: var(--color-gold);"></div>
            </div>
        </div>
        
        <div style="font-size: 0.65rem; color: var(--text-muted); border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 6px; margin-top: 6px; display:flex; justify-content:space-between;">
            <span>Yerine getirilirse: İlişki +20, İstikrar +5, PC +8</span>
            <span style="color: var(--color-red-text); font-weight: 600;">Başarısız olursa: İlişki -25</span>
        </div>
    `;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

export function executePurgeFinalDecision() {
    const p = state.activePurge;
    if (!p || !p.target) return;

    const target = p.target;
    const faction = state.regimeWatch[target];
    const successChance = getPurgeSuccessChance(p);
    const roll = Math.floor(Math.random() * 100);

    const success = roll < successChance;

    if (success) {
        faction.influence = Math.max(5, Math.round(faction.influence * 0.3));
        faction.favor = 0;
        faction.plotProgress = 0;

        p.allies.forEach(allyKey => {
            const ally = state.regimeWatch[allyKey];
            if (ally) {
                ally.favor = Math.min(100, ally.favor + 25);
                ally.influence = Math.min(95, ally.influence + 20);
            }
        });

        if (target === "cemaatler") {
            state.voterGroups.secular.approval = Math.min(100, state.voterGroups.secular.approval + 30);
            state.voterGroups.religious.approval = Math.max(0, state.voterGroups.religious.approval - 40);
            state.voterGroups.conservatives.approval = Math.max(0, state.voterGroups.conservatives.approval - 25);
            state.systems.security = Math.min(100, state.systems.security + 20);
            state.systems.freedom = Math.max(0, state.systems.freedom - 15);
            state.stability = Math.min(100, state.stability + 10);
            state.logs.push("BÜYÜK CEMAAT TASFİYESİ BAŞARILI: TSK ve laik kadrolarla yapılan gizli anlaşma uyarınca tarikatların devlet hücreleri çökertildi!");
        } else if (target === "kemalist_burokrasi") {
            state.voterGroups.religious.approval = Math.min(100, state.voterGroups.religious.approval + 30);
            state.voterGroups.secular.approval = Math.max(0, state.voterGroups.secular.approval - 45);
            state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 35);
            state.systems.corruption = Math.min(100, state.systems.corruption + 15);
            state.systems.freedom = Math.max(0, state.systems.freedom - 10);
            state.logs.push("KEMALİST KADROLARIN TASFİYESİ BAŞARILI: Dini cemaatler ile koordineli bir tasfiye dalgasıyla laik cumhuriyetçi bürokrasi çökertildi!");
        } else if (target === "buyuk_sermaye") {
            state.voterGroups.workers.approval = Math.min(100, state.voterGroups.workers.approval + 35);
            state.voterGroups.leftists.approval = Math.min(100, state.voterGroups.leftists.approval + 30);
            state.voterGroups.business.approval = Math.max(0, state.voterGroups.business.approval - 50);
            state.systems.economy = Math.max(0, state.systems.economy - 20);
            state.stability = Math.max(0, state.stability - 15);
            state.treasury += 8000000000;
            state.logs.push("BÜYÜK SERMAYE KAMULAŞTIRMASI BAŞARILI: Sol ittifakın talebiyle TÜSİAD üyesi dev holdinglerin mal varlıklarına el konuldu ve kamulaştırıldı!");
        } else if (target === "super_nato") {
            state.voterGroups.nationalists.approval = Math.min(100, state.voterGroups.nationalists.approval + 20);
            state.voterGroups.leftists.approval = Math.min(100, state.voterGroups.leftists.approval + 20);
            state.systems.freedom = Math.min(100, state.systems.freedom + 15);
            state.systems.security = Math.max(0, state.systems.security - 10);
            state.stability = Math.max(0, state.stability - 10);
            state.logs.push("GLADIO TASFİYESİ BAŞARILI: Ulusalcı-milliyetçi ittifakın baskısıyla devlet içerisindeki gizli NATO kontrgerilla yapılanması dağıtıldı!");
        } else if (target === "sebataycilar") {
            state.voterGroups.conservatives.approval = Math.min(100, state.voterGroups.conservatives.approval + 25);
            state.voterGroups.religious.approval = Math.min(100, state.voterGroups.religious.approval + 25);
            state.voterGroups.secular.approval = Math.max(0, state.voterGroups.secular.approval - 35);
            state.powerCenters.media.approval = Math.max(0, state.powerCenters.media.approval - 25);
            state.systems.media = Math.min(100, state.systems.media + 20);
            state.systems.freedom = Math.max(0, state.systems.freedom - 15);
            state.treasury += 4000000000;
            state.logs.push("KÜLTÜREL HEGEMONYANIN TASFİYESİ BAŞARILI: Muhafazakar-cemaat ortaklığıyla, seküler elitlerin holding medya kanalları ve televizyonları kamulaştırıldı!");
        }

        for (const k in state.regimeWatch) {
            state.regimeWatch[k].influence = Math.max(5, Math.min(95, state.regimeWatch[k].influence));
        }

        alert(`OPERASYON BAŞARILI!\n\n${faction.name} tasfiye edildi. Kadroları temizlendi, güç dengeleri yeniden yapılandırıldı.`);
    } else {
        faction.favor = 15;
        const penalty = Math.round(10 + Math.random() * 15);
        state.stability = Math.max(0, state.stability - penalty);
        faction.plotProgress = 70;

        state.logs.push(`TASFİYE OPERASYONU BAŞARISIZ OLDU: ${faction.name} grubuna karşı yürütülen operasyon delil yetersizliği veya sızıntılar nedeniyle çöktü! Hükümet istikrarı geriledi (-%${penalty}), hedef grup gizli faaliyetlerini hızlandırdı (Komplo İlerlemesi: %70).`);
        
        alert(`OPERASYON BAŞARISIZ!\n\n${faction.name} tasfiye girişimi deşifre oldu veya engellendi! Hedef grup karşı atağa geçti, hükümete darbe planı %70 olgunluğa ulaştı. İstikrar -%${penalty}.`);
    }

    state.activePurge = { target: null, stage: 0, allies: [], evidenceQuality: 0, publicPrep: 0 };
    
    let sum = 0;
    for (const k in state.regimeWatch) {
        sum += state.regimeWatch[k].influence;
    }
    if (sum > 0) {
        for (const k in state.regimeWatch) {
            state.regimeWatch[k].influence = Math.max(5, Math.min(95, Math.round((state.regimeWatch[k].influence / sum) * 210)));
        }
    }

    updateDashboard();
    if (typeof playUiSound === "function") playUiSound("crisis");
}

export function showSecretFileModal(callback) {
    const file = state.secretFile;
    if (!file) {
        if (callback) callback();
        return;
    }

    doc("secret-file-id").textContent = `DOSYA NO: #${file.id}`;
    doc("secret-file-reliability").textContent = `GÜVENİLİRLİK: %${file.reliability}`;
    doc("secret-file-desc").textContent = file.text;

    const btnInvestigate = doc("btn-secret-investigate");
    const btnMonitor = doc("btn-secret-monitor");
    const btnIgnore = doc("btn-secret-ignore");

    btnInvestigate.querySelector(".option-text").textContent = `Dosyayı Kapsamlı Araştır (-15 Siyasi Sermaye)`;
    btnMonitor.querySelector(".option-text").textContent = `Hedefleri Teknik Takibe Al (-8 Siyasi Sermaye)`;
    
    const canInvestigate = state.politicalCapital >= 15;
    const canMonitor = state.politicalCapital >= 8;

    btnInvestigate.disabled = !canInvestigate;
    btnMonitor.disabled = !canMonitor;

    const newBtnInvestigate = btnInvestigate.cloneNode(true);
    const newBtnMonitor = btnMonitor.cloneNode(true);
    const newBtnIgnore = btnIgnore.cloneNode(true);

    btnInvestigate.parentNode.replaceChild(newBtnInvestigate, btnInvestigate);
    btnMonitor.parentNode.replaceChild(newBtnMonitor, btnMonitor);
    btnIgnore.parentNode.replaceChild(newBtnIgnore, btnIgnore);

    newBtnInvestigate.addEventListener("click", () => {
        state.politicalCapital -= 15;
        state.secretFile.status = "investigated";
        const isTrue = state.secretFile.isTrue;
        if (isTrue) {
            alert(`MİT DETAYLI RAPORU:\n\nİstihbarat kesinlikle DOĞRU çıktı! Komplo hazırlığı yapan klikler tespit edilerek çökertildi. (+20 İstikrar, +10 Güvenlik)`);
            state.stability = Math.min(100, state.stability + 20);
            state.systems.security = Math.min(100, state.systems.security + 10);
            logMessage(`MİT DOSYASI ARAŞTIRILDI: "${file.text.substring(0, 30)}..." doğruluğu teyit edildi ve komplo çökertildi. (+20 İstikrar, +10 Güvenlik)`);
        } else {
            alert(`MİT DETAYLI RAPORU:\n\nİstihbaratın ASILSIZ (Yalan) olduğu ortaya çıktı. Boş yere kaynak harcandı ancak tehlike olmadığı kesinleşti.`);
            logMessage(`MİT DOSYASI ARAŞTIRILDI: "${file.text.substring(0, 30)}..." asılsız olduğu ortaya çıktı.`);
        }
        state.secretFile = null;
        doc("modal-secret-file").classList.add("hidden");
        updateDashboard();
        if (callback) callback();
    });

    newBtnMonitor.addEventListener("click", () => {
        state.politicalCapital -= 8;
        state.secretFile.status = "monitored";
        logMessage(`MİT DOSYASI TEKNİK TAKİPTE: Rapor takibe alındı (-8 PC). Sonuç sonraki çeyrekte belli olacak.`);
        doc("modal-secret-file").classList.add("hidden");
        updateDashboard();
        if (callback) callback();
    });

    newBtnIgnore.addEventListener("click", () => {
        state.secretFile.status = "ignored";
        logMessage(`MİT DOSYASI ARŞİVLENDİ: Rapor görmezden gelindi (0 PC).`);
        doc("modal-secret-file").classList.add("hidden");
        updateDashboard();
        if (callback) callback();
    });

    doc("modal-secret-file").classList.remove("hidden");
    if (typeof playUiSound === "function") playUiSound("paper");
}
