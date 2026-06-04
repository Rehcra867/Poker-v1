const socket = io();

let currentUser = null;

function register(){

    socket.emit(
        "register",
        {
            username:
            username.value,

            password:
            password.value
        }
    );
}

function login(){

    socket.emit(
        "login",
        {
            username:
            username.value,

            password:
            password.value
        }
    );
}

socket.on(
    "loginSuccess",
    user=>{

        currentUser=user;

        login.classList.add("hidden");
        lobby.classList.remove("hidden");

        chips.innerText=user.chips;
    }
);

function claimDaily(){
    socket.emit("dailyReward");
}

function createLobby(){

    socket.emit(
        "createLobby",
        {
            maxPlayers:6,
            bots:2
        }
    );
}

socket.on(
    "lobbies",
    data=>{

        lobbies.innerHTML="";

        data.forEach(lobby=>{

            const btn=
            document.createElement("button");

            btn.innerText=
            `${lobby.players}/${lobby.maxPlayers}`;

            btn.onclick=()=>{

                socket.emit(
                    "joinLobby",
                    lobby.id
                );
            };

            lobbies.appendChild(btn);
        });
    }
);

function check(){
    socket.emit("action","check");
}

function call(){
    socket.emit("action","call");
}

function fold(){
    socket.emit("action","fold");
}

function raiseBet(){

    socket.emit(
        "action",
        {
            type:"raise",
            amount:
            Number(
                betAmount.value
            )
        }
    );
}