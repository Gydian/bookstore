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
          window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
          window.addEventListener('unload', e => this.unloadHandler(e))
        },
  destroyed() {
          window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
          window.removeEventListener('unload', e => this.unloadHandler(e))
        },
        methods: {
          beforeunloadHandler(){
            this._beforeUnload_time=new Date().getTime();
          },
          unloadHandler(e){
            this._gap_time=new Date().getTime()-this._beforeUnload_time;
            //判断是窗口关闭还是刷新
            if(this._gap_time<=5){
              //如果是登录状态
              if(this.$store.state.token){
                  localStorage.clear()
              }
            }
          },
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
