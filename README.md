# Boilerplate: React Native Infinite Scroll
*  [Built With](#built-with)
*  [Pending Items](#pending-items)
*  [Color Scheme](#color-scheme)
*  [Screens](#screens)
*  [Getting Started](#getting-started)

## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming Language
* [React Native](https://facebook.github.io/react-native/) - Mobile (iOS/Android) Framework
* [Expo](https://expo.io) - React Native Toolchain
* [Firebase](https://firebase.google.com) - Database

## Pending Items

## Color Scheme
* Blue: #007AFF
* Grey: #7D7D7D
* Light Grey: #E5E5E5

## Screens


## Getting Started
**1. Connect Firebase:**
In the root of your project, create a file called config.js. I've set up the .gitignore of this project to ignore the config.js file. **DO NOT COMMIT API KEYS TO GITHUB**. Copy and paste the **firebaseConfig** below into config.js to connect to Firebase.

```
// Firebase Config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  databaseURL: 'YOUR_DATABASE_URL_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID_HERE',
  appId: 'YOUR_APP_ID_HERE'
}

// Exports
module.exports = firebaseConfig;
```

**2. Add .gitignore:**
```
node_modules
node_modules/**/*
.expo/*
npm-debug.*
*.jks
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
web-report/

config
config/*
config/config
config/serviceAccount
```

**3. Enable Firebase Cloud Firestore:**
1. Navigate to "Database" on the left sidebar

2. Click on "Create Database"

3. Select "Start in test mode"

4. Click on "Enable"

**4. Install Dependencies:**
```
npm install
```

**5. Start iOS Simulator:**
```
expo start
```