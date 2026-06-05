const express=require('express');
const http=require('http');
const bcrypt=require('bcrypt');
const {createClient}=require('@supabase/supabase-js');

const app=express();
const server=http.createServer(app);

app.use(express.json());
app.use(express.static('public'));

const supabase=createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_ANON_KEY
);

app.get('/api/status',(req,res)=>{
 res.json({status:'Poker V1 Online'});
});

app.post('/api/register',async(req,res)=>{
 try{
  const {username,password}=req.body;
  if(!username||!password) return res.status(400).json({error:'Missing fields'});

  const {data:existing}=await supabase
   .from('users')
   .select('id')
   .eq('username',username)
   .maybeSingle();

  if(existing) return res.status(400).json({error:'Username exists'});

  const hash=await bcrypt.hash(password,10);

  const {error}=await supabase.from('users').insert({
   username,
   password_hash:hash,
   chips:500,
   wins:0,
   losses:0,
   games_played:0
  });

  if(error) throw error;

  res.json({success:true});
 }catch(err){res.status(500).json({error:err.message});}
});

app.post('/api/login',async(req,res)=>{
 try{
  const {username,password}=req.body;

  const {data:user,error}=await supabase
   .from('users')
   .select('*')
   .eq('username',username)
   .maybeSingle();

  if(error||!user) return res.status(401).json({error:'Invalid login'});

  const valid=await bcrypt.compare(password,user.password_hash);

  if(!valid) return res.status(401).json({error:'Invalid login'});

  res.json({
   success:true,
   username:user.username,
   chips:user.chips,
   wins:user.wins,
   losses:user.losses,
   gamesPlayed:user.games_played
  });
 }catch(err){res.status(500).json({error:err.message});}
});

const PORT=process.env.PORT||3000;
server.listen(PORT,()=>console.log(`Running on ${PORT}`));