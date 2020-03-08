<template>
  <div id="app">
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
            // // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据 刷新也会清除
            // window.onbeforeunload = function (e) {
            //     var storage = window.localStorage;
            //     storage.clear()
            // }
        }
}
</script>

<style>
html,body,#app{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .main {
    height: 100%;
    overflow: hidden;
  }
</style>
