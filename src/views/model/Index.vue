<template>
  <div>
    <a-layout style="height: 100%; padding: 8px">
      <a-layout-sider width="180" style="background: #fff; height: 100%">
        <a-menu
          style="width: 180px; height: 100%"
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
      <div>
        <a-drawer
          title="参数面板"
          width="570"
          :closable="false"
          :visible="visible"
          @close="onClose"
        >
          <a-layout style="width: 100%">
            <a-layout-content
              :style="{
                background: '#fff',
                padding: '8px',
                margin: 0,
                minHeight: '280px',
                overflow: 'auto',
              }"
            >
              <common-model
                v-bind:status="this.modelStatus"
                v-on:change="changeStatus"
              ></common-model>
            </a-layout-content>
          </a-layout>
        </a-drawer>
      </div>
      <a-layout style="padding-left: 8px; width: 60%">
        <a-button type="primary" style="width: 100%" @click="showDrawer">
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
          <model-stopped v-show="modelStatus === 'stopped'"></model-stopped>
          <model-running v-show="modelStatus === 'running'"></model-running>
          <img
            v-show="modelStatus === 'finished' || modelStatus === 'cancelled'"
            src="http://172.22.0.4:6080/arcgis/rest/services/airport/MapServer/export?dpi=96&transparent=tr%20ue&format=png32&layers=show%3A0%2C1%2C2%2C3%2C4%2C5&bbox=-10658055.106393551%20%2C636386.9693250969%2C-10529946.646987546%2C763731.0584482494&bboxSR=102100&i%20mageSR=102100&size=838%2C833&f=image"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import CommonModel from "./Model";
import ModelStopped from "../common/ModelStopped";
import ModelRunning from "../common/ModelRunning";

export default {
  name: "model",
  components: { CommonModel, ModelStopped, ModelRunning },
  data() {
    return {
      visible: false,

      menuList: [
        {
          name: "数据同化模型",
          value: "dataModel",
        },
        {
          name: "气象预报模型",
          value: "meteorologyModel",
        },
        {
          name: "气候预测模型",
          value: "climateModel",
        },
        {
          name: "分布式水文模型",
          value: "distributedHydrologyModel",
        },
        {
          name: "陆气耦合模型",
          value: "landAtmosphereModel",
        },
        {
          name: "水资源系统模型",
          value: "waterResourcesSystemModel",
        },
        {
          name: "不确定性分析模型",
          value: "uncertainModel",
        },
      ],
      modelStatus: "",
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
  },
};
</script>

<style scoped>
</style>
