import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const firebaseConfig = { apiKey: "AIzaSyDaF0kZroF4gCx8rFLTm88gF7-GS86fyg", authDomain: "inbound2026-12ffe.firebaseapp.com", projectId: "inbound2026-12ffe", storageBucket: "inbound2026-12ffe.firebasestorage.app", messagingSenderId: "368642042481", appId: "1:368642042481:web:0da95081f2039b357089d0" };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export function getTodayISO(){ return new Date().toISOString().split('T')[0]; }
export function toDDMMYYYY(iso){ if(!iso) return ''; if(iso[4]==='-'){ const [y,m,d]=iso.split('-'); return `${d}-${m}-${y}`; } return iso; }
export function toISODate(ddmmyyyy){ if(!ddmmyyyy) return ''; if(ddmmyyyy.includes('-')&&ddmmyyyy.length>=10&&ddmmyyyy[2]==='-'){ const [d,m,y]=ddmmyyyy.split('-'); return `${y}-${m}-${d}`; } return ddmmyyyy; }
export function formatDatePartForId(isoDate){ const d=new Date(isoDate); const dd=String(d.getDate()).padStart(2,'0'); const months=["jan","feb","mar","apr","mei","jun","jul","agu","sep","okt","nov","des"]; return `${dd}${months[d.getMonth()]}${String(d.getFullYear()).slice(-2)}`; }