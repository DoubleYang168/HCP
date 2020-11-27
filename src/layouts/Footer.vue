<template>
  <div class="footer">
    <div>
      <div class="footl" id="area_bq" style="width: 900px">
        <p class="footlp">
          <span><a target="_blank" href="#">访问量统计</a> | </span
          ><span><a target="_blank" href="#">排行榜</a> | </span
          ><span><a target="_blank" href="#"> 网站声明</a> | </span
          ><span><a href="#"> 网站地图</a></span>
        </p>

        <div class="footcontact">
          <div class="footcontact1 fl">
            <p>
              <!-- 京ICP备xxxxxxx号 -->
              Copyright @ 河海大学水文水资源学院 版权所有
            </p>
            <p>
              水利部总机：010-63202114&nbsp;&nbsp;联系电话：（025）83786621&nbsp;&nbsp;地址：江苏省南京市江宁区佛城西路8号
            </p>
            <p>
              政府网站标识码：xxxxx&nbsp;&nbsp;<a
                style="padding: 0"
                href="#"
                ><img
                  src="#"
                  style="vertical-align: text-top"
                />&nbsp;京公网安备xxxxx号</a
              >&nbsp;&nbsp;EMAIL信箱：shxy@hhu.edu.cn
            </p>
          </div>
          <div class="footcontact2 fl">
            <a href="#"><img src="#" width="44" height="56" /></a>　<a
              href="#"
              target="_blank"
              ><img src="#" width="119" height="56"
            /></a>
          </div>
        </div>
      </div>
      <div class="footr">
        <div class="fl margin_top_10">
          <img src="#" width="90" height="90" />
          <p class="margin_top_10" style="float: none; width: auto">
            水文学院官方微信
          </p>
        </div>

        <div
          class="fl"
          style="margin-right: 10px; width: 10px; height: 10px"
        ></div>
        <div class="fl margin_top_10">
          <img src="#" width="90" height="90" />
          <p class="margin_top_10" style="float: none; width: auto">
            水文学院网站
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  width: 80%;
  margin: 0 auto;
  min-width: 1216px;
  min-height: 190px;
  background-color: rgb(236,235,235);
}
.footl {
  width: 930px;
  float: left;
  height: 170px;
  padding-left: 20px;
}
p.footlp {
  height: 60px;
  line-height: 60px;
}
.footl a {
  color: #333;
  padding: 0 4px;
}
.footcontact {
  width: 850px;
  height: 110px;
  font-size: 12px;
  line-height: 24px;
}
.fl {
  float: left;
}
.footl p {
  line-height: 28px;
}
.footcontact2 {
  width: 270px;
}
img {
  vertical-align: top;
  padding: 0;
  margin: 0;
}
.footr {
  width: 250px;
  padding: 20px 0 0 0;
  float: left;
}
.footr div {
  text-align: center;
}
</style>