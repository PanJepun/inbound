import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { db } from '../../config.js';
export function initTransport(){ console.log('Transport TERPISAH loaded'); }
export async function loadTransportForGuest(gid){
  const tbody=document.getElementById('tbodyTransport'); if(!tbody) return;
  tbody.innerHTML='<tr><td colspan="7">Loading transport_transactions...</td></tr>';
  const snap=await getDocs(collection(db, "transport_transactions"));
  let rows=[]; snap.forEach(d=>{ if(d.data().guestId?.substring(0,14)===gid.substring(0,14)) rows.push(d.data()); });
  tbody.innerHTML=''; rows.forEach((r,idx)=>{
    const tr=document.createElement('tr'); tr.style.background=idx%2===0?'#ffff00':'#a8d8ff'; tr.style.fontWeight='700';
    tr.innerHTML=`<td style="border:1px solid #999;padding:4px">${r.guestId}</td><td style="border:1px solid #999;padding:4px;font-weight:900">${r.serviceName||'-'}</td><td style="border:1px solid #999;padding:4px">${r.checkIn||''}</td><td style="border:1px solid #999;padding:4px">${r.checkOut||''}</td><td style="border:1px solid #999;padding:4px;text-align:right;background:#ffee99">${r.rate||'0'}</td><td style="border:1px solid #999;padding:4px">${r.status||'OK'}</td><td>transport.js</td>`;
    tbody.appendChild(tr);
  });
}
export async function saveTransport(gid, name, rate){
  await addDoc(collection(db, "transport_transactions"), {guestId:gid, serviceName:name.toUpperCase(), rate, price:rate, status:'OK', createdAt:new Date().toISOString()});
  loadTransportForGuest(gid);
}