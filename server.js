const express =
require("express");

const http =
require("http");

const fs =
require("fs");

const bcrypt =
require("bcrypt");

const {Server} =
require("socket.io");

const app =
express();

const server =
http.createServer(app);

const io =
new Server(server);

app.use(
    express.static(".")
);

let users={};

if(
    fs.existsSync(
        "./data/users.json"
    )
){
    users=
    JSON.parse(
        fs.readFileSync(
            "./data/users.json"
        )
    );
}

function saveUsers(){

    fs.writeFileSync(
        "./data/users.json",
        JSON.stringify(
            users,
            null,
            2
        )
    );
}

let lobbies=[];

io.on(
"connection",
socket=>{

socket.on(
"register",
async data=>{

if(
users[data.username]
)return;

const hash=
await bcrypt.hash(
data.password,
10
);

users[
data.username
]={
password:hash,
chips:500
};

saveUsers();
});

socket.on(
"login",
async data=>{

const user=
users[
data.username
];

if(!user)
return;

const ok=
await bcrypt.compare(
data.password,
user.password
);

if(!ok)
return;

socket.username=
data.username;

socket.emit(
"loginSuccess",
{
username:
data.username,

chips:
user.chips
}
);
});

socket.on(
"dailyReward",
()=>{

const user=
users[
socket.username
];

if(!user)
return;

user.chips+=50;

saveUsers();

socket.emit(
"chips",
user.chips
);
});

socket.on(
"createLobby",
settings=>{

const lobby={

id:
Date.now(),

players:1,

maxPlayers:
settings.maxPlayers,

bots:
settings.bots
};

lobbies.push(
lobby
);

io.emit(
"lobbies",
lobbies
);
});

socket.on(
"joinLobby",
id=>{

const lobby=
lobbies.find(
x=>x.id===id
);

if(!lobby)
return;

lobby.players++;

io.emit(
"lobbies",
lobbies
);
});
});

server.listen(
3000,
()=>{

console.log(
"running"
);
});