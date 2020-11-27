<template>
  <div>
    <a-layout>
      <a-tabs  default-active-key="1" class="huaihei-tab">
        <a-tab-pane key="1" tab="文本介绍">
          <a-layout-sider width="100%" style="background: #fff; height: 100%">
            <div class="header">淮河流域</div>
            <span>2020-11-24 15:02</span>
            <span>来源：本网</span>
            <div class="img-huaihe"></div>
            <div class="text">
            <p>
             淮河，古称淮水，与长江、黄河和济水并称“四渎”，是中国七大江河之一。淮河发源于河南省南阳市桐柏县西部的桐柏山主峰太白顶西北侧河谷。
            </p>
            <p>
              淮河流经中国中东部地区 [2]  ，介长江和黄河之间，位于东经112度~121度，北纬31度～36度。淮河干流可以分为上游、中游、下游三部分，
              洪河口以上为上游，长360公里，地面落差178米，流域面积3.06万平方公里；洪河口以下至洪泽湖出口中渡为中游，长490公里，地面落差16米，
              中渡以上流域面积15.8万平方公里；中渡以下至三江营为下游入江水道，长150公里。全长约1000公里 [2]  ，地面落差约6米，三江营以上流域面积为16.46万平方公里，总落差200米。
            </p>
            <p>
              淮河流域地跨河南、湖北、安徽、江苏和山东五省，流域面积约为27万余平方公里，以废黄河为界，整个流域分成淮河和沂沭泗河两大水系，流域面积分别为19万平方公里和8万平方公里。
              水利部淮河水利委员会是水利部直属淮河流域水行政主管部门。
            </p>
            <p>
              淮河流域多年平均径流量为621亿立方米，其中淮河水系453亿立方米，沂沭泗水系168亿立方米。淮河流域平均年径流深约231mm，其中淮河水系为238mm，沂沭泗水系为215mm。径流的年内分配也很不均匀，
              主要集中在汛期。淮河干流各控制站汛期实测来水量占全年的60%左右，沂沭泗水系各支流汛期水量所占比重更大，约为全年的70%～80%。
            </p>
            <p>
              淮河流域暴雨洪水集中在汛期6～9月，6月主要发生淮南山区；7月全流域均可发生；8月则较多地出现在西部伏牛山区、东北部沂蒙山区，同时受台风影响东部沿海地区常出现台风暴雨。
              9月份流域内暴雨减少。一般6月中旬至7月上旬淮河南部进入梅雨季节，梅雨期一般为15-20d，长的可达一个半月。
            </p>
            </div>
          </a-layout-sider>
        </a-tab-pane>
        <a-tab-pane key="2" tab="地图显示">
          <a-layout>
            <a-layout-content
              :style="{
                background: '#fff',
                margin: 0,
                minHeight: '280px',
                overflow: 'auto',
              }"
            >
              <!--          <img style="max-height: 100%"-->
              <!--               src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">-->
              <div id="huaiheMap"></div>
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
  name: "Huaihei",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadScript({ url: "https://js.arcgis.com/3.32/" });
    loadCss("https://js.arcgis.com/3.32/esri/css/esri.css");
    loadModules(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer"], {
      css: true,
    }).then(([Map, ArcGISDynamicMapServiceLayer]) => {
      self.map = new Map("huaiheMap", {
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
.huaihei-tab{
  background: #fff;
}
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
#huaiheMap {
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
.img-huaihe{
    height: 500px;
    margin: 20px 0;
    background-image: url("../../assets/huaihe.jpg");
    background-repeat: no-repeat;
	  background-position: center;
    background-size: 80% 100%;
  }
</style>
