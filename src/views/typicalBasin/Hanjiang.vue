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
            <div class="header">汉江流域</div>
            <span>2020-11-24 15:02</span>
            <span>来源：本网</span>
            <div class="img-hanjiang"></div>
            <div class="text">
            <p> 
             汉江流域，是湖北省资源要素最为密集的地区之一。交通运输作为经济社会发展的基础和先导，是不同地区之间资源要素整合流通和产业集群高效发展的重要支撑。汉江又称汉水，古时曾叫沔水，
             与长江、黄河、淮河一道并称“江河淮汉”。
            </p>
            <p> 
              汉江全长1532公里，就长度而言为长江第一大支流，其发源地在陕西省西南部秦岭与米仓山之间的宁强县（隶属陕西省汉中市，旧称宁羌）冢山，而后向东南穿越秦巴山地的陕南汉中、安康等市，
              进入鄂西后北过十堰流入丹江口水库，出水库后继续向东南流，过襄阳、荆门等市，在武汉市汇入长江。 汉江也是韩国北部一条河流的名字。
            </p>
            <p>汉江流域面积15.9万平方公里，流域涉及鄂、陕、川、渝、甘5省市的20个地（市）区、78个县（市）。流域北部以秦岭、外方山及伏牛山与黄河分界；东北以伏牛山及桐柏山与淮河流域为界；
              西南以大巴山及荆山与嘉陵江、沮漳河为界；东南为江汉平原，无明显的天然分水界限。流域地势西北高，东南低。地质构造大致以淅川——丹江口——南漳为界，以西为褶皱隆起中低山区；东以平原丘陵为主。
            </p>
            <p>
              汉江流域属亚热带季风区，气候温和湿润，年降水量873mm，水量较丰沛；但年内分配不均，5～10月径流量占全年75%左右，年际变化较大，是长江各大支流中变化最大的河流。流域水能资源丰富，
              水能理论蕴藏量1093万kw，可开发容量614万kw。
            </p>
            <p>
               汉江主要支流有：褒河、丹江、唐河、白河、堵河等。汉江河道曲折，自古有“曲莫如汉”之说。干流丹江口以上为上游，长约925km，两岸高山耸立，峡谷多，水流急，水量大，水能资源丰富；
               丹江口至钟祥为中游，长约270km，流经低山丘岗，接纳南河和唐白河后，水量和含沙量大增，多沙洲、石滩，河道不稳定；钟祥以下为下游，长约382km，迂回在江汉平原，河床坡降小，水流缓慢，
               曲流发育，河汊纵横，且愈近河口，河道愈窄，呈倒置喇叭形，泄洪能力差，容易溃口成灾。
            </p>
            <p>
              矿产资源较丰富，主要有：铅、锌、铜、锑、镍、铁、汞、金、银、铀、煤、石油、天然气；湖北境内磷矿、石膏在全国占有重要地位。
            </p>
            <p>
              汉江流域农业发展较早，江汉平原是我国主要商品粮基地之一；汉中盆地也是重要的农业区和全国商品粮基地。粮食生产以稻米、小麦为主；
              主要经济作物为棉花、油料作物、麻类、烤烟及桐油等。
            </p>
            </div>
          </a-layout-sider>
        </a-tab-pane>

        <a-tab-pane key="2" tab="地图显示">
          <a-layout>
            <a-layout-content
              :style="{
                background: '#fff',
                padding: '20px',
                margin: 0,
                minHeight: '280px',
                overflow: 'auto',
              }"
            >
              <!--          <img style="max-height: 100%"-->
              <!--               src="http://172.22.0.4:6080/arcgis/rest/services/hanjiangliuliang/MapServer/export?bbox=108.21795258164626,27.603686088541544,120.42934646356726,32.819464613321514&f=image">-->
              <div id="hanjiangMap"></div>
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
  name: "Hanjiang",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadScript({ url: "https://js.arcgis.com/3.32/" });
    loadCss("https://js.arcgis.com/3.32/esri/css/esri.css");
    loadModules(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer"], {
      css: true,
    }).then(([Map, ArcGISDynamicMapServiceLayer]) => {
      self.map = new Map("hanjiangMap", {
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
#hanjiangMap {
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
.img-hanjiang{
    height: 500px;
    margin: 20px 0;
    background-image: url("../../assets/hanjiang.jpg");
    background-repeat: no-repeat;
	  background-position: center;
    background-size: 80% 100%;
  }
</style>
