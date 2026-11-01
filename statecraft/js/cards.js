/**
 * TURKEY EXECUTIVE DASHBOARD - POLICY DEFINITIONS
 */

export const policies = [
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

export function getPolicyById(id) {
    return policies.find(p => p.id === id);
}
