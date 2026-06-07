const fs = require('fs');
const path = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\index.html';
let content = fs.readFileSync(path, 'utf8');

// The HTML block we added previously
const oldHTMLRegex = /<!-- Haftanın Vizyonu \(Film & Kitap\) -->[\s\S]*?<!-- Yaklaşan Etkinlikler -->/;

const newHTML = `<!-- Haftanın Vizyonu (Film & Kitap) -->
<div class="bg-gradient-to-br from-surface-container-highest to-surface p-card-padding rounded-2xl shadow-sm border border-primary/20 relative overflow-hidden group mb-8">
    <div class="absolute -right-6 -top-6 text-primary opacity-5 group-hover:scale-110 transition-transform duration-700">
        <span class="material-symbols-outlined text-[120px]" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
    </div>
    <div class="relative z-10">
        <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">movie</span>
            <h3 class="font-title-md text-title-md text-primary font-bold">Haftanın Vizyonu</h3>
        </div>

        <!-- Kitap Önerisi -->
        <div class="mb-6 bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/50 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex gap-4">
                <div class="w-16 h-24 rounded-lg flex-shrink-0 overflow-hidden shadow-md border border-primary/20 bg-surface-container">
                    <img id="vision-book-img" src="" alt="Kitap Kapağı" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col justify-center">
                    <span class="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">HAFTANIN KİTABI</span>
                    <h4 id="vision-book-title" class="font-bold text-on-surface text-sm mb-1 leading-tight">Yükleniyor...</h4>
                    <p id="vision-book-desc" class="text-xs text-on-surface-variant line-clamp-3">...</p>
                </div>
            </div>
        </div>

        <!-- Film Önerisi -->
        <div class="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/50 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex gap-4">
                <div class="w-16 h-24 rounded-lg flex-shrink-0 overflow-hidden shadow-md border border-error/20 bg-surface-container">
                    <img id="vision-movie-img" src="" alt="Film Afişi" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col justify-center">
                    <span class="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">HAFTANIN FİLMİ</span>
                    <h4 id="vision-movie-title" class="font-bold text-on-surface text-sm mb-1 leading-tight">Yükleniyor...</h4>
                    <p id="vision-movie-desc" class="text-xs text-on-surface-variant line-clamp-3">...</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Haftalık Vizyon Verileri
    const visionData = {
        books: [
            {
                title: "Ulusların Düşüşü",
                desc: "Daron Acemoğlu ve James A. Robinson'un başyapıtı. Neden bazı ülkeler zenginken diğerleri fakir? Kurumların ekonomik kalkınmadaki devasa rolünü anlatıyor.",
                img: "https://m.media-amazon.com/images/I/81B1z+Tnf+L._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Hızlı ve Yavaş Düşünme",
                desc: "Davranışsal iktisadın babası Nobel ödüllü Daniel Kahneman'dan, insanların neden irrasyonel ekonomik kararlar aldığını açıklayan harika bir eser.",
                img: "https://m.media-amazon.com/images/I/71Y+J9P3KJL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Görünmeyen Ekonomi (Freakonomics)",
                desc: "Steven Levitt'ten suç oranları, emlakçılar ve hilekarlık gibi alakasız görünen gündelik olayların arkasındaki gizli ekonomik gerçekler.",
                img: "https://m.media-amazon.com/images/I/81l3GZ1r2vL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Dünyevi Filozoflar",
                desc: "Robert L. Heilbroner. Adam Smith'ten Karl Marx'a, büyük iktisadi düşünürlerin hayatlarını ve teorilerini hikaye tadında anlatan kült kitap.",
                img: "https://m.media-amazon.com/images/I/71gP-2V1lUL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Nudge (Dürtme)",
                desc: "Richard Thaler (Nobel Ödüllü). Sağlık, zenginlik ve mutlulukla ilgili kararlarımızı daha iyi almamız için mimari seçimlerin (dürtmelerin) nasıl tasarlandığını anlatır.",
                img: "https://m.media-amazon.com/images/I/71X8k49eBXL._AC_UF1000,1000_QL80_.jpg"
            }
        ],
        movies: [
            {
                title: "The Big Short (Büyük Açık)",
                desc: "2008 Küresel Finans Krizi'nin perde arkasını, CDS'leri ve mortgage balonunu esprili bir dille anlatan, ekonomi öğrencileri için kült film.",
                img: "https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg"
            },
            {
                title: "Margin Call (Oyunun Sonu)",
                desc: "2008 krizinin patlak verdiği o kritik ilk 24 saatte, bir yatırım bankasının içerisindeki panik ve ahlaki çöküşü anlatan muazzam bir gerilim.",
                img: "https://m.media-amazon.com/images/M/MV5BMTQ4NDU3NDk2N15BMl5BanBnXkFtZTcwNTMyOTkwNg@@._V1_.jpg"
            },
            {
                title: "A Beautiful Mind (Akıl Oyunları)",
                desc: "Modern oyun teorisinin kurucularından Nobel ödüllü ekonomist ve matematikçi John Nash'in hayatını anlatan ilham verici ve dokunaklı başyapıt.",
                img: "https://m.media-amazon.com/images/M/MV5BMzcwYWFkNmItZjczNi00ZTUzLWIyOTctNDQ4ODIyZjFmZWUzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
            },
            {
                title: "The Wolf of Wall Street",
                desc: "Finansal piyasalardaki yozlaşmayı, aşırı açgözlülüğü ve manipülasyonu Jordan Belfort'un gerçek hayat hikayesi üzerinden efsanevi bir şekilde işliyor.",
                img: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg"
            },
            {
                title: "Inside Job (İç İşler)",
                desc: "2008 krizinin nasıl ve kimler tarafından çıkarıldığını anlatan, akademi ve Wall Street arasındaki kirli ilişkileri deşifre eden Oscar ödüllü belgesel.",
                img: "https://m.media-amazon.com/images/M/MV5BMTIxMTU5MjkxM15BMl5BanBnXkFtZTcwMTc0ODQ0Mw@@._V1_.jpg"
            }
        ]
    };

    function setWeeklyVision() {
        // Yılın kaçıncı haftasında olduğumuzu hesapla
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        const weekNumber = Math.floor(diff / oneWeek);

        // Haftaya göre index belirle (modül aritmetiği ile döngüye sok)
        const bookIndex = weekNumber % visionData.books.length;
        const movieIndex = weekNumber % visionData.movies.length;

        const book = visionData.books[bookIndex];
        const movie = visionData.movies[movieIndex];

        // HTML'i güncelle
        document.getElementById('vision-book-title').textContent = book.title;
        document.getElementById('vision-book-desc').textContent = book.desc;
        document.getElementById('vision-book-img').src = book.img;

        document.getElementById('vision-movie-title').textContent = movie.title;
        document.getElementById('vision-movie-desc').textContent = movie.desc;
        document.getElementById('vision-movie-img').src = movie.img;
    }

    // Sayfa yüklendiğinde çalıştır
    document.addEventListener('DOMContentLoaded', setWeeklyVision);
</script>

<!-- Yaklaşan Etkinlikler -->`;

if (oldHTMLRegex.test(content)) {
    content = content.replace(oldHTMLRegex, newHTML);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Haftalık vizyon güncellendi.");
} else {
    console.log("Hedef block bulunamadı.");
}
