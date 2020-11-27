<template>
  <div>
    <a-layout style="height: 100%; padding: 8px">
      <!-- 左侧menu -->
      <a-layout-sider width="180" style="background: #fff; height: 100%">
        <a-menu
          style="width: 180px; height: 100%;background: #ecebeb;"
          :default-selected-keys="['shortTermModel']"
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

      <a-layout style="padding-left: 8px; height: 100%">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '8px',
            margin: 0,
            minHeight: '280px',
            overflow: 'auto',
          }"
        >
          <div>
            <a-steps
              :current="current"
              type="navigation"
              :style="stepStyle"
              @change="onChange"
            >
              <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
              />
            </a-steps>
            <!-- 右侧划出的调参面板 -->
            <a-layout-sider style="background: #fff; height: 100%">
              <div>
                <a-drawer
                  title="参数面板"
                  width="570"
                  :closable="false"
                  :visible="visible"
                  @close="onClose"
                >
                  <short-term-model
                    v-bind:status="this.modelStatus"
                    v-on:change="changeStatus"
                  ></short-term-model>
                </a-drawer>
              </div>
            </a-layout-sider>
            <!--            <div class="steps-content">-->
            <!-- 页面显示的模型结果展示 -->
            <a-layout style="padding: 8px">
              <a-layout style="">
                <a-button
                  type="primary"
                  style="width: 100%"
                  @click="showDrawer"
                >
                  调参
                </a-button>
                <a-layout-content
                  :style="{
                    background: '#fff',
                    padding: '8px',
                    margin: 0,
                    minHeight: '280px',
                    overflow: 'auto',
                  }"
                >
                  <model-stopped
                    v-show="modelStatus === 'stopped'"
                  ></model-stopped>
                  <model-running
                    v-show="modelStatus === 'running'"
                  ></model-running>
                  <img
                    style="max-height: 100%"
                    v-show="
                      modelStatus === 'finished' || modelStatus === 'cancelled'
                    "
                    src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image"
                  />
                </a-layout-content>
              </a-layout>
            </a-layout>
          </div>
          <!--          </div>-->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import ShortTermModel from "./ShortTermModel";
import ModelStopped from "../common/ModelStopped";
import ModelRunning from "../common/ModelRunning";

export default {
  name: "framework",
  components: { ShortTermModel, ModelStopped, ModelRunning },
  data() {
    return {
      visible: false,

      menuList: [
        {
          name: "短期气象水文预测",
          value: "shortTermModel",
        },
        {
          name: "中期气象水文预测",
          value: "midTermModel",
        },
        {
          name: "长期气象水文预测",
          value: "longTermModel",
        },
      ],
      modelStatus: "",
      current: 0,
      steps: [
        {
          title: "过程模拟",
          content: "过程模拟",
        },
        {
          title: "HMS/WRF",
          content: "HMS/WRF",
        },
        {
          title: "预警",
          content: "预警",
        },
        {
          title: "预报预测",
          content: "预报预测",
        },
      ],
      stepStyle: {
        marginBottom: "30px",
        boxShadow: "0px -1px 0 0 #e8e8e8 inset",
      },
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },

    titleClick(e) {
      console.log("titleClick", e);
    },
    handleClick(item) {
      console.log(item.key);
    },
    changeStatus(status) {
      this.modelStatus = status;
      console.log(this.modelStatus);
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    onChange(current) {
      console.log("onChange:", current);
      this.current = current;
    },
  },
};
</script>

<style scoped>
</style>
