document.getElementById('mainPage').style.display='none';
function enterSite(){
let n=nameInput.value.trim(),w=wishInput.value.trim();
if(!n||!w){alert('Naam aur wish likho ❤️');return;}
let a=JSON.parse(localStorage.getItem('wallV6')||'[]');
a.push({n,w});
localStorage.setItem('wallV6',JSON.stringify(a));
entryPage.style.display='none';
mainPage.style.display='block';
loadWall();
}
function loadWall(){
let a=JSON.parse(localStorage.getItem('wallV6')||'[]');
wall.innerHTML='';
a.reverse().forEach(x=>{
let c=document.createElement('div');
c.className='card';
c.innerHTML='<h3>'+x.n+'</h3><p>'+x.w+'</p>';
wall.appendChild(c);
});
}
