const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// Remove updateTeacher
const updateStart = html.indexOf('window.updateTeacher = async function()');
if (updateStart > -1) {
    const updateEnd = html.indexOf('};', updateStart) + 2;
    html = html.substring(0, updateStart) + html.substring(updateEnd);
}

// Remove the onSnapshot for teacher_of_week
const snapStart = html.indexOf('onSnapshot(doc(db, \'settings\', \'global_config\')');
if (snapStart > -1) {
    const snapEnd = html.indexOf('});', snapStart) + 3;
    html = html.substring(0, snapStart) + html.substring(snapEnd);
}

fs.writeFileSync('admin.html', html, 'utf8');
console.log("Cleaned admin JS");
