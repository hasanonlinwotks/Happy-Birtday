
function enterSite(){
const name=document.getElementById('nameInput').value.trim();
const wish=document.getElementById('wishInput').value.trim();

if(name==='' || wish===''){
alert('Naam aur wish likho ❤️');
return;
}

let wishes=JSON.parse(localStorage.getItem('entryWishes')||'[]');
wishes.push({name,wish});
localStorage.setItem('entryWishes',JSON.stringify(wishes));

document.getElementById('entryPage').classList.remove('active');
document.getElementById('mainPage').classList.add('active');
loadWall();
}

function loadWall(){
let wishes=JSON.parse(localStorage.getItem('entryWishes')||'[]');
const wall=document.getElementById('wall');
wall.innerHTML='';
wishes.reverse().forEach(w=>{
let c=document.createElement('div');
c.className='card';
c.innerHTML='<h3>'+w.name+'</h3><p>'+w.wish+'</p>';
wall.appendChild(c);
});
}
