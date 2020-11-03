<template>
  <div>
    <a-layout style="height:100%; padding: 20px">
      <a-layout-sider width="256" style="background: #fff; height:100%">
        <a-menu
          style="width: 256px; height:100%"
          :default-selected-keys="['1']"
          mode="inline"
          @click="handleClick"
        >
          <template v-for="(item, index) in menuList">
            <a-sub-menu :key="`0_${index}`" @titleClick="titleClick">
              <span slot="title">{{item.name}}</span>
              <template v-if="item.children && item.children.length > 0">
                <template v-for="(sub, subIndex) in item.children">
                  <a-menu-item-group :key="`0_${index}_${subIndex}`">
                    <template slot="title"><span>{{sub.name}}</span></template>
                    <template v-if="sub.items && sub.items.length > 0">
                      <template v-for="subItem in sub.items">
                        <a-menu-item :key="subItem.value">
                          {{subItem.name}}
                        </a-menu-item>
                      </template>
                    </template>
                  </a-menu-item-group>
                </template>
              </template>
              <template v-else>
                <template v-for="(childItem, childIndex) in item.items">
                  <template v-if="childItem.items && childItem.items.length > 0">
                      <a-sub-menu :key="`1_${childIndex}`" @titleClick="titleClick">
                        <span slot="title">{{childItem.name}}</span>
                        <template v-for="(sub, subIndex) in childItem.items">
                          <a-menu-item-group :key="`1_${index}_${subIndex}`">
                            <a-menu-item :key="sub.value">
                              {{sub.name}}
                            </a-menu-item>
                          </a-menu-item-group>
                        </template>
                      </a-sub-menu>
                  </template>
                  <template v-else>
                    <a-menu-item :key="childItem.value">
                      {{childItem.name}}
                    </a-menu-item>
                  </template>
                </template>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding-left:20px">
        <a-layout-content
          :style="{ background: '#fff', padding: '20px', margin: 0, minHeight: '280px', overflow: 'auto'}"
        >
          <div class="webApp" v-show="this.showType === 'map'">
            <web-map :arc-gis-server-url="serverUrl" :layer-id="layerId"></web-map>
          </div>
          <div v-show="this.showType === 'list'">
            <div style="margin-bottom: 16px">
              <a-upload
                style="float: left"
                name="file"
                :multiple="false"
                :action="this.uploadAction"
                @change="handleChange"
              >
                <a-button>
                  <a-icon type="upload"/>
                  上传文件
                </a-button>
              </a-upload>
              <a-button style="margin-left: 8px" type="primary" :disabled="!hasSelected" :loading="loading"
                        @click="downloadSelected">
                <a-icon type="download"/>
                下载文件
              </a-button>
              <span style="margin-left: 8px">
                <template v-if="hasSelected">
                {{ `已选中 ${selectedRowKeys.length} 个文件` }}
                </template>
              </span>
            </div>
            <a-table
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              :columns="columns"
              :row-key="record => record.name"
              :data-source="data"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
            >
              <span slot="action" slot-scope="text, record">
                <a @click="downloadFile(record.name, record.name, false)">下载</a>
              </span>
              <span slot="lastModified" slot-scope="text, record">
                {{record.lastModified |  formatDate}}
              </span>
              <span slot="size" slot-scope="text, record">
                {{record.size |  formatSize}}
              </span>
            </a-table>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import WebMap from "./WebMap";
  import {listFiles, download} from '@/api/fileTransfer'

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name'
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      scopedSlots: {customRender: 'size'}
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastModified',
      scopedSlots: {customRender: 'lastModified'}
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: {customRender: 'action'}
    }
  ];

  export default {
    name: "data",
    components: {WebMap},
    data() {
      return {
        menuList: [
          {
            "name": "静态",
            "items": [
              {
                "name": "土壤",
                "value": "soil",
                "items": [
                  {
                    "name": "汉江土壤",
                    "value": "hanjiangturang",
                  },
                  {
                    "name": "淮河土壤",
                    "value": "huaiheturang",
                  },
                  {
                    "name": "渭河土壤",
                    "value": "weiheturang",
                  },
                  {
                    "name": "子牙河土壤",
                    "value": "ziyaheturang",
                  }
                ]
              },
              {
                "name": "植被",
                "value": "vegetation",
                "items": [
                  {
                    "name": "汉江植被",
                    "value": "hanjiangzhibei",
                  },
                  {
                    "name": "淮河植被",
                    "value": "huaihezhibei",
                  },
                  {
                    "name": "渭河植被",
                    "value": "weihezhibei",
                  },
                  {
                    "name": "子牙河植被",
                    "value": "ziyahezhibei",
                  }
                ]
              },
              {
                "name": "水系",
                "value": "riverSystem",
                "items": [
                  {
                    "name": "汉江水系",
                    "value": "hanjiangshuixi",
                  },
                  {
                    "name": "淮河水系",
                    "value": "huaiheshuixi",
                  },
                  {
                    "name": "渭河水系",
                    "value": "weiheshuixi",
                  },
                  {
                    "name": "子牙河水系",
                    "value": "ziyaheshuixi",
                  }
                ]
              },
              {
                "name": "地形",
                "value": "topography",
              },
              {
                "name": "遥感",
                "value": "remoteSense",
              }
            ]
          },
          {
            "name": "动态",
            "items": [
              {
                "name": "渭河流域",
                "value": "whly",
              },
              {
                "name": "子牙河流域",
                "value": "zyhly",
              },
              {
                "name": "汉江流域",
                "value": "hjly",
              },
              {
                "name": "淮河流域",
                "value": "hhly",
              }
            ]
          }
        ],
        contentType: 'index',
        showType: 'map',
        columns,
        pagination: {},
        data: [],
        loading: false,
        selectedRowKeys: [],
        uplaodFileList: [],
        listUrl: '/files/file/list/',
        downloadUrl: '/files/file/download',
        uploadUrl: '/files/file/upload/',
        serverUrl: '',
        layerId: ''
      };
    },
    methods: {
      handleTableChange() {
        // const pager = {...this.pagination};
        // pager.current = pagination.current ? pagination.current : 1;
        // this.pagination = pager;
        // this.fetch({
        //   results: pagination.pageSize,
        //   page: pagination.current,
        //   sortField: sorter.field,
        //   sortOrder: sorter.order,
        //   ...filters,
        // });
        this.getFiles();
      },
      getFiles() {
        this.loading = true;
        listFiles(this.listUrl + this.contentType).then(res => {
          this.loading = false;
          this.data = res
          console.log(res)
        });
      },
      downloadFile(files, fileName, isZip) {
        console.log(files)
        download(this.downloadUrl, {
          dir: this.contentType,
          names: files
        }, {responseType: 'blob'}).then(res => {
          console.log(res.data)
          let blob
          if (isZip) {
            blob = new Blob([res], {
              type: 'application/zip'
            });
          } else {
            blob = new Blob([res]);
            // blob = new Blob([res], { type: 'application/octet-stream;charset=UTF-8' })
          }
          if ('download' in document.createElement('a')) {
            // 支持a标签download的浏览器
            const link = document.createElement('a')// 创建a标签
            link.download = fileName
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()// 执行下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link)// 释放标签
          }
        })
      },
      titleClick(e) {
        console.log('titleClick', e);
      },
      handleClick(item) {
        console.log(item)
        if (item.key != this.contentType) {
          this.selectedRowKeys = []
        }
        this.contentType = item.key;
        if (this.contentType === 'hhly' || this.contentType === 'hjly' || this.contentType === 'zyhly' || this.contentType === 'whly') {
          this.handleTableChange();
          this.showType = 'list';
        } else {
          this.showType = 'map';
          switch (this.contentType) {
            case "hanjiangturang":
              this.layerId = '汉江土壤'
              this.serverUrl = '/arcgis/rest/services/hanjiang_turang/MapServer'
              break;
            case "huaiheturang":
              this.layerId = '淮河土壤'
              this.serverUrl = '/arcgis/rest/services/huaihe_turang/MapServer'
              break;
            case "weiheturang":
              this.layerId = '渭河土壤'
              this.serverUrl = '/arcgis/rest/services/weihe_turang/MapServer'
              break;
            case "ziyaheturang":
              this.layerId = '子牙河土壤'
              this.serverUrl = '/arcgis/rest/services/ziyahe_turang/MapServer'
              break;
            case "hanjiangshuixi":
              this.layerId = '汉江水系'
              this.serverUrl = '/arcgis/rest/services/hanjiang_shuixi/MapServer'
              break;
            case "huaiheshuixi":
              this.layerId = '淮河水系'
              this.serverUrl = '/arcgis/rest/services/huaihe_shuixi/MapServer'
              break;
            case "weiheshuixi":
              this.layerId = '渭河水系'
              this.serverUrl = '/arcgis/rest/services/weihe_shuixi/MapServer'
              break;
            case "ziyaheshuixi":
              this.layerId = '子牙河水系'
              this.serverUrl = '/arcgis/rest/services/ziyahe_shuixi/MapServer'
              break;
            case "hanjiangzhibei":
              this.layerId = '汉江植被'
              this.serverUrl = '/arcgis/rest/services/hanjiang_zhibei/MapServer'
              break;
            case "huaihezhibei":
              this.layerId = '淮河植被'
              this.serverUrl = '/arcgis/rest/services/huaihe_zhibei/MapServer'
              break;
            case "weihezhibei":
              this.layerId = '渭河植被'
              this.serverUrl = '/arcgis/rest/services/weihe_zhibei/MapServer'
              break;
            case "ziyahezhibei":
              this.layerId = '子牙河植被'
              this.serverUrl = '/arcgis/rest/services/ziyahe_zhibei/MapServer'
              break;
            default:
              break;
          }
        }
        console.log(this.contentType)
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      downloadSelected() {
        if (this.selectedRowKeys.length === 1) {
          this.downloadFile(this.selectedRowKeys[0], this.selectedRowKeys[0], false)
        } else {
          let files = this.selectedRowKeys.join(",");
          this.downloadFile(files, "归档.zip", true)
        }
      },
      uploadAction() {
        return this.uploadUrl + this.contentType
      },
      handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file);
        }
        if (info.file.status === 'done') {
          console.log(this.uplaodFileList)
          this.$message.success(info.file.name + '上传成功');
          this.getFiles();
        } else if (info.file.status === 'error') {
          this.$message.error(info.file.name + '上传失败');
        }
      },
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ("0" + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ("0" + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ("0" + s) : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      },
      formatSize: function (value) {
        if (value < 1024) {
          return value + "B"
        } else {
          let kbValue = value / 1024;
          if (kbValue < 1024) {
            return Math.round(kbValue) + "K"
          } else {
            let mbValue = kbValue / 1024
            if (mbValue < 1024) {
              return Math.round(kbValue) + "M"
            } else {
              return Math.round((mbValue / 1024)) + "G"
            }
          }
        }
      }
    }
  }

</script>

<style scoped>
  .webApp {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  /deep/ .ant-upload-list-item {
    display: none;
  }
</style>
