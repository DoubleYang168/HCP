<template>
  <div>
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
          <a-layout-sider
            width="100%"
            :style="{
              background: '#fff',
            }"
          >
            <div class="header">渭河流域</div>
            <span>2020-11-24 15:02</span>
            <span>来源：本网</span>
            <div class="img-weihe"></div>
            <div class="text">
            <p>
              渭河，古称渭水，是黄河的最大支流。发源于甘肃省定西市渭源县鸟鼠山，主要流经今甘肃天水、陕西省关中平原的宝鸡、咸阳、西安、渭南等地，至渭南市潼关县汇入黄河。
              渭河南有东西走向的秦岭横亘，北有六盘山屏障。渭河流域可分为东西二部：西为黄土丘陵沟壑区，东为关中平原区。
            </p>
            <p> 渭河多年平均径流量75.7亿立方米，陕西境内为53.8亿立方米。径流地区分布不均，总的趋势是自南而北减小，秦岭、关山区高，原区、谷地区低；西部大于东部，中游比
              下游径流丰富。秦岭北坡的径流模数较高，为9～15公升/秒·平方公里，而黄土原区的径流模数只有0.8～2.2公升/秒·平方公里，仅千河径流模数较高，千阳站为4.66公升/
              秒·平方公里。渭河干流的径流模数为2.5～3.7公升/秒·平方公里，其中魏家堡、咸阳站较高，是由于支流加入造成。
            </p>
            <p>从径流深等值线图上可清楚地看到，秦岭北坡的径流深随山地高程升高而增加，由低于100毫米到高于600毫米，最高中心在太白山及南五台山。渭河冲积平原十分平坦，
                水利化程度很高，属于低产流区。
              </p>
              <p>
                渭河中下游径流的年际变化，表现为南部小，北部大，即渭河南岸秦岭山地年径流量丰富而年际变化小；北岸黄土区年径流小而年际变化大。年径流的变差系数，
                秦岭北坡一般为0.30～0.40，其中石头河、清姜河等仅为0.30，黑河、涝河及沣河等为0.40，再往东的大峪河、石砭峪河等又减少到0.35。最大年与最小年的比值为3.0～4.0，
                在秦岭北坡的分布情况与变差系数的分布相适应。黄土塬区的变化最大，变差系数为0.45～0.60，最大年与最小年径流的比值为4～6倍。渭河干流水量大，径流的年际变化相对较小，变差系数0.30～0.35。
              </p>
              <p>
                渭河径流的季节变化明显，干流以秋季流量最大，约占年径流的38%～40%，夏季占32.8%～34.2%，春季占17.7%～19.1%，冬季为8.3%～9.9%。南岸支流黑河及以西的河流，
                以夏季径流量大，秋季次之；黑河以东的河流则以秋季最大，夏季次之，春季径流的比重较大，可占到21%～27.3%。北岸支流以千河径流的年内分布最不均匀，秋季径流占52.6%，
                夏季径流只占23.5%，春季径流也较低，为14.6%。漆水河径流的年内分配比较均匀，春季占23.2%，与夏季25.1%相近，冬季径流高达15.8%，比千河春季径流还高，其原因在于下垫面因素的影响。
              </p>
              </div>
          </a-layout-sider>
        </a-tab-pane>
        <a-tab-pane key="2" tab="地图显示">
          <a-layout style="padding-left: 8px">
            <a-layout-content>
              <!--          <img style="max-height: 100%"-->
                            <!-- src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image"> -->
              <div id="weiheMap"></div>
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
  name: "Weihei",
  data() {
    return {
      isText: true,
    };
  },

  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadScript({ url: "https://js.arcgis.com/3.32/" });
    loadCss("https://js.arcgis.com/3.32/esri/css/esri.css");
    loadModules(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer"], {
      css: true,
    }).then(([Map, ArcGISDynamicMapServiceLayer]) => {
      self.map = new Map("weiheMap", {
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
#weiheMap {
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
.img-weihe{
    height: 500px;
    margin: 20px 0;
    background-image: url("../../assets/weihe.jpg");
    background-repeat: no-repeat;
	  background-position: center;
    background-size: 80% 100%;
  }
</style>
