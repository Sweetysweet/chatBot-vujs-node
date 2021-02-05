<template>
  <div id="app">
    <div class="header">
      <h1>Chatroom</h1>
      <p class="username">Username: {{ username }}</p>
      <p class="online">Online: {{ users.length }}</p>
    </div>
    <ChatRoom :messages="messages" @sendMessage="this.sendMessage" />
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatRoom from "@/components/Chat/Chatroom";

export default {
  name: "app",
  components: {
    ChatRoom,
  },
  data: () => ({
    username: "",
    socket: io("ws://localhost:3000"),
    messages: [],
    users: [],
  }),
  methods: {
    joinServer() {
      this.socket.on("loggedIn", (data) => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.username);
      });

      this.listen();
    },
    listen() {
      this.socket.on("userOnline", (user) => {
        this.users.push(user);
      });
      this.socket.on("userLeft", (user) => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on("msg", (message) => {
        this.messages.push(message);
      });
    },
    sendMessage(message) {
      this.socket.emit("msg", message);
    }
  },
  mounted() {
    this.username = prompt("What is your username?", "Anonymous");

    if (!this.username) {
      this.username = "Anonymous";
    }

    this.joinServer();
  }
}
</script>
