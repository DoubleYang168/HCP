<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

  export default {
    name: 'App',
    data() {
      return {
        locale: zhCN
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
  }
</style>
