const fs = require('fs');
const path = require('path');

const baseDir = '/Users/camstories/Desktop/APP/NAmmude naadu/nammude-naadu-test';
const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const engineContent = fs.readFileSync(path.join(baseDir, 'js/nammude-naadu-engine.js'), 'utf8');
const backendContent = fs.readFileSync(path.join(baseDir, 'js/supabase-backend.js'), 'utf8');
const onesignalContent = fs.readFileSync(path.join(baseDir, 'js/onesignal-service.js'), 'utf8');

console.log('--- STARTING COMPREHENSIVE CODEBASE AUDIT ---');

// 1. Check for Duplicate IDs in index.html
const idMatches = [...htmlContent.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const idCounts = {};
idMatches.forEach(id => {
  idCounts[id] = (idCounts[id] || 0) + 1;
});
const duplicateIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
console.log(`\n1. Duplicate IDs in index.html (${duplicateIds.length} found):`);
duplicateIds.forEach(([id, count]) => console.log(`   - ID "${id}" appears ${count} times`));

// 2. Check all onclick handlers in index.html to see if functions are defined in JS
const onclickMatches = [...htmlContent.matchAll(/onclick=["']([^"']+)["']/g)].map(m => m[1]);
const functionCalls = new Set();
onclickMatches.forEach(handler => {
  // Extract function names like foo(), bar(123), etc.
  const fnNames = handler.match(/([a-zA-Z0-9_$]+)\s*\(/g);
  if (fnNames) {
    fnNames.forEach(fn => {
      const clean = fn.replace(/\s*\(/, '');
      if (!['if', 'for', 'while', 'switch', 'alert', 'confirm', 'prompt', 'close', 'focus', 'stopPropagation', 'preventDefault', 'then', 'catch'].includes(clean)) {
        functionCalls.add(clean);
      }
    });
  }
});

const allJsCode = engineContent + '\n' + backendContent + '\n' + onesignalContent;
const missingFns = [];
functionCalls.forEach(fn => {
  const isDefined = (
    allJsCode.includes(`function ${fn}`) ||
    allJsCode.includes(`window.${fn}`) ||
    allJsCode.includes(`${fn} = function`) ||
    allJsCode.includes(`${fn} = () =>`) ||
    allJsCode.includes(`${fn}=`)
  );
  if (!isDefined) {
    missingFns.push(fn);
  }
});
console.log(`\n2. Missing/Undefined onclick functions (${missingFns.length} found):`);
missingFns.forEach(fn => console.log(`   - Missing function: "${fn}()"`));

// 3. Check getElementById calls in engine and backend against index.html IDs
const idSetInHtml = new Set(idMatches);
const getElementByIdMatches = [
  ...engineContent.matchAll(/getElementById\(["']([^"']+)["']\)/g),
  ...backendContent.matchAll(/getElementById\(["']([^"']+)["']\)/g)
].map(m => m[1]);

const missingIdsInHtml = new Set();
getElementByIdMatches.forEach(id => {
  if (!idSetInHtml.has(id)) {
    missingIdsInHtml.add(id);
  }
});
console.log(`\n3. getElementById calls referencing non-existent IDs in index.html (${missingIdsInHtml.size} found):`);
Array.from(missingIdsInHtml).slice(0, 30).forEach(id => console.log(`   - Missing element: #${id}`));
if (missingIdsInHtml.size > 30) console.log(`   ... and ${missingIdsInHtml.size - 30} more`);

// 4. Check for broken image assets referenced in index.html
const imgMatches = [...htmlContent.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
const missingAssets = [];
imgMatches.forEach(src => {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src === '') return;
  const cleanPath = src.split('?')[0].split('#')[0];
  const fullPath = path.join(baseDir, cleanPath);
  if (!fs.existsSync(fullPath)) {
    missingAssets.push(src);
  }
});
console.log(`\n4. Missing image/asset files referenced in index.html (${missingAssets.length} found):`);
missingAssets.forEach(src => console.log(`   - Missing asset file: "${src}"`));

console.log('\n--- AUDIT COMPLETE ---');
