<template>
  <!--  <div>-->
  <!--    <a-button>UserLayout</a-button>-->
  <!--    <router-view></router-view>-->
  <!--  </div>-->
  <div class="layout">
    <top-header></top-header>
    <navbar></navbar>
    <router-view style="height: calc(100% - 148px)"></router-view>
  </div>
</template>

<script>
  import TopHeader from './TopHeader'
  import Navbar from "./Navbar";

  export default {
    components: {Navbar, TopHeader},
    mounted() {
      console.log('UserLayout mounted.')
    }
  }
</script>

<style>
  .layout {
    height: 100%;
  }
</style>
