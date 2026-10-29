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
    'terms.html',
    'manifest.json',
    'sw.js',
    'version.json'
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

    // 1. Copy top-level files with strict missing file assertion
    filesToCopy.forEach(file => {
        const src = path.join(srcDir, file);
        if (!fs.existsSync(src)) {
            throw new Error(`CRITICAL BUILD ERROR: Missing required build file "${file}" in root!`);
        }
        fs.copyFileSync(src, path.join(destDir, file));
    });

    // 2. Process CSS with clean minification
    const srcCssDir = path.join(srcDir, 'css');
    const destCssDir = path.join(destDir, 'css');
    fs.mkdirSync(destCssDir, { recursive: true });

    if (fs.existsSync(srcCssDir)) {
        const cssFiles = fs.readdirSync(srcCssDir).filter(f => !f.startsWith('.') && f !== '__MACOSX');
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
        const jsFiles = fs.readdirSync(srcJsDir).filter(f => !f.startsWith('.') && f !== '__MACOSX');
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

    // 4. Copy static assets directories with strict filtering of __MACOSX and .DS_Store
    const staticDirs = ['img', 'assets'];
    staticDirs.forEach(dir => {
        const src = path.join(srcDir, dir);
        if (fs.existsSync(src)) {
            fs.cpSync(src, path.join(destDir, dir), {
                recursive: true,
                filter: (srcPath) => {
                    const base = path.basename(srcPath);
                    return base !== '.DS_Store' && base !== '__MACOSX' && !base.startsWith('._');
                }
            });
        }
    });

    // 5. Sanity check verified build
    const requiredBuildOutputs = ['index.html', 'admin.html', 'manifest.json', 'sw.js', 'js/supabase-backend.js', 'js/fcm-push-service.js'];
    for (const out of requiredBuildOutputs) {
        const checkPath = path.join(destDir, out);
        if (!fs.existsSync(checkPath) || fs.statSync(checkPath).size === 0) {
            throw new Error(`CRITICAL BUILD VERIFICATION FAILED: "${out}" was not produced in www!`);
        }
    }

    console.log('✅ Successfully optimized and verified www directory for Capacitor build!');
}

buildProductionWww().catch(err => {
    console.error('Build error:', err);
    process.exit(1);
});
