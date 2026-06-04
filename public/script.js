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

});
