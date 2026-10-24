import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { db } from '../../config.js';
export function initGuideFee(){ console.log('GuideFee TERPISAH loaded'); }
export async function loadGuideFeeForGuest(gid){
  const tbody=document.getElementById('tbodyGuideFee'); if(!tbody) return;
  const snap=await getDocs(collection(db, "guidefee_transactions"));
  let rows=[]; snap.forEach(d=>{ if(d.data().guestId?.substring(0,14)===gid.substring(0,14)) rows.push(d.data()); });
  tbody.innerHTML=''; rows.forEach(r=>{
    const tr=document.createElement('tr'); tr.innerHTML=`<td>${r.guestId}</td><td>${r.serviceName||'-'}</td><td>${r.rate||'0'}</td>`;
    tbody.appendChild(tr);
  });
}