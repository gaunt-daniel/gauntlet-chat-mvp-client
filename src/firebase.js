import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH_8vtw16Mge__BUT4LkAtEEUMi9ZVCSo",
  authDomain: "gauntlet-chat-mvp.firebaseapp.com",
  projectId: "gauntlet-chat-mvp",
  storageBucket: "gauntlet-chat-mvp.firebasestorage.app",
  messagingSenderId: "689103926125",
  appId: "1:689103926125:web:874b8dee92833edb10a064"
};

console.log('Initializing Firebase with config:', firebaseConfig);
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app);
const auth = getAuth(app);
console.log('Auth initialized:', auth);

export { auth }; 