function load(){
const data=JSON.parse(localStorage.getItem('premiumWishes')||'[]');
const wall=document.getElementById('wall');
wall.innerHTML='';
data.reverse().forEach(w=>{
let c=document.createElement('div');
c.className='card';
c.innerHTML=`<h3>${w.name}</h3><p>${w.msg}</p>`;
if(w.media){
 if(w.type.startsWith('image')){
   c.innerHTML+=`<img src="${w.media}">`;
 }else{
   c.innerHTML+=`<video controls src="${w.media}"></video>`;
 }
}
wall.appendChild(c);
});
}
function addWish(){
let n=name.value,m=msg.value,f=media.files[0];
if(!n||!m){alert('Please write name and wish');return;}
if(f){
let r=new FileReader();
r.onload=e=>save(n,m,e.target.result,f.type);
r.readAsDataURL(f);
}else save(n,m,'','');
}
function save(n,m,me,t){
let d=JSON.parse(localStorage.getItem('premiumWishes')||'[]');
d.push({name:n,msg:m,media:me,type:t});
localStorage.setItem('premiumWishes',JSON.stringify(d));
name.value='';msg.value='';media.value='';
load();
}
load();
