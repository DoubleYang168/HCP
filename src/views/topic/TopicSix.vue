<template>
  <div style="overflow-y: auto">
    <div class="header">多重反馈多尺度气陆耦合水文水资源模型系统构建</div>
    <div class="title">研究目标：</div>
    <p>
      基于原型观测实验与同位素技术，发展水利/水保工程群与地下水超采下产汇流机制耦合方法和多水源驱动的水资源再分配模式，研究陆面模式中关键水热过程的多重互馈机制，建立考虑地形地貌的多层嵌套动力和统计降尺度与考虑蒸发潜热时空分布升尺度的气陆双向耦合方法，构建基于气陆耦合的分布式水文水资源模型系统，为多尺度水文
      水资源预报预测预警提供模型构建理论和方法。
    </p>
    <div class="title">主要研究内容：</div>
    <p>在现有具有物理基础分布式水文模型系统 HMS（Hydrologic Model
      System）框架下，采用原型观测、同位素示踪和数值分析等方法，建立水利/水保工程群干扰下产汇流机制耦合方法及地下水超采作用下水资源再分配模式；提出考虑次网格土壤含水量和蒸散发空间非均匀动态特性升尺度方法；采用数值模拟和统计分析相结合方法，建立气陆耦合中关键水热过程的多重互馈模式，发展大气-陆面-水文多尺度转换和耦合技术，构建气陆耦合的多尺度水文水资源模型系统。
    </p>
    <p>
      （1）水利/水保工程群、地下水超采影响下产汇流耦合方法
    </p>
    <p>
      水利工程群模块：基于课题 3 中通过降雨径流实验和宽频谱同位素技术相结合方法揭示的水利工程群影响下水文过程扰动和累积效应及水资源时空再分配规律，建立地表
      带门槛多水库叠加的“线性水库”串联汇流组合机制，提出水库塘坝调蓄下多阻断马斯京根法和圣维南方程相结合的汇流算法；改进达西定律、曼宁公式模拟每个“线性水库”内土壤水侧向流/地下水流及坡面汇流，建立考虑水库塘坝库容动态统计的水利工程群扰动下河道汇流模块。
    </p>
  </div>
</template>

<script>
  export default {
    name: "TopicSix"
  }
</script>

<style scoped>
.header{
    font-size: 22px;
    text-align: center;
    line-height: 52px;
    font-family: '微软雅黑';   
    color: #333;
    margin: 0px 0px 10px;
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
  .title {
    font-weight: bold;
    font-size: 20px;
  }
</style>
