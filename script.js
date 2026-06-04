const loginDiv = document.getElementById("login");
const lobbyDiv = document.getElementById("lobby");
const chipsSpan = document.getElementById("chips");
const lobbiesDiv = document.getElementById("lobbies");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const betAmountInput = document.getElementById("betAmount");
const socket = io();

let currentUser = null;

function register(){

    socket.emit(
        "register",
        {
            username:
            usernameInput.value,

            password:
            passwordInput.value
        }
    );
}

function login(){

    socket.emit(
        "login",
        {
            username:
            usernameInput.value,

            password:
            passwordInput.value
        }
    );
}

socket.on(
    "loginSuccess",
    user=>{

        currentUser=user;

        loginDiv.classList.add("hidden");
        lobbyDiv.classList.remove("hidden");

        chipsSpan.innerText = user.chips;
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

        lobbiesDiv.innerHTML="";

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

socket.on("registerSuccess", () => {
    alert("Account created! You can now log in.");
});

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
                betAmountInput.value
            )
        }
    );
}
