/**
 * TURKEY 2038 - RANDOM EVENTS DATABASE
 */

export const events = [
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

export function triggerRandomEvent(state) {
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

export function triggerPrioritizedCrisisEvent(state, triggerGameOver) {
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

export const emergencyEvents = [
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

export function triggerEmergencyEvent(state) {
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

export const echoEventsDatabase = {
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

export const premiumEvents = [
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
