const fs = require('fs');
const path = require('path');

const baseDir = '/Users/camstories/Desktop/APP/NAmmude naadu/nammude-naadu-test';
const engineContent = fs.readFileSync(path.join(baseDir, 'js/nammude-naadu-engine.js'), 'utf8');

console.log('--- TESTING ENGINE FUNCTIONS FOR HIDDEN RUNTIME CRASHES ---');

// Mock browser environment
const domElements = {};
global.window = global;
global.document = {
  getElementById: (id) => {
    return domElements[id] || {
      value: '',
      innerText: '',
      innerHTML: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      focus: () => {}
    };
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({
    style: {},
    classList: { add: () => {}, remove: () => {} },
    appendChild: () => {}
  }),
  body: {
    appendChild: () => {}
  }
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
global.navigator = {
  onLine: true,
  geolocation: { getCurrentPosition: () => {} }
};

let errorCount = 0;
try {
  eval(engineContent);
  console.log('✓ nammude-naadu-engine.js evaluated successfully without top-level syntax or runtime errors!');
} catch (err) {
  console.error('❌ Error evaluating nammude-naadu-engine.js:', err);
  errorCount++;
}

// Test key global functions
const functionsToTest = [
  'navTo',
  'computeChatKey',
  'normalizePhone',
  'escapeHtml',
  'formatTimestamp',
  'isThreadBelongingToCurrentUser',
  'updateChatBadgeCounter',
  'filterServices',
  'filterJobs',
  'filterRentals',
  'getDistanceKm'
];

functionsToTest.forEach(fn => {
  if (typeof global[fn] === 'function') {
    console.log(`✓ Function ${fn}() is properly defined and exposed.`);
  } else {
    console.error(`❌ Function ${fn}() is NOT defined or exposed to window!`);
    errorCount++;
  }
});

// Test computeChatKey
try {
  const k1 = global.computeChatKey('usr_1', '9847111111', 'User 1', 'usr_2', '9447222222', 'User 2');
  console.log('✓ computeChatKey result:', k1);
  if (k1 !== 'chat_9447222222_9847111111') {
    console.warn('⚠️ Warning: computeChatKey did not return expected canonical format:', k1);
  }
} catch (e) {
  console.error('❌ computeChatKey crashed:', e);
  errorCount++;
}

// Test isThreadBelongingToCurrentUser
try {
  global.APP_STATE = {
    currentUser: { id: 'usr_me_1', phone: '9447222222' },
    chats: {
      'chat_9447222222_9847111111': [{ id: '1', text: 'hello', sender: 'them', senderPhone: '9847111111' }]
    },
    chatMeta: {
      'chat_9447222222_9847111111': { name: 'Friend', phone: '9847111111' }
    }
  };
  const isMine = global.isThreadBelongingToCurrentUser('chat_9447222222_9847111111');
  console.log('✓ isThreadBelongingToCurrentUser (for my phone):', isMine);
  if (!isMine) {
    console.error('❌ isThreadBelongingToCurrentUser failed for user participant!');
    errorCount++;
  }

  const isOther = global.isThreadBelongingToCurrentUser('chat_1111111111_2222222222');
  console.log('✓ isThreadBelongingToCurrentUser (for other phone):', isOther);
  if (isOther) {
    console.error('❌ isThreadBelongingToCurrentUser leaked foreign thread!');
    errorCount++;
  }
} catch (e) {
  console.error('❌ isThreadBelongingToCurrentUser crashed:', e);
  errorCount++;
}

console.log(`\n--- TEST FINISHED WITH ${errorCount} ERRORS ---`);
