import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAvl_DpqhdXeMJKpVr87D5QZZDY6SUM7e8",
  authDomain: "liverton-codes.firebaseapp.com",
  projectId: "liverton-codes",
  storageBucket: "liverton-codes.firebasestorage.app",
  messagingSenderId: "144860742301",
  appId: "1:144860742301:web:2534c3d059c42399568a74"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
