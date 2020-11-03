<template>
  <div class="main">
    <div style="float:left; overflow-y: auto;height: 100%">
      <a-tree
        checkable
        v-model="checkedKeys"
        :tree-data="treeData"
        :auto-expand-parent="autoExpandParent"
        :replace-fields="replaceFields"
        @select="onSelect"
        @check="onCheck"
      />
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
  import {loadCss, loadModules, loadScript} from 'esri-loader';

  export default {
    name: "WebMap",
    props: {
      arcGisServerUrl: {
        type: String,
        default: ''
      },
      layerId: {
        type: String,
        default: ''
      }
    },
    mounted() {

      // // lazy load the required ArcGIS API for JavaScript modules and CSS
      // loadScript({url: 'https://js.arcgis.com/3.32/'})
      // loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
      // loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer'], {css: true})
      //   .then(([Map, ArcGISDynamicMapServiceLayer,]) => {
      //     self.map = new Map("map", {
      //       basemap: "topo",
      //       center: [106, 30],
      //       zoom: 5
      //     });
      //     // var tjUAVurl = 'http://172.22.0.4:6080/arcgis/rest/services/hanjiangtest/MapServer'
      //     // var chinarl = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
      //     var tjUAVurl = '/arcgis/rest/services/hanjiangtest/MapServer'
      //     var chinarl = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
      //
      //     var layer2 = new ArcGISDynamicMapServiceLayer(chinarl, {
      //       zoom: 20
      //     })
      //     var tjUAVLayer = new ArcGISDynamicMapServiceLayer(tjUAVurl, {
      //       id: "hangjiangtest"
      //     })
      //
      //     console.log(tjUAVLayer)
      //     // self.map.addLayer(tjUAVLayer, 48)
      //     self.map.addLayers([
      //       layer2,
      //       tjUAVLayer
      //     ]);
      //     dojo.connect(tjUAVLayer, "onLoad", this.loadList);
      //     // this.view = new MapView({
      //     //   container: this.$el,
      //     //   map: map,
      //     //   center: [-118, 34],
      //     //   zoom: 8
      //     // });
      //   })
    },
    methods: {
      loadList(layer) {
        const layerNode = {
          name: layer.id,
          key: layer.id,
          children: []
        }

        layer.layerInfos.forEach(item => {
          if (item.defaultVisibility) {
            this.checkedKeys.push(item.id)
          }
          const tmp = {
            name: item.name,
            key: item.id
          }
          layerNode.children.push(tmp);
        })

        let tmp = []
        tmp.push(layerNode)

        this.treeData = tmp
        this.showLayer = layer
      },
      layerChange(layer) {
        console.log(layer)
      },
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
        console.log(checkedKeys);
        console.log(self.map)
        this.showLayer.setVisibleLayers(this.checkedKeys)
      },
      initMap() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadScript({url: 'https://js.arcgis.com/3.32/'})
        loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
        loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer'], {css: true})
          .then(([Map, ArcGISDynamicMapServiceLayer,]) => {
            self.map = new Map("map", {
              basemap: "topo",
              center: [106, 30],
              zoom: 6
            });
            var tjUAVurl = this.url
            var chinarl = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'

            var layer2 = new ArcGISDynamicMapServiceLayer(chinarl, {
              zoom: 20,
              id: 'chinaLayer'

            })
            var tjUAVLayer = new ArcGISDynamicMapServiceLayer(tjUAVurl, {
              id: this.showLayerId
            })

            console.log(tjUAVLayer)
            // self.map.addLayer(tjUAVLayer, 48)
            self.map.addLayers([
              layer2,
              tjUAVLayer
            ]);
            self.dojo.connect(tjUAVLayer, "onLoad", this.loadList);
            // this.loadList(tjUAVLayer)
            this.hasInit = true
          })
      },
      destoryMap() {
        if (self.map) {
          console.log(self)
          // destroy the map view
          self.map = null;
        }
      }

    },
    data() {
      return {
        showLayer: {},
        layers: [],
        checkedKeys: [],
        autoExpandParent: true,
        replaceFields: {
          title: 'name',
        },
        treeData: [],
        url: '',
        hasInit: false,
        showLayerId: '',
        lastShowLayerId: ''
      }
    },
    beforeDestroy() {
      this.destoryMap()
    },
    watch: {
      layerId: {
        immediate: true,
        handler(value) {
          if (value && !value.isEmpty) {
            this.showLayerId = value
          }
        }
      },
      arcGisServerUrl: {
        immediate: true,
        handler(value) {
          if (value && !value.isEmpty) {
            console.log(value)
            this.url = value
            // this.initMap()
            if (!this.hasInit) {
              this.lastShowLayerId = this.showLayerId
              this.initMap()
            } else {
              var removeLayer = self.map.getLayer(this.lastShowLayerId);
              self.map.removeLayer(removeLayer);
              console.log(self.map)
              this.lastShowLayerId = this.showLayerId
              const layer = new esri.layers.ArcGISDynamicMapServiceLayer(this.url, {
                id: this.lastShowLayerId
              })
              self.map.addLayer(layer)
              self.dojo.connect(layer, "onLoad", this.loadList);
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  /*div {*/
  /*  padding: 0;*/
  /*  margin: 0;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/

  .main {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #map {
    padding: 0;
    margin: 0;
    height: 100%;
  }
</style>
