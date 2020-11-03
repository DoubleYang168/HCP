<template>
  <div>
    <a-layout style="height:100%; padding: 20px">
      <a-layout-sider width="40%" style="background: #fff; height:100%">

        <a-form class="ant-advanced-search-form" :form="modelConfig" @submit="handleExec">
          <a-row :gutter="24">
            <a-col
              v-for="(item, index) in this.modelMetaData"
              :key="index"
              :span="8"
            >
              <a-form-item :label="item.label">
                <a-input v-model="modelConfig[item.key]"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button type="primary" @click="handleUpdate">
                更新
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit" @click="handleExec">
                执行
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleStop">
                停止
              </a-button>
              <!--              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">-->
              <!--                重置-->
              <!--              </a-button>-->
            </a-col>
          </a-row>
        </a-form>
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
</template>

<script>
  import {
    getMethodModelConfig,
    getMethodModelStatus,
    runMethodModelConfig,
    cancelMethodModelConfig,
    updateMethodModelConfig
  } from '@/api/method'
  import ModelStopped from "../common/ModelStopped";
  import ModelRunning from "../common/ModelRunning";

  export default {
    name: "method",
    components: {ModelStopped, ModelRunning},
    data() {
      return {
        modelMetaData: [
          {
            "label": "daybasei",
            "key": "daybasei"
          },
          {
            "label": "dayendi",
            "key": "dayendi"
          },
          {
            "label": "dayresi",
            "key": "dayresi"
          },
          {
            "label": "dayhisi",
            "key": "dayhisi"
          },
          {
            "label": "ifresti",
            "key": "ifresti"
          },
          {
            "label": "dtimelsxi",
            "key": "dtimelsxi"
          },
          {
            "label": "dtimehydi",
            "key": "dtimehydi"
          },
          {
            "label": "dtimestri",
            "key": "dtimestri"
          },
          {
            "label": "daytrani",
            "key": "daytrani"
          },
          {
            "label": "iyrb",
            "key": "iyrb"
          },
          {
            "label": "nyrt",
            "key": "nyrt"
          },
          {
            "label": "ntran",
            "key": "ntran"
          },
          {
            "label": "dimension_atran",
            "key": "dimension_atran"
          },
          {
            "label": "dimension_xtran",
            "key": "dimension_xtran"
          },
          {
            "label": "dimension_ytran",
            "key": "dimension_ytran"
          },
          {
            "label": "lon_lat1",
            "key": "lon_lat1"
          },
          {
            "label": "lon_lat2",
            "key": "lon_lat2"
          },
          {
            "label": "lon_lat3",
            "key": "lon_lat3"
          },
        ],
        modelConfig: {
          "daybasei": "",
          "dayendi": "",
          "dayresi": "",
          "dayhisi": "",
          "ifresti": "",
          "dtimelsxi": "",
          "dtimehydi": "",
          "dtimestri": "",
          "daytrani": "",
          "iyrb": "",
          "nyrt": "",
          "ntran": "",
          "dimension_atran": "",
          "dimension_xtran": "",
          "dimension_ytran": "",
          "lon_lat1": "",
          "lon_lat2": "",
          "lon_lat3": "",
        },
        modelStatus: ""
      };
    },
    computed: {},
    updated() {
      console.log('updated');
    },
    methods: {
      handleExec(e) {
        e.preventDefault();
        runMethodModelConfig().then(res => {
          console.log(res)
          if (res.code === '5100') {
            this.$message.warn(
              res.msg,
              3,
            );
          } else if (res.code === '200') {
            this.$message.success(
              res.msg,
              3,
            );
          }
          this.updateModelStatus()
        })
        // this.$form.validateFields((error, values) => {
        //   console.log('error', error);
        //   console.log('Received values of form: ', values);
        // });
      },

      handleReset() {
        // this.$form.resetFields();
      },
      handleStop(e) {
        e.preventDefault();
        cancelMethodModelConfig().then(res => {
          console.log(res)
          this.updateModelStatus()
        })
      },
      handleUpdate() {
        updateMethodModelConfig(this.modelConfig).then(res => {
          console.log(res)
          if (res.code === '200') {
            this.$message.success(
              res.msg,
              3,
            );
          } else {
            this.$message.error(
              res.msg,
              3,
            );
          }
        })
      },
      getModelConfig() {
        getMethodModelConfig().then(res => {
          if (res.data) {
            for (let key in this.modelConfig) {
              console.log(key, this.modelConfig[key])
              this.modelConfig[key] = res.data[key]
            }
          }
        });
      },
      updateModelStatus() {
        getMethodModelStatus().then(res => {
          if (res.code === "200") {
            if (res.msg) {
              console.log(res.msg)
              this.modelStatus = 'stopped';
            } else {
              if (res.data) {
                if (res.data.isCancelled && res.data.isCancelled === 'true') {
                  this.modelStatus = 'cancelled';
                } else if (res.data.endTime) {
                  this.modelStatus = 'finished';
                } else {
                  this.modelStatus = 'running';
                }
              }
              console.log(res.data)
            }
          } else {
            console.log(res.data.errorInfo)
          }
        });
      },

    },
    mounted() {
      // 初始化模型配置参数
      this.getModelConfig();

      this.updateModelStatus();
      this.timer = setInterval(this.updateModelStatus, 5000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped>
  .ant-advanced-search-form {
    margin: 20px;
    padding: 24px;
    /*background: #fbfbfb;*/
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
</style>
