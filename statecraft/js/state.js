/**
 * TURKEY 2038 - GAME STATE MANAGEMENT
 */

export const state = {
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
export const candidatesPool = [
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
export const coalitionPartners = [
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

export function getQuarterString(turn) {
    const startYear = 2036;
    const currentYear = startYear + Math.floor((turn - 1) / 4);
    const quarter = ((turn - 1) % 4) + 1;
    return `Q${quarter} ${currentYear}`;
}

export function initGameState(partyName, ideology, difficulty, leaderName = "Lider", leaderTrait = "diplomat") {
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

export function recordHistoryPoint() {
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

export function calculatePollingSupport() {
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
