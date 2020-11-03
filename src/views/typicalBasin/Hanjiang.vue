<template>
  <div style="height: 100%">
    <a-layout style="height:100%; padding: 20px">
      <a-layout-sider width="256" style="background: #fff; height:100%">
        <div class="header">汉江流域</div>
        <p>
          渭河多年平均径流量75.7亿立方米，陕西境内为53.8亿立方米。径流地区分布不均，总的趋势是自南而北减小，秦岭、关山区高，原区、谷地区低；西部大于东部，中游比下游径流丰富。秦岭北坡的径流模数较高，为9～15公升/秒·平方公里，而黄土原区的径流模数只有0.8～2.2公升/秒·平方公里，仅千河径流模数较高，千阳站为4.66公升/秒·平方公里。渭河干流的径流模数为2.5～3.7公升/秒·平方公里，其中魏家堡、咸阳站较高，是由于支流加入造成。</p>
      </a-layout-sider>
      <a-layout style="padding-left:20px">
        <a-layout-content
          :style="{ background: '#fff', padding: '20px', margin: 0, minHeight: '280px', overflow: 'auto'}"
        >
          <!--          <img style="max-height: 100%"-->
          <!--               src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">-->
          <div id="hanjiangMap"></div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import {loadCss, loadModules, loadScript} from "esri-loader";

  export default {
    name: "Hanjiang",
    mounted() {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadScript({url: 'https://js.arcgis.com/3.32/'})
      loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
      loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer'], {css: true})
        .then(([Map, ArcGISDynamicMapServiceLayer]) => {
          self.map = new Map("hanjiangMap", {
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
  }
</script>

<style scoped>
  .header {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }

  p {
    line-height: 150%;
    font-size: 20px;
  }

  #hanjiangMap {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
