const statusText=document.getElementById('status');
const profile=document.getElementById('profile');

async function auth(endpoint){
 const username=document.getElementById('username').value;
 const password=document.getElementById('password').value;

 const res=await fetch(`/api/${endpoint}`,{
 method:'POST',
 headers:{'Content-Type':'application/json'},
 body:JSON.stringify({username,password})
 });

 const data=await res.json();

 if(!res.ok){statusText.textContent=data.error;return;}

 if(endpoint==='register'){
  statusText.textContent='Registration successful';
  return;
 }

 statusText.textContent='Login successful';
 profile.style.display='block';
 document.getElementById('chips').textContent=`Chips: ${data.chips}`;
 document.getElementById('stats').textContent=`Wins: ${data.wins} Losses: ${data.losses} Games: ${data.gamesPlayed}`;
}

document.getElementById('registerBtn').onclick=()=>auth('register');
document.getElementById('loginBtn').onclick=()=>auth('login');