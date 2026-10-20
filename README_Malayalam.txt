NAMMUDE NAADU - COMBINED TEST PROJECT

Included files:
- index.html (main app + mandatory first-time registration screen)
- admin.html (admin page)
- firebase-config.js
- firebase-backend.js
- location-service.js
- js/app.js
- css/main.css
- css/jobs.css

HOW TO RUN
1. ZIP extract cheyyuka.
2. Folder VS Code-il open cheyyuka.
3. Live Server extension vazhi index.html run cheyyuka; file:// vazhi open cheyyaruthu.
4. Firebase Console-il Authentication > Sign-in method-il Anonymous sign-in enable cheyyuka.
5. Firebase Realtime Database/Storage rules and permissions verify cheyyuka.

FIRST OPEN REGISTRATION
Name, Email ID, Blood Group, Phone number enter cheyyanam. Profile picture optional aanu. Image 5 MB-il thazhe aayirikkanam. Save successful aayal mathram Home screen thurakkum. Email ID contact field mathram aanu; email verification/password login illa.

IMPORTANT
This is a test build, not a security audit. Firebase Database/Storage rules production use-inu munpu secure aakkanam. Profile image upload depends on Storage access; backend attempts a Storage upload and may fall back to a compressed embedded image if Storage upload fails. Test on your Firebase project before publishing.
