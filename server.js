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

let currentUser = null;

/* --------------------
   ACCOUNT FUNCTIONS
-------------------- */

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

/* --------------------
   LOGIN EVENTS
-------------------- */

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

  currentUser = user;

  loginDiv.classList.add("hidden");

  lobbyDiv.classList.remove("hidden");

  chipsSpan.innerText =
    user.chips;

  socket.emit("getLobbies");

});

/* --------------------
   LOBBY FUNCTIONS
-------------------- */

function createLobby() {

  const lobbyName =
    document.getElementById("lobbyName").value;

  const smallBlind =
    Number(
      document.getElementById("smallBlind").value
    );

  const bigBlind =
    Number(
      document.getElementById("bigBlind").value
    );

  const botCount =
    Number(
      document.getElementById("botCount").value
    );

  socket.emit("createLobby", {

    name: lobbyName,

    smallBlind: smallBlind,

    bigBlind: bigBlind,

    botCount: botCount,

    maxPlayers: 8

  });

}

function joinLobby(id) {

  socket.emit(
    "joinLobby",
    id
  );

}

/* --------------------
   LOBBY LIST
-------------------- */

socket.on("lobbyList", (lobbies) => {

  const lobbyList =
    document.getElementById("lobbyList");

  if (!lobbyList) return;

  lobbyList.innerHTML = "";

  lobbies.forEach((lobby) => {

    const div =
      document.createElement("div");

    div.className =
      "lobbyCard";

    div.innerHTML = `

      <h4>${lobby.name}</h4>

      <p>
        Players:
        ${lobby.current_players}
        /
        ${lobby.max_players}
      </p>

      <p>
        Blinds:
        ${lobby.small_blind}
        /
        ${lobby.big_blind}
      </p>

      <p>
        Bots:
        ${lobby.bot_count}
      </p>

      <button
        onclick="joinLobby('${lobby.id}')">

        Join Lobby

      </button>

      <hr>

    `;

    lobbyList.appendChild(div);

  });

});

/* --------------------
   JOINED LOBBY
-------------------- */

socket.on("joinedLobby", (lobby) => {

  lobbyDiv.innerHTML = `

    <h2>${lobby.name}</h2>

    <p>
      Host:
      ${lobby.host_username}
    </p>

    <p>
      Blinds:
      ${lobby.small_blind}
      /
      ${lobby.big_blind}
    </p>

    <p>
      Waiting for players...
    </p>

    <button id="startGameBtn">
      Start Game
    </button>

    <div id="playerList"></div>

  `;

});

/* --------------------
   REFRESH LOBBIES
-------------------- */

function refreshLobbies() {

  socket.emit("getLobbies");

}
