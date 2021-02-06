<template>
  <div class="chat-window">
    <div class="chat-window__messages" :class="themeColor()">
      <div
        class="chat-window__message"
        v-for="message in messages"
        :key="message.index"
      >
        <div class="chat-window__username">{{ message.username }}:</div>
        <div class="chat-window__message-text">{{ message.msg }}</div>
      </div>
    </div>
    <form class="chat-window__input-container" @submit.prevent="sendMessage">
      <input type="text" v-model="msg" />
      <button type="submit" class="chat-window__sendmessage" :disabled="!msg">
        Отправить
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "ChatRoom",
  props: {
    messages: { type: Array },
    mode: { type: String },
  },
  data: () => ({
    msg: ""
  }),
  methods: {
    sendMessage() {
      if (!this.msg) {
        console.log("Пожалуйста введите сообщение");
        return;
      }
      this.$emit("sendMessage", this.msg);
      this.msg = "";
    },
    themeColor() {
      return this.mode;
    },
  },
};
</script>

<style lang="sass" scoped>
.chat-window
	flex: 1
	display: flex
	flex-direction: column
	background-color: #F9F9F9
	box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15)
	&__messages
		flex: 1
		overflow: scroll
		max-height: 400px
		.dark
			.message
				background-color: #192734
				color: #f3f3f3
		.light
			.message
				background-color: #F9F9F9
				color: #000

	&__message
		display: flex
		border-bottom: 1px solid #EFEFEF
		padding: 10px
		transition: background-color .3s ease-in-out
		&:last-of-type
			border-bottom: none

	&__username
		width: 100px
		margin-right: 15px

	&__message-text
		flex: 1

	&__input-container
		display: flex
		input
			flex: 1
			height: 35px
			font-size: 18px
			box-sizing: border-box

	&__sendmessage
		width: 75px
		height: 35px
		box-sizing: border-box
		cursor: pointer
		border-radius: 5px
</style>