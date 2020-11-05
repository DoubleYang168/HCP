<template>
  <div>
    <a-layout style="height: 100%; padding: 8px">
      <a-layout-sider
        width="180"
        style="height: 100%"
        :style="{ overflow: 'auto', height: '100%', background: '#fff' }"
      >
        <a-menu
          style="height: 100%"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <template v-for="(item, index) in menuList">
            <a-sub-menu :key="`0_${index}`" @titleClick="titleClick">
              <span slot="title" v-if="!item.items">{{ item.name }}</span>
              <template v-else>
                <span slot="title">{{ item.name }}</span>
                <template v-for="childItem in item.items">
                  <a-menu-item :key="childItem.value">
                    {{ childItem.name }}
                  </a-menu-item>
                </template>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding-left: 8px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '8px',
            margin: 0,
            minHeight: '280px',
            overflow: 'auto',
          }"
        >
          <project-introduction
            v-show="this.contentType === 'index'"
          ></project-introduction>
          <topic-one v-show="this.contentType === 'one'"></topic-one>
          <topic-two v-show="this.contentType === 'two'"></topic-two>
          <topic-three v-show="this.contentType === 'three'"></topic-three>
          <topic-four v-show="this.contentType === 'four'"></topic-four>
          <topic-five v-show="this.contentType === 'five'"></topic-five>
          <topic-six v-show="this.contentType === 'six'"></topic-six>
          <topic-seven v-show="this.contentType === 'seven'"></topic-seven>
          <topic-eight v-show="this.contentType === 'eight'"></topic-eight>
          <topic-nine v-show="this.contentType === 'nine'"></topic-nine>
          <topic-ten v-show="this.contentType === 'ten'"></topic-ten>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import ProjectIntroduction from "./ProjectIntroduction";
import TopicOne from "./TopicOne";
import TopicTwo from "./TopicTwo";
import TopicThree from "./TopicThree";
import TopicFour from "./TopicFour";
import TopicFive from "./TopicFive";
import TopicSix from "./TopicSix";
import TopicSeven from "./TopicSeven";
import TopicEight from "./TopicEight";
import TopicNine from "./TopicNine";
import TopicTen from "./TopicTen";

export default {
  name: "topic",
  components: {
    TopicTen,
    TopicEight,
    TopicSeven,
    TopicSix,
    TopicFive,
    TopicFour,
    TopicThree,
    TopicTwo,
    TopicNine,
    TopicOne,
    ProjectIntroduction,
  },
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
      menuList: [
        {
          name: "多源数据",
          items: [
            {
              name: "课题1",
              value: "one",
            },
          ],
        },
        {
          name: "降水预报",
          items: [
            {
              name: "课题2",
              value: "two",
            },
          ],
        },
        {
          name: "理论基础",
          items: [
            {
              name: "课题3",
              value: "three",
            },
            {
              name: "课题4",
              value: "four",
            },
            {
              name: "课题5",
              value: "five",
            },
          ],
        },
        {
          name: "模型技术",
          items: [
            {
              name: "课题6",
              value: "six",
            },
            {
              name: "课题7",
              value: "seven",
            },
            {
              name: "课题8",
              value: "eight",
            },
          ],
        },
        {
          name: "降低不确定性",
          items: [
            {
              name: "课题9",
              value: "nine",
            },
          ],
        },
        {
          name: "集成平台",
          items: [
            {
              name: "课题10",
              value: "ten",
            },
          ],
        },
      ],
      contentType: "index",
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    titleClick(e) {
      console.log("titleClick", e);
    },
    handleClick(item) {
      this.contentType = item.key;
      console.log(this.contentType);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>
