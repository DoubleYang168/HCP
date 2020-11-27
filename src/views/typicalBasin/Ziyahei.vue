<template>
  <div style="height: 100%">
    <a-layout
      :style="{
        background: '#fff',
        margin: 0,
        minHeight: '280px',
        overflow: 'auto',
      }"
    >
      <a-tabs>
        <a-tab-pane key="1" tab="文本介绍">
          <a-layout-sider width="100%" style="background: #fff; height: 100%">
            <div class="header">子牙河流域</div>
            <span>2020-11-24 15:02</span>
            <span>来源：本网</span>
            <div class="img-ziyahe"></div>
            <div class="text">
            <p>
             子牙河，海河支流，又名盐河、沿河，位于大清河与漳卫南运河之间，由滹沱河和滏阳河两大支流及滏阳新河、子牙新河两条分洪河道组成，在献县藏家桥（1967年子牙新河开挖后新、
             老子牙河均以献县枢纽为起点）汇合后称子牙河。子牙河水系流经山西东北部、河北省南部，干流流经河北省献县、河间、大城等县市至天津市静海区第六堡与大清河汇流后称西河，
             在天津市金刚桥上游三岔河口（原在大红桥）与北运河汇合，以下河道为海河。
            </p>
            <p> 由河源（滹沱河河源泰戏山）至大红桥全长769公里，流域地跨山西、河北两省和天津市，流域面积46868平方公里；流域多年平均年径流量40.41亿立方米。</p>
              <p>子牙河水系在历史上就上大下小，峰高、量大、流急的滹、滏二水，汇入子牙河后宣泄不及，便决口泛滥。中华人民共和国成立后，在滏阳河上游山区建临城、东武仕、朱庄3座大型水库。
                滹沱河上游山区建岗南、黄壁庄两座大型水库。下游开辟了滏阳新河、子牙新河，从献县分洪入海。子牙新河开挖以后，子牙河的主要任务是航运、排沥、灌溉以及相机宣泄洪水。</p>
              <p>
                子牙河，又名盐河、沿河，位于大清河与漳卫南运河之间，上游有滹沱河和滏阳河两大支流，原在献县藏家桥汇合后称子牙河。子牙河流经献县、河间、大城等县至静海第六堡与大清河汇流后称西河，
                原在天津市大红桥三岔口与北运河汇合后称海河。一般以滹沱河为正源，由河源（滹沱河河源泰戏山）至大红桥全长769公里。
              </p>
              <p>
                1960年代治理后，子牙河系由滹沱河、滏阳河、滏阳新河、子牙新河和子牙河组成。其中滏阳新河、子牙新河是1963年大洪水后，在1960年代中后期新开辟的滏阳河泄洪河道和子牙河分洪入海河道。
                滏阳新河位于滏阳河右岸，上起艾辛庄枢纽下至献县枢纽全长132.4公里，设计流量3340立方米每秒；子牙新河西起献县枢纽进洪闸，东至海口闸，全长143.4公里，南北堤间平均距离2.5公里，设计流量6000立方米每秒。
              </p>
              </div>
          </a-layout-sider>
        </a-tab-pane>
        <a-tab-pane key="2" tab="地图显示">
          <a-layout style="padding-left: 8px">
            <a-layout-content>
              <!--          <img style="max-height: 100%"-->
              <!--               src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">-->
              <div id="ziyaheMap"></div>
            </a-layout-content>
          </a-layout>
        </a-tab-pane>
      </a-tabs>
    </a-layout>
  </div>
</template>

<script>
import { loadCss, loadModules, loadScript } from "esri-loader";
export default {
  name: "Ziyahei",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadScript({ url: "https://js.arcgis.com/3.32/" });
    loadCss("https://js.arcgis.com/3.32/esri/css/esri.css");
    loadModules(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer"], {
      css: true,
    }).then(([Map, ArcGISDynamicMapServiceLayer]) => {
      self.map = new Map("ziyaheMap", {
        zoom: 20,
      });
      // var tjUAVurl = 'http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer'
      var tjUAVurl = "/arcgis/rest/services/hanjiangliuliang/MapServer";
      var tjUAVLayer = new ArcGISDynamicMapServiceLayer(tjUAVurl);

      self.map.addLayer(tjUAVLayer);
      // this.view = new MapView({
      //   container: this.$el,
      //   map: map,
      //   center: [-118, 34],
      //   zoom: 8
      // });
    });
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 22px;
  /* padding: 10px 5px; */
}
p {
  line-height: 150%;
  font-size: 15px;
  text-indent: 30px;
}
#ziyaheMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.header{
    font-size: 24px;
    text-align: center;
    line-height: 52px;
    font-family: '微软雅黑';   
    color: #333;
    margin: 0px 0px 10px;
}
span{
  display: block;
  font-size: 16px;
  color: #999;
  font-family: '微软雅黑';   
  text-align: center;
  margin: 5px 0;
}
.text{
  margin: 0 60px;
}
p {
    text-align:justify;
    word-break: break-all;
    line-height: 31px;
    text-indent: 2em;
    font-family: '微软雅黑';   
    font-size: 16px;
    color: #333;
    margin: 0px 0px 15px;
}
.img-ziyahe{
    height: 500px;
    margin: 20px 0;
    background-image: url("../../assets/ziyahe.jpg");
    background-repeat: no-repeat;
	  background-position: center;
    background-size: 80% 100%;
  }
</style>
