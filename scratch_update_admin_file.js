const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 1. Add file input to the Duyuru modal
const duyuruModalContent = `                  <div>
                      <label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Duyuru Başlığı</label>
                      <input id="modal-input-1" type="text" class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Duyuru başlığını girin...">
                  </div>
                  <div>
                      <label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Duyuru İçeriği</label>
                      <textarea id="modal-input-2" rows="4" class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Duyuru metnini girin..."></textarea>
                  </div>
                  <div class="mt-2">
                      <label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Dosya Eki (İsteğe Bağlı)</label>
                      <input id="modal-input-file" type="file" class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer">
                  </div>`;

// We'll use a simple replace for the body.innerHTML of duyuru
html = html.replace(/<div>[\s\n]*<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Duyuru Ba.l...<\/label>[\s\n]*<input id="modal-input-1"[^>]*>[\s\n]*<\/div>[\s\n]*<div>[\s\n]*<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Duyuru ..eri.i<\/label>[\s\n]*<textarea id="modal-input-2"[^>]*><\/textarea>[\s\n]*<\/div>/i, duyuruModalContent);

// 2. Modify the save logic
const saveLogicRegex = /(if \(currentModalType === 'duyuru'\) \{\s*data\.title = document\.getElementById\('modal-input-1'\)\.value;\s*data\.content = document\.getElementById\('modal-input-2'\)\.value;\s*if\(!data\.title\) throw new Error\("Ba.l.k bo. olamaz"\);)/i;

const newSaveLogic = `$1
                  const fileInput = document.getElementById('modal-input-file');
                  if (fileInput && fileInput.files.length > 0) {
                      const file = fileInput.files[0];
                      const fileRef = ref(storage, 'announcements/' + Date.now() + '_' + file.name);
                      
                      const btn = document.querySelector('#modal button.bg-primary');
                      const origText = btn.innerHTML;
                      btn.innerHTML = 'Yükleniyor... <span class="material-symbols-outlined animate-spin text-sm">refresh</span>';
                      btn.disabled = true;
                      
                      await uploadBytes(fileRef, file);
                      data.attachmentUrl = await getDownloadURL(fileRef);
                      data.attachmentName = file.name;
                      
                      btn.innerHTML = origText;
                      btn.disabled = false;
                  }`;

html = html.replace(saveLogicRegex, newSaveLogic);

// 3. Update the display logic in admin.html to show attachment
const displayRegex = /(<h4 class="font-bold text-on-surface">\$\{data\.title\}<\/h4>\s*<p class="text-xs text-on-surface-variant\/60 mt-1 truncate max-w-sm">\$\{data\.content \|\| ''\}<\/p>)/i;
const newDisplay = `$1\n                          \${data.attachmentUrl ? \`<a href="\${data.attachmentUrl}" target="_blank" class="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md mt-2 font-bold hover:bg-primary/20 transition-colors"><span class="material-symbols-outlined text-[12px]">attachment</span> \${data.attachmentName || 'Ek Dosya'}</a>\` : ''}`;

html = html.replace(displayRegex, newDisplay);

fs.writeFileSync('admin.html', html, 'utf8');
console.log('admin.html updated');
