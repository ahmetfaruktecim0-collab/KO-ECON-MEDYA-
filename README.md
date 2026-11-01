# KOÜ Econ Medya - Proje Teknik Raporu

**Geliştirici:** Ahmet Faruk Tecim  
**Kurum:** Kocaeli Üniversitesi Siyasal Bilgiler Fakültesi İktisat Bölümü  
**Ders:** İktisatta Bilgisayar Uygulamaları Dersi (2025-2026 Dönemi)  
**Proje Türü:** Web Uygulaması / PWA (Progressive Web App)  
**Canlı Yayın Bağlantısı:** [kousbf-tv.web.app](https://kousbf-tv.web.app)

---

## 📌 Proje Tanımı ve Amacı
**KOÜ Econ Medya**, İktisat Bölümü öğrencilerinin akademik, sosyal ve güncel ekonomik gelişmelerden anında haberdar olmalarını sağlamak amacıyla tasarlanmış dijital bir bilgi paneli ve eğitim platformudur. 

Projenin temel amacı:
- Öğrencilerin vizyonunu geliştirecek nitelikli içerikler (haftalık kitap/film önerileri) sunmak.
- Güncel ekonomik verileri (Döviz, Borsa, Altın) anlık olarak yansıtmak.
- Fakülte duyurularını ve yemekhane menüsünü tek bir merkezde toplamak.
- Teorik iktisat derslerini, interaktif oyunlarla (örn: "Merkez Bankası Benim!" simülasyonu) pratik ve eğlenceli bir deneyime dönüştürmek.

---

## 🎯 Kullanıcı Senaryoları ve Fonksiyonel Gereksinimler
Platform, kullanıcı dostu arayüzü sayesinde aşağıdaki senaryoları eksiksiz destekler:
1. **Canlı Piyasa Takibi:** Kullanıcı, platformu açtığı anda güncel döviz kurlarını ve borsa verilerini görüntüleyebilir.
2. **Akademik Bilgi Akışı:** Fakülteden gelen en son duyurular ekranda otomatik bir kayan yazı (marquee) ile sunulur.
3. **Vizyon Geliştirme (Haftanın Vizyonu):** Öğrenciler haftalık olarak değişen vizyoner ekonomi kitapları ve filmlerini inceleyebilir.
4. **Oyun Merkezi:** Kullanıcılar "Oyun Merkezi" modülüne girerek **Merkez Bankası Benim!** oyununu oynayabilir; politika faizi, zorunlu karşılık oranları (ZKO), döviz müdahalesi ve KKM gibi araçlarla ekonomiyi yönetmeye çalışırlar. Kararların sonuçları anlık grafiklerle (Chart.js) raporlanır.
5. **PWA Desteği:** Kullanıcılar, web sitesini telefonlarına veya bilgisayarlarına bir mobil uygulama gibi (Progressive Web App) yükleyebilir, çevrimdışı önbellekleme özellikleri sayesinde uygulamaya hızlıca erişebilirler.

---

## ⚙️ Sistem Mimarisi, Teknolojiler ve Araçlar
Proje, tamamen modern web standartlarına uygun şekilde "Serverless" (sunucusuz) mimari ile geliştirilmiştir.

- **Frontend (Önyüz):** HTML5, Tailwind CSS (Glassmorphism tasarımı) ve Vanilla JavaScript.
- **Veri Görselleştirme:** Chart.js (Merkez Bankası oyun grafikleri için).
- **Veri Entegrasyonu:** Fetch API kullanılarak çeşitli açık kaynaklı piyasa ve hava durumu API'leri ent极re edilmiştir.
- **Dağıtım ve Barındırma (Hosting):** Google Firebase Hosting kullanılarak küresel çapta hızlı erişim ve SSL sertifikası sağlanmıştır.
- **PWA (Progressive Web App):** Özel `manifest.json` ve `service-worker.js` dosyalarıyla donatılarak PWA Builder (Microsoft) testlerinden tam puan alacak şekilde yapılandırılmıştır.

---

## 🔄 İş Akışı (Workflow)
1. **Veri Çekme (Fetch):** Uygulama yüklendiğinde anlık piyasa verileri ve hava durumu arka planda API üzerinden asenkron olarak çekilir.
2. **Render:** Tailwind CSS sınıflarıyla hazırlanan modern Grid/Flexbox mimarisine veriler dinamik olarak enjekte edilir.
3. **Etkileşim:** Kullanıcı, menü aracılığıyla "Oyun Merkezi"ne geçer.
4. **Simülasyon:** Kullanıcı "Merkez Bankası Benim!" oyununda faiz, ZKO veya rezerv satışı butonu tıklar.
5. **Algoritma:** Arka planda çalışan oyun motoru makroekonomik verileri (enflasyon, işsizlik, kur) hesaplar ve Chart.js üzerinden canlı olarak ekrana basar. Kriz durumlarında ekrana titreşim (shake) ve uyarı animasyonları yansıtılır.

---

## 🚀 Sonuç ve Gelecek Geliştirmeler
**KOÜ Econ Medya**, yalnızca bir haber paneli olmanın ötesine geçerek, öğrencilere makroekonomik kararların sonuçlarını yaşayarak öğreten yenilikçi bir akademik üründür. Gelecekte, uygulamaya Firebase Realtime Database entegre edilerek "Liderlik Tablosu" (Yüksek Skor) modülünün getirilmesi ve farklı ekonomik kriz senaryolarının (örn: Pandemi etkisi) oyuna dahil edilmesi planlanmaktadır.
