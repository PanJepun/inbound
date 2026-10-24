import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { db } from '../../config.js';
export function initMeals(){ console.log('Meals TERPISAH loaded'); }
export async function loadMealsForGuest(gid){
  const tbody=document.getElementById('tbodyMeals'); if(!tbody) return;
  const snap=await getDocs(collection(db, "meals_transactions"));
  let rows=[]; snap.forEach(d=>{ if(d.data().guestId?.substring(0,14)===gid.substring(0,14)) rows.push(d.data()); });
  tbody.innerHTML=''; rows.forEach((r,idx)=>{
    const tr=document.createElement('tr'); tr.style.background=idx%2===0?'#ffff00':'#a8d8ff';
    tr.innerHTML=`<td>${r.guestId}</td><td>${r.serviceName||'-'}</td><td>${r.rate||'0'}</td>`;
    tbody.appendChild(tr);
  });
}
export async function saveMeals(gid, name, rate){
  await addDoc(collection(db, "meals_transactions"), {guestId:gid, serviceName:name.toUpperCase(), rate, price:rate, status:'OK', createdAt:new Date().toISOString()});
  loadMealsForGuest(gid);
}