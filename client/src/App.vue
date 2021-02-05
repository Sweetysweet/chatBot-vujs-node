<template>
	<div id="app">
		<Chat/>
	</div>
</template>

<script>

import Chat from '@/components/Chat/Chat'
export default {
  name: "App",
  components: { Chat }
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
	height: 100vh
	width: 100%
	max-width: 768px
	margin: 0 auto
	padding: 15px
	box-sizing: border-box

</style>
