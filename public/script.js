const socket = io();

const usernameInput =
  document.getElementById("username");

const passwordInput =
  document.getElementById("password");

const loginDiv =
  document.getElementById("login");

const lobbyDiv =
  document.getElementById("lobby");

const chipsSpan =
  document.getElementById("chips");

const messageDiv =
  document.getElementById("message");

const lobbyList =
  document.getElementById("lobbyList");

function register() {

  socket.emit("register", {
    username: usernameInput.value,
    password: passwordInput.value
  });

}

function login() {

  socket.emit("login", {
    username: usernameInput.value,
    password: passwordInput.value
  });

}

socket.on("registerSuccess", () => {
  messageDiv.innerText =
    "Registration successful!";
});

socket.on("registerError", (msg) => {
  messageDiv.innerText =
    "Register Error: " + msg;
});

socket.on("loginError", (msg) => {
  messageDiv.innerText =
    "Login Error: " + msg;
});

socket.on("loginSuccess", (user) => {

  loginDiv.classList.add("hidden");

  lobbyDiv.classList.remove("hidden");

  chipsSpan.innerText =
    user.chips;

  socket.emit("getLobbies");
});

function createLobby(){

  socket.emit("createLobby",{

    name:
      document.getElementById("lobbyName").value,

    smallBlind:
      Number(
        document.getElementById("smallBlind").value
      ),

    bigBlind:
      Number(
        document.getElementById("bigBlind").value
      ),

    botCount:
      Number(
        document.getElementById("botCount").value
      ),

    maxPlayers:8

  });

}

function joinLobby(id){

  socket.emit(
    "joinLobby",
    id
  );

}

socket.on("lobbyList",(lobbies)=>{

  lobbyList.innerHTML="";

  lobbies.forEach(lobby=>{

    const div =
      document.createElement("div");

    div.innerHTML=`

      <strong>${lobby.name}</strong>

      <br>

      Players:
      ${lobby.current_players}
      /
      ${lobby.max_players}

      <br>

      Blinds:
      ${lobby.small_blind}
      /
      ${lobby.big_blind}

      <br>

      <button
        onclick="joinLobby('${lobby.id}')">

        Join

      </button>

      <hr>

    `;

    lobbyList.appendChild(div);

  });

});

socket.on(
"joinedLobby",
lobby=>{

document.getElementById(
"lobby"
).innerHTML=`

<h2>
${lobby.name}
</h2>

<p>

Blinds:

${lobby.small_blind}

/

${lobby.big_blind}

</p>

<p>

Waiting for players...

</p>

<button>

Start Game

</button>

`;

});

