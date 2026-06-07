const fs = require('fs');
const path = 'C:\\Users\\ASUS\\Desktop\\sbf-hub\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Replace Amazon links with Wikimedia/OpenLibrary links
content = content.replace('"https://m.media-amazon.com/images/I/81B1z+Tnf+L._AC_UF1000,1000_QL80_.jpg"', '"https://covers.openlibrary.org/b/isbn/9780307719218-L.jpg"');
content = content.replace('"https://m.media-amazon.com/images/I/71Y+J9P3KJL._AC_UF1000,1000_QL80_.jpg"', '"https://covers.openlibrary.org/b/isbn/9780374275631-L.jpg"');
content = content.replace('"https://m.media-amazon.com/images/I/81l3GZ1r2vL._AC_UF1000,1000_QL80_.jpg"', '"https://covers.openlibrary.org/b/isbn/9780060731328-L.jpg"');
content = content.replace('"https://m.media-amazon.com/images/I/71gP-2V1lUL._AC_UF1000,1000_QL80_.jpg"', '"https://covers.openlibrary.org/b/isbn/9780684862149-L.jpg"');
content = content.replace('"https://m.media-amazon.com/images/I/71X8k49eBXL._AC_UF1000,1000_QL80_.jpg"', '"https://covers.openlibrary.org/b/isbn/9780143115267-L.jpg"');

content = content.replace('"https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg"', '"https://upload.wikimedia.org/wikipedia/en/e/e3/The_Big_Short_teaser_poster.jpg"');
content = content.replace('"https://m.media-amazon.com/images/M/MV5BMTQ4NDU3NDk2N15BMl5BanBnXkFtZTcwNTMyOTkwNg@@._V1_.jpg"', '"https://upload.wikimedia.org/wikipedia/en/3/36/Margin_Call_poster.jpg"');
content = content.replace('"https://m.media-amazon.com/images/M/MV5BMzcwYWFkNmItZjczNi00ZTUzLWIyOTctNDQ4ODIyZjFmZWUzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"', '"https://upload.wikimedia.org/wikipedia/en/b/b8/A_Beautiful_Mind_Poster.jpg"');
content = content.replace('"https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg"', '"https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png"');
content = content.replace('"https://m.media-amazon.com/images/M/MV5BMTIxMTU5MjkxM15BMl5BanBnXkFtZTcwMTc0ODQ0Mw@@._V1_.jpg"', '"https://upload.wikimedia.org/wikipedia/en/3/35/Inside_Job_2010_poster.jpg"');

fs.writeFileSync(path, content, 'utf8');
console.log("Resim linkleri başarıyla güvenilir kaynaklarla (Wikimedia & OpenLibrary) değiştirildi.");
