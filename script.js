
const wall=document.getElementById('wall');
const preview=document.getElementById('preview');
const fileInput=document.getElementById('fileInput');

function scrollToWish(){
document.getElementById('wish').scrollIntoView({behavior:'smooth'});
}

fileInput.addEventListener('change',()=>{
preview.innerHTML='';
const file=fileInput.files[0];
if(!file) return;
const reader=new FileReader();
reader.onload=e=>{
if(file.type.startsWith('image')){
preview.innerHTML=`<img src="${e.target.result}">`;
}else{
preview.innerHTML=`<video controls src="${e.target.result}"></video>`;
}
}
reader.readAsDataURL(file);
});

function load(){
const wishes=JSON.parse(localStorage.getItem('wishesV2')||'[]');
wall.innerHTML='';
wishes.reverse().forEach(w=>{
const div=document.createElement('div');
div.className='card';
div.innerHTML=`<h3>${w.name}</h3><p>${w.msg}</p>`;
if(w.media){
if(w.type.startsWith('image')){
div.innerHTML+=`<img src="${w.media}">`;
}else{
div.innerHTML+=`<video controls src="${w.media}"></video>`;
}}
wall.appendChild(div);
});
}

function addWish(){
const name=document.getElementById('nameInput').value.trim();
const msg=document.getElementById('msgInput').value.trim();
const file=fileInput.files[0];

if(name==='' || msg===''){
alert('Please write name and wish ❤️');
return;
}

if(file){
const reader=new FileReader();
reader.onload=e=>{
saveWish(name,msg,e.target.result,file.type);
}
reader.readAsDataURL(file);
}else{
saveWish(name,msg,'','');
}
}

function saveWish(name,msg,media,type){
const wishes=JSON.parse(localStorage.getItem('wishesV2')||'[]');
wishes.push({name,msg,media,type});
localStorage.setItem('wishesV2',JSON.stringify(wishes));

document.getElementById('nameInput').value='';
document.getElementById('msgInput').value='';
fileInput.value='';
preview.innerHTML='';

load();
alert('Wish posted successfully 🎉');
}

load();
