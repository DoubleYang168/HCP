<template>
  <div>
    <a-menu theme="dark" v-model="current" mode="horizontal" :selectedKeys="[$route.name]">
      <a-menu-item key="dxly">
        典型流域
      </a-menu-item>
      <a-menu-item key="xmkt">
        项目课题
      </a-menu-item>
      <a-menu-item key="dysj">
        多源数据
      </a-menu-item>
      <a-menu-item key="jsyb">
        降水预报
      </a-menu-item>
      <a-menu-item key="llff">
        理论方法
      </a-menu-item>
      <a-menu-item key="dxjs">
        模型技术
      </a-menu-item>
      <a-menu-item key="bqdx">
        不确定性
      </a-menu-item>
      <a-menu-item key="jcpt">
        集成平台
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        current: ''
      };
    },
  }
</script>

<style scoped>

</style>
