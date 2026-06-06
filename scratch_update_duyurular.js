const fs = require('fs');

let html = fs.readFileSync('duyurular.html', 'utf8');

const regex = /(<h4 class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">\$\{data\.title\}<\/h4>\s*<p class="text-secondary text-body-sm line-clamp-2">\$\{data\.content\}<\/p>)/i;
const replaceWith = `$1\n                          \${data.attachmentUrl ? \`<a href="\${data.attachmentUrl}" target="_blank" class="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md mt-2 font-bold hover:bg-primary/20 transition-colors w-fit" onclick="event.stopPropagation();"><span class="material-symbols-outlined text-[12px]">attachment</span> \${data.attachmentName || 'Ek Dosyayı İndir'}</a>\` : ''}`;

html = html.replace(regex, replaceWith);

fs.writeFileSync('duyurular.html', html, 'utf8');
console.log('duyurular.html updated');
