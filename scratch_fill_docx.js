const AdmZip = require('adm-zip');
const { DOMParser, XMLSerializer } = require('xmldom');
const fs = require('fs');

const inPath = 'C:\\Users\\ASUS\\Desktop\\Proje Teknik Rapor.docx';
const outPath = 'C:\\Users\\ASUS\\Desktop\\KO_ECON_MEDYA_Teknik_Rapor.docx';

// Text contents
const PROJE_ADI = "KOÜ Econ Medya";
const EKIP = "Ahmet Faruk Tecim";
const AMAC = "KOÜ Econ Medya, Kocaeli Üniversitesi Siyasal Bilgiler Fakültesi İktisat Bölümü öğrencilerinin akademik, sosyal ve güncel ekonomik gelişmelerden anında haberdar olmalarını sağlamak amacıyla tasarlanmış dijital bir bilgi paneli ve eğitim platformudur. Amacı, öğrencilerin vizyonunu geliştirecek içerikler (kitap/film önerileri), güncel ekonomik veriler (döviz, enflasyon), fakülte duyuruları ve interaktif ekonomi oyunları ('Merkez Bankası Benim!' simülasyonu) sunarak eğitim deneyimini oyunlaştırmak ve zenginleştirmektir.";
const KAPSAM = "Uygulama, canlı piyasa verilerini (USD, EUR, BIST, Altın) API üzerinden çekerek yayınlamayı, üniversite duyurularını ve akademik takvimi göstermeyi, öğrencilere yönelik haftalık film/kitap önerileri sunmayı ve Merkez Bankası faiz-enflasyon dinamiklerini anlatan etkileşimli bir simülasyon oyununu barındırmayı kapsar. E-ticaret veya satış modülleri proje kapsamı dışındadır.";
const SENARYOLAR = "Kullanıcılar sisteme giriş yaparak canlı piyasa ekranını görüntüleyebilir, güncel fakülte duyurularını okuyabilir. Öğrenciler 'Oyun Merkezi'ne girerek Merkez Bankası başkanı simülasyonunu başlatabilir; politika faizi, rezerv satışı, para basma ve KKM gibi araçları kullanarak enflasyonu düşürmeye çalışabilirler. Sistem, yapılan ekonomik tercihlerin sonuçlarını anlık olarak grafiksel dashboard üzerinde kullanıcıya sunar.";
const MIMARI = "Frontend geliştiriminde HTML5, modern tasarım için Tailwind CSS ve dinamik arayüz etkileşimleri için Vanilla JavaScript kullanılmıştır. Canlı ekonomik veri görselleştirmeleri için Chart.js entegre edilmiştir. Uygulama altyapısı ve barındırma hizmetleri için Google Firebase Hosting kullanılmış olup, veri yönetimi süreçleri için Fetch API ve çeşitli açık kaynaklı piyasa/haber API'leri (NewsAPI vb.) entegre edilmiştir.";
const IS_AKISI = "Öğrenci (Kullanıcı) paneli açar -> Güncel döviz kurları, hava durumu ve fakülte duyuruları canlı olarak API'lerden çekilip ekrana yansıtılır -> Kullanıcı 'Haftanın Vizyonu' modülünden kitap/film önerisini inceler -> Oyun modülüne geçiş yapar -> 'Merkez Bankası Benim!' oyununda ekonomik kararlar alır (Faiz artırımı, rezerv satışı) -> Oyun motoru verileri işler -> Enflasyon ve kur sonuçları canlı grafiklerle kullanıcıya gösterilir.";

function setText(doc, cellNode, text) {
    // Clear cell
    while(cellNode.firstChild) {
        cellNode.removeChild(cellNode.firstChild);
    }
    const wp = doc.createElement('w:p');
    const wr = doc.createElement('w:r');
    const wt = doc.createElement('w:t');
    wt.textContent = text;
    wr.appendChild(wt);
    wp.appendChild(wr);
    cellNode.appendChild(wp);
}

try {
    const zip = new AdmZip(inPath);
    const xml = zip.readAsText("word/document.xml");
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    
    const tables = doc.documentElement.getElementsByTagName('w:tbl');
    
    // Table 0: Info
    let t0_rows = tables[0].getElementsByTagName('w:tr');
    setText(doc, t0_rows[0].getElementsByTagName('w:tc')[1], PROJE_ADI);
    setText(doc, t0_rows[1].getElementsByTagName('w:tc')[1], EKIP);
    setText(doc, t0_rows[2].getElementsByTagName('w:tc')[1], "Web Uygulaması ☒ Mobil Uygulama ☐ Masaüstü Uygulaması ☐");

    // Table 1: Amaç
    setText(doc, tables[1].getElementsByTagName('w:tc')[0], AMAC);

    // Table 2: Kapsam
    setText(doc, tables[2].getElementsByTagName('w:tc')[0], KAPSAM);

    // Table 3: Senaryolar
    setText(doc, tables[3].getElementsByTagName('w:tc')[0], SENARYOLAR);

    // Table 4: Mimari
    setText(doc, tables[4].getElementsByTagName('w:tc')[0], MIMARI);

    // Table 5: İş Akışı
    setText(doc, tables[5].getElementsByTagName('w:tc')[0], IS_AKISI);

    // Table 6: İmza
    let t6_rows = tables[6].getElementsByTagName('w:tr');
    setText(doc, t6_rows[1].getElementsByTagName('w:tc')[0], EKIP);

    const newXml = new XMLSerializer().serializeToString(doc);
    zip.updateFile("word/document.xml", Buffer.from(newXml, "utf8"));
    zip.writeZip(outPath);

    console.log("Rapor başarıyla oluşturuldu:", outPath);
} catch (e) {
    console.error(e);
}
