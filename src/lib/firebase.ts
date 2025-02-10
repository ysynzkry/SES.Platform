
 import { initializeApp } from 'firebase/app'; 
 import { getFirestore } from 'firebase/firestore'; 
 import { getStorage } from 'firebase/storage'; 
  
 const firebaseConfig = { 
  apiKey: "AIzaSyBz-DyIC9dqBWncjo3kyIj8qbey1cp45hA",
  authDomain: "smouha-english-school-fb239.firebaseapp.com",
  projectId: "smouha-english-school-fb239",
  storageBucket: "smouha-english-school-fb239.firebasestorage.app",
  messagingSenderId: "453870432589",
  appId: "1:453870432589:web:24f50d023db7b19730c704",
  measurementId: "G-KDEQQ8XN4Z" 
 }; 
  
 const app = initializeApp(firebaseConfig); 
 export const db = getFirestore(app); 
 export const storage = getStorage(app); 
 