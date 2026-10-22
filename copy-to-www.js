const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Clean and recreate www directory
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

const filesToCopy = [
    'index.html',
    'admin.html',
    'privacy-policy.html',
    'manifest.json',
    'sw.js'
];

function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
}

async function buildProductionWww() {
    console.log('🚀 Preparing production www directory with safe optimizations...');

    // 1. Copy top-level files
    filesToCopy.forEach(file => {
        const src = path.join(srcDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(destDir, file));
        }
    });

    // 2. Process CSS with clean minification
    const srcCssDir = path.join(srcDir, 'css');
    const destCssDir = path.join(destDir, 'css');
    fs.mkdirSync(destCssDir, { recursive: true });

    if (fs.existsSync(srcCssDir)) {
        const cssFiles = fs.readdirSync(srcCssDir);
        for (const file of cssFiles) {
            const srcPath = path.join(srcCssDir, file);
            const destPath = path.join(destCssDir, file);
            if (file.endsWith('.css')) {
                const raw = fs.readFileSync(srcPath, 'utf8');
                const min = minifyCss(raw);
                fs.writeFileSync(destPath, min, 'utf8');
                console.log(`  ✓ CSS: ${file} (${Math.round(raw.length / 1024)}KB -> ${Math.round(min.length / 1024)}KB)`);
            } else if (fs.statSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    // 3. Process JS with safe Terser minification (preserves all function names & globals)
    const srcJsDir = path.join(srcDir, 'js');
    const destJsDir = path.join(destDir, 'js');
    fs.mkdirSync(destJsDir, { recursive: true });

    if (fs.existsSync(srcJsDir)) {
        const jsFiles = fs.readdirSync(srcJsDir);
        for (const file of jsFiles) {
            const srcPath = path.join(srcJsDir, file);
            const destPath = path.join(destJsDir, file);
            if (file.endsWith('.js')) {
                const raw = fs.readFileSync(srcPath, 'utf8');
                try {
                    const result = await minify(raw, {
                        compress: {
                            dead_code: true,
                            drop_console: false // keep logs for debugging
                        },
                        mangle: {
                            keep_fnames: true,
                            toplevel: false // preserve top-level globals and window functions
                        }
                    });
                    const outputCode = result.code || raw;
                    fs.writeFileSync(destPath, outputCode, 'utf8');
                    console.log(`  ✓ JS:  ${file} (${Math.round(raw.length / 1024)}KB -> ${Math.round(outputCode.length / 1024)}KB)`);
                } catch (err) {
                    console.warn(`  ⚠️ Terser fallback for ${file}:`, err.message);
                    fs.writeFileSync(destPath, raw, 'utf8');
                }
            } else if (fs.statSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    // 4. Copy static assets directories
    const staticDirs = ['img', 'assets'];
    staticDirs.forEach(dir => {
        const src = path.join(srcDir, dir);
        if (fs.existsSync(src)) {
            fs.cpSync(src, path.join(destDir, dir), { recursive: true });
        }
    });

    console.log('✅ Successfully optimized and prepared www directory for Capacitor build!');
}

buildProductionWww().catch(err => {
    console.error('Build error:', err);
    process.exit(1);
});
