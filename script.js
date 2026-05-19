
window.onload=function(){

const wall=document.getElementById('wall');
const preview=document.getElementById('preview');
const fileInput=document.getElementById('fileInput');

if(fileInput){
fileInput.addEventListener('change', function(){
if(!preview) return;
preview.innerHTML='';
const file=this.files[0];
if(!file) return;
const reader=new FileReader();
reader.onload=function(e){
if(file.type.startsWith('image')){
preview.innerHTML='<img src="'+e.target.result+'">';
}else{
preview.innerHTML='<video controls src="'+e.target.result+'"></video>';
}
}
reader.readAsDataURL(file);
});
}

window.addWish=function(){
const name=(document.getElementById('nameInput')?.value || '').trim();
const msg=(document.getElementById('msgInput')?.value || '').trim();
const file=fileInput?.files[0];

if(name.length<1 || msg.length<1){
alert('Name aur wish likho ❤️');
return;
}

if(file){
const reader=new FileReader();
reader.onload=function(e){
saveWish(name,msg,e.target.result,file.type);
}
reader.readAsDataURL(file);
}else{
saveWish(name,msg,'','');
}
}

function saveWish(name,msg,media,type){
let wishes=JSON.parse(localStorage.getItem('wishesV3')||'[]');
wishes.push({name,msg,media,type});
localStorage.setItem('wishesV3',JSON.stringify(wishes));

document.getElementById('nameInput').value='';
document.getElementById('msgInput').value='';
if(fileInput) fileInput.value='';
if(preview) preview.innerHTML='';

load();
alert('Wish Posted Successfully 🎉');
}

function load(){
if(!wall) return;
let wishes=JSON.parse(localStorage.getItem('wishesV3')||'[]');
wall.innerHTML='';
wishes.reverse().forEach(w=>{
let div=document.createElement('div');
div.className='card';
div.innerHTML='<h3>'+w.name+'</h3><p>'+w.msg+'</p>';
if(w.media){
if((w.type||'').startsWith('image')){
div.innerHTML+='<img src="'+w.media+'">';
}else{
div.innerHTML+='<video controls src="'+w.media+'"></video>';
}}
wall.appendChild(div);
});
}

load();
}
