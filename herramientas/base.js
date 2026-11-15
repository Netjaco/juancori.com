// Utilidades compartidas por las herramientas de juancori.com
(function(){
  let th=null;try{th=localStorage.getItem('jc-theme')}catch(e){}
  if(!th&&matchMedia('(prefers-color-scheme:dark)').matches)th='dark';
  if(th)document.documentElement.dataset.theme=th;
})();
const JC={
  $:id=>document.getElementById(id),
  load(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch(e){return d}},
  save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  esc:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  today(){const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())},
  parse(s){if(!s)return null;const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)},
  iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')},
  fmt(s){const d=typeof s==='string'?JC.parse(s):s;return d?d.toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'}):'—'},
  days(a,b){return Math.round((b-a)/864e5)},
  addDays(d,n){const r=new Date(d);r.setDate(r.getDate()+n);return r},
  csv(name,rows){const q=s=>'"'+String(s??'').replace(/"/g,'""')+'"';
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+rows.map(r=>r.map(q).join(';')).join('\r\n')],{type:'text/csv'}));
    a.download=name;a.click();URL.revokeObjectURL(a.href)}
};
