<template>
  <div>
    <a-layout style="height:100%; padding: 20px">
      <a-layout-sider width="256" style="background: #fff; height:100%">
        <a-menu
          style="width: 256px; height:100%"
          :default-selected-keys="['shortTermModel']"
          mode="inline"
          @click="handleClick"
        >
          <template v-for="item in menuList">
            <a-menu-item :key="item.value">
              {{item.name}}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding-left:20px;height:100%;">
        <a-layout-content
          :style="{ background: '#fff', padding: '20px', margin: 0, minHeight: '280px', overflow: 'auto'}"
        >
          <div>
            <a-steps :current="current" type="navigation" :style="stepStyle" @change="onChange">
              <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
            </a-steps>
<!--            <div class="steps-content">-->
              <a-layout style="height:30%; padding: 20px">
                <a-layout-sider width="40%" style="background: #fff; height:100%">
                  <short-term-model v-bind:status="this.modelStatus" v-on:change="changeStatus"></short-term-model>
                </a-layout-sider>
                <a-layout style="padding-left:20px">
                  <a-layout-content
                    :style="{ background: '#fff', padding: '20px', margin: 0, minHeight: '280px', overflow: 'auto'}"
                  >
                    <model-stopped v-show="modelStatus === 'stopped'"></model-stopped>
                    <model-running v-show="modelStatus === 'running'"></model-running>
                    <img style="max-height: 100%" v-show="modelStatus === 'finished' || modelStatus === 'cancelled'"
                         src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">
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
    components: {ShortTermModel, ModelStopped, ModelRunning},
    data() {
      return {
        menuList: [
          {
            "name": "短期气象水文预测",
            "value": "shortTermModel"
          },
          {
            "name": "中期气象水文预测",
            "value": "midTermModel"
          },
          {
            "name": "长期气象水文预测",
            "value": "longTermModel"
          }
        ],
        modelStatus: "",
        current: 0,
        steps: [
          {
            title: '过程模拟',
            content: '过程模拟',
          },
          {
            title: 'HMS/WRF',
            content: 'HMS/WRF',
          },
          {
            title: '预警',
            content: '预警',
          },
          {
            title: '预报预测',
            content: '预报预测',
          },
        ],
        stepStyle: {
          marginBottom: '30px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
        },
      }
    },
    methods: {
      titleClick(e) {
        console.log('titleClick', e);
      },
      handleClick(item) {
        console.log(item.key)
      },
      changeStatus(status) {
        this.modelStatus = status
        console.log(this.modelStatus)
      },
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
      onChange(current) {
        console.log('onChange:', current);
        this.current = current;
      }
    },
  }
</script>

<style scoped>

</style>
