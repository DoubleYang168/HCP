<template>
  <div id = "map">
    <!--    <img style="max-height: 100%"-->
    <!--         src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">-->
  </div>
</template>

<script>
  import {
    loadScript,
    loadCss,
    loadModules} from 'esri-loader';

  export default {
    name: "ForecastMap",
    mounted() {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadScript({url: 'https://js.arcgis.com/3.32/'})
      loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
      loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer'], {css: true})
        .then(([Map, ArcGISDynamicMapServiceLayer]) => {
          self.map = new Map("map", {
            zoom: 20
          });
          // var tjUAVurl = 'http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer'
          var tjUAVurl = '/arcgis/rest/services/hanjiangliuliang/MapServer'
          var tjUAVLayer = new ArcGISDynamicMapServiceLayer(tjUAVurl)

          self.map.addLayer(tjUAVLayer)
          // this.view = new MapView({
          //   container: this.$el,
          //   map: map,
          //   center: [-118, 34],
          //   zoom: 8
          // });
        })
    },
    beforeDestroy() {
      if (this.view) {
        // destroy the map view
        this.view.container = null;
      }
    }
  }
</script>

<style scoped>
  div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
