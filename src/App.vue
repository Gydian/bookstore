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
  mounted: function () {
         //此方法刷新页面时也会执行
        //  window.addEventListener('beforeunload',()=>{
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('name');
        // });
    },
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
