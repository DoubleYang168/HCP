<template>
  <div>
    <a-menu v-model="current" mode="horizontal" theme="light" class="basin-menu">
      <a-icon type="home" class="home" @click="jumpTo('')" />
      <a-menu-item key="typicalBasin" @click="jumpTo('basin')">
        典型流域
      </a-menu-item>
      <a-menu-item key="topic" @click="jumpTo('topic')">
        项目课题
      </a-menu-item>
      <a-menu-item key="data" @click="jumpTo('data')">
        多源数据
      </a-menu-item>
      <a-menu-item key="forecast" @click="jumpTo('forecast')">
        降水预报
      </a-menu-item>
      <a-menu-item key="method" @click="jumpTo('method')">
        理论方法
      </a-menu-item>
      <a-menu-item key="model" @click="jumpTo('model')">
        模型技术
      </a-menu-item>
      <a-menu-item key="uncertainty" @click="jumpTo('uncertainty')">
        不确定性
      </a-menu-item>
      <a-menu-item key="framework" @click="jumpTo('framework')">
        集成平台
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        current: []
      }
    },
    methods: {
      jumpTo(item) {
        console.log(item)
        this.$router.push(item)
      }
    },
    mounted() {
      this.current.push(this.$route.name)
      console.log(this.$route.name)
    }
  }
</script>

<style scoped>
.basin-menu {
  border-radius: 2px;
  background: rgb(53, 130, 196) !important;
  width:80%;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  color: white;
  min-width: 1216px;
}
.home{
  margin-right: 40px;
}
</style>
