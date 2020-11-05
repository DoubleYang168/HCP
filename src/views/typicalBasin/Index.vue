<template>
  <!--  <div>-->
  <!--    <a-layout>-->
  <!--      <a-layout-sider width="200" style="background: #fff">-->
  <!--        <div>渭河流域</div>-->
  <!--      </a-layout-sider>-->
  <!--      <a-layout style="padding: 0 24px 24px">-->
  <!--        <a-breadcrumb style="margin: 16px 0">-->
  <!--          <a-breadcrumb-item>Home</a-breadcrumb-item>-->
  <!--          <a-breadcrumb-item>List</a-breadcrumb-item>-->
  <!--          <a-breadcrumb-item>App</a-breadcrumb-item>-->
  <!--        </a-breadcrumb>-->
  <!--        <a-layout-content-->
  <!--          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"-->
  <!--        >-->
  <!--          Content-->
  <!--        </a-layout-content>-->
  <!--      </a-layout>-->
  <!--    </a-layout>-->
  <!--  </div>-->
  <div class="card-container">
    <a-layout style="height: 100%; padding: 8px">
      <a-layout-sider width="180" style="background: #fff; height: 100%">
        <a-menu
          style="width: 180px; height: 100%;"
          :default-selected-keys="['dataModel']"
          mode="inline"
          @click="handleClick"
        >
          <template v-for="item in menuList">
            <a-menu-item :key="item.value">
              {{ item.name }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding-left: 8px">
        <a-layout-content
          :style="{
            background: '#fff',
            margin: 0,
            minHeight: '280px',
            overflow: 'auto',
          }"
        >
          <home v-show="this.contentType === 'index'"></home>
          <Hanjiang v-show="this.contentType === 'hanjiang'"></Hanjiang>
          <Ziyahei v-show="this.contentType === 'ziyahe'"></Ziyahei>
          <Huaihei v-show="this.contentType === 'huaihe'"></Huaihei>
          <Weihei v-show="this.contentType === 'weihe'"></Weihei>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout >
      <a-layout-footer class="footer"
        >Copyright @ 河海大学水文水资源学院 版权所有 联系电话：（025）83786621
        EMAIL信箱：shxy@hhu.edu.cn</a-layout-footer
      >
    </a-layout>
  </div>
</template>

<script>
import Huaihei from "./Huaihei";
import Ziyahei from "./Ziyahei";
import Weihei from "./Weihei";
import Hanjiang from "./Hanjiang";
import Home from "./Home";
// import Footer from "../../layouts/Footer"

export default {
  name: "TypicalBasin",
  components: { Weihei, Huaihei, Ziyahei, Hanjiang, Home },
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
      menuList: [
        {
          name: "渭河流域",
          value: "weihe",
        },
        {
          name: "子牙河流域",
          value: "ziyahe",
        },
        {
          name: "汉江流域",
          value: "hanjiang",
        },
        {
          name: "淮河流域",
          value: "huaihe",
        },
      ],
      contentType: "index",
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    titleClick(e) {
      console.log("titleClick", e);
    },
    handleClick(item) {
      this.contentType = item.key;
      console.log(this.contentType);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 48px;
  padding: 0;
  text-align: center;
  line-height: 48px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  background: rgb(53, 130, 196);
  border-radius: 2px;
}
</style>
