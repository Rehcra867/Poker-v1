const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/api/status',(req,res)=>{
  res.json({status:'Poker V1 Online'});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
  console.log(`Running on ${PORT}`);
});