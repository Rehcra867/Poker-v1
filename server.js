const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const { Server } = require("socket.io");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("register", async (data) => {
    try {
      const username = data.username.trim();
      const password = data.password;

      const hash = await bcrypt.hash(password, 10);

      const { error } = await supabase
        .from("users")
        .insert({
          username,
          password_hash: hash
        });

      if (error) {
        socket.emit("registerError", error.message);
        return;
      }

      socket.emit("registerSuccess");
    } catch (err) {
      socket.emit("registerError", err.message);
    }
  });

  socket.on("login", async (data) => {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", data.username)
        .limit(1);

      if (error || users.length === 0) {
        socket.emit("loginError", "User not found");
        return;
      }

      const user = users[0];

      const valid = await bcrypt.compare(
        data.password,
        user.password_hash
      );

      if (!valid) {
        socket.emit("loginError", "Invalid password");
        return;
      }

      socket.emit("loginSuccess", {
        username: user.username,
        chips: user.chips
      });

    } catch (err) {
      socket.emit("loginError", err.message);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
