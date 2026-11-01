/**
 * ============================================================================
 * TURKEY 2038 - MAIN APPLICATION CODE (COMBINED ENGINE)
 * ============================================================================
 * AUTO-GENERATED BUNDLE FROM MODULAR FILES IN js/ SUBDIRECTORY.
 * DO NOT MODIFY THIS FILE DIRECTLY. EDIT THE FILES IN js/ AND RUN bundle.ps1.
 * ============================================================================
 */


// ==============================
// SECTION: js/state.js
// ==============================

/**
 * TURKEY 2038 - GAME STATE MANAGEMENT
 */

const state = {
    // Game Info
    partyName: "Gelecek Yüzyıl Partisi",
    leaderName: "Lider",
    leaderTrait: "diplomat", // diplomat, economist, reformist, charismatic
    ideology: "technocrat", // technocrat, conservative, kemalist_secular, center_left, liberal, nationalist
    difficulty: "normal", // easy, normal, hard
    turn: 1,
    maxTurns: 16, // quarters to next election (4 years)
    electionCount: 1, // first, second, etc.
    activeCoalition: null, // partner party object or null
    isGameOver: false,
    activePurge: { target: null, stage: 0, allies: [], evidenceQuality: 0, publicPrep: 0 },
    secretFile: null,
    activeDemand: null,
    emergencyContinues: 0,
    decisionEchoes: [],
    
    // Core Resources
    politicalCapital: 100,
    treasury: 40000000000, // ₺40 Billion
    stability: 85, // 0 - 100
    
    // System Indicators (0 to 100)
    systems: {
        economy: 55,
        inflation: 45,
        unemployment: 40,
        happiness: 50,
        security: 60,
        freedom: 50,
        media: 40,
        corruption: 35,
        education: 50
    },

    // System Indicator Trends (-1: down, 0: stable, 1: up)
    trends: {
        economy: 0,
        inflation: 0,
        unemployment: 0,
        happiness: 0,
        security: 0,
        freedom: 0,
        media: 0,
        corruption: 0,
        education: 0
    },

    // Voter Groups: Size (% of population), Approval, Satisfaction, Protest Risk, Expectations & Orientations
    voterGroups: {
        conservatives: { size: 14, approval: 50, satisfaction: 50, protestRisk: 10, economicExpectation: "Düşük enflasyon, sosyal konut desteği", politicalOrientation: "Sağ / Muhafazakar" },
        secular:       { size: 14, approval: 45, satisfaction: 45, protestRisk: 15, economicExpectation: "Kur istikrarı, bilim & Ar-Ge yatırımı", politicalOrientation: "Kemalist / Sosyal Dem." },
        nationalists:  { size: 10, approval: 50, satisfaction: 50, protestRisk: 12, economicExpectation: "Milli savunma sanayii teşvikleri", politicalOrientation: "Sağ Milliyetçi" },
        leftists:      { size: 7,  approval: 35, satisfaction: 40, protestRisk: 25, economicExpectation: "Sendikal haklar, servet vergisi", politicalOrientation: "Sol / Sosyalist" },
        liberals:      { size: 4,  approval: 45, satisfaction: 48, protestRisk: 10, economicExpectation: "Vergi indirimi, özelleştirme", politicalOrientation: "Merkez Sağ Liberal" },
        kurds:         { size: 8,  approval: 30, satisfaction: 35, protestRisk: 28, economicExpectation: "Bölgesel kalkınma yatırımları", politicalOrientation: "Etnik / Sol" },
        immigrants:    { size: 3,  approval: 65, satisfaction: 60, protestRisk: 5,  economicExpectation: "Sosyal yardımlar, çalışma izinleri", politicalOrientation: "Hükümet Yanlısı" },
        business:      { size: 3,  approval: 55, satisfaction: 50, protestRisk: 5,  economicExpectation: "Ucuz kredi, düşük vergi oranları", politicalOrientation: "Serbest Piyasa Yanlısı" },
        students:      { size: 5,  approval: 40, satisfaction: 35, protestRisk: 30, economicExpectation: "Burslar, KYK yurtları, iş imkanları", politicalOrientation: "Seküler / İlerici" },
        retirees:      { size: 7,  approval: 45, satisfaction: 40, protestRisk: 10, economicExpectation: "Yüksek maaş zamları, sağlık indirimi", politicalOrientation: "Gelenekselci / Nötr" },
        workers:       { size: 8,  approval: 40, satisfaction: 45, protestRisk: 20, economicExpectation: "Asgari ücret zammı, kıdem tazminatı", politicalOrientation: "Sosyalist / Milliyetçi" },
        farmers:       { size: 6,  approval: 50, satisfaction: 45, protestRisk: 15, economicExpectation: "Mazot, gübre ve yem destekleri", politicalOrientation: "Muhafazakar / Kırsal" },
        civil_servants:{ size: 5,  approval: 45, satisfaction: 50, protestRisk: 8,  economicExpectation: "Enflasyona ezdirilmeyen maaş", politicalOrientation: "Kemalist / Muhafazakar" },
        youth:         { size: 4,  approval: 35, satisfaction: 30, protestRisk: 26, economicExpectation: "ÖTV'siz teknoloji, özgür internet", politicalOrientation: "Apollitik / İlerici" },
        religious:     { size: 2,  approval: 60, satisfaction: 55, protestRisk: 5,  economicExpectation: "Faizsiz finans, Diyanet bütçesi", politicalOrientation: "İslamcı / Geleneksel" }
    },

    // Cabinet Minister System
    cabinet: {
        economy: { name: "Selin Yılmaz", competence: 80, ideology: "liberal", ideologyLabel: "Liberal", loyalty: 85, popularity: 60, corruption: 10, reform: 75 },
        interior: { name: "Murat Karahan", competence: 75, ideology: "nationalist", ideologyLabel: "Milliyetçi", loyalty: 90, popularity: 70, corruption: 15, reform: 50 },
        foreign: { name: "Ayla Soylu", competence: 85, ideology: "technocrat", ideologyLabel: "Merkez", loyalty: 95, popularity: 75, corruption: 5, reform: 60 },
        defense: { name: "Volkan Arslan", competence: 70, ideology: "nationalist", ideologyLabel: "Milliyetçi", loyalty: 85, popularity: 65, corruption: 12, reform: 40 },
        education: { name: "Filiz Erol", competence: 50, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 80, popularity: 40, corruption: 20, reform: 30 },
        health: { name: "Levent Öztürk", competence: 65, ideology: "technocrat", ideologyLabel: "Merkez", loyalty: 75, popularity: 55, corruption: 25, reform: 55 },
        justice: { name: "Elif Bulut", competence: 55, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 85, popularity: 45, corruption: 18, reform: 35 }
    },

    // Active Policy Settings
    // Maps policy.id -> slider value (0 to 100) or null if repealed/not enacted
    activePolicies: {
        income_tax: 25,
        corporate_tax: 20,
        automation_subsidy: null,
        carbon_tax: null,
        censorship: 10,
        minority_rights: 30,
        police_funding: 50,
        religious_edu: 30,
        ubi: null,
        healthcare_priv: 20,
        education_budget: 40,
        pension_age: 60,
        // Extended policies
        migrant_repatriation: null,
        border_control: 30,
        nuclear_plants: null,
        imf_cooperation: null,
        defense_alliances: 40,
        women_safety: 40,
        internet_freedom: 50,
        laiklik_abolition: null,
        capital_punishment: null,
        state_emergency: null,
        wealth_tax: null,
        ban_religious_sects: null,
        multilateral_law: null,
        // Radical policies
        decree_rule: null,
        ban_parties: null,
        ignore_courts: null,
        political_amnesty: null,
        conscription_extend: null,
        private_militia: null,
        mass_surveillance: null,
        end_cb_independence: null,
        land_reform: null,
        ban_crypto: null,
        mandatory_ottoman: null,
        end_uni_autonomy: null,
        state_media_monopoly: null,
        nato_exit: null,
        shanghai_membership: null,
        seize_foreign_assets: null,
        privatize_water: null,
        ban_gasoline_cars: null,
        social_media_ban: null,
        worker_strike_ban: null,
        housing_rent_control: null
    },

    // History (for tracking graphs)
    history: {
        turns: [],
        economy: [],
        inflation: [],
        happiness: [],
        stability: [],
        playerPoll: [],
        military: [],
        security: [],
        judiciary: []
    },

    // Power Centers & Regime Stability (Güç Merkezleri)
    powerCenters: {
        public:     { name: "Halk Desteği", approval: 50, influence: 30, trend: 0, loyalty: 50, anger: 50, organization: 45, plot: null, plotProgress: 0 },
        military:   { name: "Ordu Desteği", approval: 70, influence: 25, trend: 0, loyalty: 70, anger: 30, organization: 37, plot: null, plotProgress: 0 },
        security:   { name: "Güvenlik Bürokrasisi", approval: 65, influence: 20, trend: 0, loyalty: 65, anger: 35, organization: 30, plot: null, plotProgress: 0 },
        judiciary:  { name: "Yargı Desteği", approval: 60, influence: 20, trend: 0, loyalty: 60, anger: 40, organization: 30, plot: null, plotProgress: 0 },
        business:   { name: "İş Dünyası", approval: 55, influence: 25, trend: 0, loyalty: 55, anger: 45, organization: 37, plot: null, plotProgress: 0 },
        media:      { name: "Medya Desteği", approval: 50, influence: 20, trend: 0, loyalty: 50, anger: 50, organization: 30, plot: null, plotProgress: 0 },
        academia:   { name: "Üniversite & Akademi", approval: 45, influence: 15, trend: 0, loyalty: 45, anger: 55, organization: 22, plot: null, plotProgress: 0 }
    },

    // Regime Watch Center Factions
    regimeWatch: {
        cemaatler: { name: "Cemaatler & Tarikatlar", favor: 50, influence: 40, icon: "heart-handshake", desc: "Dini cemaat ve tarikat yapılanmaları. Muhafazakar tabanda güçlüler, eğitime ve bürokrasiye nüfuz etmeye çalışırlar.", plotProgress: 0, activeAlliance: null },
        kemalist_burokrasi: { name: "Kemalist Bürokrasi", favor: 50, influence: 50, icon: "building-2", desc: "Laik cumhuriyet elitleri ile yargı ve sivil-askeri bürokrasi kadroları. Devlet geleneklerini ve laik yapıyı savunurlar.", plotProgress: 0, activeAlliance: null },
        buyuk_sermaye: { name: "Büyük Sermaye (TÜSİAD)", favor: 55, influence: 55, icon: "wallet", desc: "Büyük holdingler, finans çevreleri ve sanayiciler. Serbest piyasa, döviz istikrarı ve uluslararası sermaye entegrasyonu odaklıdırlar.", plotProgress: 0, activeAlliance: null },
        super_nato: { name: "Süper NATO (Gladio)", favor: 40, influence: 35, icon: "globe", desc: "NATO yanlısı güvenlik klikleri, derin kontrgerilla unsurları ve Batı yanlısı askeri yapılar. Güvenlik politikalarında belirleyicidirler.", plotProgress: 0, activeAlliance: null },
        sebataycilar: { name: "Sebataycı Seçkinler", favor: 45, influence: 30, icon: "eye", desc: "Geleneksel seküler medya ve kültür dünyasının arkasındaki köklü elit aile ağları. Medya üzerinde ciddi nüfuzları bulunur.", plotProgress: 0, activeAlliance: null }
    },

    // Event Log
    logs: [],

    // Ideology Drift Scores (tracks how player's actions shift ideology)
    ideologyDrift: {
        conservative: 0,
        kemalist_secular: 0,
        center_left: 0,
        liberal: 0,
        nationalist: 0,
        technocrat: 0
    },

    // Active Voter Alliances (formed when multiple groups are angry)
    voterAlliances: [],
    
    // Triggered premium events tracking list
    triggeredPremiumEvents: [],
    
    // New tracking lists for non-repetitive events & reports and choices
    triggeredEvents: [],
    triggeredSecretFiles: [],
    decisions: {}
};

// Available Cabinet Shuffling Candidates Pool
const candidatesPool = [
    // --- EKONOMİ BAKANI ADAYLARI ---
    { id: "cand_econ_1", name: "Banu Yılmaz", title: "Serbest Piyasacı Ekonomist", portfolio: "economy", ideology: "liberal", ideologyLabel: "Liberal", competence: 90, loyalty: 60, popularity: 75, corruption: 20, reform: 85 },
    { id: "cand_econ_2", name: "Cemil Arslan", title: "Sosyal Demokrat İktisatçı", portfolio: "economy", ideology: "secular", ideologyLabel: "Merkez Sol", competence: 85, loyalty: 70, popularity: 68, corruption: 15, reform: 75 },
    { id: "cand_econ_3", name: "Nihal Demir", title: "Devletçi Planlamacı", portfolio: "economy", ideology: "technocrat", ideologyLabel: "Kemalist/Devletçi", competence: 80, loyalty: 85, popularity: 65, corruption: 10, reform: 50 },
    { id: "cand_econ_4", name: "Faruk Karahan", title: "İslamcı Finans Uzmanı", portfolio: "economy", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 72, loyalty: 95, popularity: 58, corruption: 45, reform: 30 },
    { id: "cand_econ_5", name: "Seda Şahin", title: "Kalkınmacı Milliyetçi", portfolio: "economy", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 75, loyalty: 80, popularity: 72, corruption: 25, reform: 45 },
    { id: "cand_econ_6", name: "Eren Özdemir", title: "Teknokrat Bürokrat", portfolio: "economy", ideology: "technocrat", ideologyLabel: "Merkez", competence: 95, loyalty: 75, popularity: 50, corruption: 5, reform: 60 },

    // --- İÇİŞLERİ BAKANI ADAYLARI ---
    { id: "cand_int_1", name: "Bahadır Kaya", title: "Sert Güvenlikçi", portfolio: "interior", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 75, loyalty: 90, popularity: 60, corruption: 35, reform: 20 },
    { id: "cand_int_2", name: "Ahmet Soylu", title: "Muhafazakâr Bürokrat", portfolio: "interior", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 68, loyalty: 95, popularity: 50, corruption: 30, reform: 15 },
    { id: "cand_int_3", name: "Leyla Aslan", title: "Reformcu Polis Şefi", portfolio: "interior", ideology: "technocrat", ideologyLabel: "Merkez", competence: 85, loyalty: 80, popularity: 70, corruption: 10, reform: 80 },
    { id: "cand_int_4", name: "Pelin Erol", title: "Liberal Hukukçu", portfolio: "interior", ideology: "liberal", ideologyLabel: "Liberal", competence: 82, loyalty: 65, popularity: 65, corruption: 12, reform: 88 },
    { id: "cand_int_5", name: "Tarık Bilgin", title: "Sosyal Demokrat Yönetici", portfolio: "interior", ideology: "secular", ideologyLabel: "Merkez Sol", competence: 80, loyalty: 75, popularity: 68, corruption: 15, reform: 70 },
    { id: "cand_int_6", name: "Ayşe Yüksel", title: "Yerel Yönetim Uzmanı", portfolio: "interior", ideology: "technocrat", ideologyLabel: "Teknokrat", competence: 88, loyalty: 70, popularity: 55, corruption: 8, reform: 55 },

    // --- DIŞİŞLERİ BAKANI ADAYLARI ---
    { id: "cand_for_1", name: "Kerem Yıldırım", title: "Atlantikçi Diplomat", portfolio: "foreign", ideology: "liberal", ideologyLabel: "Liberal Batıcı", competence: 88, loyalty: 60, popularity: 78, corruption: 15, reform: 75 },
    { id: "cand_for_2", name: "Metehan Koç", title: "Avrasyacı Stratejist", portfolio: "foreign", ideology: "nationalist", ideologyLabel: "Ulusalcı", competence: 82, loyalty: 75, popularity: 70, corruption: 20, reform: 40 },
    { id: "cand_for_3", name: "Zeynel Alpan", title: "İslam Dünyası Uzmanı", portfolio: "foreign", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 70, loyalty: 90, popularity: 65, corruption: 30, reform: 30 },
    { id: "cand_for_4", name: "Kürşat Bozkurt", title: "Türk Dünyası Savunucusu", portfolio: "foreign", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 75, loyalty: 85, popularity: 72, corruption: 22, reform: 35 },
    { id: "cand_for_5", name: "Defne Sarışen", title: "AB Uzmanı", portfolio: "foreign", ideology: "secular", ideologyLabel: "Sosyal Demokrat", competence: 85, loyalty: 70, popularity: 68, corruption: 10, reform: 80 },
    { id: "cand_for_6", name: "Yasemin Kutlu", title: "Kariyer Diplomatı", portfolio: "foreign", ideology: "technocrat", ideologyLabel: "Merkez", competence: 92, loyalty: 80, popularity: 60, corruption: 5, reform: 50 },

    // --- SAVUNMA BAKANI ADAYLARI ---
    { id: "cand_def_1", name: "Turgut Aksoy", title: "Şahin General", portfolio: "defense", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 85, loyalty: 88, popularity: 80, corruption: 25, reform: 15 },
    { id: "cand_def_2", name: "Bülent Aksoy", title: "NATO Uzmanı", portfolio: "defense", ideology: "liberal", ideologyLabel: "Atlantikçi", competence: 80, loyalty: 70, popularity: 70, corruption: 15, reform: 65 },
    { id: "cand_def_3", name: "Hakan Sancaktar", title: "Savunma Sanayi Destekçisi", portfolio: "defense", ideology: "technocrat", ideologyLabel: "Kalkınmacı", competence: 88, loyalty: 85, popularity: 75, corruption: 30, reform: 70 },
    { id: "cand_def_4", name: "Selin Çelik", title: "Barış Yanlısı Akademisyen", portfolio: "defense", ideology: "secular", ideologyLabel: "Sol", competence: 72, loyalty: 50, popularity: 65, corruption: 5, reform: 85 },
    { id: "cand_def_5", name: "Oğuzhan Türk", title: "Ulusal Güvenlik Uzmanı", portfolio: "defense", ideology: "nationalist", ideologyLabel: "Ulusalcı", competence: 84, loyalty: 80, popularity: 68, corruption: 18, reform: 30 },
    { id: "cand_def_6", name: "Asena Yılmaz", title: "Profesyonel Asker", portfolio: "defense", ideology: "technocrat", ideologyLabel: "Merkez", competence: 90, loyalty: 95, popularity: 62, corruption: 10, reform: 40 },

    // --- MİLLİ EĞİTİM BAKANI ADAYLARI ---
    { id: "cand_edu_1", name: "Mustafa Göktürk", title: "Muhafazakâr Eğitimci", portfolio: "education", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 70, loyalty: 95, popularity: 55, corruption: 25, reform: 35 },
    { id: "cand_edu_2", name: "İpek Yücel", title: "Laik Akademisyen", portfolio: "education", ideology: "secular", ideologyLabel: "Kemalist", competence: 88, loyalty: 70, popularity: 72, corruption: 10, reform: 80 },
    { id: "cand_edu_3", name: "Caner Sevinç", title: "Liberal Reformcu", portfolio: "education", ideology: "liberal", ideologyLabel: "Liberal", competence: 80, loyalty: 60, popularity: 68, corruption: 15, reform: 90 },
    { id: "cand_edu_4", name: "Emel Bulut", title: "Sosyal Demokrat Öğretmen", portfolio: "education", ideology: "secular", ideologyLabel: "Merkez Sol", competence: 78, loyalty: 75, popularity: 65, corruption: 12, reform: 75 },
    { id: "cand_edu_5", name: "Doruk Somer", title: "STEM Uzmanı", portfolio: "education", ideology: "technocrat", ideologyLabel: "Teknokrat", competence: 92, loyalty: 75, popularity: 58, corruption: 5, reform: 85 },
    { id: "cand_edu_6", name: "Tuğrul Serter", title: "Milliyetçi Eğitimci", portfolio: "education", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 75, loyalty: 85, popularity: 64, corruption: 20, reform: 40 },

    // --- SAĞLIK BAKANI ADAYLARI ---
    { id: "cand_hea_1", name: "Murat Ege", title: "Kamu Sağlığı Savunucusu", portfolio: "health", ideology: "secular", ideologyLabel: "Sosyal Demokrat", competence: 85, loyalty: 75, popularity: 70, corruption: 10, reform: 78 },
    { id: "cand_hea_2", name: "Arzu Polat", title: "Özel Sağlık Reformcusu", portfolio: "health", ideology: "liberal", ideologyLabel: "Liberal", competence: 82, loyalty: 60, popularity: 68, corruption: 25, reform: 85 },
    { id: "cand_hea_3", name: "Osman Nuri", title: "Muhafazakâr Doktor", portfolio: "health", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 78, loyalty: 90, popularity: 64, corruption: 20, reform: 40 },
    { id: "cand_hea_4", name: "Derya Sönmez", title: "Teknokrat Sağlık Yöneticisi", portfolio: "health", ideology: "technocrat", ideologyLabel: "Merkez", competence: 92, loyalty: 80, popularity: 55, corruption: 8, reform: 60 },
    { id: "cand_hea_5", name: "Yavuz Sencer", title: "Milliyetçi Sağlık Uzmanı", portfolio: "health", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 74, loyalty: 85, popularity: 60, corruption: 18, reform: 35 },
    { id: "cand_hea_6", name: "Bahar Yalçın", title: "Koruyucu Hekimlik Uzmanı", portfolio: "health", ideology: "secular", ideologyLabel: "Yeşil/Sol", competence: 80, loyalty: 65, popularity: 66, corruption: 5, reform: 82 },

    // --- ADALET BAKANI ADAYLARI ---
    { id: "cand_jus_1", name: "Evren Akyol", title: "Liberal Anayasacı", portfolio: "justice", ideology: "liberal", ideologyLabel: "Liberal", competence: 88, loyalty: 55, popularity: 70, corruption: 15, reform: 95 },
    { id: "cand_jus_2", name: "Halit Ziya Kutlu", title: "Muhafazakâr Hukukçu", portfolio: "justice", ideology: "conservative", ideologyLabel: "Muhafazakâr", competence: 78, loyalty: 92, popularity: 60, corruption: 22, reform: 30 },
    { id: "cand_jus_3", name: "Nermin Öz", title: "Sosyal Demokrat Yargıç", portfolio: "justice", ideology: "secular", ideologyLabel: "Merkez Sol", competence: 85, loyalty: 70, popularity: 68, corruption: 12, reform: 85 },
    { id: "cand_jus_4", name: "Kemal Uyar", title: "Devletçi Savcı", portfolio: "justice", ideology: "secular", ideologyLabel: "Kemalist", competence: 82, loyalty: 85, popularity: 65, corruption: 10, reform: 40 },
    { id: "cand_jus_5", name: "Fatih Alparslan", title: "Milliyetçi Hukukçu", portfolio: "justice", ideology: "nationalist", ideologyLabel: "Milliyetçi", competence: 76, loyalty: 88, popularity: 62, corruption: 18, reform: 35 },
    { id: "cand_jus_6", name: "Ceren Öztürk", title: "Reformcu Akademisyen", portfolio: "justice", ideology: "technocrat", ideologyLabel: "Teknokrat", competence: 90, loyalty: 75, popularity: 58, corruption: 5, reform: 88 }
];

// Available Coalition Partners
const coalitionPartners = [
    {
        id: "nationalist_party",
        name: "Milliyetçi İttifak Partisi (MİP)",
        seats: 120,
        voterStrength: "Nationalists",
        demand: "Repeal Minority Rights and Increase Police Funding to 70%",
        action: (stateObj) => {
            stateObj.activePolicies.minority_rights = null;
            stateObj.activePolicies.police_funding = 70;
            stateObj.logs.push("Coalition Agreement: Repealed Minority Rights, increased Police Funding to 70%");
        }
    },
    {
        id: "social_democrats",
        name: "Sosyal Adalet Hareketi (SAH)",
        seats: 110,
        voterStrength: "Secular Voters, Workers",
        demand: "Enact Carbon Tax at 30% and Increase Education Budget to 60%",
        action: (stateObj) => {
            stateObj.activePolicies.carbon_tax = 30;
            stateObj.activePolicies.education_budget = 60;
            stateObj.logs.push("Coalition Agreement: Enacted Carbon Tax (30%), increased Education Budget to 60%");
        }
    },
    {
        id: "libertarians",
        name: "Hür Girişim Birliği (HGB)",
        seats: 90,
        voterStrength: "Business Owners",
        demand: "Reduce Corporate Tax to 10% and Repeal Carbon Tax",
        action: (stateObj) => {
            stateObj.activePolicies.corporate_tax = 10;
            stateObj.activePolicies.carbon_tax = null;
            stateObj.logs.push("Coalition Agreement: Reduced Corporate Tax to 10%, repealed Carbon Tax");
        }
    }
];

function getQuarterString(turn) {
    const startYear = 2036;
    const currentYear = startYear + Math.floor((turn - 1) / 4);
    const quarter = ((turn - 1) % 4) + 1;
    return `Q${quarter} ${currentYear}`;
}

function initGameState(partyName, ideology, difficulty, leaderName = "Lider", leaderTrait = "diplomat") {
    state.partyName = partyName;
    state.ideology = ideology;
    state.difficulty = difficulty;
    state.leaderName = leaderName;
    state.leaderTrait = leaderTrait;
    state.turn = 1;
    state.electionCount = 1;
    state.activeCoalition = null;
    state.isGameOver = false;
    state.logs = [];
    state.activePurge = { target: null, stage: 0, allies: [], evidenceQuality: 0, publicPrep: 0 };
    state.secretFile = null;
    state.activeDemand = null;
    state.emergencyContinues = 0;
    state.decisionEchoes = [];

    // Reset ideology drift and voter alliances
    state.ideologyDrift = { conservative: 0, kemalist_secular: 0, center_left: 0, liberal: 0, nationalist: 0, technocrat: 0 };
    state.voterAlliances = [];
    state.triggeredPremiumEvents = [];
    state.triggeredEvents = [];
    state.triggeredSecretFiles = [];
    state.decisions = {};

    // Set starting resources based on difficulty
    if (difficulty === "easy") {
        state.treasury = 60000000000;
        state.politicalCapital = 70;
    } else if (difficulty === "hard") {
        state.treasury = 20000000000;
        state.politicalCapital = 30;
    } else {
        state.treasury = 40000000000;
        state.politicalCapital = 50;
    }

    // Apply Leader Trait Starting Bonuses
    if (leaderTrait === "diplomat") {
        state.politicalCapital += 10;
    } else if (leaderTrait === "economist") {
        state.treasury += 5000000000; // +5 Billion
    }

    // Reset Power Centers first, so starting ideology overrides work correctly
    state.powerCenters = {
        public:     { name: "Halk Desteği", approval: 50, influence: 30, trend: 0, loyalty: 50, anger: 50, organization: 45, plot: null, plotProgress: 0 },
        military:   { name: "Ordu Desteği", approval: 70, influence: 25, trend: 0, loyalty: 70, anger: 30, organization: 37, plot: null, plotProgress: 0 },
        security:   { name: "Güvenlik Bürokrasisi", approval: 65, influence: 20, trend: 0, loyalty: 65, anger: 35, organization: 30, plot: null, plotProgress: 0 },
        judiciary:  { name: "Yargı Desteği", approval: 60, influence: 20, trend: 0, loyalty: 60, anger: 40, organization: 30, plot: null, plotProgress: 0 },
        business:   { name: "İş Dünyası", approval: 55, influence: 25, trend: 0, loyalty: 55, anger: 45, organization: 37, plot: null, plotProgress: 0 },
        media:      { name: "Medya Desteği", approval: 50, influence: 20, trend: 0, loyalty: 50, anger: 50, organization: 30, plot: null, plotProgress: 0 },
        academia:   { name: "Üniversite & Akademi", approval: 45, influence: 15, trend: 0, loyalty: 45, anger: 55, organization: 22, plot: null, plotProgress: 0 }
    };

    // Set initial system states and approvals slightly based on ideology
    if (ideology === "kemalist_secular") {
        state.systems.education = 60;
        state.systems.freedom = 55;
        state.voterGroups.secular.approval = 65;
        state.voterGroups.students.approval = 55;
        state.voterGroups.civil_servants.approval = 55;
        state.powerCenters.military.approval = 85;
        state.powerCenters.judiciary.approval = 80;
        state.powerCenters.academia.approval = 80;
    } else if (ideology === "conservative") {
        state.systems.security = 70;
        state.systems.corruption = 30; // lower starting corruption
        state.voterGroups.conservatives.approval = 70;
        state.voterGroups.religious.approval = 80;
        state.voterGroups.farmers.approval = 60;
        state.voterGroups.retirees.approval = 55;
        state.powerCenters.security.approval = 80;
        state.powerCenters.public.approval = 65;
        state.powerCenters.business.approval = 60;
    } else if (ideology === "center_left") {
        state.systems.freedom = 60;
        state.systems.happiness = 55;
        state.voterGroups.leftists.approval = 65;
        state.voterGroups.workers.approval = 60;
        state.voterGroups.students.approval = 60;
        state.voterGroups.youth.approval = 55;
        state.powerCenters.academia.approval = 75;
        state.powerCenters.media.approval = 70;
        state.powerCenters.judiciary.approval = 65;
    } else if (ideology === "liberal") {
        state.systems.economy = 65;
        state.systems.unemployment = 35;
        state.voterGroups.liberals.approval = 70;
        state.voterGroups.business.approval = 75;
        state.voterGroups.secular.approval = 50;
        state.powerCenters.business.approval = 85;
        state.powerCenters.media.approval = 65;
        state.powerCenters.academia.approval = 60;
        state.treasury += 10000000000; // Extra 10B starting budget
    } else if (ideology === "nationalist") {
        state.systems.security = 75;
        state.systems.freedom = 40;
        state.voterGroups.nationalists.approval = 75;
        state.voterGroups.farmers.approval = 55;
        state.voterGroups.conservatives.approval = 55;
        state.powerCenters.military.approval = 90;
        state.powerCenters.security.approval = 85;
        state.powerCenters.public.approval = 60;
    } else if (ideology === "technocrat") {
        state.systems.education = 65;
        state.systems.economy = 60;
        state.voterGroups.civil_servants.approval = 60;
        state.voterGroups.students.approval = 55;
        state.voterGroups.business.approval = 60;
        state.voterGroups.liberals.approval = 55;
        state.powerCenters.academia.approval = 80;
        state.powerCenters.judiciary.approval = 75;
        state.powerCenters.business.approval = 65;
        state.politicalCapital += 10; // Extra PC for tech efficiency
    }

    // Reset default cabinet
    state.cabinet = {
        economy: { name: "Selin Yılmaz", competence: 80, ideology: "liberal", ideologyLabel: "Liberal", loyalty: 85, popularity: 60, corruption: 10, reform: 75 },
        interior: { name: "Murat Karahan", competence: 75, ideology: "nationalist", ideologyLabel: "Milliyetçi", loyalty: 90, popularity: 70, corruption: 15, reform: 50 },
        foreign: { name: "Ayla Soylu", competence: 85, ideology: "technocrat", ideologyLabel: "Merkez", loyalty: 95, popularity: 75, corruption: 5, reform: 60 },
        defense: { name: "Volkan Arslan", competence: 70, ideology: "nationalist", ideologyLabel: "Milliyetçi", loyalty: 85, popularity: 65, corruption: 12, reform: 40 },
        education: { name: "Filiz Erol", competence: 50, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 80, popularity: 40, corruption: 20, reform: 30 },
        health: { name: "Levent Öztürk", competence: 65, ideology: "technocrat", ideologyLabel: "Merkez", loyalty: 75, popularity: 55, corruption: 25, reform: 55 },
        justice: { name: "Elif Bulut", competence: 55, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 85, popularity: 45, corruption: 18, reform: 35 }
    };

    // Reset history
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

    // Reset Factions (Regime Watch)
    state.regimeWatch = {
        cemaatler: { name: "Cemaatler & Tarikatlar", favor: 50, influence: 40, icon: "heart-handshake", desc: "Dini cemaat ve tarikat yapılanmaları. Muhafazakar tabanda güçlüler, eğitime ve bürokrasiye nüfuz etmeye çalışırlar.", plotProgress: 0, activeAlliance: null },
        kemalist_burokrasi: { name: "Kemalist Bürokrasi", favor: 50, influence: 50, icon: "building-2", desc: "Laik cumhuriyet elitleri ile yargı ve sivil-askeri bürokrasi kadroları. Devlet geleneklerini ve laik yapıyı savunurlar.", plotProgress: 0, activeAlliance: null },
        buyuk_sermaye: { name: "Büyük Sermaye (TÜSİAD)", favor: 55, influence: 55, icon: "wallet", desc: "Büyük holdingler, finans çevreleri ve sanayiciler. Serbest piyasa, döviz istikrarı ve uluslararası sermaye entegrasyonu odaklıdırlar.", plotProgress: 0, activeAlliance: null },
        super_nato: { name: "Süper NATO (Gladio)", favor: 40, influence: 35, icon: "globe", desc: "NATO yanlısı güvenlik klikleri, derin kontrgerilla unsurları ve Batı yanlısı askeri yapılar. Güvenlik politikalarında belirleyicidirler.", plotProgress: 0, activeAlliance: null },
        sebataycilar: { name: "Sebataycı Seçkinler", favor: 45, influence: 30, icon: "eye", desc: "Geleneksel seküler medya ve kültür dünyasının arkasındaki köklü elit aile ağları. Medya üzerinde ciddi nüfuzları bulunur.", plotProgress: 0, activeAlliance: null }
    };

    // Customize starting favor/influence based on starting ideology
    if (ideology === "kemalist_secular") {
        state.regimeWatch.kemalist_burokrasi.favor = 70;
        state.regimeWatch.kemalist_burokrasi.influence = 60;
        state.regimeWatch.cemaatler.favor = 30;
        state.regimeWatch.sebataycilar.favor = 60;
    } else if (ideology === "conservative") {
        state.regimeWatch.cemaatler.favor = 75;
        state.regimeWatch.cemaatler.influence = 55;
        state.regimeWatch.kemalist_burokrasi.favor = 35;
        state.regimeWatch.sebataycilar.favor = 35;
    } else if (ideology === "center_left") {
        state.regimeWatch.kemalist_burokrasi.favor = 55;
        state.regimeWatch.buyuk_sermaye.favor = 45;
        state.regimeWatch.buyuk_sermaye.influence = 50;
    } else if (ideology === "liberal") {
        state.regimeWatch.buyuk_sermaye.favor = 75;
        state.regimeWatch.buyuk_sermaye.influence = 65;
        state.regimeWatch.cemaatler.favor = 45;
        state.regimeWatch.sebataycilar.favor = 55;
    } else if (ideology === "nationalist") {
        state.regimeWatch.super_nato.favor = 55;
        state.regimeWatch.super_nato.influence = 45;
        state.regimeWatch.kemalist_burokrasi.favor = 55;
    } else if (ideology === "technocrat") {
        state.regimeWatch.buyuk_sermaye.favor = 60;
        state.regimeWatch.kemalist_burokrasi.favor = 55;
    }

    // Set starting values for all power centers based on the finalized approvals
    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        pc.loyalty = pc.approval;
        pc.anger = Math.max(0, 100 - pc.approval);
        pc.organization = Math.max(10, Math.round(pc.influence * 1.5));
        pc.plot = null;
        pc.plotProgress = 0;
    }

    // Push initial history point
    recordHistoryPoint();
}

function recordHistoryPoint() {
    state.history.turns.push(getQuarterString(state.turn));
    state.history.economy.push(state.systems.economy);
    state.history.inflation.push(state.systems.inflation);
    state.history.happiness.push(state.systems.happiness);
    state.history.stability.push(state.stability);
    state.history.playerPoll.push(calculatePollingSupport());
    if (state.powerCenters) {
        if (!state.history.military) state.history.military = [];
        state.history.military.push(state.powerCenters.military.approval);
        if (!state.history.security) state.history.security = [];
        state.history.security.push(state.powerCenters.security.approval);
        if (!state.history.judiciary) state.history.judiciary = [];
        state.history.judiciary.push(state.powerCenters.judiciary.approval);
    }
}

function calculatePollingSupport() {
    let weightedApprovalSum = 0;
    let totalSize = 0;
    
    for (const key in state.voterGroups) {
        const group = state.voterGroups[key];
        weightedApprovalSum += group.approval * group.size;
        totalSize += group.size;
    }
    
    // Total support is the weighted approval percentage of all voters
    let nationalPoll = weightedApprovalSum / totalSize;

    // Apply adjustments based on media influence or stability
    // E.g., if stability is extremely low, people turn away from government
    if (state.stability < 40) {
        nationalPoll -= (40 - state.stability) * 0.5;
    }
    // High media control masks bad performance to a degree (+5% max boost)
    const mediaControlBonus = (state.systems.media / 100) * 5;
    nationalPoll += mediaControlBonus;

    // Cabinet Charisma (Popularity) Bonus (+5% to -5% polling impact)
    let cabPopularitySum = 0;
    let cabCount = 0;
    for (const key in state.cabinet) {
        cabPopularitySum += state.cabinet[key].popularity ?? 50;
        cabCount++;
    }
    if (cabCount > 0) {
        const charismaBonus = ((cabPopularitySum / cabCount) - 50) * 0.15;
        nationalPoll += charismaBonus;
    }

    // Charismatic Leader Trait Bonus
    if (state.leaderTrait === "charismatic") {
        nationalPoll += 5;
    }

    return Math.max(0, Math.min(100, Math.round(nationalPoll)));
}

// ==============================
// SECTION: js/cards.js
// ==============================

/**
 * TURKEY EXECUTIVE DASHBOARD - POLICY DEFINITIONS
 */

const policies = [
    // --- TAX POLICIES ---
    {
        id: "income_tax",
        name: "Gelir Vergisi (Income Tax)",
        category: "economy",
        icon: "dollar-sign",
        desc: "Kişisel gelir vergisi oranını ayarlar. Yüksek oranlar devlet bütçesine büyük katkı sağlar ancak halkın harcama gücünü düşürür, işçi ve memurları mutsuz eder.",
        minLabel: "0%",
        maxLabel: "80%",
        costEnact: 10,
        costAdjust: 5,
        defaultVal: 25,
        getEffects: (val) => {
            const revenue = (val / 100) * 15.0; // Max ₺15B per quarter
            const economyEffect = - (val / 100) * 12; 
            const inflationEffect = - (val / 100) * 8; 
            
            return {
                budget: revenue,
                systems: {
                    economy: economyEffect,
                    inflation: inflationEffect
                },
                voters: {
                    workers: - (val / 100) * 25,
                    civil_servants: - (val / 100) * 20,
                    farmers: - (val / 100) * 15,
                    business: - (val / 100) * 35,
                    retirees: - (val / 100) * 8
                }
            };
        }
    },
    {
        id: "corporate_tax",
        name: "Kurumlar Vergisi (Corporate Tax)",
        category: "economy",
        icon: "building",
        desc: "Şirket karlarından alınan vergi oranı. Yüksek oranlar bütçeyi doldurur ancak özel sektör yatırımlarını yavaşlatır ve iş insanlarını uzaklaştırır.",
        minLabel: "0%",
        maxLabel: "60%",
        costEnact: 15,
        costAdjust: 5,
        defaultVal: 20,
        getEffects: (val) => {
            const revenue = (val / 100) * 10.0;
            const economyEffect = - (val / 100) * 18;
            const unemployment = (val / 100) * 12;
            
            return {
                budget: revenue,
                systems: {
                    economy: economyEffect,
                    unemployment: unemployment
                },
                voters: {
                    business: - (val / 100) * 55,
                    liberals: - (val / 100) * 30,
                    workers: (val / 100) * 15,
                    leftists: (val / 100) * 25
                }
            };
        }
    },

    // --- ECONOMY POLICIES ---
    {
        id: "automation_subsidy",
        name: "Otomasyon & Yapay Zeka Desteği",
        category: "economy",
        icon: "cpu",
        desc: "Sanayide otomasyon ve yapay zeka entegrasyonu için verilen teşvikler. Verimliliği artırarak ekonomiyi büyütür ancak mavi yakalı işsizliğini tetikler.",
        minLabel: "Yok",
        maxLabel: "Maksimum",
        costEnact: 20,
        costAdjust: 8,
        defaultVal: 30,
        getEffects: (val) => {
            const cost = - (val / 100) * 4.0;
            const economyEffect = (val / 100) * 22;
            const unemployment = (val / 100) * 20;
            
            return {
                budget: cost,
                systems: {
                    economy: economyEffect,
                    unemployment: unemployment
                },
                voters: {
                    business: (val / 100) * 30,
                    students: (val / 100) * 20,
                    youth: (val / 100) * 25,
                    workers: - (val / 100) * 35,
                    leftists: - (val / 100) * 20
                }
            };
        }
    },
    {
        id: "imf_cooperation",
        name: "IMF İşbirliği & Kemer Sıkma",
        category: "economy",
        icon: "landmark",
        desc: "Uluslararası Para Fonu (IMF) ile standby anlaşması yaparak kemer sıkma politikaları uygulamak. Finansal istikrar sağlar ancak işçi ve memur kesiminde ciddi tepki yaratır.",
        minLabel: "Yok",
        maxLabel: "Tam Entegrasyon",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const revenue = (val / 100) * 12.0; // Bütçe tasarrufları
            const inflationEffect = - (val / 100) * 20; // Enflasyonu sert düşürür
            const economyEffect = - (val / 100) * 10; // Kısa vadede daralma
            
            return {
                budget: revenue,
                systems: {
                    inflation: inflationEffect,
                    economy: economyEffect
                },
                voters: {
                    liberals: (val / 100) * 40,
                    business: (val / 100) * 25,
                    workers: - (val / 100) * 45,
                    civil_servants: - (val / 100) * 35,
                    retirees: - (val / 100) * 25,
                    leftists: - (val / 100) * 40
                }
            };
        }
    },
    {
        id: "ubi",
        name: "Evrensel Temel Gelir (UBI)",
        category: "economy",
        icon: "gift",
        desc: "Her vatandaşa şartsız aylık temel nakdi yardım. Yoksulluğu azaltır ve halkı mutlu eder, ancak bütçeyi tüketir ve piyasada enflasyonist baskı yaratır.",
        minLabel: "Yok",
        maxLabel: "₺10.000/Ay",
        costEnact: 30,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const cost = - (val / 100) * 20.0; // Yüksek bütçe maliyeti
            const inflation = (val / 100) * 25;
            const happiness = (val / 100) * 30;
            const unemployment = (val / 100) * 8;
            
            return {
                budget: cost,
                systems: {
                    inflation: inflation,
                    happiness: happiness,
                    unemployment: unemployment
                },
                voters: {
                    workers: (val / 100) * 35,
                    leftists: (val / 100) * 40,
                    students: (val / 100) * 30,
                    retirees: (val / 100) * 25,
                    farmers: (val / 100) * 20,
                    business: - (val / 100) * 35,
                    liberals: - (val / 100) * 30
                }
            };
        }
    },

    // --- EDUCATION POLICIES ---
    {
        id: "education_budget",
        name: "Eğitim Bütçesi & Bilim Fonu",
        category: "education",
        icon: "graduation-cap",
        desc: "Okullar, bilimsel laboratuvarlar ve üniversiteler için bütçe ayırır. Uzun vadede bilimsel ve ekonomik kalkınmayı tetikler.",
        minLabel: "Düşük",
        maxLabel: "Dünya Standartları",
        costEnact: 15,
        costAdjust: 6,
        defaultVal: 40,
        getEffects: (val) => {
            const cost = - (val / 100) * 8.0;
            const education = (val / 100) * 38;
            const corruption = - (val / 100) * 10;
            
            return {
                budget: cost,
                systems: {
                    education: education,
                    corruption: corruption
                },
                voters: {
                    students: (val / 100) * 50,
                    youth: (val / 100) * 35,
                    secular: (val / 100) * 25,
                    civil_servants: (val / 100) * 20,
                    business: (val / 100) * 15
                }
            };
        }
    },
    {
        id: "religious_edu",
        name: "Din Eğitimi ve İmam Hatipler",
        category: "education",
        icon: "book-open-check",
        desc: "Müfredattaki zorunlu din dersleri oranını ve İmam Hatip bütçelerini düzenler. Muhafazakar ve dindar kesimin desteğini toplar ancak seküler kesimi uzaklaştırır.",
        minLabel: "Laik / Seçmeli",
        maxLabel: "Ağırlıklı",
        costEnact: 10,
        costAdjust: 4,
        defaultVal: 30,
        getEffects: (val) => {
            const cost = - (val / 100) * 2.0;
            const education = - (val / 100) * 10; // Laik kesimlerin bilimsel endeks eleştirileri
            
            return {
                budget: cost,
                systems: {
                    education: education
                },
                voters: {
                    religious: (val / 100) * 45,
                    conservatives: (val / 100) * 35,
                    secular: - (val / 100) * 45,
                    students: - (val / 100) * 20
                }
            };
        }
    },

    // --- HEALTH POLICIES ---
    {
        id: "healthcare_priv",
        name: "Sağlık Hizmetlerinin Özelleştirilmesi",
        category: "justice",
        icon: "heart-pulse",
        desc: "Sağlık sisteminin özel sigortalara ve özel hastanelere devredilme derecesini belirler. Bütçeyi rahatlatır ancak dar gelirli kesimleri zor durumda bırakır.",
        minLabel: "Tamamen Kamusal",
        maxLabel: "Tamamen Özel",
        costEnact: 15,
        costAdjust: 8,
        defaultVal: 20,
        getEffects: (val) => {
            const saving = (val / 100) * 8.5;
            const happiness = - (val / 100) * 25;
            
            return {
                budget: saving,
                systems: {
                    happiness: happiness
                },
                voters: {
                    business: (val / 100) * 30,
                    liberals: (val / 100) * 25,
                    workers: - (val / 100) * 35,
                    retirees: - (val / 100) * 40,
                    leftists: - (val / 100) * 30
                }
            };
        }
    },

    // --- SECURITY POLICIES ---
    {
        id: "police_funding",
        name: "Emniyet & Savunma Bütçesi",
        category: "security",
        icon: "shield",
        desc: "Polis ve istihbarat teşkilatlarına ayrılan bütçe. Suç oranlarını azaltır, terörle mücadeleyi güçlendirir fakat sivil özgürlükleri daraltabilir.",
        minLabel: "Düşük",
        maxLabel: "Militarize",
        costEnact: 12,
        costAdjust: 6,
        defaultVal: 50,
        getEffects: (val) => {
            const cost = - (val / 100) * 6.5;
            const security = (val / 100) * 35;
            const freedom = - (val / 100) * 12;
            const corruption = - (val / 100) * 8;
            
            return {
                budget: cost,
                systems: {
                    security: security,
                    freedom: freedom,
                    corruption: corruption
                },
                voters: {
                    nationalists: (val / 100) * 30,
                    conservatives: (val / 100) * 20,
                    students: - (val / 100) * 25,
                    leftists: - (val / 100) * 20
                }
            };
        }
    },

    // --- MIGRATION POLICIES ---
    {
        id: "migrant_repatriation",
        name: "Düzensiz Göçmen Sınır Dışı Kararı",
        category: "security",
        icon: "user-minus",
        desc: "Düzensiz göçmenlerin ve sığınmacıların sınır dışı edilmesi / geri gönderilmesi yasası. Milliyetçi ve muhafazakar kesimi memnun eder, göçmenleri ve solcuları kızdırır.",
        minLabel: "Sıfır Deport",
        maxLabel: "Zorunlu Geri Gönderim",
        costEnact: 18,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const cost = - (val / 100) * 3.0; // Lojistik sınır dışı maliyetleri
            const security = (val / 100) * 15; // Şehir güvenliğinde artış
            
            return {
                budget: cost,
                systems: {
                    security: security
                },
                voters: {
                    nationalists: (val / 100) * 45,
                    conservatives: (val / 100) * 20,
                    leftists: - (val / 100) * 25,
                    kurds: - (val / 100) * 15,
                    immigrants: - (val / 100) * 90
                }
            };
        }
    },
    {
        id: "border_control",
        name: "Sınır Güvenliği ve Duvar İnşaatı",
        category: "security",
        icon: "lock",
        desc: "Sınırlara yüksek teknolojili güvenlik duvarı örülmesi ve sınır koruma birliklerinin takviyesi. Kaçak geçişleri önler, milliyetçilerin beğenisini toplar.",
        minLabel: "Düşük Kontrol",
        maxLabel: "Geçilmez Duvar",
        costEnact: 15,
        costAdjust: 5,
        defaultVal: 30,
        getEffects: (val) => {
            const cost = - (val / 100) * 5.0; // Yüksek altyapı maliyeti
            const security = (val / 100) * 20;
            
            return {
                budget: cost,
                systems: {
                    security: security
                },
                voters: {
                    nationalists: (val / 100) * 35,
                    conservatives: (val / 100) * 15,
                    leftists: - (val / 100) * 10
                }
            };
        }
    },

    // --- FOREIGN POLICY POLICIES ---
    {
        id: "defense_alliances",
        name: "Askeri Savunma Paktları (NATO/Avrasya)",
        category: "foreign",
        icon: "globe",
        desc: "Küresel askeri bloklarla entegrasyon seviyesi. Ulusal savunma riskini azaltır ancak tam bağımsızlık yanlısı milliyetçileri rahatsız edebilir.",
        minLabel: "Bağımsız Tarafsız",
        maxLabel: "Tam Entegre",
        costEnact: 15,
        costAdjust: 6,
        defaultVal: 40,
        getEffects: (val) => {
            const saving = (val / 100) * 3.0; // İttifaklar sayesinde bütçeden tasarruf
            const security = (val / 100) * 18;
            
            return {
                budget: saving,
                systems: {
                    security: security
                },
                voters: {
                    liberals: (val / 100) * 25,
                    nationalists: - (val / 100) * 25,
                    leftists: - (val / 100) * 15
                }
            };
        }
    },

    // --- ENERGY POLICIES ---
    {
        id: "nuclear_plants",
        name: "Nükleer Santraller ve Karadeniz Gazı",
        category: "energy",
        icon: "zap",
        desc: "Nükleer enerji santrallerine yatırımı ve Akdeniz/Karadeniz doğalgaz sondaj faaliyetlerini genişletir. Enerji ithalatını azaltır ancak çevre hassasiyeti olanları kızdırır.",
        minLabel: "Sıfır Yatırım",
        maxLabel: "Maksimum Üretim",
        costEnact: 20,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const cost = - (val / 100) * 8.0; // Yüksek kurulum maliyeti
            const economyEffect = (val / 100) * 25; // Cari açığı azaltır, ekonomiyi büyütür
            const inflation = - (val / 100) * 10; // Enerji ucuzlar, maliyet enflasyonu düşer
            
            return {
                budget: cost,
                systems: {
                    economy: economyEffect,
                    inflation: inflation
                },
                voters: {
                    business: (val / 100) * 30,
                    nationalists: (val / 100) * 20,
                    secular: - (val / 100) * 15,
                    leftists: - (val / 100) * 20
                }
            };
        }
    },

    // --- ENVIRONMENT POLICIES ---
    {
        id: "carbon_tax",
        name: "Karbon Salınım Vergisi",
        category: "energy",
        icon: "leaf",
        desc: "Sanayi tesislerine karbon emisyonu vergisi uygulanması. Yeşil dönüşümü hızlandırır ancak sanayiciyi ve mazot fiyatı artışı nedeniyle çiftçiyi zorlar.",
        minLabel: "%0",
        maxLabel: "%100",
        costEnact: 18,
        costAdjust: 6,
        defaultVal: 0,
        getEffects: (val) => {
            const revenue = (val / 100) * 4.5;
            const economyEffect = - (val / 100) * 10;
            const inflation = (val / 100) * 8; // Enerji fiyatlarını artırır
            
            return {
                budget: revenue,
                systems: {
                    economy: economyEffect,
                    inflation: inflation
                },
                voters: {
                    secular: (val / 100) * 25,
                    students: (val / 100) * 15,
                    business: - (val / 100) * 30,
                    farmers: - (val / 100) * 25,
                    workers: - (val / 100) * 10
                }
            };
        }
    },

    // --- MEDIA POLICIES ---
    {
        id: "censorship",
        name: "Basın ve Medya Denetimi",
        category: "justice",
        icon: "eye-off",
        desc: "Muhalif TV kanallarının ve sosyal medyanın devlet kontrolü. Hükümetin propaganda gücünü artırır, protestoları maskeler fakat özgürlükleri yok eder.",
        minLabel: "Tamamen Özgür",
        maxLabel: "Tam Sansür",
        costEnact: 18,
        costAdjust: 8,
        defaultVal: 10,
        getEffects: (val) => {
            const cost = - (val / 100) * 1.5;
            const freedom = - (val / 100) * 50;
            const media = (val / 100) * 55;
            const security = (val / 100) * 12;
            
            return {
                budget: cost,
                systems: {
                    freedom: freedom,
                    media: media,
                    security: security
                },
                voters: {
                    secular: - (val / 100) * 40,
                    students: - (val / 100) * 35,
                    youth: - (val / 100) * 40,
                    conservatives: (val / 100) * 18,
                    religious: (val / 100) * 20
                }
            };
        }
    },
    {
        id: "internet_freedom",
        name: "Erişim Engellerinin Kaldırılması",
        category: "justice",
        icon: "wifi",
        desc: "Sosyal ağlara, haber sitelerine ve bilgi kaynaklarına konulan BTK engellerinin kaldırılması. Gençleri ve öğrencileri mutlu eder.",
        minLabel: "Sıkı Bloklama",
        maxLabel: "Sınırsız İnternet",
        costEnact: 12,
        costAdjust: 5,
        defaultVal: 50,
        getEffects: (val) => {
            const cost = - (val / 100) * 0.5;
            const freedom = (val / 100) * 20;
            const media = - (val / 100) * 15; // Devletin söylem tekeli zayıflar
            
            return {
                budget: cost,
                systems: {
                    freedom: freedom,
                    media: media
                },
                voters: {
                    youth: (val / 100) * 45,
                    students: (val / 100) * 38,
                    secular: (val / 100) * 22,
                    religious: - (val / 100) * 15
                }
            };
        }
    },

    // --- SOCIAL LIBERTIES POLICIES ---
    {
        id: "women_safety",
        name: "Kadın Hakları & Yasal Güvenceler",
        category: "justice",
        icon: "shield-check",
        desc: "Kadına şiddet yasaları ve kadın haklarını korumaya yönelik uluslararası sözleşmelerin uygulanması. Laik kesimi ve gençleri memnun eder, radikal dindarlardan tepki çeker.",
        minLabel: "Sembolik",
        maxLabel: "Tam Koruma",
        costEnact: 12,
        costAdjust: 5,
        defaultVal: 40,
        getEffects: (val) => {
            const cost = - (val / 100) * 1.0;
            const freedom = (val / 100) * 15;
            
            return {
                budget: cost,
                systems: {
                    freedom: freedom
                },
                voters: {
                    secular: (val / 100) * 35,
                    students: (val / 100) * 30,
                    youth: (val / 100) * 25,
                    religious: - (val / 100) * 40,
                    conservatives: - (val / 100) * 18
                }
            };
        }
    },
    {
        id: "minority_rights",
        name: "Kültürel Haklar & Etnik İstikrar",
        category: "justice",
        icon: "heart-handshake",
        desc: "Azınlıkların kültürel haklarının yasal güvenceye alınması ve bölgesel yayın izinleri. Özgürlük puanını yükseltir ve Kürt seçmenleri kazanır ancak milliyetçilerde sert tepki doğurur.",
        minLabel: "Asimilasyonist",
        maxLabel: "Kültürel Özerklik",
        costEnact: 15,
        costAdjust: 6,
        defaultVal: 30,
        getEffects: (val) => {
            const cost = - (val / 100) * 1.2;
            const freedom = (val / 100) * 25;
            
            return {
                budget: cost,
                systems: {
                    freedom: freedom
                },
                voters: {
                    kurds: (val / 100) * 50,
                    leftists: (val / 100) * 20,
                    secular: (val / 100) * 15,
                    nationalists: - (val / 100) * 50,
                    conservatives: - (val / 100) * 15
                }
            };
        }
    },
    {
        id: "pension_age",
        name: "Emeklilik Yaşı (EYT Düzenlemesi)",
        category: "justice",
        icon: "hourglass",
        desc: "Yasal emeklilik yaş sınırını belirler. Yaşı düşürmek emekli adaylarını mutlu eder ama hazineyi tüketir ve iş gücünü zayıflatır.",
        minLabel: "50 Yaş",
        maxLabel: "70 Yaş",
        costEnact: 20,
        costAdjust: 10,
        defaultVal: 60,
        getEffects: (val) => {
            const pensionModifier = (val - 50) / 20; // 0'dan 1'e (50 yaş -> 0, 70 yaş -> 1)
            // Yaş yüksekse tasarruf (artı bütçe), yaş düşükse (EYT) büyük bütçe deliği
            const savings = (pensionModifier - 0.5) * 10.0; // Maksimum ₺5B tasarruf veya ₺5B açık
            const happiness = - (pensionModifier - 0.5) * 30; // Düşük yaş mutluluk getirir
            
            return {
                budget: savings,
                systems: {
                    happiness: happiness
                },
                voters: {
                    retirees: - (pensionModifier - 0.5) * 50,
                    workers: - (pensionModifier - 0.5) * 35,
                    business: (pensionModifier - 0.5) * 15
                }
            };
        }
    },
    {
        id: "laiklik_abolition",
        name: "Laiklik İlkesinin Kaldırılması",
        category: "education",
        icon: "book-open",
        desc: "Anayasa'daki laiklik ilkesini kaldırarak devlet dinini İslam olarak kabul etme tasarısı. Muhafazakar tabanda çok büyük heyecan yaratır ancak seküler toplumu tamamen karşınıza alır.",
        minLabel: "Laik Devlet",
        maxLabel: "Din Devleti",
        maxVal: 80,
        costEnact: 30,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 1.0,
                systems: {
                    freedom: - level * 20,
                    education: - level * 15
                },
                voters: {
                    religious: level * 40,
                    conservatives: level * 25,
                    secular: - level * 60,
                    leftists: - level * 30,
                    students: - level * 40
                }
            };
        }
    },
    {
        id: "capital_punishment",
        name: "İdam Cezasının Geri Getirilmesi",
        category: "security",
        icon: "skull",
        desc: "Vatana ihanet, terör ve cinayet suçları için idam cezasının anayasal olarak geri getirilmesi yasası.",
        minLabel: "Yok",
        maxLabel: "Yürürlükte",
        costEnact: 25,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    security: level * 20,
                    freedom: - level * 20
                },
                voters: {
                    nationalists: level * 30,
                    conservatives: level * 20,
                    secular: - level * 20,
                    leftists: - level * 25
                }
            };
        }
    },
    {
        id: "state_emergency",
        name: "Olağanüstü Hal ve Sıkıyönetim",
        category: "security",
        icon: "alert-triangle",
        desc: "Milli güvenliği ve kamu düzenini sağlamak amacıyla tüm ülkede askeri sıkıyönetim ilan edilmesi.",
        minLabel: "Yok",
        maxLabel: "Tam Sıkıyönetim",
        costEnact: 20,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 2.0,
                systems: {
                    security: level * 40,
                    freedom: - level * 45,
                    happiness: - level * 30
                },
                voters: {
                    nationalists: level * 15,
                    conservatives: level * 10,
                    secular: - level * 30,
                    workers: - level * 20,
                    students: - level * 35
                }
            };
        }
    },
    {
        id: "wealth_tax",
        name: "Varlık Vergisi ve Kamulaştırma",
        category: "economy",
        icon: "coins",
        desc: "Büyük sermaye grupları, oligarklar ve holdinglerin servetlerine yüksek vergi konması ve bazı sektörlerin kamulaştırılması.",
        minLabel: "Yok",
        maxLabel: "Maksimum",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 8.0,
                systems: {
                    economy: - level * 15,
                    unemployment: level * 10
                },
                voters: {
                    leftists: level * 45,
                    workers: level * 25,
                    business: - level * 60,
                    liberals: - level * 45
                }
            };
        }
    },
    {
        id: "ban_religious_sects",
        name: "Tarikat ve Cemaatlerin Yasaklanması",
        category: "education",
        icon: "ban",
        desc: "Devlet içindeki tarikat yapılanmalarının yasa dışı ilan edilmesi, vakıflarına el konulması.",
        minLabel: "Serbest",
        maxLabel: "Tam Yasak",
        costEnact: 30,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 10,
                    education: level * 15
                },
                voters: {
                    secular: level * 40,
                    students: level * 25,
                    religious: - level * 60,
                    conservatives: - level * 35
                }
            };
        }
    },
    {
        id: "multilateral_law",
        name: "Çoklu Hukuk ve Şeriat Mahkemeleri",
        category: "justice",
        icon: "scale",
        desc: "Dini cemaat mensupları için aile ve ticaret hukukunda şer'i mahkemelerin paralel bir yargı yolu olarak tanınması.",
        minLabel: "Tekil Laik Hukuk",
        maxLabel: "Federal Çoklu Hukuk",
        costEnact: 25,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 15,
                    corruption: level * 10
                },
                voters: {
                    religious: level * 45,
                    conservatives: level * 20,
                    secular: - level * 55,
                    leftists: - level * 30
                }
            };
        }
    },

    // ============================================================
    // RADICAL & PROVOCATIVE LAWS (Radikal Yasalar)
    // ============================================================

    // --- JUSTICE RADICAL ---
    {
        id: "decree_rule",
        name: "Cumhurbaşkanlığı Kararname Yönetimi",
        category: "justice",
        icon: "crown",
        desc: "TBMM'yi bypass ederek tüm kritik kararları Cumhurbaşkanlığı Kararnameleri ile almak. Yasama organını devre dışı bırakır, yürütmeyi merkezileştirir. Yargı ve muhalefet ayağa kalkar.",
        minLabel: "Meclis Egemenliği",
        maxLabel: "Tek Adam Yönetimi",
        costEnact: 35,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 30,
                    security: level * 15,
                    corruption: level * 20
                },
                voters: {
                    conservatives: level * 25,
                    religious: level * 20,
                    secular: - level * 50,
                    leftists: - level * 45,
                    students: - level * 40,
                    liberals: - level * 50,
                    nationalists: level * 15
                }
            };
        }
    },
    {
        id: "ban_parties",
        name: "Muhalefet Partilerinin Kapatılması",
        category: "justice",
        icon: "x-circle",
        desc: "Anayasa Mahkemesi'ne başvurarak ana muhalefet partisinin terörle irtibat iddiasıyla kapatılması davası açılması. Siyasi arenayı tamamen kilitler.",
        minLabel: "Çoğulcu Demokrasi",
        maxLabel: "Tek Parti Rejimi",
        maxVal: 80,
        costEnact: 40,
        costAdjust: 15,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 40,
                    security: level * 20,
                    happiness: - level * 25
                },
                voters: {
                    conservatives: level * 15,
                    nationalists: level * 20,
                    secular: - level * 55,
                    leftists: - level * 60,
                    kurds: - level * 50,
                    students: - level * 45,
                    youth: - level * 40,
                    liberals: - level * 55
                }
            };
        }
    },
    {
        id: "ignore_courts",
        name: "Yargı Kararlarını Tanımama",
        category: "justice",
        icon: "shield-off",
        desc: "Anayasa Mahkemesi ve Danıştay kararlarının hükümet tarafından uygulanmaması, yürütmenin yargıyı fiilen devre dışı bırakması. Hukuk devletini dinamitler.",
        minLabel: "Hukuk Devleti",
        maxLabel: "Yargı Bypass",
        costEnact: 30,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 35,
                    corruption: level * 25,
                    security: level * 10
                },
                voters: {
                    conservatives: level * 20,
                    religious: level * 15,
                    secular: - level * 60,
                    liberals: - level * 55,
                    leftists: - level * 40,
                    students: - level * 35
                }
            };
        }
    },
    {
        id: "political_amnesty",
        name: "Genel Af ve Siyasi Mahkumlar",
        category: "justice",
        icon: "key",
        desc: "Cezaevlerindeki tüm siyasi tutukluları serbest bırakma ve FETÖ/PKK davalarında genel af çıkarma. Solcuları ve Kürtleri mutlu eder, milliyetçileri ve güvenlikçileri çileden çıkarır.",
        minLabel: "Sıfır Af",
        maxLabel: "Tam Genel Af",
        costEnact: 30,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 1.0,
                systems: {
                    freedom: level * 25,
                    security: - level * 20,
                    happiness: level * 10
                },
                voters: {
                    kurds: level * 55,
                    leftists: level * 45,
                    secular: level * 15,
                    students: level * 20,
                    nationalists: - level * 60,
                    conservatives: - level * 35,
                    religious: - level * 20
                }
            };
        }
    },

    // --- SECURITY RADICAL ---
    {
        id: "conscription_extend",
        name: "Zorunlu Askerlik 24 Aya Çıkarma",
        category: "security",
        icon: "swords",
        desc: "Zorunlu askerlik süresini 6 aydan 24 aya uzatma. Ordu gücünü artırır, gençleri ve aileleri karşınıza alır, milliyetçileri memnun eder.",
        minLabel: "6 Ay (Mevcut)",
        maxLabel: "24 Ay Zorunlu",
        costEnact: 20,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 3.0,
                systems: {
                    security: level * 25,
                    happiness: - level * 20,
                    unemployment: - level * 8
                },
                voters: {
                    nationalists: level * 45,
                    conservatives: level * 20,
                    youth: - level * 60,
                    students: - level * 55,
                    workers: - level * 25,
                    liberals: - level * 30,
                    leftists: - level * 35
                }
            };
        }
    },
    {
        id: "private_militia",
        name: "Özel Milis Kuvvetleri (Paramiliter)",
        category: "security",
        icon: "shield-alert",
        desc: "Devlet kontrolünde ama ordunun dışında silahlı paramiliter milis güçleri kurma. Rejim koruması sağlar ama orduyu ve yargıyı alarma geçirir.",
        minLabel: "Yok",
        maxLabel: "Tam Teşekküllü",
        costEnact: 35,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 4.0,
                systems: {
                    security: level * 30,
                    freedom: - level * 35,
                    corruption: level * 15
                },
                voters: {
                    conservatives: level * 15,
                    nationalists: level * 10,
                    secular: - level * 50,
                    leftists: - level * 55,
                    liberals: - level * 45,
                    students: - level * 40,
                    workers: - level * 20
                }
            };
        }
    },
    {
        id: "mass_surveillance",
        name: "Toplu Gözetim ve Gizli Dinleme",
        category: "security",
        icon: "scan-eye",
        desc: "Tüm vatandaşların telefon, internet ve sosyal medya trafiklerinin devlet tarafından anlık izlenmesi. Terörle mücadelede etkili, sivil haklar için yıkıcı.",
        minLabel: "Minimal İzleme",
        maxLabel: "Orwellvari Gözetim",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 3.0,
                systems: {
                    security: level * 25,
                    freedom: - level * 40,
                    corruption: - level * 10
                },
                voters: {
                    nationalists: level * 20,
                    conservatives: level * 15,
                    youth: - level * 55,
                    students: - level * 50,
                    secular: - level * 35,
                    liberals: - level * 45,
                    leftists: - level * 30
                }
            };
        }
    },

    // --- ECONOMY RADICAL ---
    {
        id: "end_cb_independence",
        name: "Merkez Bankası Bağımsızlığını Kaldırma",
        category: "economy",
        icon: "landmark",
        desc: "Merkez Bankası'nın faiz ve kur politikalarını hükümete bağlama. Faizleri siyasi emirle düşürebilir, ekonomistleri çıldırtırsınız. Halk ucuz kredi ile mutlu olur ama enflasyon patlar.",
        minLabel: "Bağımsız TCMB",
        maxLabel: "Hükümet Kontrolü",
        costEnact: 30,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 5.0,
                systems: {
                    economy: - level * 20,
                    inflation: level * 35,
                    happiness: level * 10
                },
                voters: {
                    conservatives: level * 25,
                    religious: level * 15,
                    workers: level * 15,
                    farmers: level * 20,
                    business: - level * 60,
                    liberals: - level * 55,
                    secular: - level * 30
                }
            };
        }
    },
    {
        id: "land_reform",
        name: "Toprak Reformu ve Çiftlik Kamulaştırması",
        category: "economy",
        icon: "trees",
        desc: "Büyük toprak sahiplerinin arazilerini kamulaştırıp topraksız köylülere dağıtma. Devrimci bir hamle: sol kesimi coşturur, iş dünyası ve toprak sahipleri isyan eder.",
        minLabel: "Mülkiyet Hakkı",
        maxLabel: "Tam Kamulaştırma",
        costEnact: 35,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 6.0,
                systems: {
                    economy: - level * 15,
                    happiness: level * 15,
                    corruption: - level * 10
                },
                voters: {
                    farmers: level * 45,
                    workers: level * 35,
                    leftists: level * 55,
                    kurds: level * 25,
                    business: - level * 65,
                    liberals: - level * 50,
                    conservatives: - level * 30
                }
            };
        }
    },
    {
        id: "ban_crypto",
        name: "Kripto Para Yasaklama",
        category: "economy",
        icon: "bitcoin",
        desc: "Tüm kripto para alım-satım, madencilik ve cüzdan işlemlerini tamamen yasaklama. Kayıt dışı ekonomiyi daraltır ama dijital nesli ve yatırımcıları kızdırır.",
        minLabel: "Serbest Piyasa",
        maxLabel: "Tam Yasak",
        costEnact: 20,
        costAdjust: 8,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 2.0,
                systems: {
                    corruption: - level * 12,
                    freedom: - level * 15,
                    economy: - level * 8
                },
                voters: {
                    youth: - level * 50,
                    students: - level * 35,
                    liberals: - level * 40,
                    business: - level * 25,
                    conservatives: level * 15,
                    religious: level * 20,
                    retirees: level * 10
                }
            };
        }
    },

    // --- EDUCATION RADICAL ---
    {
        id: "mandatory_ottoman",
        name: "Osmanlıca Zorunlu Eğitim",
        category: "education",
        icon: "scroll",
        desc: "Okullarda Osmanlı Türkçesi (Arap harfli eski yazı) derslerini zorunlu hale getirme. Muhafazakarlar ve dinciler bayram eder, laik kesim ve akademi çıldırır.",
        minLabel: "Seçmeli/Yok",
        maxLabel: "Zorunlu Ders",
        costEnact: 15,
        costAdjust: 6,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 1.5,
                systems: {
                    education: - level * 15,
                    freedom: - level * 10
                },
                voters: {
                    religious: level * 40,
                    conservatives: level * 35,
                    secular: - level * 55,
                    students: - level * 45,
                    youth: - level * 40,
                    leftists: - level * 25,
                    liberals: - level * 20
                }
            };
        }
    },
    {
        id: "end_uni_autonomy",
        name: "Üniversite Özerkliğinin Kaldırılması",
        category: "education",
        icon: "school",
        desc: "Üniversite rektörlerini Cumhurbaşkanı ataması, akademik özerkliği sıfırlama ve müfredat kontrolünü devlete alma. Akademiyi kontrol eder ama bilimsel özgürlüğü yok eder.",
        minLabel: "Tam Özerk",
        maxLabel: "Devlet Kontrolü",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 1.0,
                systems: {
                    education: - level * 20,
                    freedom: - level * 25
                },
                voters: {
                    conservatives: level * 20,
                    religious: level * 15,
                    nationalists: level * 10,
                    students: - level * 60,
                    secular: - level * 45,
                    leftists: - level * 40,
                    youth: - level * 35,
                    liberals: - level * 30
                }
            };
        }
    },
    {
        id: "state_media_monopoly",
        name: "Medya Devlet Tekeli (Özel Kanalları Kapatma)",
        category: "education",
        icon: "tv",
        desc: "Tüm özel televizyon kanallarını ve haber sitelerini kapatarak devlet tekeli oluşturma. Propaganda gücü %100 olur, basın özgürlüğü sıfırlanır.",
        minLabel: "Çoğulcu Medya",
        maxLabel: "Devlet Tekeli",
        maxVal: 80,
        costEnact: 35,
        costAdjust: 12,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 3.0,
                systems: {
                    media: level * 50,
                    freedom: - level * 50,
                    happiness: - level * 15
                },
                voters: {
                    conservatives: level * 10,
                    secular: - level * 60,
                    students: - level * 55,
                    youth: - level * 50,
                    leftists: - level * 45,
                    liberals: - level * 55,
                    workers: - level * 15
                }
            };
        }
    },

    // --- FOREIGN POLICY RADICAL ---
    {
        id: "nato_exit",
        name: "NATO'dan Çekilme Kararı",
        category: "foreign",
        icon: "log-out",
        desc: "Kuzey Atlantik Antlaşması Örgütü'nden (NATO) resmen ayrılma ve tüm askeri üslerin kapatılması. Milliyetçi tabanda ulusal bağımsızlık coşkusu yaratır, Batı ile tüm köprüler yanar.",
        minLabel: "NATO Üyesi",
        maxLabel: "Tamamen Çıkış",
        costEnact: 40,
        costAdjust: 15,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 2.0,
                systems: {
                    security: - level * 20,
                    freedom: - level * 5
                },
                voters: {
                    nationalists: level * 55,
                    conservatives: level * 20,
                    religious: level * 15,
                    liberals: - level * 60,
                    business: - level * 45,
                    secular: - level * 25,
                    students: - level * 15
                }
            };
        }
    },
    {
        id: "shanghai_membership",
        name: "Şanghay İşbirliği Örgütü Üyeliği",
        category: "foreign",
        icon: "globe-2",
        desc: "Rusya-Çin eksenli Şanghay İşbirliği Örgütü'ne tam üyelik başvurusu. Avrasya blokuna geçiş sinyali verir. Milliyetçi ve muhafazakar kesimde destek bulur, Batıcılar felç olur.",
        minLabel: "Gözlemci",
        maxLabel: "Tam Üyelik",
        costEnact: 30,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 1.5,
                systems: {
                    security: level * 10,
                    economy: - level * 10,
                    freedom: - level * 10
                },
                voters: {
                    nationalists: level * 40,
                    conservatives: level * 15,
                    liberals: - level * 50,
                    business: - level * 40,
                    secular: - level * 20,
                    students: - level * 15
                }
            };
        }
    },
    {
        id: "seize_foreign_assets",
        name: "Yabancı Sermayeye El Koyma",
        category: "foreign",
        icon: "hand-coins",
        desc: "Ülkedeki yabancı şirketlerin fabrikalarını, bankalarını ve maden haklarını kamulaştırma. Hazineye devasa gelir sağlar ama uluslararası yaptırımlar ve sermaye kaçışı tetikler.",
        minLabel: "Koruma",
        maxLabel: "Tam Kamulaştırma",
        costEnact: 40,
        costAdjust: 15,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 12.0,
                systems: {
                    economy: - level * 25,
                    inflation: level * 15
                },
                voters: {
                    nationalists: level * 50,
                    leftists: level * 40,
                    workers: level * 30,
                    conservatives: level * 15,
                    business: - level * 70,
                    liberals: - level * 60,
                    secular: - level * 10
                }
            };
        }
    },

    // --- ENERGY RADICAL ---
    {
        id: "privatize_water",
        name: "Su Kaynaklarının Özelleştirilmesi",
        category: "energy",
        icon: "droplets",
        desc: "Barajları, gölleri ve yeraltı su kaynaklarını özel şirketlere devretme. İş dünyası ve bütçe rahatlar, çiftçiler ve halk su faturalarından isyan eder.",
        minLabel: "Kamusal Su",
        maxLabel: "Özel Sektör",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 6.0,
                systems: {
                    economy: level * 8,
                    happiness: - level * 25,
                    corruption: level * 10
                },
                voters: {
                    business: level * 40,
                    liberals: level * 20,
                    farmers: - level * 60,
                    workers: - level * 40,
                    leftists: - level * 45,
                    retirees: - level * 30,
                    kurds: - level * 25
                }
            };
        }
    },
    {
        id: "ban_gasoline_cars",
        name: "Benzinli Araç Satışını Yasaklama",
        category: "energy",
        icon: "car",
        desc: "2040'tan itibaren benzinli ve dizel araç satışını yasaklayarak zorunlu elektrikli araç geçişi. Çevreci gençler coşar, çiftçiler ve işçiler taşıma maliyeti altında ezilir.",
        minLabel: "Serbest Piyasa",
        maxLabel: "Tam Yasak",
        costEnact: 25,
        costAdjust: 10,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 3.0,
                systems: {
                    economy: - level * 8,
                    inflation: level * 10,
                    education: level * 5
                },
                voters: {
                    students: level * 35,
                    youth: level * 30,
                    secular: level * 20,
                    farmers: - level * 55,
                    workers: - level * 35,
                    retirees: - level * 25,
                    conservatives: - level * 20,
                    business: - level * 15
                }
            };
        }
    },
    {
        id: "social_media_ban",
        name: "Sosyal Medya Platformlarının Yasaklanması",
        category: "security",
        icon: "shield-alert",
        desc: "Erişim engelleri ve bant daraltma yoluyla Twitter, YouTube ve Instagram gibi ana akım sosyal ağların tamamen yasaklanması yasası.",
        minLabel: "Erişim Serbest",
        maxLabel: "Tamamen Kapalı",
        costEnact: 20,
        costAdjust: 6,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: 0,
                systems: {
                    freedom: - level * 35,
                    happiness: - level * 20,
                    stability: level * 10,
                    media: level * 15
                },
                voters: {
                    secular: - level * 45,
                    leftists: - level * 30,
                    students: - level * 60,
                    youth: - level * 65,
                    conservatives: level * 20,
                    religious: level * 25
                }
            };
        }
    },
    {
        id: "worker_strike_ban",
        name: "Grev ve Lokavt Yasaklarının Genişletilmesi",
        category: "justice",
        icon: "hammer",
        desc: "Milli güvenlik ve halk sağlığı gerekçeleriyle tüm işçi grevlerini süresiz erteleme veya yasaklama tasarısı.",
        minLabel: "Grev Serbest",
        maxLabel: "Grev Yasak",
        costEnact: 15,
        costAdjust: 5,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: level * 2.0,
                systems: {
                    stability: level * 15,
                    freedom: - level * 20,
                    economy: level * 10
                },
                voters: {
                    business: level * 35,
                    workers: - level * 50,
                    leftists: - level * 40,
                    liberals: level * 15,
                    secular: - level * 15
                }
            };
        }
    },
    {
        id: "housing_rent_control",
        name: "Kira Fiyatlarına Tavan Fiyat Sınırı",
        category: "economy",
        icon: "home",
        desc: "Konut ve dükkan kiralarına yıllık maksimum artış sınırı getirme ve fahiş kira isteyen ev sahiplerini cezalandırma yasası.",
        minLabel: "Serbest Piyasa",
        maxLabel: "Tavan Sınır",
        costEnact: 18,
        costAdjust: 6,
        defaultVal: 0,
        getEffects: (val) => {
            const level = val / 100;
            return {
                budget: - level * 1.0,
                systems: {
                    inflation: - level * 15,
                    happiness: level * 20,
                    economy: - level * 10
                },
                voters: {
                    students: level * 35,
                    workers: level * 40,
                    retirees: level * 30,
                    business: - level * 45,
                    liberals: - level * 35,
                    conservatives: level * 10
                }
            };
        }
    }
];

function getPolicyById(id) {
    return policies.find(p => p.id === id);
}

// ==============================
// SECTION: js/simulation.js
// ==============================

/**
 * TURKEY EXECUTIVE DASHBOARD - MATHEMATICAL SIMULATION ENGINE
 */




function runSimulationTurn(state) {
    // 1. Accumulate Policy Effects
    let quarterlyBudgetSurplus = 0;
    const policySystemMods = {
        economy: 0,
        inflation: 0,
        unemployment: 0,
        happiness: 0,
        security: 0,
        freedom: 0,
        media: 0,
        corruption: 0,
        education: 0
    };

    // Initialize voter mods for all 15 groups
    const policyVoterMods = {};
    for (const key in state.voterGroups) {
        policyVoterMods[key] = 0;
    }

    // Calculate base taxes & costs
    // Base public revenue is ₺16B per quarter
    let grossIncome = 16.0; 
    // Base government operations cost is ₺13B per quarter
    let grossExpenses = 13.0; 

    for (const policyId in state.activePolicies) {
        const val = state.activePolicies[policyId];
        if (val !== null) {
            const policyDef = getPolicyById(policyId);
            if (policyDef) {
                const effects = policyDef.getEffects(val);
                
                // Budget impact
                if (effects.budget > 0) {
                    grossIncome += effects.budget;
                } else {
                    grossExpenses += Math.abs(effects.budget);
                }

                // System mods
                if (effects.systems) {
                    for (const sys in effects.systems) {
                        policySystemMods[sys] += effects.systems[sys];
                    }
                }

                // Voter approval mods
                if (effects.voters) {
                    for (const grp in effects.voters) {
                        if (policyVoterMods[grp] !== undefined) {
                            policyVoterMods[grp] += effects.voters[grp];
                        }
                    }
                }
            }
        }
    }

    // Amplify policy effects for radical consequences (1.4x impact)
    const policyAmp = 1.4;
    for (const key in policySystemMods) {
        policySystemMods[key] *= policyAmp;
    }
    for (const key in policyVoterMods) {
        policyVoterMods[key] *= policyAmp;
    }

    // 2. Cabinet Minister Modifiers
    const cab = state.cabinet;

    // 3. Interconnected Systems Calculations
    // Store old values to compute trends
    const oldSystems = { ...state.systems };

    // a. Education Quality
    const eduBudgetVal = state.activePolicies.education_budget ?? 0;
    // Education minister competence adds up to +10%
    state.systems.education = 15 + (eduBudgetVal * 0.6) + (cab.education.competence - 50) * 0.2 + policySystemMods.education;
    
    // b. Economy Development
    const taxRateImpact = ((state.activePolicies.income_tax ?? 0) + (state.activePolicies.corporate_tax ?? 0)) / 2;
    // Economy minister competence adds up to +10%
    state.systems.economy = 42 + (state.systems.education * 0.25) - (state.systems.corruption * 0.2) - (taxRateImpact * 0.15) + (cab.economy.competence - 50) * 0.2 + policySystemMods.economy;
    // Business influence impact: strong business influence grows economy
    const busInf = state.powerCenters?.business?.influence ?? 25;
    state.systems.economy += (busInf - 25) * 0.3;

    // c. Corruption Index
    const policeVal = state.activePolicies.police_funding ?? 0;
    const censorshipVal = state.activePolicies.censorship ?? 0;
    // Economy, Interior and Justice ministers corruption affect index. Justice minister competence helps curb it.
    let ministerCorruptionEffect = (cab.economy.corruption * 0.1) + (cab.interior.corruption * 0.1) + (cab.justice.corruption * 0.2) - (cab.justice.competence - 50) * 0.15;
    state.systems.corruption = 35 - (state.systems.education * 0.15) - (policeVal * 0.08) + (censorshipVal * 0.1) - (state.stability * 0.1) + ministerCorruptionEffect + policySystemMods.corruption;
    // Media influence impact: strong media increases transparency, lowering corruption
    const medInf = state.powerCenters?.media?.influence ?? 20;
    state.systems.corruption -= (medInf - 20) * 0.3;

    // d. Security
    // Interior and Defense ministers competence boost security
    state.systems.security = 25 + (policeVal * 0.5) - (state.systems.freedom * 0.1) + (cab.interior.competence - 50) * 0.2 + (cab.defense.competence - 50) * 0.15 + policySystemMods.security;

    // e. Civic Liberties (Freedom)
    // Justice minister competence boosts civil liberties
    state.systems.freedom = 90 - (censorshipVal * 0.55) - (policeVal * 0.1) + (cab.justice.competence - 50) * 0.2 + policySystemMods.freedom;
    // Judiciary and Military influence impacts: strong judiciary boosts freedom, strong military penalizes it
    const milInf = state.powerCenters?.military?.influence ?? 25;
    const judInf = state.powerCenters?.judiciary?.influence ?? 20;
    state.systems.freedom += (judInf - 20) * 0.45 - (milInf - 25) * 0.4;

    // f. Media Control
    state.systems.media = 10 + (censorshipVal * 0.8) + policySystemMods.media;

    // g. Unemployment Rate
    state.systems.unemployment = 42 - (state.systems.economy * 0.45) + policySystemMods.unemployment;
    // Business influence impact: strong business influence can lead to job inequality
    state.systems.unemployment += (busInf - 25) * 0.15;

    // h. Inflation Rate
    // Competent economy minister reduces inflation (tight monetary policies, interest rates)
    state.systems.inflation = 15 + (state.systems.economy * 0.25) + (state.systems.corruption * 0.15) - (cab.economy.competence - 50) * 0.15 + policySystemMods.inflation;
    // Business influence impact: strong business pressure can drive up inflation
    state.systems.inflation += (busInf - 25) * 0.2;

    // Bound all systems to [0, 100]
    for (const sys in state.systems) {
        state.systems[sys] = Math.max(0, Math.min(100, Math.round(state.systems[sys])));
    }

    // Determine Trends
    for (const sys in state.systems) {
        const diff = state.systems[sys] - oldSystems[sys];
        if (diff > 1.5) state.trends[sys] = 1;
        else if (diff < -1.5) state.trends[sys] = -1;
        else state.trends[sys] = 0;
    }

    // i. Public Happiness
    // Health minister competence boosts public health and happiness
    state.systems.happiness = 45 + 
        (state.systems.freedom * 0.15) + 
        (state.systems.economy * 0.15) - 
        (state.systems.inflation * 0.2) - 
        (state.systems.unemployment * 0.2) - 
        (state.systems.corruption * 0.15) + 
        (cab.health.competence - 50) * 0.15 + 
        policySystemMods.happiness;
        
    state.systems.happiness = Math.max(0, Math.min(100, Math.round(state.systems.happiness)));

    // j. Stability
    state.stability = 45 + 
        (state.systems.happiness * 0.3) + 
        (state.systems.security * 0.25) - 
        (state.systems.inflation * 0.12) - 
        (state.systems.unemployment * 0.12) - 
        (state.systems.corruption * 0.15);

    // Cross-power-center stability impacts: strong military improves law and order stability,
    // but strong media exposes corruption, which hits stability when corruption is high
    state.stability += (milInf - 25) * 0.25;
    if (state.systems.corruption > 45) {
        state.stability -= (medInf - 20) * 0.4;
    }

    // Crisis modifiers on stability
    if (state.systems.happiness < 30) {
        state.stability -= (30 - state.systems.happiness) * 0.8;
    }
    if (state.treasury < 0) {
        const debtBillions = Math.abs(state.treasury) / 1000000000;
        if (debtBillions > 15) {
            state.stability -= Math.min(30, (debtBillions - 15) * 0.5);
            state.systems.inflation = Math.min(100, state.systems.inflation + Math.round(debtBillions * 0.1));
        }
    }
    state.stability = Math.max(0, Math.min(100, Math.round(state.stability)));

    // 4. Voter Demographics Drifts (Dynamic electorate size)
    // High education slowly increases secular/youth sizes, shrinks conservative sizes
    if (state.systems.education > 60) {
        const drift = (state.systems.education - 60) * 0.003;
        state.voterGroups.conservatives.size = Math.max(8, state.voterGroups.conservatives.size - drift);
        state.voterGroups.religious.size = Math.max(1, state.voterGroups.religious.size - drift * 0.2);
        state.voterGroups.secular.size = Math.min(25, state.voterGroups.secular.size + drift * 0.6);
        state.voterGroups.youth.size = Math.min(15, state.voterGroups.youth.size + drift * 0.6);
    }
    
    // High automation/unemployment turns workers into leftists
    if (state.systems.unemployment > 50) {
        const drift = (state.systems.unemployment - 50) * 0.005;
        state.voterGroups.workers.size = Math.max(5, state.voterGroups.workers.size - drift);
        state.voterGroups.leftists.size = Math.min(20, state.voterGroups.leftists.size + drift);
    }

    // Normalize voter sizes to exactly 100%
    let totalSize = 0;
    for (const key in state.voterGroups) {
        totalSize += state.voterGroups[key].size;
    }
    for (const key in state.voterGroups) {
        state.voterGroups[key].size = (state.voterGroups[key].size / totalSize) * 100;
    }

    // 5. Voter Group Approval, Satisfaction and Protest Calculations
    // Define what each of the 15 groups wants (target approval)
    const targetApprovals = {
        conservatives: 40 + (state.systems.security * 0.25) + ((state.activePolicies.religious_edu ?? 0) * 0.25) - (state.systems.freedom * 0.1) + policyVoterMods.conservatives,
        secular:       25 + (state.systems.freedom * 0.3) + (state.systems.education * 0.25) - ((state.activePolicies.religious_edu ?? 0) * 0.3) + ((state.activePolicies.women_safety ?? 0) * 0.2) + policyVoterMods.secular,
        nationalists:  20 + (state.systems.security * 0.3) + ((state.activePolicies.border_control ?? 0) * 0.25) + ((state.activePolicies.migrant_repatriation ?? 0) * 0.25) - ((state.activePolicies.minority_rights ?? 0) * 0.3) + policyVoterMods.nationalists,
        leftists:      20 + ((state.activePolicies.ubi ?? 0) * 0.25) - ((state.activePolicies.healthcare_priv ?? 0) * 0.25) - (state.systems.corruption * 0.15) - (state.systems.unemployment * 0.1) + policyVoterMods.leftists,
        liberals:      25 + (state.systems.economy * 0.3) - ((state.activePolicies.corporate_tax ?? 0) * 0.25) + ((state.activePolicies.imf_cooperation ?? 0) * 0.2) + policyVoterMods.liberals,
        kurds:         15 + ((state.activePolicies.minority_rights ?? 0) * 0.4) + ((state.activePolicies.ubi ?? 0) * 0.15) - (state.systems.security * 0.15) + policyVoterMods.kurds,
        immigrants:    30 - ((state.activePolicies.migrant_repatriation ?? 0) * 0.6) - ((state.activePolicies.border_control ?? 0) * 0.2) + policyVoterMods.immigrants,
        business:      20 + (state.systems.economy * 0.35) - ((state.activePolicies.corporate_tax ?? 0) * 0.3) + ((state.activePolicies.healthcare_priv ?? 0) * 0.2) - (state.systems.inflation * 0.1) + policyVoterMods.business,
        students:      25 + (state.systems.freedom * 0.2) + (state.systems.education * 0.25) + ((state.activePolicies.internet_freedom ?? 0) * 0.25) - (state.systems.unemployment * 0.2) + policyVoterMods.students,
        retirees:      30 - (state.systems.inflation * 0.3) - ((state.activePolicies.pension_age ?? 60) * 0.4) - ((state.activePolicies.healthcare_priv ?? 0) * 0.2) + policyVoterMods.retirees,
        workers:       30 - (state.systems.inflation * 0.25) - (state.systems.unemployment * 0.25) + ((state.activePolicies.ubi ?? 0) * 0.2) - ((state.activePolicies.pension_age ?? 60) * 0.2) + policyVoterMods.workers,
        farmers:       35 + (state.systems.economy * 0.2) - ((state.activePolicies.carbon_tax ?? 0) * 0.25) + ((state.activePolicies.ubi ?? 0) * 0.15) + policyVoterMods.farmers,
        civil_servants:30 + (state.systems.education * 0.15) - (state.systems.inflation * 0.3) - ((state.activePolicies.imf_cooperation ?? 0) * 0.2) + policyVoterMods.civil_servants,
        youth:         20 + (state.systems.freedom * 0.2) + ((state.activePolicies.internet_freedom ?? 0) * 0.35) - (state.systems.unemployment * 0.3) + policyVoterMods.youth,
        religious:     40 + ((state.activePolicies.religious_edu ?? 0) * 0.35) - ((state.activePolicies.women_safety ?? 0) * 0.25) - (state.systems.freedom * 0.15) + policyVoterMods.religious
    };

    let averageProtestRisk = 0;

    // Drift actual approval and calculate satisfaction & protest risk
    for (const key in state.voterGroups) {
        const target = Math.max(0, Math.min(100, targetApprovals[key]));
        
        // 1. Approval drift
        state.voterGroups[key].approval = state.voterGroups[key].approval * 0.65 + target * 0.35;
        state.voterGroups[key].approval = Math.max(0, Math.min(100, Math.round(state.voterGroups[key].approval)));
        
        // 2. Satisfaction (based on approval and national happiness)
        let satisfaction = state.voterGroups[key].approval * 0.6 + state.systems.happiness * 0.4;
        
        // 3. Mini ideology loyalty alignment based on Cabinet Minister ideology
        // E.g. if interior minister is a nationalist, nationalists get +5 satisfaction. If corrupt, seculars get -5.
        if (key === "nationalists" && (cab.interior.ideology === "nationalist" || cab.defense.ideology === "nationalist")) {
            satisfaction += 5;
        }
        if (key === "secular" && (cab.justice.ideology === "conservative" || cab.education.ideology === "conservative")) {
            satisfaction -= 5;
        }
        
        state.voterGroups[key].satisfaction = Math.max(0, Math.min(100, Math.round(satisfaction)));

        // 4. Protest Risk
        // If satisfaction is low, protest risk rises. High security suppresses protest risk.
        let protestRisk = (100 - state.voterGroups[key].satisfaction) * 1.5 - (state.systems.security * 0.4);
        
        // Specific triggers (Youth/Students protest high internet bans or high censorship)
        if ((key === "students" || key === "youth") && (state.activePolicies.censorship ?? 0) > 60) {
            protestRisk += 20;
        }
        
        state.voterGroups[key].protestRisk = Math.max(0, Math.min(100, Math.round(protestRisk)));
        averageProtestRisk += state.voterGroups[key].protestRisk * (state.voterGroups[key].size / 100);
    }

    // High average protest risk directly hits stability
    if (averageProtestRisk > 40) {
        state.stability = Math.max(0, Math.round(state.stability - (averageProtestRisk - 40) * 0.4));
    }

    // 8. Power Centers calculations
    if (!state.powerCenters) {
        state.powerCenters = {
            public:     { name: "Halk Desteği", approval: 50, influence: 30, trend: 0, loyalty: 50, anger: 50, organization: 45, plot: null, plotProgress: 0 },
            military:   { name: "Ordu Desteği", approval: 70, influence: 25, trend: 0, loyalty: 70, anger: 30, organization: 37, plot: null, plotProgress: 0 },
            security:   { name: "Güvenlik Bürokrasisi", approval: 65, influence: 20, trend: 0, loyalty: 65, anger: 35, organization: 30, plot: null, plotProgress: 0 },
            judiciary:  { name: "Yargı Desteği", approval: 60, influence: 20, trend: 0, loyalty: 60, anger: 40, organization: 30, plot: null, plotProgress: 0 },
            business:   { name: "İş Dünyası", approval: 55, influence: 25, trend: 0, loyalty: 55, anger: 45, organization: 37, plot: null, plotProgress: 0 },
            media:      { name: "Medya Desteği", approval: 50, influence: 20, trend: 0, loyalty: 50, anger: 50, organization: 30, plot: null, plotProgress: 0 },
            academia:   { name: "Üniversite & Akademi", approval: 45, influence: 15, trend: 0, loyalty: 45, anger: 55, organization: 22, plot: null, plotProgress: 0 }
        };
    }

    const targetPowerCenters = {
        public:     40 + (state.systems.happiness * 0.4) - (state.systems.inflation * 0.15) - (state.systems.unemployment * 0.15) + ((state.activePolicies.ubi ?? 0) * 0.2) - (((state.activePolicies.pension_age ?? 60) - 50) * 0.3) - ((state.activePolicies.income_tax ?? 25) * 0.2),
        military:   40 + ((state.activePolicies.defense_alliances ?? 40) * 0.3) + (state.systems.security * 0.2) + ((state.activePolicies.police_funding ?? 50) * 0.15) + ((cab.defense.competence - 50) * 0.2),
        security:   35 + ((state.activePolicies.police_funding ?? 50) * 0.4) + ((state.activePolicies.border_control ?? 30) * 0.2) + ((state.activePolicies.censorship ?? 10) * 0.15) - ((state.activePolicies.minority_rights ?? 30) * 0.15) + ((cab.interior.competence - 50) * 0.2),
        judiciary:  40 + (state.systems.freedom * 0.4) - (state.systems.corruption * 0.3) + ((state.activePolicies.women_safety ?? 40) * 0.15) + ((state.activePolicies.minority_rights ?? 30) * 0.15) + ((cab.justice.competence - 50) * 0.2),
        business:   35 + (state.systems.economy * 0.3) - (state.systems.inflation * 0.15) - ((state.activePolicies.corporate_tax ?? 20) * 0.4) - ((state.activePolicies.income_tax ?? 25) * 0.2) - ((state.activePolicies.ubi ?? 0) * 0.15) + ((state.activePolicies.healthcare_priv ?? 20) * 0.2) + ((state.activePolicies.automation_subsidy ?? 0) * 0.2) - ((state.activePolicies.carbon_tax ?? 0) * 0.2) + ((state.activePolicies.imf_cooperation ?? 0) * 0.25),
        media:      40 + (state.systems.freedom * 0.25) - ((state.activePolicies.censorship ?? 10) * 0.45) + ((state.activePolicies.internet_freedom ?? 50) * 0.3),
        academia:   35 + (state.systems.education * 0.35) - ((state.activePolicies.censorship ?? 10) * 0.25) - ((state.activePolicies.religious_edu ?? 30) * 0.2) + ((state.activePolicies.internet_freedom ?? 50) * 0.2)
    };

    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        const target = Math.max(0, Math.min(100, Math.round(targetPowerCenters[key])));
        const oldVal = pc.approval;
        pc.approval = Math.round(oldVal * 0.6 + target * 0.4);
        pc.approval = Math.max(0, Math.min(100, pc.approval));
        
        const diff = pc.approval - oldVal;
        if (diff > 1.5) pc.trend = 1;
        else if (diff < -1.5) pc.trend = -1;
        else pc.trend = 0;

        // --- DEEP HIDDEN STABILITY MECHANICS ---
        
        // 1. Loyalty (Sadakat) calculations
        let targetLoyalty = pc.approval;
        
        // Cabinet matching affects loyalty
        if (key === "military" && cab.defense.ideology === state.ideology) targetLoyalty += 6;
        if (key === "security" && cab.interior.ideology === state.ideology) targetLoyalty += 6;
        if (key === "judiciary" && cab.justice.ideology === state.ideology) targetLoyalty += 6;
        if (key === "business" && cab.economy.ideology === "liberal") targetLoyalty += 6;
        if (key === "academia" && cab.education.ideology === "secular") targetLoyalty += 6;
        
        // Minister loyalty/disloyalty affects centers
        if (key === "security" && cab.interior.loyalty < 55) targetLoyalty -= 10;
        if (key === "military" && cab.defense.loyalty < 55) targetLoyalty -= 10;
        
        // Corruption hurts loyalty
        if (state.systems.corruption > 50) {
            targetLoyalty -= (state.systems.corruption - 50) * 0.25;
        }
        
        // General stability impacts loyalty
        if (state.stability > 75) targetLoyalty += 5;
        else if (state.stability < 40) targetLoyalty -= 10;
        
        pc.loyalty = Math.round(pc.loyalty * 0.7 + Math.max(0, Math.min(100, targetLoyalty)) * 0.3);
        pc.loyalty = Math.max(0, Math.min(100, pc.loyalty));

        // 2. Anger (Öfke) calculations
        let targetAnger = (100 - pc.loyalty) * 0.75 + (100 - pc.approval) * 0.25;
        
        // Special policy irritation triggers
        if (key === "media" && (state.activePolicies.censorship ?? 0) > 40) {
            targetAnger += (state.activePolicies.censorship - 40) * 0.6;
        }
        if (key === "academia" && (state.activePolicies.censorship ?? 0) > 40) {
            targetAnger += (state.activePolicies.censorship - 40) * 0.4;
        }
        if (key === "academia" && (state.activePolicies.religious_edu ?? 30) > 50) {
            targetAnger += (state.activePolicies.religious_edu - 50) * 0.35;
        }
        if (key === "business" && (state.activePolicies.corporate_tax ?? 20) > 25) {
            targetAnger += (state.activePolicies.corporate_tax - 25) * 0.8;
        }
        if (key === "public" && state.systems.unemployment > 40) {
            targetAnger += (state.systems.unemployment - 40) * 0.5;
        }
        if (key === "military" && (state.activePolicies.defense_alliances ?? 40) < 30) {
            targetAnger += (30 - state.activePolicies.defense_alliances) * 0.6;
        }
        
        pc.anger = Math.round(pc.anger * 0.65 + Math.max(0, Math.min(100, targetAnger)) * 0.35);
        pc.anger = Math.max(0, Math.min(100, pc.anger));

        // 3. Organization (Örgütlenme) calculations
        let orgChange = 0;
        if (pc.anger > 50) {
            orgChange += (pc.anger - 50) * 0.25; // Angry groups coordinate
        } else {
            orgChange -= (50 - pc.anger) * 0.15; // Content groups are passive
        }
        
        orgChange += (pc.influence - 20) * 0.1; // Influence provides resources
        
        // Freedom assists organizing
        if (state.systems.freedom > 55) {
            orgChange += (state.systems.freedom - 55) * 0.15;
        }
        
        // Security suppresses organization (except for forces themselves)
        if (key !== "security" && key !== "military") {
            if (state.systems.security > 60) {
                orgChange -= (state.systems.security - 60) * 0.25;
            }
        }
        
        pc.organization = Math.round(pc.organization + orgChange);
        pc.organization = Math.max(1, Math.min(100, pc.organization));

        // 4. Conspiracy Plot (Gizli Plan) updates
        if (pc.loyalty < 45 && pc.anger > 55 && pc.organization > 40) {
            if (!pc.plot) {
                if (key === "military") pc.plot = "darbe_hazirligi";
                else if (key === "business") pc.plot = "ekonomik_sabotaj";
                else if (key === "media") pc.plot = "koordineli_karalama";
                else if (key === "security") pc.plot = "reform_engelleme";
                else pc.plot = "huzursuzluk_plani";
                pc.plotProgress = 10;
            } else {
                const tick = Math.round((pc.anger - 55) * 0.18 + (pc.organization - 40) * 0.15);
                pc.plotProgress = Math.min(100, pc.plotProgress + Math.max(2, tick));
            }
        } else {
            if (pc.plot) {
                pc.plotProgress = Math.max(0, pc.plotProgress - 10);
                if (pc.plotProgress === 0) {
                    pc.plot = null;
                }
            }
        }
    }

    // 9. Active Risks Consequences
    const activeRisks = calculateActiveRisks(state);
    let riskPcPenalty = 0;
    
    activeRisks.forEach(risk => {
        if (risk.id === "protest_risk") {
            state.stability = Math.max(0, state.stability - 4);
        } else if (risk.id === "riot_risk") {
            state.stability = Math.max(0, state.stability - 10);
        } else if (risk.id === "memorandum_risk") {
            state.stability = Math.max(0, state.stability - 8);
            riskPcPenalty += 5;
        } else if (risk.id === "coup_risk") {
            state.stability = Math.max(0, state.stability - 15);
        } else if (risk.id === "capital_flight") {
            state.systems.economy = Math.max(0, state.systems.economy - 8);
            grossExpenses += 1.5; // Drains ₺1.5B quarterly
        } else if (risk.id === "constitutional_crisis") {
            state.stability = Math.max(0, state.stability - 5);
            riskPcPenalty += 8;
        } else if (risk.id === "media_campaign") {
            riskPcPenalty += 4;
        }
    });

    // 6. Financial Balance
    quarterlyBudgetSurplus = (grossIncome - grossExpenses) * 1000000000;
    state.treasury += quarterlyBudgetSurplus;

    // Apply difficulty modifiers to political capital generation
    let pcMultiplier = 1.0;
    if (state.difficulty === "easy") pcMultiplier = 1.25;
    if (state.difficulty === "hard") pcMultiplier = 0.8;

    // 7. Political Capital Generation (tuned down for tighter gameplay)
    let pcGain = 5 + (state.systems.happiness * 0.08) + (state.systems.media * 0.04) - ((100 - state.stability) * 0.09);
    
    // Add bonus political capital if Foreign minister is extremely competent (better diplomatic status)
    pcGain += (cab.foreign.competence - 50) * 0.08;

    // Judiciary influence penalty: strong judiciary restricts government executive reach, decreasing PC generation
    pcGain -= (judInf - 20) * 0.3;

    pcGain = Math.round(pcGain * pcMultiplier);
    
    // Apply risk penalty
    pcGain = Math.max(0, pcGain - riskPcPenalty);
    
    // Apply Faction Passive Buffs and Penalties
    if (state.regimeWatch) {
        const rw = state.regimeWatch;
        
        // 1. Cemaatler
        if (rw.cemaatler.favor >= 70) {
            state.voterGroups.conservatives.approval = Math.min(100, state.voterGroups.conservatives.approval + 3);
            state.voterGroups.religious.approval = Math.min(100, state.voterGroups.religious.approval + 3);
        } else if (rw.cemaatler.favor <= 30) {
            state.voterGroups.conservatives.approval = Math.max(0, state.voterGroups.conservatives.approval - 3);
            if (state.powerCenters && state.powerCenters.public) {
                state.powerCenters.public.plotProgress = Math.min(100, state.powerCenters.public.plotProgress + 2);
            }
        }

        // 2. Kemalist Bürokrasi
        if (rw.kemalist_burokrasi.favor >= 70) {
            state.stability = Math.min(100, state.stability + 1);
            state.systems.security = Math.min(100, state.systems.security + 1);
        } else if (rw.kemalist_burokrasi.favor <= 30) {
            state.stability = Math.max(0, state.stability - 2);
            if (state.powerCenters && state.powerCenters.judiciary) {
                state.powerCenters.judiciary.plotProgress = Math.min(100, state.powerCenters.judiciary.plotProgress + 3);
            }
        }

        // 3. Büyük Sermaye
        if (rw.buyuk_sermaye.favor >= 70) {
            state.systems.economy = Math.min(100, state.systems.economy + 1);
            state.treasury += 100000000; // +₺100M cash bonus
        } else if (rw.buyuk_sermaye.favor <= 30) {
            state.systems.economy = Math.max(0, state.systems.economy - 2);
        }

        // 4. Süper NATO
        if (rw.super_nato.favor >= 70) {
            state.systems.security = Math.min(100, state.systems.security + 2);
            state.systems.freedom = Math.max(0, state.systems.freedom - 1);
        } else if (rw.super_nato.favor <= 30) {
            state.stability = Math.max(0, state.stability - 1);
            pcGain = Math.max(0, pcGain - 1); // leaks intelligence, restricts PC
        }

        // 5. Sebataycılar
        if (rw.sebataycilar.favor >= 70) {
            state.voterGroups.secular.approval = Math.min(100, state.voterGroups.secular.approval + 3);
            state.systems.media = Math.min(100, state.systems.media + 2);
        } else if (rw.sebataycilar.favor <= 30) {
            state.voterGroups.secular.approval = Math.max(0, state.voterGroups.secular.approval - 3);
            state.systems.media = Math.max(0, state.systems.media - 2);
        }
        
        // Faction Drift Calculations (Regime Watch)
        const relEdu = state.activePolicies.religious_edu ?? 30;
        const corpTax = state.activePolicies.corporate_tax ?? 20;
        const freedom = state.systems.freedom;
        const corruption = state.systems.corruption;
        
        // 1. Cemaatler
        let cemFavorChange = (relEdu - 35) * 0.15 - (freedom - 50) * 0.1;
        rw.cemaatler.favor = Math.max(0, Math.min(100, Math.round(rw.cemaatler.favor + cemFavorChange)));
        
        // 2. Kemalist Bürokrasi
        let kemFavorChange = (freedom - 50) * 0.15 - (relEdu - 30) * 0.15 - (corruption - 30) * 0.1;
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, Math.round(rw.kemalist_burokrasi.favor + kemFavorChange)));
        
        // 3. Büyük Sermaye
        let serFavorChange = (25 - corpTax) * 0.4 + (state.systems.economy - 50) * 0.15 - (corruption - 35) * 0.1;
        rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, Math.round(rw.buyuk_sermaye.favor + serFavorChange)));
        
        // 4. Süper NATO
        let natoFavorChange = (state.systems.security - 55) * 0.15 - (freedom - 55) * 0.08;
        rw.super_nato.favor = Math.max(0, Math.min(100, Math.round(rw.super_nato.favor + natoFavorChange)));
        
        // 5. Sebataycılar
        let sebFavorChange = (state.systems.media - 40) * 0.15 - (state.activePolicies.censorship ?? 10) * 0.15 + (state.voterGroups.secular.approval - 50) * 0.1;
        rw.sebataycilar.favor = Math.max(0, Math.min(100, Math.round(rw.sebataycilar.favor + sebFavorChange)));
        
        // Faction Influence slowly adjusts based on favor and other indicators
        rw.cemaatler.influence = Math.max(10, Math.min(90, Math.round(rw.cemaatler.influence + (rw.cemaatler.favor > 60 ? 1 : rw.cemaatler.favor < 40 ? -1 : 0))));
        rw.kemalist_burokrasi.influence = Math.max(10, Math.min(90, Math.round(rw.kemalist_burokrasi.influence + (rw.kemalist_burokrasi.favor > 60 ? 1 : rw.kemalist_burokrasi.favor < 40 ? -1 : 0))));
        rw.buyuk_sermaye.influence = Math.max(10, Math.min(90, Math.round(rw.buyuk_sermaye.influence + (rw.buyuk_sermaye.favor > 60 ? 1 : -0.5))));
        rw.super_nato.influence = Math.max(10, Math.min(90, Math.round(rw.super_nato.influence + (state.systems.security > 65 ? 0.8 : -0.5))));
        rw.sebataycilar.influence = Math.max(10, Math.min(90, Math.round(rw.sebataycilar.influence + (state.systems.media > 60 ? 1 : -0.5))));

        // --- FACTION ALLIANCES & CONSPIRACY PLOTS ---
        // Find angry factions (favor <= 35)
        const angryKeys = [];
        for (const key in rw) {
            rw[key].activeAlliance = null; // Clear old alliance tags
            if (rw[key].favor <= 35) {
                angryKeys.push(key);
            }
        }

        let allianceName = null;
        let allianceType = null;
        if (angryKeys.length >= 2) {
            // Determine alliance type
            if (angryKeys.includes("cemaatler") && angryKeys.includes("kemalist_burokrasi")) {
                allianceName = "Milli Selamet İttifakı";
                allianceType = "cemaat_kemalist";
            } else if (angryKeys.includes("cemaatler") && angryKeys.includes("buyuk_sermaye")) {
                allianceName = "Anadolu Sermaye Koalisyonu";
                allianceType = "cemaat_sermaye";
            } else if (angryKeys.includes("super_nato") && angryKeys.includes("buyuk_sermaye")) {
                allianceName = "Atlantikçi Blok";
                allianceType = "nato_sermaye";
            } else if (angryKeys.includes("kemalist_burokrasi") && angryKeys.includes("super_nato")) {
                allianceName = "Derin Devlet Cephesi";
                allianceType = "kemalist_nato";
            } else if (angryKeys.includes("buyuk_sermaye") && angryKeys.includes("sebataycilar")) {
                allianceName = "Medya-Finans Karteli";
                allianceType = "sermaye_seb";
            } else {
                allianceName = "Hükümet Karşıtı Koalisyon";
                allianceType = "generic_alliance";
            }

            // Set active alliance tag
            angryKeys.forEach(k => {
                rw[k].activeAlliance = allianceName;
            });
        }

        // Update plot progression
        for (const key in rw) {
            const f = rw[key];
            if (f.favor <= 35) {
                let gain = 4; // Individual plot gain
                if (f.activeAlliance) {
                    gain = 8; // Faster gain in coalition!
                }
                f.plotProgress = Math.min(100, (f.plotProgress || 0) + gain);
                
                // Log warning if progress is high
                if (f.plotProgress >= 60 && f.plotProgress % 2 === 0) {
                    const origin = f.activeAlliance ? `${f.activeAlliance} ittifakı` : `${f.name}`;
                    state.logs.push(`İSTİHBARAT UYARISI: ${origin} tarafından hükümete karşı yürütülen gizli plan olgunlaşıyor (İlerleme: %${f.plotProgress})!`);
                }
            } else {
                // Decay plot progress if faction is happy/neutral
                f.plotProgress = Math.max(0, (f.plotProgress || 0) - 10);
            }
        }
    }

    state.politicalCapital = Math.max(0, Math.min(200, state.politicalCapital + pcGain));

    // ==========================================
    // FACTION POWER VACUUM DRIFT & NORMALIZATION (Zero-Sum Game)
    // ==========================================
    if (state.regimeWatch) {
        const rw = state.regimeWatch;
        
        // 1. Enforce minimum influence of 5
        for (const key in rw) {
            rw[key].influence = Math.max(5, rw[key].influence);
        }
        
        // 2. Power Vacuum Drift
        if (rw.cemaatler.influence < 15) {
            rw.kemalist_burokrasi.influence += 1.5;
            rw.cemaatler.influence = Math.max(5, rw.cemaatler.influence - 1.5);
        }
        if (rw.kemalist_burokrasi.influence < 15) {
            rw.buyuk_sermaye.influence += 1.5;
            rw.kemalist_burokrasi.influence = Math.max(5, rw.kemalist_burokrasi.influence - 1.5);
        }
        if (rw.buyuk_sermaye.influence < 15) {
            rw.super_nato.influence += 0.75;
            rw.sebataycilar.influence += 0.75;
            rw.buyuk_sermaye.influence = Math.max(5, rw.buyuk_sermaye.influence - 1.5);
        }
        if (rw.super_nato.influence < 15) {
            rw.kemalist_burokrasi.influence += 1.5;
            rw.super_nato.influence = Math.max(5, rw.super_nato.influence - 1.5);
        }
        if (rw.sebataycilar.influence < 15) {
            rw.cemaatler.influence += 1.5;
            rw.sebataycilar.influence = Math.max(5, rw.sebataycilar.influence - 1.5);
        }

        // 3. Zero-Sum Normalization: scale all influences so their sum is exactly 210
        let sum = 0;
        for (const key in rw) {
            sum += rw[key].influence;
        }
        if (sum > 0) {
            for (const key in rw) {
                rw[key].influence = Math.max(5, Math.min(95, Math.round((rw[key].influence / sum) * 210)));
            }
        }
    }

    // ==========================================
    // PURGE PROGRESSION (Multiphase Purges)
    // ==========================================
    if (state.activePurge && state.activePurge.target) {
        const p = state.activePurge;
        if (p.stage === 1) {
            // Stage 1 -> 2 (Evidence Collection)
            const jud = state.powerCenters.judiciary.approval;
            const sec = state.systems.security;
            const gain = Math.round((jud + sec) / 7 + Math.random() * 5);
            p.evidenceQuality = Math.min(100, p.evidenceQuality + gain);
            p.stage = 2;
            state.logs.push(`OPERASYON SÜRECİ (AŞAMA 2): ${state.regimeWatch[p.target].name} grubuna karşı delil toplama evresine geçildi. Kanıt kalitesi artıyor.`);
        } else if (p.stage === 2) {
            // Stage 2 -> 3 (Public Preparation)
            const med = state.powerCenters.media.approval;
            const pub = state.powerCenters.public.approval;
            const gain = Math.round((med + pub) / 7 + Math.random() * 5);
            p.publicPrep = Math.min(100, p.publicPrep + gain);
            p.stage = 3;
            state.logs.push(`OPERASYON SÜRECİ (AŞAMA 3): ${state.regimeWatch[p.target].name} tasfiyesi için kamuoyu hazırlığı evresine geçildi. Medya desteği aranıyor.`);
        } else if (p.stage === 3) {
            // Stage 3 -> 4 (Execution Decision)
            p.stage = 4;
            state.logs.push(`OPERASYON KRİTİK EŞİKTE (AŞAMA 4): ${state.regimeWatch[p.target].name} tasfiye planı tamamlandı. Operasyon kararı bekleniyor!`);
        }
    }

    // ==========================================
    // GİZLİ DOSYALAR (Secret Files Resolution & Generation)
    // ==========================================
    // 1. Resolve ignored files from previous turn - increased penalties for ignoring true threats
    if (state.secretFile && state.secretFile.status === 'ignored') {
        if (state.secretFile.isTrue) {
            const stabilityPenalty = Math.round(25 + Math.random() * 10); // 25% - 35% stability penalty
            state.stability = Math.max(0, state.stability - stabilityPenalty);
            state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 15);
            state.systems.security = Math.max(0, state.systems.security - 12);
            state.logs.push(`SIZDIRILAN BELGELER & MİLLİ KRİZ: Önceden görmezden geldiğiniz MİT raporu doğru çıktı! Gizli plan gerçekleşti. İstikrar -%${stabilityPenalty}, Güvenlik -%12, Halk Desteği -%15!`);
            state.systems.media = Math.max(0, state.systems.media - 8);
        } else {
            state.logs.push("İSTİHBARAT ARŞİVİ: Görmezden gelinen raporun asılsız olduğu anlaşıldı. Kriz atlatıldı.");
        }
        state.secretFile = null;
    }
    // 2. Resolve monitored files - increased rewards for technical tracking
    else if (state.secretFile && state.secretFile.status === 'monitored') {
        if (state.secretFile.isTrue) {
            state.stability = Math.min(100, state.stability + 10);
            state.systems.security = Math.min(100, state.systems.security + 6);
            state.politicalCapital = Math.min(200, state.politicalCapital + 15);
            state.logs.push(`TEKNİK TAKİP BAŞARILI: ${state.secretFile.text.substring(0, 30)}... takibi sonuç verdi, komplo planı belgelendi ve çökertildi! (+15 PC, +10 İstikrar, +6 Güvenlik)`);
        } else {
            state.logs.push("TAKİP SONUCU: Hedeflerin rutin faaliyetler içinde olduğu anlaşıldı, dosya kapatıldı.");
        }
        state.secretFile = null;
    }
    // 3. Resolve investigated files
    else if (state.secretFile && state.secretFile.status === 'investigated') {
        state.secretFile = null;
    }

    // 4. Generate new Secret File for next turn
    const secretFileDatabase = [
        {
            id: "mit_aym_muhalefet",
            text: "Yüksek yargı mensuplarının muhalefet liderleriyle gizli anayasa taslağı ve yetki devri planları hazırladığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_darbe_toplantisi",
            text: "Ordu içindeki cuntacı kliği temsil eden subayların Ankara dışındaki bir villada gizli darbe toplantıları yaptığı bildirildi.",
            condition: (s) => true
        },
        {
            id: "mit_cemaat_atama",
            text: "Emniyet ve yargı bürokrasisinde yuvalanan radikal bir dini cemaatin, stratejik kadrolara yerleştirmek üzere yasadışı atama listesi hazırladığı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_holding_sermaye",
            text: "Büyük holdinglerin ve finans spekülatörlerinin koordine bir sermaye kaçırma operasyonuyla Türk Lirası'nı çökerteceği istihbaratı alındı.",
            condition: (s) => true
        },
        {
            id: "mit_kontrgerilla_sabotaj",
            text: "Gladio ve NATO bağlantılı derin devlet unsurlarının, doğalgaz boru hatları ve kritik barajlara yönelik sabotaj eylemleri planladığı sızdı.",
            condition: (s) => true
        },
        {
            id: "mit_medya_istifa",
            text: "Kültürel elitlerin ve medya baronlarının koordine bir karalama kampanyasıyla kabineyi topluca istifaya sürükleme planı deşifre edildi.",
            condition: (s) => true
        },
        {
            id: "mit_tarikat_ihale",
            text: "Milli Savunma Bakanlığı içindeki bazı tarikat hücrelerinin, devlet ihalelerini doğrudan kendi cemaat vakıflarına aktardığı bilgisi sızdırılmak üzere.",
            condition: (s) => true
        },
        {
            id: "mit_kabine_darbesi",
            text: "Kabine içindeki bazı bakanların parti içi muhalefetle işbirliği yaparak genel başkanlık darbesi planladığı rapor edildi.",
            condition: (s) => true
        },
        {
            id: "mit_kamu_bankasi_doviz",
            text: "Kamu bankalarının arka kapıdan milyarlarca dolar satarak kuru baskılama çabalarının sızdırılacağı ve finansal panik yaratılacağı ihbarı alındı.",
            condition: (s) => true
        },
        {
            id: "mit_sendika_kaos",
            text: "Radikal sol sendika liderlerinin, sanayi havzalarında üretimi süresiz durdurmak üzere illegal koordinasyon hücreleri kurduğu belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_ab_fonu_fonlama",
            text: "AB merkezli vakıfların, çevre platformları maskesi altında nükleer santral ve mega projeleri durdurmak için fon aktardığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_emniyet_cemaat_tasfiye",
            text: "Emniyetteki bir cemaat kliği, seküler polis müdürlerine karşı sahte kaset ve kumpas delilleri üretirken suçüstü tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_yargi_rusvet_zinciri",
            text: "Yüksek yargı üyeleri ile organize suç örgütleri arasında milyon dolarlık tahliye rüşvet zinciri kurulduğu bilgisi ulaştı.",
            condition: (s) => true
        },
        {
            id: "mit_universite_genc_protesto",
            text: "Üniversitelerde sol öğrenci kulüplerinin, rejim karşıtı kitlesel sokak çatışmaları başlatmak üzere Molotof deposu kurduğu tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_savunma_sanayi_casusluk",
            text: "Milli savunma sanayi şirketindeki bazı yazılım mühendislerinin, insansız sistem kodlarını yabancı istihbarat servislerine sattığı belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_diyanet_vakif_yolsuzluk",
            text: "Diyanet bütçesinden bazı cemaatlerin lüks araç alımları ve tarikat vakıf binalarının inşasının fonlandığına dair belgeler basına sızmak üzere.",
            condition: (s) => true
        },
        {
            id: "mit_belediye_halk_parasi",
            text: "Muhalefet belediyelerinin, sosyal yardım adı altında terör örgütünün gençlik yapılanmalarına finansal fon aktardığı belgelendi.",
            condition: (s) => true
        },
        {
            id: "mit_hazine_tahvil_sabotaj",
            text: "Yabancı fonların devlet tahvillerine yönelik koordine bir satış dalgasıyla Türkiye'yi temerrüde zorlama planı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_tarim_gida_karteli",
            text: "Büyük tarım ve gıda kartellerinin enflasyon algısı oluşturmak ve hükümeti devirmek için tonlarca patates ve soğanı çürüterek imha ettiği saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_kripto_vergi_kacakciligi",
            text: "İş dünyasından önemli isimlerin ve bürokratların kripto borsaları üzerinden yurt dışına milyarlarca dolarlık vergisiz servet transfer ettiği belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_liman_kacakcilik",
            text: "Kritik bir Ege limanında gümrük yetkililerinin rüşvet karşılığı yasadışı kargo ve tehlikeli madde geçişine göz yumduğu istihbaratı ulaştı.",
            condition: (s) => true
        },
        {
            id: "mit_yargic_tehdit",
            text: "Hükümetin kritik tasfiye davasına bakan mahkeme başkanına yönelik mafya tarafından şantaj veya suikast hazırlığı yapıldığı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_enerji_siber_saldiri",
            text: "Yabancı bir siber cunta grubunun, devletin elektrik dağıtım ve doğalgaz SCADA şebekesine siber saldırı düzenleme hazırlığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_sinir_kacakci_gecis",
            text: "Güney sınırındaki bazı yerel milis şefleri ve korucuların rüşvet karşılığı radikal militan geçişlerine yardım ettiği rapor edildi.",
            condition: (s) => true
        },
        {
            id: "mit_yabanci_elci_fonu",
            text: "Bir Batı elçiliğinin, sivil toplum örgütleri ve gazeteciler üzerinden etki ajanlığı faaliyetlerini fonlamak için gizli banka hesapları kullandığı belirlendi.",
            condition: (s) => true
        }
    ];

    if (!state.triggeredSecretFiles) {
        state.triggeredSecretFiles = [];
    }

    // Filter by conditions and not triggered yet
    let availableFiles = secretFileDatabase.filter(file => file.condition(state) && !state.triggeredSecretFiles.includes(file.id));

    if (availableFiles.length === 0) {
        // Fallback: search for any untriggered reports regardless of condition
        availableFiles = secretFileDatabase.filter(file => !state.triggeredSecretFiles.includes(file.id));
    }

    if (availableFiles.length === 0) {
        // If all reports have been shown, reset history to allow repeats
        state.triggeredSecretFiles = [];
        availableFiles = secretFileDatabase;
    }

    // Pick one
    const chosenFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
    state.triggeredSecretFiles.push(chosenFile.id);

    const reliability = Math.round(25 + Math.random() * 60); // 25% - 85%
    const isTrue = Math.random() < (reliability / 100);

    state.secretFile = {
        id: 200 + state.turn,
        secretFileId: chosenFile.id, // Keep track of template ID
        text: chosenFile.text,
        reliability: reliability,
        isTrue: isTrue,
        status: 'pending'
    };

    // ==========================================
    // CABINET MINISTER LOYALTY DRIFT (Ideology Clash)
    // ==========================================
    if (state.cabinet) {
        for (const portfolio in state.cabinet) {
            const min = state.cabinet[portfolio];
            let clash = false;
            
            // Check clash conditions
            if (state.ideology === "conservative" || (state.regimeWatch && state.regimeWatch.cemaatler.favor > 65)) {
                if (min.ideology === "secular" || min.ideology === "liberal" || min.ideology === "center_left") {
                    clash = true;
                }
            }
            if (state.ideology === "kemalist_secular" || (state.regimeWatch && state.regimeWatch.kemalist_burokrasi.favor > 65)) {
                if (min.ideology === "conservative" || min.ideology === "religious" || min.ideology === "islamist") {
                    clash = true;
                }
            }
            if (state.ideology === "liberal" || (state.regimeWatch && state.regimeWatch.buyuk_sermaye.favor > 65)) {
                if (min.ideology === "leftist" || min.ideology === "nationalist") {
                    clash = true;
                }
            }
            
            if (clash) {
                min.loyalty = Math.max(0, min.loyalty - Math.round(4 + Math.random() * 4));
            } else {
                min.loyalty = Math.min(100, min.loyalty + 2);
            }
        }
    }

    // ==========================================
    // FACTION DEMANDS SYSTEM
    // ==========================================
    if (state.activeDemand) {
        const d = state.activeDemand;
        const currentValue = state.activePolicies[d.target] ?? null;
        let isMet = false;
        
        if (d.op === "gte" && currentValue !== null && currentValue >= d.value) {
            isMet = true;
        } else if (d.op === "lte" && currentValue !== null && currentValue <= d.value) {
            isMet = true;
        } else if (d.op === "null" && currentValue === null) {
            isMet = true;
        }
        
        if (isMet) {
            const faction = state.regimeWatch[d.faction];
            if (faction) {
                faction.favor = Math.min(100, faction.favor + 20);
            }
            state.stability = Math.min(100, state.stability + 5);
            state.politicalCapital = Math.min(200, state.politicalCapital + 8);
            state.logs.push(`YASA TALEBİ YERİNE GETİRİLDİ: ${faction ? faction.name : d.faction} talebinin yasalaşması üzerine desteğini artırdı! (+20 İlişki, +5 İstikrar, +8 PC)`);
            state.activeDemand = null;
        } else if (state.turn >= d.deadline) {
            const faction = state.regimeWatch[d.faction];
            if (faction) {
                faction.favor = Math.max(0, faction.favor - 25);
            }
            state.logs.push(`YASA TALEBİ BAŞARISIZ: ${faction ? faction.name : d.faction} grubunun talep ettiği yasa süresi içinde çıkarılmadı! İlişki -25.`);
            state.activeDemand = null;
        }
    }

    if (!state.activeDemand && state.turn >= 2 && Math.random() < 0.35) {
        const demandDatabase = [
            {
                faction: "cemaatler",
                target: "religious_edu",
                value: 50,
                op: "gte",
                text: "Cemaatler, din eğitimi ağırlığının (religious_edu) en az %50 seviyesine çıkarılmasını istiyor."
            },
            {
                faction: "cemaatler",
                target: "censorship",
                value: 40,
                op: "gte",
                text: "Cemaatler, sosyal ahlak yasası uyarınca sansürün (censorship) en az %40 yapılmasını istiyor."
            },
            {
                faction: "kemalist_burokrasi",
                target: "religious_edu",
                value: 20,
                op: "lte",
                text: "Kemalist Bürokrasi, din eğitimi ağırlığının (religious_edu) en fazla %20'ye indirilmesini talep ediyor."
            },
            {
                faction: "kemalist_burokrasi",
                target: "minority_rights",
                value: 40,
                op: "gte",
                text: "Kemalist Bürokrasi, anayasal güvence için azınlık haklarının (minority_rights) en az %40 yapılmasını istiyor."
            },
            {
                faction: "buyuk_sermaye",
                target: "corporate_tax",
                value: 15,
                op: "lte",
                text: "Büyük Sermaye, kurumlar vergisinin (corporate_tax) en fazla %15 seviyesine çekilmesini istiyor."
            },
            {
                faction: "buyuk_sermaye",
                target: "income_tax",
                value: 20,
                op: "lte",
                text: "Büyük Sermaye, gelir vergisinin (income_tax) en fazla %20 yapılmasını istiyor."
            },
            {
                faction: "super_nato",
                target: "police_funding",
                value: 60,
                op: "gte",
                text: "Süper NATO, terörle mücadele için polis bütçesinin (police_funding) en az %60 olmasını talep ediyor."
            },
            {
                faction: "super_nato",
                target: "border_control",
                value: 50,
                op: "gte",
                text: "Süper NATO, sınır güvenliğinin (border_control) en az %50'ye çıkarılmasını istiyor."
            },
            {
                faction: "sebataycilar",
                target: "censorship",
                value: 20,
                op: "lte",
                text: "Sebataycı seçkinler, basın özgürlüğü için sansürün (censorship) en fazla %20 yapılmasını istiyor."
            },
            {
                faction: "sebataycilar",
                target: "education_budget",
                value: 55,
                op: "gte",
                text: "Sebataycı seçkinler, bilimsel kalkınma için eğitim bütçesinin (education_budget) en az %55 olmasını talep ediyor."
            }
        ];

        const picked = demandDatabase[Math.floor(Math.random() * demandDatabase.length)];
        state.activeDemand = {
            faction: picked.faction,
            target: picked.target,
            value: picked.value,
            op: picked.op,
            text: picked.text,
            deadline: state.turn + 3
        };
        state.logs.push(`GÜÇ GRUBU TALEBİ: ${state.regimeWatch[picked.faction].name} hükümete bir yasa talebi iletti! Talep: ${picked.text} (Süre: 3 Çeyrek)`);
    }

    // ==========================================
    // CASCADE EFFECTS ENGINE (Zincirleme Etkiler)
    // ==========================================
    runCascadeEffects(state);

    // ==========================================
    // VOTER ALLIANCE DETECTION (Seçmen İttifakları)
    // ==========================================
    checkVoterAlliances(state);

    // ==========================================
    // IDEOLOGY DRIFT (İdeoloji Kayması)
    // ==========================================
    updateIdeologyDrift(state);

    return {
        surplus: quarterlyBudgetSurplus,
        pcGain: pcGain,
        protestRisk: Math.round(averageProtestRisk)
    };
}

// ==========================================
// CASCADE EFFECTS (Zincirleme Etkiler Motoru)
// ==========================================
function runCascadeEffects(state) {
    const cascadeLogs = [];

    // 1. Economy collapse → Worker/Retiree/Public rage
    if (state.systems.economy < 35) {
        const severity = (35 - state.systems.economy) * 0.4;
        state.voterGroups.workers.approval = Math.max(0, Math.round(state.voterGroups.workers.approval - severity));
        state.voterGroups.retirees.approval = Math.max(0, Math.round(state.voterGroups.retirees.approval - severity * 0.8));
        state.powerCenters.public.approval = Math.max(0, Math.round(state.powerCenters.public.approval - severity * 0.6));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Ekonomik çöküş işçi ve emekli kesimlerinde sert tepkiye yol açıyor.`);
    }

    // 2. Freedom suppression → Academia/Media revolt
    if (state.systems.freedom < 30) {
        const severity = (30 - state.systems.freedom) * 0.5;
        state.powerCenters.academia.approval = Math.max(0, Math.round(state.powerCenters.academia.approval - severity));
        state.powerCenters.media.approval = Math.max(0, Math.round(state.powerCenters.media.approval - severity * 0.8));
        state.voterGroups.students.approval = Math.max(0, Math.round(state.voterGroups.students.approval - severity * 0.6));
        state.voterGroups.youth.approval = Math.max(0, Math.round(state.voterGroups.youth.approval - severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Özgürlük baskısı akademi ve medyada isyan dalgası başlatıyor.`);
    }

    // 3. High security → Military power creep
    if (state.systems.security > 80) {
        const creep = (state.systems.security - 80) * 0.15;
        state.powerCenters.military.influence = Math.min(50, state.powerCenters.military.influence + creep);
        state.powerCenters.security.influence = Math.min(50, state.powerCenters.security.influence + creep * 0.5);
        state.systems.freedom = Math.max(0, Math.round(state.systems.freedom - creep * 0.8));
        if (creep > 1) cascadeLogs.push(`ZİNCİRLEME ETKİ: Aşırı güvenlik politikaları ordu ve emniyetin nüfuzunu artırıyor.`);
    }

    // 4. High inflation → Worker/Retiree/Farmer devastation
    if (state.systems.inflation > 60) {
        const severity = (state.systems.inflation - 60) * 0.4;
        state.voterGroups.workers.approval = Math.max(0, Math.round(state.voterGroups.workers.approval - severity));
        state.voterGroups.retirees.approval = Math.max(0, Math.round(state.voterGroups.retirees.approval - severity * 1.2));
        state.voterGroups.farmers.approval = Math.max(0, Math.round(state.voterGroups.farmers.approval - severity * 0.7));
        state.voterGroups.civil_servants.approval = Math.max(0, Math.round(state.voterGroups.civil_servants.approval - severity * 0.8));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Enflasyon patlaması dar gelirlileri eziyor, sokak protestoları yayılıyor.`);
    }

    // 5. High corruption → Judiciary auto-opposition
    if (state.systems.corruption > 50) {
        const severity = (state.systems.corruption - 50) * 0.35;
        state.powerCenters.judiciary.approval = Math.max(0, Math.round(state.powerCenters.judiciary.approval - severity));
        state.powerCenters.judiciary.anger = Math.min(100, Math.round(state.powerCenters.judiciary.anger + severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Artan yolsuzluk yargıyı hükümete karşı mobilize ediyor.`);
    }

    // 6. Media control + bad economy = hidden dissent explosion
    if (state.systems.media > 60 && state.systems.economy < 40) {
        state.powerCenters.public.anger = Math.min(100, state.powerCenters.public.anger + 3);
        state.stability = Math.max(0, state.stability - 2);
        cascadeLogs.push(`ZİNCİRLEME ETKİ: Medya propagandası ekonomik gerçekleri örtbas ediyor ama halk öfkesi gizlice kaynıyor.`);
    }

    // 7. Education boom → Secularization pressure
    if (state.systems.education > 70) {
        const drift = (state.systems.education - 70) * 0.08;
        state.voterGroups.secular.approval = Math.min(100, Math.round(state.voterGroups.secular.approval + drift));
        state.voterGroups.youth.approval = Math.min(100, Math.round(state.voterGroups.youth.approval + drift * 0.6));
        state.voterGroups.conservatives.approval = Math.max(0, Math.round(state.voterGroups.conservatives.approval - drift * 0.4));
        state.voterGroups.religious.approval = Math.max(0, Math.round(state.voterGroups.religious.approval - drift * 0.5));
    }

    // 8. Unemployment crisis → Youth radicalization
    if (state.systems.unemployment > 55) {
        const severity = (state.systems.unemployment - 55) * 0.3;
        state.voterGroups.youth.approval = Math.max(0, Math.round(state.voterGroups.youth.approval - severity));
        state.voterGroups.students.protestRisk = Math.min(100, Math.round(state.voterGroups.students.protestRisk + severity));
        state.powerCenters.public.anger = Math.min(100, Math.round(state.powerCenters.public.anger + severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: İşsizlik krizi gençleri radikalleştiriyor, kampüslerde huzursuzluk artıyor.`);
    }

    // 9. Decree rule + ignore courts → Judiciary crisis accelerator
    if ((state.activePolicies.decree_rule ?? 0) > 30 && (state.activePolicies.ignore_courts ?? 0) > 30) {
        state.powerCenters.judiciary.approval = Math.max(0, state.powerCenters.judiciary.approval - 5);
        state.powerCenters.judiciary.anger = Math.min(100, state.powerCenters.judiciary.anger + 5);
        cascadeLogs.push(`ZİNCİRLEME ETKİ: Kararname yönetimi ve yargı kararlarını tanımama, anayasal kriz riskini tırmandırıyor.`);
    }

    // 10. Private militia → Military jealousy and anger
    if ((state.activePolicies.private_militia ?? 0) > 20) {
        const milAnger = ((state.activePolicies.private_militia ?? 0) - 20) * 0.15;
        state.powerCenters.military.approval = Math.max(0, Math.round(state.powerCenters.military.approval - milAnger));
        state.powerCenters.military.anger = Math.min(100, Math.round(state.powerCenters.military.anger + milAnger * 0.8));
        if (milAnger > 2) cascadeLogs.push(`ZİNCİRLEME ETKİ: Paramiliter milis güçleri orduyu rahatsız ediyor, kışlada darbe söylentileri yayılıyor.`);
    }

    // Add cascade logs to state
    cascadeLogs.forEach(log => state.logs.push(log));
}

// ==========================================
// VOTER ALLIANCE SYSTEM (Seçmen İttifakları)
// ==========================================
function checkVoterAlliances(state) {
    const alliances = [];
    const vg = state.voterGroups;

    // 1. EMEK CEPHESİ (Labor Front) - Workers + Leftists + Students
    if (vg.workers.approval < 30 && vg.leftists.approval < 30 && vg.students.approval < 35) {
        alliances.push({
            id: "emek_cephesi",
            name: "Emek Cephesi",
            members: ["İşçiler", "Solcular", "Öğrenciler"],
            threat: "Genel Grev ve Fabrika İşgalleri",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "emek_cephesi")?.progress || 0) + 12)
        });
    }

    // 2. MİLLİYETÇİ BLOK - Nationalists + Conservatives + Farmers
    if (vg.nationalists.approval < 30 && vg.conservatives.approval < 30 && vg.farmers.approval < 35) {
        alliances.push({
            id: "milliyetci_blok",
            name: "Milliyetçi Blok",
            members: ["Milliyetçiler", "Muhafazakarlar", "Çiftçiler"],
            threat: "Büyük Miting ve Hükümet İstifası Talebi",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "milliyetci_blok")?.progress || 0) + 10)
        });
    }

    // 3. LİBERAL MUHALEFET - Liberals + Business + Secular
    if (vg.liberals.approval < 30 && vg.business.approval < 30 && vg.secular.approval < 35) {
        alliances.push({
            id: "liberal_muhalefet",
            name: "Liberal Muhalefet Cephesi",
            members: ["Liberaller", "İş Dünyası", "Seküler Kesim"],
            threat: "Sermaye Kaçışı ve Medya Bombardımanı",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "liberal_muhalefet")?.progress || 0) + 10)
        });
    }

    // 4. ETNİK DİRENİŞ - Kurds + Immigrants + Leftists
    if (vg.kurds.approval < 25 && vg.immigrants.approval < 30 && vg.leftists.approval < 30) {
        alliances.push({
            id: "etnik_direnis",
            name: "Etnik Direniş Hareketi",
            members: ["Kürt Seçmen", "Göçmenler", "Solcular"],
            threat: "Bölgesel İsyan ve Sivil İtaatsizlik",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "etnik_direnis")?.progress || 0) + 8)
        });
    }

    // 5. GENÇLİK İSYANI - Youth + Students + Workers
    if (vg.youth.approval < 25 && vg.students.approval < 25 && vg.workers.approval < 30) {
        alliances.push({
            id: "genclik_isyani",
            name: "Gençlik İsyanı",
            members: ["Gençler", "Öğrenciler", "İşçiler"],
            threat: "Kampüs İşgalleri ve Sokak Çatışmaları",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "genclik_isyani")?.progress || 0) + 12)
        });
    }

    // 6. DİNDAR KOALİSYON - Religious + Conservatives vs government
    if (vg.religious.approval < 25 && vg.conservatives.approval < 30) {
        alliances.push({
            id: "dindar_koalisyon",
            name: "Dindar Koalisyon",
            members: ["Dinciler", "Muhafazakarlar"],
            threat: "Cami Vaazlarında İsyan Çağrısı ve Sivil İtaatsizlik",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "dindar_koalisyon")?.progress || 0) + 10)
        });
    }

    // Decay progress for alliances that no longer meet conditions
    const previousAlliances = state.voterAlliances || [];
    previousAlliances.forEach(prev => {
        if (!alliances.find(a => a.id === prev.id)) {
            prev.progress = Math.max(0, prev.progress - 15);
            if (prev.progress > 0) {
                alliances.push(prev);
            }
        }
    });

    // Log warnings for high-progress alliances
    alliances.forEach(a => {
        if (a.progress >= 70 && a.progress % 2 === 0) {
            state.logs.push(`⚠️ SEÇMEN İTTİFAKI ALARMI: "${a.name}" (${a.members.join(' + ')}) komplo planı olgunlaşıyor (%${a.progress})! Tehdit: ${a.threat}`);
        }
    });

    state.voterAlliances = alliances;
}

// ==========================================
// IDEOLOGY DRIFT (İdeoloji Kayma Sistemi)
// ==========================================
function updateIdeologyDrift(state) {
    if (!state.ideologyDrift) {
        state.ideologyDrift = { conservative: 0, kemalist_secular: 0, center_left: 0, liberal: 0, nationalist: 0, technocrat: 0 };
    }

    const drift = state.ideologyDrift;
    const ap = state.activePolicies;

    // Conservative drift triggers
    if ((ap.censorship ?? 0) > 40) drift.conservative += 2;
    if ((ap.religious_edu ?? 0) > 50) drift.conservative += 3;
    if ((ap.laiklik_abolition ?? 0) > 20) drift.conservative += 4;
    if ((ap.multilateral_law ?? 0) > 20) drift.conservative += 3;
    if ((ap.mandatory_ottoman ?? 0) > 20) drift.conservative += 3;

    // Kemalist secular drift triggers
    if ((ap.ban_religious_sects ?? 0) > 30) drift.kemalist_secular += 3;
    if (state.systems.freedom > 55 && (ap.religious_edu ?? 0) < 20) drift.kemalist_secular += 2;
    if ((ap.end_uni_autonomy ?? 0) < 10 && state.systems.education > 60) drift.kemalist_secular += 1;

    // Center-left drift triggers
    if ((ap.ubi ?? 0) > 30) drift.center_left += 3;
    if ((ap.political_amnesty ?? 0) > 30) drift.center_left += 3;
    if ((ap.land_reform ?? 0) > 30) drift.center_left += 4;
    if ((ap.women_safety ?? 0) > 60) drift.center_left += 2;

    // Liberal drift triggers
    if ((ap.corporate_tax ?? 20) < 15) drift.liberal += 2;
    if ((ap.healthcare_priv ?? 0) > 40) drift.liberal += 2;
    if ((ap.imf_cooperation ?? 0) > 30) drift.liberal += 3;
    if ((ap.internet_freedom ?? 50) > 70) drift.liberal += 1;
    if ((ap.privatize_water ?? 0) > 30) drift.liberal += 2;

    // Nationalist drift triggers
    if ((ap.capital_punishment ?? 0) > 30) drift.nationalist += 2;
    if ((ap.conscription_extend ?? 0) > 30) drift.nationalist += 3;
    if ((ap.nato_exit ?? 0) > 30) drift.nationalist += 4;
    if ((ap.seize_foreign_assets ?? 0) > 30) drift.nationalist += 3;
    if ((ap.border_control ?? 30) > 60) drift.nationalist += 2;
    if ((ap.migrant_repatriation ?? 0) > 40) drift.nationalist += 2;

    // Technocrat drift triggers
    if ((ap.automation_subsidy ?? 0) > 40) drift.technocrat += 2;
    if (state.systems.education > 65) drift.technocrat += 1;
    if ((ap.nuclear_plants ?? 0) > 30) drift.technocrat += 2;
    if ((ap.ban_gasoline_cars ?? 0) > 30) drift.technocrat += 2;

    // Decay all drift scores slowly toward 0
    for (const key in drift) {
        if (drift[key] > 0) drift[key] = Math.max(0, drift[key] - 1);
    }

    // Check if drift is strong enough to suggest ideology change
    const maxDrift = Math.max(...Object.values(drift));
    const maxKey = Object.keys(drift).find(k => drift[k] === maxDrift);

    if (maxDrift >= 25 && maxKey !== state.ideology) {
        state.logs.push(`⚠️ İDEOLOJİK KAYMA: Politikalarınız sizi "${getIdeologyLabel(maxKey)}" yönüne doğru çekiyor (Baskı: ${maxDrift}). İdeolojik dönüşüm kapınızda!`);
    }
}

function getIdeologyLabel(id) {
    const labels = {
        conservative: "Muhafazakâr",
        kemalist_secular: "Kemalist / Laik",
        center_left: "Merkez Sol",
        liberal: "Liberal",
        nationalist: "Milliyetçi",
        technocrat: "Teknokrat"
    };
    return labels[id] || id;
}




function calculateActiveRisks(state) {
    const risks = [];
    if (!state.powerCenters) return risks;

    if (state.powerCenters.public.approval < 20) {
        risks.push({
            id: "protest_risk",
            name: "Protesto Riski",
            desc: "Düşük halk desteği nedeniyle sokak eylemleri ve protestolar yaygınlaşıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.public.approval < 10) {
        risks.push({
            id: "riot_risk",
            name: "İsyan Riski",
            desc: "Halk desteğinin tamamen çökmesiyle rejim karşıtı kitlesel isyanlar tetiklenmek üzere.",
            severity: "high"
        });
    }
    if (state.powerCenters.military.approval < 20 && state.stability < 40) {
        risks.push({
            id: "memorandum_risk",
            name: "Askeri Muhtıra Riski",
            desc: "Ordu komuta kademesi istikrarsızlıktan rahatsız, hükümete bildiri yayınlama eşiğinde.",
            severity: "high"
        });
    }
    if (state.powerCenters.military.approval < 10 && state.stability < 25) {
        risks.push({
            id: "coup_risk",
            name: "Darbe Girişimi Riski",
            desc: "Ordu içindeki cuntalar darbe hazırlığı yapıyor, rejim tehlikede!",
            severity: "critical"
        });
    }
    if (state.powerCenters.business.approval < 20) {
        risks.push({
            id: "capital_flight",
            name: "Sermaye Kaçışı",
            desc: "İş dünyasının güven kaybı nedeniyle yerli ve yabancı sermaye hızla yurt dışına kaçıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.judiciary.approval < 20) {
        risks.push({
            id: "constitutional_crisis",
            name: "Anayasal Kriz",
            desc: "Yargı kurumları ile hükümet arasında anayasal yetki uyuşmazlığı ve kriz yaşanıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.media.approval < 20) {
        risks.push({
            id: "media_campaign",
            name: "Hükümet Karşıtı Kampanyalar",
            desc: "Medya organları hükümeti yıpratmak için yoğun karalama kampanyaları yürütüyor.",
            severity: "medium"
        });
    }
    return risks;
}

// ==============================
// SECTION: js/events.js
// ==============================

/**
 * TURKEY 2038 - RANDOM EVENTS DATABASE
 */

const events = [
    {
        id: "conspiratorial_offer_deepstate",
        title: "DERİN DEVLETTEN KİRLİ ANLAŞMA TEKLİFİ",
        desc: "Güvenlik bürokrasisindeki derin bir klik, muhalif belediye başkanlarına yönelik uydurma terör ve yolsuzluk dosyaları hazırlamayı teklif ediyor. Bu sayede belediyelere kayyum atayarak muhalefetin yerel gücünü tamamen ezebilirsiniz. Ancak bu adım yargı bağımsızlığını bitirecektir.",
        condition: (state) => state.systems.security > 40 && state.systems.freedom < 60,
        choices: [
            {
                text: "[KABUL ET] Kumpas dosyalarını onaylayın ve belediyelere kayyum atayın.",
                consequenceText: "Siyasi Sermaye fırlar (+30 PC), Güvenlik artar (+10%), ancak Özgürlükler ağır darbe yer (-15%), Yolsuzluk endeksi tırmanır (+15), Seküler ve Sol seçmenler sert tepki gösterir (-15%).",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 30);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.logs.push("KAYYUM ATAMALARI: Derin devletle yapılan gizli anlaşma uyarınca belediyelere kayyum atandı!");
                }
            },
            {
                text: "[REDDET] Hukuk dışı yöntemleri reddedin ve dosyaları sümen altı edin.",
                consequenceText: "İstikrar ve devlete güven artar (+10%), ancak derin güvenlik klikleri soğuk tavır alır (Süper NATO favoru -8).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 8);
                }
            }
        ]
    },
    {
        id: "conspiratorial_offer_treasury",
        title: "KARANLIK FİNANSÖRLERDEN KAYITDIŞI BÜTÇE DESTEĞİ",
        desc: "İsviçre ve Körfez merkezli karanlık bir finansal ağ temsilcisi, yaklaşan otoyol ve şehir hastaneleri ihalelerinde kendilerine öncelik tanınması karşılığında, hazineye acil ₺5.0B kayıtdışı 'sıcak para' aktarmayı teklif ediyor.",
        condition: (state) => state.treasury < 20000000000 && state.systems.corruption > 30,
        choices: [
            {
                text: "[KABUL ET] İhale sözünü verip paranın hazineye kayıtdışı aktarımını onaylayın.",
                consequenceText: "Hazineye dev kaynak girişi (+₺5.0B), Büyük Sermaye ilişkisi artar (+15 favor), ancak Yolsuzluk fırlar (+20), İstikrar düşer (-10%) ve Liberal seçmenler rahatsız olur (-10%).",
                action: (s) => {
                    s.treasury += 5000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 20);
                    s.stability = Math.max(0, s.stability - 10);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 10);
                    s.logs.push("KAYITDIŞI KAYNAK GİRİŞİ: Karanlık finans ağlarından hazineye ₺5.0B sıcak para aktarıldı!");
                }
            },
            {
                text: "[REDDET] İhalelerin şeffaf kalacağını belirterek teklifi reddedin.",
                consequenceText: "İstikrar artar (+5%), Yolsuzluk algısı geriler (-5).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 5);
                }
            }
        ]
    },
    {
        id: "conspiratorial_offer_media",
        title: "MEDYA BARONUNDAN PROPAGANDA ORTAKLIĞI",
        desc: "Ülkenin en büyük medya holdinginin sahibi, hükümet aleyhindeki yolsuzluk haberlerini tamamen sansürlemeyi ve televizyon kanallarında muhalif liderleri yıpratma kampanyası başlatmayı teklif ediyor. Karşılığında dijital yayıncılık tekel lisanslarının kendilerine devredilmesini talep ediyorlar.",
        condition: (state) => state.systems.media < 50,
        choices: [
            {
                text: "[KABUL ET] Medya tekeli lisansını devredin ve propaganda ortaklığını imzalayın.",
                consequenceText: "Hükümetin medya gücü artar (+25%), Siyasi Sermaye kazanılır (+10), ancak Özgürlük geriler (-10%), Yolsuzluk artar (+10), Üniversite onayları geriler (-10%).",
                action: (s) => {
                    s.systems.media = Math.min(100, s.systems.media + 25);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 10);
                    s.logs.push("MEDYA İŞBİRLİĞİ: Medya baronuyla yapılan anlaşma sonrası muhalif sesler susturuldu!");
                }
            },
            {
                text: "[REDDET] Teklifi geri çevirin ve bağımsız denetimi sürdürün.",
                consequenceText: "Medya desteği geriler (-15% medya onay oranı), ancak Özgürlükler korunur (+5%).",
                action: (s) => {
                    s.powerCenters.media.approval = Math.max(0, s.powerCenters.media.approval - 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 5);
                }
            }
        ]
    },
    {
        id: "kanal_projesi_crisis",
        title: "YENİ BOĞAZİÇİ KANALI PROJESİ",
        desc: "Hükümetin devasa yap-işlet-devret projesi olan 'Yeni Boğaz Kanalı' için nihai imza aşamasına gelindi. Çevreciler ve muhalif büyükşehir belediyesi projenin ekolojik yıkım getireceğini savunarak sokak eylemleri başlatırken, müteahhitlik holdingleri ve yabancı finansörler inşaatın derhal başlamasını talep ediyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Kanal inşaatını derhal başlatın, gösterileri 'milli güvenliği tehdit' gerekçesiyle yasaklayın.",
                consequenceText: "Büyük Sermaye favor +15, Hazine -₺5.0B, Özgürlük -10%, Seküler ve Sol seçmen onay -15%.",
                action: (s) => {
                    s.treasury -= 5000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] İnşaat planlarını ekonomik sıkışıklık nedeniyle süresiz olarak erteleyin.",
                consequenceText: "İstikrar +5%, Seküler ve Sol onay +10%, ancak Büyük Sermaye favor -15. İnşaatta işsizlik artar (+5%).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.systems.unemployment = Math.min(100, s.systems.unemployment + 5);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Projeyi yerel referanduma götürün ve kararı halkın oylamasına bırakın.",
                consequenceText: "Özgürlük +10%, Siyasi Sermaye +15, İstikrar +8%. Ancak Büyük Sermaye favor -8. Maliyet: ₺1.0B.",
                action: (s) => {
                    s.treasury -= 1000000000;
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.stability = Math.min(100, s.stability + 8);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 8);
                }
            },
            {
                text: "[TAVİZ VER] Proje güzergahını değiştirin, yeşil alanları koruma sözü vererek revizyonlu ihale açın.",
                consequenceText: "Hazine -₺3.0B, Büyük Sermaye favor +8, Seküler onay +6%. İstikrar +5%.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 8);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 6);
                    s.stability = Math.min(100, s.stability + 5);
                }
            }
        ]
    },
    {
        id: "multeci_krizi_border",
        title: "SINIR KAPILARINDA MÜLTECİ YIĞILMASI",
        desc: "Sınır komşumuzdaki iç savaşın şiddetlenmesiyle on binlerce yeni mülteci sınır kapılarımıza yığıldı. Avrupa Birliği sınırları kapatmamız için fon teklif ederken, yerel halk ve milliyetçiler mültecilerin içeri alınmasına kesinlikle karşı çıkıyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Sınır kapılarını tamamen kapatın, askeri güvenlik tedbirlerini en üst düzeye çıkarın.",
                consequenceText: "Güvenlik +10%, Milliyetçi onay +15%, Ordu onay +10%, Göçmen onay -20%. Özgürlük -5%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 5);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Kapıları kontrollü açıp mültecileri geçici kamplara alın, ek bütçe ayırmayın.",
                consequenceText: "İstikrar -10%, Milliyetçi onay -12%, Göçmen onay +10%, Hazineye ek yük binmez.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.voterGroups.immigrants.approval = Math.min(100, s.voterGroups.immigrants.approval + 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] AB'nin teklifini kabul edin; sınır güvenliğini AB fonuyla fonlayıp hazineyi rahatlatın.",
                consequenceText: "Hazine +₺4.0B, Liberal onay +10%, ancak Milliyetçi onay -15%, Süper NATO favor -5.",
                action: (s) => {
                    s.treasury += 4000000000;
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 5);
                }
            },
            {
                text: "[TAVİZ VER] İnsani koridor açıp mültecilerin batıya geçişine izin verin (kapıları batıya açın).",
                consequenceText: "Göçmen onay +15%, Sol onay +10%, ancak NATO favor -20, Güvenlik -8%, İstikrar -5%.",
                action: (s) => {
                    s.voterGroups.immigrants.approval = Math.min(100, s.voterGroups.immigrants.approval + 15);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 10);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 20);
                    s.systems.security = Math.max(0, s.systems.security - 8);
                    s.stability = Math.max(0, s.stability - 5);
                }
            }
        ]
    },
    {
        id: "dezenformasyon_yasasi",
        title: "DEZENFORMASYON VE İNTERNET SANSÜRÜ YASASI",
        desc: "Meclise sunulan yeni 'Dezenformasyon Yasası', 'kamu barışını bozmaya yönelik yalan haber yayanlara' hapis cezası öngörüyor. Gazeteci cemiyetleri ve gençler bunun mutlak bir sansür olduğunu savunurken, emniyet bürokrasisi siber güvenliğin korunması için yasayı destekliyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Yasayı aynen geçirin ve muhalif gazetecilere yönelik soruşturmaları başlatın.",
                consequenceText: "Güvenlik +10%, Medya kontrolü +15%, Özgürlük -15%, Gençler ve Seküler onay -15%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.media = Math.min(100, s.systems.media + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Tasarıyı meclis komisyonunda bekleterek yasalaşmasını süresiz erteleyin.",
                consequenceText: "Özgürlük +5%, Gençlik onay +8%, ancak Güvenlik Bürokrasisi onay -10%, Asayiş kontrolü zayıflar.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 5);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 8);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Yasanın içeriğini değiştirerek sadece terör propagandasıyla sınırlandırın ve uzlaşı arayın.",
                consequenceText: "Siyasi Sermaye +10, İstikrar +8%, Güvenlik +5%, Özgürlük -3%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.stability = Math.min(100, s.stability + 8);
                    s.systems.security = Math.min(100, s.systems.security + 5);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 3);
                }
            },
            {
                text: "[TAVİZ VER] Tasarıyı tamamen geri çekin, internet özgürlüğünü anayasal güvenceye alın.",
                consequenceText: "Özgürlük +15%, Gençler +15%, Akademi +12%, ancak Güvenlik Bürokrasisi onay -15%, Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 12);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            }
        ]
    },
    {
        id: "mb_baskani_revizyon",
        title: "MERKEZ BANKASI BAŞKANININ GÖREVDEN ALINMASI",
        desc: "Hükümetin düşük faiz politikasına direnerek bağımsız hareket etmek isteyen Merkez Bankası Başkanı, gece yarısı kararnamesiyle görevden alındı. Finans piyasaları sarsıldı, döviz kurları fırladı ve iş dünyasında güvensizlik hakim.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Faizleri zorla düşürün, kamu bankalarını piyasaya döviz satmaya zorlayın.",
                consequenceText: "Esnaf/Çiftçi onay +10%, ancak Enflasyon +15%, Hazine -₺3.0B, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 10);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 15);
                    s.treasury -= 3000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Kur dalgalanmasına müdahale etmeyin, serbest piyasanın dengelenmesini bekleyin.",
                consequenceText: "İstikrar -10%, Enflasyon +8%, İşçiler onay -10%, Hazine bütçesi korunur.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 10);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 8);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Yeni atanan başkana faiz artış yetkisi verin ve 'Ortodoks Politikaya Dönüş' sinyali verin.",
                consequenceText: "Büyük Sermaye favor +15, Ekonomi +10%, Enflasyon -8%, ancak Çiftçiler ve Esnaflar onay -12%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.systems.inflation = Math.max(0, s.systems.inflation - 8);
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 12);
                }
            },
            {
                text: "[TAVİZ VER] Eski başkanı göreve iade edin ve Merkez Bankası kanununa dokunulmayacağını açıklayın.",
                consequenceText: "İstikrar +10%, Liberal onay +12%, Ekonomi +5%, ancak Siyasi Sermaye -15, Hükümet otoritesi zayıflar.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 12);
                    s.systems.economy = Math.min(100, s.systems.economy + 5);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                }
            }
        ]
    },
    {
        id: "kamu_bankasi_kredi",
        title: "KAMU BANKASINDAN DÜŞÜK FAİZLİ YANDAŞ KREDİSİ",
        desc: "Bir kamu bankasının, iktidara yakın bir medya holdingine büyük bir medya satın alımı için devasa miktarda sıfır faizli ve geri ödemesiz kredi sağladığı ortaya çıktı. Muhalefet ve kamuoyu bu kaynak aktarımına büyük tepki gösteriyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Kredi sözleşmesini devlet sırrı ilan edin ve bu konuda haber yapılmasını yasaklayın.",
                consequenceText: "Medya gücü +10%, Özgürlük -12%, Yolsuzluk +10, Seküler onay -12%.",
                action: (s) => {
                    s.systems.media = Math.min(100, s.systems.media + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 12);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] 'Ticari sır' açıklamasını yapın ve iddiaları yanıtsız bırakarak konuyu soğutun.",
                consequenceText: "Yolsuzluk +8, İstikrar -6%, Halk onay -8%, bütçeye etkisi olmaz.",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    s.stability = Math.max(0, s.stability - 6);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 8);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Krediyi veren banka genel müdürünü görevden alıp paranın tahsilat sürecini başlatın.",
                consequenceText: "Yolsuzluk -10, Yargı onay +12%, Siyasi Sermaye +10, ancak Büyük Sermaye favor -10.",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 10);
                }
            },
            {
                text: "[TAVİZ VER] Kredinin amacını 'istihdamı koruma ve esnaf desteği' olarak değiştirip benzer bütçeyi tüm KOBİ'lere açın.",
                consequenceText: "İş Dünyası onay +12%, Esnaf onay +10%, ancak Hazine -₺3.0B, Enflasyon +5%.",
                action: (s) => {
                    s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 12);
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 10);
                    s.treasury -= 3000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                }
            }
        ]
    },
    {
        id: "sokak_hayvanlari_yasasi",
        title: "BAŞIBOŞ SOKAK HAYVANLARI YASASI",
        desc: "Sokak köpeklerinin çocuklara saldırması üzerine kamuoyunda büyük bir tartışma başladı. Bir kesim sokak köpeklerinin toplatılıp uyutulmasını (itlaf edilmesini) isterken; hayvan hakları savunucuları ve seküler STK'lar kısırlaştırma ve barınak seferberliği talep ediyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Sokaktaki tüm köpeklerin toplatılarak 30 gün içinde sahiplenilmeyenlerin itlaf edilmesini yasalaştırın.",
                consequenceText: "Güvenlik +8%, Muhafazakar onay +15%, Seküler onay -20%, Solcular onay -15%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Yasada değişiklik yapmayın, belediyelerin kendi inisiyatiflerine bırakın.",
                consequenceText: "İstikrar -8%, Güvenlik -5%, Muhafazakar onay -10%, bütçe harcaması sıfırdır.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 8);
                    s.systems.security = Math.max(0, s.systems.security - 5);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Büyük bir 'Kısırlaştırma ve Aşılama' fonu kurun, maliyeti yerel yönetimlerle bölüşün.",
                consequenceText: "Halk onay +10%, Seküler onay +12%, Solcular onay +10%. Maliyet: -₺1.5B.",
                action: (s) => {
                    s.treasury -= 1500000000;
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 10);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 10);
                }
            },
            {
                text: "[TAVİZ VER] Hayvan hakları STK'larına barınak yapımı için hazine arazileri tahsis edin ve vergi muafiyeti getirin.",
                consequenceText: "Özgürlük +8%, Seküler onay +15%, Dindar/Cemaat favor -5. Maliyet: -₺500M.",
                action: (s) => {
                    s.treasury -= 500000000;
                    s.systems.freedom = Math.min(100, s.systems.freedom + 8);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 5);
                }
            }
        ]
    },
    {
        id: "kayyum_rektor_protesto",
        title: "ÜNİVERSİTE REKTÖR ATAMA PROTESTOLARI",
        desc: "Hükümetin ülkenin en köklü üniversitesine dışarıdan, partiye yakın bir rektör ataması üzerine öğrenciler ve akademisyenler dersleri boykot ederek protesto başlattı. Polis kampüse girdi ve çatışmalar yaşanıyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Rektörü görevde tutun, kampüs eylemlerini sert şekilde dağıtın ve boykotçuları okuldan atın.",
                consequenceText: "Devlet otoritesi korunur. Güvenlik +8%, Akademi onay -20%, Öğrenci onay -25%, Özgürlük -12%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 20);
                    s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Protestoları izlemekle yetinin, rektörün istifa etmesine de izin vermeyin.",
                consequenceText: "İstikrar -10%, Akademi onay -10%, Öğrenciler onay -12%, Asayiş bozulur.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 10);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 10);
                    s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 12);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Tartışmalı rektörü geri çekip yerine üniversite senatosunun önerdiği 3 adaydan birini atayın.",
                consequenceText: "Akademi onay +20%, Öğrenciler onay +20%, Özgürlük +10%, Siyasi Sermaye -10.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 20);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 20);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            },
            {
                text: "[TAVİZ VER] Rektörlük seçimlerini tamamen serbest bırakın ve YÖK'ün atama yetkilerini kısıtlayın.",
                consequenceText: "Özgürlük +15%, Akademi onay +25%, Seküler onay +15%, Siyasi Sermaye -20.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 25);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                }
            }
        ]
    },
    {
        id: "ciftci_traktor_boykot",
        title: "TARIMSAL MAZOT VE GÜBRE EYLEMLERİ",
        desc: "Döviz kuru ve vergiler nedeniyle fırlayan gübre ve mazot fiyatları karşısında ezilen çiftçiler, traktörleriyle il yollarını kapatarak büyük bir protesto başlattı. Şehirlerde sebze ve meyve arzı tehlikede.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Yol kapama eylemlerine jandarma ile müdahale edin ve traktörleri çektirin.",
                consequenceText: "Güvenlik +10%, Çiftçi onay -25%, Gıda fiyatlarında belirsizlik. İstikrar -5%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 25);
                    s.stability = Math.max(0, s.stability - 5);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Fiyat artışlarını serbest piyasa koşullarına bağlayıp eylemlere doğrudan karışmayın.",
                consequenceText: "Enflasyon +8%, Çiftçi onay -15%, İstikrar -8%. Hazine bütçesi korunur.",
                action: (s) => {
                    s.systems.inflation = Math.min(100, s.systems.inflation + 8);
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 15);
                    s.stability = Math.max(0, s.stability - 8);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Tarımsal üreticiler için vergileri dondurun ve kamu bankalarından faizsiz gübre kredisi açın.",
                consequenceText: "Çiftçi onay +20%, Esnaf onay +10%, Enflasyon -3%. Hazine bütçesi azalır (-₺1.5B).",
                action: (s) => {
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 20);
                    s.treasury -= 1500000000;
                    s.systems.inflation = Math.max(0, s.systems.inflation - 3);
                }
            },
            {
                text: "[TAVİZ VER] Mazottaki ÖTV'yi çiftçiler için tamamen sıfırlayın ve doğrudan gübre hibesi dağıtın.",
                consequenceText: "Çiftçi onay +30%, İstikrar +10%, Halk mutluluğu +8%. Maliyet: -₺3.5B.",
                action: (s) => {
                    s.treasury -= 3500000000;
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 30);
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.happiness = Math.min(100, s.systems.happiness + 8);
                }
            }
        ]
    },
    {
        id: "cemaat_yurdu_skandali",
        title: "TARİKAT YURDUNDA ŞÜPHELİ ÖĞRENCİ ÖLÜMÜ",
        desc: "Büyük bir dini vakfa/cemaate ait ruhsatsız bir öğrenci yurdunda kalan tıp öğrencisi, uğradığı baskılar ve mobbing sonrasında geride intihar notu bırakarak can verdi. Seküler kesim tüm tarikat yurtlarının kapatılmasını talep ederken, cemaatler hükümeti savunmaya çağırıyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Haberlere ve sosyal medyadaki tartışmalara derhal yayın yasağı getirin.",
                consequenceText: "Cemaat favor +15, Özgürlük -15%, Medya -10%, Seküler ve Sol onay -20%.",
                action: (s) => {
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.systems.media = Math.max(0, s.systems.media - 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 20);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Olayı adli bir vaka olarak nitelendirip sessiz kalın ve soruşturmanın bitmesini bekleyin.",
                consequenceText: "İstikrar -10%, Halk onay -8%, Yolsuzluk +5. Cemaat ilişkisi korunur.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 10);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 8);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Olayın yaşandığı yurdu mühürleyin, ruhsatsız diğer yurtları denetleme kampanyası başlatın.",
                consequenceText: "Seküler onay +15%, Öğrenciler +15%, Yolsuzluk -10. Cemaat favor -20, Siyasi Sermaye -10.",
                action: (s) => {
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            },
            {
                text: "[TAVİZ VER] Cemaat yurtlarına devlet denetimini zorunlu kılın ve KYK yurt bütçesini iki katına çıkarın.",
                consequenceText: "Öğrenciler +25%, Akademi +15%, Seküler onay +12%, Cemaat favor -15. Maliyet: -₺2.5B.",
                action: (s) => {
                    s.treasury -= 2500000000;
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 25);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                }
            }
        ]
    },
    {
        id: "maden_ocagi_heyelani",
        title: "MADEN SAHASINDA GÖÇÜK FELAKETİ",
        desc: "İktidara yakın bir madencilik şirketinin işlettiği sahada heyelan meydana geldi ve tonlarca siyanürlü toprak altında 9 maden işçisi kaldı. Çevreye siyanür sızma riski varken, şirketin güvenlik raporlarını rüşvetle sahtelediği iddia ediliyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Arama kurtarma başlatın ancak şirketin ismini korumak için haberlere sansür getirin.",
                consequenceText: "Büyük Sermaye favor +12, Özgürlük -10%, Yolsuzluk +12, İşçiler onay -20%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Felaketi 'doğal afet' ilan edip şirkete soruşturma açmaktan kaçının.",
                consequenceText: "İstikrar -12%, Güvenlik -8%, İşçiler onay -15%, Sol onay -15%.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 12);
                    s.systems.security = Math.max(0, s.systems.security - 8);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Maden ruhsatını iptal edin, şirket sahiplerini tutuklatın ve çevre cezası kesin.",
                consequenceText: "İstikrar +8%, İşçiler onay +15%, Seküler onay +12%, Yolsuzluk -10. Büyük Sermaye favor -20.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                }
            },
            {
                text: "[TAVİZ VER] Madenleri kamulaştırın ve iş güvenliğini devlet güvencesine alın.",
                consequenceText: "Halk mutluluğu +12%, İşçiler onay +25%, Sol onay +20%, Büyük Sermaye favor -25. Maliyet: -₺3.0B.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                }
            }
        ]
    },
    {
        id: "kkm_tasfiyesi_crisis",
        title: "HAZİNE DESTEKLİ MEVDUAT SIKIŞIKLIĞI",
        desc: "Döviz artışını durdurmak için geçmişte açılan 'Hazine Garantili Kur Mevduat' sisteminde ödeme dönemi geldi. Döviz kurundaki son fırlama nedeniyle hazineden mudilere aktarılacak para bütçeyi delmek üzere.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Ödemeleri finanse etmek için ek vergiler koyun ve bütçe disiplinini koruyun.",
                consequenceText: "Bütçe dengelenir. İş Dünyası onay +10%, ancak İşçiler onay -15%, Çiftçiler onay -15%, Enflasyon +5%.",
                action: (s) => {
                    s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 10);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 15);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Ödemeleri Merkez Bankası para basımıyla karşılayın ve vergileri artırmayın.",
                consequenceText: "Hazine bütçesi korunur. Enflasyon +15%, İstikrar -12%, İş Dünyası onay -15%.",
                action: (s) => {
                    s.systems.inflation = Math.min(100, s.systems.inflation + 15);
                    s.stability = Math.max(0, s.stability - 12);
                    s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 15);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Sistemi kademeli olarak durdurun, parayı hazine tahvillerine bloke ederek tasfiye edin.",
                consequenceText: "Enflasyon -5%, Hazine rahatlar (+₺2.0B), ancak Yatırımcı/Esnaf onay -10%, Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 5);
                    s.treasury += 2000000000;
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            },
            {
                text: "[TAVİZ VER] Dış borç arayışına girerek uluslararası finansörlerden yüksek faizli döviz kredisi çekin.",
                consequenceText: "İstikrar +8%, İş Dünyası onay +12%, ancak Hazine borç yükü artar (-₺4.0B faturası), Süper NATO favor -5.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 12);
                    s.treasury -= 4000000000;
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 5);
                }
            }
        ]
    },
    {
        id: "spor_sike_manipulasyon",
        title: "BÜYÜK KULÜP BAŞKANININ SIYASI ÇIKIŞI",
        desc: "Süper Lig'deki derbi sonrasında şike iddiaları ve hakem kararlarını protesto eden en popüler futbol kulübünün başkanı, canlı yayında federasyonu ve dolaylı olarak hükümeti şike şebekelerini korumakla suçladı. Taraftarlar sokaklara döküldü.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Kulüp başkanına ağır idari cezalar verin ve taraftar gruplarına stadyum yasağı uygulayın.",
                consequenceText: "Güvenlik +10%, Özgürlük -8%, İstikrar -10% (sokak çatışması riski), Taraftarlar onay -20%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 8);
                    s.stability = Math.max(0, s.stability - 10);
                    s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 20);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Federasyonun karar almasını bekleyin ve hükümet olarak konuya karışmayın.",
                consequenceText: "İstikrar -6%, Medya kontrolü zayıflar, taraftarların protestoları yayılır.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 6);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Federasyon başkanını istifaya zorlayıp adli soruşturma başlatın ve hakemleri temizleyin.",
                consequenceText: "Yargı onay +12%, Halk onay +10%, Siyasi Sermaye +10, ancak federasyondaki muhafazakar hizip favor -10.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 10);
                }
            },
            {
                text: "[TAVİZ VER] Kulübe vergi borcu yapılandırması sağlayın ve yeni stadyum arazisi hibe edin.",
                consequenceText: "Halk onay +15%, Kulüp taraftarları memnun olur. Maliyet: -₺1.5B, Yolsuzluk +5.",
                action: (s) => {
                    s.treasury -= 1500000000;
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                }
            }
        ]
    },
    {
        id: "kripto_vergilendirme",
        title: "DİJİTAL VARLIKLARIN VERGİLENDİRİLMESİ KANUNU",
        desc: "Haine, bütçe açığını kapatmak amacıyla yerli kripto para işlemlerine %20 oranında gelir vergisi getirilmesini öneriyor. Kripto yatırımı yapan milyonlarca genç ve esnaf bu yasa taslağına karşı sosyal medyada kampanya başlattı.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Yasayı onaylayın, yabancı borsalardan yapılan işlemleri de ek gümrük vergisine bağlayın.",
                consequenceText: "Hazine +₺3.0B, Enflasyon -3%, ancak Gençlik onay -20%, Liberal onay -15%.",
                action: (s) => {
                    s.treasury += 3000000000;
                    s.systems.inflation = Math.max(0, s.systems.inflation - 3);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 20);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Vergi taslağını iptal edin ve dijital sektörü serbest bırakın.",
                consequenceText: "Gençlik onay +12%, Liberal onay +10%, ancak bütçeye ek gelir girmez.",
                action: (s) => {
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 12);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Vergiyi %5'e düşürün, karşılığında tüm yerli borsalara devlet denetimli lisans zorunluluğu getirin.",
                consequenceText: "Hazine +₺1.0B, Güvenlik +8%, İstikrar +5%, Yolsuzluk -5.",
                action: (s) => {
                    s.treasury += 1000000000;
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.stability = Math.min(100, s.stability + 5);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 5);
                }
            },
            {
                text: "[TAVİZ VER] Vergiyi tamamen erteleyip yerli blokzincir startup projelerine ₺1.0B hibe açıklayın.",
                consequenceText: "Gençlik onay +20%, Öğrenci onay +15%, Akademi +10%. Maliyet: -₺1.0B.",
                action: (s) => {
                    s.treasury -= 1000000000;
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 20);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 10);
                }
            }
        ]
    },
    {
        id: "havalimani_ekoloji",
        title: "MİLLİ PARK SINIRINDA DEV HAVALİMANI İHALESİ",
        desc: "Hükümet, Ege kıyısındaki koruma altındaki bir milli park alanını turizme açmak için dev bir havalimanı ihalesi düzenledi. İhaleyi iktidarla yakın ilişkileri olan bir holding kazandı. Çevreciler ağaçları korumak için iş makinelerinin önüne yattı.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Güvenlik güçlerini sevk edip protestocuları zorla alandan uzaklaştırın ve inşaatı hızlandırın.",
                consequenceText: "Büyük Sermaye favor +12, Güvenlik +8%, Özgürlük -10%, Seküler ve Sol onay -15%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Çatışmalara sessiz kalın, firmanın kendi özel güvenlik ekipleriyle inşaatı sürdürmesini izleyin.",
                consequenceText: "İstikrar -8%, Güvenlik -6%, Yolsuzluk +5. Hazineye ek yük binmez.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 8);
                    s.systems.security = Math.max(0, s.systems.security - 6);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] İhaleyi iptal edin, havalimanını başka bir verimsiz çorak araziye kaydırarak çevreyi koruyun.",
                consequenceText: "Seküler onay +12%, Sol onay +15%, Yolsuzluk -10. Büyük Sermaye favor -15. Maliyet: -₺1.0B.",
                action: (s) => {
                    s.treasury -= 1000000000;
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                }
            },
            {
                text: "[TAVİZ VER] Havalimanı arazisini %30 küçültün ve holdingi çevre koruma fonuna ₺500M hibe vermeye zorlayın.",
                consequenceText: "Hazine +₺500M (fon geliri), Büyük Sermaye favor +6, Seküler onay +5%.",
                action: (s) => {
                    s.treasury += 500000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 6);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 5);
                }
            }
        ]
    },
    {
        id: "suriyeli_esnaf_gerginligi",
        title: "METROPOLDE DEMOGRAFİK ÇATIŞMA",
        desc: "İstanbul'un dış mahallelerinde mültecilere ait dükkanların hızla artması üzerine yerel halk ile göçmen gruplar arasında bıçaklı kavga çıktı. Milliyetçi gruplar sokağa dökülüp mülteci dükkanlarını hedef alıyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Olağanüstü güvenlik tedbirleri alıp sokağa çıkma yasağı koyun ve provokatörleri tutuklatın.",
                consequenceText: "Güvenlik +12%, Göçmen onay +15%, Milliyetçi onay -12%, Özgürlük -10%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.voterGroups.immigrants.approval = Math.min(100, s.voterGroups.immigrants.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Polis müdahalesini sınırlı tutun, mahalle muhtarlarının arabuluculuk yapmasını bekleyin.",
                consequenceText: "İstikrar -12%, Güvenlik -10%, Milliyetçiler onay -8%.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 12);
                    s.systems.security = Math.max(0, s.systems.security - 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 8);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Ruhsatsız tüm göçmen işletmelerini mühürleyin ve suça karışanları sınır dışı edeceğinizi açıklayın.",
                consequenceText: "Milliyetçi onay +20%, İşçi onay +10%, Güvenlik +8%, Göçmen onay -25%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 10);
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 25);
                }
            },
            {
                text: "[TAVİZ VER] Göçmen esnafa resmi çalışma ruhsatı verip vergilerini yerel halktan topladığınız oranlara sabitleyin.",
                consequenceText: "Göçmen onay +20%, Hazineye vergi geliri (+₺500M), ancak Milliyetçi onay -22%, İşçi onay -12%.",
                action: (s) => {
                    s.voterGroups.immigrants.approval = Math.min(100, s.voterGroups.immigrants.approval + 20);
                    s.treasury += 500000000;
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 22);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 12);
                }
            }
        ]
    },
    {
        id: "eyt_emeklilik_baskisi",
        title: "ERKEN EMEKLİLİK YASA TASARISI BASKISI",
        desc: "Yıllardır yaş sınırına takılan emeklilik adayları (EYT), sosyal medya üzerinden koordine olarak meclis önünde miting düzenledi. Seçim öncesinde erken emeklilik haklarının iade edilmesini talep ediyorlar.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Hazine dengelerini korumak amacıyla talepleri reddedin ve gösterileri yasaklayın.",
                consequenceText: "Hazine korunur. Özgürlük -8%, Emekliler onay -25%, İşçiler onay -15%.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 8);
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 25);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Konuyu incelemek üzere mecliste uzun vadeli bir komisyon kurup süreci zamana yayın.",
                consequenceText: "İstikrar -6%, Emekliler onay -10%, bütçe maliyeti yoktur.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 6);
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Talepleri kısmen kabul edin, sadece 55 yaş üzerindekilere erken emeklilik hakkı verin.",
                consequenceText: "Emekliler onay +12%, İşçiler onay +8%, Hazine -₺2.5B, İstikrar +5%.",
                action: (s) => {
                    s.voterGroups.retirees.approval = Math.min(100, s.voterGroups.retirees.approval + 12);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 8);
                    s.treasury -= 2500000000;
                    s.stability = Math.min(100, s.stability + 5);
                }
            },
            {
                text: "[TAVİZ VER] Yaş sınırını tamamen kaldırıp tüm EYT'lileri anında emekli edin.",
                consequenceText: "Emekliler onay +30%, İşçiler onay +20%, Halk mutluluğu +12%. Ancak Hazineye devasa darbe (-₺6.0B), Büyük Sermaye favor -20.",
                action: (s) => {
                    s.treasury -= 6000000000;
                    s.voterGroups.retirees.approval = Math.min(100, s.voterGroups.retirees.approval + 30);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 20);
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                }
            }
        ]
    },
    {
        id: "savunma_casuslugu",
        title: "İHA TASARIMLARININ SIZDIRILMASI SKANDALI",
        desc: "Milli Savunma ihalelerinde yer alan yerli bir İHA firmasının kritik yazılım ve kanat tasarımları, bir mühendis tarafından yabancı büyükelçilik temsilcilerine sızdırıldı. Skandal uluslararası boyuta taşındı.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Casusluk dosyasını askeri sır ilan edin, firmanın haberlerini engelletip mühendisi tutuklatın.",
                consequenceText: "Güvenlik +10%, Medya kontrolü +10%, Özgürlük -10%, Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.media = Math.min(100, s.systems.media + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Casusluk iddialarını komplo teorisi olarak reddedin ve diplomatik nota vermeyin.",
                consequenceText: "Ordu onay -12%, Milliyetçi onay -12%, Asayiş -5%.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.systems.security = Math.max(0, s.systems.security - 5);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Olayı batılı istihbarat servislerinin sabotajı olarak ilan edip milliyetçi kampanya başlatın.",
                consequenceText: "Milliyetçi onay +18%, Ordu onay +10%, Siyasi Sermaye +15, ancak NATO favor -15.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 18);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 15);
                }
            },
            {
                text: "[TAVİZ VER] Sızdırılan firmanın tüm askeri ihalelerini askıya alın, savunma projelerini MİT gözetiminde kamulaştırın.",
                consequenceText: "Ordu onay +15%, Güvenlik +12%, ancak Büyük Sermaye favor -15. Maliyet: -₺2.0B.",
                action: (s) => {
                    s.treasury -= 2000000000;
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                }
            }
        ]
    },
    {
        id: "barolar_birligi_boykot",
        title: "ÇOKLU BARO YAPILANMASI YASASI",
        desc: "Hükümet, büyük şehirlerde muhalif kalan Barolar Birliği'ni zayıflatmak için tek şehirde birden fazla baro kurulmasını sağlayacak yasa tasarısı hazırladı. Yargıçlar ve avukatlar cübbeleriyle sokağa çıkıp yasayı boykot ediyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Yasayı meclisten hızla geçirin, baroların protestolarına cop ve tazyikli suyla müdahale ettirin.",
                consequenceText: "Yargı onay -20%, Özgürlük -15%, Seküler onay -15%, Siyasi Sermaye +15.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Tasarıyı geri çekmeyin ama boykotlara da polis müdahalesi yaptırmayın.",
                consequenceText: "İstikrar -8%, Yargı onay -10%, Adalet sisteminde tıkanıklık.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 8);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Avukatlar ve baro yönetimiyle masaya oturup ortak bir temsil reformunda uzlaşın.",
                consequenceText: "Yargı onay +15%, İstikrar +10%, Özgürlük +8%, Siyasi Sermaye +5.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 8);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 5);
                }
            },
            {
                text: "[TAVİZ VER] Yasa tasarısını tamamen meclis gündeminden düşürün ve baro bütçesini artırın.",
                consequenceText: "Yargı onay +25%, Seküler onay +12%, ancak Siyasi Sermaye -15, Milliyetçi onay -10.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 25);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                }
            }
        ]
    },
    {
        id: "diyanet_vakfi_butcesi",
        title: "DİYANET VAKFI LÜKS ARAÇ SIZINTISI",
        desc: "Diyanet İşleri Başkanı'nın, bütçeden lüks yabancı makam araçları kiraladığı ve lüks vakıf konutlarında kaldığı yönünde gizli faturalar basına sızdırıldı. Muhafazakar taban 'itibardan tasarruf olmaz' derken, laik kesim büyük israf tepkisi gösteriyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Belgeleri yayınlayan haber sitelerini erişime kapatın ve Diyanet bütçesini gizli hale getirin.",
                consequenceText: "Dindar onay +10%, Medya -12%, Özgürlük -12%, Seküler onay -18%.",
                action: (s) => {
                    s.voterGroups.religious.approval = Math.min(100, s.voterGroups.religious.approval + 10);
                    s.systems.media = Math.max(0, s.systems.media - 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 18);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] İddiaları karalama kampanyası olarak adlandırın ve hiçbir açıklama yapmayın.",
                consequenceText: "Yolsuzluk +8, İstikrar -6%, Seküler onay -10%, Dindar onay korunur.",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    s.stability = Math.max(0, s.stability - 6);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Diyanet'in kiralık lüks araçlarını iptal edip yerli elektrikli araçları zorunlu kılın.",
                consequenceText: "Halk onay +12%, Yolsuzluk -8, Hazine +₺100M, ancak Cemaatler favor -8.",
                action: (s) => {
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 12);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 8);
                    s.treasury += 100000000;
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 8);
                }
            },
            {
                text: "[TAVİZ VER] Diyanet Başkanı'nı görevden alın, bütçesinde kısıntıya gidip payı Milli Eğitime aktarın.",
                consequenceText: "Seküler onay +20%, Öğrenci onay +15%, Yolsuzluk -12. Dindar onay -20%, Cemaat favor -20.",
                action: (s) => {
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 20);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 12);
                    s.voterGroups.religious.approval = Math.max(0, s.voterGroups.religious.approval - 20);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                }
            }
        ]
    },
    {
        id: "ilac_tedarik_krizi",
        title: "DÖVİZ KURU KAYNAKLI İLAÇ SIKINTISI",
        desc: "Sağlık Bakanlığı'nın yabancı ilaç firmalarıyla belirlediği sabit Euro kurunun, serbest piyasa kurunun çok altında kalması nedeniyle ithal kanser ve kalp ilaçları Türkiye'ye gönderilmiyor. Eczanelerde kuyruklar var.",
        condition: (s) => true,
        choices: [
            {
                text: "[BASTIR] Sabit kuru değiştirmeyin, stokçuluk yapan depolara polis baskını yaptırın.",
                consequenceText: "Güvenlik +10%, Esnaf/Eczacılar onay -15%, Sağlık durumu kötüleşir. İstikrar -5%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 15);
                    s.stability = Math.max(0, s.stability - 5);
                }
            },
            {
                text: "[GÖRMEZDEN GEL] Tedarik zincirindeki aksamaları eczacı odalarının sorumluluğuna atıp müdahale etmeyin.",
                consequenceText: "İstikrar -12%, Halk onay -15%, Sağlık/Mutluluk geriler (-8%).",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 12);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 15);
                    s.systems.happiness = Math.max(0, s.systems.happiness - 8);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] İlaç Euro kurunu serbest kur seviyesine çıkararak krizi bitirin.",
                consequenceText: "Sağlık/Mutluluk +10%, İstikrar +8%, ancak Hazine bütçesi erir (-₺3.5B), Enflasyon +5%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 10);
                    s.stability = Math.min(100, s.stability + 8);
                    s.treasury -= 3500000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                }
            },
            {
                text: "[TAVİZ VER] Kritik ilaçları yerli olarak üretmek için kamu laboratuvarı kurun ve acil hibe verin.",
                consequenceText: "Akademi onay +15%, Milliyetçi onay +12%, Halk onay +10%. Maliyet: -₺2.5B.",
                action: (s) => {
                    s.treasury -= 2500000000;
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 10);
                }
            }
        ]
    },
    // ==========================================
    // CHAIN EVENT STORIES (STARTING EVENTS)
    // ==========================================
    {
        id: "peace_opening_start",
        title: "ZİNCİR - Kürt Barış Açılımı Başlangıcı",
        desc: "İstihbarat kanalları üzerinden, sınır ötesindeki Kürt örgüt temsilcilerinin silah bırakma karşılığında mecliste bir uzlaşma komisyonu kurulmasını ve bölgesel özerklik adımlarının tartışılmasını önerdiği sızdı.",
        condition: (s) => true,
        choices: [
            {
                text: "[MÜZAKERE ET] Görüşmeleri resmileştirin ve mecliste uzlaşma masası kurun.",
                consequenceText: "Kürt seçmen onay +25%, Sol onay +15%, ancak Milliyetçi onay -20%, Ordu onay -15%. (Tepki Yankısı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 15);
                }
            },
            {
                text: "[REDDET] Hukuk dışı yapılarla masaya oturulmayacağını söyleyip sınır ötesi harekat emri verin.",
                consequenceText: "Milliyetçi onay +20%, Ordu onay +15%, ancak Kürt seçmen onay -25%, Güvenlik maliyeti: -₺2.5B. (Tepki Yankısı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 25);
                    s.treasury -= 2500000000;
                }
            },
            {
                text: "[ULUSLARARASI KANAL] Konuyu Avrupa Konseyi gözetiminde bir uluslararası barış planına taşıyın.",
                consequenceText: "Liberal onay +15%, Kürt onay +15%, ancak Milliyetçi onay -18%, NATO favor -10. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 18);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 10);
                }
            },
            {
                text: "[GİZLİ TUT] Oslo tarzı gizli istihbarat zirveleri yapın, kamuoyuna bilgi vermeyin.",
                consequenceText: "Siyasi Sermaye +15, Kürt onay +10%, ancak sızma riski vardır. İstikrar -5%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 10);
                    s.stability = Math.max(0, s.stability - 5);
                }
            }
        ]
    },
    {
        id: "mafia_leaks_start",
        title: "ZİNCİR - Firari Mafya Liderinin İfşaat Videoları",
        desc: "Kırmızı bültenle aranan ve Balkanlar'da saklanan ünlü bir organize suç örgütü lideri, YouTube üzerinden iktidar milletvekilleri ile bakanların kokain ticareti ve faili meçhul cinayetlere karıştığını gösteren belgeler yayınladı.",
        condition: (s) => true,
        choices: [
            {
                text: "[SORUŞTURMA AÇ] İddiaları ciddiye alıp adı geçen bakanı görevden alın ve yargı denetimi başlatın.",
                consequenceText: "Yolsuzluk -12, Yargı onay +15%, Seküler onay +12%, ama Kabine sadakati sarsılır (-10). (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                }
            },
            {
                text: "[BASTIR] Videolara erişim engeli getirin, iddiaları yalanlayan siber operasyonlar yapın.",
                consequenceText: "Medya kontrolü +12%, Özgürlük -12%, Yolsuzluk +8, Gençlik onay -15%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.systems.media = Math.min(100, s.systems.media + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 15);
                }
            },
            {
                text: "[REDDET] İddiaları 'dış güçlerin devletimizi yıpratma operasyonu' ilan edip milliyetçi kampanya yapın.",
                consequenceText: "Milliyetçi onay +15%, Siyasi Sermaye +12, ancak İstikrar -8%, Ekonomi geriler (-5). (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    s.stability = Math.max(0, s.stability - 8);
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                }
            },
            {
                text: "[ANLAŞMA YAP] İstihbarat yoluyla mafya liderine teklif gönderip videoları kesmesi karşılığında af sözü verin.",
                consequenceText: "İstikrar +10%, ancak Yolsuzluk +15, Yargı onay -15%, Siyasi Sermaye -15. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                }
            }
        ]
    },
    {
        id: "cemaat_infiltration_start",
        title: "ZİNCİR - Emniyette Tarikat Hücreleri Raporu",
        desc: "İçişleri Bakanlığı mülkiye müfettişleri, Emniyet Genel Müdürlüğü bünyesinde faaliyet gösteren büyük bir cemaat yapılanmasının sınav sorularını çaldığını ve kadrolaştığını kanıtlayan bir rapor hazırladı.",
        condition: (s) => true,
        choices: [
            {
                text: "[TASFİYE ET] Raporu onaylayın, adı geçen 500 emniyet müdürünü görevden alıp tasfiye operasyonu başlatın.",
                consequenceText: "Yolsuzluk -15, Seküler onay +15%, Akademi +12%, ancak Cemaat favor -25, İstikrar -10%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 12);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.stability = Math.max(0, s.stability - 10);
                }
            },
            {
                text: "[SÜMEN ALTI ET] Raporu hazırlayan müfettişleri pasif göreve çekip konuyu örtbas edin.",
                consequenceText: "Cemaat favor +20, Muhafazakar onay +10%, ancak Yolsuzluk +12, Yargı onay -15%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 20);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 15);
                }
            },
            {
                text: "[DENGELE] Cemaat lideriyle masaya oturun, gücünü kısıtlamak karşılığında bazı holding ihalelerini onlara verin.",
                consequenceText: "İstikrar +8%, Cemaat favor +10, ama Yolsuzluk +15, Sol onay -12%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 12);
                }
            },
            {
                text: "[ORDUYA DEVRET] Konuyu MGK gündemine taşıyarak ordu ve istihbarat denetimi talep edin.",
                consequenceText: "Ordu onay +20%, Güvenlik +10%, Kemalist favor +15, ancak Siyasi Sermaye -15, Cemaat favor -20. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                }
            }
        ]
    },
    {
        id: "finance_credit_squeeze_start",
        title: "ZİNCİR - Dış Borç Ödeme Sıkışıklığı",
        desc: "Uluslararası tahvil vadelerinin dolmasıyla Türkiye, ₺15.0B tutarında acil dış borç ödemesi yapmak zorunda. Hazine rezervleri yetersiz ve faizler çok yüksek.",
        condition: (s) => true,
        choices: [
            {
                text: "[IMF ANLAŞMASI] IMF ile standby imzalayıp faizleri artırarak dış kaynak sağlayın.",
                consequenceText: "Hazine +₺12.0B, Ekonomi +10%, ama Emekliler onay -20%, İşçiler onay -15%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.treasury += 12000000000;
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 20);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                }
            },
            {
                text: "[SERMAYE KONTROLÜ] Bankalardaki büyük mevduat çıkışlarını sınırlandırın ve döviz alımını kısıtlayın.",
                consequenceText: "Hazine korunur. Ekonomi -15%, Büyük Sermaye favor -25, Özgürlük -10%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.systems.economy = Math.max(0, s.systems.economy - 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                }
            },
            {
                text: "[VARLIK SATIŞI] Kritik kamu şirketlerini (Limanlar ve İletişim AŞ) körfez fonlarına hızla satın.",
                consequenceText: "Hazine +₺15.0B, Büyük Sermaye favor +12, ama Milliyetçi onay -22%, Sol onay -15%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.treasury += 15000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 22);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                }
            },
            {
                text: "[TEMERRÜT İLAN ET] Borçları vadesinde ödemeyeceğinizi (moratoryum) açıklayıp yapılandırma talep edin.",
                consequenceText: "İstikrar -25%, Enflasyon +20%, Büyük Sermaye favor -30, Hazine borcu ertelenir. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 25);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 20);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 30);
                }
            }
        ]
    },
    {
        id: "national_car_project_start",
        title: "ZİNCİR - Milli Otomobil Batarya Krizi",
        desc: "Hükümetin büyük milli sanayi hamlesi olan yerli elektrikli otomobil projesinin ana batarya ortağı iflas eşiğinde. Üretim bandının durmaması için ₺3.0B acil kamu yardımı veya ortaklık değişikliği gerekiyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[KAMULAŞTIR] Firmayı tamamen kamulaştırın ve devlet sermayesiyle fabrikaya ortak olun.",
                consequenceText: "Milliyetçi onay +15%, Sol onay +15%, Hazine -₺3.0B, Liberal onay -15%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.treasury -= 3000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                }
            },
            {
                text: "[YABANCI ORTAK] Fabrikanın kontrolünü Çinli bir otomotiv devine satarak kurtarın.",
                consequenceText: "Ekonomi +10%, Hazine korunur, ancak Milliyetçi onay -20%, NATO favor -10. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 10);
                }
            },
            {
                text: "[ÖZEL SEKTÖR BİRLİĞİ] Büyük holdingleri (TÜSİAD) zorla konsorsiyuma ortak edin ve sübvanse edin.",
                consequenceText: "Büyük Sermaye favor -15, Ekonomi +5%, Hazine -₺1.0B, İstikrar +5%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 5);
                    s.treasury -= 1000000000;
                    s.stability = Math.min(100, s.stability + 5);
                }
            },
            {
                text: "[PROJEYİ DURDUR] Batarya krizini çözmeyip fabrikanın kapanmasına ve projenin askıya alınmasına izin verin.",
                consequenceText: "Hazine bütçesi korunur. Milliyetçi onay -25%, İşçiler onay -15%, İstikrar -10%. (Yankı Tetiklenecek!)",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                    s.stability = Math.max(0, s.stability - 10);
                }
            }
        ]
    },
    {
        id: "akdeniz_sondaj_gerginligi",
        title: "DOĞU AKDENİZDE EGEMENLİK VE SONDAJ KRİZİ",
        desc: "Milli Sondaj Gemimiz Abdülhamid Han'ın Akdeniz'deki kıta sahanlığımız içinde başlattığı doğal gaz arama faaliyetleri, Yunan ve Fransız firkateynleri tarafından fiziksel olarak engellenmeye çalışılıyor. TSK Telsizlerinden acil koduyla savunma emri bekleniyor.",
        condition: (s) => true,
        choices: [
            {
                text: "[DONANMAYI AÇIK DENİZE GÖNDER] Sondaj gemisini korumak için Türk Donanmasını teyakkuza geçirin ve gerekirse angajman uygulayın.",
                consequenceText: "Milliyetçi Onay +30%, Ordu Onay +20%, Güvenlik +10%, ancak Süper NATO favor -35, İstikrar -15%, Hazine bütçesi -₺3.5B (askeri mobilizasyon).",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 30);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 35);
                    s.stability = Math.max(0, s.stability - 15);
                    s.treasury -= 3500000000;
                }
            },
            {
                text: "[GERİ ADIM AT] Gemiyi limana geri çağırın ve diplomatik müzakereler için masaya oturun.",
                consequenceText: "Milliyetçi Onay -35%, Ordu Onay -25%, Güvenlik -10%, Süper NATO favor +25, Büyük Sermaye favor +15, Hazine korunur.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 35);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 25);
                    s.systems.security = Math.max(0, s.systems.security - 10);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 25);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                }
            },
            {
                text: "[TAVİZ VER - ULUSLARARASILAŞTIR] Sondajı askıya alarak Birleşmiş Milletler ve Lahey Adalet Divanı hakemliğini kabul edin.",
                consequenceText: "İstikrar +10%, Liberal Onay +20%, ama Milliyetçi Onay -20%, Siyasi Sermaye -15.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                }
            },
            {
                text: "[FIRSATA ÇEVİR - AB PROJELENDİRME] Bölgede AB ve ABD ortak konsorsiyumu kurup gazı birlikte çıkarmayı teklif edin.",
                consequenceText: "Hazine +₺6.0B, Ekonomi +15%, Büyük Sermaye favor +20, ama Milliyetçi Onay -25%, Ordu Onay -10%.",
                action: (s) => {
                    s.treasury += 6000000000;
                    s.systems.economy = Math.min(100, s.systems.economy + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 10);
                }
            }
        ]
    },
    {
        id: "siber_saldiri_edevlet",
        title: "E-DEVLET VE KAMU SİSTEMLERİNE DEVASA SİBER SALDIRI",
        desc: "Yabancı istihbarat destekli bir hacker grubu, E-Devlet, MHRS ve bankacılık altyapı şebekemize eşzamanlı bir siber saldırı gerçekleştirdi. Milyonlarca vatandaşın kimlik, sağlık ve tapu verileri sızdırıldı. Sistemler kilitlenmiş durumda.",
        condition: (s) => true,
        choices: [
            {
                text: "[MİLLİ SİBER TEYAKKUZ] MİT Siber Savunma Dairesi'ni devreye sokup tüm şebekeyi kapatın, sızdırılan verileri yalanlayıp medyaya yayın yasağı getirin.",
                consequenceText: "Güvenlik +15%, Medya kontrolü +15%, ama Özgürlük -20%, Halk Onayı -15%, İstikrar -10%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.systems.media = Math.min(100, s.systems.media + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 15);
                    s.stability = Math.max(0, s.stability - 10);
                }
            },
            {
                text: "[SERBEST BIRAK] Saldırıya açıkça yanıt verip verilerin sızdığını itiraf edin, siber savunmayı batılı özel firmalara ihale edin.",
                consequenceText: "Özgürlük +10%, Liberal Onay +15%, ama Yolsuzluk +25, Hazine -₺2.5B, Güvenlik -15%.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 25);
                    s.treasury -= 2500000000;
                    s.systems.security = Math.max(0, s.systems.security - 15);
                }
            },
            {
                text: "[TAVİZ VER] Bilgi Teknolojileri ve İletişim Kurumu (BTK) yönetimini görevden alıp liyakatli siber güvenlik kurulu atayın.",
                consequenceText: "İstikrar +15%, Akademi Onayı +20%, Öğrenci Onayı +15%, Siyasi Sermaye -10.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 20);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                }
            },
            {
                text: "[FIRSATA ÇEVİR] Kripto ve siber güvenliği bahane ederek tüm internet trafiğini izleyecek ve VPN servislerini yasaklayacak yasa çıkarın.",
                consequenceText: "Güvenlik +20%, Medya kontrolü +15%, ama Özgürlük -35%, Gençler Onayı -35%, Öğrenci Onayı -25%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 20);
                    s.systems.media = Math.min(100, s.systems.media + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 35);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 35);
                    s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 25);
                }
            }
        ]
    }
];

function triggerRandomEvent(state) {
    if (!state.triggeredEvents) state.triggeredEvents = [];
    
    // Filter events by condition and not triggered
    let availableEvents = events.filter(ev => ev.condition(state) && !state.triggeredEvents.includes(ev.id));
    
    if (availableEvents.length === 0) {
        // Fallback: search for any untriggered events regardless of condition
        availableEvents = events.filter(ev => !state.triggeredEvents.includes(ev.id));
    }
    
    if (availableEvents.length === 0) {
        // If literally every event has been triggered, reset history
        state.triggeredEvents = [];
        availableEvents = events;
    }
    
    // Pick random
    const idx = Math.floor(Math.random() * availableEvents.length);
    return availableEvents[idx];
}

// ==========================================
// CONDITIONAL CRISES ENGINE (PRIORITIZED)
// ==========================================

function triggerPrioritizedCrisisEvent(state, triggerGameOver) {
    if (!state.powerCenters) return null;

    // --- DECISION ECHO CONSEQUECES TRIGGER ---
    if (state.decisionEchoes && state.decisionEchoes.length > 0) {
        const echoIdx = state.decisionEchoes.findIndex(echo => echo.triggerTurn === state.turn);
        if (echoIdx !== -1) {
            const echo = state.decisionEchoes[echoIdx];
            state.decisionEchoes.splice(echoIdx, 1); // remove from queue
            
            const sourceTemplate = echoEventsDatabase[echo.eventId];
            if (sourceTemplate) {
                return {
                    id: sourceTemplate.id,
                    title: sourceTemplate.title,
                    desc: `<span style="color: var(--color-gold-text); font-weight: bold; font-family: var(--font-header);">[GEÇMİŞ KARARIN ETKİSİ]</span> 2-3 çeyrek önce <strong>"${echo.originTitle}"</strong> olayında <em>"${echo.originChoiceText}"</em> kararını vermiştiniz.<br><br>${sourceTemplate.desc}`,
                    choices: sourceTemplate.choices
                };
            }
        }
    }

    // --- CABINET MINISTER BETRAYAL TRIGGERS ---
    if (state.cabinet && Math.random() < 0.25) {
        const disloyalMinisters = [];
        for (const portfolio in state.cabinet) {
            if (state.cabinet[portfolio].loyalty < 40) {
                disloyalMinisters.push({ portfolio, min: state.cabinet[portfolio] });
            }
        }
        
        if (disloyalMinisters.length > 0) {
            const picked = disloyalMinisters[Math.floor(Math.random() * disloyalMinisters.length)];
            const pName = picked.min.name;
            const pPort = picked.portfolio === "economy" ? "Ekonomi" : picked.portfolio === "interior" ? "İçişleri" : picked.portfolio === "foreign" ? "Dışişleri" : picked.portfolio === "defense" ? "Milli Savunma" : picked.portfolio === "education" ? "Milli Eğitim" : picked.portfolio === "health" ? "Sağlık" : "Adalet";
            
            const betrayalType = Math.floor(Math.random() * 3);
            if (betrayalType === 0) {
                return {
                    id: "minister_blackmail",
                    title: `KABİNEDE ŞANTAJ VE İSTİFA TEHDİDİ: ${pName.toUpperCase()}`,
                    desc: `${pPort} Bakanı ${pName}, hükümetinize karşı gizli bir şantaj dosyası hazırladı. Bakan, kendi bütçesinin artırılmasını ve tarikat/holding anlaşmalarından pay almayı talep ediyor. Aksi halde istifa edip elindeki gizli ihale ses kayıtlarını basına sızdıracağını belirtiyor.`,
                    choices: [
                        {
                            text: "[RÜŞVET VER] Bakanın taleplerini karşıla, hazineden ₺1.0B aktar ve dosyaları sustur.",
                            consequenceText: "Hazine bütçesi erir (-₺1.0B), Yolsuzluk artar (+10), bakanın sadakati 60'a yükselir.",
                            action: (s) => {
                                s.treasury -= 1000000000;
                                s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                                s.cabinet[picked.portfolio].loyalty = 60;
                                return null;
                            }
                        },
                        {
                            text: "[GÖREVDEN AL] Bakanı 'vatan hainliği' ve rüşvetle suçlayıp derhal görevden uzaklaştır.",
                            consequenceText: "Bakan kabineden kovulur, yerine yeni bir isim atanır. Siyasi Sermaye düşer (-10), İstikrar sarsılır (-10%).",
                            action: (s) => {
                                s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                                s.stability = Math.max(0, s.stability - 10);
                                s.cabinet[picked.portfolio] = {
                                    name: "Ahmet Erdem",
                                    competence: 55 + Math.round(Math.random() * 30),
                                    ideology: s.ideology,
                                    ideologyLabel: s.ideology === "liberal" ? "Liberal" : s.ideology === "conservative" ? "Muhafazakar" : s.ideology === "nationalist" ? "Milliyetçi" : "Merkez",
                                    loyalty: 80,
                                    popularity: 50,
                                    corruption: 10,
                                    reform: 50
                                };
                                return null;
                            }
                        },
                        {
                            text: "[REST ÇEK] Şantajı görmezden gel ve istifasını kabul et.",
                            consequenceText: "Bakan istifa eder ve dosyaları sızdırır. İstikrar çöker (-20%), Siyasi Sermaye kaybedilir (-20), Medya kontrolü azalır (-10%). Yeni bakan atanır.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 20);
                                s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                                s.systems.media = Math.max(0, s.systems.media - 10);
                                s.cabinet[picked.portfolio] = {
                                    name: "Yusuf Demir",
                                    competence: 60 + Math.round(Math.random() * 25),
                                    ideology: s.ideology,
                                    ideologyLabel: "Merkez",
                                    loyalty: 75,
                                    popularity: 45,
                                    corruption: 12,
                                    reform: 45
                                };
                                return null;
                            }
                        }
                    ]
                };
            } else if (betrayalType === 1) {
                return {
                    id: "minister_conspiracy",
                    title: `KABİNEDE İSTİHBARAT SIZINTISI HÜCRESİ: ${pName.toUpperCase()}`,
                    desc: `MİT, ${pPort} Bakanı ${pName}'ın gizli kabine güvenlik oturumlarının ses kayıtlarını ve stratejik dış pakt yazışmalarını muhalefet partileri ile yabancı büyükelçiliklere sızdırdığını tespit etti! Bakanın sadakati dipte ve ihaneti tescillendi.`,
                    choices: [
                        {
                            text: "[SESSİZCE GÖZALTINA AL] Bakanı MİT eliyle sorguya al, medyaya 'sağlık nedenleriyle çekildi' de.",
                            consequenceText: "Güvenlik artar (+10), Özgürlük geriler (-10%), bakan kabineden temizlenir, Siyasi Sermaye harcanır (-12 PC).",
                            action: (s) => {
                                s.systems.security = Math.min(100, s.systems.security + 10);
                                s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                                s.politicalCapital = Math.max(0, s.politicalCapital - 12);
                                s.cabinet[picked.portfolio] = {
                                    name: "Süleyman Kaya",
                                    competence: 65,
                                    ideology: s.ideology,
                                    ideologyLabel: "Bürokrat",
                                    loyalty: 90,
                                    popularity: 40,
                                    corruption: 5,
                                    reform: 40
                                };
                                return null;
                            }
                        },
                        {
                            text: "[ÇİFTE AJAN YAP] Bakanı sızıntıları bildiğinizle tehdit edip, muhalefete yanlış bilgi sızdırmaya zorlayın.",
                            consequenceText: "Bakanın sadakati 75'e sabitlenir, 15 Siyasi Sermaye kazanılır.",
                            action: (s) => {
                                s.cabinet[picked.portfolio].loyalty = 75;
                                s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                                return null;
                            }
                        },
                        {
                            text: "[RESEAL VE İSTİFAYA ZORLA] Bakanı kamuoyu önünde suçlamadan istifasını talep et.",
                            consequenceText: "Kabinede kriz algısı oluşur. İstikrar düşer (-12%), yeni bakan atanır.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 12);
                                s.cabinet[picked.portfolio] = {
                                    name: "Zeynep Akar",
                                    competence: 72,
                                    ideology: "technocrat",
                                    ideologyLabel: "Teknokrat",
                                    loyalty: 85,
                                    popularity: 60,
                                    corruption: 8,
                                    reform: 60
                                };
                                return null;
                            }
                        }
                    ]
                };
            } else {
                return {
                    id: "minister_ultimatum",
                    title: `KABİNEDE İDEOLOJİK REKABET ÜLTİMATOMU: ${pName.toUpperCase()}`,
                    desc: `${pPort} Bakanı ${pName}, sizin politikalarınız ve kadrolaşma tercihleriniz karşısında kabinede kendi kliklerinin ezildiğini iddia ederek size rest çekti. Ya diğer bir bakanı görevden alırsınız ya da kendisi 4 milletvekiliyle istifa edip koalisyonu çökertecektir.`,
                    choices: [
                        {
                            text: "[TALEBİ KABUL ET] Bakanın işaret ettiği diğer bakanı görevden alıp kendi ekibini yerleştir.",
                            consequenceText: "Bakanın sadakati 85'e fırlar, ancak görevden alınan bakanın kliki sert geriler (-25 favor), İstikrar düşer (-8%).",
                            action: (s) => {
                                s.cabinet[picked.portfolio].loyalty = 85;
                                s.stability = Math.max(0, s.stability - 8);
                                const portfolios = Object.keys(s.cabinet).filter(p => p !== picked.portfolio);
                                const firedPort = portfolios[Math.floor(Math.random() * portfolios.length)];
                                const firedMin = s.cabinet[firedPort];
                                s.logs.push(`MİTİNG/ÜLTİMATOM: ${pName} talebiyle ${firedMin.name} görevden alındı!`);
                                s.cabinet[firedPort] = {
                                    name: "Kenan Yıldız",
                                    competence: 50,
                                    ideology: picked.min.ideology,
                                    ideologyLabel: picked.min.ideologyLabel,
                                    loyalty: 80,
                                    popularity: 40,
                                    corruption: 15,
                                    reform: 30
                                };
                                return null;
                            }
                        },
                        {
                            text: "[REDDET] Bakanın istifasını kabul et ve mecliste vekillerin gidişini izle.",
                            consequenceText: "Bakan istifa eder, meclis çoğunluğunuz zayıflar. İstikrar düşer (-15%), Siyasi Sermaye azalır (-15). Yeni bakan atanır.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 15);
                                s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                                s.cabinet[picked.portfolio] = {
                                    name: "Merve Çelik",
                                    competence: 68,
                                    ideology: "technocrat",
                                    ideologyLabel: "Teknokrat",
                                    loyalty: 80,
                                    popularity: 50,
                                    corruption: 10,
                                    reform: 55
                                };
                                return null;
                            }
                        }
                    ]
                };
            }
        }
    }

    // --- VOTER ALLIANCE CRISIS TRIGGERS ---
    if (state.voterAlliances && state.voterAlliances.length > 0) {
        const matureAlliance = state.voterAlliances.find(a => a.progress >= 100);
        if (matureAlliance) {
            const allianceCrisis = generateVoterAllianceCrisis(matureAlliance, state);
            if (allianceCrisis) return allianceCrisis;
        }
    }

    // --- REGIME WATCH COALITION PLOTS TRIGGER ---
    if (state.regimeWatch) {
        const rw = state.regimeWatch;

        
        // 1. Anadolu Sermaye Koalisyonu (Cemaatler + Büyük Sermaye)
        if (rw.cemaatler.plotProgress >= 100 || rw.buyuk_sermaye.plotProgress >= 100) {
            if (rw.cemaatler.activeAlliance === "Anadolu Sermaye Koalisyonu") {
                return {
                    id: "anadolu_sermaye_coup",
                    title: "ANADOLU SERMAYE KOALİSYONU DARBE GİRİŞİMİ",
                    desc: "Dini cemaatler ve büyük holdinglerin gizli işbirliğiyle kurulan Anadolu Sermaye Koalisyonu, finans piyasalarını kilitleyerek ve sokaklarda geniş çaplı şeriat mitingleri düzenleyerek yönetime ültimatom verdi! Faizsiz bankacılığa tam destek verilmesini, kamu okullarının cemaat vakıflarına devredilmesini ve kabinede köklü bir revizyona gidilmesini talep ediyorlar!",
                    choices: [
                        {
                            text: "[BASTIR] Cunta vakıflarını ve bankalarını kamulaştır, liderlerini tutuklat.",
                            consequenceText: "Hazineye el konur (+₺5.0B), Güvenlik artar (+10%), ama Özgürlük sert düşer (-20%) ve İstikrar geriler (-10%). Maliyet: 25 PC.",
                            action: (s) => {
                                s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                                s.treasury += 5000000000;
                                s.systems.security = Math.min(100, s.systems.security + 10);
                                s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                                s.stability = Math.max(0, s.stability - 10);
                                s.regimeWatch.cemaatler.favor = 0;
                                s.regimeWatch.cemaatler.plotProgress = 0;
                                s.regimeWatch.buyuk_sermaye.favor = 0;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 0;
                                return null;
                            }
                        },
                        {
                            text: "[GÖRMEZDEN GEL] Finansal boykota ve protestolara müdahale etmeyip bekle.",
                            consequenceText: "Ülke ekonomisi daralır, borç yükü tırmanır. İstikrar sert düşer (-30), Ekonomi geriler (-15), Hazine bütçesi erir (-₺5.0B). Plot ilerlemesi %50'ye geriler.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 30);
                                s.systems.economy = Math.max(0, s.systems.economy - 15);
                                s.treasury -= 5000000000;
                                s.regimeWatch.cemaatler.plotProgress = 50;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 50;
                                return null;
                            }
                        },
                        {
                            text: "[FIRSATA ÇEVİR] Taleplerini kabul et, kabineyi onlara teslim et ve ideolojini Muhafazakar yap.",
                            consequenceText: "Resmi ideolojiniz 'Muhafazakâr' (conservative) olarak değişir. Bakanlar onlarla uyumlu kadrolarla değiştirilir. İlişkiler düzelir (+60), plot sıfırlanır, Laiklik karşıtı yasalar yürürlüğe girer.",
                            action: (s) => {
                                s.ideology = "conservative";
                                s.regimeWatch.cemaatler.favor = 60;
                                s.regimeWatch.cemaatler.plotProgress = 0;
                                s.regimeWatch.buyuk_sermaye.favor = 60;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 0;
                                s.stability = 60;
                                s.cabinet.education = { name: "Mustafa Göktürk", competence: 70, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 95, popularity: 55, corruption: 25, reform: 35 };
                                s.cabinet.justice = { name: "Halit Ziya Kutlu", competence: 78, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 92, popularity: 60, corruption: 22, reform: 30 };
                                s.cabinet.economy = { name: "Faruk Karahan", competence: 72, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 95, popularity: 58, corruption: 45, reform: 30 };
                                s.activePolicies.religious_edu = 60;
                                s.activePolicies.corporate_tax = 10;
                                return null;
                            }
                        }
                    ]
                };
            }
        }

        // 2. Atlantikçi Blok (Süper NATO + Büyük Sermaye + Sebataycılar)
        if (rw.super_nato.plotProgress >= 100 || rw.buyuk_sermaye.plotProgress >= 100) {
            if (rw.super_nato.activeAlliance === "Atlantikçi Blok") {
                return {
                    id: "atlantik_coup",
                    title: "ATLANTİKÇİ BLOK ASKERİ VE FİNANSAL MUHTIRASI",
                    desc: "Uluslararası finans çevreleri, TÜSİAD ve NATO yanlısı derin klikler hükümetinize karşı koordineli bir saldırı başlattı! Döviz piyasaları sabote ediliyor, askeri üstlerde hareketlilik var. NATO entegrasyon yasasının onaylanmasını, özelleştirme dalgasının tamamlanmasını ve kabineye batı yanlısı bakanların atanmasını talep eden bir ültimatom yayınladılar!",
                    choices: [
                        {
                            text: "[BASTIR] NATO üslerini abluka altına al, cunta liderlerini ve Gladio hücrelerini tasfiye et.",
                            consequenceText: "Asayiş artar (+15%), ama Özgürlük sert düşer (-20%), İstikrar geriler (-10%), her üç grubun favoru 0'a iner. Cost: 25 PC.",
                            action: (s) => {
                                s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                                s.systems.security = Math.min(100, s.systems.security + 15);
                                s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                                s.stability = Math.max(0, s.stability - 10);
                                s.regimeWatch.super_nato.favor = 0;
                                s.regimeWatch.super_nato.plotProgress = 0;
                                s.regimeWatch.buyuk_sermaye.favor = 0;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 0;
                                s.regimeWatch.sebataycilar.favor = 0;
                                s.regimeWatch.sebataycilar.plotProgress = 0;
                                return null;
                            }
                        },
                        {
                            text: "[GÖRMEZDEN GEL] Saldırıları ve döviz dalgalanmasını piyasanın kendi dinamiklerine bırak.",
                            consequenceText: "Maddi hasar ağırdır. İstikrar sert düşer (-30), Ekonomi geriler (-18), Hazine bütçesi erir (-₺6.0B). Plot ilerlemesi %50'ye geriler.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 30);
                                s.systems.economy = Math.max(0, s.systems.economy - 18);
                                s.treasury -= 6000000000;
                                s.regimeWatch.super_nato.plotProgress = 50;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 50;
                                s.regimeWatch.sebataycilar.plotProgress = 50;
                                return null;
                            }
                        },
                        {
                            text: "[FIRSATA ÇEVİR] Talepleri kabul et, kabineyi Atlantikçi ekibe ver ve ideolojini Liberal yap.",
                            consequenceText: "Resmi ideolojiniz 'Liberal' olarak değişir. Bakanlar batı yanlısı isimlerle değiştirilir. İlişkiler düzelir (+60), plot sıfırlanır, özelleştirme ve NATO paktı yürürlüğe girer.",
                            action: (s) => {
                                s.ideology = "liberal";
                                s.regimeWatch.super_nato.favor = 60;
                                s.regimeWatch.super_nato.plotProgress = 0;
                                s.regimeWatch.buyuk_sermaye.favor = 60;
                                s.regimeWatch.buyuk_sermaye.plotProgress = 0;
                                s.regimeWatch.sebataycilar.favor = 60;
                                s.regimeWatch.sebataycilar.plotProgress = 0;
                                s.stability = 60;
                                s.cabinet.economy = { name: "Banu Yılmaz", competence: 90, ideology: "liberal", ideologyLabel: "Liberal", loyalty: 85, popularity: 75, corruption: 20, reform: 85 };
                                s.cabinet.foreign = { name: "Kerem Yıldırım", competence: 88, ideology: "liberal", ideologyLabel: "Liberal Batıcı", loyalty: 80, popularity: 78, corruption: 15, reform: 75 };
                                s.cabinet.defense = { name: "Bülent Aksoy", competence: 80, ideology: "liberal", ideologyLabel: "Atlantikçi", loyalty: 85, popularity: 70, corruption: 15, reform: 65 };
                                s.activePolicies.defense_alliances = 80;
                                s.activePolicies.corporate_tax = 10;
                                return null;
                            }
                        }
                    ]
                };
            }
        }

        // 3. Derin Devlet Cephesi (Kemalist Bürokrasi + Süper NATO)
        if (rw.kemalist_burokrasi.plotProgress >= 100 || rw.super_nato.plotProgress >= 100) {
            if (rw.kemalist_burokrasi.activeAlliance === "Derin Devlet Cephesi") {
                return {
                    id: "derin_devlet_coup",
                    title: "DERİN DEVLET CEPHESİ CUNTA MUHTIRASI",
                    desc: "Laik sivil-askeri bürokrasi kadroları ile kontrgerilla unsurlarının birleşmesiyle oluşan Derin Devlet Cephesi, hükümetinize karşı 'devlet refleksini' devreye soktu! İstihbarat raporlarına göre, anayasal laikliği korumak adı altında olağanüstü sıkıyönetim ilan edilmesini, tarikat eğitimlerinin kapatılmasını ve milliyetçi kadroların göreve getirilmesini şart koşan askeri bir bildiri yayınladılar!",
                    choices: [
                        {
                            text: "[BASTIR] Cunta liderlerini görevden al, askeri karargahı abluka altına al.",
                            consequenceText: "Asayiş artar (+10%), ama Özgürlük sert düşer (-15%), İstikrar geriler (-10%), her iki grubun favoru 0'a iner. Cost: 20 PC.",
                            action: (s) => {
                                s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                                s.systems.security = Math.min(100, s.systems.security + 10);
                                s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                                s.stability = Math.max(0, s.stability - 10);
                                s.regimeWatch.kemalist_burokrasi.favor = 0;
                                s.regimeWatch.kemalist_burokrasi.plotProgress = 0;
                                s.regimeWatch.super_nato.favor = 0;
                                s.regimeWatch.super_nato.plotProgress = 0;
                                return null;
                            }
                        },
                        {
                            text: "[GÖRMEZDEN GEL] Muhtıraya sessiz kal ve yargısal engellemeleri sineye çek.",
                            consequenceText: "Yönetim iradeniz zayıflar. İstikrar sert düşer (-30), Siyasi Sermaye kazanımı felç olur (-15 PC). Plot ilerlemesi %50'ye geriler.",
                            action: (s) => {
                                s.stability = Math.max(0, s.stability - 30);
                                s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                                s.regimeWatch.kemalist_burokrasi.plotProgress = 50;
                                s.regimeWatch.super_nato.plotProgress = 50;
                                return null;
                            }
                        },
                        {
                            text: "[FIRSATA ÇEVİR] Talepleri kabul et, kabineyi onlara teslim et ve ideolojini Kemalist yap.",
                            consequenceText: "Resmi ideolojiniz 'Kemalist' (kemalist_secular) olarak değişir. Bakanlar laik kadrolarla değiştirilir. İlişkiler düzelir (+60), plot sıfırlanır, laiklik yasaları devreye girer.",
                            action: (s) => {
                                s.ideology = "kemalist_secular";
                                s.regimeWatch.kemalist_burokrasi.favor = 60;
                                s.regimeWatch.kemalist_burokrasi.plotProgress = 0;
                                s.regimeWatch.super_nato.favor = 60;
                                s.regimeWatch.super_nato.plotProgress = 0;
                                s.stability = 60;
                                s.cabinet.defense = { name: "Turgut Aksoy", competence: 85, ideology: "nationalist", ideologyLabel: "Milliyetçi", loyalty: 88, popularity: 80, corruption: 25, reform: 15 };
                                s.cabinet.justice = { name: "Kemal Uyar", competence: 82, ideology: "secular", ideologyLabel: "Kemalist", loyalty: 85, popularity: 65, corruption: 10, reform: 40 };
                                s.cabinet.education = { name: "İpek Yücel", competence: 88, ideology: "secular", ideologyLabel: "Kemalist", loyalty: 70, popularity: 72, corruption: 10, reform: 80 };
                                s.activePolicies.religious_edu = 10;
                                s.activePolicies.minority_rights = null;
                                return null;
                            }
                        }
                    ]
                };
            }
        }

        // 4. Individual Faction Plot - Cemaatler
        if (rw.cemaatler.plotProgress >= 100) {
            return {
                id: "cemaatler_coup",
                title: "DİNİ YAPILANMALARIN DARBE KUMPASI",
                desc: "Hükümetinizin laik politikaları sonrası dini cemaat ve tarikat yapılanmaları sivil-askeri bürokrasideki hücrelerini kullanarak bir darbe kumpası organize etti! Talepleri kabineye muhafazakar bakan atanması ve laik yasaların iptali.",
                choices: [
                    {
                        text: "[BASTIR] Tarikat liderlerini tutuklat ve operasyon başlat.",
                        consequenceText: "Cemaat favoru 0 olur, Güvenlik artar (+10%), Özgürlük geriler (-10%). Cost: 20 PC.",
                        action: (s) => {
                            s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                            s.systems.security = Math.min(100, s.systems.security + 10);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                            s.regimeWatch.cemaatler.favor = 0;
                            s.regimeWatch.cemaatler.plotProgress = 0;
                            return null;
                        }
                    },
                    {
                        text: "[GÖRMEZDEN GEL] Taleplerini reddet ama operasyon da yapma.",
                        consequenceText: "Huzursuzluk artar. İstikrar düşer (-20), plot progress %50'ye geriler.",
                        action: (s) => {
                            s.stability = Math.max(0, s.stability - 20);
                            s.regimeWatch.cemaatler.plotProgress = 50;
                            return null;
                        }
                    },
                    {
                        text: "[FIRSATA ÇEVİR] Talepleri kabul et ve ideolojini Muhafazakar yap.",
                        consequenceText: "Resmi ideolojiniz 'Muhafazakâr' olur. Eğitim ve adalet bakanları muhafazakar olur. Cemaat favoru +60, plot sıfırlanır.",
                        action: (s) => {
                            s.ideology = "conservative";
                            s.regimeWatch.cemaatler.favor = 60;
                            s.regimeWatch.cemaatler.plotProgress = 0;
                            s.cabinet.education = { name: "Mustafa Göktürk", competence: 70, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 95, popularity: 55, corruption: 25, reform: 35 };
                            s.cabinet.justice = { name: "Halit Ziya Kutlu", competence: 78, ideology: "conservative", ideologyLabel: "Muhafazakâr", loyalty: 92, popularity: 60, corruption: 22, reform: 30 };
                            s.activePolicies.religious_edu = 60;
                            return null;
                        }
                    }
                ]
            };
        }

        // 5. Individual Faction Plot - Kemalist Bürokrasi
        if (rw.kemalist_burokrasi.plotProgress >= 100) {
            return {
                id: "kemalist_coup",
                title: "KEMALİST BÜROKRASİ VESAYETİ BİLDİRİSİ",
                desc: "Kemalist kadrolar, yargı ve ordu içindeki etkilerini kullanarak hükümete 'laik anayasa ihlalleri' gerekçesiyle muhtıra verdi. Yasal liyakat kurallarına geri dönülmesini ve din dersi bütçesinin kısılmasını talep ediyorlar.",
                choices: [
                    {
                        text: "[BASTIR] Vesayetçi yargıç ve bürokratları görevden al, yerlerine atama yap.",
                        consequenceText: "Yargı onayı düşer, Kemalist favor 0 olur, ama Siyasi Sermaye artar (+10). Cost: 15 PC.",
                        action: (s) => {
                            s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                            s.regimeWatch.kemalist_burokrasi.favor = 0;
                            s.regimeWatch.kemalist_burokrasi.plotProgress = 0;
                            s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                            return null;
                        }
                    },
                    {
                        text: "[GÖRMEZDEN GEL] Bildiriyi sessizce sümen altı et.",
                        consequenceText: "Kamu kurumlarında kilitlenme. İstikrar düşer (-20), plot progress %50'ye geriler.",
                        action: (s) => {
                            s.stability = Math.max(0, s.stability - 20);
                            s.regimeWatch.kemalist_burokrasi.plotProgress = 50;
                            return null;
                        }
                    },
                    {
                        text: "[FIRSATA ÇEVİR] Talepleri kabul et ve ideolojini Kemalist yap.",
                        consequenceText: "Resmi ideolojiniz 'Kemalist' olur. Adalet ve eğitim bakanları Kemalist olur. Kemalist favor +60, plot sıfırlanır.",
                        action: (s) => {
                            s.ideology = "kemalist_secular";
                            s.regimeWatch.kemalist_burokrasi.favor = 60;
                            s.regimeWatch.kemalist_burokrasi.plotProgress = 0;
                            s.cabinet.justice = { name: "Kemal Uyar", competence: 82, ideology: "secular", ideologyLabel: "Kemalist", loyalty: 85, popularity: 65, corruption: 10, reform: 40 };
                            s.cabinet.education = { name: "İpek Yücel", competence: 88, ideology: "secular", ideologyLabel: "Kemalist", loyalty: 70, popularity: 72, corruption: 10, reform: 80 };
                            s.activePolicies.religious_edu = 10;
                            return null;
                        }
                    }
                ]
            };
        }

        // --- FACTION FAVOR UNDER 20% CRISES ---
        if (rw.cemaatler.favor < 20) {
            return {
                id: "cemaatler_favor_crisis",
                title: "TARİKAT VE CEMAATLERİN RADİKALLEŞME İSYANI",
                desc: "Hükümetinizin tarikatlar karşıtı adımları sonrası cemaat liderleri tabanlarını sokağa döktü. Ülke genelinde 'inanca saygı' mitingleri düzenleniyor, vakıf binaları önünde polisle çatışmalar yaşanıyor. Cemaatler, din eğitimi teşviklerinin iadesini ve tarikat yurtlarının yeniden açılmasını talep ediyor.",
                choices: [
                    {
                        text: "[BASTIR] Yasadışı eylemleri polis gücüyle sert şekilde dağıt, cemaat yurtlarını mühürle.",
                        consequenceText: "Cemaat nüfuzu düşer (-15 influence), Özgürlük geriler (-10%), Güvenlik artar (+10%), ama Muhafazakar ve Dindar seçmen desteği geriler (-20%). Favor %25'e çıkar.",
                        action: (s) => {
                            s.regimeWatch.cemaatler.influence = Math.max(5, s.regimeWatch.cemaatler.influence - 15);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                            s.systems.security = Math.min(100, s.systems.security + 10);
                            s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 20);
                            s.voterGroups.religious.approval = Math.max(0, s.voterGroups.religious.approval - 20);
                            s.regimeWatch.cemaatler.favor = 25;
                            return null;
                        }
                    },
                    {
                        text: "[MÜZAKERE ET] Cemaat liderleriyle protokol imzala; din dersi saatlerini artır ve bütçeden ₺1.0B hibe ver.",
                        consequenceText: "Dindar seçmen memnun olur (+15%), Cemaat favoru %35'e yükselir. Hazine bütçesi azalır (-₺1.0B). Seküler kesim tepki gösterir (-15%).",
                        action: (s) => {
                            s.voterGroups.religious.approval = Math.min(100, s.voterGroups.religious.approval + 15);
                            s.treasury -= 1000000000;
                            s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                            s.regimeWatch.cemaatler.favor = 35;
                            return null;
                        }
                    },
                    {
                        text: "[TAVİZ VER] Diyanet bütçesini artır, cemaatlerin taleplerini meclise taşı.",
                        consequenceText: "Cemaat favoru %50'ye çıkar. Siyasi Sermaye kazanılır (+12), ancak Sekülerler (-25%) ve Ordu desteği geriler (-15%).",
                        action: (s) => {
                            s.regimeWatch.cemaatler.favor = 50;
                            s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                            s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 25);
                            s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 15);
                            return null;
                        }
                    }
                ]
            };
        }

        if (rw.kemalist_burokrasi.favor < 20) {
            return {
                id: "kemalist_favor_crisis",
                title: "KEMALİST BÜROKRASİNİN BEYAZ PROTESTOSU VE KİLİTLEME",
                desc: "Kemalist Bürokrasi ve yargı üyeleri, kadrolaşma politikalarınız nedeniyle hükümetin çıkardığı kararnameleri Danıştay ve Anayasa Mahkemesi aracılığıyla iptal etmeye başladı. Bürokraside iş yavaşlatma eylemleri yapılıyor, idari sistem felç olmak üzere.",
                choices: [
                    {
                        text: "[BASTIR] Kararları tanımadığınızı ilan edin, Anayasa Mahkemesi üyelerini tasfiye edecek yasa çıkarın.",
                        consequenceText: "Yargı desteği çöker (-25%), Siyasi Sermaye kaybedilir (-15), Özgürlük geriler (-15%). Favor %25'e çıkar.",
                        action: (s) => {
                            s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 25);
                            s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                            s.regimeWatch.kemalist_burokrasi.favor = 25;
                            return null;
                        }
                    },
                    {
                        text: "[MÜZAKERE ET] Liyakat kurallarına geri döneceğinizi açıklayan yeni bir atama yönetmeliği yayınlayın.",
                        consequenceText: "Kemalist favor %35'e yükselir, İstikrar artar (+8%), ama Cemaatler memnuniyetsiz kalır (-15% favor).",
                        action: (s) => {
                            s.regimeWatch.kemalist_burokrasi.favor = 35;
                            s.stability = Math.min(100, s.stability + 8);
                            s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                            return null;
                        }
                    },
                    {
                        text: "[TAVİZ VER] Savunma sanayii ve ordunun tüm ek bütçe taleplerini kabul edin, laik kabine revizyonu yapın.",
                        consequenceText: "Kemalist favor %50'ye çıkar, ordu desteği yükselir (+20%), Muhafazakarlar zayıflar (-12%).",
                        action: (s) => {
                            s.regimeWatch.kemalist_burokrasi.favor = 50;
                            s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                            s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 12);
                            return null;
                        }
                    }
                ]
            };
        }

        if (rw.buyuk_sermaye.favor < 20) {
            return {
                id: "sermaye_favor_crisis",
                title: "BÜYÜK SERMAYENİN FİNANSAL BOYKOTU VE SERMAYE KAÇIŞI",
                desc: "Büyük sermaye holdingleri (TÜSİAD), ekonomi politikalarınıza karşı açık tavır aldı. Yatırımları dondurma kararı aldılar ve döviz rezervlerini yurt dışına transfer etmeye başladılar. Lira hızla değer kaybediyor, sanayi üretimi aksıyor.",
                choices: [
                    {
                        text: "[BASTIR] Sermaye kontrolü ilan edin, döviz kaçıran holdinglerin banka hesaplarını dondurun.",
                        consequenceText: "Ekonomi ağır darbe alır (-20%), İş Dünyası onayı düşer (-30%). Hazineye el konan kaynak aktarılır (+₺4.0B). Solcular ve İşçiler sevinir (+20%). Favor %25'e çıkar.",
                        action: (s) => {
                            s.systems.economy = Math.max(0, s.systems.economy - 20);
                            s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 30);
                            s.treasury += 4000000000;
                            s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                            s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 20);
                            s.regimeWatch.buyuk_sermaye.favor = 25;
                            return null;
                        }
                    },
                    {
                        text: "[MÜZAKERE ET] Holding liderleriyle yuvarlak masa toplantısı yapın, kurumlar vergisini %5 düşürün ve teşvikler açıklayın.",
                        consequenceText: "Sermaye favoru %35'e yükselir, Ekonomi toparlanır (+8%), ancak İşçilerin ve Çiftçilerin onayı düşer (-10%).",
                        action: (s) => {
                            s.regimeWatch.buyuk_sermaye.favor = 35;
                            s.systems.economy = Math.min(100, s.systems.economy + 8);
                            s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 10);
                            s.voterGroups.farmers.approval = Math.max(0, s.voterGroups.farmers.approval - 10);
                            return null;
                        }
                    },
                    {
                        text: "[TAVİZ VER] IMF veya Dünya Bankası standartlarında bir yapısal reform programı açıklayın.",
                        consequenceText: "Sermaye favoru %50'ye çıkar, yabancı yatırımcı geri döner. Ekonomi (+15%) düzelir. Enflasyon düşer (-10%), ama bağımsızlık algısı zedelenir (-10 PC).",
                        action: (s) => {
                            s.regimeWatch.buyuk_sermaye.favor = 50;
                            s.systems.economy = Math.min(100, s.systems.economy + 15);
                            s.systems.inflation = Math.max(0, s.systems.inflation - 10);
                            s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                            return null;
                        }
                    }
                ]
            };
        }

        if (rw.super_nato.favor < 20) {
            return {
                id: "nato_favor_crisis",
                title: "ATLANTİKÇİ GLADİO UNSURLARINDAN SUİKAST VE SABOTAJLAR",
                desc: "Süper NATO ve derin devlet unsurlarının hükümeti hedef alan sabotaj ve dinleme kayıtları basına sızdı. Bürokraside bazı kilit daire başkanları faili meçhul şekilde suikasta uğradı. Güvenlik zafiyeti hat safhada.",
                choices: [
                    {
                        text: "[BASTIR] MİT'i devreye sokup Gladio karargahlarına eşzamanlı şafak operasyonları düzenletin.",
                        consequenceText: "Güvenlik artar (+15%), ama İstikrar sarsılır (-10%). Siyasi Sermaye kaybedilir (-10 PC). Favor %25'e çıkar.",
                        action: (s) => {
                            s.systems.security = Math.min(100, s.systems.security + 15);
                            s.stability = Math.max(0, s.stability - 10);
                            s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                            s.regimeWatch.super_nato.favor = 25;
                            return null;
                        }
                    },
                    {
                        text: "[MÜZAKERE ET] Bölgesel askeri paktlara ve yeni NATO üslerine izin vererek derin ilişkileri onarın.",
                        consequenceText: "Süper NATO favoru %35'e çıkar, Güvenlik toparlanır (+8%), ancak Solcular ve Milliyetçiler tepki gösterir (-15%).",
                        action: (s) => {
                            s.regimeWatch.super_nato.favor = 35;
                            s.systems.security = Math.min(100, s.systems.security + 8);
                            s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                            s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                            return null;
                        }
                    },
                    {
                        text: "[TAVİZ VER] Askeri komuta kademesini ve güvenlik birimlerini onların önerdiği isimlere teslim edin.",
                        consequenceText: "Süper NATO favoru %50'ye çıkar, Güvenlik (+12%) ve yabancı istihbarat desteği artar, ancak Özgürlük geriler (-10%).",
                        action: (s) => {
                            s.regimeWatch.super_nato.favor = 50;
                            s.systems.security = Math.min(100, s.systems.security + 12);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                            return null;
                        }
                    }
                ]
            };
        }

        if (rw.sebataycilar.favor < 20) {
            return {
                id: "sebataycilar_favor_crisis",
                title: "SEBATAYCI MEDYA KARTELİNİN YIPRATMA KAMPANYASI",
                desc: "Geleneksel seküler zengin aileler ve Sebataycı seçkinler, ellerindeki devasa medya ve kültür kanalları aracılığıyla hükümeti yıpratma kampanyası başlattı. Sanatçılar ve aydınlar sokağa çıkma çağrıları yapıyor, anayasal kriz kışkırtılıyor.",
                choices: [
                    {
                        text: "[BASTIR] Muhalif televizyon kanallarına ve kültür vakıflarına ağır vergi cezaları yazın ve yayınlarını kesin.",
                        consequenceText: "Medya gücünüz artar (+15%), ancak Özgürlük çöküşe geçer (-15%), Seküler seçmen desteği geriler (-15%). Favor %25'e çıkar.",
                        action: (s) => {
                            s.systems.media = Math.min(100, s.systems.media + 15);
                            s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                            s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                            s.regimeWatch.sebataycilar.favor = 25;
                            return null;
                        }
                    },
                    {
                        text: "[MÜZAKERE ET] Kültür vakıflarına ve sanat festivallerine hazineden ₺800M bütçe tahsis edin ve sansür yasalarını gevşetin.",
                        consequenceText: "Sebataycı favor %35'e çıkar, Akademi onayı artar (+10%), Özgürlük yükselir (+5%). Hazine -₺800M.",
                        action: (s) => {
                            s.regimeWatch.sebataycilar.favor = 35;
                            s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 10);
                            s.systems.freedom = Math.min(100, s.systems.freedom + 5);
                            s.treasury -= 800000000;
                            return null;
                        }
                    },
                    {
                        text: "[TAVİZ VER] TRT ve Kültür Bakanlığı yönetimini seküler elitlerin temsilcilerine bırakın.",
                        consequenceText: "Sebataycı favor %50'ye yükselir, Medya desteği artar (+12%), Seküler onay artar (+15%), ama Muhafazakarlar rahatsız olur (-12%).",
                        action: (s) => {
                            s.regimeWatch.sebataycilar.favor = 50;
                            s.systems.media = Math.min(100, s.systems.media + 12);
                            s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                            s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 12);
                            return null;
                        }
                    }
                ]
            };
        }
    }
    
    const publicApp = state.powerCenters.public.approval;
    const militaryApp = state.powerCenters.military.approval;
    const militaryAnger = state.powerCenters.military.anger;
    const securityApp = state.powerCenters.security.approval;
    const securityInf = state.powerCenters.security.influence;
    const judiciaryApp = state.powerCenters.judiciary.approval;
    const mediaApp = state.powerCenters.media.approval;
    const pc = state.politicalCapital;
    const turn = state.turn;
    const stability = state.stability;

    // 1. DARBE GİRİŞİMİ (COUP ATTEMPT) - HIGHEST DANGER
    if ((stability < 40 && militaryAnger > 70 && publicApp < 35 && judiciaryApp < 35) || (militaryApp < 30 && publicApp < 30 && mediaApp < 30)) {
        return {
            id: "coup_attempt",
            title: "ASKERİ HAREKETLİLİK TESPİT EDİLDİ",
            desc: "Son dönemdeki kaos, halk desteğinin çöküşü ve yargıyla yaşanan anayasal krizler üzerine, ordu içindeki darbeci cunta tankları sokağa indirerek yönetime el koymaya kalkıştı. Köprüler tutuluyor, devlet televizyonu kuşatıldı. Demokrasi ve rejim ölüm-kalım savaşında!",
            choices: [
                {
                    text: "Halkı sokağa ve tankların önüne çağır.",
                    consequenceText: "Halk desteği oranına (%"+publicApp+") bağlı olarak cuntanın püskürtülme ihtimali vardır. Başarısızlık darbeyle sonuçlanır.",
                    action: (state) => {
                        const roll = Math.random() * 100;
                        const successChance = publicApp * 1.25;
                        if (roll <= successChance) {
                            return {
                                id: "coup_failed_public",
                                title: "DARBE GİRİŞİMİ HALK GÜCÜYLE BASTIRILDI!",
                                desc: "Çağrınız üzerine sokaklara dökülen yüz binlerce vatandaş tankların önüne dikildi ve darbecileri teslim olmaya zorladı. Cunta dağıtıldı. Demokrasi kazandı, ancak ülke sarsıldı.",
                                choices: [{
                                    text: "Devam Et",
                                    consequenceText: "Ordu tasfiye edilir, halk desteği artar.",
                                    action: (state) => {
                                        state.stability = Math.min(100, state.stability + 30);
                                        state.politicalCapital = Math.min(200, state.politicalCapital + 30);
                                        state.powerCenters.military.approval = Math.max(5, state.powerCenters.military.approval - 35);
                                        state.powerCenters.military.influence = Math.max(5, state.powerCenters.military.influence - 10);
                                        state.powerCenters.military.anger = 0;
                                        state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 15);
                                        state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 20);
                                        return null;
                                    }
                                }]
                            };
                        } else {
                            return {
                                id: "coup_success_screen",
                                title: "DARBE BAŞARILI OLDU",
                                desc: "Halkın katılımı yetersiz kaldı. Güvenini yitirdiğiniz halk tankların önüne çıkmadı ve cuntacı birlikler saray ile başbakanlığı ele geçirdi.",
                                choices: [{
                                    text: "Simülasyon Sonlandı",
                                    consequenceText: "Askeri diktatörlük yönetimi ele geçirdi.",
                                    action: (state) => {
                                        triggerGameOver("coup_success");
                                        return null;
                                    }
                                }]
                            };
                        }
                    }
                },
                {
                    text: "Emniyet güçlerini ve MİT'i darbecilere karşı harekete geçir.",
                    consequenceText: "Güvenlik Bürokrasisi onayı (%"+securityApp+") oranına bağlı olarak cuntanın bastırılma ihtimali vardır. Başarısızlık darbeyle sonuçlanır.",
                    action: (state) => {
                        const roll = Math.random() * 100;
                        const successChance = securityApp * 1.3;
                        if (roll <= successChance) {
                            return {
                                id: "coup_failed_security",
                                title: "EMNİYET CUNTAYI BASTIRDI",
                                desc: "Polis özel harekat ve MİT unsurlarının kararlı direnişiyle darbecilerin ana karargahı ele geçirildi, cunta liderleri tutuklandı. Ancak emniyet teşkilatının devlet üzerindeki nüfuzu tehlikeli biçimde arttı.",
                                choices: [{
                                    text: "Devam Et",
                                    consequenceText: "Güvenlik bürokrasisi güçlenir (Vesayet riski).",
                                    action: (state) => {
                                        state.stability = Math.min(100, state.stability + 25);
                                        state.politicalCapital = Math.min(200, state.politicalCapital + 15);
                                        state.powerCenters.military.approval = Math.max(5, state.powerCenters.military.approval - 30);
                                        state.powerCenters.military.influence = Math.max(5, state.powerCenters.military.influence - 10);
                                        state.powerCenters.military.anger = 0;
                                        state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 20);
                                        state.powerCenters.security.influence = Math.min(50, state.powerCenters.security.influence + 8);
                                        return null;
                                    }
                                }]
                            };
                        } else {
                            return {
                                id: "coup_success_screen",
                                title: "DARBE BAŞARILI OLDU",
                                desc: "Emniyet güçlerinin direnişi askeri zırhlı tugayların ağır ateşi altında kırıldı. Ankara ve İstanbul'da kontrolü alan cunta yönetimi devirdi.",
                                choices: [{
                                    text: "Simülasyon Sonlandı",
                                    consequenceText: "Askeri diktatörlük yönetimi ele geçirdi.",
                                    action: (state) => {
                                        triggerGameOver("coup_success");
                                        return null;
                                    }
                                }]
                            };
                        }
                    }
                },
                {
                    text: "Darbeci cunta generalleriyle müzakere etmeye çalış.",
                    consequenceText: "Siyasi Sermayenize (%"+pc+") bağlı olarak orduyu çekilmeye ikna etme ihtimali vardır. Başarısızlık darbeyle sonuçlanır.",
                    action: (state) => {
                        const roll = Math.random() * 100;
                        const successChance = pc * 0.7;
                        if (roll <= successChance) {
                            return {
                                id: "coup_negotiated",
                                title: "Pazarlıklar Sonucu Cunta Kışlaya Döndü",
                                desc: "Generallerle yapılan gergin pazarlıklar neticesinde, kabine revizyonu yapılması ve ordunun taleplerinin karşılanması sözüyle hareketlilik durduruldu. Ağır bir taviz verdiniz.",
                                choices: [{
                                    text: "Devam Et",
                                    consequenceText: "Ordu onay oranı artar, ancak Siyasi Sermaye ve Özgürlükler ağır darbe yer.",
                                    action: (state) => {
                                        state.stability = Math.min(100, state.stability + 15);
                                        state.politicalCapital = Math.max(5, state.politicalCapital - 60);
                                        state.systems.freedom = Math.max(5, state.systems.freedom - 20);
                                        state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 20);
                                        state.powerCenters.military.influence = Math.min(50, state.powerCenters.military.influence + 10);
                                        state.powerCenters.military.anger = 10;
                                        return null;
                                    }
                                }]
                            };
                        } else {
                            return {
                                id: "coup_success_screen",
                                title: "DARBE BAŞARILI OLDU",
                                desc: "Gücünü yitirmiş hükümetinizin müzakere teklifi cunta konseyi tarafından reddedildi. Tanklar sarayı basarak yönetime el koydu.",
                                choices: [{
                                    text: "Simülasyon Sonlandı",
                                    consequenceText: "Askeri diktatörlük yönetimi ele geçirdi.",
                                    action: (state) => {
                                        triggerGameOver("coup_success");
                                        return null;
                                    }
                                }]
                            };
                        }
                    }
                },
                {
                    text: "Olağanüstü Hal ilan edip yasal müdafaa hakkını kullan.",
                    consequenceText: "Yargı (%"+judiciaryApp+") ve Emniyet (%"+securityApp+") desteklerine bağlı olarak cuntanın durdurulma ihtimali vardır. Başarısızlık darbeyle sonuçlanır.",
                    action: (state) => {
                        const roll = Math.random() * 100;
                        const successChance = (securityApp + judiciaryApp) * 0.7;
                        if (roll <= successChance) {
                            return {
                                id: "coup_ohal_success",
                                title: "OHAL İLANIYLA CUNTA BLOKE EDİLDİ",
                                desc: "Anayasal yetkileri kullanarak savcıları ve emniyet birimlerini süratle organize ettiniz. Cuntanın haberleşme ve lojistik ağı yasal kararlarla kilitlendi, lider kadrosu gözaltına alındı.",
                                choices: [{
                                    text: "Devam Et",
                                    consequenceText: "Özgürlükler sert düşer, Yargı ve Emniyet onayları artar.",
                                    action: (state) => {
                                        state.stability = Math.min(100, state.stability + 20);
                                        state.systems.freedom = Math.max(5, state.systems.freedom - 25);
                                        state.powerCenters.military.approval = Math.max(5, state.powerCenters.military.approval - 25);
                                        state.powerCenters.military.anger = 0;
                                        state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 10);
                                        state.powerCenters.judiciary.approval = Math.min(100, state.powerCenters.judiciary.approval + 15);
                                        return null;
                                    }
                                }]
                            };
                        } else {
                            return {
                                id: "coup_success_screen",
                                title: "DARBE BAŞARILI OLDU",
                                desc: "Darbeciler anayasal kararları ve OHAL ilanınızı çiğnedi. Yargı binaları ele geçirildi ve hükümetiniz tutuklandı.",
                                choices: [{
                                    text: "Simülasyon Sonlandı",
                                    consequenceText: "Askeri diktatörlük yönetimi ele geçirdi.",
                                    action: (state) => {
                                        triggerGameOver("coup_success");
                                        return null;
                                    }
                                }]
                            };
                        }
                    }
                }
            ]
        };
    }

    // 2. ASKERİ MUHTIRA (MILITARY MEMORANDUM)
    if (militaryApp < 35 && securityApp < 40 && stability < 45) {
        return {
            id: "military_memorandum_crisis",
            title: "GENELKURMAY'DAN MUHTIRA BİLDİRİSİ",
            desc: "Ülkedeki asayiş krizleri, düşük istikrar ve orduyla yaşanan gerilimlerin ardından Genelkurmay Başkanlığı resmi web sitesinden sert bir bildiri yayınladı. Hükümete 'laiklik ve asayiş' uyarısı yapılıyor.",
            choices: [
                {
                    text: "Geri adım at ve ordunun güvenlik/bütçe taleplerini kabul et.",
                    consequenceText: "Ordu onay oranı artar (+15%), istikrar artar (+5%), ama Özgürlükler düşer (-12%).",
                    action: (state) => {
                        state.stability = Math.min(100, state.stability + 5);
                        state.systems.freedom = Math.max(0, state.systems.freedom - 12);
                        state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 15);
                        state.powerCenters.military.anger = Math.max(0, state.powerCenters.military.anger - 20);
                        return null;
                    }
                },
                {
                    text: "Muhtırayı görmezden gel ve bildiriye yanıt verme.",
                    consequenceText: "Ordu öfkesi artar (+15%), ordu onayı düşer (-10%), istikrar düşer (-10%).",
                    action: (state) => {
                        state.stability = Math.max(0, state.stability - 10);
                        state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 10);
                        state.powerCenters.military.anger = Math.min(100, state.powerCenters.military.anger + 15);
                        return null;
                    }
                },
                {
                    text: "Genelkurmay Başkanı'nı görevden alıp tasfiye başlat.",
                    consequenceText: "Ordu onayı sert düşer (-20%), ama Siyasi Sermaye artar (+15), Emniyet onayı artar (+10%).",
                    action: (state) => {
                        state.politicalCapital = Math.min(200, state.politicalCapital + 15);
                        state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 20);
                        state.powerCenters.military.anger = Math.min(100, state.powerCenters.military.anger + 10);
                        state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 10);
                        return null;
                    }
                },
                {
                    text: "Milli Güvenlik Kurulu'nu acil toplantıya çağırıp uzlaşma ara.",
                    consequenceText: "İstikrar artar (+6%), Siyasi Sermaye azalır (-10).",
                    action: (state) => {
                        state.stability = Math.min(100, state.stability + 6);
                        state.politicalCapital = Math.max(0, state.politicalCapital - 10);
                        state.powerCenters.military.anger = Math.max(0, state.powerCenters.military.anger - 10);
                        return null;
                    }
                }
            ]
        };
    }

    // 3. TOPLUMSAL PROTESTOLAR (PUBLIC PROTESTS)
    if (publicApp < 35 && state.voterGroups.youth.approval < 35 && state.voterGroups.students.approval < 35 && mediaApp < 35) {
        return {
            id: "public_protests_crisis",
            title: "ŞEHİR MEYDANLARINDA BÜYÜK PROTESTOLAR",
            desc: "Halk memnuniyetsizliği, gençlik kesimindeki mutsuzluk ve basındaki kısıtlama iddiaları neticesinde, meydanlarda yüz binlerce insan hükümetin istifası talebiyle gösterilere başladı.",
            choices: [
                {
                    text: "Polis müdahalesi emri ver ve meydanları zorla boşalt.",
                    consequenceText: "Asayiş artar (+8%), Özgürlükler sert düşer (-15%), Yargı onayı düşer (-12%), Halk onayı düşer (-10%). Maliyet: ₺1.0B.",
                    action: (state) => {
                        state.treasury -= 1000000000;
                        state.systems.security = Math.min(100, state.systems.security + 8);
                        state.systems.freedom = Math.max(0, state.systems.freedom - 15);
                        state.powerCenters.judiciary.approval = Math.max(0, state.powerCenters.judiciary.approval - 12);
                        state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 10);
                        return null;
                    }
                },
                {
                    text: "Göstericilerle diyalog kur ve öğrenci temsilcilerini kabul et.",
                    consequenceText: "Halk onayı artar (+10%), Özgürlük artar (+8%), ama Güvenlik Bürokrasisi onayı düşer (-10%).",
                    action: (state) => {
                        state.systems.freedom = Math.min(100, state.systems.freedom + 8);
                        state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                        state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 10);
                        return null;
                    }
                },
                {
                    text: "Taviz ver: İnternet yasaklarını kaldır ve burs bütçesini artır.",
                    consequenceText: "Medya ve Üniversite onayı artar (+15%), Özgürlük artar (+10%), Bütçe azalır (-₺2.5B).",
                    action: (state) => {
                        state.treasury -= 2500000000;
                        state.systems.freedom = Math.min(100, state.systems.freedom + 10);
                        state.powerCenters.media.approval = Math.min(100, state.powerCenters.media.approval + 15);
                        state.powerCenters.academia.approval = Math.min(100, state.powerCenters.academia.approval + 15);
                        return null;
                    }
                },
                {
                    text: "Erken seçim ihtimaline yönelik referandum teklif et.",
                    consequenceText: "İstikrar artar (+12%), Siyasi Sermaye azalır (-20).",
                    action: (state) => {
                        state.stability = Math.min(100, state.stability + 12);
                        state.politicalCapital = Math.max(0, state.politicalCapital - 20);
                        return null;
                    }
                }
            ]
        };
    }

    // 4. BÜROKRATİK VESAYET (BUREAUCRATIC TUTELAGE)
    if (securityInf > 30 && pc < 50) {
        return {
            id: "bureaucratic_vesayet_crisis",
            title: "DEVLET İÇİNDE DEVLET (BÜROKRATİK VESAYET)",
            desc: "Güvenlik bürokrasisinin hükümetin zayıflığından faydalanarak bakanlık talimatlarını uygulamadığı ve kendi iç şebekelerince paralel bir vesayet odağı oluşturduğu tespit edildi.",
            choices: [
                {
                    text: "İçişleri Bakanlığı'nda derin bir idari soruşturma başlat.",
                    consequenceText: "Güvenlik bürokrasisi onayı düşer (-12%), Yolsuzluk azalır (-8%), Siyasi Sermaye artar (+5).",
                    action: (state) => {
                        state.systems.corruption = Math.max(0, state.systems.corruption - 8);
                        state.politicalCapital = Math.min(200, state.politicalCapital + 5);
                        state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 12);
                        return null;
                    }
                },
                {
                    text: "Emniyet müdürlüklerinde ve istihbaratta sert tasfiye başlat.",
                    consequenceText: "Güvenlik bürokrasisi onayı sert düşer (-20%), ama istikrar artar (+5%), Özgürlük artar (+5%).",
                    action: (state) => {
                        state.stability = Math.min(100, state.stability + 5);
                        state.systems.freedom = Math.min(100, state.systems.freedom + 5);
                        state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 20);
                        state.powerCenters.security.influence = Math.max(10, state.powerCenters.security.influence - 5);
                        return null;
                    }
                },
                {
                    text: "Dengeleri bozmamak adına vesayet iddialarını görmezden gel.",
                    consequenceText: "Güvenlik bürokrasisi onayı artar (+10%), ama Yolsuzluk artar (+8%), Siyasi Sermaye azalır (-12).",
                    action: (state) => {
                        state.systems.corruption = Math.min(100, state.systems.corruption + 8);
                        state.politicalCapital = Math.max(0, state.politicalCapital - 12);
                        state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 10);
                        return null;
                    }
                }
            ]
        };
    }

    // 5. MEDYA OPERASYONU (MEDIA SMEAR CAMPAIGN)
    if (mediaApp < 35) {
        const subEvents = [
            {
                subId: "leaked_tape_crisis",
                title: "SIZDIRILAN SES KAYDI SKANDALI",
                desc: "Hükümet karşıtı medya organları, Ulaştırma Bakanı'nın büyük bir demiryolu ihalesini rüşvet karşılığı devrettiğini gösteren şok edici bir ses kaydını internete sızdırdı. Sosyal medya çalkalanıyor."
            },
            {
                subId: "corruption_dossier_crisis",
                title: "BÜYÜK YOLSUZLUK VERGİ SIFIRLAMA İDDİASI",
                desc: "Gazeteler, hükümete yakın iki dev müteahhitlik şirketinin milyarlarca liralık vergi borçlarının sessiz sedasız silindiğini doğrulayan resmi belgeleri yayınladı. Kamuoyunda infial var."
            },
            {
                subId: "secret_meeting_crisis",
                title: "GİZLİ TOPLANTI VE LOBİ GÖRÜNTÜLERİ",
                desc: "Araştırmacı muhalif gazeteciler, bazı kabine üyelerinin lüks bir otelde yabancı finans spekülatörleriyle yaptığı gizli pazarlıkların gizli kamera görüntülerini kamuoyuna sundu."
            }
        ];
        
        const idx = (turn) % subEvents.length;
        const selectedSub = subEvents[idx];

        return {
            id: selectedSub.subId,
            title: selectedSub.title,
            desc: selectedSub.desc,
            choices: [
                {
                    text: "İddiaları tamamen yalanla, kasetlerin montaj/deepfake olduğunu savun.",
                    consequenceText: "Halk onayı düşer (-5%), Medya onayı düşer (-8%), Siyasi Sermaye artar (+10).",
                    action: (state) => {
                        state.politicalCapital = Math.min(200, state.politicalCapital + 10);
                        state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 5);
                        state.powerCenters.media.approval = Math.max(0, state.powerCenters.media.approval - 8);
                        return null;
                    }
                },
                {
                    text: "Savcılara talimat verip iddialar hakkında soruşturma açtır.",
                    consequenceText: "Yargı onayı artar (+12%), Yolsuzluk azalır (-10%), ama istikrar düşer (-5%).",
                    action: (state) => {
                        state.systems.corruption = Math.max(0, state.systems.corruption - 10);
                        state.stability = Math.max(0, state.stability - 5);
                        state.powerCenters.judiciary.approval = Math.min(100, state.powerCenters.judiciary.approval + 12);
                        return null;
                    }
                },
                {
                    text: "İddiaları kısmen kabul edip adı geçen bakanı görevden al.",
                    consequenceText: "Yolsuzluk azalır (-8%), Halk onayı artar (+8%), ama Siyasi Sermaye sert düşer (-15).",
                    action: (state) => {
                        state.systems.corruption = Math.max(0, state.systems.corruption - 8);
                        state.politicalCapital = Math.max(0, state.politicalCapital - 15);
                        state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 8);
                        return null;
                    }
                },
                {
                    text: "Sızıntıları engellemek için troll ağlarıyla karşı medya kampanyası başlat.",
                    consequenceText: "Hazine maliyeti (-₺1.5B), Medya kontrolü artar (+10%), ama Özgürlük düşer (-8%).",
                    action: (state) => {
                        state.treasury -= 1500000000;
                        state.systems.media = Math.min(100, state.systems.media + 10);
                        state.systems.freedom = Math.max(0, state.systems.freedom - 8);
                        return null;
                    }
                }
            ]
        };
    }

    // 6. PARTİ İÇİ İSYAN (PARTY REBELLION)
    if (publicApp < 35 && turn >= 10) {
        return {
            id: "party_rebellion_crisis",
            title: "PARTİ İÇİNDE MUHALEFET VE BAŞKALDIRI",
            desc: "Kamuoyu desteğindeki erime ve yaklaşan seçimlerin getirdiği kaygısıyla, parti içindeki bazı kıdemli milletvekilleri liderliğinizi eleştiren bir bildiri yayınladı.",
            choices: [
                {
                    text: "Güven tazelemek üzere partiyi olağanüstü kongreye götür.",
                    consequenceText: "Siyasi Sermaye düşer (-25), ama istikrar artar (+10%), Halk onayı artar (+6%).",
                    action: (state) => {
                        state.stability = Math.min(100, state.stability + 10);
                        state.politicalCapital = Math.max(0, state.politicalCapital - 25);
                        state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 6);
                        return null;
                    }
                },
                {
                    text: "Muhalif liderleri partiden ihraç et ve disiplin soruşturması aç.",
                    consequenceText: "Siyasi Sermaye artar (+15), ama istikrar düşer (-10%), Halk onayı düşer (-8%).",
                    action: (state) => {
                        state.politicalCapital = Math.min(200, state.politicalCapital + 15);
                        state.stability = Math.max(0, state.stability - 10);
                        state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 8);
                        return null;
                    }
                },
                {
                    text: "İsyancı milletvekillerine kabine revizyonunda yer ver.",
                    consequenceText: "Siyasi Sermaye düşer (-12), ama istikrar artar (+8%).",
                    action: (state) => {
                        state.politicalCapital = Math.max(0, state.politicalCapital - 12);
                        state.stability = Math.min(100, state.stability + 8);
                        return null;
                    }
                }
            ]
        };
    }

    return null;
}

// ==========================================
// RARE EMERGENCY EVENTS DATABASE (ACİL DURUM)
// ==========================================

const emergencyEvents = [
    {
        id: "great_earthquake",
        title: "BÜYÜK DEPREM FELAKETİ",
        desc: "Marmara denizi açıklarında gerçekleşen 7.4 büyüklüğündeki deprem İstanbul ve çevre illerde büyük can ve mal kaybına yol açtı. Arama kurtarma çalışmaları ve lojistik koordinasyon alarm durumunda.",
        choices: [
            {
                text: "Tüm bütçeyi deprem bölgesine aktar ve dış yardım çağrısı yap.",
                consequenceText: "Hazine maliyeti (-₺8.0B), İstikrar artar (+10%), Halk onayı artar (+15%), Ordu ve İş dünyası onayı düşer (-5%).",
                action: (state) => {
                    state.treasury -= 8000000000;
                    state.stability = Math.min(100, state.stability + 10);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 15);
                    state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 5);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 5);
                    return null;
                }
            },
            {
                text: "Milli Dayanışma Vergisi çıkar ve yerel müteahhitleri seferber et.",
                consequenceText: "Hazine maliyeti (-₺3.0B), İş dünyası onayı düşer (-15%), Halk onayı düşer (-10%), İstikrar artar (+5%).",
                action: (state) => {
                    state.treasury -= 3000000000;
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 15);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 10);
                    return null;
                }
            },
            {
                text: "Afet koordinasyonu için orduyu sahaya sür ve etkilenen illerde OHAL ilan et.",
                consequenceText: "Güvenlik onayı artar (+15%), Ordu onayı artar (+10%), İstikrar artar (+5%), ama Özgürlükler sert düşer (-15%), Akademi ve Medya onayı düşer (-10%).",
                action: (state) => {
                    state.stability = Math.min(100, state.stability + 5);
                    state.systems.freedom = Math.max(0, state.systems.freedom - 15);
                    state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 15);
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 10);
                    state.powerCenters.media.approval = Math.max(0, state.powerCenters.media.approval - 10);
                    state.powerCenters.academia.approval = Math.max(0, state.powerCenters.academia.approval - 10);
                    return null;
                }
            }
        ]
    },
    {
        id: "banking_system_crisis",
        title: "BANKACILIK SEKTÖRÜ KRİZİ",
        desc: "Ülkenin en büyük özel bankalarından birinin likidite krizine girmesiyle mevduat sahipleri şubelere hücum etti. Finansal sistem çöküşün eşiğinde.",
        choices: [
            {
                text: "Bankayı kamulaştır ve tüm mevduatlara devlet güvencesi ver.",
                consequenceText: "Hazine maliyeti (-₺6.0B), İş dünyası onayı artar (+15%), İstikrar artar (+8%), Ekonomi yavaşlar (-5%).",
                action: (state) => {
                    state.treasury -= 6000000000;
                    state.stability = Math.min(100, state.stability + 8);
                    state.systems.economy = Math.max(0, state.systems.economy - 5);
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 15);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 5);
                    return null;
                }
            },
            {
                text: "Merkez Bankası üzerinden faizleri artırıp likidite desteği sağla.",
                consequenceText: "Enflasyon artar (+10%), İş dünyası onayı artar (+5%), Halk onayı düşer (-10%).",
                action: (state) => {
                    state.systems.inflation = Math.min(100, state.systems.inflation + 10);
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 5);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 10);
                    return null;
                }
            },
            {
                text: "Bankanın batmasına izin ver ve mudileri koruma kapsamı dışına al.",
                consequenceText: "Ekonomi daralır (-12%), İş dünyası onayı düşer (-20%), Halk onayı düşer (-25%), İstikrar sert düşer (-15%).",
                action: (state) => {
                    state.systems.economy = Math.max(0, state.systems.economy - 12);
                    state.stability = Math.max(0, state.stability - 15);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 20);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 25);
                    return null;
                }
            }
        ]
    },
    {
        id: "terror_wave_crisis",
        title: "EŞ ZAMANLI TERÖR DALGASI",
        desc: "Büyükşehirlerde metro istasyonları ve meydanlarda koordineli terör saldırıları düzenlendi. Kamuoyunda yoğun bir korku ve panik havası hakim.",
        choices: [
            {
                text: "Güvenlik tedbirlerini en üst düzeye çıkar ve sokağa çıkma yasakları uygula.",
                consequenceText: "Asayiş artar (+15%), İstikrar artar (+5%), ama Özgürlükler sert düşer (-15%), Halk onayı düşer (-5%).",
                action: (state) => {
                    state.systems.security = Math.min(100, state.systems.security + 15);
                    state.stability = Math.min(100, state.stability + 5);
                    state.systems.freedom = Math.max(0, state.systems.freedom - 15);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 5);
                    return null;
                }
            },
            {
                text: "Kapsamlı terör operasyonları ve sınır ötesi askeri harekat başlat.",
                consequenceText: "Hazine maliyeti (-₺2.5B), Ordu onayı artar (+15%), Güvenlik onayı artar (+10%), Halk onayı artar (+5%).",
                action: (state) => {
                    state.treasury -= 2500000000;
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 15);
                    state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 10);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 5);
                    return null;
                }
            },
            {
                text: "İstihbarat zafiyetini kabul et ve İçişleri Bakanı'nı görevden al.",
                consequenceText: "Siyasi Sermaye düşer (-15), İstikrar artar (+5%), Güvenlik onayı düşer (-10%), Halk onayı artar (+10%).",
                action: (state) => {
                    state.politicalCapital = Math.max(0, state.politicalCapital - 15);
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 10);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                    return null;
                }
            }
        ]
    },
    {
        id: "border_crisis_event",
        title: "SINIRDA ASKERİ ÇATIŞMA KRİZİ",
        desc: "Sınır komşumuzda alevlenen çatışmalardan seken top mermileri sınır karakollarımıza isabet etti, can kayıpları bildiriliyor. Sınır hattı sıcak çatışma altında.",
        choices: [
            {
                text: "Misliyle karşılık ver ve güvenlik tampon bölgesi oluşturmak için askeri operasyon başlat.",
                consequenceText: "Hazine maliyeti (-₺3.0B), Ordu onayı artar (+20%), Güvenlik onayı artar (+10%), İstikrar artar (+5%).",
                action: (state) => {
                    state.treasury -= 3000000000;
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 20);
                    state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 10);
                    return null;
                }
            },
            {
                text: "NATO ve BM'yi acil toplantıya çağır, diplomatik müzakere başlat.",
                consequenceText: "Siyasi Sermaye artar (+15), İstikrar artar (+5%), ama Ordu onayı düşer (-10%).",
                action: (state) => {
                    state.politicalCapital = Math.min(200, state.politicalCapital + 15);
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 10);
                    return null;
                }
            },
            {
                text: "Sınır bölgelerini tahliye et ve savunma pozisyonuna çekil.",
                consequenceText: "İstikrar düşer (-10%), Ordu onayı sert düşer (-15%), Güvenlik onayı düşer (-12%).",
                action: (state) => {
                    state.stability = Math.max(0, state.stability - 10);
                    state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 15);
                    state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 12);
                    return null;
                }
            }
        ]
    },
    {
        id: "refugee_wave_crisis",
        title: "SINIRA DAYANAN YENİ MÜLTECİ AKINI",
        desc: "Sınır komşumuzdaki şiddet olayları nedeniyle yüz binlerce mülteci sınır kapılarına yığıldı. Batılı ülkeler kapıları açmamız için baskı yapıyor.",
        choices: [
            {
                text: "Kapıları aç, insani koridor oluştur ve AB'den mali yardım talep et.",
                consequenceText: "Hazineye fon girişi (+₺1.5B), Halk onayı düşer (-15%), Ordu ve Güvenlik onayı düşer (-10%), Özgürlük artar (+5%).",
                action: (state) => {
                    state.treasury += 1500000000;
                    state.systems.freedom = Math.min(100, state.systems.freedom + 5);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 15);
                    state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 10);
                    state.powerCenters.security.approval = Math.max(0, state.powerCenters.security.approval - 10);
                    return null;
                }
            },
            {
                text: "Sınır kapılarını tamamen kapat ve askeri güç kullanarak geçişleri engelle.",
                consequenceText: "Güvenlik onayı artar (+15%), Ordu onayı artar (+10%), Halk onayı artar (+10%), ama Özgürlük düşer (-10%), Akademi onayı düşer (-10%).",
                action: (state) => {
                    state.systems.freedom = Math.max(0, state.systems.freedom - 10);
                    state.powerCenters.security.approval = Math.min(100, state.powerCenters.security.approval + 15);
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 10);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                    state.powerCenters.academia.approval = Math.max(0, state.powerCenters.academia.approval - 10);
                    return null;
                }
            },
            {
                text: "Mültecileri sınırda kurulan tampon çadır kentlerde tut ve üçüncü ülkelere sevk et.",
                consequenceText: "Hazine maliyeti (-₺1.5B), İstikrar artar (+5%), Halk onayı artar (+5%).",
                action: (state) => {
                    state.treasury -= 1500000000;
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 5);
                    return null;
                }
            }
        ]
    },
    {
        id: "massive_corruption_scandal",
        title: "HÜKÜMETTE BÜYÜK YOLSUZLUK SKANDALI",
        desc: "İnternete sızan belgelerde, bazı bakan çocuklarının ve iktidara yakın iş adamlarının dahil olduğu milyarlarca dolarlık bir rüşvet ve kara para aklama ağı ifşa oldu.",
        choices: [
            {
                text: "Bağımsız savcıları göreve çağır ve kabinedeki şüpheli bakanları ihraç et.",
                consequenceText: "Yolsuzluk endeksi azalır (-15%), İstikrar artar (+8%), Yargı onayı artar (+15%), Halk onayı artar (+10%), ama İş dünyası onayı düşer (-5%).",
                action: (state) => {
                    state.systems.corruption = Math.max(0, state.systems.corruption - 15);
                    state.stability = Math.min(100, state.stability + 8);
                    state.powerCenters.judiciary.approval = Math.min(100, state.powerCenters.judiciary.approval + 15);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 5);
                    return null;
                }
            },
            {
                text: "Dosyaya karartma getirt, haberlere sansür koy ve savcıları görevden al.",
                consequenceText: "Özgürlükler düşer (-15%), Medya onayı düşer (-20%), Yargı onayı düşer (-20%), Yolsuzluk artar (+10%), İstikrar düşer (-8%).",
                action: (state) => {
                    state.systems.freedom = Math.max(0, state.systems.freedom - 15);
                    state.systems.corruption = Math.min(100, state.systems.corruption + 10);
                    state.stability = Math.max(0, state.stability - 8);
                    state.powerCenters.media.approval = Math.max(0, state.powerCenters.media.approval - 20);
                    state.powerCenters.judiciary.approval = Math.max(0, state.powerCenters.judiciary.approval - 20);
                    return null;
                }
            },
            {
                text: "İddiaları 'dış güçlerin komplosu' olarak niteleyip reddet.",
                consequenceText: "Siyasi Sermaye artar (+10), İstikrar düşer (-5%), Yolsuzluk artar (+5%).",
                action: (state) => {
                    state.politicalCapital = Math.min(200, state.politicalCapital + 10);
                    state.stability = Math.max(0, state.stability - 5);
                    state.systems.corruption = Math.min(100, state.systems.corruption + 5);
                    return null;
                }
            }
        ]
    },
    {
        id: "energy_crisis_event",
        title: "ULUSLARARASI ENERJİ KRİZİ VE KESİNTİLER",
        desc: "Gaz boru hatlarında yaşanan arızalar ve uluslararası ambargolar sebebiyle elektrik üretiminde kriz yaşanıyor. Sanayide zorunlu kısıntılar gündemde.",
        choices: [
            {
                text: "Sanayi bölgelerinde elektrik kısıntısına git, konutları koru.",
                consequenceText: "Ekonomi daralır (-10%), İş dünyası onayı düşer (-15%), Halk onayı artar (+5%).",
                action: (state) => {
                    state.systems.economy = Math.max(0, state.systems.economy - 10);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 15);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 5);
                    return null;
                }
            },
            {
                text: "Elektrik ve doğalgaz fiyatlarına %50 zam yaparak bütçeyi dengele.",
                consequenceText: "Hazine geliri artar (+2.0B), Enflasyon fırlar (+15%), Halk onayı sert düşer (-20%), İş dünyası onayı düşer (-5%).",
                action: (state) => {
                    state.treasury += 2000000000;
                    state.systems.inflation = Math.min(100, state.systems.inflation + 15);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 20);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 5);
                    return null;
                }
            },
            {
                text: "Kömür ve termik santrallerini tam kapasitye alıp çevresel sınırları askıya al.",
                consequenceText: "Ekonomi artar (+5%), İş dünyası onayı artar (+5%), Çevre kirliliği artar (Halk onayı düşer -5%).",
                action: (state) => {
                    state.systems.economy = Math.min(100, state.systems.economy + 5);
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 5);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 5);
                    return null;
                }
            }
        ]
    },
    {
        id: "pandemic_crisis",
        title: "YENİ SALGIN HASTALIK (PANDEMİ) DALGASI",
        desc: "Yeni bir solunum yolu virüsü tüm ülkeye hızla yayılıyor. Hastaneler doluluk sınırına ulaştı, karantina önlemleri tartışılıyor.",
        choices: [
            {
                text: "3 hafta tam kapanma ilan et ve küçük esnafa destek sağla.",
                consequenceText: "Hazine maliyeti (-₺4.0B), Ekonomi yavaşlar (-8%), Asayiş artar (+10%), Halk onayı artar (+10%), İş dünyası onayı düşer (-10%).",
                action: (state) => {
                    state.treasury -= 4000000000;
                    state.systems.economy = Math.max(0, state.systems.economy - 8);
                    state.systems.security = Math.min(100, state.systems.security + 10);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 10);
                    return null;
                }
            },
            {
                text: "Kapanma yapmadan sadece aşı ve maske zorunluluğu ile devam et.",
                consequenceText: "Ekonomi etkilenmez (-2%), Halk onayı düşer (-5%), İş dünyası onayı artar (+10%), İstikrar düşer (-5%).",
                action: (state) => {
                    state.systems.economy = Math.max(0, state.systems.economy - 2);
                    state.stability = Math.max(0, state.stability - 5);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 5);
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 10);
                    return null;
                }
            },
            {
                text: "Sağlık sisteminin yükünü azaltmak için özel hastanelere tam teşvik ver.",
                consequenceText: "Hazine maliyeti (-₺1.5B), İş dünyası onayı artar (+10%), Halk onayı düşer (-15%).",
                action: (state) => {
                    state.treasury -= 1500000000;
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 10);
                    state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 15);
                    return null;
                }
            }
        ]
    },
    {
        id: "intl_sanctions_crisis",
        title: "ULUSLARARASI EKONOMİK YAPTIRIMLAR",
        desc: "Dış politikada attığımız bağımsız adımlara misilleme olarak Batılı müttefikler ve BM ülkemize geniş kapsamlı yaptırımlar uygulama kararı aldı.",
        choices: [
            {
                text: "Diplomatik kanallarla geri adım at ve uzlaşma anlaşmaları yap.",
                consequenceText: "Siyasi Sermaye düşer (-15), Ordu onayı düşer (-12%), İstikrar artar (+5%), İş dünyası onayı artar (+10%).",
                action: (state) => {
                    state.politicalCapital = Math.max(0, state.politicalCapital - 15);
                    state.stability = Math.min(100, state.stability + 5);
                    state.powerCenters.military.approval = Math.max(0, state.powerCenters.military.approval - 12);
                    state.powerCenters.business.approval = Math.min(100, state.powerCenters.business.approval + 10);
                    return null;
                }
            },
            {
                text: "Yaptırımlara sert misilleme kararı al ve yerli üretime ağırlık ver.",
                consequenceText: "Ekonomi daralır (-8%), İş dünyası onayı düşer (-10%), Ordu onayı artar (+15%), Halk onayı artar (+10%).",
                action: (state) => {
                    state.systems.economy = Math.max(0, state.systems.economy - 8);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 10);
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 15);
                    state.powerCenters.public.approval = Math.min(100, state.powerCenters.public.approval + 10);
                    return null;
                }
            },
            {
                text: "Alternatif pazarlar bulmak için Doğu bloku ile ticaret anlaşmaları yap.",
                consequenceText: "Siyasi Sermaye artar (+10), Ordu onayı artar (+10%), İş dünyası onayı düşer (-5%), İstikrar düşer (-5%).",
                action: (state) => {
                    state.politicalCapital = Math.min(200, state.politicalCapital + 10);
                    state.stability = Math.max(0, state.stability - 5);
                    state.powerCenters.military.approval = Math.min(100, state.powerCenters.military.approval + 10);
                    state.powerCenters.business.approval = Math.max(0, state.powerCenters.business.approval - 5);
                    return null;
                }
            }
        ]
    }
];

function triggerEmergencyEvent(state) {
    if (!state.triggeredEvents) state.triggeredEvents = [];
    
    let available = emergencyEvents.filter(ev => !state.triggeredEvents.includes(ev.id));
    if (available.length === 0) {
        available = emergencyEvents;
    }
    const idx = Math.floor(Math.random() * available.length);
    return available[idx];
}

// ==========================================
// VOTER ALLIANCE CRISIS EVENTS
// ==========================================
function generateVoterAllianceCrisis(alliance, state) {
    const crisisMap = {
        emek_cephesi: {
            id: "emek_cephesi_crisis",
            title: "EMEK CEPHESİ: GENEL GREV VE FABRİKA İŞGALLERİ",
            desc: "İşçi sendikaları, sol örgütler ve öğrenci birlikleri koordineli bir 'Emek Cephesi' kurarak tüm ülkede genel grev ilan etti! Fabrikalar işgal ediliyor, üniversiteler boykotta, lojistik felç oldu. Talepleri: asgari ücretin 3 katına çıkarılması, sendikal haklar ve ücretsiz eğitim!",
            choices: [
                {
                    text: "[BASTIR] Grevci fabrikalara polis operasyonu düzenle, sendika liderlerini gözaltına al.",
                    consequenceText: "Güvenlik artar (+12%), İşçi desteği çöker (-30%), Öğrenci desteği düşer (-20%), Özgürlük geriler (-15%), İş Dünyası memnun (+15%). Maliyet: ₺1.5B.",
                    action: (s) => {
                        s.treasury -= 1500000000;
                        s.systems.security = Math.min(100, s.systems.security + 12);
                        s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                        s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 30);
                        s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 20);
                        s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 15);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "emek_cephesi");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Greve müdahale etme, ekonomik çöküşü göze al.",
                    consequenceText: "Ekonomi çöker (-15%), İstikrar sert düşer (-20%), Hazine erir (-₺4B). İşçi memnuniyeti hafif yükselir (+5%).",
                    action: (s) => {
                        s.systems.economy = Math.max(0, s.systems.economy - 15);
                        s.stability = Math.max(0, s.stability - 20);
                        s.treasury -= 4000000000;
                        s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 5);
                        const a = s.voterAlliances.find(x => x.id === "emek_cephesi");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Talepleri kabul et: asgari ücret zammı, ücretsiz eğitim. İdeolojini 'Merkez Sol' yap.",
                    consequenceText: "İdeolojiyi Merkez Sol'a kaydır. İşçiler (+35%), Öğrenciler (+25%), Solcular (+30%) memnun. İş Dünyası (-25%), Enflasyon patlar (+15%). Maliyet: ₺6B.",
                    action: (s) => {
                        s.ideology = "center_left";
                        s.treasury -= 6000000000;
                        s.systems.inflation = Math.min(100, s.systems.inflation + 15);
                        s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 35);
                        s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 25);
                        s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 30);
                        s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 25);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "emek_cephesi");
                        return null;
                    }
                }
            ]
        },
        milliyetci_blok: {
            id: "milliyetci_blok_crisis",
            title: "MİLLİYETÇİ BLOK: BÜYÜK MİTİNG VE ÜLTIMATOM",
            desc: "Milliyetçi cepheler, muhafazakar dernekler ve çiftçi sendikaları 'Milliyetçi Blok' adıyla birleşerek başkent Ankara'da milyonluk bir miting düzenledi! Talepleri: sınırların kapatılması, tüm göçmenlerin sınır dışı edilmesi, milli eğitim müfredatının milliyetçi çizgiye çekilmesi ve kabinede köklü revizyon!",
            choices: [
                {
                    text: "[BASTIR] Mitingleri yasakla, milliyetçi dernekleri kapat ve liderlerini gözaltına al.",
                    consequenceText: "Milliyetçi desteği çöker (-35%), Muhafazakar desteği düşer (-20%), Özgürlük geriler (-12%), Güvenlik artar (+10%). Ordu rahatsız (-10%).",
                    action: (s) => {
                        s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                        s.systems.security = Math.min(100, s.systems.security + 10);
                        s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 35);
                        s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 20);
                        s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 10);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "milliyetci_blok");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Mitinglere müdahale etme, talepler karşılanmadan dağılmalarını bekle.",
                    consequenceText: "İstikrar sert düşer (-18%), Halk desteği düşer (-10%). Milliyetçi öfke sürer. Ordu huzursuzlanır (-8%).",
                    action: (s) => {
                        s.stability = Math.max(0, s.stability - 18);
                        s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 10);
                        s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 8);
                        const a = s.voterAlliances.find(x => x.id === "milliyetci_blok");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Talepleri kabul et: göçmen politikasını sertleştir, sınırları kapat. İdeolojini 'Milliyetçi' yap.",
                    consequenceText: "İdeolojiyi Milliyetçi'ye kaydır. Milliyetçiler (+35%), Muhafazakarlar (+20%), Çiftçiler (+15%) memnun. Kürtler (-25%), Göçmenler (-40%), Solcular (-20%).",
                    action: (s) => {
                        s.ideology = "nationalist";
                        s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 35);
                        s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 20);
                        s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 15);
                        s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 25);
                        s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 40);
                        s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 20);
                        s.activePolicies.border_control = 80;
                        s.activePolicies.migrant_repatriation = 60;
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "milliyetci_blok");
                        return null;
                    }
                }
            ]
        },
        liberal_muhalefet: {
            id: "liberal_muhalefet_crisis",
            title: "LİBERAL MUHALEFET: SERMAYE KAÇIŞI VE MEDYA BOMBARDIMANI",
            desc: "İş dünyası, liberal entelektüeller ve seküler medya güçleri 'Liberal Muhalefet Cephesi' kurarak koordineli bir saldırı başlattı! TÜSİAD döviz stoklama çağrısı yaptı, medya 7/24 hükümet karşıtı yayın yapıyor, yabancı yatırımcılar çekilme kararı aldı. Lira serbest düşüşte!",
            choices: [
                {
                    text: "[BASTIR] Medya kuruluşlarına kapatma, iş adamlarına vergi soruşturması, dövize müdahale.",
                    consequenceText: "Medya kontrolü artar (+15%), ama Ekonomi daralır (-10%), Özgürlük çöker (-18%), İş Dünyası (-30%), Liberaller (-25%). Maliyet: ₺3B.",
                    action: (s) => {
                        s.treasury -= 3000000000;
                        s.systems.media = Math.min(100, s.systems.media + 15);
                        s.systems.economy = Math.max(0, s.systems.economy - 10);
                        s.systems.freedom = Math.max(0, s.systems.freedom - 18);
                        s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 30);
                        s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 25);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "liberal_muhalefet");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Piyasanın kendi dengesini bulmasını bekle.",
                    consequenceText: "Ekonomi çöker (-12%), Enflasyon patlar (+12%), İstikrar sert düşer (-15%), Hazine erir (-₺5B).",
                    action: (s) => {
                        s.systems.economy = Math.max(0, s.systems.economy - 12);
                        s.systems.inflation = Math.min(100, s.systems.inflation + 12);
                        s.stability = Math.max(0, s.stability - 15);
                        s.treasury -= 5000000000;
                        const a = s.voterAlliances.find(x => x.id === "liberal_muhalefet");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Talepleri kabul et: vergi indirimi, özelleştirme paketi. İdeolojini 'Liberal' yap.",
                    consequenceText: "İdeolojiyi Liberal'e kaydır. İş Dünyası (+30%), Liberaller (+25%), Sekülerler (+15%) memnun. İşçiler (-20%), Solcular (-25%). Hazineye özelleştirme geliri (+₺4B).",
                    action: (s) => {
                        s.ideology = "liberal";
                        s.treasury += 4000000000;
                        s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 30);
                        s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 25);
                        s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                        s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                        s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 25);
                        s.activePolicies.corporate_tax = 10;
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "liberal_muhalefet");
                        return null;
                    }
                }
            ]
        },
        etnik_direnis: {
            id: "etnik_direnis_crisis",
            title: "ETNİK DİRENİŞ: BÖLGESEL İSYAN VE SİVİL İTAATSİZLİK",
            desc: "Kürt siyasi hareketi, göçmen dernekleri ve sol örgütler 'Etnik Direniş Hareketi' adı altında Güneydoğu'da sivil itaatsizlik kampanyası başlattı! Belediyeler vergi toplamayı reddediyor, yollar barikatlarla kapatıldı, güvenlik güçleriyle çatışmalar yaşanıyor!",
            choices: [
                {
                    text: "[BASTIR] Bölgeye OHAL ilan et, belediyeleri görevden al, operasyonları başlat.",
                    consequenceText: "Güvenlik artar (+15%), ama Kürt desteği yok olur (-35%), Özgürlük çöker (-18%), İstikrar sarsılır (-8%). Ordu destekler (+10%). Maliyet: ₺2B.",
                    action: (s) => {
                        s.treasury -= 2000000000;
                        s.systems.security = Math.min(100, s.systems.security + 15);
                        s.systems.freedom = Math.max(0, s.systems.freedom - 18);
                        s.stability = Math.max(0, s.stability - 8);
                        s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 35);
                        s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "etnik_direnis");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Bölgesel gerginliğe müdahale etme.",
                    consequenceText: "İstikrar sert düşer (-18%), Güvenlik düşer (-10%), Ordu desteği düşer (-12%). Bölgesel kontrol kaybolma riski.",
                    action: (s) => {
                        s.stability = Math.max(0, s.stability - 18);
                        s.systems.security = Math.max(0, s.systems.security - 10);
                        s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                        const a = s.voterAlliances.find(x => x.id === "etnik_direnis");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Barış süreci başlat: azınlık hakları genişlet, siyasi af ver. İdeolojini 'Merkez Sol' yap.",
                    consequenceText: "İdeolojiyi Merkez Sol'a kaydır. Kürtler (+40%), Solcular (+20%), Sekülerler (+10%) memnun. Milliyetçiler (-30%), Muhafazakarlar (-15%). Özgürlük artar (+12%).",
                    action: (s) => {
                        s.ideology = "center_left";
                        s.systems.freedom = Math.min(100, s.systems.freedom + 12);
                        s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 40);
                        s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                        s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                        s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 30);
                        s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 15);
                        s.activePolicies.minority_rights = 70;
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "etnik_direnis");
                        return null;
                    }
                }
            ]
        },
        genclik_isyani: {
            id: "genclik_isyani_crisis",
            title: "GENÇLİK İSYANI: KAMPÜS İŞGALLERİ VE SOKAK ÇATIŞMALARI",
            desc: "Z kuşağı gençler, üniversite öğrencileri ve genç işçiler 'Gençlik İsyanı' başlattı! Üniversite kampüsleri işgal edildi, sokaklarda barikatlar kuruldu, sosyal medyada viral direniş çağrıları yayılıyor. Talepleri: internet özgürlüğü, ücretsiz eğitim, istihdam garantisi!",
            choices: [
                {
                    text: "[BASTIR] Kampüslere polis baskını, sosyal medyaya erişim engeli, gözaltı operasyonları.",
                    consequenceText: "Güvenlik artar (+10%), ama Gençlik (-35%), Öğrenci (-30%) desteği çöker. Özgürlük sert düşer (-15%), Akademi öfkelenir (-15%). Maliyet: ₺1B.",
                    action: (s) => {
                        s.treasury -= 1000000000;
                        s.systems.security = Math.min(100, s.systems.security + 10);
                        s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                        s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 35);
                        s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 30);
                        s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 15);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "genclik_isyani");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Gençlik isyanına müdahale etme, kendiliğinden sönmesini bekle.",
                    consequenceText: "İstikrar sert düşer (-15%), İşgaller yayılır. Güvenlik düşer (-8%), Halk desteği düşer (-8%).",
                    action: (s) => {
                        s.stability = Math.max(0, s.stability - 15);
                        s.systems.security = Math.max(0, s.systems.security - 8);
                        s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 8);
                        const a = s.voterAlliances.find(x => x.id === "genclik_isyani");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Talepleri kabul et: internet serbestliği, burs artışı, istihdam paketi. İdeolojini 'Teknokrat' yap.",
                    consequenceText: "İdeolojiyi Teknokrat'a kaydır. Gençler (+30%), Öğrenciler (+30%), İşçiler (+10%) memnun. Muhafazakarlar (-10%). Eğitim artar (+8%). Maliyet: ₺4B.",
                    action: (s) => {
                        s.ideology = "technocrat";
                        s.treasury -= 4000000000;
                        s.systems.education = Math.min(100, s.systems.education + 8);
                        s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 30);
                        s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 30);
                        s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 10);
                        s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 10);
                        s.activePolicies.internet_freedom = 80;
                        s.activePolicies.education_budget = 70;
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "genclik_isyani");
                        return null;
                    }
                }
            ]
        },
        dindar_koalisyon: {
            id: "dindar_koalisyon_crisis",
            title: "DİNDAR KOALİSYON: CAMİ VAAZLARINDA İSYAN ÇAĞRISI",
            desc: "Dini cemaat ve tarikat liderleri ile muhafazakar sivil toplum kuruluşları 'Dindar Koalisyon' kurarak cuma vaazlarında hükümete karşı sivil itaatsizlik çağrısı yaptı! Başörtüsü özgürlüğü, imam hatip bütçesi artışı ve din derslerinin genişletilmesi talep ediliyor. Esnaf kepenk kapatıyor!",
            choices: [
                {
                    text: "[BASTIR] Cemaatlere ve tarikat vakıflarına baskın yap, vaaz içeriklerini denetle.",
                    consequenceText: "Dindar desteği çöker (-35%), Muhafazakar desteği düşer (-25%), Özgürlük geriler (-10%). Sekülerler memnun (+15%), Yargı destekler (+10%).",
                    action: (s) => {
                        s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                        s.voterGroups.religious.approval = Math.max(0, s.voterGroups.religious.approval - 35);
                        s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 25);
                        s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                        s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 10);
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "dindar_koalisyon");
                        return null;
                    }
                },
                {
                    text: "[GÖRMEZDEN GEL] Dini gerginliğe müdahale etme, tansiyonun düşmesini bekle.",
                    consequenceText: "İstikrar düşer (-12%), Muhafazakar öfke sürer, Güvenlik düşer (-6%).",
                    action: (s) => {
                        s.stability = Math.max(0, s.stability - 12);
                        s.systems.security = Math.max(0, s.systems.security - 6);
                        const a = s.voterAlliances.find(x => x.id === "dindar_koalisyon");
                        if (a) a.progress = 50;
                        return null;
                    }
                },
                {
                    text: "[FIRSATA ÇEVİR] Talepleri kabul et: din eğitimini genişlet, tarikat vakıflarını meşrulaştır. İdeolojini 'Muhafazakâr' yap.",
                    consequenceText: "İdeolojiyi Muhafazakâr'a kaydır. Dinciler (+35%), Muhafazakarlar (+30%) memnun. Sekülerler (-30%), Öğrenciler (-20%), Solcular (-15%).",
                    action: (s) => {
                        s.ideology = "conservative";
                        s.voterGroups.religious.approval = Math.min(100, s.voterGroups.religious.approval + 35);
                        s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 30);
                        s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 30);
                        s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 20);
                        s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                        s.activePolicies.religious_edu = 70;
                        s.voterAlliances = s.voterAlliances.filter(a => a.id !== "dindar_koalisyon");
                        return null;
                    }
                }
            ]
        }
    };

    return crisisMap[alliance.id] || null;
}

const echoEventsDatabase = {
    // Dijital Lira (crypto_standard) echoes
    crypto_standard_c0_echo: {
        id: "crypto_standard_c0_echo",
        title: "DİJİTAL HESAP VE GİZLİLİK SKANDALI",
        desc: "Dijital Liraya zorunlu geçişin ardından, MİT'in muhalif parti bağışlarını ve vatandaş harcamalarını veri tabanından usulsüz izlediği iddiası sızdırıldı! Kamuoyunda büyük bir fişleme tartışması başladı.",
        choices: [
            {
                text: "[BASTIR] Sızıntıyı yayınlayan mecralara anında erişim engeli getirin.",
                consequenceText: "Medya kontrolü +10, Özgürlük -15, Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.media = Math.min(100, s.systems.media + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Veri denetim yetkisini Meclis'te kurulacak tarafsız bir komisyona devredin.",
                consequenceText: "Özgürlük +10, İstikrar -8, Seküler onay +12.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.stability = Math.max(0, s.stability - 8);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    return null;
                }
            }
        ]
    },
    crypto_standard_c1_echo: {
        id: "crypto_standard_c1_echo",
        title: "KAYIT DIŞI KARA PARA OPERASYONU",
        desc: "Kripto gelişmelerini serbest bıraktığınız için, ülkede denetimsiz dijital cüzdanlar üzerinden milyarlarca Lira değerinde kara para aklandığı ve bu paranın radikal tarikat ağlarına aktarıldığı ortaya çıktı! Batı ittifakı Türkiye'yi gri listeye almakla tehdit ediyor.",
        choices: [
            {
                text: "[BASTIR] Tüm cüzdanları dondurma kararı alın, tarikat derneklerine polis baskını düzenleyin.",
                consequenceText: "Güvenlik +12, NATO ilişkisi +15, Cemaatler favor -20. Maliyet: ₺1 Milyar.",
                action: (s) => {
                    s.treasury -= 1000000000;
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Finansal denetimi sıkılaştırmak için uluslararası IMF/FATF kriterlerine tam uyum sözü verin.",
                consequenceText: "Ekonomi +8, Büyük Sermaye favor +12, egemenlik hassasiyeti nedeniyle Milliyetçi onay -10.",
                action: (s) => {
                    s.systems.economy = Math.min(100, s.systems.economy + 8);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    return null;
                }
            }
        ]
    },
    crypto_standard_c2_echo: {
        id: "crypto_standard_c2_echo",
        title: "FINTECH BANKACILIK ÇÖKÜŞÜ",
        desc: "Desteklediğiniz lisanslı en büyük Türk Fintech girişimi, kullanıcı bakiyelerini zimmetine geçirerek iflas ettiğini açıkladı. Yüz binlerce mevduat sahibi sokaklarda protestolar düzenliyor.",
        choices: [
            {
                text: "[BASTIR] Hükümet gücünü kullanıp protestoları yasaklayın, şirket yöneticilerinin mal varlığına el koyun.",
                consequenceText: "Özgürlük -10, Yolsuzluk algısı +10, 10 Siyasi Sermaye kazanılır.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Mevduatları devlet bütçesinden kısmen fonlayarak halkın mağduriyetini giderin.",
                consequenceText: "Halk mutluluğu +12, İstikrar +8. Maliyet: ₺3 Milyar.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.stability = Math.min(100, s.stability + 8);
                    return null;
                }
            }
        ]
    },

    // Endüstriyel Grev (workers_strike) echoes
    workers_strike_c0_echo: {
        id: "workers_strike_c0_echo",
        title: "KANDIRA VE GEBZE İŞÇİ DİRENİŞİ",
        desc: "Bursa ve Kocaeli'deki grevcileri polis gücüyle tahliye etmenizin ardından, işçiler Kandıra ve Gebze'de gizli sendikal komiteler kurarak üretimi sabote etmeye ve yolları barikatlarla kapatmaya başladı.",
        choices: [
            {
                text: "[BASTIR] Güvenlik önlemlerini en üst düzeye çıkarın, sendika liderlerini gözaltına alın.",
                consequenceText: "Güvenlik +10, Özgürlük -15, İşçiler approval -20.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Geri adım atın, gözaltıları serbest bırakın ve sendika ile yeni arabuluculuk masası kurun.",
                consequenceText: "İstikrar +10, İşçi onay +15, ancak İş Dünyası favor -12.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 12);
                    return null;
                }
            }
        ]
    },
    workers_strike_c1_echo: {
        id: "workers_strike_c1_echo",
        title: "SANAYİ DEVRİ ÇÖKÜŞÜ VE FABRİKA KAPATMALARI",
        desc: "Grev müdahalesiz kalıp haftalarca sürdükten sonra, büyük holdingler zarar gerekçesiyle Kocaeli'deki iki otomotiv montaj fabrikasını tamamen kapatarak üretimi Mısır'a taşıyacaklarını duyurdu! Binlerce kişi işsiz kalmak üzere.",
        choices: [
            {
                text: "[BASTIR] Kapatma kararı alan şirketlere ağır vergi cezaları ve yaptırımlar uygulayın.",
                consequenceText: "Büyük Sermaye favor -20, Milliyetçi onay +15. Ekonomi geriler (-10).",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Şirketlere fabrika sahalarında kalmaları için vergi indirimi ve ucuz enerji teşviki sağlayın.",
                consequenceText: "Büyük Sermaye favor +15, Ekonomi toparlanır (+5). Maliyet: ₺2 Milyar.",
                action: (s) => {
                    s.treasury -= 2000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 5);
                    return null;
                }
            }
        ]
    },
    workers_strike_c2_echo: {
        id: "workers_strike_c2_echo",
        title: "ENFLASYON-ÜCRET SPİRALİ KRİZİ",
        desc: "Grevcilerin talebiyle asgari ücrete ve maaşlara yaptığınız zorunlu zamların ardından, şirketler artan maliyetleri ürün etiketlerine yansıttı. Piyasada kontrolsüz bir fiyat artış dalgası (fiyat spirali) yaşanıyor.",
        choices: [
            {
                text: "[BASTIR] Ticaret Bakanlığı müfettişlerini gönderip 'fahiş fiyat' uygulayan zincir marketlere kapatma cezası verin.",
                consequenceText: "Enflasyon algısı hafifler (-5), Özgürlük -8, Büyük Sermaye favor -12.",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 5);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 8);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 12);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Merkez Bankası politika faizini sert şekilde yükselterek talebi kısın ve fiyatları baskılayın.",
                consequenceText: "Enflasyon düşer (-12), Ekonomi yavaşlar (-10), İşsizlik artar (+8).",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 12);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.systems.unemployment = Math.min(100, s.systems.unemployment + 8);
                    return null;
                }
            }
        ]
    },

    // Savunma Sanayii Sızıntısı (leaked_tapes) echoes
    leaked_tapes_c0_echo: {
        id: "leaked_tapes_c0_echo",
        title: "VPN VE DİJİTAL DİRENİŞ HAREKETİ",
        desc: "İhale yolsuzluğu iddialarını gizlemek için sosyal medyaya getirdiğiniz erişim engelinin ardından, muhalif gençler kitlesel olarak VPN kullanmaya başladı. VPN servisleri üzerinden sansürlenen ihale belgeleri ev ev yayılıyor.",
        choices: [
            {
                text: "[BASTIR] VPN servis sağlayıcılarını da milli güvenlik duvarıyla engelleyin, siber takibi artırın.",
                consequenceText: "Özgürlük -15, Gençlik onay -15, Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Sosyal medya kısıtlamalarını kaldırın ve 'internet hakkı koruma yasası' çıkarın.",
                consequenceText: "Özgürlük +15, Gençlik onay +12, İstikrar +8.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 12);
                    s.stability = Math.min(100, s.stability + 8);
                    return null;
                }
            }
        ]
    },
    leaked_tapes_c1_echo: {
        id: "leaked_tapes_c1_echo",
        title: "ANKARA'DA HÜKÜMET İSTİFA YÜRÜYÜŞLERİ",
        desc: "İhale kayıtlarını görmezden gelmenizin ardından, muhalefet partileri ve sivil toplum Ankara ve İstanbul'da yüz binlerce kişinin katıldığı devasa 'Temiz Siyaset' yürüyüşleri düzenliyor. İstikrar alarm veriyor.",
        choices: [
            {
                text: "[BASTIR] Yürüyüşleri polis barikatlarıyla engelleyin ve eylemcileri dağıtın.",
                consequenceText: "Güvenlik +10, İstikrar -10, Özgürlük -10. Kamu desteği düşer.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.stability = Math.max(0, s.stability - 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Adalet Bakanlığı müfettişlerini sızıntılarda adı geçen yetkilileri soruşturmak üzere görevlendirin.",
                consequenceText: "Yolsuzluk algısı -10, Adalet onayı +12, İstikrar +8.",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.stability = Math.min(100, s.stability + 8);
                    return null;
                }
            }
        ]
    },
    leaked_tapes_c2_echo: {
        id: "leaked_tapes_c2_echo",
        title: "KABİNE İÇİ MUHAFAZAKAR İSYAN",
        desc: "İhale komisyonu kurarak ihale ortağı olan muhafazakar holdinglerin üzerine gitmenizin ardından, kabinenin muhafazakar kanadı tasfiye edilmek istendiklerini savunarak topluca istifa tehdidinde bulundu.",
        choices: [
            {
                text: "[BASTIR] Tehditleri kabul etmeyin, istifa eden bakanların yerine liyakatli bürokratlar atayın.",
                consequenceText: "Cemaatler favor -15, Muhafazakar onay -15, Siyasi Sermaye -15. Bürokraside uyum artar.",
                action: (s) => {
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 8);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Soruşturmayı durdurun ve holdinglerle perde arkasında barış anlaşması imzalayın.",
                consequenceText: "Cemaatler favor +12, Yolsuzluk algısı +12, Seküler onay -15.",
                action: (s) => {
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 12);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    return null;
                }
            }
        ]
    },

    // Nükleer Teşvik (nuclear_fusion) echoes
    nuclear_fusion_c0_echo: {
        id: "nuclear_fusion_c0_echo",
        title: "AKKUYU'DA EKOLOJİK SABOTAJ GİRİŞİMİ",
        desc: "Füzyon santrali itirazlarını susturup bölgeyi askeri bölge ilan etmenizin ardından, radikal çevreci gruplar geceleri şantiye lojistik hatlarına el yapımı patlayıcılarla sabotaj düzenledi. Güvenlik alarmda.",
        choices: [
            {
                text: "[BASTIR] Sabotajcıları terör örgütü ilan edip bölgedeki tüm sivil yerleşimleri tahliye edin.",
                consequenceText: "Güvenlik +12, Özgürlük -15, Sol seçmen onay -20.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 20);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Askeri bölge statüsünü kaldırın ve çevreci STK'ların tesisi bağımsız denetlemesine izin verin.",
                consequenceText: "İstikrar +8, Sol seçmen onay +12, Özgürlük +8.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 12);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 8);
                    return null;
                }
            }
        ]
    },
    nuclear_fusion_c1_echo: {
        id: "nuclear_fusion_c1_echo",
        title: "TÜBİTAK BİLİM İNSANLARI BOYKOTU",
        desc: "Nükleer jeneratör bütçesini askıya almanızın ardından, projede çalışan kıdemli nükleer fizikçiler hükümetin bilim karşıtı olduğunu iddia ederek TÜBİTAK ve üniversitelerdeki tüm projeleri durdurma boykotu başlattı.",
        choices: [
            {
                text: "[BASTIR] Boykotçu akademisyenlerin sözleşmelerini feshedip üniversite kadrolarından ihraç edin.",
                consequenceText: "Akademi onay -20, Özgürlük -12, 10 Siyasi Sermaye kazanılır.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 12);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Geri adım atarak projeye acil bir bilimsel hibe paketi tahsis edin.",
                consequenceText: "Akademi onay +15, Öğrenciler onay +12. Maliyet: ₺1.2 Milyar.",
                action: (s) => {
                    s.treasury -= 1200000000;
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 12);
                    return null;
                }
            }
        ]
    },
    nuclear_fusion_c2_echo: {
        id: "nuclear_fusion_c2_echo",
        title: "TEKNOLOJİ BÜTÇESİNDE KARA DELİK",
        desc: "Yerli nükleer füzyon projesine aktardığınız milyarlarca liralık fonun ardından, yabancı tedarikçilerin parça maliyetlerini artırması projenin durma noktasına gelmesine neden oldu. Hazine ağır yük altında.",
        choices: [
            {
                text: "[BASTIR] Tedarik zincirini millileştirmek için savunma bütçesinden 2 milyar Lira daha aktarın.",
                consequenceText: "Milliyetçi onay +10, Askeri sanayi memnuniyeti. Maliyet: ₺2.0 Milyar.",
                action: (s) => {
                    s.treasury -= 2000000000;
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Projeyi yabancı konsorsiyumlara açıp ortak edin ve devlet tekelini kaldırın.",
                consequenceText: "Hazineye nakit girdisi (+₺1.5B), egemenlik kaybı nedeniyle Milliyetçi onay -15.",
                action: (s) => {
                    s.treasury += 1500000000;
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    return null;
                }
            }
        ]
    },

    // Deprem Önlemleri (earthquake_retrofits) echoes
    earthquake_retrofits_c0_echo: {
        id: "earthquake_retrofits_c0_echo",
        title: "KAPATILAN ESNAFLARIN SOKAK İSYANI",
        desc: "Sismik raporlar nedeniyle yüzlerce ticari binayı tahliye edip mühürlemenizin ardından, dükkanları kapatılan esnaf ve küçük işletme sahipleri İstanbul Ticaret Odası önünde barikat kurup lastik yaktı.",
        choices: [
            {
                text: "[BASTIR] Güvenlik güçlerini gönderip eylemi sert şekilde sonlandırın.",
                consequenceText: "Güvenlik +10, İstikrar -10, İş Dünyası onay -12.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.stability = Math.max(0, s.stability - 10);
                    s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 12);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Kapatılan esnaflara geçici konteyner çarşılar kurulacağını taahhüt edin.",
                consequenceText: "İstikrar +10, İş sahipleri onay +10. Maliyet: ₺1 Milyar.",
                action: (s) => {
                    s.treasury -= 1000000000;
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.business.approval = Math.min(100, s.voterGroups.business.approval + 10);
                    return null;
                }
            }
        ]
    },
    earthquake_retrofits_c1_echo: {
        id: "earthquake_retrofits_c1_echo",
        title: "BÜYÜK AFET VE DENETİM SORUMLULUĞU",
        desc: "Sismik denetimleri ertelemenizin ardından, Marmara açıklarında gerçekleşen 6.2 büyüklüğündeki orta depremde denetlenmemiş iki sanayi sitesi yerle bir oldu. Enkaz altında yüzlerce işçi var. Muhalefet istifanıza çağırıyor.",
        choices: [
            {
                text: "[BASTIR] Sorumluluğu tamamen müteahhitlere ve denetim firmalarına yıkarak kapsamlı gözaltılar başlatın.",
                consequenceText: "Yolsuzluk algısı -10, Adalet onayı +12. İstikrar çöker (-15%).",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.stability = Math.max(0, s.stability - 15);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Sorumluluğu kabul edin, tüm enkaz mağdurlarının ailelerine hazineden doğrudan tazminat verin.",
                consequenceText: "Halk mutluluğu +12, İşçi onay +15. Hazineye büyük darbe.",
                action: (s) => {
                    s.treasury -= 4000000000;
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    return null;
                }
            }
        ]
    },
    earthquake_retrofits_c2_echo: {
        id: "earthquake_retrofits_c2_echo",
        title: "KENTSEL DÖNÜŞÜMDE İHALE YOLSUZLUĞU",
        desc: "Kentsel dönüşüm için tahsis ettiğiniz 6 milyar Liralık bütçenin büyük kısmının, ihalesiz olarak iktidara yakın holdinglere ve cemaat müteahhitlerine dağıtıldığı sızdı. Muhalefet bütçenin çalındığını iddia ediyor.",
        choices: [
            {
                text: "[BASTIR] İddiaları sunan gazeteleri sansürleyin ve idari cezalarla kapatın.",
                consequenceText: "Medya kontrolü +12, Özgürlük -15, Seküler onay -15.",
                action: (s) => {
                    s.systems.media = Math.min(100, s.systems.media + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Bağımsız Sayıştay denetçilerini ihaleleri incelemek üzere göreve çağırın.",
                consequenceText: "Yolsuzluk algısı -12, Adalet onay +15, Cemaatler favor -15.",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                    return null;
                }
            }
        ]
    },

    // Sosyal Medya (social_media_manipulation) echoes
    social_media_manipulation_c0_echo: {
        id: "social_media_manipulation_c0_echo",
        title: "GENÇLİK SOKAK PROTESTOLARI",
        desc: "Büyük sosyal platformu erişime kapatmanızın ardından, kampüslerde ve şehir meydanlarında toplanan binlerce genç internet özgürlüğü için 'Fişi Çekme, Haklarimizi Ver' pankartlarıyla eylem düzenliyor.",
        choices: [
            {
                text: "[BASTIR] Toplanma yasaklarını uygulayın, eylemcilere biber gazıyla müdahale ettirin.",
                consequenceText: "Güvenlik +10, Özgürlük -15, Öğrenciler onay -20.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.students.approval = Math.max(0, s.voterGroups.students.approval - 20);
                    return null;
                }
            },
            {
                text: "[TAVİZ] İnternet yasağını kaldırın ve platform yöneticileriyle yeni bir veri protokolü imzalayın.",
                consequenceText: "Özgürlük +15, Gençlik onay +15, İstikrar +10.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.stability = Math.min(100, s.stability + 10);
                    return null;
                }
            }
        ]
    },
    social_media_manipulation_c1_echo: {
        id: "social_media_manipulation_c1_echo",
        title: "SOSYAL MEDYADA KAOTİK BİLGİ KİRLİLİĞİ",
        desc: "Manipülasyona müdahale etmemenizin ardından, bot hesaplar üzerinden yayılan 'bankalardan nakit çekimi durduruldu' asılsız haberi sebebiyle vatandaşlar ATM kuyruklarına akın etti. Hızlı bir istikrar kaybı var.",
        choices: [
            {
                text: "[BASTIR] Asılsız haberi yayan 50 bot hesabın yöneticilerini tutuklatın ve TV'lerde yalanlayın.",
                consequenceText: "Güvenlik +10, İstikrar +8. Siyasi Sermaye -10.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.stability = Math.min(100, s.stability + 8);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Hazine ve Merkez Bankası garantisini açıklayıp mevduat sınırlarını genişletin.",
                consequenceText: "İstikrar +12, Finans dünyası memnuniyeti. Maliyet: ₺1.5 Milyar.",
                action: (s) => {
                    s.treasury -= 1500000000;
                    s.stability = Math.min(100, s.stability + 12);
                    return null;
                }
            }
        ]
    },
    social_media_manipulation_c2_echo: {
        id: "social_media_manipulation_c2_echo",
        title: "DEVLET PROPAGANDASININ TERS TEPİLMESİ",
        desc: "Algoritmayı devlet propagandasına alet etmenizin ardından, dünya genelindeki sosyal ağ konsorsiyumu 'Türkiye Hükümeti manipülasyon yapıyor' diyerek resmi devlet kanallarını ve TRT'yi kalıcı olarak askıya aldı.",
        choices: [
            {
                text: "[BASTIR] Ülkede ulusal bir devlet internet ağı (intranet) kurmak için altyapı çalışmalarını başlatın.",
                consequenceText: "Özgürlük -20, Güvenlik +12, NATO favor -15. Maliyet: ₺3 Milyar.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 15);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Geri adım atın, sosyal medya şirketleriyle uzlaşarak algoritmaları serbest piyasa koşullarına geri döndürün.",
                consequenceText: "Özgürlük +12, Seküler onay +12, Medya kontrolü geriler (-10).",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 12);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.systems.media = Math.max(0, s.systems.media - 10);
                    return null;
                }
            }
        ]
    },

    // Kampüs Protestoları (student_protest) echoes
    student_protest_c0_echo: {
        id: "student_protest_c0_echo",
        title: "AKADEMİK SENDİKA VE DEKANLAR BOYKOTU",
        desc: "Polis zoruyla kampüsleri kapatmanızın ardından, ülkedeki tüm köklü üniversitelerin dekanları ve öğretim üyeleri anayasal akademik özerklik ihlali gerekçesiyle dersleri boykot etti. Yükseköğretim kilitlendi.",
        choices: [
            {
                text: "[BASTIR] Boykot çağrısı yapan dekanları görevden alın, YÖK kanalıyla yerlerine kayyum atayın.",
                consequenceText: "Akademi onay -25, Özgürlük -15, 12 Siyasi Sermaye kazanılır.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Müdahaleleri durdurun ve rektör atamalarını doğrudan öğretim üyelerinin oylarına açın.",
                consequenceText: "Akademi onay +25, Öğrenciler onay +15, Özgürlük +12.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 25);
                    s.voterGroups.students.approval = Math.min(100, s.voterGroups.students.approval + 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 12);
                    return null;
                }
            }
        ]
    },
    student_protest_c1_echo: {
        id: "student_protest_c1_echo",
        title: "GÜVENLİK BÜROKRASİSİNİN MUHTIRASI",
        desc: "Protestoları serbest bırakıp yatışmasını beklemenizin ardından, eylemlerin asayişi tamamen bozduğunu iddia eden Güvenlik Bürokrasisi liderleri hükümete 'düzenin zorla tesisi' yönünde yazılı bir güvenlik muhtırası sundu.",
        choices: [
            {
                text: "[BASTIR] Güvenlik şeflerinin taleplerine uyun ve sokağa çıkma kısıtlamaları ilan edin.",
                consequenceText: "Security Bürokrasisi onay +15, Güvenlik +10, Özgürlük -15.",
                action: (s) => {
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 15);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Muhtırayı veren emniyet genel müdürünü görevden alıp sivil kontrolü tescilleyin.",
                consequenceText: "Güvenlik Bürokrasisi favor -20, Özgürlük +15, Siyasi Sermaye -15.",
                action: (s) => {
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 20);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            }
        ]
    },
    student_protest_c2_echo: {
        id: "student_protest_c2_echo",
        title: "BÜTÇEDE ÖĞRENCİ FONU SIKIŞIKLIĞI",
        desc: "Eylemleri yatıştırmak için ayırdığınız 1.5 milyar Liralık acil burs desteğinin ardından, hazine nakit dengesinde sıkışıklık yaşandı. Diğer sosyal yardımlarda kesintiler yapmak zorundasınız.",
        choices: [
            {
                text: "[BASTIR] Kesintileri göçmen ve sığınmacı yardımlarından yapın.",
                consequenceText: "Göçmen onay -20, Milliyetçi onay +15. Hazine dengelenir.",
                action: (s) => {
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Bütçe dengesini sağlamak için dış piyasalara yüksek faizli devlet tahvili ihraç edin.",
                consequenceText: "Hazine rahatlar (+₺1.2B), ancak Enflasyon artar (+5%), İş Dünyası onay -10.",
                action: (s) => {
                    s.treasury += 1200000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                    s.voterGroups.business.approval = Math.max(0, s.voterGroups.business.approval - 10);
                    return null;
                }
            }
        ]
    },

    // Metal Sanayii Grevi (general_strikes) echoes
    general_strikes_c0_echo: {
        id: "general_strikes_c0_echo",
        title: "FABRİKALARDA YASA DIŞI İŞGAL DALGASI",
        desc: "Metal sanayiindeki grevi yasaklamanızın ardından, işçiler fabrikaları terk etmeyerek makineleri zincirledi ve kendilerini içeri kilitledi. TAYSAD sanayi bölgesinde üretim tamamen felç.",
        choices: [
            {
                text: "[BASTIR] Jandarma komandolarını sevk edip kapıları kırarak işgalleri zorla dağıtın.",
                consequenceText: "Güvenlik +10, İşçiler onay -25, İstikrar geriler (-10%).",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 25);
                    s.stability = Math.max(0, s.stability - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Yasaklama kararını geri çekin, sendikaların yasal sözleşme masasına dönmesine izin verin.",
                consequenceText: "İşçiler onay +20, İstikrar +10, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 20);
                    s.stability = Math.min(100, s.stability + 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    return null;
                }
            }
        ]
    },
    general_strikes_c1_echo: {
        id: "general_strikes_c1_echo",
        title: "OTOMOTİV İHRACAT TAAHHÜDÜ KRİZİ",
        desc: "Grevlerin sürmesine göz yummanızın ardından, Türkiye'nin en büyük otomotiv üreticisi Alman ortaklarına olan ihracat taahhütlerini yerine getiremedi. Alman Sanayi Odası Türkiye'ye tedarik boykotu uyarısı yaptı.",
        choices: [
            {
                text: "[BASTIR] Avrupa baskısına rest çekin, yerli otomotiv sanayiini devlet koruması altına alın.",
                consequenceText: "Milliyetçi onay +15, Ekonomi geriler (-8), NATO ilişkisi -10.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 8);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 10);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Şirketlerin ihracat cezalarını karşılamak için devlet garantisi ve hibe paketleri sağlayın.",
                consequenceText: "Büyük Sermaye favor +15, Hazine erir. Maliyet: ₺3 Milyar.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    return null;
                }
            }
        ]
    },
    general_strikes_c2_echo: {
        id: "general_strikes_c2_echo",
        title: "ŞİRKET KARLARINDA DÜŞÜŞ VE İŞTEN ÇIKARMALAR",
        desc: "İşçileri korumak için asgari ücreti aşan ek zamları onaylatmanızın ardından, büyük holdingler kar marjlarının düştüğünü belirterek metal sektöründe toplu işten çıkarma süreçleri başlattı.",
        choices: [
            {
                text: "[BASTIR] Kapsamlı işten çıkarmaları kanun hükmünde kararnameyle yasaklayın, uymayan holdingleri kamulaştırmakla tehdit edin.",
                consequenceText: "İşçiler onay +15, Özgürlük -10, Büyük Sermaye favor -25. Ekonomi geriler (-6).",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.systems.economy = Math.max(0, s.systems.economy - 6);
                    return null;
                }
            },
            {
                text: "[TAVİZ] Çıkarılan işçilere 1 yıl boyunca sürecek devlet destekli işsizlik maaşı fonu tahsis edin.",
                consequenceText: "İşçiler onay +12, Halk mutluluğu +8. Maliyet: ₺2.5 Milyar.",
                action: (s) => {
                    s.treasury -= 2500000000;
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 12);
                    s.systems.happiness = Math.min(100, s.systems.happiness + 8);
                    return null;
                }
            }
        ]
    },
    // --- CHAIN 1: KÜRT BARIŞ AÇILIMI ---
    peace_opening_start_c0_echo: {
        id: "peace_opening_start_c0_echo",
        title: "ZİNCİR - Barış Sürecinde Sabotaj ve Sızıntı",
        desc: "Resmi müzakerelerin başlamasından kısa süre sonra, tarafların sınır hattında gizli bir cephanelik devri konusunda anlaştığına dair ses kayıtları basına sızdırıldı. Milliyetçi muhalefet meclisi olağanüstü toplantıya çağırıyor.",
        choices: [
            {
                text: "[BASTIR] Sızıntıyı yayınlayan haber sitelerini kapatın, tartışmayı yasaklayın.",
                consequenceText: "Medya -15%, Özgürlük -10%, Siyasi Sermaye -15 PC, İstikrar +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.media = Math.max(0, s.systems.media - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.stability = Math.min(100, s.stability + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c0_part3_echo",
                        originTitle: "Barış Sürecinde Sabotaj",
                        originChoiceText: "Sızıntıyı bastırmak ve sansür"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Kayıtların gerçekliğini incelemek üzere bağımsız bir Meclis Komisyonu kurun.",
                consequenceText: "Akademi +12%, Yargı +10%, Siyasi Sermaye +10 PC, İstikrar -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.stability = Math.max(0, s.stability - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c0_part3_echo",
                        originTitle: "Barış Sürecinde Sabotaj",
                        originChoiceText: "Meclis Komisyonu kurulması"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Milliyetçi komutanların taleplerini karşılamak için askeri operasyon bütçesini artırın.",
                consequenceText: "Ordu +15%, Milliyetçi +12%, Hazine -₺3.0B, Kürt seçmenler -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.treasury -= 3000000000;
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c0_part3_echo",
                        originTitle: "Barış Sürecinde Sabotaj",
                        originChoiceText: "Ordu bütçesini artırma"
                    });
                    return null;
                }
            },
            {
                text: "[ULUSLARARASI] AB temsilcilerini sürece garantör olarak davet edin.",
                consequenceText: "Liberal +15%, Kürt +15%, NATO favor +15, Milliyetçi -20%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c0_part3_echo",
                        originTitle: "Barış Sürecinde Sabotaj",
                        originChoiceText: "AB garantörlüğü daveti"
                    });
                    return null;
                }
            }
        ]
    },
    peace_opening_start_c1_echo: {
        id: "peace_opening_start_c1_echo",
        title: "ZİNCİR - Harekât Bölgesinde Pusu ve Askeri Kayıplar",
        desc: "Sınır ötesi operasyonda ilerleyen birliklerimiz, derin bir vadide tanksavar pususuna düşürüldü. Askeri kayıplarımız var ve ordu komutanlığı operasyonun yetersiz hava desteğiyle sürdüğünü iddia ediyor.",
        choices: [
            {
                text: "[BASTIR] Hava harekatını en üst düzeye çıkar, sınıra yakın yerleşimleri abluka altına al.",
                consequenceText: "Güvenlik +15%, Ordu +10%, Özgürlük -15%, Kürt seçmenler -20%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 20);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c1_part3_echo",
                        originTitle: "Askeri Kayıplar",
                        originChoiceText: "Hava harekatı ve abluka"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Kuzey Irak Bölgesel Yönetimi ile masaya oturup ortak istihbarat mekanizması kurun.",
                consequenceText: "Dışişleri kabine sadakati +10, Milliyetçi -12%, Kürt seçmenler +12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.cabinet.foreign.loyalty = Math.min(100, s.cabinet.foreign.loyalty + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c1_part3_echo",
                        originTitle: "Askeri Kayıplar",
                        originChoiceText: "Bölgesel yönetimle istihbarat"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Operasyonu durdurup birlikleri savunma sınırına çekin, bütçeyi insani yardıma kaydırın.",
                consequenceText: "Halk mutluluğu +8%, Hazine +₺2.0B, Milliyetçi -20%, Ordu -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 8);
                    s.treasury += 2000000000;
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c1_part3_echo",
                        originTitle: "Askeri Kayıplar",
                        originChoiceText: "Geri çekilme ve insani bütçe"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Yaşanan askeri kaybı seferberlik söylemine dönüştürün, muhalefete baskı kurun.",
                consequenceText: "Siyasi Sermaye +15 PC, Muhafazakar +10%, Özgürlük -10%, Solcular -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c1_part3_echo",
                        originTitle: "Askeri Kayıplar",
                        originChoiceText: "Seferberlik söylemi ve baskı"
                    });
                    return null;
                }
            }
        ]
    },
    peace_opening_start_c2_echo: {
        id: "peace_opening_start_c2_echo",
        title: "ZİNCİR - Avrupa Konseyi Tavsiyeleri ve Gerginlik",
        desc: "Barış planını Avrupa Konseyi'ne taşımanızın ardından, Strasburg mahkemelerinden bölgedeki yerel valilik yetkilerinin belediyelere devredilmesi gerektiği yönünde bu tavsiye kararı çıktı. Ankara'da egemenlik tartışması var.",
        choices: [
            {
                text: "[BASTIR] Avrupa Konseyi'ne rest çekip kararı reddedin.",
                consequenceText: "Milliyetçi +15%, NATO favor -15, Liberal -12%, Siyasi Sermaye +10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 15);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 12);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c2_part3_echo",
                        originTitle: "Avrupa Konseyi",
                        originChoiceText: "Kararı reddetmek ve rest çekmek"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Kararı 'kısmi yerel yönetim reformu' olarak yumuşatıp kabul edin.",
                consequenceText: "Liberal +15%, Kürt seçmenler +12%, Milliyetçi -12%, Yargı -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 12);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c2_part3_echo",
                        originTitle: "Avrupa Konseyi",
                        originChoiceText: "Kısmi yerel yönetim reformu"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Doğu illerine ekonomik kalkınma fonu tahsis edip konseyi oyalayın.",
                consequenceText: "Kürt seçmenler +15%, Hazine -₺2.5B, İstikrar +8%, Enflasyon +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 15);
                    s.treasury -= 2500000000;
                    s.stability = Math.min(100, s.stability + 8);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c2_part3_echo",
                        originTitle: "Avrupa Konseyi",
                        originChoiceText: "Doğu kalkınma fonu tahsisi"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Avrupa'ya göçmen geçişlerini gevşeterek konseyi kararından vazgeçmeye zorlayın.",
                consequenceText: "Milliyetçi +10%, Göçmenler -15%, İstikrar -5%, NATO favor -10. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 15);
                    s.stability = Math.max(0, s.stability - 5);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c2_part3_echo",
                        originTitle: "Avrupa Konseyi",
                        originChoiceText: "Göçmen sınır kapıları baskısı"
                    });
                    return null;
                }
            }
        ]
    },
    peace_opening_start_c3_echo: {
        id: "peace_opening_start_c3_echo",
        title: "ZİNCİR - Gizli Ses Kayıtları ve Parti İçi Muhalefet",
        desc: "Gizli istihbarat görüşmelerinin ses kayıtları muhalif yabancı hesaplarca sızdırıldı. Hükümet partisinin milliyetçi milletvekilleri istifa etme ve kabineyi düşürme tehdidinde bulunuyor.",
        choices: [
            {
                text: "[BASTIR] Sızıntıları yalanlayıp kayıtları yayınlayan gazetecileri tutuklatın.",
                consequenceText: "Özgürlük -15%, Medya -10%, Siyasi Sermaye -10 PC, İstikrar +8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.systems.media = Math.max(0, s.systems.media - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.stability = Math.min(100, s.stability + 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c3_part3_echo",
                        originTitle: "Gizli Kayıtlar",
                        originChoiceText: "Gazetecileri tutuklatmak"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Parti içi muhalif vekillere ek bakanlık sözü vererek onları yatıştırın.",
                consequenceText: "Kabine sadakati +15, Siyasi Sermaye -15 PC, Yolsuzluk +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 15);
                    }
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c3_part3_echo",
                        originTitle: "Gizli Kayıtlar",
                        originChoiceText: "Bakanlık vaadiyle uzlaşı"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Görüşmeleri yapan MİT müsteşarını hemen görevden alın.",
                consequenceText: "Güvenlik Bürokrasisi -15%, Milliyetçi +12%, İstikrar -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.stability = Math.max(0, s.stability - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c3_part3_echo",
                        originTitle: "Gizli Kayıtlar",
                        originChoiceText: "MİT müsteşarının tasfiyesi"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Görüşmeleri açıkça sahiplenip 'Birlik Kongresi' çağrısı yapın.",
                consequenceText: "Kürt seçmenler +18%, Solcular +15%, Milliyetçi -20%, Ordu -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 18);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "peace_opening_c3_part3_echo",
                        originTitle: "Gizli Kayıtlar",
                        originChoiceText: "Barış sürecini sahiplenmek"
                    });
                    return null;
                }
            }
        ]
    },
    peace_opening_c0_part3_echo: {
        id: "peace_opening_c0_part3_echo",
        title: "ZİNCİR - Barışın Geleceği ve Silah Bırakma Kongresi",
        desc: "Barış süreci sabotajının ardından taraflar nihai silah bırakma kongresi için masaya geldi. Yapacağınız son hamle, süreci ebediyen tescil edecek ya da tamamen bitirecektir.",
        choices: [
            {
                text: "Silahsız militanlara genel siyasi af ve toplumsal entegrasyon yasası çıkarın.",
                consequenceText: "Kürt seçmenler +25%, Solcular +20%, Milliyetçi -25%, Ordu -20%. İstikrar +15%, Özgürlük +10%.",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 20);
                    s.stability = Math.min(100, s.stability + 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    return null;
                }
            },
            {
                text: "Affı sadece lider kadro dışındaki teslim olan militanlarla sınırlandırın.",
                consequenceText: "Halk mutluluğu +10%, Milliyetçi -10%, Kürt seçmenler +12%, Güvenlik +10%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 12);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    return null;
                }
            },
            {
                text: "Tüm barış sürecini iptal edin, terör örgütü üzerinde askeri baskıyı artırın.",
                consequenceText: "Milliyetçi +25%, Ordu +20%, Kürt seçmenler -30%, Solcular -20%. Hazine -₺3.0B.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 25);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 30);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 20);
                    s.treasury -= 3000000000;
                    return null;
                }
            },
            {
                text: "Süreci dondurun ve sınır güvenliğini artıracak ek gözetim kuleleri inşa edin.",
                consequenceText: "İstikrar +5%, Güvenlik +12%, Hazine -₺1.5B, Kürt seçmenler -8%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.treasury -= 1500000000;
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 8);
                    return null;
                }
            }
        ]
    },
    peace_opening_c1_part3_echo: {
        id: "peace_opening_c1_part3_echo",
        title: "ZİNCİR - Sınır Ötesi Harekâtın Nihai Raporu ve Yeni Düzen",
        desc: "Sınır ötesindeki kanlı askeri harekâtın sonuna gelindi. Ordu hedeflenen tampon bölgeyi büyük ölçüde kontrol ediyor ancak operasyonun ülkeye olan diplomatik ve ekonomik bilançosu ağırlaştı.",
        choices: [
            {
                text: "Kalıcı sınır ötesi askeri üsler kurun ve bölgeyi askeri valilikle yönetin.",
                consequenceText: "Ordu +25%, Milliyetçi +20%, Hazine -₺4.0B, Kürt seçmenler -25%, NATO favor -20.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 25);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.treasury -= 4000000000;
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 25);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 20);
                    return null;
                }
            },
            {
                text: "Kontrolü yerel müttefik milis güçlere devredip ordunun ana gücünü geri çekin.",
                consequenceText: "İstikrar +8%, Hazine +₺1.5B, Milliyetçi -10%, Güvenlik +5%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.treasury += 1500000000;
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    s.systems.security = Math.min(100, s.systems.security + 5);
                    return null;
                }
            },
            {
                text: "Birleşmiş Milletler Barış Gücü'nü bölgeye davet edin, tampon bölgeyi uluslararasılaştırın.",
                consequenceText: "Liberal +15%, NATO favor +20, Milliyetçi -15%, Ordu -12%. Hazine bütçesi korunur.",
                action: (s) => {
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    return null;
                }
            },
            {
                text: "Operasyon bölgesinde hızlıca mülteci şehirleri kurup Türkiye'deki mültecileri oraya taşıyın.",
                consequenceText: "Halk mutluluğu +12%, Milliyetçi +15%, Göçmenler -20%, Hazine -₺3.5B.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 20);
                    s.treasury -= 3500000000;
                    return null;
                }
            }
        ]
    },
    peace_opening_c2_part3_echo: {
        id: "peace_opening_c2_part3_echo",
        title: "ZİNCİR - Avrupa Mahkemesi Kararı ve Demokratik Anlaşma",
        desc: "Avrupa Konseyi sürecinin sonunda, Türkiye'nin reform adımlarını onaylayan ya da mahkum eden nihai deklarasyon açıklandı. Türkiye ile Batı dünyası arasında yeni bir eşik geçilmek üzere.",
        choices: [
            {
                text: "Konsey kararlarına tam uyumlu demokratik reform paketi açıklayın.",
                consequenceText: "Özgürlük +20%, Seküler +15%, Liberal +15%, Milliyetçi -25%, Ordu -15%. NATO favor +20.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 20);
                    return null;
                }
            },
            {
                text: "Konseyden çıkma tehdidinde bulunarak süreci askıya alın.",
                consequenceText: "Milliyetçi +25%, Ordu +12%, Liberal -20%, Seküler -15%, Siyasi Sermaye +15 PC.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 25);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 12);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 20);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    return null;
                }
            },
            {
                text: "Sadece kültürel hakları kapsayan dar bir reform yasasıyla konseyi oyalayın.",
                consequenceText: "Kürt seçmenler +12%, Liberal +8%, Milliyetçi -10%, İstikrar +5%.",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 12);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 8);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    s.stability = Math.min(100, s.stability + 5);
                    return null;
                }
            },
            {
                text: "Reform bütçesini tamamen geri çekin, asayiş önlemlerine harcayın.",
                consequenceText: "Güvenlik +15%, Ordu +10%, Kürt seçmenler -20%, Özgürlük -15%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    return null;
                }
            }
        ]
    },
    peace_opening_c3_part3_echo: {
        id: "peace_opening_c3_part3_echo",
        title: "ZİNCİR - Oslo Sürecinin Sonu ve Ulusal Güvenlik Mutabakatı",
        desc: "Gizli müzakerelerin ifşa olmasının ardından sular durulmadı. Devlet zirvesi, barış sürecinin geleceği konusunda nihai kararı vermek üzere Cumhurbaşkanlığı Külliyesi'nde toplandı.",
        choices: [
            {
                text: "Gizli görüşmeleri sonlandırıp mecliste açık anayasa komisyonu kurun.",
                consequenceText: "Özgürlük +15%, Seküler +15%, Liberal +10%, Milliyetçi -20%. Siyasi Sermaye -10 PC.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            },
            {
                text: "Tüm sızıntılara rağmen gizli görüşmeleri sürdürme kararı alın.",
                consequenceText: "Kürt seçmenler +20%, İstikrar -15%, Milliyetçi -25%, Siyasi Sermaye +12 PC.",
                action: (s) => {
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 20);
                    s.stability = Math.max(0, s.stability - 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    return null;
                }
            },
            {
                text: "Operasyonları tırmandırıp sızıntının kaynağı olan istihbarat hücresini tasfiye edin.",
                consequenceText: "Güvenlik Bürokrasisi +15%, Ordu +12%, Kürt seçmenler -20%, Hazine -₺2.0B.",
                action: (s) => {
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 12);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 20);
                    s.treasury -= 2000000000;
                    return null;
                }
            },
            {
                text: "Süreci sonlandırıp muhalefet partileriyle 'Terörle Ortak Mücadele' deklarasyonu imzalayın.",
                consequenceText: "Milliyetçi +20%, Muhafazakar +15%, Kürt seçmenler -25%, Özgürlük -10%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    return null;
                }
            }
        ]
    },

    // --- CHAIN 2: MAFYA SIZINTISI ---
    mafia_leaks_start_c0_echo: {
        id: "mafia_leaks_start_c0_echo",
        title: "ZİNCİR - Kabinede İstifa Depremi ve Sızıntılar",
        desc: "Soruşturmanın başlamasının ardından, rüşvet suçlamalarıyla karşı karşıya kalan İçişleri Bakanı kameralar önünde istifa etti ve istifa ederken başbakanı da suçladı. Hükümet içinde kriz derinleşiyor.",
        choices: [
            {
                text: "[SORUŞTURMA] Bakan hakkında savcılık soruşturmasını derinleştirin, yargıya destek verin.",
                consequenceText: "Yargı +15%, Yolsuzluk -10%, Siyasi Sermaye -10 PC, Kabine sadakati -15. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 15);
                    }
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c0_part3_echo",
                        originTitle: "Kabine Depremi",
                        originChoiceText: "Soruşturmayı derinleştirmek"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Bakanın istifasını kabul edip yerine sert milliyetçi bir isim atayın.",
                consequenceText: "Milliyetçi +15%, Ordu +10%, Solcular -12%, Kürt seçmenler -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 12);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c0_part3_echo",
                        originTitle: "Kabine Depremi",
                        originChoiceText: "Milliyetçi bakan ataması"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Suçlamaları küresel lobilerin komplosu olarak niteleyip halkla mitingler yapın.",
                consequenceText: "Muhafazakar +15%, Siyasi Sermaye +15 PC, İstikrar -10%, Ekonomi -5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.stability = Math.max(0, s.stability - 10);
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c0_part3_echo",
                        originTitle: "Kabine Depremi",
                        originChoiceText: "Komplo söylemi ve mitingler"
                    });
                    return null;
                }
            },
            {
                text: "[GİZLİ] Bakanla perde arkasında anlaşıp onu sessiz kalması için yurt dışı elçiliğe atayın.",
                consequenceText: "Kabine sadakati +15, Yolsuzluk +12%, Özgürlük -10%, Yargı -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 15);
                    }
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c0_part3_echo",
                        originTitle: "Kabine Depremi",
                        originChoiceText: "Elçilik göreviyle susturmak"
                    });
                    return null;
                }
            }
        ]
    },
    mafia_leaks_start_c1_echo: {
        id: "mafia_leaks_start_c1_echo",
        title: "ZİNCİR - Sansür Karşıtı Sokak Protestoları ve Kaos",
        desc: "Mafya ifşaat videolarına getirilen erişim engelinin ardından, sosyal medyada örgütlenen gençlik grupları büyük şehirlerde sansür karşıtı eylemler başlattı. Polis ve göstericiler karşı karşıya.",
        choices: [
            {
                text: "[BASTIR] Eylemleri polis gücüyle sert şekilde dağıtın, liderlerini tutuklayın.",
                consequenceText: "Güvenlik +15%, Özgürlük -15%, Gençler -20%, Solcular -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c1_part3_echo",
                        originTitle: "Sansür Protestoları",
                        originChoiceText: "Polis gücüyle bastırmak"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Eylemcilerin temsilcilerini kabul edip sansür yasasını gevşetme sözü verin.",
                consequenceText: "Gençler +15%, Akademi +12%, Güvenlik Bürokrasisi -10%, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 12);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c1_part3_echo",
                        originTitle: "Sansür Protestoları",
                        originChoiceText: "Müzakere ve gevşetme sözü"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Gösterileri muhalefet partisinin kışkırttığını söyleyip onları suçlayın.",
                consequenceText: "Muhafazakar +12%, Milliyetçi +10%, Solcular -18%, İstikrar -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 12);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 18);
                    s.stability = Math.max(0, s.stability - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c1_part3_echo",
                        originTitle: "Sansür Protestoları",
                        originChoiceText: "Muhalefeti kışkırtıcılıkla suçlamak"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] İnternet bant daraltma uygulamasına son verip gerginliği düşürün.",
                consequenceText: "Özgürlük +12%, Gençler +12%, Medya +10%, Güvenlik -5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 12);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 12);
                    s.systems.media = Math.min(100, s.systems.media + 10);
                    s.systems.security = Math.max(0, s.systems.security - 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c1_part3_echo",
                        originTitle: "Sansür Protestoları",
                        originChoiceText: "Bant daraltmayı sonlandırmak"
                    });
                    return null;
                }
            }
        ]
    },
    mafia_leaks_start_c2_echo: {
        id: "mafia_leaks_start_c2_echo",
        title: "ZİNCİR - Milliyetçi Cephe Mitingleri ve Karşı Söylem",
        desc: "Videoları dış güçlerin saldırısı ilan etmenizin ardından, milliyetçi ve muhafazakar taban devasa 'Milli Egemenlik' mitingleri düzenledi. Ancak seküler kesim ve akademi bu söyleme sert tepki gösteriyor.",
        choices: [
            {
                text: "[BASTIR] Mitingleri sürdürün, vatan hainliği iddialarıyla muhalefete yüklenin.",
                consequenceText: "Siyasi Sermaye +15 PC, Milliyetçi +12%, Seküler -20%, İstikrar -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.stability = Math.max(0, s.stability - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c2_part3_echo",
                        originTitle: "Milli Egemenlik Mitingleri",
                        originChoiceText: "Muhalefete vatan hainliği suçlaması"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Ortamı yumuşatmak için bağımsız araştırma komisyonu kurup iddiaları inceleme sözü verin.",
                consequenceText: "Akademi +15%, Yargı +12%, Milliyetçi -10%, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c2_part3_echo",
                        originTitle: "Milli Egemenlik Mitingleri",
                        originChoiceText: "Bağımsız araştırma komisyonu sözü"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Savunma bütçesini artırıp ordu komutanlarıyla birlikte gövde gösterisi yapın.",
                consequenceText: "Ordu +20%, Milliyetçi +15%, Hazine -₺3.0B, Solcular -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.treasury -= 3000000000;
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c2_part3_echo",
                        originTitle: "Milli Egemenlik Mitingleri",
                        originChoiceText: "Savunma bütçesi ve ordu gövde gösterisi"
                    });
                    return null;
                }
            },
            {
                text: "[GİZLİ] Mafya liderini yakalamak için balkan ülkesine acil MİT operasyonu başlatın.",
                consequenceText: "Güvenlik +15%, Hazine -₺1.5B, Siyasi Sermaye -10 PC, NATO favor -10. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.treasury -= 1500000000;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c2_part3_echo",
                        originTitle: "Milli Egemenlik Mitingleri",
                        originChoiceText: "Balkanlarda gizli operasyon başlatmak"
                    });
                    return null;
                }
            }
        ]
    },
    mafia_leaks_start_c3_echo: {
        id: "mafia_leaks_start_c3_echo",
        title: "ZİNCİR - Mafyayla Pazarlık Skandalının Deşifre Olması",
        desc: "Mafya liderine gizli af teklif eden istihbarat görevlisinin ses kaydı yabancı basın organlarında manşet oldu. Ülke genelinde hükümetin mafyayla işbirliği yaptığı iddiaları infial yarattı.",
        choices: [
            {
                text: "[BASTIR] İddiaları yalanlayın, haberi yapan gazeteleri kapatın ve yabancı elçiyi uyarın.",
                consequenceText: "Medya -15%, Özgürlük -15%, Siyasi Sermaye -15 PC, İstikrar +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.media = Math.max(0, s.systems.media - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.stability = Math.min(100, s.stability + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c3_part3_echo",
                        originTitle: "Pazarlık Skandalı",
                        originChoiceText: "Medya kapatılması ve reddetme"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Müzakereyi yürüten istihbarat daire başkanını görevden alıp yargılanmasını sağlayın.",
                consequenceText: "Yargı +15%, Güvenlik Bürokrasisi -15%, Siyasi Sermaye -10 PC, Yolsuzluk -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c3_part3_echo",
                        originTitle: "Pazarlık Skandalı",
                        originChoiceText: "İstihbarat daire başkanını yargılatmak"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Masada suç ortaklığı olmadığını, mafyayı tasfiye etmek için tuzak kurulduğunu açıklayın.",
                consequenceText: "İstikrar +8%, Muhafazakar +10%, Seküler -12%, Yargı -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 12);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c3_part3_echo",
                        originTitle: "Pazarlık Skandalı",
                        originChoiceText: "Tuzak açıklaması ile taviz"
                    });
                    return null;
                }
            },
            {
                text: "[GİZLİ] Hükümetin meşruiyetini tazelemek amacıyla erken seçim sürecini tartışmaya açın.",
                consequenceText: "Siyasi Sermaye -20 PC, İstikrar -15%, Liberal +12%, Seküler +10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                    s.stability = Math.max(0, s.stability - 15);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 12);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "mafia_leaks_c3_part3_echo",
                        originTitle: "Pazarlık Skandalı",
                        originChoiceText: "Erken seçim tartışması başlatmak"
                    });
                    return null;
                }
            }
        ]
    },
    mafia_leaks_c0_part3_echo: {
        id: "mafia_leaks_c0_part3_echo",
        title: "ZİNCİR - Temiz Eller Operasyonu ve Yeni Yargı Reformu",
        desc: "Kabine depreminin ardından yargı süreci sonlandı. Yolsuzluk ağına bulaşmış onlarca bürokrat ve holding patronu yargılandı. Kamu yönetiminde yeni bir dönem başlıyor.",
        choices: [
            {
                text: "Yolsuzlukla mücadele yasasını sertleştirin, şeffaflık kuralları getirin.",
                consequenceText: "Yolsuzluk -20%, Özgürlük +15%, Seküler +15%, Büyük Sermaye favor -20, Hazine -₺1.0B.",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 20);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.treasury -= 1000000000;
                    return null;
                }
            },
            {
                text: "Yargı sürecini burada kesin, bürokraside daha fazla tasfiye yapmayın.",
                consequenceText: "İstikrar +10%, Kabine sadakati +15, Yolsuzluk +10%, Seküler -15%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 15);
                    }
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    return null;
                }
            },
            {
                text: "Suçlanan holdinglerin varlıklarını kamulaştırıp devlete devredin.",
                consequenceText: "Hazine +₺5.0B, Solcular +20%, İşçiler +15%, Büyük Sermaye favor -30, Ekonomi -10%.",
                action: (s) => {
                    s.treasury += 5000000000;
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 30);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    return null;
                }
            },
            {
                text: "Süreci kabine revizyonuyla sınırlı tutup normal gündeme dönün.",
                consequenceText: "İstikrar +5%, Siyasi Sermaye +10 PC, Seküler -5%, Yolsuzluk +5%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 5);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    return null;
                }
            }
        ]
    },
    mafia_leaks_c1_part3_echo: {
        id: "mafia_leaks_c1_part3_echo",
        title: "ZİNCİR - Medya ve İnternet Yasasının Nihai Durumu",
        desc: "Sansür eylemlerinin ardından internet özgürlüğü ve medya denetimi yasası nihai oylama için meclise geldi. Alacağınız karar dijital çağın kurallarını belirleyecek.",
        choices: [
            {
                text: "İnternet yasasını tamamen geri çekip tam özgürlük ilan edin.",
                consequenceText: "Özgürlük +25%, Gençler +20%, Seküler +15%, Güvenlik Bürokrasisi -15%, Medya -10%.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 25);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 15);
                    s.systems.media = Math.max(0, s.systems.media - 10);
                    return null;
                }
            },
            {
                text: "İnterneti devlet kontrolünde bir kapalı ağ altyapısına taşıyın.",
                consequenceText: "Güvenlik +20%, Medya +15%, Özgürlük -25%, Gençler -25%, Sebataycı favor -20.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 20);
                    s.systems.media = Math.min(100, s.systems.media + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 25);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 25);
                    s.regimeWatch.sebataycilar.favor = Math.max(0, s.regimeWatch.sebataycilar.favor - 20);
                    return null;
                }
            },
            {
                text: "Sosyal medya şirketlerine temsilcilik ve vergilendirme zorunluluğu getirin.",
                consequenceText: "Hazine +₺1.5B, İstikrar +8%, Liberal -10%, Gençler -8%.",
                action: (s) => {
                    s.treasury += 1500000000;
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 10);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 8);
                    return null;
                }
            },
            {
                text: "Sadece nefret söylemi ve yalan haberleri kapsayan dar bir denetim uygulayın.",
                consequenceText: "İstikrar +5%, Güvenlik +5%, Özgürlük -5%, Siyasi Sermaye +10 PC.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.systems.security = Math.min(100, s.systems.security + 5);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 5);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    return null;
                }
            }
        ]
    },
    mafia_leaks_c2_part3_echo: {
        id: "mafia_leaks_c2_part3_echo",
        title: "ZİNCİR - Dış Tehdit Mücadelesinin Siyasi Faturası",
        desc: "Milli Egemenlik söyleminin ardından mafya liderinin sığındığı balkan ülkesindeki gizli hücreye düzenlenen MİT operasyonu tamamlandı. Sonuçlar hükümetin kaderini etkiliyor.",
        choices: [
            {
                text: "Mafya liderini teslim alıp büyük bir şovla yargılamaya başlayın.",
                consequenceText: "Siyasi Sermaye +25 PC, Milliyetçi +20%, Muhafazakar +15%, Yargı +15%, İstikrar +10%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 25);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.stability = Math.min(100, s.stability + 10);
                    return null;
                }
            },
            {
                text: "Operasyonun diplomatik kriz yaratması üzerine geri çekilin ve uzlaşın.",
                consequenceText: "İstikrar +5%, NATO favor +15, Milliyetçi -15%, Ordu -12%, Siyasi Sermaye -15 PC.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "Karşı ülkeye ekonomik ambargo koyarak milliyetçi söylemi sürdürün.",
                consequenceText: "Milliyetçi +15%, Ekonomi -10%, Hazine -₺1.0B, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.treasury -= 1000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    return null;
                }
            },
            {
                text: "Operasyonu başarı olarak ilan edip konuyu tamamen kapatın.",
                consequenceText: "İstikrar +8%, Güvenlik +8%, Siyasi Sermaye +5 PC, Hazine -₺500M.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.systems.security = Math.min(100, s.systems.security + 8);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 5);
                    s.treasury -= 500000000;
                    return null;
                }
            }
        ]
    },
    mafia_leaks_c3_part3_echo: {
        id: "mafia_leaks_c3_part3_echo",
        title: "ZİNCİR - Gizli Af Anlaşması ve Devlet Olağanüstü Meclisi",
        desc: "Mafyayla gizli pazarlık krizinin sonuna gelindi. Meclis, hükümetin meşruiyeti ve istikrarı konusunda nihai oylama yapmaya hazırlanıyor.",
        choices: [
            {
                text: "Güvenoyunu tazelemek için kabinede geniş çaplı teknokrat reformu yapın.",
                consequenceText: "İstikrar +15%, Akademi +15%, Seküler +10%, Siyasi Sermaye -10 PC, Kabine sadakati -10.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                    return null;
                }
            },
            {
                text: "Güvenoyu oylamasını engellemek için meclisi askıya alın.",
                consequenceText: "Özgürlük -30%, Medya -20%, Siyasi Sermaye +20 PC, Seküler -25%, Solcular -25%.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 30);
                    s.systems.media = Math.max(0, s.systems.media - 20);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 20);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 25);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 25);
                    return null;
                }
            },
            {
                text: "Muhalefetle kapalı kapılar ardında yeni bir anayasa protokolü imzalayın.",
                consequenceText: "İstikrar +12%, Liberal +15%, Milliyetçi -15%, Cemaatler favor -15.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 12);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                    return null;
                }
            },
            {
                text: "Erken seçime giderek halkın kararını hakem kılın.",
                consequenceText: "Özgürlük +15%, Seküler +15%, Gençler +15%, Hazine -₺4.0B, Siyasi Sermaye -20 PC.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.treasury -= 4000000000;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                    return null;
                }
            }
        ]
    },

    // --- CHAIN 3: CEMAAT SIZMASI ---
    cemaat_infiltration_start_c0_echo: {
        id: "cemaat_infiltration_start_c0_echo",
        title: "ZİNCİR - Emniyet Tasfiyesi ve Gizli Belge Sızıntısı",
        desc: "Emniyetteki cemaat üyelerinin tasfiyesinin ardından, sızdırılan gizli belgelerde hükümet liderlerinin vergi kaçırma iddiaları basına düştü.",
        choices: [
            {
                text: "[BASTIR] İddiaları sert şekilde reddedin ve sızıntı kaynağı vakıfları kapatın.",
                consequenceText: "Medya -12%, Özgürlük -10%, Cemaatler favor -20, İstikrar +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.media = Math.max(0, s.systems.media - 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    s.stability = Math.min(100, s.stability + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c0_part3_echo",
                        originTitle: "Emniyet Tasfiyesi",
                        originChoiceText: "Vakıfları kapatmak ve reddetmek"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Mal varlığını incelemek üzere bağımsız bir vergi müfettiş heyeti atayın.",
                consequenceText: "Yargı +15%, Yolsuzluk -10%, Siyasi Sermaye -10 PC, Muhafazakar -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c0_part3_echo",
                        originTitle: "Emniyet Tasfiyesi",
                        originChoiceText: "Vergi müfettiş heyeti ataması"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Suçu cemaatle işbirliği yapan dış güçlere atıp milliyetçi söylem başlatın.",
                consequenceText: "Milliyetçi +15%, Siyasi Sermaye +12 PC, İstikrar -8%, Ekonomi -5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    s.stability = Math.max(0, s.stability - 8);
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c0_part3_echo",
                        originTitle: "Emniyet Tasfiyesi",
                        originChoiceText: "Dış güçler söylemi ve milliyetçilik"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Tasfiye edilen polislerin yerine seküler/laik klikten kadrolar atayın.",
                consequenceText: "Kemalist favor +20, Seküler +15%, Cemaatler favor -15, Muhafazakar -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c0_part3_echo",
                        originTitle: "Emniyet Tasfiyesi",
                        originChoiceText: "Seküler kadroların atanması"
                    });
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_start_c1_echo: {
        id: "cemaat_infiltration_start_c1_echo",
        title: "ZİNCİR - Cemaatin Devlet Kurumlarında Mutlak Gücü",
        desc: "Raporun örtbas edilmesinin ardından, cemaat emniyet ve yargı atamalarında kendi adaylarını dayatmaya başladı. Yargıtay'daki Kemalist üyeler bu duruma beyaz protesto ile karşılık veriyor.",
        choices: [
            {
                text: "[BASTIR] Cemaatin taleplerini kabul edin, yargı atamalarını onların listesine göre yapın.",
                consequenceText: "Cemaatler favor +20, Muhafazakar +10%, Kemalist favor -25, Özgürlük -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 20);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.max(0, s.regimeWatch.kemalist_burokrasi.favor - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c1_part3_echo",
                        originTitle: "Cemaat Mutlak Gücü",
                        originChoiceText: "Cemaat listesine göre atama"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Gecikmeli de olsa tasfiye sürecini başlatıp cemaat liderlerini tutuklatın.",
                consequenceText: "Seküler +15%, Yargı +12%, Cemaatler favor -25, İstikrar -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 12);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.stability = Math.max(0, s.stability - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c1_part3_echo",
                        originTitle: "Cemaat Mutlak Gücü",
                        originChoiceText: "Gecikmeli tasfiye ve tutuklama"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Kemalist üyelerle masaya oturup ortak denge formülü yaratın.",
                consequenceText: "İstikrar +10%, Kemalist favor +15, Cemaatler favor -12%, Yargı +8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c1_part3_echo",
                        originTitle: "Cemaat Mutlak Gücü",
                        originChoiceText: "Kemalistlerle denge formülü"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Konuyu çözmek amacıyla Adalet Bakanını görevden alıp suçu ona yıkın.",
                consequenceText: "Kabine sadakati -12, Yolsuzluk -5%, Yargı +8%, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 12);
                    }
                    s.systems.corruption = Math.max(0, s.systems.corruption - 5);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 8);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c1_part3_echo",
                        originTitle: "Cemaat Mutlak Gücü",
                        originChoiceText: "Adalet Bakanının tasfiyesi"
                    });
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_start_c2_echo: {
        id: "cemaat_infiltration_start_c2_echo",
        title: "ZİNCİR - Kamu İhalelerinde Yolsuzluk Soruşturması",
        desc: "Cemaat holdinglerine verilen ihaleler, Sayıştay denetçileri tarafından usulsüzlük raporuyla meclise sunuldu. Muhalefet ve kamuoyu büyük bir soygun iddiasıyla ayakta.",
        choices: [
            {
                text: "[BASTIR] Sayıştay raporunu iptal edin, denetçileri görevden uzaklaştırın.",
                consequenceText: "Yolsuzluk +15%, Özgürlük -15%, Siyasi Sermaye -15 PC, Cemaatler favor +12. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c2_part3_echo",
                        originTitle: "İhale Usulsüzlüğü",
                        originChoiceText: "Sayıştay raporunu iptal etmek"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Usulsüzlük yapılan ihaleleri iptal edip cemaat şirketlerine ceza kesin.",
                consequenceText: "Yolsuzluk -12%, Yargı +15%, Cemaatler favor -25, Hazine +₺2.0B. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.treasury += 2000000000;
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c2_part3_echo",
                        originTitle: "İhale Usulsüzlüğü",
                        originChoiceText: "İhalelerin iptal edilmesi ve ceza"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] İhaleleri incelemek için mecliste şeffaf bir komisyon kurun.",
                consequenceText: "Akademi +12%, Liberal +10%, Siyasi Sermaye +10 PC, İstikrar -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 12);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.stability = Math.max(0, s.stability - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c2_part3_echo",
                        originTitle: "İhale Usulsüzlüğü",
                        originChoiceText: "Şeffaf meclis komisyonu"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Cemaatin ihaleler karşılığında devlete yapacağı bağış kampanyası düzenleyin.",
                consequenceText: "Hazine +₺3.0B, Muhafazakar +10%, Seküler -15%, Yolsuzluk +8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury += 3000000000;
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c2_part3_echo",
                        originTitle: "İhale Usulsüzlüğü",
                        originChoiceText: "Karşılıklı bağış kampanyası"
                    });
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_start_c3_echo: {
        id: "cemaat_infiltration_start_c3_echo",
        title: "ZİNCİR - Askeri Şurada Cemaat Hesaplaşması ve Kriz",
        desc: "Konunun MGK'ya taşınmasının ardından, ordu komutanlığı cemaat bağlantılı tüm subay ve polis şeflerinin ihraç edilmesini talep eden bir muhtıra taslağı hazırladı.",
        choices: [
            {
                text: "[BASTIR] Ordunun talebini kabul edip tüm ihraçları hemen imzalayın.",
                consequenceText: "Ordu +25%, Kemalist favor +20, Cemaatler favor -30, Muhafazakar -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 25);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 20);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 30);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c3_part3_echo",
                        originTitle: "MGK Muhtıra Taslağı",
                        originChoiceText: "İhraç listelerini imzalamak"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Muhtırayı reddedin, askeri şuranın yetkilerini daraltacak yasa çıkarın.",
                consequenceText: "Siyasi Sermaye +15 PC, Ordu -25%, Özgürlük -10%, Cemaatler favor +15. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c3_part3_echo",
                        originTitle: "MGK Muhtıra Taslağı",
                        originChoiceText: "Şura yetkilerini daraltmak"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Şurada uzlaşı arayın, sadece radikal isimleri ihraç edip süreci yumuşatın.",
                consequenceText: "İstikrar +10%, Ordu +10%, Cemaatler favor -12%, Muhafazakar -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 12);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c3_part3_echo",
                        originTitle: "MGK Muhtıra Taslağı",
                        originChoiceText: "Kısmi ihraç ve yumuşama"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Orduyu yatıştırmak için savunma sanayii yatırımlarına ek kaynak aktarın.",
                consequenceText: "Ordu +15%, Hazine -₺3.0B, Milliyetçi +12%, Ekonomi +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.treasury -= 3000000000;
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.systems.economy = Math.min(100, s.systems.economy + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "cemaat_infiltration_c3_part3_echo",
                        originTitle: "MGK Muhtıra Taslağı",
                        originChoiceText: "Savunma yatırımlarına kaynak"
                    });
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_c0_part3_echo: {
        id: "cemaat_infiltration_c0_part3_echo",
        title: "ZİNCİR - Liyakat ve Bürokrasi Yeniden Yapılanması",
        desc: "Bürokrasi krizinin ardından devletin yönetim şeması yeniden çizildi. Liyakat esaslı atamalar veya kliklerin gücü onaylanmak üzere.",
        choices: [
            {
                text: "Kamuya alımlarda mülakat sistemini kaldırıp tamamen liyakatli sınav sistemine geçin.",
                consequenceText: "Özgürlük +20%, Seküler +15%, Gençler +15%, Cemaatler favor -20, Kabine sadakati -10.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                    return null;
                }
            },
            {
                text: "Mülakat sistemini koruyun, kadroları kendi sadık destekçilerinizle doldurun.",
                consequenceText: "Kabine sadakati +15, Siyasi Sermaye +15 PC, Seküler -20%, Gençler -15%, Yolsuzluk +10%.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 15);
                    }
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    return null;
                }
            },
            {
                text: "Liyakat reformunu rafa kaldırıp eski denge sistemine devam edin.",
                consequenceText: "İstikrar +10%, Yolsuzluk +5%, Siyasi Sermaye +5 PC, Seküler -5%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 5);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 5);
                    return null;
                }
            },
            {
                text: "Kamuda her klikten dengeli bir koalisyon yönetimi kurun.",
                consequenceText: "İstikrar +12%, Kemalist favor +10, Cemaatler favor +10, Siyasi Sermaye -10 PC.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 12);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 10);
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_c1_part3_echo: {
        id: "cemaat_infiltration_c1_part3_echo",
        title: "ZİNCİR - Cemaat Vesayeti ve Devletin Yeni Rejimi",
        desc: "Cemaatin gücünün zirveye ulaşmasıyla birlikte, devlet organlarındaki laik-seküler bürokratlar tamamen tasfiye edildi. Yeni bir idari rejim kuruluyor.",
        choices: [
            {
                text: "Dini cemaatlerin vakıf ve eğitim kurumlarını devlet denetimine alın, kontrolü sağlayın.",
                consequenceText: "Güvenlik +15%, Seküler +15%, Cemaatler favor -25, Muhafazakar -15%, Hazine -₺1.0B.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 15);
                    s.treasury -= 1000000000;
                    return null;
                }
            },
            {
                text: "Rejimi tamamen cemaatlerin desteğiyle yürütecek yasal değişiklikler yapın.",
                consequenceText: "Muhafazakar +20%, Cemaatler favor +25, Kemalist favor -30, Özgürlük -20%, Ordu -20%.",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 20);
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 25);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.max(0, s.regimeWatch.kemalist_burokrasi.favor - 30);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 20);
                    return null;
                }
            },
            {
                text: "Cemaat vesayetine karşı orduyla gizli ittifak yapıp temizlik planlayın.",
                consequenceText: "Ordu +20%, Kemalist favor +20, Cemaatler favor -25, İstikrar -15%, Siyasi Sermaye -15 PC.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 20);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.stability = Math.max(0, s.stability - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "Süreci izlemekle yetinin, mevcut güç dengesini korumaya çalışın.",
                consequenceText: "İstikrar +5%, Siyasi Sermaye +5 PC, Yolsuzluk +5%, Seküler -8%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 5);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 8);
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_c2_part3_echo: {
        id: "cemaat_infiltration_c2_part3_echo",
        title: "ZİNCİR - İhale Reformu ve Büyük Sermaye İttifakı",
        desc: "İhale yolsuzluğu krizinin ardından, serbest piyasa standartlarına ve kamu ihale kanununa geri dönülmesi talepleri gündemde.",
        choices: [
            {
                text: "Kamu ihale kanununu AB standartlarında revize edip ayrıcalıkları kaldırın.",
                consequenceText: "Büyük Sermaye favor +25, Yolsuzluk -15%, Seküler +12%, Cemaatler favor -20, Hazine -₺500M.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 25);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 12);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    s.treasury -= 500000000;
                    return null;
                }
            },
            {
                text: "Ayrıcalıklı ihale sistemini koruyup yandaş holdingleri büyütmeye devam edin.",
                consequenceText: "Kabine sadakati +15, Cemaatler favor +15, Büyük Sermaye favor -20, Yolsuzluk +12%, Ekonomi -5%.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 15);
                    }
                    s.regimeWatch.cemaatler.favor = Math.min(100, s.regimeWatch.cemaatler.favor + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    return null;
                }
            },
            {
                text: "İhalelerde sadece yerli ve milli savunma şirketlerine imtiyaz tanıyın.",
                consequenceText: "Ordu +15%, Milliyetçi +15%, Hazine -₺2.0B, Liberal -10%.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.treasury -= 2000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 10);
                    return null;
                }
            },
            {
                text: "Sayıştay'ın denetim yetkilerini kısıtlayan yeni bir yasa çıkarın.",
                consequenceText: "Yolsuzluk +15%, Yargı -15%, Siyasi Sermaye +10 PC, Özgürlük -10%.",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    return null;
                }
            }
        ]
    },
    cemaat_infiltration_c3_part3_echo: {
        id: "cemaat_infiltration_c3_part3_echo",
        title: "ZİNCİR - Askeri Vesayet vs. Sivil Rejim Denge Raporu",
        desc: "MGK krizinin ve ihraçların ardından askeri vesayet ile sivil hükümet arasındaki güç savaşı nihai aşamasına ulaştı.",
        choices: [
            {
                text: "Ordu üzerindeki sivil denetimi artıracak anayasa paketini referanduma götürün.",
                consequenceText: "Özgürlük +15%, Seküler +15%, Ordu -20%, Siyasi Sermaye -15 PC, Hazine -₺4.0B.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.treasury -= 4000000000;
                    return null;
                }
            },
            {
                text: "Ordunun tüm taleplerine boyun eğip sivil otoriteden taviz verin.",
                consequenceText: "Ordu +20%, Kemalist favor +20, Siyasi Sermaye -25 PC, Muhafazakar -20%, Cemaatler favor -20.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 20);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    return null;
                }
            },
            {
                text: "Komuta kademesinde geniş çaplı emeklilik operasyonuyla kendi generallerinizi atayın.",
                consequenceText: "Siyasi Sermaye +15 PC, Ordu -15%, İstikrar -15%, Kemalist favor -20, Güvenlik +10%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 15);
                    s.stability = Math.max(0, s.stability - 15);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.max(0, s.regimeWatch.kemalist_burokrasi.favor - 20);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    return null;
                }
            },
            {
                text: "Askeri mahkemeleri yeniden kurup sivil yargı yetkisini sınırlayın.",
                consequenceText: "Ordu +15%, Yargı -15%, Özgürlük -15%, Siyasi Sermaye -10 PC.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            }
        ]
    },

    // --- CHAIN 4: FİNANS KRİZİ ---
    finance_credit_squeeze_start_c0_echo: {
        id: "finance_credit_squeeze_start_c0_echo",
        title: "ZİNCİR - IMF Sıkılaştırması ve Sosyal Huzursuzluk",
        desc: "IMF anlaşması çerçevesinde kamu çalışanlarının maaş zamlarının dondurulması ve emeklilik yaşının yükseltilmesi, sendikaları sokağa döktü. Büyük şehirlerde genel grev var.",
        choices: [
            {
                text: "[BASTIR] Grevi yasadışı ilan edip polis müdahalesiyle sendika liderlerini gözaltına alın.",
                consequenceText: "Güvenlik +12%, Özgürlük -15%, İşçiler -25%, Büyük Sermaye favor +12. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 25);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c0_part3_echo",
                        originTitle: "IMF Sıkılaştırması",
                        originChoiceText: "Grev yasağı ve polis müdahalesi"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] IMF ile görüşmeleri askıya alıp kemer sıkma tedbirlerini gevşetin.",
                consequenceText: "İşçiler +15%, Emekliler +12%, Hazine -₺3.0B, Enflasyon +10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.voterGroups.retirees.approval = Math.min(100, s.voterGroups.retirees.approval + 12);
                    s.treasury -= 3000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c0_part3_echo",
                        originTitle: "IMF Sıkılaştırması",
                        originChoiceText: "Kemer sıkmayı askıya almak"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Sendikalarla anlaşıp emeklilik yaş sınırını koruyun, vergileri artırın.",
                consequenceText: "Emekliler +15%, Büyük Sermaye favor -15, Hazine +₺1.5B, Ekonomi -5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.retirees.approval = Math.min(100, s.voterGroups.retirees.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.treasury += 1500000000;
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c0_part3_echo",
                        originTitle: "IMF Sıkılaştırması",
                        originChoiceText: "Emeklilik yaş sınırını koruyup vergilemek"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Kamuda tasarrufu artırmak için lüks makam araçlarını ve saray bütçesini kısın.",
                consequenceText: "Halk mutluluğu +15%, Siyasi Sermaye +12 PC, Hazine +₺800M, Kabine sadakati -10. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    s.treasury += 800000000;
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c0_part3_echo",
                        originTitle: "IMF Sıkılaştırması",
                        originChoiceText: "Lüks makam araçları ve bütçe kesintisi"
                    });
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_start_c1_echo: {
        id: "finance_credit_squeeze_start_c1_echo",
        title: "ZİNCİR - Sermaye Sıkışıklığı ve Bankacılık Alarmı",
        desc: "Döviz alımına ve yurt dışı transferlerine getirilen kısıtlamaların ardından, ülkede karaborsa döviz piyasası oluştu ve yabancı bankalar Türkiye'deki kredi hatlarını dondurdu.",
        choices: [
            {
                text: "[BASTIR] Sermaye kontrollerini daha da sıkılaştırın, döviz bulundurmayı suç sayın.",
                consequenceText: "Özgürlük -20%, Ekonomi -15%, Büyük Sermaye favor -25, Hazine korunur. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.systems.economy = Math.max(0, s.systems.economy - 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c1_part3_echo",
                        originTitle: "Sermaye Sıkışıklığı",
                        originChoiceText: "Döviz bulundurma yasağı"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Kontrolleri tamamen kaldırıp serbest kur rejimine geri dönün, faizi artırın.",
                consequenceText: "Büyük Sermaye favor +20, Ekonomi +10%, Hazine -₺2.0B, Enflasyon -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.treasury -= 2000000000;
                    s.systems.inflation = Math.max(0, s.systems.inflation - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c1_part3_echo",
                        originTitle: "Sermaye Sıkışıklığı",
                        originChoiceText: "Serbest kur rejimine geri dönüş"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] İhracatçı şirketlerin döviz gelirlerinin %80'ine el koyarak bütçeyi fonlayın.",
                consequenceText: "Hazine +₺4.0B, Büyük Sermaye favor -25, Ekonomi -10%, İşçiler +8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury += 4000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c1_part3_echo",
                        originTitle: "Sermaye Sıkışıklığı",
                        originChoiceText: "İhracatçı döviz gelirlerine el konması"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Körfez ülkelerinden swap anlaşmalarıyla acil döviz desteği arayın.",
                consequenceText: "Hazine +₺2.5B, İstikrar +10%, Milliyetçi -12%, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury += 2500000000;
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c1_part3_echo",
                        originTitle: "Sermaye Sıkışıklığı",
                        originChoiceText: "Körfez swap anlaşmaları"
                    });
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_start_c2_echo: {
        id: "finance_credit_squeeze_start_c2_echo",
        title: "ZİNCİR - Yabancı Yatırımcının Kamu Kurumu Yönetimi Krizi",
        desc: "Körfez fonlarına satılan ana limanlar ve telekomünikasyon altyapısında çalışan yerli mühendislerin işten çıkarılması ve yüksek zamlar halkta büyük tepki yarattı.",
        choices: [
            {
                text: "[BASTIR] Özelleştirme sözleşmesine dayanarak işten çıkarmaları onaylayın, asayişi koruyun.",
                consequenceText: "Büyük Sermaye favor +15, Güvenlik +10%, İşçiler -20%, Solcular -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c2_part3_echo",
                        originTitle: "Özelleştirme ve Yönetim",
                        originChoiceText: "İşten çıkarmaların onaylanması"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Şirket yönetimine kayyum atayarak satışı iptal etmekle tehdit edin.",
                consequenceText: "Milliyetçi +15%, Ordu +12%, Büyük Sermaye favor -25, İstikrar -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.stability = Math.max(0, s.stability - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c2_part3_echo",
                        originTitle: "Özelleştirme ve Yönetim",
                        originChoiceText: "Kayyum tehdidi ve gerilim"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Çıkarılan işçilere tazminat ödenmesi için devlet bütçesinden fon ayırın.",
                consequenceText: "İşçiler +15%, Hazine -₺1.5B, Halk mutluluğu +8%, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.treasury -= 1500000000;
                    s.systems.happiness = Math.min(100, s.systems.happiness + 8);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c2_part3_echo",
                        originTitle: "Özelleştirme ve Yönetim",
                        originChoiceText: "Hazine destekli işçi tazminatları"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Yabancı sahiplerle masaya oturup yerli çalışan kotası getiren ek protokol imzalayın.",
                consequenceText: "İstikrar +8%, Liberal +10%, Milliyetçi +10%, Hazine -₺500M. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    s.treasury -= 500000000;
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c2_part3_echo",
                        originTitle: "Özelleştirme ve Yönetim",
                        originChoiceText: "Yerli çalışan kota protokolü"
                    });
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_start_c3_echo: {
        id: "finance_credit_squeeze_start_c3_echo",
        title: "ZİNCİR - Temerrüt Sonrası Dış Ticaret Ambargoları ve Daralma",
        desc: "Borçların ödenemeyeceğinin açıklanmasının ardından, uluslararası finans kuruluşları Türkiye'nin ithalat akreditiflerini iptal etti. Limanlarda hammadde bekleyen fabrikalar üretimi durduruyor.",
        choices: [
            {
                text: "[BASTIR] Sanayide acil durum ilan edip hammadde dağıtımını devlet kontrolüne alın.",
                consequenceText: "Ekonomi -15%, Özgürlük -15%, Solcular +12%, Büyük Sermaye favor -20. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.economy = Math.max(0, s.systems.economy - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c3_part3_echo",
                        originTitle: "Temerrüt ve Ambargo",
                        originChoiceText: "Sanayi acil durumu ve devlet dağıtımı"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Acilen Batılı kreditörlerle masaya oturup borç yapılandırma anlaşması yapın.",
                consequenceText: "İstikrar +12%, Büyük Sermaye favor +15, Hazine -₺2.0B, Enflasyon -5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.treasury -= 2000000000;
                    s.systems.inflation = Math.max(0, s.systems.inflation - 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c3_part3_echo",
                        originTitle: "Temerrüt ve Ambargo",
                        originChoiceText: "Kreditörlerle yapılandırma anlaşması"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Rusya ve Çin ile alternatif finans sistemi (BRICS) ortaklığı imzalayın.",
                consequenceText: "Milliyetçi +15%, NATO favor -25, Hazine +₺1.5B, Liberal -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 25);
                    s.treasury += 1500000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c3_part3_echo",
                        originTitle: "Temerrüt ve Ambargo",
                        originChoiceText: "BRICS ortaklığı ve Doğu ekseni"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Hazine altın rezervlerini iç piyasaya sürerek nakit akışını canlandırın.",
                consequenceText: "Hazine -₺3.0B, Ekonomi +10%, Enflasyon +8%, Siyasi Sermaye +10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury -= 3000000000;
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 8);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "finance_credit_squeeze_c3_part3_echo",
                        originTitle: "Temerrüt ve Ambargo",
                        originChoiceText: "Altın rezervlerinin piyasaya sürülmesi"
                    });
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_c0_part3_echo: {
        id: "finance_credit_squeeze_c0_part3_echo",
        title: "ZİNCİR - Refah ve Ekonomik Reform Planının Kapanışı",
        desc: "IMF programının ve protestoların ardından bütçe dengesi kuruldu ancak halkın satın alma gücü sert düştü. Ekonomik programın nihai faturası kesiliyor.",
        choices: [
            {
                text: "Elde edilen bütçe fazlasını memur ve emekli maaşlarına ek zam olarak dağıtın.",
                consequenceText: "Emekliler +20%, İşçiler +15%, Hazine -₺3.0B, Enflasyon +8%, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.voterGroups.retirees.approval = Math.min(100, s.voterGroups.retirees.approval + 20);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.treasury -= 3000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 8);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    return null;
                }
            },
            {
                text: "Parasal sıkılaştırmayı bozmayın, enflasyonu düşürmek için faizi koruyun.",
                consequenceText: "Enflasyon -15%, Büyük Sermaye favor +20, İşçiler -15%, Emekliler -15%.",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 15);
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 15);
                    return null;
                }
            },
            {
                text: "İşletme vergilerini düşürerek iş dünyasını canlandırın.",
                consequenceText: "Büyük Sermaye favor +25, Ekonomi +15%, Hazine -₺1.5B, Solcular -12%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 25);
                    s.systems.economy = Math.min(100, s.systems.economy + 15);
                    s.treasury -= 1500000000;
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 12);
                    return null;
                }
            },
            {
                text: "IMF programını erken sonlandırıp seçim ekonomisine geçin.",
                consequenceText: "Halk mutluluğu +15%, Siyasi Sermaye +15 PC, Hazine -₺4.0B, Enflasyon +12%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.treasury -= 4000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 12);
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_c1_part3_echo: {
        id: "finance_credit_squeeze_c1_part3_echo",
        title: "ZİNCİR - Mali Piyasaların İstikrar Raporu ve Serbest Kurlar",
        desc: "Döviz krizi ve kontrollerin ardından finans sektörü yeni bir denge noktasına ulaştı. Bankaların likidite durumu kritik.",
        choices: [
            {
                text: "Özel bankalara sermaye desteği vererek onları devlet kontrolüne yaklaştırın.",
                consequenceText: "Güvenlik +12%, Yolsuzluk +5%, Hazine -₺2.5B, Büyük Sermaye favor -20, Liberal -15%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    s.treasury -= 2500000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    return null;
                }
            },
            {
                text: "Serbest piyasa faiz sistemine tam geçiş yapıp bankacılık sektörünü serbest bırakın.",
                consequenceText: "Liberal +20%, Büyük Sermaye favor +20, Ekonomi +10%, Hazine -₺1.0B, Enflasyon +5%.",
                action: (s) => {
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 20);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.treasury -= 1000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                    return null;
                }
            },
            {
                text: "Hazine kontrolünde tek bir devlet bankası birleşmesi gerçekleştirin.",
                consequenceText: "Hazine +₺3.0B, Solcular +15%, Büyük Sermaye favor -15, Özgürlük -10%.",
                action: (s) => {
                    s.treasury += 3000000000;
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    return null;
                }
            },
            {
                text: "Kripto para ve alternatif dijital finans yatırımlarını tamamen yasaklayın.",
                consequenceText: "Güvenlik +10%, Gençler -18%, Liberal -12%, Yolsuzluk -5%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 18);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 12);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 5);
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_c2_part3_echo: {
        id: "finance_credit_squeeze_c2_part3_echo",
        title: "ZİNCİR - Kamu İktisadi Teşebbüslerinin Yeniden Kazanılması",
        desc: "Stratejik kurumların özelleştirilmesi tartışmalarının sonunda altyapı güvenliği raporu meclise sunuldu.",
        choices: [
            {
                text: "Stratejik altyapı satışlarını anayasal olarak yasaklayan yeni bir madde çıkarın.",
                consequenceText: "Milliyetçi +20%, Solcular +20%, Hazine -₺2.0B, Liberal -15%, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.treasury -= 2000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    return null;
                }
            },
            {
                text: "Özelleştirme programını enerji ve su sektörlerini de kapsayacak şekilde genişletin.",
                consequenceText: "Hazine +₺6.0B, Liberal +15%, Büyük Sermaye favor +20, Solcular -25%, İşçiler -20%.",
                action: (s) => {
                    s.treasury += 6000000000;
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 25);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                    return null;
                }
            },
            {
                text: "Satılan kurumların altın hissesini devlette tutacak yasal düzenleme yapın.",
                consequenceText: "İstikrar +10%, Milliyetçi +10%, Hazine bütçesi korunur. Liberal -5%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 5);
                    return null;
                }
            },
            {
                text: "Yabancı ortaklı altyapı projelerine hazine garantili ödeme yapmaya devam edin.",
                consequenceText: "Kabine sadakati +10, Büyük Sermaye favor +12, Hazine -₺3.0B, Yolsuzluk +8%.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 10);
                    }
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 12);
                    s.treasury -= 3000000000;
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    return null;
                }
            }
        ]
    },
    finance_credit_squeeze_c3_part3_echo: {
        id: "finance_credit_squeeze_c3_part3_echo",
        title: "ZİNCİR - Yeniden Yapılanma Anlaşması ve Borç Yönetimi",
        desc: "Temerrüt krizinin ardından uluslararası konsorsiyumla borç erteleme görüşmeleri tamamlandı.",
        choices: [
            {
                text: "Uluslararası mahkemelerin denetim yetkisini kabul edip borçları uzun vadeye yayın.",
                consequenceText: "İstikrar +15%, Ekonomi +10%, Milliyetçi -20%, Yargı -12%, Hazine -₺1.0B.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 12);
                    s.treasury -= 1000000000;
                    return null;
                }
            },
            {
                text: "Yapılandırma şartlarını reddedin, milli kaynaklarla borç ödeme planı uygulayın.",
                consequenceText: "Milliyetçi +25%, Ordu +12%, Hazine -₺4.0B, Ekonomi -15%, Enflasyon +10%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 25);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 12);
                    s.treasury -= 4000000000;
                    s.systems.economy = Math.max(0, s.systems.economy - 15);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 10);
                    return null;
                }
            },
            {
                text: "Tüm dış borçları tek taraflı olarak dondurduğunuzu ilan edin.",
                consequenceText: "İstikrar -25%, Ekonomi -20%, Hazine korunur. Solcular +15%, Büyük Sermaye favor -35.",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 25);
                    s.systems.economy = Math.max(0, s.systems.economy - 20);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 35);
                    return null;
                }
            },
            {
                text: "Varlık Fonu bünyesindeki tüm şirketleri borç karşılığı kreditörlere devredin.",
                consequenceText: "Hazine borcu silinir. Büyük Sermaye favor +15, Milliyetçi -30%, Ordu -18%, Ekonomi -8%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 30);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 18);
                    s.systems.economy = Math.max(0, s.systems.economy - 8);
                    return null;
                }
            }
        ]
    },

    // --- CHAIN 5: MİLLİ OTOMOBİL ---
    national_car_project_start_c0_echo: {
        id: "national_car_project_start_c0_echo",
        title: "ZİNCİR - Devlet Batarya Fabrikasında Kadrolaşma ve Bürokrasi",
        desc: "Batarya fabrikasının kamulaştırılmasının ardından, yönetime iktidara yakın liyakatsiz bürokratlar atandı. Mühendisler teknik hatalar yapıldığını belirterek istifa ediyor.",
        choices: [
            {
                text: "[MÜZAKERE] Teknik yönetimi özerkleştirin, eski mühendisleri çift kat maaşla geri çağırın.",
                consequenceText: "Akademi +15%, Hazine -₺1.0B, Ekonomi +8%, Kabine sadakati -10. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.treasury -= 1000000000;
                    s.systems.economy = Math.min(100, s.systems.economy + 8);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c0_part3_echo",
                        originTitle: "Fabrika Kadrolaşması",
                        originChoiceText: "Teknik özerklik ve çift maaş"
                    });
                    return null;
                }
            },
            {
                text: "[BASTIR] İstifaları kabul edin, kadroları asistan mühendislerle doldurup devam edin.",
                consequenceText: "Kabine sadakati +12, Yolsuzluk +8%, Ekonomi -8%, Akademi -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 12);
                    }
                    s.systems.corruption = Math.min(100, s.systems.corruption + 8);
                    s.systems.economy = Math.max(0, s.systems.economy - 8);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c0_part3_echo",
                        originTitle: "Fabrika Kadrolaşması",
                        originChoiceText: "Asistan mühendis kadroları"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Proje kontrolünü tamamen askeri vakıf şirketlerine (ASELSAN vb.) devredin.",
                consequenceText: "Ordu +20%, Milliyetçi +15%, Hazine -₺1.5B, Liberal -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.treasury -= 1500000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c0_part3_echo",
                        originTitle: "Fabrika Kadrolaşması",
                        originChoiceText: "Askeri vakıflara devretmek"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] İstifa eden mühendisleri sabote etmekle suçlayıp pasaportlarını iptal edin.",
                consequenceText: "Güvenlik +12%, Özgürlük -15%, Gençler -18%, Siyasi Sermaye +10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 12);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 18);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c0_part3_echo",
                        originTitle: "Fabrika Kadrolaşması",
                        originChoiceText: "Mühendislerin suçlanması ve pasaport iptali"
                    });
                    return null;
                }
            }
        ]
    },
    national_car_project_start_c1_echo: {
        id: "national_car_project_start_c1_echo",
        title: "ZİNCİR - Çinli Ortağın Teknoloji Casusluğu ve Batı Reaksiyonu",
        desc: "Fabrikanın Çinli deve satılmasının ardından, yerli yazılım kodlarının Çin'e aktarıldığı iddiası MİT raporuna girdi. NATO ve ABD, projeye askeri ambargo koyma uyarısı yaptı.",
        choices: [
            {
                text: "[BASTIR] Çinli şirketle ortaklığı feshedin, fabrikayı devletleştirmeye çalışın.",
                consequenceText: "Milliyetçi +15%, NATO favor +15, Hazine -₺3.0B, Ekonomi -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                    s.treasury -= 3000000000;
                    s.systems.economy = Math.max(0, s.systems.economy - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c1_part3_echo",
                        originTitle: "Çin Casusluğu",
                        originChoiceText: "Ortaklığın feshi ve devletleştirme"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Batı ambargolarına rest çekin, Çin ile stratejik savunma paktı görüşmelerine başlayın.",
                consequenceText: "Hazine +₺2.0B, Milliyetçi +12%, NATO favor -30, Liberal -15%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury += 2000000000;
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 30);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c1_part3_echo",
                        originTitle: "Çin Casusluğu",
                        originChoiceText: "Savunma paktı görüşmeleri"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Yazılım kısmını yerli askeri firmaların yapacağı yeni bir protokol dayatın.",
                consequenceText: "Ordu +15%, Milliyetçi +10%, Ekonomi +5%, Hazine -₺1.0B. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 10);
                    s.systems.economy = Math.min(100, s.systems.economy + 5);
                    s.treasury -= 1000000000;
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c1_part3_echo",
                        originTitle: "Çin Casusluğu",
                        originChoiceText: "Yazılımın askeri firmalara devri"
                    });
                    return null;
                }
            },
            {
                text: "[GİZLİ] Casusluk iddialarını yalanlayıp projenin ticari sır olduğunu savunarak sessiz kalın.",
                consequenceText: "İstikrar +8%, Hazine bütçesi korunur. NATO favor -12, Yolsuzluk +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 12);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c1_part3_echo",
                        originTitle: "Çin Casusluğu",
                        originChoiceText: "İddiaları yalanlayıp sessiz kalmak"
                    });
                    return null;
                }
            }
        ]
    },
    national_car_project_start_c2_echo: {
        id: "national_car_project_start_c2_echo",
        title: "ZİNCİR - Konsorsiyum Üyelerinin Finansal Destek Boykotu",
        desc: "Zorla ortak edilen holdingler, ekonomik belirsizlik gerekçesiyle hibe ve sermaye ödemelerini durdurdu. Üretim bandı parça tedariki yapılamadığı için durma noktasında.",
        choices: [
            {
                text: "[BASTIR] Ödemeleri yapmayan holdinglere vergi incelemeleri başlatıp cezalar yazın.",
                consequenceText: "Büyük Sermaye favor -25, Hazine +₺1.5B, Siyasi Sermaye -10 PC, Ekonomi -8%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 25);
                    s.treasury += 1500000000;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.systems.economy = Math.max(0, s.systems.economy - 8);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c2_part3_echo",
                        originTitle: "Konsorsiyum Boykotu",
                        originChoiceText: "Holdinglere vergi cezaları"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Konsorsiyuma devlet bütçesinden ₺1.5B ek hibe vererek çarkları döndürün.",
                consequenceText: "Hazine -₺1.5B, Büyük Sermaye favor +15, Ekonomi +8%, Enflasyon +5%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.treasury -= 1500000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 8);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c2_part3_echo",
                        originTitle: "Konsorsiyum Boykotu",
                        originChoiceText: "Devlet bütçesinden nakit hibe"
                    });
                    return null;
                }
            },
            {
                text: "[MÜZAKERE] Projeyi holdinglerden alıp TOBB ve Ticaret Odaları birliğine devredin.",
                consequenceText: "İstikrar +8%, Esnaf/KOBİ +12%, Büyük Sermaye favor -15, Siyasi Sermaye -10 PC. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 12); // esnaf placeholder
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c2_part3_echo",
                        originTitle: "Konsorsiyum Boykotu",
                        originChoiceText: "TOBB ve odalara devir"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Otomobil projesinin hedefini küçültüp sadece kamu filosuna üretim yapın.",
                consequenceText: "Hazine korunur. Ekonomi -5%, Milliyetçi -12%, Memurlar +10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 12);
                    s.voterGroups.civil_servants.approval = Math.min(100, s.voterGroups.civil_servants.approval + 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c2_part3_echo",
                        originTitle: "Konsorsiyum Boykotu",
                        originChoiceText: "Sadece kamu filosu hedefi"
                    });
                    return null;
                }
            }
        ]
    },
    national_car_project_start_c3_echo: {
        id: "national_car_project_start_c3_echo",
        title: "ZİNCİR - Fabrikadan Çıkarılan Binlerce Mühendisin Beyin Göçü",
        desc: "Yerli otomobil projesinin durdurulmasının ardından, projede çalışan 2000'den fazla üst düzey yazılımcı ve mühendis vize kolaylığı sunan Avrupa ülkelerine göç etti. Akademi ve teknoloji çevreleri öfkeli.",
        choices: [
            {
                text: "[MÜZAKERE] Teknoloji beyin göçünü engellemek için yüksek nitelikli Ar-Ge fonu ve vergi muafiyeti getirin.",
                consequenceText: "Akademi +15%, Gençler +12%, Hazine -₺2.0B, Büyük Sermaye favor -10. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 12);
                    s.treasury -= 2000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c3_part3_echo",
                        originTitle: "Mühendis Beyin Göçü",
                        originChoiceText: "Ar-Ge fonu ve vergi muafiyeti"
                    });
                    return null;
                }
            },
            {
                text: "[BASTIR] Göç edenleri vatan haini ilan edip yerli teknoloji festivallerini teşvik edin.",
                consequenceText: "Milliyetçi +15%, Siyasi Sermaye +12 PC, Akademi -15%, Gençler -12%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 12);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 12);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c3_part3_echo",
                        originTitle: "Mühendis Beyin Göçü",
                        originChoiceText: "Vatan hainliği söylemi ve festival"
                    });
                    return null;
                }
            },
            {
                text: "[TAVİZ] Üniversitelerin teknopark bütçelerini kısın, kaynakları tarımsal desteklere kaydırın.",
                consequenceText: "Çiftçiler +15%, Hazine +₺1.0B, Akademi -20%, Gençler -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 15);
                    s.treasury += 1000000000;
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 20);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c3_part3_echo",
                        originTitle: "Mühendis Beyin Göçü",
                        originChoiceText: "Teknopark bütçe kesintisi"
                    });
                    return null;
                }
            },
            {
                text: "[FIRSAT] Kalan mühendisleri savunma sanayii projelerine zorunlu görevlendirmeyle atayın.",
                consequenceText: "Ordu +15%, Güvenlik +10%, Özgürlük -15%, Akademi -10%. Çözüm aşaması planlandı.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 10);
                    s.decisionEchoes = s.decisionEchoes || [];
                    s.decisionEchoes.push({
                        triggerTurn: s.turn + 2,
                        eventId: "national_car_project_c3_part3_echo",
                        originTitle: "Mühendis Beyin Göçü",
                        originChoiceText: "Savunma projelerine zorunlu atama"
                    });
                    return null;
                }
            }
        ]
    },
    national_car_project_c0_part3_echo: {
        id: "national_car_project_c0_part3_echo",
        title: "ZİNCİR - İlk Yerli Araçların Banttan İnişi ve Seçim Propagandası",
        desc: "Devletleşen fabrikadaki krizlerin ardından ilk yerli elektrikli otomobil banttan indi. Araçların teslim töreni büyük bir gövde gösterisine dönüştü.",
        choices: [
            {
                text: "Yerli aracı kamu bankası kredileriyle halka yarı fiyatına satın, bütçeyi zorlayın.",
                consequenceText: "Halk mutluluğu +18%, Siyasi Sermaye +15 PC, Hazine -₺4.0B, Enflasyon +8%, Liberal -15%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 18);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.treasury -= 4000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 8);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    return null;
                }
            },
            {
                text: "Fiyatları serbest piyasa standartlarında tutun, kar marjını koruyun.",
                consequenceText: "Büyük Sermaye favor +18, Ekonomi +10%, Hazine bütçesi korunur. Gençler -10%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 18);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 10);
                    return null;
                }
            },
            {
                text: "İlk 10.000 aracı sadece devlet memurlarına makam aracı olarak dağıtın.",
                consequenceText: "Memurlar +20%, Kabine sadakati +10, Hazine -₺2.0B, İşçiler -10%.",
                action: (s) => {
                    s.voterGroups.civil_servants.approval = Math.min(100, s.voterGroups.civil_servants.approval + 20);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 10);
                    }
                    s.treasury -= 2000000000;
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 10);
                    return null;
                }
            },
            {
                text: "Fabrikayı üretim başarısının ardından borsaya açıp özelleştirin.",
                consequenceText: "Hazine +₺5.0B, Liberal +15%, Büyük Sermaye favor +15, Milliyetçi -15%, Solcular -12%.",
                action: (s) => {
                    s.treasury += 5000000000;
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 12);
                    return null;
                }
            }
        ]
    },
    national_car_project_c1_part3_echo: {
        id: "national_car_project_c1_part3_echo",
        title: "ZİNCİR - Avrasya Teknoloji Parkı Ortaklığı ve Nihai Değerlendirme",
        desc: "Çin ortaklı üretimin tamamlanmasının ardından yerli araç piyasaya sürüldü ancak Batılı pazarlara ihracat engellendi. Doğu ittifakıyla yeni ticaret kapıları aranıyor.",
        choices: [
            {
                text: "Şanghay İşbirliği Örgütü ülkeleriyle gümrük birliği anlaşması imzalayın.",
                consequenceText: "Milliyetçi +20%, Hazine +₺2.0B, NATO favor -35, Liberal -20%, Ekonomi +8%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.treasury += 2000000000;
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 35);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 20);
                    s.systems.economy = Math.min(100, s.systems.economy + 8);
                    return null;
                }
            },
            {
                text: "Çinli ortağın hisselerini geri almak için bütçeden ₺4.0B kaynak ayırın.",
                consequenceText: "Milliyetçi +15%, NATO favor +20, Hazine -₺4.0B, Ekonomi -10%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 20);
                    s.treasury -= 4000000000;
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    return null;
                }
            },
            {
                text: "Batı ile ilişkileri onarmak için otomobilin batarya üretimini durdurun.",
                consequenceText: "NATO favor +15, Liberal +10%, Milliyetçi -20%, Ordu -12%, Hazine bütçesi korunur.",
                action: (s) => {
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 15);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 10);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 20);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    return null;
                }
            },
            {
                text: "Sadece iç piyasa ve Orta Doğu pazarına yönelik satış stratejisi uygulayın.",
                consequenceText: "İstikrar +8%, Muhafazakar +10%, Hazine +₺1.0B, Liberal -8%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 8);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.treasury += 1000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 8);
                    return null;
                }
            }
        ]
    },
    national_car_project_c2_part3_echo: {
        id: "national_car_project_c2_part3_echo",
        title: "ZİNCİR - Özel Sektör Liderliğinde Milli Hibrit Otomobil Başarısı",
        desc: "Konsorsiyumun ürettiği hibrit araç modeli uluslararası fuarda yılın inovasyon ödülünü aldı. Hükümetin sanayi tezi tescillendi.",
        choices: [
            {
                text: "Holdinglere Ar-Ge başarı ödülü olarak büyük kurumlar vergisi muafiyeti tanıyın.",
                consequenceText: "Büyük Sermaye favor +25, Ekonomi +12%, Hazine -₺2.0B, Solcular -15%, İşçiler -10%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 25);
                    s.systems.economy = Math.min(100, s.systems.economy + 12);
                    s.treasury -= 2000000000;
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 10);
                    return null;
                }
            },
            {
                text: "Başarıyı sahiplenip tüm reklamı devlet bütçesinden finanse edin.",
                consequenceText: "Siyasi Sermaye +20 PC, Halk mutluluğu +10%, Hazine -₺1.0B, Liberal -8%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 20);
                    s.systems.happiness = Math.min(100, s.systems.happiness + 10);
                    s.treasury -= 1000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 8);
                    return null;
                }
            },
            {
                text: "Otomobil fabrikasında çalışan işçilerin sendika haklarını genişletin.",
                consequenceText: "İşçiler +20%, Solcular +15%, Büyük Sermaye favor -15, Ekonomi -5%.",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 20);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    return null;
                }
            },
            {
                text: "Projeyi yabancı holdinglere satarak hazineye nakit girişi sağlayın.",
                consequenceText: "Hazine +₺6.0B, Liberal +15%, Büyük Sermaye favor +15, Milliyetçi -25%, Ordu -12%.",
                action: (s) => {
                    s.treasury += 6000000000;
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.min(100, s.regimeWatch.buyuk_sermaye.favor + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    return null;
                }
            }
        ]
    },
    national_car_project_c3_part3_echo: {
        id: "national_car_project_c3_part3_echo",
        title: "ZİNCİR - Yerli Teknoloji Tasfiye ve Kapanış Raporu",
        desc: "Durdurulan projenin tasfiyesi tamamlandı. Boş kalan fabrikalar ve durdurulan projelerin enkazı siyasi tartışma konusu.",
        choices: [
            {
                text: "Fabrika arazisini organize sanayi bölgesine dönüştürüp KOBİ'lere bedelsiz dağıtın.",
                consequenceText: "Esnaf/Çiftçiler +15%, Ekonomi +10%, Hazine -₺1.0B, Büyük Sermaye favor -12.",
                action: (s) => {
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 15);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.treasury -= 1000000000;
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 12);
                    return null;
                }
            },
            {
                text: "Boş tesisleri savunma sanayiinin insansız araç üretimine tahsis edin.",
                consequenceText: "Ordu +20%, Milliyetçi +15%, Güvenlik +10%, Liberal -10%.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.systems.security = Math.min(100, s.systems.security + 10);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 10);
                    return null;
                }
            },
            {
                text: "Arazileri lüks konut projeleri yapılması için yakın müteahhitlere satın.",
                consequenceText: "Hazine +₺3.0B, Yolsuzluk +15%, Kabine sadakati +10, Seküler -18%, Solcular -18%.",
                action: (s) => {
                    s.treasury += 3000000000;
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.min(100, s.cabinet[k].loyalty + 10);
                    }
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 18);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 18);
                    return null;
                }
            },
            {
                text: "Tasfiye kararını meclis gündeminden düşürerek konuyu unutturun.",
                consequenceText: "İstikrar +5%, Siyasi Sermaye +10 PC, Seküler -8%, Akademi -10%.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 10);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 8);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 10);
                    return null;
                }
            }
        ]
    }
};

const premiumEvents = [
    {
        id: "istanbul_depremi_legendary",
        title: "ZİNCİRLEME AFET: BÜYÜK MARMARA DEPREMİ",
        desc: "Marmara Denizi'nde 7.4 büyüklüğünde yıkıcı bir deprem meydana geldi! İstanbul ve çevre illerde binlerce bina çöktü, altyapı ve sanayi havzaları felç oldu. İletişim, enerji ve lojistik hatları kesildi, binlerce vatandaş enkaz altında. Ülke genelinde olağanüstü durum hâkim, yağma olayları rapor ediliyor.",
        condition: (s) => true,
        choices: [
            {
                text: "Orduyu tam yetkiyle sahaya sürün ve sıkıyönetim ilan edin.",
                consequenceText: "Güvenlik +20%, Ordu +15%, Özgürlük -20%, Hazine -₺5.0B, Seküler -12%.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 20);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.treasury -= 5000000000;
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 12);
                    return null;
                }
            },
            {
                text: "Deprem vergisi fonlarını depremzedelere aktarın ve uluslararası yardım çağrısı (NATO/AB) yapın.",
                consequenceText: "Halk mutluluğu +15%, NATO favor +20, Hazine -₺10.0B, Siyasi Sermaye -15 PC, Milliyetçi -10%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 15);
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 20);
                    s.treasury -= 10000000000;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    return null;
                }
            },
            {
                text: "İmar affından yararlanan müteahhitleri ve yerel yöneticileri hemen tutuklatıp suçu onlara yıkın.",
                consequenceText: "Siyasi Sermaye +20 PC, Yargı +15%, Yolsuzluk -15%, Büyük Sermaye favor -20, İstikrar -10%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 20);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 20);
                    s.stability = Math.max(0, s.stability - 10);
                    return null;
                }
            },
            {
                text: "Hazine bütçesinden ₺20 Milyar deprem tahvili ihraç edin, sanayi kuruluşlarını Anadolu'ya taşıyın.",
                consequenceText: "Hazine +₺20.0B, Enflasyon +15%, Ekonomi -10%, İşçiler +15%, Büyük Sermaye favor -15.",
                action: (s) => {
                    s.treasury += 20000000000;
                    s.systems.inflation = Math.min(100, s.systems.inflation + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 15);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 15);
                    return null;
                }
            }
        ]
    },
    {
        id: "hiperenflasyon_tl_collapse",
        title: "FİNANSAL TSUNAMİ: LİRA DEĞERİNİN ÇÖKÜŞÜ",
        desc: "Merkez Bankası'nın faiz politikaları ve dış borç krizi birleşti, Türk Lirası bir gecede %40 değer kaybetti. Marketlerde etiketler saatlik değişiyor, esnaf mal satmayı durdurdu. Halk bankamatiklerin önünde uzun kuyruklar oluşturuyor, sermaye kaçışı tavan yaptı.",
        condition: (s) => true,
        choices: [
            {
                text: "Faizleri radikal şekilde %80 seviyesine çıkarın, IMF standartlarında kemer sıkmaya geçin.",
                consequenceText: "Enflasyon -20%, Ekonomi +10%, Hazine +₺5.0B, İşçiler -25%, Emekliler -20%.",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 20);
                    s.systems.economy = Math.min(100, s.systems.economy + 10);
                    s.treasury += 5000000000;
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 25);
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 20);
                    return null;
                }
            },
            {
                text: "Bankalardaki döviz mevduatlarını Liraya çevirin (sermaye kontrolü), transferleri yasaklayın.",
                consequenceText: "Büyük Sermaye favor -35, Liberal -25%, Hazine bütçesi korunur. Solcular +15%, Özgürlük -15%.",
                action: (s) => {
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 35);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    return null;
                }
            },
            {
                text: "Kamudaki tüm lüks harcamaları ve dev projeleri durdurun, doğrudan gıda yardımı dağıtın.",
                consequenceText: "Halk mutluluğu +15%, Siyasi Sermaye +15 PC, Kabine sadakati -12, Hazine +₺2.0B, Ekonomi -5%.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 12);
                    }
                    s.treasury += 2000000000;
                    s.systems.economy = Math.max(0, s.systems.economy - 5);
                    return null;
                }
            },
            {
                text: "Krizi 'Ekonomik Kurtuluş Savaşı' ilan edin, altın bozdurma mitingleri yapın.",
                consequenceText: "Muhafazakar +20%, Milliyetçi +15%, Siyasi Sermaye +20 PC, Enflasyon +15%, Ekonomi -10%.",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 20);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 20);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    return null;
                }
            }
        ]
    },
    {
        id: "sinir_otesi_savas",
        title: "SINIR ÖTESİNDE GENİŞ ÇAPLI HAREKÂT VE SAVAŞ",
        desc: "Güney sınırımızdaki terör koridoruna ve müttefik ülke askeri üslerine yapılan koordineli saldırıların ardından, TSK hava ve kara unsurlarıyla sınır ötesinde 50 km derinlikte geniş çaplı bir askeri harekât başlattı. Uluslararası koalisyon ve NATO harekâtı kınayarak yaptırım kararı aldı.",
        condition: (s) => true,
        choices: [
            {
                text: "Harekâtı 'Nihai Güvenlik Kuşağı' kurana kadar sürdürün, tüm kaynakları orduya seferber edin.",
                consequenceText: "Ordu +30%, Milliyetçi +25%, Güvenlik +20%, Hazine -₺8.0B, NATO favor -30, Kürt seçmenler -30%.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 30);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 25);
                    s.systems.security = Math.min(100, s.systems.security + 20);
                    s.treasury -= 8000000000;
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 30);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 30);
                    return null;
                }
            },
            {
                text: "BM ve NATO gözetiminde ateşkes masasına oturmayı kabul edin, askerleri sınıra geri çekin.",
                consequenceText: "NATO favor +30, Liberal +15%, Kürt seçmenler +20%, Milliyetçi -25%, Ordu -20%, Siyasi Sermaye -15 PC.",
                action: (s) => {
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 30);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.voterGroups.kurds.approval = Math.min(100, s.voterGroups.kurds.approval + 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 25);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "Bölgesel güçlerle (Rusya/İran) gizli askeri mutabakat imzalayın, Batı ittifakına rest çekin.",
                consequenceText: "Milliyetçi +20%, Ordu +15%, NATO favor -35, Hazine -₺3.0B, Liberal -15%.",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 35);
                    s.treasury -= 3000000000;
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    return null;
                }
            },
            {
                text: "Harekâtı sınırlı tutun, diplomasiyi devreye sokarak sınır dışı mültecileri Avrupa sınırına yönlendirin.",
                consequenceText: "Halk mutluluğu +12%, Milliyetçi +15%, Göçmenler -20%, NATO favor -20, Hazine -₺1.0B.",
                action: (s) => {
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.voterGroups.immigrants.approval = Math.max(0, s.voterGroups.immigrants.approval - 20);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 20);
                    s.treasury -= 1000000000;
                    return null;
                }
            }
        ]
    },
    {
        id: "anayasa_referandumu_legendary",
        title: "REJİM YOL AYRIMI: ANAYASA REFERANDUMU",
        desc: "Mecliste onaylanan ve başkanlık yetkilerini olağanüstü genişleten, kararname yetkisini mutlaklaştıran ve yargı denetimini tamamen yürütmeye bağlayan anayasa paketi referanduma gidiyor. Ülke tamamen kutuplaşmış durumda; muhalefet paketi 'sivil diktatörlük' olarak nitelendiriyor.",
        condition: (s) => true,
        choices: [
            {
                text: "Devletin tüm medya ve bürokrasi gücünü seferber ederek 'EVET' kampanyasını sonuna kadar finanse edin.",
                consequenceText: "Siyasi Sermaye +30 PC, Muhafazakar +20%, Özgürlük -25%, Medya -15%, Hazine -₺3.0B, Seküler -25%.",
                action: (s) => {
                    s.politicalCapital = Math.min(200, s.politicalCapital + 30);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 25);
                    s.systems.media = Math.max(0, s.systems.media - 15);
                    s.treasury -= 3000000000;
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 25);
                    return null;
                }
            },
            {
                text: "Muhalefetin de onaylayacağı daha ılımlı, yargı bağımsızlığını koruyan bir uzlaşı metnine geri dönün.",
                consequenceText: "İstikrar +15%, Özgürlük +15%, Yargı +20%, Seküler +15%, Siyasi Sermaye -15 PC, Cemaatler favor -15.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 15);
                    return null;
                }
            },
            {
                text: "Referandum sürecini ulusal güvenlik gerekçesiyle askıya alın, olağanüstü hal ilan edin.",
                consequenceText: "Güvenlik +20%, Siyasi Sermaye +15 PC, Özgürlük -30%, Gençler -25%, Seküler -20%, NATO favor -20.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 20);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 30);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 25);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 20);
                    return null;
                }
            },
            {
                text: "Bağımsız seçim gözlemcilerine tam denetim yetkisi verin ve halkın kararına uyacağınızı açıklayın.",
                consequenceText: "Özgürlük +20%, Seküler +15%, Liberal +15%, Siyasi Sermaye -10 PC, Cemaatler favor -10.",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 20);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 10);
                    return null;
                }
            }
        ]
    },
    {
        id: "toplumsal_kaos_sikyönetim",
        title: "SOKAKLAR ALEV ALEV: TOPLUMSAL HUZURSUZLUK VE KAOS",
        desc: "Polis şiddeti ve ekonomik buhranın birleştiği büyük şehirlerde, binlerce vatandaş sivil itaatsizlik eylemleri başlattı. Gösteriler polisle çatışmaya dönüştü, kamu binaları ateşe veriliyor. Sosyal medya platformlarında örgütlenen kitleler hükümeti istifaya çağırıyor.",
        condition: (s) => true,
        choices: [
            {
                text: "Büyük şehirlerde sıkıyönetim ilan edin, orduyu asayişi sağlamak üzere göreve çağırın.",
                consequenceText: "Güvenlik +25%, Ordu +20%, Özgürlük -35%, Gençler -30%, Solcular -25%, Hazine -₺2.0B.",
                action: (s) => {
                    s.systems.security = Math.min(100, s.systems.security + 25);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 35);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 30);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 25);
                    s.treasury -= 2000000000;
                    return null;
                }
            },
            {
                text: "Eylemcilerin temsilcileriyle görüşün, taleplerini kabul ederek iç güvenlik reformu sözü verin.",
                consequenceText: "İstikrar +15%, Özgürlük +15%, Gençler +20%, Güvenlik Bürokrasisi -20%, Siyasi Sermaye -15 PC.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 20);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "İnterneti ve sosyal medyayı ülke genelinde tamamen kapatın, göstericilerin finansörlerini tutuklatın.",
                consequenceText: "Medya -25%, Özgürlük -25%, Güvenlik +15%, Seküler -20%, Siyasi Sermaye +15 PC.",
                action: (s) => {
                    s.systems.media = Math.max(0, s.systems.media - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 25);
                    s.systems.security = Math.min(100, s.systems.security + 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    return null;
                }
            },
            {
                text: "İstikrarı sağlamak amacıyla kabineyi tamamen feshedin ve erken seçim kararı alın.",
                consequenceText: "İstikrar +20%, Özgürlük +15%, Gençler +15%, Hazine -₺4.0B, Siyasi Sermaye -25 PC.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 20);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.voterGroups.youth.approval = Math.min(100, s.voterGroups.youth.approval + 15);
                    s.treasury -= 4000000000;
                    s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                    return null;
                }
            }
        ]
    },
    {
        id: "military_clique_split_premium",
        title: "TSK Bünyesinde Komuta Krizleri",
        desc: "Ordu bünyesinde iki güçlü klik arasında komuta kademesi için atama çatışması çıktı: Avrasyacı klik ile NATO/Batı yanlısı geleneksel klik, Yüksek Askeri Şûra öncesinde kritik pozisyonlar için karşı karşıya geldi. Hükümetten kendi adaylarını atamasını talep ediyorlar.",
        condition: (state) => true,
        choices: [
            {
                text: "Avrasyacı komutan adayını göreve ata. (Avrasyacı kliği güçlendir)",
                consequenceText: "Ordu Desteği (+15), Güvenlik Bürokrasisi (+10). Ancak NATO İttifakı sarsılır (-20 favor), liberaller (-15) ve seküler kesim (-10) tepki gösterir.",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 10);
                    s.regimeWatch.super_nato.favor = Math.max(0, s.regimeWatch.super_nato.favor - 20);
                    s.voterGroups.liberals.approval = Math.max(0, s.voterGroups.liberals.approval - 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 10);
                    return null;
                }
            },
            {
                text: "NATO yanlısı komutan adayını göreve ata. (NATO kliğini güçlendir)",
                consequenceText: "NATO Faction favor artar (+20), liberaller (+12) ve seküler kesim (+15) memnun olur. Ancak Milliyetçiler (-15) ve Güvenlik Bürokrasisi (-12) tepki gösterir, Ordu Desteği azalır (-10).",
                action: (s) => {
                    s.regimeWatch.super_nato.favor = Math.min(100, s.regimeWatch.super_nato.favor + 20);
                    s.voterGroups.liberals.approval = Math.min(100, s.voterGroups.liberals.approval + 12);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 15);
                    s.powerCenters.security.approval = Math.max(0, s.powerCenters.security.approval - 12);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 10);
                    return null;
                }
            },
            {
                text: "Her iki grubu da reddet, tamamen tarafsız teknokrat bir general ata.",
                consequenceText: "Halk desteği (+12), İstikrar (+10), Özgürlük (+8). Ancak her iki hizip de kızar (Ordu Desteği -12), Siyasi Sermaye harcanır (-15 PC).",
                action: (s) => {
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 12);
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 8);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 12);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "İki hizbin lider kadrolarını da YAŞ kararıyla emekli et, orduda tasfiye başlat.",
                consequenceText: "İstikrar geriler (-15), Ordu desteği sert düşer (-25), sivil/demokratik güçler ve Solcular memnun olur (+20). Özgürlükler geriler (-10). Siyasi Sermaye harcanır (-25 PC).",
                action: (s) => {
                    s.stability = Math.max(0, s.stability - 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                    return null;
                }
            }
        ]
    },
    {
        id: "expanded_general_strike_premium",
        title: "Ülke Genelinde Süresiz Genel Grev",
        desc: "Satın alma gücünün erimesi ve yüksek enflasyon üzerine, Türkiye genelinde sendikalar ortak karar alarak ulaşım, enerji ve sanayi sektörlerinde süresiz genel grev ilan etti. Büyük şehirlerde hayat ve lojistik durma noktasında.",
        condition: (state) => true,
        choices: [
            {
                text: "Grevi yasa dışı ilan et, sendika liderlerini gözaltına alıp üretimi zorla başlat.",
                consequenceText: "İş Dünyası (+20) ve Güvenlik Bürokrasisi (+10) onaylar. İşçiler (-30) ve Solcular (-25) öfkelenir. Özgürlükler düşer (-15), İstikrar sarsılır (-10).",
                action: (s) => {
                    s.powerCenters.business.approval = Math.min(100, s.powerCenters.business.approval + 20);
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 10);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 30);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 25);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.stability = Math.max(0, s.stability - 10);
                    return null;
                }
            },
            {
                text: "İşçilerin taleplerini kabul et, asgari ücrete ek zam yap ve sendikal hakları genişlet.",
                consequenceText: "İşçiler (+25), Solcular (+20) ve Halk (+15) memnun olur. Mutluluk artar (+12). Ancak Hazine bütçesi sarsılır (-₺5 Milyar), İş Dünyası öfkelenir (-20), Enflasyon artar (+10).",
                action: (s) => {
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 25);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 20);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 15);
                    s.systems.happiness = Math.min(100, s.systems.happiness + 12);
                    s.treasury -= 5000000000;
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 20);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 10);
                    return null;
                }
            },
            {
                text: "Yasal Hakem Heyeti görevlendir ve grevi 60 gün süreyle ertele.",
                consequenceText: "İstikrar hafifçe korunur (+5). Ancak hem İşçiler (-8) hem İş Dünyası (-8) oyalama taktiği sebebiyle hayal kırıklığı yaşar. Siyasi Sermaye harcanır (-10 PC).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 5);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 8);
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 8);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    return null;
                }
            },
            {
                text: "Holdinglere ek 'Grev Vergisi' getirerek grevdeki işçilerin maaşlarını sübvanse et.",
                consequenceText: "Solcular (+25) ve İşçiler (+20) memnun olur. Halk desteği artar (+12). Ancak Büyük Sermaye favor sert düşer (-30), İş Dünyası desteği çöker (-25), ekonomi geriler (-10).",
                action: (s) => {
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 25);
                    s.voterGroups.workers.approval = Math.min(100, s.voterGroups.workers.approval + 20);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 12);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 30);
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 25);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    return null;
                }
            }
        ]
    },
    {
        id: "deepening_economic_crisis_premium",
        title: "Ekonomik Kriz ve Döviz Rezervi Bunalımı",
        desc: "Dış borç ödemelerinin yaklaşması ve döviz kurundaki dalgalanma nedeniyle Merkez Bankası rezervleri alarm vermeye başladı. Enflasyon tırmanırken acil döviz ihtiyacı ve sermaye çıkışı riski var.",
        condition: (state) => true,
        choices: [
            {
                text: "Faizleri radikal şekilde düşür, üretici esnafı ve KOBİ'leri ucuz krediyle destekle.",
                consequenceText: "Esnaf/Çiftçi (+15) ve Muhafazakarlar (+10) memnun olur. Ancak Enflasyon kontrolden çıkar (+20), İstikrar düşer (-15), İş Dünyası öfkelenir (-20), Hazine geriler (-₺4 Milyar).",
                action: (s) => {
                    s.voterGroups.farmers.approval = Math.min(100, s.voterGroups.farmers.approval + 15);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 10);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 20);
                    s.stability = Math.max(0, s.stability - 15);
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 20);
                    s.treasury -= 4000000000;
                    return null;
                }
            },
            {
                text: "IMF ile stand-by anlaşması imzala, sıkı para politikası ve kemer sıkmaya geç.",
                consequenceText: "Enflasyon geriler (-15), İş Dünyası onaylar (+20), Hazine fonlanır (+₺10 Milyar). Ancak emekliler (-25), işçiler (-20) ve solcular (-15) ekonomik yükten dolayı öfkelenir.",
                action: (s) => {
                    s.systems.inflation = Math.max(0, s.systems.inflation - 15);
                    s.powerCenters.business.approval = Math.min(100, s.powerCenters.business.approval + 20);
                    s.treasury += 10000000000;
                    s.voterGroups.retirees.approval = Math.max(0, s.voterGroups.retirees.approval - 25);
                    s.voterGroups.workers.approval = Math.max(0, s.voterGroups.workers.approval - 20);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    return null;
                }
            },
            {
                text: "Stratejik yabancı ortaklı şirketleri kamulaştır, sermaye kontrolü ilan et.",
                consequenceText: "Milliyetçiler (+15) ve Solcular (+10) destekler. Ancak İş Dünyası desteği çöker (-25), Büyük Sermaye favor sert düşer (-30), Ekonomi daralır (-15), Özgürlük geriler (-10).",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 10);
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 25);
                    s.regimeWatch.buyuk_sermaye.favor = Math.max(0, s.regimeWatch.buyuk_sermaye.favor - 30);
                    s.systems.economy = Math.max(0, s.systems.economy - 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    return null;
                }
            },
            {
                text: "Krizi 'dış güçlerin saldırısı' ilan et, döviz bozdurma mitingleri düzenle.",
                consequenceText: "Muhafazakar taban (+15) ve Milliyetçiler (+12) konsolide olur. Siyasi Sermaye artar (+15). Ancak Ekonomi daha da kötüleşir (-10), Enflasyon artar (+5), İş Dünyası ümidini keser (-15).",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.systems.inflation = Math.min(100, s.systems.inflation + 5);
                    s.powerCenters.business.approval = Math.max(0, s.powerCenters.business.approval - 15);
                    return null;
                }
            }
        ]
    },
    {
        id: "major_corruption_scandal_premium",
        title: "Kritik Kamu İhalelerinde Yolsuzluk Sızıntısı",
        desc: "İktidara yakın holdingler ve kabinedeki bazı isimlerin dahil olduğu devasa bir rüşvet, arazi rantı ve gümrük kaçakçılığı şemasına ait ses kayıtları ve belgeler sansürsüz şekilde sızdırıldı.",
        condition: (state) => true,
        choices: [
            {
                text: "İnternete ve haber kaynaklarına radikal sansür koy, belgeleri paylaşanları tutuklat.",
                consequenceText: "Yolsuzluk algısı artar (+15). Özgürlük sert düşer (-20), Gençler (-20) ve Seküler kesim (-18) öfkelenir. Güvenlik Bürokrasisi onaylar (+10).",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 20);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 20);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 18);
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 10);
                    return null;
                }
            },
            {
                text: "Adı karışan bakanları görevden al, yargı sürecini başlatıp suçu holdinglere yık.",
                consequenceText: "Yolsuzluk düşer (-12), Yargı onaylar (+15), Sekülerler (+10) ve Halk (+10) memnun olur. Ancak parti içi klikler huzursuz olur (-15 PC, kabine sadakati -10).",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 12);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 10);
                    }
                    return null;
                }
            },
            {
                text: "Hemen sınır ötesi bir güvenlik operasyonu başlatarak milliyetçi dalga yarat.",
                consequenceText: "Milliyetçi +20%, Ordu +15%, Muhafazakar +12% destekler. Ancak Hazine bütçesi sarsılır (-₺3 Milyar), Özgürlük geriler (-5), Solcular ve Kürt seçmenler tepki gösterir (-15).",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 20);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 15);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 12);
                    s.treasury -= 3000000000;
                    s.systems.freedom = Math.max(0, s.systems.freedom - 5);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.voterGroups.kurds.approval = Math.max(0, s.voterGroups.kurds.approval - 15);
                    return null;
                }
            },
            {
                text: "İddiaları tamamen reddet, araştırma önergelerini engelle ve sessiz kal.",
                consequenceText: "Parti içi birlik korunur. Ancak Yolsuzluk algısı tırmanır (+12), İstikrar düşer (-10), Yargı Desteği düşer (-10), Halk Desteği erir (-15).",
                action: (s) => {
                    s.systems.corruption = Math.min(100, s.systems.corruption + 12);
                    s.stability = Math.max(0, s.stability - 10);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                    s.powerCenters.public.approval = Math.max(0, s.powerCenters.public.approval - 15);
                    return null;
                }
            }
        ]
    },
    {
        id: "judicial_crisis_premium",
        title: "Anayasa Mahkemesi ve Yargıtay Çatışması",
        desc: "Anayasa Mahkemesi (AYM) ile Yargıtay arasında tutuklu bir vekil davasında yetki krizi çıktı. Yargıtay'ın AYM üyeleri hakkında suç duyurusunda bulunmasıyla anayasal düzen tıkanma noktasına geldi.",
        condition: (state) => true,
        choices: [
            {
                text: "AYM kararlarının bağlayıcı olduğunu açıkla, vekili serbest bıraktır.",
                consequenceText: "Özgürlük artar (+15), Akademi (+15), Seküler kesim (+15) ve Solcular (+15) memnun olur. Yargı içindeki devletçi klik kızar (Yargı Desteği -20), Milliyetçiler tepki gösterir (-10).",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 15);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 20);
                    s.voterGroups.nationalists.approval = Math.max(0, s.voterGroups.nationalists.approval - 10);
                    return null;
                }
            },
            {
                text: "Yargıtay'ın duruşunu destekle, AYM'yi 'milli iradeye müdahale' ile suçla.",
                consequenceText: "Milliyetçiler (+12), Muhafazakarlar (+15) ve Yargıdaki klik (Yargı Desteği +15) destekler. Özgürlük sert düşer (-15), Akademi (-15) ve Sekülerler (-20) öfkelenir, İstikrar sarsılır (-10).",
                action: (s) => {
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 12);
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 15);
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 15);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 15);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 20);
                    s.stability = Math.max(0, s.stability - 10);
                    return null;
                }
            },
            {
                text: "Mahkeme yetkilerini yeniden çizen acil bir anayasa değişikliği süreci başlat.",
                consequenceText: "İstikrar artar (+10), Siyasi Sermaye artar (+15). Ancak süreç masraflıdır (Hazine -₺2 Milyar), tüm gruplar tasarıya şüpheyle yaklaşır (-5 onay).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.politicalCapital = Math.min(200, s.politicalCapital + 15);
                    s.treasury -= 2000000000;
                    for (const k in s.voterGroups) {
                        s.voterGroups[k].approval = Math.max(0, s.voterGroups[k].approval - 5);
                    }
                    return null;
                }
            },
            {
                text: "Krizin faturasını Adalet Bakanına keserek onu görevden al.",
                consequenceText: "Kabine sadakati sarsılır. Yargı Desteği düşer (-10), ancak Yolsuzluk algısı hafifçe azalır (-5). Siyasi Sermaye harcanır (-10 PC).",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.max(0, s.powerCenters.judiciary.approval - 10);
                    s.systems.corruption = Math.max(0, s.systems.corruption - 5);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 10);
                    for (const k in s.cabinet) {
                        s.cabinet[k].loyalty = Math.max(0, s.cabinet[k].loyalty - 8);
                    }
                    return null;
                }
            }
        ]
    },
    {
        id: "memorandum_signal_premium",
        title: "TSK Web Sitesinde Gece Yarısı Bildirisi",
        desc: "Genelkurmay Başkanlığı'nın resmi internet sitesinde gece yarısı 'laiklik hassasiyeti ve milli birlik' konulu, hükümetin dış ve eğitim politikalarını sert dille eleştiren bir bildiri yayınlandı.",
        condition: (state) => true,
        choices: [
            {
                text: "Genelkurmay Başkanı'nı hemen görevden al ve hakkında soruşturma açtır.",
                consequenceText: "Özgürlük (+10), Sekülerler (+10) ve Solcular (+15) sivil iradeyi destekler. Ordu Desteği sert düşer (-20). İstikrar geriler (-10), Siyasi Sermaye harcanır (-15 PC).",
                action: (s) => {
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 10);
                    s.voterGroups.leftists.approval = Math.min(100, s.voterGroups.leftists.approval + 15);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 20);
                    s.stability = Math.max(0, s.stability - 10);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 15);
                    return null;
                }
            },
            {
                text: "Askeri bürokrasinin uyarısını dikkate alarak tartışmalı reformları geri çek.",
                consequenceText: "Ordu Desteği artar (+20), Kemalist Bürokrasi memnun olur (+15). Muhafazakar taban (-25) ve Dini cemaatler (-20) tepki gösterir. Otorite sarsılır (-20 PC).",
                action: (s) => {
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 20);
                    s.regimeWatch.kemalist_burokrasi.favor = Math.min(100, s.regimeWatch.kemalist_burokrasi.favor + 15);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 25);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 20);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 20);
                    return null;
                }
            },
            {
                text: "Halkı sivil siyasete sahip çıkmak üzere meydanlara çağır.",
                consequenceText: "Muhafazakarlar (+25), Milliyetçiler (+15) ve Halk Desteği (+20) tavan yapar. Ancak İstikrar çöker (-25), ekonomi sarsılır (-10), orduyla ilişkiler kopma noktasına gelir (Ordu -25).",
                action: (s) => {
                    s.voterGroups.conservatives.approval = Math.min(100, s.voterGroups.conservatives.approval + 25);
                    s.voterGroups.nationalists.approval = Math.min(100, s.voterGroups.nationalists.approval + 15);
                    s.powerCenters.public.approval = Math.min(100, s.powerCenters.public.approval + 20);
                    s.stability = Math.max(0, s.stability - 25);
                    s.systems.economy = Math.max(0, s.systems.economy - 10);
                    s.powerCenters.military.approval = Math.max(0, s.powerCenters.military.approval - 25);
                    return null;
                }
            },
            {
                text: "Karargahla gizli zirve yap, savunma sanayii bütçesini artırıp uzlaş.",
                consequenceText: "İstikrar korunur (+10), Ordu desteği artar (+10). Ancak Hazine bütçesi sarsılır (-₺4 Milyar), Yolsuzluk algısı hafifçe artar (+5).",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.powerCenters.military.approval = Math.min(100, s.powerCenters.military.approval + 10);
                    s.treasury -= 4000000000;
                    s.systems.corruption = Math.min(100, s.systems.corruption + 5);
                    return null;
                }
            }
        ]
    },
    {
        id: "infiltrating_state_cliques_premium",
        title: "Bürokrasi ve Yargıda Klikleşme İddiaları",
        desc: "İstihbarat raporlarına göre, devlet kadrolarında ve yargıda gruplaşan klikler ve tarikat yapılanmaları, kritik kararları sabote ederek kamu yönetiminde ikili bir yapı oluşturmaya başladı.",
        condition: (state) => true,
        choices: [
            {
                text: "Büyük kamusal temizlik başlat, tüm hizip üyelerini görevden ihraç et.",
                consequenceText: "Yolsuzluk algısı geriler (-15), Akademi (+15) ve Seküler kesim (+20) destekler. Ancak Bürokrasi yavaşlar (İstikrar -15), Cemaatler (-25) ve Muhafazakarlar (-15) sert tepki gösterir. Siyasi Sermaye harcanır (-25 PC).",
                action: (s) => {
                    s.systems.corruption = Math.max(0, s.systems.corruption - 15);
                    s.powerCenters.academia.approval = Math.min(100, s.powerCenters.academia.approval + 15);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 20);
                    s.stability = Math.max(0, s.stability - 15);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 25);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 15);
                    s.politicalCapital = Math.max(0, s.politicalCapital - 25);
                    return null;
                }
            },
            {
                text: "Kendi kliklerini kur ve bürokrasideki diğer hizipleri pasifize et.",
                consequenceText: "Güvenlik Bürokrasisi (+15) artar. Yolsuzluk algısı artar (+10), Özgürlük geriler (-10), Akademi tepki gösterir (-10).",
                action: (s) => {
                    s.powerCenters.security.approval = Math.min(100, s.powerCenters.security.approval + 15);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 10);
                    s.systems.freedom = Math.max(0, s.systems.freedom - 10);
                    s.powerCenters.academia.approval = Math.max(0, s.powerCenters.academia.approval - 10);
                    return null;
                }
            },
            {
                text: "Hiziplerin liderleriyle masaya otur, kadroları paylaştırıp uzlaş.",
                consequenceText: "İstikrar geçici olarak artar (+10). Ancak Yolsuzluk patlar (+18), Sekülerler (-15), Solcular (-15) ve Gençler (-15) öfkelenir.",
                action: (s) => {
                    s.stability = Math.min(100, s.stability + 10);
                    s.systems.corruption = Math.min(100, s.systems.corruption + 18);
                    s.voterGroups.secular.approval = Math.max(0, s.voterGroups.secular.approval - 15);
                    s.voterGroups.leftists.approval = Math.max(0, s.voterGroups.leftists.approval - 15);
                    s.voterGroups.youth.approval = Math.max(0, s.voterGroups.youth.approval - 15);
                    return null;
                }
            },
            {
                text: "Kliklerin lider kadrolarını gözaltına aldır ve yargı sürecini işlet.",
                consequenceText: "Yargı Desteği artar (+15), Özgürlük artar (+10), Sekülerler memnun olur (+18). Ancak Muhafazakarlar (-20) ve Cemaatler favor çöker (-30). İstikrar geriler (-10).",
                action: (s) => {
                    s.powerCenters.judiciary.approval = Math.min(100, s.powerCenters.judiciary.approval + 15);
                    s.systems.freedom = Math.min(100, s.systems.freedom + 10);
                    s.voterGroups.secular.approval = Math.min(100, s.voterGroups.secular.approval + 18);
                    s.voterGroups.conservatives.approval = Math.max(0, s.voterGroups.conservatives.approval - 20);
                    s.regimeWatch.cemaatler.favor = Math.max(0, s.regimeWatch.cemaatler.favor - 30);
                    s.stability = Math.max(0, s.stability - 10);
                    return null;
                }
            }
        ]
    }
];

// ==============================
// SECTION: js/debate.js
// ==============================

/**
 * TURKEY 2038 - TV DEBATE ENGINE
 */

const debateOpponents = [
    {
        name: "Kemal Demir",
        party: "Milliyetçi İttifak Partisi (MİP)",
        title: "Nationalist Opposition Leader"
    },
    {
        name: "Dr. Aylin Yılmaz",
        party: "Sosyal Adalet Hareketi (SAH)",
        title: "Progressive Coalition Leader"
    },
    {
        name: "Caner Bilgin",
        party: "Hür Girişim Birliği (HGB)",
        title: "Techno-Libertarian Candidate"
    }
];

const debateQuestions = [
    {
        id: "economy",
        topic: "Economic Inflation & Cost of Living",
        opponentSpeech: "Your administration has completely mismanaged the state budget! High inflation is destroying the purchasing power of our workers and retirees. How do you defend this?",
        choices: [
            {
                text: "We are building a future-proof automated economy. Tech subsidies and growth will cure inflation long term.",
                consequenceText: "Business Owners approve (+15%), Students approve (+10%), but Workers (-10%) and Retirees (-12%) are frustrated by lack of immediate relief.",
                effects: {
                    business: 15,
                    students: 10,
                    workers: -10,
                    retirees: -12
                }
            },
            {
                text: "Our focus is social solidarity. We will expand welfare, cap rents, and fund pensions through tax hikes on big corporations.",
                consequenceText: "Workers (+15%) and Retirees (+15%) cheer, but Business Owners (-20%) and tech sectors are alienated.",
                effects: {
                    workers: 15,
                    retirees: 15,
                    business: -20
                }
            },
            {
                text: "We must restore budget discipline. By auditing government agencies and curbing corruption, we will naturally bring inflation down.",
                consequenceText: "Seculars (+12%) and Workers (+8%) appreciate the anti-corruption focus, while nationalists are neutral.",
                effects: {
                    secular: 12,
                    workers: 8,
                    corruption: -10 // directly reduces corruption state
                }
            }
        ]
    },
    {
        id: "security",
        topic: "Security vs Civic Freedoms",
        opponentSpeech: "Under the pretense of fighting cyber-terrorism and external threats, this administration has systematically blocked social networks and cracked down on student assemblies!",
        choices: [
            {
                text: "Without national security, there is no country. We will not allow external actors or agitators to disrupt Turkey's stability.",
                consequenceText: "Nationalists (+20%) and Conservatives (+12%) rally to your defense. Students (-18%) and Seculars (-15%) decry authoritarianism.",
                effects: {
                    nationalists: 20,
                    conservatives: 12,
                    students: -18,
                    secular: -15
                }
            },
            {
                text: "Freedom is the bedrock of innovation. We will remove national firewalls, repeal censorship, and protect the right to strike.",
                consequenceText: "Seculars (+15%) and Students (+20%) celebrate. Nationalists (-15%) and Conservatives (-10%) warn of safety risks.",
                effects: {
                    secular: 15,
                    students: 20,
                    nationalists: -15,
                    conservatives: -10
                }
            },
            {
                text: "A balanced state requires moderate controls. We will protect speech, but riots and border integrity remain our absolute red line.",
                consequenceText: "Moderate positive shift across several groups. Pleases nationalists (+6%) and seculars (+5%).",
                effects: {
                    nationalists: 6,
                    secular: 5,
                    conservatives: 4
                }
            }
        ]
    },
    {
        id: "education",
        topic: "Education Curriculum & Brain Drain",
        opponentSpeech: "The education system has been degraded. By reducing sciences and pushing sectarian faith-based courses, we are forcing Turkey's brightest minds to emigrate to Europe. How will you stop this brain drain?",
        choices: [
            {
                text: "We will establish a strictly secular curriculum focused on science, quantum tech, and advanced AI. Education must remain rational.",
                consequenceText: "Seculars (+20%) and Students (+15%) support you. Conservatives are deeply alienated (-25%).",
                effects: {
                    secular: 20,
                    students: 15,
                    conservatives: -25
                }
            },
            {
                text: "A nation is hollow without moral roots. Scientific knowledge must be anchored in religious and cultural values to preserve our society.",
                consequenceText: "Conservatives (+22%) and Nationalists (+10%) strongly approve. Seculars (-25%) and Students (-12%) oppose.",
                effects: {
                    conservatives: 22,
                    nationalists: 10,
                    secular: -25,
                    students: -12
                }
            },
            {
                text: "We will create a multi-track academy system. Families should choose between technological, vocational, and religious specializations.",
                consequenceText: "A compromise. Pleases seculars (+8%) and conservatives (+8%) who support educational choice.",
                effects: {
                    secular: 8,
                    conservatives: 8,
                    business: 5
                }
            }
        ]
    }
];

function getDebateOpponentForParty(ideology) {
    if (ideology === "technocrat" || ideology === "center_left") {
        return debateOpponents[0]; // Kemal Demir (Nationalist Party) as main rival
    } else if (ideology === "conservative" || ideology === "liberal") {
        return debateOpponents[1]; // Dr. Aylin Yılmaz (Progressive Coalition)
    } else {
        return debateOpponents[2]; // Caner Bilgin (Libertarian)
    }
}

// ==============================
// SECTION: js/map.js
// ==============================

/**
 * TURKEY EXECUTIVE DASHBOARD - INTERACTIVE SVG MAP GENERATION & MANAGEMENT
 */



const regions = [
    {
        id: "marmara",
        name: "Marmara Bölgesi",
        voterDemographics: {
            secular: 0.22,
            business: 0.12,
            workers: 0.14,
            students: 0.12,
            youth: 0.10,
            conservatives: 0.10,
            civil_servants: 0.08,
            nationalists: 0.06,
            liberals: 0.04,
            kurds: 0.02
        },
        path: "M 60,105 L 90,65 L 155,45 L 225,45 L 255,85 L 235,125 L 185,120 L 125,125 Z",
        center: { x: 160, y: 85 }
    },
    {
        id: "aegean",
        name: "Ege Bölgesi",
        voterDemographics: {
            secular: 0.32,
            students: 0.12,
            youth: 0.10,
            liberals: 0.08,
            workers: 0.08,
            business: 0.06,
            retirees: 0.12,
            conservatives: 0.06,
            nationalists: 0.06
        },
        path: "M 120,135 L 180,130 L 195,195 L 125,250 L 85,190 Z",
        center: { x: 140, y: 185 }
    },
    {
        id: "mediterranean",
        name: "Akdeniz Bölgesi",
        voterDemographics: {
            secular: 0.20,
            nationalists: 0.18,
            workers: 0.14,
            retirees: 0.12,
            conservatives: 0.10,
            liberals: 0.08,
            farmers: 0.08,
            youth: 0.06,
            students: 0.04
        },
        path: "M 130,260 L 200,205 L 310,240 L 380,295 L 430,295 L 430,320 L 415,315 L 360,305 L 220,285 Z",
        center: { x: 270, y: 285 }
    },
    {
        id: "black_sea",
        name: "Karadeniz Bölgesi",
        voterDemographics: {
            nationalists: 0.32,
            conservatives: 0.24,
            farmers: 0.16,
            religious: 0.08,
            workers: 0.10,
            secular: 0.06,
            civil_servants: 0.04
        },
        path: "M 235,45 L 335,65 L 435,55 L 535,75 L 655,75 L 645,115 L 505,125 L 355,115 L 255,85 Z",
        center: { x: 440, y: 85 }
    },
    {
        id: "central_anatolia",
        name: "İç Anadolu Bölgesi",
        voterDemographics: {
            conservatives: 0.32,
            religious: 0.12,
            nationalists: 0.20,
            farmers: 0.12,
            civil_servants: 0.10,
            secular: 0.06,
            workers: 0.08
        },
        path: "M 245,130 L 365,125 L 505,135 L 485,200 L 385,215 L 315,230 L 205,195 L 190,130 Z",
        center: { x: 340, y: 175 }
    },
    {
        id: "eastern_anatolia",
        name: "Doğu Anadolu Bölgesi",
        voterDemographics: {
            kurds: 0.28,
            conservatives: 0.24,
            farmers: 0.18,
            religious: 0.10,
            nationalists: 0.10,
            workers: 0.06,
            secular: 0.04
        },
        path: "M 515,130 L 645,120 L 665,75 L 775,100 L 785,195 L 765,255 L 630,245 L 585,215 Z",
        center: { x: 670, y: 165 }
    },
    {
        id: "southeastern_anatolia",
        name: "Güneydoğu Anadolu Bölgesi",
        voterDemographics: {
            kurds: 0.38,
            conservatives: 0.20,
            immigrants: 0.15,
            workers: 0.12,
            religious: 0.08,
            farmers: 0.07
        },
        path: "M 495,205 L 595,220 L 635,250 L 760,260 L 755,295 L 525,295 L 445,295 L 395,295 Z",
        center: { x: 580, y: 260 }
    }
];

function getRegionById(id) {
    return regions.find(r => r.id === id);
}

function getRegionIdByPlate(plate) {
    const p = parseInt(plate);
    if (isNaN(p)) return "central_anatolia";
    
    // Marmara
    if ([10, 11, 16, 17, 22, 34, 39, 41, 54, 59, 77].includes(p)) return "marmara";
    // Aegean
    if ([3, 9, 20, 35, 43, 45, 48, 64].includes(p)) return "aegean";
    // Mediterranean
    if ([1, 7, 15, 31, 32, 33, 46, 80].includes(p)) return "mediterranean";
    // Black Sea
    if ([5, 8, 14, 19, 28, 29, 37, 52, 53, 55, 57, 60, 61, 67, 69, 74, 78, 81].includes(p)) return "black_sea";
    // Central Anatolia
    if ([6, 18, 26, 38, 40, 42, 50, 51, 58, 66, 68, 70, 71].includes(p)) return "central_anatolia";
    // Eastern Anatolia
    if ([4, 12, 13, 23, 24, 25, 30, 36, 44, 49, 62, 65, 75, 76].includes(p)) return "eastern_anatolia";
    // Southeastern Anatolia
    if ([2, 21, 27, 47, 56, 63, 72, 73, 79].includes(p)) return "southeastern_anatolia";
    
    return "central_anatolia";
}

// Calculate the active support rate of a region for the player party
function calculateRegionSupport(region, state) {
    let supportSum = 0;
    let weightSum = 0;
    
    for (const group in region.voterDemographics) {
        const weight = region.voterDemographics[group];
        const approval = state.voterGroups[group]?.approval ?? 50;
        supportSum += approval * weight;
        weightSum += weight;
    }
    
    let support = supportSum / weightSum;

    // Apply overall stability penalty
    if (state.stability < 45) {
        support -= (45 - state.stability) * 0.4;
    }
    
    return Math.max(0, Math.min(100, Math.round(support)));
}

// Calculate the active happiness rate of a region
function calculateRegionHappiness(region, state) {
    let localOffset = 0;
    
    if (region.id === "marmara") {
        localOffset = (state.voterGroups.business.approval + state.voterGroups.workers.approval - 100) * 0.15;
    } else if (region.id === "aegean") {
        localOffset = (state.voterGroups.secular.approval + state.voterGroups.students.approval - 100) * 0.15;
    } else if (region.id === "eastern_anatolia") {
        localOffset = (state.voterGroups.conservatives.approval + state.voterGroups.kurds.approval - 100) * 0.15;
    }
    
    const happiness = state.systems.happiness + localOffset;
    return Math.max(0, Math.min(100, Math.round(happiness)));
}

const regionLabelCoords = {
    marmara: { x: 180, y: 120 },
    aegean: { x: 160, y: 260 },
    mediterranean: { x: 400, y: 380 },
    black_sea: { x: 550, y: 110 },
    central_anatolia: { x: 480, y: 240 },
    eastern_anatolia: { x: 820, y: 220 },
    southeastern_anatolia: { x: 750, y: 360 }
};

function initMapListeners(state) {
    const svg = document.getElementById("svg-turkey");
    if (!svg) return;

    // Generate cities list dynamically from the SVG DOM attributes
    const cities = [];
    const cityGroups = svg.querySelectorAll("g[data-city-code]");
    cityGroups.forEach(group => {
        const plate = group.getAttribute("data-city-code");
        const name = group.getAttribute("data-city-name") || "";
        const id = parseInt(plate);
        cities.push({
            id: id,
            plate: plate,
            name: name,
            regionId: getRegionIdByPlate(plate)
        });
    });

    const svgNamespace = "http://www.w3.org/2000/svg";
    regions.forEach(region => {
        const coord = regionLabelCoords[region.id];
        if (coord) {
            const text = document.createElementNS(svgNamespace, "text");
            text.setAttribute("x", coord.x);
            text.setAttribute("y", coord.y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", "rgba(243, 244, 246, 0.45)");
            text.setAttribute("font-family", "var(--font-header)");
            text.setAttribute("font-size", "10px");
            text.setAttribute("font-weight", "600");
            text.setAttribute("style", "pointer-events: none; text-shadow: 0 1px 3px rgba(0,0,0,0.8); letter-spacing: 0.8px;");
            text.textContent = region.name.split(" ")[0].toUpperCase();
            svg.appendChild(text);
        }
    });

    cityGroups.forEach(group => {
        const cityCode = group.getAttribute("data-city-code");
        const city = cities.find(c => c.plate === cityCode);
        if (!city) return;

        group.addEventListener("mouseenter", (e) => {
            const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
            if (scale === "regions") {
                const regionId = city.regionId;
                const regionCities = cities.filter(c => c.regionId === regionId);
                regionCities.forEach(rc => {
                    const rcGroup = svg.querySelector(`g[data-city-code="${rc.plate}"]`);
                    if (rcGroup) {
                        rcGroup.querySelectorAll("path").forEach(p => p.classList.add("highlight-path"));
                    }
                });
            } else {
                group.querySelectorAll("path").forEach(p => p.classList.add("highlight-path"));
            }
        });

        group.addEventListener("mousemove", (e) => {
            // Tooltip on hover disabled as per request
        });

        group.addEventListener("mouseleave", () => {
            svg.querySelectorAll("path.highlight-path").forEach(p => p.classList.remove("highlight-path"));
            hideTooltip();
        });

        group.addEventListener("click", () => {
            const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
            const parentRegion = getRegionById(city.regionId);
            if (scale === "regions") {
                if (window.logMessage) {
                    window.logMessage(`Seçilen Bölge: ${parentRegion.name}. Bölgesel onay oranı: %${calculateRegionSupport(parentRegion, state)}.`);
                }
                if (typeof window.showRegionDetail === "function") {
                    window.showRegionDetail(parentRegion, null);
                }
            } else {
                const localSupportOffset = Math.round(((city.id * 7) % 9) - 4);
                const support = Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset));
                if (window.logMessage) {
                    window.logMessage(`Seçilen İl: ${city.name} (${city.plate}). Yerel onay oranı: %${support}.`);
                }
                if (typeof window.showRegionDetail === "function") {
                    window.showRegionDetail(parentRegion, city);
                }
            }
        });
    });
}

function drawTurkeyMap(containerId, state, mode = "support", onClickCallback = null) {
    const svg = document.getElementById("svg-turkey");
    if (!svg) return;

    const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
    
    // Generate cities list dynamically from the SVG DOM attributes
    const citiesList = [];
    const cityGroups = svg.querySelectorAll("g[data-city-code]");
    cityGroups.forEach(group => {
        const plate = group.getAttribute("data-city-code");
        const name = group.getAttribute("data-city-name") || "";
        const id = parseInt(plate);
        citiesList.push({
            id: id,
            plate: plate,
            name: name,
            regionId: getRegionIdByPlate(plate)
        });
    });

    // Helper to interpolate between two RGB values
    function interpolateColor(c1, c2, factor) {
        const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
        const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
        const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 1. Support heat color logic (Mat Bordo -> Antrasit -> Orman Yeşili)
    function getSupportColor(value) {
        const colorLow = [166, 60, 62];      // Mat Bordo
        const colorMid = [53, 54, 59];        // Antrasit panel rengi (#35363B)
        const colorHigh = [62, 125, 90];      // Orman Yeşili (#3e7d5a)
        if (value < 50) {
            return interpolateColor(colorLow, colorMid, value / 50);
        } else {
            return interpolateColor(colorMid, colorHigh, (value - 50) / 50);
        }
    }

    // 2. Economy/Satisfaction heatmap logic (Mat Bordo -> Antrasit -> Stratejik Amber)
    function getEconomyColor(value) {
        const colorLow = [166, 60, 62];      // Mat Bordo
        const colorMid = [53, 54, 59];        // Antrasit panel rengi (#35363B)
        const colorHigh = [217, 158, 54];     // Stratejik Amber (#d99e36)
        if (value < 50) {
            return interpolateColor(colorLow, colorMid, value / 50);
        } else {
            return interpolateColor(colorMid, colorHigh, (value - 50) / 50);
        }
    }

    // 3. Ideology mapping (Conservatives: Beige, Seculars: Muted Blue, Nationalists: Mat Bordo, Kurds: Muted Purple, Left: Dusty Rose)
    function getIdeologyColor(regionId) {
        if (regionId === "central_anatolia") return "var(--color-conservative)";
        if (regionId === "aegean") return "var(--color-secular)";
        if (regionId === "marmara") return "var(--color-liberal)";
        if (regionId === "black_sea") return "var(--color-nationalist)";
        if (regionId === "mediterranean") return "var(--color-leftist)";
        if (regionId === "eastern_anatolia") return "var(--color-religious)";
        if (regionId === "southeastern_anatolia") return "var(--color-kurd)";
        return "var(--color-leftist)";
    }

    // 4. Voter group weight mapping (Antrasit -> Stratejik Amber)
    function getGroupWeightColor(weight) {
        const ratio = Math.max(0, Math.min(1, weight / 0.40));
        const colorMid = [53, 54, 59];
        const colorHigh = [217, 158, 54];
        return interpolateColor(colorMid, colorHigh, ratio);
    }

    // Draw Heatmap Fill on Shards
    citiesList.forEach(city => {
        const group = svg.querySelector(`g[data-city-code="${city.plate}"]`);
        if (!group) return;

        const parentRegion = getRegionById(city.regionId);
        const localSupportOffset = Math.round(((city.id * 7) % 9) - 4);
        const localHappinessOffset = Math.round(((city.id * 13) % 9) - 4);

        let value = 50;
        let color = "";

        if (mode === "support") {
            value = scale === "cities" ? Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset)) : calculateRegionSupport(parentRegion, state);
            color = getSupportColor(value);
        } else if (mode === "happiness") {
            value = scale === "cities" ? Math.max(0, Math.min(100, calculateRegionHappiness(parentRegion, state) + localHappinessOffset)) : calculateRegionHappiness(parentRegion, state);
            color = getEconomyColor(value);
        } else if (mode === "ideology") {
            color = getIdeologyColor(parentRegion.id);
        } else if (mode === "economy") {
            let offset = parentRegion.id === "marmara" ? 15 : (parentRegion.id === "eastern_anatolia" ? -12 : 0);
            value = Math.max(0, Math.min(100, state.systems.economy + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getEconomyColor(value);
        } else if (mode === "unemployment") {
            let offset = parentRegion.id === "southeastern_anatolia" ? 18 : (parentRegion.id === "marmara" ? -10 : 0);
            value = Math.max(0, Math.min(100, state.systems.unemployment + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getSupportColor(100 - value);
        } else if (mode === "security") {
            let offset = parentRegion.id === "eastern_anatolia" ? -15 : (parentRegion.id === "central_anatolia" ? 8 : 0);
            value = Math.max(0, Math.min(100, state.systems.security + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getSupportColor(value);
        } else if (mode === "protests") {
            let localSatisfaction = calculateRegionHappiness(parentRegion, state);
            value = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
            color = getSupportColor(100 - value);
        } else if (mode.startsWith("group_")) {
            const groupKey = mode.replace("group_", "");
            const weight = parentRegion.voterDemographics[groupKey] || 0;
            const cityOffset = ((city.id * 3) % 5) - 2; // small organic variation for cities
            const displayWeight = Math.max(0, Math.min(1, weight + (scale === "cities" ? cityOffset * 0.01 : 0)));
            color = getGroupWeightColor(displayWeight);
        }

        const paths = group.querySelectorAll("path");
        paths.forEach(p => {
            p.style.fill = color;
        });
    });

    // Render Pulsing Warning Lights on Regions with High Protest Risk (>50%) or Economic Stress (>50%)
    const existingAlerts = svg.querySelector(".map-alerts");
    if (existingAlerts) existingAlerts.remove();

    const svgNamespace = "http://www.w3.org/2000/svg";
    const alertsGroup = document.createElementNS(svgNamespace, "g");
    alertsGroup.setAttribute("class", "map-alerts");
    svg.appendChild(alertsGroup);

    regions.forEach(region => {
        const localSatisfaction = calculateRegionHappiness(region, state);
        const protestRisk = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
        
        const econ = Math.max(0, Math.min(100, state.systems.economy + (region.id === "marmara" ? 15 : (region.id === "eastern_anatolia" ? -12 : 0))));
        const unemp = Math.max(0, Math.min(100, state.systems.unemployment + (region.id === "southeastern_anatolia" ? 18 : (region.id === "marmara" ? -10 : 0))));
        const econStress = Math.max(0, Math.min(100, (100 - econ) * 1.1 + (unemp * 0.3) + (state.systems.inflation * 0.2) - 20));

        const coords = regionLabelCoords[region.id];
        if (coords) {
            const hasProtest = protestRisk > 50;
            const hasEcon = econStress > 50;

            if (hasProtest && hasEcon) {
                drawAlertDot(coords.x - 9, coords.y - 18, "!", "var(--color-danger)", "pulse-alert-dot");
                drawAlertDot(coords.x + 9, coords.y - 18, "₺", "var(--color-warning)", "pulse-econ-dot");
            } else if (hasProtest) {
                drawAlertDot(coords.x, coords.y - 18, "!", "var(--color-danger)", "pulse-alert-dot");
            } else if (hasEcon) {
                drawAlertDot(coords.x, coords.y - 18, "₺", "var(--color-warning)", "pulse-econ-dot");
            }
        }
    });

    function drawAlertDot(cx, cy, label, fill, pulseClass) {
        const circle = document.createElementNS(svgNamespace, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "7");
        circle.setAttribute("fill", fill);
        circle.setAttribute("class", pulseClass);
        circle.setAttribute("style", "cursor: pointer;");
        alertsGroup.appendChild(circle);

        const text = document.createElementNS(svgNamespace, "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", cy + 3);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", fill === "var(--color-warning)" ? "#1a1917" : "#ffffff");
        text.setAttribute("font-family", "var(--font-header)");
        text.setAttribute("font-size", "9px");
        text.setAttribute("font-weight", "700");
        text.setAttribute("style", "pointer-events: none;");
        text.textContent = label;
        alertsGroup.appendChild(text);
    }
}

function showTooltip(event, target, state, isCity = false) {
    const tooltip = document.getElementById("region-tooltip");
    if (!tooltip) return;

    // Fetch active overlay mode
    const mode = typeof window.activeMapMode !== 'undefined' ? window.activeMapMode : "support";
    
    let title = "";
    let valueText = "";
    let extraInfo = "";
    let progressVal = null;
    let isProgressGood = true;

    const parentRegion = isCity ? getRegionById(target.regionId) : target;
    const localSupportOffset = isCity ? Math.round(((target.id * 7) % 9) - 4) : 0;
    const localHappinessOffset = isCity ? Math.round(((target.id * 13) % 9) - 4) : 0;

    title = isCity ? `${target.plate} - ${target.name.toUpperCase()}` : target.name.toUpperCase();

    if (mode === "support") {
        const support = Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset));
        valueText = `Hükümet Onay Oranı: <strong>%${support}</strong>`;
        progressVal = support;
        isProgressGood = support >= 50;
    } else if (mode === "happiness") {
        const happiness = Math.max(0, Math.min(100, calculateRegionHappiness(parentRegion, state) + localHappinessOffset));
        valueText = `Halk Memnuniyeti: <strong>%${happiness}</strong>`;
        progressVal = happiness;
        isProgressGood = happiness >= 50;
    } else if (mode === "ideology") {
        let dominantGroup = "";
        let maxWeight = 0;
        for (const grp in parentRegion.voterDemographics) {
            if (parentRegion.voterDemographics[grp] > maxWeight) {
                maxWeight = parentRegion.voterDemographics[grp];
                dominantGroup = grp;
            }
        }
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş Dünyası",
            students: "Öğrenciler", retirees: "Emekliler", workers: "Mavi Yaka / İşçiler", farmers: "Çiftçiler",
            civil_servants: "Kamu Çalışanları", youth: "Genç Seçmen", religious: "Dindar / Cemaatler"
        };
        valueText = `Baskın Siyasi Eğilim: <strong>${grpTurkish[dominantGroup] || dominantGroup}</strong>`;
        extraInfo = `Yoğunluk Oranı: <strong>%${Math.round(maxWeight * 100)}</strong>`;
        progressVal = Math.round(maxWeight * 100);
        isProgressGood = true;
    } else if (mode === "economy") {
        let offset = parentRegion.id === "marmara" ? 15 : (parentRegion.id === "eastern_anatolia" ? -12 : 0);
        const econ = Math.max(0, Math.min(100, state.systems.economy + offset + localSupportOffset));
        valueText = `Bölgesel Ekonomik Durum: <strong>%${econ}</strong>`;
        progressVal = econ;
        isProgressGood = econ >= 50;
    } else if (mode === "unemployment") {
        let offset = parentRegion.id === "southeastern_anatolia" ? 18 : (parentRegion.id === "marmara" ? -10 : 0);
        const unemp = Math.max(0, Math.min(100, state.systems.unemployment + offset + localSupportOffset));
        valueText = `İşsizlik Oranı: <strong>%${unemp}</strong>`;
        progressVal = unemp;
        isProgressGood = unemp < 45; // Unemployment is bad if high
    } else if (mode === "security") {
        let offset = parentRegion.id === "eastern_anatolia" ? -15 : (parentRegion.id === "central_anatolia" ? 8 : 0);
        const sec = Math.max(0, Math.min(100, state.systems.security + offset + localSupportOffset));
        valueText = `Asayiş & Güvenlik: <strong>%${sec}</strong>`;
        progressVal = sec;
        isProgressGood = sec >= 50;
    } else if (mode === "protests") {
        let localSatisfaction = calculateRegionHappiness(parentRegion, state);
        const protest = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
        valueText = `Protesto & Kaos Riski: <strong>%${Math.round(protest)}</strong>`;
        progressVal = Math.round(protest);
        isProgressGood = protest < 40; // Protests are bad if high
    } else if (mode.startsWith("group_")) {
        const groupKey = mode.replace("group_", "");
        const weight = parentRegion.voterDemographics[groupKey] || 0;
        const groupData = state.voterGroups[groupKey];
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş İnsanı",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç Seçmen", religious: "Dindar"
        };
        const grpName = grpTurkish[groupKey] || groupKey;
        valueText = `Bölgedeki ${grpName} Oranı: <strong>%${Math.round(weight * 100)}</strong>`;
        progressVal = Math.round(weight * 100);
        isProgressGood = true;
        if (groupData) {
            extraInfo = `Grup Memnuniyeti: <strong>%${Math.round(groupData.satisfaction)}</strong> | Ulusal Onay: <strong>%${Math.round(groupData.approval)}</strong>`;
        }
    }

    if (!isCity && mode !== "ideology" && !mode.startsWith("group_")) {
        let dominantGroup = "";
        let maxWeight = 0;
        for (const grp in target.voterDemographics) {
            if (target.voterDemographics[grp] > maxWeight) {
                maxWeight = target.voterDemographics[grp];
                dominantGroup = grp;
            }
        }
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş İnsanı",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç Seçmen", religious: "Dindar"
        };
        extraInfo = `Baskın Demografi: <strong>${grpTurkish[dominantGroup] || dominantGroup} (%${Math.round(maxWeight * 100)})</strong>`;
    } else if (isCity && mode !== "ideology" && !mode.startsWith("group_")) {
        extraInfo = `Bağlı Coğrafi Bölge: <strong>${parentRegion.name}</strong>`;
    } else if (isCity && mode.startsWith("group_")) {
        extraInfo += ` (Bölge: <strong>${parentRegion.name}</strong>)`;
    }

    function getTooltipBarColorClass(val, isInverted) {
        if (isInverted) {
            return val < 35 ? "green-bg" : (val > 60 ? "red-bg" : "yellow-bg");
        } else {
            return val > 65 ? "green-bg" : (val < 40 ? "red-bg" : "yellow-bg");
        }
    }

    // Build Premium HTML structure with customized indicators
    let progressHtml = "";
    if (progressVal !== null) {
        progressHtml = `
            <div class="progress-bar-wrapper" style="height: 5px; margin: 8px 0 10px; background-color: rgba(255,255,255,0.06);">
                <div class="progress-bar ${getTooltipBarColorClass(progressVal, mode === 'unemployment' || mode === 'protests')}" style="width: ${progressVal}%;"></div>
            </div>
        `;
    }

    // Generate top 3 demographic progress bars for region details
    let demographicsHtml = "";
    if (parentRegion && parentRegion.voterDemographics) {
        demographicsHtml = `
            <div class="tooltip-demographics" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.3px;">Bölge Demografisi</h5>
        `;
        
        const sortedDemographics = Object.entries(parentRegion.voterDemographics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
            
        const grpNames = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt", immigrants: "Göçmen", business: "İş Dünyası",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç", religious: "Dindar"
        };
        
        sortedDemographics.forEach(([grp, ratio]) => {
            const pct = Math.round(ratio * 100);
            const grpName = grpNames[grp] || grp;
            demographicsHtml += `
                <div class="demographic-row" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.6rem; margin-bottom: 4px;">
                    <span style="color: var(--text-secondary);">${grpName}</span>
                    <div style="flex: 1; height: 3px; background: rgba(255,255,255,0.06); margin: 0 8px; border-radius: 1.5px; overflow: hidden;">
                        <div style="width: ${pct}%; height: 100%; background: var(--color-gold-text);"></div>
                    </div>
                    <span style="font-weight: 600; color: var(--text-primary);">%${pct}</span>
                </div>
            `;
        });
        
        demographicsHtml += `</div>`;
    }

    tooltip.innerHTML = `
        <h4>${title}</h4>
        <p>${valueText}</p>
        ${progressHtml}
        <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px; margin-bottom: 2px;">${extraInfo}</p>
        ${demographicsHtml}
    `;
    
    tooltip.classList.remove("hidden");
    moveTooltip(event);
}

function moveTooltip(event) {
    const tooltip = document.getElementById("region-tooltip");
    if (!tooltip) return;
    
    const mapWrapper = document.querySelector(".map-wrapper");
    const rect = mapWrapper.getBoundingClientRect();
    
    const x = event.clientX - rect.left + 15;
    const y = event.clientY - rect.top + 15;
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById("region-tooltip");
    if (tooltip) {
        tooltip.classList.add("hidden");
    }
}

// ==============================
// SECTION: js/charts.js
// ==============================

/**
 * TURKEY 2038 - CUSTOM HTML5 CANVAS TELEMETRY CHART
 */

function renderHistoryChart(canvasId, historyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 20, bottom: 25, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const dataPoints = historyData.turns.length;
    if (dataPoints < 2) {
        // Draw waiting placeholder
        ctx.fillStyle = "var(--text-secondary)";
        ctx.font = "11px var(--font-header)";
        ctx.textAlign = "center";
        ctx.fillText("WAITING FOR HISTORICAL TELEMETRY...", width / 2, height / 2);
        return;
    }

    // Grid Setup (4 intervals: 0, 25, 50, 75, 100)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(148, 163, 184, 0.5)"; // text-secondary with transparency
    ctx.font = "8px var(--font-header)";
    ctx.textAlign = "right";

    const yIntervals = [0, 25, 50, 75, 100];
    yIntervals.forEach(val => {
        const y = padding.top + chartHeight - (val / 100) * chartHeight;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();

        // Draw label
        ctx.fillText(`${val}%`, padding.left - 8, y + 3);
    });

    // Draw Vertical Turn Grid
    ctx.textAlign = "center";
    const xInterval = Math.max(1, Math.floor(dataPoints / 6)); // limit labels on x-axis
    for (let i = 0; i < dataPoints; i++) {
        const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
        
        // Draw vertical ticks
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();

        // Draw X-axis label
        if (i % xInterval === 0 || i === dataPoints - 1) {
            ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
            ctx.fillText(historyData.turns[i], x, padding.top + chartHeight + 15);
        }
    }

    // Colors mapping
    const lines = [
        { data: historyData.happiness, color: "#4FA286", label: "Happiness" }, // Muted Green
        { data: historyData.economy, color: "#5395E2", label: "Economy" },     // Muted Navy
        { data: historyData.inflation, color: "#E35E6D", label: "Inflation" }, // Muted Burgundy
        { data: historyData.playerPoll, color: "#E5B85C", label: "Approval" }  // Muted Gold
    ];

    // Plot Lines
    lines.forEach(line => {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        for (let i = 0; i < dataPoints; i++) {
            const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
            const y = padding.top + chartHeight - (line.data[i] / 100) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Draw Area Fill Gradient (no shadow for fills)
        ctx.shadowBlur = 0;
        const fillGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
        fillGradient.addColorStop(0, `${line.color}15`); // very low opacity
        fillGradient.addColorStop(1, `${line.color}00`);

        ctx.fillStyle = fillGradient;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top + chartHeight);
        for (let i = 0; i < dataPoints; i++) {
            const x = padding.left + (i / (dataPoints - 1)) * chartWidth;
            const y = padding.top + chartHeight - (line.data[i] / 100) * chartHeight;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
        ctx.closePath();
        ctx.fill();
    });

    // Draw Chart Border
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(56, 63, 76, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(padding.left, padding.top, chartWidth, chartHeight);
    ctx.stroke();
}

// ==============================
// SECTION: js/ui.js
// ==============================

/**
 * TURKEY 2038 - MAIN UI CONTROLLER & ROUTER
 */









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

function playUiSound(type) {
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
function saveSettings() {
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
function loadAndApplySettings() {
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

function startMenuCanvasAnimation() {
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
function runTelemetryLog() {
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

function createIdeologicalAvatarSVG(ideology, size = 44, name = "") {
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

function applyIdeologicalAppointmentReactions(ideology) {
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

function getMinisterEffects(portfolioKey, minister) {
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

function showMinisterDetailModal(portfolioKey, minister, meta) {
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

function renderPowerBalanceDashboard() {
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

function renderPowerBalanceModal() {
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
function showContinuePreviewModal(savedStateStr) {
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
function applyTheme(theme) {
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
function showIdeologyDetailModal(ideologyKey) {
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

function showVoterGroupDetailModal(groupKey) {
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

const factionBargains = {
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

function renderRegimeWatchCenter() {
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

function showFactionDetailModal(factionKey) {
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

function processBargain(factionKey, index) {
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

function startPurgeOperation(targetKey, alliesKeys) {
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

function getPurgeSuccessChance(p) {
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

function renderActivePurge() {
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

function renderActiveDemand() {
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

function executePurgeFinalDecision() {
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

function showSecretFileModal(callback) {
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

