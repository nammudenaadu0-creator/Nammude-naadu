const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Clean and create www
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

const filesToCopy = [
    'index.html',
    'admin.html',
    'manifest.json',
    'sw.js',
    'location-service.js'
];

const dirsToCopy = [
    'css',
    'js',
    'img'
];

filesToCopy.forEach(file => {
    const src = path.join(srcDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(destDir, file));
    }
});

dirsToCopy.forEach(dir => {
    const src = path.join(srcDir, dir);
    if (fs.existsSync(src)) {
        fs.cpSync(src, path.join(destDir, dir), { recursive: true });
    }
});

console.log('Successfully prepared www directory for Capacitor build!');
