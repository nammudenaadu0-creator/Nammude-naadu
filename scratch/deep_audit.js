const fs = require('fs');
const path = require('path');

const baseDir = '/Users/camstories/Desktop/APP/NAmmude naadu/nammude-naadu-test';
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const engineJs = fs.readFileSync(path.join(baseDir, 'js/nammude-naadu-engine.js'), 'utf8');
const backendJs = fs.readFileSync(path.join(baseDir, 'js/supabase-backend.js'), 'utf8');
const allJs = engineJs + '\n' + backendJs;

console.log('--- 1. Check onclick/onchange/onsubmit in index.html ---');
const handlerRegex = /\bon(?:click|change|submit|input|keydown|keyup)\s*=\s*["']([^"']+)["']/gi;
let match;
const missingHandlers = new Set();
const allHandlers = new Set();

while ((match = handlerRegex.exec(html)) !== null) {
  const handlerCode = match[1].trim();
  allHandlers.add(handlerCode);
  // Extract function name
  const fnMatch = handlerCode.match(/^([a-zA-Z0-9_$]+)\s*\(/);
  if (fnMatch) {
    const fnName = fnMatch[1];
    // Check if defined in allJs or native window
    const nativeFns = ['alert', 'confirm', 'prompt', 'open', 'close', 'event', 'console', 'history', 'location', 'window'];
    if (!nativeFns.includes(fnName)) {
      const defRegex = new RegExp(`\\bfunction\\s+${fnName}\\b|\\bwindow\\.${fnName}\\b|\\b${fnName}\\s*=\\s*(?:function|\\()|\\bconst\\s+${fnName}\\s*=|\\blet\\s+${fnName}\\s*=|\\bvar\\s+${fnName}\\s*=`);
      if (!defRegex.test(allJs)) {
        missingHandlers.add(fnName + ' (from: ' + handlerCode.slice(0, 50) + ')');
      }
    }
  }
}
console.log('Total inline handlers found:', allHandlers.size);
console.log('Missing/Unresolved inline handlers:', Array.from(missingHandlers));

console.log('\n--- 2. Check document.getElementById in JS ---');
const getElemRegex = /document\.getElementById\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
const missingElements = new Set();
const foundElements = new Set();

while ((match = getElemRegex.exec(allJs)) !== null) {
  const elemId = match[1];
  foundElements.add(elemId);
  const idRegex = new RegExp(`\\bid\\s*=\\s*["']${elemId}["']`, 'i');
  if (!idRegex.test(html)) {
    // Check if it's dynamically created in JS
    const dynRegex = new RegExp(`['"]id['"]\\s*:\\s*['"]${elemId}['"]|id\\s*=\\s*\\\\?["']${elemId}\\\\?["']`);
    if (!dynRegex.test(allJs)) {
      missingElements.add(elemId);
    }
  }
}
console.log('Total document.getElementById queries:', foundElements.size);
console.log('Missing DOM IDs referenced by getElementById:', Array.from(missingElements));

console.log('\n--- 3. Check dangerously unhandled getElementById property accesses ---');
// Matches document.getElementById('xyz').something without checking if null
const dangerousAccessRegex = /document\.getElementById\s*\(\s*['"`]([^'"`]+)['"`]\s*\)\.([a-zA-Z0-9_$]+)/g;
const dangerousCalls = [];
while ((match = dangerousAccessRegex.exec(allJs)) !== null) {
  const elemId = match[1];
  const prop = match[2];
  if (missingElements.has(elemId)) {
    dangerousCalls.push({ id: elemId, prop });
  }
}
console.log('Dangerous calls on missing elements:', dangerousCalls);
