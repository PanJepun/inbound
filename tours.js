import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { db } from '../../config.js';
export function initTours(){ console.log('Tours TERPISAH loaded'); }
export async function loadToursForGuest(gid){
  const tbody=document.getElementById('tbodyTours'); if(!tbody) return;
  tbody.innerHTML='<tr><td colspan="7">Loading tours_transactions...</td></tr>';
  const snap=await getDocs(collection(db, "tours_transactions"));
  let rows=[]; snap.forEach(d=>{ if(d.data().guestId?.substring(0,14)===gid.substring(0,14)) rows.push(d.data()); });
  tbody.innerHTML=''; rows.forEach((r,idx)=>{
    const tr=document.createElement('tr'); tr.style.background=idx%2===0?'#ffff00':'#a8d8ff'; tr.style.fontWeight='700';
    tr.innerHTML=`<td>${r.guestId}</td><td style="font-weight:900">${r.serviceName||'-'}</td><td>${r.checkIn||''}</td><td>${r.checkOut||''}</td><td style="text-align:right;background:#ffee99">${r.rate||'0'}</td><td>${r.status||'OK'}</td><td>tours.js</td>`;
    tbody.appendChild(tr);
  });
}
export async function saveTours(gid, name, rate){
  await addDoc(collection(db, "tours_transactions"), {guestId:gid, serviceName:name.toUpperCase(), rate, price:rate, status:'OK', createdAt:new Date().toISOString()});
  loadToursForGuest(gid);
}