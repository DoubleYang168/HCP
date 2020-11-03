<template>
  <div class="main">


    <div id="map" class="map">
    </div>
  </div>
</template>

<script>
  import {loadCss, loadModules, loadScript} from "esri-loader";

  export default {
    name: "Home",
    data() {
      return {
        layers: [],
        replaceFields: {
          children: 'child',
          title: 'name',
        },
        treeData: [
          {
            name: '',
            key: '0-0',
            child: [
              {
                name: 'parent 1-1',
                key: '0-0-1',
                child: [{key: '0-0-1-0', name: 'zcvc'}],
              },
            ],
          },
        ]
    }
    },
    mounted() {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadScript({url: 'https://js.arcgis.com/3.32/'})
      loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
      loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer'], {css: true})
        .then(([Map, ArcGISDynamicMapServiceLayer,]) => {

          self.map = new Map("map", {
            basemap: "topo",
            center: [106, 30],
            zoom: 5
          });
          // var tjUAVurl = 'http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer'
          // var chinarl = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
          var tjUAVurl = '/arcgis/rest/services/hanjiangliuliang/MapServer'
          var chinarl = '/arcgis/rest/services/ChinaOnlineCommunity/MapServer'

          var layer2 = new ArcGISDynamicMapServiceLayer(chinarl, {
            zoom: 20
          })
          var tjUAVLayer = new ArcGISDynamicMapServiceLayer(tjUAVurl, {
            id: "hangjiangtest"
          })

          console.log(tjUAVLayer)
          console.log(tjUAVLayer.dpi)

          // self.map.addLayer(tjUAVLayer, 48)
          self.map.addLayers([
            layer2,
            tjUAVLayer
          ]);

          // this.view = new MapView({
          //   container: this.$el,
          //   map: map,
          //   center: [-118, 34],
          //   zoom: 8
          // });
        })
    },
    methods: {
      loadList(layer) {
        console.log(layer.name)

        layer.layerInfos.forEach(item => {
          // console.log(item.name)
          const tmp = {
            name: item.name
          }
          this.layers.push(tmp);
        })
      },
      layerChange(layer) {
        console.log(layer)
      },
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
      },
    }
  }
</script>

<style scoped>
  html, body, #map {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  #BasemapToggle {
  }

  .main {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
