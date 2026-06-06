const fs = require('fs');
const path = require('path');

const unzippedPath = 'c:\\Users\\ASUS\\Desktop\\OpenFile_unzipped';
const sharedStringsFile = path.join(unzippedPath, 'xl', 'sharedStrings.xml');
const sheet1File = path.join(unzippedPath, 'xl', 'worksheets', 'sheet1.xml');

function parseSharedStrings() {
    const content = fs.readFileSync(sharedStringsFile, 'utf8');
    const strings = [];
    const matches = content.match(/<t(?:\s+xml:space="preserve")?>([^<]*)<\/t>/g);
    if (matches) {
        matches.forEach(m => {
            const val = m.replace(/<t(?:\s+xml:space="preserve")?>/, '').replace(/<\/t>/, '');
            strings.push(val);
        });
    }
    return strings;
}

function parseSheet(strings) {
    const content = fs.readFileSync(sheet1File, 'utf8');
    const schedule = [];
    
    // Day ranges (based on A column merges)
    const days = [
        { name: 'Pazartesi', start: 6, end: 14 },
        { name: 'Salı', start: 15, end: 23 },
        { name: 'Çarşamba', start: 24, end: 32 },
        { name: 'Perşembe', start: 33, end: 41 },
        { name: 'Cuma', start: 42, end: 50 }
    ];

    // Columns for each class level
    const classLevels = [
        { name: 'Sınıf I', timeCol: 'B', courseCol: 'D', teacherCol: 'E', roomCol: 'F' },
        { name: 'Sınıf II', timeCol: 'G', courseCol: 'I', teacherCol: 'J', roomCol: 'K' },
        { name: 'Sınıf III', timeCol: 'L', courseCol: 'N', teacherCol: 'O', roomCol: 'P' },
        { name: 'Sınıf IV', timeCol: 'Q', courseCol: 'S', teacherCol: 'T', roomCol: 'U' }
    ];

    days.forEach(day => {
        for (let r = day.start; r <= day.end; r++) {
            classLevels.forEach(level => {
                const time = getCellValue(content, level.timeCol + r, strings);
                const course = getCellValue(content, level.courseCol + r, strings);
                const teacher = getCellValue(content, level.teacherCol + r, strings);
                const room = getCellValue(content, level.roomCol + r, strings);

                if (course && course.trim() !== '' && course !== 'ÜSD') {
                    schedule.push({
                        day: day.name,
                        level: level.name,
                        time: time,
                        course: course.trim(),
                        teacher: teacher ? teacher.trim() : '',
                        room: room ? room.trim() : ''
                    });
                }
            });
        }
    });
    return schedule;
}

function getCellValue(xml, cellRef, strings) {
    const cellRegex = new RegExp(`<c r="${cellRef}"[^>]*>(?:<v>([^<]*)<\/v>)?<\/c>`);
    const match = xml.match(cellRegex);
    if (!match) return null;
    
    const value = match[1];
    if (value === undefined) return null;

    const isShared = match[0].includes('t="s"');
    if (isShared) {
        return strings[parseInt(value)];
    }
    return value;
}

try {
    const strings = parseSharedStrings();
    const schedule = parseSheet(strings);
    fs.writeFileSync('c:\\Users\\ASUS\\.gemini\\antigravity\\playground\\prismic-whirlpool\\kou-sbf-ekran\\schedule.json', JSON.stringify(schedule, null, 2));
    console.log('Schedule parsed successfully!');
} catch (e) {
    console.error('Error parsing schedule:', e);
}
