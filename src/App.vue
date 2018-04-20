<template>
  <div id="app">
    <HelloWorld style="margin-bottom: 20px"/>
    <HelloWorld style="margin-bottom: 20px" :init="init2"/>
    <HelloWorld style="margin-bottom: 20px" :init="init3"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data () {
    return {
      init2: {
        playBoardInit: [
          [2, 0, 0, 1],
          [1, 0, 0, 1],
          [1, 0, 0, 1],
          [2, 1, 1, 2]],
        positionX: 0,
        positionY: 3,
        positionFace: 'down'
      },
      init3: {
        playBoardInit: [
          [2, 0, 0, 0, 0],
          [1, 2, 0, 0, 0],
          [0, 1, 2, 0, 0],
          [0, 0, 1, 2, 0],
          [0, 0, 0, 1, 2]],
        positionX: 0,
        positionY: 0,
        positionFace: 'down'
      }
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
