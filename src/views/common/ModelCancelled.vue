<template>
  <div>
    <a-result status="500" title="当前没有运行的模型" sub-title="请先运行模型">
<!--      <template #extra>-->
<!--        <a-button type="primary">-->
<!--          Back Home-->
<!--        </a-button>-->
<!--      </template>-->
    </a-result>
  </div>
</template>

<script>
  export default {
    name: "ModelCancelled",
    data() {
      return {};
    },
  }
</script>

<style scoped>

</style>
