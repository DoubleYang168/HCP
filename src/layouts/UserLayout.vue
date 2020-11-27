<template>
  <!--  <div>-->
  <!--    <a-button>UserLayout</a-button>-->
  <!--    <router-view></router-view>-->
  <!--  </div>-->
  <div class="layout">
    <top-header></top-header>
    <navbar></navbar>
    <router-view
      style="height: calc(100% - 148px); width: 80% !important; margin: 0 auto; min-width: 1216px;"
    >
    </router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
  components: { Navbar, TopHeader, Footer },
  mounted() {
    console.log("UserLayout mounted.");
  },
};
</script>

<style>
.layout {
  height: 100%;
}
</style>
