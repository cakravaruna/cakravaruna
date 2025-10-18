// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUgHwslvYdUkC4prY2jJpEkneIGudO4i4",
  authDomain: "rohis-site-f0b86.firebaseapp.com",
  projectId: "rohis-site-f0b86",
  storageBucket: "rohis-site-f0b86.firebasestorage.app",
  messagingSenderId: "528018045038",
  appId: "1:528018045038:web:549ab8ab424c9956164e7f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;