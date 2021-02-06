<template>
  <div id="app" :class="mode">
    <Theme :mode="mode" @theme="themeHandler" />
    <Chat :mode="mode"/>
  </div>
</template>

<script>
import Chat from "@/components/Chat/Chat";
import Theme from "@/components/Theme/Theme";
export default {
  name: "App",
  components: { Chat, Theme },
  data: () => ({
    mode: "light",
  }),
  methods: {
    themeHandler() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
  },
};
</script>

<style lang="sass">
body
	font-family: 'Avenir', Helvetica, Arial, sans-serif
	color: #2C3E50
	margin: 0
	padding: 0

#app
	display: flex
	flex-direction: column
	height: 100%
	width: 100%
	max-width: 768px
	margin: 0 auto
	padding: 15px
	box-sizing: border-box
	transition: background-color .3s ease-in-out

.dark
	background-color: #192734
	color: #f3f3f3
</style>
