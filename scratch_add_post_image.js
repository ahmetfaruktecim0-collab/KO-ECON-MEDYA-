const fs = require('fs');

let content = fs.readFileSync('iktisatcinin-kaleminden.html', 'utf8');

// 1. Update imports
content = content.replace(
    /import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from '\.\/firebase-config\.js';/,
    "import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, storage, ref, uploadBytes, getDownloadURL } from './firebase-config.js';"
);

// 2. Add input file
const inputHtml = `
            <div>
                <label class="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Görsel (Opsiyonel)</label>
                <input id="post-image" type="file" accept="image/*" class="w-full bg-surface-dim/30 border border-outline-variant/10 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Kategori</label>
`;
content = content.replace(/<div>\s*<label class="block text-\[10px\] font-bold text-on-surface-variant\/60 uppercase tracking-widest mb-1">Kategori<\/label>/, inputHtml);

// 3. Clear file field on close
content = content.replace(
    "document.getElementById('post-content').value = '';",
    "document.getElementById('post-content').value = '';\n            if(document.getElementById('post-image')) document.getElementById('post-image').value = '';"
);

// 4. Handle upload in submitPost
// Find the addDoc call
const submitStart = content.indexOf('await addDoc(collection(db, \'posts\')');
if (submitStart > -1) {
    const uploadLogic = `
            let imageUrl = null;
            const fileInput = document.getElementById('post-image');
            if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const storageRef = ref(storage, 'post_images/' + Date.now() + '_' + file.name);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'posts'), {
                imageUrl: imageUrl,`;
    content = content.replace(/await addDoc\(collection\(db, 'posts'\), \{/, uploadLogic);
}

fs.writeFileSync('iktisatcinin-kaleminden.html', content, 'utf8');
console.log("Updated post modal with image upload");
